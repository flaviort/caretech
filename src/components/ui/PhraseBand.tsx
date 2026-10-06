import Image from 'next/image'

// Full-bleed photographic pause with one of the client's own impact phrases.
export function PhraseBand({ phrase, image }: { phrase: string; image: { src: string; alt: string } }) {
	return (
		<section data-header='dark' className='relative overflow-hidden bg-ink text-white'>
			<div className='absolute -inset-y-[12%] inset-x-0' data-parallax='20'>
				<Image src={image.src} alt='' fill sizes='100vw' className='object-cover' />
			</div>
			<div className='absolute inset-0 bg-ink/50' />
			<div className='absolute inset-0 bg-blue opacity-15 mix-blend-color' />
			<div className='shell relative flex min-h-[80svh] items-end py-16 md:min-h-[90svh] md:py-20'>
				<blockquote className='display-l max-w-[18ch]' data-reveal>
					<p>{phrase}</p>
				</blockquote>
			</div>
		</section>
	)
}
