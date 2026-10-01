import Link from 'next/link'
import CTASection from '@/components/CTASection'

export const metadata = {
  title: '1-й Всероссийский конкурс сырных экспертов | Cheese Expo 2027',
  description: 'Органолептика, экспертиза сыра и независимая оценка квалификации в обновленном формате',
}

export default function CheeseExpertsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-16 md:py-24">
        <div className="container-max">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            1-й Всероссийский конкурс сырных экспертов
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl">
            Впервые на российском рынке конкурс в обновленном формате с акцентом на органолептику,
            экспертизу сыра и независимую оценку квалификации специалистов.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-max max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="card border-l-4 border-gold">
              <h3 className="font-serif font-bold text-xl mb-4">Цель конкурса</h3>
              <p className="text-gray-600">
                Оценка и сертификация квалификации профессиональных дегустаторов сыра, установление стандартов
                экспертизы в российской сыродельной индустрии.
              </p>
            </div>
            <div className="card border-l-4 border-gold">
              <h3 className="font-serif font-bold text-xl mb-4">Критерии оценки</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Органолептический анализ</li>
                <li>• Определение пороков и дефектов</li>
                <li>• Классификация сыров</li>
                <li>• Теоретические знания</li>
              </ul>
            </div>
            <div className="card border-l-4 border-gold">
              <h3 className="font-serif font-bold text-xl mb-4">Награды</h3>
              <p className="text-gray-600 mb-4">
                Сертификат международного уровня для победителей и участников,
                подтверждающий квалификацию эксперта.
              </p>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-serif font-bold mb-4">Требования к участникам</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex gap-3">
                  <span className="text-gold font-bold">✓</span>
                  <span>Минимум 3 года опыта в профессиональной дегустации или сыроделии</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-gold font-bold">✓</span>
                  <span>Наличие профессиональной сертификации (желательно, но не обязательно)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-gold font-bold">✓</span>
                  <span>Практическое знание технологии производства сыра</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-gold font-bold">✓</span>
                  <span>Готовность к стандартизированной процедуре тестирования</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-serif font-bold mb-4">Формат конкурса</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Конкурс состоит из трех этапов:
                </p>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-gold">
                    <h4 className="font-semibold text-lg mb-2">1. Теоретический тест</h4>
                    <p>Проверка знания стандартов, классификации и технологии производства сыра</p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-gold">
                    <h4 className="font-semibold text-lg mb-2">2. Органолептическая дегустация</h4>
                    <p>Слепое тестирование образцов сыров различных категорий и происхождения</p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-gold">
                    <h4 className="font-semibold text-lg mb-2">3. Экзаменационное интервью</h4>
                    <p>Защита результатов и обсуждение с комиссией экспертов</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-serif font-bold mb-4">Как зарегистрироваться?</h2>
              <div className="bg-gray-50 p-8 rounded-lg space-y-4">
                <p className="text-gray-700">
                  Регистрация открыта до 15 апреля 2027 года. Необходимо заполнить форму и предоставить:
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex gap-3">
                    <span className="text-gold">📋</span>
                    <span>CV с указанием опыта в дегустации и сыроделии</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gold">📋</span>
                    <span>Копии сертификатов профессиональной подготовки (если есть)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gold">📋</span>
                    <span>Рекомендательные письма от коллег или работодателей</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gold">📋</span>
                    <span>Регистрационный взнос: 5 000 рублей</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <Link href="/register?type=competitor&competition=cheese-experts" className="button-primary">
                    Зарегистрироваться как участник
                  </Link>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-serif font-bold mb-4">График</h2>
              <div className="space-y-3">
                <div className="flex gap-4">
                  <span className="text-gold font-bold min-w-32">19 мая</span>
                  <span className="text-gray-700">09:00 - Регистрация и приветствие</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-gold font-bold min-w-32">19 мая</span>
                  <span className="text-gray-700">10:00 - Теоретический тест</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-gold font-bold min-w-32">19 мая</span>
                  <span className="text-gray-700">12:00 - Органолептическая дегустация</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-gold font-bold min-w-32">20 мая</span>
                  <span className="text-gray-700">10:00 - Экзаменационные интервью</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-gold font-bold min-w-32">20 мая</span>
                  <span className="text-gray-700">16:00 - Объявление результатов и награждение</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </>
  )
}
