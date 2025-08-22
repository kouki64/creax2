'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [showApplicationModal, setShowApplicationModal] = useState(false)
  
  // 仮のデータ（実際はAPIから取得）
  const [job] = useState({
    id: params.id,
    title: 'YouTubeチャンネルのオープニングテーマ制作',
    client: {
      name: '株式会社クリエイティブ',
      verified: true,
      rating: 4.8,
      completedProjects: 24,
      memberSince: '2023年5月'
    },
    category: 'BGM制作',
    genre: 'ポップス',
    type: 'competition',
    budget: '50,000円〜100,000円',
    deadline: '2024-02-25',
    selectionDeadline: '2024-02-20',
    applicants: 12,
    views: 234,
    description: `
      弊社が運営するYouTubeチャンネル（登録者数10万人）のオープニングテーマを制作していただける方を募集します。
      
      【チャンネル概要】
      - ジャンル：ビジネス・自己啓発系
      - ターゲット：20-40代のビジネスパーソン
      - 投稿頻度：週3回
      
      【楽曲イメージ】
      - 明るく前向きな雰囲気
      - 親しみやすく記憶に残るメロディー
      - モチベーションが上がるような曲調
      
      【詳細要件】
      - 長さ：15-20秒
      - ループ可能な構成
      - 効果音（SE）も含む
      - YouTubeの著作権ポリシーに準拠
    `,
    requirements: [
      '楽曲の長さ: 15-20秒',
      'ファイル形式: WAV（48kHz/24bit）',
      'ループ対応必須',
      '商用利用可能な音源のみ使用',
      '納品後の著作権は弊社に帰属'
    ],
    deliverables: [
      'マスター音源（WAV形式）',
      'ループ用音源',
      'ショートバージョン（5秒）',
      '使用音源リスト'
    ],
    tags: ['YouTube', 'オープニング', '明るい', 'ビジネス'],
    mood: ['明るい', '前向き', 'モチベーション'],
    instruments: ['ピアノ', 'ストリングス', 'ドラム'],
    reference: 'https://youtube.com/sample',
    allowRevisions: true,
    revisionCount: 2,
    requireNDA: false,
    isPublic: true,
    postedAt: '2024-02-10',
    status: 'open'
  })

  const [similarJobs] = useState([
    {
      id: 2,
      title: 'ポッドキャスト用ジングル制作',
      budget: '20,000円〜30,000円',
      deadline: '2024-02-22',
      applicants: 5
    },
    {
      id: 3,
      title: 'TikTok用BGM制作（30秒）',
      budget: '15,000円〜25,000円',
      deadline: '2024-02-28',
      applicants: 8
    }
  ])

  const [applicationForm, setApplicationForm] = useState({
    proposal: '',
    price: '',
    deliveryDays: '',
    portfolio: '',
    message: ''
  })

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: 実際の応募処理
    console.log('応募データ:', applicationForm)
    alert('応募が完了しました！（仮）')
    setShowApplicationModal(false)
    router.push('/creator/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* メインコンテンツ */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              {/* ヘッダー */}
              <div className="p-6 border-b">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-3 py-1 text-sm rounded-full font-medium ${
                        job.type === 'competition' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-purple-100 text-purple-700'
                      }`}>
                        {job.type === 'competition' ? 'コンペ形式' : '指名可能'}
                      </span>
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 text-sm rounded-full">
                        {job.category}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                        {job.genre}
                      </span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                      {job.title}
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>📅 投稿日: {job.postedAt}</span>
                      <span>👁 閲覧数: {job.views}</span>
                      <span>👥 応募者: {job.applicants}名</span>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* 詳細説明 */}
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold mb-4">案件の詳細</h2>
                <div className="prose max-w-none text-gray-700 whitespace-pre-line">
                  {job.description}
                </div>
              </div>

              {/* 要件 */}
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold mb-4">要件・条件</h2>
                <ul className="space-y-2">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 納品物 */}
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold mb-4">納品物</h2>
                <ul className="space-y-2">
                  {job.deliverables.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-orange-500 mr-2">📦</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 楽曲の雰囲気 */}
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold mb-4">楽曲の雰囲気・使用楽器</h2>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">雰囲気:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {job.mood.map(m => (
                        <span key={m} className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">希望楽器:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {job.instruments.map(inst => (
                        <span key={inst} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                          {inst}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* タグ */}
              <div className="p-6">
                <div className="flex flex-wrap gap-2">
                  {job.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* サイドバー */}
          <div className="lg:col-span-1">
            {/* 予算と期限 */}
            <div className="bg-white rounded-lg shadow p-6 mb-6 sticky top-4">
              <div className="mb-6">
                <div className="text-sm text-gray-600 mb-1">予算</div>
                <div className="text-2xl font-bold text-orange-600">
                  {job.budget}
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">応募締切</span>
                  <span className="text-sm font-semibold">{job.selectionDeadline}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">納品希望日</span>
                  <span className="text-sm font-semibold">{job.deadline}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">修正対応</span>
                  <span className="text-sm font-semibold">
                    {job.allowRevisions ? `${job.revisionCount}回まで` : 'なし'}
                  </span>
                </div>
              </div>

              {job.status === 'open' ? (
                <button
                  onClick={() => setShowApplicationModal(true)}
                  className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
                >
                  この案件に応募する
                </button>
              ) : (
                <button
                  disabled
                  className="w-full bg-gray-300 text-gray-500 py-3 rounded-lg font-semibold cursor-not-allowed"
                >
                  募集終了
                </button>
              )}

              <div className="mt-4 text-center">
                <button className="text-sm text-gray-600 hover:text-orange-500">
                  ⚠️ 問題を報告
                </button>
              </div>
            </div>

            {/* クライアント情報 */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h3 className="font-semibold mb-4">クライアント情報</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full mr-3"></div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {job.client.name}
                        {job.client.verified && (
                          <span className="ml-1 text-blue-500">✓</span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500">
                        {job.client.memberSince}から利用
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-3 border-t space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">評価</span>
                    <div className="flex items-center">
                      <span className="text-yellow-500 mr-1">⭐</span>
                      <span className="font-semibold">{job.client.rating}</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">完了案件</span>
                    <span className="font-semibold">{job.client.completedProjects}件</span>
                  </div>
                </div>

                <Link 
                  href={`/clients/${job.client.name}`}
                  className="block w-full mt-4 text-center py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition"
                >
                  クライアント詳細
                </Link>
              </div>
            </div>

            {/* 類似案件 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold mb-4">類似の案件</h3>
              <div className="space-y-3">
                {similarJobs.map(similarJob => (
                  <Link 
                    key={similarJob.id}
                    href={`/jobs/${similarJob.id}`}
                    className="block p-3 border rounded-lg hover:bg-gray-50 transition"
                  >
                    <div className="font-medium text-sm text-gray-900 mb-1 line-clamp-2">
                      {similarJob.title}
                    </div>
                    <div className="text-xs text-orange-600 font-semibold">
                      {similarJob.budget}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      締切: {similarJob.deadline} • 応募: {similarJob.applicants}名
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 応募モーダル */}
      {showApplicationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">案件に応募する</h2>
                <button
                  onClick={() => setShowApplicationModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <form onSubmit={handleApplicationSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    提案内容 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="どのような音楽を制作するか、あなたの強みなどを記入してください"
                    value={applicationForm.proposal}
                    onChange={(e) => setApplicationForm({...applicationForm, proposal: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      提案価格 <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-gray-500">¥</span>
                      <input
                        type="number"
                        required
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        placeholder="50000"
                        value={applicationForm.price}
                        onChange={(e) => setApplicationForm({...applicationForm, price: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      納品可能日数 <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        required
                        className="w-full pr-8 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        placeholder="7"
                        value={applicationForm.deliveryDays}
                        onChange={(e) => setApplicationForm({...applicationForm, deliveryDays: e.target.value})}
                      />
                      <span className="absolute right-3 top-2.5 text-gray-500">日</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    参考作品URL（任意）
                  </label>
                  <input
                    type="url"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="https://soundcloud.com/..."
                    value={applicationForm.portfolio}
                    onChange={(e) => setApplicationForm({...applicationForm, portfolio: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    メッセージ（任意）
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="クライアントへのメッセージがあれば記入してください"
                    value={applicationForm.message}
                    onChange={(e) => setApplicationForm({...applicationForm, message: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowApplicationModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition"
                >
                  応募する
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}