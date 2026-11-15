import type { Metadata } from 'next';
import {
  Alert,
  Badge,
  BrowserLiveViewer,
  Button,
  Card,
  CardBody,
  CardHeader,
  DataTable,
  DisclaimerStrip,
  FilterBar,
  HumanTakeoverBanner,
  KpiTile,
  PageHeader,
} from '@visahobe/ui';
import { browserSessions, type BrowserSession } from '@visahobe/shared';
import { Icon } from '@/lib/icons';

export const metadata: Metadata = { title: 'Browser sessions' };

const statusTone = {
  live: 'success',
  takeover: 'warning',
  paused: 'info',
  ended: 'neutral',
} as const;

export default function BrowserPage() {
  const live = browserSessions.filter((s) => s.status === 'live');
  const takeover = browserSessions.filter((s) => s.status === 'takeover');
  const active = live[0] ?? browserSessions[0];

  return (
    <div className="mx-auto max-w-[1500px]">
      <PageHeader
        title="Browser sessions"
        description="Agent-driven portal submissions with a human able to take over instantly. Every click, field and screenshot is recorded."
        breadcrumb="Intelligence / Browser sessions"
        actions={
          <Button variant="secondary" size="sm">
            <Icon name="history" className="h-3.5 w-3.5" />
            Session recordings
          </Button>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <KpiTile
          label="Live sessions"
          value={live.length}
          tone="success"
          icon={<Icon name="play" className="h-4 w-4" />}
        />
        <KpiTile
          label="Human takeover"
          value={takeover.length}
          tone="warning"
          icon={<Icon name="user-check" className="h-4 w-4" />}
        />
        <KpiTile
          label="Submitted this week"
          value={9}
          tone="brand"
          icon={<Icon name="upload" className="h-4 w-4" />}
        />
        <KpiTile
          label="Failed submissions"
          value={1}
          tone="danger"
          icon={<Icon name="x" className="h-4 w-4" />}
          hint="portal session timeout"
        />
      </div>

      {takeover.length > 0 ? (
        <div className="mt-4">
          <HumanTakeoverBanner operator={takeover[0].operator} since={takeover[0].startedAt} />
        </div>
      ) : null}

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <div className="min-w-0 space-y-5">
          <Card>
            <CardHeader
              title="Session board"
              description="Sessions are scoped to a single case and a single portal."
              action={
                <FilterBar
                  active="all"
                  options={[
                    { id: 'all', label: 'All', count: browserSessions.length },
                    { id: 'live', label: 'Live', count: live.length },
                    { id: 'takeover', label: 'Takeover', count: takeover.length },
                  ]}
                />
              }
            />
            <CardBody className="pt-1">
              <DataTable<BrowserSession>
                caption="Browser session board"
                rowKey={(row) => row.id}
                rows={browserSessions}
                columns={[
                  {
                    key: 'portal',
                    header: 'Portal',
                    render: (row) => (
                      <div>
                        <p className="text-xs font-medium text-ink">{row.portal}</p>
                        <p className="font-mono text-[10px] text-ink-tertiary">
                          {row.caseNumber} · {row.sessionId}
                        </p>
                      </div>
                    ),
                  },
                  {
                    key: 'operator',
                    header: 'Operator',
                    render: (row) => (
                      <span className="text-[10px] text-ink-secondary">{row.operator}</span>
                    ),
                    hideBelow: 'md',
                  },
                  {
                    key: 'steps',
                    header: 'Steps',
                    render: (row) => (
                      <span className="text-[10px] text-ink-secondary numeric">{row.steps}</span>
                    ),
                    align: 'center',
                    hideBelow: 'sm',
                  },
                  {
                    key: 'status',
                    header: 'Status',
                    render: (row) => (
                      <Badge tone={statusTone[row.status]} size="sm">
                        {row.status}
                      </Badge>
                    ),
                  },
                  {
                    key: 'duration',
                    header: 'Elapsed',
                    render: (row) => (
                      <span className="font-mono text-[10px] text-ink-tertiary">
                        {row.duration}
                      </span>
                    ),
                    align: 'right',
                    hideBelow: 'lg',
                  },
                  {
                    key: 'action',
                    header: '',
                    render: (row) => (
                      <Button
                        variant={row.status === 'takeover' ? 'primary' : 'secondary'}
                        size="sm"
                      >
                        {row.status === 'takeover' ? 'Resume' : 'Watch'}
                      </Button>
                    ),
                    align: 'right',
                  },
                ]}
              />
            </CardBody>
          </Card>

          <Card>
            <CardHeader
              title={`Live view — ${active.portal}`}
              description={`${active.sessionId} · ${active.caseNumber}`}
              action={
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-[10px] font-medium text-success">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
                    {active.status}
                  </span>
                  <Button variant="secondary" size="sm">
                    <Icon name="user-check" className="h-3.5 w-3.5" />
                    Take over
                  </Button>
                </div>
              }
            />
            <CardBody>
              <BrowserLiveViewer
                sessionId={active.sessionId}
                portal={active.portal}
                status={active.status}
                guardrails={active.guardrails}
                frames={[
                  {
                    url: 'https://portal.ircc.example/en/immigration/study-permit',
                    step: 1,
                    action: 'Opened study permit application form',
                    at: '09:41:02',
                    elements: [
                      { label: 'Application', value: 'Study permit — outside Canada' },
                      { label: 'Applicant', value: 'Rafid Hasan' },
                    ],
                  },
                  {
                    url: 'https://portal.ircc.example/en/immigration/study-permit/identity',
                    step: 2,
                    action: 'Confirmed applicant identity from passport MRZ',
                    at: '09:44:18',
                    elements: [
                      { label: 'Passport no.', value: 'A0•••• 47', highlighted: true },
                      { label: 'Nationality', value: 'Bangladesh' },
                      { label: 'Date of birth', value: '19••-••-••' },
                    ],
                  },
                  {
                    url: 'https://portal.ircc.example/en/immigration/study-permit/documents',
                    step: 3,
                    action: 'Uploaded passport bio page (verified document set)',
                    at: '09:51:40',
                    elements: [
                      { label: 'Passport bio page', value: 'uploaded ✓' },
                      { label: 'Digital photo', value: 'uploaded ✓' },
                      { label: 'Letter of acceptance', value: 'uploaded ✓' },
                    ],
                  },
                  {
                    url: 'https://portal.ircc.example/en/immigration/study-permit/funds',
                    step: 4,
                    action: 'Filling financial support — page 3 of 5',
                    at: '10:02:11',
                    elements: [
                      { label: 'Tuition (year 1)', value: 'CAD 18,400' },
                      { label: 'Living costs', value: 'CAD 20,635', highlighted: true },
                      {
                        label: 'Proof of funds',
                        value: 'BDT 18,42,600',
                        flag: 'bank statement returned — stamp missing',
                      },
                    ],
                  },
                ]}
              />
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {[
                  ['Fields filled', '18 / 41'],
                  ['Screenshots', `${active.steps} captured`],
                  ['Profile', 'isolated + ephemeral'],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-md bg-surface-muted px-3 py-2">
                    <p className="text-[10px] uppercase tracking-wide text-ink-tertiary">{label}</p>
                    <p className="text-[11px] font-medium text-ink">{value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-3">
                <Alert
                  tone="warning"
                  title="Human remains accountable"
                  icon={<Icon name="user-check" className="h-4 w-4" />}
                >
                  A portal submission is only complete when a human confirms the final review
                  screen. If the portal shows an unexpected captcha, error or legal declaration, the
                  agent pauses and requests takeover.
                </Alert>
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="space-y-5">
          <Card>
            <CardHeader title="Session policy" />
            <CardBody className="space-y-2 pt-2">
              {[
                'One session per case and portal; never shared.',
                'Agent credentials are scoped, rotated and never stored in plain text.',
                'Every action is recorded with a screenshot and a timestamp.',
                'Takeover is always available and always audited.',
                'The human confirms any legal declaration or final submit.',
                'Session recordings are retained per the data-class policy.',
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
            <CardHeader title="Recent submissions" />
            <CardBody className="pt-1">
              <ul className="divide-y divide-line">
                {[
                  ['VH-2026-0198', 'IRCC · study permit', 'submitted', 'success'],
                  ['VH-2026-0148', 'IRCC · study permit', 'in progress', 'brand'],
                  ['VH-2026-0203', 'VFS Dhaka · biometrics', 'slot booked', 'info'],
                  ['VH-2026-0192', 'IRCC · visitor visa', 'failed — timeout', 'danger'],
                ].map(([caseNumber, portal, outcome, tone]) => (
                  <li key={caseNumber} className="flex items-center justify-between gap-2 py-2">
                    <div className="min-w-0">
                      <p className="font-mono text-[10px] text-ink">{caseNumber}</p>
                      <p className="truncate text-[9px] text-ink-tertiary">{portal}</p>
                    </div>
                    <Badge tone={tone as 'success' | 'brand' | 'info' | 'danger'} size="sm">
                      {outcome}
                    </Badge>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Engineering integration" description="A8 · browser control plane" />
            <CardBody className="space-y-2 pt-2">
              <p className="text-[11px] leading-relaxed text-ink-secondary">
                Browser automation is provided as a shared service; the console only issues a scoped
                session. Any change to selectors or portal flows ships through the engineering
                control plane with a human merge.
              </p>
              <div className="flex items-center justify-between rounded-md bg-surface-muted px-2.5 py-2 text-[10px]">
                <span className="text-ink-secondary">Automation version</span>
                <span className="font-mono text-ink">browser-runner@0.9.2</span>
              </div>
              <div className="flex items-center justify-between rounded-md bg-surface-muted px-2.5 py-2 text-[10px]">
                <span className="text-ink-secondary">Last selector change</span>
                <span className="text-ink">2026-11-04</span>
              </div>
            </CardBody>
          </Card>

          <div>
            <DisclaimerStrip>
              VisaHobe does not hold itself out as the decision maker. Portal submissions are
              prepared and checked by VisaHobe, but the decision always rests with the authority.
            </DisclaimerStrip>
          </div>
        </div>
      </div>
    </div>
  );
}
