# Cheese Expo 2027 - Интеграция платежных систем

## 🇷🇺 Поддерживаемые платежные системы

Полная поддержка российских платежных систем для B2B и B2C платежей:

### 1. **Яндекс.Касса (YooKassa)**
- ✅ Регистрация конкурсантов
- ✅ Оплата взноса за участие
- ✅ Встроенная онлайн-касса
- ✅ Поддержка разных способов оплаты

### 2. **Сбербанк**
- ✅ Регистрация производителей
- ✅ Оплата регистрационного взноса
- ✅ Прямое взаимодействие с банком

### 3. **CloudPayments**
- ✅ Оплата стендов экспонентов
- ✅ Карты, электронные кошельки
- ✅ Встроенная касса

---

## 📋 Типы моделей

### Основные типы
- **User** - Пользователь системы
- **Participant** - Участник события
- **Order** - Заказ/счет
- **Payment** - Платеж
- **Invoice** - Счет-фактура
- **Receipt** - Кассовый чек

### Типы участников
- `PROFESSIONAL` - Профессионал HoReCa
- `PRODUCER` - Производитель сыра
- `STUDENT` - Студент (молодой специалист)
- `MEDIA` - СМИ

### Статусы платежа
- `PENDING` - Ожидает оплаты
- `SUCCEEDED` - Успешно оплачено
- `FAILED` - Ошибка при оплате
- `CANCELLED` - Отменено
- `REFUNDED` - Возвращено

---

## 🔧 Установка и конфигурация

### 1. Скопировать переменные окружения

```bash
cp .env.example .env.local
```

### 2. Заполнить конфигурацию

```env
# Яндекс.Касса
YOOKASSA_SHOP_ID=123456
YOOKASSA_SECRET_KEY=your_key

# Сбербанк
SBERBANK_MERCHANT_LOGIN=login
SBERBANK_MERCHANT_PASSWORD=password

# CloudPayments
CLOUDPAYMENTS_PUBLIC_ID=id
CLOUDPAYMENTS_API_SECRET=secret

# Информация о компании
COMPANY_NAME=ООО Cheese Expo
COMPANY_INN=7123456789
```

### 3. Установить зависимости

```bash
npm install
```

---

## 📚 Примеры использования

### Пример 1: Регистрация конкурсанта с платежом

```typescript
import { registerForCompetitionWithYooKassa } from '@/lib/payment-examples'

// Создать платеж для регистрации
const paymentResult = await registerForCompetitionWithYooKassa(
  userId = 'user123',
  competitionTitle = '1-й Конкурс сырных экспертов',
  competitionFee = 5000, // рубли
  email = 'user@example.com',
  phone = '+7-XXX-XXX-XX-XX'
)

// paymentResult.paymentUrl - редирект на платеж
// paymentResult.orderId - ID заказа для отслеживания
```

### Пример 2: Регистрация производителя (Сбербанк)

```typescript
import { registerProducerWithSberbank } from '@/lib/payment-examples'

const result = await registerProducerWithSberbank(
  userId = 'producer123',
  companyName = 'ООО Сыр для всех',
  inn = '7123456789',
  registrationFee = 25000,
  email = 'producer@company.ru',
  phone = '+7-900-123-45-67'
)

// result.paymentUrl - форма оплаты Сбербанка
```

### Пример 3: Регистрация экспонента (CloudPayments)

```typescript
import { registerExhibitorWithCloudPayments } from '@/lib/payment-examples'

const result = await registerExhibitorWithCloudPayments(
  userId = 'exhibitor123',
  boothPackage = 'premium', // basic|standard|premium|vip
  amount = 100000,
  email = 'exhibitor@company.com',
  phone = '+7-900-000-00-00',
  companyName = 'Сыроделамстрой'
)
```

### Пример 4: Проверить статус платежа

```typescript
import { checkPaymentStatus } from '@/lib/payment-examples'
import { PaymentMethod } from '@/lib/types'

const status = await checkPaymentStatus(
  paymentId = 'yookassa-payment-id',
  paymentMethod = PaymentMethod.YOOKASSA
)

console.log(status.status) // 'succeeded' | 'pending' | 'failed'
```

### Пример 5: Сделать возврат платежа

```typescript
import { refundPayment } from '@/lib/payment-examples'
import { PaymentMethod } from '@/lib/types'

const refund = await refundPayment(
  orderId = 'ORD-12345',
  amount = 5000,
  paymentMethod = PaymentMethod.YOOKASSA,
  externalPaymentId = 'yookassa-payment-id'
)
```

---

## 🌐 API Endpoints

### POST /api/payments
Создать новый платеж

```javascript
// Request
POST /api/payments
Content-Type: application/json

{
  "userId": "user123",
  "registrationType": "competitor",
  "paymentMethod": "yookassa",
  "email": "user@example.com",
  "phone": "+7-900-123-45-67",
  "competitionTitle": "1-й Конкурс сырных экспертов",
  "competitionFee": 5000
}

// Response
{
  "paymentUrl": "https://...",
  "orderId": "order-123",
  "amount": "5000.00",
  "status": "pending"
}
```

### Webhooks

