import Link from 'next/link';
import type { Metadata } from 'next';
import { Container, Section, SectionHeading, Badge, Alert, DisclaimerStrip } from '@visahobe/ui';
import { trustPillars } from '@visahobe/shared';
import { Icon } from '@/lib/icons';
import { CtaBand, PageHero } from '@/components/marketing';

export const metadata: Metadata = {
  title: 'Trust, security and compliance',
  description:
    'How VisaHobe protects client documents, isolates tenants, logs access and discloses fees. Includes privacy, terms summary and refund policy.',
  alternates: { canonical: '/trust' },
};

const securityControls = [
  {
    title: 'Tenant isolation at the database layer',
    body: 'PostgreSQL row-level security policies scope every client query to the authenticated tenant. Cross-tenant reads are denied by the database, not just hidden by the interface.',
  },
  {
    title: 'Private encrypted document storage',
    body: 'Files live in private object storage. The database stores metadata and references only. Access uses short-lived signed URLs issued per role and per request.',
  },
  {
    title: 'Audited access with actor attribution',
    body: 'Every document view, download, upload, edit and approval is recorded with the actor, role, IP, timestamp and outcome — including denied attempts.',
  },
  {
    title: 'PII redaction in logs and traces',
    body: 'Logs use a field denylist plus regex redaction for identifiers. Prompts, agent traces and analytics never carry raw passport or financial data.',
  },
  {
    title: 'Least-privilege staff roles',
    body: 'Roles are scoped: verifiers review but cannot issue invoices; finance reconciles but cannot approve submissions. Sensitive actions require explicit permission keys.',
  },
  {
    title: 'Human approval on protected actions',
    body: 'Submission, refunds, migrations and deployments are protected transitions. Neither a person nor an agent can bypass the approval gate.',
  },
];

const dataPractices = [
  {
    q: 'What data do we collect?',
    a: 'Identity and contact details, application profile details, documents you upload, case activity and payment references. We collect the minimum needed for the service you requested.',
  },
  {
    q: 'Why do we collect it?',
    a: 'To assess eligibility, prepare and verify your file, communicate about your case, process payments and meet legal record-keeping obligations.',
  },
  {
    q: 'Who can see it?',
    a: 'Your assigned case manager and verifier, and limited operational roles where a task requires it. Access is role-scoped and audited. Other clients cannot reach your records.',
  },
  {
    q: 'How long do we keep it?',
    a: 'Active case data while the case is open; after closure, retained for the period required by financial and legal record-keeping rules, then deleted or anonymised on schedule.',
  },
  {
    q: 'Do we sell data?',
    a: 'No. We do not sell, rent or trade personal data. Partner sharing happens only when a partner is required for your case, with your explicit consent recorded on your profile.',
  },
  {
    q: 'How do you handle AI processing?',
    a: 'Documents are processed by OCR and extraction tools under contract, with identifiers redacted where the task allows. AI output is always a draft subject to human review.',
  },
];

