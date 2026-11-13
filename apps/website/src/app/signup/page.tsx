import Link from 'next/link';
import type { Metadata } from 'next';
import { Alert } from '@visahobe/ui';
import { Icon } from '@/lib/icons';
import { SignUpForm } from './signup-form';

export const metadata: Metadata = {
  title: 'Create a client account',
  description:
    'Create a VisaHobe client workspace to start a case, upload documents securely and track verification progress.',
  robots: { index: false, follow: false },
};

export default function SignUpPage() {
  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 lg:grid-cols-[1fr_1fr] lg:px-8">
      <div>
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-700 font-display text-sm font-bold text-white">
            VH
          </span>
          <span className="font-display text-base font-semibold text-ink">VisaHobe</span>
        </Link>

        <h1 className="mt-8 font-display text-h1 font-semibold text-ink">Open your workspace</h1>
        <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
          A client workspace gives you case tracking, secure document upload and direct access to
          your case manager. You can open it before deciding whether to proceed with a paid package.
        </p>

        <ul className="mt-6 space-y-2.5">
          {[
            'No payment required to open a workspace',
            'Documents in an encrypted private vault',
            'Named case manager and verifier on every case',
            'Full audit trail of who accessed what',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-ink-secondary">
              <Icon
                name="check"
                className="mt-0.5 h-4 w-4 shrink-0 text-brand-600"
                strokeWidth={2.5}
              />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <Alert tone="warning" title="Beware of guarantee sellers">
            If anyone — us included — promises an approval, walk away. Decisions belong solely to
            the destination authority.
          </Alert>
        </div>
      </div>

      <SignUpForm />
    </div>
  );
}
