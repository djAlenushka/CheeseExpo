/**
 * Хранилище заявок на регистрацию.
 * Пока база данных не подключена (см. DATABASE_URL в .env.example), заявки
 * хранятся в памяти процесса и теряются при перезапуске сервера.
 */

import { randomBytes } from 'crypto'
import type { Registration } from '@/lib/registration'

export interface StoredRegistration extends Registration {
  id: string
  createdAt: Date
}

const registrations = new Map<string, StoredRegistration>()

function generateId(): string {
  return `CE27-${randomBytes(3).toString('hex').toUpperCase()}`
}

export function saveRegistration(data: Registration): StoredRegistration {
  let id = generateId()
  while (registrations.has(id)) id = generateId()

  const stored: StoredRegistration = { ...data, id, createdAt: new Date() }
  registrations.set(id, stored)
  return stored
}

export function findRegistrationByEmail(email: string, type: Registration['type']) {
  return Array.from(registrations.values()).find((r) => r.email === email && r.type === type)
}

export function clearRegistrations() {
  registrations.clear()
}
