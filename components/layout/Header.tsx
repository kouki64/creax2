'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [userType, setUserType] = useState<'client' | 'creator' | 'guest'>('creator') // 実際はセッションから取得
  
  // パスによってヘッダーを表示しない
  if (pathname.startsWith('/admin') || pathname.startsWith('/auth')) {
    return null
  }

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* ロゴ */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-[#ff6232]">Creax</span>
            </Link>
            
            {/* デスクトップナビゲーション */}
            <nav className="hidden md:ml-8 md:flex md:space-x-6">
              <Link 
                href="/jobs/search" 
                className={`text-gray-700 hover:text-[#ff6232] px-3 py-2 text-sm font-medium ${
                  pathname === '/jobs/search' ? 'text-[#ff6232]' : ''
                }`}
              >
                案件を探す
              </Link>
              <Link 
                href="/creators/search" 
                className={`text-gray-700 hover:text-[#ff6232] px-3 py-2 text-sm font-medium ${
                  pathname === '/creators/search' ? 'text-[#ff6232]' : ''
                }`}
              >
                クリエーター
              </Link>
              
              {/* 🆕 SNS機能リンク */}
              <Link 
                href="/mvp" 
                className={`text-gray-700 hover:text-[#ff6232] px-3 py-2 text-sm font-medium flex items-center ${
                  pathname === '/mvp' ? 'text-[#ff6232]' : ''
                }`}
              >
                <span className="mr-1">🏆</span>
                MVP
              </Link>
              <Link 
                href="/production-notes" 
                className={`text-gray-700 hover:text-[#ff6232] px-3 py-2 text-sm font-medium ${
                  pathname === '/production-notes' ? 'text-[#ff6232]' : ''
                }`}
              >
                制作後記
              </Link>
              {userType === 'creator' && (
                <Link 
                  href="/creator/mentorship" 
                  className={`text-gray-700 hover:text-[#ff6232] px-3 py-2 text-sm font-medium ${
                    pathname === '/creator/mentorship' ? 'text-[#ff6232]' : ''
                  }`}
                >
                  メンター
                </Link>
              )}
            </nav>
          </div>

          {/* 右側メニュー */}
          <div className="flex items-center space-x-4">
            {userType === 'guest' ? (
              <>
                <Link 
                  href="/auth/login" 
                  className="text-gray-700 hover:text-[#ff6232] px-3 py-2 text-sm font-medium"
                >
                  ログイン
                </Link>
                <Link 
                  href="/auth/register" 
                  className="bg-[#ff6232] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#e5562c]"
                >
                  新規登録
                </Link>
              </>
            ) : (
              <>
                {/* 通知アイコン */}
                <button className="p-2 text-gray-600 hover:text-gray-900 relative">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* メッセージアイコン */}
                <Link href="/messages" className="p-2 text-gray-600 hover:text-gray-900 relative">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </Link>

                {/* ユーザーメニュー */}
                <div className="relative">
                  <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-[#ff6232] to-[#ff8a5c] rounded-full flex items-center justify-center text-white font-bold">
                      C
                    </div>
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                      <Link 
                        href={userType === 'client' ? '/client/dashboard' : '/creator/dashboard'}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        ダッシュボード
                      </Link>
                      {userType === 'creator' && (
                        <>
                          <Link 
                            href="/creator/profile/edit"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            プロフィール編集
                          </Link>
                          <Link 
                            href="/creator/portfolio"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            ポートフォリオ
                          </Link>
                          <Link 
                            href="/creator/earnings"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            収益管理
                          </Link>
                        </>
                      )}
                      {userType === 'client' && (
                        <>
                          <Link 
                            href="/client/projects"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            案件管理
                          </Link>
                          <Link 
                            href="/payment/history"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            決済履歴
                          </Link>
                        </>
                      )}
                      <hr className="my-1" />
                      <Link 
                        href="/support/faq"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        ヘルプ
                      </Link>
                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        ログアウト
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* モバイルメニューボタン */}
            <button 
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* モバイルメニュー */}
        {isMenuOpen && (
          <div className="md:hidden border-t">
            <nav className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                href="/jobs/search"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#ff6232] hover:bg-gray-50 rounded-md"
              >
                案件を探す
              </Link>
              <Link 
                href="/creators/search"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#ff6232] hover:bg-gray-50 rounded-md"
              >
                クリエーター
              </Link>
              <Link 
                href="/mvp"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#ff6232] hover:bg-gray-50 rounded-md"
              >
                🏆 MVP
              </Link>
              <Link 
                href="/production-notes"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#ff6232] hover:bg-gray-50 rounded-md"
              >
                制作後記
              </Link>
              {userType === 'creator' && (
                <Link 
                  href="/creator/mentorship"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#ff6232] hover:bg-gray-50 rounded-md"
                >
                  メンターシップ
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}