import { ScrubText } from '@/components/ui/ScrubText'
import { SectionTag } from '@/components/ui/SectionTag'

export function Diferencial() {
	return (
		<section className='bg-paper pb-28 md:pb-40'>
			<div className='shell'>
				<div className='border-t border-line pt-10 md:pt-14'>
					<ScrubText
						className='max-w-[30ch] lg:max-w-[34ch]'
						before={<SectionTag index='S.04' label='Diferencial' className='statement-tag' />}
						text='Muitas empresas entregam tecnologia. A CareTech entrega tecnologia conectada aos objetivos estratégicos da organização.'
					/>
					<div className='mt-12 grid md:mt-20 md:grid-cols-12'>
						<p
							className='body-l max-w-[38ch] text-muted md:col-span-5 md:col-start-8'
							data-reveal
						>
							Nossa experiência em gestão, indicadores, processos e operações permite que cada solução
							tecnológica gere valor real para o negócio.
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}
