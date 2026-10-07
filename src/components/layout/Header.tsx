'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { useLenis } from 'lenis/react'
import { gsap, prefersReducedMotion } from '@/components/motion/gsap'
import { Link } from '@/components/motion/Transition'
import { Logo } from '@/components/brand/Logo'
import { contact, nav, routes, services } from '@/content/site'

// Sections painted on ink declare data-header="dark"; the header reads whatever sits under it.
function useHeaderTone() {
	const [dark, setDark] = useState(true)

	const check = useCallback(() => {
		const probe = 36
		const sections = document.querySelectorAll<HTMLElement>('[data-header="dark"]')
		let isDark = false
		sections.forEach(section => {
			const rect = section.getBoundingClientRect()
			if (rect.top <= probe && rect.bottom >= probe) isDark = true
		})
		setDark(isDark)
	}, [])

	useLenis(check)

	useEffect(() => {
		check()
		window.addEventListener('scroll', check, { passive: true })
		window.addEventListener('page:enter', check)
		return () => {
			window.removeEventListener('scroll', check)
			window.removeEventListener('page:enter', check)
		}
	}, [check])

	return dark
}

// Cominvi behaviour: the bar steps out of the way while reading down and returns once the reader
// has scrolled back up a deliberate 50px, so a small correction mid-paragraph does not bring it back.
const REVEAL_AFTER = 50

function useHeaderHidden() {
	const [hidden, setHidden] = useState(false)
	useEffect(() => {
		// Lenis scrolls the window, so native scroll events cover both smooth and touch scrolling
		let last = window.scrollY
		let turn = last // deepest point of the current downward run
		const onScroll = () => {
			const y = window.scrollY
			if (y < 120) setHidden(false)
			else if (y > last) {
				turn = y
				if (y - last > 4) setHidden(true)
			} else if (turn - y >= REVEAL_AFTER) setHidden(false)
			last = y
		}
		const reset = () => setHidden(false)
		window.addEventListener('scroll', onScroll, { passive: true })
		window.addEventListener('page:enter', reset)
		return () => {
			window.removeEventListener('scroll', onScroll)
			window.removeEventListener('page:enter', reset)
		}
	}, [])
	return hidden
}

