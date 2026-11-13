import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Container,
  Section,
  SectionHeading,
  Badge,
  DisclaimerStrip,
  Accordion,
  DataTable,
  Alert,
} from '@visahobe/ui';
import {
  packageTiers,
  feeBreakdown,
  pricingFaqs,
  refundPolicy,
  formatBDT,
  services,
} from '@visahobe/shared';
import { Icon } from '@/lib/icons';
import { CompareRow, CtaBand, PageHero, TrustStrip } from '@/components/marketing';

export const metadata: Metadata = {
  title: 'Pricing and fee transparency',
  description:
    'Three preparation packages with every fee disclosed in writing. VisaHobe service fees are always separate from government, embassy and third-party fees.',
  alternates: { canonical: '/pricing' },
};

const comparisonRows: { label: string; values: (string | boolean)[]; emphasis?: boolean }[] = [
  { label: 'Free eligibility assessment', values: [true, true, true], emphasis: true },
  { label: 'Policy-cited document checklist', values: [true, true, true] },
  { label: 'Secure document vault', values: [true, true, true] },
  { label: 'Human verification passes', values: ['1 pass', '2 passes', 'Unlimited'] },
  { label: 'Assigned case manager', values: [false, true, 'Senior'] },
  { label: 'Interview preparation', values: [false, '1 session', 'Multiple sessions'] },
  { label: 'Priority SLA handling', values: [false, false, true] },
  { label: 'Family / linked-case coordination', values: [false, true, true] },
  { label: 'Submission pack assembly', values: ['Self-assembled', true, true] },
  { label: 'Typical first response', values: ['48h', '24h', '4h'] },
];

