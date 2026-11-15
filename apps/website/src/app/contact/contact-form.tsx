'use client';

import { useState } from 'react';
import { Alert } from '@visahobe/ui';

const TOPICS = [
  'New enquiry — route question',
  'Existing case support',
  'Pricing and fees',
  'Documents and privacy',
  'Partnership enquiry',
  'Complaint',
];

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [topic, setTopic] = useState(TOPICS[0]!);

  if (sent) {
    return (
      <Alert tone="success" title="Message recorded">
        Thank you — your message has been recorded with reference{' '}
        <span className="font-mono">MSG-{Date.now().toString().slice(-6)}</span>. We respond to new
        enquiries within one business day and to existing case support within four working hours.
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-3 block text-xs font-semibold text-brand-700 hover:underline"
        >
          Send another message
        </button>
      </Alert>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="rounded-lg border border-line bg-surface p-5"
    >
      <h2 className="text-h3 font-semibold text-ink">Send a message</h2>
      <p className="mt-1 text-sm text-ink-secondary">
        Route questions and fee questions are answered before you become a client.
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-ink">Full name *</span>
          <input
            required
            autoComplete="name"
            className="h-10 w-full rounded-md border border-line bg-surface px-3 text-sm outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-ink">Email *</span>
          <input
            required
            type="email"
            autoComplete="email"
            className="h-10 w-full rounded-md border border-line bg-surface px-3 text-sm outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-ink">Phone / WhatsApp</span>
          <input
            autoComplete="tel"
            inputMode="tel"
            className="h-10 w-full rounded-md border border-line bg-surface px-3 text-sm outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-ink">Topic</span>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="h-10 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
          >
            {TOPICS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-3 block">
        <span className="mb-1 block text-xs font-medium text-ink">
          Case number (if you have one)
        </span>
        <input
          placeholder="VH-2026-0000"
          className="h-10 w-full rounded-md border border-line bg-surface px-3 font-mono text-sm outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
        />
      </label>

      <label className="mt-3 block">
        <span className="mb-1 block text-xs font-medium text-ink">Your question *</span>
        <textarea
          required
          rows={5}
          placeholder="Tell us the destination, purpose and any deadline you are working to."
          className="w-full resize-y rounded-md border border-line bg-surface px-3 py-2.5 text-sm outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
        />
      </label>

      <label className="mt-3 flex cursor-pointer items-start gap-2.5">
        <input
          type="checkbox"
          required
          className="mt-0.5 h-4 w-4 rounded-xs border-line-strong text-brand-700"
        />
        <span className="text-[11px] leading-relaxed text-ink-secondary">
          I agree that VisaHobe may use these details to respond to this enquiry. I understand this
          message is not legal advice and no visa outcome is guaranteed.
        </span>
      </label>

      <button
        type="submit"
        className="mt-4 h-11 w-full rounded-md bg-brand-700 text-sm font-semibold text-white hover:bg-brand-600"
      >
        Send message
      </button>
      <p className="mt-2 text-center text-[10px] text-ink-tertiary">
        Never send passport scans or bank statements through this form.
      </p>
    </form>
  );
}
