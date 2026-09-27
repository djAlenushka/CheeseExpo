import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Cheese Expo 2027 | Конкурс сыров и гастрономия',
  description: 'Главный независимый центр компетенций отрасли. B2B экспертная сессия с Гастроакадемией STANFOOD by METRO. 19–20 мая 2027, ВДНХ.',
  keywords: 'конкурс сыров, Cheese Expo, сыровед, гастрономия, STANFOOD, METRO',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body>
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
