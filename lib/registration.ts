/**
 * Регистрация участников Cheese Expo 2027
 * Общая валидация для формы на сайте и API /api/registrations
 */

import { ParticipantType } from '@/lib/types'
import { competitions } from '@/lib/competitions'

export const registrationTypes: { value: ParticipantType; label: string; hint: string }[] = [
  {
    value: ParticipantType.PROFESSIONAL,
    label: 'Профессионал HoReCa',
    hint: 'Шефы, сомелье, закупщики, рестораторы'
  },
  {
    value: ParticipantType.PRODUCER,
    label: 'Производитель / экспонент',
    hint: 'Сыроварни и производители сопутствующих продуктов'
  },
  {
    value: ParticipantType.COMPETITOR,
    label: 'Участник конкурса',
    hint: 'Подача заявки в одно или несколько конкурсных направлений'
  },
  {
    value: ParticipantType.STUDENT,
    label: 'Молодой специалист',
    hint: 'Студенты аграрных и пищевых вузов'
  },
  {
    value: ParticipantType.MEDIA,
    label: 'Пресса',
    hint: 'Журналисты и блогеры'
  }
]

export interface RegistrationInput {
  type: string
  firstName: string
  lastName: string
  email: string
  phone: string
  organization?: string
  position?: string
  inn?: string
  university?: string
  competitionIds?: string[]
  comment?: string
  consent: boolean
}

export interface Registration {
  type: ParticipantType
  firstName: string
  lastName: string
  email: string
  phone: string
  organization?: string
  position?: string
  inn?: string
  university?: string
  competitionIds: string[]
  comment?: string
}

export type RegistrationErrors = Partial<Record<keyof RegistrationInput, string>>

export type ValidationResult =
  | { ok: true; data: Registration }
  | { ok: false; errors: RegistrationErrors }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_TEXT = 200
const MAX_COMMENT = 1000

const ORGANIZATION_REQUIRED: ParticipantType[] = [
  ParticipantType.PROFESSIONAL,
  ParticipantType.PRODUCER,
  ParticipantType.MEDIA
]

export function isParticipantType(value: unknown): value is ParticipantType {
  return registrationTypes.some((t) => t.value === value)
}

export function isCompetitionId(value: unknown): boolean {
  return competitions.some((c) => c.id === value)
}

/** Приводит российский номер к виду +7XXXXXXXXXX, иначе возвращает null */
export function normalizePhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, '')
  if (digits.length === 10) return `+7${digits}`
  if (digits.length === 11 && (digits[0] === '7' || digits[0] === '8')) {
    return `+7${digits.slice(1)}`
  }
  return null
}

/** ИНН: 10 цифр для юрлица, 12 для ИП */
export function isValidInn(raw: string): boolean {
  return /^(\d{10}|\d{12})$/.test(raw)
}

function text(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

function optional(value: string): string | undefined {
  return value === '' ? undefined : value
}

export function validateRegistration(input: Partial<RegistrationInput>): ValidationResult {
  const errors: RegistrationErrors = {}

  const type = input.type
  if (!isParticipantType(type)) {
    errors.type = 'Выберите тип участия'
  }

  const firstName = text(input.firstName)
  const lastName = text(input.lastName)
  if (!firstName) errors.firstName = 'Укажите имя'
  else if (firstName.length > MAX_TEXT) errors.firstName = 'Слишком длинное имя'
  if (!lastName) errors.lastName = 'Укажите фамилию'
  else if (lastName.length > MAX_TEXT) errors.lastName = 'Слишком длинная фамилия'

  const email = text(input.email).toLowerCase()
  if (!email) errors.email = 'Укажите email'
  else if (!EMAIL_RE.test(email) || email.length > MAX_TEXT) errors.email = 'Некорректный email'

  const phoneRaw = text(input.phone)
  const phone = normalizePhone(phoneRaw)
  if (!phoneRaw) errors.phone = 'Укажите телефон'
  else if (!phone) errors.phone = 'Введите российский номер, например +7 900 123-45-67'

  const organization = text(input.organization)
  const position = text(input.position)
  const inn = text(input.inn)
  const university = text(input.university)
  const comment = text(input.comment)

  if (organization.length > MAX_TEXT) errors.organization = 'Слишком длинное название'
  if (position.length > MAX_TEXT) errors.position = 'Слишком длинная должность'
  if (university.length > MAX_TEXT) errors.university = 'Слишком длинное название'
  if (comment.length > MAX_COMMENT) errors.comment = `Не более ${MAX_COMMENT} символов`

  if (isParticipantType(type) && ORGANIZATION_REQUIRED.includes(type) && !organization) {
    errors.organization = 'Укажите компанию или издание'
  }

  if (type === ParticipantType.PRODUCER) {
    if (!inn) errors.inn = 'Укажите ИНН'
    else if (!isValidInn(inn)) errors.inn = 'ИНН должен содержать 10 или 12 цифр'
  } else if (inn && !isValidInn(inn)) {
    errors.inn = 'ИНН должен содержать 10 или 12 цифр'
  }

  if (type === ParticipantType.STUDENT && !university) {
    errors.university = 'Укажите вуз'
  }

  const rawIds = Array.isArray(input.competitionIds) ? input.competitionIds : []
  const competitionIds = Array.from(new Set(rawIds))
  if (competitionIds.some((id) => !isCompetitionId(id))) {
    errors.competitionIds = 'Неизвестное конкурсное направление'
  } else if (type === ParticipantType.COMPETITOR && competitionIds.length === 0) {
    errors.competitionIds = 'Выберите хотя бы один конкурс'
  }

  if (input.consent !== true) {
    errors.consent = 'Необходимо согласие на обработку персональных данных'
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors }
  }

  return {
    ok: true,
    data: {
      type: type as ParticipantType,
      firstName,
      lastName,
      email,
      phone: phone as string,
      organization: optional(organization),
      position: optional(position),
      inn: optional(inn),
      university: optional(university),
      competitionIds,
      comment: optional(comment)
    }
  }
}
