import type { Metadata } from 'next'
import { PageHero } from '@/components/ui/PageHero'
import { CaseCard } from '@/components/home/CasesTeaser'
import { CasesCta } from '@/components/pages/CasesCta'
import { cases, routes } from '@/content/site'
import { JsonLd } from '@/components/seo/JsonLd'
import { absoluteUrl, breadcrumb, graph, pageMetadata, webPage } from '@/lib/seo'

const title = 'Cases: Gestão de TI Hospitalar e Migração de ERP'
const description =
	'Como a CareTech assumiu a gestão completa de TI de uma instituição hospitalar de grande porte e apoiou uma migração de ERP com saneamento e validação de dados.'

export const metadata: Metadata = pageMetadata({ title, description, path: routes.cases })

const trail = [{ name: 'Cases', path: routes.cases }]

export default function CasesPage() {
	return (
		<>
			<JsonLd
				data={graph(
					webPage({
						type: 'CollectionPage',
						path: routes.cases,
						name: title,
						description,
						trail,
						extra: {
							mainEntity: {
								'@type': 'ItemList',
								itemListElement: cases.map((item, i) => ({
									'@type': 'ListItem',
									position: i + 1,
									name: item.title,
									url: absoluteUrl(`${routes.cases}/${item.slug}`)
								}))
							}
						}
					}),
					breadcrumb(trail)
				)}
			/>
			<PageHero
				title={['Onde a TI', 'não pode parar']}
				lead='Experiência em ambientes de alta criticidade e grande responsabilidade operacional. Os clientes são preservados por confidencialidade.'
			/>

			<section className='bg-paper pb-28 md:pb-40'>
				<div className='shell grid gap-x-3 gap-y-12 md:grid-cols-2'>
					{cases.map((item, i) => (
						<div key={item.slug} data-reveal>
							<CaseCard item={item} priority={i === 0} headingAs='h2' />
						</div>
					))}
				</div>
			</section>

			<CasesCta />
		</>
	)
}
