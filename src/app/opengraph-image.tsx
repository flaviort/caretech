import { ogContentType, ogSize, renderOg } from '@/lib/og'
import { images, site } from '@/content/site'

export const alt = `${site.legalName}: ${site.slogan.join(' ')}`
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
	return renderOg({ label: 'Consultoria em TI', title: site.slogan.join(' '), photo: images.hero.src })
}
