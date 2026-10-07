import clsx from 'clsx'

type SectionTagProps = {
	index: string
	label: string
	tone?: 'light' | 'dark'
	className?: string
}

// "S.02 / NOSSOS SERVIÇOS": a boxed index over a solid label, set inline at the start of a statement
export function SectionTag({ index, label, tone = 'light', className }: SectionTagProps) {
	return (
		<span className={clsx('section-tag inline-flex flex-col items-start gap-1 align-top', className)} aria-hidden='true'>
			<span
				className={clsx(
					'label flex h-[14px] items-center rounded-[3px] border px-1 text-[0.625rem] leading-none',
					tone === 'light' ? 'border-ink text-ink' : 'border-white/70 text-white'
				)}
			>
				{index}
			</span>
			<span
				className={clsx(
					'label flex h-4 items-center rounded-[3px] px-1.5 text-[0.625rem] leading-none whitespace-nowrap',
					tone === 'light' ? 'bg-blue text-white' : 'bg-white text-blue'
				)}
			>
				{label}
			</span>
		</span>
	)
}
