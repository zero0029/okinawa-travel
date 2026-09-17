import React from 'react';
import { Car, PhoneCall } from 'lucide-react';

export default function DrivingInfo() {
  return (
    <div className="space-y-4">
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