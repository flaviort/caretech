// svg
import Logo from '@/assets/svg/logo/logo-vertical.svg'

// css
import styles from './index.module.scss'

export default async function Home() {
	return (
		<main className={styles.page}>
			<section className={styles.main}>
				<Logo />
			</section>
		</main>
	)
}
