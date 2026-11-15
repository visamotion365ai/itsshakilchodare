'use client';

import Link from 'next/link';
import { ConsentBlock } from '@visahobe/ui';

export function SignUpForm() {
  return (
    <form
      className="rounded-lg border border-line bg-surface p-6"
      onSubmit={(e) => e.preventDefault()}
    >
      <h2 className="text-h3 font-semibold text-ink">Account details</h2>
      <div className="mt-4 grid gap-3">
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-ink">Full name *</span>
          <input
            required
            autoComplete="name"
            className="h-11 w-full rounded-md border border-line px-3 text-sm outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-ink">Email *</span>
          <input
            required
            type="email"
            autoComplete="email"
            className="h-11 w-full rounded-md border border-line px-3 text-sm outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-ink">Phone / WhatsApp *</span>
          <input
            required
            inputMode="tel"
            autoComplete="tel"
            className="h-11 w-full rounded-md border border-line px-3 text-sm outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-ink">Password *</span>
          <input
            required
            type="password"
            autoComplete="new-password"
            className="h-11 w-full rounded-md border border-line px-3 text-sm outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
          />
          <span className="mt-1 block text-[10px] text-ink-tertiary">
            Minimum 12 characters. MFA can be enabled after sign-up.
          </span>
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-ink">Preferred language</span>
          <select className="h-11 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400">
            <option>English</option>
            <option>বাংলা (Bangla)</option>
            <option>Banglish</option>
          </select>
        </label>
      </div>

      <div className="mt-4 space-y-2">
        <ConsentBlock title="Terms and refund policy" required>
          I have read and accept the service terms, the refund schedule and the statement that no
          visa outcome is guaranteed.
        </ConsentBlock>
        <ConsentBlock title="Privacy and data processing" required>
          I consent to VisaHobe processing my data to provide the requested service, as described in
          the privacy policy.
        </ConsentBlock>
      </div>

      <button
        type="submit"
        className="mt-4 h-11 w-full rounded-md bg-brand-700 text-sm font-semibold text-white hover:bg-brand-600"
      >
        Create account
      </button>
      <p className="mt-3 text-center text-xs text-ink-tertiary">
        Already have an account?{' '}
        <Link href="/signin" className="font-medium text-brand-700 hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}
