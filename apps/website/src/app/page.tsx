import Link from 'next/link';
import type { Metadata } from 'next';
import { Container, Section, SectionHeading, Badge, DisclaimerStrip } from '@visahobe/ui';
import {
  featuredServices,
  countryGuides,
  packageTiers,
  formatBDT,
  trustPillars,
  howItWorksSteps,
  stats,
} from '@visahobe/shared';
import { Icon } from '@/lib/icons';
import { CtaBand, StatStrip, TrustStrip } from '@/components/marketing';

export const metadata: Metadata = {
  title: 'VisaHobe — Policy-cited visa preparation with human verification',
  description:
    'Study, work, visit, family and business visa preparation with policy-cited guidance, named human verifiers, transparent fees and a secure document vault.',
  alternates: { canonical: '/' },
};

const heroRoutes = [
  { label: 'Canada', flag: '🇨🇦', detail: 'Study & work' },
  { label: 'United Kingdom', flag: '🇬🇧', detail: 'Points-based' },
  { label: 'Germany', flag: '🇩🇪', detail: 'Blocked account' },
  { label: 'Australia', flag: '🇦🇺', detail: 'Skilled & study' },
  { label: 'Schengen', flag: '🇪🇺', detail: 'Short stay' },
  { label: 'UAE', flag: '🇦🇪', detail: 'Employment' },
];