#### POST /api/webhooks/yookassa
Получить уведомление от Яндекс.Кассы

```javascript
// Яндекс.Касса отправляет автоматически при изменении статуса платежа
{
  "type": "payment.succeeded",
  "object": {
    "id": "payment-123",
    "status": "succeeded",
    "amount": { "value": "5000.00", "currency": "RUB" },
    "metadata": { "order_id": "ORD-123" }
  }
}
```

#### POST /api/webhooks/cloudpayments
Получить уведомление от CloudPayments

```javascript
// CloudPayments отправляет при завершении платежа
{
  "TransactionId": 123456,
  "OrderId": "ORD-123",
  "Amount": 50000,
  "Currency": "RUB",
  "Status": "Completed",
  "CreatedDate": "2027-05-19T10:30:00Z"
}
```

---

## 📝 Валидация данных

### Проверка ИНН

```typescript
import { validateInn } from '@/lib/payment-services'

const isValid = validateInn('7123456789')
console.log(isValid) // true или false
```

### Проверка расчетного счета

```typescript
import { validateBankAccount } from '@/lib/payment-services'

const isValid = validateBankAccount('40702810000000000001', '044525000')
console.log(isValid) // true или false
```

---

## 🔐 Безопасность

### Webhook Verification (CloudPayments)

```typescript
import { CloudPaymentsService } from '@/lib/payment-services'

const service = new CloudPaymentsService(publicId, secretKey)
const isValid = service.verifyWebhookSignature(body, signature)
```

### Best Practices

1. **Всегда проверяйте подписи webhook'ов**
2. **Используйте HTTPS для всех запросов**
3. **Не хранийте скрытые ключи в коде**
4. **Логируйте все платежные события**
5. **Регулярно проверяйте статус платежей**

---

## 💳 Конфигурация платежных систем

### Яндекс.Касса

1. Перейти на https://yookassa.ru/registration
2. Зарегистрировать аккаунт
3. Получить Shop ID и Secret Key
4. Настроить Webhook URL: `https://cheeseexpo.pro/api/webhooks/yookassa`

### Сбербанк

1. Обратиться в отдел эквайринга Сбербанка
2. Заключить договор
3. Получить Merchant Login и Password
4. Настроить возврат на `https://cheeseexpo.pro/payment/success`

### CloudPayments

1. Перейти на https://cloudpayments.ru
2. Зарегистрировать организацию
3. Получить Public ID и API Secret
4. Настроить Webhook URL: `https://cheeseexpo.pro/api/webhooks/cloudpayments`

---

## 📊 Структура данных

### Order (Заказ/Счет)

```typescript
interface Order {
  id: string // Уникальный ID заказа
  userId: string // ID пользователя
  orderNumber: string // Номер заказа (например, ORD-12345)
  amount: number // Сумма в копейках
  currency: 'RUB'
  description: string // Описание (для чека)
  registrationType: ParticipantType // Тип регистрации
  billName: string // Имя плательщика
  billEmail: string // Email
  billPhone: string // Телефон
  billCompany?: string // Организация (для B2B)
  billInn?: string // ИНН
  status: PaymentStatus // Статус платежа
  paymentMethod: PaymentMethod // Способ оплаты
  paymentUrl?: string // Ссылка на оплату
  receiptEmail?: string // Email для квитанции
  receiptSent: boolean // Квитанция отправлена
  createdAt: Date
  updatedAt: Date
  paidAt?: Date // Дата оплаты
}
```

### Payment (Платеж)

```typescript
interface Payment {
  id: string // ID платежа в системе
  orderId: string // ID заказа
  externalPaymentId: string // ID платежа в системе платежного провайдера
  amount: number // Сумма в копейках
  currency: 'RUB'
  status: PaymentStatus
  method: PaymentMethod
  providerResponse: Record<string, any> // Ответ от провайдера
  createdAt: Date
  processedAt?: Date
}
```

### Invoice (Счет-фактура)

```typescript
interface Invoice {
  id: string
  orderId: string
  invoiceNumber: string // НОМ-2027-00001
  seller: { name, inn, kpp, address, bankAccount, bik }
  buyer: { name, inn, kpp, address }
  items: { description, quantity, unitPrice, totalPrice, tax }
  totalAmount: number
  createdAt: Date
  paidAt?: Date
}
```

---

## 🐛 Troubleshooting

### "Invalid INN format"

- Проверьте, что ИНН содержит 10 (ИП) или 12 (ООО) цифр
- Убедитесь, что контрольная сумма правильная

### "Webhook not received"

1. Проверить, что URL webhook'а правильный в конфигурации платежной системы
2. Убедиться, что сервер доступен по HTTPS
3. Проверить логи сервера

### "Payment declined"

- Проверить, что сумма в правильном формате (копейки)
- Убедиться, что карта поддерживает оплату
- Проверить, что нет лимитов по сумме

---

## 📞 Поддержка

При вопросах по интеграции платежных систем:
- Яндекс.Касса: https://yookassa.ru/docs
- Сбербанк: https://www.sberbank.ru/business
- CloudPayments: https://cloudpayments.ru/docs

---

**Версия:** 1.0  
**Последнее обновление:** 27 сентября 2026
