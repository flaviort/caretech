'use client'

import { forwardRef, useCallback, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from './gsap'
import { LogoMark } from '@/components/brand/Logo'

export type CurtainHandle = {
	cover: (origin?: { x: number; y: number }, label?: string) => Promise<void>
	reveal: () => Promise<void>
}

type Grid = { cols: number; rows: number; size: number }

// The logo's rounded-square module, tiled into a board that closes over the page and opens on the next one.
// Between transitions the board is display:none: no idle compositor layers, and iOS Safari 26 stops
// sampling its blue panel to tint the status bar and toolbar.
export const Curtain = forwardRef<CurtainHandle>(function Curtain(_, ref) {
	const root = useRef<HTMLDivElement>(null)
	const labelRef = useRef<HTMLSpanElement>(null)
	const markRef = useRef<HTMLDivElement>(null)
	const [grid, setGrid] = useState<Grid | null>(null)
	const [label, setLabel] = useState('')

	const measure = useCallback(() => {
		const w = window.innerWidth
		const h = window.innerHeight
		const target = w < 640 ? 56 : w < 1200 ? 84 : 104
		const cols = Math.ceil(w / target)
		const size = w / cols
		const rows = Math.ceil(h / size)
		setGrid({ cols, rows, size })
	}, [])

	useLayoutEffect(() => {
		measure()
		window.addEventListener('resize', measure)
		return () => window.removeEventListener('resize', measure)
	}, [measure])

	const tiles = () => gsap.utils.toArray<HTMLElement>('[data-tile]', root.current)

	// first paint: the board is closed (solid panel), then it opens onto the page
	useLayoutEffect(() => {
		if (!grid || !root.current) return
		const solid = root.current.querySelector<HTMLElement>('[data-solid]')
		if (!solid || solid.dataset.done) return
		solid.dataset.done = '1'
		if (prefersReducedMotion()) {
			gsap.set([solid, markRef.current], { autoAlpha: 0 })
			gsap.set(root.current, { pointerEvents: 'none', display: 'none' })
			window.dispatchEvent(new CustomEvent('page:enter'))
			return
		}
		gsap.set(tiles(), { scale: 1.2 })
		gsap.set(solid, { autoAlpha: 0 })
		const tl = gsap.timeline({ delay: 0.25 })
		tl.to(markRef.current, { autoAlpha: 0, scale: 0.9, duration: 0.5, ease: 'power2.in' })
		tl.to(
			tiles(),
			{
				scale: 0,
				duration: 0.55,
				ease: 'power3.inOut',
				stagger: { grid: [grid.rows, grid.cols], from: 'end', amount: 0.45 }
			},
			'-=0.15'
		)
		tl.call(() => window.dispatchEvent(new CustomEvent('page:enter')), [], '-=0.6')
		tl.set(root.current, { pointerEvents: 'none', display: 'none' })
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [grid])

	// failsafe: never leave the opening board closed, whatever happened to the intro timeline
	useLayoutEffect(() => {
		const id = window.setTimeout(() => {
			const el = root.current
			if (!el || el.style.pointerEvents === 'none') return
			gsap.set(tiles(), { scale: 0 })
			gsap.set([el.querySelector('[data-solid]'), markRef.current], { autoAlpha: 0 })
			gsap.set(el, { pointerEvents: 'none', display: 'none' })
			window.dispatchEvent(new CustomEvent('page:enter'))
		}, 4500)
		return () => window.clearTimeout(id)
	}, [])

	useImperativeHandle(
		ref,
		() => ({
			cover(origin, text = '') {
				return new Promise<void>(resolve => {
					if (!grid) return resolve()
					setLabel(text)
					const col = origin ? Math.min(grid.cols - 1, Math.floor(origin.x / grid.size)) : 0
					const row = origin ? Math.min(grid.rows - 1, Math.floor(origin.y / grid.size)) : 0
					gsap.set(root.current, { pointerEvents: 'auto', display: 'block' })
					gsap.set(labelRef.current, { autoAlpha: 0, y: 12 })
					const tl = gsap.timeline({ onComplete: () => resolve() })
					tl.to(tiles(), {
						scale: 1.2,
						duration: 0.42,
						ease: 'power3.in',
						stagger: { grid: [grid.rows, grid.cols], from: [row, col], amount: 0.32 }
					})
					tl.to(labelRef.current, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'expo.out' }, '-=0.12')
				})
			},
			reveal() {
				return new Promise<void>(resolve => {
					if (!grid) return resolve()
					const tl = gsap.timeline({
						onComplete: () => {
							gsap.set(root.current, { pointerEvents: 'none', display: 'none' })
							resolve()
						}
					})
					tl.to(labelRef.current, { autoAlpha: 0, y: -10, duration: 0.3, ease: 'power2.in' })
					tl.to(
						tiles(),
						{
							scale: 0,
							duration: 0.5,
							ease: 'power3.inOut',
							stagger: { grid: [grid.rows, grid.cols], from: 'end', amount: 0.36 }
						},
						'-=0.05'
					)
				})
			}
		}),
		[grid]
	)

	return (
		<div ref={root} id='curtain' aria-hidden='true' className='fixed inset-0 z-[100] overflow-hidden'>
			{grid && (
				<div
					className='absolute left-0 top-0 grid'
					style={{
						gridTemplateColumns: `repeat(${grid.cols}, ${grid.size}px)`,
						gridAutoRows: `${grid.size}px`
					}}
				>
					{Array.from({ length: grid.cols * grid.rows }, (_, i) => (
						<div key={i} className='relative'>
							<div data-tile className='absolute inset-0 scale-0 rounded-[22%] bg-blue will-change-transform' />
						</div>
					))}
				</div>
			)}

			<div data-solid className='absolute inset-0 bg-blue' />

			<div ref={markRef} className='pointer-events-none absolute inset-0 grid place-items-center'>
				<LogoMark mono className='size-14 text-white md:size-16' />
			</div>

			<div className='pointer-events-none absolute inset-0 grid place-items-center'>
				<span ref={labelRef} className='label invisible text-[0.8125rem] text-white'>
					{label}
				</span>
			</div>

		</div>
	)
})
