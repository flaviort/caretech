import type { Metadata } from 'next'
import { PageHero } from '@/components/ui/PageHero'
import { ScrubText } from '@/components/ui/ScrubText'
import { SectionTag } from '@/components/ui/SectionTag'
import { BoardList } from '@/components/ui/BoardList'
import { Button } from '@/components/ui/Button'
import { Line } from '@/components/ui/Line'
import { challenges, images, routes, site, values } from '@/content/site'

export const metadata: Metadata = {
	title: 'Sobre',
	description:
		'Fundada em 2022, a CareTech nasceu de mais de 15 anos de experiência em ambientes corporativos complexos, especialmente na saúde.'
}

export default function SobrePage() {
	return (
		<>
			<PageHero
				title={['Nossa', 'história']}
				lead='A CareTech surgiu da necessidade identificada ao longo de anos de atuação profissional em Tecnologia da Informação.'
				image={images.about}
			/>

			<section className='bg-paper pb-28 pt-16 md:pb-40 md:pt-28'>
				<div className='shell'>
					<ScrubText
						className='max-w-[30ch] lg:max-w-[34ch]'
						before={<SectionTag index='S.01' label='Origem' className='statement-tag' />}
						text={`Fundada em ${site.founded}, a CareTech nasceu da experiência de mais de ${site.founderYears} anos do seu fundador em ambientes corporativos complexos, especialmente na saúde, onde disponibilidade, segurança da informação e qualidade dos processos são críticas.`}
					/>

					<div className='mt-20 grid gap-12 md:mt-32 lg:grid-cols-12'>
						<div className='lg:col-span-4'>
							<p className='body-l max-w-[30ch]' data-reveal>
								Durante essa trajetória, foi possível observar desafios recorrentes enfrentados pelas
								organizações.
							</p>
						</div>
						<BoardList className='lg:col-span-8' label='Desafios recorrentes' items={challenges.map(c => c.full)} />
					</div>
				</div>
			</section>

			<section data-header='dark' className='bg-ink pb-28 pt-28 text-white md:pb-40 md:pt-40'>
				<div className='shell'>
					<h2 className='display-l max-w-[16ch]'>
						<Line onScroll>Com base nessa realidade,</Line>
						<Line onScroll>nasceu a CareTech.</Line>
					</h2>
					<div className='mt-16 grid gap-10 md:mt-24 md:grid-cols-2 lg:grid-cols-12'>
						<p className='body-l text-white/75 lg:col-span-5' data-reveal>
							Mais do que uma prestadora de serviços, a empresa foi criada para atuar como parceira estratégica
							de seus clientes, auxiliando desde operações técnicas até projetos complexos de transformação
							tecnológica.
						</p>
						<p className='body-l text-white lg:col-span-5 lg:col-start-8' data-reveal>
							Em sua trajetória, destaca-se a assunção da gestão completa da área de Tecnologia da Informação de
							uma importante instituição hospitalar, consolidando sua experiência em ambientes de alta
							criticidade e grande responsabilidade operacional.
						</p>
					</div>

					<div className='mt-24 grid gap-px overflow-hidden rounded-card bg-white/12 md:mt-32 md:grid-cols-2'>
						<div className='bg-ink-2 p-6 md:p-10' data-reveal>
							<p className='label text-blue-2'>Missão</p>
							<p className='title-m mt-8 max-w-[30ch]'>
								Capacitar organizações a alcançarem níveis superiores de eficiência, inovação e inteligência por
								meio da transformação digital, da gestão estratégica da tecnologia e da utilização inteligente
								dos dados.
							</p>
						</div>
						<div className='bg-ink-2 p-6 md:p-10' data-reveal>
							<p className='label text-blue-2'>Visão</p>
							<p className='title-m mt-8 max-w-[30ch]'>
								Ser reconhecida como uma das principais consultorias brasileiras em Transformação Digital,
								Inteligência de Dados e Gestão Estratégica de Tecnologia, tornando-se parceira indispensável na
								evolução dos negócios de nossos clientes.
							</p>
						</div>
					</div>
				</div>
			</section>

			<section className='bg-mist pb-28 pt-28 md:pb-40 md:pt-36'>
				<div className='shell'>
					<ScrubText
						className='max-w-[30ch] lg:max-w-[34ch]'
						before={<SectionTag index='S.02' label='Valores' className='statement-tag' />}
						text='Transformamos tecnologia em vantagem competitiva.'
					/>
					<p className='body-l mt-8 max-w-[52ch] text-muted' data-reveal>
						Ajudamos organizações a evoluírem sua maturidade tecnológica, estruturarem processos, transformarem
						dados em inteligência e utilizarem a tecnologia como impulsionadora de crescimento e inovação.
					</p>

					<ul className='mt-16 grid grid-cols-2 gap-2 md:mt-24 md:grid-cols-3 lg:grid-cols-4 lg:gap-3'>
						{values.map((value, i) => (
							<li
								key={value}
								data-reveal
								className='group flex aspect-[5/3] flex-col justify-between rounded-card bg-paper p-4 transition-colors duration-500 ease-out-expo hover:bg-blue hover:text-white md:p-6'
							>
								<span className='flex items-center justify-between'>
									<span
										className='size-3 rounded-[22%] bg-blue transition-colors duration-500 group-hover:bg-white'
										aria-hidden='true'
									/>
									<span className='label tnum text-muted group-hover:text-white/75'>
										{String(i + 1).padStart(2, '0')}
									</span>
								</span>
								<span className='text-[clamp(1.125rem,1.8vw,1.75rem)] font-semibold leading-[1.05] tracking-[-0.03em]'>
									{value}
								</span>
							</li>
						))}
						<li className='flex aspect-[5/3] flex-col justify-between rounded-card bg-blue p-4 text-white md:p-6'>
							<span className='label text-white/70'>Slogan</span>
							<span className='text-[clamp(1rem,1.5vw,1.375rem)] font-semibold leading-[1.1] tracking-[-0.02em]'>
								{site.slogan[0]} {site.slogan[1]}
							</span>
						</li>
					</ul>
				</div>
			</section>

			<section className='bg-paper pb-28 pt-28 md:pb-40 md:pt-36'>
				<div className='shell'>
					<ScrubText
						className='max-w-[30ch] lg:max-w-[34ch]'
						before={<SectionTag index='S.03' label='Hoje' className='statement-tag' />}
						text='Hoje, a CareTech abrange todo o território nacional, oferecendo soluções especializadas, consultoria estratégica, outsourcing, gestão de TI, Business Intelligence, automação e alocação de profissionais qualificados.'
					/>
					<div className='mt-12 flex flex-wrap gap-3 md:mt-16' data-reveal>
						<Button href={routes.services}>Conheça os serviços</Button>
						<Button href={routes.cases} tone='blue'>
							Ver cases
						</Button>
					</div>
				</div>
			</section>
		</>
	)
}
