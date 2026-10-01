'use client'

import Link from 'next/link'
import { FormEvent, useState } from 'react'
import clsx from 'clsx'
import { competitions } from '@/lib/competitions'
import {
  RegistrationErrors,
  RegistrationInput,
  registrationTypes,
  validateRegistration
} from '@/lib/registration'
import { ParticipantType } from '@/lib/types'

interface RegistrationFormProps {
  initialType: ParticipantType
  initialCompetitionIds: string[]
}

type Status =
  | { state: 'idle' }
  | { state: 'submitting' }
  | { state: 'success'; id: string }
  | { state: 'error'; message: string }

const inputClass =
  'w-full rounded border border-gray-300 bg-white px-4 py-3 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold'

function Field({
  id,
  label,
  required,
  error,
  children
}: {
  id: string
  label: string
  required?: boolean
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold mb-2">
        {label}
        {required && <span className="text-terracotta"> *</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}

export default function RegistrationForm({ initialType, initialCompetitionIds }: RegistrationFormProps) {
  const [values, setValues] = useState<RegistrationInput>({
    type: initialType,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
    position: '',
    inn: '',
    university: '',
    competitionIds: initialCompetitionIds,
    comment: '',
    consent: false
  })
  const [errors, setErrors] = useState<RegistrationErrors>({})
  const [status, setStatus] = useState<Status>({ state: 'idle' })

  const type = values.type as ParticipantType
  const needsOrganization = [
    ParticipantType.PROFESSIONAL,
    ParticipantType.PRODUCER,
    ParticipantType.MEDIA
  ].includes(type)

  function update<K extends keyof RegistrationInput>(key: K, value: RegistrationInput[K]) {
    setValues((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  function toggleCompetition(id: string) {
    const current = values.competitionIds ?? []
    update(
      'competitionIds',
      current.includes(id) ? current.filter((c) => c !== id) : [...current, id]
    )
  }

  function inputProps(key: keyof RegistrationInput) {
    return {
      id: key,
      name: key,
      'aria-invalid': errors[key] ? true : undefined,
      'aria-describedby': errors[key] ? `${key}-error` : undefined,
      className: clsx(inputClass, errors[key] && 'border-red-500')
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const result = validateRegistration(values)
    if (!result.ok) {
      setErrors(result.errors)
      setStatus({ state: 'idle' })
      return
    }

    setStatus({ state: 'submitting' })
    try {
      const response = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      })
      const data = await response.json()

      if (response.ok) {
        setStatus({ state: 'success', id: data.id })
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
      if (data.errors) setErrors(data.errors)
      setStatus({ state: 'error', message: 'Проверьте поля формы и попробуйте ещё раз.' })
    } catch {
      setStatus({
        state: 'error',
        message: 'Не удалось отправить заявку. Попробуйте позже или напишите на register@cheeseexpo.pro.'
      })
    }
  }

  if (status.state === 'success') {
    return (
      <div className="card border-l-4 border-gold text-center py-12">
        <div className="text-5xl mb-4">🧀</div>
        <h2 className="text-3xl font-serif font-bold mb-4">Заявка принята</h2>
        <p className="text-gray-700 mb-2">
          Номер вашей заявки: <span className="font-bold text-gold">{status.id}</span>
        </p>
        <p className="text-gray-600 mb-8 max-w-xl mx-auto">
          Мы проверим данные и свяжемся с вами по email {values.email.trim().toLowerCase()} для
          подтверждения участия и оплаты.
        </p>
        <Link href="/" className="button-primary">
          На главную
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="card space-y-8 p-6 md:p-10">
      <fieldset>
        <legend className="text-2xl font-serif font-bold mb-4">Тип участия</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {registrationTypes.map((option) => (
            <label
              key={option.value}
              className={clsx(
                'flex cursor-pointer gap-3 rounded border p-4 transition',
                values.type === option.value
                  ? 'border-gold bg-amber-50'
                  : 'border-gray-200 hover:border-gray-400'
              )}
            >
              <input
                type="radio"
                name="type"
                value={option.value}
                checked={values.type === option.value}
                onChange={() => update('type', option.value)}
                className="mt-1 accent-black"
              />
              <span>
                <span className="block font-semibold">{option.label}</span>
                <span className="block text-sm text-gray-600">{option.hint}</span>
              </span>
            </label>
          ))}
        </div>
        {errors.type && <p className="mt-2 text-sm text-red-600">{errors.type}</p>}
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-2xl font-serif font-bold mb-4">Контактные данные</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field id="firstName" label="Имя" required error={errors.firstName}>
            <input
              {...inputProps('firstName')}
              autoComplete="given-name"
              value={values.firstName}
              onChange={(e) => update('firstName', e.target.value)}
            />
          </Field>
          <Field id="lastName" label="Фамилия" required error={errors.lastName}>
            <input
              {...inputProps('lastName')}
              autoComplete="family-name"
              value={values.lastName}
              onChange={(e) => update('lastName', e.target.value)}
            />
          </Field>
          <Field id="email" label="Email" required error={errors.email}>
            <input
              {...inputProps('email')}
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={(e) => update('email', e.target.value)}
            />
          </Field>
          <Field id="phone" label="Телефон" required error={errors.phone}>
            <input
              {...inputProps('phone')}
              type="tel"
              autoComplete="tel"
              placeholder="+7 900 123-45-67"
              value={values.phone}
              onChange={(e) => update('phone', e.target.value)}
            />
          </Field>
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-2xl font-serif font-bold mb-4">
          {type === ParticipantType.STUDENT ? 'Учёба' : 'Организация'}
        </legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {type === ParticipantType.STUDENT ? (
            <Field id="university" label="Вуз" required error={errors.university}>
              <input
                {...inputProps('university')}
                value={values.university}
                onChange={(e) => update('university', e.target.value)}
              />
            </Field>
          ) : (
            <Field
              id="organization"
              label={type === ParticipantType.MEDIA ? 'Издание' : 'Компания'}
              required={needsOrganization}
              error={errors.organization}
            >
              <input
                {...inputProps('organization')}
                autoComplete="organization"
                value={values.organization}
                onChange={(e) => update('organization', e.target.value)}
              />
            </Field>
          )}
          <Field
            id="position"
            label={type === ParticipantType.STUDENT ? 'Специальность' : 'Должность'}
            error={errors.position}
          >
            <input
              {...inputProps('position')}
              autoComplete="organization-title"
              value={values.position}
              onChange={(e) => update('position', e.target.value)}
            />
          </Field>
          {type === ParticipantType.PRODUCER && (
            <Field id="inn" label="ИНН" required error={errors.inn}>
              <input
                {...inputProps('inn')}
                inputMode="numeric"
                maxLength={12}
                value={values.inn}
                onChange={(e) => update('inn', e.target.value.replace(/\D/g, ''))}
              />
            </Field>
          )}
        </div>
      </fieldset>

      {(type === ParticipantType.COMPETITOR || (values.competitionIds ?? []).length > 0) && (
        <fieldset>
          <legend className="text-2xl font-serif font-bold mb-4">Конкурсные направления</legend>
          <div className="space-y-2">
            {competitions.map((competition) => (
              <label key={competition.id} className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={(values.competitionIds ?? []).includes(competition.id)}
                  onChange={() => toggleCompetition(competition.id)}
                  className="mt-1.5 accent-black"
                />
                <span>
                  {competition.icon} {competition.title}
                </span>
              </label>
            ))}
          </div>
          {errors.competitionIds && (
            <p className="mt-2 text-sm text-red-600">{errors.competitionIds}</p>
          )}
        </fieldset>
      )}

      <Field id="comment" label="Комментарий" error={errors.comment}>
        <textarea
          {...inputProps('comment')}
          rows={4}
          value={values.comment}
          onChange={(e) => update('comment', e.target.value)}
        />
      </Field>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={values.consent}
            onChange={(e) => update('consent', e.target.checked)}
            className="mt-1 accent-black"
          />
          <span>
            Я согласен(на) на обработку персональных данных в соответствии с{' '}
            <Link href="/privacy" className="text-gold hover:underline">
              политикой конфиденциальности
            </Link>
          </span>
        </label>
        {errors.consent && <p className="mt-1 text-sm text-red-600">{errors.consent}</p>}
      </div>

      {status.state === 'error' && (
        <p role="alert" className="rounded bg-red-50 p-4 text-sm text-red-700">
          {status.message}
        </p>
      )}

      <button
        type="submit"
        disabled={status.state === 'submitting'}
        className="button-primary w-full md:w-auto disabled:opacity-60"
      >
        {status.state === 'submitting' ? 'Отправляем…' : 'Отправить заявку'}
      </button>
    </form>
  )
}
