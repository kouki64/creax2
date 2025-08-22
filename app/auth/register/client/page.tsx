'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ClientRegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    // 基本情報
    email: '',
    password: '',
    confirmPassword: '',
    
    // プロフィール情報
    companyName: '',
    representativeName: '',
    phoneNumber: '',
    
    // 活動情報
    businessType: '',
    website: '',
    description: '',
    
    // 利用規約
    agreeToTerms: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
    
    // エラーをクリア
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.email) newErrors.email = 'メールアドレスは必須です'
    if (!formData.password) newErrors.password = 'パスワードは必須です'
    if (formData.password.length < 8) newErrors.password = 'パスワードは8文字以上で入力してください'
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'パスワードが一致しません'
    }
    if (!formData.companyName) newErrors.companyName = '会社名/団体名は必須です'
    if (!formData.representativeName) newErrors.representativeName = '代表者名は必須です'
    if (!formData.phoneNumber) newErrors.phoneNumber = '電話番号は必須です'
    if (!formData.businessType) newErrors.businessType = '業種を選択してください'
    if (!formData.agreeToTerms) newErrors.agreeToTerms = '利用規約に同意してください'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      // TODO: 実際の登録処理
      console.log('クライアント登録:', formData)
      alert('登録が完了しました！（仮）')
      router.push('/client/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
              <span className="text-2xl">🎤</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              クライアント登録
            </h1>
            <p className="text-gray-600">
              音楽制作を依頼する方向けのアカウント作成
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* アカウント情報 */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-semibold mb-4">アカウント情報</h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    メールアドレス <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="email@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    パスワード <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="8文字以上"
                  />
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    パスワード（確認） <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                      errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="パスワードを再入力"
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>
            </div>

            {/* 基本情報 */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-semibold mb-4">基本情報</h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    会社名/団体名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                      errors.companyName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="株式会社○○ / 個人の方は個人名"
                  />
                  {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    代表者名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="representativeName"
                    value={formData.representativeName}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                      errors.representativeName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="山田 太郎"
                  />
                  {errors.representativeName && <p className="text-red-500 text-sm mt-1">{errors.representativeName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    電話番号 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                      errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="090-1234-5678"
                  />
                  {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    業種 <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                      errors.businessType ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">選択してください</option>
                    <option value="record_label">レコード会社</option>
                    <option value="production">芸能プロダクション</option>
                    <option value="ad_agency">広告代理店</option>
                    <option value="tv_production">テレビ番組制作会社</option>
                    <option value="game_company">ゲーム会社</option>
                    <option value="youtuber">YouTuber</option>
                    <option value="artist">アーティスト（個人）</option>
                    <option value="company">一般企業</option>
                    <option value="other">その他</option>
                  </select>
                  {errors.businessType && <p className="text-red-500 text-sm mt-1">{errors.businessType}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ウェブサイト（任意）
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="https://example.com"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    自己紹介・活動内容（任意）
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="どのような音楽制作を依頼したいか、活動内容などをご記入ください"
                  />
                </div>
              </div>
            </div>

            {/* 利用規約 */}
            <div>
              <div className="flex items-start">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  id="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label htmlFor="agreeToTerms" className="ml-2 text-sm text-gray-700">
                  <Link href="/terms" className="text-orange-500 hover:underline" target="_blank">
                    利用規約
                  </Link>
                  および
                  <Link href="/privacy" className="text-orange-500 hover:underline" target="_blank">
                    プライバシーポリシー
                  </Link>
                  に同意します
                </label>
              </div>
              {errors.agreeToTerms && <p className="text-red-500 text-sm mt-1">{errors.agreeToTerms}</p>}
            </div>

            {/* 送信ボタン */}
            <div className="flex flex-col space-y-4">
              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
              >
                登録する
              </button>

              <Link
                href="/auth/register"
                className="text-center text-gray-600 hover:text-orange-500"
              >
                ← 戻る
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}