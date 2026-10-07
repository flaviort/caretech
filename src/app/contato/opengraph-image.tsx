import { ogContentType, ogSize, renderOg } from '@/lib/og'
import { images } from '@/content/site'

export const alt = 'Contato CareTech'
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
	return renderOg({ label: 'Contato', title: 'Vamos conversar sobre a sua operação', photo: images.heroCardB.src })
}
