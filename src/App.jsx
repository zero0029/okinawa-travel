import React, { useState, useEffect } from 'react';
import initialData from './data/itinerary.json';
import DashboardHome from './components/DashboardHome';
import EventCard from './components/EventCard';
import TravelTools from './components/TravelTools';
import DrivingInfo from './components/DrivingInfo';
import { Home, Calendar, Calculator, Car, Plus, RotateCcw, X } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [currentDay, setCurrentDay] = useState(1);

  // 從 LocalStorage 載入行程資料，若無則使用初始 itinerary.json
  const [itineraryData, setItineraryData] = useState(() => {
    const saved = localStorage.getItem('okinawa_itinerary_data');
    return saved ? JSON.parse(saved) : initialData;
  });

  // 編輯對話框狀態
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  // 表單欄位 State
  const [formTime, setFormTime] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('景點');
  const [formLocation, setFormLocation] = useState('');
  const [formMapCode, setFormMapCode] = useState('');
  const [formNote, setFormNote] = useState('');

  useEffect(() => {
    localStorage.setItem('okinawa_itinerary_data', JSON.stringify(itineraryData));
  }, [itineraryData]);

  const activeDayData = itineraryData.days.find((d) => d.day === currentDay);
  const currentEvents = activeDayData ? activeDayData.events : [];
  const day1Events = itineraryData.days[0]?.events || [];

  // 開啟新增景點視窗
  const handleOpenAddModal = () => {
    setEditingEvent(null);
    setFormTime('12:00');
    setFormTitle('');
    setFormCategory('景點');
    setFormLocation('');
    setFormMapCode('');
    setFormNote('');
    setIsModalOpen(true);
  };

  // 開啟編輯景點視窗
  const handleOpenEditModal = (evt) => {
    setEditingEvent(evt);
    setFormTime(evt.time || '');
    setFormTitle(evt.title || '');
    setFormCategory(evt.category || '景點');
    setFormLocation(evt.locationName || '');
    setFormMapCode(evt.mapCode || '');
    setFormNote(evt.note || '');
    setIsModalOpen(true);
  };

  // 儲存（新增或更新）
  const handleSaveEvent = (e) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const newEvent = {
      id: editingEvent ? editingEvent.id : `evt-${Date.now()}`,
      time: formTime,
      title: formTitle,
      category: formCategory,
      locationName: formLocation,
      mapCode: formMapCode,
      note: formNote,
    };

    const updatedDays = itineraryData.days.map((dayObj) => {
      if (dayObj.day === currentDay) {
        let newEvents = [];
        if (editingEvent) {
          // 修改舊項目
          newEvents = dayObj.events.map((item) => (item.id === editingEvent.id ? newEvent : item));
        } else {
          // 新增項目
          newEvents = [...dayObj.events, newEvent];
        }
        // 依時間排序
        newEvents.sort((a, b) => a.time.localeCompare(b.time));
        return { ...dayObj, events: newEvents };
      }
      return dayObj;
    });

    setItineraryData({ ...itineraryData, days: updatedDays });
    setIsModalOpen(false);
  };

  // 刪除景點
  const handleDeleteEvent = (eventId) => {
    if (!window.confirm('確定要刪除這個景點嗎？')) return;
    const updatedDays = itineraryData.days.map((dayObj) => {
      if (dayObj.day === currentDay) {
        return { ...dayObj, events: dayObj.events.filter((e) => e.id !== eventId) };
      }
      return dayObj;
    });
    setItineraryData({ ...itineraryData, days: updatedDays });
  };

  // 重置為預設行程
  const handleResetData = () => {
    if (window.confirm('確定要重置為最初預設的行程嗎？自訂的變更將會清除。')) {
      setItineraryData(initialData);
      localStorage.removeItem('okinawa_itinerary_data');
    }
  };

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

        {/* 頂部導覽 */}
        <nav className="hidden md:flex items-center gap-1 bg-blue-700/50 p-1 rounded-xl text-xs">
          <button onClick={() => setActiveTab('home')} className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'home' ? 'bg-white text-blue-700 font-bold' : 'text-white'}`}>首頁</button>
          <button onClick={() => setActiveTab('itinerary')} className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'itinerary' ? 'bg-white text-blue-700 font-bold' : 'text-white'}`}>行程表</button>
          <button onClick={() => setActiveTab('tools')} className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'tools' ? 'bg-white text-blue-700 font-bold' : 'text-white'}`}>備忘/匯率</button>
          <button onClick={() => setActiveTab('driving')} className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'driving' ? 'bg-white text-blue-700 font-bold' : 'text-white'}`}>自駕須知</button>
        </nav>
      </header>

      {/* 主要內容顯示區 */}
      <main className="max-w-3xl mx-auto px-4 py-6">
        {activeTab === 'home' && (
          <DashboardHome
            onNavigate={(tab) => setActiveTab(tab)}
            tripInfo={itineraryData.tripInfo}
            todayEvents={day1Events}
          />
        )}

        {activeTab === 'itinerary' && (
          <div className="space-y-4">
            {/* 天數切換與操作按鈕 */}
            <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2 scrollbar-none">
              <div className="flex space-x-2">
                {itineraryData.days.map((d) => (
                  <button
                    key={d.day}
                    onClick={() => setCurrentDay(d.day)}
                    className={`px-4 py-2 rounded-full font-bold text-xs whitespace-nowrap transition shadow-sm ${
                      currentDay === d.day ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    Day {d.day} ({d.date.slice(5)})
                  </button>
                ))}
              </div>

              {/* 重置按鈕 */}
              <button
                onClick={handleResetData}
                className="text-slate-400 hover:text-slate-600 p-2 rounded-lg text-xs flex items-center gap-1 flex-shrink-0"
                title="恢復成原本預設行程"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex justify-between items-center">
              <h2 className="text-md font-bold text-slate-800 border-l-4 border-blue-600 pl-2.5">
                {activeDayData?.title}
              </h2>
              {/* 新增景點按鈕 */}
              <button
                onClick={handleOpenAddModal}
                className="bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1 hover:bg-blue-700 shadow-sm transition"
              >
                <Plus className="w-4 h-4" /> 新增景點
              </button>
            </div>

            {currentEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onEdit={handleOpenEditModal}
                onDelete={handleDeleteEvent}
              />
            ))}
          </div>
        )}

        {activeTab === 'tools' && <TravelTools />}
        {activeTab === 'driving' && <DrivingInfo />}
      </main>

      {/* 📱 編輯/新增景點彈窗 (Modal) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-xl border border-slate-100 animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-800 text-base">
                {editingEvent ? '編輯景點' : `新增 Day ${currentDay} 景點`}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEvent} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-slate-500 mb-1">時間</label>
                  <input
                    type="text"
                    value={formTime}
                    onChange={(e) => setFormTime(e.target.value)}
                    placeholder="10:30"
                    className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-slate-500 mb-1">分類</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="景點">景點</option>
                    <option value="美食">美食</option>
                    <option value="購物">購物</option>
                    <option value="交通">交通</option>
                    <option value="住宿">住宿</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-500 mb-1">行程名稱</label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="例如：美麗海水族館"
                  className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-bold"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-500 mb-1">地點 / 導航搜尋名稱</label>
                <input
                  type="text"
                  value={formLocation}
                  onChange={(e) => setFormLocation(e.target.value)}
                  placeholder="例如：海洋博公園"
                  className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-500 mb-1">MapCode (選填)</label>
                <input
                  type="text"
                  value={formMapCode}
                  onChange={(e) => setFormMapCode(e.target.value)}
                  placeholder="553 075 797*77"
                  className="w-full px-3 py-2 border rounded-xl font-mono focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-500 mb-1">備註 / 表演時間 / 筆記</label>
                <textarea
                  rows="3"
                  value={formNote}
                  onChange={(e) => setFormNote(e.target.value)}
                  placeholder="輸入備忘事項..."
                  className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-sm"
                >
                  儲存
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 📱 手機版底部導覽列 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 px-6 py-2 flex justify-around items-center z-40 md:hidden">
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1 text-[10px] font-medium transition ${activeTab === 'home' ? 'text-blue-600 font-bold' : 'text-slate-400'}`}>
          <Home className="w-5 h-5" />首頁
        </button>
        <button onClick={() => setActiveTab('itinerary')} className={`flex flex-col items-center gap-1 text-[10px] font-medium transition ${activeTab === 'itinerary' ? 'text-blue-600 font-bold' : 'text-slate-400'}`}>
          <Calendar className="w-5 h-5" />行程表
        </button>
        <button onClick={() => setActiveTab('tools')} className={`flex flex-col items-center gap-1 text-[10px] font-medium transition ${activeTab === 'tools' ? 'text-blue-600 font-bold' : 'text-slate-400'}`}>
          <Calculator className="w-5 h-5" />備忘/匯率
        </button>
        <button onClick={() => setActiveTab('driving')} className={`flex flex-col items-center gap-1 text-[10px] font-medium transition ${activeTab === 'driving' ? 'text-blue-600 font-bold' : 'text-slate-400'}`}>
          <Car className="w-5 h-5" />自駕須知
        </button>
      </div>
    </div>
  );
}