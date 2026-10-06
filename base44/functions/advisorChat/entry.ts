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
    const { messages, lead_saved, session_id } = await req.json();
    if (!Array.isArray(messages) || messages.length === 0 || messages.length > 60) {
      return Response.json({ error: "Invalid conversation" }, { status: 400 });
    }
    const history = messages
      .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
      .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }));

    let saved = !!lead_saved;
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