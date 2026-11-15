/**
 * VisaHobe — Public Service Catalogue
 *
 * Blueprint v2.0 §2.2 / Phase 1: "Service catalogue and service detail pages"
 * and "Country and visa-type guides". This module is the typed content layer
 * that the CMS (`packages/cms`) will eventually seed and version. Keeping it in
 * `packages/shared` means the website, client dashboard and admin all read the
 * same catalogue definitions.
 */

export type ServiceCategory = 'study' | 'work' | 'visit' | 'business' | 'family' | 'documents';

export interface ServicePricing {
  /** Indicative VisaHobe service fee in BDT. Never include government fees. */
  serviceFeeFrom: number;
  serviceFeeTo: number;
  currency: 'BDT';
  /** Typical official / embassy fee, quoted separately and paid to authority. */
  officialFeeNote: string;
  installments: boolean;
}

export interface ServiceDeliverable {
  label: string;
  detail: string;
}

export interface ServiceDefinition {
  slug: string;
  name: string;
  nameBn: string;
  category: ServiceCategory;
  tagline: string;
  summary: string;
  description: string;
  icon: string;
  heroHighlights: string[];
  overview: string[];
  eligibility: string[];
  process: { step: string; detail: string; owner: 'client' | 'visahobe' | 'authority' }[];
  deliverables: ServiceDeliverable[];
  documents: string[];
  timelines: { label: string; value: string }[];
  pricing: ServicePricing;
  faqs: { question: string; answer: string }[];
  popularCountries: string[];
  featured: boolean;
}

export const serviceCategories: { id: ServiceCategory; label: string; description: string }[] = [
  {
    id: 'study',
    label: 'Study Abroad',
    description: 'University shortlisting, admission files and student visa preparation.',
  },
  {
    id: 'work',
    label: 'Work & Employment',
    description: 'Work permit documentation, employer verification and visa readiness.',
  },
  {
    id: 'visit',
    label: 'Visit & Tourism',
    description: 'Tourist, family visit and short-stay applications with itinerary support.',
  },
  {
    id: 'business',
    label: 'Business & Migration',
    description: 'Investor routes, company formation and business relocation support.',
  },
  {
    id: 'family',
    label: 'Family & Dependants',
    description: 'Spouse, dependant and family reunification applications.',
  },
  {
    id: 'documents',
    label: 'Document Services',
    description: 'Attestation, translation, verification and notarisation workflows.',
  },
];

