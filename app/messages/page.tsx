'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function MessagesPage() {
  const [selectedTab, setSelectedTab] = useState<'all' | 'unread' | 'starred'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  
  const [conversations] = useState([
    {
      id: 'msg-001',
      projectId: 'PRJ-001',
      projectTitle: 'YouTubeチャンネルのオープニングテーマ制作',
      otherUser: {
        name: '株式会社クリエイティブ',
        avatar: null,
        isOnline: true,
        type: 'client'
      },
      lastMessage: {
        content: 'デモ音源ありがとうございます！社内で確認させていただきます。',
        timestamp: '2024-02-10 15:30',
        isRead: false,
        sender: 'other'
      },
      unreadCount: 2,
      isStarred: true,
      status: 'active'
    },
    {
      id: 'msg-002',
      projectId: 'PRJ-002',
      projectTitle: 'CM音楽のミキシング',
      otherUser: {
        name: '田中太郎',
        avatar: null,
        isOnline: false,
        type: 'creator'
      },
      lastMessage: {
        content: '修正版をアップロードしました。ご確認をお願いします。',
        timestamp: '2024-02-10 12:15',
        isRead: true,
        sender: 'me'
      },
      unreadCount: 0,
      isStarred: false,
      status: 'active'
    },
    {
      id: 'msg-003',
      projectId: 'PRJ-003',
      projectTitle: 'ポッドキャスト用ジングル制作',
      otherUser: {
        name: '山田花子',
        avatar: null,
        isOnline: true,
        type: 'client'
      },
      lastMessage: {
        content: '了解しました！明日までに仕上げます。',
        timestamp: '2024-02-09 18:45',
        isRead: true,
        sender: 'me'
      },
      unreadCount: 0,
      isStarred: false,
      status: 'active'
    },
    {
      id: 'msg-004',
      projectId: 'PRJ-004',
      projectTitle: 'ゲームBGM制作（バトルシーン）',
      otherUser: {
        name: 'ゲームスタジオXYZ',
        avatar: null,
        isOnline: false,
        type: 'client'
      },
      lastMessage: {
        content: 'プロジェクトが完了しました。ありがとうございました！',
        timestamp: '2024-02-08 10:00',
        isRead: true,
        sender: 'other'
      },
      unreadCount: 0,
      isStarred: false,
      status: 'completed'
    }
  ])

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          conv.otherUser.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          conv.lastMessage.content.toLowerCase().includes(searchQuery.toLowerCase())
    
    if (selectedTab === 'unread') {
      return matchesSearch && conv.unreadCount > 0
    }
    if (selectedTab === 'starred') {
      return matchesSearch && conv.isStarred
    }
    return matchesSearch
  })

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* ヘッダー */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              メッセージ
            </h1>
            <p className="text-gray-600">
              プロジェクトに関するコミュニケーション
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* 左サイドバー：会話リスト */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow">
                {/* 検索バー */}
                <div className="p-4 border-b">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="メッセージを検索..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                    <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>

                {/* タブ */}
                <div className="flex border-b">
                  <button
                    onClick={() => setSelectedTab('all')}
                    className={`flex-1 px-4 py-3 text-sm font-medium transition ${
                      selectedTab === 'all'
                        ? 'text-orange-600 border-b-2 border-orange-600'
                        : 'text-gray-700 hover:text-gray-900'
                    }`}
                  >
                    すべて
                  </button>
                  <button
                    onClick={() => setSelectedTab('unread')}
                    className={`flex-1 px-4 py-3 text-sm font-medium transition relative ${
                      selectedTab === 'unread'
                        ? 'text-orange-600 border-b-2 border-orange-600'
                        : 'text-gray-700 hover:text-gray-900'
                    }`}
                  >
                    未読
                    {totalUnread > 0 && (
                      <span className="absolute top-2 right-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                        {totalUnread}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => setSelectedTab('starred')}
                    className={`flex-1 px-4 py-3 text-sm font-medium transition ${
                      selectedTab === 'starred'
                        ? 'text-orange-600 border-b-2 border-orange-600'
                        : 'text-gray-700 hover:text-gray-900'
                    }`}
                  >
                    スター
                  </button>
                </div>

                {/* 会話リスト */}
                <div className="max-h-[600px] overflow-y-auto">
                  {filteredConversations.length > 0 ? (
                    filteredConversations.map(conv => (
                      <Link
                        key={conv.id}
                        href={`/messages/${conv.id}`}
                        className={`block p-4 hover:bg-gray-50 transition ${
                          conv.unreadCount > 0 ? 'bg-orange-50' : ''
                        }`}
                      >
                        <div className="flex items-start">
                          <div className="relative mr-3">
                            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                              {conv.otherUser.avatar ? (
                                <img src={conv.otherUser.avatar} alt="" className="w-full h-full rounded-full object-cover" />
                              ) : (
                                <span className="text-gray-600 font-medium">
                                  {conv.otherUser.name[0]}
                                </span>
                              )}
                            </div>
                            {conv.otherUser.isOnline && (
                              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-1">
                              <h3 className={`font-medium truncate ${
                                conv.unreadCount > 0 ? 'text-gray-900' : 'text-gray-700'
                              }`}>
                                {conv.otherUser.name}
                              </h3>
                              <div className="flex items-center gap-1 ml-2">
                                {conv.isStarred && (
                                  <span className="text-yellow-500">★</span>
                                )}
                                {conv.unreadCount > 0 && (
                                  <span className="px-2 py-0.5 bg-orange-500 text-white text-xs rounded-full">
                                    {conv.unreadCount}
                                  </span>
                                )}
                              </div>
                            </div>
                            <p className="text-xs text-gray-500 truncate mb-1">
                              {conv.projectTitle}
                            </p>
                            <p className={`text-sm truncate ${
                              conv.unreadCount > 0 ? 'text-gray-900 font-medium' : 'text-gray-600'
                            }`}>
                              {conv.lastMessage.sender === 'me' && <span className="text-gray-400">あなた: </span>}
                              {conv.lastMessage.content}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {conv.lastMessage.timestamp}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="p-8 text-center text-gray-500">
                      <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <p>メッセージがありません</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 右側：選択促進メッセージ */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow h-full flex items-center justify-center p-8">
                <div className="text-center">
                  <svg className="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    メッセージを選択
                  </h2>
                  <p className="text-gray-600 mb-4">
                    左側のリストから会話を選択して、<br />
                    メッセージのやり取りを開始してください
                  </p>
                  
                  {/* クイックアクション */}
                  <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mt-8">
                    <Link
                      href="/jobs/search"
                      className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                    >
                      <svg className="w-8 h-8 text-orange-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm font-medium text-gray-700">案件を探す</p>
                    </Link>
                    <Link
                      href="/creators/search"
                      className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                    >
                      <svg className="w-8 h-8 text-orange-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <p className="text-sm font-medium text-gray-700">クリエーターを探す</p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}   