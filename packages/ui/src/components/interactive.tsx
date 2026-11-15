'use client';

import { useState, type ReactNode } from 'react';
import { cx } from '../cx';

/* ================================================================== */
/* Agent chat — Client Main Agent / Super Main Agent                  */
/* ================================================================== */
export interface ChatMessage {
  id: string;
  role: 'agent' | 'user' | 'system';
  content: string;
  at: string;
  citations?: { label: string; version: string }[];
  pending?: boolean;
}

const SUGGESTIONS = [
  'What is blocking my Canada case?',
  'Which documents are still missing?',
  'What does the £490 UK student fee cover?',
  'Can I add my spouse to my case?',
];

const CANNED: Record<
  string,
  { content: string; citations?: { label: string; version: string }[] }
> = {
  default: {
    content:
      'I can answer from approved policy sources only. For VH-2026-0148 the single blocker is the bank statement: the final page needs a bank stamp before verification can pass. Everything else in your finance set is in review. You can re-upload it from the case workspace and the verifier is notified automatically.',
    citations: [
      { label: 'IRCC — Study permit requirements', version: 'IRCC-SP-2024.1' },
      { label: 'VisaHobe verification standard', version: 'VS-2026.3' },
    ],
  },
};

export function AgentChat({
  agentName = 'VisaHobe Assistant',
  agentRole = 'Client Main Agent',
  messages,
  composerNote = 'Answers use approved policy sources. A human verifier approves every document.',
  className,
}: {
  agentName?: string;
  agentRole?: string;
  messages: ChatMessage[];
  composerNote?: string;
  className?: string;
}) {
  const [thread, setThread] = useState<ChatMessage[]>(messages);
  const [draft, setDraft] = useState('');
  const [thinking, setThinking] = useState(false);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || thinking) return;
    const now = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    setThread((prev) => [
      ...prev,
      { id: `u_${Date.now()}`, role: 'user', content: trimmed, at: now },
    ]);
    setDraft('');
    setThinking(true);
    window.setTimeout(() => {
      const canned = CANNED.default!;
      setThread((prev) => [
        ...prev,
        {
          id: `a_${Date.now()}`,
          role: 'agent',
          content: canned.content,
          at: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
          ...(canned.citations ? { citations: canned.citations } : {}),
        },
      ]);
      setThinking(false);
    }, 900);
  };

  return (
    <div className={cx('flex h-full flex-col', className)}>
      <div className="flex items-center gap-3 border-b border-line px-4 py-3">
        <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-brand-700 font-display text-sm font-semibold text-white">
          VH
          <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-success" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-ink">{agentName}</p>
          <p className="text-[11px] text-ink-tertiary">
            {agentRole} · policy-sourced · cannot approve or submit
          </p>
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto scrollbar-thin px-4 py-4">
        {thread.map((message) => (
          <div
            key={message.id}
            className={cx('flex', message.role === 'user' ? 'justify-end' : 'justify-start')}
          >
            <div
              className={cx(
                'max-w-[86%] rounded-lg px-3.5 py-2.5 text-sm leading-relaxed',
                message.role === 'user'
                  ? 'bg-brand-700 text-white'
                  : message.role === 'system'
                    ? 'border border-line bg-surface-muted text-ink-secondary'
                    : 'border border-line bg-surface text-ink',
              )}
            >
              <p className="whitespace-pre-line">{message.content}</p>
              {message.citations?.length ? (
                <div className="mt-2 space-y-1 border-t border-line pt-2">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-tertiary">
                    Sources
                  </p>
                  {message.citations.map((c) => (
                    <p key={c.version} className="text-[11px] text-brand-700">
                      {c.label} · <span className="font-mono text-[10px]">{c.version}</span>
                    </p>
                  ))}
                </div>
              ) : null}
              <p
                className={cx(
                  'mt-1 text-[10px]',
                  message.role === 'user' ? 'text-white/60' : 'text-ink-tertiary',
                )}
              >
                {message.at}
              </p>
            </div>
          </div>
        ))}
        {thinking ? (
          <div className="flex justify-start">
            <div className="flex items-center gap-1.5 rounded-lg border border-line bg-surface px-3.5 py-3">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-400" />
              <span
                className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-400"
                style={{ animationDelay: '150ms' }}
              />
              <span
                className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-400"
                style={{ animationDelay: '300ms' }}
              />
            </div>
          </div>
        ) : null}
      </div>

      <div className="border-t border-line px-4 py-3">
        <div className="mb-2 flex flex-wrap gap-1.5">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => send(s)}
              className="rounded-full border border-line bg-surface px-2.5 py-1 text-[11px] text-ink-secondary transition-colors hover:border-brand-200 hover:text-brand-700"
            >
              {s}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(draft);
          }}
          className="flex items-end gap-2"
        >
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                send(draft);
              }
            }}
            rows={1}
            placeholder="Ask about your case, a route or a fee…"
            aria-label="Message the assistant"
            className="max-h-28 min-h-[40px] flex-1 resize-none rounded-md border border-line bg-surface px-3 py-2.5 text-sm text-ink outline-none focus:border-brand-300 focus:ring-1 focus:ring-brand-300"
          />
          <button
            type="submit"
            disabled={!draft.trim() || thinking}
            className="flex h-10 items-center gap-1.5 rounded-md bg-brand-700 px-4 text-sm font-medium text-white transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-brand-300"
          >
            Send
          </button>
        </form>
        <p className="mt-2 text-[10px] leading-snug text-ink-tertiary">{composerNote}</p>
      </div>
    </div>
  );
}

