import clsx from 'clsx'
import type { Faq as FaqItem } from '@/content/site'
import { JsonLd } from '@/components/seo/JsonLd'
import { faqPage } from '@/lib/seo'

// Board rows that open: native <details>, so answers are in the HTML for crawlers and work without JS.
// Renders its own FAQPage JSON-LD: any FAQ on the site gets the schema by using this component. One per page.
export function Faq({ items, className }: { items: FaqItem[]; className?: string }) {
	return (
		<div className={clsx('border-b border-line', className)}>
			<JsonLd data={faqPage(items)} />
			{items.map((item, i) => (
				<details key={item.q} className='group border-t border-line' data-reveal>
					<summary className='group/row flex cursor-pointer list-none items-center gap-4 px-1 py-5 transition-colors duration-300 hover:bg-blue hover:text-white md:gap-6 md:px-3 [&::-webkit-details-marker]:hidden'>
						<span className='label tnum text-muted transition-colors group-hover/row:text-white/75'>
							{String(i + 1).padStart(2, '0')}
						</span>
						<h3 className='flex-1 text-[clamp(1.125rem,1.6vw,1.5rem)] font-medium tracking-[-0.02em]'>{item.q}</h3>
						<span
							className='relative grid size-7 shrink-0 place-items-center rounded-[22%] bg-blue text-white transition-colors duration-300 group-hover/row:bg-white group-hover/row:text-blue'
							aria-hidden='true'
						>
							<span className='absolute h-px w-3 bg-current' />
							<span className='absolute h-3 w-px bg-current transition-transform duration-300 group-open:scale-y-0' />
						</span>
					</summary>
					<p className='body-l max-w-[56ch] px-1 pb-8 pt-2 text-muted md:pl-[4.25rem]'>{item.a}</p>
				</details>
			))}
		</div>
	)
}
