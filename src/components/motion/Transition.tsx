'use client'

import { createContext, forwardRef, useCallback, useContext, useEffect, useRef } from 'react'
import NextLink from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useLenis } from 'lenis/react'
import { Curtain, type CurtainHandle } from './Curtain'
import { ScrollTrigger, prefersReducedMotion } from './gsap'

type Kind = 'tiles' | 'morph'
type NavigateOptions = { kind?: Kind; origin?: { x: number; y: number }; label?: string }

type TransitionContextValue = {
	navigate: (href: string, options?: NavigateOptions) => void
}

const TransitionContext = createContext<TransitionContextValue>({ navigate: () => {} })

export const useTransitionRouter = () => useContext(TransitionContext)

const normalize = (path: string) => path.replace(/\/+$/, '') || '/'

const labels: Record<string, string> = {
	'/': 'Início',
	'/sobre': 'Sobre',
	'/servicos': 'Serviços',
	'/cases': 'Cases',
	'/contato': 'Contato',
	'/lgpd-compliance': 'LGPD & Compliance'
}

const labelFor = (path: string) =>
	labels[path] ?? (path.startsWith('/servicos/') ? 'Serviços' : path.startsWith('/cases/') ? 'Cases' : '')

type ViewTransitionDoc = Document & {
	startViewTransition?: (cb: () => Promise<void> | void) => {
		finished: Promise<void>
		updateCallbackDone: Promise<void>
	}
}

export function TransitionProvider({ children }: { children: React.ReactNode }) {
	const router = useRouter()
	const pathname = usePathname()
	const lenis = useLenis()
	const curtain = useRef<CurtainHandle>(null)
	const busy = useRef(false)
	const pending = useRef<{ path: string; resolve: () => void } | null>(null)
	const lastPath = useRef(pathname)

	useEffect(() => {
		const current = normalize(pathname)
		if (pending.current && pending.current.path === current) {
			pending.current.resolve()
			pending.current = null
		} else if (!busy.current && lastPath.current !== pathname) {
			// browser back/forward: no curtain, just land at the top and replay the page intro
			window.scrollTo(0, 0)
			requestAnimationFrame(() => {
				ScrollTrigger.refresh()
				window.dispatchEvent(new CustomEvent('page:enter'))
			})
		}
		lastPath.current = pathname
	}, [pathname])

	const waitForPath = (path: string) =>
		new Promise<void>(resolve => {
			pending.current = { path, resolve }
			setTimeout(resolve, 5000)
		})

	const navigate = useCallback(
		async (href: string, { kind = 'tiles', origin, label }: NavigateOptions = {}) => {
			const url = new URL(href, window.location.href)
			if (url.origin !== window.location.origin) {
				window.location.href = href
				return
			}

			const target = normalize(url.pathname)
			if (target === normalize(window.location.pathname)) {
				if (url.hash) lenis?.scrollTo(url.hash, { offset: -80 })
				else lenis?.scrollTo(0)
				return
			}
			if (busy.current) return
			busy.current = true

			const doc = document as ViewTransitionDoc
			const reduced = prefersReducedMotion()

			const swap = async () => {
				router.push(url.pathname + url.search, { scroll: false })
				await waitForPath(target)
				lenis?.scrollTo(0, { immediate: true, force: true })
				window.scrollTo(0, 0)
			}

			const enter = () => {
				ScrollTrigger.refresh()
				window.dispatchEvent(new CustomEvent('page:enter'))
			}

			lenis?.stop()
			window.dispatchEvent(new CustomEvent('page:leave'))

			try {
				if (reduced) {
					await swap()
					enter()
				} else if (kind === 'morph' && doc.startViewTransition) {
					// shared-element morph: the browser animates named elements, GSAP picks up the page intro
					document.documentElement.classList.add('vt-morph')
					const vt = doc.startViewTransition(swap)
					await vt.updateCallbackDone
					enter()
					await vt.finished
					document.documentElement.classList.remove('vt-morph')
				} else {
					await curtain.current?.cover(origin, label ?? labelFor(target))
					if (doc.startViewTransition) {
						// the swap happens under the board in one atomic view-transition snapshot
						document.documentElement.classList.add('vt-tiles')
						const vt = doc.startViewTransition(swap)
						await vt.updateCallbackDone
						vt.finished.finally(() => document.documentElement.classList.remove('vt-tiles'))
					} else {
						await swap()
					}
					enter()
					await curtain.current?.reveal()
				}
			} finally {
				lenis?.start()
				busy.current = false
			}
		},
		[lenis, router]
	)

	return (
		<TransitionContext.Provider value={{ navigate }}>
			{children}
			<Curtain ref={curtain} />
		</TransitionContext.Provider>
	)
}

type LinkProps = React.ComponentPropsWithoutRef<'a'> & {
	href: string
	kind?: Kind
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
	{ href, kind = 'tiles', onClick, children, ...rest },
	ref
) {
	const { navigate } = useTransitionRouter()
	const external = /^(https?:|mailto:|tel:)/.test(href)

	if (external) {
		return (
			<a ref={ref} href={href} onClick={onClick} {...rest}>
				{children}
			</a>
		)
	}

	return (
		<NextLink
			ref={ref}
			href={href}
			onClick={event => {
				onClick?.(event)
				if (event.defaultPrevented) return
				if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
				event.preventDefault()
				if (kind === 'morph') {
					// only the clicked card's title takes part in the shared-element morph
					const shared = event.currentTarget.querySelector<HTMLElement>('[data-vt]')
					if (shared?.dataset.vt) shared.style.viewTransitionName = shared.dataset.vt
				}
				navigate(href, { kind, origin: { x: event.clientX, y: event.clientY } })
			}}
			{...rest}
		>
			{children}
		</NextLink>
	)
})
