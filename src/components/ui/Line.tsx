import clsx from 'clsx'

// A masked line that rises into place: on page entry by default, or when scrolled into view with `onScroll`.
// The mask carries a little bottom room so descenders are not clipped.
// The trailing space keeps words apart in the raw HTML text ("Nossa história", not "Nossahistória").
export function Line({
	children,
	className,
	onScroll
}: {
	children: React.ReactNode
	className?: string
	onScroll?: boolean
}) {
	return (
		<span className={clsx('block overflow-hidden pb-[0.1em] -mb-[0.1em]', className)}>
			<span {...(onScroll ? { 'data-line': '' } : { 'data-intro': '' })} className='block'>
				{children}
			</span>{' '}
		</span>
	)
}
