'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* ロゴ */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-3xl font-bold text-orange-500">Creax</span>
          </Link>

          {/* デスクトップメニュー */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/creators/search" className="text-gray-700 hover:text-orange-500 transition">
              クリエーターを探す
            </Link>
            <Link href="/jobs/search" className="text-gray-700 hover:text-orange-500 transition">
              案件を探す
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-orange-500 transition">
              Creaxとは
            </Link>
            <Link href="/support/guide" className="text-gray-700 hover:text-orange-500 transition">
              使い方
            </Link>
          </nav>

          {/* 認証ボタン */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/auth/login" 
              className="text-gray-700 hover:text-orange-500 transition"
            >
              ログイン
            </Link>
            <Link 
              href="/auth/register" 
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
            >
              新規登録
            </Link>
          </div>

          {/* モバイルメニューボタン */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* モバイルメニュー */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link href="/creators/search" className="text-gray-700 hover:text-orange-500">
                クリエーターを探す
              </Link>
              <Link href="/jobs/search" className="text-gray-700 hover:text-orange-500">
                案件を探す
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-orange-500">
                Creaxとは
              </Link>
              <Link href="/support/guide" className="text-gray-700 hover:text-orange-500">
                使い方
              </Link>
              <hr />
              <Link href="/auth/login" className="text-gray-700 hover:text-orange-500">
                ログイン
              </Link>
              <Link href="/auth/register" className="bg-orange-500 text-white px-4 py-2 rounded-lg text-center hover:bg-orange-600">
                新規登録
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}