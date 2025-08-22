import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '../components/layout/Header'  // ← 相対パスを使用
import Footer from '../components/layout/Footer'  // ← 相対パスを使用

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Creax - 音楽制作マッチングプラットフォーム',
  description: 'クライアントとクリエーターを繋ぐ音楽制作プラットフォーム',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}