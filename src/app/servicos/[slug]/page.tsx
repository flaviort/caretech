import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Link } from '@/components/motion/Transition'
import { Line } from '@/components/ui/Line'
import { ScrubText } from '@/components/ui/ScrubText'
import { SectionTag } from '@/components/ui/SectionTag'
import { BoardList } from '@/components/ui/BoardList'
import { Button, Arrow } from '@/components/ui/Button'
import { ServiceIcon } from '@/components/ui/ServiceIcon'
import { contact, getService, routes, services } from '@/content/site'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
	return services.map(service => ({ slug: service.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params
	const service = getService(slug)
	if (!service) return {}
	return { title: service.title, description: `${service.summary} ${service.lead}` }
}

export default async function ServicePage({ params }: Props) {
	const { slug } = await params
	const service = getService(slug)
	if (!service) notFound()

	const index = services.findIndex(s => s.slug === slug)
	const next = services[(index + 1) % services.length]

	return (
		<>
			<section data-header='dark' className='relative h-[92svh] min-h-[620px] overflow-hidden bg-ink text-white'>
				<div className='absolute inset-0' data-parallax='16'>
					<div className='absolute inset-0' data-intro-media>
						<Image src={service.image.src} alt={service.image.alt} fill priority sizes='100vw' className='object-cover' />
					</div>
				</div>
				<div className='absolute inset-0 bg-ink/40' />
				<div className='absolute inset-0 bg-blue opacity-15 mix-blend-color' />
				<div className='absolute inset-x-0 bottom-0 h-2/3 bg-[linear-gradient(0deg,rgba(21,21,21,0.85),transparent)]' />

				<div className='shell relative flex h-full flex-col justify-end pb-10 md:pb-14'>
					<div className='grid gap-10 lg:grid-cols-12 lg:items-end'>
						<h1
							className='display-xl lg:col-span-8'
							style={{ viewTransitionName: `svc-${service.code}` }}
						>
							<Line>{service.title}</Line>
						</h1>
						<div className='lg:col-span-4' data-intro-fade>
							<p className='body-l max-w-[34ch] text-white/80'>{service.summary}</p>
							<p className='label tnum mt-4 flex items-center gap-2 text-white/60'>
								<ServiceIcon code={service.code} className='size-4' />
								{service.code} [#{String(index + 1).padStart(2, '0')}/{String(services.length).padStart(2, '0')}]
							</p>
							<Button href={contact.whatsappHref} tone='blue' external className='mt-6'>
								Falar sobre este serviço
							</Button>
						</div>
					</div>
				</div>
			</section>

			<section className='bg-paper pb-28 pt-28 md:pb-40 md:pt-36'>
				<div className='shell'>
					<ScrubText
						className='max-w-[30ch] lg:max-w-[34ch]'
						before={<SectionTag index='S.01' label='Visão geral' className='statement-tag' />}
						text={service.lead}
					/>

					<div className='mt-20 grid gap-12 md:mt-28 lg:grid-cols-12'>
						<div className='lg:col-span-4'>
							<p className='label text-muted'>
								{service.listLabel} · {service.items.length} itens
							</p>
						</div>
						<BoardList className='lg:col-span-8' items={service.items} />
					</div>
				</div>
			</section>

			<section className='bg-mist py-28 md:py-40'>
				<div className='shell'>
					<blockquote className='display-l mx-auto max-w-[20ch] text-center'>
						<Line onScroll>{service.phrase}</Line>
					</blockquote>
				</div>
			</section>

			<section className='bg-paper py-16 md:py-24'>
				<div className='shell'>
					<Link
						href={`${routes.services}/${next.slug}`}
						kind='morph'
						className='group grid gap-6 rounded-card bg-blue p-6 text-white transition-colors duration-500 ease-out-expo hover:bg-ink md:grid-cols-12 md:items-end md:p-10'
					>
						<span className='label text-white/75 md:col-span-12'>
							Próximo serviço · {next.code}
						</span>
						<span
							data-vt={`svc-${next.code}`}
							className='display-l md:col-span-10'
						>
							{next.title}
						</span>
						<span className='grid size-12 place-items-center justify-self-start rounded-md bg-white text-blue transition-colors group-hover:text-ink md:col-span-2 md:justify-self-end'>
							<Arrow className='size-4' />
						</span>
					</Link>

					<ul className='mt-10 flex flex-wrap gap-2'>
						{services
							.filter(s => s.slug !== service.slug)
							.map(s => (
								<li key={s.slug}>
									<Link
										href={`${routes.services}/${s.slug}`}
										className='label inline-block rounded-md border border-line px-3 py-2.5 transition-colors hover:border-blue hover:bg-blue hover:text-white'
									>
										{s.short}
									</Link>
								</li>
							))}
					</ul>
				</div>
			</section>
		</>
	)
}
