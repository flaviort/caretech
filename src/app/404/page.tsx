// libraries
import clsx from 'clsx'
import Link from 'next/link'

// css
import styles from './index.module.scss'

// utils
import { pages } from '@/utils/routes'

export const metadata = {
	title: 'Erro 404 | CareTech IT'
}

export default function Error404() {
	return (
		<main className={styles.page}>
			<section className='pt-smaller pt-sm-small pt-md-medium pb-medium'>
				<div className='container'>
					<div className={styles.flex}>
					
						<h1 className='font-title uppercase text-45 bold'>
							Parece que você está perdido
						</h1>

						<p>
							A página que você está procurando não foi encontrada. Por favor verifique a URL e tente novamente.
						</p>

						<Link href={pages.home} className='button button--solid'>
							Voltar para a página inicial
						</Link>

					</div>
				</div>
			</section>

		</main>
	)
}
