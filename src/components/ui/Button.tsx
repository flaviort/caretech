import clsx from 'clsx'
import { Link } from '@/components/motion/Transition'

type ButtonProps = {
	href: string
	children: React.ReactNode
	tone?: 'ink' | 'paper' | 'blue'
	className?: string
	external?: boolean
}

// Line arrow in the same 1.25 stroke as the lucide icon set
export function Arrow({ className }: { className?: string }) {
	return (
		<svg viewBox='0 0 16 16' className={className} aria-hidden='true' fill='none'>
			<path d='M2.5 8h11M9 3.5 13.5 8 9 12.5' stroke='currentColor' strokeWidth='1.25' strokeLinecap='round' strokeLinejoin='round' />
		</svg>
	)
}

// Pill with a square chip, Cominvi's control shape. Hover inverts the chip to blue.
export function Button({ href, children, tone = 'ink', className, external }: ButtonProps) {
	const styles = {
		ink: 'bg-blue text-white [--chip:#fff] [--tri:#0367d7] hover:bg-ink hover:[--tri:#151515]',
		paper: 'bg-white text-ink [--chip:#151515] [--tri:#fff] hover:bg-blue hover:text-white hover:[--chip:#fff] hover:[--tri:#0367d7]',
		blue: 'bg-blue text-white [--chip:#fff] [--tri:#0367d7] hover:bg-ink hover:[--tri:#151515]'
	}[tone]

	return (
		<Link
			href={href}
			target={external ? '_blank' : undefined}
			rel={external ? 'noopener noreferrer' : undefined}
			className={clsx(
				'group label inline-flex h-10 items-center gap-6 rounded-md pl-4 pr-1 text-[0.6875rem] transition-colors duration-300 ease-out-expo',
				styles,
				className
			)}
		>
			<span>{children}</span>
			<span className='grid size-8 place-items-center rounded-[5px] bg-[var(--chip)] text-[var(--tri)] transition-[background-color,color] duration-300'>
				<Arrow className='size-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5' />
			</span>
		</Link>
	)
}
