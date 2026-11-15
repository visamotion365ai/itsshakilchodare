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
  DisclaimerStrip,
  FilterBar,
  KpiTile,
  PageHeader,
  ProgressBar,
  Sparkline,
} from '@visahobe/ui';
import { adminCases, formatDate } from '@visahobe/shared';
import { Icon } from '@/lib/icons';

export const metadata: Metadata = { title: 'Documents & OCR' };

interface OcrDoc {
  id: string;
  name: string;
  caseNumber: string;
  client: string;
  category: string;
  pages: number;
  confidence: number;
  flags: number;
  status: 'extracted' | 'verified' | 'returned' | 'processing' | 'failed';
  uploadedAt: string;
  sizeLabel: string;
}

const docs: OcrDoc[] = [
  {
    id: 'o1',
    name: 'Bank statement Apr–Sep 2026',
    caseNumber: 'VH-2026-0148',
    client: 'Rafid Hasan',
    category: 'Finance',
    pages: 5,
    confidence: 62,
    flags: 2,
    status: 'returned',
    uploadedAt: '2026-11-08',
    sizeLabel: '2.1 MB',
  },
  {
    id: 'o2',
    name: 'Sponsor affidavit — father',
    caseNumber: 'VH-2026-0148',
    client: 'Rafid Hasan',
    category: 'Finance',
    pages: 2,
    confidence: 91,
    flags: 1,
    status: 'extracted',
    uploadedAt: '2026-11-07',
    sizeLabel: '1.5 MB',
  },
  {
    id: 'o3',
    name: 'Sponsor income evidence',
    caseNumber: 'VH-2026-0203',
    client: 'Farhana Akter',
    category: 'Finance',
    pages: 8,
    confidence: 78,
    flags: 2,
    status: 'extracted',
    uploadedAt: '2026-11-07',
    sizeLabel: '2.8 MB',
  },
  {
    id: 'o4',
    name: 'Academic transcripts',
    caseNumber: 'VH-2026-0198',
    client: 'Sadia Islam',
    category: 'Education',
    pages: 4,
    confidence: 96,
    flags: 0,
    status: 'verified',
    uploadedAt: '2026-11-06',
    sizeLabel: '3.8 MB',
  },
  {
    id: 'o5',
    name: 'Flight itinerary (held)',
    caseNumber: 'VH-2026-0192',
    client: 'Rafid Hasan',
    category: 'Travel',
    pages: 1,
    confidence: 88,
    flags: 1,
    status: 'processing',
    uploadedAt: '2026-11-06',
    sizeLabel: '520 KB',
  },
  {
    id: 'o6',
    name: 'Degree certificate (original)',
    caseNumber: 'VH-2026-0071',
    client: 'Rafid Hasan',
    category: 'Education',
    pages: 1,
    confidence: 97,
    flags: 0,
    status: 'verified',
    uploadedAt: '2026-11-05',
    sizeLabel: '2.4 MB',
  },
  {
    id: 'o7',
    name: 'Scanned marriage certificate',
    caseNumber: 'VH-2026-0203',
    client: 'Farhana Akter',
    category: 'Civil',
    pages: 2,
    confidence: 0,
    flags: 0,
    status: 'failed',
    uploadedAt: '2026-11-04',
    sizeLabel: '8.9 MB',
  },
];

