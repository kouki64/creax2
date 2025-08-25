'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function GuidePage() {
  const [selectedRole, setSelectedRole] = useState<'client' | 'creator'>('client')
  const [selectedCategory, setSelectedCategory] = useState('getting-started')

  const clientGuides = {
    'getting-started': {
      title: 'はじめに',
      items: [
        { id: 1, title: 'アカウント登録方法', time: '3分' },
        { id: 2, title: 'プロフィール設定', time: '5分' },
        { id: 3, title: '本人確認の手順', time: '5分' }
      ]
    },
    'posting': {
      title: '案件投稿',
      items: [
        { id: 4, title: 'コンペ形式での募集方法', time: '7分' },
        { id: 5, title: '指名形式での依頼方法', time: '5分' },
        { id: 6, title: '効果的な案件説明の書き方', time: '10分' }
      ]
    },
    'payment': {
      title: '決済',
      items: [
        { id: 7, title: 'PayPay決済の使い方', time: '3分' },
        { id: 8, title: 'エスクローシステムについて', time: '5分' },
        { id: 9, title: '返金・キャンセルポリシー', time: '5分' }
      ]
    }
  }

  const creatorGuides = {
    'getting-started': {
      title: 'はじめに',
      items: [
        { id: 10, title: 'クリエーター登録方法', time: '5分' },
        { id: 11, title: 'ポートフォリオの作成', time: '10分' },
        { id: 12, title: 'スキル認定を受ける', time: '7分' }
      ]
    },
    'applying': {
      title: '案件応募',
      items: [
        { id: 13, title: '案件の探し方', time: '5分' },
        { id: 14, title: '提案文の書き方', time: '10分' },
        { id: 15, title: '見積もりの作成方法', time: '7分' }
      ]
    },
    'delivery': {
      title: '納品',
      items: [
        { id: 16, title: '納品の手順', time: '5分' },
        { id: 17, title: '修正対応について', time: '5分' },
        { id: 18, title: '評価システム', time: '3分' }
      ]
    },
    'earnings': {
      title: '収益',
      items: [
        { id: 19, title: '収益の確認方法', time: '3分' },
        { id: 20, title: '出金申請の手順', time: '5分' },
        { id: 21, title: '確定申告について', time: '10分' }
      ]
    }
  }

  const guides = selectedRole === 'client' ? clientGuides : creatorGuides

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">使い方ガイド</h1>
          <p className="mt-2 text-gray-600">Creaxを最大限活用するための完全ガイド</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ロール選択 */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-4">
            <div className="flex space-x-4">
              <button
                onClick={() => {
                  setSelectedRole('client')
                  setSelectedCategory('getting-started')
                }}
                className={`flex-1 py-3 px-6 rounded-lg font-medium transition ${
                  selectedRole === 'client'
                    ? 'bg-[#ff6232] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                クライアント向けガイド
              </button>
              <button
                onClick={() => {
                  setSelectedRole('creator')
                  setSelectedCategory('getting-started')
                }}
                className={`flex-1 py-3 px-6 rounded-lg font-medium transition ${
                  selectedRole === 'creator'
                    ? 'bg-[#ff6232] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                クリエーター向けガイド
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* サイドバー - カテゴリメニュー */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-semibold text-gray-900 mb-4">カテゴリー</h3>
              <nav className="space-y-2">
                {Object.entries(guides).map(([key, category]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedCategory(key)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition ${
                      selectedCategory === key
                        ? 'bg-[#ff6232] text-white'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    {category.title}
                  </button>
                ))}
              </nav>
            </div>

            {/* クイックリンク */}
            <div className="bg-white rounded-lg shadow p-4 mt-6">
              <h3 className="font-semibold text-gray-900 mb-4">クイックリンク</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/support/faq" className="text-[#ff6232] hover:text-[#e5562c]">
                    よくある質問 →
                  </Link>
                </li>
                <li>
                  <Link href="/support/contact" className="text-[#ff6232] hover:text-[#e5562c]">
                    お問い合わせ →
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-[#ff6232] hover:text-[#e5562c]">
                    利用規約 →
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* メインコンテンツ */}
          <div className="lg:col-span-3">
            {/* 検索バー */}
            <div className="bg-white rounded-lg shadow p-4 mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="ガイドを検索..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6232] focus:border-[#ff6232]"
                />
                <svg className="absolute left-3 top-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* ガイドリスト */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold text-gray-900">
                  {guides[selectedCategory as keyof typeof guides].title}
                </h2>
              </div>
              <div className="divide-y">
                {guides[selectedCategory as keyof typeof guides].items.map(item => (
                  <div key={item.id} className="p-6 hover:bg-gray-50 transition">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          {item.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            読了時間: {item.time}
                          </span>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-[#ff6232] text-white rounded-lg hover:bg-[#e5562c] transition">
                        読む
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ビデオチュートリアル */}
            <div className="bg-white rounded-lg shadow mt-8 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                ビデオチュートリアル
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="aspect-video bg-gray-300 rounded mb-3 flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="font-medium text-gray-900">はじめての案件投稿</h3>
                  <p className="text-sm text-gray-600 mt-1">5分でわかる案件投稿の流れ</p>
                </div>
                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="aspect-video bg-gray-300 rounded mb-3 flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="font-medium text-gray-900">PayPay決済の使い方</h3>
                  <p className="text-sm text-gray-600 mt-1">安全・簡単な決済方法</p>
                </div>
              </div>
            </div>

            {/* ヘルプが必要な場合 */}
            <div className="bg-gradient-to-r from-[#ff6232] to-[#ff8a5c] rounded-lg p-8 mt-8 text-white">
              <h2 className="text-2xl font-bold mb-4">まだお困りですか？</h2>
              <p className="mb-6">
                ガイドで解決しない場合は、お気軽にサポートチームまでお問い合わせください。
              </p>
              <div className="flex space-x-4">
                <Link
                  href="/support/contact"
                  className="px-6 py-3 bg-white text-[#ff6232] rounded-lg hover:bg-gray-100 transition font-medium"
                >
                  お問い合わせフォーム
                </Link>
                <button className="px-6 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition font-medium">
                  チャットで相談
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}