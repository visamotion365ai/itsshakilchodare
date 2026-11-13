import type { Metadata } from 'next';
import { Container, Section, Alert } from '@visahobe/ui';
import { contactChannels } from '@visahobe/shared';
import { Icon } from '@/lib/icons';
import { PageHero } from '@/components/marketing';
import { ContactForm } from './contact-form';

export const metadata: Metadata = {
  title: 'Contact VisaHobe',
  description:
    'Contact the VisaHobe team about routes, pricing, documents, existing cases or partnerships. New enquiries answered within one business day.',
  alternates: { canonical: '/contact' },
};

const responseTimes = [
  { channel: 'Existing case support', target: 'Within 4 working hours' },
  { channel: 'New enquiry', target: 'Within 1 business day' },
  { channel: 'Complaint', target: 'Acknowledged in 1 business day' },
  { channel: 'Partnership', target: 'Reviewed weekly' },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Ask a real question and get a written answer"
        description="Route questions, fee questions and document questions are answered before you commit to anything. No call is required unless you ask for one."
      />

      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <ContactForm />
              <div className="mt-4">
                <Alert tone="warning" title="Never send identity documents by email or chat">
                  Passport scans, bank statements and certificates must go through the encrypted
                  document vault inside your case workspace. Email and chat messages are not an
                  appropriate channel for identity documents.
                </Alert>
              </div>
            </div>

            <aside className="space-y-4">
              <div className="rounded-lg border border-line bg-surface p-5">
                <h2 className="text-sm font-semibold text-ink">Direct channels</h2>
                <ul className="mt-3 space-y-3">
                  {contactChannels.map((channel) => (
                    <li key={channel.label} className="flex gap-2.5">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-sm bg-brand-50 text-brand-700">
                        <Icon name={channel.icon} className="h-3.5 w-3.5" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[10px] uppercase tracking-wide text-ink-tertiary">
                          {channel.label}
                        </p>
                        <p className="break-words text-xs font-medium text-ink">{channel.value}</p>
                        <p className="text-[10px] text-ink-tertiary">{channel.detail}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border border-line bg-surface p-5">
                <h2 className="text-sm font-semibold text-ink">Response targets</h2>
                <ul className="mt-3 divide-y divide-line">
                  {responseTimes.map((item) => (
                    <li key={item.channel} className="flex items-center justify-between gap-2 py-2">
                      <span className="text-xs text-ink-secondary">{item.channel}</span>
                      <span className="shrink-0 text-[11px] font-medium text-ink">
                        {item.target}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-[10px] leading-relaxed text-ink-tertiary">
                  Targets assume Sat–Thu working days (GMT+6). Authority processing times are
                  separate and outside our control.
                </p>
              </div>

              <div className="rounded-lg border border-line bg-surface p-5">
                <h2 className="text-sm font-semibold text-ink">Office</h2>
                <p className="mt-2 text-xs leading-relaxed text-ink-secondary">
                  Level 7, Gulshan Avenue
                  <br />
                  Dhaka 1212, Bangladesh
                </p>
                <p className="mt-2 text-[11px] text-ink-tertiary">
                  Visits by appointment only — document handling requires a booked slot.
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
