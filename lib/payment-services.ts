/**
 * Payment Services for Russian Payment Providers
 * Интеграция с Яндекс.Касса, Сбербанк, CloudPayments
 */

import {
  PaymentMethod,
  Order,
  PaymentStatus,
  YooKassaPaymentRequest,
  YooKassaPaymentResponse,
  SberbankPaymentRequest,
  SberbankPaymentResponse,
  CloudPaymentsPaymentRequest,
  CloudPaymentsPaymentResponse,
  Receipt,
  ReceiptItem
} from './types'

// ============================================
// YOOKASSA (Яндекс.Касса) SERVICE
// ============================================

export class YooKassaService {
  private shopId: string
  private secretKey: string
  private apiUrl = 'https://api.yookassa.ru/v3'

  constructor(shopId: string, secretKey: string) {
    this.shopId = shopId
    this.secretKey = secretKey
  }

  /**
   * Создать платеж в Яндекс.Касса
   */
  async createPayment(
    order: Order,
    returnUrl: string,
    receipt?: Receipt
  ): Promise<YooKassaPaymentResponse> {
    const payload: YooKassaPaymentRequest = {
      amount: {
        value: (order.amount / 100).toFixed(2),
        currency: 'RUB'
      },
      payment_method_data: {
        type: 'bank_card'
      },
      confirmation: {
        type: 'redirect',
        return_url: returnUrl
      },
      description: order.description,
      metadata: {
        order_id: order.id,
        user_id: order.userId,
        registration_type: order.registrationType
      }
    }

    // Добавить чек для онлайн-кассы, если нужно
    if (receipt) {
      payload.receipt = receipt
    }

    const auth = Buffer.from(`${this.shopId}:${this.secretKey}`).toString('base64')

    const response = await fetch(`${this.apiUrl}/payments`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
        'Idempotence-Key': this.generateIdempotenceKey()
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      throw new Error(`YooKassa API error: ${response.statusText}`)
    }

    return response.json() as Promise<YooKassaPaymentResponse>
  }

