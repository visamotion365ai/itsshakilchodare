import Link from 'next/link';
import type { Metadata } from 'next';
import { Container, Section, SectionHeading, Badge, DisclaimerStrip } from '@visahobe/ui';
import { countryGuides } from '@visahobe/shared';
import { Icon } from '@/lib/icons';
import { CtaBand, PageHero, TrustStrip } from '@/components/marketing';

export const metadata: Metadata = {
  title: 'Destination guides — Canada, UK, Germany, Schengen & more',
  description:
    'Country and visa-route guides with dated official sources, realistic processing windows, cost ranges and the documentation risks that decide outcomes.',
  alternates: { canonical: '/countries' },
};

export default function CountriesPage() {
  const regions = [...new Set(countryGuides.map((c) => c.region))];

  return (
    <>
      <PageHero
        eyebrow="Destinations"
        title="Every guide cites its source, version and review date"
        description="We publish what the official guidance says — not what worked for one person last year. Where the rules are ambiguous, we say so instead of guessing."
        meta={
          <div className="flex flex-wrap gap-2 text-xs text-ink-secondary">
            <span className="rounded-full border border-line bg-surface px-3 py-1">
              {countryGuides.length} destination packs
            </span>
            <span className="rounded-full border border-line bg-surface px-3 py-1">
              {countryGuides.reduce((n, c) => n + c.routes.length, 0)} mapped routes
            </span>
            <span className="rounded-full border border-line bg-surface px-3 py-1">
              {countryGuides.reduce((n, c) => n + c.policySources.length, 0)} official sources cited
            </span>
          </div>
        }
      />
      <TrustStrip />

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Compare"
            title="Documentation risk, not marketing risk"
            description="Risk here means the chance a file fails on documentation. It is not a prediction of approval and it is not a probability of success."
          />

          <div className="mt-8 space-y-10">
            {regions.map((region) => {
              const items = countryGuides.filter((c) => c.region === region);
              return (
                <div key={region}>
                  <h3 className="text-label font-semibold uppercase tracking-[0.14em] text-ink-tertiary">
                    {region}
                  </h3>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((country) => (
                      <article
                        key={country.slug}
                        className="flex flex-col rounded-lg border border-line bg-surface p-5 shadow-xs lift-on-hover"
                      >
                        <div className="flex items-start justify-between gap-2">
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
                            {country.riskLevel} risk
                          </Badge>
                        </div>
                        <h4 className="mt-3 text-h3 font-semibold text-ink">
                          <Link
                            href={`/countries/${country.slug}`}
                            className="hover:text-brand-700"
                          >
                            {country.name}
                          </Link>
                        </h4>
                        <p className="text-[11px] text-ink-tertiary" lang="bn">
                          {country.nameBn}
                        </p>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-secondary">
                          {country.summary}
                        </p>

                        <dl className="mt-3 space-y-1.5 border-t border-line pt-3 text-[11px]">
                          <div className="flex justify-between gap-2">
                            <dt className="text-ink-tertiary">Processing</dt>
                            <dd className="text-right text-ink-secondary">
                              {country.processingWindow}
                            </dd>
                          </div>
                          <div className="flex justify-between gap-2">
                            <dt className="text-ink-tertiary">Service fee</dt>
                            <dd className="text-right font-medium text-ink">
                              {country.costRange.service}
                            </dd>
                          </div>
                          <div className="flex justify-between gap-2">
                            <dt className="text-ink-tertiary">Official fee</dt>
                            <dd className="text-right text-ink-secondary">
                              {country.costRange.official}
                            </dd>
                          </div>
                        </dl>

                        <div className="mt-3 flex flex-wrap gap-1">
                          {country.routes.map((route) => (
                            <span
                              key={route.id}
                              className="rounded-xs bg-surface-muted px-1.5 py-0.5 text-[10px] text-ink-secondary"
                            >
                              {route.name}
                            </span>
                          ))}
                        </div>

                        <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
                          <span className="font-mono text-[10px] text-ink-tertiary">
                            {country.policySources[0]?.version}
                          </span>
                          <Link
                            href={`/countries/${country.slug}`}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-brand-700 hover:gap-2 transition-all"
                          >
                            Open guide <Icon name="arrow" className="h-3.5 w-3.5" />
                          </Link>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8">
            <DisclaimerStrip>
              Requirements, fees and processing times change without notice. Every guide states the
              date it was last reviewed — always confirm against the official source before paying
              any authority fee. Risk ratings describe documentation difficulty only, never the
              probability of approval.
            </DisclaimerStrip>
          </div>
        </Container>
      </Section>

      <CtaBand
        eyebrow="Shortlist in one pass"
        title="Get a ranked shortlist for your profile"
        description="The assessment scores each destination against your documents, budget and timeline — then tells you which ones are genuinely realistic."
        primary={{ label: 'Start free assessment', href: '/eligibility' }}
        secondary={{ label: 'See all services', href: '/services' }}
      />
    </>
  );
}
