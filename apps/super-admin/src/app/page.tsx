import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Alert,
  AreaChart,
  Badge,
  BarChart,
  Button,
  Card,
  CardBody,
  CardHeader,
  DataTable,
  DonutChart,
  KpiTile,
  PageHeader,
  ProgressBar,
  SlaCountdown,
  Sparkline,
  StatusPipeline,
} from '@visahobe/ui';
import {
  adminCases,
  adminInvoices,
  adminKpis,
  adminTasks,
  agentRuns,
  browserSessions,
  caseStageLabels,
  formatMoney,
  policyPacks,
  verificationQueue,
  type AdminCase,
} from '@visahobe/shared';
import { Icon } from '@/lib/icons';

export const metadata: Metadata = { title: 'Command centre' };

const slaBuckets = adminCases
  .filter((c) => c.status !== 'completed')
  .map((c) => ({ label: c.caseNumber.slice(-4), value: Math.max(c.slaHoursLeft, 1) }));

const weekly = [42, 38, 51, 47, 63, 58, 71];
const priorWeekly = [35, 40, 44, 41, 52, 55, 60];

export default function AdminHomePage() {
  const urgent = adminCases.filter((c) => c.slaState !== 'ok' && c.status !== 'completed');
  const blocked = adminCases.filter((c) => c.status === 'blocked');

  return (
    <div className="mx-auto max-w-[1500px]">
      <PageHeader
        title="Command centre"
        description="Live operational state across cases, verification, finance, agents and browser sessions. Everything below is role-scoped and audited."
        breadcrumb="Operations / Command centre"
        actions={
          <>
            <Link href="/cases">
              <Button variant="secondary" size="sm">
                <Icon name="cases" className="h-3.5 w-3.5" />
                Case queue
              </Button>
            </Link>
            <Link href="/verification">
              <Button size="sm">
                <Icon name="checks" className="h-3.5 w-3.5" />
                Verification gates
              </Button>
            </Link>
          </>
        }
        meta={
          <>
            <span className="flex items-center gap-1.5 text-xs text-ink-secondary">
              <Icon name="clock" className="h-3.5 w-3.5 text-ink-tertiary" />
              Updated {new Date().toISOString().slice(0, 16).replace('T', ' ')} UTC
            </span>
            <span className="flex items-center gap-1.5 text-xs text-ink-secondary">
              <Icon name="shield-check" className="h-3.5 w-3.5 text-success" />
              MFA session · owner scope
            </span>
            <span className="font-mono text-[11px] text-ink-tertiary">tenant scope: internal</span>
          </>
        }
      />

      {urgent.length + blocked.length > 0 ? (
        <div className="mb-5 space-y-2">
          {blocked.map((c) => (
            <Alert
              key={c.id}
              tone="danger"
              title={`Blocked: ${c.caseNumber} — ${c.service} (${c.country})`}
              icon={<Icon name="alert" className="h-4 w-4" />}
            >
              <span className="text-xs">
                {c.flags.join(' · ')} · Value {formatMoney(c.value)} · Owner {c.assignee}.{' '}
                <Link
                  href={`/cases/${c.caseNumber}`}
                  className="font-semibold underline underline-offset-2"
                >
                  Open case →
                </Link>
              </span>
            </Alert>
          ))}
          {urgent.length > 0 ? (
            <Alert
              tone="warning"
              title={`${urgent.length} cases at SLA risk`}
              icon={<Icon name="timer" className="h-4 w-4" />}
            >
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                {urgent.map((c) => (
                  <span key={c.id} className="flex items-center gap-1.5">
                    <Link
                      href={`/cases/${c.caseNumber}`}
                      className="font-mono underline underline-offset-2"
                    >
                      {c.caseNumber}
                    </Link>
                    <SlaCountdown hoursLeft={c.slaHoursLeft} state={c.slaState} compact />
                  </span>
                ))}
              </div>
            </Alert>
          ) : null}
        </div>
      ) : null}

      {/* KPI row */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <KpiTile
          label="Open cases"
          value={adminKpis.openCases}
          delta={{ value: '+3 this week', direction: 'up' }}
          icon={<Icon name="cases" className="h-4 w-4" />}
          hint="across 8 tenants"
        />
        <KpiTile
          label="SLA at risk"
          value={adminKpis.slaAtRisk}
          tone="danger"
          hint="1 breach, 2 warning"
          icon={<Icon name="timer" className="h-4 w-4" />}
        />
        <KpiTile
          label="Awaiting verification"
          value={adminKpis.pendingVerifications}
          tone="warning"
          hint="oldest 5h to SLA"
          icon={<Icon name="checks" className="h-4 w-4" />}
        />
        <KpiTile
          label="Collected (month)"
          value={formatMoney(adminKpis.monthlyRevenue)}
          tone="success"
          delta={{ value: '+12.4%', direction: 'up' }}
          icon={<Icon name="wallet" className="h-4 w-4" />}
        />
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <KpiTile
          label="Active agent runs"
          value={adminKpis.activeAgentRuns}
          tone="info"
          icon={<Icon name="bot" className="h-4 w-4" />}
          hint="1 awaiting approval"
        />
        <KpiTile
          label="Live browser sessions"
          value={adminKpis.liveSessions}
          tone="brand"
          icon={<Icon name="globe" className="h-4 w-4" />}
          hint="1 under human takeover"
        />
        <KpiTile
          label="Overdue invoices"
          value={adminKpis.overdueInvoices}
          tone="danger"
          icon={<Icon name="receipt" className="h-4 w-4" />}
          hint="BDT 22,500 outstanding"
        />
        <KpiTile
          label="Policy reviews due"
          value={adminKpis.policyReviewsDue}
          tone="warning"
          icon={<Icon name="book" className="h-4 w-4" />}
          hint="AU pack expires 1 Dec"
        />
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.7fr_1fr]">
        <div className="min-w-0 space-y-5">
          {/* Case queue */}
          <Card>
            <CardHeader
              title="Priority case queue"
              description="Sorted by SLA pressure. Protected transitions require approval."
              action={
                <Link
                  href="/cases"
                  className="text-xs font-semibold text-brand-700 hover:underline"
                >
                  Full queue
                </Link>
              }
            />
            <CardBody className="pt-1">
              <DataTable<AdminCase>
                caption="Priority cases"
                dense
                rowKey={(row) => row.id}
                rows={adminCases.filter((c) => c.status !== 'completed').slice(0, 6)}
                columns={[
                  {
                    key: 'case',
                    header: 'Case',
                    render: (row) => (
                      <div>
                        <Link
                          href={`/cases/${row.caseNumber}`}
                          className="font-mono text-[10px] text-brand-700 hover:underline"
                        >
                          {row.caseNumber}
                        </Link>
                        <p className="text-xs font-medium text-ink">
                          {row.flag} {row.service}
                        </p>
                        <p className="text-[10px] text-ink-tertiary">{row.clientName}</p>
                      </div>
                    ),
                  },
                  {
                    key: 'stage',
                    header: 'Stage',
                    render: (row) => (
                      <div>
                        <p className="text-[10px] font-medium text-ink">
                          {caseStageLabels[row.stage]}
                        </p>
                        <Badge
                          tone={
                            row.status === 'blocked'
                              ? 'danger'
                              : row.status === 'at_risk'
                                ? 'warning'
                                : 'neutral'
                          }
                          size="sm"
                        >
                          {row.status.replace('_', ' ')}
                        </Badge>
                      </div>
                    ),
                    hideBelow: 'md',
                  },
                  {
                    key: 'assignee',
                    header: 'Owner',
                    render: (row) => (
                      <span className="text-[10px] text-ink-secondary">{row.assignee}</span>
                    ),
                    hideBelow: 'lg',
                  },
                  {
                    key: 'sla',
                    header: 'SLA',
                    render: (row) => (
                      <SlaCountdown hoursLeft={row.slaHoursLeft} state={row.slaState} compact />
                    ),
                  },
                  {
                    key: 'value',
                    header: 'Value',
                    render: (row) => (
                      <span className="whitespace-nowrap text-[10px] font-medium text-ink numeric">
                        {formatMoney(row.value)}
                      </span>
                    ),
                    align: 'right',
                    hideBelow: 'xl',
                  },
                ]}
              />
            </CardBody>
          </Card>

          {/* Trends */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader title="Case throughput" description="Opened vs. closed, last 7 weeks" />
              <CardBody>
                <AreaChart
                  height={170}
                  labels={['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7']}
                  ariaLabel="Weekly case throughput"
                  series={[
                    { label: 'Opened', values: weekly, tone: 'brand' },
                    { label: 'Prior period', values: priorWeekly, tone: 'muted' },
                  ]}
                />
                <div className="mt-2 flex items-center gap-5 text-[10px] text-ink-tertiary">
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-4 rounded-full bg-brand-600" /> Opened
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-4 rounded-full bg-line-strong" /> Prior period
                  </span>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardHeader title="SLA headroom by case" description="Hours remaining" />
              <CardBody>
                <BarChart
                  height={150}
                  data={slaBuckets.map((b) => ({ label: b.label, value: b.value }))}
                  valueFormatter={(v) => `${v}h`}
                />
                <p className="mt-2 text-[10px] text-ink-tertiary">
                  Bars below 24 hours are at breach risk. Escalation fires automatically at 12
                  hours.
                </p>
              </CardBody>
            </Card>
          </div>

          {/* Verification queue */}
          <Card>
            <CardHeader
              title="Verification gates"
              description="AI extraction is a draft. A human verifier approves or returns."
              action={
                <Link
                  href="/verification"
                  className="text-xs font-semibold text-brand-700 hover:underline"
                >
                  Open queue
                </Link>
              }
            />
            <CardBody className="space-y-2 pt-2">
              {verificationQueue.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-line px-3 py-2"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-ink">{item.document}</p>
                    <p className="font-mono text-[10px] text-ink-tertiary">
                      {item.caseNumber} · {item.client}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-xs bg-surface-muted px-1.5 py-0.5 text-[9px] font-medium text-ink-secondary">
                      OCR confidence {item.agentConfidence}%
                    </span>
                    <SlaCountdown
                      hoursLeft={item.slaHoursLeft}
                      state={
                        item.slaHoursLeft <= 6
                          ? 'breach'
                          : item.slaHoursLeft <= 24
                            ? 'warning'
                            : 'ok'
                      }
                      compact
                    />
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>
        </div>

        {/* Right rail */}
        <div className="space-y-5">
          <Card>
            <CardHeader title="My tasks" description="Assigned to me across workspaces." />
            <CardBody className="pt-1">
              <ul className="divide-y divide-line">
                {adminTasks.slice(0, 5).map((task) => (
                  <li key={task.id} className="py-2">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-medium text-ink">{task.title}</p>
                      <SlaCountdown
                        hoursLeft={
                          task.slaState === 'breach' ? 0 : task.slaState === 'warning' ? 12 : 72
                        }
                        state={task.slaState}
                        compact
                      />
                    </div>
                    <p className="mt-0.5 text-[10px] text-ink-tertiary">
                      {task.caseNumber ?? 'Platform'} · {task.role} · {task.dueIn}
                    </p>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>

          <Card>
            <CardHeader
              title="Agent activity"
              action={
                <Badge tone="info" size="sm">
                  live
                </Badge>
              }
            />
            <CardBody className="pt-1">
              <ul className="space-y-2">
                {agentRuns.slice(0, 4).map((run) => (
                  <li key={run.id} className="rounded-md bg-surface-muted/70 px-2.5 py-2">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-[11px] font-medium text-ink">{run.agent}</p>
                      <Badge
                        tone={
                          run.status === 'succeeded'
                            ? 'success'
                            : run.status === 'running'
                              ? 'info'
                              : run.status === 'awaiting_approval'
                                ? 'warning'
                                : run.status === 'failed'
                                  ? 'danger'
                                  : 'warning'
                        }
                        size="sm"
                      >
                        {run.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <p className="mt-0.5 truncate text-[10px] text-ink-secondary">{run.summary}</p>
                    <p className="mt-0.5 font-mono text-[9px] text-ink-tertiary">
                      {run.model} · {run.toolCalls} tools · ${run.costUsd.toFixed(2)}
                    </p>
                  </li>
                ))}
              </ul>
              <Link
                href="/agents"
                className="mt-2 block text-center text-[11px] font-semibold text-brand-700 hover:underline"
              >
                Open agent console →
              </Link>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Browser sessions" />
            <CardBody className="pt-1">
              <ul className="space-y-2">
                {browserSessions.slice(0, 3).map((session) => (
                  <li key={session.id} className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-[11px] font-medium text-ink">{session.portal}</p>
                      <p className="font-mono text-[9px] text-ink-tertiary">{session.sessionId}</p>
                    </div>
                    <Badge
                      tone={
                        session.status === 'live'
                          ? 'success'
                          : session.status === 'takeover'
                            ? 'info'
                            : session.status === 'paused'
                              ? 'warning'
                              : 'neutral'
                      }
                      size="sm"
                      dot
                    >
                      {session.status}
                    </Badge>
                  </li>
                ))}
              </ul>
              <Link
                href="/browser"
                className="mt-2 block text-center text-[11px] font-semibold text-brand-700 hover:underline"
              >
                Open live streams →
              </Link>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Revenue mix" />
            <CardBody>
              <DonutChart
                size={116}
                centerValue="8"
                centerLabel="routes"
                segments={[
                  { label: 'Student', value: 42, color: 'var(--color-brand-700)' },
                  { label: 'Work', value: 26, color: 'var(--color-brand-500)' },
                  { label: 'Visit', value: 18, color: 'var(--color-brand-300)' },
                  { label: 'Business', value: 14, color: 'var(--color-brand-200)' },
                ]}
              />
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Policy pack health" />
            <CardBody className="space-y-2 pt-1">
              {policyPacks.slice(0, 4).map((pack) => (
                <div key={pack.id} className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5 text-[11px] text-ink-secondary">
                    <span aria-hidden>{pack.flag}</span>
                    {pack.country}
                  </span>
                  <Badge
                    tone={
                      pack.status === 'published'
                        ? 'success'
                        : pack.status === 'expiring'
                          ? 'warning'
                          : pack.status === 'in_review'
                            ? 'info'
                            : 'neutral'
                    }
                    size="sm"
                  >
                    {pack.status.replace('_', ' ')}
                  </Badge>
                </div>
              ))}
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader title="Finance exceptions" />
          <CardBody className="pt-1">
            <ul className="divide-y divide-line">
              {adminInvoices
                .filter((i) => i.reconciliation !== 'matched')
                .slice(0, 3)
                .map((invoice) => (
                  <li key={invoice.id} className="flex items-center justify-between gap-2 py-2">
                    <div>
                      <p className="font-mono text-[10px] text-ink">{invoice.number}</p>
                      <p className="text-[10px] text-ink-tertiary">{invoice.client}</p>
                    </div>
                    <Badge
                      tone={invoice.reconciliation === 'exception' ? 'danger' : 'warning'}
                      size="sm"
                    >
                      {invoice.reconciliation}
                    </Badge>
                  </li>
                ))}
            </ul>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Throughput health" />
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-wide text-ink-tertiary">
                  Median time to verification
                </p>
                <p className="font-display text-xl font-semibold text-ink numeric">18h</p>
              </div>
              <Sparkline
                values={[26, 24, 22, 25, 21, 19, 18]}
                tone="success"
                width={110}
                height={36}
              />
            </div>
            <div className="mt-3 space-y-2">
              <ProgressBar value={82} label="Cases inside SLA" tone="success" />
              <ProgressBar value={64} label="Docs verified on first pass" tone="brand" />
              <ProgressBar value={12} label="Escalations this week" tone="warning" />
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Queue by stage" />
          <CardBody className="pt-2">
            <StatusPipeline
              stages={['Intake', 'Docs', 'Verify', 'Prep', 'Approval', 'Filed']}
              currentIndex={2}
            />
            <ul className="mt-3 space-y-1.5">
              {[
                ['Intake', 1],
                ['Document collection', 2],
                ['Verification', 3],
                ['Preparation', 1],
                ['Approval', 1],
              ].map(([label, count]) => (
                <li key={String(label)} className="flex items-center justify-between text-[11px]">
                  <span className="text-ink-secondary">{label}</span>
                  <span className="font-medium text-ink numeric">{count}</span>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
