'use client';

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { cx } from '../cx';

/* ================================================================== */
/* Modal — Liquid Glass permitted surface                             */
/* ================================================================== */
export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    ref.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  if (!open) return null;
  const widths = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl' };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
      <div
        className="absolute inset-0 bg-brand-900/35 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden
      />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className={cx(
          'liquid-glass-panel-strong relative w-full rounded-xl p-6 animate-scale-in',
          widths[size],
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-h3 font-semibold text-ink">{title}</h2>
            {description ? <p className="mt-1 text-sm text-ink-secondary">{description}</p> : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="-mr-1 -mt-1 flex h-8 w-8 items-center justify-center rounded-sm text-ink-tertiary transition-colors hover:bg-white/60 hover:text-ink"
          >
            ✕
          </button>
        </div>
        <div className="mt-4">{children}</div>
        {footer ? <div className="mt-6 flex justify-end gap-2">{footer}</div> : null}
      </div>
    </div>
  );
}

/* ================================================================== */
/* Drawer — Liquid Glass permitted surface                            */
/* ================================================================== */
export function Drawer({
  open,
  onClose,
  title,
  subtitle,
  children,
  width = 'md',
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  width?: 'md' | 'lg';
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-brand-900/30" onClick={onClose} aria-hidden />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cx(
          'liquid-glass-panel-strong absolute inset-y-0 right-0 flex w-full flex-col animate-slide-in-right',
          width === 'md' ? 'max-w-md' : 'max-w-xl',
        )}
      >
        <header className="flex items-start justify-between gap-4 border-b border-white/50 px-5 py-4">
          <div>
            <h2 className="text-h3 font-semibold text-ink">{title}</h2>
            {subtitle ? <p className="mt-0.5 text-xs text-ink-secondary">{subtitle}</p> : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close panel"
            className="flex h-8 w-8 items-center justify-center rounded-sm text-ink-tertiary hover:bg-white/60 hover:text-ink"
          >
            ✕
          </button>
        </header>
        <div className="flex-1 overflow-y-auto scrollbar-thin px-5 py-4">{children}</div>
      </aside>
    </div>
  );
}

/* ================================================================== */
/* Toast                                                              */
/* ================================================================== */
export interface ToastItem {
  id: string;
  title: string;
  description?: string;
  tone?: 'success' | 'info' | 'warning' | 'danger';
}

