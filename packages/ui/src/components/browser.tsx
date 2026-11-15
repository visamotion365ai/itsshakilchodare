'use client';

import { useState } from 'react';
import { cx } from '../cx';

/* ================================================================== */
/* Browser live viewer                                                */
/* ================================================================== */
export interface BrowserFrame {
  url: string;
  step: number;
  action: string;
  at: string;
  /** Rendered pseudo "screenshot" content describing what the agent sees. */
  elements: { label: string; value: string; highlighted?: boolean; flag?: string }[];
}

export function BrowserLiveViewer({
  sessionId,
  portal,
  status,
  frames,
  guardrails,
}: {
  sessionId: string;
  portal: string;
  status: 'live' | 'paused' | 'ended' | 'takeover';
  frames: BrowserFrame[];
  guardrails: string[];
}) {
  const [index, setIndex] = useState(frames.length - 1);
  const frame = frames[index] ?? frames[0];

  const statusTone = {
    live: 'bg-success',
    paused: 'bg-warning',
    ended: 'bg-ink-tertiary',
    takeover: 'bg-info',
  }[status];

  return (
    <div className="overflow-hidden rounded-lg border border-line bg-surface">
      {/* Overlay control bar — permitted Liquid Glass surface */}
      <div className="liquid-glass-panel flex flex-wrap items-center justify-between gap-2 border-b border-white/50 px-3 py-2">
        <div className="flex min-w-0 items-center gap-2">
          <span
            className={cx('h-2 w-2 rounded-full', statusTone, status === 'live' && 'animate-pulse')}
          />
          <span className="font-mono text-[11px] text-ink-secondary">{sessionId}</span>
          <span className="hidden text-[11px] text-ink-tertiary sm:inline">· {portal}</span>
        </div>
        <div className="flex items-center gap-2 text-[10px]">
          <span className="rounded-xs bg-white/60 px-1.5 py-0.5 font-medium uppercase tracking-wide text-ink-secondary">
            {status}
          </span>
          <span className="hidden rounded-xs bg-white/60 px-1.5 py-0.5 text-ink-tertiary md:inline">
            Step {frame ? frame.step : 0} / {frames.length}
          </span>
        </div>
      </div>

      {/* Address bar */}
      <div className="flex items-center gap-2 border-b border-line bg-surface-muted px-3 py-1.5">
        <span aria-hidden className="text-[10px] text-ink-tertiary">
          🔒
        </span>
        <span className="min-w-0 flex-1 truncate rounded-xs bg-surface px-2 py-1 font-mono text-[11px] text-ink-secondary ring-1 ring-inset ring-line">
          {frame?.url ?? 'about:blank'}
        </span>
      </div>

      {/* Simulated viewport with annotation overlay */}
      <div className="relative bg-[#f8faf9] p-4">
        <div className="rounded-sm border border-line bg-white p-4 shadow-xs">
          <div className="mb-3 flex items-center justify-between border-b border-line pb-2">
            <div className="h-2.5 w-24 rounded-xs bg-surface-sunken" />
            <div className="flex gap-1.5">
              <div className="h-2 w-10 rounded-xs bg-surface-sunken" />
              <div className="h-2 w-10 rounded-xs bg-surface-sunken" />
            </div>
          </div>
          <div className="space-y-2">
            {(frame?.elements ?? []).map((el) => (
              <div
                key={el.label}
                className={cx(
                  'flex items-center justify-between gap-3 rounded-xs border px-2.5 py-1.5 text-[11px]',
                  el.highlighted
                    ? 'border-brand-400 bg-brand-50 ring-2 ring-brand-200/70'
                    : 'border-line bg-surface',
                )}
              >
                <span className="text-ink-tertiary">{el.label}</span>
                <span className="flex items-center gap-1.5 truncate font-medium text-ink">
                  {el.flag ? (
                    <span className="text-warning" title={el.flag}>
                      ⚠
                    </span>
                  ) : null}
                  {el.value}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-3 flex items-center gap-2 rounded-xs bg-brand-50 px-2 py-1.5 text-[10px] text-brand-800">
            <span aria-hidden>◎</span>
            {frame?.action ?? 'Waiting for next agent action'}
          </p>
        </div>

        {/* Screenshot annotation counter */}
        <div className="absolute right-6 top-6 rounded-xs bg-brand-900/85 px-1.5 py-0.5 font-mono text-[9px] text-white/90">
          {frame?.at ?? '--:--:--'} · PII redacted
        </div>
      </div>

      {/* Frame scrubber */}
      <div className="flex items-center gap-2 border-t border-line px-3 py-2">
        <button
          type="button"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
          className="rounded-xs border border-line px-2 py-1 text-[10px] text-ink-secondary disabled:opacity-40"
        >
          ◀ Prev
        </button>
        <input
          type="range"
          min={0}
          max={Math.max(0, frames.length - 1)}
          value={index}
          onChange={(e) => setIndex(Number(e.target.value))}
          aria-label="Screenshot timeline"
          className="h-1 flex-1 accent-brand-700"
        />
        <button
          type="button"
          onClick={() => setIndex((i) => Math.min(frames.length - 1, i + 1))}
          disabled={index === frames.length - 1}
          className="rounded-xs border border-line px-2 py-1 text-[10px] text-ink-secondary disabled:opacity-40"
        >
          Next ▶
        </button>
      </div>

      <div className="flex flex-wrap gap-1.5 border-t border-line bg-surface-muted/60 px-3 py-2">
        {guardrails.map((g) => (
          <span
            key={g}
            className="rounded-xs bg-surface px-1.5 py-0.5 text-[10px] text-ink-secondary ring-1 ring-inset ring-line"
          >
            🛡 {g}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ================================================================== */
/* Human takeover banner                                              */
/* ================================================================== */
export function HumanTakeoverBanner({
  operator,
  since,
  onRelease,
}: {
  operator: string;
  since: string;
  onRelease?: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-info/30 bg-info-soft px-4 py-2.5">
      <div className="flex items-center gap-2.5 text-sm">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-info text-[11px] font-bold text-white">
          ●
        </span>
        <span className="text-ink">
          <strong className="font-semibold">Human takeover active</strong> — {operator} is in
          control since {since}. Agent actions are paused.
        </span>
      </div>
      {onRelease ? (
        <button
          type="button"
          onClick={onRelease}
          className="rounded-sm border border-info/40 bg-white px-2.5 py-1 text-xs font-medium text-info hover:bg-info hover:text-white"
        >
          Release control
        </button>
      ) : (
        <span className="rounded-xs bg-white/70 px-2 py-0.5 text-[11px] font-medium text-info">
          Keyboard & mouse routed
        </span>
      )}
    </div>
  );
}

/* ================================================================== */
/* Tool-call inspector                                                */
/* ================================================================== */
export interface ToolCall {
  id: string;
  name: string;
  status: 'ok' | 'blocked' | 'error';
  durationMs: number;
  input: string;
  output: string;
  permission: string;
  approvedBy: string | null;
}

export function ToolCallInspector({ calls }: { calls: ToolCall[] }) {
  const [openId, setOpenId] = useState<string | null>(calls[0]?.id ?? null);
  return (
    <div className="divide-y divide-line rounded-md border border-line bg-surface">
      {calls.map((call) => {
        const isOpen = openId === call.id;
        const tone =
          call.status === 'ok'
            ? 'text-success bg-success-soft'
            : call.status === 'blocked'
              ? 'text-warning bg-warning-soft'
              : 'text-danger bg-danger-soft';
        return (
          <div key={call.id}>
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : call.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center gap-3 px-3 py-2.5 text-left hover:bg-surface-muted/60"
            >
              <span
                className={cx('rounded-xs px-1.5 py-0.5 text-[10px] font-semibold uppercase', tone)}
              >
                {call.status}
              </span>
              <span className="min-w-0 flex-1 truncate font-mono text-xs text-ink">
                {call.name}
              </span>
              <span className="shrink-0 font-mono text-[10px] text-ink-tertiary numeric">
                {call.durationMs}ms
              </span>
              <span aria-hidden className="text-ink-tertiary">
                {isOpen ? '−' : '+'}
              </span>
            </button>
            {isOpen ? (
              <div className="space-y-2 border-t border-line bg-surface-muted/40 px-3 py-3">
                <Row label="Permission" value={call.permission} mono />
                <Row label="Approved by" value={call.approvedBy ?? 'Not required'} />
                <Row label="Input" value={call.input} mono block />
                <Row label="Output" value={call.output} mono block />
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function Row({
  label,
  value,
  mono,
  block,
}: {
  label: string;
  value: string;
  mono?: boolean;
  block?: boolean;
}) {
  return (
    <div className={block ? '' : 'flex items-baseline justify-between gap-3'}>
      <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-tertiary">{label}</p>
      <p
        className={cx(
          'text-xs text-ink',
          mono && 'font-mono text-[11px]',
          block && 'mt-0.5 break-all rounded-xs bg-surface px-2 py-1.5 ring-1 ring-inset ring-line',
        )}
      >
        {value}
      </p>
    </div>
  );
}

/* ================================================================== */
/* Screenshot annotation viewer                                       */
/* ================================================================== */
export interface Annotation {
  id: string;
  x: number;
  y: number;
  label: string;
  note: string;
  tone: 'warning' | 'danger' | 'success' | 'info';
}

export function AnnotationViewer({
  title,
  capturedAt,
  annotations,
}: {
  title: string;
  capturedAt: string;
  annotations: Annotation[];
}) {
  const [active, setActive] = useState<string | null>(annotations[0]?.id ?? null);
  const toneRing = {
    warning: 'ring-warning bg-warning',
    danger: 'ring-danger bg-danger',
    success: 'ring-success bg-success',
    info: 'ring-info bg-info',
  };
  return (
    <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
      <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-line bg-[#f6f8f7]">
        {/* Pseudo document under review */}
        <div className="absolute inset-4 rounded-xs border border-line bg-white p-5 shadow-xs">
          <div className="h-3 w-1/3 rounded-xs bg-surface-sunken" />
          <div className="mt-4 space-y-1.5">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="h-2 rounded-xs bg-surface-sunken"
                style={{ width: `${70 + ((i * 13) % 30)}%` }}
              />
            ))}
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="h-14 rounded-xs border border-line bg-surface-muted" />
            <div className="h-14 rounded-xs border border-line bg-surface-muted" />
          </div>
        </div>
        {annotations.map((a, i) => (
          <button
            key={a.id}
            type="button"
            onClick={() => setActive(a.id)}
            style={{ left: `${a.x}%`, top: `${a.y}%` }}
            aria-label={a.label}
            className={cx(
              'absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-[10px] font-bold text-white ring-4 transition-transform hover:scale-110',
              toneRing[a.tone],
              active === a.id ? 'ring-opacity-40' : 'ring-opacity-20',
            )}
          >
            {i + 1}
          </button>
        ))}
        <p className="absolute bottom-2 right-3 font-mono text-[9px] text-ink-tertiary">
          {capturedAt} · {title}
        </p>
      </div>
      <div className="space-y-2">
        {annotations.map((a, i) => (
          <button
            key={a.id}
            type="button"
            onClick={() => setActive(a.id)}
            className={cx(
              'block w-full rounded-md border px-3 py-2 text-left transition-colors',
              active === a.id
                ? 'border-brand-300 bg-brand-50'
                : 'border-line bg-surface hover:bg-surface-muted',
            )}
          >
            <p className="flex items-center gap-2 text-xs font-semibold text-ink">
              <span
                className={cx(
                  'flex h-4 w-4 items-center justify-center rounded-full text-[9px] text-white',
                  toneRing[a.tone].split(' ')[1],
                )}
              >
                {i + 1}
              </span>
              {a.label}
            </p>
            <p className="mt-1 text-[11px] leading-snug text-ink-secondary">{a.note}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
