import { ogContentType, ogSize, renderOg } from '@/lib/og'
import { cases, getCase } from '@/content/site'

export const alt = 'Case da CareTech'
export const size = ogSize
export const contentType = ogContentType

export function generateStaticParams() {
	return cases.map(item => ({ slug: item.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	const item = getCase(slug) ?? cases[0]
	return renderOg({ label: `${item.code} · ${item.sector}`, title: item.title, photo: item.image.src })
}
