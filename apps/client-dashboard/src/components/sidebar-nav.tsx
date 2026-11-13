'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { cx } from '@visahobe/ui';
import { clientNav } from '@/lib/nav';
import { Icon } from '@/lib/icons';

export function SidebarNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const content = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 shrink-0 items-center gap-2.5 border-b border-line px-4">
        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-700 font-display text-[0.85rem] font-bold text-white">
          VH
        </span>
        <div className="min-w-0">
          <p className="truncate font-display text-sm font-semibold leading-tight text-ink">
            VisaHobe
          </p>
          <p className="truncate text-[10px] text-ink-tertiary">Client workspace</p>
        </div>
      </div>

      <nav
        aria-label="Client workspace"
        className="shell-sidebar-scroll flex-1 overflow-y-auto px-3 py-4"
      >
        {clientNav.map((section) => (
          <div key={section.title} className="mb-5">
            <p className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-tertiary">
              {section.title}
            </p>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      aria-current={active ? 'page' : undefined}
                      className={cx(
                        'group flex items-center gap-2.5 rounded-sm px-2 py-2 text-sm transition-colors',
                        active
                          ? 'bg-brand-50 font-medium text-brand-700'
                          : 'text-ink-secondary hover:bg-surface-muted hover:text-ink',
                      )}
                    >
                      <Icon
                        name={item.icon}
                        className={cx(
                          'h-4 w-4 shrink-0',
                          active ? 'text-brand-600' : 'text-ink-tertiary',
                        )}
                      />
                      <span className="flex-1 truncate">{item.label}</span>
                      {item.badge ? (
                        <span
                          className={cx(
                            'rounded-xs px-1 py-px text-[10px] font-semibold numeric',
                            item.badgeTone === 'warning'
                              ? 'bg-warning-soft text-warning'
                              : item.badgeTone === 'danger'
                                ? 'bg-danger-soft text-danger'
                                : 'bg-brand-100 text-brand-700',
                          )}
                        >
                          {item.badge}
                        </span>
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-line p-3">
        <div className="rounded-md bg-brand-50 p-3">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold text-brand-800">
            <Icon name="shield-check" className="h-3.5 w-3.5" />
            Documents are private
          </p>
          <p className="mt-1 text-[10px] leading-relaxed text-ink-secondary">
            Stored encrypted. Access is role-scoped and logged. Never send documents over chat.
          </p>
        </div>
        <Link
          href="/"
          className="mt-2 flex items-center gap-2 rounded-sm px-2 py-1.5 text-xs text-ink-tertiary hover:bg-surface-muted hover:text-ink"
        >
          <Icon name="logout" className="h-3.5 w-3.5" />
          Sign out
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop rail */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-sidebar border-r border-line bg-surface lg:block">
        {content}
      </aside>

      {/* Mobile trigger */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        aria-label="Open workspace navigation"
        className="fixed bottom-4 left-4 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-brand-700 text-white shadow-lg lg:hidden"
      >
        <span className="space-y-1" aria-hidden>
          <span className="block h-0.5 w-4 bg-current" />
          <span className="block h-0.5 w-4 bg-current" />
          <span className="block h-0.5 w-4 bg-current" />
        </span>
      </button>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-brand-900/40"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
          <aside className="absolute inset-y-0 left-0 w-full max-w-[280px] animate-fade-in bg-surface">
            {content}
          </aside>
        </div>
      ) : null}
    </>
  );
}
