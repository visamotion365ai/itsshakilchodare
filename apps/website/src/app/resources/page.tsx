import Link from 'next/link';
import type { Metadata } from 'next';
import { Container, Section, SectionHeading, Badge } from '@visahobe/ui';
import { resources, announcements } from '@visahobe/shared';
import { Icon } from '@/lib/icons';
import { CtaBand, PageHero } from '@/components/marketing';

export const metadata: Metadata = {
  title: 'Resource library and knowledge base',
  description:
    'Practical, source-based guides on financial evidence, refusal letters, sponsor affidavits, APS certificates and route strategy.',
  alternates: { canonical: '/resources' },
};

export default function ResourcesPage() {
  const categories = [...new Set(resources.map((r) => r.category))];
  const featured = resources[0]!;
  const rest = resources.slice(1);

  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Read the guidance before you pay anyone"
        description="No lead magnets, no gated PDFs. These are the working notes our verifiers use, written for applicants."
      />

      <Section>
        <Container>
          {/* Featured */}
          <article className="grid gap-6 rounded-lg border border-line bg-surface p-6 lg:grid-cols-[1.4fr_1fr] lg:p-8">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="brand">Featured</Badge>
                <Badge tone="neutral" size="sm">
                  {featured.category}
                </Badge>
                <span className="text-[11px] text-ink-tertiary">
                  {featured.readMinutes} min read · {featured.date}
                </span>
              </div>
              <h2 className="mt-3 font-display text-h1 font-semibold leading-tight text-ink">
                {featured.title}
              </h2>
              <p className="mt-3 text-[0.97rem] leading-relaxed text-ink-secondary">
                {featured.summary}
              </p>
              <div className="mt-5 flex items-center gap-3">
                <Link
                  href={`/resources/${featured.slug}`}
                  className="inline-flex h-10 items-center gap-1.5 rounded-md bg-brand-700 px-4 text-sm font-semibold text-white hover:bg-brand-600"
                >
                  Read the guide <Icon name="arrow" className="h-3.5 w-3.5" />
                </Link>
                <span className="text-[11px] text-ink-tertiary">By {featured.author}</span>
              </div>
            </div>
            <div className="rounded-lg bg-surface-muted p-5">
              <p className="text-label font-semibold uppercase tracking-wide text-ink-tertiary">
                In this guide
              </p>
              <ul className="mt-3 space-y-2 text-xs text-ink-secondary">
                {[
                  'Why a single large deposit raises more questions than it answers',
                  'How to document the provenance of funds across years',
                  'Sponsor affidavits that survive a consistency pass',
                  'What a verifier actually compares between documents',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-0.5 text-brand-600">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </article>

          {/* Filters */}
          <div className="mt-10 flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-ink-tertiary">Categories:</span>
            {categories.map((category) => (
              <span
                key={category}
                className="rounded-full border border-line bg-surface px-3 py-1 text-xs text-ink-secondary"
              >
                {category}
              </span>
            ))}
          </div>

          {/* Grid */}
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/resources/${post.slug}`}
                className="group flex flex-col rounded-lg border border-line bg-surface p-5 lift-on-hover"
              >
                <div className="flex items-center justify-between">
                  <Badge tone="brand" size="sm">
                    {post.category}
                  </Badge>
                  <span className="text-[10px] text-ink-tertiary">{post.readMinutes} min</span>
                </div>
                <h3 className="mt-3 text-[1rem] font-semibold leading-snug text-ink group-hover:text-brand-700">
                  {post.title}
                </h3>
                <p className="mt-1.5 flex-1 text-xs leading-relaxed text-ink-secondary">
                  {post.summary}
                </p>
                <div className="mt-3 flex items-center justify-between border-t border-line pt-2.5 text-[10px] text-ink-tertiary">
                  <span>{post.author}</span>
                  <span>{post.date}</span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Announcements */}
      <Section tone="muted">
        <Container>
          <SectionHeading
            eyebrow="Announcements"
            title="Policy updates and product changes"
            description="When a policy pack changes, every affected case shows a re-verification flag. These are the public notes."
            action={
              <Link
                href="/resources/announcements"
                className="inline-flex h-10 items-center gap-1.5 rounded-md border border-line-strong bg-surface px-4 text-sm font-medium text-ink hover:bg-surface-muted"
              >
                All announcements
              </Link>
            }
          />
          <div className="mt-6 divide-y divide-line rounded-lg border border-line bg-surface">
            {announcements.slice(0, 3).map((item) => (
              <article key={item.title} className="flex flex-wrap items-start gap-4 px-5 py-4">
                <div className="flex w-20 shrink-0 flex-col">
                  <span className="font-mono text-[10px] text-ink-tertiary">{item.date}</span>
                  <Badge tone={item.tag === 'Policy update' ? 'warning' : 'brand'} size="sm">
                    {item.tag}
                  </Badge>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-medium text-ink">{item.title}</h3>
                  <p className="mt-0.5 text-xs leading-relaxed text-ink-secondary">{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand
        eyebrow="Ask the assistant"
        title="Have a specific question about your situation?"
        description="The assistant answers from approved policy sources and always cites the version it used. If it cannot answer safely, it hands over to a person."
        primary={{ label: 'Start the assessment', href: '/eligibility' }}
        secondary={{ label: 'Contact a case manager', href: '/contact' }}
      />
    </>
  );
}
