/**
 * VisaHobe Design System — Typed Design Tokens
 *
 * Implements ADR-009 (Premium White + Dark-Green + Selective Liquid Glass).
 * Consumed by `packages/ui` and every application. Values here MUST stay in
 * sync with `../tokens.css`, which is the runtime source of truth.
 */

export const colors = {
  bg: '#FDFDFD',
  surface: '#FFFFFF',
  surfaceMuted: '#F4F6F4',
  surfaceSunken: '#EEF2EF',

  brand: {
    950: '#04140F',
    900: '#07211A',
    800: '#0A2D23',
    700: '#0D3B2E',
    600: '#114B3A',
    500: '#16654F',
    400: '#2A8A6D',
    300: '#57B092',
    200: '#9ED3C1',
    100: '#E3EFEA',
    50: '#F1F8F5',
  },

  success: '#15803D',
  successSoft: '#E8F5EC',
  warning: '#B45309',
  warningSoft: '#FDF3E3',
  danger: '#B91C1C',
  dangerSoft: '#FDECEB',
  info: '#1D4ED8',
  infoSoft: '#EAF0FD',

  text: {
    primary: '#111827',
    secondary: '#4B5563',
    tertiary: '#6B7280',
    inverse: '#FFFFFF',
  },

  border: '#E5E7EB',
  borderStrong: '#D1D5DB',
} as const;

export const radii = {
  xs: '4px',
  sm: '6px',
  md: '10px',
  lg: '14px',
  xl: '20px',
  '2xl': '28px',
} as const;

export const typography = {
  sans: "'Inter Variable', 'Inter', system-ui, -apple-system, 'Segoe UI', 'Noto Sans Bengali', 'Hind Siliguri', sans-serif",
  display:
    "'Plus Jakarta Sans Variable', 'Plus Jakarta Sans', 'Inter Variable', system-ui, 'Noto Sans Bengali', sans-serif",
  mono: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
} as const;

export const shadows = {
  xs: '0 1px 2px 0 rgb(7 33 26 / 0.04)',
  sm: '0 1px 3px 0 rgb(7 33 26 / 0.06), 0 1px 2px -1px rgb(7 33 26 / 0.05)',
  md: '0 4px 12px -2px rgb(7 33 26 / 0.08), 0 2px 6px -2px rgb(7 33 26 / 0.05)',
  lg: '0 12px 32px -8px rgb(7 33 26 / 0.14), 0 4px 12px -4px rgb(7 33 26 / 0.06)',
  xl: '0 24px 56px -16px rgb(7 33 26 / 0.22)',
} as const;

export const layout = {
  shellSidebar: '264px',
  shellTopbar: '64px',
  contentMax: '1240px',
} as const;

export const motion = {
  fast: '140ms',
  base: '220ms',
  slow: '420ms',
  easeOutSoft: 'cubic-bezier(0.22, 1, 0.36, 1)',
} as const;

/**
 * ADR-009 §3.2 — Liquid Glass policy.
 * `permitted` surfaces may use glass treatments; `prohibited` surfaces must
 * remain fully opaque. Kept as data so the UI package and documentation can
 * assert against it in tests.
 */
export const liquidGlassPolicy = {
  /** Surfaces where the glass treatment is allowed (blueprint §10.3). */
  permitted: [
    'command-palette',
    'agent-activity-panel',
    'agent-chat-drawer',
    'browser-live-view-overlay',
    'modal-dialog',
    'drawer-panel',
    'notification-center',
    'approval-action-bar',
    'marketing-hero',
  ],
  /** Surfaces that must stay fully opaque for legibility and trust. */
  prohibited: [
    'data-tables',
    'case-queues',
    'document-review-screens',
    'ocr-diffs',
    'financial-ledgers',
    'invoice-tables',
    'long-forms',
    'dense-admin-queues',
    'accessibility-critical-text',
  ],
} as const;

/**
 * Explicit allow/deny contract consumed by tests, docs and design review.
 * Kept in sync with `liquidGlassPolicy` — a single source of truth.
 */
export const liquidGlassConfig = {
  allowedSurfaces: liquidGlassPolicy.permitted,
  forbiddenSurfaces: liquidGlassPolicy.prohibited,
} as const;

export type GlassSurface = (typeof liquidGlassPolicy.permitted)[number];

/** Status → semantic token mapping used across all apps. */
export const statusTone = {
  neutral: { bg: 'var(--color-surface-muted)', fg: 'var(--color-text-secondary)' },
  success: { bg: 'var(--color-success-soft)', fg: 'var(--color-success)' },
  warning: { bg: 'var(--color-warning-soft)', fg: 'var(--color-warning)' },
  danger: { bg: 'var(--color-danger-soft)', fg: 'var(--color-danger)' },
  info: { bg: 'var(--color-info-soft)', fg: 'var(--color-info)' },
  brand: { bg: 'var(--color-brand-100)', fg: 'var(--color-brand-700)' },
} as const;

export type StatusTone = keyof typeof statusTone;

export const tokens = {
  colors,
  radii,
  typography,
  shadows,
  layout,
  motion,
  liquidGlassPolicy,
  statusTone,
};

export default tokens;
