'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CommandPalette, Drawer, Badge, cx } from '@visahobe/ui';
import { adminNotifications } from '@visahobe/shared';
import { adminCommandItems } from '@/lib/nav';
import { Icon } from '@/lib/icons';

export function AdminTopbar() {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const unread = adminNotifications.filter((n) => n.unread).length;

  return (
    <>
      <header className="sticky top-0 z-20 flex h-topbar items-center gap-3 border-b border-line bg-surface/95 px-4 backdrop-blur-sm sm:px-6">
        <div className="hidden flex-1 md:block">
          <CommandPalette items={adminCommandItems} />
        </div>
        <div className="flex-1 md:hidden">
          <Link href="/" className="font-display text-sm font-semibold text-ink">
            Operations
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1.5 rounded-md border border-success/25 bg-success-soft px-2 py-1 lg:flex">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" aria-hidden />
            <span className="text-[10px] font-medium text-success">All systems operational</span>
          </div>

          <Link
            href="/agents"
            className="hidden h-8 items-center gap-1.5 rounded-md border border-brand-200 bg-brand-50 px-2.5 text-[11px] font-medium text-brand-700 hover:bg-brand-100 sm:flex"
          >
            <Icon name="bot" className="h-3.5 w-3.5" />
            Super Main Agent
          </Link>

          <button
            type="button"
            onClick={() => setNotificationsOpen(true)}
            aria-label={`Notifications (${unread} unread)`}
            className="relative flex h-9 w-9 items-center justify-center rounded-md border border-line bg-surface text-ink-secondary hover:bg-surface-muted"
          >
            <Icon name="bell" className="h-4 w-4" />
            {unread > 0 ? (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[9px] font-bold text-white">
                {unread}
              </span>
            ) : null}
          </button>

          <Link
            href="/team"
            className="flex items-center gap-2 rounded-md border border-line py-1 pl-1 pr-2 hover:bg-surface-muted"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-700 text-[10px] font-semibold text-white">
              SH
            </span>
            <span className="hidden text-left lg:block">
              <span className="block text-[11px] font-medium leading-tight text-ink">
                Shakil Hossain
              </span>
              <span className="block text-[9px] leading-tight text-ink-tertiary">owner</span>
            </span>
          </Link>
        </div>
      </header>

      <Drawer
        open={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        title="Operational notifications"
        subtitle={`${unread} unread · role-scoped`}
        width="lg"
      >
        <ul className="space-y-2">
          {adminNotifications.map((notification) => (
            <li key={notification.id}>
              <div
                className={cx(
                  'rounded-md border px-3 py-2.5',
                  notification.unread
                    ? 'border-brand-200 bg-brand-50/50'
                    : 'border-line bg-surface',
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs font-semibold text-ink">{notification.title}</p>
                  <Badge
                    tone={
                      notification.tone === 'danger'
                        ? 'danger'
                        : notification.tone === 'warning'
                          ? 'warning'
                          : notification.tone === 'success'
                            ? 'success'
                            : 'info'
                    }
                    size="sm"
                  >
                    {notification.scope}
                  </Badge>
                </div>
                <p className="mt-0.5 text-[11px] leading-relaxed text-ink-secondary">
                  {notification.body}
                </p>
                <p className="mt-1 font-mono text-[9px] text-ink-tertiary">
                  {notification.at.slice(0, 10)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Drawer>
    </>
  );
}
