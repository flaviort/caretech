import { Hero } from '@/components/home/Hero'
import { Intro } from '@/components/home/Intro'
import { ServicesGrid } from '@/components/home/ServicesGrid'
import { Diagnostico } from '@/components/home/Diagnostico'
import { Diferencial } from '@/components/home/Diferencial'
import { CasesTeaser } from '@/components/home/CasesTeaser'
import { PhraseBand } from '@/components/ui/PhraseBand'
import { images } from '@/content/site'

export default function Home() {
	return (
		<>
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
