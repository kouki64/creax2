'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function AdminDashboard() {
  // 統計データ（本来はAPIから取得）
  const [stats] = useState({
    totalUsers: 1234,
    newUsersToday: 45,
    activeProjects: 89,
    completedToday: 12,
    totalRevenue: 1250000,
    revenueToday: 85000,
    pendingWithdrawals: 23,
    reportedContent: 5
  })

  const [recentActivities] = useState([
    { id: 1, type: 'user_register', message: '新規クリエーター登録: 山田太郎', time: '5分前' },
    { id: 2, type: 'project_complete', message: '案件完了: YouTube OP制作', time: '15分前' },
    { id: 3, type: 'payment', message: '決済完了: ¥50,000', time: '30分前' },
    { id: 4, type: 'report', message: '通報: 不適切な案件内容', time: '1時間前' },
    { id: 5, type: 'withdrawal', message: '出金申請: ¥120,000', time: '2時間前' }
  ])

  const menuItems = [
    { title: 'ユーザー管理', icon: '👥', href: '/admin/users', color: 'bg-blue-500' },
    { title: '案件管理', icon: '📋', href: '/admin/projects', color: 'bg-green-500' },
    { title: '決済管理', icon: '💳', href: '/admin/payments', color: 'bg-purple-500' },
    { title: '通報管理', icon: '🚨', href: '/admin/reports', color: 'bg-red-500' },
    { title: 'お知らせ管理', icon: '📢', href: '/admin/announcements', color: 'bg-yellow-500' },
    { title: 'システム設定', icon: '⚙️', href: '/admin/settings', color: 'bg-gray-500' }
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Creax 管理画面</h1>
              <span className="ml-3 px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full">
                Admin
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                サイトを表示
              </Link>
              <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900">
                ログアウト
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* 統計カード */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">総ユーザー数</h3>
              <span className="text-2xl">👥</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</div>
            <div className="text-sm text-green-600 mt-1">
              +{stats.newUsersToday} 今日
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">アクティブ案件</h3>
              <span className="text-2xl">📋</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.activeProjects}</div>
            <div className="text-sm text-blue-600 mt-1">
              {stats.completedToday} 件完了
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">総収益</h3>
              <span className="text-2xl">💰</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              ¥{stats.totalRevenue.toLocaleString()}
            </div>
            <div className="text-sm text-green-600 mt-1">
              +¥{stats.revenueToday.toLocaleString()} 今日
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">要対応</h3>
              <span className="text-2xl">🚨</span>
            </div>
            <div className="flex items-center gap-4">
              <div>
                <div className="text-lg font-bold text-orange-600">{stats.pendingWithdrawals}</div>
                <div className="text-xs text-gray-500">出金承認待ち</div>
              </div>
              <div>
                <div className="text-lg font-bold text-red-600">{stats.reportedContent}</div>
                <div className="text-xs text-gray-500">通報</div>
              </div>
            </div>
          </div>

          {/* 🆕 SNS機能統計 */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">今週のMVP</p>
                  <p className="text-2xl font-bold text-gray-900">6名</p>
                  <p className="text-xs text-gray-500">選出済み</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">メンター/弟子</p>
                  <p className="text-2xl font-bold text-gray-900">24/156</p>
                  <p className="text-xs text-gray-500">組</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">制作後記</p>
                  <p className="text-2xl font-bold text-gray-900">156</p>
                  <p className="text-xs text-gray-500">投稿</p>
                </div>
              </div>
            </div>
          </div>

          <Link
            href="/admin/sns-management"
            className="p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition"
          >
            <svg className="w-8 h-8 text-yellow-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <p className="font-medium">SNS管理</p>
            <p className="text-sm text-gray-600">MVP・メンター・後記</p>
          </Link>          
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* 管理メニュー */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">管理メニュー</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {menuItems.map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition text-center"
                  >
                    <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center mx-auto mb-2 text-white text-xl`}>
                      {item.icon}
                    </div>
                    <div className="font-medium text-gray-900">{item.title}</div>
                  </Link>
                ))}
              </div>
            </div>

            {/* 売上グラフ */}
            <div className="bg-white rounded-lg shadow p-6 mt-6">
              <h2 className="text-lg font-semibold mb-4">売上推移（過去7日間）</h2>
              <div className="h-64 flex items-end justify-around">
                {[65, 80, 45, 90, 120, 85, 95].map((height, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className="w-12 bg-gradient-to-t from-[#ff6232] to-[#ff8a5c] rounded-t"
                      style={{ height: `${height * 2}px` }}
                    />
                    <span className="text-xs text-gray-500 mt-2">
                      {['月', '火', '水', '木', '金', '土', '日'][index]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 最近のアクティビティ */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">最近のアクティビティ</h2>
              <div className="space-y-3">
                {recentActivities.map(activity => (
                  <div key={activity.id} className="flex items-start gap-3 pb-3 border-b last:border-0">
                    <div className={`w-2 h-2 rounded-full mt-1.5 ${
                      activity.type === 'report' ? 'bg-red-500' :
                      activity.type === 'payment' ? 'bg-green-500' :
                      'bg-blue-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/admin/activities" className="block text-center text-sm text-[#ff6232] hover:text-[#e5562c] mt-4">
                すべて表示 →
              </Link>
            </div>

            {/* クイックアクション */}
            <div className="bg-white rounded-lg shadow p-6 mt-6">
              <h2 className="text-lg font-semibold mb-4">クイックアクション</h2>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 bg-[#ff6232] text-white rounded-lg hover:bg-[#e5562c] transition">
                  お知らせを投稿
                </button>
                <button className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition">
                  メンテナンスモード
                </button>
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  データエクスポート
                </button>
              </div>
            </div>

            {/* システム状態 */}
            <div className="bg-white rounded-lg shadow p-6 mt-6">
              <h2 className="text-lg font-semibold mb-4">システム状態</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">API</span>
                  <span className="flex items-center text-green-600 text-sm">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                    正常
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">データベース</span>
                  <span className="flex items-center text-green-600 text-sm">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                    正常
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">ストレージ</span>
                  <span className="text-sm text-gray-900">45.2GB / 100GB</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">決済システム</span>
                  <span className="flex items-center text-green-600 text-sm">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                    接続中
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}