export default function AdminDocumentsPage() {
  const failed = docs.filter((d) => d.status === 'failed').length;
  const lowConfidence = docs.filter((d) => d.confidence > 0 && d.confidence < 80).length;

  return (
    <div className="mx-auto max-w-[1500px]">
      <PageHeader
        title="Documents & OCR"
        description="Extraction pipeline health, per-field confidence and the documents where a human must correct the draft before verification."
        breadcrumb="Operations / Documents & OCR"
        actions={
          <>
            <Button variant="secondary" size="sm">
              <Icon name="refresh" className="h-3.5 w-3.5" />
              Re-run queue
            </Button>
            <Button variant="secondary" size="sm">
              <Icon name="download" className="h-3.5 w-3.5" />
              Export extract jobs
            </Button>
          </>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <KpiTile
          label="Extraction jobs today"
          value={23}
          tone="brand"
          delta={{ value: '+4', direction: 'up' }}
          icon={<Icon name="scan" className="h-4 w-4" />}
        />
        <KpiTile
          label="Low confidence (<80%)"
          value={lowConfidence}
          tone="warning"
          icon={<Icon name="alert" className="h-4 w-4" />}
          hint="human correction mandatory"
        />
        <KpiTile
          label="Failed extracts"
          value={failed}
          tone="danger"
          icon={<Icon name="x" className="h-4 w-4" />}
          hint="unreadable scan"
        />
        <KpiTile
          label="Avg. confidence"
          value="88.4%"
          tone="success"
          delta={{ value: '+1.8 pts', direction: 'up' }}
          icon={<Icon name="trending" className="h-4 w-4" />}
        />
      </div>

      <div className="mt-4">
        <Alert
          tone="info"
          title="OCR output is never verification"
          icon={<Icon name="info" className="h-4 w-4" />}
        >
          Extraction produces a draft field set. A verifier must confirm each field against the
          original image before the document counts as verified. Low-confidence extractions are
          blocked from auto-advancement.
        </Alert>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <div className="min-w-0 space-y-5">
          <Card>
            <CardHeader
              title="Extraction register"
              description={`${docs.length} documents in the pipeline`}
              action={
                <FilterBar
                  active="all"
                  options={[
                    { id: 'all', label: 'All', count: docs.length },
                    { id: 'attention', label: 'Needs attention', count: lowConfidence + failed },
                    {
                      id: 'verified',
                      label: 'Verified',
                      count: docs.filter((d) => d.status === 'verified').length,
                    },
                  ]}
                />
              }
            />
            <CardBody className="pt-1">
              <DataTable<OcrDoc>
                caption="OCR extraction register"
                rowKey={(row) => row.id}
                rows={docs}
                columns={[
                  {
                    key: 'doc',
                    header: 'Document',
                    render: (row) => (
                      <div>
                        <p className="text-xs font-medium text-ink">{row.name}</p>
                        <p className="font-mono text-[10px] text-ink-tertiary">
                          {row.caseNumber} · {row.pages}p · {row.sizeLabel}
                        </p>
                      </div>
                    ),
                  },
                  {
                    key: 'category',
                    header: 'Category',
                    render: (row) => (
                      <span className="text-[10px] text-ink-secondary">{row.category}</span>
                    ),
                    hideBelow: 'md',
                  },
                  {
                    key: 'confidence',
                    header: 'Confidence',
                    render: (row) =>
                      row.confidence === 0 ? (
                        <span className="text-[10px] text-danger">no extract</span>
                      ) : (
                        <div className="w-20">
                          <ProgressBar
                            value={row.confidence}
                            tone={
                              row.confidence >= 90
                                ? 'success'
                                : row.confidence >= 80
                                  ? 'brand'
                                  : 'warning'
                            }
                          />
                          <p className="mt-0.5 text-[9px] text-ink-tertiary numeric">
                            {row.confidence}% · {row.flags}f
                          </p>
                        </div>
                      ),
                    hideBelow: 'sm',
                  },
                  {
                    key: 'status',
                    header: 'Status',
                    render: (row) => (
                      <Badge
                        tone={
                          row.status === 'verified'
                            ? 'success'
                            : row.status === 'extracted'
                              ? 'info'
                              : row.status === 'returned'
                                ? 'warning'
                                : row.status === 'processing'
                                  ? 'brand'
                                  : 'danger'
                        }
                        size="sm"
                      >
                        {row.status}
                      </Badge>
                    ),
                  },
                  {
                    key: 'uploaded',
                    header: 'Uploaded',
                    render: (row) => (
                      <span className="whitespace-nowrap text-[10px] text-ink-tertiary">
                        {formatDate(row.uploadedAt)}
                      </span>
                    ),
                    align: 'right',
                    hideBelow: 'lg',
                  },
                  {
                    key: 'action',
                    header: '',
                    render: (row) => (
                      <Link href={`/cases/${row.caseNumber}`}>
                        <Button variant="ghost" size="sm">
                          <Icon name="eye" className="h-3.5 w-3.5" />
                        </Button>
                      </Link>
                    ),
                    align: 'right',
                  },
                ]}
              />
            </CardBody>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader title="Confidence trend" description="Mean field confidence, 8 weeks" />
              <CardBody>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="font-display text-2xl font-semibold text-ink numeric">88.4%</p>
                    <p className="text-[10px] text-ink-tertiary">current weekly mean</p>
                  </div>
                  <Sparkline
                    values={[81, 83, 82, 85, 86, 87, 88, 88]}
                    tone="success"
                    width={160}
                    height={44}
                  />
                </div>
                <div className="mt-4 space-y-2">
                  <ProgressBar value={96} label="Passport / ID documents" tone="success" />
                  <ProgressBar value={88} label="Bank statements" tone="brand" />
                  <ProgressBar value={74} label="Handwritten affidavits" tone="warning" />
                  <ProgressBar
                    value={68}
                    label="Bangla certificates (untranslated)"
                    tone="warning"
                  />
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardHeader title="Bangla & multilingual" description="Noto Sans Bengali OCR stack" />
              <CardBody className="space-y-3 pt-2">
                <p className="text-[11px] leading-relaxed text-ink-secondary">
                  Bangla documents extract at lower confidence than English, and legally governed
                  documents require certified translation regardless. The pipeline flags Bangla
                  sources for translation before verification.
                </p>
                <div className="rounded-md bg-surface-muted px-2.5 py-2">
                  <p className="text-[10px] text-ink-tertiary">Languages seen this month</p>
                  <ul className="mt-1 space-y-1">
                    {[
                      ['English', 68],
                      ['Bangla', 24],
                      ['Arabic', 5],
                      ['German', 3],
                    ].map(([lang, share]) => (
                      <li
                        key={String(lang)}
                        className="flex items-center justify-between text-[11px]"
                      >
                        <span className="text-ink-secondary">{lang}</span>
                        <span className="font-medium text-ink numeric">{share}%</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-md border border-warning/25 bg-warning-soft/50 px-2.5 py-2">
                  <p className="text-[10px] leading-relaxed text-warning">
                    Untranslated Bangla civil documents cannot pass verification — a certified
                    translator record is mandatory.
                  </p>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>

        <div className="space-y-5">
          <Card>
            <CardHeader title="Pipeline stages" />
            <CardBody className="pt-1">
              <ul className="space-y-2">
                {[
                  ['Received', 23, 'success'],
                  ['Extracted', 21, 'brand'],
                  ['Human review', 5, 'warning'],
                  ['Verified', 14, 'success'],
                  ['Failed / unreadable', 2, 'danger'],
                ].map(([label, count, tone]) => (
                  <li key={String(label)} className="flex items-center justify-between">
                    <span className="text-[11px] text-ink-secondary">{label}</span>
                    <Badge tone={tone as 'success' | 'brand' | 'warning' | 'danger'} size="sm">
                      {count}
                    </Badge>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Storage & retention" />
            <CardBody className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-ink-secondary">Private object storage</span>
                <Badge tone="success" size="sm">
                  encrypted
                </Badge>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-ink-secondary">Signed URL TTL</span>
                <span className="font-mono text-[10px] text-ink">5 minutes</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-ink-secondary">Metadata in database</span>
                <span className="text-[10px] text-ink">references only</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-ink-secondary">Retention after closure</span>
                <span className="text-[10px] text-ink">per data class policy</span>
              </div>
              <p className="pt-1 text-[10px] leading-relaxed text-ink-tertiary">
                Raw document bytes are never written to logs, prompts or agent traces. Only redacted
                extracted fields appear in observability data.
              </p>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Failures needing manual handling" />
            <CardBody className="pt-1">
              <ul className="divide-y divide-line">
                {[
                  {
                    doc: 'Marriage certificate (scan)',
                    reason: 'Illegible — 84% of page unreadable',
                  },
                  { doc: 'Bank statement p.5', reason: 'Stamp region cropped out' },
                ].map((item) => (
                  <li key={item.doc} className="py-2">
                    <p className="text-[11px] font-medium text-ink">{item.doc}</p>
                    <p className="text-[10px] text-danger">{item.reason}</p>
                  </li>
                ))}
              </ul>
              <Button variant="secondary" size="sm" fullWidth className="mt-2">
                Request re-upload from client
              </Button>
            </CardBody>
          </Card>

          <div>
            <DisclaimerStrip>
              Documents shown here are accessible only under a staff role with{' '}
              <span className="font-mono">document.read</span>. Every open, download and issued
              signed URL is written to the append-only audit trail.
            </DisclaimerStrip>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <Card>
          <CardHeader
            title="Cases with document gaps"
            description="Client action required — chase through the follow-up worker."
          />
          <CardBody className="pt-1">
            <DataTable
              caption="Cases with missing documents"
              dense
              rowKey={(row) => row.caseNumber}
              rows={adminCases.filter((c) => c.flags.length > 0)}
              columns={[
                {
                  key: 'case',
                  header: 'Case',
                  render: (row) => (
                    <Link
                      href={`/cases/${row.caseNumber}`}
                      className="font-mono text-[10px] text-brand-700 hover:underline"
                    >
                      {row.caseNumber}
                    </Link>
                  ),
                },
                {
                  key: 'client',
                  header: 'Client',
                  render: (row) => <span className="text-[11px] text-ink">{row.clientName}</span>,
                },
                {
                  key: 'flags',
                  header: 'Blocking items',
                  render: (row) => (
                    <div className="flex flex-wrap gap-1">
                      {row.flags.map((flag) => (
                        <span
                          key={flag}
                          className="rounded-xs bg-warning-soft px-1 py-px text-[9px] text-warning"
                        >
                          {flag}
                        </span>
                      ))}
                    </div>
                  ),
                },
                {
                  key: 'owner',
                  header: 'Owner',
                  render: (row) => (
                    <span className="text-[10px] text-ink-tertiary">{row.assignee}</span>
                  ),
                  hideBelow: 'md',
                },
                {
                  key: 'action',
                  header: '',
                  render: () => (
                    <Button variant="ghost" size="sm">
                      Send reminder
                    </Button>
                  ),
                  align: 'right',
                },
              ]}
            />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
