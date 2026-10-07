'use client'

import { openConsent } from '@/lib/consent'

// Reopens the cookie preferences from anywhere on the page
export function ConsentLink({ className, children }: { className?: string; children: React.ReactNode }) {
	return (
		<button type='button' onClick={openConsent} className={className}>
			{children}
		</button>
	)
}
