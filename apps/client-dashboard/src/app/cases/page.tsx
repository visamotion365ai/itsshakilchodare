import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Badge,
  Button,
  Card,
  DataTable,
  FilterBar,
  PageHeader,
  ProgressBar,
  SlaCountdown,
  StatusPipeline,
} from '@visahobe/ui';
import {
  caseStageLabels,
  caseStageOrder,
  clientCases,
  formatBDT,
  formatDate,
  type ClientCase,
} from '@visahobe/shared';
import { Icon } from '@/lib/icons';

export const metadata: Metadata = { title: 'My cases' };

const filters = [
  { id: 'all', label: 'All cases', count: clientCases.length },
  {
    id: 'action',
    label: 'Needs action',
    count: clientCases.filter((c) => c.status === 'needs_action' || c.status === 'at_risk').length,
  },
  {
    id: 'active',
    label: 'In progress',
    count: clientCases.filter((c) => c.status === 'on_track').length,
  },
  {
    id: 'completed',
    label: 'Completed',
    count: clientCases.filter((c) => c.status === 'completed').length,
  },
];

export default function CasesPage() {
  return (
    <div className="mx-auto max-w-[1400px]">
      <PageHeader
        title="My cases"
        description="Every case you have opened, with the current stage, owner and next action."
        breadcrumb="Workspace / Cases"
        actions={
          <Link href="/cases/new">
            <Button size="sm">
              <Icon name="plus" className="h-3.5 w-3.5" />
              Open a new case
            </Button>
          </Link>
        }
      />

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <FilterBar options={filters} active="all" />
        <p className="text-xs text-ink-tertiary">
          {clientCases.length} cases · sorted by next action
        </p>
      </div>

      <div className="hidden lg:block">
        <DataTable<ClientCase>
          caption="Your cases"
          rowKey={(row) => row.id}
          rows={clientCases}
          columns={[
            {
              key: 'case',
              header: 'Case',
              render: (row) => (
                <div>
                  <Link
                    href={`/cases/${row.caseNumber}`}
                    className="font-mono text-[11px] text-brand-700 hover:underline"
                  >
                    {row.caseNumber}
                  </Link>
                  <p className="mt-0.5 text-sm font-medium text-ink">
                    <span aria-hidden className="mr-1.5">
                      {row.flag}
                    </span>
                    {row.service}
                  </p>
                  <p className="text-[11px] text-ink-tertiary">
                    {row.country} · {row.packageTier} package
                  </p>
                </div>
              ),
            },
            {
              key: 'stage',
              header: 'Stage',
              render: (row) => (
                <div className="w-44">
                  <p className="mb-1 text-[11px] font-medium text-ink">
                    {caseStageLabels[row.stage]}
                  </p>
                  <ProgressBar value={row.progress} />
                </div>
              ),
            },
            {
              key: 'status',
              header: 'Status',
              render: (row) => (
                <Badge
                  tone={
                    row.status === 'on_track'
                      ? 'success'
                      : row.status === 'needs_action'
                        ? 'warning'
                        : row.status === 'at_risk'
                          ? 'danger'
                          : 'neutral'
                  }
                  size="sm"
                  dot
                >
                  {row.status === 'on_track'
                    ? 'On track'
                    : row.status === 'needs_action'
                      ? 'Needs action'
                      : row.status === 'at_risk'
                        ? 'At risk'
                        : 'Completed'}
                </Badge>
              ),
              hideBelow: 'md',
            },
            {
              key: 'next',
              header: 'Next action',
              render: (row) => (
                <div className="max-w-[240px]">
                  <p className="text-xs text-ink">{row.nextAction}</p>
                  <p className="mt-0.5 text-[10px] text-ink-tertiary">
                    Owner: {row.nextActionOwner === 'client' ? 'You' : row.owner}
                  </p>
                </div>
              ),
              hideBelow: 'lg',
            },
            {
              key: 'sla',
              header: 'SLA',
              render: (row) => (
                <SlaCountdown
                  hoursLeft={row.slaDaysLeft * 24}
                  state={row.slaDaysLeft <= 3 ? 'breach' : row.slaDaysLeft <= 7 ? 'warning' : 'ok'}
                  compact
                />
              ),
              hideBelow: 'sm',
            },
            {
              key: 'target',
              header: 'Target',
              render: (row) => (
                <span className="whitespace-nowrap text-xs text-ink-secondary">
                  {formatDate(row.targetDate)}
                </span>
              ),
              align: 'right',
              hideBelow: 'xl',
            },
          ]}
        />
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 lg:hidden">
        {clientCases.map((c) => (
          <Link key={c.id} href={`/cases/${c.caseNumber}`} className="block card-surface p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-mono text-[10px] text-ink-tertiary">{c.caseNumber}</p>
                <p className="mt-0.5 text-sm font-semibold text-ink">
                  {c.flag} {c.service}
                </p>
                <p className="text-[11px] text-ink-secondary">{c.country}</p>
              </div>
              <Badge
                tone={
                  c.status === 'on_track'
                    ? 'success'
                    : c.status === 'needs_action'
                      ? 'warning'
                      : 'danger'
                }
                size="sm"
              >
                {c.status === 'on_track'
                  ? 'On track'
                  : c.status === 'needs_action'
                    ? 'Action'
                    : 'At risk'}
              </Badge>
            </div>
            <div className="mt-2.5">
              <StatusPipeline
                stages={['Intake', 'Docs', 'Verify', 'Prep', 'Approval', 'Filed']}
                currentIndex={Math.min(caseStageOrder.indexOf(c.stage), 5)}
              />
            </div>
            <p className="mt-2.5 border-t border-line pt-2 text-xs text-ink-secondary">
              <span className="font-medium text-ink">Next: </span>
              {c.nextAction}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {clientCases.slice(0, 4).map((c) => (
          <Card key={c.id} className="p-4">
            <p className="text-[10px] uppercase tracking-wide text-ink-tertiary">Outstanding fee</p>
            <p className="mt-1 font-display text-base font-semibold text-ink numeric">
              {formatBDT(c.outstandingFee)}
            </p>
            <p className="mt-0.5 font-mono text-[10px] text-ink-tertiary">{c.caseNumber}</p>
            <Link
              href="/invoices"
              className="mt-2 inline-flex text-[11px] font-semibold text-brand-700 hover:underline"
            >
              View invoices →
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
