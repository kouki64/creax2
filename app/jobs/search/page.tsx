'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function JobSearchPage() {
  // 検索条件
  const [filters, setFilters] = useState({
    keyword: '',
    category: '',
    genre: '',
    budgetMin: '',
    budgetMax: '',
    type: '', // competition or direct
    sortBy: 'newest' // newest, deadline, budget_high, budget_low
  })

  // 仮のデータ（実際はAPIから取得）
  const [jobs] = useState([
    {
      id: 1,
      title: 'YouTubeチャンネルのオープニングテーマ制作',
      client: '株式会社クリエイティブ',
      category: 'BGM制作',
      genre: 'ポップス',
      type: 'competition',
      budget: '50,000円〜100,000円',
      deadline: '2024-02-25',
      applicants: 12,
      description: '明るく親しみやすいYouTubeチャンネルのオープニングテーマを制作していただきたいです。',
      tags: ['YouTube', 'オープニング', '明るい'],
      isNew: true,
      isUrgent: false
    },
    {
      id: 2,
      title: 'ゲームBGM制作（バトルシーン用）',
      client: 'ゲームスタジオXYZ',
      category: 'BGM制作',
      genre: 'ゲーム音楽',
      type: 'competition',
      budget: '100,000円〜150,000円',
      deadline: '2024-03-01',
      applicants: 8,
      description: 'RPGゲームのバトルシーン用BGMを5曲制作していただきます。壮大で緊張感のある楽曲を希望。',
      tags: ['ゲーム', 'バトル', '壮大'],
      isNew: true,
      isUrgent: true
    },
    {
      id: 3,
      title: 'CM音楽のアレンジ（30秒）',
      client: '広告代理店ABC',
      category: 'アレンジ',
      genre: 'CM/広告',
      type: 'direct',
      budget: '30,000円',
      deadline: '2024-02-20',
      applicants: 0,
      description: '既存のメロディーをCM用にアレンジしていただきたいです。',
      tags: ['CM', 'アレンジ', '30秒'],
      isNew: false,
      isUrgent: true
    },
    {
      id: 4,
      title: '店舗BGM制作（ループ音源）',
      client: 'カフェチェーン',
      category: 'BGM制作',
      genre: 'アンビエント',
      type: 'competition',
      budget: '20,000円〜40,000円',
      deadline: '2024-02-28',
      applicants: 5,
      description: 'カフェで流す落ち着いた雰囲気のBGMを制作してください。',
      tags: ['店舗BGM', 'カフェ', '落ち着いた'],
      isNew: false,
      isUrgent: false
    },
    {
      id: 5,
      title: 'ポッドキャスト用ジングル制作',
      client: '個人クリエーター',
      category: 'ジングル',
      genre: 'ポップス',
      type: 'competition',
      budget: '15,000円〜25,000円',
      deadline: '2024-02-22',
      applicants: 3,
      description: 'ビジネス系ポッドキャストのオープニングジングルを制作してください。',
      tags: ['ポッドキャスト', 'ジングル', 'ビジネス'],
      isNew: true,
      isUrgent: false
    }
  ])

  const categories = [
    { value: 'bgm', label: 'BGM制作' },
    { value: 'theme', label: 'テーマソング' },
    { value: 'jingle', label: 'ジングル' },
    { value: 'arrangement', label: 'アレンジ' },
    { value: 'mixing', label: 'ミキシング' },
    { value: 'mastering', label: 'マスタリング' },
  ]

  const genres = [
    { value: 'pop', label: 'ポップス' },
    { value: 'rock', label: 'ロック' },
    { value: 'jazz', label: 'ジャズ' },
    { value: 'edm', label: 'EDM/ダンス' },
    { value: 'ambient', label: 'アンビエント' },
    { value: 'game', label: 'ゲーム音楽' },
    { value: 'commercial', label: 'CM/広告' },
  ]

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFilters(prev => ({ ...prev, [name]: value }))
  }

  const clearFilters = () => {
    setFilters({
      keyword: '',
      category: '',
      genre: '',
      budgetMin: '',
      budgetMax: '',
      type: '',
      sortBy: 'newest'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            案件を探す
          </h1>
          <p className="text-gray-600">
            あなたのスキルに合った案件を見つけましょう
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* サイドバー（フィルター） */}
          <div className="lg:w-80">
            <div className="bg-white rounded-lg shadow p-6 sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">絞り込み検索</h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-orange-500 hover:text-orange-600"
                >
                  クリア
                </button>
              </div>

              <div className="space-y-4">
                {/* キーワード検索 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    キーワード
                  </label>
                  <input
                    type="text"
                    name="keyword"
                    value={filters.keyword}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="例：YouTube、CM、ゲーム"
                  />
                </div>

                {/* カテゴリ */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    カテゴリ
                  </label>
                  <select
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">すべて</option>
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                {/* ジャンル */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ジャンル
                  </label>
                  <select
                    name="genre"
                    value={filters.genre}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">すべて</option>
                    {genres.map(genre => (
                      <option key={genre.value} value={genre.value}>{genre.label}</option>
                    ))}
                  </select>
                </div>

                {/* 予算範囲 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    予算範囲
                  </label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="number"
                      name="budgetMin"
                      value={filters.budgetMin}
                      onChange={handleFilterChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="最低"
                    />
                    <span className="text-gray-500">〜</span>
                    <input
                      type="number"
                      name="budgetMax"
                      value={filters.budgetMax}
                      onChange={handleFilterChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="最高"
                    />
                  </div>
                </div>

                {/* 案件タイプ */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    案件タイプ
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="type"
                        value=""
                        checked={filters.type === ''}
                        onChange={handleFilterChange}
                        className="h-4 w-4 text-orange-500 focus:ring-orange-500"
                      />
                      <span className="ml-2 text-sm">すべて</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="type"
                        value="competition"
                        checked={filters.type === 'competition'}
                        onChange={handleFilterChange}
                        className="h-4 w-4 text-orange-500 focus:ring-orange-500"
                      />
                      <span className="ml-2 text-sm">コンペ形式</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="type"
                        value="direct"
                        checked={filters.type === 'direct'}
                        onChange={handleFilterChange}
                        className="h-4 w-4 text-orange-500 focus:ring-orange-500"
                      />
                      <span className="ml-2 text-sm">指名可能</span>
                    </label>
                  </div>
                </div>

                {/* 検索ボタン */}
                <button className="w-full bg-orange-500 text-white py-2 rounded-lg font-medium hover:bg-orange-600 transition">
                  この条件で検索
                </button>
              </div>
            </div>
          </div>

          {/* メインコンテンツ */}
          <div className="flex-1">
            {/* ソートと結果数 */}
            <div className="bg-white rounded-lg shadow p-4 mb-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  <span className="font-semibold">{jobs.length}</span> 件の案件が見つかりました
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600">並び替え:</label>
                  <select
                    name="sortBy"
                    value={filters.sortBy}
                    onChange={handleFilterChange}
                    className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="newest">新着順</option>
                    <option value="deadline">締切が近い順</option>
                    <option value="budget_high">予算が高い順</option>
                    <option value="budget_low">予算が低い順</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 案件リスト */}
            <div className="space-y-4">
              {jobs.map(job => (
                <div key={job.id} className="bg-white rounded-lg shadow hover:shadow-lg transition">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {job.isNew && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                              NEW
                            </span>
                          )}
                          {job.isUrgent && (
                            <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full font-medium">
                              急募
                            </span>
                          )}
                          <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                            job.type === 'competition' 
                              ? 'bg-blue-100 text-blue-700' 
                              : 'bg-purple-100 text-purple-700'
                          }`}>
                            {job.type === 'competition' ? 'コンペ' : '指名可'}
                          </span>
                        </div>
                        <Link 
                          href={`/jobs/${job.id}`}
                          className="text-xl font-bold text-gray-900 hover:text-orange-500 transition"
                        >
                          {job.title}
                        </Link>
                        <div className="text-sm text-gray-600 mt-1">
                          {job.client} • {job.category} • {job.genre}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-orange-600">
                          {job.budget}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          締切: {job.deadline}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4 line-clamp-2">
                      {job.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {job.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-4">
                        {job.type === 'competition' && job.applicants > 0 && (
                          <span className="text-sm text-gray-500">
                            応募者: {job.applicants}名
                          </span>
                        )}
                        <Link
                          href={`/jobs/${job.id}`}
                          className="px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition"
                        >
                          詳細を見る
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ページネーション */}
            <div className="mt-8 flex justify-center">
              <div className="flex items-center gap-2">
                <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50" disabled>
                  前へ
                </button>
                <button className="px-3 py-2 bg-orange-500 text-white rounded-lg">1</button>
                <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
                <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">3</button>
                <span className="px-2">...</span>
                <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">10</button>
                <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  次へ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}