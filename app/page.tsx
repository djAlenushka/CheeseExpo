import Link from 'next/link'
import CompetitionCard from '@/components/CompetitionCard'
import CTASection from '@/components/CTASection'

export default function Home() {
  const competitions = [
    {
      id: 'cheese-experts',
      title: '1-й Всероссийский конкурс сырных экспертов',
      description: 'Органолептика, экспертиза сыра и независимая оценка квалификации в обновленном формате',
      icon: '👨‍🏫',
      cta: 'Участвовать'
    },
    {
      id: 'cheese-pastry',
      title: '2-й Конкурс «Сыр как десерт/Cheese Pastry»',
      description: 'Интеграция сыров в профессиональную кондитерскую и хлебопекарную практику',
      icon: '🍰',
      cta: 'Подать работу'
    },
    {
      id: 'balance-of-taste',
      title: '1-й Конкурс «Баланс вкуса 2027»',
      description: 'Джемы, соусы и мостарда. Гастрономические пары с сырами для сегмента HoReCa',
      icon: '🍶',
      cta: 'Зарегистрировать образец'
    },
    {
      id: 'package-design',
      title: '1-й Конкурс дизайна упаковки сыров',
      description: 'Оценка эстетических, функциональных и маркетинговых решений в упаковке',
      icon: '📦',
      cta: 'Отправить портфолио'
    },
    {
      id: 'young-specialists',
      title: '1-й Конкурс молодых специалистов «Точка роста»',
      description: 'Для студентов аграрных вузов. Прямой доступ крупных брендов к будущим технологам',
      icon: '🚀',
      cta: 'Зарегистрироваться'
    },
    {
      id: 'premium-salon',
      title: 'Салон премиальных сыров',
      description: 'Престижная площадка для демонстрации премиальных российских производителей',
      icon: '👑',
      cta: 'Узнать подробнее'
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-black to-gray-900 text-white py-20 md:py-32">
        <div className="container-max text-center">
          <div className="mb-4 inline-block">
            <span className="text-gold font-serif text-lg">19–20 мая 2027</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
            Cheese Expo 2027
            <br />
            <span className="text-gold">Новая эра сыроделия</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-8">
            Главный независимый центр компетенций отрасли.
            Закрытая B2B экспертная сессия в коллаборации с Гастроакадемией STANFOOD by METRO
          </p>
          <p className="text-terracotta font-semibold mb-10">
            ВДНХ, Павильон 322, Сервис.Техноград, Москва
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="button-primary text-base">Зарегистрироваться как участник</button>
            <button className="button-secondary text-base">Стать экспонентом</button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-serif font-bold mb-6">О мероприятии</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Cheese Expo переживает стратегическую трансформацию. В 2027 году мероприятие меняет формат
                  и становится закрытой B2B экспертной сессией, посвященной профессиональной работе и нетворкингу.
                </p>
                <p>
                  Партнерство с Гастроакадемией STANFOOD by METRO — ведущим образовательным и экспертным центром
                  страны в сфере HoReCa — позволяет сфокусироваться на качестве, взаимодействии профессионалов
                  и принятии стратегических бизнес-решений.
                </p>
                <p>
                  Проведение Cheese Expo 2027 на этой площадке формирует устойчивый переход мероприятия
                  в статус главного независимого центра компетенций отрасли.
                </p>
              </div>
            </div>
            <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
              <span className="text-gray-400 text-xl">Фото ВДНХ / Гастроакадемия</span>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="bg-gray-100 py-16 md:py-24">
        <div className="container-max">
          <h2 className="text-4xl font-serif font-bold text-center mb-16">Почему Cheese Expo 2027?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="font-serif font-bold text-xl mb-3">7 Конкурсов</h3>
              <p className="text-gray-600">
                От дизайна упаковки до молодых специалистов — охватываем все аспекты современного сыроделия
              </p>
            </div>
            <div className="card">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="font-serif font-bold text-xl mb-3">Нетворкинг</h3>
              <p className="text-gray-600">
                Встреча ключевых игроков рынка для развития гастрономической культуры на высшем уровне
              </p>
            </div>
            <div className="card">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="font-serif font-bold text-xl mb-3">Экспертиза</h3>
              <p className="text-gray-600">
                Образовательный центр мирового уровня с ведущими специалистами HoReCa индустрии
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Competitions Section */}
      <section id="competitions" className="section-padding">
        <div className="container-max">
          <h2 className="text-4xl font-serif font-bold text-center mb-4">Конкурсные направления</h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            Программа 2027 года включает ключевые конкурсные направления, охватывающие все аспекты
            современного сыроделия и гастрономии
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {competitions.map((comp) => (
              <CompetitionCard key={comp.id} {...comp} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-black text-white py-16 md:py-24">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-serif font-bold text-gold mb-2">7</div>
              <p className="text-gray-400">Конкурсных направлений</p>
            </div>
            <div>
              <div className="text-4xl font-serif font-bold text-gold mb-2">2</div>
              <p className="text-gray-400">Дня интенсивной работы</p>
            </div>
            <div>
              <div className="text-4xl font-serif font-bold text-gold mb-2">500+</div>
              <p className="text-gray-400">Профессионалов</p>
            </div>
            <div>
              <div className="text-4xl font-serif font-bold text-gold mb-2">∞</div>
              <p className="text-gray-400">Возможностей для нетворкинга</p>
            </div>
          </div>
        </div>
      </section>

      {/* Participate Section */}
      <section id="participate" className="section-padding bg-gray-50">
        <div className="container-max">
          <h2 className="text-4xl font-serif font-bold text-center mb-16">Как участвовать?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card border-l-4 border-gold">
              <div className="text-5xl mb-4">🍽️</div>
              <h3 className="font-serif font-bold text-xl mb-3">Профессионалы HoReCa</h3>
              <p className="text-gray-600 mb-4">
                Встретьте поставщиков, партнеров и лучших специалистов отрасли
              </p>
              <Link href="#" className="text-gold font-semibold hover:underline">
                Зарегистрироваться →
              </Link>
            </div>
            <div className="card border-l-4 border-gold">
              <div className="text-5xl mb-4">🏭</div>
              <h3 className="font-serif font-bold text-xl mb-3">Производители</h3>
              <p className="text-gray-600 mb-4">
                Представьте свой продукт и приз свою продукцию в конкурсах
              </p>
              <Link href="#" className="text-gold font-semibold hover:underline">
                Стать экспонентом →
              </Link>
            </div>
            <div className="card border-l-4 border-gold">
              <div className="text-5xl mb-4">🎓</div>
              <h3 className="font-serif font-bold text-xl mb-3">Молодые специалисты</h3>
              <p className="text-gray-600 mb-4">
                Конкурс и прямой доступ к крупным работодателям отрасли
              </p>
              <Link href="#" className="text-gold font-semibold hover:underline">
                Узнать о конкурсе →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="section-padding bg-gray-900 text-white">
        <div className="container-max text-center">
          <h2 className="text-4xl font-serif font-bold mb-4">Наш партнер</h2>
          <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
            Гастроакадемия STANFOOD by METRO — ведущий образовательный и экспертный центр страны в сфере HoReCa.
            Пространство, где формируются профессиональные стандарты и объединяются ключевые игроки рынка.
          </p>
          <div className="bg-gray-800 h-32 rounded-lg flex items-center justify-center">
            <span className="text-gray-400">STANFOOD by METRO Logo</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </>
  )
}
