'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreatorRegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    // 基本情報
    email: '',
    password: '',
    confirmPassword: '',
    
    // プロフィール情報
    displayName: '',
    realName: '',
    phoneNumber: '',
    
    // クリエーター情報
    creatorTypes: [] as string[],
    specialties: [] as string[],
    experience: '',
    portfolio: '',
    
    // 料金設定
    hourlyRate: '',
    projectRate: '',
    
    // 自己紹介
    bio: '',
    achievements: '',
    
    // 利用規約
    agreeToTerms: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const creatorTypeOptions = [
    { value: 'composer', label: '作曲家' },
    { value: 'lyricist', label: '作詞家' },
    { value: 'arranger', label: 'アレンジャー' },
    { value: 'musician', label: 'ミュージシャン' },
    { value: 'vocalist', label: 'ボーカリスト' },
    { value: 'recording', label: 'レコーディングエンジニア' },
    { value: 'mixing', label: 'ミキシングエンジニア' },
    { value: 'mastering', label: 'マスタリングエンジニア' },
  ]

  const specialtyOptions = [
    { value: 'pop', label: 'ポップス' },
    { value: 'rock', label: 'ロック' },
    { value: 'jazz', label: 'ジャズ' },
    { value: 'classical', label: 'クラシック' },
    { value: 'edm', label: 'EDM/ダンス' },
    { value: 'hiphop', label: 'ヒップホップ' },
    { value: 'rnb', label: 'R&B' },
    { value: 'anime', label: 'アニメ/ゲーム' },
    { value: 'commercial', label: 'CM/広告' },
  ]

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

  const handleCheckboxChange = (field: 'creatorTypes' | 'specialties', value: string) => {
    setFormData(prev => {
      const currentValues = prev[field]
      if (currentValues.includes(value)) {
        return { ...prev, [field]: currentValues.filter(v => v !== value) }
      } else {
        return { ...prev, [field]: [...currentValues, value] }
      }
    })
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.email) newErrors.email = 'メールアドレスは必須です'
    if (!formData.password) newErrors.password = 'パスワードは必須です'
    if (formData.password.length < 8) newErrors.password = 'パスワードは8文字以上で入力してください'
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'パスワードが一致しません'
    }
    if (!formData.displayName) newErrors.displayName = '表示名は必須です'
    if (!formData.realName) newErrors.realName = '本名は必須です'
    if (!formData.phoneNumber) newErrors.phoneNumber = '電話番号は必須です'
    if (formData.creatorTypes.length === 0) newErrors.creatorTypes = '少なくとも1つ選択してください'
    if (formData.specialties.length === 0) newErrors.specialties = '少なくとも1つ選択してください'
    if (!formData.experience) newErrors.experience = '経験年数を選択してください'
    if (!formData.bio) newErrors.bio = '自己紹介は必須です'
    if (!formData.agreeToTerms) newErrors.agreeToTerms = '利用規約に同意してください'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      // TODO: 実際の登録処理
      console.log('クリエーター登録:', formData)
      alert('登録が完了しました！（仮）')
      router.push('/creator/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
              <span className="text-2xl">🎸</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              クリエーター登録
            </h1>
            <p className="text-gray-600">
              音楽制作を行う方向けのアカウント作成
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
                    アーティスト名/表示名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                      errors.displayName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="プロフィールに表示される名前"
                  />
                  {errors.displayName && <p className="text-red-500 text-sm mt-1">{errors.displayName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    本名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="realName"
                    value={formData.realName}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                      errors.realName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="契約時に使用"
                  />
                  {errors.realName && <p className="text-red-500 text-sm mt-1">{errors.realName}</p>}
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
                    経験年数 <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                      errors.experience ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">選択してください</option>
                    <option value="less-1">1年未満</option>
                    <option value="1-3">1〜3年</option>
                    <option value="3-5">3〜5年</option>
                    <option value="5-10">5〜10年</option>
                    <option value="more-10">10年以上</option>
                  </select>
                  {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
                </div>
              </div>
            </div>

            {/* クリエーター情報 */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-semibold mb-4">クリエーター情報</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    クリエータータイプ <span className="text-red-500">*</span>
                    <span className="text-xs text-gray-500 ml-2">（複数選択可）</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {creatorTypeOptions.map(option => (
                      <label key={option.value} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.creatorTypes.includes(option.value)}
                          onChange={() => handleCheckboxChange('creatorTypes', option.value)}
                          className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm">{option.label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.creatorTypes && <p className="text-red-500 text-sm mt-1">{errors.creatorTypes}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    得意ジャンル <span className="text-red-500">*</span>
                    <span className="text-xs text-gray-500 ml-2">（複数選択可）</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {specialtyOptions.map(option => (
                      <label key={option.value} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.specialties.includes(option.value)}
                          onChange={() => handleCheckboxChange('specialties', option.value)}
                          className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm">{option.label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.specialties && <p className="text-red-500 text-sm mt-1">{errors.specialties}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ポートフォリオURL（任意）
                  </label>
                  <input
                    type="url"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="https://soundcloud.com/... など"
                  />
                </div>
              </div>
            </div>

            {/* 料金設定 */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-semibold mb-4">料金設定（任意）</h2>
              <p className="text-sm text-gray-600 mb-4">後から変更可能です</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    時間単価
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">¥</span>
                    <input
                      type="number"
                      name="hourlyRate"
                      value={formData.hourlyRate}
                      onChange={handleChange}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="5000"
                    />
                    <span className="absolute right-3 top-2.5 text-gray-500">/時間</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    プロジェクト単価（目安）
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">¥</span>
                    <input
                      type="number"
                      name="projectRate"
                      value={formData.projectRate}
                      onChange={handleChange}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="50000"
                    />
                    <span className="absolute right-3 top-2.5 text-gray-500">/曲</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 自己紹介 */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-semibold mb-4">自己紹介</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    プロフィール文 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                      errors.bio ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="得意な音楽ジャンル、使用機材、制作環境などを記入してください"
                  />
                  {errors.bio && <p className="text-red-500 text-sm mt-1">{errors.bio}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    実績・経歴（任意）
                  </label>
                  <textarea
                    name="achievements"
                    value={formData.achievements}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="過去の制作実績、受賞歴などがあれば記入してください"
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