import Link from 'next/link';
import type { Metadata } from 'next';
import { Container, Section, Accordion, DisclaimerStrip } from '@visahobe/ui';
import { faqs } from '@visahobe/shared';
import { CtaBand, PageHero } from '@/components/marketing';

export const metadata: Metadata = {
  title: 'Frequently asked questions',
  description:
    'Straight answers about visa guarantees, fees, refunds, document privacy, AI assistance and how VisaHobe actually works.',
  alternates: { canonical: '/faq' },
};

export default function FaqPage() {
  const categories = [...new Set(faqs.map((f) => f.category))];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Direct answers, including the uncomfortable ones"
        description="If a question is not answered here, ask it — we would rather lose a client at this stage than surprise one later."
      />

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
            <nav aria-label="FAQ categories" className="hidden lg:block">
              <p className="text-label font-semibold uppercase tracking-wide text-ink-tertiary">
                Categories
              </p>
              <ul className="mt-3 space-y-1">
                {categories.map((category) => (
                  <li key={category}>
                    <a
                      href={`#${category.toLowerCase().replace(/[^a-z]+/g, '-')}`}
                      className="block rounded-sm px-2 py-1.5 text-sm text-ink-secondary hover:bg-surface-muted hover:text-ink"
                    >
                      {category}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-md border border-line bg-surface p-4">
                <p className="text-xs font-semibold text-ink">Need a specific answer?</p>
                <p className="mt-1 text-[11px] leading-relaxed text-ink-secondary">
                  The assistant answers from approved policy sources, or you can talk to a person.
                </p>
                <Link
                  href="/contact"
                  className="mt-3 inline-flex text-xs font-semibold text-brand-700 hover:underline"
                >
                  Contact us →
                </Link>
              </div>
            </nav>

            <div className="min-w-0 space-y-10">
              {categories.map((category) => (
                <section
                  key={category}
                  id={category.toLowerCase().replace(/[^a-z]+/g, '-')}
                  aria-labelledby={`cat-${category}`}
                >
                  <h2 id={`cat-${category}`} className="text-h2 font-semibold text-ink">
                    {category}
                  </h2>
                  <div className="mt-4">
                    <Accordion
                      defaultOpen={-1}
                      items={faqs
                        .filter((f) => f.category === category)
                        .map((f) => ({ question: f.question, answer: f.answer }))}
                    />
                  </div>
                </section>
              ))}
              <DisclaimerStrip>
                Nothing on this page is legal advice or a promise of outcome. Where a question
                touches law in a specific jurisdiction, we refer you to licensed counsel in that
                jurisdiction.
              </DisclaimerStrip>
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand
        eyebrow="Next step"
        title="Ask your question and get a written answer"
        description="Route questions, fee questions and document questions all get a written response — before any payment."
        primary={{ label: 'Contact the team', href: '/contact' }}
        secondary={{ label: 'Start eligibility check', href: '/eligibility' }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