export function ToastStack({
  toasts,
  onDismiss,
}: {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}) {
  const tones = {
    success: 'border-l-success',
    info: 'border-l-info',
    warning: 'border-l-warning',
    danger: 'border-l-danger',
  };
  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-[60] flex w-full max-w-sm flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="status"
          className={cx(
            'liquid-glass-panel pointer-events-auto flex items-start gap-3 rounded-md border-l-4 px-4 py-3 animate-fade-up',
            tones[toast.tone ?? 'info'],
          )}
        >
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-ink">{toast.title}</p>
            {toast.description ? (
              <p className="mt-0.5 text-xs text-ink-secondary">{toast.description}</p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={() => onDismiss(toast.id)}
            aria-label="Dismiss notification"
            className="text-ink-tertiary hover:text-ink"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}

/* ================================================================== */
/* Accordion (FAQ)                                                    */
/* ================================================================== */
export function Accordion({
  items,
  defaultOpen = 0,
}: {
  items: { question: string; answer: string }[];
  defaultOpen?: number;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  return (
    <div className="divide-y divide-line rounded-lg border border-line bg-surface">
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[0.95rem] font-medium text-ink transition-colors hover:bg-surface-muted/60"
              >
                <span>{item.question}</span>
                <span
                  aria-hidden
                  className={cx(
                    'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line text-ink-tertiary transition-transform duration-200',
                    isOpen && 'rotate-45 border-brand-200 bg-brand-50 text-brand-700',
                  )}
                >
                  +
                </span>
              </button>
            </h3>
            {isOpen ? (
              <div className="px-5 pb-4 text-sm leading-relaxed text-ink-secondary">
                {item.answer}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

/* ================================================================== */
/* Command palette — Cmd+K, Liquid Glass permitted surface            */
/* ================================================================== */
export interface CommandItem {
  id: string;
  label: string;
  href: string;
  group: string;
  hint?: string;
}

export function CommandPalette({ items }: { items: CommandItem[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(0);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const isMod = event.metaKey || event.ctrlKey;
      if (isMod && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((value) => !value);
      }
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items.slice(0, 9);
    return items
      .filter((item) => `${item.label} ${item.group} ${item.hint ?? ''}`.toLowerCase().includes(q))
      .slice(0, 9);
  }, [items, query]);

  const grouped = useMemo(() => {
    const map = new Map<string, CommandItem[]>();
    for (const item of results) {
      const list = map.get(item.group) ?? [];
      list.push(item);
      map.set(item.group, list);
    }
    return [...map.entries()];
  }, [results]);

  const onInputKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setCursor((c) => Math.min(c + 1, results.length - 1));
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setCursor((c) => Math.max(c - 1, 0));
    }
    if (event.key === 'Enter' && results[cursor]) {
      window.location.href = results[cursor]!.href;
    }
  };

  const close = useCallback(() => {
    setOpen(false);
    setQuery('');
    setCursor(0);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group flex h-9 w-full max-w-xs items-center gap-2 rounded-md border border-line bg-surface px-3 text-left text-sm text-ink-tertiary transition-colors hover:border-brand-200 hover:text-ink-secondary"
      >
        <span aria-hidden>⌕</span>
        <span className="flex-1 truncate">Search cases, pages, actions…</span>
        <kbd className="hidden rounded-xs border border-line bg-surface-muted px-1.5 py-0.5 font-mono text-[10px] text-ink-tertiary sm:block">
          ⌘K
        </kbd>
      </button>

      {open ? (
        <div className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[12vh]">
          <div
            className="absolute inset-0 bg-brand-900/40 backdrop-blur-sm"
            onClick={close}
            aria-hidden
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="liquid-glass-panel-strong relative w-full max-w-xl overflow-hidden rounded-xl animate-scale-in"
          >
            <div className="flex items-center gap-3 border-b border-white/50 px-4">
              <span aria-hidden className="text-ink-tertiary">
                ⌕
              </span>
              <input
                autoFocus
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setCursor(0);
                }}
                onKeyDown={onInputKey}
                placeholder="Search cases, services, settings…"
                aria-label="Search commands"
                className="h-12 w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-tertiary"
              />
              <kbd className="rounded-xs border border-white/60 bg-white/50 px-1.5 py-0.5 font-mono text-[10px] text-ink-tertiary">
                ESC
              </kbd>
            </div>
            <div className="max-h-[52vh] overflow-y-auto scrollbar-thin p-2">
              {grouped.length === 0 ? (
                <p className="px-3 py-8 text-center text-sm text-ink-secondary">
                  No matches for “{query}”. Try a case number, a service or a page name.
                </p>
              ) : (
                grouped.map(([group, groupItems]) => (
                  <div key={group} className="mb-1">
                    <p className="px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-tertiary">
                      {group}
                    </p>
                    {groupItems.map((item) => {
                      const index = results.indexOf(item);
                      return (
                        <a
                          key={item.id}
                          href={item.href}
                          onClick={close}
                          className={cx(
                            'flex items-center justify-between gap-3 rounded-sm px-3 py-2 text-sm',
                            index === cursor
                              ? 'bg-brand-700 text-white'
                              : 'text-ink hover:bg-white/60',
                          )}
                        >
                          <span className="truncate">{item.label}</span>
                          {item.hint ? (
                            <span
                              className={cx(
                                'shrink-0 font-mono text-[10px]',
                                index === cursor ? 'text-white/70' : 'text-ink-tertiary',
                              )}
                            >
                              {item.hint}
                            </span>
                          ) : null}
                        </a>
                      );
                    })}
                  </div>
                ))
              )}
            </div>
            <div className="flex items-center justify-between border-t border-white/50 px-4 py-2 text-[10px] text-ink-tertiary">
              <span>↑↓ navigate · ↵ open · esc close</span>
              <span>VisaHobe command palette</span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
