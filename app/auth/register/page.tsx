'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterSelectPage() {
  const [selectedType, setSelectedType] = useState<'client' | 'creator' | null>(null)
  const router = useRouter()

  const handleContinue = () => {
    if (selectedType === 'client') {
      router.push('/auth/register/client')
    } else if (selectedType === 'creator') {
      router.push('/auth/register/creator')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Creaxへようこそ！
          </h1>
          <p className="text-lg text-gray-600">
            まずは、あなたの立場を教えてください
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* クライアント選択カード */}
          <div
            onClick={() => setSelectedType('client')}
            className={`bg-white rounded-2xl shadow-lg p-8 cursor-pointer transition-all transform hover:scale-105 ${
              selectedType === 'client' 
                ? 'ring-4 ring-orange-500 bg-orange-50' 
                : 'hover:shadow-xl'
            }`}
          >
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">🎤</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                クライアント
              </h2>
              <p className="text-gray-600">
                音楽制作を依頼したい方
              </p>
            </div>

            <ul className="space-y-3 text-left">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">プロのクリエーターに直接依頼</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">コンペ形式で最適な作品を選択</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">安心の決済システム</span>
              </li>
            </ul>

            {selectedType === 'client' && (
              <div className="mt-6 text-center">
                <span className="inline-block px-4 py-2 bg-orange-500 text-white rounded-full text-sm font-semibold">
                  選択中
                </span>
              </div>
            )}
          </div>

          {/* クリエーター選択カード */}
          <div
            onClick={() => setSelectedType('creator')}
            className={`bg-white rounded-2xl shadow-lg p-8 cursor-pointer transition-all transform hover:scale-105 ${
              selectedType === 'creator' 
                ? 'ring-4 ring-orange-500 bg-orange-50' 
                : 'hover:shadow-xl'
            }`}
          >
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">🎸</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                クリエーター
              </h2>
              <p className="text-gray-600">
                音楽制作を行いたい方
              </p>
            </div>

            <ul className="space-y-3 text-left">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">収益の85%を獲得</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">大手案件への参加機会</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">実績を積んでランクアップ</span>
              </li>
            </ul>

            {selectedType === 'creator' && (
              <div className="mt-6 text-center">
                <span className="inline-block px-4 py-2 bg-orange-500 text-white rounded-full text-sm font-semibold">
                  選択中
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-10 text-center space-y-4">
          <button
            onClick={handleContinue}
            disabled={!selectedType}
            className={`px-8 py-3 rounded-lg font-semibold text-lg transition-all transform ${
              selectedType
                ? 'bg-orange-500 text-white hover:bg-orange-600 hover:scale-105 shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {selectedType ? '次へ進む' : 'どちらかを選択してください'}
          </button>

          <div>
            <Link href="/auth/login" className="text-gray-600 hover:text-orange-500">
              すでにアカウントをお持ちの方はこちら
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}