import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://surgetechsolar.com'
  
  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/equipment',
    '/solutions',
    '/solar-calculator',
    '/services',
    '/projects',
    '/faq'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const solutionRoutes = ['residential', 'commercial', 'industrial'].map((type) => ({
    url: `${baseUrl}/solutions/${type}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...solutionRoutes]
}
