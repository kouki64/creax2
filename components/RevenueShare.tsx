'use client'

interface RevenueShareProps {
  salePrice: number
  showDetails?: boolean
}

export default function RevenueShare({ salePrice, showDetails = true }: RevenueShareProps) {
  const creaxFee = Math.round(salePrice * 0.15)
  const creatorShare = salePrice - creaxFee
  
  // 設計書に基づく分配率
  const distribution = {
    creator: {
      originalOwner: Math.round(creatorShare * 0.45),  // 原盤主（45%）
      artist: Math.round(creatorShare * 0.15),         // アーティスト・歌（15%）
      arranger: Math.round(creatorShare * 0.10),       // アレンジ（10%）
      musicians: Math.round(creatorShare * 0.10),      // ミュージシャン（10%）
      recording: Math.round(creatorShare * 0.07),      // レコーディング（7%）
      pitchCorrection: Math.round(creatorShare * 0.03), // ピッチ修正（3%）
      mixing: Math.round(creatorShare * 0.05),         // ミックス（5%）
      mastering: Math.round(creatorShare * 0.05)       // マスタリング（5%）
    }
  }

  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
      <h3 className="font-semibold text-gray-900 mb-4">
        収益分配シミュレーション
      </h3>
      
      {/* 売上金額入力 */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          販売価格
        </label>
        <div className="flex items-center">
          <span className="text-2xl font-bold text-[#ff6232]">
            ¥{salePrice.toLocaleString()}
          </span>
        </div>
      </div>

      {/* 分配概要 */}
      <div className="space-y-3 pt-4 border-t border-purple-200">
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Creax手数料（15%）</span>
          <span className="font-semibold text-gray-900">
            ¥{creaxFee.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-700 font-semibold">
            クリエーター分配額（85%）
          </span>
          <span className="font-bold text-[#ff6232] text-lg">
            ¥{creatorShare.toLocaleString()}
          </span>
        </div>
      </div>

      {/* 詳細分配 */}
      {showDetails && (
        <div className="mt-6 pt-4 border-t border-purple-200">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">
            クリエーター間の分配内訳
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">原盤主（お金を払った人）</span>
              <div>
                <span className="text-gray-500 text-xs">45% </span>
                <span className="font-medium">¥{distribution.creator.originalOwner.toLocaleString()}</span>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">アーティスト・歌唱</span>
              <div>
                <span className="text-gray-500 text-xs">15% </span>
                <span className="font-medium">¥{distribution.creator.artist.toLocaleString()}</span>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">アレンジ</span>
              <div>
                <span className="text-gray-500 text-xs">10% </span>
                <span className="font-medium">¥{distribution.creator.arranger.toLocaleString()}</span>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">ミュージシャン・コーラス</span>
              <div>
                <span className="text-gray-500 text-xs">10% </span>
                <span className="font-medium">¥{distribution.creator.musicians.toLocaleString()}</span>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">レコーディング</span>
              <div>
                <span className="text-gray-500 text-xs">7% </span>
                <span className="font-medium">¥{distribution.creator.recording.toLocaleString()}</span>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">ピッチ修正</span>
              <div>
                <span className="text-gray-500 text-xs">3% </span>
                <span className="font-medium">¥{distribution.creator.pitchCorrection.toLocaleString()}</span>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">ミックスダウン</span>
              <div>
                <span className="text-gray-500 text-xs">5% </span>
                <span className="font-medium">¥{distribution.creator.mixing.toLocaleString()}</span>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">マスタリング</span>
              <div>
                <span className="text-gray-500 text-xs">5% </span>
                <span className="font-medium">¥{distribution.creator.mastering.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 注釈 */}
      <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
        <p className="text-xs text-yellow-800">
          ※ 実際の分配率は案件により調整可能です
        </p>
      </div>
    </div>
  )
}