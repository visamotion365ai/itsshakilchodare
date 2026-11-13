'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { primaryNav } from '@visahobe/shared';

export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open navigation menu"
        aria-expanded={open}
        className="flex h-9 w-9 items-center justify-center rounded-md border border-line bg-surface text-ink lg:hidden"
      >
        <span className="space-y-1" aria-hidden>
          <span className="block h-0.5 w-4 bg-current" />
          <span className="block h-0.5 w-4 bg-current" />
          <span className="block h-0.5 w-4 bg-current" />
        </span>
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-brand-900/40"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div className="liquid-glass-panel-strong absolute inset-y-0 right-0 flex w-full max-w-sm flex-col overflow-y-auto p-5">
            <div className="flex items-center justify-between pb-4">
              <span className="font-display text-base font-semibold text-ink">Menu</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close navigation menu"
                className="flex h-8 w-8 items-center justify-center rounded-sm text-ink-secondary hover:bg-white/60"
              >
                ✕
              </button>
            </div>
            <nav aria-label="Mobile primary" className="space-y-4">
              {primaryNav.map((group) => (
                <div key={group.label}>
                  <Link
                    href={group.href ?? '#'}
                    onClick={() => setOpen(false)}
                    className="block text-sm font-semibold text-ink"
                  >
                    {group.label}
                  </Link>
                  {group.children ? (
                    <div className="mt-1.5 space-y-0.5 border-l border-line pl-3">
                      {group.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setOpen(false)}
                          className="block rounded-sm px-2 py-1.5 text-sm text-ink-secondary hover:bg-white/60 hover:text-ink"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </nav>
            <div className="mt-auto space-y-2 pt-6">
              <Link
                href="/eligibility"
                onClick={() => setOpen(false)}
                className="flex h-11 items-center justify-center rounded-md bg-brand-700 text-sm font-medium text-white"
              >
                Free eligibility check
              </Link>
              <Link
                href="/signin"
                onClick={() => setOpen(false)}
                className="flex h-11 items-center justify-center rounded-md border border-line-strong bg-surface text-sm font-medium text-ink"
              >
                Client sign in
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
