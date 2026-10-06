import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'

import { SmoothScroll } from '@/components/motion/SmoothScroll'
import { TransitionProvider } from '@/components/motion/Transition'
import { PageAnimations } from '@/components/motion/PageAnimations'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { contact, site } from '@/content/site'

import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' })

export const metadata: Metadata = {
	metadataBase: new URL(site.url),
	title: {
		default: `${site.name} | ${site.slogan.join(' ')}`,
		template: `%s | ${site.name}`
	},
	description: site.description,
	alternates: { canonical: './' },
	icons: { icon: '/favicon/icon.svg', apple: '/favicon/apple-icon.png' },
	openGraph: {
		title: `${site.name} | ${site.slogan.join(' ')}`,
		description: site.description,
		url: site.url,
		siteName: site.legalName,
		images: [{ url: '/img/og-image.png', width: 1280, height: 628, alt: site.legalName }],
		locale: 'pt_BR',
		type: 'website'
	}
}

export const viewport: Viewport = {
	themeColor: '#151515'
}

const jsonLd = {
	'@context': 'https://schema.org',
	'@type': 'Organization',
	name: site.legalName,
	url: site.url,
	logo: `${site.url}/favicon/web-app-manifest-512x512.png`,
	slogan: site.slogan.join(' '),
	description: site.description,
	foundingDate: String(site.founded),
	areaServed: 'BR',
	contactPoint: {
		'@type': 'ContactPoint',
		contactType: 'customer support',
		telephone: '+55-41-9822-2437',
		email: contact.email,
		areaServed: 'BR',
		availableLanguage: 'Portuguese'
	}
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const gaId = process.env.NEXT_PUBLIC_GA_ID

	return (
		<html lang='pt-BR' className={`${geist.variable} ${geistMono.variable}`}>
			<head>
				<meta name='apple-mobile-web-app-title' content={site.name} />
			</head>
			<body>
				<a
					href='#conteudo'
					className='label fixed left-4 top-4 z-[200] -translate-y-24 rounded-md bg-blue px-4 py-3 text-white focus:translate-y-0'
				>
					Pular para o conteúdo
				</a>

				<SmoothScroll>
					<TransitionProvider>
						<Header />
						<div id='page' className='bg-paper'>
							<main id='conteudo'>{children}</main>
							<Footer />
						</div>
						<PageAnimations />
					</TransitionProvider>
				</SmoothScroll>

				<script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
				{gaId && <GoogleAnalytics gaId={gaId} />}
			</body>
		</html>
	)
}
