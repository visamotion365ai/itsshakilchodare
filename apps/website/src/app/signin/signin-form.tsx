'use client';

import Link from 'next/link';

export function SignInForm() {
  return (
    <form className="mt-6 space-y-3" onSubmit={(e) => e.preventDefault()}>
      <label className="block">
        <span className="mb-1 block text-xs font-medium text-ink">Email</span>
        <input
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className="h-11 w-full rounded-md border border-line bg-surface px-3 text-sm outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
        />
      </label>
      <label className="block">
        <span className="mb-1 flex items-center justify-between text-xs font-medium text-ink">
          Password
          <Link href="/contact" className="font-normal text-brand-700 hover:underline">
            Forgot?
          </Link>
        </span>
        <input
          type="password"
          required
          autoComplete="current-password"
          placeholder="••••••••••"
          className="h-11 w-full rounded-md border border-line bg-surface px-3 text-sm outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
        />
      </label>
      <label className="flex cursor-pointer items-center gap-2 text-xs text-ink-secondary">
        <input
          type="checkbox"
          className="h-3.5 w-3.5 rounded-xs border-line-strong text-brand-700"
        />
        Keep me signed in on this device
      </label>
      <Link
        href="/dashboard"
        className="flex h-11 items-center justify-center rounded-md bg-brand-700 text-sm font-semibold text-white hover:bg-brand-600"
      >
        Sign in
      </Link>
    </form>
  );
}
