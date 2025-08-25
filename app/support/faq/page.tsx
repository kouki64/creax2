'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedItems, setExpandedItems] = useState<number[]>([])

  const categories = [
    { id: 'all', name: 'すべて', icon: '📚' },
    { id: 'start', name: 'はじめに', icon: '🚀' },
    { id: 'client', name: 'クライアント向け', icon: '💼' },
    { id: 'creator', name: 'クリエーター向け', icon: '🎨' },
    { id: 'payment', name: '決済・支払い', icon: '💳' },
    { id: 'project', name: '案件・制作', icon: '📝' },
    { id: 'trouble', name: 'トラブル', icon: '⚠️' },
    { id: 'account', name: 'アカウント', icon: '👤' }
  ]

  const faqItems = [
    {
      id: 1,
      category: 'start',
      question: 'Creaxとは何ですか？',
      answer: 'Creaxは、音楽制作を依頼したいクライアントと、制作を行うクリエーターをマッチングするプラットフォームです。特にアレンジャーやエンジニアなど「裏方」のクリエーターに焦点を当て、公平な収益分配（手数料15%、クリエーター収益85%）を実現しています。',
      popular: true
    },
    {
      id: 2,
      category: 'start',
      question: '利用料金はかかりますか？',
      answer: '登録・利用は無料です。案件が成立し、決済が完了した際に限り、サービス手数料として15%をいただいています。クリエーターの方は、売上から手数料が差し引かれた金額（85%）を受け取ることができます。',
      popular: true
    },
    {
      id: 3,
      category: 'client',
      question: 'どのような案件を依頼できますか？',
      answer: '作曲、編曲（アレンジ）、作詞、レコーディング、ミキシング、マスタリング、楽器演奏など、音楽制作に関わる幅広い案件を依頼できます。CM音楽、ゲームBGM、YouTubeのテーマソング、ポッドキャストのジングルなど、用途も様々です。',
      popular: false
    },
    {
      id: 4,
      category: 'client',
      question: 'コンペ形式と指名形式の違いは？',
      answer: 'コンペ形式は、案件を公開して複数のクリエーターから提案を募り、その中から選ぶ方式です。より多くの選択肢から選べます。指名形式は、特定のクリエーターを直接指名して依頼する方式で、気に入ったクリエーターと確実に仕事ができます。',
      popular: true
    },
    {
      id: 5,
      category: 'creator',
      question: 'クリエーター登録に必要なものは？',
      answer: '基本的な個人情報とポートフォリオ（過去の作品）があれば登録可能です。本人確認書類の提出が必要な場合があります。プロ・アマチュア問わず、音楽制作のスキルがあれば誰でも登録できます。',
      popular: false
    },
    {
      id: 6,
      category: 'creator',
      question: '収益はいつ受け取れますか？',
      answer: '案件完了後、クライアントの検収が完了してから7-14日で確定します。確定後は、最低出金額（3,000円）以上であればいつでも出金申請が可能です。銀行振込は1-3営業日、PayPayは即時振込となります。',
      popular: true
    },
    {
      id: 7,
      category: 'payment',
      question: '利用できる決済方法は？',
      answer: 'クレジットカード（VISA、Mastercard、JCB、AMEX）、PayPay、コンビニ決済（セブンイレブン、ローソン、ファミリーマート）、銀行振込に対応しています。PayPayは手数料が最も安く、おすすめです。',
      popular: false
    },
    {
      id: 8,
      category: 'payment',
      question: 'キャンセルはできますか？',
      answer: '案件開始前であれば、双方の合意のもとキャンセルが可能です。制作開始後のキャンセルは、進捗に応じて料金が発生する場合があります。詳細はキャンセルポリシーをご確認ください。',
      popular: false
    },
    {
      id: 9,
      category: 'project',
      question: '修正は何回まで対応してもらえますか？',
      answer: 'クリエーターによって異なりますが、通常は2回までの修正が基本料金に含まれています。それ以上の修正は追加料金が発生する場合があります。事前にクリエーターのプロフィールや案件詳細で確認してください。',
      popular: true
    },
    {
      id: 10,
      category: 'project',
      question: '著作権はどうなりますか？',
      answer: '基本的に、作詞・作曲の著作権は制作したクリエーターに帰属し、原盤権は制作費を支払ったクライアントに帰属します。ただし、事前の取り決めにより変更可能です。商用利用の範囲については、案件開始前に必ず確認してください。',
      popular: true
    },
    {
      id: 11,
      category: 'trouble',
      question: '納品物に満足できない場合は？',
      answer: 'まずはクリエーターと直接コミュニケーションを取り、修正対応を依頼してください。それでも解決しない場合は、Creaxサポートチームが仲介に入ります。悪質な場合は返金対応も検討いたします。',
      popular: false
    },
    {
      id: 12,
      category: 'trouble',
      question: '納期に間に合わない場合は？',
      answer: 'クリエーターには納期厳守をお願いしていますが、やむを得ない事情で遅延する場合は、速やかにクライアントへ連絡するよう指導しています。度重なる遅延や無断での納期遅れは、ペナルティの対象となります。',
      popular: false
    },
    {
      id: 13,
      category: 'account',
      question: 'パスワードを忘れました',
      answer: 'ログイン画面の「パスワードを忘れた方」から、登録メールアドレスを入力してください。パスワードリセット用のリンクをメールでお送りします。メールが届かない場合は、迷惑メールフォルダもご確認ください。',
      popular: false
    },
    {
      id: 14,
      category: 'account',
      question: '退会したい場合は？',
      answer: 'マイページの「アカウント設定」から退会手続きが可能です。ただし、進行中の案件がある場合は完了後に退会してください。退会すると、過去の取引履歴も削除されますのでご注意ください。',
      popular: false
    }
  ]

  const filteredItems = faqItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const toggleExpand = (id: number) => {
    if (expandedItems.includes(id)) {
      setExpandedItems(expandedItems.filter(item => item !== id))
    } else {
      setExpandedItems([...expandedItems, id])
    }
  }

  const popularItems = faqItems.filter(item => item.popular)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              よくある質問
            </h1>
            <p className="text-orange-100 mb-8">
              お探しの答えが見つかるかもしれません
            </p>
            
            {/* 検索バー */}
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="質問を検索..."
                className="w-full px-6 py-4 pr-12 rounded-lg text-lg focus:ring-4 focus:ring-orange-300 focus:outline-none"
              />
              <svg className="absolute right-4 top-4 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* 人気の質問 */}
          {searchQuery === '' && selectedCategory === 'all' && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                🔥 人気の質問
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {popularItems.slice(0, 4).map(item => (
                  <button
                    key={item.id}
                    onClick={() => toggleExpand(item.id)}
                    className="bg-white rounded-lg shadow p-6 text-left hover:shadow-lg transition"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 pr-4">
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {item.question}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {item.answer}
                        </p>
                      </div>
                      <svg className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="grid lg:grid-cols-4 gap-8">
            {/* カテゴリーサイドバー */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-4 sticky top-4">
                <h3 className="font-semibold text-gray-900 mb-4">カテゴリー</h3>
                <nav className="space-y-1">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center px-3 py-2 rounded-lg text-sm transition ${
                        selectedCategory === category.id
                          ? 'bg-orange-100 text-orange-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span className="mr-3">{category.icon}</span>
                      <span className="flex-1 text-left">{category.name}</span>
                      <span className="text-xs text-gray-400">
                        {faqItems.filter(item => category.id === 'all' || item.category === category.id).length}
                      </span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* FAQ一覧 */}
            <div className="lg:col-span-3">
              <div className="space-y-4">
                {filteredItems.length > 0 ? (
                  filteredItems.map(item => (
                    <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden">
                      <button
                        onClick={() => toggleExpand(item.id)}
                        className="w-full px-6 py-4 text-left hover:bg-gray-50 transition"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-start flex-1">
                            <div className="mr-3 mt-1">
                              {expandedItems.includes(item.id) ? (
                                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              ) : (
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              )}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900">
                                {item.question}
                              </h3>
                              {item.popular && (
                                <span className="inline-block mt-1 px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded">
                                  人気
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </button>
                      
                      {expandedItems.includes(item.id) && (
                        <div className="px-6 pb-6 border-t">
                          <div className="pt-4 text-gray-700 whitespace-pre-line">
                            {item.answer}
                          </div>
                          
                          <div className="mt-6 pt-4 border-t flex items-center justify-between">
                            <div className="text-sm text-gray-500">
                              この回答は役に立ちましたか？
                            </div>
                            <div className="flex gap-2">
                              <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition">
                                👍 はい
                              </button>
                              <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition">
                                👎 いいえ
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="bg-white rounded-lg shadow p-12 text-center">
                    <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-gray-500 mb-4">
                      該当する質問が見つかりませんでした
                    </p>
                    <Link
                      href="/support/contact"
                      className="inline-flex items-center text-orange-500 hover:text-orange-600"
                    >
                      お問い合わせフォームへ
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* お問い合わせCTA */}
          <div className="mt-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              お探しの答えが見つかりませんでしたか？
            </h2>
            <p className="text-orange-100 mb-6">
              サポートチームが丁寧にお答えします
            </p>
            <Link
              href="/support/contact"
              className="inline-block px-8 py-3 bg-white text-orange-600 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              お問い合わせする
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}