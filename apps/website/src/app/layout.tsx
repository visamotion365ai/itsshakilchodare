import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/inter';
import '@fontsource-variable/plus-jakarta-sans';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';
import '@fontsource/noto-sans-bengali/400.css';
import '@fontsource/noto-sans-bengali/600.css';
import './globals.css';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { AgentChatLauncher } from '@visahobe/ui';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://visahobe.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'VisaHobe — Policy-cited visa preparation with human verification',
    template: '%s · VisaHobe',
  },
  description:
    'VisaHobe prepares and verifies study, work, visit, family and business visa files with policy-cited guidance, human verification gates and transparent fees. No visa guarantees.',
  keywords: [
    'visa preparation Bangladesh',
    'student visa Canada',
    'UK student visa',
    'Schengen visa',
    'visa document verification',
    'visa consultant Dhaka',
  ],
  authors: [{ name: 'VisaHobe' }],
  openGraph: {
    type: 'website',
    locale: 'en_BD',
    url: siteUrl,
    siteName: 'VisaHobe',
    title: 'VisaHobe — Policy-cited visa preparation with human verification',
    description:
      'Policy-cited visa preparation, secure document handling and named human verification gates. Fees disclosed in writing. No visa guarantees.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VisaHobe — Policy-cited visa preparation',
    description: 'Human-verified visa files with transparent fees and audited document handling.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: '/',
    languages: { 'en-BD': '/', 'bn-BD': '/?lang=bn' },
  },
  icons: {
    icon: '/icon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#0D3B2E',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'VisaHobe',
    url: siteUrl,
    description:
      'Visa preparation and documentation service with policy-cited guidance and human verification gates.',
    areaServed: 'Bangladesh',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Level 7, Gulshan Avenue',
      addressLocality: 'Dhaka',
      postalCode: '1212',
      addressCountry: 'BD',
    },
    email: 'hello@visahobe.com',
    telephone: '+8809600000000',
    priceRange: 'BDT 15,000 – 450,000',
    disambiguatingDescription:
      'VisaHobe is not a government body or embassy and does not guarantee visa approval.',
  };

  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <AgentChatLauncher
          greeting={
            'Hi — I’m the VisaHobe assistant. I can explain routes, compare package fees or point you to the right document checklist. I answer from approved policy sources and can’t approve or submit anything.'
          }
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </body>
    </html>
  );
}
