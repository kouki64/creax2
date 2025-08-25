'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ProductionNotesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)
  
  // 制作後記データ
  const [notes] = useState([
    {
      id: 'note-001',
      projectTitle: 'YouTubeチャンネルOP制作',
      projectId: 'proj-001',
      creatorName: '山田太郎',
      creatorId: 'creator-001',
      createdAt: '2024-02-15',
      category: 'アレンジ',
      thumbnail: null,
      title: '80年代シンセポップ風OPテーマの制作秘話',
      excerpt: 'クライアントから「レトロフューチャー」というキーワードをいただき、80年代のシンセポップを現代風にアレンジ...',
      readTime: '5分',
      likes: 234,
      comments: 18,
      helpful: 189,
      tags: ['シンセポップ', 'レトロ', 'YouTube'],
      featured: true
    },
    {
      id: 'note-002',
      projectTitle: 'ゲームBGM制作',
      projectId: 'proj-002',
      creatorName: '佐藤花子',
      creatorId: 'creator-002',
      createdAt: '2024-02-14',
      category: 'ミキシング',
      thumbnail: null,
      title: 'ゲームBGMで重要な「ループ感」を出すテクニック',
      excerpt: 'ゲームBGMは通常の楽曲と違い、何度もループ再生されることを前提に作る必要があります。今回は...',
      readTime: '8分',
      likes: 156,
      comments: 23,
      helpful: 201,
      tags: ['ゲーム音楽', 'ループ', 'BGM'],
      featured: false
    },
    {
      id: 'note-003',
      projectTitle: 'CM音楽制作',
      projectId: 'proj-003',
      creatorName: '鈴木一郎',
      creatorId: 'creator-003',
      createdAt: '2024-02-13',
      category: '作曲',
      thumbnail: null,
      title: '15秒で印象に残るメロディーを作る方法',
      excerpt: 'CM音楽は短時間で強い印象を残す必要があります。今回の案件では、わずか15秒という制約の中で...',
      readTime: '6分',
      likes: 312,
      comments: 45,
      helpful: 298,
      tags: ['CM', '作曲', 'メロディー'],
      featured: true
    }
  ])

  // カテゴリー
  const categories = [
    { value: 'all', label: 'すべて', count: 156 },
    { value: 'compose', label: '作曲', count: 45 },
    { value: 'arrange', label: 'アレンジ', count: 38 },
    { value: 'mixing', label: 'ミキシング', count: 29 },
    { value: 'mastering', label: 'マスタリング', count: 18 },
    { value: 'recording', label: 'レコーディング', count: 26 }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">制作後記</h1>
              <p className="text-gray-600 mt-1">クリエーターが語る制作の裏側</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-[#ff6232] text-white rounded-lg hover:bg-[#e5562c] transition"
            >
              制作後記を書く
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* サイドバー */}
          <div className="lg:col-span-1">
            {/* カテゴリーフィルター */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h3 className="font-semibold mb-4">カテゴリー</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition ${
                      selectedCategory === category.value
                        ? 'bg-[#ff6232] text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{category.label}</span>
                      <span className={`text-sm ${
                        selectedCategory === category.value ? 'text-white' : 'text-gray-500'
                      }`}>
                        {category.count}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 人気のタグ */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold mb-4">人気のタグ</h3>
              <div className="flex flex-wrap gap-2">
                {['シンセポップ', 'ゲーム音楽', 'CM', 'ループ', 'メロディー', 'コード進行', 'DTM'].map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* メインコンテンツ */}
          <div className="lg:col-span-3">
            {/* 注目の制作後記 */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">🌟 注目の制作後記</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {notes.filter(note => note.featured).map(note => (
                  <div key={note.id} className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-lg p-6 border border-orange-200">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 mb-1">
                          {note.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          by {note.creatorName} • {note.createdAt}
                        </p>
                      </div>
                      <span className="px-2 py-1 bg-white rounded text-xs text-[#ff6232] font-medium">
                        FEATURED
                      </span>
                    </div>
                    
                    <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                      {note.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>👍 {note.helpful}</span>
                        <span>💬 {note.comments}</span>
                        <span>📖 {note.readTime}</span>
                      </div>
                      <Link
                        href={`/production-notes/${note.id}`}
                        className="text-[#ff6232] hover:text-[#e5562c] font-medium text-sm"
                      >
                        続きを読む →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 最新の制作後記 */}
            <div>
              <h2 className="text-xl font-bold mb-4">📝 最新の制作後記</h2>
              <div className="space-y-4">
                {notes.map(note => (
                  <div key={note.id} className="bg-white rounded-lg shadow hover:shadow-lg transition p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                            {note.category}
                          </span>
                          <span className="text-gray-500 text-sm">
                            案件: {note.projectTitle}
                          </span>
                        </div>
                        
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {note.title}
                        </h3>
                        
                        <p className="text-gray-700 mb-3">
                          {note.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Link href={`/creators/${note.creatorId}`} className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-gradient-to-br from-[#ff6232] to-[#ff8a5c] rounded-full flex items-center justify-center text-white text-xs font-bold">
                                {note.creatorName[0]}
                              </div>
                              <span className="text-sm text-gray-700 hover:text-[#ff6232]">
                                {note.creatorName}
                              </span>
                            </Link>
                            <span className="text-sm text-gray-500">
                              {note.createdAt}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <button className="flex items-center gap-1 text-gray-600 hover:text-[#ff6232]">
                              <span>👍</span>
                              <span className="text-sm">{note.likes}</span>
                            </button>
                            <button className="flex items-center gap-1 text-gray-600 hover:text-[#ff6232]">
                              <span>💬</span>
                              <span className="text-sm">{note.comments}</span>
                            </button>
                            <button className="flex items-center gap-1 text-gray-600 hover:text-[#ff6232]">
                              <span>📌</span>
                              <span className="text-sm">保存</span>
                            </button>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mt-3">
                          {note.tags.map(tag => (
                            <span key={tag} className="text-xs text-gray-600 hover:text-[#ff6232] cursor-pointer">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-green-600 text-sm font-medium">
                          参考になった {note.helpful}人
                        </span>
                      </div>
                      <Link
                        href={`/production-notes/${note.id}`}
                        className="px-4 py-2 bg-[#ff6232] text-white rounded-lg hover:bg-[#e5562c] text-sm"
                      >
                        全文を読む
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* もっと見る */}
            <div className="mt-8 text-center">
              <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                もっと見る
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 制作後記作成モーダル */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">制作後記を書く</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  関連する案件
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option>YouTubeチャンネルOP制作（2024-02-15完了）</option>
                  <option>ゲームBGM制作（2024-02-10完了）</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  タイトル
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="制作の裏側を表すタイトル"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  カテゴリー
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option>作曲</option>
                  <option>アレンジ</option>
                  <option>ミキシング</option>
                  <option>マスタリング</option>
                  <option>レコーディング</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  本文
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  rows={10}
                  placeholder="制作で工夫した点、苦労した点、学んだことなどを共有してください"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  タグ（カンマ区切り）
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="例: DTM, ミキシング, ボーカル処理"
                />
              </div>
            </div>
            
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                下書き保存
              </button>
              <button
                onClick={() => {
                  alert('制作後記を公開しました！')
                  setShowCreateModal(false)
                }}
                className="flex-1 px-4 py-2 bg-[#ff6232] text-white rounded-lg hover:bg-[#e5562c]"
              >
                公開する
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}