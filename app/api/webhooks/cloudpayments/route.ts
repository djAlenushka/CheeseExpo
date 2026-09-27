/**
 * CloudPayments Webhook Handler
 * POST /api/webhooks/cloudpayments - Receive payment notifications
 */

import { NextRequest, NextResponse } from 'next/server'
import { CloudPaymentsService } from '@/lib/payment-services'
import crypto from 'crypto'

/**
 * Обработка webhook от CloudPayments
 *
 * CloudPayments отправляет POST запрос при завершении платежа
 * Signature = HMAC-SHA256(Body, APISecret) в base64
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('x-cp-signature')

    // Проверить подпись
    const cloudPayments = new CloudPaymentsService(
      process.env.CLOUDPAYMENTS_PUBLIC_ID || '',
      process.env.CLOUDPAYMENTS_API_SECRET || ''
    )

    if (!cloudPayments.verifyWebhookSignature(body, signature || '')) {
      console.warn('❌ CloudPayments: Invalid signature')
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      )
    }

    const payload = JSON.parse(body)

    console.log('📩 CloudPayments webhook received:', payload)

    // Обработать платеж
    if (payload.Status === 'Completed') {
      console.log(`✅ Payment completed:
        - Transaction ID: ${payload.TransactionId}
        - Order ID: ${payload.OrderId}
        - Amount: ${payload.Amount} ${payload.Currency}
      `)

      // TODO: Обновить статус заказа в БД
      // await updateOrderStatus(payload.OrderId, 'succeeded')
      // await createParticipant(...)
      // await sendConfirmationEmail(...)
    } else if (payload.Status === 'Failed' || payload.Status === 'Declined') {
      console.log(`❌ Payment failed:
        - Transaction ID: ${payload.TransactionId}
        - Order ID: ${payload.OrderId}
        - Reason: ${payload.Reason}
      `)

      // TODO: Обновить статус заказа
      // await updateOrderStatus(payload.OrderId, 'failed')
    }

    // Вернуть успешный ответ
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('CloudPayments webhook error:', error)

    // Даже при ошибке вернуть успешный статус
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Webhook processing failed' },
      { status: 200 }
    )
  }
}

/**
 * GET для проверки конфигурации webhook'а
 */
export async function GET(request: NextRequest) {
  return NextResponse.json({
    status: 'ok',
    webhook: 'cloudpayments',
    endpoint: '/api/webhooks/cloudpayments'
  })
}
