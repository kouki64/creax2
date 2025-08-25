'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function AdminAnnouncementsPage() {
  const [activeTab, setActiveTab] = useState<'list' | 'create'>('list')
  const [filterCategory, setFilterCategory] = useState<'all' | 'news' | 'maintenance' | 'update' | 'campaign'>('all')
  const [selectedAnnouncements, setSelectedAnnouncements] = useState<string[]>([])
  const [editingAnnouncement, setEditingAnnouncement] = useState<any>(null)
  
  // 新規作成フォーム
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    category: 'news',
    content: '',
    targetUsers: 'all',
    priority: 'normal',
    publishDate: '',
    publishTime: '',
    expiryDate: '',
    displayLocation: [] as string[]
  })

  // ダミーお知らせデータ
  const [announcements] = useState([
    {
      id: 'ann-001',
      title: '【重要】メンテナンスのお知らせ',
      category: 'maintenance',
      priority: 'high',
      status: 'published',
      content: '2024年2月20日（火）午前2:00〜6:00の間、システムメンテナンスを実施いたします。メンテナンス中はサービスをご利用いただけません。',
      targetUsers: 'all',
      displayLocation: ['top', 'dashboard'],
      publishDate: '2024-02-15 12:00',
      expiryDate: '2024-02-20 06:00',
      views: 1234,
      author: '管理者A',
      createdAt: '2024-02-14 10:00',
      updatedAt: '2024-02-14 10:00'
    },
    {
      id: 'ann-002',
      title: '新機能リリースのお知らせ',
      category: 'update',
      priority: 'normal',
      status: 'published',
      content: 'PayPay決済が利用可能になりました！より便利にサービスをご利用いただけます。',
      targetUsers: 'all',
      displayLocation: ['dashboard'],
      publishDate: '2024-02-10 09:00',
      expiryDate: '2024-03-10 23:59',
      views: 3456,
      author: '管理者B',
      createdAt: '2024-02-09 15:00',
      updatedAt: '2024-02-09 15:00'
    },
    {
      id: 'ann-003',
      title: '手数料改定のお知らせ',
      category: 'news',
      priority: 'high',
      status: 'scheduled',
      content: '2024年3月1日より、サービス手数料を15%から12%に引き下げます。',
      targetUsers: 'creator',
      displayLocation: ['top', 'dashboard', 'email'],
      publishDate: '2024-02-25 00:00',
      expiryDate: '2024-03-31 23:59',
      views: 0,
      author: '管理者A',
      createdAt: '2024-02-13 14:00',
      updatedAt: '2024-02-13 14:00'
    },
    {
      id: 'ann-004',
      title: '春の新規登録キャンペーン',
      category: 'campaign',
      priority: 'normal',
      status: 'draft',
      content: '期間限定！新規登録で初回手数料が50%OFF！',
      targetUsers: 'all',
      displayLocation: ['top'],
      publishDate: '2024-03-01 00:00',
      expiryDate: '2024-03-31 23:59',
      views: 0,
      author: '管理者C',
      createdAt: '2024-02-12 11:00',
      updatedAt: '2024-02-14 16:00'
    },
    {
      id: 'ann-005',
      title: 'セキュリティアップデートのお知らせ',
      category: 'update',
      priority: 'low',
      status: 'expired',
      content: 'セキュリティ強化のためのアップデートを実施しました。',
      targetUsers: 'all',
      displayLocation: ['dashboard'],
      publishDate: '2024-01-15 10:00',
      expiryDate: '2024-02-01 23:59',
      views: 5678,
      author: '管理者A',
      createdAt: '2024-01-14 09:00',
      updatedAt: '2024-01-14 09:00'
    }
  ])

  const filteredAnnouncements = announcements.filter(ann => {
    return filterCategory === 'all' || ann.category === filterCategory
  })

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'maintenance': return 'bg-red-100 text-red-700'
      case 'update': return 'bg-blue-100 text-blue-700'
      case 'news': return 'bg-green-100 text-green-700'
      case 'campaign': return 'bg-purple-100 text-purple-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getCategoryText = (category: string) => {
    switch(category) {
      case 'maintenance': return 'メンテナンス'
      case 'update': return 'アップデート'
      case 'news': return 'お知らせ'
      case 'campaign': return 'キャンペーン'
      default: return category
    }
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'published': return 'bg-green-100 text-green-700'
      case 'scheduled': return 'bg-blue-100 text-blue-700'
      case 'draft': return 'bg-gray-100 text-gray-700'
      case 'expired': return 'bg-yellow-100 text-yellow-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusText = (status: string) => {
    switch(status) {
      case 'published': return '公開中'
      case 'scheduled': return '予約'
      case 'draft': return '下書き'
      case 'expired': return '期限切れ'
      default: return status
    }
  }

  const handlePublish = (announcement: any) => {
    if (confirm(`「${announcement.title}」を公開しますか？`)) {
      // 公開処理
      alert('公開しました')
    }
  }

  const handleDelete = (announcement: any) => {
    if (confirm(`「${announcement.title}」を削除しますか？この操作は取り消せません。`)) {
      // 削除処理
      alert('削除しました')
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
              <h1 className="text-2xl font-bold text-gray-900">お知らせ管理</h1>
            </div>
            <button
              onClick={() => setActiveTab('create')}
              className="px-4 py-2 bg-[#ff6232] text-white rounded-lg hover:bg-[#e5562c]"
            >
              新規作成
            </button>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* タブ */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b">
            <div className="flex">
              <button
                onClick={() => setActiveTab('list')}
                className={`px-6 py-3 font-medium ${
                  activeTab === 'list'
                    ? 'text-[#ff6232] border-b-2 border-[#ff6232]'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                お知らせ一覧
              </button>
              <button
                onClick={() => setActiveTab('create')}
                className={`px-6 py-3 font-medium ${
                  activeTab === 'create'
                    ? 'text-[#ff6232] border-b-2 border-[#ff6232]'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                新規作成
              </button>
            </div>
          </div>
        </div>

        {activeTab === 'list' ? (
          <>
            {/* 統計 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-lg shadow p-4">
                <div className="text-sm text-gray-600">公開中</div>
                <div className="text-2xl font-bold text-green-600">3</div>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <div className="text-sm text-gray-600">予約投稿</div>
                <div className="text-2xl font-bold text-blue-600">2</div>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <div className="text-sm text-gray-600">下書き</div>
                <div className="text-2xl font-bold text-gray-600">5</div>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <div className="text-sm text-gray-600">今月の閲覧数</div>
                <div className="text-2xl font-bold text-purple-600">12.3K</div>
              </div>
            </div>

            {/* フィルター */}
            <div className="bg-white rounded-lg shadow p-4 mb-6">
              <div className="flex gap-4">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value as any)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6232] focus:border-[#ff6232]"
                >
                  <option value="all">全カテゴリー</option>
                  <option value="news">お知らせ</option>
                  <option value="maintenance">メンテナンス</option>
                  <option value="update">アップデート</option>
                  <option value="campaign">キャンペーン</option>
                </select>
              </div>
            </div>

            {/* お知らせリスト */}
            <div className="space-y-4">
              {filteredAnnouncements.map(announcement => (
                <div key={announcement.id} className="bg-white rounded-lg shadow hover:shadow-lg transition">
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {announcement.title}
                          </h3>
                          <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(announcement.category)}`}>
                            {getCategoryText(announcement.category)}
                          </span>
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(announcement.status)}`}>
                            {getStatusText(announcement.status)}
                          </span>
                          {announcement.priority === 'high' && (
                            <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                              重要
                            </span>
                          )}
                        </div>

                        <p className="text-gray-700 mb-3">{announcement.content}</p>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">対象:</span>
                            <span className="ml-1">
                              {announcement.targetUsers === 'all' ? '全ユーザー' :
                               announcement.targetUsers === 'client' ? 'クライアント' : 'クリエーター'}
                            </span>
                          </div>
                          <div>
                            <span className="font-medium">表示場所:</span>
                            <span className="ml-1">
                              {announcement.displayLocation.map(loc => 
                                loc === 'top' ? 'トップ' :
                                loc === 'dashboard' ? 'ダッシュボード' :
                                loc === 'email' ? 'メール' : loc
                              ).join(', ')}
                            </span>
                          </div>
                          <div>
                            <span className="font-medium">公開期間:</span>
                            <span className="ml-1">
                              {announcement.publishDate} 〜 {announcement.expiryDate}
                            </span>
                          </div>
                          <div>
                            <span className="font-medium">閲覧数:</span>
                            <span className="ml-1">{announcement.views.toLocaleString()}</span>
                          </div>
                        </div>

                        <div className="mt-3 text-xs text-gray-500">
                          作成者: {announcement.author} | 作成日: {announcement.createdAt} | 更新日: {announcement.updatedAt}
                        </div>
                      </div>

                      <div className="flex gap-2 ml-4">
                        {announcement.status === 'draft' && (
                          <button
                            onClick={() => handlePublish(announcement)}
                            className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
                          >
                            公開
                          </button>
                        )}
                        <button
                          onClick={() => setEditingAnnouncement(announcement)}
                          className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                        >
                          編集
                        </button>
                        <button
                          onClick={() => handleDelete(announcement)}
                          className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                        >
                          削除
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* 新規作成フォーム */
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-6">新規お知らせ作成</h2>
            
            <div className="space-y-6">
              {/* タイトル */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  タイトル <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6232] focus:border-[#ff6232]"
                  placeholder="お知らせのタイトルを入力"
                />
              </div>

              {/* カテゴリーと優先度 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    カテゴリー <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={newAnnouncement.category}
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, category: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6232] focus:border-[#ff6232]"
                  >
                    <option value="news">お知らせ</option>
                    <option value="maintenance">メンテナンス</option>
                    <option value="update">アップデート</option>
                    <option value="campaign">キャンペーン</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    優先度
                  </label>
                  <select
                    value={newAnnouncement.priority}
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, priority: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6232] focus:border-[#ff6232]"
                  >
                    <option value="low">低</option>
                    <option value="normal">通常</option>
                    <option value="high">高（重要）</option>
                  </select>
                </div>
              </div>

              {/* 内容 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  内容 <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={newAnnouncement.content}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6232] focus:border-[#ff6232]"
                  rows={6}
                  placeholder="お知らせの内容を入力"
                />
              </div>

              {/* 対象ユーザー */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  対象ユーザー
                </label>
                <select
                  value={newAnnouncement.targetUsers}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, targetUsers: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6232] focus:border-[#ff6232]"
                >
                  <option value="all">全ユーザー</option>
                  <option value="client">クライアントのみ</option>
                  <option value="creator">クリエーターのみ</option>
                </select>
              </div>

              {/* 表示場所 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  表示場所（複数選択可）
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newAnnouncement.displayLocation.includes('top')}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setNewAnnouncement({
                            ...newAnnouncement,
                            displayLocation: [...newAnnouncement.displayLocation, 'top']
                          })
                        } else {
                          setNewAnnouncement({
                            ...newAnnouncement,
                            displayLocation: newAnnouncement.displayLocation.filter(loc => loc !== 'top')
                          })
                        }
                      }}
                      className="mr-2"
                    />
                    トップページ（バナー表示）
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newAnnouncement.displayLocation.includes('dashboard')}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setNewAnnouncement({
                            ...newAnnouncement,
                            displayLocation: [...newAnnouncement.displayLocation, 'dashboard']
                          })
                        } else {
                          setNewAnnouncement({
                            ...newAnnouncement,
                            displayLocation: newAnnouncement.displayLocation.filter(loc => loc !== 'dashboard')
                          })
                        }
                      }}
                      className="mr-2"
                    />
                    ダッシュボード
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newAnnouncement.displayLocation.includes('email')}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setNewAnnouncement({
                            ...newAnnouncement,
                            displayLocation: [...newAnnouncement.displayLocation, 'email']
                          })
                        } else {
                          setNewAnnouncement({
                            ...newAnnouncement,
                            displayLocation: newAnnouncement.displayLocation.filter(loc => loc !== 'email')
                          })
                        }
                      }}
                      className="mr-2"
                    />
                    メール通知
                  </label>
                </div>
              </div>

              {/* 公開期間 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    公開開始日時
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="date"
                      value={newAnnouncement.publishDate}
                      onChange={(e) => setNewAnnouncement({...newAnnouncement, publishDate: e.target.value})}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="time"
                      value={newAnnouncement.publishTime}
                      onChange={(e) => setNewAnnouncement({...newAnnouncement, publishTime: e.target.value})}
                      className="px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    公開終了日時
                  </label>
                  <input
                    type="datetime-local"
                    value={newAnnouncement.expiryDate}
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, expiryDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              {/* アクションボタン */}
              <div className="flex gap-3 pt-6 border-t">
                <button className="px-6 py-2 bg-[#ff6232] text-white rounded-lg hover:bg-[#e5562c]">
                  今すぐ公開
                </button>
                <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  予約投稿
                </button>
                <button className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
                  下書き保存
                </button>
                <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  プレビュー
                </button>
                <button
                  onClick={() => setActiveTab('list')}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  キャンセル
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}