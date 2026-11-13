import Link from 'next/link';
import type { Metadata } from 'next';
import { Container, Section, Alert } from '@visahobe/ui';
import { PageHero } from '@/components/marketing';

export const metadata: Metadata = {
  title: 'Terms of service',
  description:
    'The terms governing VisaHobe preparation services: scope, fees, refunds, client obligations, limitations and disclaimers.',
  alternates: { canonical: '/legal/terms' },
};

const sections = [
  {
    id: 'scope',
    title: '1. Scope of service',
    body: [
      'VisaHobe provides visa preparation, documentation assembly, verification and case management services. The specific deliverables for your engagement are listed in your order confirmation and case workspace.',
      'We are not a government authority, embassy, consulate or visa application centre. We do not issue visas and we cannot influence a decision outcome.',
      'Where a jurisdiction requires licensed legal representation or a registered migration agent, we engage qualified local counsel. Anything we do not hold authorisation for is referred out rather than performed by us.',
    ],
  },
  {
    id: 'no-guarantee',
    title: '2. No guarantee of outcome',
    body: [
      'Visa approval is decided solely by the destination authority. We make no representation, promise or guarantee that any application will be approved, that any timeline will be met by an authority, or that a particular document set will satisfy a caseworker.',
      'Any statement about typical outcomes, statistics or prior cases is descriptive and not predictive of your result. If any person acting for VisaHobe offers you a guarantee of approval, that statement is unauthorised and you should report it to hello@visahobe.com.',
      'We do not sell employment, job placements, admission offers or guaranteed appointments. Services that involve offers or appointments only verify and document what already exists.',
    ],
  },
  {
    id: 'fees',
    title: '3. Fees and payments',
    body: [
      'VisaHobe service fees are quoted in writing before you commit. Official government, embassy, biometrics, medical, attestation, translation and courier fees are separate, are set by those bodies, and are paid to them. We do not mark them up. Where we collect a third-party cost on your behalf it appears on your quote as a pass-through line with a receipt.',
      'Where instalments are offered, each milestone is tied to a defined case stage. Missing a milestone payment pauses work; it does not cancel the case or the fee obligation for work already performed.',
      'Quotes remain valid for 14 days and are subject to change where a policy pack or authority fee changes materially.',
    ],
  },
  {
    id: 'refunds',
    title: '4. Refunds',
    body: [
      'Refunds apply to the VisaHobe service fee only and are assessed against the stage reached: before verification begins, 100%; during verification, up to 60% pro-rated against completed work; after submission authorisation, no refund, because the prepared file is delivered and is yours to keep.',
      'Costs already incurred with your approval — attestation, translation, courier, medical or third-party verification — are never refundable to us and therefore cannot be refunded to you.',
      'Government and embassy fees paid to an authority cannot be refunded by VisaHobe under any circumstances. Refunds are processed to the original payment method within 14 business days of approval.',
    ],
  },
  {
    id: 'client-obligations',
    title: '5. Your obligations',
    body: [
      'Provide accurate, complete and genuine information and documents. Disclose prior refusals, overstays or adverse immigration history. Concealment, alteration or forgery of a document ends the engagement immediately without refund and may be reported.',
      'Respond to requests for information within the stated window. Where an SLA depends on your action, timelines pause until it is supplied.',
      'Do not pay authorities, medical providers or third parties on our instruction without written confirmation appearing on your quote.',
    ],
  },
  {
    id: 'documents',
    title: '6. Documents and originals',
    body: [
      'Documents are held in private encrypted storage with short-lived, role-scoped access. Originals supplied for attestation are tracked per document with custodian records and returned by tracked delivery.',
      'We are not liable for delays caused by third parties such as banks, notaries, ministries, embassies or couriers, though we will pursue them on your behalf and document the attempt.',
    ],
  },
  {
    id: 'ai-terms',
    title: '7. Automated assistance',
    body: [
      'The platform uses OCR and language models to assist preparation. All output is a draft subject to human verification. Automated assistance cannot approve a document, submit an application, issue a refund or make a decision on your file.',
      'You must not use an assistant to generate fraudulent documents or to misrepresent facts in an application.',
    ],
  },
  {
    id: 'liability',
    title: '8. Limitation of liability',
    body: [
      'To the maximum extent permitted by law, our total liability arising from the service is limited to the VisaHobe service fee you paid for the affected case. We are not liable for indirect or consequential losses, including lost opportunities, travel costs, tuition deposits or accommodation commitments made in anticipation of an approval.',
      'Nothing in these terms excludes liability that cannot lawfully be excluded, including for fraud or for death or personal injury caused by negligence.',
    ],
  },
  {
    id: 'termination',
    title: '9. Termination',
    body: [
      'You may end the engagement at any time in writing; fees are settled against the stage reached. We may end the engagement where information proves false, where a document appears fraudulent, where a request would require us to act unlawfully, or where a relationship becomes abusive toward our team.',
      'On termination you retain access to your verified document set and case records for a reasonable period, subject to legal retention rules.',
    ],
  },
  {
    id: 'law',
    title: '10. Governing law and disputes',
    body: [
      'These terms are governed by the laws of Bangladesh. We ask that you raise a concern with us first — most issues are resolvable within days. Complaints are acknowledged within one business day and answered in writing.',
      'Nothing here limits rights you have under applicable consumer protection law.',
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of service"
        description="What we do, what we do not do, how fees and refunds work, and what happens if something goes wrong."
        meta={
          <p className="font-mono text-xs text-ink-tertiary">
            Effective 1 November 2026 · Version 3.1
          </p>
        }
      />

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
            <nav aria-label="Terms sections" className="lg:sticky lg:top-24 lg:self-start">
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
              <Alert tone="warning" title="The three things people most often misunderstand">
                We do not guarantee approval. Government fees are separate and non-refundable. AI
                assistance never replaces the human verifier who approves your documents.
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
                  <Link href="/legal/privacy" className="text-brand-700 hover:underline">
                    Privacy policy
                  </Link>{' '}
                  ·{' '}
                  <Link href="/pricing" className="text-brand-700 hover:underline">
                    Pricing and refunds
                  </Link>{' '}
                  ·{' '}
                  <Link href="/trust" className="text-brand-700 hover:underline">
                    Trust & compliance
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
