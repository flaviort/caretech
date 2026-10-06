import Image from 'next/image'
import { Link } from '@/components/motion/Transition'
import { Line } from '@/components/ui/Line'
import { LiveClock } from '@/components/ui/LiveClock'
import { Arrow } from '@/components/ui/Button'
import { contact, images, routes, site } from '@/content/site'

function HeroCard({
	href,
	image,
	label,
	external
}: {
	href: string
	image: { src: string; alt: string }
	label: string
	external?: boolean
}) {
	return (
		<Link
			href={href}
			target={external ? '_blank' : undefined}
			rel={external ? 'noopener noreferrer' : undefined}
			className='group relative block aspect-[3/2] w-full overflow-hidden rounded-card bg-ink-2 ring-1 ring-white/10 sm:w-[13.5rem]'
		>
			<Image
				src={image.src}
				alt=''
				fill
				sizes='220px'
				className='object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-110'
			/>
			<span className='absolute inset-x-2 bottom-2 flex h-6 items-center gap-2 rounded-[4px] bg-white px-2 text-ink transition-colors duration-300 group-hover:bg-blue group-hover:text-white'>
				<Arrow className='size-4' />
				<span className='label text-[0.625rem]'>{label}</span>
			</span>
		</Link>
	)
}

export function Hero() {
	return (
		<section data-header='dark' className='relative h-[100svh] min-h-[640px] overflow-hidden bg-ink text-white'>
			<div className='absolute inset-0' data-parallax='18'>
				<div className='absolute inset-0' data-intro-media>
					<Image
						src={images.hero.src}
						alt={images.hero.alt}
						fill
						priority
						sizes='100vw'
						className='object-cover object-[60%_50%]'
					/>
				</div>
			</div>
			<div className='absolute inset-0 bg-ink/15' />
			<div className='absolute inset-0 bg-blue opacity-15 mix-blend-color' />
			<div className='absolute inset-0 bg-[linear-gradient(90deg,rgba(21,21,21,0.78)_0%,rgba(21,21,21,0.2)_60%,rgba(21,21,21,0.45)_100%)]' />
			<div className='absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(0deg,rgba(21,21,21,0.7),transparent)]' />

			<div className='shell relative flex h-full flex-col justify-end pb-6 md:justify-center md:pb-0'>
				<h1 className='max-w-[15ch] text-[clamp(2.625rem,4.6vw,5rem)] font-semibold leading-[0.95] tracking-[-0.042em]'>
					<Line>{site.slogan[0]}</Line>
					<Line>{site.slogan[1]}</Line>
				</h1>
				<p className='body-l mt-6 max-w-[34ch] text-white/75' data-intro-fade>
					Consultoria em TI, dados e transformação digital, nascida na gestão de ambientes hospitalares.
				</p>

				{/* readout under the headline block */}
				<div className='label mt-8 space-y-1 text-white/85 md:mt-10' data-intro-fade>
					<p>Desde {site.founded}</p>
					<p>+ {site.founderYears} anos em ambientes críticos</p>
					<p className='flex items-center gap-2'>
						<span className='size-2 rounded-[2px] bg-blue-2' aria-hidden='true' />
						Brasília <LiveClock className='tnum' />
					</p>
				</div>

				<div
					className='mt-8 grid grid-cols-2 gap-2 sm:flex md:absolute md:bottom-6 md:right-[clamp(1rem,2.25vw,2rem)] md:mt-0 md:gap-3'
					data-intro-fade
				>
					<HeroCard href={routes.services} image={images.heroCardA} label='Nossos serviços' />
					<HeroCard href={contact.whatsappHref} image={images.heroCardB} label='Fale no WhatsApp' external />
				</div>
			</div>
		</section>
	)
}
