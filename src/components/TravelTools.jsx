import React, { useState, useEffect } from 'react';
import { Calculator, ShoppingBag, CheckSquare, Square, Plus, Trash2, RefreshCw } from 'lucide-react';

export default function TravelTools() {
  // 預設參考匯率，並提供即時更新狀態
  const [exchangeRate, setExchangeRate] = useState(0.212);
  const [isLoadingRate, setIsLoadingRate] = useState(false);
  const [jpy, setJpy] = useState('');
  const [twd, setTwd] = useState('');

  // 購物清單狀態 (儲存在 localStorage)
  const [shoppingList, setShoppingList] = useState(() => {
    const saved = localStorage.getItem('okinawa_shopping_list');
    return saved ? JSON.parse(saved) : [
      { id: 1, text: '紅芋塔 (御菓子御殿)', done: false },
      { id: 2, text: '雪鹽金楚糕', done: false },
      { id: 3, text: '沖繩黑糖', done: false }
    ];
  });
  const [newItem, setNewItem] = useState('');

  // 取得即時匯率 API (日幣轉台幣)
  const fetchLiveRate = async () => {
    setIsLoadingRate(true);
    try {
      const response = await fetch('https://open.er-api.com/v6/latest/JPY');
      const data = await response.json();
      if (data && data.rates && data.rates.TWD) {
        setExchangeRate(data.rates.TWD);
      }
    } catch (error) {
      console.error('無法取得即時匯率，使用備用預設值', error);
    } finally {
      setIsLoadingRate(false);
    }
  };

  // 元件載入時自動抓取最新匯率
  useEffect(() => {
    fetchLiveRate();
  }, []);

  useEffect(() => {
    localStorage.setItem('okinawa_shopping_list', JSON.stringify(shoppingList));
  }, [shoppingList]);

  // 當日幣輸入改變時計算台幣
  const handleJpyChange = (val) => {
    setJpy(val);
    if (val === '' || isNaN(val)) {
      setTwd('');
    } else {
      setTwd((parseFloat(val) * exchangeRate).toFixed(0));
    }
  };

  // 新增購物項目
  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    setShoppingList([...shoppingList, { id: Date.now(), text: newItem.trim(), done: false }]);
    setNewItem('');
  };

  // 切換勾選狀態
  const toggleItem = (id) => {
    setShoppingList(
      shoppingList.map(item => item.id === id ? { ...item, done: !item.done } : item)
    );
  };

  // 刪除項目
  const deleteItem = (id) => {
    setShoppingList(shoppingList.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* 匯率計算器 */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-md font-bold text-slate-800 flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-blue-600" /> 日圓 / 台幣 即時試算
          </h3>
          <button 
            onClick={fetchLiveRate} 
            title="更新即時匯率"
            className="text-slate-400 hover:text-blue-600 p-1 transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoadingRate ? 'animate-spin text-blue-600' : ''}`} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-slate-500 block mb-1">日圓 (JPY ¥)</label>
            <input
              type="number"
              value={jpy}
              onChange={(e) => handleJpyChange(e.target.value)}
              placeholder="1000"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 font-semibold"
            />
          </div>
          <div>
            <label className="text-xs text-slate-500 block mb-1">約合台幣 (TWD $)</label>
            <input
              type="text"
              readOnly
              value={twd ? `NT$ ${twd}` : ''}
              placeholder="NT$ 0"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-blue-700 font-bold"
            />
          </div>
        </div>
        
        <p className="text-[10px] text-slate-400 mt-2 text-right flex items-center justify-end gap-1">
          <span>{isLoadingRate ? '正在更新國際匯率...' : `即時國際匯率：1 JPY ≈ ${exchangeRate.toFixed(4)} TWD`}</span>
        </p>
      </div>

      {/* 必買伴手禮清單 */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-md font-bold text-slate-800 flex items-center mb-3">
          <ShoppingBag className="w-5 h-5 mr-2 text-rose-500" /> 必買伴手禮清單
        </h3>

        <form onSubmit={handleAddItem} className="flex gap-2 mb-3">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="新增想買的物品..."
            className="flex-1 px-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-blue-700 transition"
          >
            <Plus className="w-4 h-4" />
          </button>
        </form>

        <ul className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {shoppingList.map(item => (
            <li key={item.id} className="flex items-center justify-between text-sm p-1.5 rounded hover:bg-slate-50">
              <button onClick={() => toggleItem(item.id)} className="flex items-center text-left gap-2 flex-1">
                {item.done ? (
                  <CheckSquare className="w-4 h-4 text-blue-600 flex-shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400 flex-shrink-0" />
                )}
                <span className={item.done ? 'line-through text-slate-400' : 'text-slate-700'}>
                  {item.text}
                </span>
              </button>
              <button onClick={() => deleteItem(item.id)} className="text-slate-300 hover:text-rose-500 p-1">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}