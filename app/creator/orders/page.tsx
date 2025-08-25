'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function CreatorOrdersPage() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'completed' | 'cancelled'>('all')
  
  const [orders] = useState([
    {
      id: 'ORD-2024-001',
      projectId: 'PRJ-001',
      title: 'YouTubeチャンネルのオープニングテーマ制作',
      client: {
        name: '株式会社クリエイティブ',
        verified: true
      },
      status: 'in_progress',
      stage: 'production', // negotiation, production, revision, delivery, completed
      price: 50000,
      deadline: '2024-02-25',
      createdAt: '2024-02-10',
      progress: 60,
      messages: 3,
      files: 2,
      revisions: {
        included: 2,
        used: 0
      },
      milestones: [
        { name: '契約締結', completed: true, date: '2024-02-10' },
        { name: 'デモ制作', completed: true, date: '2024-02-15' },
        { name: '本制作', completed: false, date: '2024-02-20' },
        { name: '納品', completed: false, date: '2024-02-25' }
      ]
    },
    {
      id: 'ORD-2024-002',
      projectId: 'PRJ-002',
      title: 'CM音楽のミキシング',
      client: {
        name: '田中プロダクション',
        verified: false
      },
      status: 'review',
      stage: 'revision',
      price: 30000,
      deadline: '2024-02-15',
      createdAt: '2024-02-05',
      progress: 90,
      messages: 8,
      files: 4,
      revisions: {
        included: 2,
        used: 1
      },
      milestones: [
        { name: '契約締結', completed: true, date: '2024-02-05' },
        { name: '初稿提出', completed: true, date: '2024-02-10' },
        { name: '修正対応', completed: false, date: '2024-02-13' },
        { name: '納品', completed: false, date: '2024-02-15' }
      ]
    },
    {
      id: 'ORD-2024-003',
      projectId: 'PRJ-003',
      title: 'ゲームBGM制作（5曲）',
      client: {
        name: 'ゲームスタジオXYZ',
        verified: true
      },
      status: 'completed',
      stage: 'completed',
      price: 150000,
      deadline: '2024-02-01',
      createdAt: '2024-01-15',
      completedAt: '2024-01-30',
      progress: 100,
      messages: 25,
      files: 12,
      revisions: {
        included: 3,
        used: 2
      },
      rating: 5,
      review: '素晴らしいクオリティでした！'
    }
  ])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'negotiation':
        return <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">交渉中</span>
      case 'in_progress':
        return <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">作業中</span>
      case 'review':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">確認待ち</span>
      case 'completed':
        return <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">完了</span>
      case 'cancelled':
        return <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">キャンセル</span>
      default:
        return null
    }
  }

  const getStageName = (stage: string) => {
    switch (stage) {
      case 'negotiation': return '交渉中'
      case 'production': return '制作中'
      case 'revision': return '修正中'
      case 'delivery': return '納品待ち'
      case 'completed': return '完了'
      default: return stage
    }
  }

  const filteredOrders = orders.filter(order => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'active') return ['in_progress', 'review'].includes(order.status)
    if (activeFilter === 'completed') return order.status === 'completed'
    if (activeFilter === 'cancelled') return order.status === 'cancelled'
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            受注管理
          </h1>
          <p className="text-gray-600">
            進行中の案件と納品状況を管理
          </p>
        </div>

        {/* サマリーカード */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-500 text-sm">進行中</span>
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-2xl font-bold text-gray-900">2</div>
            <div className="text-xs text-gray-500 mt-1">案件</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-500 text-sm">今月の納品</span>
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div className="text-2xl font-bold text-gray-900">5</div>
            <div className="text-xs text-gray-500 mt-1">件</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-500 text-sm">未読メッセージ</span>
              <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="text-2xl font-bold text-gray-900">3</div>
            <div className="text-xs text-gray-500 mt-1">件</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-500 text-sm">今月の収益</span>
              <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-2xl font-bold text-gray-900">¥230K</div>
            <div className="text-xs text-gray-500 mt-1">確定</div>
          </div>
        </div>

        {/* フィルター */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                activeFilter === 'all'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              すべて ({orders.length})
            </button>
            <button
              onClick={() => setActiveFilter('active')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                activeFilter === 'active'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              進行中 (2)
            </button>
            <button
              onClick={() => setActiveFilter('completed')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                activeFilter === 'completed'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              完了 (1)
            </button>
            <button
              onClick={() => setActiveFilter('cancelled')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                activeFilter === 'cancelled'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              キャンセル (0)
            </button>
          </div>
        </div>

        {/* 受注リスト */}
        <div className="space-y-4">
          {filteredOrders.map(order => (
            <div key={order.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getStatusBadge(order.status)}
                      <span className="text-xs text-gray-500">
                        受注番号: {order.id}
                      </span>
                    </div>
                    <Link 
                      href={`/creator/orders/${order.id}`}
                      className="text-xl font-bold text-gray-900 hover:text-orange-500 transition"
                    >
                      {order.title}
                    </Link>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      <span className="flex items-center">
                        <span className="mr-1">👤</span>
                        {order.client.name}
                        {order.client.verified && (
                          <span className="ml-1 text-blue-500">✓</span>
                        )}
                      </span>
                      <span>💰 ¥{order.price.toLocaleString()}</span>
                      <span>📅 納期: {order.deadline}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600 mb-1">
                      ステージ: {getStageName(order.stage)}
                    </div>
                    {order.messages > 0 && (
                      <div className="inline-flex items-center gap-2">
                        <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                          💬 {order.messages}件
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* 進捗バー */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">進捗</span>
                    <span className="font-semibold">{order.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full transition-all"
                      style={{ width: `${order.progress}%` }}
                    />
                  </div>
                </div>

                {/* マイルストーン */}
                {order.milestones && (
                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-700 mb-2">マイルストーン</div>
                    <div className="flex items-center justify-between">
                      {order.milestones.map((milestone, index) => (
                        <div key={index} className="flex items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            milestone.completed 
                              ? 'bg-green-500 text-white' 
                              : 'bg-gray-300 text-gray-600'
                          }`}>
                            {milestone.completed ? (
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <span className="text-xs font-bold">{index + 1}</span>
                            )}
                          </div>
                          <div className="ml-2">
                            <div className={`text-xs ${milestone.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                              {milestone.name}
                            </div>
                            <div className="text-xs text-gray-400">{milestone.date}</div>
                          </div>
                          {index < order.milestones.length - 1 && (
                            <div className={`flex-1 h-0.5 mx-2 ${
                              milestone.completed ? 'bg-green-500' : 'bg-gray-300'
                            }`} />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* アクションボタン */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    {order.revisions && (
                      <span>
                        修正: {order.revisions.used}/{order.revisions.included}回
                      </span>
                    )}
                    {order.files > 0 && (
                      <span>📎 {order.files}ファイル</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {order.status === 'in_progress' && (
                      <Link
                        href={`/creator/orders/${order.id}/deliver`}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition"
                      >
                        納品する
                      </Link>
                    )}
                    <Link
                      href={`/messages/${order.projectId}`}
                      className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
                    >
                      メッセージ
                    </Link>
                    <Link
                      href={`/creator/orders/${order.id}`}
                      className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition"
                    >
                      詳細を見る
                    </Link>
                  </div>
                </div>

                {/* 完了済みの場合は評価を表示 */}
                {order.status === 'completed' && order.rating && (
                  <div className="mt-4 pt-4 border-t bg-gray-50 -mx-6 -mb-6 px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className={`w-4 h-4 ${i < order.rating ? 'text-yellow-500' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 2l2.09 4.26L17 7.27l-3.5 3.41.83 4.82L10 13.4l-4.33 2.1.83-4.82L3 7.27l4.91-1.01L10 2z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">{order.review}</span>
                      </div>
                      <span className="text-xs text-gray-500">
                        完了日: {order.completedAt}
                      </span>
                    </div>
                  </div>
                )}
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
            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              次へ
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}