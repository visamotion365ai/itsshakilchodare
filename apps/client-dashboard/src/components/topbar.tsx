'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CommandPalette, Drawer, cx } from '@visahobe/ui';
import { clientNotifications, clientProfile } from '@visahobe/shared';
import { commandItems } from '@/lib/nav';
import { Icon } from '@/lib/icons';

export function Topbar() {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const unread = clientNotifications.filter((n) => n.unread).length;

  return (
    <>
      <header className="sticky top-0 z-20 flex h-topbar items-center gap-3 border-b border-line bg-surface/90 px-4 backdrop-blur-sm sm:px-6">
        <div className="hidden flex-1 sm:block">
          <CommandPalette items={commandItems} />
        </div>
        <div className="flex-1 sm:hidden">
          <Link href="/dashboard" className="font-display text-sm font-semibold text-ink">
            VisaHobe
          </Link>
        </div>

        <div className="flex items-center gap-1.5">
          <Link
            href="/messages"
            className="flex h-9 items-center gap-1.5 rounded-md border border-brand-200 bg-brand-50 px-2.5 text-xs font-medium text-brand-700 transition-colors hover:bg-brand-100"
          >
            <Icon name="sparkles" className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Ask assistant</span>
          </Link>

          <button
            type="button"
            onClick={() => setNotificationsOpen(true)}
            aria-label={`Notifications (${unread} unread)`}
            className="relative flex h-9 w-9 items-center justify-center rounded-md border border-line bg-surface text-ink-secondary transition-colors hover:bg-surface-muted hover:text-ink"
          >
            <Icon name="bell" className="h-4 w-4" />
            {unread > 0 ? (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[9px] font-bold text-white">
                {unread}
              </span>
            ) : null}
          </button>

          <Link
            href="/profile"
            className="ml-0.5 flex items-center gap-2 rounded-md py-1 pl-1 pr-2 transition-colors hover:bg-surface-muted"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-700 text-[11px] font-semibold text-white">
              {clientProfile.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </span>
            <span className="hidden text-left md:block">
              <span className="block text-xs font-medium leading-tight text-ink">
                {clientProfile.name}
              </span>
              <span className="block text-[10px] leading-tight text-ink-tertiary">
                {clientProfile.tenantName}
              </span>
            </span>
          </Link>
        </div>
      </header>

      <Drawer
        open={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        title="Notifications"
        subtitle={`${unread} unread · last 7 days`}
      >
        <ul className="space-y-2">
          {clientNotifications.map((notification) => (
            <li key={notification.id}>
              <Link
                href={notification.href}
                onClick={() => setNotificationsOpen(false)}
                className={cx(
                  'block rounded-md border px-3 py-2.5 transition-colors hover:bg-surface-muted/60',
                  notification.unread
                    ? 'border-brand-200 bg-brand-50/50'
                    : 'border-line bg-surface',
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs font-semibold text-ink">{notification.title}</p>
                  {notification.unread ? (
                    <span
                      className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600"
                      aria-label="Unread"
                    />
                  ) : null}
                </div>
                {notification.body ? (
                  <p className="mt-0.5 text-[11px] leading-relaxed text-ink-secondary">
                    {notification.body}
                  </p>
                ) : null}
                <p className="mt-1 font-mono text-[9px] text-ink-tertiary">
                  {notification.at.slice(0, 10)}
                </p>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/notifications"
          onClick={() => setNotificationsOpen(false)}
          className="mt-3 flex h-9 items-center justify-center rounded-md border border-line-strong text-xs font-medium text-ink hover:bg-surface-muted"
        >
          View all notifications
        </Link>
      </Drawer>
    </>
  );
}
