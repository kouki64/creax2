'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function AdminReportsPage() {
  const [filterType, setFilterType] = useState<'all' | 'user' | 'project' | 'content' | 'payment'>('all')
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'investigating' | 'resolved' | 'dismissed'>('all')
  const [filterPriority, setFilterPriority] = useState<'all' | 'high' | 'medium' | 'low'>('all')
  const [selectedReports, setSelectedReports] = useState<string[]>([])
  const [showReportDetail, setShowReportDetail] = useState<any>(null)

  // ダミー通報データ
  const [reports] = useState([
    {
      id: 'report-001',
      type: 'project',
      priority: 'high',
      status: 'pending',
      subject: '不適切な案件内容',
      targetType: '案件',
      targetId: 'proj-004',
      targetTitle: '怪しい音楽制作依頼',
      reportedBy: '山田太郎（クリエーター）',
      reportedUser: '問題ユーザー',
      reason: '著作権侵害の疑い',
      description: 'この案件は既存の楽曲の無断使用を促す内容が含まれています。明らかに著作権を侵害する意図が見られます。',
      evidence: ['screenshot1.png', 'screenshot2.png'],
      createdAt: '2024-02-15 14:30',
      previousReports: 2,
      urgency: '即時対応必要'
    },
    {
      id: 'report-002',
      type: 'user',
      priority: 'high',
      status: 'investigating',
      subject: '詐欺行為の疑い',
      targetType: 'ユーザー',
      targetId: 'user-666',
      targetTitle: '怪しいクライアント',
      reportedBy: '佐藤花子（クリエーター）',
      reportedUser: '怪しいクライアント',
      reason: '支払い回避',
      description: '納品後に難癖をつけて支払いを拒否。複数のクリエーターから同様の報告あり。',
      evidence: ['chat_log.pdf'],
      createdAt: '2024-02-15 10:00',
      previousReports: 5,
      investigator: '管理者A',
      urgency: '要調査'
    },
    {
      id: 'report-003',
      type: 'content',
      priority: 'medium',
      status: 'pending',
      subject: '不適切なポートフォリオ',
      targetType: 'コンテンツ',
      targetId: 'portfolio-123',
      targetTitle: 'クリエーターのポートフォリオ',
      reportedBy: '匿名ユーザー',
      reportedUser: '問題クリエーター',
      reason: '盗作・無断使用',
      description: '他のアーティストの作品を自分の作品として掲載している。',
      evidence: ['original_work_link.txt'],
      createdAt: '2024-02-14 16:45',
      previousReports: 0,
      urgency: '通常対応'
    },
    {
      id: 'report-004',
      type: 'payment',
      priority: 'high',
      status: 'resolved',
      subject: '不正な返金要求',
      targetType: '決済',
      targetId: 'txn-999',
      targetTitle: '¥50,000の案件',
      reportedBy: 'クリエーターX',
      reportedUser: 'クライアントY',
      reason: '不当な返金要求',
      description: '正常に納品したにも関わらず、クライアントが一方的に返金を要求。',
      evidence: ['delivery_proof.zip'],
      createdAt: '2024-02-13 09:30',
      resolvedAt: '2024-02-14 15:00',
      resolution: 'クリエーター側の主張を支持、返金拒否',
      previousReports: 1,
      urgency: '解決済み'
    },
    {
      id: 'report-005',
      type: 'user',
      priority: 'low',
      status: 'dismissed',
      subject: 'スパム行為',
      targetType: 'ユーザー',
      targetId: 'user-888',
      targetTitle: 'スパムユーザー',
      reportedBy: '複数のユーザー',
      reportedUser: 'スパムユーザー',
      reason: '大量メッセージ送信',
      description: '営業メッセージを大量送信している。',
      createdAt: '2024-02-12 12:00',
      dismissedAt: '2024-02-12 18:00',
      dismissalReason: '警告済み、改善を確認',
      previousReports: 3,
      urgency: '対応済み'
    }
  ])

  const filteredReports = reports.filter(report => {
    const matchesType = filterType === 'all' || report.type === filterType
    const matchesStatus = filterStatus === 'all' || report.status === filterStatus
    const matchesPriority = filterPriority === 'all' || report.priority === filterPriority
    return matchesType && matchesStatus && matchesPriority
  })

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-300'
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300'
      case 'low': return 'bg-blue-100 text-blue-700 border-blue-300'
      default: return 'bg-gray-100 text-gray-700 border-gray-300'
    }
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-orange-100 text-orange-700'
      case 'investigating': return 'bg-blue-100 text-blue-700'
      case 'resolved': return 'bg-green-100 text-green-700'
      case 'dismissed': return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusText = (status: string) => {
    switch(status) {
      case 'pending': return '未対応'
      case 'investigating': return '調査中'
      case 'resolved': return '解決済'
      case 'dismissed': return '却下'
      default: return status
    }
  }

  const handleBulkAction = (action: string) => {
    if (selectedReports.length === 0) {
      alert('通報を選択してください')
      return
    }
    
    switch(action) {
      case 'investigate':
        if (confirm(`${selectedReports.length}件の通報を調査開始しますか？`)) {
          // 調査開始処理
          setSelectedReports([])
        }
        break
      case 'dismiss':
        if (confirm(`${selectedReports.length}件の通報を却下しますか？`)) {
          // 却下処理
          setSelectedReports([])
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
              <h1 className="text-2xl font-bold text-gray-900">通報管理</h1>
            </div>
            <button className="px-4 py-2 bg-[#ff6232] text-white rounded-lg hover:bg-[#e5562c]">
              レポート出力
            </button>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* 統計カード */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600">未対応</div>
            <div className="text-2xl font-bold text-orange-600">12</div>
            <div className="text-xs text-gray-500 mt-1">即時対応: 3件</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600">調査中</div>
            <div className="text-2xl font-bold text-blue-600">8</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600">今週解決</div>
            <div className="text-2xl font-bold text-green-600">23</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600">悪質ユーザー</div>
            <div className="text-2xl font-bold text-red-600">5</div>
            <div className="text-xs text-gray-500 mt-1">要監視</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600">平均対応時間</div>
            <div className="text-xl font-bold text-purple-600">4.2h</div>
          </div>
        </div>

        {/* フィルター */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-wrap gap-4">
            {/* 通報タイプ */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6232] focus:border-[#ff6232]"
            >
              <option value="all">全タイプ</option>
              <option value="user">ユーザー</option>
              <option value="project">案件</option>
              <option value="content">コンテンツ</option>
              <option value="payment">決済</option>
            </select>

            {/* ステータス */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6232] focus:border-[#ff6232]"
            >
              <option value="all">全ステータス</option>
              <option value="pending">未対応</option>
              <option value="investigating">調査中</option>
              <option value="resolved">解決済</option>
              <option value="dismissed">却下</option>
            </select>

            {/* 優先度 */}
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6232] focus:border-[#ff6232]"
            >
              <option value="all">全優先度</option>
              <option value="high">高</option>
              <option value="medium">中</option>
              <option value="low">低</option>
            </select>

            {/* 一括アクション */}
            {selectedReports.length > 0 && (
              <div className="flex gap-2">
                <button
                  onClick={() => handleBulkAction('investigate')}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  調査開始（{selectedReports.length}件）
                </button>
                <button
                  onClick={() => handleBulkAction('dismiss')}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  却下
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 通報リスト */}
        <div className="space-y-4">
          {filteredReports.map(report => (
            <div
              key={report.id}
              className={`bg-white rounded-lg shadow border-l-4 ${getPriorityColor(report.priority)} hover:shadow-lg transition`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      checked={selectedReports.includes(report.id)}
                      onChange={() => {
                        setSelectedReports(prev => 
                          prev.includes(report.id)
                            ? prev.filter(id => id !== report.id)
                            : [...prev, report.id]
                        )
                      }}
                      className="mt-1 rounded"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{report.subject}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(report.status)}`}>
                          {getStatusText(report.status)}
                        </span>
                        {report.previousReports > 0 && (
                          <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                            過去通報 {report.previousReports}件
                          </span>
                        )}
                        <span className="text-xs text-gray-500">{report.urgency}</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <span className="text-sm text-gray-600">対象:</span>
                          <span className="ml-2 text-sm font-medium text-gray-900">
                            {report.targetTitle}（{report.targetType}）
                          </span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">通報者:</span>
                          <span className="ml-2 text-sm font-medium text-gray-900">
                            {report.reportedBy}
                          </span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">被通報者:</span>
                          <span className="ml-2 text-sm font-medium text-gray-900">
                            {report.reportedUser}
                          </span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">理由:</span>
                          <span className="ml-2 text-sm font-medium text-gray-900">
                            {report.reason}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-700 mb-3">{report.description}</p>

                      {report.evidence && report.evidence.length > 0 && (
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-sm text-gray-600">証拠:</span>
                          {report.evidence.map((file, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-xs rounded">
                              📎 {file}
                            </span>
                          ))}
                        </div>
                      )}

                      {report.investigator && (
                        <div className="text-sm text-blue-600">
                          担当: {report.investigator}
                        </div>
                      )}

                      {report.resolution && (
                        <div className="mt-3 p-3 bg-green-50 rounded-lg">
                          <span className="text-sm font-medium text-green-900">解決内容: </span>
                          <span className="text-sm text-green-700">{report.resolution}</span>
                        </div>
                      )}

                      {report.dismissalReason && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm font-medium text-gray-900">却下理由: </span>
                          <span className="text-sm text-gray-700">{report.dismissalReason}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span className="text-xs text-gray-500">{report.createdAt}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setShowReportDetail(report)}
                        className="text-sm text-[#ff6232] hover:text-[#e5562c]"
                      >
                        詳細
                      </button>
                      {report.status === 'pending' && (
                        <>
                          <button className="text-sm text-blue-600 hover:text-blue-700">
                            調査開始
                          </button>
                          <button className="text-sm text-gray-600 hover:text-gray-700">
                            却下
                          </button>
                        </>
                      )}
                      {report.status === 'investigating' && (
                        <button className="text-sm text-green-600 hover:text-green-700">
                          解決
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 通報詳細モーダル */}
      {showReportDetail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">通報詳細</h2>
                <button
                  onClick={() => setShowReportDetail(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <h3 className="font-semibold mb-2">対応アクション</h3>
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                    対象を削除
                  </button>
                  <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
                    ユーザーを停止
                  </button>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    警告を送信
                  </button>
                  <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                    解決として記録
                  </button>
                  <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
                    却下
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-2">調査メモ</h3>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  rows={4}
                  placeholder="調査内容や対応内容を記録..."
                ></textarea>
                <button className="mt-2 px-4 py-2 bg-[#ff6232] text-white rounded-lg hover:bg-[#e5562c]">
                  メモを保存
                </button>
              </div>

              <div>
                <h3 className="font-semibold mb-2">関連履歴</h3>
                <div className="space-y-2">
                  <div className="p-3 bg-gray-50 rounded">
                    <div className="text-sm text-gray-900">2024-02-10: 同一ユーザーへの別の通報</div>
                    <div className="text-xs text-gray-500">理由: 支払い遅延</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <div className="text-sm text-gray-900">2024-02-05: 警告送信済み</div>
                    <div className="text-xs text-gray-500">内容: 利用規約違反について</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}