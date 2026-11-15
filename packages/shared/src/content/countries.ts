/**
 * VisaHobe — Country & Visa-Route Guide Content
 *
 * Blueprint v2.0 Phase 1 requires "Country and visa-type guides" with policy
 * source references and effective dates. Every guide here carries the
 * `policySources` metadata that the A3 Policy & Eligibility Agent must cite
 * (Blueprint §4.3: "Source citations, effective dates and uncertainty").
 */

export type RiskLevel = 'low' | 'moderate' | 'elevated';

export interface PolicySource {
  title: string;
  publisher: string;
  url: string;
  effectiveFrom: string;
  version: string;
}

export interface VisaRoute {
  id: string;
  name: string;
  purpose: string;
  typicalDuration: string;
  serviceSlug: string;
  keyRequirements: string[];
}

export interface CountryGuide {
  slug: string;
  name: string;
  nameBn: string;
  flag: string;
  region: string;
  summary: string;
  intro: string;
  processingWindow: string;
  successProfile: string[];
  routes: VisaRoute[];
  keyFacts: { label: string; value: string }[];
  riskLevel: RiskLevel;
  costRange: { service: string; official: string };
  policySources: PolicySource[];
  lastReviewed: string;
  popularFor: string[];
}

export const countryGuides: CountryGuide[] = [
  {
    slug: 'canada',
    name: 'Canada',
    nameBn: 'কানাডা',
    flag: '🇨🇦',
    region: 'North America',
    summary: 'Study, work and permanent-residence pathways with strict financial documentation.',
    intro:
      'Canada rewards documentation discipline. Study permit, work permit and family routes all hinge on credible financial evidence, a clear purpose of travel and consistent identity records. Our Canada policy pack tracks IRCC updates and provincial nomination changes.',
    processingWindow: '8–24 weeks depending on route and visa office',
    successProfile: [
      'Clean 12-month financial history with traceable sources',
      'Programme or role that plausibly matches prior education/experience',
      'Strong ties evidence for temporary routes',
      'Consistent names and dates across all identity records',
    ],
    routes: [
      {
        id: 'ca-study',
        name: 'Study Permit',
        purpose: 'Full-time study at a designated learning institution',
        typicalDuration: 'Programme length + 90 days',
        serviceSlug: 'student-visa',
        keyRequirements: [
          'Letter of acceptance from a DLI',
          'Proof of tuition and living funds',
          'Provincial attestation letter where applicable',
          'Medical exam and biometrics',
        ],
      },
      {
        id: 'ca-work',
        name: 'Work Permit',
        purpose: 'Employer-specific or open work authorisation',
        typicalDuration: 'Contract length (up to route maximum)',
        serviceSlug: 'work-visa',
        keyRequirements: [
          'Verified employer and LMIA or exempt category',
          'Qualification evidence for the role',
          'Medical and police clearances where required',
        ],
      },
      {
        id: 'ca-family',
        name: 'Family Sponsorship',
        purpose: 'Spouse, partner or dependant reunification',
        typicalDuration: 'Permanent residence',
        serviceSlug: 'family-dependant-visa',
        keyRequirements: [
          'Relationship evidence and chronology',
          'Sponsor status and income evidence',
          'Identity and civil documents with translation',
        ],
      },
    ],
    keyFacts: [
      { label: 'Biometrics', value: 'Required for most applicants aged 14–79' },
      { label: 'Medical exam', value: 'Required for study/work over 6 months' },
      { label: 'Financial proof', value: 'Tuition + living cost evidence per IRCC tables' },
      { label: 'Language', value: 'IELTS/CELPIP/PTE for study and most work routes' },
    ],
    riskLevel: 'moderate',
    costRange: {
      service: 'BDT 45,000 – 150,000',
      official: 'CAD 150 study permit + biometrics CAD 85',
    },
    policySources: [
      {
        title: 'Study permit requirements',
        publisher: 'IRCC',
        url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html',
        effectiveFrom: '2024-01-22',
        version: 'IRCC-SP-2024.1',
      },
      {
        title: 'Work permit overview',
        publisher: 'IRCC',
        url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada.html',
        effectiveFrom: '2024-10-01',
        version: 'IRCC-WP-2024.4',
      },
    ],
    lastReviewed: '2026-11-01',
    popularFor: ['Study permits', 'Family sponsorship', 'Provincial nomination'],
  },
  {
    slug: 'uk',
    name: 'United Kingdom',
    nameBn: 'যুক্তরাজ্য',
    flag: '🇬🇧',
    region: 'Europe',
    summary: 'Points-based routes with strict credibility and finance evidence rules.',
    intro:
      'The UK points-based system is transparent on paper and unforgiving in practice: maintenance funds must sit for the required period, sponsor licences must be valid, and credibility interviews test whether the stated purpose is genuine.',
    processingWindow: '3–12 weeks depending on route',
    successProfile: [
      'Funds held for the full required period, in the right account type',
      'Valid sponsor licence and CAS/CoS reference',
      'Credible study or work narrative',
      'Accurate immigration history disclosure',
    ],
    routes: [
      {
        id: 'uk-student',
        name: 'Student Route',
        purpose: 'Degree-level study at a licensed sponsor',
        typicalDuration: 'Course length + 4 months',
        serviceSlug: 'student-visa',
        keyRequirements: [
          'CAS from a licensed student sponsor',
          'Maintenance funds for the required period',
          'English language evidence at the required level',
          'ATAS clearance for certain subjects',
        ],
      },
      {
        id: 'uk-skilled-worker',
        name: 'Skilled Worker',
        purpose: 'Eligible role with a licensed sponsor',
        typicalDuration: 'Up to 5 years, renewable',
        serviceSlug: 'work-visa',
        keyRequirements: [
          'CoS from a licensed sponsor',
          'Salary at or above the route threshold',
          'English language evidence',
          'Immigration health surcharge payment',
        ],
      },
      {
        id: 'uk-visitor',
        name: 'Standard Visitor',
        purpose: 'Tourism, family visits and permitted business activity',
        typicalDuration: 'Up to 6 months',
        serviceSlug: 'visit-visa',
        keyRequirements: [
          'Credible itinerary and purpose',
          'Funds evidence',
          'Ties to home country',
        ],
      },
    ],
    keyFacts: [
      {
        label: 'Maintenance funds',
        value: 'Held for 28 consecutive days, statement within 31 days',
      },
      { label: 'IHS', value: 'Immigration Health Surcharge applies to most routes >6 months' },
      { label: 'TB test', value: 'Required for applicants residing in Bangladesh' },
      { label: 'Biometrics', value: 'VFS centre appointment required' },
    ],
    riskLevel: 'moderate',
    costRange: {
      service: 'BDT 45,000 – 150,000',
      official: '£490 student visa + £776/year IHS',
    },
    policySources: [
      {
        title: 'Student route guidance',
        publisher: 'UK Home Office',
        url: 'https://www.gov.uk/student-visa',
        effectiveFrom: '2024-01-01',
        version: 'HO-STU-2024.2',
      },
      {
        title: 'Skilled Worker guidance',
        publisher: 'UK Home Office',
        url: 'https://www.gov.uk/skilled-worker-visa',
        effectiveFrom: '2024-04-04',
        version: 'HO-SW-2024.3',
      },
    ],
    lastReviewed: '2026-10-28',
    popularFor: ['Student route', 'Skilled Worker', 'Visitor visas'],
  },
  {
    slug: 'schengen',
    name: 'Schengen Area',
    nameBn: 'শেনজেন',
    flag: '🇪🇺',
    region: 'Europe',
    summary: '27-country short-stay area with a single, strict application dossier.',
    intro:
      'One Schengen visa opens 27 countries, but the dossier is unforgiving: travel insurance at the correct coverage, itinerary consistency and proof of accommodation must align exactly with the declared dates.',
    processingWindow: '15–45 calendar days',
    successProfile: [
      'Itinerary that matches bookings day-for-day',
      'Insurance meeting the minimum coverage requirement',
      'Financial evidence proportionate to trip length',
      'Clear ties and return intent',
    ],
    routes: [
      {
        id: 'eu-short-stay',
        name: 'Short-Stay (Type C)',
        purpose: 'Tourism, family visit, short business activity',
        typicalDuration: 'Up to 90 days in any 180-day period',
        serviceSlug: 'visit-visa',
        keyRequirements: [
          'Completed application and biometrics',
          'Travel insurance with €30,000 minimum coverage',
          'Accommodation and itinerary evidence',
          'Funds evidence and employment proof',
        ],
      },
      {
        id: 'eu-student',
        name: 'National Student Visa',
        purpose: 'Long-stay study in a Schengen member state',
        typicalDuration: 'Programme length',
        serviceSlug: 'student-visa',
        keyRequirements: [
          'University admission letter',
          'Blocked account or sponsor evidence (country-specific)',
          'Health insurance',
          'Accommodation proof',
        ],
      },
    ],
    keyFacts: [
      { label: 'Insurance', value: 'Minimum €30,000 medical coverage, all Schengen states' },
      { label: 'Application window', value: 'Up to 6 months before travel' },
      { label: 'Main destination rule', value: 'Apply where you will spend the most nights' },
      { label: 'Biometrics', value: 'Valid 59 months once enrolled' },
    ],
    riskLevel: 'elevated',
    costRange: {
      service: 'BDT 15,000 – 60,000',
      official: '€90 short-stay adult fee',
    },
    policySources: [
      {
        title: 'Schengen Visa Code',
        publisher: 'European Commission',
        url: 'https://home-affairs.ec.europa.eu/policies/schengen-borders-and-visa/visa-policy_en',
        effectiveFrom: '2024-06-11',
        version: 'EU-VC-2024.1',
      },
    ],
    lastReviewed: '2026-10-20',
    popularFor: ['Tourism', 'Family visits', 'Business travel'],
  },
  {
    slug: 'germany',
    name: 'Germany',
    nameBn: 'জার্মানি',
    flag: '🇩🇪',
    region: 'Europe',
    summary: 'Blocked-account study routes and the Opportunity Card for skilled workers.',
    intro:
      'Germany has become a leading destination for Bangladeshi students and skilled professionals. The blocked account, APS certificate and qualification recognition are the three bottlenecks our policy pack tracks continuously.',
    processingWindow: '6–16 weeks',
    successProfile: [
      'APS certificate secured before application',
      'Blocked account funded at the current annual rate',
      'Recognised or assessed qualification',
      'Appointment slot secured with complete dossier',
    ],
    routes: [
      {
        id: 'de-student',
        name: 'Student Visa',
        purpose: 'Bachelor, Master or preparatory study',
        typicalDuration: 'Programme length',
        serviceSlug: 'student-visa',
        keyRequirements: [
          'Admission letter or conditional offer',
          'Blocked account at the current rate',
          'APS certificate',
          'Health insurance and accommodation proof',
        ],
      },
      {
        id: 'de-opportunity',
        name: 'Opportunity Card',
        purpose: 'Job search for recognised skilled workers',
        typicalDuration: 'Up to 12 months',
        serviceSlug: 'work-visa',
        keyRequirements: [
          'Recognised qualification or points threshold',
          'Funds evidence or job offer',
          'Language evidence (German or English)',
        ],
      },
    ],
    keyFacts: [
      { label: 'Blocked account', value: '€11,904 per year (2025 baseline — verify current)' },
      { label: 'APS', value: 'Mandatory for Bangladeshi applicants' },
      { label: 'Language', value: 'German B1–C1 for most programmes; English tracks vary' },
      { label: 'Recognition', value: 'anabin entry or Statement of Comparability' },
    ],
    riskLevel: 'moderate',
    costRange: {
      service: 'BDT 45,000 – 120,000',
      official: '€75 visa fee + blocked account',
    },
    policySources: [
      {
        title: 'National visa for study',
        publisher: 'German Federal Foreign Office',
        url: 'https://www.auswaertiges-amt.de/en/visa-service',
        effectiveFrom: '2024-03-01',
        version: 'DE-STU-2024.2',
      },
      {
        title: 'Opportunity Card',
        publisher: 'Make it in Germany',
        url: 'https://www.make-it-in-germany.com/en/visa-residence/types/opportunity-card',
        effectiveFrom: '2024-06-01',
        version: 'DE-OC-2024.1',
      },
    ],
    lastReviewed: '2026-11-05',
    popularFor: ['Study', 'Opportunity Card', 'Skilled work'],
  },
  {
    slug: 'australia',
    name: 'Australia',
    nameBn: 'অস্ট্রেলিয়া',
    flag: '🇦🇺',
    region: 'Oceania',
    summary: 'Points-tested skilled migration and regulated student visas.',
    intro:
      'Australia is a points system with a documentation audit attached. Genuine Temporary Entrant evidence decides most student cases, while skilled migration depends on occupation lists and skills assessment outcomes.',
    processingWindow: '4–20 weeks',
    successProfile: [
      'Strong GTE statement tied to real career trajectory',
      'Funds and income evidence matching declared sources',
      'Skills assessment completed where required',
      'Health and character checks cleared early',
    ],
    routes: [
      {
        id: 'au-student',
        name: 'Student Visa (500)',
        purpose: 'Full-time study at a registered provider',
        typicalDuration: 'Course length',
        serviceSlug: 'student-visa',
        keyRequirements: [
          'CoE from a CRICOS provider',
          'Genuine Student (GS) evidence',
          'OSHC health cover',
          'Funds evidence',
        ],
      },
      {
        id: 'au-skilled',
        name: 'Skilled (189/190/491)',
        purpose: 'Points-based permanent or provisional migration',
        typicalDuration: 'Permanent or 5 years',
        serviceSlug: 'work-visa',
        keyRequirements: [
          'Occupation on the relevant list',
          'Positive skills assessment',
          'Points threshold and EOI invitation',
          'English at competent level minimum',
        ],
      },
    ],
    keyFacts: [
      { label: 'OSHC', value: 'Overseas Student Health Cover for full course duration' },
      { label: 'GTE/GS', value: 'Genuine Student requirement applies to all student applicants' },
      { label: 'Skills assessment', value: 'Required before EOI for most occupations' },
      { label: 'Health', value: 'Medical examination by panel physician' },
    ],
    riskLevel: 'moderate',
    costRange: {
      service: 'BDT 65,000 – 180,000',
      official: 'AUD 1,600 student visa fee',
    },
    policySources: [
      {
        title: 'Student visa (subclass 500)',
        publisher: 'Department of Home Affairs',
        url: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500',
        effectiveFrom: '2024-07-01',
        version: 'AU-SUB500-2024.2',
      },
    ],
    lastReviewed: '2026-10-15',
    popularFor: ['Study', 'Skilled migration', 'Graduate visas'],
  },
  {
    slug: 'uae',
    name: 'United Arab Emirates',
    nameBn: 'সংযুক্ত আরব আমিরাত',
    flag: '🇦🇪',
    region: 'Middle East',
    summary: 'Fast employment and visit processing with attestation-heavy documentation.',
    intro:
      'UAE processing is quick but documentation-dependent: degree attestation, medical fitness and Emirates ID steps must run in the right order. Our Attestation service usually runs in parallel with the visa file.',
    processingWindow: '1–4 weeks',
    successProfile: [
      'Complete attested qualification documents',
      'Verified employer and offer letter',
      'Medical fitness test cleared',
      'Correct entry permit category',
    ],
    routes: [
      {
        id: 'ae-employment',
        name: 'Employment Visa',
        purpose: 'Sponsored employment',
        typicalDuration: '2 years, renewable',
        serviceSlug: 'work-visa',
        keyRequirements: [
          'Employer entry permit',
          'Attested degree or diploma',
          'Medical fitness test',
          'Emirates ID registration',
        ],
      },
      {
        id: 'ae-visit',
        name: 'Visit Visa',
        purpose: 'Tourism and family visits',
        typicalDuration: '30 or 60 days',
        serviceSlug: 'visit-visa',
        keyRequirements: [
          'Passport validity 6+ months',
          'Return ticket',
          'Funds or host sponsorship',
        ],
      },
    ],
    keyFacts: [
      { label: 'Attestation', value: 'Degree attestation required for skilled roles' },
      { label: 'Medical', value: 'Fitness test mandatory before residence stamping' },
      { label: 'Emirates ID', value: 'Biometrics appointment within 30 days of entry' },
      { label: 'Insurance', value: 'Basic health insurance mandatory for employment' },
    ],
    riskLevel: 'low',
    costRange: {
      service: 'BDT 25,000 – 90,000',
      official: 'Employer typically covers permit fees',
    },
    policySources: [
      {
        title: 'Employment visas',
        publisher: 'UAE Government Portal',
        url: 'https://u.ae/en/information-and-services/visa-and-emirates-id',
        effectiveFrom: '2024-01-01',
        version: 'AE-VISA-2024.1',
      },
    ],
    lastReviewed: '2026-10-10',
    popularFor: ['Employment', 'Visit visas', 'Business setup'],
  },
  {
    slug: 'malaysia',
    name: 'Malaysia',
    nameBn: 'মালয়েশিয়া',
    flag: '🇲🇾',
    region: 'Southeast Asia',
    summary: 'Accessible study and visit routes with EMGS-tracked student processing.',
    intro:
      'Malaysia is one of the most accessible destinations for Bangladeshi applicants. Student processing runs through EMGS, so the institution’s EMGS application status determines the visa timeline.',
    processingWindow: '2–8 weeks',
    successProfile: [
      'EMGS approval before visa application',
      'Institution-issued offer letter',
      'Financial evidence matching programme fees',
      'Medical screening report',
    ],
    routes: [
      {
        id: 'my-student',
        name: 'Student Pass',
        purpose: 'Study at a Malaysian institution',
        typicalDuration: 'Programme length',
        serviceSlug: 'student-visa',
        keyRequirements: [
          'EMGS application and approval',
          'Offer letter',
          'Medical screening',
          'Financial evidence',
        ],
      },
      {
        id: 'my-visit',
        name: 'Social Visit Pass',
        purpose: 'Tourism and family visits',
        typicalDuration: '30 days',
        serviceSlug: 'visit-visa',
        keyRequirements: ['Return ticket', 'Accommodation evidence', 'Funds evidence'],
      },
    ],
    keyFacts: [
      { label: 'EMGS', value: 'Education Malaysia Global Services processes student passes' },
      { label: 'Medical', value: 'Screening mandatory within 7 days of arrival' },
      { label: 'Financial', value: 'Evidence must cover tuition and living costs' },
      { label: 'Validity', value: 'Passport 12+ months recommended' },
    ],
    riskLevel: 'low',
    costRange: {
      service: 'BDT 25,000 – 75,000',
      official: 'EMGS processing fee + visa fee',
    },
    policySources: [
      {
        title: 'Student pass process',
        publisher: 'EMGS',
        url: 'https://educationmalaysia.gov.my/',
        effectiveFrom: '2024-02-01',
        version: 'MY-EMGS-2024.1',
      },
    ],
    lastReviewed: '2026-09-30',
    popularFor: ['Study', 'Short visits'],
  },
  {
    slug: 'thailand',
    name: 'Thailand',
    nameBn: 'থাইল্যান্ড',
    flag: '🇹🇭',
    region: 'Southeast Asia',
    summary: 'Tourist and education routes with an e-visa-first application model.',
    intro:
      'Thailand has moved most Bangladeshi applicants to an e-visa system. The dossier is compact but funds evidence and itinerary credibility still decide outcomes.',
    processingWindow: '7–20 business days',
    successProfile: [
      'Complete e-visa application with clear itinerary',
      'Funds evidence proportionate to stay',
      'Employment or business ties',
      'Consistent travel history disclosure',
    ],
    routes: [
      {
        id: 'th-tourist',
        name: 'Tourist Visa (TR)',
        purpose: 'Tourism',
        typicalDuration: '60 days',
        serviceSlug: 'visit-visa',
        keyRequirements: ['Itinerary and accommodation', 'Funds evidence', 'Employment proof'],
      },
      {
        id: 'th-education',
        name: 'Education Visa (Non-ED)',
        purpose: 'Study or recognised course',
        typicalDuration: '90 days, extendable',
        serviceSlug: 'student-visa',
        keyRequirements: ['Institution acceptance', 'Funds evidence', 'Programme details'],
      },
    ],
    keyFacts: [
      { label: 'E-visa', value: 'Online application through the official portal' },
      { label: 'Funds', value: 'Evidence per current e-visa guidance' },
      { label: 'Insurance', value: 'Recommended; required for some categories' },
      { label: 'Overstay', value: 'Strictly enforced — plan extensions in advance' },
    ],
    riskLevel: 'low',
    costRange: {
      service: 'BDT 12,000 – 35,000',
      official: 'THB 1,000–2,000 single entry',
    },
    policySources: [
      {
        title: 'Thai e-visa',
        publisher: 'Ministry of Foreign Affairs, Thailand',
        url: 'https://www.thaievisa.go.th/',
        effectiveFrom: '2024-01-01',
        version: 'TH-EVISA-2024.1',
      },
    ],
    lastReviewed: '2026-09-22',
    popularFor: ['Tourism', 'Short courses', 'Medical travel'],
  },
  {
    slug: 'usa',
    name: 'United States',
    nameBn: 'যুক্তরাষ্ট্র',
    flag: '🇺🇸',
    region: 'North America',
    summary: 'Interview-driven applications where DS-160 accuracy is decisive.',
    intro:
      'US visa outcomes are decided at interview, and the interview is decided by the DS-160 and supporting evidence. Our preparation focuses on institutional documentation, financial clarity and consistent answers.',
    processingWindow: 'Interview wait times vary widely by post',
    successProfile: [
      'DS-160 completed without inconsistency',
      'I-20 or DS-2019 issued and verified',
      'SEVIS fee paid and evidenced',
      'Clear non-immigrant intent narrative',
    ],
    routes: [
      {
        id: 'us-f1',
        name: 'F-1 Student',
        purpose: 'Academic study at a SEVP-certified school',
        typicalDuration: 'Programme length (D/S)',
        serviceSlug: 'student-visa',
        keyRequirements: [
          'I-20 and SEVIS fee',
          'Financial evidence',
          'Interview at a US embassy',
          'Ties evidence',
        ],
      },
      {
        id: 'us-b1b2',
        name: 'B-1/B-2 Visitor',
        purpose: 'Business or tourism visits',
        typicalDuration: 'Up to 6 months per entry',
        serviceSlug: 'visit-visa',
        keyRequirements: ['DS-160', 'Interview', 'Funds and ties evidence', 'Travel itinerary'],
      },
    ],
    keyFacts: [
      { label: 'SEVIS', value: 'I-901 fee must be paid before the interview' },
      { label: 'Interview', value: 'Required for most applicants; waiver cases are limited' },
      { label: 'Validity', value: 'Multiple-entry validity varies by nationality' },
      { label: 'Timing', value: 'Apply early — appointment queues can be long' },
    ],
    riskLevel: 'elevated',
    costRange: {
      service: 'BDT 40,000 – 120,000',
      official: 'USD 185 MRV fee + SEVIS USD 350',
    },
    policySources: [
      {
        title: 'Student visa (F-1)',
        publisher: 'U.S. Department of State',
        url: 'https://travel.state.gov/content/travel/en/us-visas/study.html',
        effectiveFrom: '2024-01-01',
        version: 'US-F1-2024.1',
      },
    ],
    lastReviewed: '2026-10-05',
    popularFor: ['F-1 study', 'Visitor visas', 'Exchange programmes'],
  },
  {
    slug: 'japan',
    name: 'Japan',
    nameBn: 'জাপান',
    flag: '🇯🇵',
    region: 'East Asia',
    summary: 'Certificate of Eligibility-led study and skilled work routes.',
    intro:
      'Japan processes through a Certificate of Eligibility (COE) issued by the sponsor before the visa application. Language preparation and sponsor reliability dominate outcomes.',
    processingWindow: '4–12 weeks after COE',
    successProfile: [
      'COE issued by a recognised institution or employer',
      'Japanese language evidence matching the route',
      'Financial sponsor documentation',
      'Consistent academic or employment history',
    ],
    routes: [
      {
        id: 'jp-student',
        name: 'Student Visa',
        purpose: 'Language school, college or university study',
        typicalDuration: 'Programme length',
        serviceSlug: 'student-visa',
        keyRequirements: [
          'COE from institution',
          'Language study evidence',
          'Financial sponsor documents',
        ],
      },
      {
        id: 'jp-work',
        name: 'Work Visa',
        purpose: 'Skilled employment matching status of residence',
        typicalDuration: '1–5 years, renewable',
        serviceSlug: 'work-visa',
        keyRequirements: [
          'COE from employer',
          'Qualification matching role',
          'Employment contract',
        ],
      },
    ],
    keyFacts: [
      { label: 'COE', value: 'Issued before visa application; validity is limited' },
      { label: 'Language', value: 'JLPT or equivalent evidence strengthens most routes' },
      { label: 'Sponsor', value: 'Institution or employer must be established and compliant' },
      { label: 'Medical', value: 'Not routinely required but may be requested' },
    ],
    riskLevel: 'moderate',
    costRange: {
      service: 'BDT 40,000 – 110,000',
      official: 'JPY 3,000 single-entry visa fee',
    },
    policySources: [
      {
        title: 'Visa guidance',
        publisher: 'Ministry of Foreign Affairs of Japan',
        url: 'https://www.mofa.go.jp/j_info/visit/visa/',
        effectiveFrom: '2024-04-01',
        version: 'JP-VISA-2024.1',
      },
    ],
    lastReviewed: '2026-09-18',
    popularFor: ['Language study', 'Skilled work', 'Technical internships'],
  },
];

export function getCountryGuide(slug: string): CountryGuide | undefined {
  return countryGuides.find((c) => c.slug === slug);
}

export function getCountriesForService(serviceSlug: string): CountryGuide[] {
  return countryGuides.filter((c) => c.routes.some((r) => r.serviceSlug === serviceSlug));
}
