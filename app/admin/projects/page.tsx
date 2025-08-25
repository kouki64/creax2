'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function AdminProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'open' | 'in_progress' | 'completed' | 'cancelled'>('all')
  const [filterType, setFilterType] = useState<'all' | 'competition' | 'direct'>('all')
  const [selectedProjects, setSelectedProjects] = useState<string[]>([])
  const [showProjectDetail, setShowProjectDetail] = useState<any>(null)

  // ダミープロジェクトデータ
  const [projects] = useState([
    {
      id: 'proj-001',
      title: 'YouTubeチャンネルのオープニングテーマ制作',
      client: '株式会社クリエイティブ',
      clientId: 'user-002',
      projectType: 'competition',
      category: '音楽制作',
      budget: 50000,
      status: 'open',
      applicants: 8,
      deadline: '2024-03-01',
      createdAt: '2024-02-10',
      reports: 0,
      escrowAmount: 0,
      description: 'YouTubeチャンネル用の15秒のオープニングテーマを制作していただきたいです。'
    },
    {
      id: 'proj-002',
      title: 'ゲームBGM制作（戦闘シーン）',
      client: 'ゲーム開発スタジオA',
      clientId: 'user-005',
      projectType: 'direct',
      category: 'BGM制作',
      budget: 120000,
      status: 'in_progress',
      applicants: 1,
      selectedCreator: '山田太郎',
      deadline: '2024-03-15',
      createdAt: '2024-02-01',
      reports: 0,
      escrowAmount: 120000,
      description: 'RPGゲームの戦闘シーン用BGMを5曲制作'
    },
    {
      id: 'proj-003',
      title: 'ポッドキャスト音声編集',
      client: '個人事業主B',
      clientId: 'user-008',
      projectType: 'competition',
      category: '音声編集',
      budget: 15000,
      status: 'completed',
      applicants: 5,
      selectedCreator: '佐藤花子',
      deadline: '2024-02-15',
      createdAt: '2024-01-20',
      completedAt: '2024-02-14',
      reports: 0,
      escrowAmount: 0,
      rating: 5,
      description: '30分のポッドキャスト音声の編集とノイズ除去'
    },
    {
      id: 'proj-004',
      title: '不適切な内容を含む案件',
      client: '問題ユーザー',
      clientId: 'user-666',
      projectType: 'competition',
      category: 'その他',
      budget: 5000,
      status: 'cancelled',
      applicants: 0,
      deadline: '2024-02-28',
      createdAt: '2024-02-14',
      cancelledAt: '2024-02-14',
      reports: 3,
      escrowAmount: 0,
      cancelReason: '利用規約違反のため管理者により削除',
      description: '規約違反の内容...'
    }
  ])

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus
    const matchesType = filterType === 'all' || project.projectType === filterType
    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'open': return 'bg-green-100 text-green-700'
      case 'in_progress': return 'bg-blue-100 text-blue-700'
      case 'completed': return 'bg-gray-100 text-gray-700'
      case 'cancelled': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusText = (status: string) => {
    switch(status) {
      case 'open': return '募集中'
      case 'in_progress': return '進行中'
      case 'completed': return '完了'
      case 'cancelled': return 'キャンセル'
      default: return status
    }
  }

  const handleBulkAction = (action: string) => {
    if (selectedProjects.length === 0) {
      alert('案件を選択してください')
      return
    }
    
    switch(action) {
      case 'cancel':
        if (confirm(`${selectedProjects.length}件の案件をキャンセルしますか？`)) {
          // キャンセル処理
          setSelectedProjects([])
        }
        break
      case 'delete':
        if (confirm(`${selectedProjects.length}件の案件を削除しますか？この操作は取り消せません。`)) {
          // 削除処理
          setSelectedProjects([])
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
              <h1 className="text-2xl font-bold text-gray-900">案件管理</h1>
            </div>
            <button className="px-4 py-2 bg-[#ff6232] text-white rounded-lg hover:bg-[#e5562c]">
              CSVエクスポート
            </button>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* 統計 */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600">総案件数</div>
            <div className="text-2xl font-bold text-gray-900">456</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600">募集中</div>
            <div className="text-2xl font-bold text-green-600">89</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600">進行中</div>
            <div className="text-2xl font-bold text-blue-600">45</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600">エスクロー総額</div>
            <div className="text-xl font-bold text-purple-600">¥3.2M</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600">通報案件</div>
            <div className="text-2xl font-bold text-red-600">5</div>
          </div>
        </div>

        {/* フィルター */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-wrap gap-4">
            {/* 検索 */}
            <div className="flex-1 min-w-[300px]">
              <input
                type="text"
                placeholder="案件名またはクライアント名で検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6232] focus:border-[#ff6232]"
              />
            </div>

            {/* ステータス */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6232] focus:border-[#ff6232]"
            >
              <option value="all">全ステータス</option>
              <option value="open">募集中</option>
              <option value="in_progress">進行中</option>
              <option value="completed">完了</option>
              <option value="cancelled">キャンセル</option>
            </select>

            {/* タイプ */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6232] focus:border-[#ff6232]"
            >
              <option value="all">全形式</option>
              <option value="competition">コンペ形式</option>
              <option value="direct">指名形式</option>
            </select>

            {/* 一括アクション */}
            {selectedProjects.length > 0 && (
              <div className="flex gap-2">
                <button
                  onClick={() => handleBulkAction('cancel')}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                >
                  一括キャンセル
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

        {/* 案件テーブル */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedProjects(filteredProjects.map(p => p.id))
                      } else {
                        setSelectedProjects([])
                      }
                    }}
                    className="rounded"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  案件名
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  クライアント
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ステータス
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  予算
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  応募/エスクロー
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  期限
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  アクション
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProjects.map(project => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedProjects.includes(project.id)}
                      onChange={() => {
                        setSelectedProjects(prev => 
                          prev.includes(project.id)
                            ? prev.filter(id => id !== project.id)
                            : [...prev, project.id]
                        )
                      }}
                      className="rounded"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {project.title}
                      </div>
                      <div className="text-xs text-gray-500">
                        {project.projectType === 'competition' ? 'コンペ' : '指名'} / {project.category}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{project.client}</div>
                    <div className="text-xs text-gray-500">ID: {project.clientId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(project.status)}`}>
                      {getStatusText(project.status)}
                    </span>
                    {project.reports > 0 && (
                      <span className="ml-2 px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                        通報 {project.reports}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ¥{project.budget.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {project.status === 'open' ? (
                      <div className="text-sm text-gray-900">応募: {project.applicants}件</div>
                    ) : project.escrowAmount > 0 ? (
                      <div>
                        <div className="text-sm font-medium text-purple-600">
                          ¥{project.escrowAmount.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500">エスクロー中</div>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500">-</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{project.deadline}</div>
                    <div className="text-xs text-gray-500">作成: {project.createdAt}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => setShowProjectDetail(project)}
                      className="text-[#ff6232] hover:text-[#e5562c] mr-3"
                    >
                      詳細
                    </button>
                    {project.status === 'in_progress' && (
                      <button className="text-blue-600 hover:text-blue-700 mr-3">
                        介入
                      </button>
                    )}
                    {project.status !== 'cancelled' && (
                      <button className="text-yellow-600 hover:text-yellow-700 mr-3">
                        停止
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
            全 {filteredProjects.length} 件中 1-{Math.min(10, filteredProjects.length)} 件を表示
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

      {/* 案件詳細モーダル */}
      {showProjectDetail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">案件詳細</h2>
                <button
                  onClick={() => setShowProjectDetail(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">案件名</label>
                  <p className="mt-1 text-gray-900">{showProjectDetail.title}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">クライアント</label>
                  <p className="mt-1 text-gray-900">{showProjectDetail.client}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">ステータス</label>
                  <p className="mt-1">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(showProjectDetail.status)}`}>
                      {getStatusText(showProjectDetail.status)}
                    </span>
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">予算</label>
                  <p className="mt-1 text-gray-900">¥{showProjectDetail.budget.toLocaleString()}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">納期</label>
                  <p className="mt-1 text-gray-900">{showProjectDetail.deadline}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">エスクロー</label>
                  <p className="mt-1 text-gray-900">
                    {showProjectDetail.escrowAmount > 0 
                      ? `¥${showProjectDetail.escrowAmount.toLocaleString()}`
                      : 'なし'}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">説明</label>
                <p className="text-gray-700 bg-gray-50 p-3 rounded">{showProjectDetail.description}</p>
              </div>

              {showProjectDetail.cancelReason && (
                <div className="mb-6 p-4 bg-red-50 rounded-lg">
                  <label className="block text-sm font-medium text-red-900 mb-1">キャンセル理由</label>
                  <p className="text-red-700">{showProjectDetail.cancelReason}</p>
                </div>
              )}

              <div className="flex gap-3">
                {showProjectDetail.status === 'in_progress' && (
                  <>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                      トラブル介入
                    </button>
                    <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
                      エスクロー解放
                    </button>
                  </>
                )}
                <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
                  案件を停止
                </button>
                <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                  案件を削除
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