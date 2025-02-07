// svg
import Facebook from '@/assets/svg/social/facebook.svg'
import Linkedin from '@/assets/svg/social/linkedin.svg'

// pages
export const pages = {
	home: '/',
	solutions: {
		index: '/solutions',
		manufacturers: '/solutions/manufacturers',
		fleets: '/solutions/fleets',
		dealerships: '/solutions/dealerships',
		vehicle_owners: '/solutions/vehicle-owners',
		body_shops: '/solutions/body-shops',
		insurance: '/solutions/insurance',
	},
	about: '/about',
	locations: '/locations',
	supplements: '/supplements',
	careers: '/careers',
	contact: '/contact',
	companies: '/companies',

	// privacy / etc
	privacy: '/privacy-policy',
	accessibility: '/accessibility-statement',

	// others
	error: '/404',

	// partners
	csi: 'https://getcsi.com/',
	
}

// social
export const social = {
	facebook: 'https://www.facebook.com/GetSolutionWorks/',
	linkedin: 'https://www.linkedin.com/company/getsolutionworks',
	twitter: 'https://twitter.com/',
	instagram: 'https://instagram.com/',
	youtube: 'https://www.youtube.com/'
}

// contact
export const contact = {
	phone: '(844) 344-4245',
	email: 'dhoeh@getsw.com',
	address: '',
	gmaps: ''
}

// social links
export const socialLinks = [
	{
		icon: Linkedin,
		name: 'Linkedin',
		href: social.linkedin
	},
	{
		icon: Facebook,
		name: 'Facebook',
		href: social.facebook
	}
]