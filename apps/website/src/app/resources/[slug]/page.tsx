import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container, Section, Badge, DisclaimerStrip, Alert } from '@visahobe/ui';
import { resources } from '@visahobe/shared';
import { CtaBand } from '@/components/marketing';

export function generateStaticParams() {
  return resources.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = resources.find((r) => r.slug === params.slug);
  if (!post) return { title: 'Resource not found' };
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `/resources/${post.slug}` },
    openGraph: { type: 'article', title: post.title, description: post.summary },
  };
}

const BODY: Record<string, { heading: string; paragraphs: string[] }[]> = {
  'financial-evidence-that-survives-review': [
    {
      heading: 'The deposit problem',
      paragraphs: [
        'A large deposit appearing two weeks before an application does not read as preparation. It reads as borrowed money. Caseworkers are trained to look at the shape of a bank statement over time, not the closing balance.',
        'The fix is not to hide the deposit. It is to document where the money came from: the sale of an asset, a matured savings certificate, a business distribution with matching tax records, or the gradual accumulation of documented income.',
      ],
    },
    {
      heading: 'What a verifier compares',
      paragraphs: [
        'A verifier cross-checks three things: the closing balance against the funds requirement, the statement period against the seasoning rule, and the income evidence against the account movements. If your salary certificate says BDT 90,000 monthly but the salary credits are BDT 45,000, that inconsistency is the finding.',
        'They also check the boring details — page continuity, bank stamps, statement issue date, account holder name spelling against the passport. These are the corrections we return most often.',
      ],
    },
    {
      heading: 'Sponsor evidence',
      paragraphs: [
        'A sponsor affidavit alone proves intent, not capacity. Capacity requires documented income, tax records and a paper trail that connects the sponsor’s income to the funds shown in the account. Where the sponsor is a business owner, that means company accounts and a distribution record.',
        'Relationship evidence matters too. A sponsor whose relationship to the applicant cannot be documented creates a credibility gap, however genuine the arrangement is.',
      ],
    },
    {
      heading: 'A practical checklist',
      paragraphs: [
        'Statements covering the full required period, stamped by the bank. Income evidence that matches the credits in the account. A source narrative for any single large deposit. Sponsor documents that show both relationship and capacity. And name consistency across every document in the file.',
      ],
    },
  ],
  'reading-a-refusal-letter-properly': [
    {
      heading: 'Refusals are written for auditors, not applicants',
      paragraphs: [
        'A refusal letter usually lists the grounds in administrative language: insufficient evidence of funds, doubts about intention to return, or failure to demonstrate a genuine relationship. These are not opinions — they are findings against specific criteria.',
        'The mistake applicants make is responding emotionally, either by reapplying immediately with the same evidence or by writing a long letter arguing with the decision.',
      ],
    },
    {
      heading: 'Separate the finding from the cause',
      paragraphs: [
        'If the finding is “insufficient funds evidence”, the cause might be a missing statement period, an unexplained deposit, or a sponsor whose income was not documented. The fix depends entirely on the cause, so the first job is diagnosis.',
        'Read the letter against the exact policy requirement it cites. Where the requirement is quantitative, check your numbers. Where it is qualitative, look for the evidence gap the caseworker describes.',
      ],
    },
    {
      heading: 'What actually changes an outcome',
      paragraphs: [
        'New evidence, not new wording. A reapplication that adds a documented sponsor income trail, a corrected statement period and a consistent identity record addresses the finding. A reapplication with a more emotional cover letter does not.',
        'Where multiple refusals exist, the pattern itself becomes the risk. At that point a route change is often more rational than a third attempt on the same route.',
      ],
    },
  ],
  'aps-certificate-bangladesh-germany': [
    {
      heading: 'What APS actually verifies',
      paragraphs: [
        'The Akademische Prüfstelle (APS) verifies the authenticity of your academic documents for German institutions. It is a verification step, not an evaluation of how good your degree is.',
        'For Bangladeshi applicants it involves submitting certificates, transcripts and supporting records, and waiting for a verification process that can take several weeks.',
      ],
    },
    {
      heading: 'Sequencing matters more than speed',
      paragraphs: [
        'APS sits before the visa application and usually after admission. Applicants who book visa appointments before APS is issued end up cancelling and rebooking, which costs weeks.',
        'The efficient order is: university application, admission, APS submission, blocked account, then visa appointment with the complete dossier.',
      ],
    },
    {
      heading: 'Where files go wrong',
      paragraphs: [
        'The most common APS problems are mismatched names across certificates, missing board verification for older documents, and transcripts that do not include all attempted coursework.',
        'Correct these before submission. A returned APS application costs more time than a careful first filing.',
      ],
    },
  ],
  'sponsor-affidavits-what-authorities-check': [
    {
      heading: 'An affidavit is a claim, not proof',
      paragraphs: [
        'A sponsor affidavit states that someone will support you financially. On its own it proves intent. Authorities need capacity — evidence that the sponsor can actually sustain that commitment.',
      ],
    },
    {
      heading: 'The evidence chain',
      paragraphs: [
        'Capacity is shown by a documented income stream: payslips, employer letters, tax records or business accounts. The chain continues through the bank credits and ends at the funds available for your application.',
        'Where the sponsor is self-employed, the chain includes company registration, financial statements and a record of distributions. Missing links are the most common cause of a funds refusal.',
      ],
    },
    {
      heading: 'Relationship documentation',
      paragraphs: [
        'Sponsor relationship must be documented, not asserted. Birth certificates, family records or guardianship documents establish it. Where those records name people differently, an affidavit of one-and-the-same-person may be required.',
      ],
    },
  ],
  'schengen-itinerary-consistency': [
    {
      heading: 'One mismatch invalidates the file',
      paragraphs: [
        'Schengen files are read for internal consistency. Your insurance must cover the exact travel dates, your hotel bookings must match those dates, and your application must declare the same arrival and departure.',
        'A single inconsistency — an insurance policy expiring one day before your return flight — is a documented reason for refusal that has nothing to do with your intentions.',
      ],
    },
    {
      heading: 'The consistency checklist',
      paragraphs: [
        'Compare four documents at once: the application form, insurance certificate, accommodation bookings and flight reservations. Dates, names and destinations must agree across all four.',
        'Then check the destination rule: you apply to the country where you will spend the most nights, not necessarily the one you fly into.',
      ],
    },
    {
      heading: 'Insurance specifics',
      paragraphs: [
        'Coverage must be at least EUR 30,000 for medical treatment and repatriation, valid across all Schengen states for the full period of stay. Cheap policies that technically meet the number but exclude the right coverage are a documented refusal ground.',
      ],
    },
  ],
  'post-refusal-recovery': [
    {
      heading: 'First, preserve everything',
      paragraphs: [
        'Keep the refusal letter, the exact application you submitted and the supporting evidence. You need them to diagnose what failed, and a reapplication is judged in the context of the prior attempt.',
      ],
    },
    {
      heading: 'Appeal, reapply or change route',
      paragraphs: [
        'An appeal challenges the decision on the evidence already submitted. It rarely succeeds where the finding is an evidence gap. A reapplication lets you address the gap with new documents. A route change is often the rational third option when the profile does not fit the route you chose.',
        'The decision should follow from the diagnosis, not from urgency.',
      ],
    },
    {
      heading: 'Disclose the refusal',
      paragraphs: [
        'Prior refusals are visible to authorities. Concealing one is far worse than the refusal itself — it converts a documentation gap into a credibility problem that follows you across destinations.',
      ],
    },
  ],
};

