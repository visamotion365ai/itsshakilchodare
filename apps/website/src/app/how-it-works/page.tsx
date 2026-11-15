import Link from 'next/link';
import type { Metadata } from 'next';
import { Container, Section, SectionHeading, Badge, DisclaimerStrip, Alert } from '@visahobe/ui';
import { howItWorksSteps } from '@visahobe/shared';
import { Icon } from '@/lib/icons';
import { CtaBand, PageHero, TrustStrip } from '@/components/marketing';

export const metadata: Metadata = {
  title: 'How VisaHobe works — six stages, three human gates',
  description:
    'From free eligibility assessment to submission-ready pack: exactly what happens at each stage, who owns it and where humans review the work.',
  alternates: { canonical: '/how-it-works' },
};

const gates = [
  {
    title: 'Gate 1 — Verifier reviews every document',
    body: 'OCR output is a draft, never an approval. A named verifier compares the extraction against the original and the policy requirement, then approves or returns specific corrections.',
    who: 'Human verifier',
  },
  {
    title: 'Gate 2 — Case manager approves the assembled pack',
    body: 'Forms, annexures and translations are checked for ordering, completeness and internal consistency before the pack is offered for your authorisation.',
    who: 'Case manager',
  },
  {
    title: 'Gate 3 — You authorise submission',
    body: 'Nothing is submitted to an authority without your explicit authorisation in the workspace. The decision to file is always yours.',
    who: 'You',
  },
];

export default function HowItWorksPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How VisaHobe prepares a visa application',
    description:
      'Six stages from free eligibility assessment to a submission-ready pack, including three human verification gates.',
    step: howItWorksSteps.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: step.title,
      text: step.description,
    })),
  };

  return (
    <>
      <PageHero
        eyebrow="How it works"
        title="Six stages. Three human gates. Nothing filed without your say."
        description="Automation handles extraction, consistency checks and status tracking. Named people handle every decision that could affect the outcome of your file."
      />
      <TrustStrip />

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <SectionHeading
                eyebrow="The full path"
                title="What actually happens, in order"
                description="Each stage has a defined owner, an expected duration and a visible status in your workspace."
              />
              <div className="mt-6 rounded-lg border border-line bg-surface p-4">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-tertiary">
                  Typical total time (preparation only)
                </p>
                <p className="mt-1 font-display text-xl font-semibold text-ink">2–6 weeks</p>
                <p className="mt-1 text-[11px] leading-relaxed text-ink-secondary">
                  Excludes authority processing, which is outside our control and varies by country
                  and season.
                </p>
              </div>
              <div className="mt-4">
                <Alert tone="info" title="Everything is visible">
                  Your workspace shows each stage, the owner of the next action and any correction
                  requested — the same timeline your case manager sees, without internal notes.
                </Alert>
              </div>
            </div>

            <ol className="space-y-3">
              {howItWorksSteps.map((step) => (
                <li key={step.number} className="rounded-lg border border-line bg-surface p-5">
                  <div className="flex items-start gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-700 font-mono text-xs font-semibold text-white">
                      {step.number}
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-[1.02rem] font-semibold text-ink">{step.title}</h2>
                        <Badge tone={step.owner === 'You' ? 'brand' : 'neutral'} size="sm">
                          {step.owner}
                        </Badge>
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink-secondary">
                        {step.description}
                      </p>
                      <p className="mt-2 flex items-center gap-1.5 text-[11px] text-ink-tertiary">
                        <Icon name="clock" className="h-3 w-3" />
                        {step.detail}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      <Section tone="muted">
        <Container>
          <SectionHeading
            eyebrow="Human gates"
            title="Where automation stops"
            description="These three checkpoints are non-negotiable. They cannot be skipped by a client request, an agent, or a time pressure."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {gates.map((gate, index) => (
              <div
                key={gate.title}
                className="flex flex-col rounded-lg border border-line bg-surface p-5"
              >
                <span className="font-mono text-[10px] text-brand-400">0{index + 1}</span>
                <h3 className="mt-1.5 text-sm font-semibold text-ink">{gate.title}</h3>
                <p className="mt-1.5 flex-1 text-xs leading-relaxed text-ink-secondary">
                  {gate.body}
                </p>
                <p className="mt-3 rounded-xs bg-brand-50 px-2 py-1 text-[10px] font-medium text-brand-700">
                  Owner: {gate.who}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-lg border border-line bg-surface p-6">
              <h2 className="text-h2 font-semibold text-ink">What the assistant will do</h2>
              <ul className="mt-3 space-y-2">
                {[
                  'Answer questions from approved, cited policy sources',
                  'Explain your current stage and the next required action',
                  'Request missing information and create tasks',
                  'Summarise your file and flag inconsistencies',
                  'Escalate to a human when a request exceeds its authority',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-ink-secondary">
                    <span className="mt-0.5 text-success">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-warning/25 bg-warning-soft/50 p-6">
              <h2 className="text-h2 font-semibold text-ink">What it will never do</h2>
              <ul className="mt-3 space-y-2">
                {[
                  'Approve a document or mark it verified',
                  'Submit anything to an authority on your behalf',
                  'Issue, approve or promise a refund',
                  'Access another client’s records or internal staff notes',
                  'Perform a high-impact external action without human approval',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-ink-secondary">
                    <span className="mt-0.5 text-warning">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 rounded-lg border border-line bg-surface p-6">
            <SectionHeading
              eyebrow="Choose your level of handling"
              title="Same verification, different amount of support"
              description="Every package includes a human verification pass. What changes is how much assembly, coordination and speed you want."
            />
            <div className="mt-5 flex flex-wrap gap-2">
              <Link
                href="/pricing"
                className="inline-flex h-11 items-center gap-2 rounded-md bg-brand-700 px-5 text-sm font-semibold text-white hover:bg-brand-600"
              >
                Compare packages <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <Link
                href="/eligibility"
                className="inline-flex h-11 items-center rounded-md border border-line-strong bg-surface px-5 text-sm font-medium text-ink hover:bg-surface-muted"
              >
                Start the free assessment
              </Link>
            </div>
          </div>

          <div className="mt-6">
            <DisclaimerStrip>
              Stage durations are typical preparation times and exclude authority processing. Visa
              decisions are made solely by the destination authority. No stage in this process
              includes a guarantee of approval.
            </DisclaimerStrip>
          </div>
        </Container>
      </Section>

      <CtaBand />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
