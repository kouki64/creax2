'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function AdminSNSManagementPage() {
  const [activeTab, setActiveTab] = useState<'mvp' | 'mentorship' | 'notes'>('mvp')
  
  // MVP管理データ
  const [mvpData] = useState({
    currentWeek: '2024年2月第3週',
    autoSelected: [
      { category: '最多納品賞', winner: '山田太郎', count: '12件', status: 'confirmed' },
      { category: '最高評価賞', winner: '佐藤花子', rating: '5.0', status: 'pending' },
      { category: '新人賞', winner: '鈴木一郎', achievement: '初案件高評価', status: 'confirmed' },
      { category: 'コラボ王', winner: '田中美咲', collaborations: '8名', status: 'confirmed' },
      { category: 'スピード納品賞', winner: '高橋健太', time: '18時間', status: 'pending' },
      { category: 'クライアント選出賞', winner: '伊藤真理', votes: '234票', status: 'confirmed' }
    ],
    hallOfFame: [
      { name: '山田太郎', totalAwards: 15, joinedDate: '2023-06-01' },
      { name: '佐藤花子', totalAwards: 12, joinedDate: '2023-08-15' },
      { name: '鈴木一郎', totalAwards: 8, joinedDate: '2023-10-01' }
    ]
  })

  // メンターシップ管理データ
  const [mentorshipData] = useState({
    pendingApplications: [
      {
        id: 'app-001',
        mentorName: '山田太郎',
        applicantName: '新人A',
        appliedDate: '2024-02-14',
        experience: '5年',
        portfolio: 'あり',
        status: 'pending'
      },
      {
        id: 'app-002',
        mentorName: '佐藤花子',
        applicantName: '新人B',
        appliedDate: '2024-02-13',
        experience: '3年',
        portfolio: 'あり',
        status: 'pending'
      }
    ],
    activeMentorships: [
      { mentorName: '山田太郎', students: 8, maxStudents: 10, monthlyRevenue: 40000 },
      { mentorName: '佐藤花子', students: 5, maxStudents: 8, monthlyRevenue: 15000 },
      { mentorName: '田中次郎', students: 3, maxStudents: 5, monthlyRevenue: 12000 }
    ],
    reportedIssues: [
      {
        id: 'issue-001',
        type: 'payment',
        mentor: '高橋健太',
        student: '学生C',
        issue: '月額料金の未払い',
        reportedDate: '2024-02-10',
        status: 'investigating'
      }
    ]
  })

  // 制作後記管理データ
  const [notesData] = useState({
    pendingReview: [
      {
        id: 'note-004',
        title: '初心者でもできるミキシングのコツ',
        author: '新人クリエーター',
        submittedDate: '2024-02-15 10:00',
        category: 'ミキシング',
        status: 'pending'
      }
    ],
    featuredNotes: [
      {
        id: 'note-001',
        title: '80年代シンセポップ風OPテーマの制作秘話',
        author: '山田太郎',
        views: 1234,
        likes: 234,
        helpful: 189,
        featured: true
      },
      {
        id: 'note-003',
        title: '15秒で印象に残るメロディーを作る方法',
        author: '鈴木一郎',
        views: 2456,
        likes: 312,
        helpful: 298,
        featured: true
      }
    ],
    reportedNotes: [
      {
        id: 'note-005',
        title: '問題のある投稿',
        author: '問題ユーザー',
        reportReason: '著作権侵害の疑い',
        reportedBy: '他のクリエーター',
        reportedDate: '2024-02-14',
        status: 'under_review'
      }
    ],
    statistics: {
      totalNotes: 156,
      thisWeek: 23,
      totalViews: 45678,
      avgEngagement: '18.5%'
    }
  })

  const handleMVPConfirm = (category: string) => {
    alert(`${category}のMVPを確定しました`)
  }

  const handleMentorApprove = (id: string) => {
    alert(`メンター申請ID: ${id}を承認しました`)
  }

  const handleNoteFeature = (id: string) => {
    alert(`記事ID: ${id}を注目記事に設定しました`)
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
              <h1 className="text-2xl font-bold text-gray-900">SNS機能管理</h1>
            </div>
            <button className="px-4 py-2 bg-[#ff6232] text-white rounded-lg hover:bg-[#e5562c]">
              レポート出力
            </button>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* タブナビゲーション */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b">
            <div className="flex">
              <button
                onClick={() => setActiveTab('mvp')}
                className={`px-6 py-3 font-medium ${
                  activeTab === 'mvp'
                    ? 'text-[#ff6232] border-b-2 border-[#ff6232]'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                MVP管理
              </button>
              <button
                onClick={() => setActiveTab('mentorship')}
                className={`px-6 py-3 font-medium ${
                  activeTab === 'mentorship'
                    ? 'text-[#ff6232] border-b-2 border-[#ff6232]'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                メンター管理
              </button>
              <button
                onClick={() => setActiveTab('notes')}
                className={`px-6 py-3 font-medium ${
                  activeTab === 'notes'
                    ? 'text-[#ff6232] border-b-2 border-[#ff6232]'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                制作後記管理
              </button>
            </div>
          </div>
        </div>

        {/* MVP管理タブ */}
        {activeTab === 'mvp' && (
          <div className="space-y-6">
            {/* 今週のMVP選出状況 */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">今週のMVP選出状況</h2>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  {mvpData.currentWeek}
                </span>
              </div>
              
              <div className="space-y-3">
                {mvpData.autoSelected.map((mvp, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">
                        {index === 0 ? '🏆' : index === 1 ? '⭐' : index === 2 ? '🌟' : index === 3 ? '🤝' : index === 4 ? '⚡' : '❤️'}
                      </span>
                      <div>
                        <p className="font-semibold">{mvp.category}</p>
                        <p className="text-gray-600">
                          {mvp.winner} - {mvp.count || mvp.rating || mvp.achievement || mvp.collaborations || mvp.time || mvp.votes}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {mvp.status === 'pending' ? (
                        <>
                          <button
                            onClick={() => handleMVPConfirm(mvp.category)}
                            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                          >
                            確定
                          </button>
                          <button className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm">
                            変更
                          </button>
                        </>
                      ) : (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm">
                          確定済み
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 flex gap-3">
                <button className="px-4 py-2 bg-[#ff6232] text-white rounded-lg hover:bg-[#e5562c]">
                  全て確定して公開
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  手動で選出
                </button>
              </div>
            </div>

            {/* 殿堂入り管理 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">殿堂入りクリエーター</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">順位</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">名前</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">総受賞数</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">登録日</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">アクション</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {mvpData.hallOfFame.map((member, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2">
                          <span className="text-2xl">
                            {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                          </span>
                        </td>
                        <td className="px-4 py-2 font-medium">{member.name}</td>
                        <td className="px-4 py-2">{member.totalAwards}回</td>
                        <td className="px-4 py-2 text-gray-600">{member.joinedDate}</td>
                        <td className="px-4 py-2">
                          <button className="text-[#ff6232] hover:text-[#e5562c]">
                            詳細
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* メンター管理タブ */}
        {activeTab === 'mentorship' && (
          <div className="space-y-6">
            {/* 統計 */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white rounded-lg shadow p-4">
                <p className="text-sm text-gray-600">総メンター数</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <p className="text-sm text-gray-600">総弟子数</p>
                <p className="text-2xl font-bold text-blue-600">156</p>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <p className="text-sm text-gray-600">月間収益</p>
                <p className="text-2xl font-bold text-green-600">¥67,000</p>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <p className="text-sm text-gray-600">承認待ち</p>
                <p className="text-2xl font-bold text-orange-600">2</p>
              </div>
            </div>

            {/* メンター認定申請 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">メンター認定申請</h2>
              <div className="space-y-3">
                {mentorshipData.pendingApplications.map(app => (
                  <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-semibold">{app.applicantName}</p>
                      <p className="text-sm text-gray-600">
                        メンター: {app.mentorName} | 経験: {app.experience} | ポートフォリオ: {app.portfolio}
                      </p>
                      <p className="text-xs text-gray-500">申請日: {app.appliedDate}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleMentorApprove(app.id)}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        承認
                      </button>
                      <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                        却下
                      </button>
                      <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
                        詳細
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* アクティブなメンターシップ */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">アクティブなメンターシップ</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">メンター</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">弟子数</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">月間収益</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">状態</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">アクション</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {mentorshipData.activeMentorships.map((mentor, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 font-medium">{mentor.mentorName}</td>
                        <td className="px-4 py-2">
                          {mentor.students} / {mentor.maxStudents}名
                        </td>
                        <td className="px-4 py-2">¥{mentor.monthlyRevenue.toLocaleString()}</td>
                        <td className="px-4 py-2">
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                            アクティブ
                          </span>
                        </td>
                        <td className="px-4 py-2">
                          <button className="text-[#ff6232] hover:text-[#e5562c] mr-3">
                            詳細
                          </button>
                          <button className="text-gray-600 hover:text-gray-900">
                            編集
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 報告された問題 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">報告された問題</h2>
              <div className="space-y-3">
                {mentorshipData.reportedIssues.map(issue => (
                  <div key={issue.id} className="p-4 border border-red-200 bg-red-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-red-900">{issue.issue}</p>
                        <p className="text-sm text-red-700">
                          メンター: {issue.mentor} | 弟子: {issue.student}
                        </p>
                        <p className="text-xs text-red-600">報告日: {issue.reportedDate}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                          調査
                        </button>
                        <button className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600">
                          解決済み
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 制作後記管理タブ */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            {/* 統計 */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white rounded-lg shadow p-4">
                <p className="text-sm text-gray-600">総投稿数</p>
                <p className="text-2xl font-bold text-gray-900">{notesData.statistics.totalNotes}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <p className="text-sm text-gray-600">今週の投稿</p>
                <p className="text-2xl font-bold text-blue-600">{notesData.statistics.thisWeek}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <p className="text-sm text-gray-600">総閲覧数</p>
                <p className="text-2xl font-bold text-green-600">{notesData.statistics.totalViews.toLocaleString()}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <p className="text-sm text-gray-600">平均エンゲージメント</p>
                <p className="text-2xl font-bold text-purple-600">{notesData.statistics.avgEngagement}</p>
              </div>
            </div>

            {/* 承認待ちの投稿 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">承認待ちの投稿</h2>
              <div className="space-y-3">
                {notesData.pendingReview.map(note => (
                  <div key={note.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-semibold">{note.title}</p>
                      <p className="text-sm text-gray-600">
                        著者: {note.author} | カテゴリー: {note.category}
                      </p>
                      <p className="text-xs text-gray-500">投稿日時: {note.submittedDate}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">
                        承認
                      </button>
                      <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                        却下
                      </button>
                      <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
                        プレビュー
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 注目記事の管理 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">注目記事</h2>
              <div className="space-y-3">
                {notesData.featuredNotes.map(note => (
                  <div key={note.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-semibold">{note.title}</p>
                      <p className="text-sm text-gray-600">著者: {note.author}</p>
                      <div className="flex gap-4 mt-2 text-sm text-gray-500">
                        <span>👁 {note.views}</span>
                        <span>👍 {note.likes}</span>
                        <span>💡 {note.helpful}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {note.featured ? (
                        <button className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600">
                          注目を解除
                        </button>
                      ) : (
                        <button
                          onClick={() => handleNoteFeature(note.id)}
                          className="px-3 py-1 bg-[#ff6232] text-white rounded hover:bg-[#e5562c]"
                        >
                          注目に設定
                        </button>
                      )}
                      <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
                        編集
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 報告された投稿 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">報告された投稿</h2>
              <div className="space-y-3">
                {notesData.reportedNotes.map(note => (
                  <div key={note.id} className="p-4 border border-red-200 bg-red-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-red-900">{note.title}</p>
                        <p className="text-sm text-red-700">
                          著者: {note.author} | 理由: {note.reportReason}
                        </p>
                        <p className="text-xs text-red-600">
                          報告者: {note.reportedBy} | 報告日: {note.reportedDate}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                          削除
                        </button>
                        <button className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600">
                          却下
                        </button>
                        <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
                          確認
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* タグ管理 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">人気タグ管理</h2>
              <div className="flex flex-wrap gap-2">
                {['シンセポップ', 'ゲーム音楽', 'CM', 'ループ', 'メロディー', 'コード進行', 'DTM', 'ミキシング', 'マスタリング'].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {tag}
                    <button className="ml-2 text-red-500 hover:text-red-700">×</button>
                  </span>
                ))}
              </div>
              <button className="mt-4 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                タグを追加
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}