  /**
   * Получить статус платежа
   */
  async getPaymentStatus(paymentId: string): Promise<YooKassaPaymentResponse> {
    const auth = Buffer.from(`${this.shopId}:${this.secretKey}`).toString('base64')

    const response = await fetch(`${this.apiUrl}/payments/${paymentId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`YooKassa API error: ${response.statusText}`)
    }

    return response.json() as Promise<YooKassaPaymentResponse>
  }

  /**
   * Вернуть платеж
   */
  async refundPayment(paymentId: string, amount: number): Promise<any> {
    const auth = Buffer.from(`${this.shopId}:${this.secretKey}`).toString('base64')

    const payload = {
      amount: {
        value: (amount / 100).toFixed(2),
        currency: 'RUB'
      },
      payment_id: paymentId
    }

    const response = await fetch(`${this.apiUrl}/refunds`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
        'Idempotence-Key': this.generateIdempotenceKey()
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      throw new Error(`YooKassa refund error: ${response.statusText}`)
    }

    return response.json()
  }

  /**
   * Создать чек для онлайн-кассы
   */
  generateReceipt(order: Order, taxSystemCode: number = 1): Receipt {
    const items: ReceiptItem[] = [
      {
        description: order.description,
        quantity: 1,
        amount: order.amount.toString(),
        tax_code: taxSystemCode
      }
    ]

    return {
      type: 'receipt',
      email: order.billEmail,
      phone: order.billPhone,
      tax_system_code: taxSystemCode,
      items
    }
  }

  private generateIdempotenceKey(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }
}

// ============================================
// SBERBANK SERVICE
// ============================================

export class SberbankService {
  private merchantLogin: string
  private merchantPassword: string
  private testMode: boolean
  private apiUrl: string

  constructor(merchantLogin: string, merchantPassword: string, testMode = false) {
    this.merchantLogin = merchantLogin
    this.merchantPassword = merchantPassword
    this.testMode = testMode
    this.apiUrl = testMode
      ? 'https://3dsec.sberbank.ru/payment/rest'
      : 'https://ecommerce.raiffeisen.ru/api/payment/v1'
  }

  /**
   * Зарегистрировать заказ
   */
  async registerOrder(
    order: Order,
    returnUrl: string,
    failUrl?: string
  ): Promise<SberbankPaymentResponse> {
    const params = new URLSearchParams({
      userName: this.merchantLogin,
      password: this.merchantPassword,
      orderNumber: order.orderNumber,
      amount: Math.round(order.amount * 100).toString(), // в копейках
      currency: '810', // Рубли
      returnUrl: returnUrl,
      failUrl: failUrl || returnUrl,
      description: order.description,
      clientId: order.userId,
      email: order.billEmail,
      phone: order.billPhone?.replace(/\D/g, '').slice(-11)
    })

    const response = await fetch(`${this.apiUrl}/register.do`, {
      method: 'POST',
      body: params
    })

    if (!response.ok) {
      throw new Error(`Sberbank API error: ${response.statusText}`)
    }

    return response.json() as Promise<SberbankPaymentResponse>
  }

  /**
   * Получить статус заказа
   */
  async getOrderStatus(orderId: string): Promise<any> {
    const params = new URLSearchParams({
      userName: this.merchantLogin,
      password: this.merchantPassword,
      orderId: orderId
    })

    const response = await fetch(`${this.apiUrl}/getOrderStatusExtended.do`, {
      method: 'POST',
      body: params
    })

    if (!response.ok) {
      throw new Error(`Sberbank API error: ${response.statusText}`)
    }

    return response.json()
  }

  /**
   * Откатить транзакцию
   */
  async reverseTransaction(orderId: string): Promise<any> {
    const params = new URLSearchParams({
      userName: this.merchantLogin,
      password: this.merchantPassword,
      orderId: orderId
    })

    const response = await fetch(`${this.apiUrl}/reverse.do`, {
      method: 'POST',
      body: params
    })

    if (!response.ok) {
      throw new Error(`Sberbank reverse error: ${response.statusText}`)
    }

    return response.json()
  }
}

// ============================================
// CLOUDPAYMENTS SERVICE
// ============================================

export class CloudPaymentsService {
  private publicId: string
  private apiSecret: string
  private apiUrl = 'https://api.cloudpayments.ru'

  constructor(publicId: string, apiSecret: string) {
    this.publicId = publicId
    this.apiSecret = apiSecret
  }

  /**
   * Создать платеж
   */
  async createPayment(
    order: Order,
    cardData?: {
      cardNumber: string
      cardExpDate: string
      cardCvc: string
    }
  ): Promise<CloudPaymentsPaymentResponse> {
    const payload: CloudPaymentsPaymentRequest = {
      Amount: order.amount / 100,
      Currency: 'RUB',
      OrderId: order.id,
      Description: order.description,
      AccountId: order.userId,
      Email: order.billEmail,
      Phone: order.billPhone,
      Invoiced: true // Отправить счет
    }

    const auth = Buffer.from(`${this.publicId}:${this.apiSecret}`).toString('base64')

    const endpoint = cardData ? '/payments/cards/charge' : '/payments/tokens/charge'

    const response = await fetch(`${this.apiUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        cardData
          ? { ...payload, ...cardData }
          : payload
      )
    })

    if (!response.ok) {
      throw new Error(`CloudPayments API error: ${response.statusText}`)
    }

