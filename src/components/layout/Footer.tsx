import { Link } from '@/components/motion/Transition'
import { Logo } from '@/components/brand/Logo'
import { Button } from '@/components/ui/Button'
import { LiveClock } from '@/components/ui/LiveClock'
import { ShiftStrip } from '@/components/ui/ShiftStrip'
import { ConsentLink } from '@/components/consent/ConsentLink'
import { contact, nav, routes, services, site } from '@/content/site'

export function Footer() {
	return (
		<footer data-header='dark' className='relative bg-ink text-white'>
			<div className='shell pb-10 pt-28 md:pt-40'>
				<div className='grid gap-12 lg:grid-cols-12'>
					<h2 className='display-l lg:col-span-8' data-reveal>
						A evolução digital começa com decisões inteligentes.
					</h2>
					<div className='flex flex-col items-start gap-3 lg:col-span-4 lg:items-end lg:justify-end' data-reveal>
						<Button href={contact.whatsappHref} tone='blue' external>
							Falar no WhatsApp
						</Button>
						<Button href={routes.contact} tone='paper'>
							Enviar mensagem
						</Button>
					</div>
				</div>

				{/* operations board */}
				<div className='mt-24 grid gap-px overflow-hidden rounded-card bg-white/12 md:mt-32 md:grid-cols-12' data-reveal>
					<div className='bg-ink-2 p-5 md:col-span-3 md:p-6'>
						<p className='label text-muted-dark'>Horário de Brasília</p>
						<LiveClock seconds className='tnum mt-6 block text-[2.5rem] font-semibold leading-none tracking-[-0.04em] md:text-[3.25rem]' />
					</div>
					<div className='bg-ink-2 p-5 md:col-span-6 md:p-6'>
						<p className='label mb-6 text-muted-dark'>Agora</p>
						<ShiftStrip />
					</div>
					<div className='flex flex-col justify-between gap-6 bg-ink-2 p-5 md:col-span-3 md:p-6'>
						<p className='label text-muted-dark'>Cobertura</p>
						<div>
							<p className='title-m'>{contact.coverage}</p>
							<p className='mt-1 text-sm text-muted-dark'>Todo o território brasileiro</p>
						</div>
					</div>
					<a
						href={contact.whatsappHref}
						target='_blank'
						rel='noopener noreferrer'
						className='group flex flex-col items-start justify-between gap-4 bg-ink-2 p-5 transition-colors duration-300 hover:bg-blue sm:flex-row sm:items-center md:col-span-6 md:p-6'
					>
						<span className='label text-muted-dark group-hover:text-white/80'>WhatsApp</span>
						<span className='title-m tnum'>{contact.whatsappDisplay}</span>
					</a>
					<a
						href={`mailto:${contact.email}`}
						className='group flex flex-col items-start justify-between gap-4 bg-ink-2 p-5 transition-colors duration-300 hover:bg-blue sm:flex-row sm:items-center md:col-span-6 md:p-6'
					>
						<span className='label text-muted-dark group-hover:text-white/80'>E-mail</span>
						<span className='title-m break-words'>{contact.email}</span>
					</a>
				</div>

				<div className='mt-16 grid gap-10 md:mt-24 md:grid-cols-12 md:border-t md:border-white/15 md:pt-10'>
					<div className='md:col-span-5'>
						<Link href={routes.home} aria-label='CareTech, página inicial' className='inline-block rounded-sm'>
							<Logo className='h-10 w-auto' />
						</Link>
						<p className='mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-muted-dark'>
							{site.slogan.join(' ')}
						</p>
					</div>
					<div className='md:col-span-3'>
						<p className='label mb-4 text-muted-dark'>Navegação</p>
						<ul className='space-y-2 text-[0.9375rem]'>
							{nav.map(item => (
								<li key={item.href}>
									<Link href={item.href} className='text-white/85 transition-colors hover:text-white'>
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</div>
					<div className='md:col-span-4'>
						<p className='label mb-4 text-muted-dark'>Serviços</p>
						<ul className='space-y-2 text-[0.9375rem]'>
							{services.map(service => (
								<li key={service.slug}>
									<Link
										href={`${routes.services}/${service.slug}`}
										className='text-white/85 transition-colors hover:text-white'
									>
										{service.title}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className='label mt-16 flex flex-col gap-2 text-muted-dark md:flex-row md:justify-between'>
					<span>
						© {new Date().getFullYear()} {site.legalName}. Todos os direitos reservados.
					</span>
					<span className='flex gap-6'>
						<Link href={routes.privacy} className='hover:text-white'>
							LGPD & Compliance
						</Link>
						<ConsentLink className='label hover:text-white'>Cookies</ConsentLink>
					</span>
				</div>
			</div>
		</footer>
	)
}
