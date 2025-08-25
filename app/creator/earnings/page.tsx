'use client'

import { useState } from 'react'
import Link from 'next/link'

// 型定義を追加
type EarningItem = {
  id: number
  projectTitle: string
  client: string
  amount: number
  fee: number
  net: number
  status: string
  date: string
}

type MonthlyData = {
  [key: string]: EarningItem[]
}

export default function CreatorEarningsPage() {
  const [selectedMonth, setSelectedMonth] = useState('2024-02')
  const [viewMode, setViewMode] = useState<'summary' | 'detail'>('summary')
  
  // 収益データの構造を修正（型定義を追加）
  const [earnings] = useState<{
    totalBalance: number
    withdrawable: number
    pending: number
    thisMonth: number
    lastMonth: number
    monthlyData: MonthlyData
  }>({
    totalBalance: 156000,
    withdrawable: 125000,
    pending: 31000,
    thisMonth: 45000,
    lastMonth: 38000,
    // 型定義に合わせた月ごとのデータ
    monthlyData: {
      '2024-02': [
        { id: 1, projectTitle: 'YouTubeチャンネルOP制作', client: '株式会社A', amount: 50000, fee: 7500, net: 42500, status: 'paid', date: '2024-02-15' },
        { id: 2, projectTitle: 'ゲームBGM制作', client: 'ゲーム会社B', amount: 30000, fee: 4500, net: 25500, status: 'paid', date: '2024-02-10' },
        { id: 3, projectTitle: 'CM音楽制作', client: '広告代理店C', amount: 40000, fee: 6000, net: 34000, status: 'pending', date: '2024-02-20' }
      ],
      '2024-01': [
        { id: 4, projectTitle: 'ポッドキャストBGM', client: '配信者D', amount: 25000, fee: 3750, net: 21250, status: 'paid', date: '2024-01-25' },
        { id: 5, projectTitle: 'イベント音楽', client: 'イベント会社E', amount: 35000, fee: 5250, net: 29750, status: 'paid', date: '2024-01-15' }
      ],
      '2023-12': [] // 空データも追加
    }
  })

  // 選択された月のデータを取得（型安全に）
  const currentMonthData = earnings.monthlyData[selectedMonth] || []
  const totalGross = currentMonthData.reduce((sum, item) => sum + item.amount, 0)
  const totalFee = currentMonthData.reduce((sum, item) => sum + item.fee, 0)
  const totalNet = currentMonthData.reduce((sum, item) => sum + item.net, 0)

  // チャートデータ
  const chartData = [
    { month: '10月', amount: 28000 },
    { month: '11月', amount: 35000 },
    { month: '12月', amount: 42000 },
    { month: '1月', amount: 38000 },
    { month: '2月', amount: 45000 }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">収益管理</h1>
              <p className="text-sm text-gray-600 mt-1">収益の確認と出金申請</p>
            </div>
            <Link
              href="/creator/withdraw"
              className="px-4 py-2 bg-[#ff6232] text-white rounded-lg hover:bg-[#e5562c] transition"
            >
              出金申請
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 収益サマリー */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-2">総残高</p>
            <p className="text-3xl font-bold text-gray-900">¥{earnings.totalBalance.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-2">出金可能額</p>
            <p className="text-3xl font-bold text-green-600">¥{earnings.withdrawable.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-2">確定待ち</p>
            <p className="text-3xl font-bold text-yellow-600">¥{earnings.pending.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-2">今月の収益</p>
            <p className="text-3xl font-bold text-blue-600">¥{earnings.thisMonth.toLocaleString()}</p>
            <p className="text-sm text-gray-600 mt-1">
              前月比 {((earnings.thisMonth / earnings.lastMonth - 1) * 100).toFixed(0)}%↑
            </p>
          </div>
        </div>

        {/* 収益推移グラフ */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">収益推移</h2>
          <div className="h-64 flex items-end justify-between space-x-2">
            {chartData.map((data, index) => {
              const maxAmount = Math.max(...chartData.map(d => d.amount))
              const height = (data.amount / maxAmount) * 100
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-[#ff6232] rounded-t" style={{ height: `${height}%` }}></div>
                  <p className="text-xs mt-2">{data.month}</p>
                  <p className="text-xs font-semibold">¥{(data.amount / 1000)}k</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* 収益詳細 */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">収益詳細</h2>
              <div className="flex gap-4">
                {/* 月選択 */}
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6232] focus:border-[#ff6232]"
                >
                  <option value="2024-02">2024年2月</option>
                  <option value="2024-01">2024年1月</option>
                  <option value="2023-12">2023年12月</option>
                </select>
                {/* 表示切替 */}
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('summary')}
                    className={`px-3 py-1 rounded ${viewMode === 'summary' ? 'bg-white shadow' : ''}`}
                  >
                    サマリー
                  </button>
                  <button
                    onClick={() => setViewMode('detail')}
                    className={`px-3 py-1 rounded ${viewMode === 'detail' ? 'bg-white shadow' : ''}`}
                  >
                    詳細
                  </button>
                </div>
              </div>
            </div>
          </div>

          {viewMode === 'summary' ? (
            /* サマリービュー */
            <div className="p-6">
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600">総売上</p>
                  <p className="text-2xl font-bold">¥{totalGross.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">手数料（15%）</p>
                  <p className="text-2xl font-bold text-red-600">-¥{totalFee.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">手取り</p>
                  <p className="text-2xl font-bold text-green-600">¥{totalNet.toLocaleString()}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">カテゴリー別収益</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">アレンジ</span>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                        <div className="bg-[#ff6232] h-2 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                      <span className="font-semibold">¥60,000</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">作曲</span>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                        <div className="bg-[#ff6232] h-2 rounded-full" style={{ width: '30%' }}></div>
                      </div>
                      <span className="font-semibold">¥30,000</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">ミキシング</span>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                        <div className="bg-[#ff6232] h-2 rounded-full" style={{ width: '10%' }}></div>
                      </div>
                      <span className="font-semibold">¥10,000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* 詳細ビュー */
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      案件名
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      クライアント
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      日付
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      総額
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      手数料
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      手取り
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      状態
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentMonthData.map((item: EarningItem) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-sm font-medium text-gray-900">{item.projectTitle}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {item.client}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {item.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        ¥{item.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                        -¥{item.fee.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                        ¥{item.net.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          item.status === 'paid' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {item.status === 'paid' ? '確定' : '確定待ち'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* エクスポート */}
        <div className="mt-8 flex justify-center">
          <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
            CSVエクスポート
          </button>
        </div>
      </div>
    </div>
  )
}