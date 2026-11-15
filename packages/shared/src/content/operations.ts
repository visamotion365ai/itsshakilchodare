/**
 * VisaHobe — Operational demo dataset
 *
 * Typed fixtures that the Client Dashboard and Super Admin render against.
 * These mirror the Prisma models in `packages/database/prisma/schema.prisma` so
 * swapping in a live API later is a data-source change, not a UI rewrite.
 */

/* ================================================================== */
/* Shared enums                                                       */
/* ================================================================== */
export type CaseStage =
  | 'intake'
  | 'document_collection'
  | 'verification'
  | 'preparation'
  | 'approval'
  | 'submitted'
  | 'decision';

export const caseStageLabels: Record<CaseStage, string> = {
  intake: 'Intake',
  document_collection: 'Document collection',
  verification: 'Verification',
  preparation: 'Preparation',
  approval: 'Human approval',
  submitted: 'Submitted',
  decision: 'Decision',
};

export const caseStageOrder: CaseStage[] = [
  'intake',
  'document_collection',
  'verification',
  'preparation',
  'approval',
  'submitted',
  'decision',
];

export type CaseStatus = 'on_track' | 'needs_action' | 'at_risk' | 'blocked' | 'completed';

export const caseStatusLabels: Record<CaseStatus, string> = {
  on_track: 'On track',
  needs_action: 'Needs your action',
  at_risk: 'At risk',
  blocked: 'Blocked',
  completed: 'Completed',
};

export type Owner = 'client' | 'case_manager' | 'verifier' | 'partner' | 'authority';

export const ownerLabels: Record<Owner, string> = {
  client: 'You',
  case_manager: 'Case manager',
  verifier: 'Verifier',
  partner: 'Partner',
  authority: 'Authority',
};

/* ================================================================== */
/* Client case data                                                   */
/* ================================================================== */
export interface CaseTimelineEvent {
  id: string;
  at: string;
  title: string;
  detail: string;
  owner: Owner;
  visibility: 'client' | 'internal';
  kind: 'stage' | 'document' | 'message' | 'approval' | 'payment' | 'system';
}

export interface CaseDocument {
  id: string;
  name: string;
  category: string;
  status: 'verified' | 'pending_review' | 'needs_correction' | 'missing' | 'expired';
  uploadedAt: string | null;
  sizeLabel: string;
  version: number;
  note?: string;
}

export interface ClientCase {
  id: string;
  caseNumber: string;
  service: string;
  serviceSlug: string;
  country: string;
  countrySlug: string;
  flag: string;
  stage: CaseStage;
  status: CaseStatus;
  progress: number;
  owner: string;
  openedAt: string;
  targetDate: string;
  slaDaysLeft: number;
  nextAction: string;
  nextActionOwner: Owner;
  packageTier: string;
  outstandingFee: number;
  documents: CaseDocument[];
  timeline: CaseTimelineEvent[];
}

const iso = (d: string) => `${d}T09:00:00.000Z`;

