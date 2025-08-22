'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function NewCompetitionProjectPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // 基本情報
    title: '',
    category: '',
    genre: '',
    description: '',
    
    // 詳細要件
    duration: '',
    usage: '',
    reference: '',
    instruments: [] as string[],
    mood: [] as string[],
    
    // 予算と期限
    budgetMin: '',
    budgetMax: '',
    deadline: '',
    selectionDeadline: '',
    
    // ファイル
    referenceFiles: [] as File[],
    
    // オプション
    allowRevisions: true,
    revisionCount: '2',
    requireNDA: false,
    isPublic: true,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const categories = [
    { value: 'bgm', label: 'BGM制作' },
    { value: 'theme', label: 'テーマソング' },
    { value: 'jingle', label: 'ジングル' },
    { value: 'arrangement', label: 'アレンジ' },
    { value: 'mixing', label: 'ミキシング' },
    { value: 'mastering', label: 'マスタリング' },
  ]

  const genres = [
    { value: 'pop', label: 'ポップス' },
    { value: 'rock', label: 'ロック' },
    { value: 'jazz', label: 'ジャズ' },
    { value: 'classical', label: 'クラシック' },
    { value: 'edm', label: 'EDM/ダンス' },
    { value: 'hiphop', label: 'ヒップホップ' },
    { value: 'ambient', label: 'アンビエント' },
    { value: 'game', label: 'ゲーム音楽' },
    { value: 'commercial', label: 'CM/広告' },
  ]

  const moods = [
    '明るい', '楽しい', '感動的', '壮大', 'クール',
    '切ない', '激しい', '落ち着いた', '神秘的', 'ノスタルジック'
  ]

  const instrumentOptions = [
    'ピアノ', 'ギター', 'ベース', 'ドラム', 'ストリングス',
    'ブラス', 'シンセサイザー', 'ボーカル', '和楽器', '民族楽器'
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

  const handleArrayToggle = (field: 'instruments' | 'mood', value: string) => {
    setFormData(prev => {
      const currentValues = prev[field]
      if (currentValues.includes(value)) {
        return { ...prev, [field]: currentValues.filter(v => v !== value) }
      } else {
        return { ...prev, [field]: [...currentValues, value] }
      }
    })
  }

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {}
    
    if (step === 1) {
      if (!formData.title) newErrors.title = 'タイトルは必須です'
      if (!formData.category) newErrors.category = 'カテゴリを選択してください'
      if (!formData.genre) newErrors.genre = 'ジャンルを選択してください'
      if (!formData.description) newErrors.description = '詳細説明は必須です'
    } else if (step === 2) {
      if (!formData.duration) newErrors.duration = '楽曲の長さを入力してください'
      if (!formData.usage) newErrors.usage = '使用用途を入力してください'
    } else if (step === 3) {
      if (!formData.budgetMin) newErrors.budgetMin = '最低予算を入力してください'
      if (!formData.budgetMax) newErrors.budgetMax = '最高予算を入力してください'
      if (!formData.deadline) newErrors.deadline = '納期を設定してください'
      if (!formData.selectionDeadline) newErrors.selectionDeadline = '選定期限を設定してください'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleBack = () => {
    setCurrentStep(prev => prev - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateStep(3)) {
      // TODO: 実際の投稿処理
      console.log('案件投稿:', formData)
      alert('案件を投稿しました！（仮）')
      router.push('/client/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* ヘッダー */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              コンペ形式で案件を投稿
            </h1>
            <p className="text-gray-600">
              複数のクリエーターから提案を募り、最適な作品を選択できます
            </p>
          </div>

          {/* ステップインジケーター */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[
                { num: 1, label: '基本情報' },
                { num: 2, label: '詳細要件' },
                { num: 3, label: '予算と期限' },
              ].map((step, index) => (
                <div key={step.num} className="flex items-center flex-1">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    currentStep >= step.num 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-gray-300 text-gray-600'
                  }`}>
                    {step.num}
                  </div>
                  <div className="ml-3">
                    <div className={`text-sm font-medium ${
                      currentStep >= step.num ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {step.label}
                    </div>
                  </div>
                  {index < 2 && (
                    <div className={`flex-1 h-0.5 mx-4 ${
                      currentStep > step.num ? 'bg-orange-500' : 'bg-gray-300'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* フォーム */}
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
            {/* ステップ1: 基本情報 */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-4">基本情報</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    案件タイトル <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                      errors.title ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="例：YouTubeチャンネル用のオープニングテーマ制作"
                  />
                  {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      カテゴリ <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                        errors.category ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">選択してください</option>
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                    {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ジャンル <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="genre"
                      value={formData.genre}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                        errors.genre ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">選択してください</option>
                      {genres.map(genre => (
                        <option key={genre.value} value={genre.value}>{genre.label}</option>
                      ))}
                    </select>
                    {errors.genre && <p className="text-red-500 text-sm mt-1">{errors.genre}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    詳細説明 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={6}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                      errors.description ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="制作してほしい楽曲の詳細、イメージ、参考にしたいアーティストなどを記入してください"
                  />
                  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>
              </div>
            )}

            {/* ステップ2: 詳細要件 */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-4">詳細要件</h2>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      楽曲の長さ <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                        errors.duration ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="例：3分程度、15秒、ループ音源"
                    />
                    {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      使用用途 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="usage"
                      value={formData.usage}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                        errors.usage ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="例：YouTube動画、CM、店舗BGM"
                    />
                    {errors.usage && <p className="text-red-500 text-sm mt-1">{errors.usage}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    希望する楽器（複数選択可）
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {instrumentOptions.map(instrument => (
                      <label key={instrument} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.instruments.includes(instrument)}
                          onChange={() => handleArrayToggle('instruments', instrument)}
                          className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm">{instrument}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    楽曲の雰囲気（複数選択可）
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {moods.map(mood => (
                      <button
                        key={mood}
                        type="button"
                        onClick={() => handleArrayToggle('mood', mood)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                          formData.mood.includes(mood)
                            ? 'bg-orange-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {mood}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    参考楽曲・アーティスト（任意）
                  </label>
                  <textarea
                    name="reference"
                    value={formData.reference}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="参考にしたい楽曲名やアーティスト名、YouTubeのURLなど"
                  />
                </div>
              </div>
            )}

            {/* ステップ3: 予算と期限 */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-4">予算と期限</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    予算範囲 <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-gray-500">¥</span>
                        <input
                          type="number"
                          name="budgetMin"
                          value={formData.budgetMin}
                          onChange={handleChange}
                          className={`w-full pl-8 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                            errors.budgetMin ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="最低予算"
                        />
                      </div>
                      {errors.budgetMin && <p className="text-red-500 text-sm mt-1">{errors.budgetMin}</p>}
                    </div>
                    <div>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-gray-500">¥</span>
                        <input
                          type="number"
                          name="budgetMax"
                          value={formData.budgetMax}
                          onChange={handleChange}
                          className={`w-full pl-8 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                            errors.budgetMax ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="最高予算"
                        />
                      </div>
                      {errors.budgetMax && <p className="text-red-500 text-sm mt-1">{errors.budgetMax}</p>}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    ※ 手数料15%が別途かかります
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      応募締切 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="selectionDeadline"
                      value={formData.selectionDeadline}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                        errors.selectionDeadline ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.selectionDeadline && <p className="text-red-500 text-sm mt-1">{errors.selectionDeadline}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      納品希望日 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                        errors.deadline ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.deadline && <p className="text-red-500 text-sm mt-1">{errors.deadline}</p>}
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-medium mb-4">オプション設定</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        name="allowRevisions"
                        id="allowRevisions"
                        checked={formData.allowRevisions}
                        onChange={handleChange}
                        className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded mt-1"
                      />
                      <div className="ml-3">
                        <label htmlFor="allowRevisions" className="text-sm font-medium text-gray-700">
                          修正対応を含む
                        </label>
                        {formData.allowRevisions && (
                          <div className="mt-2">
                            <label className="text-sm text-gray-600">修正回数:</label>
                            <select
                              name="revisionCount"
                              value={formData.revisionCount}
                              onChange={handleChange}
                              className="ml-2 px-2 py-1 border border-gray-300 rounded text-sm"
                            >
                              <option value="1">1回</option>
                              <option value="2">2回</option>
                              <option value="3">3回</option>
                              <option value="unlimited">無制限</option>
                            </select>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        name="requireNDA"
                        id="requireNDA"
                        checked={formData.requireNDA}
                        onChange={handleChange}
                        className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded mt-1"
                      />
                      <div className="ml-3">
                        <label htmlFor="requireNDA" className="text-sm font-medium text-gray-700">
                          秘密保持契約（NDA）を必須とする
                        </label>
                        <p className="text-xs text-gray-500 mt-1">
                          機密性の高いプロジェクトの場合に選択してください
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        name="isPublic"
                        id="isPublic"
                        checked={formData.isPublic}
                        onChange={handleChange}
                        className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded mt-1"
                      />
                      <div className="ml-3">
                        <label htmlFor="isPublic" className="text-sm font-medium text-gray-700">
                          案件を公開する
                        </label>
                        <p className="text-xs text-gray-500 mt-1">
                          非公開にすると、招待したクリエーターのみが応募できます
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ボタン */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  戻る
                </button>
              ) : (
                <Link
                  href="/client/dashboard"
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition inline-block"
                >
                  キャンセル
                </Link>
              )}

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition"
                >
                  次へ
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-8 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition"
                >
                  案件を投稿する
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}