import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  Container,
  Section,
  SectionHeading,
  Badge,
  DisclaimerStrip,
  Accordion,
  Stepper,
} from '@visahobe/ui';
import {
  getService,
  services,
  formatBDT,
  getCountriesForService,
  packageTiers,
} from '@visahobe/shared';
import { Icon } from '@/lib/icons';
import { CtaBand, PageHero, TrustStrip } from '@/components/marketing';

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = getService(params.slug);
  if (!service) return { title: 'Service not found' };
  return {
    title: `${service.name} — preparation, documents and fees`,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: { title: service.name, description: service.summary },
  };
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = getService(params.slug);
  if (!service) notFound();

  const countries = getCountriesForService(service.slug);
  const related = services.filter(
    (s) => s.slug !== service.slug && s.category === service.category,
  );
  const steps = service.process.map((step, index) => ({
    id: `step-${index}`,
    label: step.step,
    description: `${step.detail} · ${step.owner === 'client' ? 'You' : step.owner === 'visahobe' ? 'VisaHobe' : 'Authority'}`,
    state: index === 0 ? ('current' as const) : ('upcoming' as const),
  }));

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.summary,
    provider: { '@type': 'Organization', name: 'VisaHobe' },
    areaServed: 'Bangladesh',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'BDT',
      price: service.pricing.serviceFeeFrom,
      description:
        'Indicative VisaHobe preparation service fee. Official authority fees are separate.',
    },
  };

  return (
    <>
      <PageHero
        eyebrow={`${service.category} service`}
        title={
          <>
            {service.name}
            <span className="mt-2 block text-base font-normal text-ink-tertiary" lang="bn">
              {service.nameBn}
            </span>
          </>
        }
        description={service.description}
        meta={
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-ink-secondary">
            <span className="flex items-center gap-1.5">
              <Icon name="shield-check" className="h-3.5 w-3.5 text-brand-600" /> Human verified
            </span>
            <span className="flex items-center gap-1.5">
              <Icon name="book" className="h-3.5 w-3.5 text-brand-600" /> Policy-cited
            </span>
            <span className="flex items-center gap-1.5">
              <Icon name="wallet" className="h-3.5 w-3.5 text-brand-600" /> Fees in writing
            </span>
            <span className="font-mono text-[11px] text-ink-tertiary">
              from {formatBDT(service.pricing.serviceFeeFrom)}
            </span>
          </div>
        }
      >
        <div className="flex flex-wrap gap-2">
          <Link
            href="/eligibility"
            className="inline-flex h-11 items-center gap-2 rounded-md bg-brand-700 px-5 text-sm font-semibold text-white hover:bg-brand-600"
          >
            Check eligibility for this route <Icon name="arrow" className="h-4 w-4" />
          </Link>
          <Link
            href="/pricing"
            className="inline-flex h-11 items-center rounded-md border border-line-strong bg-surface px-5 text-sm font-medium text-ink hover:bg-surface-muted"
          >
            Compare packages
          </Link>
        </div>
      </PageHero>
      <TrustStrip />

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
            <div className="min-w-0 space-y-12">
              {/* Overview */}
              <div>
                <h2 className="text-h2 font-semibold text-ink">What this service covers</h2>
                <div className="mt-3 space-y-3 text-[0.97rem] leading-relaxed text-ink-secondary">
                  {service.overview.map((paragraph) => (
                    <p key={paragraph.slice(0, 30)}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Eligibility */}
              <div>
                <h2 className="text-h2 font-semibold text-ink">Eligibility requirements</h2>
                <p className="mt-2 text-sm text-ink-secondary">
                  These are the baseline conditions. The eligibility assessment checks each one
                  against your actual documents.
                </p>
                <ul className="mt-4 space-y-2">
                  {service.eligibility.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 rounded-md border border-line bg-surface px-4 py-2.5 text-sm text-ink"
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

              {/* Process */}
              <div>
                <h2 className="text-h2 font-semibold text-ink">The process, stage by stage</h2>
                <div className="mt-4 rounded-lg border border-line bg-surface p-5">
                  <Stepper steps={steps} />
                </div>
              </div>

              {/* Deliverables */}
              <div>
                <h2 className="text-h2 font-semibold text-ink">What you receive</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {service.deliverables.map((deliverable) => (
                    <div
                      key={deliverable.label}
                      className="rounded-md border border-line bg-surface p-4"
                    >
                      <p className="text-sm font-semibold text-ink">{deliverable.label}</p>
                      <p className="mt-1 text-xs leading-relaxed text-ink-secondary">
                        {deliverable.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Documents */}
              <div>
                <h2 className="text-h2 font-semibold text-ink">Document checklist</h2>
                <p className="mt-2 text-sm text-ink-secondary">
                  Your exact checklist is generated from the destination policy pack. This is the
                  baseline set.
                </p>
                <ol className="mt-4 divide-y divide-line rounded-lg border border-line bg-surface">
                  {service.documents.map((doc, index) => (
                    <li key={doc} className="flex items-center gap-3 px-4 py-2.5">
                      <span className="font-mono text-[10px] text-ink-tertiary">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-sm text-ink">{doc}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* FAQs */}
              <div>
                <h2 className="text-h2 font-semibold text-ink">Questions people ask first</h2>
                <div className="mt-4">
                  <Accordion items={service.faqs} />
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-4">
              <div className="rounded-lg border border-brand-200 bg-brand-50/60 p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-600">
                  Indicative service fee
                </p>
                <p className="mt-1.5 font-display text-2xl font-semibold text-ink numeric">
                  {formatBDT(service.pricing.serviceFeeFrom)}
                  <span className="text-sm font-normal text-ink-tertiary">
                    {' '}
                    – {formatBDT(service.pricing.serviceFeeTo)}
                  </span>
                </p>
                <p className="mt-1 text-xs text-ink-secondary">
                  Final fee depends on route complexity and package tier.
                </p>
                <div className="mt-4 space-y-2 border-t border-brand-200/60 pt-3">
                  <div className="flex items-start gap-2 text-xs text-ink-secondary">
                    <Icon name="wallet" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-600" />
                    <span>
                      <strong className="font-semibold text-ink">Official fees separate:</strong>{' '}
                      {service.pricing.officialFeeNote}
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-ink-secondary">
                    <Icon name="calendar" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-600" />
                    <span>
                      {service.pricing.installments
                        ? 'Milestone instalments available'
                        : 'Single payment at verification start'}
                    </span>
                  </div>
                </div>
                <Link
                  href="/consultation"
                  className="mt-4 flex h-10 items-center justify-center rounded-md bg-brand-700 text-sm font-semibold text-white hover:bg-brand-600"
                >
                  Book a free consultation
                </Link>
              </div>

              <div className="rounded-lg border border-line bg-surface p-5">
                <p className="text-label font-semibold uppercase tracking-wide text-ink-tertiary">
                  Typical timelines
                </p>
                <dl className="mt-3 space-y-2.5">
                  {service.timelines.map((item) => (
                    <div key={item.label} className="flex items-baseline justify-between gap-3">
                      <dt className="text-xs text-ink-secondary">{item.label}</dt>
                      <dd className="text-right text-xs font-medium text-ink">{item.value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-3 border-t border-line pt-2.5 text-[10px] leading-relaxed text-ink-tertiary">
                  Authority processing times are outside VisaHobe control and change without notice.
                </p>
              </div>

              <div className="rounded-lg border border-line bg-surface p-5">
                <p className="text-label font-semibold uppercase tracking-wide text-ink-tertiary">
                  Popular destinations
                </p>
                <div className="mt-3 space-y-1.5">
                  {countries.slice(0, 5).map((country) => (
                    <Link
                      key={country.slug}
                      href={`/countries/${country.slug}`}
                      className="flex items-center justify-between rounded-sm px-2 py-1.5 text-xs text-ink-secondary hover:bg-surface-muted hover:text-ink"
                    >
                      <span className="flex items-center gap-2">
                        <span aria-hidden>{country.flag}</span>
                        {country.name}
                      </span>
                      <span className="text-ink-tertiary">→</span>
                    </Link>
                  ))}
                </div>
              </div>

              <DisclaimerStrip>
                Results are never guaranteed. VisaHobe does not sell jobs, placements or approvals,
                and official fees are paid to the relevant authority.
              </DisclaimerStrip>
            </aside>
          </div>
        </Container>
      </Section>

      {/* Package fit */}
      <Section tone="muted">
        <Container>
          <SectionHeading
            eyebrow="Package fit"
            title={`Packages available for ${service.name.toLowerCase()}`}
            description="Choose by how much handling you want. Verification and a written fee breakdown are included in every tier."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {packageTiers.map((tier) => (
              <div
                key={tier.id}
                className={`rounded-lg border bg-surface p-5 ${
                  tier.highlighted ? 'border-brand-600 ring-1 ring-brand-600/15' : 'border-line'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-ink">{tier.name}</h3>
                  {tier.highlighted ? (
                    <Badge tone="brand" size="sm">
                      Recommended
                    </Badge>
                  ) : null}
                </div>
                <p className="mt-1 text-xs text-ink-secondary">{tier.tagline}</p>
                <p className="mt-3 font-display text-lg font-semibold text-ink numeric">
                  {formatBDT(tier.priceFrom)}
                  <span className="text-xs font-normal text-ink-tertiary"> from</span>
                </p>
                <Link
                  href="/pricing"
                  className="mt-3 inline-flex text-xs font-semibold text-brand-700 hover:underline"
                >
                  See what is included →
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {related.length > 0 ? (
        <Section>
          <Container>
            <SectionHeading eyebrow="Related services" title="Often paired with this route" />
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/services/${item.slug}`}
                  className="group rounded-lg border border-line bg-surface p-5 lift-on-hover"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-md bg-brand-50 text-brand-700">
                    <Icon name={item.icon} className="h-4 w-4" />
                  </span>
                  <h3 className="mt-3 text-sm font-semibold text-ink group-hover:text-brand-700">
                    {item.name}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-xs text-ink-secondary">{item.summary}</p>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <CtaBand
        title={`Start the ${service.name.toLowerCase()} assessment`}
        description="Free, structured, and written down. You get a route summary with realistic timelines — before any payment."
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
}
