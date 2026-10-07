'use client'

import { Fragment, useRef } from 'react'
import clsx from 'clsx'
import { gsap, useGSAP, prefersReducedMotion } from '@/components/motion/gsap'

type ScrubTextProps = {
	text: string
	className?: string
	before?: React.ReactNode
	tone?: 'light' | 'dark'
	as?: 'p' | 'h2' | 'blockquote'
}

// Words start greyed and fill in as the statement scrolls through the viewport.
export function ScrubText({ text, className, before, tone = 'light', as: Tag = 'p' }: ScrubTextProps) {
	const ref = useRef<HTMLDivElement>(null)

	useGSAP(
		() => {
			if (prefersReducedMotion() || !ref.current) return
			const words = ref.current.querySelectorAll('[data-word]')
			gsap.fromTo(
				words,
				{ opacity: tone === 'light' ? 0.16 : 0.22 },
				{
					opacity: 1,
					ease: 'none',
					stagger: 0.1,
					scrollTrigger: { trigger: ref.current, start: 'top 82%', end: 'bottom 52%', scrub: 0.6 }
				}
			)
		},
		{ scope: ref }
	)

	const words = text.split(' ')

	// The section tag floats beside the heading instead of inside it, so the heading's text is only the statement.
	// Words are rendered once: crawlers and screen readers read the same sentence the reader sees.
	return (
		<div ref={ref} className={clsx('statement', className)}>
			{before}
			<Tag className='[text-wrap:pretty]'>
				{words.map((word, i) => (
					<Fragment key={i}>
						<span data-word className='inline-block'>
							{word}
						</span>
						{i < words.length - 1 ? ' ' : null}
					</Fragment>
				))}
			</Tag>
		</div>
	)
}
