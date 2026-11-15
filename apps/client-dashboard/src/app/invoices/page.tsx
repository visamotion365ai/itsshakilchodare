import type { Metadata } from 'next';
import {
  Alert,
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  DataTable,
  DisclaimerStrip,
  KpiTile,
  PageHeader,
} from '@visahobe/ui';
import { clientInvoices, formatBDT, formatDate, packageTiers } from '@visahobe/shared';
import { Icon } from '@/lib/icons';

export const metadata: Metadata = { title: 'Invoices and payments' };

type Invoice = (typeof clientInvoices)[number];

const totalPaid = clientInvoices
  .filter((i) => i.status === 'paid')
  .reduce((s, i) => s + i.amount, 0);
const totalDue = clientInvoices.filter((i) => i.status === 'due').reduce((s, i) => s + i.amount, 0);

export default function InvoicesPage() {
  const current = packageTiers.find((t) => t.id === 'guided')!;

  return (
    <div className="mx-auto max-w-[1400px]">
      <PageHeader
        title="Invoices and payments"
        description="Service fees only. Official embassy, biometrics, medical and courier fees are paid directly to those authorities and never appear as a VisaHobe charge."
        breadcrumb="Workspace / Invoices"
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <KpiTile
          label="Paid to date"
          value={formatBDT(totalPaid)}
          tone="success"
          icon={<Icon name="check" className="h-4 w-4" />}
        />
        <KpiTile
          label="Outstanding"
          value={formatBDT(totalDue)}
          tone={totalDue > 0 ? 'warning' : 'success'}
          icon={<Icon name="wallet" className="h-4 w-4" />}
          hint={totalDue > 0 ? 'one invoice due 20 Nov' : 'clear'}
        />
        <KpiTile
          label="Current package"
          value={current.name}
          tone="brand"
          hint={`from ${formatBDT(current.priceFrom)}`}
          icon={<Icon name="receipt" className="h-4 w-4" />}
        />
        <KpiTile
          label="Instalments"
          value="3 milestones"
          tone="info"
          hint="2 of 3 settled on VH-2026-0148"
          icon={<Icon name="calendar" className="h-4 w-4" />}
        />
      </div>

      {totalDue > 0 ? (
        <div className="mt-4">
          <Alert
            tone="warning"
            title="One invoice is due"
            icon={<Icon name="alert" className="h-4 w-4" />}
          >
            INV-2026-1088 for BDT {totalDue.toLocaleString('en-US')} is due on 20 Nov 2026. Work
            continues meanwhile, but the next milestone cannot start until it is settled.
          </Alert>
        </div>
      ) : null}

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.65fr_1fr]">
        <Card>
          <CardHeader
            title="Invoice register"
            description="Every invoice with its payment state and the case it belongs to."
          />
          <CardBody className="pt-1">
            <DataTable<Invoice>
              caption="Invoices"
              rowKey={(row) => row.id}
              rows={clientInvoices}
              columns={[
                {
                  key: 'number',
                  header: 'Invoice',
                  render: (row) => (
                    <div>
                      <p className="font-mono text-[11px] font-medium text-ink">{row.number}</p>
                      <p className="text-[10px] text-ink-tertiary">{row.caseNumber}</p>
                    </div>
                  ),
                },
                {
                  key: 'desc',
                  header: 'Description',
                  render: (row) => (
                    <span className="text-xs text-ink-secondary">{row.description}</span>
                  ),
                  hideBelow: 'md',
                },
                {
                  key: 'amount',
                  header: 'Amount',
                  render: (row) => (
                    <span className="whitespace-nowrap text-xs font-medium text-ink numeric">
                      {formatBDT(row.amount)}
                    </span>
                  ),
                  align: 'right',
                },
                {
                  key: 'status',
                  header: 'Status',
                  render: (row) => (
                    <Badge
                      tone={
                        row.status === 'paid'
                          ? 'success'
                          : row.status === 'due'
                            ? 'warning'
                            : row.status === 'overdue'
                              ? 'danger'
                              : 'neutral'
                      }
                      size="sm"
                    >
                      {row.status === 'paid'
                        ? 'Paid'
                        : row.status === 'due'
                          ? 'Due'
                          : row.status === 'overdue'
                            ? 'Overdue'
                            : 'Refunded'}
                    </Badge>
                  ),
                  hideBelow: 'sm',
                },
                {
                  key: 'method',
                  header: 'Method',
                  render: (row) => (
                    <span className="text-[10px] text-ink-tertiary">{row.method ?? '—'}</span>
                  ),
                  hideBelow: 'lg',
                },
                {
                  key: 'actions',
                  header: '',
                  render: (row) => (
                    <div className="flex justify-end gap-1.5">
                      {row.status === 'due' ? <Button size="sm">Pay now</Button> : null}
                      <Button variant="ghost" size="sm">
                        <Icon name="download" className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  ),
                  align: 'right',
                },
              ]}
            />
            <div className="mt-4">
              <DisclaimerStrip>
                Official embassy, biometrics, medical, attestation and courier fees are collected by
                those authorities and are not part of any invoice above. Where VisaHobe pays a
                third-party cost on your behalf, it appears as a pass-through line with a receipt.
              </DisclaimerStrip>
            </div>
          </CardBody>
        </Card>

        <div className="space-y-5">
          <Card>
            <CardHeader
              title="Package detail"
              description={`${current.name} · ${current.priceUnit}`}
            />
            <CardBody className="pt-2">
              <p className="font-display text-2xl font-semibold text-ink numeric">
                {formatBDT(current.priceFrom)}
              </p>
              <p className="mt-0.5 text-[11px] text-ink-tertiary">service fee from</p>
              <ul className="mt-3 space-y-1.5">
                {current.features
                  .filter((f) => f.included)
                  .slice(0, 6)
                  .map((feature) => (
                    <li
                      key={feature.label}
                      className="flex items-start gap-1.5 text-[11px] text-ink-secondary"
                    >
                      <span className="mt-0.5 text-brand-600">✓</span>
                      {feature.label}
                    </li>
                  ))}
              </ul>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Payment methods" />
            <CardBody className="pt-2">
              <ul className="space-y-2">
                {[
                  { label: 'bKash', detail: 'Instant · reference recorded' },
                  { label: 'Card', detail: 'Visa / Mastercard via secure gateway' },
                  { label: 'Bank transfer', detail: 'Allow 1 business day for reconciliation' },
                ].map((method) => (
                  <li key={method.label} className="rounded-md border border-line px-3 py-2">
                    <p className="text-xs font-medium text-ink">{method.label}</p>
                    <p className="text-[10px] text-ink-tertiary">{method.detail}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[10px] leading-relaxed text-ink-tertiary">
                Card details are never stored by VisaHobe. Reconciliation against the provider
                settlement statement happens automatically, and exceptions are reviewed by finance.
              </p>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Recent receipts" />
            <CardBody className="pt-1">
              <ul className="divide-y divide-line">
                {clientInvoices
                  .filter((i) => i.paidAt)
                  .slice(0, 4)
                  .map((invoice) => (
                    <li key={invoice.id} className="flex items-center justify-between gap-2 py-2">
                      <div>
                        <p className="font-mono text-[10px] text-ink-secondary">{invoice.number}</p>
                        <p className="text-[10px] text-ink-tertiary">
                          {formatDate(invoice.paidAt!)} · {invoice.method}
                        </p>
                      </div>
                      <span className="text-xs font-medium text-ink numeric">
                        {formatBDT(invoice.amount)}
                      </span>
                    </li>
                  ))}
              </ul>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
