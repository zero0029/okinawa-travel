import React, { useState, useEffect } from 'react';
import { Calculator, ShoppingBag, CheckSquare, Square, Plus, Trash2, RefreshCw, CheckCircle2, ExternalLink } from 'lucide-react';

export default function TravelTools() {
  // 即時匯率
  const [exchangeRate, setExchangeRate] = useState(0.212);
  const [isLoadingRate, setIsLoadingRate] = useState(false);
  const [jpy, setJpy] = useState('');
  const [twd, setTwd] = useState('');

  // 行前 To-Do List
  const [todoList, setTodoList] = useState(() => {
    const saved = localStorage.getItem('okinawa_todo_list');
    return saved ? JSON.parse(saved) : [
      { id: 1, text: '投保旅遊和平安險', done: false },
      { id: 2, text: '開通網路漫遊 / 預訂 eSIM', done: false },
      { id: 3, text: '填寫 Visit Japan Web (入境手續)', done: false, link: 'https://www.vjw.digital.go.jp/' },
      { id: 4, text: '線上購買沖繩美麗海水族館門票', done: false }
    ];
  });

  // 伴手禮清單
  const [shoppingList, setShoppingList] = useState(() => {
    const saved = localStorage.getItem('okinawa_shopping_list');
    return saved ? JSON.parse(saved) : [
      { id: 1, text: '紅芋塔 (御菓子御殿)', done: false },
      { id: 2, text: '雪鹽金楚糕', done: false },
      { id: 3, text: '沖繩黑糖', done: false }
    ];
  });
  const [newItem, setNewItem] = useState('');

  const fetchLiveRate = async () => {
    setIsLoadingRate(true);
    try {
      const response = await fetch('https://open.er-api.com/v6/latest/JPY');
      const data = await response.json();
      if (data?.rates?.TWD) setExchangeRate(data.rates.TWD);
    } catch (error) {
      console.error('無法取得即時匯率', error);
    } finally {
      setIsLoadingRate(false);
    }
  };

  useEffect(() => {
    fetchLiveRate();
  }, []);

  useEffect(() => {
    localStorage.setItem('okinawa_todo_list', JSON.stringify(todoList));
  }, [todoList]);

  useEffect(() => {
    localStorage.setItem('okinawa_shopping_list', JSON.stringify(shoppingList));
  }, [shoppingList]);

  const handleJpyChange = (val) => {
    setJpy(val);
    setTwd(val && !isNaN(val) ? (parseFloat(val) * exchangeRate).toFixed(0) : '');
  };

  const toggleTodo = (id) => {
    setTodoList(todoList.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const handleAddShoppingItem = (e) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    setShoppingList([...shoppingList, { id: Date.now(), text: newItem.trim(), done: false }]);
    setNewItem('');
  };

  const toggleShoppingItem = (id) => {
    setShoppingList(shoppingList.map(item => item.id === id ? { ...item, done: !item.done } : item));
  };

  const deleteShoppingItem = (id) => {
    setShoppingList(shoppingList.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* 行前準備 CheckList */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-md font-bold text-slate-800 flex items-center mb-3">
          <CheckCircle2 className="w-5 h-5 mr-2 text-blue-600" /> 行前待辦事項 (To-Do)
        </h3>
        <ul className="space-y-2.5">
          {todoList.map(item => (
            <li key={item.id} className="flex items-center justify-between text-xs p-1.5 rounded hover:bg-slate-50">
              <button onClick={() => toggleTodo(item.id)} className="flex items-center text-left gap-2 flex-1">
                {item.done ? (
                  <CheckSquare className="w-4 h-4 text-blue-600 flex-shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400 flex-shrink-0" />
                )}
                <span className={item.done ? 'line-through text-slate-400' : 'text-slate-700 font-medium'}>
                  {item.text}
                </span>
              </button>
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-0.5 ml-2 text-[11px] font-medium"
                >
                  VJW教學 <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* 匯率計算器 */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-md font-bold text-slate-800 flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-blue-600" /> 日圓 / 台幣 即時試算
          </h3>
          <button onClick={fetchLiveRate} className="text-slate-400 hover:text-blue-600 p-1 transition">
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
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 font-semibold text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-slate-500 block mb-1">約合台幣 (TWD $)</label>
            <input
              type="text"
              readOnly
              value={twd ? `NT$ ${twd}` : ''}
              placeholder="NT$ 0"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-blue-700 font-bold text-sm"
            />
          </div>
        </div>
        <p className="text-[10px] text-slate-400 mt-2 text-right">
          {isLoadingRate ? '更新國際匯率中...' : `即時國際匯率：1 JPY ≈ ${exchangeRate.toFixed(4)} TWD`}
        </p>
      </div>

      {/* 必買伴手禮清單 */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-md font-bold text-slate-800 flex items-center mb-3">
          <ShoppingBag className="w-5 h-5 mr-2 text-rose-500" /> 必買伴手禮清單
        </h3>

        <form onSubmit={handleAddShoppingItem} className="flex gap-2 mb-3">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="新增想買的物品..."
            className="flex-1 px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs hover:bg-blue-700 transition">
            <Plus className="w-4 h-4" />
          </button>
        </form>

        <ul className="space-y-2 max-h-40 overflow-y-auto pr-1">
          {shoppingList.map(item => (
            <li key={item.id} className="flex items-center justify-between text-xs p-1.5 rounded hover:bg-slate-50">
              <button onClick={() => toggleShoppingItem(item.id)} className="flex items-center text-left gap-2 flex-1">
                {item.done ? (
                  <CheckSquare className="w-4 h-4 text-blue-600 flex-shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400 flex-shrink-0" />
                )}
                <span className={item.done ? 'line-through text-slate-400' : 'text-slate-700'}>
                  {item.text}
                </span>
              </button>
              <button onClick={() => deleteShoppingItem(item.id)} className="text-slate-300 hover:text-rose-500 p-1">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}