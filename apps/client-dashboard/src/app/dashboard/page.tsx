import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Alert,
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Checklist,
  DonutChart,
  KpiTile,
  PageHeader,
  ProgressBar,
  SlaCountdown,
  Sparkline,
  StatusPipeline,
} from '@visahobe/ui';
import {
  caseStageLabels,
  caseStageOrder,
  clientCases,
  clientInvoices,
  clientKpis,
  clientNotifications,
  clientProfile,
  formatBDT,
  formatDate,
} from '@visahobe/shared';
import { Icon } from '@/lib/icons';

export const metadata: Metadata = { title: 'Overview' };

const activityTrend = [3, 5, 4, 7, 6, 9, 8, 11, 10, 13, 12, 15];

export default function ClientOverviewPage() {
  const activeCases = clientCases.filter((c) => c.status !== 'completed');
  const dueInvoice = clientInvoices.find((i) => i.status === 'due');
  const actions = activeCases.filter((c) => c.status === 'needs_action' || c.status === 'at_risk');

  const outstandingDocs = activeCases.flatMap((c) =>
    c.documents
      .filter((d) => d.status === 'missing' || d.status === 'needs_correction')
      .map((d) => ({
        id: `${c.id}-${d.id}`,
        label: `${d.name} — ${c.caseNumber}`,
        hint:
          d.status === 'missing'
            ? 'Not uploaded yet'
            : (d.note ?? 'Correction requested by the verifier'),
        done: false,
      })),
  );

  return (
    <div className="mx-auto max-w-[1400px]">
      <PageHeader
        title={`Good morning, ${clientProfile.name.split(' ')[0]}`}
        description="Here is where every case stands today, and exactly what needs you next."
        actions={
          <>
            <Link href="/cases/new">
              <Button variant="secondary" size="sm">
                <Icon name="plus" className="h-3.5 w-3.5" />
                Open a case
              </Button>
            </Link>
            <Link href="/documents/upload">
              <Button size="sm">
                <Icon name="upload" className="h-3.5 w-3.5" />
                Upload document
              </Button>
            </Link>
          </>
        }
        meta={
          <>
            <span className="flex items-center gap-1.5 text-xs text-ink-secondary">
              <Icon name="shield-check" className="h-3.5 w-3.5 text-brand-600" />
              Tenant: {clientProfile.tenantName}
            </span>
            <span className="font-mono text-[11px] text-ink-tertiary">
              tenant_id {clientProfile.tenantId}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-ink-secondary">
              <Icon name="lock" className="h-3.5 w-3.5 text-brand-600" />
              MFA enabled
            </span>
          </>
        }
      />

      {actions.length > 0 ? (
        <div className="mb-5">
          <Alert
            tone="warning"
            title={`${actions.length} case${actions.length > 1 ? 's need' : ' needs'} your action`}
            icon={<Icon name="alert" className="h-4 w-4" />}
          >
            <ul className="mt-1 space-y-1">
              {actions.map((c) => (
                <li key={c.id} className="flex flex-wrap items-center gap-2">
                  <Link
                    href={`/cases/${c.caseNumber}`}
                    className="font-mono text-[11px] font-medium underline underline-offset-2"
                  >
                    {c.caseNumber}
                  </Link>
                  <span className="text-xs">{c.nextAction}</span>
                  <SlaCountdown
                    hoursLeft={c.slaDaysLeft * 24}
                    state={c.slaDaysLeft <= 6 ? 'warning' : 'ok'}
                    compact
                  />
                </li>
              ))}
            </ul>
          </Alert>
        </div>
      ) : null}

      {/* KPIs */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <KpiTile
          label="Active cases"
          value={clientKpis.activeCases}
          hint="across 3 destinations"
          icon={<Icon name="cases" className="h-4 w-4" />}
        />
        <KpiTile
          label="Needs your action"
          value={clientKpis.actionsRequired}
          tone="warning"
          hint="oldest waiting 3 days"
          icon={<Icon name="alert" className="h-4 w-4" />}
        />
        <KpiTile
          label="Documents verified"
          value={clientKpis.documentsVerified}
          tone="success"
          delta={{ value: '+3 this week', direction: 'up' }}
          icon={<Icon name="file-check" className="h-4 w-4" />}
        />
        <KpiTile
          label="Outstanding balance"
          value={formatBDT(clientKpis.outstanding)}
          tone={clientKpis.outstanding > 0 ? 'warning' : 'success'}
          hint={dueInvoice ? `due ${formatDate(dueInvoice.dueAt!)}` : 'nothing due'}
          icon={<Icon name="wallet" className="h-4 w-4" />}
        />
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.65fr_1fr]">
        {/* Cases */}
        <div className="min-w-0 space-y-5">
          <Card>
            <CardHeader
              title="Your cases"
              description="Ordered by the next action required."
              action={
                <Link
                  href="/cases"
                  className="text-xs font-semibold text-brand-700 hover:underline"
                >
                  View all
                </Link>
              }
            />
            <CardBody className="space-y-3 pt-3">
              {activeCases.map((c) => {
                const stageIndex = caseStageOrder.indexOf(c.stage);
                const missing = c.documents.filter(
                  (d) => d.status === 'missing' || d.status === 'needs_correction',
                ).length;
                return (
                  <Link
                    key={c.id}
                    href={`/cases/${c.caseNumber}`}
                    className="block rounded-md border border-line bg-surface p-4 transition-colors hover:border-brand-200 hover:bg-brand-50/30"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-[11px] text-ink-tertiary">
                            {c.caseNumber}
                          </span>
                          <Badge
                            tone={
                              c.status === 'on_track'
                                ? 'success'
                                : c.status === 'needs_action'
                                  ? 'warning'
                                  : c.status === 'at_risk'
                                    ? 'danger'
                                    : 'neutral'
                            }
                            size="sm"
                            dot
                          >
                            {c.status === 'on_track'
                              ? 'On track'
                              : c.status === 'needs_action'
                                ? 'Needs your action'
                                : c.status === 'at_risk'
                                  ? 'At risk'
                                  : 'Blocked'}
                          </Badge>
                          {missing > 0 ? (
                            <Badge tone="warning" size="sm">
                              {missing} doc{missing > 1 ? 's' : ''} outstanding
                            </Badge>
                          ) : null}
                        </div>
                        <p className="mt-1 text-sm font-semibold text-ink">
                          <span aria-hidden className="mr-1.5">
                            {c.flag}
                          </span>
                          {c.service} · {c.country}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] uppercase tracking-wide text-ink-tertiary">
                          Target
                        </p>
                        <p className="text-xs font-medium text-ink">{formatDate(c.targetDate)}</p>
                      </div>
                    </div>

                    <div className="mt-3">
                      <StatusPipeline
                        stages={[
                          'Intake',
                          'Documents',
                          'Verification',
                          'Preparation',
                          'Approval',
                          'Submitted',
                        ]}
                        currentIndex={Math.min(stageIndex, 5)}
                      />
                    </div>

                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-2.5">
                      <p className="flex items-center gap-1.5 text-xs text-ink-secondary">
                        <Icon
                          name={c.nextActionOwner === 'client' ? 'alert' : 'clock'}
                          className={
                            c.nextActionOwner === 'client'
                              ? 'h-3.5 w-3.5 text-warning'
                              : 'h-3.5 w-3.5 text-ink-tertiary'
                          }
                        />
                        <span className="font-medium text-ink">
                          {c.nextActionOwner === 'client' ? 'You: ' : 'Next: '}
                        </span>
                        {c.nextAction}
                      </p>
                      <SlaCountdown
                        hoursLeft={c.slaDaysLeft * 24}
                        state={
                          c.slaDaysLeft <= 3 ? 'breach' : c.slaDaysLeft <= 7 ? 'warning' : 'ok'
                        }
                        compact
                      />
                    </div>
                  </Link>
                );
              })}
            </CardBody>
          </Card>

          <Card>
            <CardHeader
              title="Document activity"
              description="Uploads, verifications and corrections over the last 12 weeks."
              action={
                <div className="flex items-center gap-3 text-[10px] text-ink-tertiary">
                  <span className="flex items-center gap-1">
                    <span className="h-1.5 w-3 rounded-full bg-brand-600" /> Documents handled
                  </span>
                </div>
              }
            />
            <CardBody>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="font-display text-2xl font-semibold text-ink numeric">15</p>
                  <p className="text-[11px] text-ink-tertiary">documents this quarter</p>
                </div>
                <Sparkline
                  values={activityTrend}
                  width={220}
                  height={48}
                  ariaLabel="Document activity trend"
                />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-line pt-3 sm:grid-cols-4">
                {[
                  { k: 'Verified', v: '9', tone: 'text-success' },
                  { k: 'In review', v: '3', tone: 'text-info' },
                  { k: 'Correction', v: '2', tone: 'text-warning' },
                  { k: 'Missing', v: '1', tone: 'text-danger' },
                ].map((stat) => (
                  <div key={stat.k}>
                    <p className="text-[10px] uppercase tracking-wide text-ink-tertiary">
                      {stat.k}
                    </p>
                    <p className={`font-display text-base font-semibold numeric ${stat.tone}`}>
                      {stat.v}
                    </p>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Right rail */}
        <div className="space-y-5">
          <Card>
            <CardHeader title="Action checklist" description="Required to keep cases moving." />
            <CardBody className="pt-1">
              {outstandingDocs.length > 0 ? (
                <Checklist items={outstandingDocs} />
              ) : (
                <p className="py-4 text-center text-xs text-ink-secondary">
                  Nothing outstanding. Your files are fully supplied.
                </p>
              )}
              <Link href="/documents/upload" className="mt-2 block">
                <Button variant="secondary" size="sm" fullWidth>
                  <Icon name="upload" className="h-3.5 w-3.5" />
                  Upload missing documents
                </Button>
              </Link>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Document status" />
            <CardBody>
              <DonutChart
                centerValue="60%"
                centerLabel="verified"
                segments={[
                  { label: 'Verified', value: 9, color: 'var(--color-success)' },
                  { label: 'In review', value: 3, color: 'var(--color-info)' },
                  { label: 'Correction', value: 2, color: 'var(--color-warning)' },
                  { label: 'Missing', value: 1, color: 'var(--color-danger)' },
                ]}
              />
            </CardBody>
          </Card>

          {dueInvoice ? (
            <Card>
              <CardHeader
                title="Payment due"
                action={
                  <Badge tone="warning" size="sm">
                    Due
                  </Badge>
                }
              />
              <CardBody>
                <p className="font-mono text-[11px] text-ink-tertiary">{dueInvoice.number}</p>
                <p className="mt-1 text-sm text-ink">{dueInvoice.description}</p>
                <p className="mt-2 font-display text-xl font-semibold text-ink numeric">
                  {formatBDT(dueInvoice.amount)}
                </p>
                <p className="text-[11px] text-ink-tertiary">
                  Due {formatDate(dueInvoice.dueAt!)} · {dueInvoice.caseNumber}
                </p>
                <Link href="/invoices" className="mt-3 block">
                  <Button size="sm" fullWidth>
                    Pay or view invoice
                  </Button>
                </Link>
              </CardBody>
            </Card>
          ) : null}

          <Card>
            <CardHeader title="Your team" />
            <CardBody className="space-y-2.5 pt-2">
              {[
                { name: 'Ayesha Rahman', role: 'Case manager · 2 cases', initials: 'AR' },
                { name: 'Tanvir Ahmed', role: 'Verifier · documents', initials: 'TA' },
                { name: 'Nusrat Jahan', role: 'Case manager · Schengen', initials: 'NJ' },
              ].map((member) => (
                <div key={member.name} className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-[10px] font-semibold text-brand-800">
                    {member.initials}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium text-ink">{member.name}</p>
                    <p className="truncate text-[10px] text-ink-tertiary">{member.role}</p>
                  </div>
                </div>
              ))}
              <Link href="/messages" className="mt-1 block">
                <Button variant="secondary" size="sm" fullWidth>
                  Message the team
                </Button>
              </Link>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Recent notifications" />
            <CardBody className="pt-1">
              <ul className="divide-y divide-line">
                {clientNotifications.slice(0, 4).map((n) => (
                  <li key={n.id} className="py-2">
                    <Link href={n.href} className="block">
                      <p className="text-xs font-medium text-ink">{n.title}</p>
                      <p className="mt-0.5 font-mono text-[9px] text-ink-tertiary">
                        {n.at.slice(0, 10)}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        {activeCases.slice(1, 4).map((c) => (
          <div key={c.id} className="card-surface p-4">
            <p className="font-mono text-[10px] text-ink-tertiary">{c.caseNumber}</p>
            <p className="mt-1 text-sm font-medium text-ink">
              {c.flag} {c.country}
            </p>
            <p className="mt-0.5 text-[11px] text-ink-secondary">
              {caseStageLabels[c.stage]} · {c.owner}
            </p>
            <div className="mt-2.5">
              <ProgressBar value={c.progress} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
