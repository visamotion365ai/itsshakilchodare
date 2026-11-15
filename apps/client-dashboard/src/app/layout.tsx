import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/inter';
import '@fontsource-variable/plus-jakarta-sans';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/noto-sans-bengali/400.css';
import './globals.css';
import { SidebarNav } from '@/components/sidebar-nav';
import { Topbar } from '@/components/topbar';
import { AgentChatLauncher } from '@visahobe/ui';

export const metadata: Metadata = {
  title: {
    default: 'VisaHobe Client Workspace',
    template: '%s · VisaHobe Client Workspace',
  },
  description:
    'Tenant-scoped client workspace for case tracking, secure document upload, verification progress and invoices.',
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: '#0D3B2E',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-bg">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <SidebarNav />
        <div className="lg:pl-sidebar">
          <Topbar />
          <main id="main-content" className="px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
        <AgentChatLauncher
          greeting={
            'Hello Rafid. I can see your four cases. Right now the Canada case is blocked on one document — the bank statement needs a stamp on the final page. Want me to list everything outstanding across all cases?'
          }
        />
      </body>
    </html>
  );
}
