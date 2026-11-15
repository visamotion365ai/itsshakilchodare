export interface AdminNavItem {
  label: string;
  href: string;
  icon: string;
  badge?: string;
  badgeTone?: 'brand' | 'warning' | 'danger' | 'success';
  roles?: string[];
}

export interface AdminNavSection {
  title: string;
  items: AdminNavItem[];
}

/**
 * Super Admin navigation (ADR-001 §3). Sections map to the operational
 * workspaces: case queues, verification gates, policy packs, partners, finance,
 * browser streams, agents and the engineering control plane.
 *
 * `roles` documents which internal roles may see the section — the UI hides
 * what a role cannot use, the API re-checks, and PostgreSQL RLS is the final
 * boundary (three-layer permission model).
 */
export const adminNav: AdminNavSection[] = [
  {
    title: 'Operations',
    items: [
      { label: 'Command centre', href: '/', icon: 'dashboard' },
      { label: 'Case queue', href: '/cases', icon: 'cases', badge: '8' },
      {
        label: 'Verification gates',
        href: '/verification',
        icon: 'shield-check',
        badge: '5',
        badgeTone: 'warning',
      },
      { label: 'Documents & OCR', href: '/documents', icon: 'file' },
    ],
  },
  {
    title: 'Knowledge',
    items: [
      { label: 'Policy packs', href: '/policies', icon: 'book', badge: '2', badgeTone: 'warning' },
      { label: 'Partners', href: '/partners', icon: 'users' },
    ],
  },
  {
    title: 'Revenue',
    items: [
      {
        label: 'Finance & reconciliation',
        href: '/finance',
        icon: 'wallet',
        badge: '2',
        badgeTone: 'danger',
      },
      { label: 'Invoices', href: '/invoices', icon: 'receipt' },
    ],
  },
  {
    title: 'Intelligence',
    items: [
      { label: 'Agent activity', href: '/agents', icon: 'sparkles' },
      {
        label: 'Browser sessions',
        href: '/browser',
        icon: 'globe',
        badge: '2',
        badgeTone: 'success',
      },
    ],
  },
  {
    title: 'Governance',
    items: [
      { label: 'Audit log', href: '/audit', icon: 'history' },
      { label: 'Engineering', href: '/engineering', icon: 'code' },
      { label: 'Team & roles', href: '/team', icon: 'settings' },
    ],
  },
];

export const adminCommandItems = [
  { id: 'a1', label: 'Command centre', href: '/', group: 'Navigate' },
  { id: 'a2', label: 'Case queue', href: '/cases', group: 'Navigate' },
  { id: 'a3', label: 'Verification gates', href: '/verification', group: 'Navigate' },
  { id: 'a4', label: 'Documents & OCR', href: '/documents', group: 'Navigate' },
  { id: 'a5', label: 'Policy packs', href: '/policies', group: 'Navigate' },
  { id: 'a6', label: 'Partners', href: '/partners', group: 'Navigate' },
  { id: 'a7', label: 'Finance & reconciliation', href: '/finance', group: 'Navigate' },
  { id: 'a8', label: 'Invoices', href: '/invoices', group: 'Navigate' },
  { id: 'a9', label: 'Agent activity', href: '/agents', group: 'Navigate' },
  { id: 'a10', label: 'Browser sessions', href: '/browser', group: 'Navigate' },
  { id: 'a11', label: 'Audit log', href: '/audit', group: 'Navigate' },
  { id: 'a12', label: 'Engineering control plane', href: '/engineering', group: 'Navigate' },
  { id: 'a13', label: 'Team & roles', href: '/team', group: 'Navigate' },
  {
    id: 'a14',
    label: 'VH-2026-0203 · SLA breach',
    href: '/cases/VH-2026-0203',
    group: 'Cases',
    hint: 'urgent',
  },
  { id: 'a15', label: 'VH-2026-0148 · verification', href: '/cases/VH-2026-0148', group: 'Cases' },
  {
    id: 'a16',
    label: 'VH-2026-0211 · blocked',
    href: '/cases/VH-2026-0211',
    group: 'Cases',
    hint: 'blocked',
  },
  { id: 'a17', label: 'Canada policy pack IRCC-SP-2024.1', href: '/policies', group: 'Policies' },
  { id: 'a18', label: 'Approve refund INV-2026-0512', href: '/finance', group: 'Actions' },
  { id: 'a19', label: 'Take over live browser session', href: '/browser', group: 'Actions' },
  { id: 'a20', label: 'Open engineering PR queue', href: '/engineering', group: 'Actions' },
];
