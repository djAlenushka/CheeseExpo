export interface CompetitionSummary {
  id: string
  title: string
  description: string
  icon: string
  cta: string
}

export const competitions: CompetitionSummary[] = [
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
