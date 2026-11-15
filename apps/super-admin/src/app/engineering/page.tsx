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
  Sparkline,
  ToolCallInspector,
} from '@visahobe/ui';
import { formatDateTime } from '@visahobe/shared';
import { Icon } from '@/lib/icons';

export const metadata: Metadata = { title: 'Engineering control plane' };

interface PullRequest {
  number: number;
  title: string;
  author: string;
  branch: string;
  checks: 'passing' | 'failing' | 'running' | 'queued';
  review: 'approved' | 'changes_requested' | 'pending';
  additions: number;
  deletions: number;
  updatedAt: string;
  agentAuthored: boolean;
}

const pullRequests: PullRequest[] = [
  {
    number: 214,
    title: 'feat(admin): verification gate with signed approval record',
    author: 'ahmed.rabbi',
    branch: 'feat/verification-gate',
    checks: 'passing',
    review: 'approved',
    additions: 412,
    deletions: 68,
    updatedAt: '2026-11-12T16:24:00+06:00',
    agentAuthored: false,
  },
  {
    number: 213,
    title: 'fix(ocr): block auto-advance when confidence < 0.8',
    author: 'agent/engineering',
    branch: 'agent/ocr-confidence-gate',
    checks: 'passing',
    review: 'pending',
    additions: 96,
    deletions: 12,
    updatedAt: '2026-11-12T14:02:00+06:00',
    agentAuthored: true,
  },
  {
    number: 212,
    title: 'chore(policy): add DE-STU-2024.2 source citations',
    author: 'sadia.islam',
    branch: 'chore/de-pack-sources',
    checks: 'failing',
    review: 'changes_requested',
    additions: 58,
    deletions: 4,
    updatedAt: '2026-11-12T11:47:00+06:00',
    agentAuthored: false,
  },
  {
    number: 211,
    title: 'feat(browser): pause on captcha and request takeover',
    author: 'agent/engineering',
    branch: 'agent/captcha-pause',
    checks: 'running',
    review: 'pending',
    additions: 187,
    deletions: 31,
    updatedAt: '2026-11-12T10:05:00+06:00',
    agentAuthored: true,
  },
];

const branches = [
  { name: 'main', ahead: 0, behind: 0, protected: true, status: 'green' },
  { name: 'staging', ahead: 2, behind: 0, protected: true, status: 'green' },
  { name: 'feat/verification-gate', ahead: 9, behind: 1, protected: false, status: 'green' },
  { name: 'agent/ocr-confidence-gate', ahead: 4, behind: 3, protected: false, status: 'yellow' },
  { name: 'chore/de-pack-sources', ahead: 3, behind: 6, protected: false, status: 'red' },
];

const workflowRuns = [
  { name: 'CI · lint', status: 'success', duration: '1m 24s', commit: '9f2c1ab' },
  { name: 'CI · typecheck', status: 'success', duration: '2m 06s', commit: '9f2c1ab' },
  { name: 'CI · test', status: 'success', duration: '3m 41s', commit: '9f2c1ab' },
  { name: 'CI · build', status: 'running', duration: '—', commit: '4d58e07' },
  { name: 'CodeQL', status: 'success', duration: '5m 12s', commit: '9f2c1ab' },
  { name: 'E2E · playwright', status: 'failure', duration: '6m 30s', commit: 'c1a93b2' },
];

