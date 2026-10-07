'use client'

import clsx from 'clsx'
import { brasiliaParts, useBrasiliaTime } from './LiveClock'

// 24 hour cells in the logo's rounded-square module; past hours dim, the current hour is the blue magnet,
// and a thin marker sits at the exact minute.
export function ShiftStrip({ className }: { className?: string }) {
	const now = useBrasiliaTime()
	const { hour, minute } = now ? brasiliaParts(now) : { hour: -1, minute: 0 }
	const position = now ? ((hour + minute / 60) / 24) * 100 : 0

	return (
		<div className={clsx('w-full', className)}>
			<div className='relative grid grid-cols-24 gap-[3px] sm:gap-1'>
				{Array.from({ length: 24 }, (_, h) => (
					<span
						key={h}
						className={clsx(
							'aspect-square rounded-[22%] transition-colors duration-700',
							h === hour ? 'bg-blue' : h < hour ? 'bg-white/22' : 'bg-white/8'
						)}
					/>
				))}
				{now && (
					<span
						className='absolute -bottom-2 -top-2 w-px bg-white transition-[left] duration-1000'
						style={{ left: `${position}%` }}
					/>
				)}
			</div>
			<div className='label mt-3 flex justify-between text-muted-dark'>
				<span>00h</span>
				<span>06h</span>
				<span>12h</span>
				<span>18h</span>
				<span>24h</span>
			</div>
		</div>
	)
}
