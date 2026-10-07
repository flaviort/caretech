import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import { SmoothScroll } from '@/components/motion/SmoothScroll'
import { TransitionProvider } from '@/components/motion/Transition'
import { PageAnimations } from '@/components/motion/PageAnimations'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { JsonLd } from '@/components/seo/JsonLd'
import { graph, organization, website } from '@/lib/seo'
import { CookieConsent } from '@/components/consent/CookieConsent'
import { cookieConsent, site } from '@/content/site'

import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' })

const verification = process.env.GOOGLE_SITE_VERIFICATION

export const metadata: Metadata = {
	metadataBase: new URL(site.url),
	title: {
		default: `${site.legalName} | ${site.slogan.join(' ')}`,
		template: `%s | ${site.legalName}`
	},
	description: site.description,
	applicationName: site.legalName,
	authors: [{ name: site.legalName, url: site.url }],
	creator: site.legalName,
	publisher: site.legalName,
	category: 'technology',
	formatDetection: { telephone: false, email: false, address: false },
	robots: {
		index: true,
		follow: true,
		googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 }
	},
	icons: {
		icon: [
			{ url: '/favicon/favicon.ico', sizes: '48x48' },
			{ url: '/favicon/icon.svg', type: 'image/svg+xml' }
		],
		apple: '/favicon/apple-icon.png'
	},
	openGraph: {
		siteName: site.legalName,
		locale: 'pt_BR',
		type: 'website'
	},
	twitter: { card: 'summary_large_image' },
	...(verification ? { verification: { google: verification } } : {})
}

export const viewport: Viewport = {
	themeColor: '#151515'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='pt-BR' className={`${geist.variable} ${geistMono.variable}`}>
			<head>
				<meta name='apple-mobile-web-app-title' content={site.name} />
				{/* without JS the tile curtain would never open; a <style> is only valid in <head> */}
				<noscript dangerouslySetInnerHTML={{ __html: '<style>#curtain{display:none}</style>' }} />
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
						{/* inside the provider so its link runs the page transition; tags load only on the production deploy */}
						<CookieConsent gtmId={cookieConsent.gtmId} track={process.env.VERCEL_ENV === 'production'} />
					</TransitionProvider>
				</SmoothScroll>

				<JsonLd data={graph(organization, website)} />
			</body>
		</html>
	)
}
