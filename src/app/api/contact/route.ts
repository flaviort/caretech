import { NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'

type Payload = {
	name?: string
	company?: string
	email?: string
	phone?: string
	subject?: string
	message?: string
	consent?: boolean
	website?: string
}

const clean = (value: unknown, max = 2000) => (typeof value === 'string' ? value.trim().slice(0, max) : '')
const escape = (value: string) =>
	value.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] ?? c)

export async function POST(request: Request) {
	let body: Payload
	try {
		body = await request.json()
	} catch {
		return NextResponse.json({ error: 'Não foi possível ler o formulário. Tente novamente.' }, { status: 400 })
	}

	// honeypot: bots fill the hidden field, people never see it
	if (clean(body.website)) return NextResponse.json({ ok: true })

	const data = {
		name: clean(body.name, 120),
		company: clean(body.company, 160),
		email: clean(body.email, 160),
		phone: clean(body.phone, 40),
		subject: clean(body.subject, 160),
		message: clean(body.message, 4000)
	}

	if (!data.name || !data.email || !data.message || !body.consent) {
		return NextResponse.json({ error: 'Preencha nome, e-mail, mensagem e o consentimento.' }, { status: 422 })
	}
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
		return NextResponse.json({ error: 'Confira o e-mail informado.' }, { status: 422 })
	}

	const apiKey = process.env.SENDGRID_API_KEY
	const to = process.env.CONTACT_TO_EMAIL || 'contato@caretechit.com.br'
	const from = process.env.CONTACT_FROM_EMAIL || 'site@caretechit.com.br'

	if (!apiKey) {
		return NextResponse.json(
			{ error: 'O envio pelo site está temporariamente indisponível. Fale com a gente pelo WhatsApp ou por e-mail.' },
			{ status: 503 }
		)
	}

	sgMail.setApiKey(apiKey)

	const rows = [
		['Nome', data.name],
		['Empresa', data.company || '-'],
		['E-mail', data.email],
		['Telefone', data.phone || '-'],
		['Assunto', data.subject || '-']
	]

	try {
		await sgMail.send({
			to,
			from,
			replyTo: data.email,
			subject: `Contato pelo site: ${data.name}${data.company ? ` (${data.company})` : ''}`,
			text: `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\n${data.message}`,
			html: `<table>${rows
				.map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${escape(v)}</td></tr>`)
				.join('')}</table><p>${escape(data.message).replace(/\n/g, '<br>')}</p>`
		})
		return NextResponse.json({ ok: true })
	} catch {
		return NextResponse.json(
			{ error: 'Não conseguimos enviar agora. Tente de novo em instantes ou fale pelo WhatsApp.' },
			{ status: 502 }
		)
	}
}
