import React from 'react';
import { Calendar, Calculator, ShoppingBag, Car, ChevronRight, Clock, MapPin, ExternalLink, Plane, Luggage } from 'lucide-react';

export default function DashboardHome({ onNavigate, tripInfo, todayEvents }) {
  const targetDate = new Date('2026-10-26T00:00:00');
  const today = new Date();
  const diffTime = targetDate - today;
  const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const flight = tripInfo.flight;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Banner & 倒數 */}
      <div className="bg-gradient-to-br from-blue-600 via-sky-500 to-indigo-600 text-white rounded-3xl p-6 shadow-md relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-sky-50 mb-3 border border-white/30">
            <Calendar className="w-3.5 h-3.5" /> 2026/10/26 – 10/28 (3D2N)
          </div>
          <h2 className="text-2xl font-black mb-1">{tripInfo.title}</h2>
          <p className="text-sky-100 text-xs mb-4">沖繩藍 ‧ 慢活自駕旅行手冊</p>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/20 inline-flex items-center gap-3">
            <div className="text-2xl font-black text-amber-300">
              {daysLeft > 0 ? `D-${daysLeft}` : daysLeft === 0 ? 'DAY 1 今日出發！' : '精彩旅程中'}
            </div>
            <div className="text-[11px] text-sky-100 border-l border-white/20 pl-3">
              距沖繩自駕之旅<br />還有 {daysLeft > 0 ? daysLeft : 0} 天
            </div>
          </div>
        </div>
      </div>

      {/* ✈️ 航班資訊 & 行李限制卡片 */}
      {flight && (
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <Plane className="w-4 h-4 text-blue-600" /> 航班與行李資訊
            </h3>
            <span className="text-[11px] font-bold bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded-full border border-amber-200">
              台灣虎航 Tigerair
            </span>
          </div>

          {/* 去程與回程 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <div className="font-bold text-blue-700 mb-1 flex items-center justify-between">
                <span>去程 {flight.outbound.flightNo}</span>
                <span className="text-[10px] text-slate-400">{flight.outbound.date}</span>
              </div>
              <div className="text-slate-800 font-bold text-sm mb-0.5">{flight.outbound.departure} ➔ {flight.outbound.arrival}</div>
              <div className="text-[11px] text-slate-500">桃園 (TPE) ➔ 那霸 (OKA)</div>
            </div>

            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <div className="font-bold text-indigo-700 mb-1 flex items-center justify-between">
                <span>回程 {flight.inbound.flightNo}</span>
                <span className="text-[10px] text-slate-400">{flight.inbound.date}</span>
              </div>
              <div className="text-slate-800 font-bold text-sm mb-0.5">{flight.inbound.departure} ➔ {flight.inbound.arrival}</div>
              <div className="text-[11px] text-slate-500">那霸 (OKA) ➔ 桃園 (TPE)</div>
            </div>
          </div>

          {/* 行李須知 */}
          <div className="bg-sky-50/70 p-3 rounded-2xl border border-sky-100 text-xs text-sky-900 space-y-1">
            <div className="font-bold flex items-center gap-1 text-sky-800 mb-1">
              <Luggage className="w-3.5 h-3.5 text-blue-600" /> 行李額度限制：
            </div>
            <p>🎒 <strong>{flight.baggage.carryOn}</strong></p>
            <p>🧳 <strong>{flight.baggage.checked}</strong></p>
          </div>
        </div>
      )}

      {/* 快捷功能卡片 Grid */}
      <div className="grid grid-cols-2 gap-3.5">
        <button
          onClick={() => onNavigate('itinerary')}
          className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-200 transition text-left group flex flex-col justify-between"
        >
          <div className="flex justify-between items-start mb-3">
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
              <Calendar className="w-5 h-5" />
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-sm">每日行程表</h3>
            <p className="text-[11px] text-slate-400 mt-0.5">MapCode / 時間線</p>
          </div>
        </button>

        <button
          onClick={() => onNavigate('tools')}
          className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-200 transition text-left group flex flex-col justify-between"
        >
          <div className="flex justify-between items-start mb-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
              <Calculator className="w-5 h-5" />
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 transition" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-sm">即時匯率試算</h3>
            <p className="text-[11px] text-slate-400 mt-0.5">日圓 JPY ➔ 台幣 TWD</p>
          </div>
        </button>

        <button
          onClick={() => onNavigate('tools')}
          className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-200 transition text-left group flex flex-col justify-between"
        >
          <div className="flex justify-between items-start mb-3">
            <div className="p-2.5 rounded-xl bg-rose-50 text-rose-500">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-rose-500 transition" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-sm">行前 & 購物清單</h3>
            <p className="text-[11px] text-slate-400 mt-0.5">VJW / 伴手禮 CheckList</p>
          </div>
        </button>

        <button
          onClick={() => onNavigate('driving')}
          className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-200 transition text-left group flex flex-col justify-between"
        >
          <div className="flex justify-between items-start mb-3">
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
              <Car className="w-5 h-5" />
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-amber-600 transition" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-sm">自駕須知</h3>
            <p className="text-[11px] text-slate-400 mt-0.5">右駕口訣 / 停車場地圖</p>
          </div>
        </button>
      </div>

      {/* 第一天行程搶先看 */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span> Day 1 行程亮點 (10/26)
          </h3>
          <button
            onClick={() => onNavigate('itinerary')}
            className="text-xs text-blue-600 font-medium hover:underline"
          >
            看全部 ➔
          </button>
        </div>
        <div className="space-y-2.5">
          {todayEvents.slice(0, 3).map((evt) => (
            <div key={evt.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
              <div>
                <div className="font-bold text-slate-800 mb-0.5">{evt.title}</div>
                <div className="text-slate-500 flex items-center gap-2">
                  <span className="flex items-center"><Clock className="w-3 h-3 mr-0.5" />{evt.time}</span>
                  <span className="flex items-center"><MapPin className="w-3 h-3 mr-0.5 text-rose-500" />{evt.locationName}</span>
                </div>
              </div>
              {evt.mapCode && (
                <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-1 rounded font-mono font-bold">
                  {evt.mapCode}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}