/**
 * Cheese Expo 2027 - TypeScript Models
 * Полный набор типов для работы с платежами и участниками
 */

// ============================================
// ENUM: Статусы и типы
// ============================================

export enum PaymentStatus {
  PENDING = 'pending',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded'
}

export enum PaymentMethod {
  YOOKASSA = 'yookassa',
  SBERBANK = 'sberbank',
  CLOUDPAYMENTS = 'cloudpayments',
  BANK_TRANSFER = 'bank_transfer'
}

export enum UserRole {
  VISITOR = 'visitor',
  EXHIBITOR = 'exhibitor',
  EXPERT = 'expert',
  COMPETITOR = 'competitor',
  ADMIN = 'admin'
}

export enum ParticipantType {
  PROFESSIONAL = 'professional',
  PRODUCER = 'producer',
  STUDENT = 'student',
  MEDIA = 'media'
}

export enum CompetitionType {
  CHEESE_EXPERTS = 'cheese_experts',
  CHEESE_PASTRY = 'cheese_pastry',
  BALANCE_OF_TASTE = 'balance_of_taste',
  PACKAGE_DESIGN = 'package_design',
  YOUNG_SPECIALISTS = 'young_specialists',
  PREMIUM_SALON = 'premium_salon',
  BEST_CHEESE = 'best_cheese'
}

export enum AwardStatus {
  GOLD = 'gold',
  SILVER = 'silver',
  BRONZE = 'bronze',
  DIPLOMA = 'diploma'
}

// ============================================
// USER & PARTICIPANT MODELS
// ============================================

export interface User {
  id: string
  email: string
  phone: string
  firstName: string
  lastName: string
  organization?: string
  inn?: string // ИНН юридического лица
  kpp?: string // КПП
  role: UserRole
  participantType?: ParticipantType
  createdAt: Date
  updatedAt: Date
  isVerified: boolean
}

export interface Participant {
  id: string
  userId: string
  user: User
  registrationType: ParticipantType
  organization: string
  position?: string
  bio?: string
  avatar?: string

  // Для производителей
  producerInfo?: ProducerInfo

  // Для экспертов
  expertInfo?: ExpertInfo

  // Для студентов
  studentInfo?: StudentInfo

  registeredAt: Date
  isCheckedIn: boolean
  checkInTime?: Date
}

export interface ProducerInfo {
  companyName: string
  companyType: 'individual' | 'llc' | 'jsc' | 'other'
  inn: string
  website?: string
  productCategories: string[]
  cheeseTypes: string[]
  certificates?: string[]
}

export interface ExpertInfo {
  certifications: string[]
  experience: number // лет опыта
  specialization: string[]
  previousAwards?: string[]
}

export interface StudentInfo {
  university: string
  faculty: string
  course: number
  specialization: string
}

// ============================================
// PAYMENT & ORDER MODELS
// ============================================

export interface Order {
  id: string
  userId: string
  orderNumber: string

  // Детали заказа
  amount: number // Сумма в рублях
  currency: 'RUB'
  description: string

  // Тип регистрации
  registrationType: ParticipantType
  competitionIds?: string[] // Для конкурсов

  // Персональная информация
  billName: string
  billEmail: string
  billPhone: string
  billCompany?: string
  billInn?: string

  // Статус
  status: PaymentStatus
  paymentMethod: PaymentMethod

  // Платежные ссылки
  paymentUrl?: string
  confirmationUrl?: string

  // Квитанция
  receiptEmail?: string
  receiptSent: boolean

  createdAt: Date
  updatedAt: Date
  paidAt?: Date
}

export interface Payment {
  id: string
  orderId: string
  externalPaymentId: string // ID платежа в системе платежного провайдера

  // Сумма
  amount: number
  currency: 'RUB'

  // Статус
  status: PaymentStatus
  method: PaymentMethod

  // Провайдер-специфичные данные
  providerResponse: Record<string, any>

  // Дополнительно
  createdAt: Date
  updatedAt: Date
  processedAt?: Date
}

export interface Refund {
  id: string
  paymentId: string
  orderId: string

  amount: number
  currency: 'RUB'
  reason: string

  status: PaymentStatus
  externalRefundId?: string

  createdAt: Date
  processedAt?: Date
}

