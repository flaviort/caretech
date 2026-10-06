'use client'

import { useEffect } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from './gsap'

/*
	One orchestrated grammar for every route:
	[data-intro]       first-viewport lines rise out of their mask when the board opens
	[data-intro-media] hero media settles from a slight zoom
	[data-line]        same masked rise, triggered on scroll
	[data-reveal]      blocks lift in as they enter the viewport
	[data-parallax]    media drifts against the scroll (value = yPercent range)
	Content is visible in the markup; motion only runs once JS is ready.
*/
export function PageAnimations() {
	useEffect(() => {
		let ctx: gsap.Context | null = null

		const run = () => {
			ctx?.revert()
			const main = document.getElementById('page')
			if (!main) return
			if (prefersReducedMotion()) {
				document.documentElement.classList.add('is-ready')
				return
			}

			ctx = gsap.context(() => {
				// during a shared-element morph the browser already moves the named heading; do not animate it twice
				const morphing = document.documentElement.classList.contains('vt-morph')
				const intro = gsap.utils
					.toArray<HTMLElement>('[data-intro]')
					.filter(el => !(morphing && el.closest('[style*="view-transition-name"]')))
				if (intro.length) {
					gsap.fromTo(
						intro,
						{ yPercent: 105 },
						{ yPercent: 0, duration: 1.25, ease: 'expo.out', stagger: 0.08, delay: 0.05 }
					)
				}

				gsap.utils.toArray<HTMLElement>('[data-intro-fade]').forEach((el, i) => {
					gsap.fromTo(el, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 1.1, delay: 0.35 + i * 0.08 })
				})

				gsap.utils.toArray<HTMLElement>('[data-intro-media]').forEach(el => {
					gsap.fromTo(el, { scale: 1.14 }, { scale: 1, duration: 2.2, ease: 'expo.out' })
				})

				const lines = gsap.utils.toArray<HTMLElement>('[data-line]')
				gsap.set(lines, { yPercent: 105 })
				ScrollTrigger.batch(lines, {
					start: 'top 90%',
					once: true,
					onEnter: batch =>
						gsap.to(batch, { yPercent: 0, duration: 1.3, ease: 'expo.out', stagger: 0.09, overwrite: true })
				})

				const reveals = gsap.utils.toArray<HTMLElement>('[data-reveal]')
				gsap.set(reveals, { autoAlpha: 0, y: 36 })
				ScrollTrigger.batch(reveals, {
					start: 'top 88%',
					once: true,
					onEnter: batch =>
						gsap.to(batch, { autoAlpha: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: 0.07, overwrite: true })
				})

				gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach(el => {
					const amount = Number(el.dataset.parallax || 12)
					gsap.fromTo(
						el,
						{ yPercent: -amount / 2 },
						{
							yPercent: amount / 2,
							ease: 'none',
							scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true }
						}
					)
				})
			}, main)

			document.documentElement.classList.add('is-ready')
			ScrollTrigger.refresh()
		}

		window.addEventListener('page:enter', run)
		return () => {
			window.removeEventListener('page:enter', run)
			ctx?.revert()
		}
	}, [])

	return null
}