export function Header() {
	const [open, setOpen] = useState(false)
	const dark = useHeaderTone()
	const hidden = useHeaderHidden() && !open
	const lenis = useLenis()
	const toggle = useRef<HTMLButtonElement>(null)
	const panel = useRef<HTMLElement>(null)
	const firstRun = useRef(true)

	// The page is a card lowered to reveal the menu behind it. It is clipped at the current scroll
	// position first, so whatever sits above the viewport never shows in the gap, then GSAP lowers it.
	useEffect(() => {
		const page = document.getElementById('page')
		if (!page || !panel.current) return
		if (firstRun.current) {
			firstRun.current = false
			if (!open) return
		}

		const reduced = prefersReducedMotion()
		const links = panel.current.querySelectorAll('[data-menu-item]')
		document.documentElement.classList.toggle('menu-open', open)
		gsap.killTweensOf([page, links])

		if (open) {
			lenis?.stop()
			const height = panel.current.offsetHeight
			// scale from the top edge of what is on screen, so the card insets evenly at any scroll depth;
			// the side gutter matches the page shell padding
			const gutter = Math.min(32, Math.max(16, window.innerWidth * 0.0225))
			const scale = 1 - (gutter * 2) / window.innerWidth
			gsap.set(page, {
				clipPath: `inset(${window.scrollY}px 0px 0px 0px round 12px)`,
				transformOrigin: `50% ${window.scrollY}px`,
				willChange: 'transform'
			})
			gsap.to(page, { y: height, scale, force3D: true, duration: reduced ? 0 : 1.5, ease: 'power3.inOut' })
			if (!reduced) {
				gsap.fromTo(
					links,
					{ yPercent: 110 },
					{ yPercent: 0, duration: 1.2, ease: 'expo.out', stagger: 0.05, delay: 0.45 }
				)
			}
		} else {
			gsap.to(page, {
				y: 0,
				scale: 1,
				force3D: true,
				duration: reduced ? 0 : 1.2,
				ease: 'power3.inOut',
				onComplete: () => {
					gsap.set(page, { clearProps: 'transform,clipPath,willChange' })
					lenis?.start()
				}
			})
		}
	}, [open, lenis])

	useEffect(() => {

		const onKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape' && open) {
				setOpen(false)
				toggle.current?.focus()
			}
		}
		const onLeave = () => setOpen(false)
		if (!open) return
		window.addEventListener('keydown', onKey)
		window.addEventListener('page:leave', onLeave)
		return () => {
			window.removeEventListener('keydown', onKey)
			window.removeEventListener('page:leave', onLeave)
		}
	}, [open, lenis])

	// clicking the lowered page closes the menu, like setting a card back down
	useEffect(() => {
		if (!open) return
		const page = document.getElementById('page')
		const close = (event: MouseEvent) => {
			event.preventDefault()
			event.stopPropagation()
			setOpen(false)
		}
		page?.addEventListener('click', close, { capture: true })
		return () => page?.removeEventListener('click', close, { capture: true })
	}, [open])

	const onInk = dark || open

	return (
		<>
			<header
				className={clsx(
					'shell pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-between pt-4 transition-colors duration-500 md:pt-5',
					onInk ? 'text-white' : 'text-ink'
				)}
			>
				<Link
					href={routes.home}
					aria-label='CareTech, página inicial'
					className={clsx(
						'pointer-events-auto block rounded-sm transition-[translate] duration-[900ms] ease-out-expo focus-visible:translate-x-0',
						hidden && '-translate-x-[calc(100%+4rem)]'
					)}
				>
					<Logo className='h-8 w-auto md:h-9' />
				</Link>

				<button
					ref={toggle}
					type='button'
					onClick={() => setOpen(value => !value)}
					aria-expanded={open}
					aria-controls='site-menu'
					className={clsx(
						'group pointer-events-auto flex items-center gap-3 rounded-full transition-[translate] duration-[900ms] ease-out-expo focus-visible:translate-x-0',
						hidden && 'translate-x-[calc(100%+4rem)]'
					)}
				>
					<span className='text-[0.8125rem] font-medium tracking-[-0.01em]'>{open ? 'Fechar' : 'Menu'}</span>
					<span
						className={clsx(
							'relative grid size-11 place-items-center rounded-full border transition-[background-color,border-color] duration-500 ease-out-expo',
							open
								? 'border-blue bg-blue'
								: onInk
									? 'border-white/60 group-hover:border-white group-hover:bg-white/10'
									: 'border-ink/50 group-hover:border-ink group-hover:bg-ink/5'
						)}
					>
						<span
							className={clsx(
								'absolute h-px w-4 bg-current transition-transform duration-500 ease-out-expo',
								open ? 'rotate-45' : '-translate-y-[3px]'
							)}
						/>
						<span
							className={clsx(
								'absolute h-px w-4 bg-current transition-transform duration-500 ease-out-expo',
								open ? '-rotate-45' : 'translate-y-[3px]'
							)}
						/>
					</span>
				</button>
			</header>

			<nav
				ref={panel}
				id='site-menu'
				aria-label='Menu principal'
				{...((open ? {} : { inert: true }) as Record<string, boolean>)}
				className={clsx(
					'shell fixed inset-x-0 top-0 z-0 flex h-[var(--menu-h)] flex-col justify-end bg-ink pb-8 text-white transition-opacity',
					open ? 'opacity-100 duration-200' : 'opacity-0 delay-[1250ms] duration-0'
				)}
			>
				<div className='grid gap-y-8 md:grid-cols-3'>
					<ul className='space-y-0.5'>
						{nav.slice(0, 3).map(item => (
							<li key={item.href} className='overflow-hidden'>
								<Link
									href={item.href}
									data-menu-item
									className='title-m inline-block transition-colors duration-300 hover:text-blue-2'
								>
									{item.label}
								</Link>
							</li>
						))}
					</ul>
					<ul className='space-y-0.5'>
						{nav.slice(3).map(item => (
							<li key={item.href} className='overflow-hidden'>
								<Link
									href={item.href}
									data-menu-item
									className='title-m inline-block transition-colors duration-300 hover:text-blue-2'
								>
									{item.label}
								</Link>
							</li>
						))}
					</ul>
					<div className='hidden md:block'>
						<p className='label mb-3 text-muted-dark'>Serviços</p>
						<ul className='space-y-1.5'>
							{services.map(service => (
								<li key={service.slug} className='overflow-hidden'>
									<Link
										data-menu-item
										href={`${routes.services}/${service.slug}`}
										className='inline-block text-[0.9375rem] text-white/80 transition-colors hover:text-white'
									>
										{service.title}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
				<div className='mt-7 flex flex-wrap items-end gap-x-10 gap-y-4 border-t border-white/15 pt-5'>
					<a href={contact.whatsappHref} target='_blank' rel='noopener noreferrer' className='group'>
						<span className='label block text-muted-dark'>WhatsApp</span>
						<span className='tnum mt-1 block text-lg font-medium tracking-[-0.02em] transition-colors duration-300 group-hover:text-blue-2'>
							{contact.whatsappDisplay}
						</span>
					</a>
					<a href={`mailto:${contact.email}`} className='group'>
						<span className='label block text-muted-dark'>E-mail</span>
						<span className='mt-1 block text-lg font-medium tracking-[-0.02em] transition-colors duration-300 group-hover:text-blue-2'>
							{contact.email}
						</span>
					</a>
					<span className='label text-muted-dark md:ml-auto'>{contact.coverage}</span>
				</div>
			</nav>
		</>
	)
}
