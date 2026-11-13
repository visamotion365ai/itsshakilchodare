import type { MetadataRoute } from 'next';
import { services, countryGuides, resources } from '@visahobe/shared';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://visahobe.com';
  const now = new Date();

  const staticRoutes = [
    { path: '/', priority: 1 },
    { path: '/services', priority: 0.9 },
    { path: '/countries', priority: 0.9 },
    { path: '/pricing', priority: 0.9 },
    { path: '/how-it-works', priority: 0.8 },
    { path: '/eligibility', priority: 0.9 },
    { path: '/about', priority: 0.7 },
    { path: '/trust', priority: 0.7 },
    { path: '/resources', priority: 0.8 },
    { path: '/resources/announcements', priority: 0.5 },
    { path: '/faq', priority: 0.6 },
    { path: '/contact', priority: 0.7 },
    { path: '/consultation', priority: 0.8 },
    { path: '/signin', priority: 0.4 },
    { path: '/signup', priority: 0.5 },
    { path: '/legal/privacy', priority: 0.3 },
    { path: '/legal/terms', priority: 0.3 },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${base}${route.path}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: route.priority,
    })),
    ...services.map((service) => ({
      url: `${base}/services/${service.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    })),
    ...countryGuides.map((country) => ({
      url: `${base}/countries/${country.slug}`,
      lastModified: new Date(country.lastReviewed),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...resources.map((resource) => ({
      url: `${base}/resources/${resource.slug}`,
      lastModified: new Date(resource.date),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    })),
  ];
}
