import type { Metadata } from 'next'
import { contact, routes, services, site, type Faq, type Service } from '@/content/site'

type PageMeta = {
	title: string
	description: string
	path: string
	// skip the "| CareTech IT" template (used by Home)
	absoluteTitle?: boolean
}

// Every page passes through here so canonical, Open Graph and Twitter tags always describe the page itself.
// The og:image comes from the opengraph-image file of each route segment.
export function pageMetadata({ title, description, path, absoluteTitle }: PageMeta): Metadata {
	const fullTitle = absoluteTitle ? title : `${title} | ${site.legalName}`
	return {
		title: absoluteTitle ? { absolute: title } : title,
		description,
		alternates: { canonical: path },
		openGraph: {
			title: fullTitle,
			description,
			url: path,
			siteName: site.legalName,
			locale: 'pt_BR',
			type: 'website'
		},
		twitter: {
			card: 'summary_large_image',
			title: fullTitle,
			description
		}
	}
}

// Trims to a length search results show in full, cutting at a word boundary.
export const clip = (text: string, max = 160) =>
	text.length <= max ? text : `${text.slice(0, max - 3).replace(/[\s,.;:]+\S*$/, '')}...`

export const absoluteUrl = (path: string) => (path === '/' ? site.url : `${site.url}${path}`)

const ids = {
	organization: `${site.url}/#organization`,
	website: `${site.url}/#website`
}

export const serviceUrl = (service: Service) => absoluteUrl(`${routes.services}/${service.slug}`)

export const organization = {
	'@type': 'Organization',
	'@id': ids.organization,
	name: site.legalName,
	alternateName: site.name,
	url: site.url,
	logo: {
		'@type': 'ImageObject',
		url: `${site.url}/favicon/web-app-manifest-512x512.png`,
		width: 512,
		height: 512
	},
	image: `${site.url}/opengraph-image`,
	slogan: site.slogan.join(' '),
	description: site.description,
	foundingDate: String(site.founded),
	founder: { '@type': 'Person', name: 'Tiago Selusniaki' },
	email: contact.email,
	telephone: '+55-41-9822-2437',
	areaServed: { '@type': 'Country', name: 'Brasil' },
	knowsAbout: [
		'Gestão de TI',
		'Governança de TI',
		'TI hospitalar',
		'Inteligência de Dados',
		'Business Intelligence',
		'Transformação Digital',
		'Integração de sistemas',
		'Inteligência Artificial',
		'LGPD'
	],
	contactPoint: {
		'@type': 'ContactPoint',
		contactType: 'customer service',
		telephone: '+55-41-9822-2437',
		email: contact.email,
		areaServed: 'BR',
		availableLanguage: 'Portuguese'
	}
}

export const website = {
	'@type': 'WebSite',
	'@id': ids.website,
	url: site.url,
	name: site.legalName,
	description: site.description,
	inLanguage: 'pt-BR',
	publisher: { '@id': ids.organization }
}

type Crumb = { name: string; path: string }

export function breadcrumb(trail: Crumb[]) {
	const items = [{ name: 'Início', path: routes.home }, ...trail]
	return {
		'@type': 'BreadcrumbList',
		'@id': `${absoluteUrl(trail.at(-1)?.path ?? '/')}#breadcrumb`,
		itemListElement: items.map((item, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			name: item.name,
			item: absoluteUrl(item.path)
		}))
	}
}

type WebPageInput = {
	type?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage'
	path: string
	name: string
	description: string
	trail?: Crumb[]
	extra?: Record<string, unknown>
}

export function webPage({ type = 'WebPage', path, name, description, trail, extra }: WebPageInput) {
	const url = absoluteUrl(path)
	return {
		'@type': type,
		'@id': `${url}#webpage`,
		url,
		name,
		description,
		inLanguage: 'pt-BR',
		isPartOf: { '@id': ids.website },
		about: { '@id': ids.organization },
		primaryImageOfPage: `${url}/opengraph-image`,
		...(trail ? { breadcrumb: { '@id': `${url}#breadcrumb` } } : {}),
		...extra
	}
}

export function serviceNode(service: Service) {
	const url = serviceUrl(service)
	return {
		'@type': 'Service',
		'@id': `${url}#service`,
		name: service.title,
		serviceType: service.title,
		description: `${service.summary} ${service.lead}`,
		url,
		provider: { '@id': ids.organization },
		areaServed: { '@type': 'Country', name: 'Brasil' },
		availableLanguage: 'pt-BR',
		hasOfferCatalog: {
			'@type': 'OfferCatalog',
			name: `${service.listLabel}: ${service.title}`,
			itemListElement: service.items.map(item => ({
				'@type': 'Offer',
				itemOffered: { '@type': 'Service', name: item }
			}))
		}
	}
}

export const servicesList = {
	'@type': 'ItemList',
	itemListElement: services.map((service, i) => ({
		'@type': 'ListItem',
		position: i + 1,
		url: serviceUrl(service),
		name: service.title
	}))
}

// Used by the Faq component, so every FAQ on the site ships its schema without a separate step.
export const faqPage = (items: Faq[]) => ({
	'@context': 'https://schema.org',
	'@type': 'FAQPage',
	mainEntity: items.map(item => ({
		'@type': 'Question',
		name: item.q,
		acceptedAnswer: { '@type': 'Answer', text: item.a }
	}))
})

export const graph = (...nodes: object[]) => ({ '@context': 'https://schema.org', '@graph': nodes })
