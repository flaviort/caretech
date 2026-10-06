import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { site } from '@/content/site'

export const ogSize = { width: 1200, height: 630 }
export const ogContentType = 'image/png'

type OgInput = {
	// short uppercase label, set in Geist Mono like the site's section tags
	label: string
	title: string
	// path under public/, e.g. /img/photos/hero.jpg
	photo: string
}

const read = (...parts: string[]) => readFile(join(process.cwd(), ...parts))

// The fonts in src/assets/fonts are Latin subsets with layout features (kerning) stripped:
// Satori measures words without kerning but draws them with it, which left gaps after long words.

// Social card in the site's own language: darkened, blue-leaning photo, white Geist headline,
// mono label and the logo mark. Rendered at build time for every route.
export async function renderOg({ label, title, photo }: OgInput) {
	const [semibold, mono, image, icon] = await Promise.all([
		read('src/assets/fonts/Geist-SemiBold.ttf'),
		read('src/assets/fonts/GeistMono-Regular.ttf'),
		read('public', photo),
		read('src/assets/svg/logo/icon.svg')
	])
	const mark = `data:image/svg+xml;base64,${icon.toString('base64')}`
	const src = `data:image/jpeg;base64,${image.toString('base64')}`

	return new ImageResponse(
		(
			<div style={{ display: 'flex', width: '100%', height: '100%', position: 'relative', background: '#151515' }}>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src={src}
					alt=''
					width={1200}
					height={630}
					style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
				/>
				<div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', background: 'rgba(3,103,215,0.22)' }} />
				<div
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						display: 'flex',
						background: 'linear-gradient(90deg, rgba(21,21,21,0.94) 0%, rgba(21,21,21,0.78) 55%, rgba(21,21,21,0.6) 100%)'
					}}
				/>

				<div
					style={{
						position: 'relative',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
						width: '100%',
						height: '100%',
						padding: '64px 72px'
					}}
				>
					<div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img src={mark} alt='' width={44} height={44} />
						<div style={{ display: 'flex', fontFamily: 'Geist', fontSize: 30, color: '#ffffff', letterSpacing: -0.6 }}>
							{site.legalName}
						</div>
					</div>

					<div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
						<div style={{ display: 'flex' }}>
							<div
								style={{
									display: 'flex',
									fontFamily: 'Geist Mono',
									fontSize: 20,
									letterSpacing: 0.8,
									textTransform: 'uppercase',
									color: '#ffffff',
									background: '#0367d7',
									borderRadius: 5,
									padding: '6px 12px'
								}}
							>
								{label}
							</div>
						</div>
						<div
							style={{
								display: 'flex',
								fontFamily: 'Geist',
								fontSize: title.length > 40 ? 64 : 76,
								lineHeight: 1.02,
								letterSpacing: title.length > 40 ? -2.2 : -2.6,
								color: '#ffffff',
								maxWidth: 900
							}}
						>
							{title}
						</div>
					</div>

					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							fontFamily: 'Geist Mono',
							fontSize: 18,
							letterSpacing: 0.8,
							textTransform: 'uppercase',
							color: 'rgba(255,255,255,0.75)'
						}}
					>
						<div style={{ display: 'flex' }}>Atendimento nacional</div>
						<div style={{ display: 'flex' }}>caretechit.com.br</div>
					</div>
				</div>
			</div>
		),
		{
			...ogSize,
			fonts: [
				{ name: 'Geist', data: semibold, weight: 600, style: 'normal' },
				{ name: 'Geist Mono', data: mono, weight: 400, style: 'normal' }
			]
		}
	)
}
