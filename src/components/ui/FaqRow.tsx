'use client'

import { useRef } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/components/motion/gsap'

type FaqRowProps = { index: number; question: string; answer: string }

// The native <details> toggle, with the height animated. The browser's `open` flag is set before opening and
// cleared only after closing, so the answer stays in the HTML and the row still works without JS.
export function FaqRow({ index, question, answer }: FaqRowProps) {
	const details = useRef<HTMLDetailsElement>(null)
	const panel = useRef<HTMLDivElement>(null)
	const expanded = useRef(false)
	const tween = useRef<gsap.core.Tween | null>(null)

	const settle = () => {
		tween.current = null
		if (panel.current) gsap.set(panel.current, { clearProps: 'height,opacity' })
		// content below moved: let pinned sections and reveals recompute their positions
		ScrollTrigger.refresh()
	}

	const onSummaryClick = (event: React.MouseEvent) => {
		const el = details.current
		const body = panel.current
		if (!el || !body || prefersReducedMotion()) return
		event.preventDefault()

		tween.current?.kill()
		expanded.current = !expanded.current

		if (expanded.current) {
			el.removeAttribute('data-closing')
			if (!el.open) {
				el.open = true
				gsap.set(body, { height: 0, opacity: 0 })
			}
			tween.current = gsap.to(body, { height: 'auto', opacity: 1, duration: 0.7, ease: 'expo.out', onComplete: settle })
		} else {
			// flips the icon back to "+" right away instead of when the panel finishes closing
			el.setAttribute('data-closing', '')
			tween.current = gsap.to(body, {
				height: 0,
				opacity: 0,
				duration: 0.45,
				ease: 'power3.inOut',
				onComplete: () => {
					el.open = false
					el.removeAttribute('data-closing')
					settle()
				}
			})
		}
	}

	// keeps our state in step when the browser opens the row itself (find in page, reduced motion)
	const onToggle = () => {
		if (!tween.current && details.current) expanded.current = details.current.open
	}

	return (
		<details ref={details} className='group border-t border-line' data-reveal onToggle={onToggle}>
			<summary
				onClick={onSummaryClick}
				className='group/row flex cursor-pointer list-none items-center gap-4 px-1 py-5 transition-colors duration-300 hover:bg-blue hover:text-white md:gap-6 md:px-3 [&::-webkit-details-marker]:hidden'
			>
				<span className='label tnum text-muted transition-colors group-hover/row:text-white/75'>
					{String(index + 1).padStart(2, '0')}
				</span>
				<h3 className='flex-1 text-[clamp(1.125rem,1.6vw,1.5rem)] font-medium tracking-[-0.02em]'>{question}</h3>
				<span
					className='relative grid size-7 shrink-0 place-items-center rounded-[22%] bg-blue text-white transition-colors duration-300 group-hover/row:bg-white group-hover/row:text-blue'
					aria-hidden='true'
				>
					<span className='absolute h-px w-3 bg-current' />
					<span className='absolute h-3 w-px bg-current transition-transform duration-300 ease-out-expo [details[open]:not([data-closing])_&]:scale-y-0' />
				</span>
			</summary>
			<div ref={panel} className='overflow-hidden'>
				<p className='body-l max-w-[56ch] px-1 pb-8 pt-2 text-muted md:pl-[4.25rem]'>{answer}</p>
			</div>
		</details>
	)
}
