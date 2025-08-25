'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function AdvertiserCampaignsPage() {
  const [activeTab, setActiveTab] = useState<'active' | 'scheduled' | 'ended'>('active')
  const [showCreateModal, setShowCreateModal] = useState(false)
  
  const [campaigns] = useState([
    {
      id: 'AD-2024-001',
      name: '春の新曲リリースキャンペーン',
      type: 'banner',
      status: 'active',
      budget: 500000,
      spent: 234500,
      impressions: 1234567,
      clicks: 12345,
      ctr: 1.0,
      startDate: '2024-02-01',
      endDate: '2024-02-29',
      targeting: ['クリエーター', '18-34歳', '音楽制作'],
      creative: {
        image: null,
        title: '新曲「春風」リリース！',
        description: '人気アーティストの最新作'
      }
    },
    {
      id: 'AD-2024-002',
      name: 'レコーディングスタジオ割引キャンペーン',
      type: 'native',
      status: 'active',
      budget: 300000,
      spent: 156000,
      impressions: 567890,
      clicks: 8901,
      ctr: 1.57,
      startDate: '2024-02-05',
      endDate: '2024-03-05',
      targeting: ['クリエーター', 'プロ', '東京'],
      creative: {
        image: null,
        title: '期間限定！スタジオ利用料30%OFF',
        description: 'プロ仕様の機材を特別価格で'
      }
    },
    {
      id: 'AD-2024-003',
      name: 'アーティスト募集広告',
      type: 'sponsored',
      status: 'scheduled',
      budget: 200000,
      spent: 0,
      impressions: 0,
      clicks: 0,
      ctr: 0,
      startDate: '2024-03-01',
      endDate: '2024-03-31',
      targeting: ['クリエーター', 'アマチュア', '全国'],
      creative: {
        image: null,
        title: '新レーベル所属アーティスト募集',
        description: 'あなたの才能を世界へ'
      }
    }
  ])

  const filteredCampaigns = campaigns.filter(campaign => {
    if (activeTab === 'active') return campaign.status === 'active'
    if (activeTab === 'scheduled') return campaign.status === 'scheduled'
    if (activeTab === 'ended') return campaign.status === 'ended'
    return true
  })

  const totalStats = {
    totalBudget: campaigns.reduce((sum, c) => sum + c.budget, 0),
    totalSpent: campaigns.reduce((sum, c) => sum + c.spent, 0),
    totalImpressions: campaigns.reduce((sum, c) => sum + c.impressions, 0),
    totalClicks: campaigns.reduce((sum, c) => sum + c.clicks, 0),
    avgCTR: campaigns.reduce((sum, c) => sum + c.ctr, 0) / campaigns.length
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              広告キャンペーン管理
            </h1>
            <p className="text-gray-600">
              Creaxで効果的な広告を配信
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            新規キャンペーン作成
          </button>
        </div>

        {/* 統計サマリー */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm mb-1">総予算</div>
            <div className="text-2xl font-bold text-gray-900">
              ¥{totalStats.totalBudget.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 mt-1">今月</div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm mb-1">消化額</div>
            <div className="text-2xl font-bold text-orange-600">
              ¥{totalStats.totalSpent.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {((totalStats.totalSpent / totalStats.totalBudget) * 100).toFixed(1)}%
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm mb-1">インプレッション</div>
            <div className="text-2xl font-bold text-gray-900">
              {(totalStats.totalImpressions / 1000000).toFixed(1)}M
            </div>
            <div className="text-xs text-gray-500 mt-1">表示回数</div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm mb-1">クリック数</div>
            <div className="text-2xl font-bold text-gray-900">
              {(totalStats.totalClicks / 1000).toFixed(1)}K
            </div>
            <div className="text-xs text-green-600 mt-1">↑ 12.3%</div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm mb-1">平均CTR</div>
            <div className="text-2xl font-bold text-blue-600">
              {totalStats.avgCTR.toFixed(2)}%
            </div>
            <div className="text-xs text-gray-500 mt-1">クリック率</div>
          </div>
        </div>

        {/* タブ */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b">
            <div className="flex">
              <button
                onClick={() => setActiveTab('active')}
                className={`px-6 py-3 font-medium transition ${
                  activeTab === 'active'
                    ? 'text-orange-600 border-b-2 border-orange-600'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                配信中 ({campaigns.filter(c => c.status === 'active').length})
              </button>
              <button
                onClick={() => setActiveTab('scheduled')}
                className={`px-6 py-3 font-medium transition ${
                  activeTab === 'scheduled'
                    ? 'text-orange-600 border-b-2 border-orange-600'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                予約済み ({campaigns.filter(c => c.status === 'scheduled').length})
              </button>
              <button
                onClick={() => setActiveTab('ended')}
                className={`px-6 py-3 font-medium transition ${
                  activeTab === 'ended'
                    ? 'text-orange-600 border-b-2 border-orange-600'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                終了 ({campaigns.filter(c => c.status === 'ended').length})
              </button>
            </div>
          </div>
        </div>

        {/* キャンペーン一覧 */}
        <div className="space-y-4">
          {filteredCampaigns.map(campaign => (
            <div key={campaign.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {campaign.status === 'active' && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">配信中</span>
                      )}
                      {campaign.status === 'scheduled' && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">予約済み</span>
                      )}
                      {campaign.status === 'ended' && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">終了</span>
                      )}
                      <span className="text-xs text-gray-500">ID: {campaign.id}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {campaign.name}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>📅 {campaign.startDate} 〜 {campaign.endDate}</span>
                      <span className="px-2 py-0.5 bg-gray-100 rounded">
                        {campaign.type === 'banner' && 'バナー広告'}
                        {campaign.type === 'native' && 'ネイティブ広告'}
                        {campaign.type === 'sponsored' && 'スポンサード'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* パフォーマンス指標 */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                  <div>
                    <div className="text-xs text-gray-500">予算</div>
                    <div className="font-semibold">¥{campaign.budget.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">消化額</div>
                    <div className="font-semibold text-orange-600">
                      ¥{campaign.spent.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      ({((campaign.spent / campaign.budget) * 100).toFixed(0)}%)
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">インプレッション</div>
                    <div className="font-semibold">
                      {campaign.impressions > 1000000 
                        ? `${(campaign.impressions / 1000000).toFixed(1)}M`
                        : campaign.impressions.toLocaleString()
                      }
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">クリック数</div>
                    <div className="font-semibold">
                      {campaign.clicks.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">CTR</div>
                    <div className="font-semibold text-blue-600">
                      {campaign.ctr}%
                    </div>
                  </div>
                </div>

                {/* 予算消化バー */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">予算消化状況</span>
                    <span className="font-medium">
                      {((campaign.spent / campaign.budget) * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full"
                      style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                    />
                  </div>
                </div>

                {/* ターゲティング */}
                <div className="mb-4">
                  <div className="text-sm text-gray-600 mb-2">ターゲティング</div>
                  <div className="flex flex-wrap gap-2">
                    {campaign.targeting.map((target, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                        {target}
                      </span>
                    ))}
                  </div>
                </div>

                {/* クリエイティブプレビュー */}
                <div className="p-4 bg-gray-50 rounded-lg mb-4">
                  <div className="text-sm text-gray-600 mb-2">クリエイティブ</div>
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 bg-gray-300 rounded flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{campaign.creative.title}</h4>
                      <p className="text-sm text-gray-600">{campaign.creative.description}</p>
                    </div>
                  </div>
                </div>

                {/* アクションボタン */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex gap-2">
                    {campaign.status === 'active' && (
                      <button className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition">
                        一時停止
                      </button>
                    )}
                    {campaign.status === 'scheduled' && (
                      <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition">
                        今すぐ開始
                      </button>
                    )}
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition">
                      編集
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
                      レポート
                    </button>
                    <button className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition">
                      詳細を見る
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCampaigns.length === 0 && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 16h4m10 0h4" />
            </svg>
            <p className="text-gray-500 mb-4">
              {activeTab === 'active' && '配信中のキャンペーンはありません'}
              {activeTab === 'scheduled' && '予約済みのキャンペーンはありません'}
              {activeTab === 'ended' && '終了したキャンペーンはありません'}
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition"
            >
              キャンペーンを作成
            </button>
          </div>
        )}
      </div>

      {/* 新規作成モーダル（簡易版） */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4">
            <h2 className="text-2xl font-bold mb-6">新規キャンペーン作成</h2>
            <p className="text-gray-600 mb-6">
              広告キャンペーンの詳細設定画面は開発中です...
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}