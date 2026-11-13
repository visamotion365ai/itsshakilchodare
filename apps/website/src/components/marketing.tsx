import Link from 'next/link';
import type { ReactNode } from 'react';
import { cx } from '@visahobe/ui';
import { Icon } from '@/lib/icons';

/* ================================================================== */
/* Page hero (inner pages)                                            */
/* ================================================================== */
export function PageHero({
  eyebrow,
  title,
  description,
  children,
  meta,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  meta?: ReactNode;
}) {
  return (
    <div className="relative overflow-hidden border-b border-line bg-radial-brand">
      <div aria-hidden className="absolute inset-0 bg-grid-brand opacity-60" />
      <div className="relative mx-auto w-full max-w-content px-5 py-14 sm:px-8 sm:py-20">
        {eyebrow ? (
          <p className="mb-3 text-label font-semibold uppercase tracking-[0.16em] text-brand-500">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="max-w-3xl font-display text-[2.1rem] font-semibold leading-[1.1] tracking-tight text-ink sm:text-[2.9rem]">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-[1.02rem] leading-relaxed text-ink-secondary">
            {description}
          </p>
        ) : null}
        {children ? <div className="mt-6">{children}</div> : null}
        {meta ? <div className="mt-7">{meta}</div> : null}
      </div>
    </div>
  );
}

/* ================================================================== */
/* Card primitives                                                    */
/* ================================================================== */
export function FeatureCard({
  icon,
  title,
  description,
  href,
  meta,
}: {
  icon: string;
  title: string;
  description: string;
  href?: string;
  meta?: string;
}) {
  const body = (
    <>
      <span className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-100">
        <Icon name={icon} className="h-5 w-5" />
      </span>
      <h3 className="mt-4 text-h3 font-semibold text-ink">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-secondary">{description}</p>
      {meta ? <p className="mt-3 text-xs font-medium text-brand-700">{meta}</p> : null}
    </>
  );
  const classes = 'block rounded-lg border border-line bg-surface p-5 lift-on-hover shadow-xs';
  return href ? (
    <Link href={href} className={classes}>
      {body}
    </Link>
  ) : (
    <div className={classes}>{body}</div>
  );
}

export function StatStrip({
  items,
  tone = 'light',
}: {
  items: { value: string; label: string; suffix?: string }[];
  tone?: 'light' | 'dark';
}) {
  return (
    <dl
      className={cx(
        'grid grid-cols-2 gap-px overflow-hidden rounded-lg border sm:grid-cols-4',
        tone === 'dark' ? 'border-white/15 bg-white/15' : 'border-line bg-line',
      )}
    >
      {items.map((item) => (
        <div
          key={item.label}
          className={cx('px-5 py-5', tone === 'dark' ? 'bg-brand-900 text-white' : 'bg-surface')}
        >
          <dt
            className={cx(
              'text-[11px] font-medium uppercase tracking-[0.1em]',
              tone === 'dark' ? 'text-white/60' : 'text-ink-tertiary',
            )}
          >
            {item.label}
          </dt>
          <dd
            className={cx(
              'mt-1.5 font-display text-2xl font-semibold tracking-tight numeric',
              tone === 'dark' ? 'text-white' : 'text-ink',
            )}
          >
            {item.value}
            {item.suffix ? (
              <span className={tone === 'dark' ? 'text-brand-300' : 'text-brand-500'}>
                {item.suffix}
              </span>
            ) : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/* ================================================================== */
/* Trust strip                                                        */
/* ================================================================== */
export function TrustStrip() {
  const items = [
    'No visa guarantee — ever',
    'Fees disclosed in writing',
    'Human verifier on every file',
    'Encrypted private document vault',
    'Audited access log',
  ];
  return (
    <div className="border-y border-line bg-surface-muted/70">
      <div className="mx-auto flex w-full max-w-content flex-wrap items-center justify-center gap-x-7 gap-y-2 px-5 py-3 sm:px-8">
        {items.map((item) => (
          <span key={item} className="flex items-center gap-1.5 text-xs text-ink-secondary">
            <Icon name="check" className="h-3.5 w-3.5 text-brand-600" strokeWidth={2.25} />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ================================================================== */
/* CTA band                                                           */
/* ================================================================== */
export function CtaBand({
  eyebrow = 'Start with a free assessment',
  title = 'Find out what is realistic before you pay anyone',
  description = 'A structured eligibility check produces a written summary of routes, gaps and expected timelines. No payment, no obligation, no guarantee promises.',
  primary = { label: 'Start free eligibility check', href: '/eligibility' },
  secondary = { label: 'Book a consultation', href: '/consultation' },
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="relative overflow-hidden bg-brand-900 py-16 sm:py-20">
      <div className="hero-mesh absolute inset-0" aria-hidden />
      <div className="hero-grain absolute inset-0 opacity-40" aria-hidden />
      <div className="relative mx-auto w-full max-w-content px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="text-label font-semibold uppercase tracking-[0.16em] text-brand-300">
            {eyebrow}
          </p>
          <h2 className="mt-3 font-display text-display-sm font-semibold text-white">{title}</h2>
          <p className="mt-4 text-[1.02rem] leading-relaxed text-white/75">{description}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href={primary.href}
              className="inline-flex h-11 items-center gap-2 rounded-md bg-white px-5 text-sm font-semibold text-brand-800 shadow-lg transition-colors hover:bg-brand-50"
            >
              {primary.label}
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
            <Link
              href={secondary.href}
              className="inline-flex h-11 items-center rounded-md border border-white/25 px-5 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              {secondary.label}
            </Link>
          </div>
          <p className="mt-5 max-w-xl text-xs leading-relaxed text-white/50">
            VisaHobe prepares and verifies documentation. Visa decisions are made solely by the
            destination authority. Official government and embassy fees are separate from our
            service fee.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* Comparison table shell                                             */
/* ================================================================== */
export function CompareRow({
  label,
  values,
  emphasis,
}: {
  label: string;
  values: (string | boolean)[];
  emphasis?: boolean;
}) {
  return (
    <tr className={cx(emphasis && 'bg-brand-50/60')}>
      <th scope="row" className="px-4 py-3 text-left text-sm font-normal text-ink-secondary">
        {label}
      </th>
      {values.map((value, i) => (
        <td key={i} className="px-4 py-3 text-center text-sm">
          {typeof value === 'boolean' ? (
            value ? (
              <Icon name="check" className="mx-auto h-4 w-4 text-success" strokeWidth={2.5} />
            ) : (
              <span className="text-ink-tertiary" aria-label="Not included">
                —
              </span>
            )
          ) : (
            <span className="text-ink">{value}</span>
          )}
        </td>
      ))}
    </tr>
  );
}
