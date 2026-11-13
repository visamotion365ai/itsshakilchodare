import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  Alert,
  Badge,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  CardHeader,
  Checklist,
  DocumentTile,
  ProgressBar,
  SlaCountdown,
  Stepper,
  TabNav,
  DisclaimerStrip,
} from '@visahobe/ui';
import {
  caseStageLabels,
  caseStageOrder,
  clientCases,
  formatBDT,
  formatDate,
  formatDateTime,
  getCountryGuide,
  type CaseDocument,
  type CaseTimelineEvent,
} from '@visahobe/shared';
import { Icon } from '@/lib/icons';

export function generateStaticParams() {
  return clientCases.map((c) => ({ caseNumber: c.caseNumber }));
}

export function generateMetadata({ params }: { params: { caseNumber: string } }): Metadata {
  const found = clientCases.find((c) => c.caseNumber === params.caseNumber);
  return { title: found ? `${found.caseNumber} — ${found.service}` : 'Case not found' };
}

export default function CaseDetailPage({ params }: { params: { caseNumber: string } }) {
  const current = clientCases.find((c) => c.caseNumber === params.caseNumber);
  if (!current) notFound();

  const country = getCountryGuide(current.countrySlug);
  const stageIndex = caseStageOrder.indexOf(current.stage);

  const steps = caseStageOrder.map((stage, index) => ({
    id: stage,
    label: caseStageLabels[stage],
    description:
      index < stageIndex
        ? 'Completed'
        : index === stageIndex
          ? 'Current stage'
          : index === stageIndex + 1
            ? 'Next stage'
            : undefined,
    state:
      index < stageIndex
        ? ('complete' as const)
        : index === stageIndex
          ? ('current' as const)
          : ('upcoming' as const),
  }));

  const outstanding = current.documents.filter(
    (d) => d.status === 'missing' || d.status === 'needs_correction',
  );

  return (
    <div className="mx-auto max-w-[1400px]">
      <Breadcrumbs items={[{ label: 'Cases', href: '/cases' }, { label: current.caseNumber }]} />

      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-display text-h1 font-semibold tracking-tight text-ink">
              {current.flag} {current.service}
            </h1>
            <Badge
              tone={
                current.status === 'on_track'
                  ? 'success'
                  : current.status === 'needs_action'
                    ? 'warning'
                    : current.status === 'at_risk'
                      ? 'danger'
                      : 'neutral'
              }
              dot
            >
              {current.status === 'on_track'
                ? 'On track'
                : current.status === 'needs_action'
                  ? 'Needs your action'
                  : current.status === 'at_risk'
                    ? 'At risk'
                    : 'Completed'}
            </Badge>
          </div>
          <p className="mt-1 text-sm text-ink-secondary">
            {current.country} · {current.packageTier} package · Case manager {current.owner}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5">
            <span className="font-mono text-[11px] text-ink-tertiary">{current.caseNumber}</span>
            <span className="text-[11px] text-ink-tertiary">
              Opened {formatDate(current.openedAt)}
            </span>
            <span className="text-[11px] text-ink-tertiary">
              Target {formatDate(current.targetDate)}
            </span>
            <SlaCountdown
              hoursLeft={current.slaDaysLeft * 24}
              state={
                current.slaDaysLeft <= 3 ? 'breach' : current.slaDaysLeft <= 7 ? 'warning' : 'ok'
              }
              compact
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/documents/upload">
            <Button size="sm">
              <Icon name="upload" className="h-3.5 w-3.5" />
              Upload document
            </Button>
          </Link>
          <Link href="/messages">
            <Button variant="secondary" size="sm">
              <Icon name="message" className="h-3.5 w-3.5" />
              Message manager
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-5">
        <TabNav
          active="overview"
          tabs={[
            { id: 'overview', label: 'Overview', href: '#overview' },
            {
              id: 'documents',
              label: 'Documents',
              href: '#documents',
              count: current.documents.length,
            },
            {
              id: 'timeline',
              label: 'Timeline',
              href: '#timeline',
              count: current.timeline.length,
            },
            { id: 'fees', label: 'Fees', href: '#fees' },
          ]}
        />
      </div>

      {outstanding.length > 0 ? (
        <div className="mt-4">
          <Alert tone="warning" title={`${outstanding.length} document(s) need attention`}>
            <ul className="mt-1 space-y-1">
              {outstanding.map((doc) => (
                <li key={doc.id} className="flex flex-wrap items-center gap-2">
                  <span className="font-medium">{doc.name}</span>
                  <span className="text-[11px]">{doc.note ?? 'Not uploaded yet'}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/documents/upload"
              className="mt-2 inline-flex text-xs font-semibold underline underline-offset-2"
            >
              Upload the corrected files →
            </Link>
          </Alert>
        </div>
      ) : null}

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <div className="min-w-0 space-y-5">
          {/* Overview */}
          <Card id="overview" className="scroll-mt-20">
            <CardHeader
              title="Case progress"
              description={`Current stage: ${caseStageLabels[current.stage]}`}
              action={
                <span className="text-xs font-medium text-ink numeric">{current.progress}%</span>
              }
            />
            <CardBody>
              <ProgressBar value={current.progress} tone="brand" />
              <div className="mt-5">
                <Stepper steps={steps} />
              </div>
            </CardBody>
          </Card>

          {/* Documents */}
          <Card id="documents" className="scroll-mt-20">
            <CardHeader
              title="Documents"
              description="Verification status for each required file."
              action={
                <Link
                  href="/documents"
                  className="text-xs font-semibold text-brand-700 hover:underline"
                >
                  Manage all
                </Link>
              }
            />
            <CardBody className="space-y-2 pt-3">
              {current.documents.map((doc: CaseDocument) => (
                <DocumentTile
                  key={doc.id}
                  name={doc.name}
                  category={doc.category}
                  status={doc.status}
                  meta={
                    doc.uploadedAt
                      ? `v${doc.version} · ${doc.sizeLabel} · ${formatDate(doc.uploadedAt)}`
                      : 'Not uploaded'
                  }
                  note={doc.note}
                  icon={<Icon name="file" className="h-4 w-4" />}
                />
              ))}
              <DisclaimerStrip>
                Files are held in encrypted private storage. Downloads use short-lived signed links
                and every access is recorded against your case.
              </DisclaimerStrip>
            </CardBody>
          </Card>

          {/* Timeline */}
          <Card id="timeline" className="scroll-mt-20">
            <CardHeader
              title="Timeline"
              description="Everything that has happened on this case, visible to you."
            />
            <CardBody>
              <ol className="relative space-y-4 border-l border-line pl-5">
                {current.timeline.map((event: CaseTimelineEvent) => (
                  <li key={event.id} className="relative">
                    <span
                      className={`absolute -left-[26px] top-1 flex h-3 w-3 items-center justify-center rounded-full border-2 ${
                        event.kind === 'approval'
                          ? 'border-success bg-success'
                          : event.kind === 'payment'
                            ? 'border-brand-600 bg-brand-600'
                            : event.kind === 'document'
                              ? 'border-info bg-info'
                              : 'border-line-strong bg-surface'
                      }`}
                      aria-hidden
                    />
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="text-sm font-medium text-ink">{event.title}</p>
                      <time className="font-mono text-[10px] text-ink-tertiary">
                        {formatDateTime(event.at)}
                      </time>
                    </div>
                    <p className="mt-0.5 text-xs leading-relaxed text-ink-secondary">
                      {event.detail}
                    </p>
                    <span className="mt-1 inline-block rounded-xs bg-surface-muted px-1.5 py-0.5 text-[9px] uppercase tracking-wide text-ink-tertiary">
                      {event.owner === 'client'
                        ? 'You'
                        : event.owner === 'verifier'
                          ? 'Verifier'
                          : event.owner === 'case_manager'
                            ? 'Case manager'
                            : event.owner}
                    </span>
                  </li>
                ))}
              </ol>
            </CardBody>
          </Card>

          {/* Fees */}
          <Card id="fees" className="scroll-mt-20">
            <CardHeader
              title="Fees for this case"
              description="Service fee and official fees are separated."
            />
            <CardBody>
              <table className="w-full text-sm">
                <tbody className="divide-y divide-line">
                  <tr>
                    <td className="py-2 text-ink-secondary">
                      VisaHobe service fee — {current.packageTier}
                    </td>
                    <td className="py-2 text-right font-medium text-ink numeric">
                      {formatBDT(
                        current.packageTier === 'Guided'
                          ? 67500
                          : current.packageTier === 'Essential'
                            ? 15000
                            : 120000,
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 text-ink-secondary">Paid to date</td>
                    <td className="py-2 text-right font-medium text-success numeric">
                      {formatBDT(
                        (current.packageTier === 'Guided'
                          ? 67500
                          : current.packageTier === 'Essential'
                            ? 15000
                            : 120000) - current.outstandingFee,
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-ink">Outstanding</td>
                    <td className="py-2 text-right font-semibold text-ink numeric">
                      {formatBDT(current.outstandingFee)}
                    </td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-2 text-[11px] leading-relaxed text-ink-tertiary">
                Official embassy, biometrics, medical and courier fees are not included and are paid
                directly to those authorities. See the destination guide for the current official
                fee.
              </p>
              <Link href="/invoices" className="mt-3 inline-flex">
                <Button variant="secondary" size="sm">
                  View invoices
                </Button>
              </Link>
            </CardBody>
          </Card>
        </div>

        {/* Right rail */}
        <div className="space-y-5">
          <Card>
            <CardHeader title="Next action" />
            <CardBody>
              <p className="text-sm font-medium text-ink">{current.nextAction}</p>
              <p className="mt-1 text-[11px] text-ink-tertiary">
                Owner:{' '}
                {current.nextActionOwner === 'client'
                  ? 'You'
                  : current.nextActionOwner === 'verifier'
                    ? 'Verifier'
                    : current.nextActionOwner === 'authority'
                      ? 'Destination authority'
                      : current.owner}
              </p>
              {current.nextActionOwner === 'client' ? (
                <Link href="/documents/upload" className="mt-3 block">
                  <Button size="sm" fullWidth>
                    Take action now
                  </Button>
                </Link>
              ) : null}
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Outstanding checklist" />
            <CardBody className="pt-1">
              <Checklist
                items={current.documents.map((d) => ({
                  id: d.id,
                  label: d.name,
                  hint:
                    d.status === 'verified'
                      ? 'Verified'
                      : d.status === 'pending_review'
                        ? 'Awaiting verifier'
                        : d.status === 'needs_correction'
                          ? 'Correction requested'
                          : 'Not uploaded',
                  done: d.status === 'verified',
                }))}
              />
            </CardBody>
          </Card>

          {country ? (
            <Card>
              <CardHeader title="Policy basis" description={`${country.name} policy pack`} />
              <CardBody className="space-y-2 pt-2">
                {country.policySources.map((source) => (
                  <div key={source.url} className="rounded-xs bg-surface-muted px-2.5 py-2">
                    <p className="text-[11px] font-medium text-ink">{source.title}</p>
                    <p className="font-mono text-[9px] text-ink-tertiary">
                      {source.version} · effective {source.effectiveFrom}
                    </p>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="mt-0.5 inline-block text-[10px] font-medium text-brand-700 hover:underline"
                    >
                      Official source ↗
                    </a>
                  </div>
                ))}
              </CardBody>
            </Card>
          ) : null}

          <Card>
            <CardHeader title="Other cases" />
            <CardBody className="pt-1">
              <ul className="divide-y divide-line">
                {clientCases
                  .filter((c) => c.id !== current.id)
                  .map((c) => (
                    <li key={c.id} className="py-2">
                      <Link href={`/cases/${c.caseNumber}`} className="block">
                        <p className="font-mono text-[10px] text-ink-tertiary">{c.caseNumber}</p>
                        <p className="text-xs font-medium text-ink">
                          {c.flag} {c.service}
                        </p>
                        <p className="text-[10px] text-ink-tertiary">
                          {caseStageLabels[c.stage]} · {c.progress}%
                        </p>
                      </Link>
                    </li>
                  ))}
              </ul>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
