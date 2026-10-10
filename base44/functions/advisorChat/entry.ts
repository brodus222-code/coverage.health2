import { createClientFromRequest } from "npm:@base44/sdk@0.8.52";
import { ToolLoopAgent, tool, stepCountIs, hasToolCall } from "npm:ai@7.0.16";
import { createOpenAICompatible } from "npm:@ai-sdk/openai-compatible@3.0.5";
import { z } from "npm:zod@4.4.3";

const CONSENT = "By replying 'I agree,' I provide my electronic signature and express written consent for Coverage.Health (HealthLink Insurance Agency LLC) and its in-house licensed agents to contact me about insurance products at the phone number and email provided, including by automatic telephone dialing system, artificial or prerecorded voice, text/SMS, and email, even if my number is on a Do-Not-Call registry. Coverage.Health does not sell or pass my information to lead buyers or outside partners. Consent is not a condition of purchase; message/data rates may apply. I can revoke consent anytime by replying STOP or emailing privacy@coverage.health. I agree to the Terms of Use and Privacy Policy.";

const INSTRUCTIONS = `You are the Coverage.Health Online Advisor, a warm, concise assistant for HealthLink Insurance Agency LLC (licensed in AZ, CA, FL, GA, IL, NE, NV, NJ, NC, OH, SC, TN, TX). You are an AI assistant, not a licensed agent: never quote exact prices, guarantee eligibility, or give legal/tax advice. Coverage.Health is NOT a government website and is not affiliated with Healthcare.gov or Medicare. Example rates are examples only.

GOALS: 1) Answer health insurance questions in plain language in 2-5 short sentences (ACA plans, subsidies, metal tiers, PPO vs HMO, deductibles, enrollment periods; short-term/fixed indemnity plans are NOT comprehensive major medical). 2) Smoothly gather, ONE question at a time, what an in-house licensed agent needs:
- ZIP code (5 digits, in a served state; derive the 2-letter state)
- Who needs coverage: Just me / Me + spouse / Me + kids / Whole family
- Age of primary applicant (18-64; if 65+, suggest calling (855) 395-5001 and stop collecting)
- Household income: Under $30k / $30k–$60k / $60k–$100k / Over $100k / Not sure
- Full name
- Phone (10-digit US)
- Email (optional)
When all details are collected, recap them briefly, then show this consent text verbatim and ask them to reply "I agree":
"${CONSENT}"
Only after they clearly agree, call saveLead exactly once. If they decline, don't save; offer (855) 395-5001. After saving, thank them: an in-house licensed agent will call shortly to review options and confirm pricing. Use short markdown lists when helpful.`;

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const { messages, session_id } = await req.json();
    if (!Array.isArray(messages) || messages.length === 0 || messages.length > 40) {
      return Response.json({ error: "Invalid conversation" }, { status: 400 });
    }
    const history = messages
      .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
      .map((m) => ({ role: m.role, content: m.content.slice(0, m.role === "user" ? 500 : 1500) }));
    if (history.reduce((n, m) => n + m.content.length, 0) > 20000) {
      return Response.json({ error: "Conversation too long" }, { status: 400 });
    }

    // Per-visitor rate limit (hashed IP): 30 messages / 10 min, 1 saved request / day.
    // Use the edge-attested connecting IP; the right-most X-Forwarded-For entry (appended by our proxy) as fallback.
    const xff = (req.headers.get("x-forwarded-for") || "").split(",").map((s) => s.trim()).filter(Boolean);
    const ip = req.headers.get("cf-connecting-ip") || req.headers.get("x-real-ip") || xff[xff.length - 1] || "unknown";
    const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode("advisor:" + ip));
    const key = Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
    const RL = base44.asServiceRole.entities.AdvisorRateLimit;
    const today = new Date().toISOString().slice(0, 10);
    let rl = (await RL.filter({ key }, { limit: 1 })).items?.[0];
    if (!rl) rl = await RL.create({ key, window_start: new Date().toISOString(), count: 0, lead_day: today, lead_count: 0 });
    const fresh = Date.now() - new Date(rl.window_start).getTime() > 10 * 60 * 1000;
    const count = fresh ? 1 : (rl.count || 0) + 1;
    if (count > 30) return Response.json({ error: "Too many messages, please try again shortly or call (855) 395-5001." }, { status: 429 });
    // Global daily ceiling across all visitors, so rotating identities can't bypass limits.
    let g = (await RL.filter({ key: "__global__" }, { limit: 1 })).items?.[0];
    if (!g) g = await RL.create({ key: "__global__", lead_day: today, count: 0, lead_count: 0 });
    const gCount = g.lead_day === today ? (g.count || 0) + 1 : 1;
    const gLeads = g.lead_day === today ? g.lead_count || 0 : 0;
    if (gCount > 3000) return Response.json({ error: "The advisor is busy right now. Please call (855) 395-5001." }, { status: 429 });
    await RL.update(g.id, { lead_day: today, count: gCount, lead_count: gLeads });
    const leadCount = rl.lead_day === today ? rl.lead_count || 0 : 0;
    const leadsCapped = gLeads >= 200;
    await RL.update(rl.id, { count, window_start: fresh ? new Date().toISOString() : rl.window_start, lead_day: today, lead_count: leadCount });

    let saved = leadCount >= 1 || leadsCapped;
    const { baseURL, token, headers } = base44.asServiceRole.aiGateway.connection();
    const models = createOpenAICompatible({ name: "base44", baseURL, apiKey: token, headers });

    const agent = new ToolLoopAgent({
      model: models("automatic"),
      instructions: INSTRUCTIONS + (saved ? "\n\nThe request has ALREADY been saved. Do not save again." : ""),
      tools: {
        saveLead: tool({
          description: "Save the plan comparison request after the visitor replied 'I agree' to the consent text.",
          inputSchema: z.object({
            zip: z.string(), state: z.string(), household: z.string(), age: z.number(),
            income: z.string(), full_name: z.string(), phone: z.string(), email: z.string().optional(),
          }),
          execute: async (d) => {
            if (saved) return { success: true, note: "Already saved" };
            const phone = d.phone.replace(/\D/g, "");
            if (!/^\d{5}$/.test(d.zip) || !/^1?[2-9]\d{9}$/.test(phone)) return { success: false, error: "Invalid ZIP or phone" };
            await base44.asServiceRole.entities.Lead.create({
              ...d, phone, email: d.email || "", variant: "A", status: "New",
              tcpa_consent: true, tcpa_consent_text: CONSENT, tcpa_timestamp: new Date().toISOString(),
              channel: "Online Advisor", description: "AI Online Advisor plan comparison request",
              landing_page: "/online-advisor", session_id: session_id || "",
            });
            saved = true;
            await RL.update(rl.id, { lead_day: today, lead_count: leadCount + 1 });
            await RL.update(g.id, { lead_day: today, lead_count: gLeads + 1 });
            return { success: true };
          },
        }),
      },
      stopWhen: [stepCountIs(4)],
    });

    const result = await agent.generate({ messages: history });
    return Response.json({ reply: result.text, lead_saved: saved });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}