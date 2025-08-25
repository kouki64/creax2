'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function CreatorPortfolioPage() {
  const [activeTab, setActiveTab] = useState<'works' | 'stats' | 'reviews'>('works')
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [selectedWork, setSelectedWork] = useState<any>(null)
  
  // 仮のデータ
  const [works] = useState([
    {
      id: 1,
      title: 'Corporate CM Music',
      category: 'CM音楽',
      genre: 'ポップス',
      client: '株式会社ABC',
      date: '2024-01',
      plays: 1234,
      likes: 45,
      audioUrl: '#',
      thumbnail: null,
      description: '明るく前向きなコーポレートCM用の音楽です。',
      duration: '0:30',
      isPublic: true,
      tags: ['CM', 'コーポレート', '明るい']
    },
    {
      id: 2,
      title: 'Game Battle BGM',
      category: 'ゲーム音楽',
      genre: 'オーケストラ',
      client: 'ゲームスタジオXYZ',
      date: '2023-12',
      plays: 2456,
      likes: 89,
      audioUrl: '#',
      thumbnail: null,
      description: 'RPGゲームのバトルシーン用BGM。壮大な雰囲気を演出。',
      duration: '3:45',
      isPublic: true,
      tags: ['ゲーム', 'バトル', '壮大']
    },
    {
      id: 3,
      title: 'Podcast Opening Jingle',
      category: 'ジングル',
      genre: 'エレクトロニック',
      client: '個人クリエーター',
      date: '2023-11',
      plays: 567,
      likes: 23,
      audioUrl: '#',
      thumbnail: null,
      description: 'ビジネス系ポッドキャストのオープニングジングル。',
      duration: '0:15',
      isPublic: true,
      tags: ['ポッドキャスト', 'ジングル', 'ビジネス']
    },
    {
      id: 4,
      title: 'Relaxing Cafe BGM',
      category: 'BGM',
      genre: 'アンビエント',
      client: 'カフェチェーン',
      date: '2023-10',
      plays: 3421,
      likes: 156,
      audioUrl: '#',
      thumbnail: null,
      description: 'カフェで流れる落ち着いた雰囲気のBGM。',
      duration: '5:00',
      isPublic: false,
      tags: ['カフェ', 'BGM', 'リラックス']
    }
  ])

  const [stats] = useState({
    totalPlays: 7678,
    totalLikes: 313,
    totalWorks: 24,
    averageRating: 4.8,
    completedProjects: 45,
    repeatClients: 18,
    monthlyPlays: [
      { month: '2023-10', plays: 1234 },
      { month: '2023-11', plays: 1567 },
      { month: '2023-12', plays: 2456 },
      { month: '2024-01', plays: 2421 }
    ]
  })

  const [reviews] = useState([
    {
      id: 1,
      client: '株式会社ABC',
      project: 'Corporate CM Music',
      rating: 5,
      comment: '期待以上のクオリティでした。納期も早く、修正対応も丁寧でした。',
      date: '2024-01-20'
    },
    {
      id: 2,
      client: 'ゲームスタジオXYZ',
      project: 'Game Battle BGM',
      rating: 5,
      comment: 'イメージ通りの壮大な音楽を制作していただきました。',
      date: '2023-12-15'
    },
    {
      id: 3,
      client: 'カフェチェーン',
      project: 'Relaxing Cafe BGM',
      rating: 4,
      comment: '落ち着いた雰囲気の素敵なBGMでした。',
      date: '2023-10-30'
    }
  ])

  const [uploadForm, setUploadForm] = useState({
    title: '',
    category: '',
    genre: '',
    client: '',
    description: '',
    tags: '',
    audioFile: null as File | null,
    isPublic: true
  })

  const handleDeleteWork = (id: number) => {
    if (confirm('この作品を削除してもよろしいですか？')) {
      console.log('削除:', id)
    }
  }

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('アップロード:', uploadForm)
    setShowUploadModal(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                ポートフォリオ管理
              </h1>
              <p className="text-gray-600">
                あなたの作品を管理・公開して、実力をアピールしましょう
              </p>
            </div>
            <button
              onClick={() => setShowUploadModal(true)}
              className="px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition"
            >
              + 新しい作品を追加
            </button>
          </div>
        </div>

        {/* 統計サマリー */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600 mb-1">総再生数</div>
            <div className="text-2xl font-bold text-gray-900">{stats.totalPlays.toLocaleString()}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600 mb-1">いいね数</div>
            <div className="text-2xl font-bold text-orange-600">{stats.totalLikes}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600 mb-1">作品数</div>
            <div className="text-2xl font-bold text-gray-900">{stats.totalWorks}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600 mb-1">平均評価</div>
            <div className="flex items-center">
              <span className="text-2xl font-bold text-gray-900">{stats.averageRating}</span>
              <span className="text-yellow-500 ml-1">⭐</span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600 mb-1">完了案件</div>
            <div className="text-2xl font-bold text-gray-900">{stats.completedProjects}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600 mb-1">リピート</div>
            <div className="text-2xl font-bold text-green-600">{stats.repeatClients}</div>
          </div>
        </div>

        {/* タブナビゲーション */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('works')}
                className={`py-3 px-6 border-b-2 font-medium text-sm transition ${
                  activeTab === 'works'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                作品一覧
              </button>
              <button
                onClick={() => setActiveTab('stats')}
                className={`py-3 px-6 border-b-2 font-medium text-sm transition ${
                  activeTab === 'stats'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                統計・分析
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-3 px-6 border-b-2 font-medium text-sm transition ${
                  activeTab === 'reviews'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                レビュー
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* 作品一覧タブ */}
            {activeTab === 'works' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {works.map(work => (
                    <div key={work.id} className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition">
                      {/* サムネイル/オーディオプレイヤー */}
                      <div className="aspect-video bg-gradient-to-br from-orange-400 to-orange-600 relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <button className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition">
                            <svg className="w-8 h-8 text-orange-600 ml-1" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M5 4v12l10-6L5 4z" />
                            </svg>
                          </button>
                        </div>
                        <div className="absolute top-2 right-2">
                          {work.isPublic ? (
                            <span className="px-2 py-1 bg-green-500 text-white text-xs rounded">公開</span>
                          ) : (
                            <span className="px-2 py-1 bg-gray-500 text-white text-xs rounded">非公開</span>
                          )}
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                          {work.duration}
                        </div>
                      </div>

                      {/* 作品情報 */}
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-1">{work.title}</h3>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                          <span>{work.category}</span>
                          <span>•</span>
                          <span>{work.genre}</span>
                          <span>•</span>
                          <span>{work.date}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {work.description}
                        </p>
                        
                        {/* タグ */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {work.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded">
                              #{tag}
                            </span>
                          ))}
                        </div>

                        {/* 統計 */}
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-3">
                            <span>▶️ {work.plays}</span>
                            <span>❤️ {work.likes}</span>
                          </div>
                          <span className="text-xs">クライアント: {work.client}</span>
                        </div>

                        {/* アクション */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => setSelectedWork(work)}
                            className="flex-1 px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 transition"
                          >
                            編集
                          </button>
                          <button
                            onClick={() => handleDeleteWork(work.id)}
                            className="px-3 py-1 border border-red-300 text-red-600 rounded text-sm hover:bg-red-50 transition"
                          >
                            削除
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                    もっと見る
                  </button>
                </div>
              </div>
            )}

            {/* 統計・分析タブ */}
            {activeTab === 'stats' && (
              <div className="space-y-6">
                {/* 再生数グラフ */}
                <div>
                  <h3 className="font-semibold mb-4">月別再生数</h3>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-end justify-between h-48">
                      {stats.monthlyPlays.map((data, index) => (
                        <div key={data.month} className="flex-1 flex flex-col items-center">
                          <div 
                            className="w-full bg-orange-500 rounded-t"
                            style={{ height: `${(data.plays / 3000) * 100}%` }}
                          ></div>
                          <div className="text-xs text-gray-600 mt-2">{data.plays}</div>
                          <div className="text-xs text-gray-500">{data.month.slice(5)}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* カテゴリ別統計 */}
                <div>
                  <h3 className="font-semibold mb-4">カテゴリ別パフォーマンス</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">CM音楽</span>
                        <span className="text-sm text-gray-600">6作品</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-600">
                        <span>▶️ 3,456</span>
                        <span>❤️ 145</span>
                        <span>⭐ 4.9</span>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">ゲーム音楽</span>
                        <span className="text-sm text-gray-600">8作品</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-600">
                        <span>▶️ 2,890</span>
                        <span>❤️ 98</span>
                        <span>⭐ 4.7</span>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">BGM</span>
                        <span className="text-sm text-gray-600">5作品</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-600">
                        <span>▶️ 1,234</span>
                        <span>❤️ 56</span>
                        <span>⭐ 4.8</span>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">ジングル</span>
                        <span className="text-sm text-gray-600">5作品</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-600">
                        <span>▶️ 98</span>
                        <span>❤️ 14</span>
                        <span>⭐ 4.6</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 人気作品 */}
                <div>
                  <h3 className="font-semibold mb-4">人気作品TOP3</h3>
                  <div className="space-y-3">
                    {works.slice(0, 3).map((work, index) => (
                      <div key={work.id} className="flex items-center gap-4 bg-gray-50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-orange-500">#{index + 1}</div>
                        <div className="flex-1">
                          <div className="font-medium">{work.title}</div>
                          <div className="text-sm text-gray-600">{work.category} • {work.genre}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm">▶️ {work.plays}</div>
                          <div className="text-sm">❤️ {work.likes}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* レビュータブ */}
            {activeTab === 'reviews' && (
              <div className="space-y-4">
                {reviews.map(review => (
                  <div key={review.id} className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="font-semibold text-gray-900">{review.client}</div>
                        <div className="text-sm text-gray-600">{review.project}</div>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-5 h-5 ${i < review.rating ? 'text-yellow-500' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 2l2.09 4.26L17 7.27l-3.5 3.41.83 4.82L10 13.4l-4.33 2.1.83-4.82L3 7.27l4.91-1.01L10 2z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 mb-2">{review.comment}</p>
                    <div className="text-xs text-gray-500">{review.date}</div>
                  </div>
                ))}
                
                <div className="text-center mt-6">
                  <Link href="/reviews/me" className="text-orange-500 hover:text-orange-600">
                    すべてのレビューを見る →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* アップロードモーダル */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">新しい作品を追加</h2>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <form onSubmit={handleUploadSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    作品タイトル <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    value={uploadForm.title}
                    onChange={(e) => setUploadForm({...uploadForm, title: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      カテゴリ <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      value={uploadForm.category}
                      onChange={(e) => setUploadForm({...uploadForm, category: e.target.value})}
                    >
                      <option value="">選択してください</option>
                      <option value="bgm">BGM</option>
                      <option value="theme">テーマソング</option>
                      <option value="jingle">ジングル</option>
                      <option value="arrangement">アレンジ</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ジャンル <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      value={uploadForm.genre}
                      onChange={(e) => setUploadForm({...uploadForm, genre: e.target.value})}
                    >
                      <option value="">選択してください</option>
                      <option value="pop">ポップス</option>
                      <option value="rock">ロック</option>
                      <option value="edm">EDM</option>
                      <option value="orchestral">オーケストラ</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    クライアント名
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    value={uploadForm.client}
                    onChange={(e) => setUploadForm({...uploadForm, client: e.target.value})}
                    placeholder="守秘義務がある場合は空欄でOK"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    作品説明
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    value={uploadForm.description}
                    onChange={(e) => setUploadForm({...uploadForm, description: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    タグ（カンマ区切り）
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    value={uploadForm.tags}
                    onChange={(e) => setUploadForm({...uploadForm, tags: e.target.value})}
                    placeholder="例: CM, 明るい, コーポレート"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    音声ファイル <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    accept="audio/*"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    onChange={(e) => setUploadForm({...uploadForm, audioFile: e.target.files?.[0] || null})}
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isPublic"
                    checked={uploadForm.isPublic}
                    onChange={(e) => setUploadForm({...uploadForm, isPublic: e.target.checked})}
                    className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isPublic" className="ml-2 text-sm text-gray-700">
                    この作品を公開する
                  </label>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition"
                >
                  アップロード
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}