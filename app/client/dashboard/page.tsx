'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function ClientDashboardPage() {
  // 仮のデータ（実際はAPIから取得）
  const [stats] = useState({
    activeProjects: 3,
    completedProjects: 12,
    totalSpent: 580000,
    savedCreators: 8
  })

  const [activeProjects] = useState([
    {
      id: 1,
      title: 'CM用BGM制作',
      type: 'competition',
      status: 'recruiting',
      applicants: 5,
      deadline: '2024-02-15',
      budget: '50,000円〜100,000円'
    },
    {
      id: 2,
      title: 'YouTubeチャンネルのテーマソング',
      type: 'direct',
      status: 'in_progress',
      creator: '山田太郎',
      deadline: '2024-02-20',
      budget: '30,000円'
    },
    {
      id: 3,
      title: '店舗BGM（ループ音源）',
      type: 'competition',
      status: 'recruiting',
      applicants: 3,
      deadline: '2024-02-10',
      budget: '20,000円〜40,000円'
    }
  ])

  const [recentMessages] = useState([
    {
      id: 1,
      from: '田中花子',
      project: 'CM用BGM制作',
      message: 'デモ音源を提出しました。ご確認ください。',
      time: '30分前',
      unread: true
    },
    {
      id: 2,
      from: '鈴木一郎',
      project: 'YouTubeチャンネルのテーマソング',
      message: '修正版をアップロードしました。',
      time: '2時間前',
      unread: true
    },
    {
      id: 3,
      from: '佐藤美咲',
      project: '店舗BGM',
      message: 'ご要望について質問があります。',
      time: '昨日',
      unread: false
    }
  ])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'recruiting':
        return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">募集中</span>
      case 'in_progress':
        return <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">進行中</span>
      case 'completed':
        return <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">完了</span>
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
            ダッシュボード
          </h1>
          <p className="text-gray-600">
            プロジェクトの管理と進捗確認
          </p>
        </div>

        {/* 統計カード */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-500 text-sm">進行中の案件</span>
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.activeProjects}</div>
            <Link href="/client/projects" className="text-sm text-orange-500 hover:text-orange-600 mt-2 inline-block">
              詳細を見る →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-500 text-sm">完了した案件</span>
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.completedProjects}</div>
            <Link href="/client/projects?status=completed" className="text-sm text-orange-500 hover:text-orange-600 mt-2 inline-block">
              履歴を見る →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-500 text-sm">総支払額</span>
              <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-2xl font-bold text-gray-900">¥{stats.totalSpent.toLocaleString()}</div>
            <Link href="/payment/history" className="text-sm text-orange-500 hover:text-orange-600 mt-2 inline-block">
              明細を見る →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-500 text-sm">保存したクリエーター</span>
              <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.savedCreators}</div>
            <Link href="/creators/saved" className="text-sm text-orange-500 hover:text-orange-600 mt-2 inline-block">
              一覧を見る →
            </Link>
          </div>
        </div>

        {/* クイックアクション */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg shadow-lg p-6 mb-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">新しいプロジェクトを始めましょう</h2>
              <p className="text-orange-100">プロのクリエーターがあなたの音楽制作をサポートします</p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/client/projects/new/competition"
                className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition"
              >
                コンペで募集
              </Link>
              <Link
                href="/client/projects/new/direct"
                className="bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-800 transition"
              >
                クリエーターを指名
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 進行中のプロジェクト */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">進行中のプロジェクト</h2>
                  <Link href="/client/projects" className="text-orange-500 hover:text-orange-600 text-sm">
                    すべて見る →
                  </Link>
                </div>
              </div>
              <div className="divide-y">
                {activeProjects.map(project => (
                  <div key={project.id} className="p-6 hover:bg-gray-50 transition">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <Link href={`/client/projects/${project.id}`} className="text-lg font-semibold text-gray-900 hover:text-orange-500">
                          {project.title}
                        </Link>
                        <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                          <span>{project.type === 'competition' ? 'コンペ形式' : '指名形式'}</span>
                          <span>•</span>
                          <span>締切: {project.deadline}</span>
                        </div>
                      </div>
                      {getStatusBadge(project.status)}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        予算: {project.budget}
                      </div>
                      {project.type === 'competition' ? (
                        <div className="text-sm text-gray-600">
                          応募者: <span className="font-semibold">{project.applicants}名</span>
                        </div>
                      ) : (
                        <div className="text-sm text-gray-600">
                          担当: <span className="font-semibold">{project.creator}</span>
                        </div>
                      )}
                    </div>
                    <div className="mt-3">
                      <Link
                        href={`/client/projects/${project.id}`}
                        className="text-orange-500 hover:text-orange-600 text-sm font-medium"
                      >
                        詳細を確認 →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 最近のメッセージ */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">メッセージ</h2>
                  <Link href="/messages" className="text-orange-500 hover:text-orange-600 text-sm">
                    すべて見る →
                  </Link>
                </div>
              </div>
              <div className="divide-y">
                {recentMessages.map(message => (
                  <Link
                    key={message.id}
                    href={`/messages/${message.id}`}
                    className="block p-4 hover:bg-gray-50 transition"
                  >
                    <div className="flex items-start">
                      {message.unread && (
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3"></div>
                      )}
                      <div className={`flex-1 ${!message.unread ? 'ml-5' : ''}`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-gray-900">{message.from}</span>
                          <span className="text-xs text-gray-500">{message.time}</span>
                        </div>
                        <div className="text-xs text-gray-500 mb-1">{message.project}</div>
                        <div className="text-sm text-gray-600 line-clamp-2">{message.message}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* おすすめクリエーター */}
            <div className="bg-white rounded-lg shadow mt-6">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold">おすすめクリエーター</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <Link key={i} href={`/creators/${i}`} className="flex items-center hover:bg-gray-50 p-2 rounded transition">
                      <div className="w-12 h-12 bg-gray-200 rounded-full mr-3"></div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">クリエーター{i}</div>
                        <div className="text-xs text-gray-500">アレンジャー • 評価 4.8</div>
                      </div>
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}