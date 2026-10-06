import type { MetadataRoute } from 'next'
import { site } from '@/content/site'

export default function manifest(): MetadataRoute.Manifest {
	return {
		id: '/',
		name: site.legalName,
		short_name: site.name,
		description: site.description,
		lang: 'pt-BR',
		start_url: '/',
		scope: '/',
		icons: [
			{ src: '/favicon/web-app-manifest-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
			{ src: '/favicon/web-app-manifest-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
		],
		theme_color: '#151515',
		background_color: '#151515',
		display: 'standalone'
	}
}
