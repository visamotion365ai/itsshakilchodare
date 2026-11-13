import type { Metadata } from 'next';
import {
  Alert,
  Badge,
  BarChart,
  Button,
  Card,
  CardBody,
  CardHeader,
  DataTable,
  DisclaimerStrip,
  DonutChart,
  KpiTile,
  PageHeader,
  ProgressBar,
} from '@visahobe/ui';
import { adminInvoices, formatDate, formatMoney, type AdminInvoice } from '@visahobe/shared';
import { Icon } from '@/lib/icons';

export const metadata: Metadata = { title: 'Finance & reconciliation' };

const monthly = [
  { label: 'Jun', value: 512000 },
  { label: 'Jul', value: 684000 },
  { label: 'Aug', value: 731000 },
  { label: 'Sep', value: 802000 },
  { label: 'Oct', value: 918000 },
  { label: 'Nov', value: 1043000 },
];

export default function FinancePage() {
  const collected = adminInvoices
    .filter((i) => i.status === 'paid')
    .reduce((s, i) => s + i.amount, 0);
  const outstanding = adminInvoices
    .filter((i) => i.status === 'due' || i.status === 'overdue' || i.status === 'partial')
    .reduce((s, i) => s + i.amount, 0);
  const exceptions = adminInvoices.filter((i) => i.reconciliation !== 'matched');

  return (
    <div className="mx-auto max-w-[1500px]">
      <PageHeader
        title="Finance & reconciliation"
        description="Service-fee revenue only — official authority fees never pass through VisaHobe accounts. Every payment is matched against a provider settlement record."
        breadcrumb="Revenue / Finance & reconciliation"
        actions={
          <>
            <Button variant="secondary" size="sm">
              <Icon name="download" className="h-3.5 w-3.5" />
              Export ledger
            </Button>
            <Button size="sm">
              <Icon name="refresh" className="h-3.5 w-3.5" />
              Run reconciliation
            </Button>
          </>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <KpiTile
          label="Collected (period)"
          value={formatMoney(collected)}
          tone="success"
          delta={{ value: '+12.4%', direction: 'up' }}
          icon={<Icon name="wallet" className="h-4 w-4" />}
        />
        <KpiTile
          label="Outstanding"
          value={formatMoney(outstanding)}
          tone="warning"
          icon={<Icon name="receipt" className="h-4 w-4" />}
          hint="2 invoices past or near due"
        />
        <KpiTile
          label="Reconciliation exceptions"
          value={exceptions.length}
          tone="danger"
          icon={<Icon name="alert" className="h-4 w-4" />}
          hint="requires finance review"
        />
        <KpiTile
          label="Refunds issued"
          value={formatMoney(1200)}
          tone="info"
          icon={<Icon name="scale" className="h-4 w-4" />}
          hint="1 courier refund"
        />
      </div>

      {exceptions.length > 0 ? (
        <div className="mt-4">
          <Alert
            tone="danger"
            title={`${exceptions.length} reconciliation exceptions`}
            icon={<Icon name="alert" className="h-4 w-4" />}
          >
            <ul className="mt-1 space-y-1 text-xs">
              {exceptions.map((invoice) => (
                <li key={invoice.id}>
                  <span className="font-mono text-[11px]">{invoice.number}</span> · {invoice.client}{' '}
                  · {formatMoney(invoice.amount)} ·{' '}
                  {invoice.reconciliation === 'exception'
                    ? 'amount does not match settlement'
                    : 'settlement not yet received'}
                </li>
              ))}
            </ul>
          </Alert>
        </div>
      ) : null}

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <div className="min-w-0 space-y-5">
          <Card>
            <CardHeader
              title="Invoice and payment register"
              description="Service fees with reconciliation state."
            />
            <CardBody className="pt-1">
              <DataTable<AdminInvoice>
                caption="Finance register"
                rowKey={(row) => row.id}
                rows={adminInvoices}
                columns={[
                  {
                    key: 'invoice',
                    header: 'Invoice',
                    render: (row) => (
                      <div>
                        <p className="font-mono text-[10px] font-medium text-ink">{row.number}</p>
                        <p className="text-[10px] text-ink-tertiary">
                          {row.client} · {row.caseNumber}
                        </p>
                      </div>
                    ),
                  },
                  {
                    key: 'amount',
                    header: 'Amount',
                    render: (row) => (
                      <span className="whitespace-nowrap text-[11px] font-medium text-ink numeric">
                        {formatMoney(row.amount)}
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
                                : row.status === 'partial'
                                  ? 'info'
                                  : 'neutral'
                        }
                        size="sm"
                      >
                        {row.status}
                      </Badge>
                    ),
                    hideBelow: 'sm',
                  },
                  {
                    key: 'method',
                    header: 'Method',
                    render: (row) => (
                      <span className="text-[10px] text-ink-secondary">{row.method ?? '—'}</span>
                    ),
                    hideBelow: 'lg',
                  },
                  {
                    key: 'recon',
                    header: 'Reconciliation',
                    render: (row) => (
                      <Badge
                        tone={
                          row.reconciliation === 'matched'
                            ? 'success'
                            : row.reconciliation === 'pending'
                              ? 'warning'
                              : 'danger'
                        }
                        size="sm"
                      >
                        {row.reconciliation}
                      </Badge>
                    ),
                    hideBelow: 'md',
                  },
                  {
                    key: 'due',
                    header: 'Due',
                    render: (row) => (
                      <span className="whitespace-nowrap font-mono text-[10px] text-ink-tertiary">
                        {row.dueAt ? formatDate(row.dueAt) : '—'}
                      </span>
                    ),
                    align: 'right',
                    hideBelow: 'xl',
                  },
                  {
                    key: 'action',
                    header: '',
                    render: (row) =>
                      row.reconciliation === 'matched' ? null : (
                        <Button variant="ghost" size="sm">
                          Match
                        </Button>
                      ),
                    align: 'right',
                  },
                ]}
              />
              <div className="mt-3">
                <DisclaimerStrip>
                  Government, embassy, biometrics, medical, attestation and courier fees are never
                  held in VisaHobe accounts. Pass-through costs appear with a receipt and are
                  excluded from revenue reporting.
                </DisclaimerStrip>
              </div>
            </CardBody>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader title="Monthly service revenue" description="Last 6 months" />
              <CardBody>
                <BarChart
                  height={170}
                  data={monthly}
                  valueFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                />
                <p className="mt-2 text-[10px] text-ink-tertiary">
                  BDT thousands. Excludes official fees and pass-through costs.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardHeader title="Revenue by package" />
              <CardBody>
                <DonutChart
                  centerValue="1.04M"
                  centerLabel="BDT"
                  segments={[
                    { label: 'Guided', value: 52, color: 'var(--color-brand-700)' },
                    { label: 'Concierge', value: 31, color: 'var(--color-brand-500)' },
                    { label: 'Essential', value: 17, color: 'var(--color-brand-300)' },
                  ]}
                />
              </CardBody>
            </Card>
          </div>

          <Card>
            <CardHeader title="Reconciliation run — bKash batch 2261" />
            <CardBody className="pt-2">
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { label: 'Settlement total', value: 'BDT 58,500' },
                  { label: 'Matched invoices', value: '2 of 3' },
                  { label: 'Variance', value: 'BDT 36,000' },
                ].map((item) => (
                  <div key={item.label} className="rounded-md bg-surface-muted px-3 py-2">
                    <p className="text-[10px] uppercase tracking-wide text-ink-tertiary">
                      {item.label}
                    </p>
                    <p className="text-sm font-semibold text-ink numeric">{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-3">
                <ProgressBar value={66} label="Invoices matched in this batch" tone="warning" />
              </div>
              <p className="mt-2 text-[10px] leading-relaxed text-ink-tertiary">
                Variance is held as an exception rather than auto-adjusted. Finance must resolve it
                against the provider statement before the ledger is closed.
              </p>
            </CardBody>
          </Card>
        </div>

        <div className="space-y-5">
          <Card>
            <CardHeader title="Refund requests" description="Owner approval required." />
            <CardBody className="space-y-2 pt-2">
              <div className="rounded-md border border-warning/30 bg-warning-soft/50 px-3 py-2.5">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[10px] text-ink">INV-2026-0512</p>
                  <Badge tone="warning" size="sm">
                    pending
                  </Badge>
                </div>
                <p className="mt-0.5 text-[11px] text-ink">
                  Courier &amp; return delivery · BDT 1,200
                </p>
                <p className="mt-1 text-[10px] text-ink-tertiary">
                  Requested by farhan.kabir (finance) · awaiting owner
                </p>
                <div className="mt-2 flex gap-1.5">
                  <Button size="sm">Approve</Button>
                  <Button variant="secondary" size="sm">
                    Decline
                  </Button>
                </div>
              </div>
              <p className="text-[10px] leading-relaxed text-ink-tertiary">
                Refund approval is a protected action. Agents cannot issue refunds, and finance
                cannot self-approve.
              </p>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Payment method mix" />
            <CardBody className="space-y-2.5 pt-2">
              {[
                ['bKash', 58],
                ['Card', 26],
                ['Bank transfer', 16],
              ].map(([method, share]) => (
                <div key={String(method)}>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-ink-secondary">{method}</span>
                    <span className="text-ink numeric">{share}%</span>
                  </div>
                  <ProgressBar value={Number(share)} tone="brand" />
                </div>
              ))}
              <p className="pt-1 text-[10px] leading-relaxed text-ink-tertiary">
                Card data never touches VisaHobe systems — the gateway returns a token and
                settlement reference only.
              </p>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Reconciliation policy" />
            <CardBody className="space-y-2 pt-2">
              {[
                'Every payment must match a settlement record.',
                'Variances are held as exceptions, never auto-adjusted.',
                'Refunds require owner approval and are never agent-initiated.',
                'Ledger closes monthly after all exceptions resolve.',
                'Official fees are excluded from revenue recognition entirely.',
              ].map((rule) => (
                <p
                  key={rule}
                  className="flex items-start gap-1.5 text-[10px] leading-relaxed text-ink-secondary"
                >
                  <span className="mt-0.5 text-brand-600">✓</span>
                  {rule}
                </p>
              ))}
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Finance team" />
            <CardBody className="space-y-2 pt-2">
              {[
                { name: 'Farhan Kabir', role: 'finance', initials: 'FK' },
                { name: 'Shakil Hossain', role: 'owner · refund approval', initials: 'SH' },
              ].map((member) => (
                <div key={member.name} className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-[10px] font-semibold text-brand-800">
                    {member.initials}
                  </span>
                  <div>
                    <p className="text-[11px] font-medium text-ink">{member.name}</p>
                    <p className="text-[9px] text-ink-tertiary">{member.role}</p>
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
