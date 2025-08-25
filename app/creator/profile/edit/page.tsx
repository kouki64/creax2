'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function CreatorProfileEditPage() {
  const router = useRouter()
  
  const [activeTab, setActiveTab] = useState<'basic' | 'skills' | 'portfolio' | 'pricing'>('basic')
  
  const [profile, setProfile] = useState({
    // 基本情報
    displayName: '田中太郎',
    realName: '田中太郎',
    email: 'tanaka@example.com',
    phoneNumber: '090-1234-5678',
    avatar: null as File | null,
    bio: 'プロの音楽プロデューサーとして10年以上の経験があります。ポップス、ロック、EDMなど幅広いジャンルに対応可能です。',
    
    // スキル情報
    creatorTypes: ['composer', 'arranger', 'mixing'],
    specialties: ['pop', 'rock', 'edm'],
    experience: '5-10',
    skills: ['Logic Pro', 'Pro Tools', 'Cubase', 'FL Studio'],
    languages: ['日本語', '英語'],
    
    // ポートフォリオ
    portfolioUrl: 'https://soundcloud.com/tanaka',
    youtubeUrl: 'https://youtube.com/@tanaka',
    achievements: '・2023年 〇〇音楽賞受賞\n・メジャーアーティスト10組以上の楽曲制作\n・CM音楽100本以上制作',
    portfolioFiles: [] as File[],
    
    // 料金設定
    hourlyRate: '8000',
    projectRates: {
      bgm: '50000',
      arrangement: '30000',
      mixing: '20000',
      mastering: '15000'
    },
    expressRate: '150', // 特急料金（%）
    revisionIncluded: '2',
    additionalRevisionRate: '5000',
    
    // 稼働状況
    availability: 'available' as 'available' | 'busy' | 'unavailable',
    responseTime: '24',
    workingHours: '平日 10:00-19:00',
    holidays: '土日祝日',
    
    // 通知設定
    notifications: {
      email: true,
      sms: false,
      push: true,
      newsletter: true
    }
  })

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

  const handleSave = () => {
    // TODO: 実際の保存処理
    console.log('プロフィール保存:', profile)
    alert('プロフィールを更新しました！')
    router.push('/creator/dashboard')
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setProfile({ ...profile, avatar: file })
    }
  }

  const handlePortfolioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setProfile({ ...profile, portfolioFiles: [...profile.portfolioFiles, ...files] })
  }

  const toggleArrayItem = (field: 'creatorTypes' | 'specialties', value: string) => {
    const currentValues = profile[field] as string[]
    if (currentValues.includes(value)) {
      setProfile({
        ...profile,
        [field]: currentValues.filter(v => v !== value)
      })
    } else {
      setProfile({
        ...profile,
        [field]: [...currentValues, value]
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* ヘッダー */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              プロフィール編集
            </h1>
            <p className="text-gray-600">
              プロフィールを充実させて、より多くの案件を獲得しましょう
            </p>
          </div>

          {/* プロフィール完成度 */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">プロフィール完成度</h3>
              <span className="text-2xl font-bold text-orange-600">75%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-3 rounded-full" style={{ width: '75%' }}></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
              <div className="flex items-center text-green-600">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                基本情報
              </div>
              <div className="flex items-center text-green-600">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                スキル設定
              </div>
              <div className="flex items-center text-yellow-600">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                ポートフォリオ
              </div>
              <div className="flex items-center text-gray-400">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                料金設定
              </div>
            </div>
          </div>

          {/* タブナビゲーション */}
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="border-b">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab('basic')}
                  className={`py-3 px-6 border-b-2 font-medium text-sm transition ${
                    activeTab === 'basic'
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  基本情報
                </button>
                <button
                  onClick={() => setActiveTab('skills')}
                  className={`py-3 px-6 border-b-2 font-medium text-sm transition ${
                    activeTab === 'skills'
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  スキル・経験
                </button>
                <button
                  onClick={() => setActiveTab('portfolio')}
                  className={`py-3 px-6 border-b-2 font-medium text-sm transition ${
                    activeTab === 'portfolio'
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  ポートフォリオ
                </button>
                <button
                  onClick={() => setActiveTab('pricing')}
                  className={`py-3 px-6 border-b-2 font-medium text-sm transition ${
                    activeTab === 'pricing'
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  料金・稼働
                </button>
              </nav>
            </div>

            <div className="p-6">
              {/* 基本情報タブ */}
              {activeTab === 'basic' && (
                <div className="space-y-6">
                  {/* プロフィール画像 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      プロフィール画像
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                        {profile.avatar ? (
                          <img 
                            src={URL.createObjectURL(profile.avatar)} 
                            alt="Avatar" 
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="avatar-upload"
                        />
                        <label
                          htmlFor="avatar-upload"
                          className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                        >
                          画像を選択
                        </label>
                        <p className="text-xs text-gray-500 mt-1">
                          推奨: 400x400px以上、5MB以下
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 表示名・本名 */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        表示名（アーティスト名）
                      </label>
                      <input
                        type="text"
                        value={profile.displayName}
                        onChange={(e) => setProfile({...profile, displayName: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        本名
                      </label>
                      <input
                        type="text"
                        value={profile.realName}
                        onChange={(e) => setProfile({...profile, realName: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                  </div>

                  {/* 連絡先 */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        メールアドレス
                      </label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        電話番号
                      </label>
                      <input
                        type="tel"
                        value={profile.phoneNumber}
                        onChange={(e) => setProfile({...profile, phoneNumber: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                  </div>

                  {/* 自己紹介 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      自己紹介
                    </label>
                    <textarea
                      rows={5}
                      value={profile.bio}
                      onChange={(e) => setProfile({...profile, bio: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="あなたの経験、得意分野、制作環境などを記入してください"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {profile.bio.length}/500文字
                    </p>
                  </div>
                </div>
              )}

              {/* スキル・経験タブ */}
              {activeTab === 'skills' && (
                <div className="space-y-6">
                  {/* クリエータータイプ */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      クリエータータイプ（複数選択可）
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {creatorTypeOptions.map(option => (
                        <label key={option.value} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                          <input
                            type="checkbox"
                            checked={profile.creatorTypes.includes(option.value)}
                            onChange={() => toggleArrayItem('creatorTypes', option.value)}
                            className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                          />
                          <span className="ml-2 text-sm">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* 得意ジャンル */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      得意ジャンル（複数選択可）
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {specialtyOptions.map(option => (
                        <label key={option.value} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                          <input
                            type="checkbox"
                            checked={profile.specialties.includes(option.value)}
                            onChange={() => toggleArrayItem('specialties', option.value)}
                            className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                          />
                          <span className="ml-2 text-sm">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* 経験年数 */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        経験年数
                      </label>
                      <select
                        value={profile.experience}
                        onChange={(e) => setProfile({...profile, experience: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      >
                        <option value="less-1">1年未満</option>
                        <option value="1-3">1〜3年</option>
                        <option value="3-5">3〜5年</option>
                        <option value="5-10">5〜10年</option>
                        <option value="more-10">10年以上</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        対応言語
                      </label>
                      <input
                        type="text"
                        value={profile.languages.join(', ')}
                        onChange={(e) => setProfile({...profile, languages: e.target.value.split(', ')})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        placeholder="日本語, 英語"
                      />
                    </div>
                  </div>

                  {/* スキル・使用ソフト */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      使用ソフト・スキル
                    </label>
                    <input
                      type="text"
                      value={profile.skills.join(', ')}
                      onChange={(e) => setProfile({...profile, skills: e.target.value.split(', ')})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Logic Pro, Pro Tools, Cubase"
                    />
                  </div>
                </div>
              )}

              {/* ポートフォリオタブ */}
              {activeTab === 'portfolio' && (
                <div className="space-y-6">
                  {/* URL */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ポートフォリオURL
                      </label>
                      <input
                        type="url"
                        value={profile.portfolioUrl}
                        onChange={(e) => setProfile({...profile, portfolioUrl: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        placeholder="https://soundcloud.com/..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        YouTube URL
                      </label>
                      <input
                        type="url"
                        value={profile.youtubeUrl}
                        onChange={(e) => setProfile({...profile, youtubeUrl: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        placeholder="https://youtube.com/..."
                      />
                    </div>
                  </div>

                  {/* 実績 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      実績・経歴
                    </label>
                    <textarea
                      rows={5}
                      value={profile.achievements}
                      onChange={(e) => setProfile({...profile, achievements: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="過去の制作実績、受賞歴、参加プロジェクトなど"
                    />
                  </div>

                  {/* ポートフォリオファイル */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ポートフォリオ音源
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <input
                        type="file"
                        accept="audio/*"
                        multiple
                        onChange={handlePortfolioUpload}
                        className="hidden"
                        id="portfolio-upload"
                      />
                      <label htmlFor="portfolio-upload" className="cursor-pointer">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="mt-2 text-sm text-gray-600">
                          クリックして音源をアップロード
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          MP3, WAV (最大10MB)
                        </p>
                      </label>
                    </div>
                    
                    {profile.portfolioFiles.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {profile.portfolioFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm text-gray-900">{file.name}</span>
                            <button className="text-red-500 hover:text-red-600 text-sm">
                              削除
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 料金・稼働タブ */}
              {activeTab === 'pricing' && (
                <div className="space-y-6">
                  {/* 基本料金 */}
                  <div>
                    <h3 className="font-medium mb-3">基本料金設定</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          時間単価
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-2.5 text-gray-500">¥</span>
                          <input
                            type="number"
                            value={profile.hourlyRate}
                            onChange={(e) => setProfile({...profile, hourlyRate: e.target.value})}
                            className="w-full pl-8 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          />
                          <span className="absolute right-3 top-2.5 text-gray-500">/時間</span>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          特急料金（通常料金の%）
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            value={profile.expressRate}
                            onChange={(e) => setProfile({...profile, expressRate: e.target.value})}
                            className="w-full pr-8 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          />
                          <span className="absolute right-3 top-2.5 text-gray-500">%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* プロジェクト別料金 */}
                  <div>
                    <h3 className="font-medium mb-3">プロジェクト別料金（目安）</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">BGM制作（1曲）</label>
                        <div className="relative">
                          <span className="absolute left-3 top-2.5 text-gray-500">¥</span>
                          <input
                            type="number"
                            value={profile.projectRates.bgm}
                            onChange={(e) => setProfile({...profile, projectRates: {...profile.projectRates, bgm: e.target.value}})}
                            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">アレンジ（1曲）</label>
                        <div className="relative">
                          <span className="absolute left-3 top-2.5 text-gray-500">¥</span>
                          <input
                            type="number"
                            value={profile.projectRates.arrangement}
                            onChange={(e) => setProfile({...profile, projectRates: {...profile.projectRates, arrangement: e.target.value}})}
                            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">ミキシング（1曲）</label>
                        <div className="relative">
                          <span className="absolute left-3 top-2.5 text-gray-500">¥</span>
                          <input
                            type="number"
                            value={profile.projectRates.mixing}
                            onChange={(e) => setProfile({...profile, projectRates: {...profile.projectRates, mixing: e.target.value}})}
                            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">マスタリング（1曲）</label>
                        <div className="relative">
                          <span className="absolute left-3 top-2.5 text-gray-500">¥</span>
                          <input
                            type="number"
                            value={profile.projectRates.mastering}
                            onChange={(e) => setProfile({...profile, projectRates: {...profile.projectRates, mastering: e.target.value}})}
                            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 修正対応 */}
                  <div>
                    <h3 className="font-medium mb-3">修正対応</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">
                          基本料金に含まれる修正回数
                        </label>
                        <select
                          value={profile.revisionIncluded}
                          onChange={(e) => setProfile({...profile, revisionIncluded: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        >
                          <option value="0">0回（修正なし）</option>
                          <option value="1">1回</option>
                          <option value="2">2回</option>
                          <option value="3">3回</option>
                          <option value="unlimited">無制限</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">
                          追加修正料金（1回あたり）
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-2.5 text-gray-500">¥</span>
                          <input
                            type="number"
                            value={profile.additionalRevisionRate}
                            onChange={(e) => setProfile({...profile, additionalRevisionRate: e.target.value})}
                            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 稼働状況 */}
                  <div>
                    <h3 className="font-medium mb-3">稼働状況</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          現在の状況
                        </label>
                        <select
                          value={profile.availability}
                          onChange={(e) => setProfile({...profile, availability: e.target.value as any})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        >
                          <option value="available">対応可能</option>
                          <option value="busy">忙しい（要相談）</option>
                          <option value="unavailable">新規受付停止中</option>
                        </select>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-700 mb-1">
                            返信時間の目安
                          </label>
                          <select
                            value={profile.responseTime}
                            onChange={(e) => setProfile({...profile, responseTime: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          >
                            <option value="1">1時間以内</option>
                            <option value="6">6時間以内</option>
                            <option value="12">12時間以内</option>
                            <option value="24">24時間以内</option>
                            <option value="48">48時間以内</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm text-gray-700 mb-1">
                            稼働時間
                          </label>
                          <input
                            type="text"
                            value={profile.workingHours}
                            onChange={(e) => setProfile({...profile, workingHours: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            placeholder="例：平日 10:00-19:00"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 保存ボタン */}
          <div className="flex justify-end gap-3">
            <Link
              href="/creator/dashboard"
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              キャンセル
            </Link>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition"
            >
              保存する
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}