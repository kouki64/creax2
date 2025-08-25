'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function CheckoutPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypay' | 'konbini' | 'bank'>('card')
  const [isProcessing, setIsProcessing] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [savePaymentMethod, setSavePaymentMethod] = useState(false)
  
  // 仮の注文データ
  const order = {
    id: params.id,
    projectTitle: 'YouTubeチャンネルのオープニングテーマ制作',
    creator: '山田太郎（プロ作曲家）',
    amount: 50000,
    serviceFee: 7500, // 15%
    total: 57500,
    deadline: '2024-03-01',
    escrowPeriod: 7 // 検収期間7日
  }

  const handlePayment = async () => {
    if (!agreedToTerms) {
      alert('利用規約に同意してください')
      return
    }

    setIsProcessing(true)

    // 決済処理のシミュレーション
    setTimeout(() => {
      router.push('/payment/success')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* ヘッダー */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">決済情報の確認</h1>
            <div className="flex items-center text-sm text-gray-600">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                SSL暗号化通信
              </span>
              <span className="mx-2">•</span>
              <span>エスクローサービスで安全な取引</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* 左側：決済方法選択 */}
            <div className="lg:col-span-2 space-y-6">
              {/* 注文内容確認 */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">注文内容</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <div>
                      <div className="font-medium text-gray-900">{order.projectTitle}</div>
                      <div className="text-sm text-gray-600">制作者: {order.creator}</div>
                      <div className="text-sm text-gray-600">納期: {order.deadline}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 支払い方法選択 */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">支払い方法を選択</h2>
                
                <div className="space-y-3">
                  {/* クレジットカード */}
                  <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
                    paymentMethod === 'card' ? 'border-[#ff6232] bg-orange-50' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value as any)}
                      className="mr-3"
                    />
                    <div className="flex-1">
                      <div className="flex items-center">
                        <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <rect x="1" y="4" width="22" height="16" rx="2" strokeWidth="2"/>
                          <line x1="1" y1="10" x2="23" y2="10" strokeWidth="2"/>
                        </svg>
                        <span className="font-medium">クレジットカード</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">VISA, Mastercard, JCB, AMEX対応</div>
                    </div>
                    <div className="text-xs text-gray-500">即時決済</div>
                  </label>

                  {/* PayPay */}
                  <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
                    paymentMethod === 'paypay' ? 'border-[#ff6232] bg-orange-50' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value="paypay"
                      checked={paymentMethod === 'paypay'}
                      onChange={(e) => setPaymentMethod(e.target.value as any)}
                      className="mr-3"
                    />
                    <div className="flex-1">
                      <div className="flex items-center">
                        <div className="w-6 h-6 mr-2 bg-red-500 rounded flex items-center justify-center text-white text-xs font-bold">
                          P
                        </div>
                        <span className="font-medium">PayPay</span>
                        <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full">人気</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">6,800万ユーザーが利用</div>
                    </div>
                    <div className="text-xs text-gray-500">QRコード決済</div>
                  </label>

                  {/* コンビニ決済 */}
                  <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
                    paymentMethod === 'konbini' ? 'border-[#ff6232] bg-orange-50' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value="konbini"
                      checked={paymentMethod === 'konbini'}
                      onChange={(e) => setPaymentMethod(e.target.value as any)}
                      className="mr-3"
                    />
                    <div className="flex-1">
                      <div className="flex items-center">
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span className="font-medium">コンビニ決済</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">セブンイレブン、ローソン、ファミリーマート</div>
                    </div>
                    <div className="text-xs text-gray-500">3日以内</div>
                  </label>

                  {/* 銀行振込 */}
                  <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
                    paymentMethod === 'bank' ? 'border-[#ff6232] bg-orange-50' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value="bank"
                      checked={paymentMethod === 'bank'}
                      onChange={(e) => setPaymentMethod(e.target.value as any)}
                      className="mr-3"
                    />
                    <div className="flex-1">
                      <div className="flex items-center">
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                        </svg>
                        <span className="font-medium">銀行振込</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">三菱UFJ銀行</div>
                    </div>
                    <div className="text-xs text-gray-500">3営業日以内</div>
                  </label>
                </div>

                {/* 決済方法別の詳細入力 */}
                {paymentMethod === 'card' && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          カード番号
                        </label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6232] focus:border-[#ff6232]"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            有効期限
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6232] focus:border-[#ff6232]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            セキュリティコード
                          </label>
                          <input
                            type="text"
                            placeholder="123"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6232] focus:border-[#ff6232]"
                          />
                        </div>
                      </div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={savePaymentMethod}
                          onChange={(e) => setSavePaymentMethod(e.target.checked)}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">
                          このカード情報を保存する
                        </span>
                      </label>
                    </div>
                  </div>
                )}

                {paymentMethod === 'paypay' && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg text-center">
                    <div className="w-48 h-48 bg-white border-2 border-gray-300 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <span className="text-gray-400">QRコード</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      PayPayアプリでQRコードを読み取ってください
                    </p>
                    <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                      PayPayアプリを開く
                    </button>
                  </div>
                )}

                {paymentMethod === 'konbini' && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      お支払いコンビニを選択
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6232] focus:border-[#ff6232]">
                      <option>セブンイレブン</option>
                      <option>ローソン</option>
                      <option>ファミリーマート</option>
                      <option>ミニストップ</option>
                      <option>デイリーヤマザキ</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-2">
                      決済番号をメールでお送りします。3日以内にお支払いください。
                    </p>
                  </div>
                )}

                {paymentMethod === 'bank' && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">振込先銀行</span>
                        <span className="font-medium">三菱UFJ銀行</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">支店名</span>
                        <span className="font-medium">渋谷支店</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">口座番号</span>
                        <span className="font-medium">普通 1234567</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">口座名義</span>
                        <span className="font-medium">カ）クリアックス</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-3">
                      お振込み確認後、制作を開始いたします
                    </p>
                  </div>
                )}
              </div>

              {/* エスクローサービスの説明 */}
              <div className="bg-blue-50 rounded-lg p-6">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-blue-600 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">エスクローサービスで安心取引</h3>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• お支払い金額は一時的にCreaxが預かります</li>
                      <li>• 納品物を確認後、クリエーターに支払われます</li>
                      <li>• 検収期間は{order.escrowPeriod}日間です</li>
                      <li>• 万が一のトラブル時も返金保証があります</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 利用規約同意 */}
              <div className="bg-white rounded-lg shadow p-6">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-0.5 mr-3"
                  />
                  <span className="text-sm text-gray-700">
                    <Link href="/terms" className="text-[#ff6232] hover:underline">利用規約</Link>
                    および
                    <Link href="/privacy" className="text-[#ff6232] hover:underline">プライバシーポリシー</Link>
                    に同意します
                  </span>
                </label>
              </div>
            </div>

            {/* 右側：注文サマリー */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 sticky top-4">
                <h2 className="text-lg font-semibold mb-4">お支払い金額</h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">制作費</span>
                    <span className="font-medium">¥{order.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">サービス手数料（15%）</span>
                    <span className="font-medium">¥{order.serviceFee.toLocaleString()}</span>
                  </div>
                  <div className="pt-3 border-t">
                    <div className="flex justify-between text-lg font-bold">
                      <span>合計</span>
                      <span className="text-[#ff6232]">¥{order.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handlePayment}
                  disabled={!agreedToTerms || isProcessing}
                  className={`w-full mt-6 py-3 rounded-lg font-semibold transition ${
                    !agreedToTerms || isProcessing
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-[#ff6232] text-white hover:bg-[#e5562c]'
                  }`}
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      処理中...
                    </span>
                  ) : (
                    '支払いを確定'
                  )}
                </button>

                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500">
                    決済はStripe社の安全なシステムを使用
                  </p>
                  <div className="flex items-center justify-center mt-2 space-x-2">
                    <span className="text-gray-400">
                      <svg className="w-8 h-5" viewBox="0 0 32 20" fill="currentColor">
                        <path d="M13.3 2.6C12.4 1 10.9 0 8.9 0 5.6 0 3 2.7 3 6s2.6 6 5.9 6c2 0 3.5-1 4.4-2.6l-2.1-.9c-.5.9-1.4 1.4-2.3 1.4-1.6 0-2.8-1.3-2.8-2.9s1.2-2.9 2.8-2.9c.9 0 1.8.5 2.3 1.4l2.1-.9zM29 6c0 3.3-2.6 6-5.9 6s-5.9-2.7-5.9-6 2.6-6 5.9-6 5.9 2.7 5.9 6zm-2.1 0c0-2.2-1.7-3.9-3.8-3.9S19.3 3.8 19.3 6s1.7 3.9 3.8 3.9 3.8-1.7 3.8-3.9z"/>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>

              {/* セキュリティバッジ */}
              <div className="mt-6 bg-white rounded-lg shadow p-4">
                <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                  <div className="text-center">
                    <svg className="w-6 h-6 mx-auto mb-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    SSL暗号化
                  </div>
                  <div className="text-center">
                    <svg className="w-6 h-6 mx-auto mb-1 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    安全な決済
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