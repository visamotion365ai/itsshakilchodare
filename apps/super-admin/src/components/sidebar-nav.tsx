'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { cx } from '@visahobe/ui';
import { adminNav } from '@/lib/nav';
import { Icon } from '@/lib/icons';

export function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const content = (
    <div className="flex h-full flex-col bg-brand-900">
      <div className="flex h-16 shrink-0 items-center gap-2.5 border-b border-white/10 px-4">
        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white font-display text-[0.85rem] font-bold text-brand-800">
          VH
        </span>
        <div className="min-w-0">
          <p className="truncate font-display text-sm font-semibold leading-tight text-white">
            VisaHobe
          </p>
          <p className="truncate text-[10px] text-white/50">Super Admin · Operations</p>
        </div>
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          className="ml-auto text-white/50 lg:hidden"
          aria-label="Close navigation"
        >
          <Icon name="x" className="h-4 w-4" />
        </button>
      </div>

      <nav
        aria-label="Operations console"
        className="shell-sidebar-scroll flex-1 overflow-y-auto px-2.5 py-3"
      >
        {adminNav.map((section) => (
          <div key={section.title} className="mb-4">
            <p className="mb-1 px-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/35">
              {section.title}
            </p>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const active =
                  item.href === '/'
                    ? pathname === '/'
                    : pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      aria-current={active ? 'page' : undefined}
                      className={cx(
                        'group flex items-center gap-2.5 rounded-sm px-2 py-[7px] text-[13px] transition-colors',
                        active
                          ? 'bg-white/12 font-medium text-white'
                          : 'text-white/65 hover:bg-white/8 hover:text-white',
                      )}
                    >
                      <Icon
                        name={item.icon}
                        className={cx(
                          'h-[15px] w-[15px] shrink-0',
                          active ? 'text-brand-300' : 'text-white/40 group-hover:text-white/70',
                        )}
                      />
                      <span className="flex-1 truncate">{item.label}</span>
                      {item.badge ? (
                        <span
                          className={cx(
                            'rounded-xs px-1 py-px text-[9px] font-bold numeric',
                            item.badgeTone === 'danger'
                              ? 'bg-danger text-white'
                              : item.badgeTone === 'warning'
                                ? 'bg-warning text-white'
                                : item.badgeTone === 'success'
                                  ? 'bg-success text-white'
                                  : 'bg-white/20 text-white',
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

      <div className="border-t border-white/10 p-2.5">
        <div className="rounded-md bg-white/8 p-2.5">
          <p className="flex items-center gap-1.5 text-[10px] font-semibold text-brand-200">
            <Icon name="shield" className="h-3 w-3" />
            3-layer permissions active
          </p>
          <p className="mt-1 text-[9px] leading-relaxed text-white/45">
            UI · API · PostgreSQL RLS. Every sensitive action is audited. Agent actions require
            approval.
          </p>
        </div>
        <div className="mt-2 flex items-center gap-2 rounded-sm px-2 py-1.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-500 text-[10px] font-semibold text-white">
            SH
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[11px] font-medium text-white">Shakil Hossain</p>
            <p className="text-[9px] text-white/45">owner · MFA verified</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-sidebar lg:block">{content}</aside>

      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        aria-label="Open operations navigation"
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
            className="absolute inset-0 bg-brand-950/60"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
          <aside className="absolute inset-y-0 left-0 w-full max-w-[280px] animate-fade-in">
            {content}
          </aside>
        </div>
      ) : null}
    </>
  );
}