export const clientCases: ClientCase[] = [
  {
    id: 'cs_8f21',
    caseNumber: 'VH-2026-0148',
    service: 'Student Visa Preparation',
    serviceSlug: 'student-visa',
    country: 'Canada',
    countrySlug: 'canada',
    flag: '🇨🇦',
    stage: 'verification',
    status: 'needs_action',
    progress: 52,
    owner: 'Ayesha Rahman',
    openedAt: iso('2026-10-02'),
    targetDate: iso('2027-01-15'),
    slaDaysLeft: 6,
    nextAction: 'Re-upload bank statement covering the full 6-month window',
    nextActionOwner: 'client',
    packageTier: 'Guided',
    outstandingFee: 0,
    documents: [
      {
        id: 'doc_1',
        name: 'Passport bio page',
        category: 'Identity',
        status: 'verified',
        uploadedAt: iso('2026-10-04'),
        sizeLabel: '1.2 MB',
        version: 1,
      },
      {
        id: 'doc_2',
        name: 'Academic transcripts (SSC + HSC)',
        category: 'Education',
        status: 'verified',
        uploadedAt: iso('2026-10-05'),
        sizeLabel: '3.8 MB',
        version: 2,
        note: 'Second version replaced a missing seal on page 2.',
      },
      {
        id: 'doc_3',
        name: 'IELTS result — overall 7.0',
        category: 'Language',
        status: 'verified',
        uploadedAt: iso('2026-10-06'),
        sizeLabel: '640 KB',
        version: 1,
      },
      {
        id: 'doc_4',
        name: 'Offer letter — University of Toronto',
        category: 'Admission',
        status: 'verified',
        uploadedAt: iso('2026-10-09'),
        sizeLabel: '980 KB',
        version: 1,
      },
      {
        id: 'doc_5',
        name: 'Bank statement (Apr–Sep 2026)',
        category: 'Finance',
        status: 'needs_correction',
        uploadedAt: iso('2026-10-21'),
        sizeLabel: '2.1 MB',
        version: 1,
        note: 'Stamp missing on final page. Re-upload the stamped statement.',
      },
      {
        id: 'doc_6',
        name: 'Sponsor affidavit — father',
        category: 'Finance',
        status: 'pending_review',
        uploadedAt: iso('2026-10-26'),
        sizeLabel: '1.5 MB',
        version: 1,
      },
      {
        id: 'doc_7',
        name: 'Proof of tuition payment',
        category: 'Finance',
        status: 'missing',
        uploadedAt: null,
        sizeLabel: '—',
        version: 0,
      },
      {
        id: 'doc_8',
        name: 'Statement of purpose',
        category: 'Application',
        status: 'pending_review',
        uploadedAt: iso('2026-11-03'),
        sizeLabel: '220 KB',
        version: 3,
      },
    ],
    timeline: [
      {
        id: 'ev_1',
        at: iso('2026-11-08'),
        title: 'Verifier returned 1 correction',
        detail:
          'Financial documentation pass 1 completed. Bank statement requires a stamped final page before approval.',
        owner: 'verifier',
        visibility: 'client',
        kind: 'document',
      },
      {
        id: 'ev_2',
        at: iso('2026-11-05'),
        title: 'Statement of purpose received',
        detail: 'Version 3 uploaded. Awaiting verifier review.',
        owner: 'client',
        visibility: 'client',
        kind: 'document',
      },
      {
        id: 'ev_3',
        at: iso('2026-11-02'),
        title: 'Sponsor affidavit uploaded',
        detail: 'Father’s affidavit and income evidence added to the finance set.',
        owner: 'client',
        visibility: 'client',
        kind: 'document',
      },
      {
        id: 'ev_4',
        at: iso('2026-10-21'),
        title: 'Stage moved to Verification',
        detail: 'All mandatory documents present. Verification pass 1 opened.',
        owner: 'case_manager',
        visibility: 'client',
        kind: 'stage',
      },
      {
        id: 'ev_5',
        at: iso('2026-10-14'),
        title: 'Milestone payment received',
        detail: 'BDT 22,500 received for the Guided package second milestone.',
        owner: 'case_manager',
        visibility: 'client',
        kind: 'payment',
      },
      {
        id: 'ev_6',
        at: iso('2026-10-02'),
        title: 'Case opened',
        detail: 'Guided package selected. Canada student policy pack IRCC-SP-2024.1 attached.',
        owner: 'case_manager',
        visibility: 'client',
        kind: 'stage',
      },
    ],
  },
  {
    id: 'cs_a44b',
    caseNumber: 'VH-2026-0192',
    service: 'Visit & Tourist Visa',
    serviceSlug: 'visit-visa',
    country: 'Schengen Area',
    countrySlug: 'schengen',
    flag: '🇪🇺',
    stage: 'preparation',
    status: 'on_track',
    progress: 68,
    owner: 'Nusrat Jahan',
    openedAt: iso('2026-10-18'),
    targetDate: iso('2026-12-20'),
    slaDaysLeft: 18,
    nextAction: 'Review assembled application pack (target: 15 Nov)',
    nextActionOwner: 'client',
    packageTier: 'Essential',
    outstandingFee: 0,
    documents: [
      {
        id: 'doc_21',
        name: 'Passport bio page',
        category: 'Identity',
        status: 'verified',
        uploadedAt: iso('2026-10-19'),
        sizeLabel: '1.1 MB',
        version: 1,
      },
      {
        id: 'doc_22',
        name: 'Travel insurance (€30,000)',
        category: 'Travel',
        status: 'verified',
        uploadedAt: iso('2026-10-22'),
        sizeLabel: '410 KB',
        version: 1,
      },
      {
        id: 'doc_23',
        name: 'Hotel reservations',
        category: 'Travel',
        status: 'verified',
        uploadedAt: iso('2026-10-24'),
        sizeLabel: '780 KB',
        version: 1,
      },
      {
        id: 'doc_24',
        name: 'Employment certificate',
        category: 'Employment',
        status: 'verified',
        uploadedAt: iso('2026-10-27'),
        sizeLabel: '360 KB',
        version: 1,
      },
      {
        id: 'doc_25',
        name: 'Bank statement (Jul–Oct 2026)',
        category: 'Finance',
        status: 'verified',
        uploadedAt: iso('2026-10-28'),
        sizeLabel: '1.9 MB',
        version: 1,
      },
      {
        id: 'doc_26',
        name: 'Flight itinerary (held booking)',
        category: 'Travel',
        status: 'pending_review',
        uploadedAt: iso('2026-11-06'),
        sizeLabel: '520 KB',
        version: 1,
      },
    ],
    timeline: [
      {
        id: 'ev_21',
        at: iso('2026-11-09'),
        title: 'Application pack assembled',
        detail:
          'Forms and annexures indexed. Awaiting your review before submission authorisation.',
        owner: 'case_manager',
        visibility: 'client',
        kind: 'approval',
      },
      {
        id: 'ev_22',
        at: iso('2026-11-06'),
        title: 'Itinerary verified',
        detail: 'All dates align across insurance, hotel and held booking.',
        owner: 'verifier',
        visibility: 'client',
        kind: 'document',
      },
      {
        id: 'ev_23',
        at: iso('2026-10-28'),
        title: 'Verification pass 1 passed',
        detail: 'No corrections required on the finance or travel set.',
        owner: 'verifier',
        visibility: 'client',
        kind: 'stage',
      },
      {
        id: 'ev_24',
        at: iso('2026-10-18'),
        title: 'Case opened',
        detail: 'Essential package selected. Schengen short-stay policy pack attached.',
        owner: 'case_manager',
        visibility: 'client',
        kind: 'stage',
      },
    ],
  },
  {
    id: 'cs_c93e',
    caseNumber: 'VH-2026-0071',
    service: 'Document Attestation & Verification',
    serviceSlug: 'document-attestation',
    country: 'United Arab Emirates',
    countrySlug: 'uae',
    flag: '🇦🇪',
    stage: 'submitted',
    status: 'on_track',
    progress: 84,
    owner: 'Tanvir Ahmed',
    openedAt: iso('2026-09-11'),
    targetDate: iso('2026-11-28'),
    slaDaysLeft: 11,
    nextAction: 'Awaiting embassy attestation (estimated 4 business days)',
    nextActionOwner: 'authority',
    packageTier: 'Essential',
    outstandingFee: 0,
    documents: [
      {
        id: 'doc_31',
        name: 'Degree certificate (original)',
        category: 'Education',
        status: 'verified',
        uploadedAt: iso('2026-09-12'),
        sizeLabel: '2.4 MB',
        version: 1,
      },
      {
        id: 'doc_32',
        name: 'Transcript — university',
        category: 'Education',
        status: 'verified',
        uploadedAt: iso('2026-09-12'),
        sizeLabel: '1.8 MB',
        version: 1,
      },
      {
        id: 'doc_33',
        name: 'Notarised copies',
        category: 'Legal',
        status: 'verified',
        uploadedAt: iso('2026-09-16'),
        sizeLabel: '3.2 MB',
        version: 1,
      },
      {
        id: 'doc_34',
        name: 'Ministry attestation stamp',
        category: 'Legal',
        status: 'verified',
        uploadedAt: iso('2026-09-29'),
        sizeLabel: '2.9 MB',
        version: 1,
      },
      {
        id: 'doc_35',
        name: 'Embassy attestation (in progress)',
        category: 'Legal',
        status: 'pending_review',
        uploadedAt: iso('2026-11-08'),
        sizeLabel: '1.1 MB',
        version: 1,
        note: 'With the UAE embassy — expected back 17 Nov.',
      },
    ],
    timeline: [
      {
        id: 'ev_31',
        at: iso('2026-11-08'),
        title: 'Documents at UAE embassy',
        detail: 'Two certificates submitted for attestation. Custodian record updated.',
        owner: 'authority',
        visibility: 'client',
        kind: 'document',
      },
      {
        id: 'ev_32',
        at: iso('2026-09-29'),
        title: 'Ministry attestation completed',
        detail: 'Foreign ministry stamps verified on both documents.',
        owner: 'case_manager',
        visibility: 'client',
        kind: 'stage',
      },
      {
        id: 'ev_33',
        at: iso('2026-09-16'),
        title: 'Notarisation completed',
        detail: 'Certified copies notarised with same-day tracking update.',
        owner: 'case_manager',
        visibility: 'client',
        kind: 'stage',
      },
      {
        id: 'ev_34',
        at: iso('2026-09-11'),
        title: 'Case opened',
        detail: 'Attestation plan produced: notary → ministry → embassy.',
        owner: 'case_manager',
        visibility: 'client',
        kind: 'stage',
      },
    ],
  },
  {
    id: 'cs_d10f',
    caseNumber: 'VH-2026-0203',
    service: 'Family & Dependant Visa',
    serviceSlug: 'family-dependant-visa',
    country: 'United Kingdom',
    countrySlug: 'uk',
    flag: '🇬🇧',
    stage: 'document_collection',
    status: 'at_risk',
    progress: 24,
    owner: 'Ayesha Rahman',
    openedAt: iso('2026-10-30'),
    targetDate: iso('2027-02-10'),
    slaDaysLeft: 3,
    nextAction: 'Provide marriage certificate with certified English translation',
    nextActionOwner: 'client',
    packageTier: 'Guided',
    outstandingFee: 22500,
    documents: [
      {
        id: 'doc_41',
        name: 'Sponsor residence permit',
        category: 'Sponsor',
        status: 'verified',
        uploadedAt: iso('2026-11-01'),
        sizeLabel: '1.3 MB',
        version: 1,
      },
      {
        id: 'doc_42',
        name: 'Marriage certificate (Bangla)',
        category: 'Civil',
        status: 'needs_correction',
        uploadedAt: iso('2026-11-02'),
        sizeLabel: '1.6 MB',
        version: 1,
        note: 'Certified English translation required before verification.',
      },
      {
        id: 'doc_43',
        name: 'Sponsor income evidence',
        category: 'Finance',
        status: 'pending_review',
        uploadedAt: iso('2026-11-07'),
        sizeLabel: '2.8 MB',
        version: 1,
      },
      {
        id: 'doc_44',
        name: 'Relationship photographs & correspondence',
        category: 'Relationship',
        status: 'missing',
        uploadedAt: null,
        sizeLabel: '—',
        version: 0,
      },
      {
        id: 'doc_45',
        name: 'TB test certificate',
        category: 'Medical',
        status: 'missing',
        uploadedAt: null,
        sizeLabel: '—',
        version: 0,
      },
    ],
    timeline: [
      {
        id: 'ev_41',
        at: iso('2026-11-10'),
        title: 'SLA warning — missing civil documents',
        detail: 'Two mandatory documents outstanding. Case marked at risk until received.',
        owner: 'case_manager',
        visibility: 'client',
        kind: 'system',
      },
      {
        id: 'ev_42',
        at: iso('2026-11-07'),
        title: 'Sponsor income evidence uploaded',
        detail: 'Six months of payslips and employer letter received.',
        owner: 'client',
        visibility: 'client',
        kind: 'document',
      },
      {
        id: 'ev_43',
        at: iso('2026-10-30'),
        title: 'Case opened',
        detail: 'UK family route policy pack attached. Relationship chronology started.',
        owner: 'case_manager',
        visibility: 'client',
        kind: 'stage',
      },
    ],
  },
];

