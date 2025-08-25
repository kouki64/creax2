'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function ProductionNoteDetailPage() {
  const params = useParams()
  const [isLiked, setIsLiked] = useState(false)
  const [isHelpful, setIsHelpful] = useState(false)
  const [showCommentForm, setShowCommentForm] = useState(false)
  
  // 制作後記詳細データ
  const [note] = useState({
    id: params.id,
    projectTitle: 'YouTubeチャンネルOP制作',
    projectId: 'proj-001',
    creatorName: '山田太郎',
    creatorId: 'creator-001',
    creatorTitle: 'プロアレンジャー',
    creatorAvatar: null,
    createdAt: '2024-02-15',
    updatedAt: '2024-02-15',
    category: 'アレンジ',
    title: '80年代シンセポップ風OPテーマの制作秘話',
    content: `
      <h2>はじめに</h2>
      <p>今回、YouTubeチャンネルのオープニングテーマ制作という案件をいただきました。クライアントからのリクエストは「レトロフューチャー」というキーワード。これを聞いて、すぐに80年代のシンセポップを現代風にアレンジすることを思いつきました。</p>
      
      <h2>コンセプト決定まで</h2>
      <p>まず最初に行ったのは、クライアントとのイメージのすり合わせです。「レトロフューチャー」という言葉から連想されるものは人によって異なるため、以下のような参考曲をいくつか提示しました：</p>
      <ul>
        <li>Daft Punk - Random Access Memories のような現代的アプローチ</li>
        <li>The Weeknd - Blinding Lights のような80年代リバイバル</li>
        <li>Justice - Cross のようなエレクトロ要素</li>
      </ul>
      
      <h2>制作プロセス</h2>
      <h3>1. ドラムパターンの構築</h3>
      <p>80年代の特徴的なゲートリバーブドラムを再現しつつ、現代的なパンチを加えるため、以下の工夫をしました：</p>
      <ul>
        <li>LinnDrum のサンプルをベースに使用</li>
        <li>並列コンプレッションで現代的な圧を追加</li>
        <li>サイドチェインコンプで80年代特有のグルーヴを演出</li>
      </ul>
      
      <h3>2. シンセサイザーの選定</h3>
      <p>メインとなるシンセは、以下の組み合わせで構成しました：</p>
      <ul>
        <li>リード：Arturia Juno-106 V（定番の80年代シンセ）</li>
        <li>ベース：Moog Model D（アナログ感のある太いベース）</li>
        <li>パッド：Roland D-50 V（きらびやかな雰囲気作り）</li>
      </ul>
      
      <h3>3. ミキシングのポイント</h3>
      <p>80年代の雰囲気を残しながら、YouTubeでの再生を考慮した現代的なミックスを心がけました：</p>
      <ul>
        <li>広がりのあるステレオイメージ（ただしモノラル互換性も確保）</li>
        <li>2kHz〜5kHz帯域を少し持ち上げて、スマホスピーカーでも聴きやすく</li>
        <li>コンプレッサーは軽めに、ダイナミクスを残す</li>
      </ul>
      
      <h2>苦労した点</h2>
      <p>最も苦労したのは、15秒という短い尺の中で、イントロ・メイン・アウトロの構成を作ることでした。通常の楽曲なら8小節使うところを2小節で展開させる必要があり、情報量の調整が難しかったです。</p>
      
      <h2>クライアントからのフィードバック</h2>
      <p>初稿提出後、「もう少しキラキラ感が欲しい」というフィードバックをいただきました。そこで、高域にグロッケンシュピールとベルの音を薄く重ねることで、華やかさを演出しました。</p>
      
      <h2>最終的な仕上がり</h2>
      <p>完成した楽曲は、80年代のノスタルジックな雰囲気と、現代的な音圧・クリアさを両立させることができました。クライアントからも「イメージ通り！」と高評価をいただき、視聴者からも好評とのことです。</p>
      
      <h2>今回学んだこと</h2>
      <p>短尺の楽曲制作では、通常の楽曲以上に「引き算」が重要だということを改めて実感しました。すべての音に明確な役割を持たせ、不要な要素は思い切って削ることで、短時間でも印象的な楽曲を作ることができます。</p>
      
      <h2>使用機材・プラグイン</h2>
      <ul>
        <li>DAW: Logic Pro X</li>
        <li>シンセ: Arturia V Collection 9</li>
        <li>ドラム: XLN Audio Addictive Drums 2</li>
        <li>エフェクト: FabFilter Pro Bundle, Valhalla Vintage Verb</li>
        <li>マスタリング: iZotope Ozone 10</li>
      </ul>
    `,
    readTime: '5分',
    likes: 234,
    comments: [
      {
        id: 'comment-001',
        userName: '佐藤花子',
        userId: 'user-002',
        content: 'シンセの選定、とても参考になりました！私も80年代風の楽曲を作る機会があったので、Juno-106を使ってみます。',
        createdAt: '2024-02-15 14:30',
        likes: 12
      },
      {
        id: 'comment-002',
        userName: '鈴木一郎',
        userId: 'user-003',
        content: '15秒という制約の中でのアレンジ、本当に難しいですよね。引き算の考え方、勉強になります。',
        createdAt: '2024-02-15 16:45',
        likes: 8
      }
    ],
    helpful: 189,
    tags: ['シンセポップ', 'レトロ', 'YouTube', '80年代', 'アレンジ']
  })
  
  // 関連記事
  const [relatedNotes] = useState([
    {
      id: 'note-002',
      title: 'ゲームBGMで重要な「ループ感」を出すテクニック',
      creatorName: '佐藤花子',
      likes: 156
    },
    {
      id: 'note-003',
      title: '15秒で印象に残るメロディーを作る方法',
      creatorName: '鈴木一郎',
      likes: 312
    }
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/production-notes" className="text-gray-600 hover:text-gray-900">
              ← 制作後記一覧
            </Link>
            <div className="flex gap-2">
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a9.001 9.001 0 01-7.432 0m9.032-4.026A9.001 9.001 0 0112 3c-4.474 0-8.268 2.943-9.543 7a9.97 9.97 0 011.563 3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 記事ヘッダー */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="mb-4">
            <span className="px-3 py-1 bg-[#ff6232] text-white rounded-full text-sm">
              {note.category}
            </span>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {note.title}
          </h1>
          
          <div className="flex items-center justify-between mb-6 pb-6 border-b">
            <div className="flex items-center gap-4">
              <Link href={`/creators/${note.creatorId}`} className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#ff6232] to-[#ff8a5c] rounded-full flex items-center justify-center text-white font-bold">
                  {note.creatorName[0]}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 hover:text-[#ff6232]">
                    {note.creatorName}
                  </p>
                  <p className="text-sm text-gray-600">{note.creatorTitle}</p>
                </div>
              </Link>
            </div>
            
            <div className="text-right text-sm text-gray-600">
              <p>公開: {note.createdAt}</p>
              <p>読了時間: {note.readTime}</p>
            </div>
          </div>

          {/* 関連案件 */}
          <div className="bg-orange-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-1">この制作後記の関連案件</p>
            <Link href={`/jobs/${note.projectId}`} className="text-[#ff6232] hover:text-[#e5562c] font-medium">
              {note.projectTitle} →
            </Link>
          </div>

          {/* 本文 */}
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: note.content }}
          />

          {/* タグ */}
          <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t">
            {note.tags.map(tag => (
              <Link
                key={tag}
                href={`/production-notes?tag=${tag}`}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200"
              >
                #{tag}
              </Link>
            ))}
          </div>

          {/* アクションボタン */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                  isLiked 
                    ? 'bg-[#ff6232] text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>👍</span>
                <span>いいね</span>
                <span className="font-semibold">{isLiked ? note.likes + 1 : note.likes}</span>
              </button>
              
              <button
                onClick={() => setIsHelpful(!isHelpful)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                  isHelpful 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>💡</span>
                <span>参考になった</span>
                <span className="font-semibold">{isHelpful ? note.helpful + 1 : note.helpful}</span>
              </button>
            </div>
            
            <div className="flex gap-2">
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a9.001 9.001 0 01-7.432 0m9.032-4.026A9.001 9.001 0 0112 3c-4.474 0-8.268 2.943-9.543 7a9.97 9.97 0 011.563 3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* コメントセクション */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">コメント（{note.comments.length}）</h2>
            <button
              onClick={() => setShowCommentForm(!showCommentForm)}
              className="px-4 py-2 bg-[#ff6232] text-white rounded-lg hover:bg-[#e5562c]"
            >
              コメントを書く
            </button>
          </div>

          {/* コメントフォーム */}
          {showCommentForm && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none"
                rows={4}
                placeholder="コメントを入力..."
              />
              <div className="mt-3 flex justify-end gap-2">
                <button
                  onClick={() => setShowCommentForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  キャンセル
                </button>
                <button className="px-4 py-2 bg-[#ff6232] text-white rounded-lg hover:bg-[#e5562c]">
                  投稿
                </button>
              </div>
            </div>
          )}

          {/* コメント一覧 */}
          <div className="space-y-4">
            {note.comments.map(comment => (
              <div key={comment.id} className="border-b pb-4 last:border-0">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-semibold">
                    {comment.userName[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <Link href={`/users/${comment.userId}`} className="font-semibold text-gray-900 hover:text-[#ff6232]">
                          {comment.userName}
                        </Link>
                        <span className="text-sm text-gray-500 ml-2">
                          {comment.createdAt}
                        </span>
                      </div>
                      <button className="text-sm text-gray-600 hover:text-[#ff6232]">
                        👍 {comment.likes}
                      </button>
                    </div>
                    <p className="text-gray-700">{comment.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 関連記事 */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-xl font-bold mb-4">関連する制作後記</h2>
          <div className="space-y-3">
            {relatedNotes.map(related => (
              <Link
                key={related.id}
                href={`/production-notes/${related.id}`}
                className="block p-4 border rounded-lg hover:shadow-md transition"
              >
                <h3 className="font-semibold text-gray-900 hover:text-[#ff6232]">
                  {related.title}
                </h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-gray-600">by {related.creatorName}</span>
                  <span className="text-sm text-gray-500">👍 {related.likes}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}