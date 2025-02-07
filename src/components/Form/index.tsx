'use client'

// libraries
import clsx from 'clsx'
import React, { useRef, useState } from 'react'
import { useForm, FormProvider, useFormContext, SubmitHandler, RegisterOptions } from 'react-hook-form'

// svg
import UxEye from '@/assets/svg/ux/eye.svg'
import UxEyeSlash from '@/assets/svg/ux/eye-slash.svg'
import UxChevronDown from '@/assets/svg/ux/chevron-down.svg'
import UxSpinner from '@/assets/svg/ux/spinner.svg'
import UxCheck from '@/assets/svg/ux/check.svg'

// css
import styles from './form.module.scss'

export interface FormProps {
    className?: string
    children: React.ReactNode
    endpoint: string
    isFormData?: boolean
    onSuccess?: (data: any) => void
    onError?: (error: any) => void
    clearOnSubmit?: boolean
}

interface FormValues {
    [key: string]: any
}

export const Form = ({
    className,
    children,
    endpoint,
    isFormData,
    onSuccess,
    onError,
    clearOnSubmit
}: FormProps) => {
    
    // refs
    const form = useRef<HTMLFormElement>(null)

    // form validations
    const methods = useForm({
        criteriaMode: 'all',
        mode: 'all'
    })

    // local state for any global errors
    const [globalError, setGlobalError] = useState('')

    // submit function
    const onSubmit: SubmitHandler<FormValues> = async (data) => {

        // clear any old error messages
        setGlobalError('')

        // fake response time (1s)
        let fakeTimer = 1000

        if (form.current) {
            (form.current as HTMLElement).classList.add('is-sending')
            document.dispatchEvent(new Event('formSending'))
        }

        let body

        if(isFormData) {
            const formData = new FormData()

            Object.keys(data).forEach(key => {
                formData.append(key, data[key])
            })

            body = formData
        } else {
            body = JSON.stringify(data)
        }

        fetch(endpoint, {
            method: 'post',
            body: body
        })

        .then(async (response) => {
            if (!response.ok) {
                // if the response is not ok, we try to parse the error message
                const errBody = await response.json().catch(() => ({}))
                const message = errBody.message || 'Something went wrong'
                throw new Error(message)
            }

            // if response is ok, parse the JSON
            return response.json()
        })

        // if success
        .then((responseData) => {
            if (onSuccess) {
                setTimeout(() => {
                    onSuccess(responseData)

                    if(form.current) {
                        form.current.classList.remove('is-sending')
                        document.dispatchEvent(new Event('formSent'))

                        if (clearOnSubmit) {
                            form?.current?.reset()
                            document.dispatchEvent(new Event('formReset'))
                        }
                    }
                }, fakeTimer)
            }
        })

        // if error
        .catch(error => {
            setTimeout(() => {
                //console.error('Error:', error)
                setGlobalError(error.message)
            }, fakeTimer)

            if (onError) {
                setTimeout(() => {
                    onError(error)

                    if (form.current) {
                        form.current.classList.remove('is-sending')
                        document.dispatchEvent(new Event('formError'))
                    }
                }, fakeTimer)
            }
        })
    }

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className={clsx(styles.form, className)}
                ref={form}
            >

                {children}

            </form>
        </FormProvider>
    )
}

export interface InputProps {
    id: string
    label: string
    hideLabel?: boolean
    type: string
    placeholder: string
    className?: string
    required?: boolean
    maxLength?: number
    minLength?: number
    hideValidations?: boolean
    hidePasswordToggle?: boolean
    disabled?: boolean
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
    match?: string
    noMargin?: boolean
    isWhite?: boolean
}

