'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState('introduction')

  const sections = [
    { id: 'introduction', title: '第1条（はじめに）' },
    { id: 'definitions', title: '第2条（定義）' },
    { id: 'registration', title: '第3条（登録）' },
    { id: 'service', title: '第4条（サービス内容）' },
    { id: 'fees', title: '第5条（手数料）' },
    { id: 'payment', title: '第6条（決済）' },
    { id: 'rights', title: '第7条（知的財産権）' },
    { id: 'prohibited', title: '第8条（禁止事項）' },
    { id: 'liability', title: '第9条（免責事項）' },
    { id: 'modification', title: '第10条（規約の変更）' },
    { id: 'termination', title: '第11条（退会）' },
    { id: 'governing', title: '第12条（準拠法・管轄）' }
  ]

  const scrollToSection = (id: string) => {
    setActiveSection(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-2">
              利用規約
            </h1>
            <p className="text-orange-100">
              最終更新日: 2024年2月10日
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* 目次サイドバー */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-4 sticky top-4">
                <h3 className="font-semibold text-gray-900 mb-4">目次</h3>
                <nav className="space-y-1">
                  {sections.map(section => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                        activeSection === section.id
                          ? 'bg-orange-100 text-orange-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {section.title}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* 規約本文 */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow p-8">
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 mb-6">
                    本利用規約（以下「本規約」といいます）は、Creax（以下「当社」といいます）が提供する音楽制作マッチングプラットフォーム「Creax」（以下「本サービス」といいます）の利用条件を定めるものです。
                  </p>

                  {/* 第1条 */}
                  <section id="introduction" className="mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                      第1条（はじめに）
                    </h2>
                    <div className="space-y-3 text-gray-700">
                      <p>
                        1. 本サービスをご利用いただく前に、本規約をよくお読みください。
                      </p>
                      <p>
                        2. 本サービスをご利用いただいた場合、本規約に同意したものとみなします。
                      </p>
                      <p>
                        3. 未成年者の方は、親権者等の法定代理人の同意を得た上でご利用ください。
                      </p>
                    </div>
                  </section>

                  {/* 第2条 */}
                  <section id="definitions" className="mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                      第2条（定義）
                    </h2>
                    <div className="space-y-3 text-gray-700">
                      <p>本規約において使用する用語の定義は、以下のとおりとします。</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>
                          <strong>「ユーザー」</strong>：本サービスを利用する全ての方
                        </li>
                        <li>
                          <strong>「クライアント」</strong>：音楽制作を依頼する方
                        </li>
                        <li>
                          <strong>「クリエーター」</strong>：音楽制作を請け負う方
                        </li>
                        <li>
                          <strong>「案件」</strong>：クライアントが投稿する音楽制作の依頼
                        </li>
                        <li>
                          <strong>「成果物」</strong>：クリエーターが制作・納品する音楽作品
                        </li>
                        <li>
                          <strong>「取引」</strong>：クライアントとクリエーター間の契約および制作活動
                        </li>
                      </ul>
                    </div>
                  </section>

                  {/* 第3条 */}
                  <section id="registration" className="mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                      第3条（登録）
                    </h2>
                    <div className="space-y-3 text-gray-700">
                      <p>
                        1. 本サービスの利用を希望する方は、当社の定める方法により登録申請を行うものとします。
                      </p>
                      <p>
                        2. 当社は、以下の場合に登録を拒否することがあります。
                      </p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>登録申請内容に虚偽、誤記、記載漏れがあった場合</li>
                        <li>過去に本規約に違反したことがある場合</li>
                        <li>反社会的勢力等に該当する場合</li>
                        <li>その他、当社が登録を適当でないと判断した場合</li>
                      </ul>
                      <p>
                        3. ユーザーは、登録情報に変更があった場合、速やかに変更手続きを行うものとします。
                      </p>
                    </div>
                  </section>

                  {/* 第4条 */}
                  <section id="service" className="mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                      第4条（サービス内容）
                    </h2>
                    <div className="space-y-3 text-gray-700">
                      <p>
                        1. 本サービスは、クライアントとクリエーターのマッチングの場を提供するものです。
                      </p>
                      <p>
                        2. 当社は、クライアントとクリエーター間の取引に関して、当事者にはなりません。
                      </p>
                      <p>
                        3. 取引に関するトラブルについては、原則として当事者間で解決するものとします。
                      </p>
                      <p>
                        4. 当社は、必要に応じてサービス内容を変更することができます。
                      </p>
                    </div>
                  </section>

                  {/* 第5条 */}
                  <section id="fees" className="mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                      第5条（手数料）
                    </h2>
                    <div className="space-y-3 text-gray-700">
                      <p>
                        1. 本サービスの利用料は無料とします。ただし、取引が成立した場合、以下の手数料が発生します。
                      </p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>取引金額の15%（サービス手数料）</li>
                        <li>決済手数料（決済方法により異なる）</li>
                      </ul>
                      <p>
                        2. 手数料率は、事前の通知により変更される場合があります。
                      </p>
                      <p>
                        3. 一度支払われた手数料は、いかなる理由があっても返金いたしません。
                      </p>
                    </div>
                  </section>

                  {/* 第6条 */}
                  <section id="payment" className="mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                      第6条（決済）
                    </h2>
                    <div className="space-y-3 text-gray-700">
                      <p>
                        1. クライアントは、当社指定の決済方法により、案件料金を支払うものとします。
                      </p>
                      <p>
                        2. 支払われた料金は、当社が一時的に預かり、検収完了後にクリエーターに支払います。
                      </p>
                      <p>
                        3. クリエーターは、最低出金額（3,000円）以上で出金申請ができます。
                      </p>
                      <p>
                        4. 出金申請から実際の振込までの期間は、以下のとおりです。
                      </p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>銀行振込：1-3営業日</li>
                        <li>PayPay：即時</li>
                      </ul>
                    </div>
                  </section>

                  {/* 第7条 */}
                  <section id="rights" className="mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                      第7条（知的財産権）
                    </h2>
                    <div className="space-y-3 text-gray-700">
                      <p>
                        1. 成果物の著作権（著作権法第27条および第28条の権利を含む）は、別途定めがない限り、以下のとおりとします。
                      </p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>作詞・作曲の著作権：制作したクリエーターに帰属</li>
                        <li>原盤権：制作費を支払ったクライアントに帰属</li>
                      </ul>
                      <p>
                        2. クリエーターは、成果物が第三者の知的財産権を侵害していないことを保証します。
                      </p>
                      <p>
                        3. 本サービス上のコンテンツ（ロゴ、画像、テキスト等）の知的財産権は、当社または当社にライセンスを許諾している者に帰属します。
                      </p>
                    </div>
                  </section>

                  {/* 第8条 */}
                  <section id="prohibited" className="mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                      第8条（禁止事項）
                    </h2>
                    <div className="space-y-3 text-gray-700">
                      <p>ユーザーは、以下の行為を行ってはならないものとします。</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>法令または公序良俗に違反する行為</li>
                        <li>犯罪行為に関連する行為</li>
                        <li>当社または第三者の知的財産権を侵害する行為</li>
                        <li>当社または第三者の名誉、信用を毀損する行為</li>
                        <li>本サービスの運営を妨害する行為</li>
                        <li>不正アクセス、またはこれを試みる行為</li>
                        <li>他のユーザーの個人情報を収集または蓄積する行為</li>
                        <li>本サービスを通じた直接取引の勧誘行為</li>
                        <li>虚偽の情報を登録または投稿する行為</li>
                        <li>複数のアカウントを作成する行為</li>
                        <li>その他、当社が不適切と判断する行為</li>
                      </ul>
                    </div>
                  </section>

                  {/* 第9条 */}
                  <section id="liability" className="mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                      第9条（免責事項）
                    </h2>
                    <div className="space-y-3 text-gray-700">
                      <p>
                        1. 当社は、本サービスに起因してユーザーに生じたあらゆる損害について、一切の責任を負いません。
                      </p>
                      <p>
                        2. 当社は、以下の事項について保証しません。
                      </p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>本サービスが特定の目的に適合すること</li>
                        <li>本サービスに瑕疵（不具合、バグ、権利侵害等）がないこと</li>
                        <li>本サービスが中断されないこと</li>
                        <li>取引が成立すること</li>
                        <li>成果物の品質</li>
                      </ul>
                      <p>
                        3. 当社は、本サービスの内容を予告なく変更、中断、終了することができます。
                      </p>
                    </div>
                  </section>

                  {/* 第10条 */}
                  <section id="modification" className="mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                      第10条（規約の変更）
                    </h2>
                    <div className="space-y-3 text-gray-700">
                      <p>
                        1. 当社は、必要と判断した場合、ユーザーへの事前通知なく本規約を変更することができます。
                      </p>
                      <p>
                        2. 変更後の規約は、本サービス上に掲載した時点から効力を生じるものとします。
                      </p>
                      <p>
                        3. 本規約変更後に本サービスを利用した場合、変更後の規約に同意したものとみなします。
                      </p>
                    </div>
                  </section>

                  {/* 第11条 */}
                  <section id="termination" className="mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                      第11条（退会）
                    </h2>
                    <div className="space-y-3 text-gray-700">
                      <p>
                        1. ユーザーは、当社所定の手続きにより、いつでも退会できます。
                      </p>
                      <p>
                        2. 当社は、ユーザーが以下に該当する場合、事前通知なくアカウントを停止または削除できます。
                      </p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>本規約に違反した場合</li>
                        <li>登録情報に虚偽があった場合</li>
                        <li>6ヶ月以上本サービスの利用がない場合</li>
                        <li>その他、当社が不適切と判断した場合</li>
                      </ul>
                    </div>
                  </section>

                  {/* 第12条 */}
                  <section id="governing" className="mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                      第12条（準拠法・管轄）
                    </h2>
                    <div className="space-y-3 text-gray-700">
                      <p>
                        1. 本規約の解釈にあたっては、日本法を準拠法とします。
                      </p>
                      <p>
                        2. 本サービスに関して紛争が生じた場合、当社本店所在地を管轄する裁判所を専属的合意管轄とします。
                      </p>
                    </div>
                  </section>

                  <div className="mt-12 pt-8 border-t">
                    <p className="text-sm text-gray-600">
                      制定日：2024年1月1日<br />
                      最終改定日：2024年2月10日
                    </p>
                  </div>
                </div>
              </div>

              {/* 関連リンク */}
              <div className="mt-8 bg-white rounded-lg shadow p-6">
                <h3 className="font-semibold text-gray-900 mb-4">関連ドキュメント</h3>
                <div className="space-y-2">
                  <Link href="/privacy" className="flex items-center text-orange-500 hover:text-orange-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    プライバシーポリシー
                  </Link>
                  <Link href="/support/guide" className="flex items-center text-orange-500 hover:text-orange-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    使い方ガイド
                  </Link>
                  <Link href="/support/faq" className="flex items-center text-orange-500 hover:text-orange-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    よくある質問
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}