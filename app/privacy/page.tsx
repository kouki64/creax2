'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState('overview')

  const sections = [
    { id: 'overview', title: '1. 概要' },
    { id: 'collection', title: '2. 収集する情報' },
    { id: 'usage', title: '3. 情報の利用目的' },
    { id: 'sharing', title: '4. 情報の共有' },
    { id: 'cookies', title: '5. Cookie' },
    { id: 'security', title: '6. セキュリティ' },
    { id: 'retention', title: '7. 保存期間' },
    { id: 'rights', title: '8. ユーザーの権利' },
    { id: 'children', title: '9. 未成年者' },
    { id: 'international', title: '10. 国際データ転送' },
    { id: 'changes', title: '11. 変更' },
    { id: 'contact', title: '12. お問い合わせ' }
  ]

  const scrollToSection = (id: string) => {
    setActiveSection(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-2">
              プライバシーポリシー
            </h1>
            <p className="text-blue-100">
              最終更新日: 2024年2月10日 | 施行日: 2024年1月1日
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* 重要な通知 */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-blue-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">
                  お客様のプライバシーを大切にしています
                </h3>
                <p className="text-blue-700 text-sm">
                  Creaxは、お客様の個人情報を適切に保護し、管理することを最重要事項の一つと考えています。
                  本ポリシーは、当社がどのような情報を収集し、どのように利用・保護するかを説明しています。
                </p>
              </div>
            </div>
          </div>

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
                          ? 'bg-blue-100 text-blue-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {section.title}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* ポリシー本文 */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow p-8">
                <div className="prose prose-gray max-w-none">
                  {/* 1. 概要 */}
                  <section id="overview" className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      1. 概要
                    </h2>
                    <div className="space-y-4 text-gray-700">
                      <p>
                        株式会社Creax（以下「当社」）は、お客様の個人情報保護の重要性を認識し、
                        個人情報保護法を遵守するとともに、以下のプライバシーポリシー（以下「本ポリシー」）に従い、
                        適切な取扱い及び保護に努めます。
                      </p>
                      <p>
                        本ポリシーは、当社が提供する音楽制作マッチングプラットフォーム「Creax」
                        （Webサイト、モバイルアプリケーション、その他関連サービスを含む。以下「本サービス」）の
                        利用に関して適用されます。
                      </p>
                    </div>
                  </section>

                  {/* 2. 収集する情報 */}
                  <section id="collection" className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      2. 収集する情報
                    </h2>
                    <div className="space-y-4 text-gray-700">
                      <h3 className="text-lg font-semibold">2.1 お客様から直接提供いただく情報</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>
                          <strong>アカウント情報：</strong>
                          氏名、メールアドレス、電話番号、パスワード、生年月日
                        </li>
                        <li>
                          <strong>プロフィール情報：</strong>
                          アーティスト名、自己紹介、プロフィール画像、ポートフォリオ
                        </li>
                        <li>
                          <strong>決済情報：</strong>
                          クレジットカード情報（カード番号の下4桁のみ保存）、銀行口座情報、PayPayアカウント
                        </li>
                        <li>
                          <strong>本人確認書類：</strong>
                          運転免許証、パスポート等（必要な場合のみ）
                        </li>
                        <li>
                          <strong>コミュニケーション情報：</strong>
                          メッセージ、レビュー、評価、お問い合わせ内容
                        </li>
                      </ul>

                      <h3 className="text-lg font-semibold mt-6">2.2 自動的に収集される情報</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>
                          <strong>デバイス情報：</strong>
                          IPアドレス、ブラウザタイプ、OS、デバイスID
                        </li>
                        <li>
                          <strong>利用情報：</strong>
                          アクセス日時、閲覧ページ、クリック情報、検索キーワード
                        </li>
                        <li>
                          <strong>位置情報：</strong>
                          GPS情報（許可をいただいた場合のみ）
                        </li>
                        <li>
                          <strong>Cookie情報：</strong>
                          セッションID、言語設定、その他の設定情報
                        </li>
                      </ul>

                      <h3 className="text-lg font-semibold mt-6">2.3 第三者から取得する情報</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>SNS連携時のプロフィール情報（Google、Facebook、Twitter等）</li>
                        <li>決済サービス事業者からの取引情報</li>
                        <li>本人確認サービス事業者からの確認結果</li>
                      </ul>
                    </div>
                  </section>

                  {/* 3. 情報の利用目的 */}
                  <section id="usage" className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      3. 情報の利用目的
                    </h2>
                    <div className="space-y-4 text-gray-700">
                      <p>当社は、収集した情報を以下の目的で利用します：</p>
                      
                      <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                        <div className="flex items-start">
                          <span className="text-blue-500 mr-3">✓</span>
                          <div>
                            <strong>サービスの提供・運営</strong>
                            <p className="text-sm text-gray-600 mt-1">
                              アカウントの作成・管理、マッチング機能の提供、決済処理、カスタマーサポート
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <span className="text-blue-500 mr-3">✓</span>
                          <div>
                            <strong>サービスの改善・開発</strong>
                            <p className="text-sm text-gray-600 mt-1">
                              利用状況の分析、新機能の開発、UI/UXの改善、バグの修正
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <span className="text-blue-500 mr-3">✓</span>
                          <div>
                            <strong>安全性の確保</strong>
                            <p className="text-sm text-gray-600 mt-1">
                              不正利用の防止、セキュリティの向上、利用規約違反の調査
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <span className="text-blue-500 mr-3">✓</span>
                          <div>
                            <strong>マーケティング・広告</strong>
                            <p className="text-sm text-gray-600 mt-1">
                              新サービスのご案内、キャンペーン情報の配信、利用動向の分析（同意を得た場合のみ）
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <span className="text-blue-500 mr-3">✓</span>
                          <div>
                            <strong>法的義務の遵守</strong>
                            <p className="text-sm text-gray-600 mt-1">
                              法令に基づく開示請求への対応、税務処理、契約の履行
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* 4. 情報の共有 */}
                  <section id="sharing" className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      4. 情報の共有と開示
                    </h2>
                    <div className="space-y-4 text-gray-700">
                      <p>
                        当社は、以下の場合を除き、お客様の個人情報を第三者に販売、貸与、または共有することはありません：
                      </p>
                      
                      <h3 className="text-lg font-semibold">4.1 お客様の同意がある場合</h3>
                      <p>お客様から明示的な同意を得た場合に限り、情報を共有します。</p>

                      <h3 className="text-lg font-semibold">4.2 サービス提供のため</h3>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>決済処理業者（Stripe、GMO Payment Gateway）</li>
                        <li>本人確認サービス（eKYCサービス事業者）</li>
                        <li>クラウドサービス事業者（AWS、Google Cloud）</li>
                        <li>メール配信サービス（SendGrid）</li>
                      </ul>

                      <h3 className="text-lg font-semibold">4.3 法的要請</h3>
                      <p>
                        法令に基づく開示請求、裁判所の命令、その他法的手続きに応じる必要がある場合
                      </p>

                      <h3 className="text-lg font-semibold">4.4 事業承継</h3>
                      <p>
                        合併、買収、事業譲渡等の場合、承継先に必要な情報を提供することがあります
                      </p>

                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
                        <p className="text-sm text-yellow-800">
                          <strong>注意：</strong>
                          公開プロフィールに記載された情報は、他のユーザーから閲覧可能です。
                          公開する情報は慎重に選択してください。
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* 5. Cookie */}
                  <section id="cookies" className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      5. Cookieとトラッキング技術
                    </h2>
                    <div className="space-y-4 text-gray-700">
                      <p>
                        当社は、サービスの利便性向上のため、Cookie及び類似技術を使用しています。
                      </p>
                      
                      <h3 className="text-lg font-semibold">5.1 使用するCookieの種類</h3>
                      <table className="w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="border border-gray-300 px-4 py-2 text-left">種類</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">目的</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">保存期間</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-300 px-4 py-2">必須Cookie</td>
                            <td className="border border-gray-300 px-4 py-2">ログイン状態の維持、セキュリティ</td>
                            <td className="border border-gray-300 px-4 py-2">セッション終了まで</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 px-4 py-2">機能Cookie</td>
                            <td className="border border-gray-300 px-4 py-2">言語設定、表示設定の保存</td>
                            <td className="border border-gray-300 px-4 py-2">1年間</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 px-4 py-2">分析Cookie</td>
                            <td className="border border-gray-300 px-4 py-2">利用状況の分析（Google Analytics）</td>
                            <td className="border border-gray-300 px-4 py-2">2年間</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 px-4 py-2">広告Cookie</td>
                            <td className="border border-gray-300 px-4 py-2">関連性の高い広告の表示</td>
                            <td className="border border-gray-300 px-4 py-2">90日間</td>
                          </tr>
                        </tbody>
                      </table>

                      <h3 className="text-lg font-semibold">5.2 Cookieの管理</h3>
                      <p>
                        ブラウザの設定により、Cookieを無効化することができます。
                        ただし、必須Cookieを無効化した場合、サービスの一部機能が利用できなくなる可能性があります。
                      </p>
                    </div>
                  </section>

                  {/* 6. セキュリティ */}
                  <section id="security" className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      6. セキュリティ
                    </h2>
                    <div className="space-y-4 text-gray-700">
                      <p>
                        当社は、お客様の個人情報を保護するため、以下のセキュリティ対策を実施しています：
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-semibold mb-2">技術的対策</h4>
                          <ul className="text-sm space-y-1">
                            <li>• SSL/TLS暗号化通信</li>
                            <li>• ファイアウォール</li>
                            <li>• 侵入検知システム</li>
                            <li>• 定期的な脆弱性診断</li>
                          </ul>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-semibold mb-2">組織的対策</h4>
                          <ul className="text-sm space-y-1">
                            <li>• アクセス権限の管理</li>
                            <li>• 従業員への教育研修</li>
                            <li>• 守秘義務契約の締結</li>
                            <li>• 監査の実施</li>
                          </ul>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600">
                        ただし、インターネット上での情報伝達に100%の安全性を保証することはできません。
                        お客様におかれましても、パスワードの適切な管理等、セキュリティにご協力ください。
                      </p>
                    </div>
                  </section>

                  {/* 7. 保存期間 */}
                  <section id="retention" className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      7. 情報の保存期間
                    </h2>
                    <div className="space-y-4 text-gray-700">
                      <p>
                        当社は、以下の基準に従って個人情報を保存します：
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>
                          <strong>アカウント情報：</strong>
                          アカウント削除後3ヶ月間（復旧リクエストに対応するため）
                        </li>
                        <li>
                          <strong>取引情報：</strong>
                          法令に定められた期間（最長7年間）
                        </li>
                        <li>
                          <strong>ログ情報：</strong>
                          最長2年間
                        </li>
                        <li>
                          <strong>マーケティング情報：</strong>
                          同意撤回まで
                        </li>
                      </ul>
                    </div>
                  </section>

                  {/* 8. ユーザーの権利 */}
                  <section id="rights" className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      8. お客様の権利
                    </h2>
                    <div className="space-y-4 text-gray-700">
                      <p>
                        お客様は、ご自身の個人情報に関して以下の権利を有します：
                      </p>
                      
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <span className="text-green-500 mr-3 mt-1">✓</span>
                          <div>
                            <strong>開示請求権</strong>
                            <p className="text-sm text-gray-600">保有する個人情報の開示を請求できます</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <span className="text-green-500 mr-3 mt-1">✓</span>
                          <div>
                            <strong>訂正・更新権</strong>
                            <p className="text-sm text-gray-600">誤った情報の訂正や更新を要求できます</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <span className="text-green-500 mr-3 mt-1">✓</span>
                          <div>
                            <strong>削除権</strong>
                            <p className="text-sm text-gray-600">不要となった個人情報の削除を要求できます</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <span className="text-green-500 mr-3 mt-1">✓</span>
                          <div>
                            <strong>利用停止権</strong>
                            <p className="text-sm text-gray-600">個人情報の利用停止を要求できます</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <span className="text-green-500 mr-3 mt-1">✓</span>
                          <div>
                            <strong>データポータビリティ権</strong>
                            <p className="text-sm text-gray-600">機械可読形式でデータを受け取ることができます</p>
                          </div>
                        </div>
                      </div>

                      <p className="text-sm bg-blue-50 p-4 rounded-lg">
                        これらの権利を行使する場合は、
                        <Link href="/support/contact" className="text-blue-600 hover:underline">
                          お問い合わせフォーム
                        </Link>
                        からご連絡ください。本人確認の上、対応いたします。
                      </p>
                    </div>
                  </section>

                  {/* 9. 未成年者 */}
                  <section id="children" className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      9. 未成年者の個人情報
                    </h2>
                    <div className="space-y-4 text-gray-700">
                      <p>
                        18歳未満の方は、保護者の同意を得た上で本サービスをご利用ください。
                        13歳未満のお子様からの個人情報は意図的に収集しません。
                      </p>
                      <p>
                        13歳未満のお子様が個人情報を提供したことが判明した場合、
                        速やかに削除いたしますので、ご連絡ください。
                      </p>
                    </div>
                  </section>

                  {/* 10. 国際データ転送 */}
                  <section id="international" className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      10. 国際データ転送
                    </h2>
                    <div className="space-y-4 text-gray-700">
                      <p>
                        当社は、サービス提供のため、お客様の情報を日本国外のサーバーで処理する場合があります。
                        その際は、適切な保護措置を講じた上で転送を行います。
                      </p>
                      <p>
                        EUおよびEEA在住のお客様の情報については、GDPR（一般データ保護規則）に準拠した取り扱いを行います。
                      </p>
                    </div>
                  </section>

                  {/* 11. 変更 */}
                  <section id="changes" className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      11. プライバシーポリシーの変更
                    </h2>
                    <div className="space-y-4 text-gray-700">
                      <p>
                        当社は、必要に応じて本ポリシーを変更することがあります。
                        重要な変更を行う場合は、サービス内での通知またはメールにてお知らせします。
                      </p>
                      <p>
                        変更後のポリシーは、サービス上に掲載した時点から効力を生じます。
                        定期的に本ポリシーをご確認いただくことをお勧めします。
                      </p>
                    </div>
                  </section>

                  {/* 12. お問い合わせ */}
                  <section id="contact" className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      12. お問い合わせ
                    </h2>
                    <div className="space-y-4 text-gray-700">
                      <p>
                        本ポリシーに関するご質問、ご意見、ご要望等がございましたら、
                        以下の窓口までお問い合わせください：
                      </p>
                      
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h4 className="font-semibold mb-3">個人情報保護管理責任者</h4>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="font-medium">会社名：</span>
                            株式会社Creax
                          </div>
                          <div>
                            <span className="font-medium">所在地：</span>
                            〒150-0001 東京都渋谷区神宮前1-2-3
                          </div>
                          <div>
                            <span className="font-medium">メール：</span>
                            <a href="mailto:privacy@creax.jp" className="text-blue-600 hover:underline">
                              privacy@creax.jp
                            </a>
                          </div>
                          <div>
                            <span className="font-medium">電話：</span>
                            03-1234-5678（平日10:00-18:00）
                          </div>
                          <div>
                            <span className="font-medium">お問い合わせフォーム：</span>
                            <Link href="/support/contact" className="text-blue-600 hover:underline">
                              こちら
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  <div className="mt-12 pt-8 border-t">
                    <p className="text-sm text-gray-600">
                      制定日：2024年1月1日<br />
                      最終改定日：2024年2月10日<br />
                      バージョン：1.2
                    </p>
                  </div>
                </div>
              </div>

              {/* 関連リンク */}
              <div className="mt-8 bg-white rounded-lg shadow p-6">
                <h3 className="font-semibold text-gray-900 mb-4">関連情報</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Link href="/terms" className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                    <svg className="w-5 h-5 text-orange-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div>
                      <div className="font-medium">利用規約</div>
                      <div className="text-xs text-gray-600">サービス利用条件</div>
                    </div>
                  </Link>
                  
                  <Link href="/support/faq" className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                    <svg className="w-5 h-5 text-orange-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <div className="font-medium">よくある質問</div>
                      <div className="text-xs text-gray-600">プライバシーに関するFAQ</div>
                    </div>
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