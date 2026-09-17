import React from 'react';
import { Car, PhoneCall, MapPin, ExternalLink } from 'lucide-react';

export default function DrivingInfo() {
  return (
    <div className="space-y-4">
      {/* 停車場地圖查詢 */}
      <div className="bg-slate-800 text-white p-5 rounded-2xl shadow-sm relative overflow-hidden">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-slate-700 text-amber-400 rounded-xl">🅿️</span>
            <div>
              <h3 className="text-md font-bold text-white">沖繩即時停車場查詢</h3>
              <p className="text-[11px] text-slate-400">LocationSmart 費用與剩餘車位</p>
            </div>
          </div>
        </div>
        <p className="text-xs text-slate-300 mb-3 leading-relaxed">
          出發前或抵達景點時，可直接點擊查詢周邊停車場的位置、收費標準與剩餘空位。
        </p>
        <a
          href="https://www.locationsmart.org/?tag=_service_parking"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-sm"
        >
          開啟 LocationSmart 停車場地圖 <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* 自駕須知 */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-md font-bold text-slate-800 flex items-center mb-3">
          <Car className="w-5 h-5 mr-2 text-blue-600" /> 沖繩自駕注意事項
        </h3>
        <ul className="text-xs space-y-2 text-slate-600">
          <li className="flex items-start">
            <span className="bg-blue-100 text-blue-800 font-bold px-1.5 py-0.5 rounded mr-2 flex-shrink-0">右駕</span>
            雨刷與方向燈位置相反，口訣：「小轉左、大轉右」。
          </li>
          <li className="flex items-start">
            <span className="bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded mr-2 flex-shrink-0">加油</span>
            一般無鉛汽油請認明「レギュラー (Regular)」，槍頭為紅色。
          </li>
          <li className="flex items-start">
            <span className="bg-rose-100 text-rose-800 font-bold px-1.5 py-0.5 rounded mr-2 flex-shrink-0">高速</span>
            分一般車道（抽票繳費）與 ETC 車道，速限多為 80 km/h。
          </li>
        </ul>
      </div>

      {/* 緊急聯絡電話 */}
      <div className="bg-amber-50/80 p-5 rounded-2xl border border-amber-200">
        <h3 className="text-md font-bold text-amber-900 flex items-center mb-2">
          <PhoneCall className="w-5 h-5 mr-2 text-amber-700" /> 緊急聯絡資訊
        </h3>
        <div className="text-xs space-y-1.5 text-amber-800">
          <p><strong>OTS 租車事故服務：</strong> 098-856-8877</p>
          <p><strong>日本警察局（交通事故）：</strong> 110</p>
          <p><strong>日本救護車（緊急送醫）：</strong> 119</p>
          <p><strong>台北駐日代表處那霸分處：</strong> 098-862-7008</p>
        </div>
      </div>
    </div>
  );
}