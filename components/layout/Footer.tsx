import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* ロゴと説明 */}
          <div>
            <h3 className="text-2xl font-bold text-orange-500 mb-4">Creax</h3>
            <p className="text-gray-400 text-sm">
              音楽制作に関わる全てのクリエーターが正当な評価と報酬を得られる世界を実現
            </p>
          </div>

          {/* サービス */}
          <div>
            <h4 className="font-semibold mb-4">サービス</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/creators/search" className="hover:text-orange-500">クリエーターを探す</Link></li>
              <li><Link href="/jobs/search" className="hover:text-orange-500">案件を探す</Link></li>
              <li><Link href="/about" className="hover:text-orange-500">Creaxとは</Link></li>
            </ul>
          </div>

          {/* サポート */}
          <div>
            <h4 className="font-semibold mb-4">サポート</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/support/guide" className="hover:text-orange-500">使い方ガイド</Link></li>
              <li><Link href="/support/faq" className="hover:text-orange-500">よくある質問</Link></li>
              <li><Link href="/support/contact" className="hover:text-orange-500">お問い合わせ</Link></li>
            </ul>
          </div>

          {/* 法務 */}
          <div>
            <h4 className="font-semibold mb-4">法務情報</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/terms" className="hover:text-orange-500">利用規約</Link></li>
              <li><Link href="/privacy" className="hover:text-orange-500">プライバシーポリシー</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2024 Creax - RINGAX Records. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}