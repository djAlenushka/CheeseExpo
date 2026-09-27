/**
 * Payment API Endpoint
 * POST /api/payments - Create payment
 */

import { NextRequest, NextResponse } from 'next/server'
import {
  registerForCompetitionWithYooKassa,
  registerProducerWithSberbank,
  registerExhibitorWithCloudPayments
} from '@/lib/payment-examples'
import { PaymentMethod, ParticipantType } from '@/lib/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      userId,
      registrationType,
      paymentMethod,
      email,
      phone,
      // For competition registration
      competitionTitle,
      competitionFee,
      // For producer registration
      companyName,
      inn,
      registrationFee,
      // For exhibitor
      boothPackage
    } = body

    // Валидация
    if (!userId || !registrationType || !paymentMethod || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Обработка в зависимости от типа регистрации
    let result

    if (registrationType === ParticipantType.COMPETITOR) {
      if (!competitionTitle || !competitionFee) {
        return NextResponse.json(
          { error: 'Missing competition details' },
          { status: 400 }
        )
      }

      if (paymentMethod === PaymentMethod.YOOKASSA) {
        result = await registerForCompetitionWithYooKassa(
          userId,
          competitionTitle,
          competitionFee,
          email,
          phone
        )
      } else {
        return NextResponse.json(
          { error: 'Unsupported payment method for competitions' },
          { status: 400 }
        )
      }
    } else if (registrationType === ParticipantType.PRODUCER) {
      if (!companyName || !inn || !registrationFee) {
        return NextResponse.json(
          { error: 'Missing producer details' },
          { status: 400 }
        )
      }

      if (paymentMethod === PaymentMethod.SBERBANK) {
        result = await registerProducerWithSberbank(
          userId,
          companyName,
          inn,
          registrationFee,
          email,
          phone
        )
      } else if (paymentMethod === PaymentMethod.CLOUDPAYMENTS) {
        result = await registerExhibitorWithCloudPayments(
          userId,
          boothPackage || 'standard',
          registrationFee,
          email,
          phone,
          companyName
        )
      } else {
        return NextResponse.json(
          { error: 'Unsupported payment method' },
          { status: 400 }
        )
      }
    } else {
      return NextResponse.json(
        { error: 'Unsupported registration type' },
        { status: 400 }
      )
    }

    return NextResponse.json(result, { status: 200 })
  } catch (error) {
    console.error('Payment error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Payment processing failed' },
      { status: 500 }
    )
  }
}
