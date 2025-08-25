'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function PaymentSuccessPage() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(10)
  
  // 仮のデータ（実際は決済完了後のデータを取得）
  const [paymentData] = useState({
    orderId: 'ORD-2024-001234',
    amount: 57500,
    paymentMethod: 'クレジットカード',
    projectTitle: 'YouTubeチャンネルのオープニングテーマ制作',
    creator: '山田太郎',
    estimatedDelivery: '2024-02-25',
    transactionId: 'TXN-567890',
    timestamp: '2024-02-10 14:35:22'
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          router.push('/client/dashboard')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* 成功ヘッダー */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4">
              <svg className="w-12 h-12 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              決済が完了しました！
            </h1>
            <p className="text-green-100">
              ご利用ありがとうございます
            </p>
          </div>

          {/* 決済詳細 */}
          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">決済詳細</h2>
              
              <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">注文番号</span>
                  <span className="font-mono font-medium">{paymentData.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">取引ID</span>
                  <span className="font-mono text-sm">{paymentData.transactionId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">決済日時</span>
                  <span className="text-sm">{paymentData.timestamp}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">決済方法</span>
                  <span>{paymentData.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">決済金額</span>
                  <span className="text-xl font-bold text-orange-600">
                    ¥{paymentData.amount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* プロジェクト情報 */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">プロジェクト情報</h2>
              
              <div className="border rounded-lg p-6">
                <h3 className="font-medium text-gray-900 mb-2">
                  {paymentData.projectTitle}
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">担当クリエーター</span>
                    <Link href={`/creators/${paymentData.creator}`} className="text-orange-500 hover:text-orange-600">
                      {paymentData.creator}
                    </Link>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">納品予定日</span>
                    <span>{paymentData.estimatedDelivery}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 次のステップ */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">次のステップ</h2>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-orange-600 font-semibold text-sm">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">確認メールを送信しました</p>
                    <p className="text-sm text-gray-600">
                      決済完了の詳細をメールでお送りしました
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-orange-600 font-semibold text-sm">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">クリエーターが制作を開始します</p>
                    <p className="text-sm text-gray-600">
                      進捗はダッシュボードから確認できます
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-orange-600 font-semibold text-sm">3</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">納品をお待ちください</p>
                    <p className="text-sm text-gray-600">
                      納品されたらメールでお知らせします
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* アクションボタン */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/client/dashboard"
                className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-semibold text-center hover:bg-orange-600 transition"
              >
                ダッシュボードへ
              </Link>
              <Link
                href={`/client/projects/${paymentData.orderId}`}
                className="flex-1 border border-gray-300 py-3 rounded-lg font-semibold text-center hover:bg-gray-50 transition"
              >
                案件詳細を見る
              </Link>
            </div>

            {/* 自動リダイレクト通知 */}
            <div className="mt-6 text-center text-sm text-gray-500">
              {countdown > 0 && (
                <p>
                  {countdown}秒後にダッシュボードへ自動的に移動します
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ヘルプセクション */}
        <div className="mt-6 bg-white rounded-lg shadow p-6">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="font-medium text-gray-900 mb-1">
                ご不明な点がございますか？
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                決済や案件に関するご質問は、以下からお問い合わせください。
              </p>
              <div className="flex gap-3">
                <Link
                  href="/support/faq"
                  className="text-sm text-orange-500 hover:text-orange-600"
                >
                  よくある質問 →
                </Link>
                <Link
                  href="/support/contact"
                  className="text-sm text-orange-500 hover:text-orange-600"
                >
                  お問い合わせ →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}