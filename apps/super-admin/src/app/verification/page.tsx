import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Alert,
  AnnotationViewer,
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Checklist,
  DataTable,
  DisclaimerStrip,
  FilterBar,
  KpiTile,
  PageHeader,
  ProgressBar,
  SlaCountdown,
  ToolCallInspector,
} from '@visahobe/ui';
import { verificationQueue, type VerificationQueueItem } from '@visahobe/shared';
import { Icon } from '@/lib/icons';

export const metadata: Metadata = { title: 'Verification gates' };

export default function VerificationPage() {
  const pending = verificationQueue.filter((v) => v.status === 'pending');
  const inReview = verificationQueue.filter((v) => v.status === 'in_review');

  return (
    <div className="mx-auto max-w-[1500px]">
      <PageHeader
        title="Verification gates"
        description="Human approval gates for every document. AI extraction is advisory only — approving here writes a signed verification record."
        breadcrumb="Operations / Verification gates"
        actions={
          <Button variant="secondary" size="sm">
            <Icon name="filter" className="h-3.5 w-3.5" />
            Filter by verifier
          </Button>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <KpiTile
          label="Awaiting decision"
          value={pending.length}
          tone="warning"
          icon={<Icon name="checks" className="h-4 w-4" />}
          hint="oldest 5h to SLA"
        />
        <KpiTile
          label="In review"
          value={inReview.length}
          tone="info"
          icon={<Icon name="eye" className="h-4 w-4" />}
          hint="my queue"
        />
        <KpiTile
          label="First-pass rate"
          value="64%"
          tone="brand"
          delta={{ value: '+6 pts', direction: 'up' }}
          icon={<Icon name="trending" className="h-4 w-4" />}
        />
        <KpiTile
          label="Returned today"
          value={2}
          tone="danger"
          icon={<Icon name="x" className="h-4 w-4" />}
          hint="specific corrections issued"
        />
      </div>

      <div className="mt-4">
        <Alert
          tone="warning"
          title="Approval is a signed act"
          icon={<Icon name="shield-check" className="h-4 w-4" />}
        >
          Approving a document records your identity, timestamp and the policy version you checked
          against. It cannot be undone silently — reversals create a new audit entry and notify the
          client.
        </Alert>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.55fr_1fr]">
        <div className="min-w-0 space-y-5">
          <Card>
            <CardHeader
              title="Verification queue"
              description={`${verificationQueue.length} items · sorted by SLA pressure`}
              action={
                <FilterBar
                  active="all"
                  options={[
                    { id: 'all', label: 'All', count: verificationQueue.length },
                    { id: 'pending', label: 'Pending', count: pending.length },
                    { id: 'review', label: 'In review', count: inReview.length },
                  ]}
                />
              }
            />
            <CardBody className="pt-1">
              <DataTable<VerificationQueueItem>
                caption="Verification queue"
                rowKey={(row) => row.id}
                rows={verificationQueue}
                columns={[
                  {
                    key: 'doc',
                    header: 'Document',
                    render: (row) => (
                      <div>
                        <p className="text-xs font-medium text-ink">{row.document}</p>
                        <p className="font-mono text-[10px] text-ink-tertiary">
                          {row.caseNumber} · {row.client}
                        </p>
                      </div>
                    ),
                  },
                  {
                    key: 'confidence',
                    header: 'OCR confidence',
                    render: (row) => (
                      <div className="w-24">
                        <ProgressBar
                          value={row.agentConfidence}
                          tone={
                            row.agentConfidence >= 90
                              ? 'success'
                              : row.agentConfidence >= 75
                                ? 'warning'
                                : 'danger'
                          }
                        />
                        <p className="mt-1 text-[9px] text-ink-tertiary numeric">
                          {row.agentConfidence}% · {row.agentFlags.length} flag
                          {row.agentFlags.length === 1 ? '' : 's'}
                        </p>
                      </div>
                    ),
                    hideBelow: 'md',
                  },
                  {
                    key: 'priority',
                    header: 'Priority',
                    render: (row) => (
                      <Badge
                        tone={
                          row.priority === 'urgent'
                            ? 'danger'
                            : row.priority === 'high'
                              ? 'warning'
                              : 'neutral'
                        }
                        size="sm"
                      >
                        {row.priority}
                      </Badge>
                    ),
                    hideBelow: 'lg',
                  },
                  {
                    key: 'sla',
                    header: 'SLA',
                    render: (row) => (
                      <SlaCountdown
                        hoursLeft={row.slaHoursLeft}
                        state={
                          row.slaHoursLeft <= 6
                            ? 'breach'
                            : row.slaHoursLeft <= 24
                              ? 'warning'
                              : 'ok'
                        }
                        compact
                      />
                    ),
                  },
                  {
                    key: 'actions',
                    header: '',
                    render: (row) => (
                      <div className="flex justify-end gap-1">
                        <Button size="sm">Review</Button>
                        <Link href={`/cases/${row.caseNumber}`}>
                          <Button variant="ghost" size="sm">
                            <Icon name="chevron" className="h-3.5 w-3.5" />
                          </Button>
                        </Link>
                      </div>
                    ),
                    align: 'right',
                  },
                ]}
              />
            </CardBody>
          </Card>

          <Card>
            <CardHeader
              title="Active review — bank statement"
              description="VH-2026-0148 · Rafid Hasan · Finance"
              action={
                <div className="flex items-center gap-2">
                  <Badge tone="warning" size="sm">
                    Correction likely
                  </Badge>
                  <SlaCountdown hoursLeft={12} state="warning" compact />
                </div>
              }
            />
            <CardBody>
              <AnnotationViewer
                title="Bank statement p.5"
                capturedAt="2026-11-08 09:12"
                annotations={[
                  {
                    id: 'v1',
                    x: 70,
                    y: 26,
                    label: 'Balance does not reconcile',
                    note: 'Closing balance on page 5 differs from the page 3 total by BDT 4,200.',
                    tone: 'warning',
                  },
                  {
                    id: 'v2',
                    x: 32,
                    y: 80,
                    label: 'Missing bank stamp',
                    note: 'Final page carries no stamp or authorised signature.',
                    tone: 'danger',
                  },
                  {
                    id: 'v3',
                    x: 50,
                    y: 48,
                    label: 'Name matches passport',
                    note: 'Account holder string matches the passport exactly.',
                    tone: 'success',
                  },
                ]}
              />

              <div className="mt-4 grid gap-4 lg:grid-cols-2">
                <div>
                  <p className="text-label font-semibold uppercase tracking-wide text-ink-tertiary">
                    Verifier checklist
                  </p>
                  <div className="mt-2">
                    <Checklist
                      items={[
                        {
                          id: 'k1',
                          label: 'Statement covers the required 6-month window',
                          done: true,
                        },
                        { id: 'k2', label: 'Issued within the 31-day validity rule', done: true },
                        {
                          id: 'k3',
                          label: 'Bank stamp present on every page',
                          done: false,
                          hint: 'Missing on page 5',
                        },
                        { id: 'k4', label: 'Closing balance meets the funds table', done: true },
                        { id: 'k5', label: 'Account holder matches passport', done: true },
                        {
                          id: 'k6',
                          label: 'No unexplained large deposits',
                          done: false,
                          hint: 'One deposit 12 Sep — source unclear',
                        },
                      ]}
                    />
                  </div>
                </div>
                <div>
                  <p className="text-label font-semibold uppercase tracking-wide text-ink-tertiary">
                    Decision
                  </p>
                  <div className="mt-2 space-y-2">
                    <Button size="sm" fullWidth>
                      <Icon name="check" className="h-3.5 w-3.5" />
                      Approve — document.verify
                    </Button>
                    <Button variant="secondary" size="sm" fullWidth>
                      <Icon name="x" className="h-3.5 w-3.5" />
                      Return with corrections
                    </Button>
                    <Button variant="ghost" size="sm" fullWidth>
                      <Icon name="user-check" className="h-3.5 w-3.5" />
                      Escalate to senior verifier
                    </Button>
                  </div>
                  <div className="mt-3 rounded-md bg-surface-muted px-2.5 py-2">
                    <p className="text-[10px] leading-relaxed text-ink-secondary">
                      <strong className="text-ink">Permission key:</strong>{' '}
                      <span className="font-mono">document.verify</span> — held by the verifier and
                      admin roles only. Case managers cannot approve.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <DisclaimerStrip>
                  A returned document notifies the client with the specific correction required.
                  Vague returns are not permitted: the API requires a reason and the failing
                  checklist item.
                </DisclaimerStrip>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader
              title="A5 Verification Assistant — tool calls"
              description="Suggestions only. The assistant cannot approve."
              action={
                <Badge tone="neutral" size="sm">
                  run_01HXT9KP
                </Badge>
              }
            />
            <CardBody>
              <ToolCallInspector
                calls={[
                  {
                    id: 'vt1',
                    name: 'document.ocr.extract',
                    status: 'ok',
                    durationMs: 2140,
                    input: '{ "documentId": "doc_5", "fields": ["balance","period","stamp"] }',
                    output: '{ "balance": "1842600", "pages": 5, "stampPages": [1,2,3,4] }',
                    permission: 'document.read',
                    approvedBy: null,
                  },
                  {
                    id: 'vt2',
                    name: 'policy.check_funds',
                    status: 'ok',
                    durationMs: 320,
                    input: '{ "pack": "IRCC-SP-2024.1", "amount": 1842600 }',
                    output: '{ "required": 1520000, "meets": true, "currency": "BDT" }',
                    permission: 'policy.read',
                    approvedBy: null,
                  },
                  {
                    id: 'vt3',
                    name: 'document.approve',
                    status: 'blocked',
                    durationMs: 6,
                    input: '{ "documentId": "doc_5" }',
                    output: '{ "error": "human_verification_required" }',
                    permission: 'document.verify',
                    approvedBy: null,
                  },
                ]}
              />
            </CardBody>
          </Card>
        </div>

        <div className="space-y-5">
          <Card>
            <CardHeader title="SLA policy" description="Applied automatically per priority." />
            <CardBody className="pt-2">
              <ul className="space-y-2">
                {[
                  { p: 'Urgent', target: '4 hours', escalation: '15 min to senior verifier' },
                  { p: 'High', target: '12 hours', escalation: '30 min to case manager' },
                  { p: 'Standard', target: '48 hours', escalation: '4h to queue owner' },
                  { p: 'Low', target: '96 hours', escalation: 'none' },
                ].map((row) => (
                  <li key={row.p} className="rounded-md border border-line px-2.5 py-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-ink">{row.p}</span>
                      <span className="font-mono text-[10px] text-ink-secondary">{row.target}</span>
                    </div>
                    <p className="mt-0.5 text-[10px] text-ink-tertiary">
                      Escalation: {row.escalation}
                    </p>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Verifier load" />
            <CardBody className="space-y-2.5 pt-2">
              {[
                { name: 'Tanvir Ahmed', open: 3, capacity: 8 },
                { name: 'Ayesha Rahman', open: 1, capacity: 6 },
                { name: 'Sadia Islam', open: 1, capacity: 6 },
              ].map((verifier) => (
                <div key={verifier.name}>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-ink">{verifier.name}</span>
                    <span className="text-ink-tertiary numeric">
                      {verifier.open}/{verifier.capacity}
                    </span>
                  </div>
                  <div className="mt-1">
                    <ProgressBar
                      value={(verifier.open / verifier.capacity) * 100}
                      tone={verifier.open / verifier.capacity > 0.75 ? 'warning' : 'brand'}
                    />
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Common return reasons" description="Last 30 days" />
            <CardBody className="pt-1">
              <ul className="divide-y divide-line">
                {[
                  ['Missing stamp or signature', 14],
                  ['Name mismatch vs passport', 9],
                  ['Statement period short', 7],
                  ['Unexplained deposit', 6],
                  ['Illegible scan / crop', 5],
                ].map(([reason, count]) => (
                  <li key={String(reason)} className="flex items-center justify-between py-1.5">
                    <span className="text-[11px] text-ink-secondary">{reason}</span>
                    <span className="text-[11px] font-medium text-ink numeric">{count}</span>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
