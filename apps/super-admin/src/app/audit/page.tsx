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
  FilterBar,
  KpiTile,
  PageHeader,
  TabNav,
} from '@visahobe/ui';
import { auditEntries, formatDateTime, type AuditEntry } from '@visahobe/shared';
import { Icon } from '@/lib/icons';

export const metadata: Metadata = { title: 'Audit trail' };

const outcomeTone = { allowed: 'success', denied: 'danger', reviewed: 'warning' } as const;

export default function AuditPage() {
  const denied = auditEntries.filter((e) => e.outcome === 'denied');

  return (
    <div className="mx-auto max-w-[1500px]">
      <PageHeader
        title="Audit trail"
        description="Append-only record of every privileged action: who, what, which case, which permission, and whether it was allowed."
        breadcrumb="Governance / Audit"
        actions={
          <>
            <Button variant="secondary" size="sm">
              <Icon name="download" className="h-3.5 w-3.5" />
              Export CSV
            </Button>
            <Button variant="secondary" size="sm">
              <Icon name="shield-check" className="h-3.5 w-3.5" />
              Verify integrity
            </Button>
          </>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <KpiTile
          label="Events today"
          value={auditEntries.length}
          tone="brand"
          icon={<Icon name="audit" className="h-4 w-4" />}
        />
        <KpiTile
          label="Denied attempts"
          value={denied.length}
          tone="danger"
          icon={<Icon name="lock" className="h-4 w-4" />}
          hint="guardrails working"
        />
        <KpiTile
          label="Reviewed"
          value={auditEntries.filter((e) => e.outcome === 'reviewed').length}
          tone="warning"
          icon={<Icon name="alert" className="h-4 w-4" />}
        />
        <KpiTile
          label="Retention"
          value="7 yrs"
          tone="neutral"
          icon={<Icon name="history" className="h-4 w-4" />}
          hint="append-only"
        />
      </div>

      <div className="mt-4">
        <TabNav
          active="all"
          tabs={[
            { id: 'all', label: 'All events', href: '/audit', count: auditEntries.length },
            { id: 'denied', label: 'Denied', href: '/audit?outcome=denied', count: denied.length },
            { id: 'documents', label: 'Documents', href: '/audit?scope=documents' },
            { id: 'finance', label: 'Finance', href: '/audit?scope=finance' },
            { id: 'auth', label: 'Auth & roles', href: '/audit?scope=auth' },
          ]}
        />
      </div>

      <div className="mt-4 grid gap-5 xl:grid-cols-[1.7fr_1fr]">
        <div className="min-w-0 space-y-5">
          <Card>
            <CardHeader
              title="Event log"
              description="Immutable · hash-chained · newest first"
              action={
                <FilterBar
                  active="all"
                  options={[
                    { id: 'all', label: 'All', count: auditEntries.length },
                    { id: 'denied', label: 'Denied', count: denied.length },
                    {
                      id: 'agents',
                      label: 'Agent actions',
                      count: auditEntries.filter((e) => e.actor.includes('agent')).length,
                    },
                  ]}
                />
              }
            />
            <CardBody className="pt-1">
              <DataTable<AuditEntry>
                caption="Audit event log"
                rowKey={(row) => row.id}
                rows={auditEntries}
                columns={[
                  {
                    key: 'at',
                    header: 'Timestamp',
                    render: (row) => (
                      <span className="whitespace-nowrap font-mono text-[10px] text-ink-secondary">
                        {formatDateTime(row.at)}
                      </span>
                    ),
                  },
                  {
                    key: 'actor',
                    header: 'Actor',
                    render: (row) => (
                      <div>
                        <p className="text-[11px] font-medium text-ink">{row.actor}</p>
                        <p className="text-[9px] text-ink-tertiary">{row.role}</p>
                      </div>
                    ),
                  },
                  {
                    key: 'action',
                    header: 'Action',
                    render: (row) => (
                      <div>
                        <p className="font-mono text-[10px] text-brand-700">{row.action}</p>
                        <p className="text-[9px] leading-relaxed text-ink-tertiary">{row.detail}</p>
                      </div>
                    ),
                    hideBelow: 'md',
                  },
                  {
                    key: 'target',
                    header: 'Target',
                    render: (row) => (
                      <span className="font-mono text-[10px] text-ink-secondary">{row.entity}</span>
                    ),
                    hideBelow: 'lg',
                  },
                  {
                    key: 'outcome',
                    header: 'Outcome',
                    render: (row) => (
                      <Badge tone={outcomeTone[row.outcome]} size="sm">
                        {row.outcome}
                      </Badge>
                    ),
                  },
                  {
                    key: 'ip',
                    header: 'Source',
                    render: (row) => (
                      <span className="whitespace-nowrap font-mono text-[9px] text-ink-tertiary">
                        {row.ip}
                      </span>
                    ),
                    align: 'right',
                    hideBelow: 'xl',
                  },
                ]}
              />
            </CardBody>
          </Card>

          <Card>
            <CardHeader
              title="Denied attempts — detail"
              description="Every denial is retained, not suppressed."
            />
            <CardBody className="space-y-2 pt-2">
              {denied.map((entry) => (
                <div
                  key={entry.id}
                  className="rounded-md border border-danger/25 bg-danger-soft/40 px-3 py-2.5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-mono text-[10px] font-medium text-danger">{entry.action}</p>
                    <span className="font-mono text-[9px] text-ink-tertiary">
                      {formatDateTime(entry.at)}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-ink">
                    {entry.actor} <span className="text-ink-tertiary">({entry.role})</span> →{' '}
                    {entry.entity}
                  </p>
                  <p className="mt-0.5 text-[10px] leading-relaxed text-ink-secondary">
                    {entry.detail}
                  </p>
                  <p className="mt-1 text-[9px] text-ink-tertiary">
                    Required permission not held · source {entry.ip}
                  </p>
                </div>
              ))}
              <Alert tone="info" title="Denials are a feature, not an error">
                A denied attempt proves the permission boundary held. Repeated denials from one
                account raise a security review task automatically.
              </Alert>
            </CardBody>
          </Card>
        </div>

        <div className="space-y-5">
          <Card>
            <CardHeader title="Integrity" />
            <CardBody className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-ink-secondary">Hash chain</span>
                <Badge tone="success" size="sm">
                  intact
                </Badge>
              </div>
              <div className="rounded-md bg-surface-muted px-2.5 py-2">
                <p className="text-[9px] uppercase tracking-wide text-ink-tertiary">
                  Latest entry hash
                </p>
                <p className="mt-0.5 break-all font-mono text-[9px] text-ink-secondary">
                  b7f2c9a41e6d0f83ac5e21d4f9b8e7c6a3d2f1e0b9c8a7d6e5f4c3b2a1d0
                </p>
              </div>
              <p className="text-[10px] leading-relaxed text-ink-secondary">
                Entries are append-only and chained. Mutating or deleting an entry breaks
                verification, and the verifier is a scheduled job independent of the application
                write path.
              </p>
              <Button variant="secondary" size="sm" fullWidth>
                <Icon name="shield-check" className="h-3.5 w-3.5" />
                Run full verification
              </Button>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="What is always logged" />
            <CardBody className="space-y-2 pt-2">
              {[
                'Authentication and session changes',
                'Role and permission grants',
                'Document opens, downloads and signed URLs',
                'Verification approvals and returns',
                'Policy publication and version changes',
                'Invoice issue, settlement and refunds',
                'Agent tool calls and approval requests',
                'Browser session start, takeover and submit',
              ].map((item) => (
                <p
                  key={item}
                  className="flex items-start gap-1.5 text-[10px] leading-relaxed text-ink-secondary"
                >
                  <span className="mt-0.5 text-brand-600">✓</span>
                  {item}
                </p>
              ))}
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Export & retention" />
            <CardBody className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-ink-secondary">Standard retention</span>
                <span className="text-ink">7 years</span>
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-ink-secondary">Finance records</span>
                <span className="text-ink">per statute</span>
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-ink-secondary">Client export</span>
                <span className="text-ink">on request</span>
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-ink-secondary">Deletion</span>
                <span className="text-ink">after retention</span>
              </div>
            </CardBody>
          </Card>

          <div>
            <DisclaimerStrip>
              Audit data is staff-only. Clients can see the subset of events on their own case
              timeline, but never internal notes, denial details or other clients&apos; activity.
            </DisclaimerStrip>
          </div>
        </div>
      </div>
    </div>
  );
}
