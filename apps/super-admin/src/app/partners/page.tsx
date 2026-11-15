import type { Metadata } from 'next';
import {
  Alert,
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Checklist,
  DataTable,
  DisclaimerStrip,
  KpiTile,
  PageHeader,
  ProgressBar,
} from '@visahobe/ui';
import { partners, formatDate, type Partner } from '@visahobe/shared';
import { Icon } from '@/lib/icons';

export const metadata: Metadata = { title: 'Partners' };

export default function PartnersPage() {
  const active = partners.filter((p) => p.status === 'active');
  const overdue = partners.filter((p) => p.dueDiligence !== 'complete');

  return (
    <div className="mx-auto max-w-[1500px]">
      <PageHeader
        title="Partners"
        description="Education agents, licensed counsel, attestation vendors and translation partners — with due diligence, contract status and assigned case volume."
        breadcrumb="Knowledge / Partners"
        actions={
          <>
            <Button variant="secondary" size="sm">
              <Icon name="download" className="h-3.5 w-3.5" />
              Export register
            </Button>
            <Button size="sm">
              <Icon name="plus" className="h-3.5 w-3.5" />
              Add partner
            </Button>
          </>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <KpiTile
          label="Active partners"
          value={active.length}
          tone="success"
          icon={<Icon name="handshake" className="h-4 w-4" />}
        />
        <KpiTile
          label="Assigned cases"
          value={partners.reduce((s, p) => s + p.activeCases, 0)}
          tone="brand"
          icon={<Icon name="cases" className="h-4 w-4" />}
        />
        <KpiTile
          label="Due diligence overdue"
          value={overdue.length}
          tone="danger"
          icon={<Icon name="alert" className="h-4 w-4" />}
          hint="blocks new assignments"
        />
        <KpiTile
          label="Suspended"
          value={partners.filter((p) => p.status === 'suspended').length}
          tone="warning"
          icon={<Icon name="pause" className="h-4 w-4" />}
        />
      </div>

      {overdue.length > 0 ? (
        <div className="mt-4">
          <Alert
            tone="warning"
            title={`${overdue.length} partners need due diligence`}
            icon={<Icon name="alert" className="h-4 w-4" />}
          >
            Contract renewal and verification evidence are outstanding for{' '}
            {overdue.map((p) => p.name).join(', ')}. New case assignments are blocked until
            resolved.
          </Alert>
        </div>
      ) : null}

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <div className="min-w-0 space-y-5">
          <Card>
            <CardHeader
              title="Partner register"
              description="Role-scoped: partners see only assigned work."
            />
            <CardBody className="pt-1">
              <DataTable<Partner>
                caption="Partner register"
                rowKey={(row) => row.id}
                rows={partners}
                columns={[
                  {
                    key: 'name',
                    header: 'Partner',
                    render: (row) => (
                      <div>
                        <p className="text-xs font-medium text-ink">
                          <span aria-hidden className="mr-1.5">
                            {row.flag}
                          </span>
                          {row.name}
                        </p>
                        <p className="text-[10px] text-ink-tertiary">
                          {row.type} · {row.country}
                        </p>
                      </div>
                    ),
                  },
                  {
                    key: 'status',
                    header: 'Status',
                    render: (row) => (
                      <Badge
                        tone={
                          row.status === 'active'
                            ? 'success'
                            : row.status === 'probation'
                              ? 'warning'
                              : 'danger'
                        }
                        size="sm"
                      >
                        {row.status}
                      </Badge>
                    ),
                  },
                  {
                    key: 'dd',
                    header: 'Due diligence',
                    render: (row) => (
                      <Badge
                        tone={
                          row.dueDiligence === 'complete'
                            ? 'success'
                            : row.dueDiligence === 'in_progress'
                              ? 'info'
                              : 'danger'
                        }
                        size="sm"
                      >
                        {row.dueDiligence.replace('_', ' ')}
                      </Badge>
                    ),
                    hideBelow: 'md',
                  },
                  {
                    key: 'cases',
                    header: 'Cases',
                    render: (row) => (
                      <span className="text-[11px] text-ink numeric">{row.activeCases}</span>
                    ),
                    align: 'center',
                    hideBelow: 'sm',
                  },
                  {
                    key: 'rating',
                    header: 'Rating',
                    render: (row) => (
                      <span
                        className={`text-[11px] font-medium numeric ${
                          row.rating >= 4.5
                            ? 'text-success'
                            : row.rating >= 4
                              ? 'text-ink'
                              : 'text-warning'
                        }`}
                      >
                        {row.rating.toFixed(1)} ★
                      </span>
                    ),
                    align: 'center',
                    hideBelow: 'lg',
                  },
                  {
                    key: 'renewal',
                    header: 'Renewal',
                    render: (row) => (
                      <span className="whitespace-nowrap font-mono text-[10px] text-ink-tertiary">
                        {formatDate(row.contractRenewal)}
                      </span>
                    ),
                    align: 'right',
                    hideBelow: 'xl',
                  },
                ]}
              />
            </CardBody>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader
                title="Due diligence — Lingua Certified"
                description="Translation partner · 31 active cases"
                action={
                  <Badge tone="danger" size="sm">
                    overdue
                  </Badge>
                }
              />
              <CardBody>
                <Checklist
                  items={[
                    { id: 'dd1', label: 'Company registration verified', done: true },
                    { id: 'dd2', label: 'Translator certification on file', done: true },
                    {
                      id: 'dd3',
                      label: 'Data processing agreement signed',
                      done: false,
                      hint: 'Expired 30 Sep 2026',
                    },
                    {
                      id: 'dd4',
                      label: 'Insurance / liability cover',
                      done: false,
                      hint: 'No current certificate',
                    },
                    { id: 'dd5', label: 'Confidentiality commitment', done: true },
                    {
                      id: 'dd6',
                      label: 'Sample quality audit',
                      done: false,
                      hint: 'Due quarterly',
                    },
                  ]}
                />
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button size="sm">Request documents</Button>
                  <Button variant="secondary" size="sm">
                    Suspend assignments
                  </Button>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardHeader title="Suspended — Southern Cross Migration" />
              <CardBody className="space-y-2 pt-2">
                <p className="text-[11px] leading-relaxed text-ink-secondary">
                  Suspended after a pattern of incomplete evidence packs and two client complaints.
                  No new assignments. Existing work has been reassigned to in-house counsel.
                </p>
                <div className="rounded-md bg-danger-soft/60 px-2.5 py-2">
                  <p className="text-[10px] font-semibold text-danger">Suspension reason</p>
                  <p className="mt-0.5 text-[10px] leading-relaxed text-ink-secondary">
                    Due diligence overdue · contract expiring 15 Nov · rating 3.2
                  </p>
                </div>
                <Button variant="secondary" size="sm" fullWidth>
                  Review reinstatement request
                </Button>
              </CardBody>
            </Card>
          </div>
        </div>

        <div className="space-y-5">
          <Card>
            <CardHeader title="Assignment rules" />
            <CardBody className="space-y-2 pt-2">
              {[
                'Only partners with complete due diligence can receive assignments.',
                'Partners see only the case records required for their task.',
                'A partner never sees another client, another partner or internal notes.',
                'Client consent is required before any partner sharing, recorded on the profile.',
                'Every partner document access is audited against the partner identity.',
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
            <CardHeader title="Partner performance" description="Rolling 90 days" />
            <CardBody className="space-y-2.5 pt-2">
              {partners
                .filter((p) => p.activeCases > 0)
                .map((partner) => (
                  <div key={partner.id}>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-ink">{partner.name}</span>
                      <span className="text-ink-tertiary numeric">{partner.activeCases} cases</span>
                    </div>
                    <div className="mt-1">
                      <ProgressBar
                        value={(partner.rating / 5) * 100}
                        tone={
                          partner.rating >= 4.5
                            ? 'success'
                            : partner.rating >= 4
                              ? 'brand'
                              : 'warning'
                        }
                      />
                    </div>
                  </div>
                ))}
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Contract renewals" />
            <CardBody className="pt-1">
              <ul className="divide-y divide-line">
                {[...partners]
                  .sort((a, b) => a.contractRenewal.localeCompare(b.contractRenewal))
                  .slice(0, 4)
                  .map((partner) => (
                    <li key={partner.id} className="flex items-center justify-between gap-2 py-2">
                      <div className="min-w-0">
                        <p className="truncate text-[11px] text-ink">{partner.name}</p>
                        <p className="font-mono text-[9px] text-ink-tertiary">
                          {partner.contractRenewal}
                        </p>
                      </div>
                      <Badge
                        tone={partner.contractRenewal < '2026-12-31' ? 'warning' : 'neutral'}
                        size="sm"
                      >
                        {partner.contractRenewal < '2026-12-31' ? 'soon' : 'ok'}
                      </Badge>
                    </li>
                  ))}
              </ul>
            </CardBody>
          </Card>

          <div>
            <DisclaimerStrip>
              Partner views are a scoped workspace inside this console, not a separate product. If
              partner volume or a stricter external security boundary requires it, this becomes a
              standalone partner portal without rewriting the business logic.
            </DisclaimerStrip>
          </div>
        </div>
      </div>
    </div>
  );
}
