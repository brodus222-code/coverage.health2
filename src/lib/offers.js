// Campaign offers whose messaging must follow the visitor from the lander into the quote wizard.
export const OFFERS = {
  'ppo-89': {
    eyebrow: 'Private PPO Coverage',
    headline: 'Private PPO Health Plans from $89/mo',
    sub: 'Finish these quick questions and a licensed agent confirms the PPO options and pricing available to you.',
    chip: 'Private PPO plans from $89/mo',
    disclaimer: 'Rates and availability vary by age, health history, ZIP, and eligibility. $89/mo reflects available pricing for qualifying applicants.',
  },
  'under-65-56': {
    eyebrow: 'Coverage for Adults Under 65',
    headline: 'Health Plans for Adults Under 65 from $56/mo',
    sub: 'Finish these quick questions and a licensed agent confirms the plans and pricing available to you.',
    chip: 'Under-65 health plans from $56/mo',
    disclaimer: 'Rates and availability vary by applicant, ZIP, plan type, and eligibility. $56/mo reflects available pricing for qualifying applicants.',
  },
};

export const getOffer = (key) => (key ? OFFERS[key] || null : null);