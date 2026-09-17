import React, { useState } from 'react';
import itineraryData from './data/itinerary.json';
import DashboardHome from './components/DashboardHome';
import EventCard from './components/EventCard';
import TravelTools from './components/TravelTools';
import DrivingInfo from './components/DrivingInfo';
import { Home, Calendar, Calculator, Car, PhoneCall } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'itinerary' | 'tools' | 'driving'
  const [currentDay, setCurrentDay] = useState(1);

  const activeDayData = itineraryData.days.find((d) => d.day === currentDay);
  const currentEvents = activeDayData ? activeDayData.events : [];
  const day1Events = itineraryData.days[0]?.events || [];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-24">
      {/* 頂部 Header */}
      <header className="bg-blue-600 text-white py-4 px-6 shadow-sm sticky top-0 z-30 flex items-center justify-between">
        <button onClick={() => setActiveTab('home')} className="flex items-center gap-2 text-left">
          <span className="bg-white/20 p-1.5 rounded-lg">🌺</span>
          <div>
            <h1 className="text-base font-extrabold leading-tight">{itineraryData.tripInfo.title}</h1>
            <p className="text-[10px] text-blue-100">2026/10/26 - 10/28</p>
          </div>
        </button>

        {/* 頂部速切頁籤 (桌機版適用) */}
        <nav className="hidden md:flex items-center gap-1 bg-blue-700/50 p-1 rounded-xl text-xs">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'home' ? 'bg-white text-blue-700 font-bold' : 'text-white'}`}
          >
            首頁
          </button>
          <button
            onClick={() => setActiveTab('itinerary')}
            className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'itinerary' ? 'bg-white text-blue-700 font-bold' : 'text-white'}`}
          >
            行程表
          </button>
          <button
            onClick={() => setActiveTab('tools')}
            className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'tools' ? 'bg-white text-blue-700 font-bold' : 'text-white'}`}
          >
            備忘/匯率
          </button>
          <button
            onClick={() => setActiveTab('driving')}
            className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'driving' ? 'bg-white text-blue-700 font-bold' : 'text-white'}`}
          >
            自駕須知
          </button>
        </nav>
      </header>

      {/* 主要內容顯示區 */}
      <main className="max-w-3xl mx-auto px-4 py-6">
        {/* 1. 首頁 View */}
        {activeTab === 'home' && (
          <DashboardHome
            onNavigate={(tab) => setActiveTab(tab)}
            tripInfo={itineraryData.tripInfo}
            todayEvents={day1Events}
          />
        )}

        {/* 2. 行程表 View */}
        {activeTab === 'itinerary' && (
          <div className="space-y-4">
            {/* 天數切換 Tab */}
            <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-none">
              {itineraryData.days.map((d) => (
                <button
                  key={d.day}
                  onClick={() => setCurrentDay(d.day)}
                  className={`px-4 py-2 rounded-full font-bold text-xs whitespace-nowrap transition shadow-sm ${
                    currentDay === d.day
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Day {d.day} ({d.date.slice(5)})
                </button>
              ))}
            </div>

            <h2 className="text-md font-bold text-slate-800 border-l-4 border-blue-600 pl-2.5">
              {activeDayData?.title}
            </h2>

            {currentEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}

        {/* 3. 備忘與匯率 View */}
        {activeTab === 'tools' && <TravelTools />}

        {/* 4. 自駕須知 View */}
        {activeTab === 'driving' && <DrivingInfo />}
      </main>

      {/* 📱 手機版底部導覽列 (Bottom Navigation Bar) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 px-6 py-2 flex justify-around items-center z-40 md:hidden">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-1 text-[10px] font-medium transition ${activeTab === 'home' ? 'text-blue-600 font-bold' : 'text-slate-400'}`}
        >
          <Home className="w-5 h-5" />
          首頁
        </button>

        <button
          onClick={() => setActiveTab('itinerary')}
          className={`flex flex-col items-center gap-1 text-[10px] font-medium transition ${activeTab === 'itinerary' ? 'text-blue-600 font-bold' : 'text-slate-400'}`}
        >
          <Calendar className="w-5 h-5" />
          行程表
        </button>

        <button
          onClick={() => setActiveTab('tools')}
          className={`flex flex-col items-center gap-1 text-[10px] font-medium transition ${activeTab === 'tools' ? 'text-blue-600 font-bold' : 'text-slate-400'}`}
        >
          <Calculator className="w-5 h-5" />
          備忘/匯率
        </button>

        <button
          onClick={() => setActiveTab('driving')}
          className={`flex flex-col items-center gap-1 text-[10px] font-medium transition ${activeTab === 'driving' ? 'text-blue-600 font-bold' : 'text-slate-400'}`}
        >
          <Car className="w-5 h-5" />
          自駕須知
        </button>
      </div>
    </div>
  );
}