/* ================================================================== */
/* Agent chat launcher — floating glass drawer                        */
/* ================================================================== */
export function AgentChatLauncher({
  agentName = 'VisaHobe Assistant',
  agentRole = 'Client Main Agent',
  greeting,
}: {
  agentName?: string;
  agentRole?: string;
  greeting: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-40 flex h-12 items-center gap-2 rounded-full bg-brand-700 px-4 text-sm font-medium text-white shadow-lg transition-transform hover:scale-[1.02] hover:bg-brand-600 animate-pulse-ring"
      >
        <span aria-hidden>✦</span>
        Ask {agentName.split(' ')[0]}
      </button>
      {open ? (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-brand-900/30"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <aside
            role="dialog"
            aria-modal="true"
            aria-label={agentName}
            className="liquid-glass-panel-strong absolute inset-y-0 right-0 flex w-full max-w-md flex-col animate-slide-in-right"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close assistant"
              className="absolute left-3 top-3.5 z-10 flex h-7 w-7 items-center justify-center rounded-sm text-ink-tertiary hover:bg-white/60"
            >
              ✕
            </button>
            <AgentChat
              agentName={agentName}
              agentRole={agentRole}
              messages={[{ id: 'm0', role: 'agent', content: greeting, at: 'now' }]}
            />
          </aside>
        </div>
      ) : null}
    </>
  );
}

/* ================================================================== */
/* Tabs with client state                                             */
/* ================================================================== */
export function Tabs({
  tabs,
  children,
}: {
  tabs: { id: string; label: string; count?: number }[];
  children: (active: string) => ReactNode;
}) {
  const [active, setActive] = useState(tabs[0]?.id ?? '');
  return (
    <div>
      <div role="tablist" className="flex gap-1 overflow-x-auto border-b border-line no-scrollbar">
        {tabs.map((tab) => {
          const isActive = tab.id === active;
          return (
            <button
              key={tab.id}
              role="tab"
              type="button"
              aria-selected={isActive}
              onClick={() => setActive(tab.id)}
              className={cx(
                'relative whitespace-nowrap px-3 pb-2.5 pt-2 text-sm font-medium transition-colors',
                isActive
                  ? 'text-brand-700 after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:rounded-full after:bg-brand-700'
                  : 'text-ink-secondary hover:text-ink',
              )}
            >
              {tab.label}
              {typeof tab.count === 'number' ? (
                <span className="ml-1.5 rounded-xs bg-surface-muted px-1 py-px text-[10px] numeric text-ink-tertiary">
                  {tab.count}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
      <div role="tabpanel" className="pt-4">
        {children(active)}
      </div>
    </div>
  );
}

/* ================================================================== */
/* Disclosure / expandable                                            */
/* ================================================================== */
export function Disclosure({
  summary,
  children,
  defaultOpen,
}: {
  summary: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details open={defaultOpen} className="group rounded-md border border-line bg-surface">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-medium text-ink marker:hidden">
        {summary}
        <span aria-hidden className="text-ink-tertiary transition-transform group-open:rotate-45">
          +
        </span>
      </summary>
      <div className="border-t border-line px-4 py-3 text-sm text-ink-secondary">{children}</div>
    </details>
  );
}