export default function EngineeringPage() {
  return (
    <div className="mx-auto max-w-[1500px]">
      <PageHeader
        title="Engineering control plane"
        description="GitHub-native delivery: pull requests, CI gates, agent-proposed diffs and deploy approval — all visible to the owner without leaving the console."
        breadcrumb="Governance / Engineering"
        actions={
          <>
            <Button variant="secondary" size="sm">
              <Icon name="refresh" className="h-3.5 w-3.5" />
              Sync GitHub
            </Button>
            <Button size="sm">
              <Icon name="plus" className="h-3.5 w-3.5" />
              Open issue
            </Button>
          </>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <KpiTile
          label="Open pull requests"
          value={pullRequests.length}
          tone="brand"
          icon={<Icon name="git-branch" className="h-4 w-4" />}
          hint="2 agent-authored"
        />
        <KpiTile
          label="CI health"
          value="83%"
          tone="warning"
          delta={{ value: '-5 pts', direction: 'down' }}
          icon={<Icon name="activity" className="h-4 w-4" />}
          hint="1 failing workflow"
        />
        <KpiTile
          label="Deploys this week"
          value={6}
          tone="success"
          icon={<Icon name="upload" className="h-4 w-4" />}
          hint="all human-approved"
        />
        <KpiTile
          label="Mean time to merge"
          value="9.4h"
          tone="info"
          delta={{ value: '-1.2h', direction: 'up' }}
          icon={<Icon name="timer" className="h-4 w-4" />}
        />
      </div>

      <div className="mt-4">
        <Alert
          tone="info"
          title="Agents propose, humans merge"
          icon={<Icon name="shield-check" className="h-4 w-4" />}
        >
          The engineering agent may open branches, write commits and open pull requests. It cannot
          push to protected branches, approve its own diff, merge, or trigger a production deploy.
        </Alert>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <div className="min-w-0 space-y-5">
          <Card>
            <CardHeader title="Pull requests" description="Checks and review state at a glance." />
            <CardBody className="pt-1">
              <DataTable<PullRequest>
                caption="Pull requests"
                rowKey={(row) => String(row.number)}
                rows={pullRequests}
                columns={[
                  {
                    key: 'pr',
                    header: 'Pull request',
                    render: (row) => (
                      <div className="min-w-0">
                        <p className="truncate text-xs font-medium text-ink">
                          #{row.number} {row.title}
                        </p>
                        <p className="mt-0.5 flex flex-wrap items-center gap-1.5 text-[10px] text-ink-tertiary">
                          <span className="font-mono">{row.branch}</span>
                          <span>· {row.author}</span>
                          {row.agentAuthored ? (
                            <span className="rounded-xs bg-info-soft px-1 text-[9px] text-info">
                              agent
                            </span>
                          ) : null}
                        </p>
                      </div>
                    ),
                  },
                  {
                    key: 'diff',
                    header: 'Diff',
                    render: (row) => (
                      <span className="whitespace-nowrap font-mono text-[10px]">
                        <span className="text-success">+{row.additions}</span>{' '}
                        <span className="text-danger">−{row.deletions}</span>
                      </span>
                    ),
                    align: 'right',
                    hideBelow: 'md',
                  },
                  {
                    key: 'checks',
                    header: 'CI',
                    render: (row) => (
                      <Badge
                        tone={
                          row.checks === 'passing'
                            ? 'success'
                            : row.checks === 'failing'
                              ? 'danger'
                              : row.checks === 'running'
                                ? 'brand'
                                : 'neutral'
                        }
                        size="sm"
                        dot
                      >
                        {row.checks}
                      </Badge>
                    ),
                    hideBelow: 'sm',
                  },
                  {
                    key: 'review',
                    header: 'Review',
                    render: (row) => (
                      <Badge
                        tone={
                          row.review === 'approved'
                            ? 'success'
                            : row.review === 'changes_requested'
                              ? 'danger'
                              : 'warning'
                        }
                        size="sm"
                      >
                        {row.review.replace('_', ' ')}
                      </Badge>
                    ),
                    hideBelow: 'lg',
                  },
                  {
                    key: 'action',
                    header: '',
                    render: (row) => (
                      <Button
                        variant={row.review === 'approved' ? 'primary' : 'secondary'}
                        size="sm"
                      >
                        {row.review === 'approved' ? 'Merge' : 'Review'}
                      </Button>
                    ),
                    align: 'right',
                  },
                ]}
              />
              <div className="mt-3">
                <DisclaimerStrip>
                  Merging is a human action. Agent-authored pull requests are labelled and always
                  require at least one human review before the merge button is enabled.
                </DisclaimerStrip>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader
              title="Agent-proposed diff — #213"
              description="agent/ocr-confidence-gate · +96 −12"
              action={
                <div className="flex gap-1.5">
                  <Badge tone="info" size="sm">
                    agent
                  </Badge>
                  <Badge tone="success" size="sm">
                    CI passing
                  </Badge>
                </div>
              }
            />
            <CardBody>
              <pre className="overflow-x-auto rounded-md bg-[#0f1b16] p-3 text-[10px] leading-relaxed text-white/85">
                {`diff --git a/packages/domain/verification/gate.ts b/...
@@ -42,7 +42,14 @@ export function canAutoAdvance(doc: OcrResult) {
-  return doc.confidence >= 0.5;
+  // Extraction is advisory. Below 0.8 a human must correct fields
+  // before the document can move to the verification queue.
+  if (doc.confidence < 0.8) {
+    return false;
+  }
+  if (doc.stampPages.length < doc.pages) {
+    return false;
+  }
+  return doc.confidence >= 0.8;`}
              </pre>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div className="rounded-md bg-surface-muted px-3 py-2">
                  <p className="text-[10px] uppercase tracking-wide text-ink-tertiary">
                    Agent rationale
                  </p>
                  <p className="mt-1 text-[10px] leading-relaxed text-ink-secondary">
                    The current threshold lets a 62%-confidence bank statement auto-advance.
                    Guardrail requires blocking below 80% and on missing stamps.
                  </p>
                </div>
                <div className="rounded-md bg-surface-muted px-3 py-2">
                  <p className="text-[10px] uppercase tracking-wide text-ink-tertiary">
                    Tests added
                  </p>
                  <p className="mt-1 text-[10px] leading-relaxed text-ink-secondary">
                    3 unit tests cover low confidence, missing stamp and the happy path.
                  </p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button size="sm">Approve &amp; merge</Button>
                <Button variant="secondary" size="sm">
                  Request changes
                </Button>
                <Button variant="ghost" size="sm">
                  View full diff on GitHub
                </Button>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Workflow runs" description="GitHub Actions · latest push to main" />
            <CardBody className="pt-1">
              <ul className="divide-y divide-line">
                {workflowRuns.map((run) => (
                  <li key={run.name} className="flex items-center justify-between gap-2 py-2">
                    <div className="flex min-w-0 items-center gap-2">
                      <span
                        className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                          run.status === 'success'
                            ? 'bg-success'
                            : run.status === 'running'
                              ? 'animate-pulse bg-brand-600'
                              : 'bg-danger'
                        }`}
                      />
                      <span className="truncate text-[11px] text-ink">{run.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[9px] text-ink-tertiary">{run.commit}</span>
                      <span className="font-mono text-[10px] text-ink-secondary">
                        {run.duration}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </div>

        <div className="space-y-5">
          <Card>
            <CardHeader title="Branches" />
            <CardBody className="pt-1">
              <ul className="divide-y divide-line">
                {branches.map((branch) => (
                  <li key={branch.name} className="py-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex min-w-0 items-center gap-1.5">
                        <Icon name="git-branch" className="h-3 w-3 shrink-0 text-ink-tertiary" />
                        <span className="truncate font-mono text-[10px] text-ink">
                          {branch.name}
                        </span>
                      </span>
                      <span className="flex shrink-0 items-center gap-1">
                        {branch.protected ? (
                          <Icon name="lock" className="h-3 w-3 text-ink-tertiary" />
                        ) : null}
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            branch.status === 'green'
                              ? 'bg-success'
                              : branch.status === 'yellow'
                                ? 'bg-warning'
                                : 'bg-danger'
                          }`}
                        />
                      </span>
                    </div>
                    <p className="mt-0.5 pl-4.5 font-mono text-[9px] text-ink-tertiary">
                      ↑{branch.ahead} ↓{branch.behind}
                    </p>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Deploy pipeline" />
            <CardBody className="space-y-2.5 pt-2">
              {[
                ['CI checks green', 100, 'success'],
                ['Human review', 100, 'success'],
                ['Staging deploy', 100, 'success'],
                ['Production approval', 0, 'warning'],
              ].map(([label, value, tone]) => (
                <ProgressBar
                  key={String(label)}
                  value={Number(value)}
                  label={String(label)}
                  tone={tone as 'success' | 'warning'}
                />
              ))}
              <div className="rounded-md border border-warning/30 bg-warning-soft/50 px-2.5 py-2">
                <p className="text-[10px] font-medium text-warning">Production deploy held</p>
                <p className="mt-0.5 text-[10px] leading-relaxed text-ink-secondary">
                  Requires an owner approval. Agents cannot approve deploys under any circumstances.
                </p>
                <Button size="sm" className="mt-2">
                  Approve production deploy
                </Button>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Build health" description="Last 14 days" />
            <CardBody>
              <div className="flex items-end justify-between">
                <div>
                  <p className="font-display text-2xl font-semibold text-ink numeric">94.1%</p>
                  <p className="text-[10px] text-ink-tertiary">workflow success rate</p>
                </div>
                <Sparkline
                  values={[88, 92, 90, 94, 96, 93, 91, 94, 95, 92, 96, 94, 95, 94]}
                  tone="success"
                  width={130}
                  height={40}
                />
              </div>
              <div className="mt-3 space-y-1.5">
                {[
                  ['Lint', '99.2%'],
                  ['Typecheck', '98.7%'],
                  ['Unit tests', '96.4%'],
                  ['E2E', '82.1%'],
                ].map(([name, rate]) => (
                  <div key={name} className="flex items-center justify-between text-[10px]">
                    <span className="text-ink-secondary">{name}</span>
                    <span className="text-ink numeric">{rate}</span>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Guardrails in the repo" />
            <CardBody className="space-y-2 pt-2">
              {[
                'main and staging are protected branches.',
                'CI must pass lint, typecheck, test and build.',
                'Schema or migration changes require a second reviewer.',
                'No secrets in code; environment values come from the secret store.',
                'Deploys are human-approved and recorded in the audit trail.',
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
            <CardHeader
              title="A8 Engineering Agent — last run"
              description={formatDateTime('2026-11-12T14:02:00+06:00')}
            />
            <CardBody>
              <ToolCallInspector
                calls={[
                  {
                    id: 'e1',
                    name: 'repo.read_file',
                    status: 'ok',
                    durationMs: 180,
                    input: '{ "path": "packages/domain/verification/gate.ts" }',
                    output: '{ "lines": 118 }',
                    permission: 'repo.read',
                    approvedBy: null,
                  },
                  {
                    id: 'e2',
                    name: 'repo.create_branch',
                    status: 'ok',
                    durationMs: 420,
                    input: '{ "name": "agent/ocr-confidence-gate" }',
                    output: '{ "ok": true }',
                    permission: 'repo.branch',
                    approvedBy: null,
                  },
                  {
                    id: 'e3',
                    name: 'repo.open_pull_request',
                    status: 'ok',
                    durationMs: 860,
                    input: '{ "title": "fix(ocr): block auto-advance when confidence < 0.8" }',
                    output: '{ "number": 213 }',
                    permission: 'repo.pr.open',
                    approvedBy: null,
                  },
                  {
                    id: 'e4',
                    name: 'repo.merge',
                    status: 'blocked',
                    durationMs: 5,
                    input: '{ "number": 213 }',
                    output: '{ "error": "human_merge_required" }',
                    permission: 'repo.merge',
                    approvedBy: null,
                  },
                ]}
              />
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
