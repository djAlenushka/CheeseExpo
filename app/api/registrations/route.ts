/**
 * Registration API Endpoint
 * POST /api/registrations - Create a participant registration
 */

import { NextRequest, NextResponse } from 'next/server'
import { validateRegistration, type RegistrationInput } from '@/lib/registration'
import { findRegistrationByEmail, saveRegistration } from '@/lib/registration-store'

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const result = validateRegistration(body as Partial<RegistrationInput>)
  if (!result.ok) {
    return NextResponse.json({ error: 'Validation failed', errors: result.errors }, { status: 400 })
  }

  if (findRegistrationByEmail(result.data.email, result.data.type)) {
    return NextResponse.json(
      {
        error: 'Already registered',
        errors: { email: 'С этим email уже есть заявка на этот тип участия' }
      },
      { status: 409 }
    )
  }

  const registration = saveRegistration(result.data)

  // TODO: Отправить подтверждение на email участника и уведомление на ADMIN_EMAIL

  return NextResponse.json(
    { id: registration.id, type: registration.type },
    { status: 201 }
  )
}
