'use client'

import { useState } from 'react'

export default function AdvancedSearch() {
  const [searchParams, setSearchParams] = useState({
    keyword: '',
    category: 'all',
    priceMin: '',
    priceMax: '',
    deadline: '',
    skills: [] as string[],
    sortBy: 'newest'
  })

  const categories = [
    { value: 'all', label: 'すべて' },
    { value: 'composition', label: '作曲' },
    { value: 'arrangement', label: '編曲' },
    { value: 'mixing', label: 'ミキシング' },
    { value: 'mastering', label: 'マスタリング' },
    { value: 'recording', label: 'レコーディング' }
  ]

  const skillOptions = [
    'Cubase', 'Logic Pro', 'Pro Tools', 'Ableton Live', 'FL Studio',
    'ポップス', 'ロック', 'ジャズ', 'クラシック', 'EDM', 
    'ボーカル編集', 'オーケストラアレンジ', 'バンドアレンジ'
  ]

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="space-y-4">
        {/* キーワード検索 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            キーワード
          </label>
          <input
            type="text"
            value={searchParams.keyword}
            onChange={(e) => setSearchParams({...searchParams, keyword: e.target.value})}
            placeholder="例: YouTube オープニング"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6232] focus:border-[#ff6232]"
          />
        </div>

        {/* カテゴリー */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            カテゴリー
          </label>
          <select
            value={searchParams.category}
            onChange={(e) => setSearchParams({...searchParams, category: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6232] focus:border-[#ff6232]"
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>

        {/* 予算範囲 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            予算
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={searchParams.priceMin}
              onChange={(e) => setSearchParams({...searchParams, priceMin: e.target.value})}
              placeholder="最小"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
            />
            <span>〜</span>
            <input
              type="number"
              value={searchParams.priceMax}
              onChange={(e) => setSearchParams({...searchParams, priceMax: e.target.value})}
              placeholder="最大"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
            />
            <span>円</span>
          </div>
        </div>

        {/* スキルタグ */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            必要スキル
          </label>
          <div className="flex flex-wrap gap-2">
            {skillOptions.map(skill => (
              <label key={skill} className="flex items-center">
                <input
                  type="checkbox"
                  checked={searchParams.skills.includes(skill)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSearchParams({
                        ...searchParams,
                        skills: [...searchParams.skills, skill]
                      })
                    } else {
                      setSearchParams({
                        ...searchParams,
                        skills: searchParams.skills.filter(s => s !== skill)
                      })
                    }
                  }}
                  className="sr-only"
                />
                <span className={`px-3 py-1 rounded-full text-sm cursor-pointer transition ${
                  searchParams.skills.includes(skill)
                    ? 'bg-[#ff6232] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}>
                  {skill}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* 検索ボタン */}
        <div className="flex gap-3">
          <button className="flex-1 px-4 py-2 bg-[#ff6232] text-white rounded-lg hover:bg-[#e5562c] transition">
            この条件で検索
          </button>
          <button 
            onClick={() => setSearchParams({
              keyword: '',
              category: 'all',
              priceMin: '',
              priceMax: '',
              deadline: '',
              skills: [],
              sortBy: 'newest'
            })}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            リセット
          </button>
        </div>
      </div>
    </div>
  )
}