export const clientProfile = {
  name: 'Rafid Hasan',
  email: 'rafid.hasan@example.com',
  phone: '+880 1712 345 678',
  tenantId: 'tn_dhaka_0042',
  tenantName: 'Hasan Family Workspace',
  memberSince: '2026-09-28',
  nationality: 'Bangladesh',
  passportExpiry: '2029-04-18',
  preferredLanguage: 'Bangla / English',
  mfaEnabled: true,
  consents: [
    { id: 'c1', label: 'Terms of service & refund policy', grantedAt: '2026-09-28', current: true },
    { id: 'c2', label: 'Privacy policy & data processing', grantedAt: '2026-09-28', current: true },
    { id: 'c3', label: 'Document handling authorisation', grantedAt: '2026-10-02', current: true },
    {
      id: 'c4',
      label: 'Partner coordination (case-level)',
      grantedAt: '2026-10-18',
      current: true,
    },
    { id: 'c5', label: 'Product announcements by email', grantedAt: '2026-09-28', current: false },
  ],
  familyMembers: [
    {
      name: 'Sadia Hasan',
      relation: 'Spouse',
      role: 'Dependant on VH-2026-0203',
      status: 'active',
    },
    {
      name: 'Raisa Hasan',
      relation: 'Daughter',
      role: 'Dependant on VH-2026-0203',
      status: 'active',
    },
  ],
};

export interface ClientInvoice {
  id: string;
  number: string;
  caseNumber: string;
  description: string;
  amount: number;
  currency: string;
  status: 'paid' | 'due' | 'overdue' | 'refunded' | 'partial';
  issuedAt: string;
  paidAt: string | null;
  method: string | null;
  dueAt?: string | null;
}

export const clientInvoices: ClientInvoice[] = [
  {
    id: 'inv_1042',
    number: 'INV-2026-1042',
    caseNumber: 'VH-2026-0148',
    description: 'Guided package — milestone 2 of 3',
    amount: 22500,
    currency: 'BDT',
    status: 'paid' as const,
    issuedAt: iso('2026-10-12'),
    paidAt: iso('2026-10-14'),
    method: 'bKash',
  },
  {
    id: 'inv_1088',
    number: 'INV-2026-1088',
    caseNumber: 'VH-2026-0203',
    description: 'Guided package — milestone 1 of 3',
    amount: 22500,
    currency: 'BDT',
    status: 'due' as const,
    issuedAt: iso('2026-11-01'),
    paidAt: null,
    method: null,
    dueAt: iso('2026-11-20'),
  },
  {
    id: 'inv_0971',
    number: 'INV-2026-0971',
    caseNumber: 'VH-2026-0192',
    description: 'Essential package — full payment',
    amount: 15000,
    currency: 'BDT',
    status: 'paid' as const,
    issuedAt: iso('2026-10-18'),
    paidAt: iso('2026-10-18'),
    method: 'Card',
  },
  {
    id: 'inv_0864',
    number: 'INV-2026-0864',
    caseNumber: 'VH-2026-0071',
    description: 'Attestation — 2 documents',
    amount: 7000,
    currency: 'BDT',
    status: 'paid' as const,
    issuedAt: iso('2026-09-11'),
    paidAt: iso('2026-09-12'),
    method: 'Bank transfer',
  },
  {
    id: 'inv_0733',
    number: 'INV-2026-0733',
    caseNumber: 'VH-2026-0148',
    description: 'Guided package — milestone 1 of 3',
    amount: 22500,
    currency: 'BDT',
    status: 'paid' as const,
    issuedAt: iso('2026-10-02'),
    paidAt: iso('2026-10-02'),
    method: 'bKash',
  },
  {
    id: 'inv_0512',
    number: 'INV-2026-0512',
    caseNumber: 'VH-2026-0071',
    description: 'Courier & return delivery',
    amount: 1200,
    currency: 'BDT',
    status: 'refunded' as const,
    issuedAt: iso('2026-09-20'),
    paidAt: iso('2026-09-20'),
    method: 'bKash',
    dueAt: null,
  },
];

