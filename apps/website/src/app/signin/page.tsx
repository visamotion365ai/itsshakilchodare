import Link from 'next/link';
import type { Metadata } from 'next';
import { Alert } from '@visahobe/ui';
import { Icon } from '@/lib/icons';
import { SignInForm } from './signin-form';

export const metadata: Metadata = {
  title: 'Client sign in',
  description:
    'Sign in to your VisaHobe client workspace to track cases, upload documents and message your case manager.',
  robots: { index: false, follow: false },
};

export default function SignInPage() {
  return (
    <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
      {/* Brand rail */}
      <div className="relative hidden overflow-hidden bg-brand-900 lg:block">
        <div className="hero-mesh absolute inset-0" aria-hidden />
        <div className="relative flex h-full flex-col justify-between p-12">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-white font-display text-sm font-bold text-brand-800">
              VH
            </span>
            <span className="font-display text-lg font-semibold text-white">VisaHobe</span>
          </Link>
          <div>
            <h2 className="max-w-md font-display text-[2rem] font-semibold leading-tight text-white">
              Your case, your documents, one audited workspace.
            </h2>
            <ul className="mt-6 space-y-3">
              {[
                'Track every case stage and who owns the next action',
                'Upload documents to an encrypted private vault',
                'Message your case manager and the assistant',
                'Download invoices and fee breakdowns',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-white/75">
                  <Icon
                    name="check"
                    className="mt-0.5 h-4 w-4 shrink-0 text-brand-300"
                    strokeWidth={2.5}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <p className="max-w-sm text-xs leading-relaxed text-white/45">
            Documents are stored in encrypted private storage. Access is role-scoped and audited,
            and no other client can reach your records.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="flex items-center justify-center px-5 py-14 sm:px-10">
        <div className="w-full max-w-sm">
          <div className="lg:hidden">
            <Link href="/" className="mb-8 flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-700 font-display text-sm font-bold text-white">
                VH
              </span>
              <span className="font-display text-base font-semibold text-ink">VisaHobe</span>
            </Link>
          </div>

          <h1 className="font-display text-h1 font-semibold text-ink">Sign in</h1>
          <p className="mt-1.5 text-sm text-ink-secondary">
            Use the email address registered on your case.
          </p>

          <SignInForm />

          <div className="my-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-line" />
            <span className="text-[10px] uppercase tracking-wide text-ink-tertiary">or</span>
            <span className="h-px flex-1 bg-line" />
          </div>

          <Link
            href="/signup"
            className="flex h-11 items-center justify-center rounded-md border border-line-strong bg-surface text-sm font-medium text-ink hover:bg-surface-muted"
          >
            Create a client account
          </Link>

          <div className="mt-5">
            <Alert tone="info">
              Staff accounts require MFA and are issued by an administrator. If you are internal
              staff, use the operations console link in your onboarding email.
            </Alert>
          </div>

          <div className="mt-5 rounded-md border border-line bg-surface-muted p-3">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-tertiary">
              Demo access
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-ink-secondary">
              This build ships with a client workspace preview.{' '}
              <Link href="/dashboard" className="font-medium text-brand-700 hover:underline">
                Open the demo dashboard
              </Link>{' '}
              to explore cases, documents and invoices.
            </p>
          </div>

          <p className="mt-6 text-center text-[10px] leading-relaxed text-ink-tertiary">
            By signing in you agree to the{' '}
            <Link href="/legal/terms" className="hover:underline">
              terms
            </Link>{' '}
            and{' '}
            <Link href="/legal/privacy" className="hover:underline">
              privacy policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
