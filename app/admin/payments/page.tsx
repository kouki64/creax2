'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function AdminPaymentsPage() {
  const [filterType, setFilterType] = useState<'all' | 'payment' | 'withdrawal' | 'refund'>('all')
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'completed' | 'failed' | 'refunded'>('all')
  const [dateRange, setDateRange] = useState({ from: '', to: '' })
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>([])
  const [showTransactionDetail, setShowTransactionDetail] = useState<any>(null)

  // ダミー取引データ
  const [transactions] = useState([
    {
      id: 'txn-001',
      type: 'payment',
      projectId: 'proj-001',
      projectTitle: 'YouTubeチャンネルのオープニングテーマ制作',
      from: '株式会社クリエイティブ',
      to: 'Creax（エスクロー）',
      amount: 57500,
      fee: 7500,
      netAmount: 50000,
      paymentMethod: 'credit_card',
      status: 'completed',
      createdAt: '2024-02-15 10:30:00',
      completedAt: '2024-02-15 10:30:15',
      stripeId: 'pi_1234567890',
      description: '案件支払い'
    },
    {
      id: 'txn-002',
      type: 'withdrawal',
      projectId: 'proj-003',
      projectTitle: 'ポッドキャスト音声編集',
      from: 'Creax（エスクロー）',
      to: '山田太郎',
      amount: 12750,
      fee: 0,
      netAmount: 12750,
      paymentMethod: 'bank_transfer',
      status: 'pending',
      createdAt: '2024-02-14 15:00:00',
      description: '出金申請',
      bankInfo: {
        bank: '三菱UFJ銀行',
        branch: '渋谷支店',
        accountNumber: '1234567'
      }
    },
    {
      id: 'txn-003',
      type: 'payment',
      projectId: 'proj-002',
      projectTitle: 'ゲームBGM制作（戦闘シーン）',
      from: 'ゲーム開発スタジオA',
      to: 'Creax（エスクロー）',
      amount: 138000,
      fee: 18000,
      netAmount: 120000,
      paymentMethod: 'paypay',
      status: 'completed',
      createdAt: '2024-02-13 14:20:00',
      completedAt: '2024-02-13 14:20:30',
      description: '案件支払い（PayPay）'
    },
    {
      id: 'txn-004',
      type: 'refund',
      projectId: 'proj-004',
      projectTitle: '動画編集案件',
      from: 'Creax',
      to: '個人事業主C',
      amount: 25000,
      fee: -3750,
      netAmount: 25000,
      paymentMethod: 'credit_card',
      status: 'completed',
      createdAt: '2024-02-12 09:00:00',
      completedAt: '2024-02-12 09:05:00',
      refundReason: 'クリエーター都合によるキャンセル',
      originalTransactionId: 'txn-999'
    },
    {
      id: 'txn-005',
      type: 'payment',
      projectId: 'proj-005',
      projectTitle: 'CM音楽制作',
      from: '広告代理店B',
      to: 'Creax（エスクロー）',
      amount: 230000,
      fee: 30000,
      netAmount: 200000,
      paymentMethod: 'bank_transfer',
      status: 'failed',
      createdAt: '2024-02-11 11:00:00',
      failedAt: '2024-02-11 11:00:30',
      failureReason: '残高不足',
      description: '案件支払い（失敗）'
    }
  ])

  const filteredTransactions = transactions.filter(txn => {
    const matchesType = filterType === 'all' || txn.type === filterType
    const matchesStatus = filterStatus === 'all' || txn.status === filterStatus
    return matchesType && matchesStatus
  })

  const getTypeLabel = (type: string) => {
    switch(type) {
      case 'payment': return '入金'
      case 'withdrawal': return '出金'
      case 'refund': return '返金'
      default: return type
    }
  }

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'payment': return 'bg-green-100 text-green-700'
      case 'withdrawal': return 'bg-blue-100 text-blue-700'
      case 'refund': return 'bg-yellow-100 text-yellow-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-700'
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      case 'failed': return 'bg-red-100 text-red-700'
      case 'refunded': return 'bg-purple-100 text-purple-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusText = (status: string) => {
    switch(status) {
      case 'completed': return '完了'
      case 'pending': return '処理中'
      case 'failed': return '失敗'
      case 'refunded': return '返金済'
      default: return status
    }
  }

  const getPaymentMethodIcon = (method: string) => {
    switch(method) {
      case 'credit_card': return '💳'
      case 'paypay': return '🅿️'
      case 'bank_transfer': return '🏦'
      case 'convenience_store': return '🏪'
      default: return '💰'
    }
  }

  // 統計計算
  const stats = {
    totalRevenue: transactions.filter(t => t.type === 'payment' && t.status === 'completed').reduce((sum, t) => sum + t.fee, 0),
    pendingWithdrawals: transactions.filter(t => t.type === 'withdrawal' && t.status === 'pending').reduce((sum, t) => sum + t.amount, 0),
    todayTransactions: transactions.filter(t => t.createdAt.includes('2024-02-15')).length,
    failedTransactions: transactions.filter(t => t.status === 'failed').length
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
              <h1 className="text-2xl font-bold text-gray-900">決済管理</h1>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                出金処理
              </button>
              <button className="px-4 py-2 bg-[#ff6232] text-white rounded-lg hover:bg-[#e5562c]">
                CSVエクスポート
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* 統計カード */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600">手数料収益（月累計）</div>
            <div className="text-2xl font-bold text-green-600">
              ¥{stats.totalRevenue.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 mt-1">前月比 +23%</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600">出金承認待ち</div>
            <div className="text-2xl font-bold text-orange-600">
              ¥{stats.pendingWithdrawals.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 mt-1">5件</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600">本日の取引</div>
            <div className="text-2xl font-bold text-blue-600">{stats.todayTransactions}</div>
            <div className="text-xs text-gray-500 mt-1">¥850,000</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600">失敗した取引</div>
            <div className="text-2xl font-bold text-red-600">{stats.failedTransactions}</div>
            <div className="text-xs text-gray-500 mt-1">要確認</div>
          </div>
        </div>

        {/* フィルター */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-wrap gap-4">
            {/* 取引タイプ */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6232] focus:border-[#ff6232]"
            >
              <option value="all">全タイプ</option>
              <option value="payment">入金</option>
              <option value="withdrawal">出金</option>
              <option value="refund">返金</option>
            </select>

            {/* ステータス */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6232] focus:border-[#ff6232]"
            >
              <option value="all">全ステータス</option>
              <option value="pending">処理中</option>
              <option value="completed">完了</option>
              <option value="failed">失敗</option>
              <option value="refunded">返金済</option>
            </select>

            {/* 日付範囲 */}
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={dateRange.from}
                onChange={(e) => setDateRange({...dateRange, from: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              />
              <span>〜</span>
              <input
                type="date"
                value={dateRange.to}
                onChange={(e) => setDateRange({...dateRange, to: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            {/* 一括アクション */}
            {selectedTransactions.length > 0 && (
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                  一括承認（{selectedTransactions.length}件）
                </button>
                <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                  一括却下
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 取引テーブル */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedTransactions(filteredTransactions.map(t => t.id))
                      } else {
                        setSelectedTransactions([])
                      }
                    }}
                    className="rounded"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID / 日時
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  タイプ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  案件 / 説明
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  送金元 → 送金先
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  金額
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  決済方法
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ステータス
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  アクション
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map(txn => (
                <tr key={txn.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedTransactions.includes(txn.id)}
                      onChange={() => {
                        setSelectedTransactions(prev => 
                          prev.includes(txn.id)
                            ? prev.filter(id => id !== txn.id)
                            : [...prev, txn.id]
                        )
                      }}
                      className="rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{txn.id}</div>
                    <div className="text-xs text-gray-500">{txn.createdAt}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(txn.type)}`}>
                      {getTypeLabel(txn.type)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{txn.projectTitle}</div>
                    <div className="text-xs text-gray-500">{txn.description}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="text-gray-900">{txn.from}</div>
                      <div className="text-gray-500">↓</div>
                      <div className="text-gray-900">{txn.to}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ¥{txn.amount.toLocaleString()}
                    </div>
                    {txn.fee !== 0 && (
                      <div className="text-xs text-gray-500">
                        手数料: ¥{Math.abs(txn.fee).toLocaleString()}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-lg mr-1">{getPaymentMethodIcon(txn.paymentMethod)}</span>
                      <span className="text-sm text-gray-600">
                        {txn.paymentMethod === 'credit_card' && 'カード'}
                        {txn.paymentMethod === 'paypay' && 'PayPay'}
                        {txn.paymentMethod === 'bank_transfer' && '銀行'}
                        {txn.paymentMethod === 'convenience_store' && 'コンビニ'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(txn.status)}`}>
                      {getStatusText(txn.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => setShowTransactionDetail(txn)}
                      className="text-[#ff6232] hover:text-[#e5562c] mr-3"
                    >
                      詳細
                    </button>
                    {txn.status === 'pending' && txn.type === 'withdrawal' && (
                      <>
                        <button className="text-green-600 hover:text-green-700 mr-3">
                          承認
                        </button>
                        <button className="text-red-600 hover:text-red-700">
                          却下
                        </button>
                      </>
                    )}
                    {txn.status === 'completed' && txn.type === 'payment' && (
                      <button className="text-yellow-600 hover:text-yellow-700">
                        返金
                      </button>
                    )}
                    {txn.status === 'failed' && (
                      <button className="text-blue-600 hover:text-blue-700">
                        再試行
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 取引詳細モーダル */}
      {showTransactionDetail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">取引詳細</h2>
                <button
                  onClick={() => setShowTransactionDetail(null)}
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
                  <label className="block text-sm font-medium text-gray-700">取引ID</label>
                  <p className="mt-1 text-gray-900">{showTransactionDetail.id}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">タイプ</label>
                  <p className="mt-1">
                    <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(showTransactionDetail.type)}`}>
                      {getTypeLabel(showTransactionDetail.type)}
                    </span>
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">ステータス</label>
                  <p className="mt-1">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(showTransactionDetail.status)}`}>
                      {getStatusText(showTransactionDetail.status)}
                    </span>
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">決済方法</label>
                  <p className="mt-1 text-gray-900">{showTransactionDetail.paymentMethod}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">金額</label>
                  <p className="mt-1 text-gray-900 font-semibold">
                    ¥{showTransactionDetail.amount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">手数料</label>
                  <p className="mt-1 text-gray-900">
                    ¥{Math.abs(showTransactionDetail.fee).toLocaleString()}
                  </p>
                </div>
              </div>

              {showTransactionDetail.stripeId && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Stripe ID</label>
                  <p className="mt-1 text-gray-900 font-mono text-sm">{showTransactionDetail.stripeId}</p>
                </div>
              )}

              {showTransactionDetail.bankInfo && (
                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">振込先情報</label>
                  <div className="text-sm text-gray-900">
                    <p>銀行: {showTransactionDetail.bankInfo.bank}</p>
                    <p>支店: {showTransactionDetail.bankInfo.branch}</p>
                    <p>口座番号: {showTransactionDetail.bankInfo.accountNumber}</p>
                  </div>
                </div>
              )}

              {showTransactionDetail.failureReason && (
                <div className="mb-4 p-4 bg-red-50 rounded-lg">
                  <label className="block text-sm font-medium text-red-900">失敗理由</label>
                  <p className="mt-1 text-red-700">{showTransactionDetail.failureReason}</p>
                </div>
              )}

              <div className="flex gap-3">
                {showTransactionDetail.status === 'pending' && (
                  <>
                    <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                      処理を承認
                    </button>
                    <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                      処理を却下
                    </button>
                  </>
                )}
                <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
                  Stripe管理画面
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}