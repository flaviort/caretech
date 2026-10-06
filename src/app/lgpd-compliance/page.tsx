import type { Metadata } from 'next'
import { PageHero } from '@/components/ui/PageHero'
import { ScrubText } from '@/components/ui/ScrubText'
import { SectionTag } from '@/components/ui/SectionTag'
import { BoardList } from '@/components/ui/BoardList'
import { compliance, contact, routes } from '@/content/site'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumb, graph, pageMetadata, webPage } from '@/lib/seo'

const title = 'LGPD e Compliance'
const description =
	'Como a CareTech protege dados pessoais, cumpre a Lei Geral de Proteção de Dados (LGPD) e conduz suas atividades com ética, integridade e segurança da informação.'

export const metadata: Metadata = pageMetadata({ title, description, path: routes.privacy })

const trail = [{ name: 'LGPD & Compliance', path: routes.privacy }]

export default function LgpdPage() {
	return (
		<>
			<JsonLd data={graph(webPage({ path: routes.privacy, name: title, description, trail }), breadcrumb(trail))} />
			<PageHero
				title={['Privacidade', 'e integridade']}
				lead='A CareTech está comprometida com a proteção dos dados pessoais e o cumprimento da Lei Geral de Proteção de Dados (LGPD).'
			/>

			<section className='bg-paper pb-28 pt-8 md:pb-40'>
				<div className='shell'>
					<ScrubText as='h2'
						className='max-w-[30ch] lg:max-w-[34ch]'
						before={<SectionTag index='S.01' label='LGPD' className='statement-tag' />}
						text='Adotamos medidas técnicas, administrativas e organizacionais para garantir a confidencialidade, integridade e disponibilidade das informações sob nossa responsabilidade.'
					/>
					<p className='body-l mt-10 max-w-[52ch] text-muted' data-reveal>
						Para exercer seus direitos como titular de dados ou tirar dúvidas sobre o tratamento de informações
						pessoais, escreva para{' '}
						<a href={`mailto:${contact.email}`} className='text-ink underline hover:text-blue'>
							{contact.email}
						</a>
						.
					</p>
				</div>
			</section>

			<section className='bg-mist pb-28 pt-28 md:pb-40 md:pt-36'>
				<div className='shell'>
					<ScrubText as='h2'
						className='max-w-[30ch] lg:max-w-[34ch]'
						before={<SectionTag index='S.02' label='Compliance' className='statement-tag' />}
						text='A CareTech conduz suas atividades pautada pelos mais elevados padrões éticos, respeitando legislações, regulamentações e boas práticas de governança corporativa.'
					/>
					<div className='mt-20 grid gap-12 md:mt-28 lg:grid-cols-12'>
						<p className='label text-muted lg:col-span-4'>Mantemos o compromisso com</p>
						<BoardList className='lg:col-span-8' items={compliance} />
					</div>
				</div>
			</section>
		</>
	)
}