export const Input = ({
    id,
    label,
    hideLabel,
    type,
    placeholder,
    className,
    required,
    maxLength,
    minLength,
    hideValidations,
    hidePasswordToggle,
    disabled,
    onChange = () => {},
    onKeyDown,
    match,
    noMargin
}: InputProps) => {

    const { register, watch, formState: { errors } } = useFormContext()

    // watch the input value
    const inputValue = watch(label, '')

    // track focus state
    const [isFocused, setIsFocused] = useState(false)

    let validations: RegisterOptions = {
        onChange: (e) => onChange(e),
        required
    }

    if (match) {
        validations.validate = (value) => 
            value === watch(match) || 'Password does not match'
    }

    let text = type === 'password' ? 'password' : 'message'

    if (!hideValidations) {
        validations = {
            ...validations,
            required: required && 'This field is required',
            maxLength: maxLength && {
                value: maxLength,
                message: `Maximum characters exceeded`
            },
            minLength: minLength && {
                value: minLength,
                message: `The ${text} is too short`
            }
        }

        // add pattern validation for email type
        if (type === 'email') {
            validations = {
                ...validations,
                pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Invalid email'
                }
            } as {
                required: string | false | undefined
                maxLength: 0 | {
                    value: number
                    message: string
                } | undefined
                minLength: 0 | {
                    value: number
                    message: string
                } | undefined
                pattern: {
                    value: RegExp
                    message: string
                }
            }
        }
    }

    // track visibility for password fields
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    // decide which input type to use (if 'password', swap to 'text' when toggled)
    const currentInputType = type === 'password' && isPasswordVisible ? 'text' : type

    const handleTogglePassword = () => {
        setIsPasswordVisible(!isPasswordVisible)
    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && onKeyDown) {
            onKeyDown(event)
        }
    }

    // determine whether the label should shrink based on focus or input value
    const shouldShrinkLabel = isFocused || inputValue !== ''

    return (
        <div className={clsx(
            styles.formLine,
            className,
            !hideValidations && errors[label] && styles.error,
            noMargin && styles.noMargin
        )}>

            {!hideLabel && (
                <label
                    className={clsx(styles.label, 'text-16')}
                    htmlFor={id}
                    data-shrink={shouldShrinkLabel ? 'false' : 'true'}
                >
                    {label} {required && !hideValidations && <span className='red'>*</span>}
                </label>
            )}

            <div className={styles.lineWrapper}>

                <input
                    type={currentInputType}
                    id={id}
                    placeholder={placeholder}
                    className={styles.input}
                    disabled={disabled || false}
                    onKeyDown={handleKeyPress}
                    onFocus={() => setIsFocused(true)}
                    {...register(label, {
                        ...validations,
                        onBlur: () => {
                            setIsFocused(false)
                        }
                    })}
                />

                {type === 'password' && !hidePasswordToggle && (
                    <button
                        className={styles.sideIcon}
                        onClick={handleTogglePassword}
                        type='button'
                    >
                        {isPasswordVisible ? (
                            <UxEyeSlash />
                        ) : (
                            <UxEye />
                        )}
                    </button>
                )}

            </div>

            {!hideValidations && errors[label] && (
                <p className={styles.errorMsg}>
                    {String(errors[label].message)}
                </p>
            )}

        </div>
    )
}

export interface SelectProps {
    id: string
    label: string
    hideLabel?: boolean
    className?: string
    required?: boolean
    hideValidations?: boolean
    defaultValue?: string
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
    children: React.ReactNode,
    disabled?: boolean
    noMargin?: boolean
    isWhite?: boolean
}

export const Select = ({
    id,
    label,
    hideLabel,
    className,
    required,
    hideValidations,
    defaultValue,
    onChange = () => {},
    children,
    disabled,
    noMargin,
    isWhite
}: SelectProps) => {

    const { register, watch, formState: { errors } } = useFormContext()

    // watch the input value
    const inputValue = watch(label, '')

    // track focus state
    const [isFocused, setIsFocused] = useState(false)

    let validations: RegisterOptions = {
        onChange: (e) => onChange(e),
        required
    }
    
    if (!hideValidations) {
        validations = {
            required: required && 'This field is required'
        }
    }

    // determine whether the label should shrink based on focus or input value
    const shouldShrinkLabel = isFocused || inputValue !== ''

    return (
        <div className={clsx(
            styles.formLine,
            className,
            !hideValidations && errors[label] && styles.error,
            noMargin && styles.noMargin,
            isWhite && styles.isWhite
        )}>

            {!hideLabel && (
                <label
                    className={clsx(styles.label, 'text-16')}
                    htmlFor={id}
                    data-shrink={shouldShrinkLabel ? 'false' : 'true'}
                >
                    {label} {required && !hideValidations && <span className='red'>*</span>}
                </label>
            )}

            <div className={styles.lineWrapper}>

                <select
                    id={id}
                    className={clsx(styles.input, styles.select)}
                    defaultValue={defaultValue}
                    disabled={disabled || false}
                    {...register(label, {
                        onChange: (e) => onChange && onChange(e),
                        ...validations
                    })}
                >
                    {children}
                </select>

                <span className={styles.sideIcon}>
                    <UxChevronDown />
                </span>

            </div>

            {!hideValidations && errors[label] && (
                <p className={styles.errorMsg}>
                    {String(errors[label].message)}
                </p>
            )}

        </div>
    )
}

