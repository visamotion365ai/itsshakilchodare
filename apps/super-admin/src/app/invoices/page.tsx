import type { Metadata } from 'next';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  DataTable,
  DisclaimerStrip,
  FilterBar,
  KpiTile,
  PageHeader,
} from '@visahobe/ui';
import { adminInvoices, formatDate, formatMoney, type AdminInvoice } from '@visahobe/shared';
import { Icon } from '@/lib/icons';

export const metadata: Metadata = { title: 'Invoices' };

export default function AdminInvoicesPage() {
  const paid = adminInvoices.filter((i) => i.status === 'paid');
  const open = adminInvoices.filter(
    (i) => i.status === 'due' || i.status === 'overdue' || i.status === 'partial',
  );

  return (
    <div className="mx-auto max-w-[1500px]">
      <PageHeader
        title="Invoices"
        description="Issue, track and settle client service invoices. Official authority fees are never invoiced by VisaHobe."
        breadcrumb="Revenue / Invoices"
        actions={
          <>
            <Button variant="secondary" size="sm">
              <Icon name="download" className="h-3.5 w-3.5" />
              Export
            </Button>
            <Button size="sm">
              <Icon name="plus" className="h-3.5 w-3.5" />
              Issue invoice
            </Button>
          </>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <KpiTile
          label="Paid"
          value={paid.length}
          tone="success"
          icon={<Icon name="check" className="h-4 w-4" />}
          hint={formatMoney(paid.reduce((s, i) => s + i.amount, 0))}
        />
        <KpiTile
          label="Open"
          value={open.length}
          tone="warning"
          icon={<Icon name="receipt" className="h-4 w-4" />}
          hint={formatMoney(open.reduce((s, i) => s + i.amount, 0))}
        />
        <KpiTile
          label="Overdue"
          value={adminInvoices.filter((i) => i.status === 'overdue').length}
          tone="danger"
          icon={<Icon name="alert" className="h-4 w-4" />}
        />
        <KpiTile
          label="Refunded"
          value={adminInvoices.filter((i) => i.status === 'refunded').length}
          tone="info"
          icon={<Icon name="scale" className="h-4 w-4" />}
        />
      </div>

      <div className="mt-5">
        <Card>
          <CardHeader
            title="Invoice register"
            description={`${adminInvoices.length} invoices · service fees only`}
            action={
              <FilterBar
                active="all"
                options={[
                  { id: 'all', label: 'All', count: adminInvoices.length },
                  { id: 'open', label: 'Open', count: open.length },
                  { id: 'paid', label: 'Paid', count: paid.length },
                ]}
              />
            }
          />
          <CardBody className="pt-1">
            <DataTable<AdminInvoice>
              caption="Admin invoices"
              rowKey={(row) => row.id}
              rows={adminInvoices}
              columns={[
                {
                  key: 'number',
                  header: 'Invoice',
                  render: (row) => (
                    <div>
                      <p className="font-mono text-[10px] font-medium text-ink">{row.number}</p>
                      <p className="text-[10px] text-ink-tertiary">{row.caseNumber}</p>
                    </div>
                  ),
                },
                {
                  key: 'client',
                  header: 'Client',
                  render: (row) => <span className="text-[11px] text-ink">{row.client}</span>,
                  hideBelow: 'md',
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
                  key: 'issued',
                  header: 'Issued',
                  render: (row) => (
                    <span className="whitespace-nowrap font-mono text-[10px] text-ink-tertiary">
                      {formatDate(row.issuedAt)}
                    </span>
                  ),
                  hideBelow: 'lg',
                },
                {
                  key: 'due',
                  header: 'Due',
                  render: (row) => (
                    <span className="whitespace-nowrap font-mono text-[10px] text-ink-tertiary">
                      {row.dueAt ? formatDate(row.dueAt) : '—'}
                    </span>
                  ),
                  hideBelow: 'xl',
                },
                {
                  key: 'action',
                  header: '',
                  render: (row) => (
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="sm">
                        <Icon name="eye" className="h-3.5 w-3.5" />
                      </Button>
                      {row.status !== 'paid' && row.status !== 'refunded' ? (
                        <Button variant="ghost" size="sm">
                          <Icon name="mail" className="h-3.5 w-3.5" />
                        </Button>
                      ) : null}
                    </div>
                  ),
                  align: 'right',
                },
              ]}
            />
            <div className="mt-3">
              <DisclaimerStrip>
                Invoices cover VisaHobe service work only. Embassy, biometrics, medical, attestation
                and courier fees are payable to those bodies and are not collected by VisaHobe.
              </DisclaimerStrip>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
