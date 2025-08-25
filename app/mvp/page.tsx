'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function MVPPage() {
  const [selectedWeek, setSelectedWeek] = useState('current')
  
  // MVPデータ
  const [mvpData] = useState({
    week: '2024年2月第3週',
    categories: [
      {
        title: '最多納品賞',
        icon: '🏆',
        winner: {
          id: 'creator-001',
          name: '山田太郎',
          avatar: null,
          count: '12件',
          description: '今週12件の案件を完了！驚異的なスピードと品質を両立'
        }
      },
      {
        title: '最高評価賞',
        icon: '⭐',
        winner: {
          id: 'creator-002',
          name: '佐藤花子',
          avatar: null,
          rating: '5.0',
          description: '全案件で満点評価を獲得！クライアントから絶賛の声'
        }
      },
      {
        title: '新人賞',
        icon: '🌟',
        winner: {
          id: 'creator-003',
          name: '鈴木一郎',
          avatar: null,
          achievement: '初案件で高評価',
          description: '登録1週間で3件受注、全て★4.8以上の高評価'
        }
      },
      {
        title: 'コラボ王',
        icon: '🤝',
        winner: {
          id: 'creator-004',
          name: '田中美咲',
          avatar: null,
          collaborations: '8名',
          description: '8名のクリエーターとコラボレーション成功'
        }
      },
      {
        title: 'スピード納品賞',
        icon: '⚡',
        winner: {
          id: 'creator-005',
          name: '高橋健太',
          avatar: null,
          time: '平均18時間',
          description: '期限の50%以下の時間で全案件納品'
        }
      },
      {
        title: 'クライアント選出賞',
        icon: '❤️',
        winner: {
          id: 'creator-006',
          name: '伊藤真理',
          avatar: null,
          votes: '234票',
          description: 'クライアントからの推薦票数No.1'
        }
      }
    ],
    hallOfFame: [
      { name: '山田太郎', awards: 5, badges: ['🏆', '⭐', '⚡'] },
      { name: '佐藤花子', awards: 3, badges: ['⭐', '❤️'] },
      { name: '鈴木一郎', awards: 2, badges: ['🌟'] }
    ]
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-[#ff6232]">
                Creax
              </Link>
              <nav className="ml-8 flex space-x-4">
                <Link href="/mvp" className="text-[#ff6232] font-medium">
                  今週のMVP
                </Link>
                <Link href="/creators/search" className="text-gray-600 hover:text-gray-900">
                  クリエーター
                </Link>
                <Link href="/jobs/search" className="text-gray-600 hover:text-gray-900">
                  案件
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* ヒーローセクション */}
      <div className="bg-gradient-to-r from-[#ff6232] to-[#ff8a5c] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">
            🏆 今週のMVP
          </h1>
          <p className="text-xl opacity-90">
            {mvpData.week} の最も活躍したクリエーターたち
          </p>
          
          {/* 週選択 */}
          <div className="mt-6 flex justify-center gap-2">
            <button
              onClick={() => setSelectedWeek('prev')}
              className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30"
            >
              ← 前週
            </button>
            <button
              onClick={() => setSelectedWeek('current')}
              className="px-6 py-2 bg-white text-[#ff6232] rounded-lg font-medium"
            >
              今週
            </button>
            <button
              onClick={() => setSelectedWeek('next')}
              className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30"
              disabled
            >
              翌週 →
            </button>
          </div>
        </div>
      </div>

      {/* MVP カテゴリー */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mvpData.categories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden group"
            >
              {/* カテゴリーヘッダー */}
              <div className="bg-gradient-to-r from-[#ff6232] to-[#ff8a5c] p-4 text-white">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold">{category.title}</h3>
                  <span className="text-3xl">{category.icon}</span>
                </div>
              </div>
              
              {/* 受賞者情報 */}
              <div className="p-6">
                <Link href={`/creators/${category.winner.id}`}>
                  <div className="flex items-center mb-4 group-hover:scale-105 transition">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#ff6232] to-[#ff8a5c] rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                      {category.winner.name[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">
                        {category.winner.name}
                      </h4>
                      <p className="text-[#ff6232] font-semibold">
                        {category.winner.count || category.winner.rating || category.winner.achievement || category.winner.collaborations || category.winner.time || category.winner.votes}
                      </p>
                    </div>
                  </div>
                </Link>
                
                <p className="text-gray-600 text-sm leading-relaxed">
                  {category.winner.description}
                </p>
                
                <Link
                  href={`/creators/${category.winner.id}`}
                  className="inline-flex items-center mt-4 text-[#ff6232] hover:text-[#e5562c] font-medium"
                >
                  プロフィールを見る
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              
              {/* 装飾的な要素 */}
              <div className="absolute top-2 right-2 opacity-10">
                <span className="text-6xl">{category.icon}</span>
              </div>
            </div>
          ))}
        </div>

        {/* 殿堂入り */}
        <div className="mt-12 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            🏛️ 殿堂入りクリエーター
          </h2>
          <p className="text-center text-gray-600 mb-8">
            通算MVP獲得数ランキング
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {mvpData.hallOfFame.map((creator, index) => (
              <div key={index} className="bg-white rounded-lg p-6 text-center">
                <div className="text-4xl mb-2">
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">
                  {creator.name}
                </h3>
                <p className="text-gray-600 mb-3">
                  MVP獲得 {creator.awards}回
                </p>
                <div className="flex justify-center gap-2">
                  {creator.badges.map((badge, i) => (
                    <span key={i} className="text-2xl">{badge}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            あなたも今週のMVPを目指しませんか？
          </p>
          <Link
            href="/auth/register/creator"
            className="inline-block px-8 py-3 bg-[#ff6232] text-white rounded-lg hover:bg-[#e5562c] transition font-medium"
          >
            クリエーター登録する
          </Link>
        </div>
      </div>
    </div>
  )
}