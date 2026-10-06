import type { Metadata } from 'next'
import { Link } from '@/components/motion/Transition'
import { PageHero } from '@/components/ui/PageHero'
import { PhraseBand } from '@/components/ui/PhraseBand'
import { ServiceIcon } from '@/components/ui/ServiceIcon'
import { Arrow } from '@/components/ui/Button'
import { CursorPreview } from '@/components/pages/CursorPreview'
import { images, routes, services } from '@/content/site'

export const metadata: Metadata = {
	title: 'Serviços',
	description:
		'Gestão estratégica de TI, operações e sustentação, especialistas sob demanda, dados e analytics, integrações e automações e inteligência artificial.'
}

export default function ServicosPage() {
	return (
		<>
			<PageHero
				title={['Seis frentes,', 'um parceiro']}
				lead='Da gestão da TI à inteligência artificial, cada serviço conectado aos objetivos estratégicos da sua organização.'
			/>

			<section className='bg-paper pb-28 md:pb-40'>
				<CursorPreview
					className='shell'
					items={services.map(service => ({ key: service.slug, src: service.image.src }))}
				>
					<ol className='border-b border-line'>
						{services.map((service, i) => (
							<li key={service.slug} data-reveal data-preview={service.slug}>
								<Link
									href={`${routes.services}/${service.slug}`}
									kind='morph'
									className='group relative grid grid-cols-[auto_1fr_auto] items-center gap-x-4 gap-y-3 border-t border-line py-6 transition-colors duration-500 ease-out-expo hover:bg-blue hover:text-white md:grid-cols-12 md:gap-x-6 md:px-3 md:py-8'
								>
									<span className='label tnum text-muted transition-colors group-hover:text-white/75 md:col-span-1'>
										{service.code} [#{String(i + 1).padStart(2, '0')}]
									</span>
									<h2
										data-vt={`svc-${service.code}`}
										className='col-span-2 row-start-2 text-[clamp(1.75rem,3.4vw,3.5rem)] font-semibold leading-[0.98] tracking-[-0.04em] md:col-span-6 md:row-start-auto'
									>
										{service.title}
									</h2>
									<p className='col-span-3 text-[0.9375rem] leading-relaxed text-muted transition-colors group-hover:text-white/85 md:col-span-3'>
										{service.summary}
									</p>
									<span className='col-start-3 row-start-1 flex items-center justify-end gap-4 md:col-span-2 md:col-start-auto md:row-start-auto'>
										<ServiceIcon code={service.code} className='hidden size-7 lg:block' />
										<span className='grid size-9 place-items-center rounded-[5px] bg-blue text-white transition-colors duration-500 group-hover:bg-white group-hover:text-blue'>
											<Arrow className='size-4' />
										</span>
									</span>
								</Link>
							</li>
						))}
					</ol>
				</CursorPreview>
			</section>

			<PhraseBand phrase='Transformamos dados em decisões e decisões em resultados.' image={images.pe} />
		</>
	)
}
