import { describe, expect, it } from 'vitest'
import { isValidInn, normalizePhone, validateRegistration } from '@/lib/registration'
import { ParticipantType } from '@/lib/types'

const base = {
  type: ParticipantType.PROFESSIONAL,
  firstName: 'Анна',
  lastName: 'Иванова',
  email: 'Anna@Example.ru ',
  phone: '8 (900) 123-45-67',
  organization: 'Ресторан «Сыроварня»',
  consent: true
}

describe('normalizePhone', () => {
  it('normalizes Russian numbers to +7XXXXXXXXXX', () => {
    expect(normalizePhone('+7 900 123-45-67')).toBe('+79001234567')
    expect(normalizePhone('8 (900) 123-45-67')).toBe('+79001234567')
    expect(normalizePhone('9001234567')).toBe('+79001234567')
  })

  it('rejects numbers of the wrong length or country', () => {
    expect(normalizePhone('12345')).toBeNull()
    expect(normalizePhone('+1 900 123 45 67')).toBeNull()
  })
})

describe('isValidInn', () => {
  it('accepts 10 and 12 digit INN only', () => {
    expect(isValidInn('7707083893')).toBe(true)
    expect(isValidInn('500100732259')).toBe(true)
    expect(isValidInn('77070838')).toBe(false)
    expect(isValidInn('77070838ab')).toBe(false)
  })
})

describe('validateRegistration', () => {
  it('accepts a valid professional registration and normalizes fields', () => {
    const result = validateRegistration(base)
    expect(result.ok).toBe(true)
    if (!result.ok) return
    expect(result.data.email).toBe('anna@example.ru')
    expect(result.data.phone).toBe('+79001234567')
    expect(result.data.competitionIds).toEqual([])
    expect(result.data.inn).toBeUndefined()
  })

  it('reports every missing required field', () => {
    const result = validateRegistration({})
    expect(result.ok).toBe(false)
    if (result.ok) return
    expect(Object.keys(result.errors).sort()).toEqual(
      ['consent', 'email', 'firstName', 'lastName', 'phone', 'type'].sort()
    )
  })

  it('requires an organization for professionals, producers and media', () => {
    for (const type of [ParticipantType.PROFESSIONAL, ParticipantType.PRODUCER, ParticipantType.MEDIA]) {
      const result = validateRegistration({ ...base, type, organization: ' ', inn: '7707083893' })
      expect(result.ok).toBe(false)
      if (!result.ok) expect(result.errors.organization).toBeDefined()
    }
  })

  it('requires a valid INN for producers', () => {
    const missing = validateRegistration({ ...base, type: ParticipantType.PRODUCER })
    expect(!missing.ok && missing.errors.inn).toBe('Укажите ИНН')

    const invalid = validateRegistration({ ...base, type: ParticipantType.PRODUCER, inn: '123' })
    expect(!invalid.ok && invalid.errors.inn).toBe('ИНН должен содержать 10 или 12 цифр')

    const valid = validateRegistration({ ...base, type: ParticipantType.PRODUCER, inn: '7707083893' })
    expect(valid.ok).toBe(true)
  })

  it('requires a university for students but not an organization', () => {
    const missing = validateRegistration({ ...base, type: ParticipantType.STUDENT, organization: '' })
    expect(!missing.ok && missing.errors).toEqual({ university: 'Укажите вуз' })

    const valid = validateRegistration({
      ...base,
      type: ParticipantType.STUDENT,
      organization: '',
      university: 'Тимирязевская академия'
    })
    expect(valid.ok).toBe(true)
  })

  it('requires at least one known competition for competitors', () => {
    const none = validateRegistration({ ...base, type: ParticipantType.COMPETITOR })
    expect(!none.ok && none.errors.competitionIds).toBe('Выберите хотя бы один конкурс')

    const unknown = validateRegistration({
      ...base,
      type: ParticipantType.COMPETITOR,
      competitionIds: ['cheese-pastry', 'not-a-competition']
    })
    expect(!unknown.ok && unknown.errors.competitionIds).toBe('Неизвестное конкурсное направление')

    const valid = validateRegistration({
      ...base,
      type: ParticipantType.COMPETITOR,
      competitionIds: ['cheese-pastry', 'cheese-pastry', 'cheese-experts']
    })
    expect(valid.ok && valid.data.competitionIds).toEqual(['cheese-pastry', 'cheese-experts'])
  })

  it('requires explicit consent', () => {
    const result = validateRegistration({ ...base, consent: 'yes' as unknown as boolean })
    expect(!result.ok && result.errors.consent).toBeDefined()
  })
})
