'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function MusicStorePage() {
  const [selectedGenre, setSelectedGenre] = useState('all')
  const [priceFilter, setPriceFilter] = useState('all')
  const [sortBy, setSortBy] = useState('popular')
  const [isPlaying, setIsPlaying] = useState<string | null>(null)

  const genres = [
    { id: 'all', name: 'すべて', icon: '🎵' },
    { id: 'pop', name: 'ポップス', icon: '🎤' },
    { id: 'rock', name: 'ロック', icon: '🎸' },
    { id: 'electronic', name: 'エレクトロニック', icon: '🎛️' },
    { id: 'hiphop', name: 'ヒップホップ', icon: '🎧' },
    { id: 'jazz', name: 'ジャズ', icon: '🎺' },
    { id: 'classical', name: 'クラシック', icon: '🎻' },
    { id: 'game', name: 'ゲーム音楽', icon: '🎮' },
    { id: 'ambient', name: 'アンビエント', icon: '☁️' }
  ]

  const [tracks] = useState([
    {
      id: 'track-001',
      title: '春風のメロディー',
      artist: '山田太郎',
      genre: 'pop',
      price: 250,
      minPrice: 100,
      supportPrice: 500,
      duration: '3:24',
      plays: 15234,
      likes: 892,
      sales: 234,
      coverArt: null,
      waveform: '▁▃▅▇▅▃▁▃▅▇▅▃▁▃▅▇▅▃▁',
      credits: {
        composer: '山田太郎',
        arranger: '佐藤花子',
        mixing: '鈴木一郎',
        mastering: '田中次郎'
      },
      tags: ['春', 'ポップス', 'さわやか'],
      description: '春の訪れを感じる爽やかなポップスです。',
      releaseDate: '2024-02-01',
      isNew: true,
      isTrending: true
    },
    {
      id: 'track-002',
      title: 'Digital Dreams',
      artist: 'DJ Tech',
      genre: 'electronic',
      price: 300,
      minPrice: 150,
      supportPrice: 1000,
      duration: '5:12',
      plays: 28456,
      likes: 1523,
      sales: 567,
      coverArt: null,
      waveform: '▇▅▃▁▃▅▇▅▃▁▃▅▇▅▃▁▃▅▇',
      credits: {
        composer: 'DJ Tech',
        arranger: 'DJ Tech',
        mixing: 'Studio X',
        mastering: 'Master Lab'
      },
      tags: ['EDM', 'ダンス', 'クラブ'],
      description: 'クラブで盛り上がること間違いなしのEDMトラック。',
      releaseDate: '2024-01-15',
      isNew: false,
      isTrending: true
    },
    {
      id: 'track-003',
      title: 'Jazz Café',
      artist: 'The Smooth Quartet',
      genre: 'jazz',
      price: 0,
      minPrice: 0,
      supportPrice: 300,
      duration: '4:45',
      plays: 8923,
      likes: 456,
      sales: 123,
      coverArt: null,
      waveform: '▃▅▃▁▃▅▃▁▃▅▃▁▃▅▃▁▃▅▃▁',
      credits: {
        composer: '高橋ジャズ',
        arranger: '高橋ジャズ',
        mixing: 'Jazz Studio',
        mastering: 'Classic Masters'
      },
      tags: ['ジャズ', 'カフェ', 'リラックス'],
      description: 'カフェでゆったりと過ごすのにぴったりなジャズ。',
      releaseDate: '2024-02-10',
      isNew: true,
      isTrending: false,
      isFree: true
    },
    {
      id: 'track-004',
      title: 'Epic Battle Theme',
      artist: 'Game Sound Works',
      genre: 'game',
      price: 500,
      minPrice: 300,
      supportPrice: 2000,
      duration: '6:32',
      plays: 45678,
      likes: 3456,
      sales: 890,
      coverArt: null,
      waveform: '▁▃▅▇▇▅▃▁▁▃▅▇▇▅▃▁▁▃▅▇',
      credits: {
        composer: 'ゲーム音楽工房',
        arranger: 'オーケストラチーム',
        mixing: 'Epic Studios',
        mastering: 'Game Audio Lab'
      },
      tags: ['ゲーム', 'バトル', 'オーケストラ'],
      description: 'RPGのボス戦にぴったりな壮大なバトルテーマ。',
      releaseDate: '2024-01-20',
      isNew: false,
      isTrending: true
    }
  ])

  const filteredTracks = tracks.filter(track => {
    if (selectedGenre !== 'all' && track.genre !== selectedGenre) return false
    if (priceFilter === 'free' && track.price > 0) return false
    if (priceFilter === 'paid' && track.price === 0) return false
    return true
  })

  const sortedTracks = [...filteredTracks].sort((a, b) => {
    switch (sortBy) {
      case 'popular': return b.plays - a.plays
      case 'newest': return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
      case 'sales': return b.sales - a.sales
      case 'price-low': return a.price - b.price
      case 'price-high': return b.price - a.price
      default: return 0
    }
  })

  const handlePlay = (trackId: string) => {
    setIsPlaying(isPlaying === trackId ? null : trackId)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-4">
              楽曲ストア
            </h1>
            <p className="text-purple-100 text-lg">
              クリエーターが作った楽曲を購入・サポート
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
                💿 {tracks.length}曲配信中
              </div>
              <div className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
                🔥 今週の売上 ¥1,234,567
              </div>
              <div className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
                🎁 カンパ形式対応
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* サイドバー：フィルター */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 sticky top-4">
                <h3 className="font-semibold text-gray-900 mb-4">ジャンル</h3>
                <div className="space-y-2">
                  {genres.map(genre => (
                    <button
                      key={genre.id}
                      onClick={() => setSelectedGenre(genre.id)}
                      className={`w-full flex items-center px-3 py-2 rounded-lg text-sm transition ${
                        selectedGenre === genre.id
                          ? 'bg-purple-100 text-purple-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span className="mr-2">{genre.icon}</span>
                      <span className="flex-1 text-left">{genre.name}</span>
                      <span className="text-xs text-gray-400">
                        {tracks.filter(t => genre.id === 'all' || t.genre === genre.id).length}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-semibold text-gray-900 mb-4">価格</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="price"
                        value="all"
                        checked={priceFilter === 'all'}
                        onChange={(e) => setPriceFilter(e.target.value)}
                        className="mr-2 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-sm text-gray-700">すべて</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="price"
                        value="free"
                        checked={priceFilter === 'free'}
                        onChange={(e) => setPriceFilter(e.target.value)}
                        className="mr-2 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-sm text-gray-700">無料</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="price"
                        value="paid"
                        checked={priceFilter === 'paid'}
                        onChange={(e) => setPriceFilter(e.target.value)}
                        className="mr-2 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-sm text-gray-700">有料</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* メインコンテンツ：楽曲リスト */}
            <div className="lg:col-span-3">
              {/* ソートオプション */}
              <div className="bg-white rounded-lg shadow p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    {sortedTracks.length}曲見つかりました
                  </div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="popular">人気順</option>
                    <option value="newest">新着順</option>
                    <option value="sales">売上順</option>
                    <option value="price-low">価格が安い順</option>
                    <option value="price-high">価格が高い順</option>
                  </select>
                </div>
              </div>

              {/* 楽曲カード */}
              <div className="space-y-6">
                {sortedTracks.map(track => (
                  <div key={track.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition">
                    <div className="p-6">
                      <div className="flex items-start gap-6">
                        {/* カバーアート */}
                        <div className="flex-shrink-0">
                          <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                            {track.coverArt ? (
                              <img src={track.coverArt} alt="" className="w-full h-full object-cover rounded-lg" />
                            ) : (
                              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                              </svg>
                            )}
                          </div>
                          {/* 再生ボタン */}
                          <button
                            onClick={() => handlePlay(track.id)}
                            className="mt-3 w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center justify-center"
                          >
                            {isPlaying === track.id ? (
                              <>
                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                停止
                              </>
                            ) : (
                              <>
                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                </svg>
                                再生
                              </>
                            )}
                          </button>
                        </div>

                        {/* 楽曲情報 */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                {track.isNew && (
                                  <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">NEW</span>
                                )}
                                {track.isTrending && (
                                  <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full">🔥 トレンド</span>
                                )}
                                {track.isFree && (
                                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">無料</span>
                                )}
                              </div>
                              <h3 className="text-xl font-bold text-gray-900">
                                {track.title}
                              </h3>
                              <p className="text-gray-600">by {track.artist}</p>
                            </div>
                            
                            {/* 価格表示 */}
                            <div className="text-right">
                              {track.price === 0 ? (
                                <div>
                                  <div className="text-2xl font-bold text-green-600">無料</div>
                                  <div className="text-xs text-gray-500">カンパ歓迎</div>
                                </div>
                              ) : (
                                <div>
                                  <div className="text-2xl font-bold text-gray-900">
                                    ¥{track.price}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    最低 ¥{track.minPrice} から
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* 波形 */}
                          <div className="bg-gray-100 rounded p-2 mb-3 font-mono text-purple-600 text-2xl">
                            {track.waveform}
                          </div>

                          {/* メタ情報 */}
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                            <span>⏱ {track.duration}</span>
                            <span>▶️ {track.plays.toLocaleString()}回再生</span>
                            <span>❤️ {track.likes.toLocaleString()}</span>
                            <span>💿 {track.sales}販売</span>
                          </div>

                          {/* タグ */}
                          <div className="flex flex-wrap gap-2 mb-3">
                            {track.tags.map((tag, index) => (
                              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                #{tag}
                              </span>
                            ))}
                          </div>

                          {/* 説明 */}
                          <p className="text-sm text-gray-700 mb-4">
                            {track.description}
                          </p>

                          {/* クレジット */}
                          <div className="bg-gray-50 rounded-lg p-3 mb-4">
                            <div className="text-xs font-semibold text-gray-700 mb-2">クレジット</div>
                            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                              <div>作曲: {track.credits.composer}</div>
                              <div>編曲: {track.credits.arranger}</div>
                              <div>ミキシング: {track.credits.mixing}</div>
                              <div>マスタリング: {track.credits.mastering}</div>
                            </div>
                          </div>

                          {/* アクションボタン */}
                          <div className="flex gap-3">
                            <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                              購入する
                            </button>
                            <button className="px-4 py-2 bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 transition">
                              💝 サポート ¥{track.supportPrice}
                            </button>
                            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                            </button>
                            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a9.001 9.001 0 01-7.432 0m9.032-4.026A9.001 9.001 0 0112 3c-4.474 0-8.268 3.12-9.032 7.326m0 0A9.001 9.001 0 0012 21c4.474 0 8.268-3.12 9.032-7.326" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 収益分配情報 */}
                    <div className="bg-purple-50 px-6 py-3 border-t">
                      <div className="flex items-center justify-between text-sm">
                        <div className="text-purple-700">
                          <svg className="inline w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                          売上の85%がクリエーターに還元されます
                        </div>
                        <Link href="/music/revenue-share" className="text-purple-600 hover:text-purple-700 text-xs">
                          収益分配の詳細 →
                        </Link>
                      </div>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">収益分配（売上¥250の場合）</h4>
                        <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                            <span>Creax手数料（15%）</span>
                            <span>¥37</span>
                            </div>
                            <div className="flex justify-between font-semibold">
                            <span>クリエーター受取（85%）</span>
                            <span>¥213</span>
                            </div>
                        </div>
                    </div>  

                  </div>
                ))}
              </div>

              {/* ページネーション */}
              <div className="mt-8 flex justify-center">
                <div className="flex items-center gap-2">
                  <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50" disabled>
                    前へ
                  </button>
                  <button className="px-3 py-2 bg-purple-600 text-white rounded-lg">1</button>
                  <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
                  <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">3</button>
                  <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    次へ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}