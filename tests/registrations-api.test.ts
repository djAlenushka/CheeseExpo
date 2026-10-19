import { beforeEach, describe, expect, it } from 'vitest'
import { NextRequest } from 'next/server'
import { POST } from '@/app/api/registrations/route'
import { clearRegistrations } from '@/lib/registration-store'

function request(body: string) {
  return new NextRequest('http://localhost/api/registrations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body
  })
}

const valid = {
  type: 'competitor',
  firstName: 'Илья',
  lastName: 'Петров',
  email: 'ilya@example.ru',
  phone: '+7 916 000-00-00',
  competitionIds: ['cheese-experts'],
  consent: true
}

describe('POST /api/registrations', () => {
  beforeEach(() => clearRegistrations())

  it('creates a registration and returns its id', async () => {
    const response = await POST(request(JSON.stringify(valid)))
    expect(response.status).toBe(201)
    const data = await response.json()
    expect(data.id).toMatch(/^CE27-[0-9A-F]{6}$/)
    expect(data.type).toBe('competitor')
  })

  it('returns field errors for invalid input', async () => {
    const response = await POST(request(JSON.stringify({ ...valid, email: 'nope' })))
    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.errors.email).toBe('Некорректный email')
  })

  it('rejects malformed JSON and non-object bodies', async () => {
    expect((await POST(request('{'))).status).toBe(400)
    expect((await POST(request('[]'))).status).toBe(400)
  })

  it('rejects a duplicate email for the same participation type', async () => {
    expect((await POST(request(JSON.stringify(valid)))).status).toBe(201)
    const duplicate = await POST(request(JSON.stringify({ ...valid, email: 'ILYA@example.ru' })))
    expect(duplicate.status).toBe(409)
  })
})