export const clientNotifications = [
  {
    id: 'n1',
    title: 'Bank statement needs a correction',
    body: 'The final page is missing a bank stamp. Re-upload to unblock verification.',
    at: iso('2026-11-08'),
    tone: 'warning' as const,
    href: '/cases/VH-2026-0148',
    unread: true,
  },
  {
    id: 'n2',
    title: 'Invoice INV-2026-1088 is due on 20 Nov',
    body: 'BDT 22,500 for the UK family case milestone 1.',
    at: iso('2026-11-01'),
    tone: 'info' as const,
    href: '/invoices',
    unread: true,
  },
  {
    id: 'n3',
    title: 'Schengen application pack ready for review',
    body: 'Your case manager assembled the pack. Review and authorise submission.',
    at: iso('2026-11-09'),
    tone: 'success' as const,
    href: '/cases/VH-2026-0192',
    unread: true,
  },
  {
    id: 'n4',
    title: 'UAE embassy received your documents',
    body: 'Custodian updated. Estimated return 17 Nov.',
    at: iso('2026-11-08'),
    tone: 'brand' as const,
    href: '/cases/VH-2026-0071',
    unread: false,
  },
  {
    id: 'n5',
    title: 'New secure message from Ayesha Rahman',
    body: null,
    at: iso('2026-11-07'),
    tone: 'neutral' as const,
    href: '/messages',
    unread: false,
  },
];

/* ================================================================== */
/* Super Admin — operational queues                                   */
/* ================================================================== */
export interface AdminCase {
  id: string;
  caseNumber: string;
  clientName: string;
  tenant: string;
  service: string;
  country: string;
  flag: string;
  stage: CaseStage;
  status: CaseStatus;
  priority: 'low' | 'standard' | 'high' | 'urgent';
  assignee: string;
  verifier: string | null;
  slaHoursLeft: number;
  slaState: 'ok' | 'warning' | 'breach';
  openedAt: string;
  value: number;
  flags: string[];
}

export const adminCases: AdminCase[] = [
  {
    id: 'ac_1',
    caseNumber: 'VH-2026-0148',
    clientName: 'Rafid Hasan',
    tenant: 'Hasan Family Workspace',
    service: 'Student visa',
    country: 'Canada',
    flag: '🇨🇦',
    stage: 'verification',
    status: 'needs_action',
    priority: 'high',
    assignee: 'Ayesha Rahman',
    verifier: 'Tanvir Ahmed',
    slaHoursLeft: 42,
    slaState: 'warning',
    openedAt: iso('2026-10-02'),
    value: 67500,
    flags: ['SLA warning', 'Finance docs'],
  },
  {
    id: 'ac_2',
    caseNumber: 'VH-2026-0203',
    clientName: 'Farhana Akter',
    tenant: 'Akter Household',
    service: 'Family dependant',
    country: 'United Kingdom',
    flag: '🇬🇧',
    stage: 'document_collection',
    status: 'at_risk',
    priority: 'urgent',
    assignee: 'Ayesha Rahman',
    verifier: null,
    slaHoursLeft: 6,
    slaState: 'breach',
    openedAt: iso('2026-10-30'),
    value: 67500,
    flags: ['Missing civil docs', 'Payment overdue'],
  },
  {
    id: 'ac_3',
    caseNumber: 'VH-2026-0192',
    clientName: 'Rafid Hasan',
    tenant: 'Hasan Family Workspace',
    service: 'Schengen visit',
    country: 'Schengen Area',
    flag: '🇪🇺',
    stage: 'approval',
    status: 'on_track',
    priority: 'standard',
    assignee: 'Nusrat Jahan',
    verifier: 'Tanvir Ahmed',
    slaHoursLeft: 96,
    slaState: 'ok',
    openedAt: iso('2026-10-18'),
    value: 15000,
    flags: ['Awaiting submission approval'],
  },
  {
    id: 'ac_4',
    caseNumber: 'VH-2026-0071',
    clientName: 'Rafid Hasan',
    tenant: 'Hasan Family Workspace',
    service: 'Attestation',
    country: 'UAE',
    flag: '🇦🇪',
    stage: 'submitted',
    status: 'on_track',
    priority: 'low',
    assignee: 'Tanvir Ahmed',
    verifier: 'Tanvir Ahmed',
    slaHoursLeft: 260,
    slaState: 'ok',
    openedAt: iso('2026-09-11'),
    value: 8200,
    flags: [],
  },
  {
    id: 'ac_5',
    caseNumber: 'VH-2026-0211',
    clientName: 'Imran Chowdhury',
    tenant: 'Chowdhury Ventures',
    service: 'Business migration',
    country: 'Canada',
    flag: '🇨🇦',
    stage: 'preparation',
    status: 'blocked',
    priority: 'urgent',
    assignee: 'Shakil Hossain',
    verifier: null,
    slaHoursLeft: 0,
    slaState: 'breach',
    openedAt: iso('2026-11-02'),
    value: 380000,
    flags: ['Source-of-funds gap', 'Compliance review'],
  },
  {
    id: 'ac_6',
    caseNumber: 'VH-2026-0198',
    clientName: 'Sadia Islam',
    tenant: 'Islam Advisory',
    service: 'Student visa',
    country: 'Germany',
    flag: '🇩🇪',
    stage: 'verification',
    status: 'on_track',
    priority: 'standard',
    assignee: 'Nusrat Jahan',
    verifier: 'Ayesha Rahman',
    slaHoursLeft: 120,
    slaState: 'ok',
    openedAt: iso('2026-10-25'),
    value: 72000,
    flags: ['APS pending'],
  },
  {
    id: 'ac_7',
    caseNumber: 'VH-2026-0222',
    clientName: 'Mehedi Karim',
    tenant: 'Karim Family',
    service: 'Work visa',
    country: 'United Kingdom',
    flag: '🇬🇧',
    stage: 'intake',
    status: 'needs_action',
    priority: 'high',
    assignee: 'Shakil Hossain',
    verifier: null,
    slaHoursLeft: 18,
    slaState: 'warning',
    openedAt: iso('2026-11-10'),
    value: 95000,
    flags: ['Employer verification required'],
  },
  {
    id: 'ac_8',
    caseNumber: 'VH-2026-0186',
    clientName: 'Nadia Sultana',
    tenant: 'Sultana Group',
    service: 'Visit visa',
    country: 'Thailand',
    flag: '🇹🇭',
    stage: 'decision',
    status: 'completed',
    priority: 'standard',
    assignee: 'Nusrat Jahan',
    verifier: 'Tanvir Ahmed',
    slaHoursLeft: 999,
    slaState: 'ok',
    openedAt: iso('2026-09-30'),
    value: 18000,
    flags: [],
  },
];

