/**
 * Payment Integration Examples
 * Примеры использования платежных систем
 */

import {
  PaymentServiceFactory,
  YooKassaService,
  SberbankService,
  CloudPaymentsService,
  formatAmount,
  toKopecks,
  validateInn
} from './payment-services'
import { Order, PaymentMethod, ParticipantType, Receipt } from './types'

// ============================================
// ИНИЦИАЛИЗАЦИЯ СЕРВИСОВ
// ============================================

export function initializePaymentServices() {
  const factory = new PaymentServiceFactory({
    yookassa: {
      shopId: process.env.YOOKASSA_SHOP_ID || '',
      secretKey: process.env.YOOKASSA_SECRET_KEY || ''
    },
    sberbank: {
      merchantLogin: process.env.SBERBANK_MERCHANT_LOGIN || '',
      merchantPassword: process.env.SBERBANK_MERCHANT_PASSWORD || '',
      testMode: process.env.SBERBANK_TEST_MODE === 'true'
    },
    cloudPayments: {
      publicId: process.env.CLOUDPAYMENTS_PUBLIC_ID || '',
      apiSecret: process.env.CLOUDPAYMENTS_API_SECRET || ''
    }
  })

  return factory
}

// ============================================
// ПРИМЕР 1: РЕГИСТРАЦИЯ НА КОНКУРС С ПЛАТЕЖОМ (Яндекс.Касса)
// ============================================

export async function registerForCompetitionWithYooKassa(
  userId: string,
  competitionTitle: string,
  competitionFee: number,
  userEmail: string,
  userPhone: string
) {
  // 1. Создать заказ
  const order: Order = {
    id: `${userId}-${Date.now()}`,
    userId: userId,
    orderNumber: `ORD-${Date.now()}`,
    amount: toKopecks(competitionFee),
    currency: 'RUB',
    description: `Регистрация на конкурс: ${competitionTitle}`,
    registrationType: ParticipantType.COMPETITOR,
    billName: 'Участник события',
    billEmail: userEmail,
    billPhone: userPhone,
    status: 'pending' as any,
    paymentMethod: PaymentMethod.YOOKASSA,
    receiptSent: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }

  // 2. Инициализировать Яндекс.Касса
  const yookassa = new YooKassaService(
    process.env.YOOKASSA_SHOP_ID || '',
    process.env.YOOKASSA_SECRET_KEY || ''
  )

  // 3. Создать чек для онлайн-кассы
  const receipt: Receipt = {
    type: 'receipt',
    email: userEmail,
    phone: userPhone,
    tax_system_code: 1, // УСН 6% (доходы)
    items: [
      {
        description: competitionTitle,
        quantity: 1,
        amount: order.amount.toString(),
        tax_code: 1 // НДС 18%
      }
    ]
  }

  // 4. Создать платеж
  const returnUrl = `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`
  const paymentResponse = await yookassa.createPayment(order, returnUrl, receipt)

  console.log('✅ Payment created:', paymentResponse)

  // 5. Вернуть URL для редиректа
  return {
    paymentUrl: paymentResponse.confirmation?.confirmation_url,
    orderId: order.id,
    amount: formatAmount(order.amount),
    status: paymentResponse.status
  }
}

// ============================================
// ПРИМЕР 2: РЕГИСТРАЦИЯ ПРОИЗВОДИТЕЛЯ (Сбербанк)
// ============================================

export async function registerProducerWithSberbank(
  userId: string,
  companyName: string,
  inn: string,
  registrationFee: number,
  email: string,
  phone: string
) {
  // Проверить ИНН
  if (!validateInn(inn)) {
    throw new Error('Invalid INN format')
  }

  // Создать заказ
  const order: Order = {
    id: `${userId}-producer-${Date.now()}`,
    userId: userId,
    orderNumber: `PROD-${Date.now()}`,
    amount: toKopecks(registrationFee),
    currency: 'RUB',
    description: `Регистрация производителя: ${companyName}`,
    registrationType: ParticipantType.PRODUCER,
    billName: companyName,
    billEmail: email,
    billPhone: phone,
    billCompany: companyName,
    billInn: inn,
    status: 'pending' as any,
    paymentMethod: PaymentMethod.SBERBANK,
    receiptSent: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }

  // Инициализировать Сбербанк
  const sberbank = new SberbankService(
    process.env.SBERBANK_MERCHANT_LOGIN || '',
    process.env.SBERBANK_MERCHANT_PASSWORD || '',
    process.env.SBERBANK_TEST_MODE === 'true'
  )

  // Зарегистрировать заказ
  const returnUrl = `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`
  const failUrl = `${process.env.NEXT_PUBLIC_APP_URL}/payment/failed`

  const paymentResponse = await sberbank.registerOrder(
    order,
    returnUrl,
    failUrl
  )

  console.log('✅ Order registered in Sberbank:', paymentResponse)

  if (paymentResponse.errorCode) {
    throw new Error(`Sberbank error: ${paymentResponse.errorMessage}`)
  }

  return {
    paymentUrl: paymentResponse.formUrl,
    orderId: order.id,
    amount: formatAmount(order.amount),
    orderNumber: order.orderNumber
  }
}

// ============================================
// ПРИМЕР 3: ПЛАТЕЖ ДЛЯ ЭКСПОНЕНТА (CloudPayments)
// ============================================

