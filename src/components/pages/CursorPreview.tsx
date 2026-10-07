'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import { gsap, prefersReducedMotion } from '@/components/motion/gsap'

type Preview = { key: string; src: string }

// One floating picture that trails the cursor over a list. Rows mark themselves with
// data-preview="<key>"; the picture sits below and right of the pointer so it never covers
// the line being read, leans a little with horizontal speed, and cross-fades between rows.
// Fine-pointer desktops only; touch and reduced motion get nothing.
export function CursorPreview({
	items,
	children,
	className
}: {
	items: Preview[]
	children: React.ReactNode
	className?: string
}) {
	const area = useRef<HTMLDivElement>(null)
	const card = useRef<HTMLDivElement>(null)
	const [active, setActive] = useState<string | null>(null)
	const [enabled, setEnabled] = useState(false)
	const OFFSET = 12 // px from the pointer to the card's top-left corner

	useEffect(() => {
		setEnabled(window.matchMedia('(hover: hover) and (pointer: fine)').matches && !prefersReducedMotion())
	}, [])

	useEffect(() => {
		if (!enabled || !area.current || !card.current) return
		const el = card.current
		const x = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power3.out' })
		const y = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power3.out' })
		const rotate = gsap.quickTo(el, 'rotation', { duration: 0.8, ease: 'power3.out' })
		gsap.set(el, { transformOrigin: '0% 0%' })
		let lastX = 0
		let settle: gsap.core.Tween | null = null

		const onMove = (event: PointerEvent) => {
			x(event.clientX + OFFSET)
			y(event.clientY + OFFSET)
			rotate(gsap.utils.clamp(-8, 8, (event.clientX - lastX) * 0.4))
			lastX = event.clientX
			// lean back upright once the pointer rests
			settle?.kill()
			settle = gsap.delayedCall(0.12, () => rotate(0))
			const row = (event.target as HTMLElement).closest<HTMLElement>('[data-preview]')
			setActive(row?.dataset.preview ?? null)
		}
		const onEnter = (event: PointerEvent) => {
			gsap.set(el, { x: event.clientX + OFFSET, y: event.clientY + OFFSET })
			lastX = event.clientX
		}
		const onLeave = () => setActive(null)

		const node = area.current
		node.addEventListener('pointermove', onMove)
		node.addEventListener('pointerenter', onEnter)
		node.addEventListener('pointerleave', onLeave)
		window.addEventListener('page:leave', onLeave)
		return () => {
			node.removeEventListener('pointermove', onMove)
			node.removeEventListener('pointerenter', onEnter)
			node.removeEventListener('pointerleave', onLeave)
			window.removeEventListener('page:leave', onLeave)
			settle?.kill()
		}
	}, [enabled])

	return (
		<div ref={area} className={className}>
			{children}
			{enabled && (
				// outer layer: GSAP owns its transform (position, lean); inner layer: CSS owns scale and fade
				<div ref={card} aria-hidden='true' className='pointer-events-none fixed left-0 top-0 z-40'>
					<div
						className={clsx(
							'relative aspect-[4/3] w-[clamp(14rem,20vw,19rem)] origin-top-left overflow-hidden rounded-card transition-[opacity,scale] duration-500 ease-out-expo',
							active ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
						)}
					>
					{items.map(item => (
						<Image
							key={item.key}
							src={item.src}
							alt=''
							fill
							sizes='304px'
							className={clsx(
								'object-cover transition-opacity duration-300',
								active === item.key ? 'opacity-100' : 'opacity-0'
							)}
						/>
					))}
					</div>
				</div>
			)}
		</div>
	)
}
