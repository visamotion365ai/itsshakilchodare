import type { Metadata } from 'next';
import { Alert, Badge, Card, PageHeader, AgentChat } from '@visahobe/ui';
import { clientCases } from '@visahobe/shared';
import { Icon } from '@/lib/icons';

export const metadata: Metadata = { title: 'Messages' };

const humanThreads = [
  {
    id: 'th_1',
    name: 'Ayesha Rahman',
    role: 'Case manager · VH-2026-0148',
    initials: 'AR',
    preview: 'I have returned one correction — the bank stamp. Everything else looks clean.',
    at: '09:12',
    unread: 1,
    online: true,
  },
  {
    id: 'th_2',
    name: 'Tanvir Ahmed',
    role: 'Verifier · documents',
    initials: 'TA',
    preview: 'Sponsor affidavit is with me for review. Expect a decision tomorrow.',
    at: 'Yesterday',
    unread: 0,
    online: false,
  },
  {
    id: 'th_3',
    name: 'Nusrat Jahan',
    role: 'Case manager · VH-2026-0192',
    initials: 'NJ',
    preview: 'The Schengen pack is assembled. Please review before authorising submission.',
    at: 'Mon',
    unread: 1,
    online: false,
  },
];

export default function MessagesPage() {
  return (
    <div className="mx-auto max-w-[1400px]">
      <PageHeader
        title="Messages"
        description="Your case managers and verifiers, plus the VisaHobe assistant. Attachments are blocked here by design — documents go through the vault."
        breadcrumb="Workspace / Messages"
      />

      <div className="grid gap-5 xl:grid-cols-[1fr_1.15fr]">
        {/* Human threads */}
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <h2 className="text-sm font-semibold text-ink">Your team</h2>
            <Badge tone="brand" size="sm">
              2 unread
            </Badge>
          </div>
          <ul className="divide-y divide-line">
            {humanThreads.map((thread) => (
              <li key={thread.id}>
                <button
                  type="button"
                  className="flex w-full items-start gap-3 px-4 py-3.5 text-left transition-colors hover:bg-surface-muted/60"
                >
                  <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-100 text-[11px] font-semibold text-brand-800">
                    {thread.initials}
                    {thread.online ? (
                      <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-success" />
                    ) : null}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="truncate text-sm font-medium text-ink">{thread.name}</p>
                      <span className="shrink-0 font-mono text-[10px] text-ink-tertiary">
                        {thread.at}
                      </span>
                    </div>
                    <p className="text-[10px] text-ink-tertiary">{thread.role}</p>
                    <p
                      className={
                        thread.unread > 0
                          ? 'mt-0.5 truncate text-xs font-medium text-ink'
                          : 'mt-0.5 truncate text-xs text-ink-secondary'
                      }
                    >
                      {thread.preview}
                    </p>
                  </div>
                  {thread.unread > 0 ? (
                    <span className="mt-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-700 px-1 text-[9px] font-bold text-white">
                      {thread.unread}
                    </span>
                  ) : null}
                </button>
              </li>
            ))}
          </ul>

          <div className="border-t border-line px-4 py-3">
            <Alert tone="info" title="Attachments are blocked">
              Documents are never attached to messages. Use the document vault — it encrypts files,
              issues signed links and logs every access.
            </Alert>
          </div>

          <div className="border-t border-line px-4 py-3">
            <p className="text-label font-semibold uppercase tracking-wide text-ink-tertiary">
              Thread context
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {clientCases.map((c) => (
                <span
                  key={c.id}
                  className="rounded-xs bg-surface-muted px-1.5 py-0.5 font-mono text-[10px] text-ink-secondary"
                >
                  {c.caseNumber}
                </span>
              ))}
            </div>
          </div>
        </Card>

        {/* Assistant */}
        <Card className="flex h-[640px] flex-col overflow-hidden">
          <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
            <div className="flex items-center gap-2">
              <Icon name="sparkles" className="h-4 w-4 text-brand-600" />
              <h2 className="text-sm font-semibold text-ink">VisaHobe Assistant</h2>
              <Badge tone="brand" size="sm">
                Client Main Agent
              </Badge>
            </div>
            <span className="font-mono text-[10px] text-ink-tertiary">policy-sourced</span>
          </div>
          <AgentChat
            className="min-h-0 flex-1"
            messages={[
              {
                id: 'm1',
                role: 'system',
                content:
                  'Conversation started for VH-2026-0148. The assistant answers only from approved policy sources and cannot approve, submit or refund.',
                at: '08:55',
              },
              {
                id: 'm2',
                role: 'agent',
                content:
                  'Good morning Rafid. Your Canada student case is in the verification stage. One document needs a correction: the bank statement is missing a stamp on the final page. Everything else in your finance set is either verified or in review.',
                at: '09:01',
                citations: [
                  { label: 'IRCC — Study permit requirements', version: 'IRCC-SP-2024.1' },
                  { label: 'VisaHobe verification standard', version: 'VS-2026.3' },
                ],
              },
              {
                id: 'm3',
                role: 'user',
                content: 'How long will it take after I re-upload?',
                at: '09:04',
              },
              {
                id: 'm4',
                role: 'agent',
                content:
                  'A re-upload triggers review automatically. Verification pass 1 typically completes in 2–3 business days, and the treasury-proof item can be reviewed in parallel. After that the case moves to Preparation, where the pack is assembled for your approval.',
                at: '09:04',
                citations: [{ label: 'VisaHobe service levels', version: 'SLA-2026.2' }],
              },
            ]}
          />
        </Card>
      </div>
    </div>
  );
}
