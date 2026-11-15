import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/inter';
import '@fontsource-variable/plus-jakarta-sans';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/noto-sans-bengali/400.css';
import './globals.css';
import { AdminSidebar } from '@/components/sidebar-nav';
import { AdminTopbar } from '@/components/topbar';
import { AgentChatLauncher } from '@visahobe/ui';

export const metadata: Metadata = {
  title: {
    default: 'VisaHobe Super Admin',
    template: '%s · VisaHobe Super Admin',
  },
  description:
    'Internal operations control plane: case queues, verification gates, policy packs, partner due diligence, finance reconciliation, browser sessions and engineering.',
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: '#07211A',
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
        <AdminSidebar />
        <div className="lg:pl-sidebar">
          <AdminTopbar />
          <main id="main-content" className="px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
        <AgentChatLauncher
          agentName="Super Main Agent"
          agentRole="Internal operations console"
          greeting={
            'Operations summary: 8 open cases, 2 SLA risks, 5 documents awaiting verification and 1 blocked business-migration file. I can inspect any case, draft a policy diff or prepare a branch — but I cannot approve, merge, deploy or run destructive SQL without human approval.'
          }
        />
      </body>
    </html>
  );
}