export default function PricingPage() {
  const priceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'VisaHobe visa preparation packages',
    description:
      'Visa preparation packages with human verification. Government and embassy fees are separate.',
    brand: { '@type': 'Brand', name: 'VisaHobe' },
    offers: packageTiers.map((tier) => ({
      '@type': 'Offer',
      name: tier.name,
      price: tier.priceFrom,
      priceCurrency: 'BDT',
      description: tier.tagline,
      availability: 'https://schema.org/InStock',
    })),
  };

  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Every fee visible before you commit"
        description="Three preparation packages. Official government, embassy and third-party fees always appear as separate lines — never bundled into a number you cannot audit."
        meta={
          <div className="flex flex-wrap gap-2">
            <Badge tone="success" dot>
              No hidden charges
            </Badge>
            <Badge tone="brand" dot>
              Milestone instalments available
            </Badge>
            <Badge tone="neutral" dot>
              Written refund schedule
            </Badge>
          </div>
        }
      />
      <TrustStrip />

      {/* Packages */}
      <Section>
        <Container>
          <div className="grid gap-4 lg:grid-cols-3">
            {packageTiers.map((tier) => (
              <div
                key={tier.id}
                className={`relative flex flex-col rounded-lg border bg-surface p-6 ${
                  tier.highlighted
                    ? 'border-brand-600 shadow-lg ring-1 ring-brand-600/20'
                    : 'border-line shadow-xs'
                }`}
              >
                {tier.highlighted ? (
                  <span className="absolute -top-2.5 left-6 rounded-full bg-brand-700 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                    Most chosen
                  </span>
                ) : null}
                <div className="flex items-baseline justify-between">
                  <h2 className="font-display text-lg font-semibold text-ink">{tier.name}</h2>
                  <span className="text-[11px] text-ink-tertiary" lang="bn">
                    {tier.nameBn}
                  </span>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-ink-secondary">{tier.tagline}</p>

                <div className="mt-4 rounded-md bg-surface-muted px-3 py-2.5">
                  <p className="flex items-baseline gap-1">
                    <span className="text-[10px] uppercase tracking-wide text-ink-tertiary">
                      from
                    </span>
                    <span className="font-display text-[1.6rem] font-semibold leading-none text-ink numeric">
                      {formatBDT(tier.priceFrom)}
                    </span>
                  </p>
                  <p className="mt-1 text-[10px] text-ink-tertiary">
                    {tier.priceUnit} · service fee only
                  </p>
                </div>

                <p className="mt-3 text-[11px] leading-relaxed text-ink-secondary">
                  <strong className="font-semibold text-ink">Best for:</strong> {tier.bestFor}
                </p>

                <ul className="mt-4 flex-1 space-y-2">
                  {tier.features.map((feature) => (
                    <li
                      key={feature.label}
                      className={`flex items-start gap-2 text-xs ${
                        feature.included ? 'text-ink-secondary' : 'text-ink-tertiary'
                      }`}
                    >
                      <Icon
                        name="check"
                        className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${
                          feature.included ? 'text-brand-600' : 'text-ink-tertiary/50'
                        }`}
                        strokeWidth={2.5}
                      />
                      <span className={!feature.included ? 'line-through' : undefined}>
                        {feature.label}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/eligibility"
                  className={`mt-5 flex h-10 items-center justify-center rounded-md text-sm font-semibold ${
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
            <Alert tone="info" title="Why we never bundle the official fee">
              Embassy and government fees change without notice, differ by nationality and are not
              ours to mark up. Bundling them would let a service hide margin inside a number you
              cannot verify. We show them separately on every quote and you pay them directly or
              with a receipt.
            </Alert>
          </div>
        </Container>
      </Section>

      {/* Comparison */}
      <Section tone="muted">
        <Container>
          <SectionHeading
            eyebrow="Compare"
            title="What changes between packages"
            description="Every tier includes verification. The difference is how much handling, speed and coordination you want."
          />
          <div className="mt-8 overflow-hidden rounded-lg border border-line bg-surface">
            <div className="overflow-x-auto scrollbar-thin">
              <table className="w-full min-w-[620px] border-collapse text-sm">
                <caption className="sr-only">Package feature comparison</caption>
                <thead>
                  <tr className="border-b border-line bg-surface-muted">
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-ink-tertiary"
                    >
                      Feature
                    </th>
                    {packageTiers.map((tier) => (
                      <th
                        key={tier.id}
                        scope="col"
                        className="px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-wide text-ink-tertiary"
                      >
                        {tier.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {comparisonRows.map((row) => (
                    <CompareRow
                      key={row.label}
                      label={row.label}
                      values={row.values}
                      emphasis={row.emphasis}
                    />
                  ))}
                  <tr className="bg-surface-muted/60">
                    <th scope="row" className="px-4 py-3 text-left text-sm font-medium text-ink">
                      Service fee from
                    </th>
                    {packageTiers.map((tier) => (
                      <td
                        key={tier.id}
                        className="px-4 py-3 text-center text-sm font-semibold text-ink numeric"
                      >
                        {formatBDT(tier.priceFrom)}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </Section>

      {/* Fee breakdown */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Fee transparency"
            title="Every line, who it is paid to, and whether it is refundable"
            description="This table is the same one that appears on your quote. If a cost is not here, you will not be asked for it without written confirmation."
          />
          <div className="mt-8">
            <DataTable
              caption="Fee breakdown by payer and refundability"
              rowKey={(row) => row.label}
              rows={feeBreakdown}
              columns={[
                {
                  key: 'label',
                  header: 'Fee line',
                  render: (row) => (
                    <div>
                      <p className="text-sm font-medium text-ink">{row.label}</p>
                      <p className="mt-0.5 max-w-md text-xs leading-relaxed text-ink-secondary">
                        {row.detail}
                      </p>
                    </div>
                  ),
                },
                {
                  key: 'paidTo',
                  header: 'Paid to',
                  render: (row) => (
                    <Badge
                      tone={
                        row.paidTo === 'VisaHobe'
                          ? 'brand'
                          : row.paidTo === 'Government / Embassy'
                            ? 'info'
                            : 'neutral'
                      }
                      size="sm"
                    >
                      {row.paidTo}
                    </Badge>
                  ),
                  hideBelow: 'sm',
                },
                {
                  key: 'refundable',
                  header: 'Refundable',
                  render: (row) => (
                    <span
                      className={
                        row.refundable === 'Yes'
                          ? 'text-xs font-medium text-success'
                          : row.refundable === 'No'
                            ? 'text-xs font-medium text-danger'
                            : 'text-xs font-medium text-warning'
                      }
                    >
                      {row.refundable}
                    </span>
                  ),
                  align: 'center',
                  hideBelow: 'md',
                },
              ]}
            />
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <div className="rounded-lg border border-line bg-surface p-5">
              <h3 className="text-base font-semibold text-ink">Service fee by route</h3>
              <p className="mt-1 text-xs text-ink-secondary">
                Indicative ranges. The exact quote is produced after your eligibility check.
              </p>
              <ul className="mt-3 divide-y divide-line">
                {services.map((service) => (
                  <li key={service.slug} className="flex items-center justify-between gap-3 py-2.5">
                    <Link
                      href={`/services/${service.slug}`}
                      className="text-xs text-ink hover:text-brand-700"
                    >
                      {service.name}
                    </Link>
                    <span className="shrink-0 text-xs font-medium text-ink numeric">
                      {formatBDT(service.pricing.serviceFeeFrom)} –{' '}
                      {formatBDT(service.pricing.serviceFeeTo)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <div className="rounded-lg border border-line bg-surface p-5">
                <h3 className="text-base font-semibold text-ink">Refund schedule</h3>
                <p className="mt-1 text-xs text-ink-secondary">
                  Applies to the VisaHobe service fee only. Government and third-party fees are
                  outside our control.
                </p>
                <div className="mt-3 space-y-2">
                  {refundPolicy.map((item) => (
                    <div key={item.stage} className="rounded-md bg-surface-muted px-3 py-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-medium text-ink">{item.stage}</p>
                        <span className="shrink-0 rounded-xs bg-brand-100 px-1.5 py-0.5 text-[10px] font-semibold text-brand-700">
                          {item.refund}
                        </span>
                      </div>
                      <p className="mt-1 text-[11px] leading-snug text-ink-tertiary">
                        {item.notes}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <DisclaimerStrip>
                Refund eligibility is assessed against actual work completed and costs already
                incurred with your approval. Full terms are in the client agreement you receive
                before any payment.
              </DisclaimerStrip>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="muted">
        <Container size="prose">
          <SectionHeading align="center" eyebrow="Pricing FAQ" title="The questions that matter" />
          <div className="mt-8">
            <Accordion items={pricingFaqs} />
          </div>
          <p className="mt-6 text-center text-xs text-ink-tertiary">
            Still unsure?{' '}
            <Link href="/contact" className="font-medium text-brand-700 hover:underline">
              Ask us directly
            </Link>{' '}
            — we answer fee questions before you become a client.
          </p>
        </Container>
      </Section>

      <CtaBand
        eyebrow="Transparent from the first step"
        title="Get your quote in writing, with the official fees itemised"
        description="The eligibility check is free. Your quote arrives with the service fee and every authority fee broken out separately."
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(priceSchema) }}
      />
    </>
  );
}