// ============================================
// COMPETITION & SUBMISSION MODELS
// ============================================

export interface Competition {
  id: string
  type: CompetitionType
  title: string
  description: string
  rules: string

  // Даты
  startDate: Date
  endDate: Date
  juryDate: Date
  resultDate: Date

  // Требования
  maxParticipants?: number
  minExperience?: number // лет опыта
  fee: number // Взнос за участие в рублях

  // Судьи
  juryMembers: string[]

  // Статус
  isActive: boolean

  createdAt: Date
  updatedAt: Date
}

export interface CompetitionEntry {
  id: string
  competitionId: string
  competition: Competition
  participantId: string
  participant: Participant

  // Название работы
  title: string
  description: string

  // Детали для разных конкурсов
  entryType?: string // 'cheese', 'pastry', 'sauce', 'package', etc.

  // Файлы (для дизайна упаковки, фото)
  attachments: FileAttachment[]

  // Для конкурса молодых специалистов
  resumeUrl?: string
  certificatesUrl?: string[]

  // Статус
  submittedAt: Date
  isApproved: boolean
  approvedAt?: Date

  // Результат
  awardStatus?: AwardStatus
  score?: number
  feedback?: string

  createdAt: Date
  updatedAt: Date
}

export interface FileAttachment {
  id: string
  filename: string
  url: string
  type: 'image' | 'document' | 'pdf'
  uploadedAt: Date
}

// ============================================
// AWARD & RESULT MODELS
// ============================================

export interface Award {
  id: string
  competitionId: string
  entryId: string

  participantId: string
  participant: Participant

  title: string
  status: AwardStatus
  certificateUrl?: string

  awardedAt: Date
}

export interface CompetitionResult {
  id: string
  competitionId: string
  competition: Competition

  entries: CompetitionEntry[]
  awards: Award[]

  totalParticipants: number
  totalScores: Record<string, number>

  publishedAt?: Date
  isPublished: boolean
}

// ============================================
// PAYMENT PROVIDER MODELS
// ============================================

// Яндекс.Касса (YooKassa) Models
export interface YooKassaPaymentRequest {
  amount: {
    value: string // Строка в формате "1000.00"
    currency: 'RUB'
  }
  payment_method_data: {
    type: 'bank_card' | 'yoo_money' | 'qiwi' | 'sberbank'
  }
  confirmation: {
    type: 'redirect'
    return_url: string
  }
  description: string
  metadata?: {
    order_id: string
    user_id: string
    [key: string]: string
  }
  receipt?: Receipt
}

export interface YooKassaPaymentResponse {
  id: string
  status: 'pending' | 'succeeded' | 'canceled'
  amount: {
    value: string
    currency: 'RUB'
  }
  confirmation?: {
    type: string
    confirmation_url?: string
  }
  payment_method?: {
    type: string
    card?: {
      first6: string
      last4: string
      cardholder: string
      expiry_year: number
      expiry_month: number
    }
  }
  created_at: string
  test: boolean
}

export interface YooKassaWebhook {
  type: 'payment.succeeded' | 'payment.canceled' | 'payment.waiting_for_capture'
  event: string
  object: {
    type: 'payment'
    id: string
    status: string
    amount: {
      value: string
      currency: 'RUB'
    }
    [key: string]: any
  }
}

// Сбербанк Models
export interface SberbankPaymentRequest {
  orderNumber: string
  amount: number // в копейках (5000 = 50 рублей)
  currency: string // '810' для RUB
  returnUrl: string
  failUrl?: string
  description: string
  clientId?: string
  email?: string
  phone?: string
  pageView?: 'MOBILE' | 'DESKTOP'
}

export interface SberbankPaymentResponse {
  orderId: string
  formUrl: string
  errorCode?: string
  errorMessage?: string
}

export interface SberbankWebhook {
  orderId: string
  orderNumber: string
  checkOperationDate: string
  checkOperationTime: string
  checkOperationStatus: string // DEPOSITED = успешный платеж
  amount: number // в копейках
  currency: string
  approvalCode?: string
  pan?: string
  expiration?: string
  cardholderName?: string
  merchantOrderParams?: Record<string, string>
}

