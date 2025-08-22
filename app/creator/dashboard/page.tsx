'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function CreatorDashboardPage() {
  // 仮のデータ（実際はAPIから取得）
  const [stats] = useState({
    activeOrders: 2,
    completedOrders: 45,
    totalEarnings: 1250000,
    rating: 4.8,
    responseRate: 95
  })

  const [activeOrders] = useState([
    {
      id: 1,
      title: 'ポップスのアレンジ依頼',
      client: '株式会社ABC',
      status: 'in_progress',
      deadline: '2024-02-18',
      price: '50,000円',
      progress: 60
    },
    {
      id: 2,
      title: 'CM音楽のミキシング',
      client: '田中プロダクション',
      status: 'review',
      deadline: '2024-02-15',
      price: '30,000円',
      progress: 90
    }
  ])

  const [availableJobs] = useState([
    {
      id: 1,
      title: 'ゲームBGM制作（ループ音源5曲）',
      client: 'ゲーム開発会社XYZ',
      budget: '100,000円〜150,000円',
      deadline: '2024-03-01',
      type: 'コンペ',
      genre: 'ゲーム音楽',
      applicants: 8
    },
    {
      id: 2,
      title: 'YouTubeチャンネル用ジングル',
      client: '個人クリエーター',
      budget: '20,000円〜30,000円',
      deadline: '2024-02-25',
      type: 'コンペ',
      genre: 'ポップス',
      applicants: 3
    },
    {
      id: 3,
      title: 'バンドアレンジ（ロック）',
      client: 'インディーズアーティスト',
      budget: '40,000円',
      deadline: '2024-02-20',
      type: '指名可能',
      genre: 'ロック',
      applicants: 0
    }
  ])

  const [earnings] = useState({
    thisMonth: 180000,
    lastMonth: 220000,
    pending: 80000
  })

  const [recentReviews] = useState([
    {
      id: 1,
      client: '山田商事',
      rating: 5,
      comment: '期待以上のクオリティでした。また依頼したいです。',
      date: '2024-01-28'
    },
    {
      id: 2,
      client: '鈴木プロダクション',
      rating: 5,
      comment: '迅速な対応と素晴らしいアレンジに感謝です。',
      date: '2024-01-25'
    }
  ])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in_progress':
        return <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">作業中</span>
      case 'review':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">確認待ち</span>
      case 'completed':
        return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">完了</span>
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            クリエーターダッシュボード
          </h1>
          <p className="text-gray-600">
            受注管理と収益の確認
          </p>
        </div>

        {/* 統計カード */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-500 text-sm">進行中</span>
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.activeOrders}</div>
            <div className="text-xs text-gray-500 mt-1">案件</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-500 text-sm">完了済み</span>
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.completedOrders}</div>
            <div className="text-xs text-gray-500 mt-1">案件</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-500 text-sm">総収益</span>
              <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-2xl font-bold text-gray-900">¥{stats.totalEarnings.toLocaleString()}</div>
            <div className="text-xs text-gray-500 mt-1">累計</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-500 text-sm">評価</span>
              <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.rating}</div>
            <div className="text-xs text-gray-500 mt-1">/ 5.0</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-500 text-sm">返答率</span>
              <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.responseRate}%</div>
            <div className="text-xs text-gray-500 mt-1">24時間以内</div>
          </div>
        </div>

        {/* 収益サマリー */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg shadow-lg p-6 mb-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <div className="text-orange-200 text-sm mb-1">今月の収益</div>
              <div className="text-3xl font-bold">¥{earnings.thisMonth.toLocaleString()}</div>
              <div className="text-orange-200 text-xs mt-1">
                {earnings.thisMonth > earnings.lastMonth ? '↑' : '↓'} 
                前月比 {Math.abs(((earnings.thisMonth - earnings.lastMonth) / earnings.lastMonth * 100)).toFixed(0)}%
              </div>
            </div>
            <div>
              <div className="text-orange-200 text-sm mb-1">先月の収益</div>
              <div className="text-2xl font-bold">¥{earnings.lastMonth.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-orange-200 text-sm mb-1">未確定収益</div>
              <div className="text-2xl font-bold">¥{earnings.pending.toLocaleString()}</div>
            </div>
            <div className="flex items-center">
              <Link
                href="/creator/withdraw"
                className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition w-full text-center"
              >
                出金申請
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 進行中の案件 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow mb-6">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">進行中の案件</h2>
                  <Link href="/creator/orders" className="text-orange-500 hover:text-orange-600 text-sm">
                    すべて見る →
                  </Link>
                </div>
              </div>
              <div className="divide-y">
                {activeOrders.map(order => (
                  <div key={order.id} className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <Link href={`/creator/orders/${order.id}`} className="text-lg font-semibold text-gray-900 hover:text-orange-500">
                          {order.title}
                        </Link>
                        <div className="text-sm text-gray-500 mt-1">
                          クライアント: {order.client}
                        </div>
                      </div>
                      {getStatusBadge(order.status)}
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-sm text-gray-600">
                        報酬: <span className="font-semibold">{order.price}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        締切: <span className="font-semibold">{order.deadline}</span>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">進捗</span>
                        <span className="font-semibold">{order.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-orange-500 h-2 rounded-full transition-all"
                          style={{ width: `${order.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Link
                        href={`/creator/orders/${order.id}`}
                        className="text-orange-500 hover:text-orange-600 text-sm font-medium"
                      >
                        詳細を確認 →
                      </Link>
                      {order.status === 'in_progress' && (
                        <Link
                          href={`/creator/orders/${order.id}/deliver`}
                          className="text-blue-500 hover:text-blue-600 text-sm font-medium"
                        >
                          納品する →
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 募集中の案件 */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">新着案件</h2>
                  <Link href="/jobs/search" className="text-orange-500 hover:text-orange-600 text-sm">
                    もっと見る →
                  </Link>
                </div>
              </div>
              <div className="divide-y">
                {availableJobs.map(job => (
                  <div key={job.id} className="p-6 hover:bg-gray-50 transition">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <Link href={`/jobs/${job.id}`} className="font-semibold text-gray-900 hover:text-orange-500">
                          {job.title}
                        </Link>
                        <div className="text-sm text-gray-500 mt-1">
                          {job.client}
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs">
                        {job.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span>💰 {job.budget}</span>
                      <span>📅 {job.deadline}まで</span>
                      <span>🎵 {job.genre}</span>
                    </div>
                    {job.applicants > 0 && (
                      <div className="text-sm text-gray-500 mb-3">
                        現在の応募者: {job.applicants}名
                      </div>
                    )}
                    <Link
                      href={`/jobs/${job.id}`}
                      className="inline-block bg-orange-500 text-white px-4 py-2 rounded text-sm font-medium hover:bg-orange-600 transition"
                    >
                      詳細を見る
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* サイドバー */}
          <div className="lg:col-span-1">
            {/* プロフィール完成度 */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h3 className="font-semibold mb-4">プロフィール完成度</h3>
              <div className="mb-3">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">完成度</span>
                  <span className="font-semibold">75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-green-600">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  基本情報
                </div>
                <div className="flex items-center text-green-600">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  ポートフォリオ
                </div>
                <div className="flex items-center text-gray-400">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  実績を3件以上追加
                </div>
              </div>
              <Link
                href="/creator/profile/edit"
                className="block w-full mt-4 bg-orange-500 text-white text-center py-2 rounded font-medium hover:bg-orange-600 transition"
              >
                プロフィールを編集
              </Link>
            </div>

            {/* 最近のレビュー */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">最近のレビュー</h3>
                <Link href="/reviews/me" className="text-orange-500 hover:text-orange-600 text-sm">
                  すべて →
                </Link>
              </div>
              <div className="space-y-4">
                {recentReviews.map(review => (
                  <div key={review.id} className="border-b pb-3 last:border-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">{review.client}</span>
                      <div className="flex text-yellow-500 text-xs">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'fill-gray-300'}`} viewBox="0 0 20 20">
                            <path d="M10 2l2.09 4.26L17 7.27l-3.5 3.41.83 4.82L10 13.4l-4.33 2.1.83-4.82L3 7.27l4.91-1.01L10 2z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{review.comment}</p>
                    <div className="text-xs text-gray-400 mt-1">{review.date}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}