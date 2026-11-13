import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Alert,
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  DataTable,
  DocumentTile,
  KpiTile,
  PageHeader,
  DisclaimerStrip,
} from '@visahobe/ui';
import { clientCases, formatDate, type CaseDocument } from '@visahobe/shared';
import { Icon } from '@/lib/icons';

export const metadata: Metadata = { title: 'Documents' };

interface FlatDoc extends CaseDocument {
  caseNumber: string;
  service: string;
  flag: string;
}

const allDocs: FlatDoc[] = clientCases.flatMap((c) =>
  c.documents.map((d) => ({
    ...d,
    caseNumber: c.caseNumber,
    service: c.service,
    flag: c.flag,
  })),
);

const counts = {
  verified: allDocs.filter((d) => d.status === 'verified').length,
  pending: allDocs.filter((d) => d.status === 'pending_review').length,
  correction: allDocs.filter((d) => d.status === 'needs_correction').length,
  missing: allDocs.filter((d) => d.status === 'missing').length,
};

export default function DocumentsPage() {
  return (
    <div className="mx-auto max-w-[1400px]">
      <PageHeader
        title="Documents"
        description="Every document across your cases, with its verification state, version history and the policy requirement it satisfies."
        breadcrumb="Workspace / Documents"
        actions={
          <Link href="/documents/upload">
            <Button size="sm">
              <Icon name="upload" className="h-3.5 w-3.5" />
              Upload documents
            </Button>
          </Link>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <KpiTile
          label="Verified"
          value={counts.verified}
          tone="success"
          icon={<Icon name="file-check" className="h-4 w-4" />}
          hint="approved by a human verifier"
        />
        <KpiTile
          label="In review"
          value={counts.pending}
          tone="info"
          icon={<Icon name="clock" className="h-4 w-4" />}
          hint="median 2 business days"
        />
        <KpiTile
          label="Correction needed"
          value={counts.correction}
          tone="warning"
          icon={<Icon name="alert" className="h-4 w-4" />}
          hint="action required from you"
        />
        <KpiTile
          label="Missing"
          value={counts.missing}
          tone="danger"
          icon={<Icon name="inbox" className="h-4 w-4" />}
          hint="blocks verification"
        />
      </div>

      {counts.correction + counts.missing > 0 ? (
        <div className="mt-4">
          <Alert
            tone="warning"
            title="Documents need your attention"
            icon={<Icon name="alert" className="h-4 w-4" />}
          >
            {counts.correction} correction{counts.correction === 1 ? '' : 's'} and {counts.missing}{' '}
            missing document{counts.missing === 1 ? '' : 's'} are blocking verification. Uploading
            the corrected file notifies the verifier automatically.
          </Alert>
        </div>
      ) : null}

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <div className="min-w-0 space-y-5">
          <Card>
            <CardHeader
              title="All documents"
              description={`${allDocs.length} files across ${clientCases.length} cases`}
            />
            <CardBody className="pt-1">
              <DocumentTile
                name="Bank statement (Apr–Sep 2026)"
                category="Finance · VH-2026-0148"
                status="needs_correction"
                meta="v1 · 2.1 MB · 21 Oct 2026"
                note="Stamp missing on final page. Re-upload the stamped statement."
                icon={<Icon name="file" className="h-4 w-4" />}
              />
              <div className="mt-2" />
              <DataTable<FlatDoc>
                caption="Document register"
                dense
                rowKey={(row) => row.id}
                rows={allDocs.filter((d) => d.status !== 'needs_correction')}
                columns={[
                  {
                    key: 'name',
                    header: 'Document',
                    render: (row) => (
                      <div>
                        <p className="text-xs font-medium text-ink">{row.name}</p>
                        <p className="text-[10px] text-ink-tertiary">
                          {row.category} · {row.caseNumber}
                        </p>
                      </div>
                    ),
                  },
                  {
                    key: 'status',
                    header: 'Status',
                    render: (row) => (
                      <Badge
                        tone={
                          row.status === 'verified'
                            ? 'success'
                            : row.status === 'pending_review'
                              ? 'info'
                              : row.status === 'needs_correction'
                                ? 'warning'
                                : 'danger'
                        }
                        size="sm"
                      >
                        {row.status === 'verified'
                          ? 'Verified'
                          : row.status === 'pending_review'
                            ? 'In review'
                            : row.status === 'needs_correction'
                              ? 'Correction'
                              : 'Missing'}
                      </Badge>
                    ),
                    hideBelow: 'sm',
                  },
                  {
                    key: 'version',
                    header: 'Version',
                    render: (row) => (
                      <span className="font-mono text-[10px] text-ink-secondary">
                        {row.version > 0 ? `v${row.version}` : '—'}
                      </span>
                    ),
                    hideBelow: 'md',
                  },
                  {
                    key: 'uploaded',
                    header: 'Uploaded',
                    render: (row) => (
                      <span className="whitespace-nowrap text-[10px] text-ink-secondary">
                        {row.uploadedAt ? formatDate(row.uploadedAt) : '—'}
                      </span>
                    ),
                    align: 'right',
                    hideBelow: 'lg',
                  },
                ]}
              />
            </CardBody>
          </Card>

          <Card>
            <CardHeader
              title="Version history"
              description="Every upload is retained with an audit record."
            />
            <CardBody>
              <ol className="relative space-y-3 border-l border-line pl-4">
                {[
                  {
                    v: 3,
                    at: '2026-11-03',
                    who: 'You',
                    note: 'Statement of purpose — revised narrative',
                  },
                  {
                    v: 2,
                    at: '2026-10-05',
                    who: 'You',
                    note: 'Transcripts — missing seal corrected',
                  },
                  { v: 1, at: '2026-10-02', who: 'You', note: 'Initial document set uploaded' },
                ].map((item) => (
                  <li key={item.v} className="relative">
                    <span
                      className="absolute -left-[22px] top-1 h-2.5 w-2.5 rounded-full border-2 border-brand-600 bg-surface"
                      aria-hidden
                    />
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="text-xs font-medium text-ink">
                        v{item.v} · {item.note}
                      </p>
                      <span className="font-mono text-[10px] text-ink-tertiary">{item.at}</span>
                    </div>
                    <p className="text-[10px] text-ink-tertiary">Uploaded by {item.who}</p>
                  </li>
                ))}
              </ol>
            </CardBody>
          </Card>
        </div>

        <div className="space-y-5">
          <Card>
            <CardHeader title="Secure handling" />
            <CardBody className="space-y-3 pt-2">
              {[
                {
                  icon: 'lock',
                  title: 'Encrypted private storage',
                  body: 'Files are never attached to messages. Access is via short-lived signed links.',
                },
                {
                  icon: 'shield-check',
                  title: 'Role-scoped access',
                  body: 'Only your case manager and verifier can open a document. Every view is logged.',
                },
                {
                  icon: 'download',
                  title: 'Audited downloads',
                  body: 'Each download records the actor, timestamp and IP address in your audit trail.',
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-2.5">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-sm bg-brand-50 text-brand-700">
                    <Icon name={item.icon} className="h-3.5 w-3.5" />
                  </span>
                  <div>
                    <p className="text-xs font-medium text-ink">{item.title}</p>
                    <p className="text-[10px] leading-relaxed text-ink-secondary">{item.body}</p>
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Upload requirements" />
            <CardBody className="pt-2">
              <ul className="space-y-1.5 text-[11px] text-ink-secondary">
                {[
                  'PDF, JPG or PNG · maximum 20 MB per file',
                  'Colour scan, all four corners visible',
                  'No crop, no shadow, no screen photo',
                  'Bank and official documents must show stamps',
                  'Certified translations attached alongside originals',
                ].map((rule) => (
                  <li key={rule} className="flex items-start gap-1.5">
                    <span className="mt-0.5 text-brand-600">✓</span>
                    {rule}
                  </li>
                ))}
              </ul>
              <Link href="/documents/upload" className="mt-3 block">
                <Button size="sm" fullWidth>
                  Open uploader
                </Button>
              </Link>
            </CardBody>
          </Card>

          <div>
            <DisclaimerStrip>
              Do not email or message identity documents. Email and chat are not secure channels for
              passports, bank statements or certificates.
            </DisclaimerStrip>
          </div>
        </div>
      </div>
    </div>
  );
}
