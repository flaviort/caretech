'use client'

import { useEffect, useRef } from 'react'
import { ReactLenis, useLenis, type LenisRef } from 'lenis/react'
import { gsap, ScrollTrigger, prefersReducedMotion } from './gsap'

function ScrollTriggerSync() {
	useLenis(() => ScrollTrigger.update())
	return null
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
	const lenisRef = useRef<LenisRef>(null)

	useEffect(() => {
		// GSAP's ticker drives Lenis so scroll and ScrollTrigger share one frame
		const update = (time: number) => lenisRef.current?.lenis?.raf(time * 1000)
		gsap.ticker.add(update)
		gsap.ticker.lagSmoothing(0)

		if (prefersReducedMotion()) lenisRef.current?.lenis?.destroy()

		return () => gsap.ticker.remove(update)
	}, [])

	return (
		<ReactLenis
			root
			ref={lenisRef}
			options={{ autoRaf: false, lerp: 0.095, wheelMultiplier: 0.95, anchors: true }}
		>
			<ScrollTriggerSync />
			{children}
		</ReactLenis>
	)
}
