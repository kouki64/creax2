'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function DeliverPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [deliveryStep, setDeliveryStep] = useState<'upload' | 'confirm' | 'complete'>('upload')
  
  // 仮の注文データ
  const [order] = useState({
    id: params.id,
    projectTitle: 'YouTubeチャンネルのオープニングテーマ制作',
    client: {
      name: '株式会社クリエイティブメディア',
      avatar: null
    },
    budget: 50000,
    deadline: '2024-03-01',
    status: 'in_progress',
    startDate: '2024-02-15',
    
    // 納品要件
    requirements: {
      format: 'WAV形式（48kHz/24bit）',
      duration: '15秒程度',
      revisions: 2,
      copyright: '著作権譲渡あり'
    },
    
    // マイルストーン
    milestones: [
      { id: 1, name: '契約締結', status: 'completed', date: '2024-02-15' },
      { id: 2, name: 'デモ提出', status: 'completed', date: '2024-02-20' },
      { id: 3, name: '初稿提出', status: 'in_progress', date: null },
      { id: 4, name: '修正対応', status: 'pending', date: null },
      { id: 5, name: '最終納品', status: 'pending', date: null }
    ],
    
    // 過去の納品履歴
    deliveryHistory: [
      {
        id: 1,
        type: 'demo',
        files: ['demo_v1.mp3'],
        message: 'デモ版を提出いたします。',
        submittedAt: '2024-02-20 14:00',
        status: 'approved',
        clientFeedback: 'いい感じです！この方向性で進めてください。'
      }
    ]
  })

  const [deliveryData, setDeliveryData] = useState({
    deliveryType: 'initial', // demo, initial, revision, final
    files: [] as File[],
    message: '',
    technicalNotes: '',
    
    // 納品ファイル詳細
    fileDetails: {
      format: '',
      sampleRate: '',
      bitDepth: '',
      duration: '',
      fileSize: ''
    },
    
    // チェックリスト
    checklist: {
      formatCorrect: false,
      durationCorrect: false,
      qualityCheck: false,
      copyrightClear: false,
      clientRequirements: false
    }
  })

  const [uploadedFiles, setUploadedFiles] = useState<Array<{
    id: string
    name: string
    size: string
    type: string
    uploadProgress: number
  }>>([])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    
    // ファイルのバリデーション
    const validFiles = files.filter(file => {
      const maxSize = 500 * 1024 * 1024 // 500MB
      if (file.size > maxSize) {
        alert(`${file.name}は500MBを超えています`)
        return false
      }
      return true
    })

    // アップロード進捗のシミュレーション
    validFiles.forEach(file => {
      const fileId = Math.random().toString(36).substr(2, 9)
      const newFile = {
        id: fileId,
        name: file.name,
        size: formatFileSize(file.size),
        type: getFileType(file.name),
        uploadProgress: 0
      }
      
      setUploadedFiles(prev => [...prev, newFile])
      
      // アップロード進捗のアニメーション
      let progress = 0
      const interval = setInterval(() => {
        progress += 10
        setUploadedFiles(prev => prev.map(f => 
          f.id === fileId ? { ...f, uploadProgress: progress } : f
        ))
        if (progress >= 100) {
          clearInterval(interval)
        }
      }, 200)
    })

    setDeliveryData(prev => ({
      ...prev,
      files: [...prev.files, ...validFiles]
    }))
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
    return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB'
  }

  const getFileType = (fileName: string): string => {
    const ext = fileName.split('.').pop()?.toLowerCase()
    if (['mp3', 'wav', 'aiff', 'flac'].includes(ext || '')) return 'audio'
    if (['zip', 'rar', '7z'].includes(ext || '')) return 'archive'
    if (['pdf', 'doc', 'docx', 'txt'].includes(ext || '')) return 'document'
    return 'other'
  }

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId))
  }

  const handleSubmit = () => {
    // バリデーション
    if (uploadedFiles.length === 0) {
      alert('ファイルをアップロードしてください')
      return
    }
    
    if (!deliveryData.message) {
      alert('納品メッセージを入力してください')
      return
    }
    
    const allChecked = Object.values(deliveryData.checklist).every(v => v)
    if (!allChecked) {
      alert('すべてのチェック項目を確認してください')
      return
    }
    
    setDeliveryStep('confirm')
  }

  const handleFinalSubmit = () => {
    setDeliveryStep('complete')
    
    // 3秒後にリダイレクト
    setTimeout(() => {
      router.push('/creator/orders')
    }, 3000)
  }

  if (deliveryStep === 'complete') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            納品完了しました！
          </h2>
          <p className="text-gray-600 mb-4">
            クライアントに納品物が送信されました。<br />
            検収結果の通知をお待ちください。
          </p>
          <p className="text-sm text-gray-500">
            3秒後に受注管理画面へ移動します...
          </p>
        </div>
      </div>
    )
  }

  if (deliveryStep === 'confirm') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">納品内容の確認</h1>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">以下の内容で納品します</h2>
              
              {/* 案件情報 */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">案件情報</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>案件名: {order.projectTitle}</p>
                  <p>クライアント: {order.client.name}</p>
                  <p>納期: {order.deadline}</p>
                </div>
              </div>
              
              {/* 納品ファイル */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-2">納品ファイル</h3>
                <div className="space-y-2">
                  {uploadedFiles.map(file => (
                    <div key={file.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <svg className="w-8 h-8 text-orange-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-5L9 2H4z" clipRule="evenodd" />
                      </svg>
                      <div className="flex-1">
                        <div className="font-medium">{file.name}</div>
                        <div className="text-xs text-gray-500">{file.size}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* 納品メッセージ */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-2">納品メッセージ</h3>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-700 whitespace-pre-line">{deliveryData.message}</p>
                </div>
              </div>
              
              {/* 技術的な説明 */}
              {deliveryData.technicalNotes && (
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-2">技術的な説明</h3>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-gray-700 whitespace-pre-line">{deliveryData.technicalNotes}</p>
                  </div>
                </div>
              )}
              
              {/* 確認事項 */}
              <div className="mb-6 p-4 bg-yellow-50 rounded-lg">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-yellow-600 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div className="text-sm text-yellow-800">
                    <p className="font-medium mb-1">納品後の注意事項</p>
                    <ul className="space-y-1 text-xs">
                      <li>• 納品後の取り消しはできません</li>
                      <li>• クライアントの検収期間は7日間です</li>
                      <li>• 修正依頼がある場合は別途対応が必要です</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* アクションボタン */}
              <div className="flex justify-between">
                <button
                  onClick={() => setDeliveryStep('upload')}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  戻る
                </button>
                <button
                  onClick={handleFinalSubmit}
                  className="px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition"
                >
                  納品を確定する
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* パンくず */}
          <div className="mb-6 text-sm">
            <Link href="/creator/dashboard" className="text-gray-600 hover:text-orange-500">
              ダッシュボード
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href="/creator/orders" className="text-gray-600 hover:text-orange-500">
              受注管理
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900">納品</span>
          </div>

          {/* ヘッダー */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              成果物の納品
            </h1>
            <p className="text-gray-600">
              {order.projectTitle}
            </p>
            <div className="mt-4 flex items-center gap-6 text-sm text-gray-600">
              <span>クライアント: {order.client.name}</span>
              <span>納期: {order.deadline}</span>
              <span className="text-orange-600 font-semibold">
                残り10日
              </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* メインコンテンツ */}
            <div className="lg:col-span-2 space-y-6">
              {/* ファイルアップロード */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">納品ファイル</h2>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    納品タイプ <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={deliveryData.deliveryType}
                    onChange={(e) => setDeliveryData(prev => ({ ...prev, deliveryType: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="demo">デモ版</option>
                    <option value="initial">初稿</option>
                    <option value="revision">修正版</option>
                    <option value="final">最終納品</option>
                  </select>
                </div>

                {/* ドラッグ&ドロップエリア */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                    accept="audio/*,.zip,.rar"
                  />
                  
                  <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  
                  <p className="text-gray-600 mb-2">
                    ファイルをドラッグ&ドロップ
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    または
                  </p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                  >
                    ファイルを選択
                  </button>
                  <p className="text-xs text-gray-500 mt-4">
                    対応形式: MP3, WAV, AIFF, FLAC, ZIP（最大500MB）
                  </p>
                </div>

                {/* アップロード済みファイル */}
                {uploadedFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {uploadedFiles.map(file => (
                      <div key={file.id} className="border border-gray-200 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            {file.type === 'audio' ? (
                              <svg className="w-8 h-8 text-orange-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                              </svg>
                            ) : (
                              <svg className="w-8 h-8 text-gray-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-5L9 2H4z" clipRule="evenodd" />
                              </svg>
                            )}
                            <div>
                              <div className="font-medium text-gray-900">{file.name}</div>
                              <div className="text-xs text-gray-500">{file.size}</div>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFile(file.id)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                        {/* アップロード進捗バー */}
                        {file.uploadProgress < 100 && (
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${file.uploadProgress}%` }}
                            />
                          </div>
                        )}
                        {file.uploadProgress === 100 && (
                          <div className="flex items-center text-green-600 text-sm">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            アップロード完了
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 納品メッセージ */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">納品メッセージ</h2>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    クライアントへのメッセージ <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={6}
                    value={deliveryData.message}
                    onChange={(e) => setDeliveryData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="納品物の説明、使用方法、注意事項などを記載してください"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    技術的な説明（任意）
                  </label>
                  <textarea
                    rows={4}
                    value={deliveryData.technicalNotes}
                    onChange={(e) => setDeliveryData(prev => ({ ...prev, technicalNotes: e.target.value }))}
                    placeholder="制作環境、使用プラグイン、技術的な詳細など"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              </div>

              {/* 最終確認チェックリスト */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">納品前チェックリスト</h2>
                
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={deliveryData.checklist.formatCorrect}
                      onChange={(e) => setDeliveryData(prev => ({
                        ...prev,
                        checklist: { ...prev.checklist, formatCorrect: e.target.checked }
                      }))}
                      className="mr-3 w-4 h-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    />
                    <span className="text-gray-700">
                      指定されたファイル形式（{order.requirements.format}）で納品している
                    </span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={deliveryData.checklist.durationCorrect}
                      onChange={(e) => setDeliveryData(prev => ({
                        ...prev,
                        checklist: { ...prev.checklist, durationCorrect: e.target.checked }
                      }))}
                      className="mr-3 w-4 h-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    />
                    <span className="text-gray-700">
                      指定された長さ（{order.requirements.duration}）を満たしている
                    </span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={deliveryData.checklist.qualityCheck}
                      onChange={(e) => setDeliveryData(prev => ({
                        ...prev,
                        checklist: { ...prev.checklist, qualityCheck: e.target.checked }
                      }))}
                      className="mr-3 w-4 h-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    />
                    <span className="text-gray-700">
                      音質・ミックスバランスの最終確認を行った
                    </span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={deliveryData.checklist.copyrightClear}
                      onChange={(e) => setDeliveryData(prev => ({
                        ...prev,
                        checklist: { ...prev.checklist, copyrightClear: e.target.checked }
                      }))}
                      className="mr-3 w-4 h-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    />
                    <span className="text-gray-700">
                      著作権・使用権に関する条件を確認した
                    </span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={deliveryData.checklist.clientRequirements}
                      onChange={(e) => setDeliveryData(prev => ({
                        ...prev,
                        checklist: { ...prev.checklist, clientRequirements: e.target.checked }
                      }))}
                      className="mr-3 w-4 h-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    />
                    <span className="text-gray-700">
                      クライアントの要求事項をすべて満たしている
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* サイドバー */}
            <div className="space-y-6">
              {/* 納品要件 */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">納品要件</h2>
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="text-gray-500">ファイル形式</dt>
                    <dd className="font-medium text-gray-900">{order.requirements.format}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">長さ</dt>
                    <dd className="font-medium text-gray-900">{order.requirements.duration}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">修正回数</dt>
                    <dd className="font-medium text-gray-900">{order.requirements.revisions}回まで</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">著作権</dt>
                    <dd className="font-medium text-gray-900">{order.requirements.copyright}</dd>
                  </div>
                </dl>
              </div>

              {/* 進捗状況 */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">進捗状況</h2>
                <div className="space-y-3">
                  {order.milestones.map((milestone, index) => (
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

              {/* 過去の納品履歴 */}
              {order.deliveryHistory.length > 0 && (
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-lg font-semibold mb-4">納品履歴</h2>
                  <div className="space-y-3">
                    {order.deliveryHistory.map(delivery => (
                      <div key={delivery.id} className="border-l-2 border-gray-200 pl-3">
                        <div className="text-sm font-medium text-gray-900">
                          {delivery.type === 'demo' && 'デモ版'}
                          {delivery.type === 'initial' && '初稿'}
                          {delivery.type === 'revision' && '修正版'}
                          {delivery.type === 'final' && '最終納品'}
                        </div>
                        <div className="text-xs text-gray-500">
                          {delivery.submittedAt}
                        </div>
                        {delivery.status === 'approved' && (
                          <div className="text-xs text-green-600 mt-1">
                            ✓ 承認済み
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* アクションボタン */}
              <div className="bg-white rounded-lg shadow p-6">
                <button
                  onClick={handleSubmit}
                  className="w-full px-4 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition"
                >
                  納品内容を確認
                </button>
                <p className="text-xs text-gray-500 text-center mt-3">
                  納品後、クライアントの検収期間は7日間です
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}