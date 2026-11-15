/**
 * VisaHobe — Pricing, Packages and Fee Transparency
 *
 * Blueprint v2.0 §2.2 mandates "Pricing/packages and transparent fee
 * breakdowns" and "official government/embassy fees are distinct from
 * VisaHobe service fees". Every package below separates those two lines.
 */

export interface PackageTier {
  id: 'essential' | 'guided' | 'concierge';
  name: string;
  nameBn: string;
  tagline: string;
  priceFrom: number;
  priceUnit: string;
  bestFor: string;
  features: { label: string; included: boolean }[];
  highlighted: boolean;
  ctaLabel: string;
}

export const packageTiers: PackageTier[] = [
  {
    id: 'essential',
    name: 'Essential',
    nameBn: 'এসেনশিয়াল',
    tagline: 'Self-driven applicants who want a verified checklist and file review.',
    priceFrom: 15000,
    priceUnit: 'per application',
    bestFor: 'Applicants with a complete file who need an expert verification pass.',
    features: [
      { label: 'Free eligibility assessment', included: true },
      { label: 'Country policy-cited document checklist', included: true },
      { label: 'Document vault with versioning', included: true },
      { label: 'One verification pass by a human verifier', included: true },
      { label: 'Case timeline with next-action guidance', included: true },
      { label: 'Assigned case manager', included: false },
      { label: 'Interview preparation session', included: false },
      { label: 'Priority SLA handling', included: false },
    ],
    highlighted: false,
    ctaLabel: 'Start with Essential',
  },
  {
    id: 'guided',
    name: 'Guided',
    nameBn: 'গাইডেড',
    tagline: 'End-to-end preparation with a named case manager and two verifier passes.',
    priceFrom: 45000,
    priceUnit: 'per application',
    bestFor: 'Most applicants — full preparation, verification and submission-ready assembly.',
    features: [
      { label: 'Free eligibility assessment', included: true },
      { label: 'Country policy-cited document checklist', included: true },
      { label: 'Document vault with versioning', included: true },
      { label: 'Two verification passes by a human verifier', included: true },
      { label: 'Case timeline with next-action guidance', included: true },
      { label: 'Assigned case manager', included: true },
      { label: 'Interview preparation session', included: true },
      { label: 'Priority SLA handling', included: false },
    ],
    highlighted: true,
    ctaLabel: 'Choose Guided',
  },
  {
    id: 'concierge',
    name: 'Concierge',
    nameBn: 'কনসিয়ার্জ',
    tagline: 'Dedicated handling for complex files, business routes and families.',
    priceFrom: 120000,
    priceUnit: 'per application',
    bestFor: 'Business migration, multi-applicant families and time-critical filings.',
    features: [
      { label: 'Free eligibility assessment', included: true },
      { label: 'Country policy-cited document checklist', included: true },
      { label: 'Document vault with versioning', included: true },
      { label: 'Unlimited verification passes until submission', included: true },
      { label: 'Case timeline with next-action guidance', included: true },
      { label: 'Senior case manager', included: true },
      { label: 'Interview preparation sessions (multi)', included: true },
      { label: 'Priority SLA handling', included: true },
    ],
    highlighted: false,
    ctaLabel: 'Discuss Concierge',
  },
];

export interface FeeLineItem {
  label: string;
  detail: string;
  paidTo: 'VisaHobe' | 'Government / Embassy' | 'Third party';
  refundable: 'Yes' | 'No' | 'Partial' | 'Policy-dependent';
}

export const feeBreakdown: FeeLineItem[] = [
  {
    label: 'VisaHobe service fee',
    detail: 'Preparation, verification and case management as defined by your package.',
    paidTo: 'VisaHobe',
    refundable: 'Partial',
  },
  {
    label: 'Government visa / application fee',
    detail:
      'Charged by the destination authority. Amount and currency are set by them and change without notice.',
    paidTo: 'Government / Embassy',
    refundable: 'No',
  },
  {
    label: 'Biometrics / VFS / centre fee',
    detail: 'Collected by the visa application centre for enrolment and handling.',
    paidTo: 'Third party',
    refundable: 'No',
  },
  {
    label: 'Medical examination',
    detail: 'Panel physician fee where the destination requires a health check.',
    paidTo: 'Third party',
    refundable: 'No',
  },
  {
    label: 'Attestation, notarisation & translation',
    detail: 'Document legalisation costs, collected at cost with receipts.',
    paidTo: 'Third party',
    refundable: 'Policy-dependent',
  },
  {
    label: 'Courier & return delivery',
    detail: 'Secure dispatch of originals and passport documents.',
    paidTo: 'Third party',
    refundable: 'No',
  },
];

export const pricingFaqs = [
  {
    question: 'Are government fees included in the package price?',
    answer:
      'No. Every package price covers VisaHobe’s service work only. Government, embassy, biometrics, medical and courier fees are paid to those authorities and shown separately on your quote before you commit.',
  },
  {
    question: 'What happens if my application is refused?',
    answer:
      'Refusal is a decision made by the destination authority and is outside our control. Our refund policy covers the service fee according to the stage reached, and you keep full access to your verified document set for a future application. Government fees are never refundable to us, so we cannot return them.',
  },
  {
    question: 'Can I pay in instalments?',
    answer:
      'Guided and Concierge packages can be split into milestone payments tied to case stages. Essential is paid once at verification start.',
  },
  {
    question: 'Do you charge for the eligibility assessment?',
    answer:
      'No. The eligibility assessment is free and produces a written summary of realistic routes, gaps and expected timelines. No payment is required to receive it.',
  },
  {
    question: 'Are there hidden charges?',
    answer:
      'No. Any cost collected at cost (attestation, translation, courier) appears on your quote as a separate line with a receipt. If a fee is not on your quote, you will not be asked for it without written confirmation.',
  },
];

export const refundPolicy = [
  {
    stage: 'Before document verification begins',
    refund: '100% of service fee',
    notes: 'Minus any third-party costs already incurred with your written approval.',
  },
  {
    stage: 'During verification',
    refund: 'Up to 60% of service fee',
    notes: 'Pro-rated against completed verification and assembly work.',
  },
  {
    stage: 'After submission authorisation',
    refund: 'Not refundable',
    notes: 'The prepared file and evidence package remain yours to keep and reuse.',
  },
];

export function formatBDT(value: number): string {
  return new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
    maximumFractionDigits: 0,
  }).format(value);
}