export const services: ServiceDefinition[] = [
  {
    slug: 'student-visa',
    name: 'Student Visa Preparation',
    nameBn: 'স্টুডেন্ট ভিসা প্রস্তুতি',
    category: 'study',
    tagline: 'From shortlisting to visa file — one guided path.',
    summary:
      'End-to-end student visa preparation: university shortlisting, admission documentation, financial file review and embassy-ready submission packs.',
    description:
      'VisaHobe prepares your student visa file with a verifier-reviewed checklist, policy-cited guidance and a tracked case timeline. Every document is checked against the destination country policy pack, and our verification assistant flags inconsistencies before submission.',
    icon: 'graduation',
    heroHighlights: [
      'Policy-cited document checklist',
      'Financial file consistency review',
      'Interview & biometrics preparation',
      'Case timeline with named owner at each stage',
    ],
    overview: [
      'Student visas fail on paperwork, not on ambition. Our preparation workflow mirrors the exact document set each destination authority expects, then runs a second-pass consistency check across your bank statements, sponsor affidavits and academic records.',
      'You get a single case workspace with every required document, its verification status, and the exact next action — plus a verified review of your file before you pay any embassy fee.',
    ],
    eligibility: [
      'Confirmed or conditional offer from a recognised institution (or eligible shortlist in progress)',
      'Academic transcripts and certificates available for verification',
      'Proof of funds or sponsor documentation covering the first academic year',
      'Valid passport with at least 18 months validity recommended',
      'English or destination-language proficiency where the institution requires it',
    ],
    process: [
      {
        step: 'Eligibility intake',
        detail: 'Free structured assessment of your profile, budget and destination preferences.',
        owner: 'client',
      },
      {
        step: 'Shortlist & policy matching',
        detail:
          'We map your profile to destination policy packs and realistic institution options.',
        owner: 'visahobe',
      },
      {
        step: 'Document collection',
        detail:
          'Upload transcripts, finance evidence and identity documents into the secure vault.',
        owner: 'client',
      },
      {
        step: 'Verification pass',
        detail:
          'A human verifier reviews OCR extractions and flags inconsistencies for correction.',
        owner: 'visahobe',
      },
      {
        step: 'Application pack',
        detail: 'Forms, statements and translated annexures are assembled for your approval.',
        owner: 'visahobe',
      },
      {
        step: 'Submission & tracking',
        detail: 'You submit or authorise submission; we track biometrics and decision timelines.',
        owner: 'authority',
      },
    ],
    deliverables: [
      {
        label: 'Verified document checklist',
        detail: 'Country-specific, versioned to the policy pack in force.',
      },
      {
        label: 'Financial file review',
        detail: 'Sponsor affidavit, bank statement and fund-movement consistency.',
      },
      {
        label: 'Statement of purpose review',
        detail: 'Structural and clarity feedback — you own the content.',
      },
      {
        label: 'Submission pack assembly',
        detail: 'Ordered, indexed and cross-referenced by the authority’s requirements.',
      },
      {
        label: 'Interview preparation',
        detail: 'Mock questions drawn from the approved knowledge base.',
      },
    ],
    documents: [
      'Passport bio page and prior visas',
      'Academic transcripts, certificates and test scores',
      'Offer or admission letter',
      'Bank statements (6–12 months) and sponsor affidavit',
      'Tax or income evidence for sponsor',
      'Statement of purpose and CV',
      'Passport-size photographs to authority specification',
    ],
    timelines: [
      { label: 'File preparation', value: '2–4 weeks' },
      { label: 'Verification review', value: '2–3 business days' },
      { label: 'Authority processing', value: 'Varies by country (typically 3–8 weeks)' },
    ],
    pricing: {
      serviceFeeFrom: 45000,
      serviceFeeTo: 120000,
      currency: 'BDT',
      officialFeeNote:
        'Visa, biometrics and courier fees are paid directly to the authority and are not included.',
      installments: true,
    },
    faqs: [
      {
        question: 'Do you guarantee a visa approval?',
        answer:
          'No. VisaHobe prepares and verifies your file; the decision always belongs to the destination authority. Any guarantee claim you see anywhere is a red flag.',
      },
      {
        question: 'Can I start before I have an offer letter?',
        answer:
          'Yes. Eligibility intake and shortlisting do not require an offer. Document verification begins once your shortlist is confirmed.',
      },
      {
        question: 'Who sees my financial documents?',
        answer:
          'Only the assigned verifier and your case manager, under audited access. Documents live in private encrypted storage and are never attached to chat messages.',
      },
    ],
    popularCountries: ['canada', 'uk', 'australia', 'germany', 'malaysia'],
    featured: true,
  },
  {
    slug: 'work-visa',
    name: 'Work Visa Readiness',
    nameBn: 'ওয়ার্ক ভিসা প্রস্তুতি',
    category: 'work',
    tagline: 'Employer, contract and compliance — verified before you fly.',
    summary:
      'Work permit documentation, employer legitimacy checks and employment visa preparation with a verified compliance file.',
    description:
      'We verify employer records, cross-check job offers against destination labour policy, and assemble the employment documentation the authority expects — turning a risky offer into a documented, auditable file.',
    icon: 'briefcase',
    heroHighlights: [
      'Employer legitimacy screening',
      'Contract & salary compliance check',
      'Credential equivalence guidance',
      'Sponsor licence verification',
    ],
    overview: [
      'Most work visa refusals trace back to unverifiable employers or mismatched job descriptions. Our process starts with integrity checks on the offer itself: sponsor licence status, licence rating and the realism of the advertised role.',
      'Where a destination requires credential recognition, we map your qualifications and flag where an assessment body must be engaged before submission.',
    ],
    eligibility: [
      'A genuine job offer from a licensed sponsor (verified during intake)',
      'Qualification and experience evidence for the offered role',
      'Passport with sufficient validity for the proposed contract length',
      'Police clearance or character certificate where required',
      'Medical fitness certificate where required by destination',
    ],
    process: [
      {
        step: 'Offer intake',
        detail: 'Structured capture of employer, role, salary and contract terms.',
        owner: 'client',
      },
      {
        step: 'Employer verification',
        detail: 'Sponsor licence and legitimacy checks against official registers.',
        owner: 'visahobe',
      },
      {
        step: 'Compliance mapping',
        detail: 'Role, salary and qualification matched to destination labour rules.',
        owner: 'visahobe',
      },
      {
        step: 'Document assembly',
        detail: 'Contracts, credentials and clearances prepared to authority format.',
        owner: 'visahobe',
      },
      {
        step: 'Verifier approval',
        detail: 'Independent review before any submission authorisation.',
        owner: 'visahobe',
      },
      {
        step: 'Submission',
        detail: 'Authorised submission or handover of the completed pack.',
        owner: 'authority',
      },
    ],
    deliverables: [
      {
        label: 'Employer verification report',
        detail: 'Licence status, rating and public-register findings.',
      },
      {
        label: 'Contract compliance memo',
        detail: 'Where the contract meets or misses destination labour rules.',
      },
      {
        label: 'Credential mapping',
        detail: 'Which qualifications need recognition before submission.',
      },
      { label: 'Complete submission pack', detail: 'Indexed forms, annexures and evidence.' },
    ],
    documents: [
      'Signed employment contract or offer letter',
      'Employer sponsor licence reference',
      'Qualification certificates and transcripts',
      'Curriculum vitae with role history',
      'Police clearance certificate',
      'Medical fitness certificate',
      'Passport bio page',
    ],
    timelines: [
      { label: 'Verification stage', value: '1–2 weeks' },
      { label: 'File assembly', value: '1–2 weeks' },
      { label: 'Authority processing', value: 'Varies by country and route' },
    ],
    pricing: {
      serviceFeeFrom: 55000,
      serviceFeeTo: 150000,
      currency: 'BDT',
      officialFeeNote:
        'Immigration health surcharge, biometrics and permit fees are paid to the authority.',
      installments: true,
    },
    faqs: [
      {
        question: 'What if my employer fails verification?',
        answer:
          'We stop the file immediately and document the findings. This is a protection, not a failure — proceeding with an unverifiable sponsor risks a long-term refusal record.',
      },
      {
        question: 'Do you find jobs?',
        answer:
          'No. VisaHobe prepares and verifies visas; we do not sell jobs or promise placements. We can review an offer you already hold.',
      },
      {
        question: 'Can my family apply at the same time?',
        answer:
          'Where the route permits dependants, we open linked cases so timelines stay synchronised — see Family & Dependants.',
      },
    ],
    popularCountries: ['canada', 'uk', 'germany', 'uae', 'japan'],
    featured: true,
  },
  {
    slug: 'visit-visa',
    name: 'Visit & Tourist Visa',
    nameBn: 'ভিজিট ভিসা',
    category: 'visit',
    tagline: 'Tight itinerary, stronger ties, cleaner file.',
    summary:
      'Tourist and family visit applications with itinerary documentation, financial evidence review and return-tie support.',
    description:
      'Visit visa decisions hinge on credibility: a coherent itinerary, evidenced finances and clear ties home. We build that narrative into a documented file and stress-test it before submission.',
    icon: 'plane',
    heroHighlights: [
      'Itinerary & booking documentation',
      'Financial evidence structuring',
      'Return-tie and ties-to-home evidence',
      'Sponsor and host letter review',
    ],
    overview: [
      'A visit visa is a credibility argument. Our preparation focuses on the three questions every caseworker asks: can you afford this trip, will you return, and does the itinerary make sense.',
      'We review sponsor letters, accommodation evidence and financial history, then flag gaps before you pay the authority fee.',
    ],
    eligibility: [
      'Clear travel purpose and dates',
      'Evidence of funds for the trip',
      'Employment, study or business ties to Bangladesh',
      'Host invitation or accommodation evidence where applicable',
      'Travel history disclosure (including prior refusals)',
    ],
    process: [
      {
        step: 'Trip intake',
        detail: 'Purpose, dates, companions and budget captured in one pass.',
        owner: 'client',
      },
      {
        step: 'Evidence review',
        detail: 'Finance, ties and host documentation assessed for gaps.',
        owner: 'visahobe',
      },
      {
        step: 'Itinerary documentation',
        detail: 'Coherent day-level plan with traceable bookings.',
        owner: 'visahobe',
      },
      {
        step: 'Application pack',
        detail: 'Forms and annexures assembled to authority order.',
        owner: 'visahobe',
      },
      {
        step: 'Submission',
        detail: 'You submit or authorise; we track the decision.',
        owner: 'authority',
      },
    ],
    deliverables: [
      { label: 'Evidence gap report', detail: 'Exactly what is missing and why it matters.' },
      { label: 'Itinerary pack', detail: 'Traceable accommodation and travel documentation.' },
      { label: 'Cover letter drafting support', detail: 'Structured, factual, in your voice.' },
    ],
    documents: [
      'Passport bio page and prior travel history',
      'Bank statements and income evidence',
      'Employment certificate or business proof',
      'Host invitation letter and host status evidence',
      'Hotel and flight reservations',
      'Travel insurance (where required)',
    ],
    timelines: [
      { label: 'Preparation', value: '3–7 business days' },
      { label: 'Authority processing', value: 'Typically 2–6 weeks' },
    ],
    pricing: {
      serviceFeeFrom: 15000,
      serviceFeeTo: 45000,
      currency: 'BDT',
      officialFeeNote: 'Embassy visa fees, VFS/courier and insurance costs are separate.',
      installments: false,
    },
    faqs: [
      {
        question: 'What if I was refused before?',
        answer:
          'Disclose it. Prior refusals are visible to the authority; a documented explanation of what changed is far stronger than concealment.',
      },
      {
        question: 'Do you book tickets for me?',
        answer:
          'We document itineraries and verify booking references. We do not sell air tickets — and you should not pay for non-refundable tickets before a decision.',
      },
      {
        question: 'Is a sponsor allowed?',
        answer:
          'Yes, where the destination permits. The sponsor must evidence both relationship and capacity.',
      },
    ],
    popularCountries: ['thailand', 'malaysia', 'uae', 'uk', 'schengen'],
    featured: true,
  },
  {
    slug: 'business-migration',
    name: 'Business & Investor Migration',
    nameBn: 'বিজনেস মাইগ্রেশন',
    category: 'business',
    tagline: 'Company formation, investment routes and relocation files.',
    summary:
      'Investor and entrepreneur route preparation, company formation coordination and business relocation documentation.',
    description:
      'For founders and investors, the visa is a consequence of the business structure. We coordinate company formation, capital evidence and business-plan documentation into a file that satisfies both corporate and immigration requirements.',
    icon: 'building',
    heroHighlights: [
      'Route feasibility assessment',
      'Company formation coordination',
      'Capital & source-of-funds evidence',
      'Business plan documentation',
    ],
    overview: [
      'Business migration files fail when the corporate record and the immigration record tell different stories. We align incorporation documents, capital transfer evidence and the business plan into one consistent narrative.',
      'Where a destination requires an endorsement or nomination, we map the requirement before any filing fee is paid.',
    ],
    eligibility: [
      'Identified destination and candidate route',
      'Evidence of investment capital and lawful source of funds',
      'Business or management experience relevant to the route',
      'Corporate structure documents where a company already exists',
      'Language or points requirements where the route is scored',
    ],
    process: [
      {
        step: 'Route assessment',
        detail: 'Feasibility, capital thresholds and realistic timelines.',
        owner: 'visahobe',
      },
      {
        step: 'Structure design',
        detail: 'Entity, jurisdiction and ownership structure planning.',
        owner: 'visahobe',
      },
      {
        step: 'Formation',
        detail: 'Incorporation, registrations and bank account coordination.',
        owner: 'visahobe',
      },
      {
        step: 'Capital evidence',
        detail: 'Source-of-funds and transfer trail documentation.',
        owner: 'client',
      },
      {
        step: 'Migration filing',
        detail: 'Endorsement or application pack assembled and verified.',
        owner: 'authority',
      },
    ],
    deliverables: [
      {
        label: 'Route feasibility memo',
        detail: 'Thresholds, obligations and realistic outcomes.',
      },
      { label: 'Formation checklist', detail: 'Every registration required in the destination.' },
      { label: 'Source-of-funds dossier', detail: 'Documented, traceable capital provenance.' },
      { label: 'Investor pack', detail: 'Business plan, financials and immigration annexures.' },
    ],
    documents: [
      'Passport and identity documents',
      'Proof of investment funds and source',
      'Business plan and financial projections',
      'Corporate registration documents',
      'Professional or management experience evidence',
      'Tax records for source-of-funds trail',
    ],
    timelines: [
      { label: 'Assessment', value: '1–2 weeks' },
      { label: 'Formation', value: '2–6 weeks depending on jurisdiction' },
      { label: 'Migration filing', value: '3–12 months depending on route' },
    ],
    pricing: {
      serviceFeeFrom: 120000,
      serviceFeeTo: 450000,
      currency: 'BDT',
      officialFeeNote:
        'Government registration, endorsement and filing fees are paid to the authorities.',
      installments: true,
    },
    faqs: [
      {
        question: 'Which countries are realistic?',
        answer:
          'It depends on capital, experience and appetite for processing time. The free assessment produces a ranked shortlist with the reasoning attached.',
      },
      {
        question: 'Do you provide legal advice?',
        answer:
          'We coordinate with licensed local counsel in the destination. VisaHobe prepares documentation and process; formal legal opinions come from qualified lawyers.',
      },
      {
        question: 'Can I move my family too?',
        answer:
          'Most investor routes allow dependants. We open linked family cases so the timelines align.',
      },
    ],
    popularCountries: ['canada', 'uk', 'uae', 'singapore', 'portugal'],
    featured: true,
  },
  {
    slug: 'family-dependant-visa',
    name: 'Family & Dependant Visa',
    nameBn: 'ফ্যামিলি ও ডিপেন্ডেন্ট ভিসা',
    category: 'family',
    tagline: 'Relationship evidence that survives scrutiny.',
    summary:
      'Spouse, child and dependant applications with relationship documentation, sponsor evidence and reunification file assembly.',
    description:
      'Family applications are relationship cases. We structure relationship evidence, sponsor capacity proof and dependency documentation so the caseworker can verify the relationship quickly and confidently.',
    icon: 'users',
    heroHighlights: [
      'Relationship evidence structuring',
      'Sponsor capacity assessment',
      'Dependency documentation',
      'Minor consent & custody paperwork',
    ],
    overview: [
      'The strongest family files make the relationship verifiable at a glance: a clear chronology, consistent identity records, and financial evidence that shows genuine support rather than a single transfer.',
      'We build that chronology with you, check identity documents for spelling and date consistency across all records, and prepare consent documentation where minors are involved.',
    ],
    eligibility: [
      'A qualifying family relationship to the sponsor',
      'Sponsor status evidence (residence, employment or citizenship)',
      'Relationship evidence spanning the required duration',
      'Sponsor income or savings meeting destination thresholds',
      'Custody or consent documentation for minors',
    ],
    process: [
      {
        step: 'Relationship intake',
        detail: 'Chronology, identity records and sponsor status captured.',
        owner: 'client',
      },
      {
        step: 'Evidence structuring',
        detail: 'Chronology and supporting documents organised for review.',
        owner: 'visahobe',
      },
      {
        step: 'Financial assessment',
        detail: 'Sponsor capacity measured against destination thresholds.',
        owner: 'visahobe',
      },
      {
        step: 'Verification',
        detail: 'Consistency checks across names, dates and addresses.',
        owner: 'visahobe',
      },
      {
        step: 'Filing',
        detail: 'Pack assembled and submitted or handed over.',
        owner: 'authority',
      },
    ],
    deliverables: [
      {
        label: 'Relationship chronology',
        detail: 'A verified, dated timeline of the relationship.',
      },
      { label: 'Sponsor capacity report', detail: 'Thresholds, evidence and shortfalls.' },
      { label: 'Consistency audit', detail: 'Name, date and address mismatches across documents.' },
      { label: 'Complete filing pack', detail: 'Ordered forms, annexures and translations.' },
    ],
    documents: [
      'Marriage or birth certificates (with translation)',
      'Sponsor residence, employment or citizenship evidence',
      'Relationship evidence: photographs, correspondence, joint records',
      'Sponsor financial evidence',
      'Consent or custody documents for minors',
      'Passports and national ID cards',
    ],
    timelines: [
      { label: 'Evidence assembly', value: '2–4 weeks' },
      { label: 'Verification', value: '3–5 business days' },
      { label: 'Authority processing', value: 'Several months on most routes' },
    ],
    pricing: {
      serviceFeeFrom: 40000,
      serviceFeeTo: 110000,
      currency: 'BDT',
      officialFeeNote:
        'Application, health surcharge and biometric fees are paid to the authority.',
      installments: true,
    },
    faqs: [
      {
        question: 'How much relationship evidence is enough?',
        answer:
          'Enough to establish a coherent chronology with independent corroboration. Volume alone is not persuasive — consistency is.',
      },
      {
        question: 'Do we both need to attend appointments?',
        answer:
          'It depends on the destination and route. Your case timeline lists exactly who must attend and when.',
      },
      {
        question: 'Can we add a newborn later?',
        answer:
          'Yes — a linked case can be opened at any time without disturbing the primary file.',
      },
    ],
    popularCountries: ['canada', 'uk', 'australia', 'usa', 'schengen'],
    featured: false,
  },
  {
    slug: 'document-attestation',
    name: 'Document Attestation & Verification',
    nameBn: 'ডকুমেন্ট অ্যাটেস্টেশন',
    category: 'documents',
    tagline: 'Notarisation, apostille and translation — tracked end to end.',
    summary:
      'Document legalisation, notarisation, apostille coordination, certified translation and third-party verification.',
    description:
      'Every visa file eventually needs clean paperwork. We coordinate notarisation, ministry and embassy attestation, apostille and certified translation, with each document tracked through every hand-off.',
    icon: 'file-check',
    heroHighlights: [
      'Notarisation & ministry attestation',
      'Apostille coordination',
      'Certified Bangla ↔ English translation',
      'Chain-of-custody document tracking',
    ],
    overview: [
      'Attestation is a sequence: notary, then the relevant ministry, then the destination embassy or apostille authority. Miss an order and the document is rejected on arrival.',
      'We track every document by identifier through each hand-off, so you always know which stage a certificate is at and what it needs next.',
    ],
    eligibility: [
      'Original or certified-copy documents available for handling',
      'Clear destination requirement (apostille vs embassy attestation)',
      'Identity evidence of the document holder',
      'Translation requirement confirmed where the destination language is not English',
    ],
    process: [
      {
        step: 'Requirement mapping',
        detail: 'Which documents need which legalisation route.',
        owner: 'visahobe',
      },
      {
        step: 'Collection',
        detail: 'Secure intake with document identifiers and photographs.',
        owner: 'client',
      },
      {
        step: 'Notarisation',
        detail: 'Notary processing with same-day tracking updates.',
        owner: 'visahobe',
      },
      {
        step: 'Attestation',
        detail: 'Ministry and embassy or apostille sequence.',
        owner: 'authority',
      },
      {
        step: 'Return',
        detail: 'Tracked return delivery with completion report.',
        owner: 'visahobe',
      },
    ],
    deliverables: [
      { label: 'Legalisation plan', detail: 'Correct sequence per document, per destination.' },
      {
        label: 'Per-document tracking',
        detail: 'Stage, custodian and next action visible at all times.',
      },
      {
        label: 'Certified translations',
        detail: 'Translator-attested, formatted for authority acceptance.',
      },
      { label: 'Completion report', detail: 'Photographic evidence and attestation details.' },
    ],
    documents: [
      'Original documents to be attested',
      'Identity proof of document holder',
      'Destination requirement letter (if issued)',
      'Prior attestation stamps, if any',
    ],
    timelines: [
      { label: 'Notarisation', value: '1–2 business days' },
      { label: 'Ministry attestation', value: '3–7 business days' },
      { label: 'Embassy / apostille', value: '5–15 business days' },
    ],
    pricing: {
      serviceFeeFrom: 3500,
      serviceFeeTo: 18000,
      currency: 'BDT',
      officialFeeNote:
        'Government stamp, notary and embassy charges are collected at cost with receipts.',
      installments: false,
    },
    faqs: [
      {
        question: 'Can you attest documents without me visiting?',
        answer:
          'For most documents yes, under a signed authorisation. Certain affidavits require your physical presence at the notary — the plan tells you which.',
      },
      {
        question: 'Do you handle educational transcripts?',
        answer: 'Yes, including board and university verification before ministry attestation.',
      },
      {
        question: 'How do I know where my document is?',
        answer:
          'Each document has a tracked record with the current custodian and stage, updated at every hand-off.',
      },
    ],
    popularCountries: ['uae', 'saudi-arabia', 'qatar', 'kuwait', 'malaysia'],
    featured: false,
  },
];

export function getService(slug: string): ServiceDefinition | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServicesByCategory(category: ServiceCategory): ServiceDefinition[] {
  return services.filter((s) => s.category === category);
}

export const featuredServices = services.filter((s) => s.featured);
