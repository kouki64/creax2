'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function MentorshipPage() {
  const [activeTab, setActiveTab] = useState<'find' | 'my-mentor' | 'my-students'>('find')
  const [showApplicationModal, setShowApplicationModal] = useState(false)
  const [selectedMentor, setSelectedMentor] = useState<any>(null)
  
  // メンターデータ
  const [mentors] = useState([
    {
      id: 'mentor-001',
      name: '山田太郎',
      title: 'プロアレンジャー',
      rating: 4.9,
      students: 12,
      specialties: ['ポップス', 'ロック', 'EDM'],
      experience: '10年',
      monthlyFee: 5000,
      description: '初心者からプロまで、あなたのレベルに合わせて指導します。',
      achievements: [
        '指導実績50名以上',
        'メジャーアーティスト楽曲提供',
        '音楽理論書出版'
      ],
      currentStudents: 8,
      maxStudents: 10,
      responseTime: '24時間以内',
      style: 'hands-on'
    },
    {
      id: 'mentor-002',
      name: '佐藤花子',
      title: 'サウンドエンジニア',
      rating: 4.8,
      students: 8,
      specialties: ['ミキシング', 'マスタリング', '音響'],
      experience: '8年',
      monthlyFee: 3000,
      description: 'プロの現場で培った技術を丁寧にお教えします。',
      achievements: [
        'グラミー賞ノミネート作品参加',
        '大手スタジオ勤務経験',
        'Pro Tools認定資格'
      ],
      currentStudents: 5,
      maxStudents: 8,
      responseTime: '48時間以内',
      style: 'theory-based'
    }
  ])

  // 自分のメンター情報
  const [myMentor] = useState({
    id: 'mentor-001',
    name: '山田太郎',
    joinedDate: '2024-01-15',
    sessionsCompleted: 8,
    nextSession: '2024-02-20 20:00',
    progress: 65
  })

  // 自分の弟子情報（メンターの場合）
  const [myStudents] = useState([
    {
      id: 'student-001',
      name: '田中次郎',
      level: '初級',
      joinedDate: '2024-02-01',
      progress: 30,
      lastActivity: '2日前'
    },
    {
      id: 'student-002',
      name: '伊藤美咲',
      level: '中級',
      joinedDate: '2024-01-20',
      progress: 60,
      lastActivity: '1時間前'
    }
  ])

  const applyForMentor = (mentor: any) => {
    setSelectedMentor(mentor)
    setShowApplicationModal(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">メンターシップ</h1>
          <p className="text-gray-600 mt-1">スキルアップのための師弟関係を築こう</p>
        </div>
      </header>

      {/* タブナビゲーション */}
      <div className="max-w-7xl mx-auto px-4 mt-6">
        <div className="bg-white rounded-lg shadow">
          <div className="border-b">
            <div className="flex">
              <button
                onClick={() => setActiveTab('find')}
                className={`px-6 py-3 font-medium ${
                  activeTab === 'find'
                    ? 'text-[#ff6232] border-b-2 border-[#ff6232]'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                メンターを探す
              </button>
              <button
                onClick={() => setActiveTab('my-mentor')}
                className={`px-6 py-3 font-medium ${
                  activeTab === 'my-mentor'
                    ? 'text-[#ff6232] border-b-2 border-[#ff6232]'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                マイメンター
              </button>
              <button
                onClick={() => setActiveTab('my-students')}
                className={`px-6 py-3 font-medium ${
                  activeTab === 'my-students'
                    ? 'text-[#ff6232] border-b-2 border-[#ff6232]'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                マイ弟子
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* メンターを探す */}
            {activeTab === 'find' && (
              <div>
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2">推奨メンター</h2>
                  <p className="text-gray-600 text-sm">あなたのスキルレベルに最適なメンターです</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {mentors.map(mentor => (
                    <div key={mentor.id} className="border rounded-lg p-6 hover:shadow-lg transition">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{mentor.name}</h3>
                          <p className="text-gray-600">{mentor.title}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center">
                            <span className="text-yellow-500 mr-1">⭐</span>
                            <span className="font-semibold">{mentor.rating}</span>
                          </div>
                          <p className="text-sm text-gray-500">弟子 {mentor.students}名</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-gray-700 mb-3">{mentor.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {mentor.specialties.map((specialty, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                              {specialty}
                            </span>
                          ))}
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">経験年数</span>
                            <span className="font-medium">{mentor.experience}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">募集状況</span>
                            <span className="font-medium text-green-600">
                              {mentor.currentStudents}/{mentor.maxStudents}名
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">返信時間</span>
                            <span className="font-medium">{mentor.responseTime}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">月額料金</span>
                            <span className="font-bold text-[#ff6232]">
                              ¥{mentor.monthlyFee.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <h4 className="font-semibold text-sm mb-2">実績</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {mentor.achievements.map((achievement, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-green-500 mr-2">✓</span>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button
                        onClick={() => applyForMentor(mentor)}
                        className="w-full mt-4 px-4 py-2 bg-[#ff6232] text-white rounded-lg hover:bg-[#e5562c] transition"
                      >
                        弟子に応募する
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* マイメンター */}
            {activeTab === 'my-mentor' && myMentor && (
              <div>
                <div className="bg-gradient-to-r from-[#ff6232] to-[#ff8a5c] rounded-lg p-6 text-white mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2">現在のメンター</h3>
                      <p className="text-2xl font-bold">{myMentor.name}</p>
                      <p className="opacity-90">師事開始: {myMentor.joinedDate}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm opacity-90">完了セッション</p>
                      <p className="text-3xl font-bold">{myMentor.sessionsCompleted}回</p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* 学習進捗 */}
                  <div className="bg-white rounded-lg border p-6">
                    <h4 className="font-semibold mb-4">学習進捗</h4>
                    <div className="mb-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600">全体進捗</span>
                        <span className="text-sm font-medium">{myMentor.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-[#ff6232] to-[#ff8a5c] h-2 rounded-full"
                          style={{ width: `${myMentor.progress}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">音楽理論</p>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '80%' }} />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">アレンジ技術</p>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '60%' }} />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">DAW操作</p>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: '70%' }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 次回セッション */}
                  <div className="bg-white rounded-lg border p-6">
                    <h4 className="font-semibold mb-4">次回セッション</h4>
                    <div className="bg-orange-50 rounded-lg p-4 mb-4">
                      <p className="text-[#ff6232] font-semibold">
                        {myMentor.nextSession}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        テーマ: コード進行の応用
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <button className="w-full px-4 py-2 bg-[#ff6232] text-white rounded-lg hover:bg-[#e5562c]">
                        セッションに参加
                      </button>
                      <button className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        スケジュール変更
                      </button>
                      <button className="w-full px-4 py-2 text-gray-600 hover:text-gray-900">
                        過去のセッションを見る
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* マイ弟子 */}
            {activeTab === 'my-students' && (
              <div>
                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-blue-900">
                    <span className="font-semibold">メンター認定済み</span> - あなたは{myStudents.length}名の弟子を指導中です
                  </p>
                </div>

                <div className="space-y-4">
                  {myStudents.map(student => (
                    <div key={student.id} className="bg-white border rounded-lg p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-bold text-lg">{student.name}</h3>
                          <p className="text-gray-600">レベル: {student.level}</p>
                          <p className="text-sm text-gray-500">開始日: {student.joinedDate}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">進捗</p>
                          <p className="text-2xl font-bold text-[#ff6232]">{student.progress}%</p>
                          <p className="text-xs text-gray-500">最終活動: {student.lastActivity}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex gap-2">
                        <button className="px-4 py-2 bg-[#ff6232] text-white rounded-lg hover:bg-[#e5562c] text-sm">
                          メッセージ送信
                        </button>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                          課題を出す
                        </button>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                          進捗確認
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <p className="text-gray-600 mb-2">新しい弟子を募集しますか？</p>
                  <button className="px-6 py-2 bg-[#ff6232] text-white rounded-lg hover:bg-[#e5562c]">
                    募集設定を編集
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 応募モーダル */}
      {showApplicationModal && selectedMentor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">弟子応募フォーム</h3>
            <p className="text-gray-600 mb-4">
              {selectedMentor.name}さんへの弟子応募
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  現在のスキルレベル
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option>初心者</option>
                  <option>初級</option>
                  <option>中級</option>
                  <option>上級</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  学びたいこと
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  rows={4}
                  placeholder="具体的に学びたいことを記入してください"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  自己紹介
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  rows={3}
                  placeholder="音楽経験など"
                />
              </div>
            </div>
            
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowApplicationModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                キャンセル
              </button>
              <button
                onClick={() => {
                  alert('応募を送信しました！')
                  setShowApplicationModal(false)
                }}
                className="flex-1 px-4 py-2 bg-[#ff6232] text-white rounded-lg hover:bg-[#e5562c]"
              >
                応募する
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}