export interface VerificationQueueItem {
  id: string;
  caseNumber: string;
  document: string;
  client: string;
  submittedAt: string;
  slaHoursLeft: number;
  priority: 'low' | 'standard' | 'high' | 'urgent';
  agentConfidence: number;
  agentFlags: string[];
  status: 'pending' | 'in_review' | 'approved' | 'returned';
}

export const verificationQueue: VerificationQueueItem[] = [
  {
    id: 'vq_1',
    caseNumber: 'VH-2026-0148',
    document: 'Bank statement (Apr–Sep 2026)',
    client: 'Rafid Hasan',
    submittedAt: iso('2026-11-08'),
    slaHoursLeft: 12,
    priority: 'high',
    agentConfidence: 62,
    agentFlags: ['Final page lacks bank stamp', 'Closing balance mismatch across pages'],
    status: 'pending',
  },
  {
    id: 'vq_2',
    caseNumber: 'VH-2026-0148',
    document: 'Sponsor affidavit — father',
    client: 'Rafid Hasan',
    submittedAt: iso('2026-11-07'),
    slaHoursLeft: 30,
    priority: 'standard',
    agentConfidence: 91,
    agentFlags: ['Notarisation date precedes stamp date'],
    status: 'pending',
  },
  {
    id: 'vq_3',
    caseNumber: 'VH-2026-0203',
    document: 'Sponsor income evidence',
    client: 'Farhana Akter',
    submittedAt: iso('2026-11-07'),
    slaHoursLeft: 5,
    priority: 'urgent',
    agentConfidence: 78,
    agentFlags: ['Employer letter undated', 'Payslip month gap (Aug)'],
    status: 'pending',
  },
  {
    id: 'vq_4',
    caseNumber: 'VH-2026-0198',
    document: 'Academic transcripts',
    client: 'Sadia Islam',
    submittedAt: iso('2026-11-06'),
    slaHoursLeft: 48,
    priority: 'standard',
    agentConfidence: 96,
    agentFlags: [],
    status: 'in_review',
  },
  {
    id: 'vq_5',
    caseNumber: 'VH-2026-0192',
    document: 'Flight itinerary (held booking)',
    client: 'Rafid Hasan',
    submittedAt: iso('2026-11-06'),
    slaHoursLeft: 60,
    priority: 'low',
    agentConfidence: 88,
    agentFlags: ['Booking reference unverified with airline'],
    status: 'pending',
  },
];

export interface AgentRun {
  id: string;
  runId: string;
  agent: string;
  caseNumber: string | null;
  model: string;
  status: 'running' | 'succeeded' | 'awaiting_approval' | 'failed' | 'escalated';
  startedAt: string;
  durationLabel: string;
  tokensIn: number;
  tokensOut: number;
  costUsd: number;
  toolCalls: number;
  summary: string;
}

export const agentRuns: AgentRun[] = [
  {
    id: 'ar_1',
    runId: 'run_01HXT9K2',
    agent: 'A3 Policy & Eligibility',
    caseNumber: 'VH-2026-0148',
    model: 'claude-sonnet-4.5',
    status: 'succeeded',
    startedAt: iso('2026-11-10'),
    durationLabel: '38s',
    tokensIn: 18420,
    tokensOut: 3120,
    costUsd: 0.19,
    toolCalls: 6,
    summary:
      'Re-validated Canada student funds table against IRCC-SP-2024.1. One gap: tuition proof.',
  },
  {
    id: 'ar_2',
    runId: 'run_01HXT9KP',
    agent: 'A5 Verification Assistant',
    caseNumber: 'VH-2026-0203',
    model: 'gemini-2.5-flash',
    status: 'awaiting_approval',
    startedAt: iso('2026-11-10'),
    durationLabel: '21s',
    tokensIn: 9120,
    tokensOut: 1880,
    costUsd: 0.04,
    toolCalls: 4,
    summary:
      'Flagged undated employer letter and August payslip gap. Human verifier approval required.',
  },
  {
    id: 'ar_3',
    runId: 'run_01HXT9QE',
    agent: 'A2 Consultant',
    caseNumber: null,
    model: 'claude-sonnet-4.5',
    status: 'running',
    startedAt: iso('2026-11-10'),
    durationLabel: '00:14',
    tokensIn: 2140,
    tokensOut: 640,
    costUsd: 0.02,
    toolCalls: 2,
    summary:
      'Answering a pricing question from an anonymous website visitor with cited package data.',
  },
  {
    id: 'ar_4',
    runId: 'run_01HXT8ZZ',
    agent: 'A1 Intake',
    caseNumber: 'VH-2026-0222',
    model: 'gpt-4.1-mini',
    status: 'escalated',
    startedAt: iso('2026-11-10'),
    durationLabel: '1m 12s',
    tokensIn: 24800,
    tokensOut: 4210,
    costUsd: 0.08,
    toolCalls: 11,
    summary:
      'Employer sponsor licence could not be verified. Escalated to case manager for manual check.',
  },
  {
    id: 'ar_5',
    runId: 'run_01HXT8A1',
    agent: 'A6 Follow-up',
    caseNumber: 'VH-2026-0203',
    model: 'gpt-4.1-mini',
    status: 'succeeded',
    startedAt: iso('2026-11-09'),
    durationLabel: '9s',
    tokensIn: 4120,
    tokensOut: 980,
    costUsd: 0.01,
    toolCalls: 3,
    summary: 'Sent consent-aware reminder for outstanding marriage certificate translation.',
  },
  {
    id: 'ar_6',
    runId: 'run_01HXT7C4',
    agent: 'Skill: Browser Session',
    caseNumber: 'VH-2026-0198',
    model: 'claude-sonnet-4.5',
    status: 'failed',
    startedAt: iso('2026-11-09'),
    durationLabel: '46s',
    tokensIn: 15800,
    tokensOut: 2100,
    costUsd: 0.14,
    toolCalls: 8,
    summary: 'Portal session blocked by domain allowlist. No retry — requires operator review.',
  },
];

