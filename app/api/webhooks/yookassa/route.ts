/**
 * Яндекс.Касса Webhook Handler
 * POST /api/webhooks/yookassa - Receive payment notifications
 */

import { NextRequest, NextResponse } from 'next/server'
import { handleYooKassaWebhook } from '@/lib/payment-examples'

/**
 * Обработка webhook от Яндекс.Кассы
 *
 * Яндекс.Касса отправляет POST запрос с информацией о платеже
 * при изменении его статуса
 */
export async function POST(request: NextRequest) {
  try {
    const payload = await request.json()

    console.log('📩 YooKassa webhook received:', payload)

    // Обработать webhook
    const result = await handleYooKassaWebhook(payload)

    // Вернуть успешный ответ
    return NextResponse.json(result, { status: 200 })
  } catch (error) {
    console.error('Webhook error:', error)

    // Даже при ошибке вернуть 200, чтобы Яндекс.Касса не повторяла запрос
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Webhook processing failed' },
      { status: 200 }
    )
  }
}

/**
 * GET для проверки конфигурации webhook'а (для тестирования)
 */
export async function GET(request: NextRequest) {
  return NextResponse.json({
    status: 'ok',
    webhook: 'yookassa',
    endpoint: '/api/webhooks/yookassa'
  })
}
