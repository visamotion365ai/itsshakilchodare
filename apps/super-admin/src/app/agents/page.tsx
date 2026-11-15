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
  ProgressBar,
  ToolCallInspector,
} from '@visahobe/ui';
import { agentRuns, formatMoney, type AgentRun } from '@visahobe/shared';
import { Icon } from '@/lib/icons';

export const metadata: Metadata = { title: 'Agent operations' };

const statusTone: Record<AgentRun['status'], 'success' | 'brand' | 'warning' | 'danger' | 'info'> =
  {
    succeeded: 'success',
    running: 'brand',
    awaiting_approval: 'warning',
    failed: 'danger',
    escalated: 'info',
  };

export default function AgentsPage() {
  const awaiting = agentRuns.filter((r) => r.status === 'awaiting_approval');
  const spend = agentRuns.reduce((s, r) => s + r.costUsd, 0);
  const calls = agentRuns.reduce((s, r) => s + r.toolCalls, 0);

  return (
    <div className="mx-auto max-w-[1500px]">
      <PageHeader
        title="Agent operations"
        description="One Super Main Agent orchestrating specialist agents. Every tool call is permission-checked, logged and inspectable."
        breadcrumb="Intelligence / Agents"
        actions={
          <>
            <Button variant="secondary" size="sm">
              <Icon name="filter" className="h-3.5 w-3.5" />
              Filter
            </Button>
            <Button size="sm">
              <Icon name="send" className="h-3.5 w-3.5" />
              Open Super Main Agent
            </Button>
          </>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <KpiTile
          label="Runs today"
          value={agentRuns.length}
          tone="brand"
          icon={<Icon name="agent" className="h-4 w-4" />}
        />
        <KpiTile
          label="Tool calls"
          value={calls}
          tone="info"
          icon={<Icon name="wrench" className="h-4 w-4" />}
          hint="all permission-checked"
        />
        <KpiTile
          label="Awaiting approval"
          value={awaiting.length}
          tone="warning"
          icon={<Icon name="lock" className="h-4 w-4" />}
          hint="agent cannot self-approve"
        />
        <KpiTile
          label="Estimated spend"
          value={`$${spend.toFixed(2)}`}
          tone="neutral"
          icon={<Icon name="wallet" className="h-4 w-4" />}
          hint="this period"
        />
      </div>

      <div className="mt-4">
        <Alert
          tone="info"
          title="Agents never take protected actions alone"
          icon={<Icon name="shield-check" className="h-4 w-4" />}
        >
          Payments, document verification, policy publication, refunds and deploy approvals always
          require a human. When an agent reaches one of those boundaries it stops and requests
          approval — the request is visible below and in the audit trail.
        </Alert>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <div className="min-w-0 space-y-5">
          <Card>
            <CardHeader
              title="Run log"
              description="Model, status, tool calls and cost per run."
              action={
                <FilterBar
                  active="all"
                  options={[
                    { id: 'all', label: 'All', count: agentRuns.length },
                    { id: 'approval', label: 'Approval', count: awaiting.length },
                    {
                      id: 'failed',
                      label: 'Failed',
                      count: agentRuns.filter((r) => r.status === 'failed').length,
                    },
                  ]}
                />
              }
            />
            <CardBody className="pt-1">
              <DataTable<AgentRun>
                caption="Agent run log"
                rowKey={(row) => row.id}
                rows={agentRuns}
                columns={[
                  {
                    key: 'agent',
                    header: 'Agent',
                    render: (row) => (
                      <div>
                        <p className="text-xs font-medium text-ink">{row.agent}</p>
                        <p className="font-mono text-[10px] text-ink-tertiary">
                          {row.model} · {row.id}
                        </p>
                      </div>
                    ),
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
                    key: 'calls',
                    header: 'Calls',
                    render: (row) => (
                      <span className="text-[11px] text-ink numeric">{row.toolCalls}</span>
                    ),
                    align: 'center',
                    hideBelow: 'sm',
                  },
                  {
                    key: 'cost',
                    header: 'Cost',
                    render: (row) => (
                      <span className="whitespace-nowrap font-mono text-[10px] text-ink-secondary">
                        ${row.costUsd.toFixed(2)}
                      </span>
                    ),
                    align: 'right',
                    hideBelow: 'md',
                  },
                  {
                    key: 'summary',
                    header: 'Summary',
                    render: (row) => (
                      <span className="line-clamp-2 max-w-[24ch] text-[10px] leading-relaxed text-ink-secondary">
                        {row.summary}
                      </span>
                    ),
                    hideBelow: 'lg',
                  },
                  {
                    key: 'action',
                    header: '',
                    render: (row) =>
                      row.status === 'awaiting_approval' ? (
                        <Button size="sm">Review</Button>
                      ) : (
                        <Button variant="ghost" size="sm">
                          <Icon name="eye" className="h-3.5 w-3.5" />
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
              title="Pending approval — document.approve"
              description="A5 Verification Assistant · run ag-91c2"
              action={
                <Badge tone="warning" size="sm">
                  awaiting human
                </Badge>
              }
            />
            <CardBody>
              <div className="rounded-md border border-warning/30 bg-warning-soft/40 px-3 py-2.5">
                <p className="text-[11px] font-medium text-warning">
                  Agent stopped at a protected boundary
                </p>
                <p className="mt-1 text-[10px] leading-relaxed text-ink-secondary">
                  The assistant extracted the bank statement, checked the funds table and confirmed
                  the account holder. It requested{' '}
                  <span className="font-mono">document.approve</span> for VH-2026-0148. That
                  permission is not held by any agent role, so the request is queued for a human
                  verifier.
                </p>
              </div>
              <div className="mt-3">
                <ToolCallInspector
                  calls={[
                    {
                      id: 'ap1',
                      name: 'document.ocr.extract',
                      status: 'ok',
                      durationMs: 2140,
                      input: '{ "documentId": "doc_5" }',
                      output: '{ "fields": 12, "confidence": 0.62 }',
                      permission: 'document.read',
                      approvedBy: null,
                    },
                    {
                      id: 'ap2',
                      name: 'document.approve',
                      status: 'blocked',
                      durationMs: 4,
                      input: '{ "documentId": "doc_5", "verifier": "agent" }',
                      output: '{ "error": "human_verification_required" }',
                      permission: 'document.verify',
                      approvedBy: null,
                    },
                  ]}
                />
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button size="sm">Approve request (human)</Button>
                <Button variant="secondary" size="sm">
                  Return to queue
                </Button>
                <Button variant="ghost" size="sm">
                  Inspect full trace
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="space-y-5">
          <Card>
            <CardHeader title="Agent roster" />
            <CardBody className="space-y-2.5 pt-2">
              {[
                {
                  name: 'A1 Super Main Agent',
                  scope: 'Orchestrator — no protected actions',
                  tone: 'brand' as const,
                },
                {
                  name: 'A2 Client Main Agent',
                  scope: 'Client chat · own case only',
                  tone: 'info' as const,
                },
                {
                  name: 'A3 Case Intelligence',
                  scope: 'Extraction & risk signals',
                  tone: 'neutral' as const,
                },
                {
                  name: 'A4 Policy Research',
                  scope: 'Cited policy lookup',
                  tone: 'neutral' as const,
                },
                {
                  name: 'A5 Verification Assistant',
                  scope: 'Suggests; humans approve',
                  tone: 'warning' as const,
                },
                {
                  name: 'A6 Partner Coordinator',
                  scope: 'Scoped partner tasks',
                  tone: 'neutral' as const,
                },
                {
                  name: 'A7 Finance Assistant',
                  scope: 'Reconciles; humans refund',
                  tone: 'neutral' as const,
                },
                {
                  name: 'A8 Engineering Agent',
                  scope: 'Proposes diffs; humans merge',
                  tone: 'danger' as const,
                },
              ].map((agent) => (
                <div
                  key={agent.name}
                  className="flex items-start justify-between gap-2 rounded-md border border-line px-2.5 py-2"
                >
                  <div className="min-w-0">
                    <p className="text-[11px] font-medium text-ink">{agent.name}</p>
                    <p className="text-[9px] leading-relaxed text-ink-tertiary">{agent.scope}</p>
                  </div>
                  <Badge tone={agent.tone} size="sm">
                    active
                  </Badge>
                </div>
              ))}
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Guardrails" />
            <CardBody className="space-y-2 pt-2">
              {[
                'Agents act only through permission-checked tools.',
                'Agents can never approve verification, refunds or deploys.',
                'Client-facing answers must cite policy or case records.',
                'Uncertainty is stated plainly — never fabricated certainty.',
                'Raw document bytes never enter prompts or traces.',
                'Every run is logged with inputs, outputs and cost.',
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
            <CardHeader title="Quality signals" description="Rolling 7 days" />
            <CardBody className="space-y-2.5 pt-2">
              <ProgressBar value={92} label="Runs completed without human rescue" tone="success" />
              <ProgressBar value={8} label="Runs escalated for judgement" tone="warning" />
              <ProgressBar value={0} label="Runs with policy violations" tone="success" />
              <div className="flex items-center justify-between pt-1 text-[10px] text-ink-tertiary">
                <span>Avg. cost per run</span>
                <span className="text-ink numeric">
                  {formatMoney(Math.round((spend / Math.max(agentRuns.length, 1)) * 110))}
                </span>
              </div>
            </CardBody>
          </Card>

          <div>
            <DisclaimerStrip>
              Model choice is deliberately abstracted. Any model can be swapped without touching the
              business logic, and every run records the model used so quality changes are traceable.
            </DisclaimerStrip>
          </div>
        </div>
      </div>
    </div>
  );
}
