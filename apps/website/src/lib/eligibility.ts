/**
 * VisaHobe — Eligibility scoring
 *
 * A deliberately transparent, rule-based assessment. It produces a *route
 * shortlist with gaps*, never an approval probability. This keeps the public
 * claim honest (Blueprint §2.2: no visa guarantee) while still being useful.
 */

export type Purpose = 'study' | 'work' | 'visit' | 'business' | 'family' | 'unsure';
export type Budget = 'under_100k' | '100k_300k' | '300k_600k' | 'above_600k';
export type Timeline = 'within_3m' | '3_6m' | '6_12m' | 'no_rush';
export type EnglishLevel = 'none' | 'basic' | 'intermediate' | 'tested';
export type Funds = 'self' | 'family_sponsor' | 'partial' | 'none';
export type Refusals = 'none' | 'one' | 'multiple';

export interface EligibilityInput {
  purpose: Purpose;
  destination: string;
  budget: Budget;
  timeline: Timeline;
  english: EnglishLevel;
  funds: Funds;
  refusals: Refusals;
  hasPassport: boolean;
  hasOffer: boolean;
  priorTravel: boolean;
  fullName: string;
  email: string;
  phone: string;
  consent: boolean;
}

export interface RouteFit {
  slug: string;
  serviceSlug: string;
  country: string;
  name: string;
  fit: 'strong' | 'realistic' | 'stretch';
  score: number;
  reasons: string[];
  gaps: string[];
  expectedTimeline: string;
}

const budgetScore: Record<Budget, number> = {
  under_100k: 1,
  '100k_300k': 2,
  '300k_600k': 3,
  above_600k: 4,
};

const timelineScore: Record<Timeline, number> = {
  no_rush: 3,
  '6_12m': 3,
  '3_6m': 2,
  within_3m: 1,
};

const englishScore: Record<EnglishLevel, number> = {
  none: 0,
  basic: 1,
  intermediate: 2,
  tested: 3,
};

const fundsScore: Record<Funds, number> = {
  none: 0,
  partial: 1,
  family_sponsor: 2,
  self: 3,
};

const refusalScore: Record<Refusals, number> = {
  none: 2,
  one: 1,
  multiple: 0,
};

interface RouteTemplate {
  slug: string;
  serviceSlug: string;
  name: string;
  purposes: Purpose[];
  minBudget: Budget;
  requiresEnglish: boolean;
  requiresFunds: boolean;
  timeline: string;
}

const routeTemplates: RouteTemplate[] = [
  {
    slug: 'canada',
    serviceSlug: 'student-visa',
    name: 'Canada — Study permit',
    purposes: ['study'],
    minBudget: '300k_600k',
    requiresEnglish: true,
    requiresFunds: true,
    timeline: '8–24 weeks after a complete file',
  },
  {
    slug: 'canada',
    serviceSlug: 'work-visa',
    name: 'Canada — Work permit',
    purposes: ['work'],
    minBudget: '100k_300k',
    requiresEnglish: true,
    requiresFunds: false,
    timeline: '10–28 weeks depending on stream',
  },
  {
    slug: 'uk',
    serviceSlug: 'student-visa',
    name: 'United Kingdom — Student route',
    purposes: ['study'],
    minBudget: '300k_600k',
    requiresEnglish: true,
    requiresFunds: true,
    timeline: '3–8 weeks after biometrics',
  },
  {
    slug: 'uk',
    serviceSlug: 'work-visa',
    name: 'United Kingdom — Skilled Worker',
    purposes: ['work'],
    minBudget: '100k_300k',
    requiresEnglish: true,
    requiresFunds: false,
    timeline: '3–12 weeks after CoS',
  },
  {
    slug: 'germany',
    serviceSlug: 'student-visa',
    name: 'Germany — Student visa',
    purposes: ['study'],
    minBudget: '100k_300k',
    requiresEnglish: false,
    requiresFunds: true,
    timeline: '6–16 weeks (APS required)',
  },
  {
    slug: 'australia',
    serviceSlug: 'student-visa',
    name: 'Australia — Student visa (500)',
    purposes: ['study'],
    minBudget: 'above_600k',
    requiresEnglish: true,
    requiresFunds: true,
    timeline: '4–20 weeks',
  },
  {
    slug: 'schengen',
    serviceSlug: 'visit-visa',
    name: 'Schengen — Short stay',
    purposes: ['visit'],
    minBudget: 'under_100k',
    requiresEnglish: false,
    requiresFunds: false,
    timeline: '15–45 calendar days',
  },
  {
    slug: 'thailand',
    serviceSlug: 'visit-visa',
    name: 'Thailand — Tourist visa',
    purposes: ['visit'],
    minBudget: 'under_100k',
    requiresEnglish: false,
    requiresFunds: false,
    timeline: '7–20 business days',
  },
  {
    slug: 'uae',
    serviceSlug: 'work-visa',
    name: 'UAE — Employment visa',
    purposes: ['work'],
    minBudget: 'under_100k',
    requiresEnglish: false,
    requiresFunds: false,
    timeline: '1–4 weeks after entry permit',
  },
  {
    slug: 'uk',
    serviceSlug: 'family-dependant-visa',
    name: 'United Kingdom — Family route',
    purposes: ['family'],
    minBudget: '100k_300k',
    requiresEnglish: true,
    requiresFunds: true,
    timeline: 'Several months',
  },
  {
    slug: 'canada',
    serviceSlug: 'business-migration',
    name: 'Canada — Business / investor route',
    purposes: ['business'],
    minBudget: 'above_600k',
    requiresEnglish: true,
    requiresFunds: true,
    timeline: '3–12 months',
  },
  {
    slug: 'uae',
    serviceSlug: 'document-attestation',
    name: 'UAE — Document attestation',
    purposes: ['unsure', 'work', 'business'],
    minBudget: 'under_100k',
    requiresEnglish: false,
    requiresFunds: false,
    timeline: '5–15 business days',
  },
];

