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
  ProgressBar,
} from '@visahobe/ui';
import { countryGuides, policyPacks, formatDate } from '@visahobe/shared';
import { Icon } from '@/lib/icons';

export const metadata: Metadata = { title: 'Policy packs' };

const statusTone = {
  published: 'success',
  in_review: 'info',
  draft: 'neutral',
  expiring: 'warning',
} as const;

export default function PoliciesPage() {
  const canada = countryGuides.find((c) => c.slug === 'canada')!;
  const germany = countryGuides.find((c) => c.slug === 'germany')!;

  return (
    <div className="mx-auto max-w-[1500px]">
      <PageHeader
        title="Country policy packs"
        description="Versioned, source-cited requirement sets. Every client checklist is generated from the pack in force at case creation, and changes trigger re-verification flags."
        breadcrumb="Knowledge / Policy packs"
        actions={
          <>
            <Button variant="secondary" size="sm">
              <Icon name="history" className="h-3.5 w-3.5" />
              Version history
            </Button>
            <Button size="sm">
              <Icon name="plus" className="h-3.5 w-3.5" />
              New pack
            </Button>
          </>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <KpiTile
          label="Published packs"
          value={policyPacks.filter((p) => p.status === 'published').length}
          tone="success"
          icon={<Icon name="book" className="h-4 w-4" />}
        />
        <KpiTile
          label="Awaiting review"
          value={policyPacks.filter((p) => p.status === 'in_review' || p.status === 'draft').length}
          tone="warning"
          icon={<Icon name="checks" className="h-4 w-4" />}
        />
        <KpiTile
          label="Expiring soon"
          value={policyPacks.filter((p) => p.status === 'expiring').length}
          tone="danger"
          icon={<Icon name="timer" className="h-4 w-4" />}
          hint="AU-SUB500 on 1 Dec"
        />
        <KpiTile
          label="Sources tracked"
          value={policyPacks.reduce((s, p) => s + p.sources, 0)}
          tone="brand"
          icon={<Icon name="shield-check" className="h-4 w-4" />}
        />
      </div>

      <div className="mt-4">
        <Alert
          tone="warning"
          title="Publishing is a protected action"
          icon={<Icon name="lock" className="h-4 w-4" />}
        >
          Requiring <span className="font-mono text-[11px]">policy.publish</span> and at least two
          reviewed sources per route. An attempted publish of DE-STU-2024.2 was denied on 9 Nov
          because two sources remain unreviewed — the denial is in the audit log.
        </Alert>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <div className="min-w-0 space-y-5">
          <Card>
            <CardHeader
              title="Pack register"
              description="Version, effective date and next review."
            />
            <CardBody className="pt-1">
              <DataTable
                caption="Policy pack register"
                rowKey={(row) => row.id}
                rows={policyPacks}
                columns={[
                  {
                    key: 'country',
                    header: 'Country',
                    render: (row) => (
                      <div className="flex items-center gap-2">
                        <span aria-hidden className="text-base">
                          {row.flag}
                        </span>
                        <div>
                          <p className="text-xs font-medium text-ink">{row.country}</p>
                          <p className="font-mono text-[10px] text-ink-tertiary">{row.version}</p>
                        </div>
                      </div>
                    ),
                  },
                  {
                    key: 'routes',
                    header: 'Routes',
                    render: (row) => (
                      <span className="text-[11px] text-ink numeric">{row.routes}</span>
                    ),
                    align: 'center',
                    hideBelow: 'sm',
                  },
                  {
                    key: 'sources',
                    header: 'Sources',
                    render: (row) => (
                      <span className="text-[11px] text-ink numeric">{row.sources}</span>
                    ),
                    align: 'center',
                    hideBelow: 'md',
                  },
                  {
                    key: 'status',
                    header: 'Status',
                    render: (row) => (
                      <Badge tone={statusTone[row.status]} size="sm">
                        {row.status.replace('_', ' ')}
                      </Badge>
                    ),
                  },
                  {
                    key: 'effective',
                    header: 'Effective',
                    render: (row) => (
                      <span className="whitespace-nowrap font-mono text-[10px] text-ink-secondary">
                        {row.effectiveFrom}
                      </span>
                    ),
                    hideBelow: 'lg',
                  },
                  {
                    key: 'review',
                    header: 'Next review',
                    render: (row) => (
                      <span className="whitespace-nowrap text-[10px] text-ink-tertiary">
                        {formatDate(row.nextReview)}
                      </span>
                    ),
                    align: 'right',
                    hideBelow: 'xl',
                  },
                  {
                    key: 'owner',
                    header: 'Owner',
                    render: (row) => (
                      <span className="whitespace-nowrap text-[10px] text-ink-secondary">
                        {row.owner}
                      </span>
                    ),
                    align: 'right',
                    hideBelow: 'lg',
                  },
                ]}
              />
            </CardBody>
          </Card>

          <Card>
            <CardHeader
              title={`${canada.name} pack — ${canada.policySources[0]?.version}`}
              description="Published · this is the version currently generating client checklists."
              action={
                <Badge tone="success" size="sm">
                  published
                </Badge>
              }
            />
            <CardBody>
              <div className="space-y-2">
                {canada.policySources.map((source) => (
                  <div key={source.url} className="rounded-md border border-line px-3 py-2.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-xs font-medium text-ink">{source.title}</p>
                      <span className="rounded-xs bg-surface-muted px-1.5 py-0.5 font-mono text-[9px] text-ink-secondary">
                        {source.version}
                      </span>
                    </div>
                    <p className="mt-0.5 text-[10px] text-ink-tertiary">
                      {source.publisher} · effective {source.effectiveFrom}
                    </p>
                    <div className="mt-1.5 flex items-center gap-2">
                      <Badge tone="success" size="sm">
                        reviewed
                      </Badge>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-[10px] font-medium text-brand-700 hover:underline"
                      >
                        Official source ↗
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <p className="text-label font-semibold uppercase tracking-wide text-ink-tertiary">
                  Route coverage
                </p>
                <ul className="mt-2 space-y-1.5">
                  {canada.routes.map((route) => (
                    <li
                      key={route.id}
                      className="flex items-center justify-between rounded-sm bg-surface-muted px-2.5 py-1.5"
                    >
                      <span className="text-[11px] text-ink">{route.name}</span>
                      <span className="font-mono text-[9px] text-ink-tertiary">
                        {route.keyRequirements.length} requirements
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <DisclaimerStrip>
                  A pack update never silently changes a live case. Affected cases receive a
                  re-verification flag and a visible timeline entry, and the client is notified.
                </DisclaimerStrip>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader
              title={`${germany.name} pack — in review`}
              description="Blocked from publishing: two sources unreviewed."
              action={
                <Badge tone="info" size="sm">
                  in review
                </Badge>
              }
            />
            <CardBody>
              <div className="rounded-md border border-warning/25 bg-warning-soft/40 px-3 py-2.5">
                <p className="text-[11px] font-medium text-warning">Publish blocked</p>
                <p className="mt-0.5 text-[10px] leading-relaxed text-ink-secondary">
                  Attempted on 9 Nov 2026 by sadia.islam (policy_editor) — denied. Every route
                  requires at least two reviewed sources before publication.
                </p>
              </div>
              <div className="mt-3 space-y-2">
                {germany.keyFacts.map((fact) => (
                  <div
                    key={fact.label}
                    className="flex items-start justify-between gap-3 text-[11px]"
                  >
                    <span className="text-ink-tertiary">{fact.label}</span>
                    <span className="text-right text-ink-secondary">{fact.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button variant="secondary" size="sm">
                  Open source review
                </Button>
                <Button variant="ghost" size="sm">
                  <Icon name="history" className="h-3.5 w-3.5" />
                  Diff against live
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="space-y-5">
          <Card>
            <CardHeader title="Source review status" />
            <CardBody className="space-y-2.5 pt-2">
              {[
                { label: 'Official sources reviewed', value: 31, total: 41 },
                { label: 'Routes fully covered', value: 9, total: 12 },
                { label: 'Effective dates in future', value: 2, total: 41 },
              ].map((row) => (
                <div key={row.label}>
                  <ProgressBar
                    value={(row.value / row.total) * 100}
                    label={`${row.label} (${row.value}/${row.total})`}
                    tone={row.value / row.total > 0.8 ? 'success' : 'warning'}
                  />
                </div>
              ))}
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Editorial workflow" description="Draft → review → publish." />
            <CardBody className="pt-1">
              <ol className="space-y-2">
                {[
                  ['Draft', 'policy_editor writes the change', 'neutral'],
                  ['Source review', 'second reviewer confirms each citation', 'info'],
                  ['Approval', 'admin with policy.publish', 'warning'],
                  ['Publish', 'effective date set, cases flagged', 'success'],
                ].map(([stage, detail, tone]) => (
                  <li key={String(stage)} className="flex items-start gap-2.5">
                    <Badge tone={tone as 'neutral' | 'info' | 'warning' | 'success'} size="sm">
                      {stage}
                    </Badge>
                    <span className="text-[10px] leading-relaxed text-ink-secondary">{detail}</span>
                  </li>
                ))}
              </ol>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Change log" />
            <CardBody className="pt-1">
              <ul className="divide-y divide-line">
                {[
                  ['2026-11-05', 'Germany blocked account figure refreshed'],
                  ['2026-11-01', 'Canada study permit pack → IRCC-SP-2024.1'],
                  ['2026-10-28', 'UK Skilled Worker salary thresholds aligned'],
                  ['2026-10-20', 'Schengen Visa Code 2024.1 published'],
                  ['2026-10-15', 'Australia pack flagged for December review'],
                ].map(([date, change]) => (
                  <li key={String(change)} className="py-2">
                    <p className="font-mono text-[9px] text-ink-tertiary">{date}</p>
                    <p className="text-[11px] text-ink">{change}</p>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>

          <Alert tone="info" title="Client-facing honesty">
            Where a policy is ambiguous, the pack records the ambiguity explicitly rather than
            fabricating certainty. Agent answers surface that uncertainty with the source attached.
          </Alert>
        </div>
      </div>
    </div>
  );
}
