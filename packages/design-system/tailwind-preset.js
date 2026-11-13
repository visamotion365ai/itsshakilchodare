/**
 * VisaHobe — Shared Tailwind Preset (ADR-009)
 *
 * Consumed by apps/website, apps/client-dashboard and apps/super-admin so that
 * every surface shares one semantic vocabulary. No raw hex values should appear
 * in application code — always reference these semantic names.
 */

/** @type {import('tailwindcss').Config} */
const preset = {
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        surface: {
          DEFAULT: 'var(--color-surface)',
          muted: 'var(--color-surface-muted)',
          sunken: 'var(--color-surface-sunken)',
        },
        brand: {
          950: 'var(--color-brand-950)',
          900: 'var(--color-brand-900)',
          800: 'var(--color-brand-800)',
          700: 'var(--color-brand-700)',
          600: 'var(--color-brand-600)',
          500: 'var(--color-brand-500)',
          400: 'var(--color-brand-400)',
          300: 'var(--color-brand-300)',
          200: 'var(--color-brand-200)',
          100: 'var(--color-brand-100)',
          50: 'var(--color-brand-50)',
          DEFAULT: 'var(--color-brand-700)',
        },
        success: {
          DEFAULT: 'var(--color-success)',
          soft: 'var(--color-success-soft)',
        },
        warning: {
          DEFAULT: 'var(--color-warning)',
          soft: 'var(--color-warning-soft)',
        },
        danger: {
          DEFAULT: 'var(--color-danger)',
          soft: 'var(--color-danger-soft)',
        },
        info: {
          DEFAULT: 'var(--color-info)',
          soft: 'var(--color-info-soft)',
        },
        ink: {
          DEFAULT: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          tertiary: 'var(--color-text-tertiary)',
          inverse: 'var(--color-text-inverse)',
        },
        line: {
          DEFAULT: 'var(--color-border)',
          strong: 'var(--color-border-strong)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        display: ['var(--font-display)'],
        mono: ['var(--font-mono)'],
      },
      fontSize: {
        display: ['clamp(2.6rem, 5vw, 4.25rem)', { lineHeight: '1.04', letterSpacing: '-0.03em' }],
        'display-sm': [
          'clamp(2rem, 3.4vw, 2.9rem)',
          { lineHeight: '1.1', letterSpacing: '-0.025em' },
        ],
        h1: ['2.05rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        h2: ['1.55rem', { lineHeight: '1.25', letterSpacing: '-0.015em' }],
        h3: ['1.15rem', { lineHeight: '1.35', letterSpacing: '-0.01em' }],
        caption: ['0.78rem', { lineHeight: '1.4', letterSpacing: '0.01em' }],
        label: ['0.8rem', { lineHeight: '1.2', letterSpacing: '0.02em' }],
      },
      borderRadius: {
        xs: 'var(--radius-xs)',
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
      },
      boxShadow: {
        xs: 'var(--shadow-xs)',
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
      },
      maxWidth: {
        content: '1240px',
        prose: '72ch',
      },
      spacing: {
        sidebar: 'var(--shell-sidebar)',
        topbar: 'var(--shell-topbar)',
      },
      transitionTimingFunction: {
        soft: 'var(--ease-out-soft)',
      },
      backdropBlur: {
        glass: 'var(--glass-blur)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.97)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'slide-in-right': {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
        'slide-down': {
          from: { opacity: '0', transform: 'translateY(-8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        'pulse-ring': {
          '0%': { boxShadow: '0 0 0 0 rgb(22 101 79 / 0.35)' },
          '70%': { boxShadow: '0 0 0 10px rgb(22 101 79 / 0)' },
          '100%': { boxShadow: '0 0 0 0 rgb(22 101 79 / 0)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up var(--duration-slow) var(--ease-out-soft) both',
        'fade-in': 'fade-in var(--duration-base) var(--ease-out-soft) both',
        'scale-in': 'scale-in var(--duration-base) var(--ease-out-soft) both',
        'slide-in-right': 'slide-in-right var(--duration-base) var(--ease-out-soft) both',
        'slide-down': 'slide-down var(--duration-fast) var(--ease-out-soft) both',
        shimmer: 'shimmer 1.6s infinite',
        'pulse-ring': 'pulse-ring 2.4s var(--ease-out-soft) infinite',
        marquee: 'marquee 38s linear infinite',
      },
    },
  },
};

export default preset;
