import clsx from 'clsx'

// Board rows: one type size, rank carried by weight and the reversed hover plate.
export function BoardList({
	items,
	label,
	tone = 'light',
	className
}: {
	items: string[]
	label?: string
	tone?: 'light' | 'dark'
	className?: string
}) {
	const dark = tone === 'dark'
	return (
		<div className={className}>
			{label && <p className={clsx('label mb-4', dark ? 'text-muted-dark' : 'text-muted')}>{label}</p>}
			<ul className={clsx('border-b', dark ? 'border-white/15' : 'border-line')}>
				{items.map((item, i) => (
					<li
						key={item}
						data-reveal
						className={clsx(
							'group flex items-center gap-4 border-t px-1 py-4 transition-colors duration-300 md:gap-6 md:px-3 md:py-5',
							dark ? 'border-white/15 hover:bg-white hover:text-ink' : 'border-line hover:bg-blue hover:text-white'
						)}
					>
						<span
							className={clsx(
								'size-3 shrink-0 rounded-[22%] transition-colors duration-300',
								dark ? 'bg-blue-2 group-hover:bg-blue' : 'bg-blue group-hover:bg-white'
							)}
							aria-hidden='true'
						/>
						<span className='flex-1 text-[clamp(1.125rem,1.6vw,1.5rem)] font-medium tracking-[-0.02em]'>{item}</span>
						<span
							className={clsx(
								'label tnum',
								dark ? 'text-muted-dark group-hover:text-ink/60' : 'text-muted group-hover:text-white/75'
							)}
						>
							{String(i + 1).padStart(2, '0')}
						</span>
					</li>
				))}
			</ul>
		</div>
	)
}