export default function ResourcePage({ params }: { params: { slug: string } }) {
  const post = resources.find((r) => r.slug === params.slug);
  if (!post) notFound();

  const sections = BODY[post.slug] ?? [
    {
      heading: 'Overview',
      paragraphs: [post.summary],
    },
  ];
  const related = resources.filter((r) => r.slug !== post.slug).slice(0, 3);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    author: { '@type': 'Person', name: post.author },
    publisher: { '@type': 'Organization', name: 'VisaHobe' },
  };

  return (
    <>
      <div className="border-b border-line bg-surface-muted/60">
        <Container className="py-4">
          <nav aria-label="Breadcrumb" className="text-xs text-ink-tertiary">
            <Link href="/resources" className="hover:text-brand-700">
              Resources
            </Link>{' '}
            / <span className="text-ink-secondary">{post.category}</span>
          </nav>
        </Container>
      </div>

      <Section className="pt-10">
        <Container size="prose">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="brand">{post.category}</Badge>
            <span className="text-xs text-ink-tertiary">
              {post.readMinutes} min read · {post.date}
            </span>
          </div>
          <h1 className="mt-4 font-display text-[2.1rem] font-semibold leading-tight tracking-tight text-ink">
            {post.title}
          </h1>
          <p className="mt-3 text-[1.02rem] leading-relaxed text-ink-secondary">{post.summary}</p>
          <div className="mt-4 flex items-center gap-2.5 border-y border-line py-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-[11px] font-semibold text-brand-800">
              {post.author
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </span>
            <div>
              <p className="text-xs font-medium text-ink">{post.author}</p>
              <p className="text-[10px] text-ink-tertiary">VisaHobe verification team</p>
            </div>
          </div>

          <article className="mt-8 space-y-8">
            {sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-h2 font-semibold text-ink">{section.heading}</h2>
                <div className="mt-2 space-y-3">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 40)}
                      className="text-[0.97rem] leading-relaxed text-ink-secondary"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </article>

          <div className="mt-8">
            <Alert tone="warning" title="This is general guidance">
              Rules, fees and timings change without notice, and every case has its own evidence
              history. Nothing in this article is legal advice or a promise of outcome. Confirm
              against the official source before acting.
            </Alert>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              href="/eligibility"
              className="inline-flex h-10 items-center rounded-md bg-brand-700 px-4 text-sm font-semibold text-white hover:bg-brand-600"
            >
              Check my eligibility
            </Link>
            <Link
              href="/consultation"
              className="inline-flex h-10 items-center rounded-md border border-line-strong bg-surface px-4 text-sm font-medium text-ink hover:bg-surface-muted"
            >
              Discuss my file
            </Link>
          </div>

          <div className="mt-10 border-t border-line pt-6">
            <h2 className="text-h3 font-semibold text-ink">Related reading</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/resources/${item.slug}`}
                  className="group rounded-md border border-line bg-surface p-3"
                >
                  <span className="text-[10px] uppercase tracking-wide text-ink-tertiary">
                    {item.category}
                  </span>
                  <p className="mt-1 text-xs font-medium leading-snug text-ink group-hover:text-brand-700">
                    {item.title}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <DisclaimerStrip>
              VisaHobe is not an embassy, government body or law firm. We do not guarantee visa
              approval and do not sell employment or placements.
            </DisclaimerStrip>
          </div>
        </Container>
      </Section>

      <CtaBand />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    </>
  );
}
