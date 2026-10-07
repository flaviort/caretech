import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Check } from 'lucide-react'
import { Link } from '@/components/motion/Transition'
import { SectionTag } from '@/components/ui/SectionTag'
import { Arrow } from '@/components/ui/Button'
import { CasesCta } from '@/components/pages/CasesCta'
import { cases, getCase, routes } from '@/content/site'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumb, clip, graph, organization, pageMetadata, webPage } from '@/lib/seo'

type Props = { params: Promise<{ slug: string }> }

const casePath = (slug: string) => `${routes.cases}/${slug}`

export function generateStaticParams() {
	return cases.map(item => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params
	const item = getCase(slug)
	if (!item) return {}
	return pageMetadata({ title: item.title, description: clip(item.body), path: casePath(item.slug) })
}

export default async function CasePage({ params }: Props) {
	const { slug } = await params
	const item = getCase(slug)
	if (!item) notFound()

	const index = cases.findIndex(c => c.slug === slug)
	const next = cases[(index + 1) % cases.length]
	const path = casePath(item.slug)
	const trail = [
		{ name: 'Cases', path: routes.cases },
		{ name: item.title, path }
	]

	return (
		<>
			<JsonLd
				data={graph(
					webPage({
						path,
						name: item.title,
						description: clip(item.body),
						trail,
						extra: {
							mainEntity: {
								'@type': 'CreativeWork',
								name: item.title,
								abstract: item.body,
								genre: 'Case',
								inLanguage: 'pt-BR',
								creator: { '@id': organization['@id'] }
							}
						}
					}),
					breadcrumb(trail)
				)}
			/>

			<section className='bg-paper pb-28 pt-36 md:pb-40 md:pt-52'>
				<div className='shell grid gap-12 lg:grid-cols-12 lg:gap-6'>
					<div className='lg:col-span-5'>
						<div className='lg:sticky lg:top-28'>
							{/* plain text, not Line: the masked block would refuse to wrap under the floated tag */}
							<div className='display-l' data-intro-fade>
								<SectionTag
									index={`S.0${index + 1}`}
									label={`${item.code} · ${item.sector}`}
									className='statement-tag'
								/>
								<h1 className='max-w-[15ch]'>{item.title}</h1>
							</div>
							<p className='body-l mt-8 max-w-[42ch] text-muted' data-intro-fade>
								{item.body}
							</p>
						</div>
					</div>

					<div className='lg:col-span-7'>
						<div className='relative aspect-[4/3] overflow-hidden rounded-card bg-ink'>
							<div className='absolute -inset-y-[8%] inset-x-0' data-parallax='12'>
								<div className='absolute inset-0' data-intro-media>
									<Image
										src={item.image.src}
										alt={item.image.alt}
										fill
										priority
										sizes='(min-width: 1024px) 58vw, 100vw'
										className='object-cover'
									/>
								</div>
							</div>
							<div className='absolute inset-0 bg-blue opacity-10 mix-blend-color' />
						</div>

						<h2 className='label mt-12 text-muted'>Resultados</h2>
						<ul className='mt-4 grid gap-2 sm:grid-cols-2'>
							{item.results.map(result => (
								<li
									key={result}
									data-reveal
									className='flex min-h-32 flex-col justify-between gap-6 rounded-card bg-blue p-5 text-white transition-colors duration-300 hover:bg-ink md:min-h-40 md:p-6'
								>
									<span className='grid size-7 place-items-center rounded-[22%] bg-white text-blue'>
										<Check className='size-4' strokeWidth={2} aria-hidden='true' />
									</span>
									<span className='title-m'>{result}</span>
								</li>
							))}
						</ul>
					</div>
				</div>
			</section>

			<section className='bg-mist py-16 md:py-24'>
				<div className='shell'>
					<Link
						href={casePath(next.slug)}
						className='group grid gap-6 rounded-card bg-blue p-6 text-white transition-colors duration-500 ease-out-expo hover:bg-ink md:grid-cols-12 md:items-end md:p-10'
					>
						<span className='label text-white/75 md:col-span-12'>Próximo case · {next.code}</span>
						<span className='display-l md:col-span-10'>{next.title}</span>
						<span className='grid size-12 place-items-center justify-self-start rounded-md bg-white text-blue transition-colors group-hover:text-ink md:col-span-2 md:justify-self-end'>
							<Arrow className='size-4' />
						</span>
					</Link>
				</div>
			</section>

			<CasesCta />
		</>
	)
}
