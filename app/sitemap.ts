import { MetadataRoute } from 'next';
import servicesData from '../data/services.json';

const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.revivehomeoclinic.com';
  
  const staticRoutes = [
    '',
    '/about',
    '/treatments',
    '/online-consultation',
    '/testimonials',
    '/blog',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === '' ? 'daily' : 'weekly') as 'daily' | 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));

  const treatmentRoutes = servicesData.services.map((service) => ({
    url: `${baseUrl}/treatments/${slugify(service.category)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...treatmentRoutes];
}
