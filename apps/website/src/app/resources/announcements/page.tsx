import Link from 'next/link';
import type { Metadata } from 'next';
import { Container, Section, Badge } from '@visahobe/ui';
import { announcements } from '@visahobe/shared';
import { PageHero } from '@/components/marketing';

export const metadata: Metadata = {
  title: 'Announcements',
  description:
    'Policy pack updates, product changes and platform notices from VisaHobe, with dates and affected cases.',
  alternates: { canonical: '/resources/announcements' },
};

export default function AnnouncementsPage() {
  return (
    <>
      <PageHero
        eyebrow="Announcements"
        title="Policy updates and platform notices"
        description="When a requirement changes, every affected case gets a re-verification flag. These notes tell you what changed and when."
      />
      <Section>
        <Container size="prose">
          <ol className="space-y-4">
            {announcements.map((item) => (
              <li key={item.title} className="rounded-lg border border-line bg-surface p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone={item.tag === 'Policy update' ? 'warning' : 'brand'} size="sm">
                    {item.tag}
                  </Badge>
                  <time className="font-mono text-[11px] text-ink-tertiary">{item.date}</time>
                </div>
                <h2 className="mt-2 text-[1.02rem] font-semibold text-ink">{item.title}</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-secondary">{item.body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-center text-xs text-ink-tertiary">
            Looking for practical guidance instead?{' '}
            <Link href="/resources" className="font-medium text-brand-700 hover:underline">
              Visit the resource library
            </Link>
            .
          </p>
        </Container>
      </Section>
    </>
  );
}
