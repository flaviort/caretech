import { Link } from '@/components/motion/Transition'
import { ScrubText } from '@/components/ui/ScrubText'
import { SectionTag } from '@/components/ui/SectionTag'
import { ServiceIcon } from '@/components/ui/ServiceIcon'
import { Button, Arrow } from '@/components/ui/Button'
import { routes, services } from '@/content/site'

export function ServiceCard({ service }: { service: (typeof services)[number] }) {
	return (
		<Link
			href={`${routes.services}/${service.slug}`}
			kind='morph'
			className='group relative flex min-h-72 flex-col gap-8 sm:aspect-[4/3.4] sm:min-h-0 justify-between overflow-hidden rounded-card bg-paper p-5 text-ink transition-colors duration-500 ease-out-expo hover:bg-blue hover:text-white md:p-6'
		>
			<div className='flex items-start justify-between'>
				<ServiceIcon code={service.code} className='size-7 md:size-8' />
				<span className='label text-muted transition-colors duration-500 group-hover:text-white/70'>{service.code}</span>
			</div>

			<div>
				<ul className='mb-6 space-y-1.5 text-[0.9375rem] leading-snug tracking-[-0.01em] text-muted transition-colors duration-500 group-hover:text-white/85'>
					{service.items.slice(0, 4).map(item => (
						<li key={item} className='flex items-center gap-2'>
							<span className='size-2 shrink-0 rounded-[22%] bg-blue transition-colors duration-500 group-hover:bg-white' aria-hidden='true' />
							{item}
						</li>
					))}
					{service.items.length > 4 && (
						<li className='pl-3.5'>
							e mais {service.items.length - 4} {service.items.length - 4 === 1 ? 'item' : 'itens'}
						</li>
					)}
				</ul>
				<div className='flex items-end justify-between gap-4'>
					<h3 className='title-m max-w-[16ch]' data-vt={`svc-${service.code}`}>
						{service.title}
					</h3>
					<span className='grid size-8 shrink-0 place-items-center rounded-[5px] bg-blue text-white transition-colors duration-500 group-hover:bg-white group-hover:text-blue'>
						<Arrow className='size-4' />
					</span>
				</div>
			</div>
		</Link>
	)
}

export function ServicesGrid() {
	return (
		<section className='bg-mist pb-24 pt-28 md:pb-32 md:pt-36'>
			<div className='shell'>
				<ScrubText as='h2'
					className='max-w-[30ch] lg:max-w-[34ch]'
					before={<SectionTag index='S.02' label='Nossos serviços' className='statement-tag' />}
					text='Seis frentes de atuação, da gestão estratégica da TI à inteligência artificial, sempre conectadas aos objetivos do negócio.'
				/>

				<div className='mt-16 grid gap-2 sm:grid-cols-2 md:mt-28 lg:grid-cols-3 lg:gap-3'>
					{services.map(service => (
						<div key={service.slug} data-reveal>
							<ServiceCard service={service} />
						</div>
					))}
				</div>

				<div className='mt-8 flex justify-end'>
					<Button href={routes.services}>Ver todos os serviços</Button>
				</div>
			</div>
		</section>
	)
}