    return response.json() as Promise<CloudPaymentsPaymentResponse>
  }

  /**
   * Получить информацию о платеже
   */
  async getPaymentInfo(transactionId: number): Promise<any> {
    const auth = Buffer.from(`${this.publicId}:${this.apiSecret}`).toString('base64')

    const response = await fetch(
      `${this.apiUrl}/payments/get?transactionId=${transactionId}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json'
        }
      }
    )

    if (!response.ok) {
      throw new Error(`CloudPayments API error: ${response.statusText}`)
    }

    return response.json()
  }

  /**
   * Возврат платежа
   */
  async refundPayment(
    transactionId: number,
    amount: number
  ): Promise<any> {
    const auth = Buffer.from(`${this.publicId}:${this.apiSecret}`).toString('base64')

    const payload = {
      TransactionId: transactionId,
      Amount: amount / 100
    }

    const response = await fetch(`${this.apiUrl}/payments/refund`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      throw new Error(`CloudPayments refund error: ${response.statusText}`)
    }

    return response.json()
  }

  /**
   * Проверить подпись Webhook'а
   */
  verifyWebhookSignature(body: string, signature: string): boolean {
    const crypto = require('crypto')
    const hash = crypto
      .createHmac('sha256', this.apiSecret)
      .update(body)
      .digest('base64')

    return hash === signature
  }
}

// ============================================
// PAYMENT FACTORY & ROUTER
// ============================================

export class PaymentServiceFactory {
  private yooKassa?: YooKassaService
  private sberbank?: SberbankService
  private cloudPayments?: CloudPaymentsService

  constructor(config: {
    yookassa?: { shopId: string; secretKey: string }
    sberbank?: { merchantLogin: string; merchantPassword: string; testMode?: boolean }
    cloudPayments?: { publicId: string; apiSecret: string }
  }) {
    if (config.yookassa) {
      this.yooKassa = new YooKassaService(config.yookassa.shopId, config.yookassa.secretKey)
    }

    if (config.sberbank) {
      this.sberbank = new SberbankService(
        config.sberbank.merchantLogin,
        config.sberbank.merchantPassword,
        config.sberbank.testMode
      )
    }

    if (config.cloudPayments) {
      this.cloudPayments = new CloudPaymentsService(
        config.cloudPayments.publicId,
        config.cloudPayments.apiSecret
      )
    }
  }

  getService(method: PaymentMethod) {
    switch (method) {
      case PaymentMethod.YOOKASSA:
        if (!this.yooKassa) throw new Error('YooKassa not configured')
        return this.yooKassa
      case PaymentMethod.SBERBANK:
        if (!this.sberbank) throw new Error('Sberbank not configured')
        return this.sberbank
      case PaymentMethod.CLOUDPAYMENTS:
        if (!this.cloudPayments) throw new Error('CloudPayments not configured')
        return this.cloudPayments
      default:
        throw new Error(`Unknown payment method: ${method}`)
    }
  }
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Форматировать сумму из копеек в рубли
 */
export function formatAmount(kopecks: number): string {
  return (kopecks / 100).toFixed(2)
}

/**
 * Конвертировать рубли в копейки
 */
export function toKopecks(rubles: number): number {
  return Math.round(rubles * 100)
}

/**
 * Проверить корректность ИНН
 */
export function validateInn(inn: string): boolean {
  if (!/^\d{10}$|^\d{12}$/.test(inn)) {
    return false
  }

  if (inn.length === 10) {
    const checksum = calculateChecksum(inn.slice(0, 9), [2, 3, 4, 5, 6, 7, 8, 9, 10])
    return checksum === parseInt(inn[9])
  }

  if (inn.length === 12) {
    const checksum1 = calculateChecksum(inn.slice(0, 10), [7, 2, 4, 10, 3, 5, 9, 4, 6, 8])
    const checksum2 = calculateChecksum(inn.slice(0, 11), [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8])

    return checksum1 === parseInt(inn[10]) && checksum2 === parseInt(inn[11])
  }

  return false
}

function calculateChecksum(digits: string, weights: number[]): number {
  let sum = 0
  for (let i = 0; i < digits.length; i++) {
    sum += parseInt(digits[i]) * weights[i]
  }
  return sum % 11 % 10
}

/**
 * Проверить корректность номера банковского счета
 */
export function validateBankAccount(accountNumber: string, bik: string): boolean {
  if (accountNumber.length !== 20) return false
  if (bik.length !== 9) return false

  // БИК + последние 3 цифры номера счета = контрольный расчет
  const fullNumber = bik.slice(0, 3) + '00' + accountNumber

  let sum = 0
  const weights = [7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1]

  for (let i = 0; i < fullNumber.length; i++) {
    sum += (parseInt(fullNumber[i]) * weights[i]) % 10
  }

  const controlDigit = (10 - (sum % 10)) % 10
  return controlDigit === parseInt(accountNumber[0])
}
