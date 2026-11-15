import { cx } from '../cx';
import type { StatusTone } from '@visahobe/design-system';

/* ================================================================== */
/* Filter bar                                                         */
/* ================================================================== */
export interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

export function FilterBar({
  options,
  active,
  className,
}: {
  options: FilterOption[];
  active: string;
  className?: string;
}) {
  return (
    <div
      role="tablist"
      aria-label="Filters"
      className={cx('flex flex-wrap items-center gap-1.5', className)}
    >
      {options.map((option) => {
        const isActive = option.id === active;
        return (
          <button
            key={option.id}
            role="tab"
            aria-selected={isActive}
            type="button"
            className={cx(
              'inline-flex items-center gap-1.5 rounded-sm px-2.5 py-1.5 text-xs font-medium transition-colors',
              isActive
                ? 'bg-brand-700 text-white shadow-xs'
                : 'bg-surface text-ink-secondary ring-1 ring-inset ring-line hover:bg-surface-muted hover:text-ink',
            )}
          >
            {option.label}
            {typeof option.count === 'number' ? (
              <span
                className={cx(
                  'rounded-xs px-1 py-px text-[10px] numeric',
                  isActive ? 'bg-white/20' : 'bg-surface-muted text-ink-tertiary',
                )}
              >
                {option.count}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

/* ================================================================== */
/* Data table — deliberately opaque (ADR-009)                         */
/* ================================================================== */
export interface Column<T> {
  key: string;
  header: string;
  render: (row: T) => React.ReactNode;
  align?: 'left' | 'right' | 'center';
  width?: string;
  hideBelow?: 'sm' | 'md' | 'lg' | 'xl';
}

export function DataTable<T>({
  columns,
  rows,
  rowKey,
  emptyLabel = 'No records match these filters.',
  caption,
  dense,
}: {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  emptyLabel?: string;
  caption?: string;
  dense?: boolean;
}) {
  const hideMap = {
    sm: 'hidden sm:table-cell',
    md: 'hidden md:table-cell',
    lg: 'hidden lg:table-cell',
    xl: 'hidden xl:table-cell',
  };
  return (
    <div className="data-table-shell">
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          {caption ? <caption className="sr-only">{caption}</caption> : null}
          <thead>
            <tr className="border-b border-line bg-surface-muted/70">
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  style={col.width ? { width: col.width } : undefined}
                  className={cx(
                    'whitespace-nowrap px-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-tertiary',
                    dense ? 'py-2' : 'py-2.5',
                    col.align === 'right' && 'text-right',
                    col.align === 'center' && 'text-center',
                    col.hideBelow && hideMap[col.hideBelow],
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-10 text-center text-sm text-ink-secondary"
                >
                  {emptyLabel}
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={rowKey(row)} className="group transition-colors hover:bg-brand-50/50">
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={cx(
                        'px-4 align-middle text-ink',
                        dense ? 'py-2.5' : 'py-3.5',
                        col.align === 'right' && 'text-right',
                        col.align === 'center' && 'text-center',
                        col.hideBelow && hideMap[col.hideBelow],
                      )}
                    >
                      {col.render(row)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ================================================================== */
/* SLA countdown                                                      */
/* ================================================================== */
export function SlaCountdown({
  hoursLeft,
  state,
  compact,
}: {
  hoursLeft: number;
  state: 'ok' | 'warning' | 'breach';
  compact?: boolean;
}) {
  const tone: Record<typeof state, string> = {
    ok: 'text-success bg-success-soft ring-success/20',
    warning: 'text-warning bg-warning-soft ring-warning/20',
    breach: 'text-danger bg-danger-soft ring-danger/20',
  };
  const label =
    state === 'breach'
      ? 'Breached'
      : hoursLeft < 24
        ? `${hoursLeft}h left`
        : `${Math.floor(hoursLeft / 24)}d ${hoursLeft % 24}h`;
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1 rounded-sm font-medium ring-1 ring-inset numeric',
        compact ? 'px-1.5 py-0.5 text-[11px]' : 'px-2 py-0.5 text-xs',
        tone[state],
      )}
    >
      {state === 'breach' ? '⚠' : '⏱'} {label}
    </span>
  );
}

/* ================================================================== */
/* Status pipeline                                                    */
/* ================================================================== */
export function StatusPipeline({
  stages,
  currentIndex,
  className,
}: {
  stages: string[];
  currentIndex: number;
  className?: string;
}) {
  return (
    <ol
      className={cx('flex w-full items-center gap-1', className)}
      aria-label="Case stage pipeline"
    >
      {stages.map((stage, index) => {
        const done = index < currentIndex;
        const current = index === currentIndex;
        return (
          <li key={stage} className="min-w-0 flex-1">
            <div className="flex items-center gap-1">
              <span
                className={cx(
                  'h-1.5 w-full rounded-full',
                  done ? 'bg-brand-600' : current ? 'bg-brand-400' : 'bg-surface-sunken',
                )}
                aria-hidden
              />
            </div>
            <span
              className={cx(
                'mt-1.5 block truncate text-[10px] font-medium uppercase tracking-wide',
                current ? 'text-brand-700' : done ? 'text-ink-secondary' : 'text-ink-tertiary',
              )}
            >
              {stage}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

/* ================================================================== */
/* Tabs (server-rendered, link based)                                 */
/* ================================================================== */
export function TabNav({
  tabs,
  active,
  className,
}: {
  tabs: { id: string; label: string; href: string; count?: number }[];
  active: string;
  className?: string;
}) {
  return (
    <nav
      aria-label="Section tabs"
      className={cx('flex gap-1 overflow-x-auto border-b border-line no-scrollbar', className)}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === active;
        return (
          <a
            key={tab.id}
            href={tab.href}
            aria-current={isActive ? 'page' : undefined}
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
          </a>
        );
      })}
    </nav>
  );
}

/* ================================================================== */
/* Document tile                                                      */
/* ================================================================== */
const docStatusTone: Record<string, { tone: StatusTone; label: string }> = {
  verified: { tone: 'success', label: 'Verified' },
  pending_review: { tone: 'info', label: 'In review' },
  needs_correction: { tone: 'warning', label: 'Correction needed' },
  missing: { tone: 'danger', label: 'Missing' },
  expired: { tone: 'danger', label: 'Expired' },
};

export function DocumentTile({
  name,
  category,
  status,
  meta,
  note,
  icon,
}: {
  name: string;
  category: string;
  status: string;
  meta: string;
  note?: string;
  icon?: React.ReactNode;
}) {
  const cfg = docStatusTone[status] ?? { tone: 'neutral' as StatusTone, label: status };
  return (
    <div className="flex items-start gap-3 rounded-md border border-line bg-surface p-3 transition-colors hover:border-brand-200">
      <div
        className={cx(
          'flex h-9 w-9 shrink-0 items-center justify-center rounded-sm',
          cfg.tone === 'success' && 'bg-success-soft text-success',
          cfg.tone === 'info' && 'bg-info-soft text-info',
          cfg.tone === 'warning' && 'bg-warning-soft text-warning',
          cfg.tone === 'danger' && 'bg-danger-soft text-danger',
          cfg.tone === 'neutral' && 'bg-surface-muted text-ink-secondary',
        )}
        aria-hidden
      >
        {icon ?? '▤'}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="truncate text-sm font-medium text-ink" title={name}>
            {name}
          </p>
          <DocStatusBadge tone={cfg.tone} label={cfg.label} />
        </div>
        <p className="mt-0.5 text-xs text-ink-tertiary">
          {category} · {meta}
        </p>
        {note ? (
          <p className="mt-1.5 rounded-xs bg-warning-soft/60 px-2 py-1 text-[11px] leading-snug text-warning">
            {note}
          </p>
        ) : null}
      </div>
    </div>
  );
}

function DocStatusBadge({ tone, label }: { tone: StatusTone; label: string }) {
  const classes: Record<StatusTone, string> = {
    success: 'bg-success-soft text-success',
    info: 'bg-info-soft text-info',
    warning: 'bg-warning-soft text-warning',
    danger: 'bg-danger-soft text-danger',
    neutral: 'bg-surface-muted text-ink-secondary',
    brand: 'bg-brand-100 text-brand-700',
  };
  return (
    <span
      className={cx(
        'shrink-0 whitespace-nowrap rounded-xs px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
        classes[tone],
      )}
    >
      {label}
    </span>
  );
}