export default function TrustPage() {
  return (
    <>
      <PageHero
        eyebrow="Trust & compliance"
        title="Evidence you can audit, not reassurance you have to accept"
        description="This page describes how documents are stored, who can reach them, what gets logged, and how fees and refunds are governed. Where we cannot verify something, we say so."
        meta={
          <div className="flex flex-wrap gap-2">
            <Badge tone="success" dot>
              Tenant-isolated data
            </Badge>
            <Badge tone="brand" dot>
              Audited access
            </Badge>
            <Badge tone="neutral" dot>
              No data selling
            </Badge>
          </div>
        }
      />

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Controls"
            title="The six controls behind every case"
            description="These are engineering and process controls, not aspirations. Each is testable and several are enforced by automated tests in our CI pipeline."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {securityControls.map((control, index) => (
              <div key={control.title} className="rounded-lg border border-line bg-surface p-5">
                <span className="font-mono text-[10px] text-brand-400">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-1.5 text-sm font-semibold text-ink">{control.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-ink-secondary">{control.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="muted">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <SectionHeading eyebrow="Privacy" title="How your data is handled" />
              <div className="mt-5 space-y-3">
                {dataPractices.map((item) => (
                  <div key={item.q} className="rounded-lg border border-line bg-surface p-4">
                    <p className="text-sm font-medium text-ink">{item.q}</p>
                    <p className="mt-1 text-xs leading-relaxed text-ink-secondary">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div id="terms">
                <SectionHeading eyebrow="Terms" title="Service boundaries, in short" />
                <div className="mt-4 space-y-3 rounded-lg border border-line bg-surface p-5">
                  <p className="text-xs leading-relaxed text-ink-secondary">
                    VisaHobe provides preparation, documentation and verification services. We are
                    not a government authority, embassy or law firm. Where legal representation is
                    required, we engage licensed local counsel in the destination jurisdiction.
                  </p>
                  <p className="text-xs leading-relaxed text-ink-secondary">
                    Visa approval is decided solely by the destination authority. We make no
                    representation that any application will succeed, and we do not sell employment,
                    placements or guaranteed outcomes.
                  </p>
                  <p className="text-xs leading-relaxed text-ink-secondary">
                    You are responsible for the accuracy of the information and documents you
                    provide. Concealment of prior refusals or forged documents will end the
                    engagement.
                  </p>
                </div>
              </div>

              <div id="refunds">
                <SectionHeading eyebrow="Refunds" title="Service-fee schedule" />
                <div className="mt-4 overflow-hidden rounded-lg border border-line bg-surface">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-surface-muted">
                      <tr>
                        <th className="px-4 py-2.5 font-semibold text-ink-tertiary">Stage</th>
                        <th className="px-4 py-2.5 font-semibold text-ink-tertiary">Refund</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                      <tr>
                        <td className="px-4 py-2.5 text-ink-secondary">
                          Before verification begins
                        </td>
                        <td className="px-4 py-2.5 font-medium text-success">
                          100% of service fee
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2.5 text-ink-secondary">During verification</td>
                        <td className="px-4 py-2.5 font-medium text-warning">
                          Up to 60%, pro-rated
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2.5 text-ink-secondary">
                          After submission authorisation
                        </td>
                        <td className="px-4 py-2.5 font-medium text-danger">Not refundable</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-2 text-[10px] leading-relaxed text-ink-tertiary">
                  Government, embassy, biometrics, medical, attestation and courier fees are paid to
                  third parties and are never held by VisaHobe — we cannot refund what we never
                  received.
                </p>
              </div>

              <div id="privacy">
                <Alert tone="info" title="Data subject requests">
                  To request access, correction or deletion of your data, email privacy@visahobe.com
                  from your registered address. We respond within 30 days, and deletion is subject
                  to legal record-keeping obligations.
                </Alert>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Do not take our word for it"
            title="How to verify a visa service before you pay"
            description="These checks apply to VisaHobe and to every competitor. Run them on us."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: 'Ask for the source',
                body: 'Every requirement should trace to an official document with a date. If nobody can name it, treat it as opinion.',
              },
              {
                title: 'Demand fee separation',
                body: 'Government fees are fixed and public. Anyone bundling them into one opaque price is hiding margin.',
              },
              {
                title: 'Refuse guarantees',
                body: 'No one can guarantee a visa. A refund guarantee for an authority decision is either a marketing trick or a lie.',
              },
              {
                title: 'Check who touches documents',
                body: 'Ask who can see your passport and bank statements, and whether access is logged. Vague answers are a warning.',
              },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-line bg-surface p-5">
                <Icon name="shield-check" className="h-5 w-5 text-brand-600" />
                <h3 className="mt-2.5 text-sm font-semibold text-ink">{item.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-ink-secondary">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {trustPillars.slice(0, 3).map((pillar) => (
              <div key={pillar.title} className="rounded-md bg-surface-muted p-4">
                <p className="text-xs font-semibold text-ink">{pillar.title}</p>
                <p className="mt-1 text-[11px] leading-relaxed text-ink-secondary">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <Link
              href="/contact"
              className="inline-flex h-11 items-center rounded-md bg-brand-700 px-5 text-sm font-semibold text-white hover:bg-brand-600"
            >
              Ask a compliance question
            </Link>
            <Link
              href="/legal/privacy"
              className="inline-flex h-11 items-center rounded-md border border-line-strong bg-surface px-5 text-sm font-medium text-ink hover:bg-surface-muted"
            >
              Full privacy policy
            </Link>
            <Link
              href="/legal/terms"
              className="inline-flex h-11 items-center rounded-md border border-line-strong bg-surface px-5 text-sm font-medium text-ink hover:bg-surface-muted"
            >
              Full terms of service
            </Link>
          </div>

          <div className="mt-6">
            <DisclaimerStrip>
              This page is a plain-language summary, not the binding agreement. The client agreement
              you receive before payment contains the governing terms. Nothing here limits rights
              you have under applicable Bangladeshi consumer law.
            </DisclaimerStrip>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
