'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'payment' | 'email' | 'security' | 'maintenance'>('general')
  const [hasChanges, setHasChanges] = useState(false)
  
  // 設定項目
  const [settings, setSettings] = useState({
    // 一般設定
    siteName: 'Creax',
    siteUrl: 'https://creax.jp',
    supportEmail: 'support@creax.jp',
    defaultLanguage: 'ja',
    timezone: 'Asia/Tokyo',
    
    // 手数料設定
    serviceFeeRate: 15,
    minServiceFee: 100,
    withdrawalFee: 250,
    minWithdrawalAmount: 5000,
    
    // 決済設定
    stripeEnabled: true,
    stripeTestMode: false,
    paypayEnabled: true,
    konbiniEnabled: true,
    bankTransferEnabled: true,
    escrowPeriodDays: 7,
    
    // メール設定
    smtpHost: 'smtp.gmail.com',
    smtpPort: 587,
    smtpUser: 'noreply@creax.jp',
    smtpPassword: '********',
    emailFromName: 'Creax',
    emailFromAddress: 'noreply@creax.jp',
    
    // セキュリティ設定
    requireEmailVerification: true,
    requireKyc: true,
    kycThreshold: 100000,
    maxLoginAttempts: 5,
    sessionTimeout: 60,
    twoFactorEnabled: false,
    
    // メンテナンス設定
    maintenanceMode: false,
    maintenanceMessage: '',
    maintenanceStartTime: '',
    maintenanceEndTime: '',
    allowedIps: ['']
  })

  const updateSetting = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
    setHasChanges(true)
  }

  const saveSetting = () => {
    if (confirm('設定を保存しますか？')) {
      // 保存処理
      setHasChanges(false)
      alert('設定を保存しました')
    }
  }

  const testEmailConnection = () => {
    alert('メール送信テストを実行しました')
  }

  const clearCache = () => {
    if (confirm('キャッシュをクリアしますか？')) {
      alert('キャッシュをクリアしました')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/admin/dashboard" className="text-gray-600 hover:text-gray-900 mr-4">
                ← ダッシュボード
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">システム設定</h1>
            </div>
            {hasChanges && (
              <div className="flex items-center gap-4">
                <span className="text-sm text-orange-600">※ 未保存の変更があります</span>
                <button
                  onClick={saveSetting}
                  className="px-4 py-2 bg-[#ff6232] text-white rounded-lg hover:bg-[#e5562c]"
                >
                  設定を保存
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="p-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* サイドメニュー */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow">
              <nav className="p-4">
                <button
                  onClick={() => setActiveTab('general')}
                  className={`w-full text-left px-4 py-2 rounded-lg mb-2 ${
                    activeTab === 'general' 
                      ? 'bg-[#ff6232] text-white' 
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  一般設定
                </button>
                <button
                  onClick={() => setActiveTab('payment')}
                  className={`w-full text-left px-4 py-2 rounded-lg mb-2 ${
                    activeTab === 'payment' 
                      ? 'bg-[#ff6232] text-white' 
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  決済・手数料
                </button>
                <button
                  onClick={() => setActiveTab('email')}
                  className={`w-full text-left px-4 py-2 rounded-lg mb-2 ${
                    activeTab === 'email' 
                      ? 'bg-[#ff6232] text-white' 
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  メール設定
                </button>
                <button
                  onClick={() => setActiveTab('security')}
                  className={`w-full text-left px-4 py-2 rounded-lg mb-2 ${
                    activeTab === 'security' 
                      ? 'bg-[#ff6232] text-white' 
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  セキュリティ
                </button>
                <button
                  onClick={() => setActiveTab('maintenance')}
                  className={`w-full text-left px-4 py-2 rounded-lg ${
                    activeTab === 'maintenance' 
                      ? 'bg-[#ff6232] text-white' 
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  メンテナンス
                </button>
              </nav>

              <div className="border-t p-4">
                <button
                  onClick={clearCache}
                  className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 mb-2"
                >
                  キャッシュクリア
                </button>
                <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  バックアップ実行
                </button>
              </div>
            </div>
          </div>

          {/* 設定内容 */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow p-6">
              {/* 一般設定 */}
              {activeTab === 'general' && (
                <div>
                  <h2 className="text-xl font-bold mb-6">一般設定</h2>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          サイト名
                        </label>
                        <input
                          type="text"
                          value={settings.siteName}
                          onChange={(e) => updateSetting('general', 'siteName', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6232]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          サイトURL
                        </label>
                        <input
                          type="url"
                          value={settings.siteUrl}
                          onChange={(e) => updateSetting('general', 'siteUrl', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6232]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          サポートメール
                        </label>
                        <input
                          type="email"
                          value={settings.supportEmail}
                          onChange={(e) => updateSetting('general', 'supportEmail', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6232]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          デフォルト言語
                        </label>
                        <select
                          value={settings.defaultLanguage}
                          onChange={(e) => updateSetting('general', 'defaultLanguage', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6232]"
                        >
                          <option value="ja">日本語</option>
                          <option value="en">English</option>
                          <option value="zh">中文</option>
                          <option value="ko">한국어</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        タイムゾーン
                      </label>
                      <select
                        value={settings.timezone}
                        onChange={(e) => updateSetting('general', 'timezone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6232]"
                      >
                        <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
                        <option value="UTC">UTC</option>
                        <option value="America/New_York">America/New_York (EST)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* 決済・手数料設定 */}
              {activeTab === 'payment' && (
                <div>
                  <h2 className="text-xl font-bold mb-6">決済・手数料設定</h2>
                  
                  <div className="space-y-6">
                    <div className="border-b pb-6">
                      <h3 className="font-semibold mb-4">手数料設定</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            サービス手数料率（%）
                          </label>
                          <input
                            type="number"
                            value={settings.serviceFeeRate}
                            onChange={(e) => updateSetting('payment', 'serviceFeeRate', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6232]"
                            min="0"
                            max="100"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            最低手数料（円）
                          </label>
                          <input
                            type="number"
                            value={settings.minServiceFee}
                            onChange={(e) => updateSetting('payment', 'minServiceFee', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6232]"
                            min="0"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            出金手数料（円）
                          </label>
                          <input
                            type="number"
                            value={settings.withdrawalFee}
                            onChange={(e) => updateSetting('payment', 'withdrawalFee', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6232]"
                            min="0"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            最低出金額（円）
                          </label>
                          <input
                            type="number"
                            value={settings.minWithdrawalAmount}
                            onChange={(e) => updateSetting('payment', 'minWithdrawalAmount', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6232]"
                            min="0"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-4">決済方法</h3>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={settings.stripeEnabled}
                            onChange={(e) => updateSetting('payment', 'stripeEnabled', e.target.checked)}
                            className="mr-3"
                          />
                          <span>Stripe（クレジットカード）</span>
                          {settings.stripeEnabled && (
                            <label className="ml-6 flex items-center">
                              <input
                                type="checkbox"
                                checked={settings.stripeTestMode}
                                onChange={(e) => updateSetting('payment', 'stripeTestMode', e.target.checked)}
                                className="mr-2"
                              />
                              <span className="text-sm text-gray-600">テストモード</span>
                            </label>
                          )}
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={settings.paypayEnabled}
                            onChange={(e) => updateSetting('payment', 'paypayEnabled', e.target.checked)}
                            className="mr-3"
                          />
                          <span>PayPay</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={settings.konbiniEnabled}
                            onChange={(e) => updateSetting('payment', 'konbiniEnabled', e.target.checked)}
                            className="mr-3"
                          />
                          <span>コンビニ決済</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={settings.bankTransferEnabled}
                            onChange={(e) => updateSetting('payment', 'bankTransferEnabled', e.target.checked)}
                            className="mr-3"
                          />
                          <span>銀行振込</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        エスクロー期間（日）
                      </label>
                      <input
                        type="number"
                        value={settings.escrowPeriodDays}
                        onChange={(e) => updateSetting('payment', 'escrowPeriodDays', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6232]"
                        min="1"
                        max="30"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        納品後、クライアントが検収するまでの期間
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* メール設定 */}
              {activeTab === 'email' && (
                <div>
                  <h2 className="text-xl font-bold mb-6">メール設定</h2>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          SMTPホスト
                        </label>
                        <input
                          type="text"
                          value={settings.smtpHost}
                          onChange={(e) => updateSetting('email', 'smtpHost', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6232]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          SMTPポート
                        </label>
                        <input
                          type="number"
                          value={settings.smtpPort}
                          onChange={(e) => updateSetting('email', 'smtpPort', parseInt(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6232]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          SMTPユーザー名
                        </label>
                        <input
                          type="text"
                          value={settings.smtpUser}
                          onChange={(e) => updateSetting('email', 'smtpUser', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6232]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          SMTPパスワード
                        </label>
                        <input
                          type="password"
                          value={settings.smtpPassword}
                          onChange={(e) => updateSetting('email', 'smtpPassword', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6232]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          送信者名
                        </label>
                        <input
                          type="text"
                          value={settings.emailFromName}
                          onChange={(e) => updateSetting('email', 'emailFromName', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6232]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          送信元アドレス
                        </label>
                        <input
                          type="email"
                          value={settings.emailFromAddress}
                          onChange={(e) => updateSetting('email', 'emailFromAddress', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6232]"
                        />
                      </div>
                    </div>

                    <button
                      onClick={testEmailConnection}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      接続テスト
                    </button>
                  </div>
                </div>
              )}

              {/* セキュリティ設定 */}
              {activeTab === 'security' && (
                <div>
                  <h2 className="text-xl font-bold mb-6">セキュリティ設定</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-4">認証設定</h3>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={settings.requireEmailVerification}
                            onChange={(e) => updateSetting('security', 'requireEmailVerification', e.target.checked)}
                            className="mr-3"
                          />
                          <span>メールアドレス認証を必須にする</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={settings.requireKyc}
                            onChange={(e) => updateSetting('security', 'requireKyc', e.target.checked)}
                            className="mr-3"
                          />
                          <span>本人確認（KYC）を必須にする</span>
                        </label>
                        {settings.requireKyc && (
                          <div className="ml-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              KYC必須となる取引額（円）
                            </label>
                            <input
                              type="number"
                              value={settings.kycThreshold}
                              onChange={(e) => updateSetting('security', 'kycThreshold', parseInt(e.target.value))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6232]"
                            />
                          </div>
                        )}
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={settings.twoFactorEnabled}
                            onChange={(e) => updateSetting('security', 'twoFactorEnabled', e.target.checked)}
                            className="mr-3"
                          />
                          <span>二段階認証を有効にする</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-4">ログイン設定</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            最大ログイン試行回数
                          </label>
                          <input
                            type="number"
                            value={settings.maxLoginAttempts}
                            onChange={(e) => updateSetting('security', 'maxLoginAttempts', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6232]"
                            min="1"
                            max="10"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            セッションタイムアウト（分）
                          </label>
                          <input
                            type="number"
                            value={settings.sessionTimeout}
                            onChange={(e) => updateSetting('security', 'sessionTimeout', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6232]"
                            min="5"
                            max="1440"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* メンテナンス設定 */}
              {activeTab === 'maintenance' && (
                <div>
                  <h2 className="text-xl font-bold mb-6">メンテナンス設定</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={settings.maintenanceMode}
                          onChange={(e) => updateSetting('maintenance', 'maintenanceMode', e.target.checked)}
                          className="mr-3"
                        />
                        <span className="font-semibold text-red-600">メンテナンスモードを有効にする</span>
                      </label>
                      {settings.maintenanceMode && (
                        <div className="mt-4 p-4 bg-red-50 rounded-lg">
                          <p className="text-red-700 text-sm">
                            ⚠️ メンテナンスモードが有効の間、管理者以外はサイトにアクセスできません
                          </p>
                        </div>
                      )}
                    </div>

                    {settings.maintenanceMode && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            メンテナンスメッセージ
                          </label>
                          <textarea
                            value={settings.maintenanceMessage}
                            onChange={(e) => updateSetting('maintenance', 'maintenanceMessage', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6232]"
                            rows={4}
                            placeholder="メンテナンス中に表示するメッセージ"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              開始日時
                            </label>
                            <input
                              type="datetime-local"
                              value={settings.maintenanceStartTime}
                              onChange={(e) => updateSetting('maintenance', 'maintenanceStartTime', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6232]"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              終了日時
                            </label>
                            <input
                              type="datetime-local"
                              value={settings.maintenanceEndTime}
                              onChange={(e) => updateSetting('maintenance', 'maintenanceEndTime', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6232]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            許可IPアドレス（管理者用）
                          </label>
                          <textarea
                            value={settings.allowedIps.join('\n')}
                            onChange={(e) => updateSetting('maintenance', 'allowedIps', e.target.value.split('\n'))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6232]"
                            rows={3}
                            placeholder="1行に1つのIPアドレス"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}