export interface BrowserSession {
  id: string;
  sessionId: string;
  caseNumber: string;
  portal: string;
  operator: string;
  status: 'live' | 'paused' | 'ended' | 'takeover';
  startedAt: string;
  duration: string;
  steps: number;
  lastScreenshot: string;
  guardrails: string[];
}

export const browserSessions: BrowserSession[] = [
  {
    id: 'bs_1',
    sessionId: 'brs_7f3a91',
    caseNumber: 'VH-2026-0198',
    portal: 'uni-assist (Germany)',
    operator: 'Sadia Islam',
    status: 'live',
    startedAt: iso('2026-11-10'),
    duration: '12m 40s',
    steps: 24,
    lastScreenshot: '09:41:22',
    guardrails: [
      'Domain allowlist: uni-assist.de',
      'No credential entry',
      'Screenshot PII redaction',
    ],
  },
  {
    id: 'bs_2',
    sessionId: 'brs_2b8c44',
    caseNumber: 'VH-2026-0071',
    portal: 'UAE MFA attestation portal',
    operator: 'Tanvir Ahmed',
    status: 'paused',
    startedAt: iso('2026-11-10'),
    duration: '4m 05s',
    steps: 9,
    lastScreenshot: '08:58:04',
    guardrails: ['Domain allowlist: mofa.gov.ae', 'Human approval on submit', 'Read-only mode'],
  },
  {
    id: 'bs_3',
    sessionId: 'brs_9d1e07',
    caseNumber: 'VH-2026-0148',
    portal: 'IRCC portal (read-only)',
    operator: 'Ayesha Rahman',
    status: 'ended',
    startedAt: iso('2026-11-09'),
    duration: '18m 12s',
    steps: 31,
    lastScreenshot: '16:22:10',
    guardrails: ['Domain allowlist: canada.ca', 'No form submission', 'Full session recording'],
  },
  {
    id: 'bs_4',
    sessionId: 'brs_5c0a22',
    caseNumber: 'VH-2026-0222',
    portal: 'UKVI employer check',
    operator: 'Shakil Hossain',
    status: 'takeover',
    startedAt: iso('2026-11-10'),
    duration: '7m 31s',
    steps: 14,
    lastScreenshot: '10:03:44',
    guardrails: ['Human takeover active', 'Agent paused', 'Keyboard/mouse routed to operator'],
  },
];

export interface CountryPolicyPack {
  id: string;
  country: string;
  flag: string;
  version: string;
  effectiveFrom: string;
  status: 'published' | 'in_review' | 'draft' | 'expiring';
  routes: number;
  sources: number;
  owner: string;
  updatedAt: string;
  nextReview: string;
}

export const policyPacks: CountryPolicyPack[] = [
  {
    id: 'pp_1',
    country: 'Canada',
    flag: '🇨🇦',
    version: 'IRCC-SP-2024.1',
    effectiveFrom: '2024-01-22',
    status: 'published',
    routes: 3,
    sources: 8,
    owner: 'Tanvir Ahmed',
    updatedAt: iso('2026-11-01'),
    nextReview: '2027-02-01',
  },
  {
    id: 'pp_2',
    country: 'United Kingdom',
    flag: '🇬🇧',
    version: 'HO-SW-2024.3',
    effectiveFrom: '2024-04-04',
    status: 'published',
    routes: 3,
    sources: 11,
    owner: 'Tanvir Ahmed',
    updatedAt: iso('2026-10-28'),
    nextReview: '2027-01-28',
  },
  {
    id: 'pp_3',
    country: 'Germany',
    flag: '🇩🇪',
    version: 'DE-STU-2024.2',
    effectiveFrom: '2024-03-01',
    status: 'in_review',
    routes: 2,
    sources: 6,
    owner: 'Sadia Islam',
    updatedAt: iso('2026-11-05'),
    nextReview: '2026-12-05',
  },
  {
    id: 'pp_4',
    country: 'Schengen Area',
    flag: '🇪🇺',
    version: 'EU-VC-2024.1',
    effectiveFrom: '2024-06-11',
    status: 'published',
    routes: 2,
    sources: 5,
    owner: 'Nusrat Jahan',
    updatedAt: iso('2026-10-20'),
    nextReview: '2027-01-20',
  },
  {
    id: 'pp_5',
    country: 'Australia',
    flag: '🇦🇺',
    version: 'AU-SUB500-2024.2',
    effectiveFrom: '2024-07-01',
    status: 'expiring',
    routes: 2,
    sources: 7,
    owner: 'Tanvir Ahmed',
    updatedAt: iso('2026-10-15'),
    nextReview: '2026-12-01',
  },
  {
    id: 'pp_6',
    country: 'Japan',
    flag: '🇯🇵',
    version: 'JP-VISA-2024.1',
    effectiveFrom: '2024-04-01',
    status: 'draft',
    routes: 2,
    sources: 4,
    owner: 'Sadia Islam',
    updatedAt: iso('2026-09-18'),
    nextReview: '2026-12-18',
  },
];

export interface Partner {
  id: string;
  name: string;
  country: string;
  flag: string;
  type: 'Education agent' | 'Legal counsel' | 'Attestation vendor' | 'Translation partner';
  status: 'active' | 'probation' | 'suspended';
  dueDiligence: 'complete' | 'in_progress' | 'overdue';
  activeCases: number;
  rating: number;
  contractRenewal: string;
  contact: string;
}

