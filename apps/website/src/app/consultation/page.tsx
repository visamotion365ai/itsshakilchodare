import Link from 'next/link';
import type { Metadata } from 'next';
import { Container, Section, Badge, Alert, DisclaimerStrip } from '@visahobe/ui';
import { teamMembers } from '@visahobe/shared';
import { Icon } from '@/lib/icons';
import { PageHero } from '@/components/marketing';

export const metadata: Metadata = {
  title: 'Book a consultation',
  description:
    'Book a 30-minute route consultation with a VisaHobe case manager. Written follow-up within one business day, no obligation and no guarantee claims.',
  alternates: { canonical: '/consultation' },
};

const slots = [
  { day: 'Sat 15 Nov', times: ['10:00', '11:30', '15:00', '17:30'] },
  { day: 'Sun 16 Nov', times: ['10:00', '13:00', '16:00'] },
  { day: 'Mon 17 Nov', times: ['11:00', '14:30', '18:00'] },
  { day: 'Tue 18 Nov', times: ['10:30', '12:00', '16:30'] },
];

const agenda = [
  'Your current profile and documents, reviewed honestly',
  'Which routes are realistic and which are not — with reasons',
  'The gaps that would block a filing today',
  'Indicative service fee and the official fees, separated',
];

export default function ConsultationPage() {
  return (
    <>
      <PageHero
        eyebrow="Consultation"
        title="Thirty minutes, one honest answer"
        description="A structured conversation with a case manager — not a sales call. You leave with a written summary of what is realistic and what it would cost."
      />

      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <div className="rounded-lg border border-line bg-surface p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-h3 font-semibold text-ink">Select a slot</h2>
                  <Badge tone="success">Free · 30 minutes</Badge>
                </div>
                <p className="mt-1 text-sm text-ink-secondary">
                  All times GMT+6 (Dhaka). Video call or phone — your choice. Times shown are the
                  next four working days.
                </p>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {slots.map((slot) => (
                    <div key={slot.day} className="rounded-md border border-line bg-surface p-3">
                      <p className="text-xs font-semibold text-ink">{slot.day}</p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {slot.times.map((time) => (
                          <button
                            key={time}
                            type="button"
                            className="rounded-sm border border-line bg-surface px-2.5 py-1 font-mono text-[11px] text-ink-secondary transition-colors hover:border-brand-600 hover:bg-brand-50 hover:text-brand-700"
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1 block text-xs font-medium text-ink">Full name *</span>
                    <input
                      className="h-10 w-full rounded-md border border-line bg-surface px-3 text-sm outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
                      autoComplete="name"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-xs font-medium text-ink">
                      Phone (WhatsApp) *
                    </span>
                    <input
                      className="h-10 w-full rounded-md border border-line bg-surface px-3 text-sm outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
                      autoComplete="tel"
                      inputMode="tel"
                    />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="mb-1 block text-xs font-medium text-ink">Email *</span>
                    <input
                      type="email"
                      className="h-10 w-full rounded-md border border-line bg-surface px-3 text-sm outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
                      autoComplete="email"
                    />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="mb-1 block text-xs font-medium text-ink">
                      What would you like to cover?
                    </span>
                    <textarea
                      rows={3}
                      placeholder="Destination, purpose, current documents and any deadline."
                      className="w-full resize-y rounded-md border border-line bg-surface px-3 py-2.5 text-sm outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
                    />
                  </label>
                </div>

                <Link
                  href="/eligibility"
                  className="mt-4 flex h-11 items-center justify-center rounded-md bg-brand-700 text-sm font-semibold text-white hover:bg-brand-600"
                >
                  Continue — start with the free assessment
                </Link>
                <p className="mt-2 text-center text-[10px] text-ink-tertiary">
                  Slot selection is confirmed by email. If you would rather start asynchronously,
                  the eligibility check covers the same ground and takes three minutes.
                </p>
              </div>

              <div className="mt-4">
                <Alert tone="info" title="Who you will speak to">
                  A named case manager, listed on the{' '}
                  <Link href="/about" className="font-medium text-brand-700 hover:underline">
                    team page
                  </Link>
                  . Their name and role appear in your case workspace from the day it opens.
                </Alert>
              </div>
            </div>

            <aside className="space-y-4">
              <div className="rounded-lg border border-brand-200 bg-brand-50/60 p-5">
                <p className="text-label font-semibold uppercase tracking-wide text-brand-600">
                  What we will cover
                </p>
                <ul className="mt-3 space-y-2">
                  {agenda.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-ink">
                      <Icon
                        name="check"
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-600"
                        strokeWidth={2.5}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border border-line bg-surface p-5">
                <p className="text-label font-semibold uppercase tracking-wide text-ink-tertiary">
                  What this is not
                </p>
                <ul className="mt-3 space-y-1.5 text-xs text-ink-secondary">
                  {[
                    'Not a guarantee or an approval promise',
                    'Not a pressure call — no upsell script',
                    'Not legal advice; licensed counsel is engaged where required',
                    'Not a request for documents — nothing is uploaded at this stage',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-1.5">
                      <span className="mt-0.5 text-ink-tertiary">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border border-line bg-surface p-5">
                <p className="text-label font-semibold uppercase tracking-wide text-ink-tertiary">
                  Case managers
                </p>
                <ul className="mt-3 space-y-2.5">
                  {teamMembers.slice(0, 3).map((member) => (
                    <li key={member.name} className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-[10px] font-semibold text-brand-800">
                        {member.initials}
                      </span>
                      <div>
                        <p className="text-xs font-medium text-ink">{member.name}</p>
                        <p className="text-[10px] text-ink-tertiary">{member.role}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <DisclaimerStrip>
                Consultations are informational. Visa outcomes are decided by destination
                authorities and are never guaranteed. Official fees are separate from VisaHobe
                service fees.
              </DisclaimerStrip>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