export default function HomePage() {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'VisaHobe',
    url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://visahobe.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: '/resources?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                              */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-brand-900">
        <div className="hero-mesh absolute inset-0" aria-hidden />
        <div className="hero-grain absolute inset-0 opacity-30" aria-hidden />
        <div className="relative mx-auto w-full max-w-content px-5 pb-16 pt-14 sm:px-8 sm:pb-24 sm:pt-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-300" aria-hidden />
                Policy packs updated November 2026
              </div>

              <h1 className="mt-5 font-display text-display font-semibold text-white">
                Visa files prepared with
                <span className="relative mx-2 inline-block text-brand-300">
                  evidence
                  <span
                    className="absolute inset-x-0 -bottom-1 h-1 rounded-full bg-brand-400/50"
                    aria-hidden
                  />
                </span>
                not promises.
              </h1>

              <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-white/75">
                VisaHobe plans, prepares and verifies study, work, visit, family and business visa
                applications. Every requirement is tied to a named official source, every document
                passes a human verifier, and every fee appears in writing before you commit.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/eligibility"
                  className="inline-flex h-12 items-center gap-2 rounded-md bg-white px-6 text-[0.95rem] font-semibold text-brand-800 shadow-lg transition-colors hover:bg-brand-50"
                >
                  Check my eligibility — free
                  <Icon name="arrow" className="h-4 w-4" />
                </Link>
                <Link
                  href="/how-it-works"
                  className="inline-flex h-12 items-center gap-2 rounded-md border border-white/25 px-5 text-[0.95rem] font-medium text-white transition-colors hover:bg-white/10"
                >
                  See how it works
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/60">
                <span className="flex items-center gap-1.5">
                  <Icon name="check" className="h-3.5 w-3.5 text-brand-300" strokeWidth={2.5} />
                  No visa guarantee claims
                </span>
                <span className="flex items-center gap-1.5">
                  <Icon name="check" className="h-3.5 w-3.5 text-brand-300" strokeWidth={2.5} />
                  Government fees shown separately
                </span>
                <span className="flex items-center gap-1.5">
                  <Icon name="check" className="h-3.5 w-3.5 text-brand-300" strokeWidth={2.5} />
                  Encrypted document vault
                </span>
              </div>
            </div>

            {/* Floating trust card — permitted Liquid Glass surface */}
            <div className="relative">
              <div className="liquid-glass-panel liquid-glass-sheen rounded-xl p-5">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-800/70">
                    Case snapshot
                  </p>
                  <Badge tone="success" size="sm" dot>
                    Verifier reviewed
                  </Badge>
                </div>
                <p className="mt-3 font-mono text-xs text-ink-tertiary">VH-2026-0148</p>
                <p className="mt-1 font-display text-lg font-semibold text-ink">
                  Canada · Student permit
                </p>

                <ol className="mt-4 space-y-2.5">
                  {[
                    { label: 'Intake & route matching', state: 'done' },
                    { label: 'Document collection', state: 'done' },
                    { label: 'Human verification', state: 'current' },
                    { label: 'Submission approval', state: 'next' },
                  ].map((step) => (
                    <li key={step.label} className="flex items-center gap-2.5">
                      <span
                        className={
                          step.state === 'done'
                            ? 'flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-[10px] text-white'
                            : step.state === 'current'
                              ? 'flex h-5 w-5 items-center justify-center rounded-full border-2 border-brand-600 bg-white text-[9px] font-bold text-brand-700'
                              : 'flex h-5 w-5 items-center justify-center rounded-full border border-ink/15 bg-white/60 text-[9px] text-ink-tertiary'
                        }
                        aria-hidden
                      >
                        {step.state === 'done' ? '✓' : '·'}
                      </span>
                      <span
                        className={
                          step.state === 'next'
                            ? 'text-xs text-ink-tertiary'
                            : 'text-xs font-medium text-ink'
                        }
                      >
                        {step.label}
                      </span>
                      {step.state === 'current' ? (
                        <span className="ml-auto rounded-xs bg-warning-soft px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-warning">
                          Needs correction
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ol>

                <div className="mt-4 grid grid-cols-3 gap-2 border-t border-white/50 pt-3">
                  {[
                    { k: 'Docs verified', v: '4/8' },
                    { k: 'Verifier', v: 'Named' },
                    { k: 'Fees', v: 'Disclosed' },
                  ].map((item) => (
                    <div key={item.k}>
                      <p className="text-[9px] uppercase tracking-wide text-ink-tertiary">
                        {item.k}
                      </p>
                      <p className="text-xs font-semibold text-ink">{item.v}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="liquid-glass-panel mt-3 flex items-center gap-2.5 rounded-lg px-4 py-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-700 text-[10px] font-semibold text-white">
                  AR
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[11px] font-medium text-ink">
                    Ayesha Rahman · Verification lead
                  </p>
                  <p className="text-[10px] text-ink-tertiary">
                    “The bank stamp was missing. One fix, then approval.”
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Destination ribbon */}
        <div className="relative border-t border-white/10 bg-brand-950/40">
          <div className="mx-auto flex w-full max-w-content flex-wrap items-center gap-x-6 gap-y-2 px-5 py-3 sm:px-8">
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/40">
              Routes we prepare
            </span>
            {heroRoutes.map((route) => (
              <Link
                key={route.label}
                href={`/countries/${route.label.toLowerCase().replace(' ', '-')}`}
                className="flex items-center gap-1.5 text-xs text-white/70 transition-colors hover:text-white"
              >
                <span aria-hidden>{route.flag}</span>
                {route.label}
              </Link>
            ))}
            <Link
              href="/countries"
              className="ml-auto text-xs font-medium text-brand-300 hover:text-brand-200"
            >
              All destinations →
            </Link>
          </div>
        </div>
      </section>

      <TrustStrip />

      {/* ---------------------------------------------------------------- */}
      {/* Services                                                          */}
      {/* ---------------------------------------------------------------- */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Services"
            title="Preparation built around the actual authority requirements"
            description="Each service carries its own policy pack, document set and verification gates. Choose the route first — we'll tell you honestly whether it fits."
            action={
              <Link
                href="/services"
                className="inline-flex h-10 items-center gap-1.5 rounded-md border border-line-strong bg-surface px-4 text-sm font-medium text-ink hover:bg-surface-muted"
              >
                All services
                <Icon name="arrow" className="h-3.5 w-3.5" />
              </Link>
            }
          />
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group relative flex flex-col rounded-lg border border-line bg-surface p-5 lift-on-hover shadow-xs"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-100">
                    <Icon name={service.icon} className="h-5 w-5" />
                  </span>
                  <span className="text-[10px] font-medium uppercase tracking-wide text-ink-tertiary">
                    from {formatBDT(service.pricing.serviceFeeFrom)}
                  </span>
                </div>
                <h3 className="mt-4 text-h3 font-semibold text-ink">{service.name}</h3>
                <p className="mt-1 text-sm font-medium text-brand-700">{service.tagline}</p>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-secondary">
                  {service.summary}
                </p>
                <ul className="mt-4 space-y-1.5">
                  {service.heroHighlights.slice(0, 3).map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-1.5 text-xs text-ink-secondary"
                    >
                      <Icon
                        name="check"
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-600"
                        strokeWidth={2.5}
                      />
                      {highlight}
                    </li>
                  ))}
                </ul>
                <span className="mt-4 flex items-center gap-1 text-xs font-semibold text-brand-700 group-hover:gap-2 transition-all">
                  View service <Icon name="arrow" className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-6">
            <DisclaimerStrip>
              Service fees shown are VisaHobe preparation fees only. Embassy, biometrics, medical,
              attestation and courier costs are paid to those authorities and are quoted separately
              before you commit.
            </DisclaimerStrip>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* How it works                                                      */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="muted">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <SectionHeading
                eyebrow="How it works"
                title="Six stages, three of them human"
                description="Automation accelerates the boring parts. Named people still make every decision that affects your file."
              />
              <div className="mt-7">
                <StatStrip items={stats} />
              </div>
              <Link
                href="/how-it-works"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:gap-2.5 transition-all"
              >
                Full process walkthrough <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </div>
            <ol className="space-y-3">
              {howItWorksSteps.map((step) => (
                <li
                  key={step.number}
                  className="flex gap-4 rounded-lg border border-line bg-surface p-4"
                >
                  <span className="font-mono text-xs font-semibold text-brand-400">
                    {step.number}
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-[0.95rem] font-semibold text-ink">{step.title}</h3>
                      <Badge tone={step.owner === 'You' ? 'brand' : 'neutral'} size="sm">
                        {step.owner}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-ink-secondary">
                      {step.description}
                    </p>
                    <p className="mt-1.5 text-[11px] text-ink-tertiary">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Destinations                                                      */}
      {/* ---------------------------------------------------------------- */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Destinations"
            title="Country guides with dated, versioned sources"
            description="Every guide cites the official source it was built from, the version in force and the date we last reviewed it — so you can verify us."
            action={
              <Link
                href="/countries"
                className="inline-flex h-10 items-center gap-1.5 rounded-md border border-line-strong bg-surface px-4 text-sm font-medium text-ink hover:bg-surface-muted"
              >
                Compare all
                <Icon name="arrow" className="h-3.5 w-3.5" />
              </Link>
            }
          />
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {countryGuides.slice(0, 6).map((country) => (
              <Link
                key={country.slug}
                href={`/countries/${country.slug}`}
                className="group rounded-lg border border-line bg-surface p-5 lift-on-hover shadow-xs"
              >
                <div className="flex items-start justify-between">
                  <span className="text-2xl" aria-hidden>
                    {country.flag}
                  </span>
                  <Badge
                    tone={
                      country.riskLevel === 'low'
                        ? 'success'
                        : country.riskLevel === 'moderate'
                          ? 'info'
                          : 'warning'
                    }
                    size="sm"
                  >
                    {country.riskLevel} documentation risk
                  </Badge>
                </div>
                <h3 className="mt-3 text-h3 font-semibold text-ink">{country.name}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-secondary">{country.summary}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {country.routes.slice(0, 3).map((route) => (
                    <span
                      key={route.id}
                      className="rounded-xs bg-surface-muted px-1.5 py-0.5 text-[10px] font-medium text-ink-secondary"
                    >
                      {route.name}
                    </span>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-line pt-2.5">
                  <span className="font-mono text-[10px] text-ink-tertiary">
                    {country.policySources[0]?.version}
                  </span>
                  <span className="text-[10px] text-ink-tertiary">
                    Reviewed {country.lastReviewed}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Trust                                                             */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="muted">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Why teams and families choose VisaHobe"
            title="The parts that actually protect your file"
            description="Anyone can post a checklist. These are the six controls that decide whether a file survives review."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {trustPillars.map((pillar) => (
              <div key={pillar.title} className="rounded-lg border border-line bg-surface p-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-brand-700 text-white">
                  <Icon name={pillar.icon} className="h-4.5 w-4.5" />
                </span>
                <h3 className="mt-3.5 text-[0.98rem] font-semibold text-ink">{pillar.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-secondary">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link
              href="/trust"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:gap-2.5 transition-all"
            >
              Read the full trust & compliance page <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Pricing preview                                                   */}
      {/* ---------------------------------------------------------------- */}
      <Section>
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Pricing"
            title="Three packages. No surprise lines."
            description="Every quote separates the VisaHobe service fee from the official fees you pay to the authority. If it is not on the quote, you will not be asked for it."
          />
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {packageTiers.map((tier) => (
              <div
                key={tier.id}
                className={`relative flex flex-col rounded-lg border p-6 ${
                  tier.highlighted
                    ? 'border-brand-600 bg-surface shadow-lg ring-1 ring-brand-600/20'
                    : 'border-line bg-surface shadow-xs'
                }`}
              >
                {tier.highlighted ? (
                  <span className="absolute -top-2.5 left-6 rounded-full bg-brand-700 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                    Most chosen
                  </span>
                ) : null}
                <h3 className="font-display text-lg font-semibold text-ink">{tier.name}</h3>
                <p className="mt-1 text-xs text-ink-secondary">{tier.bestFor}</p>
                <p className="mt-4 flex items-baseline gap-1">
                  <span className="text-caption text-ink-tertiary">from</span>
                  <span className="font-display text-2xl font-semibold text-ink numeric">
                    {formatBDT(tier.priceFrom)}
                  </span>
                  <span className="text-xs text-ink-tertiary">/ {tier.priceUnit}</span>
                </p>
                <ul className="mt-4 flex-1 space-y-2">
                  {tier.features.slice(0, 6).map((feature) => (
                    <li
                      key={feature.label}
                      className={`flex items-start gap-2 text-xs ${
                        feature.included ? 'text-ink-secondary' : 'text-ink-tertiary line-through'
                      }`}
                    >
                      <Icon
                        name="check"
                        className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${
                          feature.included ? 'text-brand-600' : 'text-ink-tertiary'
                        }`}
                        strokeWidth={2.5}
                      />
                      {feature.label}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/pricing"
                  className={`mt-5 inline-flex h-10 items-center justify-center rounded-md text-sm font-semibold ${
                    tier.highlighted
                      ? 'bg-brand-700 text-white hover:bg-brand-600'
                      : 'border border-line-strong bg-surface text-ink hover:bg-surface-muted'
                  }`}
                >
                  {tier.ctaLabel}
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <DisclaimerStrip>
              Package prices cover VisaHobe service work only. Government, embassy, biometrics,
              medical, attestation and courier fees are separate and paid to those authorities.
              VisaHobe does not guarantee approval and does not sell jobs or placements.
            </DisclaimerStrip>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Proof / testimonial                                               */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="muted">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              {
                quote:
                  'They told me my chosen route was unrealistic in the first meeting. That honesty saved me a year and about four lakh taka.',
                name: 'Rafid H.',
                detail: 'Study permit · Canada',
              },
              {
                quote:
                  'The verification pass caught a missing bank stamp I would never have noticed. The file went in clean.',
                name: 'Farhana A.',
                detail: 'Family route · United Kingdom',
              },
              {
                quote:
                  'Being able to see which stage my documents were at, and who owned the next step, removed most of my anxiety.',
                name: 'Imran C.',
                detail: 'Business migration · Canada',
              },
            ].map((item) => (
              <figure key={item.name} className="rounded-lg border border-line bg-surface p-6">
                <div className="text-brand-300" aria-hidden>
                  ★★★★★
                </div>
                <blockquote className="mt-3 text-[0.95rem] leading-relaxed text-ink">
                  “{item.quote}”
                </blockquote>
                <figcaption className="mt-4 flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-[11px] font-semibold text-brand-800">
                    {item.name.split(' ')[0]?.[0]}
                    {item.name.split(' ')[1]?.[0]}
                  </span>
                  <span>
                    <span className="block text-xs font-semibold text-ink">{item.name}</span>
                    <span className="block text-[11px] text-ink-tertiary">{item.detail}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-4 text-center text-[11px] text-ink-tertiary">
            Client names shortened for privacy. Outcomes are individual and never guaranteed.
          </p>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Resources                                                         */}
      {/* ---------------------------------------------------------------- */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Resource library"
            title="Guidance you can read before you pay us anything"
            description="Practical, source-based writing about the parts of a visa file that actually decide outcomes."
            action={
              <Link
                href="/resources"
                className="inline-flex h-10 items-center gap-1.5 rounded-md border border-line-strong bg-surface px-4 text-sm font-medium text-ink hover:bg-surface-muted"
              >
                All resources
                <Icon name="arrow" className="h-3.5 w-3.5" />
              </Link>
            }
          />
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Building financial evidence that survives a review',
                tag: 'Documents',
                minutes: 9,
                slug: 'financial-evidence-that-survives-review',
              },
              {
                title: 'How to read a refusal letter properly',
                tag: 'Strategy',
                minutes: 7,
                slug: 'reading-a-refusal-letter-properly',
              },
              {
                title: 'The APS certificate, explained for Bangladeshi applicants',
                tag: 'Germany',
                minutes: 11,
                slug: 'aps-certificate-bangladesh-germany',
              },
            ].map((post) => (
              <Link
                key={post.slug}
                href={`/resources/${post.slug}`}
                className="group rounded-lg border border-line bg-surface p-5 lift-on-hover shadow-xs"
              >
                <div className="flex items-center gap-2">
                  <Badge tone="brand" size="sm">
                    {post.tag}
                  </Badge>
                  <span className="text-[11px] text-ink-tertiary">{post.minutes} min read</span>
                </div>
                <h3 className="mt-3 text-[1.02rem] font-semibold leading-snug text-ink group-hover:text-brand-700">
                  {post.title}
                </h3>
                <span className="mt-4 flex items-center gap-1 text-xs font-semibold text-brand-700">
                  Read <Icon name="arrow" className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
