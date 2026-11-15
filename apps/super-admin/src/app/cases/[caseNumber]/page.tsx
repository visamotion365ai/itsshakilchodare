import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  Alert,
  AnnotationViewer,
  Badge,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  CardHeader,
  Checklist,
  DataTable,
  DisclaimerStrip,
  ProgressBar,
  SlaCountdown,
  Stepper,
  TabNav,
  ToolCallInspector,
} from '@visahobe/ui';
import {
  adminCases,
  caseStageLabels,
  caseStageOrder,
  formatDate,
  formatDateTime,
  formatMoney,
} from '@visahobe/shared';
import { Icon } from '@/lib/icons';

export function generateStaticParams() {
  return adminCases.map((c) => ({ caseNumber: c.caseNumber }));
}

export function generateMetadata({ params }: { params: { caseNumber: string } }): Metadata {
  return { title: `${params.caseNumber} — case workspace` };
}

export default function AdminCaseDetailPage({ params }: { params: { caseNumber: string } }) {
  const current = adminCases.find((c) => c.caseNumber === params.caseNumber);
  if (!current) notFound();

  const stageIndex = caseStageOrder.indexOf(current.stage);

  const ocrRows = [
    {
      field: 'Account holder',
      extracted: 'RAFID HASAN',
      confidence: 99,
      match: 'passport',
      state: 'match' as const,
    },
    {
      field: 'Statement period',
      extracted: '01 Apr 2026 – 30 Sep 2026',
      confidence: 94,
      match: 'required 6 months',
      state: 'match' as const,
    },
    {
      field: 'Closing balance',
      extracted: 'BDT 1,842,600',
      confidence: 88,
      match: 'page 3 vs page 5 differ by 4,200',
      state: 'mismatch' as const,
    },
    {
      field: 'Bank stamp',
      extracted: 'Present on pages 1–4',
      confidence: 71,
      match: 'missing on page 5',
      state: 'missing' as const,
    },
    {
      field: 'Statement issue date',
      extracted: '18 Oct 2026',
      confidence: 97,
      match: 'within 31-day rule',
      state: 'match' as const,
    },
  ];

  return (
    <div className="mx-auto max-w-[1500px]">
      <Breadcrumbs
        items={[{ label: 'Case queue', href: '/cases' }, { label: current.caseNumber }]}
      />

      <div className="mt-3 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-display text-h1 font-semibold tracking-tight text-ink">
              {current.flag} {current.service}
            </h1>
            <Badge
              tone={
                current.status === 'blocked'
                  ? 'danger'
                  : current.status === 'at_risk'
                    ? 'warning'
                    : current.status === 'completed'
                      ? 'success'
                      : 'info'
              }
              dot
            >
              {current.status.replace('_', ' ')}
            </Badge>
            <Badge tone={current.priority === 'urgent' ? 'danger' : 'neutral'} size="sm">
              {current.priority} priority
            </Badge>
          </div>
          <p className="mt-1 text-sm text-ink-secondary">
            {current.country} · {current.tenant} · {current.clientName}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5">
            <span className="font-mono text-[11px] text-ink-tertiary">{current.caseNumber}</span>
            <span className="text-[11px] text-ink-tertiary">
              Opened {formatDate(current.openedAt)}
            </span>
            <span className="text-[11px] text-ink-tertiary">
              Value {formatMoney(current.value)}
            </span>
            <SlaCountdown hoursLeft={current.slaHoursLeft} state={current.slaState} compact />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" size="sm">
            <Icon name="message" className="h-3.5 w-3.5" />
            Message client
          </Button>
          <Button variant="secondary" size="sm">
            <Icon name="user-check" className="h-3.5 w-3.5" />
            Reassign
          </Button>
          <Button size="sm">
            <Icon name="checks" className="h-3.5 w-3.5" />
            Open approval gate
          </Button>
        </div>
      </div>

      {current.flags.length > 0 ? (
        <div className="mt-4">
          <Alert
            tone={current.status === 'blocked' ? 'danger' : 'warning'}
            title={current.status === 'blocked' ? 'Case blocked' : 'Case flags'}
            icon={<Icon name="alert" className="h-4 w-4" />}
          >
            <div className="flex flex-wrap gap-1.5">
              {current.flags.map((flag) => (
                <span
                  key={flag}
                  className="rounded-xs bg-white/60 px-1.5 py-0.5 text-[10px] font-medium"
                >
                  {flag}
                </span>
              ))}
            </div>
            <p className="mt-1.5 text-[11px]">
              Blocked transitions cannot be bypassed. Resolve the flag or obtain the required
              permission key before the next action.
            </p>
          </Alert>
        </div>
      ) : null}

      <div className="mt-5">
        <TabNav
          active="overview"
          tabs={[
            { id: 'overview', label: 'Overview', href: '#overview' },
            { id: 'ocr', label: 'OCR review', href: '#ocr' },
            { id: 'docs', label: 'Documents', href: '#docs' },
            { id: 'agent', label: 'Agent runs', href: '#agent' },
            { id: 'audit', label: 'Audit', href: '#audit' },
          ]}
        />
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <div className="min-w-0 space-y-5">
          <Card id="overview" className="scroll-mt-20">
            <CardHeader
              title="Stage pipeline"
              description={`Current: ${caseStageLabels[current.stage]} · assignee ${current.assignee}`}
            />
            <CardBody>
              <ProgressBar value={Math.round(((stageIndex + 1) / caseStageOrder.length) * 100)} />
              <div className="mt-5">
                <Stepper
                  steps={caseStageOrder.map((stage, index) => ({
                    id: stage,
                    label: caseStageLabels[stage],
                    description:
                      index < stageIndex
                        ? 'Completed'
                        : index === stageIndex
                          ? 'In progress'
                          : index === stageIndex + 1
                            ? 'Queued'
                            : undefined,
                    state:
                      index < stageIndex
                        ? ('complete' as const)
                        : index === stageIndex
                          ? current.status === 'blocked'
                            ? ('blocked' as const)
                            : ('current' as const)
                          : ('upcoming' as const),
                  }))}
                />
              </div>
            </CardBody>
          </Card>

          <Card id="ocr" className="scroll-mt-20">
            <CardHeader
              title="OCR extraction review"
              description="Extraction is a draft. Approve, correct or return — never auto-verified."
              action={
                <Badge tone="warning" size="sm">
                  Awaiting human
                </Badge>
              }
            />
            <CardBody>
              <DataTable
                caption="OCR field comparison"
                dense
                rowKey={(row) => row.field}
                rows={ocrRows}
                columns={[
                  {
                    key: 'field',
                    header: 'Field',
                    render: (row) => <span className="text-[11px] text-ink">{row.field}</span>,
                  },
                  {
                    key: 'extracted',
                    header: 'Extracted value',
                    render: (row) => (
                      <span className="font-mono text-[10px] text-ink-secondary">
                        {row.extracted}
                      </span>
                    ),
                  },
                  {
                    key: 'confidence',
                    header: 'Conf.',
                    render: (row) => (
                      <span
                        className={`text-[10px] font-medium numeric ${
                          row.confidence >= 90
                            ? 'text-success'
                            : row.confidence >= 75
                              ? 'text-warning'
                              : 'text-danger'
                        }`}
                      >
                        {row.confidence}%
                      </span>
                    ),
                    align: 'center',
                    hideBelow: 'sm',
                  },
                  {
                    key: 'state',
                    header: 'Check',
                    render: (row) => (
                      <Badge
                        tone={
                          row.state === 'match'
                            ? 'success'
                            : row.state === 'mismatch'
                              ? 'warning'
                              : 'danger'
                        }
                        size="sm"
                      >
                        {row.match}
                      </Badge>
                    ),
                    hideBelow: 'md',
                  },
                ]}
              />
              <div className="mt-3 flex flex-wrap gap-2">
                <Button size="sm">
                  <Icon name="check" className="h-3.5 w-3.5" />
                  Approve extraction
                </Button>
                <Button variant="secondary" size="sm">
                  <Icon name="x" className="h-3.5 w-3.5" />
                  Return with corrections
                </Button>
                <Button variant="ghost" size="sm">
                  <Icon name="scan" className="h-3.5 w-3.5" />
                  Re-run OCR
                </Button>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader
              title="Annotated evidence"
              description="Screenshot annotations attached to this verification pass."
            />
            <CardBody>
              <AnnotationViewer
                title="Bank statement p.5"
                capturedAt="2026-11-08 09:12"
                annotations={[
                  {
                    id: 'a1',
                    x: 68,
                    y: 24,
                    label: 'Closing balance mismatch',
                    note: 'Page 3 total does not reconcile with page 5. Difference BDT 4,200.',
                    tone: 'warning',
                  },
                  {
                    id: 'a2',
                    x: 30,
                    y: 78,
                    label: 'Missing stamp',
                    note: 'No bank stamp on the final page — the most common rejection cause.',
                    tone: 'danger',
                  },
                  {
                    id: 'a3',
                    x: 52,
                    y: 46,
                    label: 'Account holder verified',
                    note: 'Name matches passport exactly (including middle name).',
                    tone: 'success',
                  },
                ]}
              />
            </CardBody>
          </Card>

          <Card id="docs" className="scroll-mt-20">
            <CardHeader
              title="Document set"
              description="Signed URL access only, each view audited."
            />
            <CardBody className="pt-1">
              <DataTable
                caption="Case documents"
                dense
                rowKey={(row) => row.id}
                rows={[
                  {
                    id: 'd1',
                    name: 'Passport bio page',
                    status: 'verified',
                    version: 'v1',
                    accessed: '2026-11-08',
                  },
                  {
                    id: 'd2',
                    name: 'Academic transcripts',
                    status: 'verified',
                    version: 'v2',
                    accessed: '2026-11-07',
                  },
                  {
                    id: 'd3',
                    name: 'Bank statement Apr–Sep',
                    status: 'needs_correction',
                    version: 'v1',
                    accessed: '2026-11-08',
                  },
                  {
                    id: 'd4',
                    name: 'Sponsor affidavit',
                    status: 'pending_review',
                    version: 'v1',
                    accessed: '2026-11-07',
                  },
                  {
                    id: 'd5',
                    name: 'Proof of tuition payment',
                    status: 'missing',
                    version: '—',
                    accessed: '—',
                  },
                  {
                    id: 'd6',
                    name: 'Statement of purpose',
                    status: 'pending_review',
                    version: 'v3',
                    accessed: '2026-11-05',
                  },
                ]}
                columns={[
                  {
                    key: 'name',
                    header: 'Document',
                    render: (row) => <span className="text-[11px] text-ink">{row.name}</span>,
                  },
                  {
                    key: 'status',
                    header: 'Status',
                    render: (row) => (
                      <Badge
                        tone={
                          row.status === 'verified'
                            ? 'success'
                            : row.status === 'pending_review'
                              ? 'info'
                              : row.status === 'needs_correction'
                                ? 'warning'
                                : 'danger'
                        }
                        size="sm"
                      >
                        {row.status.replace('_', ' ')}
                      </Badge>
                    ),
                    hideBelow: 'sm',
                  },
                  {
                    key: 'version',
                    header: 'Ver.',
                    render: (row) => (
                      <span className="font-mono text-[10px] text-ink-tertiary">{row.version}</span>
                    ),
                    align: 'center',
                    hideBelow: 'md',
                  },
                  {
                    key: 'accessed',
                    header: 'Last access',
                    render: (row) => (
                      <span className="font-mono text-[10px] text-ink-tertiary">
                        {row.accessed}
                      </span>
                    ),
                    align: 'right',
                    hideBelow: 'lg',
                  },
                  {
                    key: 'actions',
                    header: '',
                    render: () => (
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="sm">
                          <Icon name="eye" className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Icon name="download" className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    ),
                    align: 'right',
                  },
                ]}
              />
              <div className="mt-3">
                <DisclaimerStrip>
                  Downloads issue a short-lived signed URL scoped to this session. Every issue is
                  recorded against your staff identity in the audit log.
                </DisclaimerStrip>
              </div>
            </CardBody>
          </Card>

          <Card id="agent" className="scroll-mt-20">
            <CardHeader
              title="Agent tool calls"
              description="Permission-checked, allowlisted and reversible."
              action={
                <Badge tone="neutral" size="sm">
                  6 calls
                </Badge>
              }
            />
            <CardBody>
              <ToolCallInspector
                calls={[
                  {
                    id: 'tc1',
                    name: 'policy.lookup',
                    status: 'ok',
                    durationMs: 412,
                    input: '{ "pack": "IRCC-SP-2024.1", "section": "proof_of_funds" }',
                    output: '{ "requirement": "funds_table_2024", "citations": 2 }',
                    permission: 'policy.read',
                    approvedBy: null,
                  },
                  {
                    id: 'tc2',
                    name: 'document.ocr.extract',
                    status: 'ok',
                    durationMs: 2180,
                    input: '{ "documentId": "doc_5", "mode": "fields" }',
                    output: '{ "fields": 12, "confidenceAvg": 0.9 }',
                    permission: 'document.read',
                    approvedBy: null,
                  },
                  {
                    id: 'tc3',
                    name: 'task.create',
                    status: 'ok',
                    durationMs: 240,
                    input: '{ "caseId": "VH-2026-0148", "type": "correction_request" }',
                    output: '{ "taskId": "tsk_9921", "owner": "client" }',
                    permission: 'task.create',
                    approvedBy: null,
                  },
                  {
                    id: 'tc4',
                    name: 'submission.submit',
                    status: 'blocked',
                    durationMs: 12,
                    input: '{ "caseId": "VH-2026-0148", "authority": "IRCC" }',
                    output: '{ "error": "protected_transition", "required": "submission.approve" }',
                    permission: 'submission.approve',
                    approvedBy: null,
                  },
                  {
                    id: 'tc5',
                    name: 'refund.issue',
                    status: 'error',
                    durationMs: 8,
                    input: '{ "invoiceId": "INV-2026-1042", "amount": 22500 }',
                    output: '{ "error": "agent_not_permitted" }',
                    permission: 'refund.approve',
                    approvedBy: null,
                  },
                  {
                    id: 'tc6',
                    name: 'case.stage.transition',
                    status: 'ok',
                    durationMs: 180,
                    input: '{ "from": "verification", "to": "preparation" }',
                    output: '{ "ok": true, "approvedBy": "tanvir.ahmed" }',
                    permission: 'case.update',
                    approvedBy: 'Tanvir Ahmed (verifier)',
                  },
                ]}
              />
            </CardBody>
          </Card>
        </div>

        {/* Right rail */}
        <div className="space-y-5">
          <Card>
            <CardHeader title="Client" />
            <CardBody className="space-y-2 pt-2">
              <p className="text-sm font-medium text-ink">{current.clientName}</p>
              <p className="text-[11px] text-ink-tertiary">{current.tenant}</p>
              <div className="border-t border-line pt-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-ink-secondary">Case value</span>
                  <span className="font-medium text-ink numeric">{formatMoney(current.value)}</span>
                </div>
                <div className="mt-1 flex items-center justify-between text-[11px]">
                  <span className="text-ink-secondary">Package</span>
                  <span className="font-medium text-ink">Guided</span>
                </div>
                <div className="mt-1 flex items-center justify-between text-[11px]">
                  <span className="text-ink-secondary">Channel</span>
                  <span className="text-ink">Dashboard + WhatsApp</span>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Checklist state" />
            <CardBody className="pt-1">
              <Checklist
                items={[
                  { id: 'c1', label: 'Passport verified', done: true },
                  { id: 'c2', label: 'Transcripts verified', done: true },
                  {
                    id: 'c3',
                    label: 'Financial evidence',
                    done: false,
                    hint: '1 correction outstanding',
                  },
                  { id: 'c4', label: 'Tuition proof', done: false, hint: 'Not uploaded' },
                  { id: 'c5', label: 'Verifier sign-off', done: false, hint: 'Blocked by docs' },
                ]}
              />
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Internal notes" description="Never visible to the client." />
            <CardBody className="space-y-2 pt-2">
              <div className="rounded-md bg-warning-soft/60 px-2.5 py-2">
                <p className="text-[10px] font-semibold text-warning">Verifier note · 08 Nov</p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-ink-secondary">
                  Sponsor affidavit notarisation date precedes stamp date. Request re-execution
                  before the pack goes to approval.
                </p>
              </div>
              <div className="rounded-md bg-surface-muted px-2.5 py-2">
                <p className="text-[10px] font-semibold text-ink-secondary">
                  Case manager · 05 Nov
                </p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-ink-secondary">
                  Client responsive. Prefers Bangla messages. Quiet hours 22:00–08:00.
                </p>
              </div>
              <p className="text-[10px] leading-relaxed text-ink-tertiary">
                Internal notes are separated from client-visible activity at the API layer, not just
                hidden in the interface.
              </p>
            </CardBody>
          </Card>

          <Card id="audit" className="scroll-mt-20">
            <CardHeader title="Recent audit entries" />
            <CardBody className="pt-1">
              <ul className="divide-y divide-line">
                {[
                  { at: '2026-11-10 09:41', who: 'tanvir.ahmed', what: 'document.view doc_5' },
                  { at: '2026-11-10 09:38', who: 'system', what: 'ocr.extract doc_5' },
                  { at: '2026-11-09 17:02', who: 'unknown', what: 'case.read DENIED (RLS)' },
                  { at: '2026-11-08 09:12', who: 'ayesha.rahman', what: 'task.create tsk_9921' },
                ].map((entry) => (
                  <li key={entry.at} className="py-2">
                    <p className="font-mono text-[9px] text-ink-tertiary">{entry.at}</p>
                    <p className="text-[11px] text-ink">
                      <span className="font-medium">{entry.who}</span>{' '}
                      <span
                        className={
                          entry.what.includes('DENIED') ? 'text-danger' : 'text-ink-secondary'
                        }
                      >
                        {entry.what}
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
              <Link
                href="/audit"
                className="mt-2 block text-center text-[11px] font-semibold text-brand-700 hover:underline"
              >
                Full audit log →
              </Link>
            </CardBody>
          </Card>

          <Alert tone="info" title="Last action">
            {formatDateTime(new Date().toISOString())} · nothing changed by you on this case yet.
          </Alert>
        </div>
      </div>
    </div>
  );
}
