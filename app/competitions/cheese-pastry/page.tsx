import CTASection from '@/components/CTASection'

export const metadata = {
  title: '2-й Конкурс «Сыр как десерт» | Cheese Expo 2027',
  description: 'Интеграция сыров в профессиональную кондитерскую и хлебопекарную практику',
}

export default function CheesePastryPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-16 md:py-24">
        <div className="container-max">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            2-й Конкурс «Сыр как десерт/Cheese Pastry»
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl">
            Определяем высокие стандарты интеграции сыров в профессиональную кондитерскую и хлебопекарную практику.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-max max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="card border-l-4 border-gold">
              <h3 className="font-serif font-bold text-xl mb-4">О конкурсе</h3>
              <p className="text-gray-600">
                Конкурс для кондитеров, пекарей и шефов, которые создают инновационные блюда
                с использованием сыра в качестве десертного компонента.
              </p>
            </div>
            <div className="card border-l-4 border-gold">
              <h3 className="font-serif font-bold text-xl mb-4">Категории</h3>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• Десерты с сыром</li>
                <li>• Сыр в хлебобулочных изделиях</li>
                <li>• Компоты и соусы с сыром</li>
                <li>• Инновационные сочетания</li>
              </ul>
            </div>
            <div className="card border-l-4 border-gold">
              <h3 className="font-serif font-bold text-xl mb-4">Формат подачи</h3>
              <p className="text-gray-600 text-sm">
                Презентация 3-4 образцов блюд, описание рецепта, обоснование выбора сыра
                и инновационности подхода.
              </p>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-serif font-bold mb-4">Требования к работам</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex gap-3">
                  <span className="text-gold font-bold">✓</span>
                  <span>Минимум 3 образца разных рецептов</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-gold font-bold">✓</span>
                  <span>Сыр должен играть ключевую роль в составе (минимум 15% от общего веса)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-gold font-bold">✓</span>
                  <span>Оригинальность и креативность подхода</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-gold font-bold">✓</span>
                  <span>Профессиональное оформление и презентация</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-gold font-bold">✓</span>
                  <span>Рецептуры и технологические карты для каждого блюда</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-serif font-bold mb-4">Критерии оценки</h2>
              <div className="space-y-4">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold">Вкусовые качества</h4>
                    <span className="text-gold font-bold">30%</span>
                  </div>
                  <p className="text-gray-600 text-sm">Гармония вкусов, баланс сладости и солености</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold">Инновационность</h4>
                    <span className="text-gold font-bold">25%</span>
                  </div>
                  <p className="text-gray-600 text-sm">Оригинальность сочетаний и подходов</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold">Техническое исполнение</h4>
                    <span className="text-gold font-bold">25%</span>
                  </div>
                  <p className="text-gray-600 text-sm">Качество приготовления, консистенция, внешний вид</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold">Практичность</h4>
                    <span className="text-gold font-bold">20%</span>
                  </div>
                  <p className="text-gray-600 text-sm">Возможность использования в HoReCa, воспроизводимость</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-serif font-bold mb-4">Как участвовать?</h2>
              <div className="bg-gray-50 p-8 rounded-lg space-y-4">
                <p className="text-gray-700 font-semibold">
                  Регистрация до 1 апреля 2027 года
                </p>
                <ol className="space-y-3 text-gray-700 list-decimal list-inside">
                  <li>Заполнить регистрационную форму на сайте</li>
                  <li>Предоставить описание работ и рецептуры</li>
                  <li>Оплатить регистрационный взнос: 8 000 рублей</li>
                  <li>Подготовить образцы к конкурсу (доставка 18 мая)</li>
                </ol>
                <div className="mt-6">
                  <button className="button-primary">
                    Подать работы в конкурс
                  </button>
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
