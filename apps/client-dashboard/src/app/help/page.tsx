import Link from 'next/link';
import type { Metadata } from 'next';
import { Accordion, Alert, Card, CardBody, CardHeader, PageHeader } from '@visahobe/ui';
import { faqs, contactChannels } from '@visahobe/shared';
import { Icon } from '@/lib/icons';

export const metadata: Metadata = { title: 'Help' };

const quickLinks = [
  { label: 'How verification works', href: '/cases/VH-2026-0148', icon: 'shield-check' },
  { label: 'What to upload', href: '/documents/upload', icon: 'upload' },
  { label: 'Invoice and refund rules', href: '/invoices', icon: 'receipt' },
  { label: 'Privacy and data', href: '/profile', icon: 'lock' },
];

export default function HelpPage() {
  return (
    <div className="mx-auto max-w-[1100px]">
      <PageHeader
        title="Help"
        description="Answers to the questions clients ask most, plus direct channels when you need a person."
        breadcrumb="Workspace / Help"
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {quickLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="card-surface p-4 transition-colors hover:border-brand-200 hover:bg-brand-50/30"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-brand-50 text-brand-700">
              <Icon name={link.icon} className="h-4 w-4" />
            </span>
            <p className="mt-2 text-xs font-medium text-ink">{link.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <Card>
          <CardHeader
            title="Frequently asked"
            description="The same answers our case managers give."
          />
          <CardBody className="pt-2">
            <Accordion
              items={faqs.slice(0, 8).map((f) => ({ question: f.question, answer: f.answer }))}
            />
          </CardBody>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader title="Contact your team" />
            <CardBody className="space-y-2.5 pt-2">
              {contactChannels.slice(0, 3).map((channel) => (
                <div key={channel.label} className="flex gap-2.5">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-sm bg-brand-50 text-brand-700">
                    <Icon name={channel.icon} className="h-3.5 w-3.5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-wide text-ink-tertiary">
                      {channel.label}
                    </p>
                    <p className="break-words text-xs font-medium text-ink">{channel.value}</p>
                  </div>
                </div>
              ))}
              <Link
                href="/messages"
                className="mt-2 flex h-9 items-center justify-center rounded-md bg-brand-700 text-xs font-semibold text-white hover:bg-brand-600"
              >
                Open messages
              </Link>
            </CardBody>
          </Card>

          <Alert tone="warning" title="Suspicious contact?">
            VisaHobe will never ask for your password, OTP or a payment to a personal account. If
            someone claims to be us and asks for either, stop and report it to hello@visahobe.com.
          </Alert>

          <Card>
            <CardHeader title="Status and SLAs" />
            <CardBody className="pt-2">
              <ul className="space-y-1.5 text-[11px] text-ink-secondary">
                <li className="flex justify-between gap-2">
                  <span>Document verification</span>
                  <span className="font-medium text-ink">2–3 business days</span>
                </li>
                <li className="flex justify-between gap-2">
                  <span>First-response (Guided)</span>
                  <span className="font-medium text-ink">24 hours</span>
                </li>
                <li className="flex justify-between gap-2">
                  <span>First-response (Concierge)</span>
                  <span className="font-medium text-ink">4 hours</span>
                </li>
                <li className="flex justify-between gap-2">
                  <span>Authority processing</span>
                  <span className="font-medium text-ink">Outside our control</span>
                </li>
              </ul>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
