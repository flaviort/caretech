// format date in US format (MM/DD/YYYY)
export function formatDate(date: string) {
    return new Date(date).toLocaleDateString('en-US', {
        timeZone: 'UTC',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).replace(/\//g, '.')
}

// format the date and only get the day showing always 2 digits
export function getDay(day: string) {
    return new Date(day).toLocaleDateString('en-US', {
        timeZone: 'UTC',
        day: '2-digit'
    })
}

// format the date and show only the written month
export function getMonth(month: string) {
    return new Date(month).toLocaleDateString('en-US', {
        timeZone: 'UTC',
        month: 'long'
    })
}

// format the date and show only the year
export function getYear(year: string) {
    return new Date(year).toLocaleDateString('en-US', {
        timeZone: 'UTC',
        year: 'numeric'
    })
}

export function phone(str: string) {
	return (
		'tel:' + str.replace(/[^0-9]/g, '')
	)
}

export function email(str: string) {
	return (
		'mailto:' + str
	)
}

// get vw / vh
export const vw = (coef: number) => window.innerWidth * (coef/100)
export const vh = (coef: number) => window.innerHeight * (coef/100)

// limit characters
export function limitCharacters(
    text: string,
    limit: number
) {
    if (text.length <= limit) {
        return text
    } else {
        return text.slice(0, limit) + '...'
    }
}

// slugify
export function slugify(str: string) {
    return String(str)
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
}

// placeholder
export const placeholder = (theme = 'dark') => {
    const colors = theme === 'light' 
        ? { start: '#fff', middle: '#eee', end: '#fff' } 
        : { start: '#333', middle: '#222', end: '#333' }

    const shimmer = `
        <svg width='1' height='1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'>
            <defs>
                <linearGradient id='g'>
                    <stop stop-color='${colors.start}' offset='20%' />
                    <stop stop-color='${colors.middle}' offset='50%' />
                    <stop stop-color='${colors.end}' offset='70%' />
                </linearGradient>
            </defs>
            <rect width='1' height='1' fill='${colors.start}' />
            <rect id='r' width='1' height='1' fill='url(#g)' />
            <animate xlink:href='#r' attributeName='x' from='-1' to='1' dur='1s' repeatCount='indefinite'  />
        </svg>
    `

    return typeof window === 'undefined' ? Buffer.from(shimmer).toString('base64') : window.btoa(shimmer)
}

// get all focusable elements inside the container
export const getFocusableElements = (container: HTMLElement) => {
    return container.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    )
}

// get all focusable elements outside the container
export const getFocusableElementsOutside = (container: HTMLElement) => {
    const allFocusableElements = document.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    )

    // filter out elements that are inside the container
    return Array.from(allFocusableElements).filter(
        (element) => !container.contains(element)
    )
}