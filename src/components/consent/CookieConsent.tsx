'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { GoogleTagManager } from '@next/third-parties/google'
import clsx from 'clsx'
import { Link } from '@/components/motion/Transition'
import { cookieConsent, routes } from '@/content/site'
import { CONSENT_OPEN, clearAnalyticsCookies, readConsent, writeConsent, type Consent } from '@/lib/consent'

type DataLayerWindow = Window & { dataLayer?: unknown[] }

// Consent Mode signals for GTM; the Google tags inside it read them. Must be pushed as an Arguments object.
function gtag(..._args: unknown[]) {
	const w = window as DataLayerWindow
	w.dataLayer = w.dataLayer || []
	// eslint-disable-next-line prefer-rest-params
	w.dataLayer.push(arguments)
}

const control =
	'label h-10 rounded-md px-4 text-[0.6875rem] transition-colors duration-300 ease-out-expo'
const plain = clsx(control, 'border border-white/25 text-white hover:border-white hover:bg-white hover:text-ink')
const primary = clsx(control, 'bg-blue text-white hover:bg-white hover:text-ink')

// Consent banner and the Tag Manager loader it guards. GTM never loads before the visitor opts in.
export function CookieConsent({ gtmId, track }: { gtmId: string; track: boolean }) {
	const [consent, setConsent] = useState<Consent | null>(null)
	const [loadGtm, setLoadGtm] = useState(false)
	const [open, setOpen] = useState(false)
	const [prefs, setPrefs] = useState(false)
	const [analytics, setAnalytics] = useState(false)
	const panel = useRef<HTMLDivElement>(null)
	const returnFocus = useRef<HTMLElement | null>(null)

	// first visit: wait for the opening curtain so the banner isn't drawn under it
	useEffect(() => {
		const stored = readConsent()
		setConsent(stored)
		if (stored) return
		let shown = false
		const show = () => {
			if (shown) return
			shown = true
			setOpen(true)
		}
		window.addEventListener('page:enter', show, { once: true })
		const id = window.setTimeout(show, 2500)
		return () => {
			window.removeEventListener('page:enter', show)
			window.clearTimeout(id)
		}
	}, [])

	// footer link and the LGPD page reopen the preferences
	useEffect(() => {
		const reopen = () => {
			returnFocus.current = document.activeElement as HTMLElement | null
			setAnalytics(readConsent()?.analytics ?? false)
			setPrefs(true)
			setOpen(true)
			requestAnimationFrame(() => panel.current?.querySelector<HTMLElement>('[role="switch"]')?.focus())
		}
		window.addEventListener(CONSENT_OPEN, reopen)
		return () => window.removeEventListener(CONSENT_OPEN, reopen)
	}, [])

	const close = useCallback(() => {
		setOpen(false)
		setPrefs(false)
		returnFocus.current?.focus()
		returnFocus.current = null
	}, [])

	// consent signals go into the dataLayer before gtm.js, so every tag starts with the right state
	useEffect(() => {
		if (!track || !consent?.analytics || loadGtm) return
		gtag('consent', 'default', {
			analytics_storage: 'granted',
			ad_storage: 'denied',
			ad_user_data: 'denied',
			ad_personalization: 'denied'
		})
		setLoadGtm(true)
	}, [track, consent, loadGtm])

	const save = useCallback(
		(allow: boolean) => {
			if (loadGtm) {
				gtag('consent', 'update', { analytics_storage: allow ? 'granted' : 'denied' })
				;(window as DataLayerWindow).dataLayer?.push({ event: 'consent_update', analytics: allow })
			}
			if (!allow) clearAnalyticsCookies()
			setConsent(writeConsent(allow))
			close()
		},
		[loadGtm, close]
	)

	// Escape closes only once a choice exists; the first time, the visitor has to pick
	useEffect(() => {
		if (!open || !consent) return
		const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
		window.addEventListener('keydown', onKey)
		return () => window.removeEventListener('keydown', onKey)
	}, [open, consent, close])

	return (
		<>
			{loadGtm && <GoogleTagManager gtmId={gtmId} />}

			{open && (
				<div className='fixed inset-x-0 bottom-0 z-[90] p-4 md:bottom-5 md:left-5 md:right-auto md:p-0'>
					<div
						ref={panel}
						role='dialog'
						aria-modal='false'
						aria-labelledby='consent-label'
						aria-describedby='consent-text'
						data-lenis-prevent
						className='consent-in max-h-[calc(100svh-2rem)] w-full overflow-y-auto rounded-card bg-ink p-5 text-white ring-1 ring-white/10 md:w-[27rem] md:p-6'
					>
						<div className='flex items-center justify-between gap-4'>
							<p id='consent-label' className='label flex items-center gap-2.5 text-muted-dark'>
								<span aria-hidden='true' className='size-2.5 rounded-[22%] bg-blue-2' />
								{prefs ? cookieConsent.prefsLabel : cookieConsent.label}
							</p>
							{consent && (
								<button
									type='button'
									onClick={close}
									className='label -mr-1 rounded px-1 text-muted-dark transition-colors hover:text-white'
								>
									Fechar
								</button>
							)}
						</div>

						<p id='consent-text' className='mt-4 text-[0.9375rem] leading-relaxed text-white/85'>
							{cookieConsent.text}{' '}
							<Link href={routes.privacy} className='text-white underline underline-offset-2 hover:text-blue-2'>
								Saiba mais
							</Link>
							.
						</p>

						{prefs && (
							<ul className='mt-5 border-b border-white/15'>
								{cookieConsent.categories.map(category => {
									const on = category.locked || analytics
									return (
										<li key={category.id} className='flex items-start justify-between gap-5 border-t border-white/15 py-4'>
											<div>
												<p id={`consent-${category.id}`} className='font-medium'>
													{category.title}
												</p>
												<p className='mt-1 text-sm leading-relaxed text-muted-dark'>{category.text}</p>
											</div>
											{category.locked ? (
												<span className='label mt-1 shrink-0 text-muted-dark'>Sempre ativo</span>
											) : (
												<button
													type='button'
													role='switch'
													aria-checked={on}
													aria-labelledby={`consent-${category.id}`}
													onClick={() => setAnalytics(v => !v)}
													className={clsx(
														'relative mt-0.5 h-6 w-11 shrink-0 rounded-md border transition-colors duration-300',
														on ? 'border-blue bg-blue' : 'border-white/25 hover:border-white/60'
													)}
												>
													<span
														aria-hidden='true'
														className={clsx(
															'absolute left-[3px] top-[3px] size-4 rounded-[22%] transition-[transform,background-color] duration-300 ease-out-expo motion-reduce:transition-none',
															on ? 'translate-x-5 bg-white' : 'bg-muted-dark'
														)}
													/>
												</button>
											)}
										</li>
									)
								})}
							</ul>
						)}

						{/* reject sits beside accept at the same size: refusing is as easy as agreeing */}
						<div className='mt-5 grid grid-cols-2 gap-2'>
							<button type='button' onClick={() => save(false)} className={plain}>
								Recusar
							</button>
							{prefs ? (
								<button type='button' onClick={() => save(analytics)} className={primary}>
									Salvar escolhas
								</button>
							) : (
								<button type='button' onClick={() => save(true)} className={primary}>
									Aceitar
								</button>
							)}
						</div>

						{!prefs && (
							<button
								type='button'
								onClick={() => {
									setAnalytics(consent?.analytics ?? false)
									setPrefs(true)
								}}
								className='label mt-4 border-b border-white/30 pb-0.5 text-white/85 transition-colors hover:border-blue-2 hover:text-blue-2'
							>
								Personalizar
							</button>
						)}
					</div>
				</div>
			)}
		</>
	)
}
