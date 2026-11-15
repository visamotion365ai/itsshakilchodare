/**
 * VisaHobe — Site-wide content: navigation, trust, company, resources, FAQ.
 */

export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

export interface NavGroup {
  label: string;
  href?: string;
  children?: NavLink[];
}

export const primaryNav: NavGroup[] = [
  {
    label: 'Services',
    href: '/services',
    children: [
      {
        label: 'Student Visa',
        href: '/services/student-visa',
        description: 'Admission to visa file',
      },
      {
        label: 'Work Visa',
        href: '/services/work-visa',
        description: 'Employer & compliance checks',
      },
      {
        label: 'Visit & Tourist',
        href: '/services/visit-visa',
        description: 'Itinerary and evidence',
      },
      {
        label: 'Business Migration',
        href: '/services/business-migration',
        description: 'Formation and investor routes',
      },
      {
        label: 'Family & Dependants',
        href: '/services/family-dependant-visa',
        description: 'Relationship evidence',
      },
      {
        label: 'Document Services',
        href: '/services/document-attestation',
        description: 'Attestation & translation',
      },
    ],
  },
  {
    label: 'Destinations',
    href: '/countries',
    children: [
      { label: 'Canada', href: '/countries/canada', description: 'Study, work, sponsorship' },
      { label: 'United Kingdom', href: '/countries/uk', description: 'Points-based routes' },
      { label: 'Germany', href: '/countries/germany', description: 'Blocked account & APS' },
      { label: 'Australia', href: '/countries/australia', description: 'Skilled & student' },
      { label: 'Schengen Area', href: '/countries/schengen', description: '27-country short stay' },
      { label: 'All destinations', href: '/countries', description: 'Compare every route' },
    ],
  },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Resources', href: '/resources' },
  { label: 'About', href: '/about' },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: 'Services',
    links: [
      { label: 'Student Visa', href: '/services/student-visa' },
      { label: 'Work Visa', href: '/services/work-visa' },
      { label: 'Visit & Tourist', href: '/services/visit-visa' },
      { label: 'Business Migration', href: '/services/business-migration' },
      { label: 'Family & Dependants', href: '/services/family-dependant-visa' },
      { label: 'Document Attestation', href: '/services/document-attestation' },
    ],
  },
  {
    title: 'Destinations',
    links: [
      { label: 'Canada', href: '/countries/canada' },
      { label: 'United Kingdom', href: '/countries/uk' },
      { label: 'Germany', href: '/countries/germany' },
      { label: 'Australia', href: '/countries/australia' },
      { label: 'USA', href: '/countries/usa' },
      { label: 'All countries', href: '/countries' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About VisaHobe', href: '/about' },
      { label: 'How it works', href: '/how-it-works' },
      { label: 'Pricing & fees', href: '/pricing' },
      { label: 'Trust & compliance', href: '/trust' },
      { label: 'Contact', href: '/contact' },
      { label: 'Book a consultation', href: '/consultation' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Resource library', href: '/resources' },
      { label: 'Eligibility check', href: '/eligibility' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Knowledge base', href: '/resources' },
      { label: 'Announcements', href: '/resources/announcements' },
      { label: 'Client sign in', href: '/signin' },
    ],
  },
];

export const trustPillars = [
  {
    title: 'Policy-cited guidance',
    description:
      'Every requirement we state is tied to a named official source with an effective date and version. No folklore, no forum advice.',
    icon: 'book',
  },
  {
    title: 'Human verification gates',
    description:
      'AI drafts and extracts. A named human verifier signs off before anything is submitted or paid for.',
    icon: 'shield-check',
  },
  {
    title: 'Private document vault',
    description:
      'Documents live in encrypted private storage with signed, expiring access. Files are never sent over chat or email.',
    icon: 'lock',
  },
  {
    title: 'Full audit trail',
    description:
      'Every view, upload, edit and approval is recorded against an actor and timestamp — reviewable by you at any time.',
    icon: 'history',
  },
  {
    title: 'Tenant isolation',
    description:
      'Client workspaces are isolated at the database layer with row-level security, not just hidden in the interface.',
    icon: 'layers',
  },
  {
    title: 'No guarantees, ever',
    description:
      'We do not promise approval, and we flag anyone who does. The decision always belongs to the destination authority.',
    icon: 'hand',
  },
];

export const companyValues = [
  {
    title: 'Truth over optimism',
    description:
      'We tell you when a route is unrealistic. A clear no today is worth more than a false yes that costs a year.',
  },
  {
    title: 'Evidence over opinion',
    description:
      'Requirements come from official sources with versions and dates — not from what someone heard at an agency.',
  },
  {
    title: 'Dignity in every file',
    description:
      'Families, students and founders trust us with their futures. That deserves patience, clarity and no upselling.',
  },
  {
    title: 'Privacy as a default',
    description:
      'Minimum necessary data, private-by-default storage and audited access — because a passport scan is not casual information.',
  },
];

export const stats = [
  { value: '12', label: 'Destination policy packs tracked', suffix: '+' },
  { value: '98', label: 'Files verified before submission', suffix: '%' },
  { value: '3', label: 'Named human review gates per file', suffix: '' },
  { value: '24h', label: 'Median first-responsible reply', suffix: '' },
];

export const howItWorksSteps = [
  {
    number: '01',
    title: 'Free eligibility assessment',
    description:
      'A structured intake captures your profile, budget, timeline and any prior refusals. You get a written summary with realistic routes — no payment, no pressure.',
    owner: 'You',
    detail: 'Takes 6–9 minutes',
  },
  {
    number: '02',
    title: 'Route and policy matching',
    description:
      'Our eligibility engine maps your profile to country policy packs and produces a scored shortlist with the exact requirements and risk flags per route.',
    owner: 'VisaHobe',
    detail: 'Written summary within 1 business day',
  },
  {
    number: '03',
    title: 'Case workspace opens',
    description:
      'Your case timeline, document checklist and named case manager appear in your dashboard. Every required document has an owner and a status.',
    owner: 'VisaHobe',
    detail: 'Immediately after you choose a route',
  },
  {
    number: '04',
    title: 'Secure document intake',
    description:
      'Upload to a private encrypted vault. OCR extracts the fields, and you confirm them — nothing is silently assumed.',
    owner: 'You',
    detail: 'Upload from any device',
  },
  {
    number: '05',
    title: 'Human verification gate',
    description:
      'A verifier reviews extraction accuracy, cross-document consistency and policy fit, then either approves, or returns specific corrections with reasons.',
    owner: 'VisaHobe verifier',
    detail: '2–3 business days per pass',
  },
  {
    number: '06',
    title: 'Submission-ready pack',
    description:
      'Forms, annexures and translations are indexed and assembled. You review and authorise submission — the authority makes the final decision.',
    owner: 'You + VisaHobe',
    detail: 'You keep the complete file either way',
  },
];

export const aboutMilestones = [
  {
    year: '2024',
    title: 'The problem, documented',
    description:
      'Founders spent years inside the visa industry watching families lose money to unpriced fees, unverifiable advice and missing paperwork.',
  },
  {
    year: '2025',
    title: 'Policy-first operating model',
    description:
      'Instead of case lore, we built versioned country policy packs with named sources and effective dates — the same discipline used in regulatory work.',
  },
  {
    year: '2026',
    title: 'Platform build',
    description:
      'A secure client workspace, human verification gates and an auditable operational core were built on a three-layer permission model.',
  },
  {
    year: 'Now',
    title: 'Guided preparation at scale',
    description:
      'VisaHobe prepares and verifies files across study, work, visit, family and business routes — with every fee and requirement disclosed in writing.',
  },
];

export const teamMembers = [
  {
    name: 'Shakil Hossain',
    role: 'Founder & Platform Lead',
    focus: 'Case architecture, verification standards',
    initials: 'SH',
  },
  {
    name: 'Ayesha Rahman',
    role: 'Head of Verification',
    focus: 'Document consistency and approval gates',
    initials: 'AR',
  },
  {
    name: 'Tanvir Ahmed',
    role: 'Policy & Compliance',
    focus: 'Country policy packs and official sources',
    initials: 'TA',
  },
  {
    name: 'Nusrat Jahan',
    role: 'Client Experience',
    focus: 'Case communication and SLA discipline',
    initials: 'NJ',
  },
];

export const faqs = [
  {
    category: 'Working with VisaHobe',
    question: 'Does VisaHobe guarantee a visa?',
    answer:
      'No — and no one legitimate can. Visa decisions belong to the destination authority. We guarantee the quality and completeness of the prepared file, a named verifier on every case, and full written disclosure of what we can and cannot do.',
  },
  {
    category: 'Working with VisaHobe',
    question: 'Do I need to pay before the eligibility check?',
    answer:
      'No. The eligibility assessment is free and produces a written route summary. You only pay when you choose a package and open a case workspace.',
  },
  {
    category: 'Working with VisaHobe',
    question: 'Can I use the platform in Bangla?',
    answer:
      'Yes. The interface and document guidance support Bangla, English and Banglish input. Policy citations remain in the source language with Bangla summaries where available.',
  },
  {
    category: 'Fees and payments',
    question: 'Are government fees included in your price?',
    answer:
      'No. Official embassy, biometrics, medical, attestation and courier fees are separate and paid to those authorities. They appear as distinct lines on your quote before you commit to anything.',
  },
  {
    category: 'Fees and payments',
    question: 'What does the service fee actually cover?',
    answer:
      'Policy-matched document planning, secure document handling, OCR extraction with human confirmation, verification passes, form and annexure assembly, case management and submission preparation. It does not buy a decision.',
  },
  {
    category: 'Fees and payments',
    question: 'Is there a refund if I am refused?',
    answer:
      'Our service-fee refund schedule depends on the stage reached and is published in full on the Pricing page. Government fees are never held by us and cannot be refunded by us.',
  },
  {
    category: 'Documents and privacy',
    question: 'Where are my documents stored?',
    answer:
      'In private, encrypted object storage. The database stores only metadata and references. Access is time-limited signed URLs, granted per role, and every access is audited.',
  },
  {
    category: 'Documents and privacy',
    question: 'Who can see my passport and bank statements?',
    answer:
      'Your assigned case manager and verifier, under role-based access. They cannot download outside their role scope, and every view is logged. No other client can ever reach your records — this is enforced by database row-level security, not just the interface.',
  },
  {
    category: 'Documents and privacy',
    question: 'Do you sell my data?',
    answer:
      'Never. We do not sell or rent personal data. Partner sharing happens only when a partner is required for your case, with your explicit consent recorded against your profile.',
  },
  {
    category: 'AI and automation',
    question: 'Does an AI decide my application?',
    answer:
      'No. AI drafts, extracts and flags. A human verifier approves every document and a human authorises every submission. You can see exactly which steps were AI-assisted in your case timeline.',
  },
  {
    category: 'AI and automation',
    question: 'What can the VisaHobe assistant do?',
    answer:
      'Answer questions from approved policy sources, explain your current stage, request missing information, create tasks and summarise your file. It cannot approve documents, submit anything, or issue refunds.',
  },
  {
    category: 'AI and automation',
    question: 'Will my chat be used for anything else?',
    answer:
      'Conversations are used to operate your case and improve guided responses. Personal identifiers are redacted before anything enters logs or evaluation datasets.',
  },
];

export const announcements = [
  {
    date: '2026-11-08',
    title: 'Canada study permit policy pack updated to IRCC-SP-2024.1',
    body: 'Provincial attestation letter requirements and the current proof-of-funds table are now reflected in every Canada student route checklist.',
    tag: 'Policy update',
  },
  {
    date: '2026-10-30',
    title: 'Germany blocked-account figure refreshed',
    body: 'The student blocked-account baseline used in Germany financial evidence checks has been refreshed. Existing cases show a re-verification flag.',
    tag: 'Policy update',
  },
  {
    date: '2026-10-18',
    title: 'New client workspace: document version history',
    body: 'Every uploaded document now keeps its full version history, with who uploaded it, when, and which verification pass it belonged to.',
    tag: 'Product',
  },
  {
    date: '2026-10-02',
    title: 'Attestation tracking now per document',
    body: 'Document services now track each certificate individually through notary, ministry and embassy stages with custodian records.',
    tag: 'Product',
  },
];

export const resources = [
  {
    slug: 'financial-evidence-that-survives-review',
    title: 'Building financial evidence that survives a review',
    category: 'Guides',
    summary:
      'Why a single large deposit can sink an otherwise strong file, and how to document fund provenance across sponsors, savings and business income.',
    readMinutes: 9,
    author: 'Ayesha Rahman',
    date: '2026-11-02',
    tag: 'Documents',
  },
  {
    slug: 'reading-a-refusal-letter-properly',
    title: 'How to read a refusal letter properly',
    category: 'Guides',
    summary:
      'Refusals are written in administrative language. This piece breaks down what caseworkers are actually telling you and what to fix before reapplying.',
    readMinutes: 7,
    author: 'Tanvir Ahmed',
    date: '2026-10-24',
    tag: 'Strategy',
  },
  {
    slug: 'aps-certificate-bangladesh-germany',
    title: 'The APS certificate, explained for Bangladeshi applicants',
    category: 'Country notes',
    summary:
      'What APS verifies, the documents it needs, realistic timelines, and the sequencing mistakes that delay German student applications.',
    readMinutes: 11,
    author: 'Tanvir Ahmed',
    date: '2026-10-14',
    tag: 'Germany',
  },
  {
    slug: 'sponsor-affidavits-what-authorities-check',
    title: 'Sponsor affidavits: what authorities actually check',
    category: 'Guides',
    summary:
      'Relationship evidence, capacity, and the paper trail between the sponsor’s income and the funds shown in the account.',
    readMinutes: 8,
    author: 'Ayesha Rahman',
    date: '2026-10-06',
    tag: 'Documents',
  },
  {
    slug: 'schengen-itinerary-consistency',
    title: 'Schengen itineraries: consistency beats detail',
    category: 'Country notes',
    summary:
      'One mismatched date between insurance, hotel and application can void a file. A practical consistency checklist.',
    readMinutes: 6,
    author: 'Nusrat Jahan',
    date: '2026-09-28',
    tag: 'Schengen',
  },
  {
    slug: 'post-refusal-recovery',
    title: 'A calm path after a refusal',
    category: 'Strategy',
    summary:
      'What to preserve, what to change, and how to decide between a reapplication, an appeal and a different route.',
    readMinutes: 10,
    author: 'Shakil Hossain',
    date: '2026-09-16',
    tag: 'Strategy',
  },
];

export const contactChannels = [
  {
    label: 'Client support',
    value: 'support@visahobe.com',
    detail: 'Existing cases — reachable in your workspace first',
    icon: 'mail',
  },
  {
    label: 'New enquiries',
    value: 'hello@visahobe.com',
    detail: 'Route questions and consultations',
    icon: 'message',
  },
  {
    label: 'Phone (Dhaka)',
    value: '+880 9600 000 000',
    detail: 'Sat–Thu, 10:00–19:00 (GMT+6)',
    icon: 'phone',
  },
  {
    label: 'Office',
    value: 'Level 7, Gulshan Avenue, Dhaka 1212',
    detail: 'Visits by appointment only',
    icon: 'map-pin',
  },
];
