import { Hero } from '@/components/home/Hero'
import { Intro } from '@/components/home/Intro'
import { ServicesGrid } from '@/components/home/ServicesGrid'
import { Diagnostico } from '@/components/home/Diagnostico'
import { Diferencial } from '@/components/home/Diferencial'
import { CasesTeaser } from '@/components/home/CasesTeaser'
import { PhraseBand } from '@/components/ui/PhraseBand'
import type { Metadata } from 'next'
import { images, routes, site } from '@/content/site'
import { JsonLd } from '@/components/seo/JsonLd'
import { graph, pageMetadata, servicesList, webPage } from '@/lib/seo'

const title = `${site.legalName} | Consultoria em TI, Dados e Transformação Digital`
const description =
	'Gestão de TI, operações, dados, integrações e inteligência artificial para hospitais, clínicas e empresas. Experiência em ambientes críticos de saúde. Atendimento nacional.'

export const metadata: Metadata = pageMetadata({ title, description, path: routes.home, absoluteTitle: true })

export default function Home() {
	return (
		<>
			<JsonLd data={graph(webPage({ path: routes.home, name: title, description, extra: { mainEntity: servicesList } }))} />
			<Hero />
			<Intro />
			<ServicesGrid />
			<PhraseBand
				phrase='Tecnologia sem estratégia gera custos. Tecnologia com inteligência gera resultados.'
				image={images.band}
			/>
			<Diagnostico />
			<Diferencial />
			<CasesTeaser />
		</>
	)
}
