'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function CreatorDetailPage() {
  const params = useParams()
  const [activeTab, setActiveTab] = useState('portfolio')
  
  // 🆕 SNS関連データを追加
  const [snsData] = useState({
    mvpBadges: [
      { title: '最多納品賞', icon: '🏆', count: 3 },
      { title: 'スピード納品賞', icon: '⚡', count: 2 },
      { title: '最高評価賞', icon: '⭐', count: 1 }
    ],
    isMentor: true,
    mentorBadge: {
      level: 'Gold',
      students: 12,
      rating: 4.9
    },
    productionNotes: {
      count: 8,
      popular: [
        { id: 'note-001', title: '80年代シンセポップ風OPテーマの制作秘話', likes: 234 },
        { id: 'note-002', title: 'ゲームBGMで重要な「ループ感」を出すテクニック', likes: 156 }
      ]
    },
    hallOfFame: true
  })

  const creator = {
    id: params.id,
    name: '山田太郎',
    title: 'プロアレンジャー / サウンドクリエイター',
    experience: '10年',
    completedProjects: 234,
    rating: 4.9,
    reviewCount: 89,
    responseTime: '約2時間',
    deliveryRate: '100%',
    bio: 'メジャーアーティストへの楽曲提供実績多数。ポップス、ロック、EDMを得意としています。',
    skills: ['作曲', 'アレンジ', 'ミキシング', 'マスタリング'],
    genres: ['ポップス', 'ロック', 'EDM', 'R&B'],
    software: ['Logic Pro', 'Pro Tools', 'Ableton Live'],
    minimumPrice: 30000
  }

  const portfolio = [
    { id: 1, title: 'YouTubeチャンネルOP', type: 'アレンジ', plays: 1234 },
    { id: 2, title: 'ゲームBGM - 戦闘シーン', type: '作曲', plays: 856 },
    { id: 3, title: 'CM音楽 - 企業PR', type: '作曲・アレンジ', plays: 623 }
  ]

  const reviews = [
    {
      id: 1,
      clientName: 'クライアントA',
      rating: 5,
      date: '2024-02-10',
      comment: '期待以上のクオリティでした。また依頼したいです。'
    },
    {
      id: 2,
      clientName: 'クライアントB',
      rating: 5,
      date: '2024-02-05',
      comment: '迅速な対応と素晴らしい仕上がりに感謝しています。'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/creators/search" className="text-gray-600 hover:text-gray-900">
            ← クリエーター検索に戻る
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* メインコンテンツ */}
          <div className="lg:col-span-2">
            {/* プロフィールヘッダー */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 bg-gradient-to-br from-[#ff6232] to-[#ff8a5c] rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  {creator.name[0]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl font-bold text-gray-900">{creator.name}</h1>
                    {/* 🆕 殿堂入りバッジ */}
                    {snsData.hallOfFame && (
                      <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-full text-xs font-bold">
                        🏛️ 殿堂入り
                      </span>
                    )}
                    {/* 🆕 メンターバッジ */}
                    {snsData.isMentor && (
                      <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full text-xs font-bold">
                        👨‍🏫 {snsData.mentorBadge.level}メンター
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-4">{creator.title}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center">
                      <span className="text-yellow-500 mr-1">⭐</span>
                      <span className="font-semibold">{creator.rating}</span>
                      <span className="text-gray-600 ml-1">({creator.reviewCount}件)</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      経験{creator.experience}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      完了案件 {creator.completedProjects}件
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 🆕 MVP獲得バッジ */}
              {snsData.mvpBadges.length > 0 && (
                <div className="mt-6 pt-6 border-t">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">MVP獲得実績</h3>
                  <div className="flex flex-wrap gap-3">
                    {snsData.mvpBadges.map((badge, index) => (
                      <div key={index} className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
                        <span className="text-xl">{badge.icon}</span>
                        <div>
                          <p className="text-xs font-semibold text-gray-900">{badge.title}</p>
                          <p className="text-xs text-gray-600">獲得{badge.count}回</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <p className="mt-6 text-gray-700">{creator.bio}</p>
            </div>

            {/* タブコンテンツ */}
            <div className="bg-white rounded-lg shadow">
              {/* タブナビゲーション */}
              <div className="border-b">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab('portfolio')}
                    className={`px-6 py-3 font-medium ${
                      activeTab === 'portfolio'
                        ? 'text-[#ff6232] border-b-2 border-[#ff6232]'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    ポートフォリオ
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`px-6 py-3 font-medium ${
                      activeTab === 'reviews'
                        ? 'text-[#ff6232] border-b-2 border-[#ff6232]'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    レビュー
                  </button>
                  {/* 🆕 制作後記タブ */}
                  <button
                    onClick={() => setActiveTab('notes')}
                    className={`px-6 py-3 font-medium ${
                      activeTab === 'notes'
                        ? 'text-[#ff6232] border-b-2 border-[#ff6232]'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    制作後記 ({snsData.productionNotes.count})
                  </button>
                  <button
                    onClick={() => setActiveTab('about')}
                    className={`px-6 py-3 font-medium ${
                      activeTab === 'about'
                        ? 'text-[#ff6232] border-b-2 border-[#ff6232]'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    詳細情報
                  </button>
                </div>
              </div>

              <div className="p-6">
                {/* ポートフォリオ */}
                {activeTab === 'portfolio' && (
                  <div className="space-y-4">
                    {portfolio.map(item => (
                      <div key={item.id} className="border rounded-lg p-4 hover:shadow-md transition">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">{item.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">種類: {item.type}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600">再生回数</p>
                            <p className="font-semibold">{item.plays.toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="bg-gray-100 rounded-lg h-12 flex items-center justify-center text-gray-500">
                            ♪ 音楽プレーヤー
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* レビュー */}
                {activeTab === 'reviews' && (
                  <div className="space-y-4">
                    {reviews.map(review => (
                      <div key={review.id} className="border-b pb-4 last:border-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{review.clientName}</span>
                            <div className="flex text-yellow-500">
                              {[...Array(5)].map((_, i) => (
                                <svg key={i} className="w-4 h-4" fill={i < review.rating ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* 🆕 制作後記 */}
                {activeTab === 'notes' && (
                  <div className="space-y-4">
                    {snsData.productionNotes.popular.map(note => (
                      <Link
                        key={note.id}
                        href={`/production-notes/${note.id}`}
                        className="block border rounded-lg p-4 hover:shadow-md transition"
                      >
                        <h3 className="font-semibold text-gray-900 hover:text-[#ff6232]">
                          {note.title}
                        </h3>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm text-gray-600">
                            👍 {note.likes} いいね
                          </span>
                          <span className="text-[#ff6232] text-sm">
                            読む →
                          </span>
                        </div>
                      </Link>
                    ))}
                    <Link
                      href={`/production-notes?creator=${creator.id}`}
                      className="block text-center py-3 text-[#ff6232] hover:text-[#e5562c] font-medium"
                    >
                      すべての制作後記を見る ({snsData.productionNotes.count}件)
                    </Link>
                  </div>
                )}

                {/* 詳細情報 */}
                {activeTab === 'about' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-3">スキル</h3>
                      <div className="flex flex-wrap gap-2">
                        {creator.skills.map(skill => (
                          <span key={skill} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3">対応ジャンル</h3>
                      <div className="flex flex-wrap gap-2">
                        {creator.genres.map(genre => (
                          <span key={genre} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                            {genre}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3">使用ソフトウェア</h3>
                      <div className="flex flex-wrap gap-2">
                        {creator.software.map(sw => (
                          <span key={sw} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                            {sw}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* サイドバー */}
          <div className="lg:col-span-1">
            {/* 依頼ボックス */}
            <div className="bg-white rounded-lg shadow p-6 mb-6 sticky top-4">
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-1">最低料金</p>
                <p className="text-2xl font-bold text-gray-900">
                  ¥{creator.minimumPrice.toLocaleString()}〜
                </p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">返答時間</span>
                  <span className="font-medium">{creator.responseTime}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">納品率</span>
                  <span className="font-medium text-green-600">{creator.deliveryRate}</span>
                </div>
              </div>

              <Link
                href={`/client/projects/new/direct?creator=${creator.id}`}
                className="block w-full text-center px-4 py-3 bg-[#ff6232] text-white rounded-lg hover:bg-[#e5562c] transition font-medium mb-3"
              >
                このクリエーターに依頼
              </Link>
              
              <button className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                メッセージを送る
              </button>

              {/* 🆕 メンター申し込み */}
              {snsData.isMentor && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm font-semibold text-gray-700 mb-2">
                    メンターシップ
                  </p>
                  <p className="text-xs text-gray-600 mb-3">
                    現在の弟子: {snsData.mentorBadge.students}名
                  </p>
                  <Link
                    href="/creator/mentorship"
                    className="block w-full text-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
                  >
                    弟子に応募する
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}