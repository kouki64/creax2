'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function LandingPage() {
  const [email, setEmail] = useState('')

  const features = [
    {
      icon: '💰',
      title: '業界最高水準の還元率',
      description: '手数料はわずか15%。クリエーターに85%の収益を還元します。',
      highlight: true
    },
    {
      icon: '🎨',
      title: '裏方クリエーターに焦点',
      description: 'アレンジャー、エンジニアなど、音楽制作の裏方を支援。',
      highlight: false
    },
    {
      icon: '🔐',
      title: '安心の決済システム',
      description: 'エスクローサービスで安全な取引を保証。PayPay対応。',
      highlight: false
    },
    {
      icon: '📊',
      title: '透明な収益分配',
      description: '制作に関わった全員に公平な報酬を自動分配。',
      highlight: false
    },
    {
      icon: '🚀',
      title: '簡単3ステップ',
      description: '案件投稿から納品まで、シンプルなフローで完結。',
      highlight: false
    },
    {
      icon: '🌏',
      title: 'グローバル対応',
      description: '多言語対応で世界中のクリエーターと繋がる。',
      highlight: false
    }
  ]

  const testimonials = [
    {
      name: '山田太郎',
      role: 'アレンジャー',
      content: 'Creaxのおかげで、アレンジャーとしての価値を正当に評価してもらえるようになりました。収益も以前の3倍になりました。',
      rating: 5
    },
    {
      name: '株式会社サウンドワークス',
      role: 'クライアント',
      content: '優秀なクリエーターと簡単にマッチングでき、制作コストも30%削減できました。品質も期待以上です。',
      rating: 5
    },
    {
      name: '佐藤花子',
      role: 'ミキシングエンジニア',
      content: '裏方の仕事がこんなに評価される日が来るとは。Creaxは音楽業界を変えています。',
      rating: 5
    }
  ]

  const stats = [
    { value: '10,000+', label: 'クリエーター登録数' },
    { value: '50,000+', label: '完了案件数' },
    { value: '¥10億+', label: '累計取引額' },
    { value: '4.8/5.0', label: '平均満足度' }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* ヘッダー */}
      <header className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="text-3xl font-bold text-orange-500">Creax</div>
              </Link>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-gray-700 hover:text-orange-500 transition">
                特徴
              </Link>
              <Link href="#how-it-works" className="text-gray-700 hover:text-orange-500 transition">
                使い方
              </Link>
              <Link href="#pricing" className="text-gray-700 hover:text-orange-500 transition">
                料金
              </Link>
              <Link href="/support/faq" className="text-gray-700 hover:text-orange-500 transition">
                FAQ
              </Link>
            </nav>
            <div className="flex items-center gap-4">
              <Link
                href="/auth/login"
                className="px-4 py-2 text-gray-700 hover:text-orange-500 transition"
              >
                ログイン
              </Link>
              <Link
                href="/auth/register"
                className="px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
              >
                無料で始める
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ヒーローセクション */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-orange-50 via-white to-blue-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-block px-3 py-1.5 md:px-4 md:py-2 bg-orange-100 text-orange-700 rounded-full text-xs md:text-sm font-semibold mb-4 md:mb-6">
              🎉 手数料15%！業界最高水準の還元率
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-gray-900 mb-4 md:mb-6">
              音楽制作の<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6232] to-pink-500">
                新しいカタチ
              </span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 md:mb-8 max-w-3xl mx-auto px-4">
              クライアントとクリエーターを繋ぐ<br className="md:hidden" />
              革新的な音楽制作<br className="hidden md:block" />
              マッチングプラットフォーム
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-8 md:mb-12 px-4">
              <Link
                href="/auth/register/creator"
                className="px-6 md:px-8 py-3 md:py-4 bg-[#ff6232] text-white rounded-full text-base md:text-lg font-semibold hover:bg-[#e5562c] transition transform hover:scale-105"
              >
                クリエーターとして登録
              </Link>
              <Link
                href="/auth/register/client"
                className="px-6 md:px-8 py-3 md:py-4 bg-white text-[#ff6232] border-2 border-[#ff6232] rounded-full text-base md:text-lg font-semibold hover:bg-orange-50 transition transform hover:scale-105"
              >
                クライアントとして登録
              </Link>
            </div>
          </div>

          {/* デモビデオ/イメージ */}
          <div className="relative max-w-4xl mx-auto">
            <div className="aspect-video bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl shadow-2xl flex items-center justify-center">
              <div className="text-white text-center">
                <svg className="w-20 h-20 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                <p className="text-xl font-semibold">サービス紹介動画</p>
              </div>
            </div>
            {/* フローティング要素 */}
            <div className="absolute -top-4 -left-4 px-4 py-2 bg-white rounded-lg shadow-lg">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">1,234人がオンライン</span>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 px-4 py-2 bg-white rounded-lg shadow-lg">
              <div className="text-sm">
                <span className="font-bold text-orange-500">¥50,000</span>
                <span className="text-gray-600"> 平均案件単価</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 統計セクション */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 特徴セクション */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              なぜCreaxが選ばれるのか
            </h2>
            <p className="text-xl text-gray-600">
              音楽制作に革命を起こす6つの理由
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl transition transform hover:scale-105 ${
                  feature.highlight
                    ? 'bg-gradient-to-br from-orange-500 to-pink-500 text-white shadow-xl'
                    : 'bg-white shadow-lg hover:shadow-xl'
                }`}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className={`text-xl font-bold mb-3 ${
                  feature.highlight ? 'text-white' : 'text-gray-900'
                }`}>
                  {feature.title}
                </h3>
                <p className={feature.highlight ? 'text-white/90' : 'text-gray-600'}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 使い方セクション */}
      <section id="how-it-works" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              簡単3ステップで音楽制作
            </h2>
            <p className="text-xl text-gray-600">
              誰でも簡単に始められます
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">案件を投稿</h3>
              <p className="text-gray-600">
                制作したい音楽の詳細を入力して案件を投稿
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">マッチング</h3>
              <p className="text-gray-600">
                最適なクリエーターとマッチング
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">制作・納品</h3>
              <p className="text-gray-600">
                安心のエスクローで取引完了
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* お客様の声 */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              利用者の声
            </h2>
            <p className="text-xl text-gray-600">
              多くのクリエーターとクライアントに選ばれています
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA セクション */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-500 to-pink-500">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            今すぐ始めよう
          </h2>
          <p className="text-xl text-white/90 mb-8">
            登録は無料。あなたの音楽制作を次のレベルへ。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/register"
              className="px-8 py-4 bg-white text-orange-500 rounded-full text-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105"
            >
              無料で登録する
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-full text-lg font-semibold hover:bg-white/10 transition transform hover:scale-105"
            >
              詳しく見る
            </Link>
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-orange-500">Creax</h3>
              <p className="text-gray-400">
                音楽制作の新しいカタチ
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">サービス</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition">サービス紹介</Link></li>
                <li><Link href="/creators/search" className="hover:text-white transition">クリエーターを探す</Link></li>
                <li><Link href="/jobs/search" className="hover:text-white transition">案件を探す</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">サポート</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/support/faq" className="hover:text-white transition">FAQ</Link></li>
                <li><Link href="/support/guide" className="hover:text-white transition">使い方ガイド</Link></li>
                <li><Link href="/support/contact" className="hover:text-white transition">お問い合わせ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">法的情報</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/terms" className="hover:text-white transition">利用規約</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition">プライバシーポリシー</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Creax. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}