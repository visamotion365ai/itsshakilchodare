import Link from 'next/link';
import { footerNav } from '@visahobe/shared';
import { Container } from '@visahobe/ui';

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-700 font-display text-[0.9rem] font-bold text-white">
                VH
              </span>
              <span className="font-display text-[1.05rem] font-semibold text-ink">VisaHobe</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
              Policy-cited visa preparation with human verification gates. We prepare and verify —
              the decision always belongs to the destination authority.
            </p>
            <div className="mt-4 space-y-1 text-xs text-ink-tertiary">
              <p>Level 7, Gulshan Avenue, Dhaka 1212</p>
              <p>hello@visahobe.com · +880 9600 000 000</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              <span className="rounded-xs border border-line bg-surface-muted px-2 py-0.5 text-[10px] font-medium text-ink-secondary">
                No visa guarantee
              </span>
              <span className="rounded-xs border border-line bg-surface-muted px-2 py-0.5 text-[10px] font-medium text-ink-secondary">
                Fees disclosed in writing
              </span>
            </div>
          </div>

          {footerNav.map((group) => (
            <div key={group.title}>
              <h2 className="text-label font-semibold uppercase tracking-[0.1em] text-ink-tertiary">
                {group.title}
              </h2>
              <ul className="mt-3 space-y-2">
                {group.links.map((link) => (
                  <li key={`${group.title}-${link.href}`}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-secondary transition-colors hover:text-brand-700"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-line pt-6">
          <div className="rounded-md border border-warning/20 bg-warning-soft/50 px-4 py-3 text-xs leading-relaxed text-ink-secondary">
            <strong className="font-semibold text-ink">Disclaimer:</strong> VisaHobe is a visa
            preparation and documentation service. We are not a government body, an embassy or a
            licensed immigration lawyer unless explicitly stated. Visa approval is decided solely by
            the destination authority and is never guaranteed. Official government, embassy,
            biometrics, medical and courier fees are separate from VisaHobe service fees and are
            paid to those authorities.
          </div>
          <div className="mt-4 flex flex-col gap-3 text-xs text-ink-tertiary sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} VisaHobe. All rights reserved.</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/trust" className="hover:text-brand-700">
                Trust & compliance
              </Link>
              <Link href="/trust#privacy" className="hover:text-brand-700">
                Privacy
              </Link>
              <Link href="/trust#terms" className="hover:text-brand-700">
                Terms
              </Link>
              <Link href="/trust#refunds" className="hover:text-brand-700">
                Refunds
              </Link>
              <Link href="/contact" className="hover:text-brand-700">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