export interface TextareaProps {
    id: string
    label: string
    hideLabel?: boolean
    placeholder?: string
    className?: string
    required?: boolean
    maxLength?: number
    minLength?: number
    hideValidations?: boolean
    noMargin?: boolean
    isWhite?: boolean
}

export const Textarea = ({
    id,
    label,
    hideLabel,
    placeholder,
    required,
    minLength,
    maxLength,
    className,
    hideValidations,
    noMargin,
    isWhite
}: TextareaProps) => {

    const {
        register,
        formState: {
            errors
        }
    } = useFormContext() ?? {}

    let validations = {}
    
    if (!hideValidations) {
        validations = {
            required: required && 'This field is required',
            maxLength: maxLength && {
                value: maxLength,
                message: `Maximum characters exceeded`
            },
            minLength: minLength && {
                value: minLength,
                message: `The message is too short`
            }
        }
    }

    return (
        <div className={clsx(
            styles.formLine,
            className,
            !hideValidations && errors[label] && styles.error,
            noMargin && styles.noMargin,
            isWhite && styles.isWhite
        )}>

            {!hideLabel && (
                <label className={clsx(styles.label, 'text-16')} htmlFor={id}>
                    {label} {required && !hideValidations && <span className='red'>*</span>}
                </label>
            )}

            <div className={styles.lineWrapper}>
                <textarea
                    id={id}
                    placeholder={placeholder}
                    className={clsx(styles.input, styles.textarea)}
                    {...register(label, validations)}
                />
            </div>

            {!hideValidations && errors[label] && (
                <p className={styles.errorMsg}>
                    {String(errors[label].message)}
                </p>
            )}

        </div>
    )
}

export interface InputHiddenProps {
    label: string
    value: string
}

export const InputHidden = ({
    label,
    value
}: InputHiddenProps) => {

    const {
        register
    } = useFormContext() ?? {}

    return (
        <input
            type='hidden'
            value={value}
            {...register(label)}
        />
    )
}

export interface SubmitProps {
    style: 'solid' | 'hollow' | 'hollow-white' | 'white'
    text: string
    className?: string
}

export const Submit = ({
    style,
    text,
    className
}: SubmitProps) => {
    return (
        <button
            className={clsx(
                styles.submit,
                className,
                'button',
                style === 'solid' && 'button--solid',
                style === 'hollow' && 'button--hollow',
                style === 'hollow-white' && 'button--hollow-white',
                style === 'white' && 'button--white'
            )}
            type='submit'
        >

            <span className='button__text'>
                {text}
            </span>

            <span className='button__loading'>
                <span className='rotation' style={{ '--speed': '.3' } as any}>
                    <UxSpinner />
                </span>
            </span>

        </button>
    )
}

export interface CheckboxProps {
    type: 'checkbox' | 'radio'
    id: string
    label: string
    name: string
    className?: string
    required?: boolean
    hideValidations?: boolean
    disabled?: boolean
    checked?: boolean
    noMargin?: boolean
    isWhite?: boolean
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Checkbox = ({
    type,
    id,
    label,
    name,
    className,
    required,
    hideValidations,
    disabled,
    checked,
    noMargin,
    isWhite,
    onChange = () => {}
}: CheckboxProps) => {

    const { register, formState: { errors } } = useFormContext()

    let validations: RegisterOptions = {
        onChange: (e) => onChange(e),
        required
    }

    if (!hideValidations) {
        validations = {
            ...validations,
            required: required && 'This field is required'
        }
    }

    return (
        <label
            htmlFor={id}
            className={clsx(
                styles.radioWrapper,
                className,
                noMargin && styles.noMargin,
                isWhite && styles.isWhite
            )}
            data-error={errors[name] ? true : false}
            data-label
        >

            <input
                type={type}
                id={id}
                className={styles.checkbox}
                checked={checked}
                disabled={disabled || false}
                value={label}
                {...register(name, { ...validations })}
            />

            <span className={styles.radioWrapperInner}>

                <span className={styles.radioBox}>
                    <UxCheck />
                </span>

                <span className={styles.radioText}>
                    {label}
                </span>

            </span>

        </label>
    )
}