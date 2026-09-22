import type { MetadataRoute } from 'next';
import { site } from './site-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: site.url,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: { languages: { en: site.url, es: `${site.url}/es` } },
    },
    {
      url: `${site.url}/es`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: { languages: { en: site.url, es: `${site.url}/es` } },
    },
  ];
}
