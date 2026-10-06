'use client'

import { useRef } from 'react'
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
	const ref = useRef<HTMLElement>(null)

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

	return (
		<Tag ref={ref as React.RefObject<never>} className={clsx('statement', className)}>
			{before}
			<span className='sr-only'>{text}</span>
			<span aria-hidden='true'>
				{words.map((word, i) => (
					<span key={i} data-word className='inline-block'>
						{word}
						{i < words.length - 1 ? ' ' : ''}
					</span>
				))}
			</span>
		</Tag>
	)
}