// CloudPayments Models
export interface CloudPaymentsPaymentRequest {
  Amount: number // в рублях (может быть дробным)
  Currency: 'RUB'
  OrderId: string
  Description: string
  AccountId?: string
  Email?: string
  Phone?: string
  Ip?: string
  Invoiced?: boolean
  Receipt?: Receipt
}

export interface CloudPaymentsPaymentResponse {
  Success: boolean
  Message?: string
  TransactionId?: number
  Model?: {
    TransactionId: number
    Amount: number
    Currency: string
    CurrencyCode: number
    InvoiceId?: string
    AccountId?: string
    SubscriptionId?: number
    Description: string
    Email?: string
    Ip?: string
    CreatedDate: string
    AuthDate?: string
    AuthCode?: string
    RefundDate?: string
    RefundedAmount?: number
    RefundReason?: string
    Status: string
    StatusCode: number
    Reason?: string
    ReasonCode?: number
    CardFirstSix: string
    CardLastFour: string
    CardExpDate: string
    CardType?: string
    TestMode: boolean
    IpCountry?: string
    IpCity?: string
    IpRegion?: string
    ChargeCurrency?: string
    ChargeAmount?: number
  }
}

export interface CloudPaymentsWebhook {
  TransactionId: number
  Amount: number
  Currency: string
  CurrencyCode: number
  InvoiceId?: string
  AccountId?: string
  Email?: string
  Description: string
  AuthCode?: string
  TestMode: boolean
  Status: string // Completed, Authorized, Cancelled, Declined, etc.
  Data?: Record<string, string>
  CreatedDate: string
}

// ============================================
// RECEIPT MODEL (Кассовый чек)
// ============================================

export interface Receipt {
  type: 'receipt'
  email: string
  phone?: string
  tax_system_code?: number // 1-6 для разных систем налогообложения
  items: ReceiptItem[]
}

export interface ReceiptItem {
  description: string
  quantity: number
  amount: string // в копейках, число в строке "1000"
  tax_code: number // 1 для НДС 18%, 2 для НДС 10% и т.д.
}

// ============================================
// INVOICE MODEL (Счет-фактура)
// ============================================

export interface Invoice {
  id: string
  orderId: string
  invoiceNumber: string

  // Продавец (Cheese Expo)
  seller: {
    name: string
    inn: string
    kpp: string
    address: string
    bankAccount: string
    bik: string
  }

  // Покупатель
  buyer: {
    name: string
    inn?: string
    kpp?: string
    address?: string
  }

  // Детали
  items: InvoiceItem[]
  totalAmount: number
  totalAmountWithTax: number

  // Статус
  createdAt: Date
  dueDate?: Date
  paidAt?: Date

  // Файлы
  pdfUrl?: string
}

export interface InvoiceItem {
  description: string
  quantity: number
  unitPrice: number
  totalPrice: number
  tax?: number
}

// ============================================
// EXHIBITOR & SPONSORSHIP MODELS
// ============================================

export interface Exhibitor {
  id: string
  userId: string
  user: User

  companyName: string
  inn: string
  kpp?: string

  // Контактные лица
  primaryContact: ContactPerson
  secondaryContact?: ContactPerson

  // Пакет участия
  package: ExhibitorPackage

  // Детали стенда
  boothNumber?: string
  boothSize?: 'small' | 'medium' | 'large'

  // Статус
  isApproved: boolean
  approvedAt?: Date

  // Платеж
  paymentStatus: PaymentStatus
  paymentDueDate: Date

  registeredAt: Date
  updatedAt: Date
}

export interface ContactPerson {
  name: string
  email: string
  phone: string
  position?: string
}

export interface ExhibitorPackage {
  type: 'basic' | 'standard' | 'premium' | 'vip'
  price: number
  includes: string[]
  maxProducts: number
  boothArea?: number // кв.м
}

// ============================================
// ANALYTICS & REPORTING MODELS
// ============================================

export interface EventStats {
  totalRegistered: number
  totalVisitors: number
  totalExhibitors: number
  totalCompetitors: number
  totalRevenue: number

  competitionStats: Record<string, CompetitionStats>
  paymentMethodStats: Record<PaymentMethod, number>

  generatedAt: Date
}

export interface CompetitionStats {
  participantCount: number
  submissionCount: number
  awardCount: number
  averageScore?: number
}
