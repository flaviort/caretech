import { ogContentType, ogSize, renderOg } from '@/lib/og'
import { images } from '@/content/site'

export const alt = 'Serviços da CareTech'
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
	return renderOg({ label: 'Serviços', title: 'Seis frentes, um parceiro em TI, dados e IA', photo: images.pe.src })
}
