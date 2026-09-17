import React, { useState, useEffect } from 'react';
import { Wallet, Plus, Trash2, PieChart, Users, User, ArrowDownUp } from 'lucide-react';

export default function ExpenseTracker({ exchangeRate }) {
  // 從 LocalStorage 載入記帳資料
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('okinawa_expenses');
    return saved ? JSON.parse(saved) : [
      { id: 1, item: 'OTS租車費', amountJpy: 22000, category: '交通', payer: '公費平分', date: '2026-10-26' },
      { id: 2, item: '幸福鬆餅', amountJpy: 3800, category: '餐飲', payer: '公費平分', date: '2026-10-26' }
    ];
  });

  // 新增表單 State
  const [item, setItem] = useState('');
  const [amountJpy, setAmountJpy] = useState('');
  const [category, setCategory] = useState('餐飲');
  const [payer, setPayer] = useState('公費平分');

  useEffect(() => {
    localStorage.setItem('okinawa_expenses', JSON.stringify(expenses));
  }, [expenses]);

  // 新增消費
  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!item.trim() || !amountJpy || isNaN(amountJpy)) return;

    const newExpense = {
      id: Date.now(),
      item: item.trim(),
      amountJpy: parseFloat(amountJpy),
      category,
      payer,
      date: new Date().toISOString().slice(0, 10)
    };

    setExpenses([newExpense, ...expenses]);
    setItem('');
    setAmountJpy('');
  };

  // 刪除紀錄
  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  // 統計總金額
  const totalJpy = expenses.reduce((sum, e) => sum + e.amountJpy, 0);
  const totalTwd = (totalJpy * exchangeRate).toFixed(0);

  // 統計公費平分與個人金額
  const groupJpy = expenses.filter(e => e.payer === '公費平分').reduce((sum, e) => sum + e.amountJpy, 0);
  const groupTwd = (groupJpy * exchangeRate).toFixed(0);

  return (
    <div className="space-y-5 animate-fade-in">
      {/* 總花費統計卡片 */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white p-5 rounded-3xl shadow-md">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
            <PieChart className="w-3.5 h-3.5 text-amber-400" /> 旅程總累積花費
          </span>
          <span className="text-[10px] bg-slate-700/80 text-slate-300 px-2 py-0.5 rounded-full">
            1 JPY ≈ {exchangeRate.toFixed(3)} TWD
          </span>
        </div>

        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-2xl font-black text-amber-300">¥ {totalJpy.toLocaleString()}</span>
          <span className="text-xs text-slate-300">(約 NT$ {Number(totalTwd).toLocaleString()})</span>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-700/60 text-xs">
          <div className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/40">
            <div className="text-[10px] text-slate-400 mb-0.5 flex items-center gap-1">
              <Users className="w-3 h-3 text-blue-400" /> 公費平分總額
            </div>
            <div className="font-bold text-slate-200">¥ {groupJpy.toLocaleString()}</div>
            <div className="text-[10px] text-slate-400">NT$ {Number(groupTwd).toLocaleString()}</div>
          </div>
          <div className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/40">
            <div className="text-[10px] text-slate-400 mb-0.5 flex items-center gap-1">
              <User className="w-3 h-3 text-emerald-400" /> 個人消費總額
            </div>
            <div className="font-bold text-slate-200">¥ {(totalJpy - groupJpy).toLocaleString()}</div>
            <div className="text-[10px] text-slate-400">NT$ {Math.round((totalJpy - groupJpy) * exchangeRate).toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* 新增消費紀錄表單 */}
      <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
        <h3 className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-1.5">
          <Wallet className="w-4 h-4 text-blue-600" /> 新增消費紀錄
        </h3>

        <form onSubmit={handleAddExpense} className="space-y-3 text-xs">
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-2">
              <label className="block text-slate-500 mb-1">項目名稱</label>
              <input
                type="text"
                value={item}
                onChange={(e) => setItem(e.target.value)}
                placeholder="例如：油資 / 燒肉"
                className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                required
              />
            </div>
            <div>
              <label className="block text-slate-500 mb-1">金額 (JPY ¥)</label>
              <input
                type="number"
                value={amountJpy}
                onChange={(e) => setAmountJpy(e.target.value)}
                placeholder="1500"
                className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-slate-800"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-slate-500 mb-1">分類</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              >
                <option value="餐飲">🍔 餐飲</option>
                <option value="交通">⛽ 交通/油資</option>
                <option value="購物">🛍️ 購物</option>
                <option value="門票">🎟️ 門票/活動</option>
                <option value="住宿">🏨 住宿</option>
                <option value="其他">📦 其他</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-500 mb-1">支付/分攤方式</label>
              <select
                value={payer}
                onChange={(e) => setPayer(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white font-medium"
              >
                <option value="公費平分">👥 公費平分</option>
                <option value="個人自付">👤 個人自付</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-1 transition shadow-sm"
          >
            <Plus className="w-4 h-4" /> 新增帳目
          </button>
        </form>
      </div>

      {/* 消費歷史列表 */}
      <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
        <h3 className="font-bold text-slate-800 text-sm mb-3">明細紀錄 ({expenses.length} 筆)</h3>

        {expenses.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-6">目前還沒有消費紀錄喔！</p>
        ) : (
          <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
            {expenses.map((exp) => (
              <div key={exp.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="font-bold text-slate-800">{exp.item}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded font-medium ${
                      exp.payer === '公費平分' ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {exp.payer}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">{exp.category} ‧ {exp.date}</div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="font-bold text-slate-800">¥ {exp.amountJpy.toLocaleString()}</div>
                    <div className="text-[10px] text-slate-400">NT$ {Math.round(exp.amountJpy * exchangeRate).toLocaleString()}</div>
                  </div>
                  <button
                    onClick={() => handleDeleteExpense(exp.id)}
                    className="text-slate-300 hover:text-rose-500 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}