export const partners: Partner[] = [
  {
    id: 'pt_1',
    name: 'Maple Education Partners',
    country: 'Canada',
    flag: '🇨🇦',
    type: 'Education agent',
    status: 'active',
    dueDiligence: 'complete',
    activeCases: 14,
    rating: 4.8,
    contractRenewal: '2027-03-31',
    contact: 'partners@maple-edu.example',
  },
  {
    id: 'pt_2',
    name: 'Thames Legal LLP',
    country: 'United Kingdom',
    flag: '🇬🇧',
    type: 'Legal counsel',
    status: 'active',
    dueDiligence: 'complete',
    activeCases: 6,
    rating: 4.6,
    contractRenewal: '2027-01-15',
    contact: 'uk@thameslegal.example',
  },
  {
    id: 'pt_3',
    name: 'Rhein Study Bridge',
    country: 'Germany',
    flag: '🇩🇪',
    type: 'Education agent',
    status: 'probation',
    dueDiligence: 'in_progress',
    activeCases: 3,
    rating: 4.1,
    contractRenewal: '2026-12-31',
    contact: 'info@rheinbridge.example',
  },
  {
    id: 'pt_4',
    name: 'Gulf Attestation Services',
    country: 'UAE',
    flag: '🇦🇪',
    type: 'Attestation vendor',
    status: 'active',
    dueDiligence: 'complete',
    activeCases: 22,
    rating: 4.7,
    contractRenewal: '2027-06-30',
    contact: 'ops@gulfattest.example',
  },
  {
    id: 'pt_5',
    name: 'Lingua Certified Translations',
    country: 'Bangladesh',
    flag: '🇧🇩',
    type: 'Translation partner',
    status: 'active',
    dueDiligence: 'overdue',
    activeCases: 31,
    rating: 4.4,
    contractRenewal: '2026-11-30',
    contact: 'translate@lingua.example',
  },
  {
    id: 'pt_6',
    name: 'Southern Cross Migration',
    country: 'Australia',
    flag: '🇦🇺',
    type: 'Legal counsel',
    status: 'suspended',
    dueDiligence: 'overdue',
    activeCases: 0,
    rating: 3.2,
    contractRenewal: '2026-11-15',
    contact: '—',
  },
];

export interface AdminInvoice {
  id: string;
  number: string;
  client: string;
  caseNumber: string;
  amount: number;
  status: 'paid' | 'due' | 'overdue' | 'refunded' | 'partial';
  issuedAt: string;
  dueAt: string | null;
  method: string | null;
  reconciliation: 'matched' | 'pending' | 'exception';
}

export const adminInvoices: AdminInvoice[] = [
  {
    id: 'ai_1',
    number: 'INV-2026-1088',
    client: 'Farhana Akter',
    caseNumber: 'VH-2026-0203',
    amount: 22500,
    status: 'overdue',
    issuedAt: iso('2026-11-01'),
    dueAt: iso('2026-11-20'),
    method: null,
    reconciliation: 'pending',
  },
  {
    id: 'ai_2',
    number: 'INV-2026-1042',
    client: 'Rafid Hasan',
    caseNumber: 'VH-2026-0148',
    amount: 22500,
    status: 'paid',
    issuedAt: iso('2026-10-12'),
    dueAt: iso('2026-10-26'),
    method: 'bKash',
    reconciliation: 'matched',
  },
  {
    id: 'ai_3',
    number: 'INV-2026-1107',
    client: 'Imran Chowdhury',
    caseNumber: 'VH-2026-0211',
    amount: 190000,
    status: 'partial',
    issuedAt: iso('2026-11-05'),
    dueAt: iso('2026-11-19'),
    method: 'Bank transfer',
    reconciliation: 'exception',
  },
  {
    id: 'ai_4',
    number: 'INV-2026-0971',
    client: 'Rafid Hasan',
    caseNumber: 'VH-2026-0192',
    amount: 15000,
    status: 'paid',
    issuedAt: iso('2026-10-18'),
    dueAt: iso('2026-10-18'),
    method: 'Card',
    reconciliation: 'matched',
  },
  {
    id: 'ai_5',
    number: 'INV-2026-1160',
    client: 'Mehedi Karim',
    caseNumber: 'VH-2026-0222',
    amount: 47500,
    status: 'due',
    issuedAt: iso('2026-11-10'),
    dueAt: iso('2026-11-24'),
    method: null,
    reconciliation: 'pending',
  },
  {
    id: 'ai_6',
    number: 'INV-2026-0512',
    client: 'Rafid Hasan',
    caseNumber: 'VH-2026-0071',
    amount: 1200,
    status: 'refunded',
    issuedAt: iso('2026-09-20'),
    dueAt: iso('2026-09-20'),
    method: 'bKash',
    reconciliation: 'matched',
  },
  {
    id: 'ai_7',
    number: 'INV-2026-1188',
    client: 'Sadia Islam',
    caseNumber: 'VH-2026-0198',
    amount: 36000,
    status: 'paid',
    issuedAt: iso('2026-11-08'),
    dueAt: iso('2026-11-22'),
    method: 'bKash',
    reconciliation: 'exception',
  },
];

export interface AdminTask {
  id: string;
  title: string;
  caseNumber: string | null;
  owner: string;
  role: string;
  status: 'todo' | 'in_progress' | 'blocked' | 'done';
  priority: 'low' | 'standard' | 'high' | 'urgent';
  dueIn: string;
  slaState: 'ok' | 'warning' | 'breach';
}

export const adminTasks: AdminTask[] = [
  {
    id: 'at_1',
    title: 'Re-verify stamped bank statement',
    caseNumber: 'VH-2026-0148',
    owner: 'Tanvir Ahmed',
    role: 'verifier',
    status: 'in_progress',
    priority: 'high',
    dueIn: 'in 1 day',
    slaState: 'warning',
  },
  {
    id: 'at_2',
    title: 'Chase marriage certificate translation',
    caseNumber: 'VH-2026-0203',
    owner: 'Ayesha Rahman',
    role: 'case_manager',
    status: 'blocked',
    priority: 'urgent',
    dueIn: 'overdue 4h',
    slaState: 'breach',
  },
  {
    id: 'at_3',
    title: 'Approve source-of-funds dossier draft',
    caseNumber: 'VH-2026-0211',
    owner: 'Shakil Hossain',
    role: 'owner',
    status: 'todo',
    priority: 'urgent',
    dueIn: 'today',
    slaState: 'breach',
  },
  {
    id: 'at_4',
    title: 'Reconcile INV-2026-1107 partial payment',
    caseNumber: 'VH-2026-0211',
    owner: 'Farhan Kabir',
    role: 'finance',
    status: 'todo',
    priority: 'high',
    dueIn: 'in 2 days',
    slaState: 'warning',
  },
  {
    id: 'at_5',
    title: 'Review Germany policy pack v2024.2 changes',
    caseNumber: null,
    owner: 'Sadia Islam',
    role: 'policy_editor',
    status: 'todo',
    priority: 'standard',
    dueIn: 'in 5 days',
    slaState: 'ok',
  },
  {
    id: 'at_6',
    title: 'Partner due diligence — Lingua Certified',
    caseNumber: null,
    owner: 'Nusrat Jahan',
    role: 'admin',
    status: 'in_progress',
    priority: 'high',
    dueIn: 'in 3 days',
    slaState: 'ok',
  },
  {
    id: 'at_7',
    title: 'Publish Canada policy pack diff to staging',
    caseNumber: null,
    owner: 'Tanvir Ahmed',
    role: 'policy_editor',
    status: 'done',
    priority: 'standard',
    dueIn: 'completed',
    slaState: 'ok',
  },
];

