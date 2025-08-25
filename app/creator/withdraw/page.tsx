'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function CreatorWithdrawPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  
  // アカウント残高
  const [balance] = useState({
    available: 125000,
    pending: 80000,
    minimum: 3000,
    lastWithdraw: '2024-01-25',
    lastAmount: 150000
  })

  // 出金申請フォーム
  const [withdrawForm, setWithdrawForm] = useState({
    amount: '',
    method: 'bank',
    
    // 銀行振込情報
    bankName: '三菱UFJ銀行',
    branchName: '渋谷支店',
    accountType: 'ordinary',
    accountNumber: '1234567',
    accountHolder: 'タナカ タロウ',
    
    // PayPay情報
    paypayAccount: '',
    
    // その他
    note: '',
    agreeToTerms: false
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  // 手数料計算
  const calculateFee = () => {
    const amount = parseInt(withdrawForm.amount) || 0
    if (withdrawForm.method === 'bank') {
      return 250 // 銀行振込手数料
    } else if (withdrawForm.method === 'paypay') {
      return 0 // PayPay手数料無料
    }
    return 0
  }

  const fee = calculateFee()
  const netAmount = parseInt(withdrawForm.amount) || 0
  const totalAmount = netAmount + fee

  // バリデーション
  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    const amount = parseInt(withdrawForm.amount) || 0
    
    if (!withdrawForm.amount) {
      newErrors.amount = '金額を入力してください'
    } else if (amount < balance.minimum) {
      newErrors.amount = `最低出金額は¥${balance.minimum.toLocaleString()}です`
    } else if (amount > balance.available) {
      newErrors.amount = '出金可能額を超えています'
    }

    if (withdrawForm.method === 'bank') {
      if (!withdrawForm.bankName) newErrors.bankName = '銀行名を入力してください'
      if (!withdrawForm.branchName) newErrors.branchName = '支店名を入力してください'
      if (!withdrawForm.accountNumber) newErrors.accountNumber = '口座番号を入力してください'
      if (!withdrawForm.accountHolder) newErrors.accountHolder = '口座名義を入力してください'
    } else if (withdrawForm.method === 'paypay') {
      if (!withdrawForm.paypayAccount) newErrors.paypayAccount = 'PayPayアカウントを入力してください'
    }

    if (!withdrawForm.agreeToTerms) {
      newErrors.terms = '利用規約に同意してください'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      // TODO: 実際の出金申請処理
      console.log('出金申請:', withdrawForm)
      alert('出金申請を受け付けました！')
      router.push('/creator/earnings')
    }
  }

  const quickAmounts = [10000, 30000, 50000, 100000]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* ヘッダー */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              出金申請
            </h1>
            <div className="flex items-center text-sm text-gray-600">
              <Link href="/creator/earnings" className="hover:text-orange-500">
                収益管理
              </Link>
              <span className="mx-2">/</span>
              <span>出金申請</span>
            </div>
          </div>

          {/* 残高情報 */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow p-6 mb-8 text-white">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-green-100 text-sm mb-1">出金可能額</div>
                <div className="text-2xl font-bold">¥{balance.available.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-green-100 text-sm mb-1">確定待ち</div>
                <div className="text-xl">¥{balance.pending.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-green-100 text-sm mb-1">前回の出金</div>
                <div className="text-sm">{balance.lastWithdraw}</div>
                <div className="text-xl">¥{balance.lastAmount.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-green-100 text-sm mb-1">最低出金額</div>
                <div className="text-xl">¥{balance.minimum.toLocaleString()}</div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* ステップ1: 金額入力 */}
            {step === 1 && (
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="text-xl font-semibold mb-6">出金額を入力</h2>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    出金額
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500 text-lg">¥</span>
                    <input
                      type="number"
                      value={withdrawForm.amount}
                      onChange={(e) => {
                        setWithdrawForm({...withdrawForm, amount: e.target.value})
                        setErrors({...errors, amount: ''})
                      }}
                      className={`w-full pl-8 pr-3 py-3 text-lg border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                        errors.amount ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="0"
                      max={balance.available}
                    />
                  </div>
                  {errors.amount && (
                    <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
                  )}
                  
                  {/* クイック選択 */}
                  <div className="flex gap-2 mt-3">
                    {quickAmounts.map(amount => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => {
                          setWithdrawForm({...withdrawForm, amount: amount.toString()})
                          setErrors({...errors, amount: ''})
                        }}
                        disabled={amount > balance.available}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                          amount > balance.available
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        ¥{(amount / 1000).toFixed(0)}k
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        setWithdrawForm({...withdrawForm, amount: balance.available.toString()})
                        setErrors({...errors, amount: ''})
                      }}
                      className="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium hover:bg-orange-200 transition"
                    >
                      全額
                    </button>
                  </div>
                </div>

                {/* 出金方法選択 */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    出金方法
                  </label>
                  <div className="space-y-3">
                    <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition ${
                      withdrawForm.method === 'bank' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:bg-gray-50'
                    }`}>
                      <input
                        type="radio"
                        value="bank"
                        checked={withdrawForm.method === 'bank'}
                        onChange={(e) => setWithdrawForm({...withdrawForm, method: e.target.value})}
                        className="h-4 w-4 text-orange-500 focus:ring-orange-500"
                      />
                      <div className="ml-3 flex-1">
                        <div className="font-medium">銀行振込</div>
                        <div className="text-sm text-gray-600">1-3営業日で振込 • 手数料¥250</div>
                      </div>
                    </label>

                    <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition ${
                      withdrawForm.method === 'paypay' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:bg-gray-50'
                    }`}>
                      <input
                        type="radio"
                        value="paypay"
                        checked={withdrawForm.method === 'paypay'}
                        onChange={(e) => setWithdrawForm({...withdrawForm, method: e.target.value})}
                        className="h-4 w-4 text-orange-500 focus:ring-orange-500"
                      />
                      <div className="ml-3 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">PayPay</span>
                          <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded">PayPay</span>
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded">手数料無料</span>
                        </div>
                        <div className="text-sm text-gray-600">即時振込 • 手数料無料</div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* 金額サマリー */}
                {withdrawForm.amount && (
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">出金額</span>
                      <span>¥{parseInt(withdrawForm.amount).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">手数料</span>
                      <span className={fee > 0 ? 'text-red-600' : 'text-green-600'}>
                        {fee > 0 ? `-¥${fee}` : '無料'}
                      </span>
                    </div>
                    <div className="flex justify-between font-semibold pt-2 border-t">
                      <span>お受取額</span>
                      <span className="text-lg">¥{netAmount.toLocaleString()}</span>
                    </div>
                  </div>
                )}

                <div className="flex justify-end mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      if (withdrawForm.amount && !errors.amount) {
                        setStep(2)
                      }
                    }}
                    disabled={!withdrawForm.amount || !!errors.amount}
                    className={`px-6 py-2 rounded-lg font-semibold transition ${
                      !withdrawForm.amount || !!errors.amount
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-orange-500 text-white hover:bg-orange-600'
                    }`}
                  >
                    次へ
                  </button>
                </div>
              </div>
            )}

            {/* ステップ2: 振込先情報 */}
            {step === 2 && (
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="text-xl font-semibold mb-6">振込先情報</h2>
                
                {withdrawForm.method === 'bank' && (
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          銀行名 <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={withdrawForm.bankName}
                          onChange={(e) => setWithdrawForm({...withdrawForm, bankName: e.target.value})}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                            errors.bankName ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.bankName && <p className="text-red-500 text-sm mt-1">{errors.bankName}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          支店名 <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={withdrawForm.branchName}
                          onChange={(e) => setWithdrawForm({...withdrawForm, branchName: e.target.value})}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                            errors.branchName ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.branchName && <p className="text-red-500 text-sm mt-1">{errors.branchName}</p>}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          口座種別 <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={withdrawForm.accountType}
                          onChange={(e) => setWithdrawForm({...withdrawForm, accountType: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        >
                          <option value="ordinary">普通</option>
                          <option value="current">当座</option>
                          <option value="savings">貯蓄</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          口座番号 <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={withdrawForm.accountNumber}
                          onChange={(e) => setWithdrawForm({...withdrawForm, accountNumber: e.target.value})}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                            errors.accountNumber ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.accountNumber && <p className="text-red-500 text-sm mt-1">{errors.accountNumber}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        口座名義（カタカナ） <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={withdrawForm.accountHolder}
                        onChange={(e) => setWithdrawForm({...withdrawForm, accountHolder: e.target.value})}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                          errors.accountHolder ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="ヤマダ タロウ"
                      />
                      {errors.accountHolder && <p className="text-red-500 text-sm mt-1">{errors.accountHolder}</p>}
                    </div>
                  </div>
                )}

                {withdrawForm.method === 'paypay' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      PayPayアカウント（電話番号またはPayPay ID） <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={withdrawForm.paypayAccount}
                      onChange={(e) => setWithdrawForm({...withdrawForm, paypayAccount: e.target.value})}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                        errors.paypayAccount ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="090-1234-5678 または PayPay ID"
                    />
                    {errors.paypayAccount && <p className="text-red-500 text-sm mt-1">{errors.paypayAccount}</p>}

                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-start">
                        <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <div className="text-sm text-blue-700">
                          PayPayに登録されている電話番号またはPayPay IDを入力してください。
                          送金先の確認のため、正確に入力してください。
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 mt-4">
                    備考（任意）
                  </label>
                  <textarea
                    rows={3}
                    value={withdrawForm.note}
                    onChange={(e) => setWithdrawForm({...withdrawForm, note: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="特記事項があれば記入してください"
                  />
                </div>

                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                  >
                    戻る
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-6 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition"
                  >
                    確認へ
                  </button>
                </div>
              </div>
            )}

            {/* ステップ3: 確認 */}
            {step === 3 && (
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="text-xl font-semibold mb-6">出金内容の確認</h2>
                
                <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">出金額</span>
                    <span className="font-semibold">¥{parseInt(withdrawForm.amount).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">手数料</span>
                    <span className={fee > 0 ? 'text-red-600' : 'text-green-600'}>
                      {fee > 0 ? `-¥${fee}` : '無料'}
                    </span>
                  </div>
                  <div className="flex justify-between pt-3 border-t">
                    <span className="font-medium">お受取額</span>
                    <span className="text-xl font-bold text-orange-600">
                      ¥{netAmount.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div>
                    <div className="text-sm text-gray-600">出金方法</div>
                    <div className="font-medium">
                      {withdrawForm.method === 'bank' ? '銀行振込' : 'PayPay'}
                    </div>
                  </div>

                  {withdrawForm.method === 'bank' && (
                    <div>
                      <div className="text-sm text-gray-600">振込先</div>
                      <div className="font-medium">
                        {withdrawForm.bankName} {withdrawForm.branchName}<br/>
                        {withdrawForm.accountType === 'ordinary' ? '普通' : withdrawForm.accountType} {withdrawForm.accountNumber}<br/>
                        {withdrawForm.accountHolder}
                      </div>
                    </div>
                  )}

                  {withdrawForm.method === 'paypay' && (
                    <div>
                      <div className="text-sm text-gray-600">PayPayアカウント</div>
                      <div className="font-medium">{withdrawForm.paypayAccount}</div>
                    </div>
                  )}
                </div>

                <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-yellow-600 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <div className="text-sm text-yellow-700">
                      <p className="font-medium mb-1">ご確認ください</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>出金申請後のキャンセルはできません</li>
                        <li>銀行振込は1-3営業日かかります</li>
                        <li>振込先情報に誤りがあると出金できません</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      checked={withdrawForm.agreeToTerms}
                      onChange={(e) => {
                        setWithdrawForm({...withdrawForm, agreeToTerms: e.target.checked})
                        setErrors({...errors, terms: ''})
                      }}
                      className="mt-1 h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      <Link href="/terms/withdraw" className="text-orange-500 hover:underline" target="_blank">
                        出金規約
                      </Link>
                      に同意し、上記内容で出金申請を行います
                    </span>
                  </label>
                  {errors.terms && <p className="text-red-500 text-sm mt-1">{errors.terms}</p>}
                </div>

                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                  >
                    戻る
                  </button>
                  <button
                    type="submit"
                    disabled={!withdrawForm.agreeToTerms}
                    className={`px-6 py-2 rounded-lg font-semibold transition ${
                      withdrawForm.agreeToTerms
                        ? 'bg-orange-500 text-white hover:bg-orange-600'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    出金申請する
                  </button>
                </div>
              </div>
            )}
          </form>

          {/* 注意事項 */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold mb-3">出金に関する注意事項</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                最低出金額は¥3,000です
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                銀行振込の場合、手数料¥250がかかります
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                PayPayは手数料無料で即時振込されます
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                出金申請は月5回まで可能です
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                確定待ちの収益は7-14日後に出金可能になります
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}