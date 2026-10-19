import RegistrationForm from '@/components/RegistrationForm'
import { isCompetitionId, isParticipantType } from '@/lib/registration'
import { ParticipantType } from '@/lib/types'

export const metadata = {
  title: 'Регистрация | Cheese Expo 2027',
  description: 'Регистрация участников, экспонентов и конкурсантов Cheese Expo 2027. 19–20 мая 2027, ВДНХ.',
}

interface RegisterPageProps {
  searchParams: { type?: string | string[]; competition?: string | string[] }
}

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value
}

export default function RegisterPage({ searchParams }: RegisterPageProps) {
  const typeParam = first(searchParams.type)
  const competitionParam = first(searchParams.competition)

  const initialCompetitionIds = isCompetitionId(competitionParam) ? [competitionParam as string] : []
  const initialType = isParticipantType(typeParam)
    ? typeParam
    : initialCompetitionIds.length > 0
      ? ParticipantType.COMPETITOR
      : ParticipantType.PROFESSIONAL

  return (
    <>
      <section className="bg-gradient-to-b from-black to-gray-900 text-white py-16 md:py-20">
        <div className="container-max">
          <span className="text-gold font-serif text-lg">19–20 мая 2027 · ВДНХ, Павильон 322</span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mt-4 mb-4">Регистрация</h1>
          <p className="text-gray-300 text-lg max-w-3xl">
            Заполните заявку, и мы свяжемся с вами для подтверждения участия и выставления счета.
            Cheese Expo 2027 — закрытая B2B сессия, каждая заявка проходит модерацию.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max max-w-3xl">
          <RegistrationForm
            initialType={initialType}
            initialCompetitionIds={initialCompetitionIds}
          />
        </div>
      </section>
    </>
  )
}
