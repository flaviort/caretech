'use client'

import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '@/components/motion/gsap'
import { footerVideo } from '@/content/site'

// Dark server-rack loop behind the closing CTA. It only downloads once the footer is near,
// plays while on screen, and stays on the poster frame when the visitor asks for reduced motion.
export function FooterVideo() {
	const ref = useRef<HTMLVideoElement>(null)

	useEffect(() => {
		const video = ref.current
		if (!video || prefersReducedMotion()) return
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) video.play().catch(() => {})
				else video.pause()
			},
			{ rootMargin: '200px 0px' }
		)
		observer.observe(video)
		return () => observer.disconnect()
	}, [])

	return (
		<div className='pointer-events-none absolute inset-0 overflow-hidden' aria-hidden='true'>
			<video
				ref={ref}
				className='absolute inset-0 size-full object-cover'
				poster={footerVideo.poster}
				muted
				loop
				playsInline
				preload='none'
				disablePictureInPicture
				tabIndex={-1}
			>
				<source src={footerVideo.webm} type='video/webm' />
				<source src={footerVideo.mp4} type='video/mp4' />
			</video>
			{/* keep the headline readable and fade into the ink of the board below */}
			<div className='absolute inset-0 bg-ink/35' />
			<div className='absolute inset-0 bg-blue opacity-15 mix-blend-color' />
			<div className='absolute inset-x-0 bottom-0 h-2/5 bg-[linear-gradient(0deg,var(--color-ink),transparent)]' />
		</div>
	)
}
