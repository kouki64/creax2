'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function ContactPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    inquiryType: '',
    name: '',
    email: '',
    userType: '',
    orderId: '',
    subject: '',
    message: '',
    attachments: [] as File[],
    agreeToTerms: false
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const inquiryTypes = [
    { value: 'general', label: '一般的な質問', icon: '💬' },
    { value: 'bug', label: 'バグ・不具合報告', icon: '🐛' },
    { value: 'payment', label: '決済・支払いについて', icon: '💳' },
    { value: 'project', label: '案件・取引について', icon: '📝' },
    { value: 'account', label: 'アカウント関連', icon: '👤' },
    { value: 'feature', label: '機能要望', icon: '✨' },
    { value: 'complaint', label: '苦情・クレーム', icon: '⚠️' },
    { value: 'other', label: 'その他', icon: '📌' }
  ]

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.inquiryType) {
      newErrors.inquiryType = 'お問い合わせ種別を選択してください'
    }
    if (!formData.name) {
      newErrors.name = 'お名前を入力してください'
    }
    if (!formData.email) {
      newErrors.email = 'メールアドレスを入力してください'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '有効なメールアドレスを入力してください'
    }
    if (!formData.userType) {
      newErrors.userType = '利用区分を選択してください'
    }
    if (!formData.subject) {
      newErrors.subject = '件名を入力してください'
    }
    if (!formData.message) {
      newErrors.message = 'お問い合わせ内容を入力してください'
    } else if (formData.message.length < 10) {
      newErrors.message = 'お問い合わせ内容は10文字以上入力してください'
    }
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'プライバシーポリシーに同意してください'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // TODO: 実際の送信処理
    await new Promise(resolve => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setShowSuccess(true)

    // 3秒後にダッシュボードへリダイレクト
    setTimeout(() => {
      router.push('/')
    }, 3000)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const validFiles = files.filter(file => file.size <= 10 * 1024 * 1024) // 10MB以下

    if (files.length !== validFiles.length) {
      alert('10MB以下のファイルのみアップロード可能です')
    }

    setFormData({
      ...formData,
      attachments: [...formData.attachments, ...validFiles].slice(0, 5) // 最大5ファイル
    })
  }

  const removeFile = (index: number) => {
    setFormData({
      ...formData,
      attachments: formData.attachments.filter((_, i) => i !== index)
    })
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            送信完了しました
          </h2>
          <p className="text-gray-600 mb-4">
            お問い合わせありがとうございます。<br />
            内容を確認次第、ご登録のメールアドレスへ返信いたします。
          </p>
          <p className="text-sm text-gray-500">
            3秒後にトップページへ移動します...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-2">
              お問い合わせ
            </h1>
            <p className="text-orange-100">
              ご不明な点やご要望など、お気軽にお問い合わせください
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* よくある質問への誘導 */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-blue-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">
                  お問い合わせの前に
                </h3>
                <p className="text-blue-700 text-sm mb-2">
                  よくある質問に回答がある場合があります。
                </p>
                <Link href="/support/faq" className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium">
                  よくある質問を見る
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* お問い合わせ種別 */}
            <div className="bg-white rounded-lg shadow p-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                お問い合わせ種別 <span className="text-red-500">*</span>
              </label>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {inquiryTypes.map(type => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, inquiryType: type.value })
                      setErrors({ ...errors, inquiryType: '' })
                    }}
                    className={`p-3 border rounded-lg text-left transition ${
                      formData.inquiryType === type.value
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="text-xl mr-2">{type.icon}</span>
                      <span className="text-sm font-medium">{type.label}</span>
                    </div>
                  </button>
                ))}
              </div>
              {errors.inquiryType && (
                <p className="text-red-500 text-sm mt-2">{errors.inquiryType}</p>
              )}
            </div>

            {/* 基本情報 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">基本情報</h2>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    お名前 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value })
                      setErrors({ ...errors, name: '' })
                    }}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="山田太郎"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    メールアドレス <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value })
                      setErrors({ ...errors, email: '' })
                    }}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="example@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    利用区分 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.userType}
                    onChange={(e) => {
                      setFormData({ ...formData, userType: e.target.value })
                      setErrors({ ...errors, userType: '' })
                    }}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                      errors.userType ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">選択してください</option>
                    <option value="client">クライアント</option>
                    <option value="creator">クリエーター</option>
                    <option value="both">両方</option>
                    <option value="none">未登録</option>
                  </select>
                  {errors.userType && (
                    <p className="text-red-500 text-sm mt-1">{errors.userType}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    注文番号（該当する場合）
                  </label>
                  <input
                    type="text"
                    value={formData.orderId}
                    onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="ORD-2024-001234"
                  />
                </div>
              </div>
            </div>

            {/* お問い合わせ内容 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">お問い合わせ内容</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  件名 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => {
                    setFormData({ ...formData, subject: e.target.value })
                    setErrors({ ...errors, subject: '' })
                  }}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                    errors.subject ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="お問い合わせの件名を入力"
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  詳細内容 <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={6}
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value })
                    setErrors({ ...errors, message: '' })
                  }}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                    errors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="お問い合わせ内容を詳しくご記入ください"
                />
                <div className="flex justify-between items-center mt-1">
                  <div>
                    {errors.message && (
                      <p className="text-red-500 text-sm">{errors.message}</p>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">
                    {formData.message.length}/2000文字
                  </span>
                </div>
              </div>

              {/* ファイル添付 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ファイル添付（任意）
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                    accept="image/*,.pdf,.doc,.docx,.txt"
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center cursor-pointer"
                  >
                    <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span className="text-sm text-gray-600">
                      クリックしてファイルを選択
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                      画像、PDF、Word、テキスト（最大10MB、5ファイルまで）
                    </span>
                  </label>
                  
                  {formData.attachments.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {formData.attachments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm text-gray-700 truncate">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 同意事項 */}
            <div className="bg-white rounded-lg shadow p-6">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={(e) => {
                    setFormData({ ...formData, agreeToTerms: e.target.checked })
                    setErrors({ ...errors, agreeToTerms: '' })
                  }}
                  className="mt-1 h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">
                  <Link href="/privacy" className="text-orange-500 hover:underline" target="_blank">
                    プライバシーポリシー
                  </Link>
                  に同意の上、お問い合わせを送信します
                </span>
              </label>
              {errors.agreeToTerms && (
                <p className="text-red-500 text-sm mt-1 ml-6">{errors.agreeToTerms}</p>
              )}
            </div>

            {/* 送信ボタン */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-3 rounded-lg font-semibold transition ${
                  isSubmitting
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-orange-500 text-white hover:bg-orange-600'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    送信中...
                  </span>
                ) : (
                  '送信する'
                )}
              </button>
            </div>
          </form>

          {/* その他の連絡方法 */}
          <div className="mt-12 bg-gray-100 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">その他のサポート</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4">
                <div className="text-orange-500 mb-2">📧</div>
                <div className="font-medium text-gray-900 mb-1">メール</div>
                <div className="text-sm text-gray-600">support@creax.jp</div>
                <div className="text-xs text-gray-500 mt-1">24時間受付</div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-orange-500 mb-2">💬</div>
                <div className="font-medium text-gray-900 mb-1">チャット</div>
                <div className="text-sm text-gray-600">画面右下のチャットボタン</div>
                <div className="text-xs text-gray-500 mt-1">平日 10:00-18:00</div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-orange-500 mb-2">📱</div>
                <div className="font-medium text-gray-900 mb-1">公式SNS</div>
                <div className="text-sm text-gray-600">@creax_official</div>
                <div className="text-xs text-gray-500 mt-1">Twitter, Instagram</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}