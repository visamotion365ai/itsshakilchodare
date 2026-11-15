import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container, Section, Badge, DisclaimerStrip, Alert } from '@visahobe/ui';
import { getCountryGuide, countryGuides, getService, formatBDT } from '@visahobe/shared';
import { Icon } from '@/lib/icons';
import { CtaBand, PageHero, TrustStrip } from '@/components/marketing';

export function generateStaticParams() {
  return countryGuides.map((country) => ({ slug: country.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const country = getCountryGuide(params.slug);
  if (!country) return { title: 'Destination not found' };
  return {
    title: `${country.name} visa guide — routes, documents and fees`,
    description: country.summary,
    alternates: { canonical: `/countries/${country.slug}` },
  };
}

export default function CountryPage({ params }: { params: { slug: string } }) {
  const country = getCountryGuide(params.slug);
  if (!country) notFound();

  const others = countryGuides.filter((c) => c.slug !== country.slug).slice(0, 4);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: country.routes.map((route) => ({
      '@type': 'Question',
      name: `What does the ${route.name} route require for ${country.name}?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: route.keyRequirements.join('; '),
      },
    })),
  };

  return (
    <>
      <PageHero
        eyebrow={country.region}
        title={
          <>
            <span className="mr-2" aria-hidden>
              {country.flag}
            </span>
            {country.name}
            <span className="mt-2 block text-base font-normal text-ink-tertiary" lang="bn">
              {country.nameBn}
            </span>
          </>
        }
        description={country.intro}
        meta={
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
            <Badge
              tone={
                country.riskLevel === 'low'
                  ? 'success'
                  : country.riskLevel === 'moderate'
                    ? 'info'
                    : 'warning'
              }
            >
              {country.riskLevel} documentation risk
            </Badge>
            <span className="text-ink-secondary">
              Processing:{' '}
              <strong className="font-medium text-ink">{country.processingWindow}</strong>
            </span>
            <span className="font-mono text-[11px] text-ink-tertiary">
              Reviewed {country.lastReviewed}
            </span>
          </div>
        }
      >
        <div className="flex flex-wrap gap-2">
          <Link
            href="/eligibility"
            className="inline-flex h-11 items-center gap-2 rounded-md bg-brand-700 px-5 text-sm font-semibold text-white hover:bg-brand-600"
          >
            Check eligibility for {country.name} <Icon name="arrow" className="h-4 w-4" />
          </Link>
          <Link
            href="/consultation"
            className="inline-flex h-11 items-center rounded-md border border-line-strong bg-surface px-5 text-sm font-medium text-ink hover:bg-surface-muted"
          >
            Talk to a case manager
          </Link>
        </div>
      </PageHero>
      <TrustStrip />

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
            <div className="min-w-0 space-y-12">
              {/* Routes */}
              <div>
                <h2 className="text-h2 font-semibold text-ink">Routes we prepare</h2>
                <div className="mt-4 space-y-4">
                  {country.routes.map((route) => {
                    const service = getService(route.serviceSlug);
                    return (
                      <article
                        key={route.id}
                        className="rounded-lg border border-line bg-surface p-5"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div>
                            <h3 className="text-base font-semibold text-ink">{route.name}</h3>
                            <p className="mt-0.5 text-xs text-ink-secondary">{route.purpose}</p>
                          </div>
                          <span className="rounded-xs bg-brand-50 px-2 py-1 text-[10px] font-medium text-brand-700">
                            {route.typicalDuration}
                          </span>
                        </div>
                        <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
                          {route.keyRequirements.map((requirement) => (
                            <li
                              key={requirement}
                              className="flex items-start gap-1.5 text-xs text-ink-secondary"
                            >
                              <Icon
                                name="check"
                                className="mt-0.5 h-3 w-3 shrink-0 text-brand-600"
                                strokeWidth={2.5}
                              />
                              {requirement}
                            </li>
                          ))}
                        </ul>
                        {service ? (
                          <Link
                            href={`/services/${service.slug}`}
                            className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand-700 hover:gap-2 transition-all"
                          >
                            {service.name} preparation — from{' '}
                            {formatBDT(service.pricing.serviceFeeFrom)}{' '}
                            <Icon name="arrow" className="h-3 w-3" />
                          </Link>
                        ) : null}
                      </article>
                    );
                  })}
                </div>
              </div>

              {/* Success profile */}
              <div>
                <h2 className="text-h2 font-semibold text-ink">What strong files have in common</h2>
                <ul className="mt-4 space-y-2">
                  {country.successProfile.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 rounded-md bg-surface-muted px-4 py-2.5 text-sm text-ink-secondary"
                    >
                      <Icon
                        name="check"
                        className="mt-0.5 h-4 w-4 shrink-0 text-brand-600"
                        strokeWidth={2.5}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Policy sources — the differentiator */}
              <div>
                <h2 className="text-h2 font-semibold text-ink">Policy sources behind this guide</h2>
                <p className="mt-2 text-sm text-ink-secondary">
                  These are the official documents this guide was built from. If anything here
                  conflicts with the live source, the live source wins — tell us and we will correct
                  the pack.
                </p>
                <div className="mt-4 space-y-2">
                  {country.policySources.map((source) => (
                    <div key={source.url} className="rounded-md border border-line bg-surface p-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-sm font-medium text-ink">{source.title}</p>
                        <span className="rounded-xs bg-surface-muted px-1.5 py-0.5 font-mono text-[10px] text-ink-secondary">
                          {source.version}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-ink-tertiary">
                        {source.publisher} · effective {source.effectiveFrom}
                      </p>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-brand-700 hover:underline"
                      >
                        Open official source ↗
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQs */}
              <div>
                <h2 className="text-h2 font-semibold text-ink">Common questions</h2>
                <div className="mt-4 space-y-3">
                  <Alert tone="warning" title="Documentation warning">
                    {country.riskLevel === 'elevated'
                      ? `${country.name} files are rejected most often for inconsistent travel history, insufficient funds evidence or an itinerary that does not match bookings.`
                      : `Most ${country.name} refusals we see trace to financial evidence gaps or inconsistent identity records — not to the strength of the applicant's profile.`}
                  </Alert>
                  <dl className="divide-y divide-line rounded-lg border border-line bg-surface">
                    {[
                      ...country.routes.map((route) => ({
                        q: `What does the ${route.name} route require?`,
                        a: route.keyRequirements.join(' · '),
                      })),
                      {
                        q: 'Are official fees included in the VisaHobe fee?',
                        a: `No. Authority fees for ${country.name} (${country.costRange.official}) are paid to the authority. VisaHobe's service fee (${country.costRange.service}) covers preparation and verification only.`,
                      },
                      {
                        q: 'How current is this guide?',
                        a: `This guide was last reviewed on ${country.lastReviewed} against ${country.policySources.map((s) => s.version).join(', ')}.`,
                      },
                    ].map((item) => (
                      <div key={item.q} className="px-4 py-3.5">
                        <dt className="text-sm font-medium text-ink">{item.q}</dt>
                        <dd className="mt-1 text-sm leading-relaxed text-ink-secondary">
                          {item.a}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-4">
              <div className="rounded-lg border border-line bg-surface p-5">
                <p className="text-label font-semibold uppercase tracking-wide text-ink-tertiary">
                  Key facts
                </p>
                <dl className="mt-3 space-y-2.5">
                  {country.keyFacts.map((fact) => (
                    <div key={fact.label}>
                      <dt className="text-[10px] uppercase tracking-wide text-ink-tertiary">
                        {fact.label}
                      </dt>
                      <dd className="text-xs text-ink-secondary">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="rounded-lg border border-line bg-surface p-5">
                <p className="text-label font-semibold uppercase tracking-wide text-ink-tertiary">
                  Cost range
                </p>
                <div className="mt-3 space-y-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-ink-tertiary">
                      VisaHobe service
                    </p>
                    <p className="text-sm font-semibold text-ink">{country.costRange.service}</p>
                  </div>
                  <div className="border-t border-line pt-3">
                    <p className="text-[10px] uppercase tracking-wide text-ink-tertiary">
                      Official / authority
                    </p>
                    <p className="text-sm text-ink-secondary">{country.costRange.official}</p>
                  </div>
                </div>
                <Link
                  href="/pricing"
                  className="mt-4 flex h-9 items-center justify-center rounded-md border border-line-strong text-xs font-medium text-ink hover:bg-surface-muted"
                >
                  Full fee breakdown
                </Link>
              </div>

              <div className="rounded-lg border border-line bg-surface p-5">
                <p className="text-label font-semibold uppercase tracking-wide text-ink-tertiary">
                  Popular for
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {country.popularFor.map((item) => (
                    <span
                      key={item}
                      className="rounded-xs bg-surface-muted px-2 py-0.5 text-[11px] text-ink-secondary"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-line bg-surface p-5">
                <p className="text-label font-semibold uppercase tracking-wide text-ink-tertiary">
                  Other destinations
                </p>
                <div className="mt-3 space-y-1">
                  {others.map((other) => (
                    <Link
                      key={other.slug}
                      href={`/countries/${other.slug}`}
                      className="flex items-center justify-between rounded-sm px-2 py-1.5 text-xs text-ink-secondary hover:bg-surface-muted hover:text-ink"
                    >
                      <span className="flex items-center gap-2">
                        <span aria-hidden>{other.flag}</span>
                        {other.name}
                      </span>
                      <span className="text-ink-tertiary">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>

          <div className="mt-10">
            <DisclaimerStrip>
              This guide is informational and does not constitute legal advice. Requirements and
              fees change without notice; the official source governs. VisaHobe does not guarantee
              approval, and no statement here should be read as a prediction of outcome.
            </DisclaimerStrip>
          </div>
        </Container>
      </Section>

      <CtaBand
        title={`Start a ${country.name} eligibility check`}
        description="Free assessment against the current policy pack, with the gaps that would block your file written down in plain language."
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
