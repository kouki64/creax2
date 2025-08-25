'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ApplicantsManagementPage({ params }: { params: { id: string } }) {
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'shortlisted' | 'rejected'>('all')
  const [sortBy, setSortBy] = useState<'newest' | 'rating' | 'price-low' | 'price-high'>('newest')
  const [selectedApplicants, setSelectedApplicants] = useState<string[]>([])
  const [showCompareModal, setShowCompareModal] = useState(false)
  const [showMessageModal, setShowMessageModal] = useState(false)
  const [selectedApplicant, setSelectedApplicant] = useState<any>(null)

  // 仮のプロジェクトデータ
  const project = {
    id: params.id,
    title: 'YouTubeチャンネルのオープニングテーマ制作',
    budget: 50000,
    deadline: '2024-03-01',
    status: 'recruiting'
  }

  // 応募者データ
  const [applicants, setApplicants] = useState([
    {
      id: 'app-001',
      creatorId: 'creator-001',
      name: '山田太郎',
      avatar: null,
      title: 'プロ作曲家・アレンジャー',
      rating: 4.8,
      reviews: 45,
      completedProjects: 45,
      successRate: 98,
      responseTime: '1時間以内',
      proposedPrice: 45000,
      deliveryDays: 14,
      message: `はじめまして、山田太郎と申します。
      
ご依頼内容を拝見し、ぜひお手伝いさせていただきたくご連絡いたしました。

【アピールポイント】
・YouTube向け楽曲制作の経験が豊富（50件以上）
・明るくキャッチーな楽曲が得意
・納期厳守、修正対応も迅速

参考音源もお送りしますので、ぜひご検討ください。`,
      portfolio: [
        { id: 1, name: 'ポップスサンプル1.mp3', duration: '0:15' },
        { id: 2, name: 'YouTube OP実績.mp3', duration: '0:15' },
        { id: 3, name: '明るい楽曲サンプル.mp3', duration: '0:20' }
      ],
      skills: ['作曲', '編曲', 'ミキシング', 'マスタリング'],
      appliedAt: '2024-02-11 10:30',
      status: 'pending',
      isOnline: true
    },
    {
      id: 'app-002',
      creatorId: 'creator-002',
      name: '佐藤花子',
      avatar: null,
      title: 'フリーランス作曲家',
      rating: 4.9,
      reviews: 67,
      completedProjects: 67,
      successRate: 99,
      responseTime: '30分以内',
      proposedPrice: 50000,
      deliveryDays: 10,
      message: `ご依頼拝見いたしました。
      
まさに私の得意分野です！
Official髭男dismやYOASOBIのような楽曲は多数制作経験があります。

納期も余裕を持って対応可能です。`,
      portfolio: [
        { id: 1, name: 'ポップス制作実績.mp3', duration: '0:15' }
      ],
      skills: ['作曲', '編曲', 'DTM', 'ポップス'],
      appliedAt: '2024-02-11 14:20',
      status: 'shortlisted',
      isOnline: false
    },
    {
      id: 'app-003',
      creatorId: 'creator-003',
      name: '鈴木一郎',
      avatar: null,
      title: 'サウンドクリエーター',
      rating: 4.5,
      reviews: 23,
      completedProjects: 23,
      successRate: 95,
      responseTime: '3時間以内',
      proposedPrice: 35000,
      deliveryDays: 7,
      message: '予算内で高品質な楽曲を制作いたします。',
      portfolio: [],
      skills: ['作曲', 'BGM制作'],
      appliedAt: '2024-02-12 09:15',
      status: 'pending',
      isOnline: true
    },
    {
      id: 'app-004',
      creatorId: 'creator-004',
      name: '田中美咲',
      avatar: null,
      title: '音楽プロデューサー',
      rating: 4.7,
      reviews: 89,
      completedProjects: 89,
      successRate: 97,
      responseTime: '2時間以内',
      proposedPrice: 60000,
      deliveryDays: 21,
      message: 'プロフェッショナルな仕上がりをお約束します。',
      portfolio: [
        { id: 1, name: 'プロ仕様サンプル.mp3', duration: '0:30' }
      ],
      skills: ['作曲', '編曲', 'プロデュース', 'ディレクション'],
      appliedAt: '2024-02-12 15:45',
      status: 'rejected',
      isOnline: false
    }
  ])

  const filteredApplicants = applicants.filter(app => {
    if (filterStatus === 'all') return true
    return app.status === filterStatus
  })

  const sortedApplicants = [...filteredApplicants].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime()
      case 'rating':
        return b.rating - a.rating
      case 'price-low':
        return a.proposedPrice - b.proposedPrice
      case 'price-high':
        return b.proposedPrice - a.proposedPrice
      default:
        return 0
    }
  })

  const handleStatusChange = (applicantId: string, newStatus: string) => {
    setApplicants(prev => prev.map(app => 
      app.id === applicantId ? { ...app, status: newStatus } : app
    ))
  }

  const toggleSelectApplicant = (id: string) => {
    setSelectedApplicants(prev => 
      prev.includes(id) 
        ? prev.filter(appId => appId !== id)
        : [...prev, id]
    )
  }

  const statusCounts = {
    all: applicants.length,
    pending: applicants.filter(a => a.status === 'pending').length,
    shortlisted: applicants.filter(a => a.status === 'shortlisted').length,
    rejected: applicants.filter(a => a.status === 'rejected').length
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* パンくず */}
        <div className="mb-6 text-sm">
          <Link href="/client/dashboard" className="text-gray-600 hover:text-orange-500">
            ダッシュボード
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/client/projects" className="text-gray-600 hover:text-orange-500">
            案件管理
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href={`/client/projects/${project.id}`} className="text-gray-600 hover:text-orange-500">
            {project.title}
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900">応募管理</span>
        </div>

        {/* ヘッダー */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            応募管理
          </h1>
          <p className="text-gray-600">
            {project.title}
          </p>
          <div className="mt-4 flex items-center gap-6 text-sm text-gray-600">
            <span>予算: ¥{project.budget.toLocaleString()}</span>
            <span>納期: {project.deadline}</span>
            <span className="text-orange-600 font-semibold">
              応募者: {applicants.length}名
            </span>
          </div>
        </div>

        {/* フィルターとソート */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* ステータスフィルター */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filterStatus === 'all'
                    ? 'bg-orange-100 text-orange-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                全て ({statusCounts.all})
              </button>
              <button
                onClick={() => setFilterStatus('pending')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filterStatus === 'pending'
                    ? 'bg-orange-100 text-orange-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                未確認 ({statusCounts.pending})
              </button>
              <button
                onClick={() => setFilterStatus('shortlisted')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filterStatus === 'shortlisted'
                    ? 'bg-orange-100 text-orange-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                候補 ({statusCounts.shortlisted})
              </button>
              <button
                onClick={() => setFilterStatus('rejected')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filterStatus === 'rejected'
                    ? 'bg-orange-100 text-orange-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                不採用 ({statusCounts.rejected})
              </button>
            </div>

            {/* ソートと一括アクション */}
            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="newest">新着順</option>
                <option value="rating">評価順</option>
                <option value="price-low">価格が安い順</option>
                <option value="price-high">価格が高い順</option>
              </select>

              {selectedApplicants.length > 0 && (
                <button
                  onClick={() => setShowCompareModal(true)}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm hover:bg-orange-600 transition"
                >
                  比較する ({selectedApplicants.length})
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 応募者リスト */}
        <div className="space-y-4">
          {sortedApplicants.map(applicant => (
            <div key={applicant.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <div className="flex items-start gap-4">
                  {/* チェックボックス */}
                  <div className="pt-1">
                    <input
                      type="checkbox"
                      checked={selectedApplicants.includes(applicant.id)}
                      onChange={() => toggleSelectApplicant(applicant.id)}
                      className="w-4 h-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    />
                  </div>

                  {/* アバター */}
                  <div className="relative">
                    <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                      {applicant.avatar ? (
                        <img src={applicant.avatar} alt="" className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <span className="text-gray-600 font-medium text-xl">{applicant.name[0]}</span>
                      )}
                    </div>
                    {applicant.isOnline && (
                      <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>

                  {/* メイン情報 */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {applicant.name}
                          </h3>
                          {applicant.status === 'shortlisted' && (
                            <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                              候補
                            </span>
                          )}
                          {applicant.status === 'rejected' && (
                            <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full">
                              不採用
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600">{applicant.title}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                          <span className="flex items-center">
                            ⭐ {applicant.rating} ({applicant.reviews}件)
                          </span>
                          <span>完了: {applicant.completedProjects}件</span>
                          <span>成功率: {applicant.successRate}%</span>
                          <span>返信: {applicant.responseTime}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-orange-600">
                          ¥{applicant.proposedPrice.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          納期: {applicant.deliveryDays}日
                        </div>
                      </div>
                    </div>

                    {/* 提案メッセージ */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-3">
                      <p className="text-gray-700 whitespace-pre-line line-clamp-3">
                        {applicant.message}
                      </p>
                      <button className="text-orange-500 text-sm mt-2 hover:text-orange-600">
                        全文を読む
                      </button>
                    </div>

                    {/* スキルタグ */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {applicant.skills.map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* ポートフォリオ */}
                    {applicant.portfolio.length > 0 && (
                      <div className="mb-4">
                        <div className="text-sm font-medium text-gray-700 mb-2">ポートフォリオ</div>
                        <div className="flex flex-wrap gap-2">
                          {applicant.portfolio.map(item => (
                            <button key={item.id} className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                              <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                              </svg>
                              <span className="text-sm">{item.name}</span>
                              <span className="text-xs text-gray-500">{item.duration}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* アクションボタン */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/creators/${applicant.creatorId}`}
                          className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition"
                        >
                          プロフィール
                        </Link>
                        <button
                          onClick={() => {
                            setSelectedApplicant(applicant)
                            setShowMessageModal(true)
                          }}
                          className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition"
                        >
                          メッセージ
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        {applicant.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleStatusChange(applicant.id, 'shortlisted')}
                              className="px-4 py-2 bg-yellow-500 text-white rounded-lg text-sm hover:bg-yellow-600 transition"
                            >
                              候補にする
                            </button>
                            <button
                              onClick={() => handleStatusChange(applicant.id, 'rejected')}
                              className="px-4 py-2 bg-gray-500 text-white rounded-lg text-sm hover:bg-gray-600 transition"
                            >
                              不採用
                            </button>
                          </>
                        )}
                        {applicant.status === 'shortlisted' && (
                          <button className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition">
                            採用する
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 応募日時 */}
              <div className="bg-gray-50 px-6 py-3 text-xs text-gray-500">
                応募日時: {applicant.appliedAt}
              </div>
            </div>
          ))}
        </div>

        {sortedApplicants.length === 0 && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <p className="text-gray-500">
              {filterStatus === 'all' 
                ? 'まだ応募がありません' 
                : 'この条件に該当する応募者はいません'}
            </p>
          </div>
        )}

        {/* 採用プロセスのヒント */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">💡 採用のヒント</h3>
          <ul className="space-y-1 text-sm text-blue-700">
            <li>• 複数の候補者を比較検討することで、最適な人材を見つけやすくなります</li>
            <li>• ポートフォリオや過去の実績を必ず確認しましょう</li>
            <li>• メッセージで詳細な要望を伝え、認識の相違を防ぎましょう</li>
            <li>• 返信の速さやコミュニケーション能力も重要な判断基準です</li>
          </ul>
        </div>
      </div>

      {/* メッセージモーダル */}
      {showMessageModal && selectedApplicant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">メッセージを送る</h2>
              <p className="text-gray-600 text-sm mt-1">
                {selectedApplicant.name}さんへ
              </p>
            </div>
            <div className="p-6">
              <textarea
                rows={6}
                placeholder="質問や追加の要望などを入力してください..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div className="p-6 border-t flex justify-end gap-3">
              <button
                onClick={() => setShowMessageModal(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                キャンセル
              </button>
              <button className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">
                送信
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}