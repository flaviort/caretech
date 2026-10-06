import { Button } from '@/components/ui/Button'
import { contact, routes } from '@/content/site'

export function CasesCta() {
	return (
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
	)
}
