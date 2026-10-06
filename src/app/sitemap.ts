import type { MetadataRoute } from 'next'
import { cases, routes, services } from '@/content/site'
import { absoluteUrl } from '@/lib/seo'

// Bump when page content changes meaningfully; crawlers use it to decide what to revisit.
const updated = new Date('2026-10-06')

export default function sitemap(): MetadataRoute.Sitemap {
	const pages: { path: string; priority: number }[] = [
		{ path: routes.home, priority: 1 },
		{ path: routes.services, priority: 0.9 },
		...services.map(service => ({ path: `${routes.services}/${service.slug}`, priority: 0.8 })),
		{ path: routes.about, priority: 0.7 },
		{ path: routes.cases, priority: 0.7 },
		...cases.map(item => ({ path: `${routes.cases}/${item.slug}`, priority: 0.6 })),
		{ path: routes.contact, priority: 0.7 },
		{ path: routes.privacy, priority: 0.3 }
	]

	return pages.map(({ path, priority }) => ({
		url: absoluteUrl(path),
		lastModified: updated,
		changeFrequency: 'monthly',
		priority
	}))
}
