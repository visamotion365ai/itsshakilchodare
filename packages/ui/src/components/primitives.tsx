import type { ReactNode } from 'react';
import type { StatusTone } from '@visahobe/design-system';
import { cx } from '../cx';

/* ================================================================== */
/* Badge                                                              */
/* ================================================================== */
const badgeTones: Record<StatusTone, string> = {
  neutral: 'bg-surface-muted text-ink-secondary ring-line',
  brand: 'bg-brand-100 text-brand-700 ring-brand-200/70',
  success: 'bg-success-soft text-success ring-success/20',
  warning: 'bg-warning-soft text-warning ring-warning/20',
  danger: 'bg-danger-soft text-danger ring-danger/20',
  info: 'bg-info-soft text-info ring-info/20',
};

export interface BadgeProps {
  children: ReactNode;
  tone?: StatusTone;
  size?: 'sm' | 'md';
  dot?: boolean;
  className?: string;
}

export function Badge({ children, tone = 'neutral', size = 'md', dot, className }: BadgeProps) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1.5 whitespace-nowrap rounded-sm font-medium ring-1 ring-inset',
        size === 'sm' ? 'px-1.5 py-0.5 text-[11px]' : 'px-2 py-0.5 text-xs',
        badgeTones[tone],
        className,
      )}
    >
      {dot ? <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden /> : null}
      {children}
    </span>
  );
}

/* ================================================================== */
/* Button                                                             */
/* ================================================================== */
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-700 text-white shadow-sm hover:bg-brand-600 active:bg-brand-800 disabled:bg-brand-300',
  secondary:
    'bg-surface text-ink border border-line-strong shadow-xs hover:bg-surface-muted hover:border-brand-200 active:bg-surface-sunken',
  ghost: 'bg-transparent text-ink-secondary hover:bg-surface-muted hover:text-ink',
  danger: 'bg-danger text-white shadow-sm hover:brightness-110 active:brightness-95',
  link: 'bg-transparent text-brand-700 underline-offset-4 hover:underline px-0',
};

const buttonSizes: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs gap-1.5 rounded-sm',
  md: 'h-10 px-4 text-sm gap-2 rounded-md',
  lg: 'h-12 px-6 text-[0.95rem] gap-2.5 rounded-md',
};

const buttonBase =
  'inline-flex select-none items-center justify-center font-medium transition-colors duration-150 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 ' +
  'disabled:cursor-not-allowed disabled:opacity-60';

export interface ButtonClassOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
}

export function buttonClass({
  variant = 'primary',
  size = 'md',
  fullWidth,
  className,
}: ButtonClassOptions = {}): string {
  return cx(
    buttonBase,
    buttonVariants[variant],
    buttonSizes[size],
    fullWidth && 'w-full',
    className,
  );
}

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'>, ButtonClassOptions {
  children: ReactNode;
}

/** Presentational button. Use `Link` or `href` wrappers for navigation. */
export function Button({ children, variant, size, fullWidth, className, ...rest }: ButtonProps) {
  return (
    <button className={buttonClass({ variant, size, fullWidth, className })} {...rest}>
      {children}
    </button>
  );
}

/* ================================================================== */
/* Card                                                               */
/* ================================================================== */
export interface CardProps extends Omit<React.HTMLAttributes<HTMLElement>, 'className'> {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'li';
}

export function Card({ children, className, as: Tag = 'div', ...rest }: CardProps) {
  return (
    <Tag className={cx('card-surface', className)} {...rest}>
      {children}
    </Tag>
  );
}

