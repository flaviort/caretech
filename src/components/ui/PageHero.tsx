import Image from 'next/image'
import { Line } from './Line'

type PageHeroProps = {
	title: string[]
	lead: string
	image?: { src: string; alt: string }
	children?: React.ReactNode
}

export function PageHero({ title, lead, image, children }: PageHeroProps) {
	return (
		<section className='bg-paper pb-16 pt-36 md:pb-20 md:pt-52'>
			<div className='shell'>
				<div className='grid gap-10 lg:grid-cols-12 lg:items-end'>
					<div className='lg:col-span-8'>
						<h1 className='display-xl'>
							{title.map(line => (
								<Line key={line}>{line}</Line>
							))}
						</h1>
					</div>
					<div className='lg:col-span-4 lg:pb-2' data-intro-fade>
						<p className='body-l max-w-[36ch] text-muted'>{lead}</p>
						{children}
					</div>
				</div>

				{image && (
					<div className='relative mt-16 aspect-[4/3] overflow-hidden rounded-card bg-ink md:mt-24 md:aspect-[16/7]'>
						<div className='absolute -inset-y-[10%] inset-x-0' data-parallax='16'>
							<div className='absolute inset-0' data-intro-media>
								<Image src={image.src} alt={image.alt} fill priority sizes='100vw' className='object-cover' />
							</div>
						</div>
						<div className='absolute inset-0 bg-blue opacity-10 mix-blend-color' />
					</div>
				)}
			</div>
		</section>
	)
}
