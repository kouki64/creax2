'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

export default function MessageDetailPage({ params }: { params: { id: string } }) {
  const [message, setMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 仮のデータ
  const [conversation] = useState({
    id: params.id,
    projectId: 'PRJ-001',
    projectTitle: 'YouTubeチャンネルのオープニングテーマ制作',
    otherUser: {
      name: '株式会社クリエイティブ',
      avatar: null,
      isOnline: true,
      type: 'client'
    },
    status: 'active' // active, completed, cancelled
  })

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'other',
      content: 'こんにちは！YouTubeチャンネルのオープニングテーマ制作の件でご連絡しました。',
      timestamp: '2024-02-08 10:00',
      isRead: true
    },
    {
      id: 2,
      sender: 'me',
      content: 'お問い合わせありがとうございます！ぜひ詳細をお聞かせください。',
      timestamp: '2024-02-08 10:05',
      isRead: true
    },
    {
      id: 3,
      sender: 'other',
      content: '15秒程度のオープニングテーマを作っていただきたいです。明るくポップな感じで、若い世代に受けるような曲調をイメージしています。',
      timestamp: '2024-02-08 10:10',
      isRead: true
    },
    {
      id: 4,
      sender: 'me',
      content: '承知しました！参考になる楽曲やアーティストはありますか？',
      timestamp: '2024-02-08 10:15',
      isRead: true
    },
    {
      id: 5,
      sender: 'other',
      content: 'Official髭男dismやYOASOBIのような、キャッチーでテンポの良い感じが理想です。',
      timestamp: '2024-02-08 10:20',
      isRead: true
    },
    {
      id: 6,
      sender: 'me',
      content: 'イメージが掴めました！まずはデモ版を作成してお送りしますね。2-3日お時間をいただけますでしょうか？',
      timestamp: '2024-02-08 10:25',
      isRead: true,
      attachments: [
        { name: 'sample_track.mp3', size: '3.2MB', type: 'audio' }
      ]
    },
    {
      id: 7,
      sender: 'other',
      content: 'もちろんです！楽しみにしています。',
      timestamp: '2024-02-08 10:30',
      isRead: true
    },
    {
      id: 8,
      sender: 'system',
      content: 'ファイルが共有されました',
      timestamp: '2024-02-10 14:00',
      isRead: true,
      systemMessage: true,
      file: {
        name: 'demo_v1.mp3',
        size: '4.5MB',
        type: 'audio'
      }
    },
    {
      id: 9,
      sender: 'me',
      content: 'デモ版が完成しました！ご確認ください。フィードバックをいただければ修正いたします。',
      timestamp: '2024-02-10 14:05',
      isRead: true
    },
    {
      id: 10,
      sender: 'other',
      content: 'デモ音源ありがとうございます！社内で確認させていただきます。',
      timestamp: '2024-02-10 15:30',
      isRead: true
    }
  ])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!message.trim()) return

    const newMessage = {
      id: messages.length + 1,
      sender: 'me' as const,
      content: message,
      timestamp: new Date().toLocaleString('ja-JP', { 
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }).replace(/\//g, '-'),
      isRead: false
    }

    setMessages([...messages, newMessage])
    setMessage('')

    // 相手が入力中の演出
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
    }, 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const formatMessageTime = (timestamp: string) => {
    const time = timestamp.split(' ')[1]
    return time
  }

  const formatMessageDate = (timestamp: string) => {
    return timestamp.split(' ')[0]
  }

  // 日付でメッセージをグループ化
  const groupedMessages = messages.reduce((groups, message) => {
    const date = formatMessageDate(message.timestamp)
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(message)
    return groups
  }, {} as Record<string, typeof messages>)

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* ヘッダー */}
      <div className="bg-white border-b px-4 py-3">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/messages" className="mr-4 lg:hidden">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <div className="relative mr-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  {conversation.otherUser.avatar ? (
                    <img src={conversation.otherUser.avatar} alt="" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <span className="text-gray-600 font-medium">
                      {conversation.otherUser.name[0]}
                    </span>
                  )}
                </div>
                {conversation.otherUser.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                )}
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">
                  {conversation.otherUser.name}
                </h2>
                <p className="text-xs text-gray-500">
                  {conversation.otherUser.isOnline ? 'オンライン' : 'オフライン'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* プロジェクト情報バー */}
      <div className="bg-orange-50 border-b border-orange-200 px-4 py-2">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <svg className="w-4 h-4 text-orange-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-sm text-orange-800 font-medium">
                {conversation.projectTitle}
              </span>
            </div>
            <Link href={`/projects/${conversation.projectId}`} className="text-xs text-orange-600 hover:text-orange-700">
              詳細を見る →
            </Link>
          </div>
        </div>
      </div>

      {/* メッセージエリア */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="container mx-auto max-w-4xl">
          {Object.entries(groupedMessages).map(([date, dateMessages]) => (
            <div key={date}>
              {/* 日付区切り */}
              <div className="flex items-center justify-center my-4">
                <div className="px-3 py-1 bg-gray-200 rounded-full text-xs text-gray-600">
                  {date}
                </div>
              </div>

              {/* メッセージ */}
              {dateMessages.map((msg) => (
                <div key={msg.id}>
                  {msg.systemMessage ? (
                    // システムメッセージ
                    <div className="flex justify-center my-4">
                      <div className="bg-gray-100 rounded-lg px-4 py-2 max-w-md">
                        <p className="text-sm text-gray-600 text-center">{msg.content}</p>
                        {msg.file && (
                          <div className="mt-2 p-3 bg-white rounded-lg border border-gray-200">
                            <div className="flex items-center">
                              <svg className="w-8 h-8 text-orange-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                              </svg>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">{msg.file.name}</p>
                                <p className="text-xs text-gray-500">{msg.file.size}</p>
                              </div>
                              <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    // 通常のメッセージ
                    <div className={`flex mb-4 ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-md ${msg.sender === 'me' ? 'order-2' : ''}`}>
                        <div className={`rounded-lg px-4 py-2 ${
                          msg.sender === 'me'
                            ? 'bg-orange-500 text-white'
                            : 'bg-white border border-gray-200'
                        }`}>
                          <p className={`text-sm ${msg.sender === 'me' ? 'text-white' : 'text-gray-800'}`}>
                            {msg.content}
                          </p>
                          {msg.attachments && (
                            <div className="mt-2">
                              {msg.attachments.map((file, index) => (
                                <div key={index} className={`flex items-center p-2 rounded ${
                                  msg.sender === 'me' ? 'bg-orange-600' : 'bg-gray-50'
                                }`}>
                                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd" />
                                  </svg>
                                  <span className="text-xs">{file.name} ({file.size})</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className={`flex items-center mt-1 text-xs text-gray-500 ${
                          msg.sender === 'me' ? 'justify-end' : 'justify-start'
                        }`}>
                          <span>{formatMessageTime(msg.timestamp)}</span>
                          {msg.sender === 'me' && msg.isRead && (
                            <span className="ml-2 text-blue-500">既読</span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}

          {/* 入力中インジケーター */}
          {isTyping && (
            <div className="flex justify-start mb-4">
              <div className="bg-white border border-gray-200 rounded-lg px-4 py-2">
                <div className="flex items-center">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 入力エリア */}
      <div className="bg-white border-t px-4 py-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-end gap-2">
            {/* ファイル添付 */}
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              multiple
              accept="image/*,audio/*,.pdf,.doc,.docx,.txt"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </button>

            {/* テキスト入力 */}
            <div className="flex-1">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="メッセージを入力..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                rows={1}
                style={{ minHeight: '40px', maxHeight: '120px' }}
              />
            </div>

            {/* 送信ボタン */}
            <button
              onClick={handleSend}
              disabled={!message.trim()}
              className={`p-2 rounded-lg transition ${
                message.trim()
                  ? 'bg-orange-500 text-white hover:bg-orange-600'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}