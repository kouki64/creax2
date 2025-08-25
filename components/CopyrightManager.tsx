'use client'

import { useState } from 'react'

interface CopyrightInfo {
  type: 'buyout' | 'jasrac' | 'shared'
  jasracCode?: string
  composers: string[]
  lyricists: string[]
  arrangers: string[]
  publishers: string[]
}

export default function CopyrightManager() {
  const [copyrightInfo, setCopyrightInfo] = useState<CopyrightInfo>({
    type: 'buyout',
    composers: [],
    lyricists: [],
    arrangers: [],
    publishers: []
  })

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">著作権管理</h3>
      
      {/* 著作権タイプ選択 */}
      <div className="space-y-3 mb-6">
        <label className="flex items-center p-3 border-2 rounded-lg cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            name="copyright"
            value="buyout"
            checked={copyrightInfo.type === 'buyout'}
            onChange={(e) => setCopyrightInfo({...copyrightInfo, type: e.target.value as any})}
            className="mr-3"
          />
          <div>
            <div className="font-medium">著作権買い取り</div>
            <div className="text-sm text-gray-500">全ての権利をクライアントに譲渡</div>
          </div>
        </label>
        
        <label className="flex items-center p-3 border-2 rounded-lg cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            name="copyright"
            value="jasrac"
            checked={copyrightInfo.type === 'jasrac'}
            onChange={(e) => setCopyrightInfo({...copyrightInfo, type: e.target.value as any})}
            className="mr-3"
          />
          <div>
            <div className="font-medium">JASRAC管理</div>
            <div className="text-sm text-gray-500">著作権管理団体に信託</div>
          </div>
        </label>
        
        <label className="flex items-center p-3 border-2 rounded-lg cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            name="copyright"
            value="shared"
            checked={copyrightInfo.type === 'shared'}
            onChange={(e) => setCopyrightInfo({...copyrightInfo, type: e.target.value as any})}
            className="mr-3"
          />
          <div>
            <div className="font-medium">共同管理</div>
            <div className="text-sm text-gray-500">クリエーターと権利を共有</div>
          </div>
        </label>
      </div>

      {/* JASRAC管理の場合の追加情報 */}
      {copyrightInfo.type === 'jasrac' && (
        <div className="p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-3">JASRAC登録情報</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                作品コード（あれば）
              </label>
              <input
                type="text"
                placeholder="例: 123-4567-8"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="text-xs text-blue-700">
              ※ JASRACに登録すると、使用料の7.7%または7.7円のうち高い方が徴収されます
            </div>
          </div>
        </div>
      )}

      {/* 権利者情報 */}
      <div className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            作曲者
          </label>
          <input
            type="text"
            placeholder="複数の場合はカンマ区切り"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            作詞者
          </label>
          <input
            type="text"
            placeholder="複数の場合はカンマ区切り"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            編曲者
          </label>
          <input
            type="text"
            placeholder="複数の場合はカンマ区切り"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      {/* 注意事項 */}
      <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-yellow-600 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div className="text-sm text-yellow-800">
            <p className="font-medium mb-1">著作権に関する注意</p>
            <ul className="space-y-1 text-xs">
              <li>• 著作権の扱いは案件開始前に必ず確認してください</li>
              <li>• JASRAC管理楽曲は商用利用時に使用料が発生します</li>
              <li>• 不明な点は専門家にご相談ください</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}