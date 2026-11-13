import type { ReactNode } from 'react';
import { cx } from '../cx';

/* ================================================================== */
/* Dashboard app shell                                                */
/* ================================================================== */
export interface AppShellProps {
  sidebar: ReactNode;
  topbar: ReactNode;
  children: ReactNode;
  /** Optional right-hand rail (agent activity, contextual detail). */
  aside?: ReactNode;
  className?: string;
}

/**
 * Structural shell used by the Client Dashboard and Super Admin.
 * Deliberately opaque — glass is reserved for floating overlays (ADR-009).
 */
export function AppShell({ sidebar, topbar, children, aside, className }: AppShellProps) {
  return (
    <div className={cx('min-h-screen bg-bg', className)}>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div className="lg:pl-sidebar">
        {sidebar}
        <div className="flex min-h-screen flex-col">
          {topbar}
          <div className="flex flex-1">
            <main id="main-content" className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
              {children}
            </main>
            {aside ? (
              <div className="hidden w-[340px] shrink-0 border-l border-line bg-surface xl:block">
                {aside}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export function PageHeader({
  title,
  description,
  breadcrumb,
  actions,
  meta,
}: {
  title: ReactNode;
  description?: ReactNode;
  breadcrumb?: ReactNode;
  actions?: ReactNode;
  meta?: ReactNode;
}) {
  return (
    <header className="mb-6">
      {breadcrumb ? <div className="mb-2 text-xs text-ink-tertiary">{breadcrumb}</div> : null}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-h1 font-semibold tracking-tight text-ink">{title}</h1>
          {description ? (
            <p className="mt-1.5 max-w-2xl text-[0.95rem] text-ink-secondary">{description}</p>
          ) : null}
        </div>
        {actions ? (
          <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>
        ) : null}
      </div>
      {meta ? <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">{meta}</div> : null}
    </header>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => (
          <li key={`${item.label}-${i}`} className="flex items-center gap-1.5">
            {i > 0 ? <span aria-hidden>/</span> : null}
            {item.href ? (
              <a href={item.href} className="hover:text-brand-700">
                {item.label}
              </a>
            ) : (
              <span className="text-ink-secondary">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* ================================================================== */
/* Marketing header / footer                                          */
/* ================================================================== */
export function Container({
  children,
  className,
  size = 'content',
}: {
  children: ReactNode;
  className?: string;
  size?: 'content' | 'prose' | 'wide';
}) {
  const widths = {
    content: 'max-w-content',
    prose: 'max-w-prose',
    wide: 'max-w-[1440px]',
  };
  return (
    <div className={cx('mx-auto w-full px-5 sm:px-8', widths[size], className)}>{children}</div>
  );
}

export function Section({
  children,
  className,
  id,
  tone = 'default',
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: 'default' | 'muted' | 'brand';
}) {
  const tones = {
    default: 'bg-bg',
    muted: 'bg-surface-muted',
    brand: 'bg-brand-900 text-white',
  };
  return (
    <section id={id} className={cx('py-16 sm:py-24', tones[tone], className)}>
      {children}
    </section>
  );
}
