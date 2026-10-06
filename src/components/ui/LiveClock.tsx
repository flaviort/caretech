'use client'

import { useEffect, useState } from 'react'

const format = (withSeconds: boolean) =>
	new Intl.DateTimeFormat('pt-BR', {
		timeZone: 'America/Sao_Paulo',
		hour: '2-digit',
		minute: '2-digit',
		second: withSeconds ? '2-digit' : undefined,
		hour12: false
	})

export function useBrasiliaTime() {
	const [now, setNow] = useState<Date | null>(null)
	useEffect(() => {
		setNow(new Date())
		const id = setInterval(() => setNow(new Date()), 1000)
		return () => clearInterval(id)
	}, [])
	return now
}

export function brasiliaParts(date: Date) {
	const parts = new Intl.DateTimeFormat('en-US', {
		timeZone: 'America/Sao_Paulo',
		hour: 'numeric',
		minute: 'numeric',
		hour12: false
	}).formatToParts(date)
	const hour = Number(parts.find(p => p.type === 'hour')?.value ?? 0) % 24
	const minute = Number(parts.find(p => p.type === 'minute')?.value ?? 0)
	return { hour, minute }
}

export function LiveClock({ seconds = false, className }: { seconds?: boolean; className?: string }) {
	const now = useBrasiliaTime()
	return (
		<time className={className} dateTime={now?.toISOString()} suppressHydrationWarning>
			{now ? format(seconds).format(now) : seconds ? '--:--:--' : '--:--'}
		</time>
	)
}
