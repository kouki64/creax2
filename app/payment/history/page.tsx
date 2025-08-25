'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function PaymentHistoryPage() {
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending' | 'failed'>('all')
  const [dateRange, setDateRange] = useState<'all' | 'month' | '3months' | 'year'>('all')
  
  const [transactions] = useState([
    {
      id: 'TXN-001234',
      orderId: 'ORD-2024-001234',
      date: '2024-02-10',
      project: 'YouTubeチャンネルのオープニングテーマ制作',
      creator: '山田太郎',
      amount: 57500,
      method: 'クレジットカード',
      status: 'completed',
      invoice: true
    },
    {
      id: 'TXN-001233',
      orderId: 'ORD-2024-001233',
      date: '2024-02-05',
      project: 'ポッドキャスト用ジングル制作',
      creator: '鈴木花子',
      amount: 25000,
      method: 'PayPay',
      status: 'completed',
      invoice: true
    },
    {
      id: 'TXN-001232',
      orderId: 'ORD-2024-001232',
      date: '2024-02-01',
      project: 'CM音楽のアレンジ',
      creator: '田中次郎',
      amount: 35000,
      method: 'コンビニ決済',
      status: 'pending',
      invoice: false
    },
    {
      id: 'TXN-001231',
      orderId: 'ORD-2024-001231',
      date: '2024-01-28',
      project: 'ゲームBGM制作（5曲）',
      creator: '佐藤美咲',
      amount: 150000,
      method: '銀行振込',
      status: 'completed',
      invoice: true
    },
    {
      id: 'TXN-001230',
      orderId: 'ORD-2024-001230',
      date: '2024-01-20',
      project: '店舗BGM制作',
      creator: '高橋健太',
      amount: 40000,
      method: 'クレジットカード',
      status: 'failed',
      invoice: false
    }
  ])

  const [summary] = useState({
    total: 307500,
    thisMonth: 117500,
    pending: 35000,
    failed: 40000
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">完了</span>
      case 'pending':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">処理中</span>
      case 'failed':
        return <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">失敗</span>
      default:
        return null
    }
  }

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'クレジットカード':
        return '💳'
      case 'PayPay':
        return '🔴'
      case 'コンビニ決済':
        return '🏪'
      case '銀行振込':
        return '🏦'
      default:
        return '💰'
    }
  }

  const filteredTransactions = transactions.filter(t => {
    if (filter !== 'all' && t.status !== filter) return false
    // 実際の日付フィルタリングロジックはここに追加
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            決済履歴
          </h1>
          <p className="text-gray-600">
            過去の取引履歴と請求書のダウンロード
          </p>
        </div>

        {/* サマリーカード */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">総支払額</div>
            <div className="text-2xl font-bold text-gray-900">
              ¥{summary.total.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 mt-1">全期間</div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">今月の支払い</div>
            <div className="text-2xl font-bold text-orange-600">
              ¥{summary.thisMonth.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 mt-1">2024年2月</div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">処理中</div>
            <div className="text-2xl font-bold text-yellow-600">
              ¥{summary.pending.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 mt-1">確認待ち</div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">失敗</div>
            <div className="text-2xl font-bold text-red-600">
              ¥{summary.failed.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 mt-1">要対応</div>
          </div>
        </div>

        {/* フィルター */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex gap-2">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="all">すべての状態</option>
                <option value="completed">完了</option>
                <option value="pending">処理中</option>
                <option value="failed">失敗</option>
              </select>
              
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="all">全期間</option>
                <option value="month">過去1ヶ月</option>
                <option value="3months">過去3ヶ月</option>
                <option value="year">過去1年</option>
              </select>
            </div>
            
            <div className="flex-1"></div>
            
            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">
              CSVダウンロード
            </button>
          </div>
        </div>

        {/* 取引リスト */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    取引ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    日付
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    プロジェクト
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    クリエーター
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    決済方法
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    金額
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    状態
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    アクション
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.map(transaction => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-mono text-sm">{transaction.id}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.date}
                    </td>
                    <td className="px-6 py-4">
                      <Link 
                        href={`/client/projects/${transaction.orderId}`}
                        className="text-sm text-gray-900 hover:text-orange-500 line-clamp-1"
                      >
                        {transaction.project}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link 
                        href={`/creators/${transaction.creator}`}
                        className="text-sm text-gray-900 hover:text-orange-500"
                      >
                        {transaction.creator}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">
                        <span className="mr-1">{getMethodIcon(transaction.method)}</span>
                        {transaction.method}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-gray-900">
                        ¥{transaction.amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(transaction.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex gap-2">
                        {transaction.invoice && (
                          <button className="text-orange-500 hover:text-orange-600">
                            請求書
                          </button>
                        )}
                        <Link 
                          href={`/payment/details/${transaction.id}`}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          詳細
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* ページネーション */}
          <div className="px-6 py-4 border-t">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                全 {filteredTransactions.length} 件
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50" disabled>
                  前へ
                </button>
                <button className="px-3 py-1 bg-orange-500 text-white rounded">1</button>
                <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">2</button>
                <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
                  次へ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}