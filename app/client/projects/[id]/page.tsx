'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ClientProjectDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'applicants' | 'messages' | 'files'>('overview')
  
  // 仮のプロジェクトデータ
  const [project] = useState({
    id: params.id,
    title: 'YouTubeチャンネルのオープニングテーマ制作',
    type: 'competition', // competition or direct
    status: 'recruiting', // draft, recruiting, in_progress, reviewing, completed, cancelled
    category: 'music_production',
    budget: 50000,
    deadline: '2024-03-01',
    createdAt: '2024-02-10',
    description: `
      YouTubeチャンネル用のオープニングテーマを制作していただきたいです。
      
      【詳細】
      - 長さ: 15秒程度
      - ジャンル: ポップス、明るい雰囲気
      - 使用用途: YouTube動画のオープニング
      - 納品形式: WAV形式（48kHz/24bit）
      
      【参考楽曲】
      - Official髭男dism「Pretender」のような爽やかな感じ
      - YOASOBI「夜に駆ける」のようなキャッチーさ
      
      【その他】
      - 著作権は買い取りでお願いします
      - 修正は2回まで対応お願いします
    `,
    requirements: [
      'DAWソフトを使用した制作経験',
      'ポップス楽曲の制作実績',
      'WAV形式での納品が可能',
      '著作権譲渡に同意いただける方'
    ],
    tags: ['ポップス', 'YouTube', 'オープニング', '15秒'],
    applicantCount: 8,
    viewCount: 234,
    favoriteCount: 12,
    
    // 選ばれたクリエーター（進行中の場合）
    selectedCreator: null,
    
    // マイルストーン
    milestones: [
      { id: 1, name: '契約締結', status: 'pending', date: null },
      { id: 2, name: 'デモ提出', status: 'pending', date: null },
      { id: 3, name: '初稿提出', status: 'pending', date: null },
      { id: 4, name: '修正対応', status: 'pending', date: null },
      { id: 5, name: '納品完了', status: 'pending', date: null }
    ],
    
    // ファイル
    attachments: [
      { id: 1, name: '参考音源.mp3', size: '3.2MB', type: 'audio', uploadedAt: '2024-02-10' },
      { id: 2, name: 'チャンネル概要.pdf', size: '1.5MB', type: 'document', uploadedAt: '2024-02-10' }
    ]
  })

  // 応募者データ
  const [applicants] = useState([
    {
      id: 'app-001',
      creatorId: 'creator-001',
      name: '山田太郎',
      avatar: null,
      title: 'プロ作曲家・アレンジャー',
      rating: 4.8,
      completedProjects: 45,
      proposedPrice: 45000,
      message: '明るくキャッチーな楽曲制作が得意です。YouTubeのOP制作経験も豊富です。',
      portfolio: ['sample1.mp3', 'sample2.mp3'],
      appliedAt: '2024-02-11 10:30',
      status: 'pending' // pending, shortlisted, rejected, selected
    },
    {
      id: 'app-002',
      creatorId: 'creator-002',
      name: '佐藤花子',
      avatar: null,
      title: 'フリーランス作曲家',
      rating: 4.9,
      completedProjects: 67,
      proposedPrice: 50000,
      message: 'ご要望に沿った楽曲を制作いたします。修正も柔軟に対応可能です。',
      portfolio: ['sample3.mp3'],
      appliedAt: '2024-02-11 14:20',
      status: 'shortlisted'
    }
  ])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">下書き</span>
      case 'recruiting':
        return <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">募集中</span>
      case 'in_progress':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">進行中</span>
      case 'reviewing':
        return <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">検収中</span>
      case 'completed':
        return <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">完了</span>
      case 'cancelled':
        return <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">キャンセル</span>
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* パンくず */}
        <div className="mb-6 text-sm">
          <Link href="/client/dashboard" className="text-gray-600 hover:text-orange-500">
            ダッシュボード
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/client/projects" className="text-gray-600 hover:text-orange-500">
            案件管理
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900">{project.title}</span>
        </div>

        {/* ヘッダー */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {getStatusBadge(project.status)}
                <span className="text-xs text-gray-500">ID: {project.id}</span>
                <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">
                  {project.type === 'competition' ? 'コンペ形式' : '指名形式'}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {project.title}
              </h1>
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <span>💰 予算: ¥{project.budget.toLocaleString()}</span>
                <span>📅 納期: {project.deadline}</span>
                <span>👥 応募: {project.applicantCount}件</span>
                <span>👁 閲覧: {project.viewCount}回</span>
                <span>⭐ お気に入り: {project.favoriteCount}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                編集
              </button>
              {project.status === 'recruiting' && (
                <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                  募集停止
                </button>
              )}
            </div>
          </div>

          {/* タブ */}
          <div className="border-t pt-4">
            <nav className="flex gap-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`pb-2 font-medium transition ${
                  activeTab === 'overview'
                    ? 'text-orange-500 border-b-2 border-orange-500'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                概要
              </button>
              <button
                onClick={() => setActiveTab('applicants')}
                className={`pb-2 font-medium transition relative ${
                  activeTab === 'applicants'
                    ? 'text-orange-500 border-b-2 border-orange-500'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                応募者
                {project.applicantCount > 0 && (
                  <span className="ml-2 px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded-full">
                    {project.applicantCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('messages')}
                className={`pb-2 font-medium transition ${
                  activeTab === 'messages'
                    ? 'text-orange-500 border-b-2 border-orange-500'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                メッセージ
              </button>
              <button
                onClick={() => setActiveTab('files')}
                className={`pb-2 font-medium transition ${
                  activeTab === 'files'
                    ? 'text-orange-500 border-b-2 border-orange-500'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                ファイル
              </button>
            </nav>
          </div>
        </div>

        {/* コンテンツ */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* 詳細説明 */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">案件詳細</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="whitespace-pre-line text-gray-700">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* 必要スキル */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">必要スキル・条件</h2>
                <ul className="space-y-2">
                  {project.requirements.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 添付ファイル */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">添付ファイル</h2>
                <div className="space-y-2">
                  {project.attachments.map(file => (
                    <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                          {file.type === 'audio' ? (
                            <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-5L9 2H4z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{file.name}</div>
                          <div className="text-xs text-gray-500">{file.size} • {file.uploadedAt}</div>
                        </div>
                      </div>
                      <button className="px-3 py-1 text-sm text-orange-600 hover:text-orange-700">
                        ダウンロード
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* マイルストーン */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">進捗状況</h2>
                <div className="space-y-3">
                  {project.milestones.map((milestone, index) => (
                    <div key={milestone.id} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                        milestone.status === 'completed'
                          ? 'bg-green-500 text-white'
                          : milestone.status === 'in_progress'
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {milestone.status === 'completed' ? (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <span className="text-xs font-bold">{index + 1}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className={`text-sm ${
                          milestone.status === 'completed' ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          {milestone.name}
                        </div>
                        {milestone.date && (
                          <div className="text-xs text-gray-400">{milestone.date}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* タグ */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">タグ</h2>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-orange-100 text-orange-700 text-sm rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* アクション */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">アクション</h2>
                <div className="space-y-2">
                  <Link
                    href={`/client/projects/${project.id}/applicants`}
                    className="block w-full px-4 py-2 bg-orange-500 text-white text-center rounded-lg hover:bg-orange-600 transition"
                  >
                    応募者を確認
                  </Link>
                  <button className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                    案件を複製
                  </button>
                  <button className="w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition">
                    案件を削除
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'applicants' && (
          <div className="space-y-4">
            {applicants.map(applicant => (
              <div key={applicant.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-4">
                      {applicant.avatar ? (
                        <img src={applicant.avatar} alt="" className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <span className="text-gray-600 font-medium">{applicant.name[0]}</span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{applicant.name}</h3>
                      <p className="text-sm text-gray-600">{applicant.title}</p>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                        <span className="flex items-center">
                          ⭐ {applicant.rating}
                        </span>
                        <span>{applicant.completedProjects}件完了</span>
                        <span className="text-orange-600 font-semibold">
                          ¥{applicant.proposedPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  {applicant.status === 'shortlisted' && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                      候補
                    </span>
                  )}
                </div>
                <p className="mt-4 text-gray-700">{applicant.message}</p>
                <div className="mt-4 flex gap-2">
                  <Link
                    href={`/creators/${applicant.creatorId}`}
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                  >
                    プロフィール確認
                  </Link>
                  <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                    メッセージ
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}