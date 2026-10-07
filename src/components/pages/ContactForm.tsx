'use client'

import { useState } from 'react'
import clsx from 'clsx'
import { useForm } from 'react-hook-form'
import { Arrow } from '@/components/ui/Button'
import { Link } from '@/components/motion/Transition'
import { routes, services } from '@/content/site'

type Values = {
	name: string
	company: string
	email: string
	phone: string
	subject: string
	message: string
	consent: boolean
	website: string
}

const field =
	'peer w-full rounded-md border border-line bg-paper px-4 pb-3 pt-7 text-[1rem] text-ink outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-transparent hover:border-ink/40 focus:border-blue focus:shadow-[0_0_0_3px_rgba(3,103,215,0.15)] aria-[invalid=true]:border-[#c4321c]'
const floating =
	'label pointer-events-none absolute left-4 top-3 text-muted transition-colors peer-focus:text-blue'

function Field({
	id,
	label,
	error,
	children
}: {
	id: string
	label: string
	error?: string
	children: React.ReactNode
}) {
	return (
		<div>
			<div className='relative'>
				{children}
				<label htmlFor={id} className={floating}>
					{label}
				</label>
			</div>
			{error && (
				<p id={`${id}-error`} className='mt-1.5 text-[0.8125rem] text-[#b02a17]'>
					{error}
				</p>
			)}
		</div>
	)
}

export function ContactForm() {
	const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
	const [serverError, setServerError] = useState('')
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<Values>({ mode: 'onTouched' })

	const onSubmit = async (values: Values) => {
		setStatus('sending')
		setServerError('')
		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(values)
			})
			const json = await response.json().catch(() => ({}))
			if (!response.ok) throw new Error(json.error || 'Não conseguimos enviar agora. Tente novamente.')
			setStatus('sent')
			reset()
		} catch (error) {
			setStatus('error')
			setServerError(error instanceof Error ? error.message : 'Não conseguimos enviar agora. Tente novamente.')
		}
	}

	if (status === 'sent') {
		return (
			<div className='flex min-h-[28rem] flex-col justify-between rounded-card bg-blue p-6 text-white md:p-10' role='status'>
				<span className='label'>Mensagem enviada</span>
				<div>
					<p className='statement max-w-[16ch]'>Obrigado. Retornamos em breve.</p>
					<button
						type='button'
						onClick={() => setStatus('idle')}
						className='label mt-8 border-b border-white pb-1 hover:opacity-80'
					>
						Enviar outra mensagem
					</button>
				</div>
			</div>
		)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} noValidate className='grid gap-3'>
			<div className='grid gap-3 md:grid-cols-2'>
				<Field id='name' label='Nome *' error={errors.name?.message}>
					<input
						id='name'
						autoComplete='name'
						placeholder='Nome'
						aria-invalid={!!errors.name}
						aria-describedby={errors.name ? 'name-error' : undefined}
						className={field}
						{...register('name', { required: 'Informe seu nome.' })}
					/>
				</Field>
				<Field id='company' label='Empresa' error={errors.company?.message}>
					<input id='company' autoComplete='organization' placeholder='Empresa' className={field} {...register('company')} />
				</Field>
				<Field id='email' label='E-mail *' error={errors.email?.message}>
					<input
						id='email'
						type='email'
						autoComplete='email'
						placeholder='E-mail'
						aria-invalid={!!errors.email}
						aria-describedby={errors.email ? 'email-error' : undefined}
						className={field}
						{...register('email', {
							required: 'Informe seu e-mail.',
							pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Confira o formato do e-mail.' }
						})}
					/>
				</Field>
				<Field id='phone' label='Telefone' error={errors.phone?.message}>
					<input id='phone' type='tel' autoComplete='tel' placeholder='Telefone' className={field} {...register('phone')} />
				</Field>
			</div>

			<Field id='subject' label='Assunto'>
				<select id='subject' className={clsx(field, 'appearance-none')} defaultValue='' {...register('subject')}>
					<option value=''>Selecione um serviço (opcional)</option>
					{services.map(service => (
						<option key={service.slug} value={service.title}>
							{service.title}
						</option>
					))}
					<option value='Outro assunto'>Outro assunto</option>
				</select>
			</Field>

			<Field id='message' label='Mensagem *' error={errors.message?.message}>
				<textarea
					id='message'
					rows={6}
					placeholder='Mensagem'
					aria-invalid={!!errors.message}
					aria-describedby={errors.message ? 'message-error' : undefined}
					className={clsx(field, 'resize-y')}
					data-lenis-prevent
					{...register('message', { required: 'Conte um pouco sobre o que você precisa.' })}
				/>
			</Field>

			<input type='text' tabIndex={-1} autoComplete='off' className='hidden' aria-hidden='true' {...register('website')} />

			<label className='mt-2 flex cursor-pointer items-start gap-3 text-[0.875rem] leading-snug text-muted'>
				<input
					type='checkbox'
					className='mt-0.5 size-4 shrink-0 accent-blue'
					aria-invalid={!!errors.consent}
					{...register('consent', { required: 'É preciso concordar para enviar.' })}
				/>
				<span>
					Concordo com o uso dos meus dados para retorno deste contato, conforme a{' '}
					<Link href={routes.privacy} className='text-ink underline hover:text-blue'>
						política de LGPD
					</Link>
					.
				</span>
			</label>
			{errors.consent && <p className='text-[0.8125rem] text-[#b02a17]'>{errors.consent.message}</p>}

			{status === 'error' && (
				<p role='alert' className='rounded-md bg-[#fbe9e6] px-4 py-3 text-[0.9375rem] text-[#8f2414]'>
					{serverError}
				</p>
			)}

			<button
				type='submit'
				disabled={status === 'sending'}
				className='group label mt-4 inline-flex h-12 items-center justify-between gap-6 self-start rounded-md bg-blue pl-5 pr-1.5 text-white transition-colors duration-300 hover:bg-ink disabled:cursor-wait disabled:opacity-70'
			>
				<span>{status === 'sending' ? 'Enviando...' : 'Enviar mensagem'}</span>
				<span className='grid size-9 place-items-center rounded-[5px] bg-white text-blue transition-colors group-hover:text-ink'>
					<Arrow className='size-4' />
				</span>
			</button>
		</form>
	)
}
