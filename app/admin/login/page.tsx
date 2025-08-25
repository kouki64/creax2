'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [twoFactorCode, setTwoFactorCode] = useState('')
  const [showTwoFactor, setShowTwoFactor] = useState(false)
  const [rememberDevice, setRememberDevice] = useState(false)
  
  // ログイン試行回数とロックアウト
  const [loginAttempts, setLoginAttempts] = useState(0)
  const [isLocked, setIsLocked] = useState(false)
  const [lockoutTime, setLockoutTime] = useState<Date | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // ロックアウトチェック
    if (isLocked) {
      const remainingTime = lockoutTime ? Math.ceil((lockoutTime.getTime() - Date.now()) / 1000) : 0
      setError(`アカウントがロックされています。${remainingTime}秒後に再試行してください。`)
      return
    }

    setIsLoading(true)
    setError('')

    // ログイン処理のシミュレーション
    setTimeout(() => {
      // 管理者認証チェック（実際にはAPIコール）
      if (email === 'admin@creax.jp' && password === 'admin123') {
        // 二段階認証が有効な場合
        if (!showTwoFactor) {
          setShowTwoFactor(true)
          setIsLoading(false)
          return
        }
        
        // 二段階認証コードの確認
        if (twoFactorCode === '123456') {
          // ログイン成功
          sessionStorage.setItem('adminLoggedIn', 'true')
          sessionStorage.setItem('adminEmail', email)
          router.push('/admin/dashboard')
        } else {
          setError('認証コードが正しくありません')
          setIsLoading(false)
        }
      } else {
        // ログイン失敗
        const attempts = loginAttempts + 1
        setLoginAttempts(attempts)
        
        if (attempts >= 5) {
          // 5回失敗でロックアウト
          setIsLocked(true)
          const lockTime = new Date(Date.now() + 30 * 60 * 1000) // 30分ロック
          setLockoutTime(lockTime)
          setError('ログイン試行回数が上限に達しました。30分後に再試行してください。')
        } else {
          setError(`メールアドレスまたはパスワードが正しくありません（残り${5 - attempts}回）`)
        }
        setIsLoading(false)
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
      {/* 背景パターン */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)`
        }}></div>
      </div>

      <div className="relative max-w-md w-full">
        {/* セキュリティバッジ */}
        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 backdrop-blur-md rounded-full border border-green-500/30">
            <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-xs text-green-400 font-medium">SSL暗号化通信</span>
          </div>
        </div>

        {/* ログインカード */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          {/* ヘッダー */}
          <div className="bg-gradient-to-r from-[#ff6232] to-[#e5562c] p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                <span className="text-3xl font-bold text-[#ff6232]">C</span>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white">Creax 管理画面</h1>
            <p className="text-orange-100 text-sm mt-2">Administrator Portal</p>
          </div>

          {/* フォーム */}
          <form onSubmit={handleLogin} className="p-8">
            {!showTwoFactor ? (
              <>
                {/* メールアドレス */}
                <div className="mb-6">
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    管理者メールアドレス
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-3 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff6232] focus:border-transparent backdrop-blur-md"
                      placeholder="admin@creax.jp"
                      required
                      disabled={isLocked}
                    />
                  </div>
                </div>

                {/* パスワード */}
                <div className="mb-6">
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    パスワード
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff6232] focus:border-transparent backdrop-blur-md"
                      placeholder="••••••••"
                      required
                      disabled={isLocked}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <svg className="w-5 h-5 text-gray-400 hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-gray-400 hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              /* 二段階認証 */
              <div className="mb-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-white mb-2">二段階認証</h2>
                  <p className="text-gray-400 text-sm">
                    認証アプリに表示されている6桁のコードを入力してください
                  </p>
                </div>

                <div className="mb-4">
                  <input
                    type="text"
                    value={twoFactorCode}
                    onChange={(e) => setTwoFactorCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white text-center text-2xl tracking-widest placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff6232] focus:border-transparent backdrop-blur-md"
                    placeholder="000000"
                    maxLength={6}
                    pattern="[0-9]{6}"
                    required
                  />
                </div>

                <label className="flex items-center justify-center mb-6">
                  <input
                    type="checkbox"
                    checked={rememberDevice}
                    onChange={(e) => setRememberDevice(e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-300">このデバイスを30日間記憶する</span>
                </label>
              </div>
            )}

            {/* エラーメッセージ */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="text-red-400 text-sm">{error}</span>
                </div>
              </div>
            )}

            {/* ログインボタン */}
            <button
              type="submit"
              disabled={isLoading || isLocked}
              className={`w-full py-3 rounded-lg font-semibold transition ${
                isLoading || isLocked
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#ff6232] to-[#e5562c] text-white hover:shadow-lg hover:shadow-orange-500/25'
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  認証中...
                </span>
              ) : showTwoFactor ? (
                '認証'
              ) : (
                '管理者としてログイン'
              )}
            </button>

            {/* その他のリンク */}
            {!showTwoFactor && (
              <div className="mt-6 text-center">
                <a href="#" className="text-sm text-gray-400 hover:text-white transition">
                  パスワードを忘れた場合
                </a>
              </div>
            )}
          </form>
        </div>

        {/* セキュリティ情報 */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            このページは管理者専用です。不正アクセスは記録されます。
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
              </svg>
              <span className="text-xs text-gray-600">IP: {typeof window !== 'undefined' ? '192.168.1.1' : ''}</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span className="text-xs text-gray-600">
                {new Date().toLocaleString('ja-JP')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}