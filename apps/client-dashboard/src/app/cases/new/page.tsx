import type { Metadata } from 'next';
import { Alert, Card, CardBody, CardHeader, PageHeader, Breadcrumbs } from '@visahobe/ui';
import { services, countryGuides, packageTiers, formatBDT } from '@visahobe/shared';
import { Icon } from '@/lib/icons';

export const metadata: Metadata = { title: 'Open a new case' };

export default function NewCasePage() {
  return (
    <div className="mx-auto max-w-[1100px]">
      <Breadcrumbs items={[{ label: 'Cases', href: '/cases' }, { label: 'New case' }]} />
      <div className="mt-3">
        <PageHeader
          title="Open a new case"
          description="Choose the service and destination. Your case workspace opens immediately with a checklist generated from the current policy pack."
        />
      </div>

      <div className="space-y-5">
        <Card>
          <CardHeader title="1 · Service" description="Pick the route you are applying under." />
          <CardBody className="pt-2">
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <label
                  key={service.slug}
                  className="flex cursor-pointer items-start gap-2.5 rounded-md border border-line bg-surface p-3 transition-colors hover:border-brand-300 hover:bg-brand-50/30 has-[:checked]:border-brand-600 has-[:checked]:bg-brand-50 has-[:checked]:ring-1 has-[:checked]:ring-brand-600/20"
                >
                  <input
                    type="radio"
                    name="service"
                    defaultChecked={service.slug === 'student-visa'}
                    className="mt-0.5 h-3.5 w-3.5 border-line-strong text-brand-700 focus:ring-brand-500"
                  />
                  <span className="min-w-0">
                    <span className="flex items-center gap-1.5">
                      <Icon name={service.icon} className="h-3.5 w-3.5 text-brand-600" />
                      <span className="text-xs font-medium text-ink">{service.name}</span>
                    </span>
                    <span className="mt-0.5 block text-[10px] leading-snug text-ink-tertiary">
                      from {formatBDT(service.pricing.serviceFeeFrom)}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="2 · Destination"
            description="Each destination applies its own policy pack."
          />
          <CardBody className="pt-2">
            <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-5">
              {countryGuides.map((country) => (
                <label
                  key={country.slug}
                  className="flex cursor-pointer items-center gap-2 rounded-md border border-line bg-surface px-3 py-2.5 transition-colors hover:border-brand-300 has-[:checked]:border-brand-600 has-[:checked]:bg-brand-50"
                >
                  <input
                    type="radio"
                    name="country"
                    defaultChecked={country.slug === 'canada'}
                    className="h-3.5 w-3.5 border-line-strong text-brand-700"
                  />
                  <span aria-hidden>{country.flag}</span>
                  <span className="min-w-0 truncate text-xs text-ink">{country.name}</span>
                </label>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="3 · Package" description="Verification is included in every tier." />
          <CardBody className="pt-2">
            <div className="grid gap-2 md:grid-cols-3">
              {packageTiers.map((tier) => (
                <label
                  key={tier.id}
                  className="flex cursor-pointer flex-col rounded-md border border-line bg-surface p-3 transition-colors hover:border-brand-300 has-[:checked]:border-brand-600 has-[:checked]:bg-brand-50 has-[:checked]:ring-1 has-[:checked]:ring-brand-600/20"
                >
                  <span className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="package"
                      defaultChecked={tier.id === 'guided'}
                      className="h-3.5 w-3.5 border-line-strong text-brand-700"
                    />
                    <span className="text-xs font-semibold text-ink">{tier.name}</span>
                  </span>
                  <span className="mt-1 text-[10px] leading-snug text-ink-tertiary">
                    {tier.tagline}
                  </span>
                  <span className="mt-2 font-display text-sm font-semibold text-ink numeric">
                    {formatBDT(tier.priceFrom)}
                  </span>
                </label>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="4 · Confirm" description="A summary of what will be created." />
          <CardBody className="pt-2">
            <dl className="grid gap-2 sm:grid-cols-2">
              {[
                { k: 'Service', v: 'Student Visa Preparation' },
                { k: 'Destination', v: 'Canada' },
                { k: 'Package', v: 'Guided · 2 verification passes' },
                { k: 'Policy pack', v: 'IRCC-SP-2024.1' },
                { k: 'Indicative service fee', v: formatBDT(67500) },
                { k: 'Official fees', v: 'Separate · paid to the authority' },
              ].map((row) => (
                <div key={row.k} className="rounded-md bg-surface-muted px-3 py-2">
                  <dt className="text-[10px] uppercase tracking-wide text-ink-tertiary">{row.k}</dt>
                  <dd className="text-xs font-medium text-ink">{row.v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-4">
              <Alert tone="warning" title="Before you open the case">
                No visa outcome is guaranteed. Opening a case creates the workspace and checklist;
                the service fee is payable when verification begins, and official fees are payable
                to the authority.
              </Alert>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                className="h-10 rounded-md bg-brand-700 px-5 text-sm font-semibold text-white hover:bg-brand-600"
              >
                Open case workspace
              </button>
              <button
                type="button"
                className="h-10 rounded-md border border-line-strong bg-surface px-5 text-sm font-medium text-ink hover:bg-surface-muted"
              >
                Save as draft
              </button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
