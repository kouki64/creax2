'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function ReviewPostPage({ params }: { params: { orderId: string } }) {
  const router = useRouter()
  
  // 仮のデータ（実際はAPIから取得）
  const [order] = useState({
    id: params.orderId,
    projectTitle: 'YouTubeチャンネルのオープニングテーマ制作',
    creator: {
      id: 'creator-001',
      name: '山田太郎',
      avatar: null,
      completedProjects: 45,
      rating: 4.8
    },
    completedAt: '2024-02-10',
    price: 50000
  })

  const [review, setReview] = useState({
    rating: 0,
    hoverRating: 0,
    
    // 詳細評価
    quality: 0,
    communication: 0,
    speed: 0,
    professionalism: 0,
    
    // テキストレビュー
    title: '',
    comment: '',
    
    // その他
    wouldRecommend: true,
    isAnonymous: false,
    tags: [] as string[]
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const ratingLabels = ['', '不満', 'やや不満', '普通', '満足', '大変満足']
  const aspectLabels = {
    quality: 'クオリティ',
    communication: 'コミュニケーション',
    speed: '納期・スピード',
    professionalism: 'プロ意識'
  }

  const tagOptions = [
    '高品質',
    '迅速対応',
    '丁寧な対応',
    'プロフェッショナル',
    '期待以上',
    'コスパ良好',
    '修正対応◎',
    'また依頼したい',
    'おすすめ',
    '初心者にも優しい'
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newErrors: Record<string, string> = {}
    
    if (review.rating === 0) {
      newErrors.rating = '総合評価を選択してください'
    }
    if (!review.title) {
      newErrors.title = 'タイトルを入力してください'
    }
    if (!review.comment) {
      newErrors.comment = 'レビューを入力してください'
    } else if (review.comment.length < 20) {
      newErrors.comment = 'レビューは20文字以上入力してください'
    }
    
    setErrors(newErrors)
    
    if (Object.keys(newErrors).length === 0) {
      // TODO: 実際の投稿処理
      console.log('レビュー投稿:', review)
      alert('レビューを投稿しました！')
      router.push('/client/dashboard')
    }
  }

  const StarRating = ({ 
    value, 
    onChange, 
    onHover, 
    size = 'normal' 
  }: { 
    value: number
    onChange: (rating: number) => void
    onHover?: (rating: number) => void
    size?: 'small' | 'normal' | 'large'
  }) => {
    const sizeClasses = {
      small: 'w-5 h-5',
      normal: 'w-7 h-7',
      large: 'w-10 h-10'
    }
    
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            onMouseEnter={() => onHover?.(star)}
            onMouseLeave={() => onHover?.(0)}
            className="focus:outline-none transition-colors"
          >
            <svg
              className={`${sizeClasses[size]} ${
                star <= (review.hoverRating || value)
                  ? 'text-yellow-500 fill-current'
                  : 'text-gray-300'
              } transition-colors`}
              viewBox="0 0 20 20"
            >
              <path d="M10 2l2.09 4.26L17 7.27l-3.5 3.41.83 4.82L10 13.4l-4.33 2.1.83-4.82L3 7.27l4.91-1.01L10 2z" />
            </svg>
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* ヘッダー */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              評価・レビューを投稿
            </h1>
            <p className="text-gray-600">
              プロジェクトの評価をお聞かせください
            </p>
          </div>

          {/* プロジェクト情報 */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  {order.projectTitle}
                </h2>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>受注番号: {order.id}</span>
                  <span>完了日: {order.completedAt}</span>
                  <span>金額: ¥{order.price.toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t flex items-center">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                {order.creator.avatar ? (
                  <img src={order.creator.avatar} alt="" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <span className="text-gray-600 font-medium">{order.creator.name[0]}</span>
                )}
              </div>
              <div>
                <Link href={`/creators/${order.creator.id}`} className="font-medium text-gray-900 hover:text-orange-500">
                  {order.creator.name}
                </Link>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <span>完了案件: {order.creator.completedProjects}</span>
                  <span className="flex items-center">
                    <span className="text-yellow-500 mr-1">★</span>
                    {order.creator.rating}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* 総合評価 */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">総合評価</h3>
              
              <div className="flex flex-col items-center">
                <StarRating
                  value={review.rating}
                  onChange={(rating) => {
                    setReview({ ...review, rating })
                    setErrors({ ...errors, rating: '' })
                  }}
                  onHover={(rating) => setReview({ ...review, hoverRating: rating })}
                  size="large"
                />
                <div className="mt-2 text-lg font-medium text-gray-900">
                  {ratingLabels[review.hoverRating || review.rating]}
                </div>
                {errors.rating && (
                  <p className="text-red-500 text-sm mt-2">{errors.rating}</p>
                )}
              </div>
            </div>

            {/* 詳細評価 */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">詳細評価（任意）</h3>
              
              <div className="space-y-4">
                {Object.entries(aspectLabels).map(([key, label]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 w-40">{label}</span>
                    <StarRating
                      value={review[key as keyof typeof review] as number}
                      onChange={(rating) => setReview({ ...review, [key]: rating })}
                      size="small"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* テキストレビュー */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">レビューを書く</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  タイトル <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={review.title}
                  onChange={(e) => {
                    setReview({ ...review, title: e.target.value })
                    setErrors({ ...errors, title: '' })
                  }}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                    errors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="例：期待以上のクオリティでした！"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  レビュー内容 <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={5}
                  value={review.comment}
                  onChange={(e) => {
                    setReview({ ...review, comment: e.target.value })
                    setErrors({ ...errors, comment: '' })
                  }}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                    errors.comment ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="プロジェクトの感想、クリエーターの対応、成果物のクオリティなどを記入してください（20文字以上）"
                />
                <div className="flex justify-between items-center mt-1">
                  <div>
                    {errors.comment && (
                      <p className="text-red-500 text-sm">{errors.comment}</p>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">
                    {review.comment.length}/1000文字
                  </span>
                </div>
              </div>

              {/* タグ選択 */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  タグを選択（任意）
                </label>
                <div className="flex flex-wrap gap-2">
                  {tagOptions.map(tag => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => {
                        if (review.tags.includes(tag)) {
                          setReview({
                            ...review,
                            tags: review.tags.filter(t => t !== tag)
                          })
                        } else {
                          setReview({
                            ...review,
                            tags: [...review.tags, tag]
                          })
                        }
                      }}
                      className={`px-3 py-1 rounded-full text-sm transition ${
                        review.tags.includes(tag)
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* その他のオプション */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">その他</h3>
              
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={review.wouldRecommend}
                    onChange={(e) => setReview({ ...review, wouldRecommend: e.target.checked })}
                    className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    このクリエーターを他の人におすすめしたい
                  </span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={review.isAnonymous}
                    onChange={(e) => setReview({ ...review, isAnonymous: e.target.checked })}
                    className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    匿名でレビューを投稿する
                  </span>
                </label>
              </div>
            </div>

            {/* 投稿前の確認 */}
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div className="text-sm text-blue-700">
                  <p className="font-medium mb-1">レビュー投稿に関する注意事項</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>投稿されたレビューは公開され、他のユーザーが閲覧できます</li>
                    <li>個人情報や機密情報を含めないようご注意ください</li>
                    <li>不適切な内容は削除される場合があります</li>
                    <li>投稿後の編集は可能ですが、削除はできません</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* アクションボタン */}
            <div className="flex gap-3">
              <Link
                href="/client/dashboard"
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-center hover:bg-gray-50 transition"
              >
                後で評価する
              </Link>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition"
              >
                レビューを投稿
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}