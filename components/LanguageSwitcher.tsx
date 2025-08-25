'use client'

import { useState } from 'react'

export default function LanguageSwitcher() {
  const [language, setLanguage] = useState<'ja' | 'en'>('ja')

  const handleLanguageChange = (lang: 'ja' | 'en') => {
    setLanguage(lang)
    // 実際の実装では、ここでnext-intlのロケール変更処理を行う
    // router.push(pathname, { locale: lang })
  }

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-[#ff6232] transition"
        onClick={() => setLanguage(language === 'ja' ? 'en' : 'ja')}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
        <span>{language === 'ja' ? '日本語' : 'English'}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  )
}