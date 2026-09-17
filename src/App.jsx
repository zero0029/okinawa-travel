import React, { useState } from 'react';
import itineraryData from './data/itinerary.json';
import EventCard from './components/EventCard';
import TravelTools from './components/TravelTools';
import DrivingInfo from './components/DrivingInfo';
import { Calendar, Palmtree } from 'lucide-react';

export default function App() {
  const [currentDay, setCurrentDay] = useState(1);

  const activeDayData = itineraryData.days.find((d) => d.day === currentDay);
  const currentEvents = activeDayData ? activeDayData.events : [];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-16">
      {/* 頂部 Header：純藍海洋漸層 (Deep Sky Blue to Ocean Blue) */}
      <header className="bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 text-white py-10 px-6 text-center shadow-lg relative overflow-hidden">
        <div className="absolute top-2 right-4 opacity-10 pointer-events-none">
          <Palmtree className="w-40 h-40" />
        </div>
        
        <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-medium text-sky-50 mb-3 border border-white/30">
          <Calendar className="w-3.5 h-3.5" /> 2026/10/26 – 2026/10/28 (3D2N)
        </span>
        
        <h1 className="text-3xl md:text-4xl font-black tracking-wide drop-shadow-sm">
          {itineraryData.tripInfo.title}
        </h1>
        <p className="text-sky-100 text-xs md:text-sm mt-2 font-light">
          沖繩藍 ‧ 慢活自駕旅行手冊
        </p>
      </header>

      {/* 主要區域 */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* 天數切換 Tab (寶藍與天藍色) */}
        <div className="flex space-x-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {itineraryData.days.map((d) => (
            <button
              key={d.day}
              onClick={() => setCurrentDay(d.day)}
              className={`px-5 py-2.5 rounded-full font-semibold text-sm whitespace-nowrap transition-all duration-200 shadow-sm ${
                currentDay === d.day
                  ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-500/30'
                  : 'bg-white text-slate-600 hover:bg-sky-50 border border-slate-200'
              }`}
            >
              Day {d.day} ({d.date.slice(5)})
            </button>
          ))}
        </div>

        {/* 雙欄版面 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 左側：每日行程列表 */}
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-lg font-bold text-slate-800 border-l-4 border-blue-600 pl-3 flex items-center gap-2">
              {activeDayData?.title}
            </h2>
            {currentEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          {/* 右側：實用工具 & 自駕須知 */}
          <div className="lg:col-span-5 space-y-6">
            <TravelTools />
            <DrivingInfo />
          </div>
        </div>
      </main>
    </div>
  );
}