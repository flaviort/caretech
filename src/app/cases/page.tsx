import type { Metadata } from 'next'
import Image from 'next/image'
import { Check } from 'lucide-react'
import { PageHero } from '@/components/ui/PageHero'
import { SectionTag } from '@/components/ui/SectionTag'
import { Button } from '@/components/ui/Button'
import { cases, contact, routes } from '@/content/site'

export const metadata: Metadata = {
	title: 'Cases',
	description:
		'Gestão completa de TI para instituição hospitalar de grande porte e apoio especializado em migração de ERP.'
}

export default function CasesPage() {
	return (
		<>
			<PageHero
				title={['Onde a TI', 'não pode parar']}
				lead='Experiência em ambientes de alta criticidade e grande responsabilidade operacional. Os clientes são preservados por confidencialidade.'
			/>

			{cases.map((item, i) => (
				<section
					key={item.slug}
					id={item.slug}
					className={i % 2 === 0 ? 'scroll-mt-24 bg-paper pb-28 md:pb-40' : 'scroll-mt-24 bg-mist py-28 md:py-40'}
				>
					<div className='shell grid gap-12 lg:grid-cols-12 lg:gap-6'>
						<div className='lg:col-span-5'>
							<div className='lg:sticky lg:top-28'>
								<h2 className='display-l max-w-[15ch]' data-reveal>
									<SectionTag
										index={`S.0${i + 1}`}
										label={`${item.code} · ${item.sector}`}
										className='statement-tag'
									/>
									{item.title}
								</h2>
								<p className='body-l mt-8 max-w-[42ch] text-muted' data-reveal>
									{item.body}
								</p>
							</div>
						</div>

						<div className='lg:col-span-7'>
							<div className='relative aspect-[4/3] overflow-hidden rounded-card bg-ink' data-reveal>
								<div className='absolute -inset-y-[8%] inset-x-0' data-parallax='12'>
									<Image
										src={item.image.src}
										alt={item.image.alt}
										fill
										sizes='(min-width: 1024px) 58vw, 100vw'
										className='object-cover'
									/>
								</div>
								<div className='absolute inset-0 bg-blue opacity-10 mix-blend-color' />
							</div>

							<p className='label mt-12 text-muted'>Resultados</p>
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
			))}

			<section className='bg-paper py-24 md:py-32'>
				<div className='shell flex flex-col items-start justify-between gap-8 border-t border-line pt-12 md:flex-row md:items-end'>
					<p className='statement max-w-[22ch]' data-reveal>
						Sua operação também não pode parar? Vamos conversar.
					</p>
					<div className='flex flex-wrap gap-3' data-reveal>
						<Button href={contact.whatsappHref} tone='blue' external>
							Falar no WhatsApp
						</Button>
						<Button href={routes.contact}>Enviar mensagem</Button>
					</div>
				</div>
			</section>
		</>
	)
}
