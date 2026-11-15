import Link from 'next/link';
import { Container } from '@visahobe/ui';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <div className="bg-bg">
      <Container className="flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
        <p className="font-mono text-sm text-brand-500">404</p>
        <h1 className="mt-3 font-display text-h1 font-semibold text-ink">This page has moved on</h1>
        <p className="mt-3 max-w-md text-sm text-ink-secondary">
          The page you requested does not exist. Try the service catalogue, a destination guide or
          the free eligibility check.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-2">
          <Link
            href="/"
            className="rounded-md bg-brand-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600"
          >
            Back to home
          </Link>
          <Link
            href="/services"
            className="rounded-md border border-line-strong bg-surface px-4 py-2.5 text-sm font-medium text-ink hover:bg-surface-muted"
          >
            Browse services
          </Link>
          <Link
            href="/eligibility"
            className="rounded-md border border-line-strong bg-surface px-4 py-2.5 text-sm font-medium text-ink hover:bg-surface-muted"
          >
            Free eligibility check
          </Link>
        </div>
      </Container>
    </div>
  );
}