export function assessEligibility(input: EligibilityInput): RouteFit[] {
  const fits: RouteFit[] = [];

  for (const template of routeTemplates) {
    if (!template.purposes.includes(input.purpose) && input.purpose !== 'unsure') continue;

    const reasons: string[] = [];
    const gaps: string[] = [];
    let score = 0;

    // Document readiness
    if (input.hasPassport) {
      score += 2;
      reasons.push('Valid passport evidence available');
    } else {
      gaps.push('Passport is missing or expiring within 12 months');
    }

    if (input.hasOffer) {
      score += 2;
      reasons.push(
        template.serviceSlug === 'visit-visa' || template.serviceSlug === 'document-attestation'
          ? 'Supporting documentation is already in hand'
          : 'Admission or job offer already in hand',
      );
    } else if (['student-visa', 'work-visa'].includes(template.serviceSlug)) {
      gaps.push('No offer or admission letter yet — this is the first dependency');
    }

    // Budget
    const budgetOk = budgetScore[input.budget] >= budgetScore[template.minBudget];
    if (budgetOk) {
      score += 2;
      reasons.push('Budget band covers the required official and service costs');
    } else {
      gaps.push('Budget band is below what this route realistically requires');
    }

    // English
    if (template.requiresEnglish) {
      if (englishScore[input.english] >= 2) {
        score += 2;
        reasons.push('Language evidence meets the typical route threshold');
      } else if (englishScore[input.english] === 1) {
        score += 1;
        gaps.push('Language evidence is below the usual threshold — a test is likely required');
      } else {
        gaps.push('No English evidence — this route will require a test before filing');
      }
    }

    // Funds
    if (template.requiresFunds) {
      if (fundsScore[input.funds] >= 2) {
        score += 2;
        reasons.push('Funds or sponsor evidence is available');
      } else if (fundsScore[input.funds] === 1) {
        gaps.push('Partial funds evidence — a documented sponsor or savings plan is needed');
      } else {
        gaps.push('No funds evidence yet — this is usually the decisive blocker');
      }
    }

    // Timeline pressure
    score += timelineScore[input.timeline];
    if (input.timeline === 'within_3m' && template.requiresFunds) {
      gaps.push('A three-month target is tight for a route requiring funds seasoning');
    }

    // Refusals
    score += refusalScore[input.refusals];
    if (input.refusals === 'one') {
      gaps.push('One prior refusal — a documented explanation of what changed is required');
    }
    if (input.refusals === 'multiple') {
      gaps.push('Multiple prior refusals — route strategy review is essential before reapplying');
    }

    // Prior travel helps visit routes
    if (input.priorTravel && template.serviceSlug === 'visit-visa') {
      score += 2;
      reasons.push('Prior international travel strengthens the itinerary credibility');
    }

    const maxScore = 15;
    const pct = Math.round((score / maxScore) * 100);
    const fit: RouteFit['fit'] = pct >= 70 ? 'strong' : pct >= 45 ? 'realistic' : 'stretch';

    fits.push({
      slug: template.slug,
      serviceSlug: template.serviceSlug,
      country: template.slug,
      name: template.name,
      fit,
      score: Math.min(pct, 96),
      reasons: reasons.slice(0, 4),
      gaps: gaps.slice(0, 4),
      expectedTimeline: template.timeline,
    });
  }

  return fits.sort((a, b) => b.score - a.score).slice(0, 4);
}
