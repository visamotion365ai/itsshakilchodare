export interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: string;
  badgeTone?: 'brand' | 'warning' | 'danger';
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

/**
 * Client navigation. Deliberately narrow: a client sees only their own
 * tenant-scoped workspace. No operational queues, partner records or staff
 * notes are reachable from this navigation (ADR-001 §3).
 */
export const clientNav: NavSection[] = [
  {
    title: 'Workspace',
    items: [
      { label: 'Overview', href: '/dashboard', icon: 'home' },
      { label: 'Cases', href: '/cases', icon: 'cases', badge: '4' },
      { label: 'Documents', href: '/documents', icon: 'folder' },
      { label: 'Messages', href: '/messages', icon: 'message', badge: '2', badgeTone: 'brand' },
    ],
  },
  {
    title: 'Account',
    items: [
      { label: 'Invoices', href: '/invoices', icon: 'receipt' },
      { label: 'Profile & consent', href: '/profile', icon: 'user' },
      {
        label: 'Notifications',
        href: '/notifications',
        icon: 'bell',
        badge: '3',
        badgeTone: 'warning',
      },
      { label: 'Help', href: '/help', icon: 'help' },
    ],
  },
];

export const commandItems = [
  { id: 'c1', label: 'Overview', href: '/dashboard', group: 'Navigate' },
  { id: 'c2', label: 'My cases', href: '/cases', group: 'Navigate' },
  { id: 'c3', label: 'Documents', href: '/documents', group: 'Navigate' },
  { id: 'c4', label: 'Messages', href: '/messages', group: 'Navigate' },
  { id: 'c5', label: 'Invoices', href: '/invoices', group: 'Navigate' },
  { id: 'c6', label: 'Profile & consent', href: '/profile', group: 'Navigate' },
  { id: 'c7', label: 'VH-2026-0148 · Canada student', href: '/cases/VH-2026-0148', group: 'Cases' },
  { id: 'c8', label: 'VH-2026-0192 · Schengen visit', href: '/cases/VH-2026-0192', group: 'Cases' },
  {
    id: 'c9',
    label: 'VH-2026-0071 · UAE attestation',
    href: '/cases/VH-2026-0071',
    group: 'Cases',
  },
  { id: 'c10', label: 'VH-2026-0203 · UK family', href: '/cases/VH-2026-0203', group: 'Cases' },
  { id: 'c11', label: 'Upload a document', href: '/documents/upload', group: 'Actions' },
  { id: 'c12', label: 'Ask the assistant', href: '/messages', group: 'Actions' },
  { id: 'c13', label: 'Open a new case', href: '/cases/new', group: 'Actions' },
  { id: 'c14', label: 'Pay invoice INV-2026-1088', href: '/invoices', group: 'Actions' },
  { id: 'c15', label: 'Public website', href: 'https://visahobe.com', group: 'External' },
];
