// Cookie consent, stored in this browser only. Bump the version to ask everyone again.
export type Consent = { v: number; analytics: boolean; at: string }

const KEY = 'caretech-consent'
const VERSION = 1
// LGPD guidance: ask again after a year
const MAX_AGE = 365 * 24 * 60 * 60 * 1000

export const CONSENT_OPEN = 'consent:open'

export function readConsent(): Consent | null {
	try {
		const stored = JSON.parse(localStorage.getItem(KEY) || 'null') as Consent | null
		if (!stored || stored.v !== VERSION) return null
		if (Date.now() - new Date(stored.at).getTime() > MAX_AGE) return null
		return stored
	} catch {
		return null
	}
}

export function writeConsent(analytics: boolean): Consent {
	const consent = { v: VERSION, analytics, at: new Date().toISOString() }
	try {
		localStorage.setItem(KEY, JSON.stringify(consent))
	} catch {
		// private mode: the choice still holds for this page view
	}
	return consent
}

export const openConsent = () => window.dispatchEvent(new CustomEvent(CONSENT_OPEN))

// Drop the _ga cookies GA already set, on every domain level it may have used
export function clearAnalyticsCookies() {
	const parts = location.hostname.split('.')
	const domains = ['']
	for (let i = 0; i < parts.length - 1; i++) domains.push(`; domain=.${parts.slice(i).join('.')}`)
	for (const cookie of document.cookie.split(';')) {
		const name = cookie.split('=')[0].trim()
		if (!name.startsWith('_ga')) continue
		for (const domain of domains) document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`
	}
}
