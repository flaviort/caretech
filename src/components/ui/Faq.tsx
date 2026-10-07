import clsx from 'clsx'
import type { Faq as FaqItem } from '@/content/site'
import { JsonLd } from '@/components/seo/JsonLd'
import { faqPage } from '@/lib/seo'
import { FaqRow } from './FaqRow'

// Board rows that open: native <details>, so answers are in the HTML for crawlers and work without JS.
// Renders its own FAQPage JSON-LD: any FAQ on the site gets the schema by using this component. One per page.
export function Faq({ items, className }: { items: FaqItem[]; className?: string }) {
	return (
		<div className={clsx('border-b border-line', className)}>
			<JsonLd data={faqPage(items)} />
			{items.map((item, i) => (
				<FaqRow key={item.q} index={i} question={item.q} answer={item.a} />
			))}
		</div>
	)
}
