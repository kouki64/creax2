'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function HomePage() {
  const [selectedUserType, setSelectedUserType] = useState<'client' | 'creator' | null>(null)

  return (
    <div className="min-h-screen">
      {/* ヒーローセクション */}
      <section className="relative bg-gradient-to-br from-orange-500 via-orange-600 to-red-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-8">
              <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                🎵 音楽制作の革命がここから始まる
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              音楽制作の
              <span className="block text-yellow-300">新しいカタチ</span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-orange-100 max-w-3xl mx-auto">
              クライアントとクリエーターを繋ぐ音楽制作マッチングプラットフォーム
              <br />
              <span className="text-lg">アレンジャー・エンジニアなど裏方クリエーターの地位向上を実現</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/auth/register?type=client"
                className="bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-50 transform hover:scale-105 transition shadow-xl"
              >
                🎤 クライアントとして始める
              </Link>
              <Link 
                href="/auth/register?type=creator"
                className="bg-orange-700 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-800 transform hover:scale-105 transition shadow-xl border-2 border-orange-600"
              >
                🎸 クリエーターとして始める
              </Link>
            </div>
          </div>
        </div>
        {/* 波形アニメーション */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-20">
            <path 
              fill="white" 
              d="M0,64 C360,120 720,0 1440,64 L1440,120 L0,120 Z"
              opacity="0.5"
            />
            <path 
              fill="white" 
              d="M0,88 C240,120 480,56 720,88 C960,120 1200,56 1440,88 L1440,120 L0,120 Z"
            />
          </svg>
        </div>
      </section>

      {/* 数字で見るCreax */}
      <section className="py-16 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-orange-600">85%</div>
              <div className="text-gray-600 mt-2">クリエーター収益率</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600">15%</div>
              <div className="text-gray-600 mt-2">業界最安の手数料</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600">24h</div>
              <div className="text-gray-600 mt-2">最短マッチング時間</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600">∞</div>
              <div className="text-gray-600 mt-2">創造の可能性</div>
            </div>
          </div>
        </div>
      </section>

      {/* 特徴セクション */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              なぜ<span className="text-orange-500">Creax</span>が選ばれるのか
            </h2>
            <p className="text-gray-600 text-lg">革新的な機能と公平な仕組み</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                <span className="text-white text-3xl">💰</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">
                業界最高の収益率
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                手数料はわずか15%。クリエーターの努力に正当な報酬を提供します。
                iTunesやSpotifyより圧倒的に高い収益率を実現。
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                <span className="text-white text-3xl">📱</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">
                PayPay決済対応
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                日本で最も使われているPayPayで簡単決済。
                クレジットカード、コンビニ決済にも対応予定。
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                <span className="text-white text-3xl">🎼</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">
                裏方クリエーター重視
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                アレンジャー、ミキシング・マスタリングエンジニアなど、
                音楽制作の要となる裏方の地位向上を実現。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 利用者タイプ選択 */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              あなたはどちらのタイプ？
            </h2>
            <p className="text-gray-600">それぞれに最適化された機能をご用意</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* クライアント */}
            <div 
              className={`bg-white p-8 rounded-2xl shadow-lg cursor-pointer transition-all ${
                selectedUserType === 'client' ? 'ring-4 ring-orange-500 transform scale-105' : 'hover:shadow-xl'
              }`}
              onClick={() => setSelectedUserType('client')}
            >
              <div className="text-center mb-6">
                <div className="text-5xl mb-4">🎤</div>
                <h3 className="text-2xl font-bold text-orange-600">クライアント</h3>
                <p className="text-gray-500 mt-2">音楽を作ってほしい方</p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">プロのクリエーターに直接依頼</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">コンペ形式で最適な作品を選定</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">音楽制作会社より50%以上安い</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">著作権処理も安心サポート</span>
                </li>
              </ul>
              {selectedUserType === 'client' && (
                <Link 
                  href="/auth/register?type=client"
                  className="block w-full bg-orange-500 text-white text-center py-3 rounded-lg mt-6 hover:bg-orange-600 transition"
                >
                  クライアントとして登録
                </Link>
              )}
            </div>

            {/* クリエーター */}
            <div 
              className={`bg-white p-8 rounded-2xl shadow-lg cursor-pointer transition-all ${
                selectedUserType === 'creator' ? 'ring-4 ring-orange-500 transform scale-105' : 'hover:shadow-xl'
              }`}
              onClick={() => setSelectedUserType('creator')}
            >
              <div className="text-center mb-6">
                <div className="text-5xl mb-4">🎸</div>
                <h3 className="text-2xl font-bold text-orange-600">クリエーター</h3>
                <p className="text-gray-500 mt-2">音楽を作る方</p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">収益の85%を獲得</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">大手レーベルの案件にも参加可能</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">原盤権・著作権の公平な分配</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">実績を積んでランクアップ</span>
                </li>
              </ul>
              {selectedUserType === 'creator' && (
                <Link 
                  href="/auth/register?type=creator"
                  className="block w-full bg-orange-500 text-white text-center py-3 rounded-lg mt-6 hover:bg-orange-600 transition"
                >
                  クリエーターとして登録
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 開発フェーズ */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              段階的な機能拡張
            </h2>
            <p className="text-gray-600">Creaxは進化し続けます</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {/* Phase 1 */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold mb-2">Phase 1: 基本マッチング機能</h3>
                  <p className="text-gray-600">コンペ・指名形式での案件マッチング、PayPay決済対応</p>
                  <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    現在開発中
                  </span>
                </div>
              </div>

              {/* Phase 2 */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-300 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold mb-2">Phase 2: 楽曲販売・著作権管理</h3>
                  <p className="text-gray-600">Bandcamp型販売システム、JASRAC対応</p>
                  <span className="inline-block mt-2 px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                    2025年Q2予定
                  </span>
                </div>
              </div>

              {/* Phase 3 */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-300 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold mb-2">Phase 3: ライブ配信・イベント機能</h3>
                  <p className="text-gray-600">リアルタイムコラボレーション、オーディション開催</p>
                  <span className="inline-block mt-2 px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                    2025年Q3予定
                  </span>
                </div>
              </div>

              {/* Phase 4 */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-300 text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold mb-2">Phase 4: ルーム・ファンクラブ機能</h3>
                  <p className="text-gray-600">アーティストルーム、月額課金、SNS機能</p>
                  <span className="inline-block mt-2 px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                    2026年予定
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            音楽制作の未来を、一緒に創ろう
          </h2>
          <p className="text-xl mb-8 text-orange-100">
            今なら早期登録特典あり！手数料10%キャンペーン実施中
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/auth/register"
              className="bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-50 transform hover:scale-105 transition shadow-xl"
            >
              今すぐ無料で始める →
            </Link>
            <Link 
              href="/about"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-orange-600 transform hover:scale-105 transition"
            >
              詳しく見る
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}