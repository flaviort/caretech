import { ogContentType, ogSize, renderOg } from '@/lib/og'
import { getService, services } from '@/content/site'

export const alt = 'Serviço da CareTech'
export const size = ogSize
export const contentType = ogContentType

export function generateStaticParams() {
	return services.map(service => ({ slug: service.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	const service = getService(slug) ?? services[0]
	return renderOg({ label: `Serviço ${service.code}`, title: service.title, photo: service.image.src })
}
