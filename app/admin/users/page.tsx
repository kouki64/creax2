'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'client' | 'creator'>('all')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'suspended' | 'pending'>('all')
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [showUserDetail, setShowUserDetail] = useState<any>(null)

  // ダミーユーザーデータ
  const [users] = useState([
    {
      id: 'user-001',
      name: '山田太郎',
      email: 'yamada@example.com',
      userType: 'creator',
      status: 'active',
      verified: true,
      rating: 4.8,
      completedProjects: 45,
      revenue: 1250000,
      joinedAt: '2024-01-15',
      lastLogin: '2024-02-15 14:30',
      reports: 0
    },
    {
      id: 'user-002',
      name: '株式会社クリエイティブ',
      email: 'info@creative.co.jp',
      userType: 'client',
      status: 'active',
      verified: true,
      rating: 4.5,
      completedProjects: 12,
      spent: 850000,
      joinedAt: '2024-02-01',
      lastLogin: '2024-02-14 10:15',
      reports: 0
    },
    {
      id: 'user-003',
      name: '佐藤花子',
      email: 'sato@example.com',
      userType: 'creator',
      status: 'suspended',
      verified: false,
      rating: 2.5,
      completedProjects: 3,
      revenue: 45000,
      joinedAt: '2024-02-10',
      lastLogin: '2024-02-12 18:45',
      reports: 3
    },
    {
      id: 'user-004',
      name: '鈴木一郎',
      email: 'suzuki@example.com',
      userType: 'creator',
      status: 'pending',
      verified: false,
      rating: 0,
      completedProjects: 0,
      revenue: 0,
      joinedAt: '2024-02-15',
      lastLogin: '2024-02-15 09:00',
      reports: 0
    }
  ])

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === 'all' || user.userType === filterType
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus
    return matchesSearch && matchesType && matchesStatus
  })

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    )
  }

  const handleBulkAction = (action: string) => {
    if (selectedUsers.length === 0) {
      alert('ユーザーを選択してください')
      return
    }
    
    switch(action) {
      case 'suspend':
        if (confirm(`${selectedUsers.length}名のユーザーを停止しますか？`)) {
          // 停止処理
          setSelectedUsers([])
        }
        break
      case 'verify':
        if (confirm(`${selectedUsers.length}名のユーザーを承認しますか？`)) {
          // 承認処理
          setSelectedUsers([])
        }
        break
      case 'delete':
        if (confirm(`${selectedUsers.length}名のユーザーを削除しますか？この操作は取り消せません。`)) {
          // 削除処理
          setSelectedUsers([])
        }
        break
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/admin/dashboard" className="text-gray-600 hover:text-gray-900 mr-4">
                ← ダッシュボード
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">ユーザー管理</h1>
            </div>
            <button className="px-4 py-2 bg-[#ff6232] text-white rounded-lg hover:bg-[#e5562c]">
              CSVエクスポート
            </button>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* 統計 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600">総ユーザー数</div>
            <div className="text-2xl font-bold text-gray-900">1,234</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600">クライアント</div>
            <div className="text-2xl font-bold text-blue-600">456</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600">クリエーター</div>
            <div className="text-2xl font-bold text-green-600">778</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600">承認待ち</div>
            <div className="text-2xl font-bold text-orange-600">23</div>
          </div>
        </div>

        {/* フィルター */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-wrap gap-4">
            {/* 検索 */}
            <div className="flex-1 min-w-[300px]">
              <input
                type="text"
                placeholder="名前またはメールアドレスで検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6232] focus:border-[#ff6232]"
              />
            </div>

            {/* ユーザータイプ */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6232] focus:border-[#ff6232]"
            >
              <option value="all">全タイプ</option>
              <option value="client">クライアント</option>
              <option value="creator">クリエーター</option>
            </select>

            {/* ステータス */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6232] focus:border-[#ff6232]"
            >
              <option value="all">全ステータス</option>
              <option value="active">アクティブ</option>
              <option value="suspended">停止中</option>
              <option value="pending">承認待ち</option>
            </select>

            {/* 一括アクション */}
            {selectedUsers.length > 0 && (
              <div className="flex gap-2">
                <button
                  onClick={() => handleBulkAction('suspend')}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                >
                  一括停止
                </button>
                <button
                  onClick={() => handleBulkAction('verify')}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  一括承認
                </button>
                <button
                  onClick={() => handleBulkAction('delete')}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  一括削除
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ユーザーテーブル */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedUsers(filteredUsers.map(u => u.id))
                      } else {
                        setSelectedUsers([])
                      }
                    }}
                    className="rounded"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ユーザー
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  タイプ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ステータス
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  実績
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  登録日
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  アクション
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map(user => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => toggleUserSelection(user.id)}
                      className="rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                          <span className="text-gray-600 font-medium">
                            {user.name[0]}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                          {user.verified && (
                            <span className="ml-1 text-blue-500">✓</span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      user.userType === 'client' 
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {user.userType === 'client' ? 'クライアント' : 'クリエーター'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      user.status === 'active' ? 'bg-green-100 text-green-700' :
                      user.status === 'suspended' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {user.status === 'active' ? 'アクティブ' :
                       user.status === 'suspended' ? '停止中' : '承認待ち'}
                    </span>
                    {user.reports > 0 && (
                      <span className="ml-2 px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                        通報 {user.reports}件
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>案件: {user.completedProjects}件</div>
                    <div>評価: ⭐{user.rating}</div>
                    <div>
                      {user.userType === 'client' 
                        ? `支払: ¥${user.spent?.toLocaleString()}`
                        : `収益: ¥${user.revenue.toLocaleString()}`}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>{user.joinedAt}</div>
                    <div className="text-xs">最終: {user.lastLogin}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => setShowUserDetail(user)}
                      className="text-[#ff6232] hover:text-[#e5562c] mr-3"
                    >
                      詳細
                    </button>
                    {user.status === 'active' ? (
                      <button className="text-yellow-600 hover:text-yellow-700 mr-3">
                        停止
                      </button>
                    ) : user.status === 'suspended' ? (
                      <button className="text-green-600 hover:text-green-700 mr-3">
                        復活
                      </button>
                    ) : (
                      <button className="text-green-600 hover:text-green-700 mr-3">
                        承認
                      </button>
                    )}
                    <button className="text-red-600 hover:text-red-700">
                      削除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ページネーション */}
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            全 {filteredUsers.length} 件中 1-{Math.min(10, filteredUsers.length)} 件を表示
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              前へ
            </button>
            <button className="px-4 py-2 bg-[#ff6232] text-white rounded-lg">
              1
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              2
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              次へ
            </button>
          </div>
        </div>
      </div>

      {/* ユーザー詳細モーダル */}
      {showUserDetail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">ユーザー詳細</h2>
                <button
                  onClick={() => setShowUserDetail(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">名前</label>
                  <p className="mt-1 text-gray-900">{showUserDetail.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">メール</label>
                  <p className="mt-1 text-gray-900">{showUserDetail.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">タイプ</label>
                  <p className="mt-1 text-gray-900">
                    {showUserDetail.userType === 'client' ? 'クライアント' : 'クリエーター'}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">ステータス</label>
                  <p className="mt-1">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      showUserDetail.status === 'active' ? 'bg-green-100 text-green-700' :
                      showUserDetail.status === 'suspended' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {showUserDetail.status === 'active' ? 'アクティブ' :
                       showUserDetail.status === 'suspended' ? '停止中' : '承認待ち'}
                    </span>
                  </p>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
                  アカウント停止
                </button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  メッセージ送信
                </button>
                <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
                  活動ログ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}