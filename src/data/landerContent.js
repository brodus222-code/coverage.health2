// Content maps powering the state and category landing pages.
// Keyword clusters derived from the Under-65 Top 100 Search Ad Keywords knowledge base (July 2026).

export const STATES = {
  florida: {
    abbr: 'FL', name: 'Florida', exchange: 'Healthcare.gov (federal Marketplace)', stm: 'available',
    headline: 'Florida health insurance quotes — compared in minutes',
    intro: 'Florida has one of the largest Marketplace populations in the country, and 2026 premium increases hit Florida households hard. A licensed Florida agent compares ACA, private PPO, and supplemental options against your ZIP code and doctors.',
    facts: [
      'Florida uses Healthcare.gov for Marketplace enrollment — Open Enrollment runs Nov 1 – Jan 15.',
      'Short-term medical plans are available in Florida for households who miss Open Enrollment.',
      'Statewide and regional PPO networks are both common — we check whether your doctor is in-network before you enroll.',
    ],
  },
  texas: {
    abbr: 'TX', name: 'Texas', exchange: 'Healthcare.gov (federal Marketplace)', stm: 'available',
    headline: 'Texas health insurance quotes from a licensed Texas agent',
    intro: 'Texas has the highest uninsured rate in the nation and no state Medicaid expansion, which leaves many working Texans between coverage options. We compare every category you actually qualify for — in plain English.',
    facts: [
      'Texas uses Healthcare.gov — Open Enrollment runs Nov 1 – Jan 15, with year-round Special Enrollment for qualifying life events.',
      'Texas has not expanded Medicaid, so some lower-income households fall in the coverage gap — we screen for that up front.',
      'Short-term medical and fixed indemnity plans are available in Texas as a bridge between jobs or after missing Open Enrollment.',
    ],
  },
  georgia: {
    abbr: 'GA', name: 'Georgia', exchange: 'Georgia Access (state exchange)', stm: 'available',
    headline: 'Georgia health insurance quotes — ACA and private options',
    intro: 'Georgia moved to its own state-based exchange, Georgia Access, which changed how residents shop and enroll. A licensed Georgia agent walks you through both on-exchange and off-exchange plans.',
    facts: [
      'Georgia enrolls through Georgia Access rather than Healthcare.gov — deadlines and plan displays differ.',
      'Georgia expanded coverage through the Pathways program with work requirements — eligibility screening matters here.',
      'Short-term medical plans are available in Georgia for gap and between-jobs coverage.',
    ],
  },
  california: {
    abbr: 'CA', name: 'California', exchange: 'Covered California (state exchange)', stm: 'not sold in CA',
    headline: 'California health insurance quotes — Covered California and private plans',
    intro: 'California runs its own exchange with state-funded subsidies on top of federal premium tax credits, plus a state individual mandate. A licensed California agent makes sure you claim every dollar you qualify for.',
    facts: [
      'Enrollment runs through Covered California — Open Enrollment typically extends to Jan 31, longer than the federal window.',
      'California has a state individual mandate, so going without minimum essential coverage can carry a state tax penalty.',
      'Short-term medical insurance is not sold in California — we focus on ACA plans, and MEC or supplemental products where appropriate.',
    ],
  },
  illinois: {
    abbr: 'IL', name: 'Illinois', exchange: 'Get Covered Illinois (state exchange)', stm: 'available',
    headline: 'Illinois health insurance quotes from your home-state agency',
    intro: 'Illinois is home base for HealthLink Insurance Agency LLC. We compare Get Covered Illinois Marketplace plans, private PPOs, and supplemental coverage for Chicagoland and downstate households alike.',
    facts: [
      'Illinois now runs its own exchange, Get Covered Illinois, with state-managed enrollment support.',
      'Illinois expanded Medicaid, so lower-income households may qualify for no-cost coverage — we screen before quoting.',
      'Chicago-area and downstate networks differ substantially; provider match is the first thing we check.',
    ],
  },
  ohio: {
    abbr: 'OH', name: 'Ohio', exchange: 'Healthcare.gov (federal Marketplace)', stm: 'available',
    headline: 'Ohio health insurance quotes — compare ACA and private PPO',
    intro: 'Ohio households saw sharp 2026 premium jumps, especially those just over the subsidy cliff. A licensed Ohio agent compares subsidized Marketplace plans against off-exchange PPOs so you can see the real difference.',
    facts: [
      'Ohio uses Healthcare.gov for Marketplace enrollment — Nov 1 – Jan 15 Open Enrollment.',
      'Ohio expanded Medicaid, which matters for households under roughly 138% of the federal poverty level.',
      'Short-term medical plans are available in Ohio for coverage gaps between jobs.',
    ],
  },
  'north-carolina': {
    abbr: 'NC', name: 'North Carolina', exchange: 'Healthcare.gov (federal Marketplace)', stm: 'available',
    headline: 'North Carolina health insurance quotes — licensed NC agents',
    intro: 'North Carolina expanded Medicaid in late 2023, which reshaped who qualifies for what. We screen your household against Medicaid, subsidized Marketplace plans, and private options in one conversation.',
    facts: [
      'North Carolina uses Healthcare.gov — Open Enrollment runs Nov 1 – Jan 15.',
      'Medicaid expansion took effect in NC, so some households now qualify for no-cost coverage instead of a Marketplace plan.',
      'Rural network breadth varies widely across the state — we verify your providers before you commit.',
    ],
  },
  tennessee: {
    abbr: 'TN', name: 'Tennessee', exchange: 'Healthcare.gov (federal Marketplace)', stm: 'available',
    headline: 'Tennessee health insurance quotes — ACA, PPO, and short-term',
    intro: 'Tennessee did not expand Medicaid, leaving many working households choosing between a subsidized Marketplace plan and an off-exchange alternative. We lay both side by side with real numbers.',
    facts: [
      'Tennessee uses Healthcare.gov for Marketplace enrollment — Nov 1 – Jan 15.',
      'Tennessee has not expanded Medicaid, so income screening is critical before we quote.',
      'Short-term medical plans are available in Tennessee for between-jobs and missed-enrollment situations.',
    ],
  },
  'new-jersey': {
    abbr: 'NJ', name: 'New Jersey', exchange: 'Get Covered NJ (state exchange)', stm: 'restricted in NJ',
    headline: 'New Jersey health insurance quotes — Get Covered NJ and more',
    intro: 'New Jersey runs its own exchange with additional state subsidies and a state individual mandate. A licensed New Jersey agent makes sure you get state and federal help stacked correctly.',
    facts: [
      'Enrollment runs through Get Covered NJ, with state subsidies layered on top of federal premium tax credits.',
      'New Jersey has a state individual mandate — going uncovered can trigger a state tax penalty.',
      'Short-term medical insurance is heavily restricted in New Jersey; we focus on ACA-compliant and supplemental options.',
    ],
  },
  'south-carolina': {
    abbr: 'SC', name: 'South Carolina', exchange: 'Healthcare.gov (federal Marketplace)', stm: 'available',
    headline: 'South Carolina health insurance quotes — licensed SC agents',
    intro: 'South Carolina households face a narrow carrier field and no Medicaid expansion. Getting the plan choice right the first time matters, and that is what a licensed agent is for.',
    facts: [
      'South Carolina uses Healthcare.gov — Open Enrollment runs Nov 1 – Jan 15.',
      'South Carolina has not expanded Medicaid, so lower-income households may fall into the coverage gap.',
      'Short-term medical plans are available in South Carolina as bridge coverage.',
    ],
  },
  nevada: {
    abbr: 'NV', name: 'Nevada', exchange: 'Nevada Health Link (state exchange)', stm: 'available',
    headline: 'Nevada health insurance quotes — Nevada Health Link and private plans',
    intro: 'Nevada runs its own exchange, Nevada Health Link, and has a large self-employed and hospitality workforce that buys individual coverage. We compare every category you qualify for.',
    facts: [
      'Enrollment runs through Nevada Health Link — Open Enrollment typically extends past the federal deadline.',
      'Nevada expanded Medicaid, so income screening comes before plan shopping.',
      'Short-term medical plans are available in Nevada for gap coverage.',
    ],
  },
  arizona: {
    abbr: 'AZ', name: 'Arizona', exchange: 'Healthcare.gov (federal Marketplace)', stm: 'available',
    headline: 'Arizona health insurance quotes — ACA and private PPO options',
    intro: 'Arizona has a large population of early retirees and self-employed residents who buy their own coverage. Both groups were hit hardest when enhanced subsidies expired — we help you find the next best option.',
    facts: [
      'Arizona uses Healthcare.gov for Marketplace enrollment — Nov 1 – Jan 15.',
      'Arizona expanded Medicaid through AHCCCS, so we screen eligibility before quoting.',
      'Short-term medical and nationwide PPO options are available for households above the subsidy cliff.',
    ],
  },
  nebraska: {
    abbr: 'NE', name: 'Nebraska', exchange: 'Healthcare.gov (federal Marketplace)', stm: 'available',
    headline: 'Nebraska health insurance quotes — licensed Nebraska agents',
    intro: 'Nebraska has a heavily self-employed farm and small-business population that buys individual coverage. We compare Marketplace subsidies against off-exchange PPO pricing so the decision is clear.',
    facts: [
      'Nebraska uses Healthcare.gov — Open Enrollment runs Nov 1 – Jan 15.',
      'Nebraska expanded Medicaid, so lower-income households should be screened first.',
      'Rural provider access varies; nationwide PPO networks are often worth comparing here.',
    ],
  },
};

