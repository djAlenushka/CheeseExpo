export const metadata = {
  title: 'Контакты | Cheese Expo 2027',
  description: 'Как добраться, контактная информация, часы работы Cheese Expo 2027',
}

export default function ContactsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-16 md:py-24">
        <div className="container-max">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Контакты</h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            Все необходимая информация для участия в Cheese Expo 2027
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            {/* Address & Hours */}
            <div>
              <h2 className="text-3xl font-serif font-bold mb-6">Адрес мероприятия</h2>
              <div className="card">
                <p className="text-gray-700 mb-4">
                  <span className="font-semibold">Гастроакадемия STANFOOD by METRO</span>
                  <br />
                  Сервис.Техноград, Павильон 322
                  <br />
                  проспект Мира, 119, стр. 322
                  <br />
                  ВДНХ, Москва, 129223
                </p>
                <p className="text-gold font-semibold mb-4">
                  19–20 мая 2027 года
                </p>
                <button className="button-secondary">
                  Проложить маршрут на карте
                </button>
              </div>

              <h3 className="text-2xl font-serif font-bold mt-8 mb-4">Как добраться?</h3>
              <div className="space-y-4">
                <div className="card">
                  <h4 className="font-semibold mb-2 flex gap-2 items-center">
                    <span>🚇</span> На метро
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Станция «ВДНХ» (Кольцевая линия), выход на ВДНХ. Затем автобусы
                    или пешком ~10-15 минут до Павильона 322.
                  </p>
                </div>
                <div className="card">
                  <h4 className="font-semibold mb-2 flex gap-2 items-center">
                    <span>🚕</span> На такси
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Адрес для навигации: проспект Мира, 119, стр. 322. Парковка находится
                    на территории Сервис.Техноград.
                  </p>
                </div>
                <div className="card">
                  <h4 className="font-semibold mb-2 flex gap-2 items-center">
                    <span>🚌</span> На автобусе
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Автобусы: 11, 122, 128, 142, 14, 164, 175 до остановки «ВДНХ»
                    или «Павильон 322».
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-serif font-bold mb-6">Контактная информация</h2>

              <div className="card mb-4">
                <h3 className="font-semibold mb-3 text-lg">Общая информация</h3>
                <div className="space-y-3 text-gray-600 text-sm">
                  <p>
                    <span className="font-semibold">Email:</span>
                    <br />
                    <a href="mailto:info@cheeseexpo.pro" className="text-gold hover:underline">
                      info@cheeseexpo.pro
                    </a>
                  </p>
                  <p>
                    <span className="font-semibold">Телефон:</span>
                    <br />
                    <a href="tel:+74955555555" className="text-gold hover:underline">
                      +7 (495) 555-55-55
                    </a>
                  </p>
                </div>
              </div>

              <div className="card mb-4">
                <h3 className="font-semibold mb-3 text-lg">Регистрация и участие</h3>
                <div className="space-y-3 text-gray-600 text-sm">
                  <p>
                    <span className="font-semibold">Email:</span>
                    <br />
                    <a href="mailto:register@cheeseexpo.pro" className="text-gold hover:underline">
                      register@cheeseexpo.pro
                    </a>
                  </p>
                  <p>
                    <span className="font-semibold">Телефон:</span>
                    <br />
                    <a href="tel:+74955555556" className="text-gold hover:underline">
                      +7 (495) 555-55-56
                    </a>
                  </p>
                </div>
              </div>

              <div className="card">
                <h3 className="font-semibold mb-3 text-lg">Для СМИ и партнеров</h3>
                <div className="space-y-3 text-gray-600 text-sm">
                  <p>
                    <span className="font-semibold">Email:</span>
                    <br />
                    <a href="mailto:press@cheeseexpo.pro" className="text-gold hover:underline">
                      press@cheeseexpo.pro
                    </a>
                  </p>
                </div>
              </div>

              <h3 className="text-2xl font-serif font-bold mt-8 mb-4">График работы</h3>
              <div className="card">
                <div className="space-y-2 text-gray-700">
                  <div className="flex justify-between">
                    <span>19 мая (первый день)</span>
                    <span className="font-semibold">09:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>20 мая (второй день)</span>
                    <span className="font-semibold">09:00 - 17:00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="max-w-4xl">
            <h2 className="text-3xl font-serif font-bold mb-8">Часто задаваемые вопросы</h2>
            <div className="space-y-6">
              <div className="card">
                <h3 className="font-serif font-bold text-lg mb-3">Какие документы нужны для входа?</h3>
                <p className="text-gray-600">
                  Требуется паспорт РФ или иное удостоверение личности. Рекомендуем иметь с собой
                  регистрационное письмо, которое будет отправлено на email при регистрации.
                </p>
              </div>
              <div className="card">
                <h3 className="font-serif font-bold text-lg mb-3">Есть ли парковка?</h3>
                <p className="text-gray-600">
                  Да, на территории Сервис.Техноград имеется парковка. Рекомендуем приезжать заранее,
                  так как 19-20 мая ожидается большой поток посетителей.
                </p>
              </div>
              <div className="card">
                <h3 className="font-serif font-bold text-lg mb-3">Можно ли привести гостей?</h3>
                <p className="text-gray-600">
                  Мероприятие закрытое для приглашенных профессионалов и участников конкурсов.
                  Каждому гостю требуется отдельная регистрация. Напишите в info@cheeseexpo.pro для уточнения.
                </p>
              </div>
              <div className="card">
                <h3 className="font-serif font-bold text-lg mb-3">Какие услуги доступны на месте?</h3>
                <p className="text-gray-600">
                  На площадке Гастроакадемии STANFOOD by METRO будет организована кофе-брейк,
                  возможность покупки напитков и легких закусок. Более подробная информация будет опубликована позже.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="py-16 bg-gray-100">
        <div className="container-max">
          <div className="bg-gray-300 h-96 rounded-lg flex items-center justify-center">
            <span className="text-gray-600">Google Maps / Яндекс.Карты будет встроена здесь</span>
          </div>
        </div>
      </section>
    </>
  )
}
