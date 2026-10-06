import { ogContentType, ogSize, renderOg } from '@/lib/og'
import { images } from '@/content/site'

export const alt = 'LGPD e Compliance na CareTech'
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
	return renderOg({ label: 'LGPD & Compliance', title: 'Privacidade e integridade', photo: images.in.src })
}
