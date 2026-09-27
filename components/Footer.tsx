import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container-max py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="text-2xl font-serif font-bold mb-4">
              <span>Cheese</span>
              <span className="text-gold ml-1">Expo</span>
            </div>
            <p className="text-gray-400 text-sm">
              Главный независимый центр компетенций отрасли гастрономии и сыроделия
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-4">Навигация</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/#about" className="hover:text-gold transition">О мероприятии</Link></li>
              <li><Link href="/#competitions" className="hover:text-gold transition">Конкурсы</Link></li>
              <li><Link href="/#participate" className="hover:text-gold transition">Участие</Link></li>
              <li><Link href="/contacts" className="hover:text-gold transition">Контакты</Link></li>
            </ul>
          </div>

          {/* Competitions */}
          <div>
            <h4 className="font-semibold mb-4">Конкурсы</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/competitions/cheese-experts" className="hover:text-gold transition">Сырные эксперты</Link></li>
              <li><Link href="/competitions/cheese-pastry" className="hover:text-gold transition">Сыр как десерт</Link></li>
              <li><Link href="/competitions/balance-of-taste" className="hover:text-gold transition">Баланс вкуса</Link></li>
              <li><Link href="/competitions/package-design" className="hover:text-gold transition">Дизайн упаковки</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="font-semibold text-white">19–20 мая 2027</li>
              <li>ВДНХ, Павильон 322</li>
              <li>Москва</li>
              <li className="pt-2">
                <a href="mailto:info@cheeseexpo.pro" className="hover:text-gold transition">
                  info@cheeseexpo.pro
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>&copy; 2027 Cheese Expo. Все права защищены.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-gold transition">Политика конфиденциальности</Link>
            <Link href="/terms" className="hover:text-gold transition">Условия использования</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
