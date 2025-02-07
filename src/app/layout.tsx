// libraries
import type { Metadata } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'

// components
import Guidelines from '@/components/Utils/Guidelines'

// css
import '@/assets/css/normalize.min.css'
import '@/assets/css/bootstrap-grid.min.css'
import '@/assets/scss/main.scss'

// fonts
/*
import { Afacad } from 'next/font/google'

const afacad = Afacad({
	weight: ['400', '700'],
	style: ['normal'],
	subsets: ['latin'],
	variable: '--font-afacad'
})
*/

// metadata
export const metadata: Metadata = {
	metadataBase: new URL(`https://caretechit.com.br`),
	alternates: {
        canonical: './',
    },
	title: 'CareTech IT',
	description: 'A CareTech IT é especializada em soluções tecnológicas e de TI para o setor de saúde, oferecendo sistemas e suporte para hospitais.',
	icons: {
		icon: '/favicon/icon.svg'
	},
	openGraph: {
		title: 'CareTech IT',
		description: 'A CareTech IT é especializada em soluções tecnológicas e de TI para o setor de saúde, oferecendo sistemas e suporte para hospitais.',
		url: 'https://caretechit.com.br',
		siteName: 'CareTech IT',
		images: [
			{
				url: 'https://caretechit.com.br/img/og-image.png',
				width: 1280,
				height: 628,
				alt: 'CareTech IT'
			}
		],
		locale: 'pt_BR',
		type: 'website'
	}
}

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {

	// schema
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Organization",
		"name": "CareTech IT",
		"url": "https://caretechit.com.br",
		"logo": "https://caretechit.com.br/img/logo.png",
		"description": "A CareTech IT é especializada em soluções tecnológicas e de TI para o setor de saúde, oferecendo sistemas e suporte para hospitais.",
		"founder": "Tiago Selusniaki",
		"contactPoint": {
			"@type": "ContactPoint",
			"contactType": "customer support",
			"telephone": "+55 (41) 9822-2437",
			"email": "contato@caretechit.com.br"
		},
		"keywords": [
			"CareTech IT",
			"Saúde",
			"Tecnologia",
			"Hospitais",
			"Sistemas de TI"
		]
	}

	return (
		<html lang='pt-BR'>

			<head>
				<meta name='apple-mobile-web-app-title' content='CareTech' />
			</head>

			<body id='start'>

				{/*
				<a href='#main-content' className='skip-content button button--hollow-white text-12'>
					Skip content
				</a>
				*/}

				<div id='main-content'>
					{children}
				</div>

				{/*<Guidelines />*/}

				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>

				<GoogleAnalytics gaId='G-XXX' />

			</body>

		</html>
	)
}