import Image from 'next/image'
import { CalendarCheck, History, Hospital, LayoutGrid, MapPin, ShieldCheck } from 'lucide-react'
import { ScrubText } from '@/components/ui/ScrubText'
import { SectionTag } from '@/components/ui/SectionTag'
import { Button } from '@/components/ui/Button'
import { images, routes, site } from '@/content/site'

const facts = [
	{ icon: CalendarCheck, value: String(site.founded), label: 'Ano de fundação' },
	{ icon: History, value: `${site.founderYears}+`, label: 'Anos de experiência do fundador' },
	{ icon: LayoutGrid, value: '6', label: 'Frentes de serviço' }
]

// facts that are statements, not quantities: set as text, never dressed as metrics
const statements = [
	{ icon: Hospital, title: 'Gestão integral de TI hospitalar', label: 'Instituição de grande porte' },
	{ icon: MapPin, title: 'Atendimento nacional', label: 'Todo o território brasileiro' },
	{ icon: ShieldCheck, title: 'Compromisso com a LGPD', label: 'Confidencialidade e segurança' }
]

export function Intro() {
	return (
		<section className='bg-paper pb-28 pt-28 md:pb-40 md:pt-36'>
			<div className='shell'>
				<ScrubText as='h2'
					className='max-w-[30ch] lg:max-w-[34ch]'
					before={<SectionTag index='S.01' label='Quem somos' className='statement-tag' />}
					text='A CareTech é especializada em Tecnologia da Informação, Inteligência de Dados e Transformação Digital, criada para ajudar organizações a evoluírem seus processos e usarem a tecnologia como diferencial estratégico.'
				/>

				<div className='mt-20 grid gap-6 md:mt-32 lg:grid-cols-12 lg:gap-4'>
					<div className='relative aspect-[4/3.4] overflow-hidden rounded-card bg-mist lg:col-span-6' data-reveal>
						<div className='absolute -inset-y-[8%] inset-x-0' data-parallax='14'>
							<Image
								src={images.intro.src}
								alt={images.intro.alt}
								fill
								sizes='(min-width: 1024px) 50vw, 100vw'
								className='object-cover'
							/>
						</div>
					</div>

					<div className='flex flex-col justify-between gap-12 lg:col-span-6 lg:pl-4'>
						<div>
						<dl className='grid grid-cols-3 gap-x-4'>
							{facts.map(({ icon: Icon, value, label }) => (
								<div key={label} className='flex flex-col gap-4 border-t border-line py-5 md:py-6' data-reveal>
									<Icon className='mt-1 size-5 shrink-0 text-ink md:size-6' strokeWidth={1.25} aria-hidden='true' />
									<div className='min-w-0'>
										<dd className='tnum text-[clamp(1.5rem,2.6vw,2.5rem)] font-semibold leading-none tracking-[-0.04em]'>
											{value}
										</dd>
										<dt className='label mt-2 text-muted'>{label}</dt>
									</div>
								</div>
							))}
						</dl>
						<ul className='border-b border-line'>
							{statements.map(({ icon: Icon, title, label }) => (
								<li key={title} className='flex items-center gap-4 border-t border-line py-4 md:gap-6' data-reveal>
									<Icon className='size-5 shrink-0 md:size-6' strokeWidth={1.25} aria-hidden='true' />
									<span className='flex-1 text-[1.0625rem] font-semibold tracking-[-0.015em] md:text-[1.25rem]'>{title}</span>
									<span className='label hidden text-muted sm:block'>{label}</span>
								</li>
							))}
						</ul>
						</div>

						<div className='max-w-sm self-end' data-reveal>
							<p className='text-[1.0625rem] font-medium leading-snug tracking-[-0.01em]'>
								Atuamos como parceiros de negócio: a tecnologia como ferramenta de crescimento, eficiência
								operacional e geração de valor.
							</p>
							<Button href={routes.about} className='mt-6'>
								Sobre nós
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
