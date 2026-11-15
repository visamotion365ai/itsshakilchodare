import Link from 'next/link';
import type { Metadata } from 'next';
import { Container, Section, Alert } from '@visahobe/ui';
import { PageHero } from '@/components/marketing';

export const metadata: Metadata = {
  title: 'Privacy policy',
  description:
    'How VisaHobe collects, uses, stores and protects personal data, including document handling, retention and your rights.',
  alternates: { canonical: '/legal/privacy' },
};

const sections = [
  {
    id: 'who-we-are',
    title: '1. Who we are',
    body: [
      'VisaHobe ("we", "us") provides visa preparation, documentation and verification services from Dhaka, Bangladesh. This policy explains what personal data we process, why, and what control you have over it.',
      'For privacy requests, contact privacy@visahobe.com. We respond within 30 days.',
    ],
  },
  {
    id: 'what-we-collect',
    title: '2. Data we collect',
    body: [
      'Identity data: name, date of birth, nationality, passport details, national ID where provided.',
      'Contact data: email, phone and messaging identifiers you give us.',
      'Application data: destination, route, travel history, prior refusals, education and employment details relevant to the case.',
      'Document data: files you upload, their extracted fields and verification outcomes.',
      'Financial references: invoice and payment references, payment method type and status. We do not store full card numbers.',
      'Usage data: session records, audit logs of access and actions, and limited technical data such as IP address and user agent for security purposes.',
      'Communications: messages with our team and, where you use it, the assistant, retained with your case.',
    ],
  },
  {
    id: 'why',
    title: '3. Why we process it',
    body: [
      'To assess eligibility and prepare, verify and assemble your application file.',
      'To communicate with you about your case and respond to enquiries.',
      'To process payments, issue invoices and maintain financial records.',
      'To maintain security, prevent fraud and record auditable access to sensitive documents.',
      'To meet legal and regulatory record-keeping obligations.',
      'To improve our service quality, using aggregated data with identifiers removed where possible.',
    ],
  },
  {
    id: 'legal-basis',
    title: '4. Legal basis',
    body: [
      'We process most data because it is necessary to perform the service agreement with you. Security monitoring and legal record-keeping rest on our legitimate interests and legal obligations. Where we ask for consent — for example, sharing with a partner involved in your case, or marketing emails — you can withdraw it at any time without affecting work already completed.',
    ],
  },
  {
    id: 'ai',
    title: '5. AI processing and human review',
    body: [
      'We use OCR and extraction tools to read uploaded documents and language models to draft summaries and answer questions from approved policy sources. This processing is carried out by contracted providers under data-processing terms.',
      'Model output is always treated as a draft. A named human verifier approves every document, and a human authorises every submission. We do not use your documents to train third-party general models, and we remove direct identifiers from data used for internal quality evaluation.',
    ],
  },
  {
    id: 'sharing',
    title: '6. Who we share with',
    body: [
      'Service providers who process data on our instructions: cloud hosting, object storage, OCR, communication delivery, payment processing and monitoring. Each is bound by contract and limited to the purpose.',
      'Partners involved in your case — for example education agents, translators, attestation vendors or licensed counsel — only with your recorded consent and only the records required for their part of the work.',
      'Authorities and regulators where legally required, or where necessary to establish, exercise or defend legal claims.',
      'We never sell or rent personal data, and we do not share your documents with advertisers.',
    ],
  },
  {
    id: 'security',
    title: '7. Security',
    body: [
      'Documents are stored in private encrypted object storage with metadata references kept in the database. Access is granted through short-lived signed URLs scoped to a role and a specific request.',
      'Tenant boundaries are enforced by PostgreSQL row-level security, so a client session cannot read another client’s records even if application logic fails. Role-based permissions gate every sensitive action, and every access attempt — including denied ones — is recorded with actor, role, IP and timestamp.',
      'Staff access follows least privilege. Sensitive actions such as verification approval, refunds and submission require explicit permission keys and are audited.',
    ],
  },
  {
    id: 'retention',
    title: '8. Retention and deletion',
    body: [
      'Active case data is retained while the case is open. After closure we retain records for the period required by financial and consumer-protection rules, then delete or irreversibly anonymise them on schedule.',
      'Audit records may be retained longer where they are required to demonstrate compliance or to defend legal claims. Documents supplied under a refused application are retained so you can reuse them in a future application, unless you ask us to delete them.',
    ],
  },
  {
    id: 'rights',
    title: '9. Your rights',
    body: [
      'You can request access to the personal data we hold about you, correction of inaccurate data, deletion where retention is not legally required, restriction of certain processing, and a portable copy of data you provided.',
      'You can also object to marketing at any time using the unsubscribe link or by contacting us. Withdrawing consent does not affect processing carried out before the withdrawal.',
      'Email privacy@visahobe.com from your registered address and we will verify your identity before acting on the request.',
    ],
  },
  {
    id: 'children',
    title: '10. Children and dependants',
    body: [
      'Where a case involves a minor, data is provided by a parent or legal guardian. We require documented authority to act for a minor and limit collection to what the application requires.',
    ],
  },
  {
    id: 'changes',
    title: '11. Changes to this policy',
    body: [
      'When we change this policy we update the effective date and, for material changes, notify active clients in their workspace. The version published here governs new engagements from its effective date.',
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy policy"
        description="What we collect, why, who can see it, how long we keep it and how to exercise your rights."
        meta={
          <p className="font-mono text-xs text-ink-tertiary">
            Effective 1 November 2026 · Version 3.1
          </p>
        }
      />

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
            <nav aria-label="Privacy policy sections" className="lg:sticky lg:top-24 lg:self-start">
              <p className="text-label font-semibold uppercase tracking-wide text-ink-tertiary">
                On this page
              </p>
              <ol className="mt-3 space-y-1">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="block rounded-sm px-2 py-1 text-xs text-ink-secondary hover:bg-surface-muted hover:text-ink"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="min-w-0 space-y-8">
              <Alert tone="info" title="Plain-language summary">
                We collect only what a visa file requires, store documents privately, log who
                accesses them, never sell data, and delete on a published schedule. You can request
                access, correction or deletion at any time.
              </Alert>

              {sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-24">
                  <h2 className="text-h2 font-semibold text-ink">{section.title}</h2>
                  <div className="mt-2 space-y-2">
                    {section.body.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 40)}
                        className="text-[0.94rem] leading-relaxed text-ink-secondary"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}

              <div className="border-t border-line pt-4 text-xs text-ink-tertiary">
                <p>
                  Related:{' '}
                  <Link href="/legal/terms" className="text-brand-700 hover:underline">
                    Terms of service
                  </Link>{' '}
                  ·{' '}
                  <Link href="/trust" className="text-brand-700 hover:underline">
                    Trust & compliance
                  </Link>{' '}
                  ·{' '}
                  <Link href="/contact" className="text-brand-700 hover:underline">
                    Contact
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
