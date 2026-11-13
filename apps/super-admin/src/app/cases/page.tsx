import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  DataTable,
  FilterBar,
  KpiTile,
  PageHeader,
  SlaCountdown,
} from '@visahobe/ui';
import {
  adminCases,
  caseStageLabels,
  formatDate,
  formatMoney,
  type AdminCase,
} from '@visahobe/shared';
import { Icon } from '@/lib/icons';

export const metadata: Metadata = { title: 'Case queue' };

const priorityTone = {
  urgent: 'danger',
  high: 'warning',
  standard: 'neutral',
  low: 'neutral',
} as const;

export default function AdminCasesPage() {
  return (
    <div className="mx-auto max-w-[1500px]">
      <PageHeader
        title="Case queue"
        description="Every open case with stage, owner, SLA pressure and value. Protected transitions (approval, submission) require an explicit permission key."
        breadcrumb="Operations / Case queue"
        actions={
          <>
            <Button variant="secondary" size="sm">
              <Icon name="download" className="h-3.5 w-3.5" />
              Export CSV
            </Button>
            <Button size="sm">
              <Icon name="plus" className="h-3.5 w-3.5" />
              Create case
            </Button>
          </>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <KpiTile
          label="Total open"
          value={adminCases.filter((c) => c.status !== 'completed').length}
          icon={<Icon name="cases" className="h-4 w-4" />}
          hint="across 8 tenants"
        />
        <KpiTile
          label="Urgent priority"
          value={adminCases.filter((c) => c.priority === 'urgent').length}
          tone="danger"
          icon={<Icon name="alert" className="h-4 w-4" />}
          hint="2 breached SLA"
        />
        <KpiTile
          label="Blocked"
          value={adminCases.filter((c) => c.status === 'blocked').length}
          tone="warning"
          icon={<Icon name="pause" className="h-4 w-4" />}
          hint="awaiting compliance"
        />
        <KpiTile
          label="Pipeline value"
          value={formatMoney(adminCases.reduce((s, c) => s + c.value, 0))}
          tone="success"
          icon={<Icon name="wallet" className="h-4 w-4" />}
        />
      </div>

      <div className="mt-5">
        <Card>
          <CardHeader
            title="All cases"
            description={`${adminCases.length} cases · newest SLA pressure first`}
            action={
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Icon name="filter" className="h-3.5 w-3.5" />
                  Filters
                </Button>
                <Button variant="ghost" size="sm">
                  <Icon name="refresh" className="h-3.5 w-3.5" />
                  Refresh
                </Button>
              </div>
            }
          />
          <CardBody className="pt-0">
            <div className="mb-3 mt-1">
              <FilterBar
                active="open"
                options={[
                  {
                    id: 'open',
                    label: 'Open',
                    count: adminCases.filter((c) => c.status !== 'completed').length,
                  },
                  {
                    id: 'urgent',
                    label: 'Urgent',
                    count: adminCases.filter((c) => c.priority === 'urgent').length,
                  },
                  {
                    id: 'blocked',
                    label: 'Blocked',
                    count: adminCases.filter((c) => c.status === 'blocked').length,
                  },
                  {
                    id: 'completed',
                    label: 'Completed',
                    count: adminCases.filter((c) => c.status === 'completed').length,
                  },
                ]}
              />
            </div>

            <DataTable<AdminCase>
              caption="Administrative case queue"
              rowKey={(row) => row.id}
              rows={adminCases}
              columns={[
                {
                  key: 'case',
                  header: 'Case & client',
                  render: (row) => (
                    <div>
                      <div className="flex items-center gap-1.5">
                        <Link
                          href={`/cases/${row.caseNumber}`}
                          className="font-mono text-[10px] font-medium text-brand-700 hover:underline"
                        >
                          {row.caseNumber}
                        </Link>
                        <Badge tone={priorityTone[row.priority]} size="sm">
                          {row.priority}
                        </Badge>
                      </div>
                      <p className="mt-0.5 text-xs font-medium text-ink">
                        {row.flag} {row.service}
                      </p>
                      <p className="text-[10px] text-ink-tertiary">
                        {row.clientName} · {row.tenant}
                      </p>
                    </div>
                  ),
                },
                {
                  key: 'stage',
                  header: 'Stage',
                  render: (row) => (
                    <div>
                      <p className="whitespace-nowrap text-[11px] text-ink">
                        {caseStageLabels[row.stage]}
                      </p>
                      <p className="text-[10px] capitalize text-ink-tertiary">
                        {row.status.replace('_', ' ')}
                      </p>
                    </div>
                  ),
                  hideBelow: 'md',
                },
                {
                  key: 'owner',
                  header: 'Owner / verifier',
                  render: (row) => (
                    <div>
                      <p className="text-[11px] text-ink">{row.assignee}</p>
                      <p className="text-[10px] text-ink-tertiary">
                        {row.verifier ? `verifier: ${row.verifier}` : 'no verifier assigned'}
                      </p>
                    </div>
                  ),
                  hideBelow: 'lg',
                },
                {
                  key: 'flags',
                  header: 'Flags',
                  render: (row) =>
                    row.flags.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {row.flags.slice(0, 2).map((flag) => (
                          <span
                            key={flag}
                            className="rounded-xs bg-surface-muted px-1 py-px text-[9px] text-ink-secondary"
                          >
                            {flag}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-[10px] text-ink-tertiary">—</span>
                    ),
                  hideBelow: 'xl',
                },
                {
                  key: 'sla',
                  header: 'SLA',
                  render: (row) =>
                    row.status === 'completed' ? (
                      <Badge tone="success" size="sm">
                        Closed
                      </Badge>
                    ) : (
                      <SlaCountdown hoursLeft={row.slaHoursLeft} state={row.slaState} compact />
                    ),
                },
                {
                  key: 'value',
                  header: 'Value',
                  render: (row) => (
                    <span className="whitespace-nowrap text-[11px] font-medium text-ink numeric">
                      {formatMoney(row.value)}
                    </span>
                  ),
                  align: 'right',
                  hideBelow: 'sm',
                },
                {
                  key: 'opened',
                  header: 'Opened',
                  render: (row) => (
                    <span className="whitespace-nowrap text-[10px] text-ink-tertiary">
                      {formatDate(row.openedAt)}
                    </span>
                  ),
                  align: 'right',
                  hideBelow: 'xl',
                },
              ]}
            />
          </CardBody>
        </Card>
      </div>

      <div className="mt-5">
        <Card>
          <CardHeader
            title="Transition guardrails"
            description="Enforced by the state machine and the API permission layer — the interface cannot bypass either."
          />
          <CardBody>
            <div className="grid gap-4 lg:grid-cols-3">
              <div>
                <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-success">
                  <Icon name="check" className="h-3.5 w-3.5" />
                  Allowed
                </p>
                <ul className="space-y-1.5">
                  {[
                    'intake → document_collection',
                    'document_collection → verification',
                    'verification → preparation (verifier approved)',
                    'preparation → approval',
                  ].map((item) => (
                    <li
                      key={item}
                      className="rounded-sm border border-line bg-surface px-2.5 py-1.5 font-mono text-[10px] text-ink-secondary"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-warning">
                  <Icon name="lock" className="h-3.5 w-3.5" />
                  Protected — approval required
                </p>
                <ul className="space-y-1.5">
                  {[
                    'approval → submitted (submission.approve)',
                    'submitted → decision (authority result)',
                    'document verification (document.verify)',
                    'refund issuance (refund.approve)',
                  ].map((item) => (
                    <li
                      key={item}
                      className="rounded-sm border border-warning/30 bg-warning-soft/60 px-2.5 py-1.5 font-mono text-[10px] text-warning"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-danger">
                  <Icon name="x" className="h-3.5 w-3.5" />
                  Always denied
                </p>
                <ul className="space-y-1.5">
                  {[
                    'verification → submitted (skips preparation)',
                    'any → decision without authority result',
                    'cross-tenant read or write',
                    'agent-initiated submission or merge',
                  ].map((item) => (
                    <li
                      key={item}
                      className="rounded-sm border border-danger/30 bg-danger-soft/60 px-2.5 py-1.5 font-mono text-[10px] text-danger"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
