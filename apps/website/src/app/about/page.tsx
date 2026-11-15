import Link from 'next/link';
import type { Metadata } from 'next';
import { Container, Section, SectionHeading, Badge, DisclaimerStrip } from '@visahobe/ui';
import { aboutMilestones, companyValues, teamMembers, stats } from '@visahobe/shared';
import { Icon } from '@/lib/icons';
import { CtaBand, PageHero, StatStrip } from '@/components/marketing';

export const metadata: Metadata = {
  title: 'About VisaHobe',
  description:
    'Why VisaHobe exists: replacing visa folklore with versioned policy sources, human verification gates and fees that are disclosed in writing.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Built because the industry runs on folklore, not evidence"
        description="VisaHobe exists to make visa preparation auditable: named sources, dated policies, human verification and fees that appear in writing before you commit."
      />

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div className="space-y-5 text-[0.97rem] leading-relaxed text-ink-secondary">
              <p className="text-lg leading-relaxed text-ink">
                Most people applying for a visa do not fail because they were unqualified. They fail
                because a document was missing a stamp, a statement was dated wrong, or someone told
                them “this is what worked last time” and last time was three policy changes ago.
              </p>
              <p>
                VisaHobe started from that observation. The industry’s default operating model is
                informal advice, undisclosed fees and optimism sold as strategy. Families make
                irreversible financial decisions based on information nobody can verify.
              </p>
              <p>
                We took the opposite approach. Every requirement we state is tied to a named
                official source with an effective date and version. Every document passes a human
                verifier before it counts. Every fee — ours and the government’s — appears
                separately on a written quote. And when a route is unrealistic for someone, we say
                so in the first conversation, because a clear no today is worth more than a false
                yes that costs a year.
              </p>
              <p>
                We are not an embassy and we do not pretend to be lawyers in every jurisdiction.
                What we are is a disciplined preparation and verification service with an auditable
                trail behind every claim we make.
              </p>
            </div>

            <div className="space-y-4">
              <div className="rounded-lg border border-brand-200 bg-brand-50/60 p-5">
                <p className="text-label font-semibold uppercase tracking-wide text-brand-600">
                  Our position
                </p>
                <ul className="mt-3 space-y-2.5">
                  {[
                    'We will tell you when a route does not fit your profile.',
                    'We will never promise an approval, a job or a placement.',
                    'We will show you the source behind every requirement.',
                    'We will charge only what the written quote says.',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-ink">
                      <Icon
                        name="check"
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-600"
                        strokeWidth={2.5}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg border border-line bg-surface p-5">
                <p className="text-label font-semibold uppercase tracking-wide text-ink-tertiary">
                  Where we operate
                </p>
                <p className="mt-2 text-xs leading-relaxed text-ink-secondary">
                  Headquartered in Dhaka, preparing files for applicants across Bangladesh, with
                  partner counsel and verification vendors in destination countries. Where a
                  jurisdiction requires licensed legal representation, we engage local counsel
                  rather than acting outside our remit.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="muted">
        <Container>
          <SectionHeading
            eyebrow="How we got here"
            title="From a documented problem to a working platform"
          />
          <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {aboutMilestones.map((milestone) => (
              <li key={milestone.year} className="rounded-lg border border-line bg-surface p-5">
                <span className="font-mono text-xs font-semibold text-brand-500">
                  {milestone.year}
                </span>
                <h3 className="mt-2 text-[0.95rem] font-semibold text-ink">{milestone.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-ink-secondary">
                  {milestone.description}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow="What we believe"
            title="Four principles that decide how we work"
            description="These are operating constraints, not marketing values. Each one changes what we will and will not accept."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {companyValues.map((value, index) => (
              <div key={value.title} className="rounded-lg border border-line bg-surface p-5">
                <span className="font-mono text-[10px] text-brand-400">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-1.5 text-base font-semibold text-ink">{value.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-secondary">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="muted">
        <Container>
          <SectionHeading eyebrow="By the numbers" title="What the platform tracks" />
          <div className="mt-6">
            <StatStrip items={stats} />
          </div>
          <p className="mt-3 text-[11px] text-ink-tertiary">
            Figures describe internal preparation and verification activity. They are not approval
            rates and should never be read as an outcome prediction.
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow="The team"
            title="Named people, accountable for named work"
            description="Every case has a case manager and a verifier whose names appear in your workspace. Nobody hides behind an info@ address."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member) => (
              <div key={member.name} className="rounded-lg border border-line bg-surface p-5">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 font-display text-sm font-semibold text-brand-800">
                  {member.initials}
                </span>
                <h3 className="mt-3 text-sm font-semibold text-ink">{member.name}</h3>
                <p className="text-[11px] font-medium text-brand-700">{member.role}</p>
                <p className="mt-1.5 text-[11px] leading-relaxed text-ink-secondary">
                  {member.focus}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="muted">
        <Container>
          <div className="rounded-lg border border-line bg-surface p-6 lg:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <Badge tone="brand">Governance</Badge>
                <h2 className="mt-3 text-h2 font-semibold text-ink">
                  How the platform itself is controlled
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-secondary">
                  Internal access follows a three-layer permission model: what the interface shows,
                  what the API authorises, and what PostgreSQL row-level security allows. Even if
                  application logic fails, a client can never reach another client’s records.
                </p>
              </div>
              <Link
                href="/trust"
                className="inline-flex h-10 items-center gap-1.5 rounded-md bg-brand-700 px-4 text-sm font-medium text-white hover:bg-brand-600"
              >
                Read the trust page
              </Link>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                {
                  title: 'UI layer',
                  body: 'Hides actions your role cannot take — a first line of clarity, not security.',
                },
                {
                  title: 'API layer',
                  body: 'Validates the permission key on every sensitive action, including agents.',
                },
                {
                  title: 'Database layer',
                  body: 'Row-level security enforces tenant boundaries even under application compromise.',
                },
              ].map((layer) => (
                <div key={layer.title} className="rounded-md bg-surface-muted p-4">
                  <p className="text-xs font-semibold text-ink">{layer.title}</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-ink-secondary">
                    {layer.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-5">
            <DisclaimerStrip>
              VisaHobe is a preparation and documentation service. It is not a government body, an
              embassy or a law firm. Visa outcomes are decided solely by destination authorities and
              are never guaranteed.
            </DisclaimerStrip>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
