import Link from 'next/link';
import { primaryNav } from '@visahobe/shared';
import { Container } from '@visahobe/ui';
import { MobileNav } from './mobile-nav';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-surface/85 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="VisaHobe home">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-700 font-display text-[0.9rem] font-bold text-white">
            VH
          </span>
          <span className="font-display text-[1.05rem] font-semibold tracking-tight text-ink">
            VisaHobe
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:flex lg:items-center lg:gap-0.5">
          {primaryNav.map((group) => {
            if (!group.children) {
              return (
                <Link
                  key={group.label}
                  href={group.href ?? '#'}
                  className="rounded-sm px-3 py-2 text-sm font-medium text-ink-secondary transition-colors hover:bg-surface-muted hover:text-ink"
                >
                  {group.label}
                </Link>
              );
            }
            return (
              <div key={group.label} className="group relative">
                <Link
                  href={group.href ?? '#'}
                  className="flex items-center gap-1 rounded-sm px-3 py-2 text-sm font-medium text-ink-secondary transition-colors hover:bg-surface-muted hover:text-ink"
                >
                  {group.label}
                  <span aria-hidden className="text-[9px] text-ink-tertiary">
                    ▾
                  </span>
                </Link>
                <div className="invisible absolute left-0 top-full z-50 w-[22rem] translate-y-1 pt-2 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  <div className="overflow-hidden rounded-lg border border-line bg-surface p-1.5 shadow-lg">
                    {group.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-sm px-3 py-2 transition-colors hover:bg-brand-50"
                      >
                        <span className="block text-sm font-medium text-ink">{child.label}</span>
                        {child.description ? (
                          <span className="block text-xs text-ink-tertiary">
                            {child.description}
                          </span>
                        ) : null}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/eligibility"
            className="hidden rounded-md border border-line-strong bg-surface px-3.5 py-2 text-sm font-medium text-ink shadow-xs transition-colors hover:border-brand-200 hover:bg-surface-muted sm:inline-flex"
          >
            Free eligibility check
          </Link>
          <Link
            href="/signin"
            className="hidden rounded-md bg-brand-700 px-3.5 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-brand-600 sm:inline-flex"
          >
            Client sign in
          </Link>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
