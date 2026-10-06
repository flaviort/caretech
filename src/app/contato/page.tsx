import type { Metadata } from 'next'
import { Line } from '@/components/ui/Line'
import { LiveClock } from '@/components/ui/LiveClock'
import { ContactForm } from '@/components/pages/ContactForm'
import { contact } from '@/content/site'

export const metadata: Metadata = {
	title: 'Contato',
	description: `Fale com a CareTech pelo WhatsApp ${contact.whatsappDisplay}, pelo e-mail ${contact.email} ou pelo formulário. Atendimento nacional.`
}

export default function ContatoPage() {
	return (
		<section className='bg-paper pb-28 pt-36 md:pb-40 md:pt-52'>
			<div className='shell grid gap-16 lg:grid-cols-12 lg:gap-6'>
				<div className='lg:col-span-5'>
					<h1 className='display-xl'>
						<Line>Vamos</Line>
						<Line>conversar.</Line>
					</h1>
					<p className='body-l mt-8 max-w-[34ch] text-muted' data-intro-fade>
						Conte o desafio da sua operação. Respondemos pelo canal que for melhor para você.
					</p>

					<div className='mt-12 grid gap-2' data-intro-fade>
						<a
							href={contact.whatsappHref}
							target='_blank'
							rel='noopener noreferrer'
							className='group flex items-end justify-between gap-4 rounded-card bg-blue p-5 text-white transition-colors duration-300 hover:bg-ink md:p-6'
						>
							<span>
								<span className='label block text-white/75'>WhatsApp</span>
								<span className='title-m tnum mt-6 block'>{contact.whatsappDisplay}</span>
							</span>
							<span className='label'>Abrir conversa</span>
						</a>
						<a
							href={`mailto:${contact.email}`}
							className='group flex items-end justify-between gap-4 rounded-card bg-mist p-5 transition-colors duration-300 hover:bg-ink hover:text-white md:p-6'
						>
							<span>
								<span className='label block text-muted group-hover:text-white/70'>E-mail</span>
								<span className='title-m mt-6 block break-all'>{contact.email}</span>
							</span>
						</a>
						<div className='grid grid-cols-2 gap-2'>
							<div className='rounded-card bg-mist p-5 md:p-6'>
								<span className='label block text-muted'>Cobertura</span>
								<span className='mt-6 block text-[1.0625rem] font-semibold tracking-[-0.015em]'>{contact.coverage}</span>
							</div>
							<div className='rounded-card bg-mist p-5 md:p-6'>
								<span className='label block text-muted'>Brasília</span>
								<LiveClock className='tnum mt-6 block text-[1.0625rem] font-semibold tracking-[-0.015em]' />
							</div>
						</div>
					</div>
				</div>

				<div className='lg:col-span-6 lg:col-start-7 lg:pt-4' data-intro-fade>
					<h2 className='sr-only'>Formulário de contato</h2>
					<ContactForm />
				</div>
			</div>
		</section>
	)
}
