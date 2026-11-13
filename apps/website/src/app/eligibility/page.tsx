import type { Metadata } from 'next';
import { Container, Section, Alert } from '@visahobe/ui';
import { PageHero } from '@/components/marketing';
import { EligibilityForm } from './eligibility-form';
import { Icon } from '@/lib/icons';

export const metadata: Metadata = {
  title: 'Free eligibility assessment',
  description:
    'A free, structured visa eligibility assessment. Get a written route shortlist with the gaps that would block your file — no payment and no obligation.',
  alternates: { canonical: '/eligibility' },
};

const assurances = [
  {
    icon: 'clock',
    title: 'About 3 minutes',
    body: 'Four short steps. No document uploads required at this stage.',
  },
  {
    icon: 'shield-check',
    title: 'No pressure, no sales call',
    body: 'You get a written summary. We only call if you ask us to.',
  },
  {
    icon: 'hand',
    title: 'No guarantees sold',
    body: 'The output is a readiness assessment with gaps, not a promise of approval.',
  },
];

export default function EligibilityPage() {
  return (
    <>
      <PageHero
        eyebrow="Free assessment"
        title="Find out what is realistic before you pay anyone"
        description="Answer a few structured questions. You will get a route shortlist with the documentation gaps that would block a filing today — written down, in plain language."
      />

      <Section className="pt-10">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.55fr_1fr]">
            <div className="min-w-0">
              <EligibilityForm />
            </div>

            <aside className="space-y-4">
              <div className="rounded-lg border border-line bg-surface p-5">
                <h2 className="text-sm font-semibold text-ink">Why we ask these questions</h2>
                <ul className="mt-3 space-y-2.5">
                  {assurances.map((item) => (
                    <li key={item.title} className="flex gap-2.5">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-sm bg-brand-50 text-brand-700">
                        <Icon name={item.icon} className="h-3.5 w-3.5" />
                      </span>
                      <div>
                        <p className="text-xs font-medium text-ink">{item.title}</p>
                        <p className="text-[11px] leading-relaxed text-ink-secondary">
                          {item.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <Alert tone="warning" title="Be careful with anyone who guarantees a visa">
                No agency, consultant or lawyer can guarantee an approval. If someone promises one,
                that is a signal to walk away — regardless of price.
              </Alert>

              <div className="rounded-lg border border-line bg-surface p-5">
                <h2 className="text-sm font-semibold text-ink">What the summary contains</h2>
                <ul className="mt-2.5 space-y-1.5 text-[11px] text-ink-secondary">
                  {[
                    'Two to four realistic routes, scored on document readiness',
                    'The exact gaps that would block each route today',
                    'Typical authority processing windows',
                    'Indicative service fee ranges, with official fees separated',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-1.5">
                      <span className="mt-0.5 text-brand-600">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="px-1 text-[10px] leading-relaxed text-ink-tertiary">
                Data handling: your answers are used to produce this summary and are not sold or
                shared. Passport and financial documents are never requested at this stage — those
                go into the encrypted vault only after you open a case.
              </p>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
