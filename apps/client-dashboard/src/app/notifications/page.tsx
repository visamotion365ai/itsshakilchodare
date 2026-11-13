import Link from 'next/link';
import type { Metadata } from 'next';
import { Badge, Card, CardBody, CardHeader, FilterBar, PageHeader } from '@visahobe/ui';
import { clientNotifications, formatDateTime } from '@visahobe/shared';
import { Icon } from '@/lib/icons';

export const metadata: Metadata = { title: 'Notifications' };

type ToneKey = 'warning' | 'danger' | 'success' | 'info' | 'brand' | 'neutral';

const toneMap: Record<ToneKey, { tone: ToneKey; icon: string }> = {
  warning: { tone: 'warning', icon: 'alert' },
  danger: { tone: 'danger', icon: 'alert' },
  success: { tone: 'success', icon: 'check' },
  info: { tone: 'info', icon: 'info' },
  brand: { tone: 'brand', icon: 'shield-check' },
  neutral: { tone: 'neutral', icon: 'bell' },
};

export default function NotificationsPage() {
  const unread = clientNotifications.filter((n) => n.unread);

  return (
    <div className="mx-auto max-w-[1000px]">
      <PageHeader
        title="Notifications"
        description="Case updates, document decisions, invoice reminders and secure messages."
        breadcrumb="Workspace / Notifications"
        actions={
          <button
            type="button"
            className="h-8 rounded-sm border border-line-strong bg-surface px-3 text-xs font-medium text-ink hover:bg-surface-muted"
          >
            Mark all as read
          </button>
        }
      />

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <FilterBar
          active="all"
          options={[
            { id: 'all', label: 'All', count: clientNotifications.length },
            { id: 'unread', label: 'Unread', count: unread.length },
            { id: 'case', label: 'Case updates' },
            { id: 'billing', label: 'Billing' },
          ]}
        />
        <p className="text-xs text-ink-tertiary">{unread.length} unread</p>
      </div>

      <Card>
        <CardHeader title="Recent" description="Newest first. Notifications retain for 90 days." />
        <CardBody className="pt-1">
          <ul className="divide-y divide-line">
            {clientNotifications.map((notification) => {
              const cfg = toneMap[notification.tone];
              return (
                <li key={notification.id}>
                  <Link
                    href={notification.href}
                    className="flex items-start gap-3 py-3.5 transition-colors hover:bg-surface-muted/50"
                  >
                    <span
                      className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                        cfg.tone === 'warning'
                          ? 'bg-warning-soft text-warning'
                          : cfg.tone === 'danger'
                            ? 'bg-danger-soft text-danger'
                            : cfg.tone === 'success'
                              ? 'bg-success-soft text-success'
                              : cfg.tone === 'info'
                                ? 'bg-info-soft text-info'
                                : 'bg-brand-100 text-brand-700'
                      }`}
                    >
                      <Icon name={cfg.icon} className="h-3.5 w-3.5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p
                          className={
                            notification.unread
                              ? 'text-sm font-semibold text-ink'
                              : 'text-sm font-medium text-ink-secondary'
                          }
                        >
                          {notification.title}
                        </p>
                        {notification.unread ? (
                          <Badge tone="brand" size="sm">
                            New
                          </Badge>
                        ) : null}
                      </div>
                      {notification.body ? (
                        <p className="mt-0.5 text-xs leading-relaxed text-ink-secondary">
                          {notification.body}
                        </p>
                      ) : null}
                      <p className="mt-1 font-mono text-[10px] text-ink-tertiary">
                        {formatDateTime(notification.at)}
                      </p>
                    </div>
                    <Icon name="chevron" className="mt-1 h-3.5 w-3.5 shrink-0 text-ink-tertiary" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </CardBody>
      </Card>

      <p className="mt-4 text-center text-[11px] text-ink-tertiary">
        Delivery preferences can be changed in{' '}
        <Link href="/profile" className="font-medium text-brand-700 hover:underline">
          profile settings
        </Link>
        .
      </p>
    </div>
  );
}
