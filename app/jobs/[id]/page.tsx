'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [showApplyModal, setShowApplyModal] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  
  // 仮の案件データ
  const [job] = useState({
    id: params.id,
    title: 'YouTubeチャンネルのオープニングテーマ制作',
    client: {
      name: '株式会社クリエイティブメディア',
      avatar: null,
      verified: true,
      rating: 4.7,
      completedProjects: 23,
      memberSince: '2023年5月'
    },
    type: 'competition',
    category: 'music_production',
    budget: 50000,
    budgetType: 'fixed', // fixed or hourly
    deadline: '2024-03-01',
    postedAt: '2024-02-10',
    description: `
      YouTubeチャンネル用のオープニングテーマを制作していただきたいです。
      
      【詳細】
      - 長さ: 15秒程度
      - ジャンル: ポップス、明るい雰囲気
      - 使用用途: YouTube動画のオープニング
      - 納品形式: WAV形式（48kHz/24bit）
      
      【参考楽曲】
      - Official髭男dism「Pretender」のような爽やかな感じ
      - YOASOBI「夜に駆ける」のようなキャッチーさ
      
      【その他】
      - 著作権は買い取りでお願いします
      - 修正は2回まで対応お願いします
    `,
    requirements: [
      'DAWソフトを使用した制作経験',
      'ポップス楽曲の制作実績',
      'WAV形式での納品が可能',
      '著作権譲渡に同意いただける方'
    ],
    tags: ['ポップス', 'YouTube', 'オープニング', '15秒', '著作権譲渡'],
    applicantCount: 8,
    viewCount: 234,
    status: 'open', // open, closed, in_progress, completed
    
    // 参考ファイル
    attachments: [
      { id: 1, name: '参考音源.mp3', size: '3.2MB', type: 'audio' },
      { id: 2, name: 'チャンネル概要.pdf', size: '1.5MB', type: 'document' }
    ],
    
    // 他の応募者（匿名）
    otherApplicants: [
      { id: 1, appliedAt: '2時間前', rating: 4.8 },
      { id: 2, appliedAt: '5時間前', rating: 4.6 },
      { id: 3, appliedAt: '1日前', rating: 4.9 },
      { id: 4, appliedAt: '1日前', rating: 4.5 },
      { id: 5, appliedAt: '2日前', rating: 4.7 }
    ]
  })

  // 自分の応募状態
  const [myApplication, setMyApplication] = useState<{
    applied: boolean
    status?: 'pending' | 'shortlisted' | 'rejected' | 'selected'
    proposedPrice?: number
    message?: string
  }>({
    applied: false
  })

  const handleApply = (data: { price: number; message: string; portfolio: string[] }) => {
    setMyApplication({
      applied: true,
      status: 'pending',
      proposedPrice: data.price,
      message: data.message
    })
    setShowApplyModal(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* パンくず */}
        <div className="mb-6 text-sm">
          <Link href="/jobs/search" className="text-gray-600 hover:text-orange-500">
            案件を探す
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900">{job.title}</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* メインコンテンツ */}
          <div className="lg:col-span-2 space-y-6">
            {/* ヘッダー */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">募集中</span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {job.type === 'competition' ? 'コンペ形式' : '指名形式'}
                    </span>
                    <span className="text-xs text-gray-500">投稿: {job.postedAt}</span>
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-3">
                    {job.title}
                  </h1>
                  <div className="flex flex-wrap gap-2">
                    {job.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`p-2 rounded-lg transition ${
                    isFavorite ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <svg className="w-5 h-5" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>

              {/* 重要情報 */}
              <div className="grid sm:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="text-xs text-gray-500 mb-1">予算</div>
                  <div className="text-xl font-bold text-gray-900">
                    ¥{job.budget.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">{job.budgetType === 'fixed' ? '固定報酬' : '時給制'}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">納期</div>
                  <div className="text-lg font-semibold text-gray-900">{job.deadline}</div>
                  <div className="text-xs text-gray-500">約3週間</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">応募数</div>
                  <div className="text-lg font-semibold text-gray-900">{job.applicantCount}件</div>
                  <div className="text-xs text-gray-500">閲覧: {job.viewCount}回</div>
                </div>
              </div>
            </div>

            {/* 詳細説明 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">案件の詳細</h2>
              <div className="prose prose-gray max-w-none">
                <p className="whitespace-pre-line text-gray-700">
                  {job.description}
                </p>
              </div>
            </div>

            {/* 必要スキル */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">必要なスキル・条件</h2>
              <ul className="space-y-2">
                {job.requirements.map((req, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 添付ファイル */}
            {job.attachments.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">参考ファイル</h2>
                <div className="space-y-2">
                  {job.attachments.map(file => (
                    <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                          {file.type === 'audio' ? (
                            <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-5L9 2H4z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{file.name}</div>
                          <div className="text-xs text-gray-500">{file.size}</div>
                        </div>
                      </div>
                      <button className="px-3 py-1 text-sm text-orange-600 hover:text-orange-700">
                        プレビュー
                      </button>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  ※ ファイルの閲覧には応募が必要な場合があります
                </p>
              </div>
            )}
          </div>

          {/* サイドバー */}
          <div className="space-y-6">
            {/* クライアント情報 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">クライアント情報</h2>
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                  {job.client.avatar ? (
                    <img src={job.client.avatar} alt="" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <span className="text-gray-600 font-medium">{job.client.name[0]}</span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <h3 className="font-semibold text-gray-900">{job.client.name}</h3>
                    {job.client.verified && (
                      <svg className="w-4 h-4 text-blue-500 ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <span className="flex items-center">
                      ⭐ {job.client.rating}
                    </span>
                    <span className="mx-2">•</span>
                    <span>{job.client.completedProjects}件完了</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>メンバー登録</span>
                  <span className="text-gray-900">{job.client.memberSince}</span>
                </div>
                <div className="flex justify-between">
                  <span>レスポンス率</span>
                  <span className="text-gray-900">98%</span>
                </div>
                <div className="flex justify-between">
                  <span>平均返信時間</span>
                  <span className="text-gray-900">2時間以内</span>
                </div>
              </div>
            </div>

            {/* 応募状況 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">応募状況</h2>
              {myApplication.applied ? (
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center text-green-700">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      応募済み
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">提案額</span>
                      <span className="font-semibold">¥{myApplication.proposedPrice?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">ステータス</span>
                      <span className="font-semibold">
                        {myApplication.status === 'pending' && '審査中'}
                        {myApplication.status === 'shortlisted' && '候補選出'}
                        {myApplication.status === 'rejected' && '不採用'}
                        {myApplication.status === 'selected' && '採用'}
                      </span>
                    </div>
                  </div>
                  <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                    応募を取り下げる
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={() => setShowApplyModal(true)}
                    className="w-full px-4 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition"
                  >
                    この案件に応募する
                  </button>
                  <p className="text-xs text-gray-500 text-center">
                    応募期限まであと5日
                  </p>
                </div>
              )}
            </div>

            {/* 他の応募者 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">他の応募者</h2>
              <div className="space-y-2">
                {job.otherApplicants.map(applicant => (
                  <div key={applicant.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-200 rounded-full mr-2"></div>
                      <div>
                        <div className="text-gray-600">匿名クリエーター</div>
                        <div className="text-xs text-gray-400">{applicant.appliedAt}</div>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-600">
                      ⭐ {applicant.rating}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-3">
                他に{job.applicantCount - job.otherApplicants.length}名が応募
              </p>
            </div>

            {/* 類似案件 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">類似の案件</h2>
              <div className="space-y-3">
                <Link href="/jobs/job-002" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div className="font-medium text-gray-900 text-sm">ゲームBGM制作</div>
                  <div className="text-xs text-gray-600 mt-1">予算: ¥80,000</div>
                </Link>
                <Link href="/jobs/job-003" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div className="font-medium text-gray-900 text-sm">CM音楽制作</div>
                  <div className="text-xs text-gray-600 mt-1">予算: ¥120,000</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 応募モーダル */}
      {showApplyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">案件に応募する</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    提案額 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    defaultValue={job.budget}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    クライアント予算: ¥{job.budget.toLocaleString()}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    提案メッセージ <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={6}
                    placeholder="なぜあなたが最適な人材なのか、どのように案件を進めるかを説明してください"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ポートフォリオ
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input type="checkbox" className="mr-3" />
                      <div className="flex-1">
                        <div className="font-medium">ポップス楽曲サンプル.mp3</div>
                        <div className="text-xs text-gray-500">3.2MB</div>
                      </div>
                    </label>
                    <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input type="checkbox" className="mr-3" />
                      <div className="flex-1">
                        <div className="font-medium">YouTube OP制作実績.mp3</div>
                        <div className="text-xs text-gray-500">2.8MB</div>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    納期の確認
                  </label>
                  <div className="p-3 bg-yellow-50 rounded-lg text-sm text-yellow-800">
                    納期: {job.deadline}までに納品可能ですか？
                  </div>
                  <label className="flex items-center mt-2">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">指定納期までに納品可能です</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="p-6 border-t flex justify-end gap-3">
              <button
                onClick={() => setShowApplyModal(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                キャンセル
              </button>
              <button
                onClick={() => handleApply({
                  price: job.budget,
                  message: '提案メッセージ',
                  portfolio: []
                })}
                className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
              >
                応募する
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}