export interface CardHeaderProps {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function CardHeader({ title, description, action, className }: CardHeaderProps) {
  return (
    <div className={cx('flex items-start justify-between gap-4 px-5 pt-5', className)}>
      <div className="min-w-0">
        <h3 className="truncate text-h3 font-semibold text-ink">{title}</h3>
        {description ? <p className="mt-1 text-sm text-ink-secondary">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export function CardBody({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx('px-5 py-4', className)}>{children}</div>;
}

export function CardFooter({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cx(
        'flex items-center justify-between gap-3 border-t border-line px-5 py-3',
        className,
      )}
    >
      {children}
    </div>
  );
}

/* ================================================================== */
/* Section heading (marketing + dashboards)                           */
/* ================================================================== */
export interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
  action?: ReactNode;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
  action,
}: SectionHeadingProps) {
  return (
    <div
      className={cx(
        'flex flex-col gap-3',
        align === 'center' ? 'items-center text-center' : 'items-start',
        action && 'sm:flex-row sm:items-end sm:justify-between',
        className,
      )}
    >
      <div className={cx('max-w-2xl', align === 'center' && 'mx-auto')}>
        {eyebrow ? (
          <p className="mb-2 text-label font-semibold uppercase tracking-[0.16em] text-brand-500">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-h1 font-semibold text-ink sm:text-[2.35rem]">{title}</h2>
        {description ? (
          <p className="mt-3 text-[1.02rem] leading-relaxed text-ink-secondary">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

/* ================================================================== */
/* Alert / callout                                                    */
/* ================================================================== */
export interface AlertProps {
  tone?: StatusTone;
  title?: ReactNode;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
}

const alertTones: Record<StatusTone, string> = {
  neutral: 'border-line bg-surface-muted text-ink-secondary',
  brand: 'border-brand-200 bg-brand-50 text-brand-800',
  success: 'border-success/25 bg-success-soft text-success',
  warning: 'border-warning/25 bg-warning-soft text-warning',
  danger: 'border-danger/25 bg-danger-soft text-danger',
  info: 'border-info/25 bg-info-soft text-info',
};

export function Alert({ tone = 'neutral', title, children, icon, className }: AlertProps) {
  return (
    <div
      role={tone === 'danger' ? 'alert' : 'status'}
      className={cx('flex gap-3 rounded-md border px-4 py-3 text-sm', alertTones[tone], className)}
    >
      {icon ? <div className="mt-0.5 shrink-0">{icon}</div> : null}
      <div className="min-w-0">
        {title ? <p className="font-semibold">{title}</p> : null}
        <div className={cx(title && 'mt-1', 'text-[0.9rem] leading-relaxed')}>{children}</div>
      </div>
    </div>
  );
}

/* ================================================================== */
/* Empty / error / skeleton states                                    */
/* ================================================================== */
export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
  compact?: boolean;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  compact,
}: EmptyStateProps) {
  return (
    <div
      className={cx(
        'flex flex-col items-center justify-center rounded-lg border border-dashed border-line-strong bg-surface text-center',
        compact ? 'px-4 py-8' : 'px-6 py-14',
        className,
      )}
    >
      {icon ? (
        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 text-brand-600">
          {icon}
        </div>
      ) : null}
      <p className="text-[0.95rem] font-semibold text-ink">{title}</p>
      {description ? (
        <p className="mt-1 max-w-sm text-sm text-ink-secondary">{description}</p>
      ) : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cx('relative overflow-hidden rounded-sm bg-surface-sunken', className)}
    >
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/70 to-transparent" />
    </div>
  );
}

export function ErrorState({
  title = 'Something went wrong',
  description = 'The request could not be completed. Retry, or contact support if it keeps happening.',
  action,
  className,
}: {
  title?: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      role="alert"
      className={cx(
        'rounded-lg border border-danger/25 bg-danger-soft/60 px-5 py-6 text-center',
        className,
      )}
    >
      <p className="font-semibold text-danger">{title}</p>
      <p className="mx-auto mt-1 max-w-md text-sm text-ink-secondary">{description}</p>
      {action ? <div className="mt-4 flex justify-center">{action}</div> : null}
    </div>
  );
}

/* ================================================================== */
/* KPI tile                                                           */
/* ================================================================== */
export interface KpiTileProps {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  delta?: { value: string; direction: 'up' | 'down' | 'flat'; good?: boolean };
  icon?: ReactNode;
  tone?: StatusTone;
  href?: string;
}

const kpiIconTones: Record<StatusTone, string> = {
  neutral: 'bg-surface-muted text-ink-secondary',
  brand: 'bg-brand-100 text-brand-700',
  success: 'bg-success-soft text-success',
  warning: 'bg-warning-soft text-warning',
  danger: 'bg-danger-soft text-danger',
  info: 'bg-info-soft text-info',
};

export function KpiTile({ label, value, hint, delta, icon, tone = 'brand' }: KpiTileProps) {
  const deltaTone =
    delta?.direction === 'flat'
      ? 'text-ink-tertiary'
      : delta?.good === false
        ? 'text-danger'
        : 'text-success';
  return (
    <div className="card-surface p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-label font-medium uppercase tracking-wide text-ink-tertiary">{label}</p>
        {icon ? (
          <span
            className={cx(
              'flex h-8 w-8 items-center justify-center rounded-md',
              kpiIconTones[tone],
            )}
          >
            {icon}
          </span>
        ) : null}
      </div>
      <p className="mt-3 font-display text-[1.7rem] font-semibold leading-none tracking-tight text-ink numeric">
        {value}
      </p>
      <div className="mt-2 flex items-center gap-2 text-xs">
        {delta ? (
          <span className={cx('font-medium numeric', deltaTone)}>
            {delta.direction === 'up' ? '▲' : delta.direction === 'down' ? '▼' : '■'} {delta.value}
          </span>
        ) : null}
        {hint ? <span className="text-ink-tertiary">{hint}</span> : null}
      </div>
    </div>
  );
}

/* ================================================================== */
/* Progress + stepper                                                 */
/* ================================================================== */
export function ProgressBar({
  value,
  tone = 'brand',
  label,
  className,
}: {
  value: number;
  tone?: StatusTone;
  label?: string;
  className?: string;
}) {
  const clamped = Math.max(0, Math.min(100, value));
  const fill: Record<StatusTone, string> = {
    neutral: 'bg-line-strong',
    brand: 'bg-brand-600',
    success: 'bg-success',
    warning: 'bg-warning',
    danger: 'bg-danger',
    info: 'bg-info',
  };
  return (
    <div className={className}>
      {label ? (
        <div className="mb-1.5 flex items-center justify-between text-caption text-ink-secondary">
          <span>{label}</span>
          <span className="numeric font-medium text-ink">{clamped}%</span>
        </div>
      ) : null}
      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? 'Progress'}
        className="h-1.5 w-full overflow-hidden rounded-full bg-surface-sunken"
      >
        <div
          className={cx(
            'h-full rounded-full transition-[width] duration-500 ease-soft',
            fill[tone],
          )}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}

export type StepState = 'complete' | 'current' | 'upcoming' | 'blocked';

export interface Step {
  id: string;
  label: string;
  description?: string;
  state: StepState;
}

const stepDot: Record<StepState, string> = {
  complete: 'bg-brand-600 text-white border-brand-600',
  current: 'bg-white text-brand-700 border-brand-600 ring-4 ring-brand-100',
  upcoming: 'bg-white text-ink-tertiary border-line-strong',
  blocked: 'bg-danger-soft text-danger border-danger/40',
};

export function Stepper({ steps, className }: { steps: Step[]; className?: string }) {
  return (
    <ol className={cx('flex flex-col gap-0', className)}>
      {steps.map((step, index) => (
        <li key={step.id} className="relative flex gap-3 pb-5 last:pb-0">
          {index < steps.length - 1 ? (
            <span
              aria-hidden
              className={cx(
                'absolute left-[13px] top-7 h-[calc(100%-1.25rem)] w-px',
                step.state === 'complete' ? 'bg-brand-300' : 'bg-line',
              )}
            />
          ) : null}
          <span
            className={cx(
              'relative z-10 mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold',
              stepDot[step.state],
            )}
            aria-hidden
          >
            {step.state === 'complete' ? '✓' : index + 1}
          </span>
          <div className="min-w-0 pt-0.5">
            <p
              className={cx(
                'text-sm font-medium',
                step.state === 'upcoming' ? 'text-ink-tertiary' : 'text-ink',
              )}
            >
              {step.label}
            </p>
            {step.description ? (
              <p className="mt-0.5 text-xs text-ink-secondary">{step.description}</p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ================================================================== */
/* Checklist + consent                                                */
/* ================================================================== */
export interface ChecklistItem {
  id: string;
  label: string;
  hint?: string;
  done: boolean;
}

export function Checklist({ items }: { items: ChecklistItem[] }) {
  return (
    <ul className="divide-y divide-line">
      {items.map((item) => (
        <li key={item.id} className="flex items-start gap-3 py-2.5">
          <span
            aria-hidden
            className={cx(
              'mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-xs border text-[10px] font-bold',
              item.done
                ? 'border-brand-600 bg-brand-600 text-white'
                : 'border-line-strong bg-surface text-transparent',
            )}
            style={{ width: '1.1rem', height: '1.1rem' }}
          >
            ✓
          </span>
          <div className="min-w-0">
            <p className={cx('text-sm', item.done ? 'text-ink-secondary' : 'text-ink')}>
              {item.label}
            </p>
            {item.hint ? <p className="mt-0.5 text-xs text-ink-tertiary">{item.hint}</p> : null}
          </div>
        </li>
      ))}
    </ul>
  );
}

export function ConsentBlock({
  title,
  children,
  checked,
  required,
}: {
  title: string;
  children: ReactNode;
  checked?: boolean;
  required?: boolean;
}) {
  return (
    <label className="flex cursor-pointer gap-3 rounded-md border border-line bg-surface p-4 hover:border-brand-200">
      <input
        type="checkbox"
        defaultChecked={checked}
        className="mt-0.5 h-4 w-4 shrink-0 rounded-xs border-line-strong text-brand-700 focus:ring-brand-500"
      />
      <span className="min-w-0 text-sm text-ink-secondary">
        <span className="font-medium text-ink">{title}</span>
        {required ? <span className="ml-1 text-danger">*</span> : null}
        <span className="mt-1 block text-xs leading-relaxed">{children}</span>
      </span>
    </label>
  );
}

/* ================================================================== */
/* Disclaimer strip — legal requirement on pricing/serves pages        */
/* ================================================================== */
export function DisclaimerStrip({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cx(
        'rounded-md border border-line bg-surface-muted px-4 py-3 text-xs leading-relaxed text-ink-secondary',
        className,
      )}
    >
      <span className="mr-1.5 font-semibold text-ink">Important:</span>
      {children}
    </div>
  );
}
