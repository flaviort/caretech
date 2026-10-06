'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { useLenis } from 'lenis/react'
import clsx from 'clsx'
import { Link } from '@/components/motion/Transition'
import { LogoMark } from '@/components/brand/Logo'
import { gsap, useGSAP, ScrollTrigger, prefersReducedMotion } from '@/components/motion/gsap'
import { challenges } from '@/content/site'

// three.js only loads when this section mounts on a desktop that allows motion
const MarkThree = dynamic(() => import('./MarkThree'), { ssr: false })

const TICKS = 120
const r = (n: number) => Math.round(n * 1000) / 1000

function Dial({ className }: { className?: string }) {
	const ticks = Array.from({ length: TICKS }, (_, i) => {
		const angle = (i / TICKS) * Math.PI * 2 - Math.PI / 2
		const r1 = 47
		const r2 = i % 5 === 0 ? 43.5 : 45
		return (
			<line
				key={i}
				x1={r(50 + Math.cos(angle) * r1)}
				y1={r(50 + Math.sin(angle) * r1)}
				x2={r(50 + Math.cos(angle) * r2)}
				y2={r(50 + Math.sin(angle) * r2)}
			/>
		)
	})
	return (
		<svg viewBox='0 0 100 100' className={className} aria-hidden='true'>
			<g stroke='currentColor' strokeWidth='0.28' strokeLinecap='round'>
				{ticks}
			</g>
		</svg>
	)
}

// Pinned board: each challenge from CareTech's history lights up in turn and the dial turns to its answer.
export function Diagnostico() {
	const root = useRef<HTMLElement>(null)
	const stage = useRef<HTMLDivElement>(null)
	const progressRing = useRef<HTMLDivElement>(null)
	const [active, setActive] = useState(0)
	const activeRef = useRef(0)
	const velocity = useRef(0)
	const [use3d, setUse3d] = useState(false)

	useLenis(lenis => {
		velocity.current = lenis.velocity
	})

	useEffect(() => {
		const desktop = window.matchMedia('(min-width: 1024px)').matches
		const webgl = (() => {
			try {
				return !!document.createElement('canvas').getContext('webgl2')
			} catch {
				return false
			}
		})()
		setUse3d(desktop && webgl && !prefersReducedMotion())
	}, [])

	useGSAP(
		() => {
			const mm = gsap.matchMedia()
			mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
				const steps = challenges.length
				ScrollTrigger.create({
					trigger: stage.current,
					start: 'top top',
					end: () => `+=${window.innerHeight * steps * 0.75}`,
					pin: true,
					scrub: true,
					onUpdate: self => {
						progressRing.current?.style.setProperty('--p', String(self.progress))
						const index = Math.min(steps - 1, Math.floor(self.progress * steps))
						if (index !== activeRef.current) {
							activeRef.current = index
							setActive(index)
						}
					}
				})
			})
			return () => mm.revert()
		},
		{ scope: root }
	)

	const current = challenges[active]

	return (
		<section ref={root} className='bg-paper'>
			{/* desktop: pinned dial */}
			<div ref={stage} className='shell relative hidden h-[100svh] min-h-[680px] lg:block'>
				<h2 className='sr-only'>Desafios que resolvemos</h2>

				<div className='absolute inset-y-0 left-[clamp(1rem,2.25vw,2rem)] flex flex-col justify-center'>
					<ol className='space-y-0.5'>
						{challenges.map((item, i) => (
							<li
								key={item.code}
								className={clsx(
									'text-[clamp(1.5rem,2.3vw,2.5rem)] font-semibold leading-[1.04] tracking-[-0.04em] transition-colors duration-500',
									i === active ? 'text-ink' : 'text-ink/15'
								)}
							>
								{item.label}
							</li>
						))}
					</ol>
				</div>

				<div className='absolute left-1/2 top-1/2 aspect-square w-[min(36vw,62svh)] -translate-x-1/2 -translate-y-1/2'>
					<Dial className='absolute inset-0 size-full text-ink/12' />
					<div
						ref={progressRing}
						className='absolute inset-0 [--p:0] [mask-image:conic-gradient(#000_calc(var(--p)*1turn),transparent_0)]'
					>
						<Dial className='size-full text-blue' />
					</div>
					<div className='absolute inset-[18%] rounded-full bg-mist' />
					{use3d ? (
						<MarkThree active={active} velocity={velocity} className='absolute inset-[8%]' />
					) : (
						<div className='absolute inset-0 grid place-items-center'>
							<LogoMark className='size-[clamp(6rem,11vw,10rem)]' />
						</div>
					)}
					<span
						key={current.code}
						className='label tnum absolute inset-x-0 -bottom-10 text-center text-muted animate-[answer-in_0.8s_var(--ease-out-expo)_both]'
					>
						{current.code} [#{String(active + 1).padStart(2, '0')}]
					</span>
				</div>

				<div className='absolute inset-y-0 right-[clamp(1rem,2.25vw,2rem)] flex w-[clamp(16rem,22vw,20rem)] flex-col justify-center'>
					<div key={current.code} className='animate-[answer-in_0.8s_var(--ease-out-expo)_both]'>
						<h3 className='title-m'>{current.answer}</h3>
						<p className='mt-3 text-[0.9375rem] leading-relaxed text-muted'>{current.text}</p>
						<Link
							href={current.href}
							className='label mt-5 inline-flex items-center gap-2 border-b border-ink pb-1 transition-colors hover:border-blue hover:text-blue'
						>
							Saiba mais
						</Link>
					</div>
				</div>
			</div>

			{/* small screens: the same board as a list */}
			<div className='shell py-24 lg:hidden'>
				<h2 className='sr-only'>Desafios que resolvemos</h2>
				<ol className='border-b border-line'>
					{challenges.map((item, i) => (
						<li key={item.code} className='border-t border-line py-6' data-reveal>
							<div className='flex items-baseline justify-between gap-4'>
								<h3 className='text-[1.75rem] font-semibold leading-none tracking-[-0.04em]'>{item.label}</h3>
								<span className='label tnum text-muted'>#{String(i + 1).padStart(2, '0')}</span>
							</div>
							<p className='label mt-4 text-blue'>{item.answer}</p>
							<p className='mt-2 text-[0.9375rem] leading-relaxed text-muted'>{item.text}</p>
							<Link href={item.href} className='label mt-4 inline-block border-b border-ink pb-1'>
								Saiba mais
							</Link>
						</li>
					))}
				</ol>
			</div>
		</section>
	)
}
