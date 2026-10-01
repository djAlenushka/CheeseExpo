'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <nav className="container-max flex justify-between items-center py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="text-2xl font-serif font-bold">
            <span className="text-black">Cheese</span>
            <span className="text-gold ml-1">Expo</span>
          </div>
          <span className="text-xs text-gray-600">2027</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          <Link href="/#about" className="hover:text-gold transition">О мероприятии</Link>
          <Link href="/#competitions" className="hover:text-gold transition">Конкурсы</Link>
          <Link href="/#participate" className="hover:text-gold transition">Участие</Link>
          <Link href="/contacts" className="hover:text-gold transition">Контакты</Link>
          <Link href="/register" className="button-primary">Регистрация</Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-black"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 bg-gray-50">
          <div className="container-max py-4 flex flex-col gap-4">
            <Link href="/#about" className="hover:text-gold transition">О мероприятии</Link>
            <Link href="/#competitions" className="hover:text-gold transition">Конкурсы</Link>
            <Link href="/#participate" className="hover:text-gold transition">Участие</Link>
            <Link href="/contacts" className="hover:text-gold transition">Контакты</Link>
            <Link href="/register" className="button-primary w-full text-center" onClick={() => setIsOpen(false)}>Регистрация</Link>
          </div>
        </div>
      )}
    </header>
  )
}
