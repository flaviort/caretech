// Builds the e-mail the contact form sends to the inbox.
// Mail clients ignore <style> blocks and most modern CSS, so the layout is
// tables with inline styles and system fonts.

export type ContactData = {
	name: string
	company: string
	email: string
	phone: string
	subject: string
	message: string
}

const BLUE = '#0367d7'
const INK = '#0b1220'
const MUTED = '#5b6676'
const LINE = '#e3e7ec'
const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"

const escape = (value: string) =>
	value.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] ?? c)

// wa.me needs the country code; Brazilian numbers usually come without it
const whatsappNumber = (phone: string) => {
	const digits = phone.replace(/\D/g, '')
	if (digits.length === 10 || digits.length === 11) return `55${digits}`
	if (digits.startsWith('55') && (digits.length === 12 || digits.length === 13)) return digits
	return ''
}

const sentAt = () => {
	const now = new Date()
	const tz = { timeZone: 'America/Sao_Paulo' } as const
	const date = new Intl.DateTimeFormat('pt-BR', { ...tz, dateStyle: 'short' }).format(now)
	const time = new Intl.DateTimeFormat('pt-BR', { ...tz, timeStyle: 'short' }).format(now)
	return `${date} às ${time}`
}

const button = (href: string, label: string, primary: boolean) =>
	`<a href="${escape(href)}" style="display:inline-block;padding:11px 18px;margin:0 8px 8px 0;border-radius:6px;font-family:${FONT};font-size:14px;font-weight:600;text-decoration:none;${
		primary ? `background:${BLUE};color:#ffffff;border:1px solid ${BLUE};` : `background:#ffffff;color:${BLUE};border:1px solid ${BLUE};`
	}">${label}</a>`

export function buildContactEmail(data: ContactData) {
	const subject = `Contato pelo site: ${data.name}${data.company ? ` (${data.company})` : ''}`
	const when = sentAt()
	const wa = data.phone ? whatsappNumber(data.phone) : ''
	const replySubject = `Re: ${data.subject || 'Contato pelo site da CareTech'}`

	const rows: [string, string][] = [
		['E-mail', `<a href="mailto:${escape(data.email)}" style="color:${BLUE};text-decoration:none;">${escape(data.email)}</a>`],
		['Telefone', data.phone ? `<a href="tel:${escape(data.phone.replace(/[^\d+]/g, ''))}" style="color:${INK};text-decoration:none;">${escape(data.phone)}</a>` : '-'],
		['Empresa', data.company ? escape(data.company) : '-'],
		['Assunto', data.subject ? escape(data.subject) : '-']
	]

	const html = `<!doctype html>
<html lang="pt-BR">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escape(subject)}</title></head>
<body style="margin:0;padding:0;background:#f2f4f7;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escape(data.message.slice(0, 140))}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f2f4f7;">
<tr><td align="center" style="padding:32px 16px;">
	<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid ${LINE};border-top:4px solid ${BLUE};border-radius:8px;">
		<tr><td style="padding:28px 32px 0;font-family:${FONT};">
			<p style="margin:0 0 20px;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:${MUTED};">CareTech IT &middot; Novo contato pelo site</p>
			<h1 style="margin:0;font-size:24px;line-height:1.25;font-weight:700;color:${INK};">${escape(data.name)}</h1>
			${data.company ? `<p style="margin:4px 0 0;font-size:16px;color:${MUTED};">${escape(data.company)}</p>` : ''}
		</td></tr>
		<tr><td style="padding:20px 32px 12px;">
			${button(`mailto:${data.email}?subject=${encodeURIComponent(replySubject)}`, 'Responder por e-mail', true)}
			${wa ? button(`https://wa.me/${wa}`, 'Abrir no WhatsApp', false) : ''}
		</td></tr>
		<tr><td style="padding:0 32px;">
			<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${LINE};">
				${rows
					.map(
						([label, value]) =>
							`<tr><td style="padding:12px 16px 12px 0;width:96px;vertical-align:top;border-bottom:1px solid ${LINE};font-family:${FONT};font-size:12px;letter-spacing:0.06em;text-transform:uppercase;color:${MUTED};">${label}</td><td style="padding:12px 0;vertical-align:top;border-bottom:1px solid ${LINE};font-family:${FONT};font-size:15px;color:${INK};">${value}</td></tr>`
					)
					.join('')}
			</table>
		</td></tr>
		<tr><td style="padding:24px 32px 8px;font-family:${FONT};">
			<p style="margin:0 0 10px;font-size:12px;letter-spacing:0.06em;text-transform:uppercase;color:${MUTED};">Mensagem</p>
			<div style="padding:16px 18px;background:#f6f8fa;border-left:3px solid ${BLUE};border-radius:4px;font-size:15px;line-height:1.6;color:${INK};">${escape(data.message).replace(/\n/g, '<br>')}</div>
		</td></tr>
		<tr><td style="padding:20px 32px 28px;font-family:${FONT};font-size:12px;line-height:1.5;color:${MUTED};">
			Enviado pelo formulário de caretechit.com.br em ${when} (horário de Brasília). Responder a este e-mail escreve direto para ${escape(data.email)}.
		</td></tr>
	</table>
</td></tr>
</table>
</body>
</html>`

	const text = [
		'Novo contato pelo site',
		'',
		`Nome: ${data.name}`,
		`Empresa: ${data.company || '-'}`,
		`E-mail: ${data.email}`,
		`Telefone: ${data.phone || '-'}`,
		...(wa ? [`WhatsApp: https://wa.me/${wa}`] : []),
		`Assunto: ${data.subject || '-'}`,
		'',
		'Mensagem:',
		data.message,
		'',
		`Enviado pelo formulário de caretechit.com.br em ${when} (horário de Brasília).`
	].join('\n')

	return { subject, html, text }
}