export const CATEGORIES = {
  marketplace: {
    productLine: 'ACA Marketplace',
    eyebrow: 'ACA Marketplace & Obamacare plans',
    headline: 'Marketplace health insurance plans, explained by a licensed agent',
    intro: 'Bronze, silver, gold, subsidies, deductibles, special enrollment periods — a licensed agent walks you through your actual Marketplace options and checks whether you still qualify for a premium tax credit after the enhanced subsidies expired.',
    benefits: [
      ['Subsidy check first', 'We calculate your premium tax credit eligibility before showing plans, so the price you see is the price you would pay.'],
      ['Metal tiers in plain English', 'Bronze vs silver vs gold is really a trade between monthly premium and deductible. We show both numbers side by side.'],
      ['Enrollment windows handled', 'Open Enrollment runs Nov 1 – Jan 15 in most states. Job loss, a move, marriage, or a new baby can open a Special Enrollment Period year-round.'],
      ['Doctors verified', 'ACA networks narrowed in 2026. We check your physicians and prescriptions against the plan before you enroll.'],
    ],
    faqs: [
      ['Do I still qualify for a subsidy in 2026?', 'Possibly. The enhanced premium tax credits expired at the end of 2025 and the 400% federal poverty level cliff returned, so eligibility is tighter than it was. We run your household size and estimated income and tell you exactly where you land.'],
      ['Can I enroll outside Open Enrollment?', 'Only with a qualifying life event such as losing job-based coverage, moving, marriage, divorce, or having a baby. If you do not qualify, we can show you non-ACA alternatives and explain their limits honestly.'],
      ['Are Marketplace plans the only option that covers pre-existing conditions?', 'ACA-compliant plans are the ones that guarantee coverage of pre-existing conditions. If that is a priority for you, we route you to ACA plans — never to a short-term or indemnity product.'],
    ],
  },
  affordable: {
    productLine: 'Cross-line',
    eyebrow: 'Affordable & low-cost coverage',
    headline: 'Affordable health insurance — find the lowest real monthly cost you qualify for',
    intro: 'Premiums rose sharply for 2026 and are projected to rise again for 2027. A licensed agent compares subsidized Marketplace plans, bronze and catastrophic options, and lower-cost alternatives so you can see the cheapest coverage that still fits your situation.',
    benefits: [
      ['Subsidies before discounts', 'The biggest premium reduction available to most households is the federal premium tax credit. We check that first, every time.'],
      ['Buy-down done carefully', 'Cheaper monthly premiums usually mean higher deductibles. We show total realistic cost, not just the headline price.'],
      ['Alternatives when ACA is out of reach', 'Above the subsidy cliff, off-exchange PPO, short-term, and fixed indemnity plans can cost less — with real trade-offs we explain up front.'],
      ['No bait pricing', 'We quote plans actually available in your ZIP code. If a low advertised price is not real for you, we tell you.'],
    ],
    faqs: [
      ['How cheap can health insurance actually get?', 'It depends entirely on your income, age, household size, and state. Some subsidized households pay very little; others above the subsidy cliff pay full price. We give you your real number rather than a national average.'],
      ['Why did my premium go up so much?', 'The enhanced premium tax credits expired December 31, 2025, and carriers filed large increases for 2026 with another double-digit median increase proposed for 2027. Many households saw both effects at once.'],
      ['Are the cheapest plans real insurance?', 'Some are ACA-compliant major medical. Others — fixed indemnity, limited benefit, MEC — are not comprehensive coverage and pay only fixed amounts. We always tell you which category a plan falls into before you enroll.'],
    ],
  },
  'self-employed': {
    productLine: 'Cross-line',
    eyebrow: 'Self-employed & small business owners',
    headline: 'Health insurance for the self-employed — without a group plan',
    intro: 'No employer, no HR department, no group rate. Whether you are an S-corp owner, sole proprietor, or run a small crew, a licensed agent compares subsidized Marketplace plans against off-exchange PPOs and explains the tax angle.',
    benefits: [
      ['Income is variable — we plan for it', 'Self-employment income swings. We help you estimate for subsidy purposes and explain how reconciliation works at tax time.'],
      ['Premiums may be deductible', 'Self-employed health insurance premiums are often deductible. We flag it so you can confirm with your CPA.'],
      ['Keep your own doctors', 'If narrow ACA networks are the problem, nationwide PPO options are worth pricing — especially if you travel for work.'],
      ['Owner plus a few employees', 'If you have a small team, group MEC and individual coverage are both on the table. We compare the two paths.'],
    ],
    faqs: [
      ['Is it cheaper to buy through the Marketplace or off-exchange?', 'If you qualify for a premium tax credit, the Marketplace is almost always cheaper. If your income is above the subsidy cliff, off-exchange PPO plans often win on both price and network. We price both.'],
      ['Can I deduct my premiums?', 'Self-employed individuals can often deduct health insurance premiums. Rules depend on your business structure and whether you had access to other coverage, so confirm the specifics with your tax professional.'],
      ['What if my income is unpredictable?', 'You estimate annual income for subsidy purposes and it gets reconciled on your tax return. We help you estimate conservatively so you are not surprised in April.'],
    ],
  },
  freelancers: {
    productLine: 'Cross-line',
    eyebrow: 'Freelancers, gig workers & 1099 contractors',
    headline: 'Health insurance for freelancers and 1099 contractors',
    intro: 'Contract work means you buy your own coverage — and clients change often enough that flexibility matters. A licensed agent shows you what you qualify for based on this year\'s realistic income, not a guess.',
    benefits: [
      ['Built for 1099 income', 'Uneven monthly income makes subsidy estimation tricky. We walk through it with you so the estimate holds up.'],
      ['Portable across clients', 'Individual coverage follows you between contracts — no re-enrolling every time a gig ends.'],
      ['Coverage between contracts', 'If there is a gap before your next project, short-term options can bridge it where they are available in your state.'],
      ['Add dental and vision', 'Freelancers lose employer dental and vision too. We can quote those in the same conversation.'],
    ],
    faqs: [
      ['I made much less this year than last. Does that help?', 'Yes — premium tax credits are based on your estimated income for the coverage year, not last year\'s tax return. A lower estimate can mean a substantially lower premium.'],
      ['What if I take a full-time job mid-year?', 'Gaining employer coverage is a qualifying event. You can drop your individual plan and enroll through your employer without penalty.'],
      ['Is there a freelancer group plan?', 'Association and membership plans exist, but they vary widely in quality and are not always ACA-compliant. We will tell you plainly what a plan does and does not cover.'],
    ],
  },
  'between-jobs': {
    productLine: 'Cross-line',
    eyebrow: 'Job loss, COBRA alternatives & unemployment',
    headline: 'Health insurance between jobs — without COBRA sticker shock',
    intro: 'Losing job-based coverage opens a Special Enrollment Period, so you have real options beyond COBRA. A licensed agent compares COBRA, a subsidized Marketplace plan, and short-term coverage on price and protection.',
    benefits: [
      ['Losing coverage opens an SEP', 'You generally have 60 days from losing job-based coverage to enroll in a Marketplace plan — no waiting for Open Enrollment.'],
      ['COBRA is usually the expensive option', 'COBRA means paying the full group premium yourself, often several hundred dollars a month or more. A subsidized Marketplace plan frequently costs far less.'],
      ['Lower income may mean bigger subsidies', 'If your income dropped, your premium tax credit may be much larger than you expect. We recalculate from your new reality.'],
      ['Bridge coverage if needed', 'If a new job starts soon and its plan has a waiting period, short-term coverage can fill the gap where your state allows it.'],
    ],
    faqs: [
      ['How long do I have to get new coverage?', 'Losing job-based coverage typically gives you a 60-day Special Enrollment Period. Acting early matters because coverage start dates depend on when you enroll.'],
      ['Should I take COBRA?', 'Sometimes — especially mid-treatment, since it keeps your exact plan and doctors. But it is usually the most expensive route. We compare the actual numbers side by side.'],
      ['I have a pre-existing condition. What should I choose?', 'An ACA-compliant plan. Short-term medical plans can decline or exclude pre-existing conditions, so we route you to Marketplace coverage in that case.'],
    ],
  },
  'short-term': {
    productLine: 'Private PPO / STM',
    eyebrow: 'Short-term & temporary medical',
    headline: 'Short-term health insurance — temporary coverage that starts fast',
    intro: 'Short-term medical is designed to bridge a gap: between jobs, after aging off a parent plan, or while waiting for a new employer plan to begin. It is not comprehensive coverage, and we will be direct with you about what it does and does not do.',
    notComprehensive: true,
    benefits: [
      ['Coverage lengths that fit the gap', 'Plans are commonly written in 3-, 6-, or 12-month terms, subject to your state\'s limits.'],
      ['Fast effective dates', 'Many short-term plans can start as soon as the day after you apply — useful when a gap is already open.'],
      ['Lower monthly cost', 'Premiums are typically lower than unsubsidized ACA coverage because benefits are narrower and medical questions apply.'],
      ['No enrollment window', 'You can apply outside Open Enrollment, which is why so many people land here after mid-January.'],
    ],
    faqs: [
      ['Is short-term insurance the same as Obamacare coverage?', 'No. Short-term medical is not comprehensive major medical insurance and does not satisfy all Affordable Care Act requirements. It can exclude pre-existing conditions and may not cover maternity, mental health, or prescriptions the way an ACA plan does.'],
      ['Can I get it with a pre-existing condition?', 'Usually not in a useful way — short-term plans ask health questions and commonly exclude pre-existing conditions. If you have ongoing care needs, we will point you to an ACA-compliant plan instead.'],
      ['Is it available in my state?', 'It depends. Some states restrict or prohibit short-term medical, and others cap the duration at around three months. We check your state\'s rules before quoting anything.'],
    ],
  },
  'starts-immediately': {
    productLine: 'Private PPO / STM',
    eyebrow: 'Urgent & next-day coverage',
    headline: 'Health insurance that can start as soon as tomorrow',
    intro: 'If you need coverage in place immediately, some plan types can take effect as early as the day after your application is approved. A licensed agent tells you which options are genuinely fast in your state — and what they actually cover.',
    notComprehensive: true,
    benefits: [
      ['Next-day effective dates', 'Certain short-term and supplemental plans can begin the day after approval, rather than the first of the following month.'],
      ['Apply any time of year', 'These plans are not tied to Open Enrollment, so a missed deadline does not lock you out.'],
      ['Fast phone approval', 'Most applications are short. A licensed agent can often complete one with you on a single call.'],
      ['Honest about waiting periods', 'Some benefits carry waiting periods even on fast-start plans. We tell you which ones before you buy.'],
    ],
    faqs: [
      ['Can coverage really start tomorrow?', 'For some short-term and supplemental products, yes — an effective date as early as the next day is common once the application is approved. ACA Marketplace coverage, by contrast, generally starts on the first of a following month.'],
      ['What is the catch?', 'Speed comes from narrower benefits and medical underwriting. These plans are not comprehensive major medical coverage and may exclude pre-existing conditions, so they suit gaps rather than long-term needs.'],
      ['Is this the same as an ACA plan?', 'No. If you qualify for a Special Enrollment Period or Open Enrollment is running, we will usually recommend an ACA-compliant plan for its stronger protections.'],
    ],
  },
  'private-ppo': {
    productLine: 'Private PPO / STM',
    eyebrow: 'Private, off-marketplace & PPO plans',
    headline: 'Private health insurance and PPO plans — off the Marketplace',
    intro: 'If your income is above the subsidy cliff, a Marketplace plan can mean paying full price for a narrow network. Private off-exchange PPO plans often deliver broader doctor access for less. We compare both honestly.',
    benefits: [
      ['Broader networks', 'Nationwide PPO networks suit travelers, multi-state households, and anyone unwilling to change physicians.'],
      ['Built for subsidy-cliff households', 'Households above 400% of the federal poverty level get no premium tax credit — the group hit hardest in 2026.'],
      ['Any-doctor flexibility', 'PPO plans typically let you see specialists without a referral and keep out-of-network options open.'],
      ['We still check ACA first', 'If you would qualify for a subsidy, we say so. Sending a subsidy-eligible household off-exchange is not doing you a favor.'],
    ],
    faqs: [
      ['What does "off-marketplace" mean?', 'It means the plan is purchased directly from a carrier rather than through Healthcare.gov or a state exchange. Premium tax credits cannot be applied to off-exchange plans.'],
      ['Are private plans ACA-compliant?', 'Some are and some are not. Off-exchange major medical is ACA-compliant; short-term, fixed indemnity, and limited benefit plans are not. We always identify which category you are looking at.'],
      ['Why would I skip the Marketplace?', 'Mainly if you get no subsidy and want a broader network. If you do qualify for a subsidy, the Marketplace is usually the better financial choice.'],
    ],
  },
  family: {
    productLine: 'Cross-line',
    eyebrow: 'Family & household coverage',
    headline: 'Family health insurance plans — covering everyone under one roof',
    intro: 'Family premiums took the hardest hit in 2026, and family deductibles climbed with them. A licensed agent structures coverage around your children\'s pediatrician, your prescriptions, and your real budget.',
    benefits: [
      ['Family deductible math', 'Individual and family deductibles interact in ways that surprise people. We show what you would actually pay in a bad year.'],
      ['Kids may qualify separately', 'Children can qualify for CHIP or Medicaid even when parents do not. That split can save families a significant amount.'],
      ['Pediatricians verified', 'We check your children\'s doctors and any specialists against the network before you enroll.'],
      ['Dental and vision included in the conversation', 'Pediatric dental is part of ACA coverage; adult dental and vision usually are not. We can add them.'],
    ],
    faqs: [
      ['Is one family plan cheaper than separate plans?', 'Usually, but not always — especially if some family members qualify for CHIP or Medicaid. We compare the combinations.'],
      ['Can my kids be on a different plan than me?', 'Yes. Split enrollment is common and sometimes cheaper, particularly when children qualify for CHIP.'],
      ['What about a child turning 26?', 'Aging off a parent\'s plan is a qualifying life event that opens a Special Enrollment Period, so they can enroll in their own coverage right away.'],
    ],
  },
  'early-retiree': {
    productLine: 'Cross-line',
    eyebrow: 'Ages 55–64 & pre-Medicare',
    headline: 'Health insurance before Medicare — coverage for ages 55 to 64',
    intro: 'Retiring before 65 means buying your own coverage during the most expensive age band, and this group was hit hardest when enhanced subsidies expired. A licensed agent maps out the bridge to Medicare.',
    benefits: [
      ['Bridge to age 65', 'We plan coverage around your Medicare start date so there is no gap and no wasted premium.'],
      ['Income control matters here', 'Retirement income is often partly discretionary. Where your modified adjusted gross income lands can decide whether you get a subsidy at all.'],
      ['Specialists kept in network', 'Established relationships with cardiologists, orthopedists, and other specialists are worth protecting — we verify them.'],
      ['Supplemental gap fillers', 'With deductibles rising, hospital indemnity and critical illness plans can cushion a large claim year.'],
    ],
    faqs: [
      ['Why is coverage so expensive at my age?', 'ACA rating allows premiums for a 64-year-old to be up to three times those of a 21-year-old. Without a premium tax credit, that full cost lands on you.'],
      ['Should I look off-exchange?', 'If your income puts you above the subsidy cliff, quite possibly — private PPO plans often price better with broader networks. If you qualify for a credit, the Marketplace usually wins.'],
      ['What happens when I turn 65?', 'You transition to Medicare. We coordinate the end date of your individual plan with your Medicare start so you are never uncovered or double-paying.'],
    ],
  },
};

export const STATE_SLUGS = Object.keys(STATES);
export const CATEGORY_SLUGS = Object.keys(CATEGORIES);