import Image from 'next/image'
import { Link } from '@/components/motion/Transition'
import { Line } from '@/components/ui/Line'
import { cases, routes } from '@/content/site'

export function CaseCard({
	item,
	priority,
	headingAs: Heading = 'h3'
}: {
	item: (typeof cases)[number]
	priority?: boolean
	headingAs?: 'h2' | 'h3'
}) {
	return (
		<Link href={`${routes.cases}/${item.slug}`} className='group block'>
			<div className='relative aspect-[16/10] overflow-hidden rounded-card bg-ink'>
				<Image
					src={item.image.src}
					alt={item.image.alt}
					fill
					priority={priority}
					sizes='(min-width: 768px) 50vw, 100vw'
					className='object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-105'
				/>
				<div className='absolute inset-0 bg-blue opacity-10 mix-blend-color' />
				<span className='label absolute left-4 top-4 rounded-[3px] bg-white px-1.5 py-1 text-[0.625rem] leading-none text-ink'>
					{item.code} · {item.sector}
				</span>
			</div>
			<Heading className='mt-6 max-w-[18ch] text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-[1] tracking-[-0.04em] transition-colors duration-300 group-hover:text-blue'>
				{item.title}
			</Heading>
			<ul className='mt-6 border-b border-line'>
				{item.results.map(result => (
					<li key={result} className='flex items-center gap-3 border-t border-line py-3 text-[1rem] font-medium tracking-[-0.01em]'>
						<span className='size-2.5 shrink-0 rounded-[22%] bg-blue' aria-hidden='true' />
						{result}
					</li>
				))}
			</ul>
		</Link>
	)
}

export function CasesTeaser() {
	return (
		<section className='bg-mist pb-28 pt-32 md:pb-40 md:pt-44'>
			<div className='shell'>
				<div className='text-center'>
					<h2 className='display-xl'>
						<Line onScroll>Onde a TI</Line>
						<Line onScroll>não pode parar</Line>
					</h2>
					<p className='label mt-6 text-muted'>Cases de sucesso</p>
				</div>
				<div className='mt-20 grid gap-x-3 gap-y-12 md:mt-28 md:grid-cols-2'>
					{cases.map(item => (
						<div key={item.slug} data-reveal>
							<CaseCard item={item} />
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
