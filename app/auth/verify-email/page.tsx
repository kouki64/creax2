'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

export default function VerifyEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [verificationStatus, setVerificationStatus] = useState<'verifying' | 'success' | 'error' | 'expired'>('verifying')
  const [email, setEmail] = useState('')
  const [resendStatus, setResendStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [countdown, setCountdown] = useState(0)
  
  // URLパラメータからトークンとメールアドレスを取得
  const token = searchParams.get('token')
  const emailParam = searchParams.get('email')
  
  useEffect(() => {
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam))
    }
    
    // トークンがある場合は自動検証
    if (token) {
      verifyEmail(token)
    } else {
      // トークンがない場合は再送信画面を表示
      setVerificationStatus('error')
    }
  }, [token, emailParam])
  
  useEffect(() => {
    // カウントダウンタイマー
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])
  
  const verifyEmail = async (verificationToken: string) => {
    // 検証処理のシミュレーション
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // ランダムに成功/失敗/期限切れを決定（実際はAPIレスポンスに基づく）
    const random = Math.random()
    if (random > 0.3) {
      setVerificationStatus('success')
      // 3秒後にダッシュボードへリダイレクト
      setTimeout(() => {
        router.push('/client/dashboard')
      }, 3000)
    } else if (random > 0.15) {
      setVerificationStatus('expired')
    } else {
      setVerificationStatus('error')
    }
  }
  
  const handleResendEmail = async () => {
    if (!email || resendStatus === 'sending' || countdown > 0) return
    
    setResendStatus('sending')
    
    // 再送信処理のシミュレーション
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setResendStatus('sent')
    setCountdown(60) // 60秒のクールダウン
    
    // 3秒後にステータスをリセット
    setTimeout(() => {
      setResendStatus('idle')
    }, 3000)
  }
  
  // 検証中の画面
  if (verificationStatus === 'verifying') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              メールアドレスを確認中...
            </h2>
            <p className="text-gray-600">
              少々お待ちください
            </p>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        </div>
      </div>
    )
  }
  
  // 認証成功の画面
  if (verificationStatus === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              メール認証完了！
            </h2>
            <p className="text-gray-600">
              メールアドレスの認証が完了しました。<br />
              Creaxへようこそ！
            </p>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4 mb-6">
            <p className="text-green-800 text-sm">
              3秒後にダッシュボードへ移動します...
            </p>
          </div>
          
          <Link
            href="/client/dashboard"
            className="inline-block px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            今すぐダッシュボードへ
          </Link>
        </div>
      </div>
    )
  }
  
  // 認証期限切れの画面
  if (verificationStatus === 'expired') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              認証リンクの有効期限切れ
            </h2>
            <p className="text-gray-600">
              このメール認証リンクは有効期限が切れています。<br />
              新しい認証メールを送信してください。
            </p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                メールアドレス
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            
            <button
              onClick={handleResendEmail}
              disabled={!email || resendStatus === 'sending' || countdown > 0}
              className={`w-full px-6 py-3 rounded-lg font-semibold transition ${
                !email || resendStatus === 'sending' || countdown > 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-orange-500 text-white hover:bg-orange-600'
              }`}
            >
              {resendStatus === 'sending' && '送信中...'}
              {resendStatus === 'sent' && '✓ 送信しました'}
              {resendStatus === 'idle' && countdown > 0 && `再送信まで ${countdown}秒`}
              {resendStatus === 'idle' && countdown === 0 && '認証メールを再送信'}
            </button>
            
            {resendStatus === 'sent' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-green-800 text-sm">
                  認証メールを送信しました。メールボックスをご確認ください。
                </p>
              </div>
            )}
          </div>
          
          <div className="mt-6 text-center">
            <Link href="/auth/login" className="text-sm text-gray-600 hover:text-orange-500">
              ← ログイン画面に戻る
            </Link>
          </div>
        </div>
      </div>
    )
  }
  
  // エラー/再送信画面
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            メールアドレスの認証
          </h2>
          <p className="text-gray-600">
            登録いただいたメールアドレスに認証メールを送信しました。<br />
            メール内のリンクをクリックして認証を完了してください。
          </p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-2">メールが届かない場合</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 迷惑メールフォルダをご確認ください</li>
            <li>• メールアドレスが正しいかご確認ください</li>
            <li>• しばらく待ってから再送信してください</li>
          </ul>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              メールアドレス
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          
          <button
            onClick={handleResendEmail}
            disabled={!email || resendStatus === 'sending' || countdown > 0}
            className={`w-full px-6 py-3 rounded-lg font-semibold transition ${
              !email || resendStatus === 'sending' || countdown > 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-orange-500 text-white hover:bg-orange-600'
            }`}
          >
            {resendStatus === 'sending' && (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                送信中...
              </span>
            )}
            {resendStatus === 'sent' && '✓ 送信しました'}
            {resendStatus === 'idle' && countdown > 0 && `再送信まで ${countdown}秒`}
            {resendStatus === 'idle' && countdown === 0 && '認証メールを再送信'}
          </button>
          
          {resendStatus === 'sent' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-green-800 text-sm text-center">
                認証メールを送信しました。<br />
                メールボックスをご確認ください。
              </p>
            </div>
          )}
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <Link href="/auth/login" className="text-gray-600 hover:text-orange-500">
              ← ログインに戻る
            </Link>
            <Link href="/support/contact" className="text-gray-600 hover:text-orange-500">
              お問い合わせ →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}