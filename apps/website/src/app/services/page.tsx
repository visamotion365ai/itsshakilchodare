import Link from 'next/link';
import type { Metadata } from 'next';
import { Container, Section, SectionHeading, Badge, DisclaimerStrip } from '@visahobe/ui';
import { services, serviceCategories, formatBDT, getCountriesForService } from '@visahobe/shared';
import { Icon } from '@/lib/icons';
import { CtaBand, PageHero, TrustStrip } from '@/components/marketing';

export const metadata: Metadata = {
  title: 'Services — visa preparation across six routes',
  description:
    'Study, work, visit, family, business migration and document services. Each route includes a policy-cited checklist, human verification and transparent fees.',
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Service catalogue"
        title="Six routes, one standard of evidence"
        description="Every service below is prepared against a versioned country policy pack, verified by a named human reviewer, and quoted with official fees shown separately."
        meta={
          <div className="flex flex-wrap gap-2">
            {serviceCategories.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-ink-secondary transition-colors hover:border-brand-200 hover:text-brand-700"
              >
                {category.label}
              </a>
            ))}
          </div>
        }
      />
      <TrustStrip />

      {serviceCategories.map((category, index) => {
        const items = services.filter((s) => s.category === category.id);
        if (items.length === 0) return null;
        return (
          <Section key={category.id} id={category.id} tone={index % 2 === 1 ? 'muted' : 'default'}>
            <Container>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <SectionHeading
                  eyebrow={`0${index + 1} · ${category.label}`}
                  title={category.label}
                  description={category.description}
                />
                <span className="text-xs text-ink-tertiary">
                  {items.length} service{items.length > 1 ? 's' : ''}
                </span>
              </div>

              <div className="mt-8 grid gap-4 lg:grid-cols-2">
                {items.map((service) => {
                  const countries = getCountriesForService(service.slug);
                  return (
                    <article
                      key={service.slug}
                      className="flex flex-col rounded-lg border border-line bg-surface p-6 shadow-xs lift-on-hover"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-100">
                          <Icon name={service.icon} className="h-5 w-5" />
                        </span>
                        <div className="text-right">
                          <p className="text-[10px] uppercase tracking-wide text-ink-tertiary">
                            Service fee from
                          </p>
                          <p className="font-display text-base font-semibold text-ink numeric">
                            {formatBDT(service.pricing.serviceFeeFrom)}
                          </p>
                        </div>
                      </div>

                      <h3 className="mt-4 text-h3 font-semibold text-ink">
                        <Link href={`/services/${service.slug}`} className="hover:text-brand-700">
                          {service.name}
                        </Link>
                      </h3>
                      <p className="text-[11px] text-ink-tertiary" lang="bn">
                        {service.nameBn}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
                        {service.summary}
                      </p>

                      <ul className="mt-4 grid gap-1.5 sm:grid-cols-2">
                        {service.heroHighlights.map((highlight) => (
                          <li
                            key={highlight}
                            className="flex items-start gap-1.5 text-xs text-ink-secondary"
                          >
                            <Icon
                              name="check"
                              className="mt-0.5 h-3 w-3 shrink-0 text-brand-600"
                              strokeWidth={2.5}
                            />
                            {highlight}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-4 flex flex-wrap items-center gap-1.5">
                        {countries.slice(0, 4).map((country) => (
                          <Link
                            key={country.slug}
                            href={`/countries/${country.slug}`}
                            className="flex items-center gap-1 rounded-xs bg-surface-muted px-1.5 py-0.5 text-[10px] font-medium text-ink-secondary hover:bg-brand-50 hover:text-brand-700"
                          >
                            <span aria-hidden>{country.flag}</span>
                            {country.name}
                          </Link>
                        ))}
                        {countries.length > 4 ? (
                          <span className="text-[10px] text-ink-tertiary">
                            +{countries.length - 4} more
                          </span>
                        ) : null}
                      </div>

                      <div className="mt-5 flex items-center justify-between border-t border-line pt-3">
                        <span className="text-[11px] text-ink-tertiary">
                          {service.documents.length} required documents · {service.process.length}{' '}
                          stages
                        </span>
                        <Link
                          href={`/services/${service.slug}`}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-brand-700 hover:gap-2 transition-all"
                        >
                          Full details <Icon name="arrow" className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            </Container>
          </Section>
        );
      })}

      <Section tone="muted">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Not sure which route fits?"
                title="The assessment decides the route, not the sales pitch"
                description="You describe your profile and constraints. We produce a written route summary with realistic timelines and the exact gaps that would block each option."
              />
              <div className="mt-5 flex flex-wrap gap-2">
                <Link
                  href="/eligibility"
                  className="inline-flex h-11 items-center gap-2 rounded-md bg-brand-700 px-5 text-sm font-semibold text-white hover:bg-brand-600"
                >
                  Free eligibility check
                  <Icon name="arrow" className="h-4 w-4" />
                </Link>
                <Link
                  href="/consultation"
                  className="inline-flex h-11 items-center rounded-md border border-line-strong bg-surface px-5 text-sm font-medium text-ink hover:bg-surface-muted"
                >
                  Book a consultation
                </Link>
              </div>
            </div>
            <div className="space-y-3">
              <DisclaimerStrip>
                VisaHobe prepares documentation and manages verification. We are not an embassy, a
                government body, or a licensed immigration lawyer unless stated in writing for a
                specific jurisdiction. No service on this page includes a guarantee of approval.
              </DisclaimerStrip>
              <div className="rounded-lg border border-line bg-surface p-5">
                <p className="text-label font-semibold uppercase tracking-wide text-ink-tertiary">
                  What is always included
                </p>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {[
                    'Policy-cited checklist',
                    'Secure document vault',
                    'Human verification pass',
                    'Case timeline with owners',
                    'Written fee breakdown',
                    'Audited document access',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-1.5 text-xs text-ink-secondary">
                      <Badge tone="brand" size="sm">
                        ✓
                      </Badge>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
