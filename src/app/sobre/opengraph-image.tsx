import { ogContentType, ogSize, renderOg } from '@/lib/og'
import { images } from '@/content/site'

export const alt = 'Sobre a CareTech'
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
	return renderOg({ label: 'Sobre', title: 'TI com visão de negócio, desde 2022', photo: images.about.src })
}
