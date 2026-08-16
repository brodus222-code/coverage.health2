import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

// Rotating pool of high-intent SEO topics for the under-65 health insurance market.
// Each entry: the primary keyword + the editorial angle the article should take.
const TOPICS = [
  { keyword: 'affordable health insurance', angle: 'how to find affordable health insurance in your state without sacrificing coverage' },
  { keyword: 'ACA marketplace plans', angle: 'how ACA marketplace plans work and who qualifies for premium subsidies' },
  { keyword: 'PPO health insurance plans', angle: 'PPO health insurance plans explained: flexibility, networks, and when they are worth it' },
  { keyword: 'health insurance for self-employed', angle: 'best health insurance options for self-employed and freelance workers' },
  { keyword: 'health insurance subsidies', angle: 'how health insurance premium subsidies work and how to estimate yours' },
  { keyword: 'health insurance for families', angle: 'choosing the best health insurance plan for your family on a budget' },
  { keyword: 'open enrollment 2026', angle: 'open enrollment 2026: key dates, what to prepare, and how to switch plans' },
  { keyword: 'supplemental health insurance', angle: 'what supplemental health insurance covers and when it makes sense to add it' },
  { keyword: 'COBRA insurance alternatives', angle: 'COBRA vs. private health insurance: which is cheaper after leaving a job' },
  { keyword: 'health savings account HSA', angle: 'how a health savings account (HSA) works and why it is a smart tax move' },
  { keyword: 'short-term health insurance', angle: 'short-term health insurance: what it covers, what it does not, and when to avoid it' },
  { keyword: 'dental and vision insurance', angle: 'standalone dental and vision insurance: worth it, or bundled into your medical plan' },
  { keyword: 'private health insurance vs marketplace', angle: 'private health insurance vs. the ACA marketplace: which path is right for you' },
  { keyword: 'health insurance for small business', angle: 'health insurance options for small business owners and their teams' },
  { keyword: 'early retirement health insurance', angle: 'health insurance before 65: covering the gap until Medicare kicks in' },
  { keyword: 'critical illness and accident insurance', angle: 'critical illness and accident insurance: how they complement your major medical plan' },
  { keyword: 'hospital indemnity insurance', angle: 'hospital indemnity insurance explained: cash benefits when you are admitted' },
  { keyword: 'telehealth benefits', angle: 'how telehealth benefits work and why they matter when choosing a plan' },
  { keyword: 'high deductible health plan', angle: 'high deductible health plans (HDHPs): lower premiums, higher risk, and when they pay off' },
  { keyword: 'health insurance terms explained', angle: 'health insurance terms explained simply: deductible, coinsurance, out-of-pocket max, and more' },
  { keyword: 'preventive care coverage', angle: 'what preventive care is covered for free under ACA-compliant plans' },
  { keyword: 'prescription drug coverage', angle: 'understanding prescription drug coverage and formulary tiers before you enroll' },
  { keyword: 'health insurance by state', angle: 'how health insurance plans and prices vary by state — and how to compare yours' },
  { keyword: 'special enrollment period', angle: 'qualifying life events that trigger a special enrollment period for health insurance' },
];

function slugify(title: string): string {
  return title.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

export default async function(req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);

    // Service-role call from the workflow must be authenticated.
    const isAuthed = await base44.auth.isAuthenticated();
    if (!isAuthed) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
      const currentUser = await base44.auth.me();
      if (currentUser.role !== 'admin') {
        return Response.json({ error: 'Forbidden' }, { status: 403 });
      }
    } catch {
      // Service-role call from the workflow — isAuthenticated() passed.
    }

    // Rotate through the topic pool based on how many articles already exist,
    // so each run produces a different topic until the pool cycles.
    const existing = await base44.asServiceRole.entities.BlogArticle.list('-created_date', 200);
    const topic = TOPICS[existing.length % TOPICS.length];

    const prompt = `You are an expert SEO content writer specializing in U.S. health insurance for the under-65 market. You write for Coverage.Health, a licensed health insurance agency (HealthLink Insurance Agency LLC) that helps consumers compare ACA marketplace, private PPO, and supplemental health plans in FL, NC, NE, TN, IL, NJ, TX, GA, OH, SC, NV, AZ, and CA.

Write a comprehensive, original, SEO-optimized blog article on the topic: "${topic.angle}".

Target primary keyword: "${topic.keyword}".

REQUIREMENTS:
- 1,200 to 1,800 words.
- Engaging, accurate, genuinely helpful content that demonstrates first-hand expertise (E-E-A-T).
- Structure: a compelling H1 title, an intro hook, 4 to 6 H2 sections with practical H3 subsections where useful, bullet lists where appropriate, and a clear FAQ section with 3 to 5 questions and answers at the end.
- Naturally incorporate the primary keyword and 4 to 6 related semantic keywords. Avoid keyword stuffing.
- Write for a general audience at roughly an 8th-grade reading level. Explain any jargon the first time you use it.
- Include actionable takeaways the reader can use immediately.
- Do NOT give specific medical, legal, or tax advice. Include a brief note that plans, prices, and subsidies vary by state and county and that readers should speak with a licensed agent for personalized guidance.
- Never claim to be a government agency, Healthcare.gov, or the ACA marketplace itself. Coverage.Health is a licensed agency that helps consumers compare plans — it is not the government marketplace.
- Tone: trustworthy, warm, authoritative but approachable.

Return a JSON object with exactly these fields:
- title: the H1 article title, under 70 characters, compelling, including the primary keyword.
- meta_description: an SEO meta description under 160 characters that includes the primary keyword.
- excerpt: a 1 to 2 sentence summary for the blog listing and social sharing, under 200 characters.
- keywords: a comma-separated list of the primary keyword plus 4 to 6 related keywords actually used in the article.
- category: exactly one of "ACA Marketplace", "PPO Plans", "Supplemental", "Family", "Self-Employed", "Enrollment", "Savings", "Guides".
- reading_time_minutes: an integer estimate of reading time.
- content: the full article in Markdown. Use # for the H1, ## for H2, ### for H3, - for bullet lists, and **bold** for emphasis. Do not wrap the whole thing in code fences.`;

    const result = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt,
      model: 'claude_opus_4_8',
      response_json_schema: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          meta_description: { type: 'string' },
          excerpt: { type: 'string' },
          keywords: { type: 'string' },
          category: { type: 'string' },
          reading_time_minutes: { type: 'number' },
          content: { type: 'string' }
        }
      }
    });

    const title = String(result.title || 'Untitled Article').slice(0, 200);
    let slug = slugify(title);
    if (!slug) slug = `article-${Date.now()}`;

    const article = await base44.asServiceRole.entities.BlogArticle.create({
      title,
      slug,
      excerpt: String(result.excerpt || '').slice(0, 300),
      content: String(result.content || ''),
      keywords: String(result.keywords || ''),
      meta_description: String(result.meta_description || '').slice(0, 200),
      category: String(result.category || 'Guides'),
      reading_time_minutes: Number(result.reading_time_minutes) || 6,
      status: 'published',
      published_date: new Date().toISOString().slice(0, 10),
      posted_to_facebook: false,
    });

    return Response.json({ success: true, article_id: article.id, title: article.title, slug: article.slug });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}