export interface AuditEntry {
  id: string;
  at: string;
  actor: string;
  role: string;
  action: string;
  entity: string;
  ip: string;
  outcome: 'allowed' | 'denied' | 'reviewed';
  detail: string;
}

export const auditEntries: AuditEntry[] = [
  {
    id: 'au_1',
    at: iso('2026-11-10'),
    actor: 'Tanvir Ahmed',
    role: 'verifier',
    action: 'document.view',
    entity: 'doc_5 / VH-2026-0148',
    ip: '103.230.12.44',
    outcome: 'allowed',
    detail: 'Signed URL issued, 5-minute TTL.',
  },
  {
    id: 'au_2',
    at: iso('2026-11-10'),
    actor: 'Ayesha Rahman',
    role: 'case_manager',
    action: 'case.stage.change',
    entity: 'VH-2026-0203',
    ip: '103.230.12.51',
    outcome: 'allowed',
    detail: 'Stage remained document_collection; note added.',
  },
  {
    id: 'au_3',
    at: iso('2026-11-10'),
    actor: 'unknown',
    role: 'client (attempted)',
    action: 'case.read',
    entity: 'VH-2026-0148',
    ip: '45.115.84.230',
    outcome: 'denied',
    detail: 'Cross-tenant attempt blocked by RLS policy tenant_isolation.',
  },
  {
    id: 'au_4',
    at: iso('2026-11-09'),
    actor: 'Farhan Kabir',
    role: 'finance',
    action: 'refund.approve.request',
    entity: 'INV-2026-0512',
    ip: '103.230.12.77',
    outcome: 'reviewed',
    detail: 'Requested owner approval; refund BDT 1,200.',
  },
  {
    id: 'au_5',
    at: iso('2026-11-09'),
    actor: 'Sadia Islam',
    role: 'policy_editor',
    action: 'policy.publish',
    entity: 'DE-STU-2024.2',
    ip: '103.230.12.19',
    outcome: 'denied',
    detail: 'Publish blocked: pack still has 2 unreviewed sources.',
  },
  {
    id: 'au_6',
    at: iso('2026-11-09'),
    actor: 'Browser Operator (bot)',
    role: 'browser_operator',
    action: 'browser.session.create',
    entity: 'brs_7f3a91',
    ip: '10.0.4.18',
    outcome: 'allowed',
    detail: 'Session opened under uni-assist.de allowlist.',
  },
  {
    id: 'au_7',
    at: iso('2026-11-08'),
    actor: 'Shakil Hossain',
    role: 'owner',
    action: 'github.pr.create',
    entity: 'PR #128',
    ip: '103.230.12.10',
    outcome: 'allowed',
    detail: 'Branch feature/policy-pack-germany; CI queued.',
  },
  {
    id: 'au_8',
    at: iso('2026-11-08'),
    actor: 'Super Main Agent',
    role: 'agent',
    action: 'migration.apply',
    entity: '20261108_add_policy_version',
    ip: '10.0.4.31',
    outcome: 'denied',
    detail: 'Protected action requires human approval — approval gate enforced.',
  },
];

export interface AdminNotification {
  id: string;
  title: string;
  body: string;
  at: string;
  tone: 'danger' | 'warning' | 'info' | 'success' | 'brand';
  unread: boolean;
  scope: string;
}

export const adminNotifications: AdminNotification[] = [
  {
    id: 'an_1',
    title: 'SLA breach — VH-2026-0203',
    body: 'Marriage certificate translation outstanding for 4 hours past SLA.',
    at: iso('2026-11-10'),
    tone: 'danger',
    unread: true,
    scope: 'Case queue',
  },
  {
    id: 'an_2',
    title: 'Cross-tenant access denied',
    body: 'A client attempt to read a foreign case was blocked by RLS.',
    at: iso('2026-11-10'),
    tone: 'warning',
    unread: true,
    scope: 'Security',
  },
  {
    id: 'an_3',
    title: '5 documents awaiting verification',
    body: 'One item is within 6 hours of SLA breach.',
    at: iso('2026-11-10'),
    tone: 'info',
    unread: true,
    scope: 'Verification',
  },
  {
    id: 'an_4',
    title: 'Australia policy pack expiring',
    body: 'AU-SUB500-2024.2 needs review before 1 Dec 2026.',
    at: iso('2026-11-09'),
    tone: 'warning',
    unread: false,
    scope: 'Policies',
  },
  {
    id: 'an_5',
    title: 'Reconciliation exception cleared',
    body: 'INV-2026-1188 matched to bKash settlement batch 2261.',
    at: iso('2026-11-08'),
    tone: 'success',
    unread: false,
    scope: 'Finance',
  },
];

/* ================================================================== */
/* Derived helpers                                                    */
/* ================================================================== */
export const clientKpis = {
  activeCases: clientCases.filter((c) => c.status !== 'completed').length,
  actionsRequired: clientCases.filter((c) => c.status === 'needs_action' || c.status === 'at_risk')
    .length,
  documentsVerified: clientCases.reduce(
    (sum, c) => sum + c.documents.filter((d) => d.status === 'verified').length,
    0,
  ),
  outstanding: clientInvoices
    .filter((i) => i.status === 'due')
    .reduce((sum, i) => sum + i.amount, 0),
};

export const adminKpis = {
  openCases: adminCases.filter((c) => c.status !== 'completed').length,
  slaAtRisk: adminCases.filter((c) => c.slaState !== 'ok').length,
  pendingVerifications: verificationQueue.filter((v) => v.status !== 'approved').length,
  monthlyRevenue: adminInvoices
    .filter((i) => i.status === 'paid' || i.status === 'partial')
    .reduce((sum, i) => sum + i.amount, 0),
  activeAgentRuns: agentRuns.filter((r) => r.status === 'running').length,
  liveSessions: browserSessions.filter((s) => s.status === 'live' || s.status === 'takeover')
    .length,
  overdueInvoices: adminInvoices.filter((i) => i.status === 'overdue').length,
  policyReviewsDue: policyPacks.filter((p) => p.status === 'expiring' || p.status === 'in_review')
    .length,
};

export function formatMoney(value: number, currency = 'BDT'): string {
  return new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(value: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));
}

export function formatDateTime(value: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}
