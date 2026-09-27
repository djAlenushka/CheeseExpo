'use client'

import Link from 'next/link'

export default function BackButton() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2 text-gold font-semibold hover:gap-3 transition-all p-6"
    >
      <span>←</span>
      <span>Вернуться на главную</span>
    </Link>
  )
}
