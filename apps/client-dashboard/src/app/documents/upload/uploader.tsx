'use client';

import { useRef, useState } from 'react';
import { Alert, Badge, Button, ProgressBar, cx } from '@visahobe/ui';
import { clientCases } from '@visahobe/shared';
import { Icon } from '@/lib/icons';

interface StagedFile {
  id: string;
  name: string;
  size: string;
  caseNumber: string;
  category: string;
  status: 'staged' | 'uploading' | 'done' | 'error';
  progress: number;
}

const CATEGORIES = [
  'Identity',
  'Education',
  'Finance',
  'Employment',
  'Travel',
  'Civil',
  'Medical',
  'Legal',
  'Application',
];

const RULES = [
  { ok: true, label: 'PDF, JPG or PNG format' },
  { ok: true, label: 'Under 20 MB per file' },
  { ok: true, label: 'All corners visible, colour scan' },
  { ok: false, label: 'Screen photographs are rejected at verification' },
];

export function Uploader() {
  const [caseNumber, setCaseNumber] = useState(clientCases[0]!.caseNumber);
  const [category, setCategory] = useState(CATEGORIES[0]!);
  const [files, setFiles] = useState<StagedFile[]>([]);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const next: StagedFile[] = Array.from(list).map((file, index) => ({
      id: `${Date.now()}-${index}`,
      name: file.name,
      size:
        file.size > 1024 * 1024
          ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
          : `${Math.round(file.size / 1024)} KB`,
      caseNumber,
      category,
      status: 'staged',
      progress: 0,
    }));
    setFiles((prev) => [...prev, ...next]);
  };

  const simulate = () => {
    if (files.length === 0) return;
    setFiles((prev) =>
      prev.map((f) => (f.status === 'staged' ? { ...f, status: 'uploading' as const } : f)),
    );
    let tick = 0;
    const timer = window.setInterval(() => {
      tick += 1;
      setFiles((prev) =>
        prev.map((f) => {
          if (f.status !== 'uploading') return f;
          const progress = Math.min(100, f.progress + 25);
          return {
            ...f,
            progress,
            status: progress >= 100 ? ('done' as const) : ('uploading' as const),
          };
        }),
      );
      if (tick >= 5) window.clearInterval(timer);
    }, 380);
  };

  const remove = (id: string) => setFiles((prev) => prev.filter((f) => f.id !== id));

  return (
    <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
      <div className="space-y-4">
        <div className="rounded-lg border border-line bg-surface p-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-ink">Case</span>
              <select
                value={caseNumber}
                onChange={(e) => setCaseNumber(e.target.value)}
                className="h-10 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
              >
                {clientCases.map((c) => (
                  <option key={c.id} value={c.caseNumber}>
                    {c.caseNumber} — {c.service}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-ink">Document category</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="h-10 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
              >
                {CATEGORIES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            addFiles(e.dataTransfer.files);
          }}
          className={cx(
            'flex flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-12 text-center transition-colors',
            dragging
              ? 'border-brand-500 bg-brand-50'
              : 'border-line-strong bg-surface hover:border-brand-300 hover:bg-brand-50/30',
          )}
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-brand-700">
            <Icon name="upload" className="h-5 w-5" />
          </span>
          <p className="mt-3 text-sm font-semibold text-ink">
            Drop documents here, or choose files
          </p>
          <p className="mt-1 max-w-sm text-xs text-ink-secondary">
            PDF, JPG or PNG · up to 20 MB per file. Files go directly into encrypted storage — never
            through email or chat.
          </p>
          <input
            ref={inputRef}
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
            className="sr-only"
            onChange={(e) => addFiles(e.target.files)}
          />
          <Button size="sm" className="mt-4" onClick={() => inputRef.current?.click()}>
            Choose files
          </Button>
        </div>

        {files.length > 0 ? (
          <div className="rounded-lg border border-line bg-surface">
            <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
              <p className="text-xs font-semibold text-ink">
                {files.length} file{files.length > 1 ? 's' : ''} staged
              </p>
              <button
                type="button"
                onClick={() => setFiles([])}
                className="text-[11px] text-ink-tertiary hover:text-danger"
              >
                Clear all
              </button>
            </div>
            <ul className="divide-y divide-line">
              {files.map((file) => (
                <li key={file.id} className="flex items-center gap-3 px-4 py-3">
                  <Icon name="file" className="h-4 w-4 shrink-0 text-ink-tertiary" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-xs font-medium text-ink">{file.name}</p>
                      <Badge
                        tone={
                          file.status === 'done'
                            ? 'success'
                            : file.status === 'uploading'
                              ? 'info'
                              : 'neutral'
                        }
                        size="sm"
                      >
                        {file.status === 'done'
                          ? 'Uploaded'
                          : file.status === 'uploading'
                            ? 'Uploading'
                            : 'Staged'}
                      </Badge>
                    </div>
                    <p className="text-[10px] text-ink-tertiary">
                      {file.category} · {file.caseNumber} · {file.size}
                    </p>
                    {file.status === 'uploading' || file.status === 'done' ? (
                      <div className="mt-1.5">
                        <ProgressBar
                          value={file.progress}
                          tone={file.status === 'done' ? 'success' : 'brand'}
                        />
                      </div>
                    ) : null}
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(file.id)}
                    aria-label={`Remove ${file.name}`}
                    className="text-ink-tertiary hover:text-danger"
                  >
                    <Icon name="close" className="h-3.5 w-3.5" />
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-3">
              <p className="text-[10px] text-ink-tertiary">
                Uploading notifies your verifier automatically.
              </p>
              <Button
                size="sm"
                onClick={simulate}
                disabled={!files.some((f) => f.status === 'staged')}
              >
                Upload {files.filter((f) => f.status === 'staged').length || ''} files
              </Button>
            </div>
          </div>
        ) : null}

        {files.some((f) => f.status === 'done') ? (
          <Alert tone="success" title="Upload complete">
            Files are in the encrypted vault and queued for OCR extraction. You will confirm the
            extracted fields, then a human verifier reviews the document. Nothing is marked verified
            automatically.
          </Alert>
        ) : null}
      </div>

      <aside className="space-y-4">
        <div className="rounded-lg border border-line bg-surface p-5">
          <p className="text-label font-semibold uppercase tracking-wide text-ink-tertiary">
            Before you upload
          </p>
          <ul className="mt-3 space-y-2">
            {RULES.map((rule) => (
              <li key={rule.label} className="flex items-start gap-2 text-[11px]">
                <span className={rule.ok ? 'text-success' : 'text-warning'}>
                  {rule.ok ? '✓' : '!'}
                </span>
                <span className="text-ink-secondary">{rule.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-line bg-surface p-5">
          <p className="text-label font-semibold uppercase tracking-wide text-ink-tertiary">
            What happens next
          </p>
          <ol className="mt-3 space-y-2.5">
            {[
              'OCR extracts key fields — you confirm them.',
              'A human verifier compares extraction to the original.',
              'Approved, or returned with specific corrections.',
              'Status updates on your case timeline immediately.',
            ].map((step, index) => (
              <li key={step} className="flex gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-surface-muted font-mono text-[9px] text-ink-secondary">
                  {index + 1}
                </span>
                <span className="text-[11px] leading-relaxed text-ink-secondary">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <Alert tone="warning" title="Never upload these">
          <ul className="mt-1 space-y-0.5 text-[11px]">
            <li>Someone else’s identity documents</li>
            <li>Documents altered from the original</li>
            <li>Screenshots of bank balances</li>
            <li>Files containing passwords or PINs</li>
          </ul>
        </Alert>
      </aside>
    </div>
  );
}
