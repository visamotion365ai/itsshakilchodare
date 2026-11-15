/**
 * Lightweight, dependency-free SVG charts.
 * Crisp and fully opaque — charts appear in dense operational and financial
 * views, so no glass treatment is applied (ADR-009 §3.2).
 */

import { cx } from '../cx';

function buildLinePath(values: number[], width: number, height: number, pad = 4): string {
  if (values.length === 0) return '';
  const max = Math.max(...values);
  const min = Math.min(...values);
  const span = max - min || 1;
  const stepX = values.length > 1 ? (width - pad * 2) / (values.length - 1) : 0;
  return values
    .map((value, i) => {
      const x = pad + i * stepX;
      const y = height - pad - ((value - min) / span) * (height - pad * 2);
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(' ');
}

export function Sparkline({
  values,
  width = 120,
  height = 32,
  tone = 'brand',
  ariaLabel,
}: {
  values: number[];
  width?: number;
  height?: number;
  tone?: 'brand' | 'success' | 'danger' | 'warning';
  ariaLabel?: string;
}) {
  const stroke = {
    brand: 'var(--color-brand-600)',
    success: 'var(--color-success)',
    danger: 'var(--color-danger)',
    warning: 'var(--color-warning)',
  }[tone];
  const path = buildLinePath(values, width, height);
  const areaPath = `${path} L ${width - 4} ${height} L 4 ${height} Z`;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      role={ariaLabel ? 'img' : 'presentation'}
      aria-label={ariaLabel}
      className="overflow-visible"
    >
      <defs>
        <linearGradient id={`spark-${tone}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.22" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#spark-${tone})`} />
      <path d={path} fill="none" stroke={stroke} strokeWidth={1.75} strokeLinecap="round" />
    </svg>
  );
}

export function BarChart({
  data,
  height = 160,
  tone = 'brand',
  valueFormatter,
}: {
  data: { label: string; value: number }[];
  height?: number;
  tone?: 'brand' | 'accent';
  valueFormatter?: (v: number) => string;
}) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div>
      <div className="flex items-end gap-2" style={{ height }}>
        {data.map((d) => {
          const pct = (d.value / max) * 100;
          return (
            <div key={d.label} className="group flex h-full flex-1 flex-col justify-end">
              <div
                className={cx(
                  'relative w-full rounded-t-xs transition-colors',
                  tone === 'brand'
                    ? 'bg-brand-600 group-hover:bg-brand-500'
                    : 'bg-brand-300 group-hover:bg-brand-400',
                )}
                style={{ height: `${Math.max(pct, 3)}%` }}
              >
                <span className="absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-medium text-ink-tertiary opacity-0 transition-opacity group-hover:opacity-100 numeric">
                  {valueFormatter ? valueFormatter(d.value) : d.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex gap-2">
        {data.map((d) => (
          <span
            key={d.label}
            className="flex-1 truncate text-center text-[9px] uppercase tracking-wide text-ink-tertiary"
          >
            {d.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export function DonutChart({
  segments,
  size = 132,
  thickness = 14,
  centerLabel,
  centerValue,
}: {
  segments: { label: string; value: number; color: string }[];
  size?: number;
  thickness?: number;
  centerLabel?: string;
  centerValue?: string;
}) {
  const total = segments.reduce((s, seg) => s + seg.value, 0) || 1;
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="flex items-center gap-5">
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg width={size} height={size} role="presentation" className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--color-surface-sunken)"
            strokeWidth={thickness}
          />
          {segments.map((seg) => {
            const length = (seg.value / total) * circumference;
            const dash = `${length} ${circumference - length}`;
            const el = (
              <circle
                key={seg.label}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={seg.color}
                strokeWidth={thickness}
                strokeDasharray={dash}
                strokeDashoffset={-offset}
                strokeLinecap="butt"
              />
            );
            offset += length;
            return el;
          })}
        </svg>
        {centerValue ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-lg font-semibold leading-none text-ink numeric">
              {centerValue}
            </span>
            {centerLabel ? (
              <span className="mt-0.5 text-[9px] uppercase tracking-wide text-ink-tertiary">
                {centerLabel}
              </span>
            ) : null}
          </div>
        ) : null}
      </div>
      <ul className="min-w-0 space-y-1.5">
        {segments.map((seg) => (
          <li key={seg.label} className="flex items-center gap-2 text-xs">
            <span
              className="h-2 w-2 shrink-0 rounded-xs"
              style={{ backgroundColor: seg.color }}
              aria-hidden
            />
            <span className="min-w-0 flex-1 truncate text-ink-secondary">{seg.label}</span>
            <span className="font-medium text-ink numeric">{seg.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AreaChart({
  series,
  height = 180,
  labels,
  ariaLabel,
}: {
  series: { label: string; values: number[]; tone: 'brand' | 'muted' }[];
  height?: number;
  labels: string[];
  ariaLabel?: string;
}) {
  const width = 560;
  const all = series.flatMap((s) => s.values);
  const max = Math.max(...all, 1);
  const min = Math.min(...all, 0);
  const span = max - min || 1;
  const stepX = (width - 8) / Math.max(labels.length - 1, 1);

  const toPoint = (value: number, i: number) => {
    const x = 4 + i * stepX;
    const y = height - 24 - ((value - min) / span) * (height - 36);
    return [x, y] as const;
  };

  return (
    <div>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        role={ariaLabel ? 'img' : 'presentation'}
        aria-label={ariaLabel}
        preserveAspectRatio="none"
        style={{ height }}
      >
        {[0, 0.25, 0.5, 0.75, 1].map((t) => (
          <line
            key={t}
            x1={4}
            x2={width - 4}
            y1={height - 24 - t * (height - 36)}
            y2={height - 24 - t * (height - 36)}
            stroke="var(--color-border)"
            strokeWidth={1}
            strokeDasharray={t === 0 ? undefined : '3 4'}
          />
        ))}
        {series.map((s) => {
          const points = s.values.map((v, i) => toPoint(v, i));
          const line = points
            .map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`)
            .join(' ');
          const area = `${line} L ${points[points.length - 1]![0].toFixed(1)} ${height - 24} L 4 ${height - 24} Z`;
          return (
            <g key={s.label}>
              {s.tone === 'brand' ? (
                <>
                  <defs>
                    <linearGradient id="area-brand" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-brand-500)" stopOpacity="0.24" />
                      <stop offset="100%" stopColor="var(--color-brand-500)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d={area} fill="url(#area-brand)" />
                  <path
                    d={line}
                    fill="none"
                    stroke="var(--color-brand-600)"
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                </>
              ) : (
                <path
                  d={line}
                  fill="none"
                  stroke="var(--color-border-strong)"
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                  strokeLinecap="round"
                />
              )}
            </g>
          );
        })}
      </svg>
      <div className="mt-1 flex justify-between">
        {labels.map((label) => (
          <span key={label} className="text-[9px] uppercase tracking-wide text-ink-tertiary">
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