export async function registerExhibitorWithCloudPayments(
  userId: string,
  boothPackage: 'basic' | 'standard' | 'premium' | 'vip',
  amount: number,
  email: string,
  phone: string,
  companyName: string
) {
  const packagePrices: Record<string, number> = {
    basic: 25000,
    standard: 50000,
    premium: 100000,
    vip: 250000
  }

  const order: Order = {
    id: `${userId}-exhibitor-${Date.now()}`,
    userId: userId,
    orderNumber: `EXH-${Date.now()}`,
    amount: toKopecks(packagePrices[boothPackage]),
    currency: 'RUB',
    description: `Стенд ${boothPackage.toUpperCase()} - ${companyName}`,
    registrationType: ParticipantType.PRODUCER,
    billName: companyName,
    billEmail: email,
    billPhone: phone,
    billCompany: companyName,
    status: 'pending' as any,
    paymentMethod: PaymentMethod.CLOUDPAYMENTS,
    receiptSent: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }

  // Инициализировать CloudPayments
  const cloudPayments = new CloudPaymentsService(
    process.env.CLOUDPAYMENTS_PUBLIC_ID || '',
    process.env.CLOUDPAYMENTS_API_SECRET || ''
  )

  // Создать платеж
  const paymentResponse = await cloudPayments.createPayment(order)

  console.log('✅ Payment created in CloudPayments:', paymentResponse)

  if (!paymentResponse.Success) {
    throw new Error(`CloudPayments error: ${paymentResponse.Message}`)
  }

  return {
    transactionId: paymentResponse.Model?.TransactionId,
    orderId: order.id,
    amount: formatAmount(order.amount),
    status: paymentResponse.Model?.Status,
    receiptEmail: email
  }
}

// ============================================
// ПРИМЕР 4: ОБРАБОТКА WEBHOOK'A (Яндекс.Касса)
// ============================================

export async function handleYooKassaWebhook(payload: any) {
  const yookassa = new YooKassaService(
    process.env.YOOKASSA_SHOP_ID || '',
    process.env.YOOKASSA_SECRET_KEY || ''
  )

  // Проверить сигнатуру (дополнительно)
  // const isValid = verifyYooKassaSignature(payload, signature)

  if (payload.type === 'payment.succeeded') {
    const payment = payload.object

    console.log(`✅ Payment succeeded:
      - Payment ID: ${payment.id}
      - Order ID: ${payment.metadata.order_id}
      - Amount: ${payment.amount.value} ${payment.amount.currency}
      - Status: ${payment.status}
    `)

    // Здесь обновить статус заказа в БД
    // await updateOrderStatus(payment.metadata.order_id, 'succeeded')
    // await createParticipant(payment.metadata.user_id)
    // await sendConfirmationEmail(...)
  }

  if (payload.type === 'payment.canceled') {
    const payment = payload.object

    console.log(`❌ Payment canceled:
      - Payment ID: ${payment.id}
      - Order ID: ${payment.metadata.order_id}
    `)

    // await updateOrderStatus(payment.metadata.order_id, 'canceled')
  }

  return { success: true }
}

// ============================================
// ПРИМЕР 5: ВОЗВРАТ ПЛАТЕЖА
// ============================================

export async function refundPayment(
  orderId: string,
  amount: number,
  paymentMethod: PaymentMethod,
  externalPaymentId: string
) {
  const factory = initializePaymentServices()
  const service = factory.getService(paymentMethod)

  if (paymentMethod === PaymentMethod.YOOKASSA) {
    const yookassa = service as YooKassaService
    const result = await yookassa.refundPayment(externalPaymentId, amount)

    console.log('✅ Refund initiated:', result)
    return result
  }

  if (paymentMethod === PaymentMethod.CLOUDPAYMENTS) {
    const cloudPayments = service as CloudPaymentsService
    const result = await cloudPayments.refundPayment(
      parseInt(externalPaymentId),
      amount
    )

    console.log('✅ Refund initiated:', result)
    return result
  }

  throw new Error('Refund not supported for this payment method')
}

// ============================================
// ПРИМЕР 6: ПОЛУЧЕНИЕ СТАТУСА ПЛАТЕЖА
// ============================================

export async function checkPaymentStatus(
  paymentId: string,
  paymentMethod: PaymentMethod
) {
  const factory = initializePaymentServices()
  const service = factory.getService(paymentMethod)

  if (paymentMethod === PaymentMethod.YOOKASSA) {
    const yookassa = service as YooKassaService
    const status = await yookassa.getPaymentStatus(paymentId)
    return {
      id: status.id,
      status: status.status,
      amount: status.amount.value,
      currency: status.amount.currency
    }
  }

  if (paymentMethod === PaymentMethod.CLOUDPAYMENTS) {
    const cloudPayments = service as CloudPaymentsService
    const info = await cloudPayments.getPaymentInfo(parseInt(paymentId))
    return {
      id: info.Model?.TransactionId,
      status: info.Model?.Status,
      amount: info.Model?.Amount,
      currency: info.Model?.Currency
    }
  }

  throw new Error('Unsupported payment method')
}

// ============================================
// ПРИМЕР 7: ГЕНЕРАЦИЯ СЧЕТА-ФАКТУРЫ
// ============================================

export function generateInvoice(
  order: Order,
  invoiceNumber: string
) {
  return {
    invoiceNumber: invoiceNumber,
    orderNumber: order.orderNumber,
    date: new Date().toISOString().split('T')[0],

    // Продавец
    seller: {
      name: process.env.COMPANY_NAME,
      inn: process.env.COMPANY_INN,
      kpp: process.env.COMPANY_KPP,
      address: process.env.COMPANY_ADDRESS,
      bankAccount: process.env.COMPANY_BANK_ACCOUNT,
      bankName: process.env.COMPANY_BANK_NAME,
      bik: process.env.COMPANY_BANK_BIK
    },

    // Покупатель
    buyer: {
      name: order.billCompany || order.billName,
      inn: order.billInn,
      email: order.billEmail,
      phone: order.billPhone
    },

    // Детали
    description: order.description,
    amount: formatAmount(order.amount),
    currency: 'RUB',

    // Статус
    status: 'issued',
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0]
  }
}
