import { Button } from '@/components/ui/Button'
import { Line } from '@/components/ui/Line'
import { routes } from '@/content/site'

export default function NotFound() {
	return (
		<section data-header='dark' className='shell flex min-h-[100svh] flex-col justify-end bg-ink pb-16 text-white'>
			<p className='label mb-6 text-muted-dark' data-intro-fade>
				Erro 404
			</p>
			<h1 className='display-xl max-w-[12ch]'>
				<Line>Esta página</Line>
				<Line>saiu do quadro.</Line>
			</h1>
			<p className='body-l mt-8 max-w-md text-white/75' data-intro-fade>
				O endereço pode ter mudado. Volte ao início ou veja os nossos serviços.
			</p>
			<div className='mt-10 flex flex-wrap gap-3' data-intro-fade>
				<Button href={routes.home} tone='paper'>
					Voltar ao início
				</Button>
				<Button href={routes.services} tone='blue'>
					Ver serviços
				</Button>
			</div>
		</section>
	)
}
