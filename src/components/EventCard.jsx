import React, { useState } from 'react';
import { Clock, MapPin, Copy, Check, Navigation, Edit2, Trash2 } from 'lucide-react';

export default function EventCard({ event, onEdit, onDelete }) {
  const [copied, setCopied] = useState(false);

  const handleCopyMapCode = () => {
    if (!event.mapCode) return;
    navigator.clipboard.writeText(event.mapCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenGoogleMap = () => {
    const query = encodeURIComponent(`${event.locationName || event.title}`);
    const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-200 hover:shadow-md transition relative group">
      <div className="flex justify-between items-center mb-2">
        <span className="flex items-center text-xs font-bold text-blue-700 bg-sky-50 px-2.5 py-1 rounded-md">
          <Clock className="w-3.5 h-3.5 mr-1 text-blue-500" /> {event.time}
        </span>
        
        <div className="flex items-center gap-1.5">
          {event.category && (
            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium mr-1">
              {event.category}
            </span>
          )}
          {/* 編輯按鈕 */}
          <button
            onClick={() => onEdit(event)}
            className="p-1 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-slate-100 transition"
            title="編輯景點"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          {/* 刪除按鈕 */}
          <button
            onClick={() => onDelete(event.id)}
            className="p-1 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition"
            title="刪除景點"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <h3 className="text-lg font-bold text-slate-800 mb-1">{event.title}</h3>
      <p className="text-slate-500 text-sm flex items-center mb-3">
        <MapPin className="w-4 h-4 mr-1 text-rose-500 flex-shrink-0" />
        {event.locationName}
      </p>

      {event.note && (
        <div className="text-xs bg-amber-50/90 text-amber-900 p-3 rounded-xl mb-3 border border-amber-100 whitespace-pre-line leading-relaxed">
          {event.note}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
        {event.mapCode && (
          <button
            onClick={handleCopyMapCode}
            className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg transition flex items-center font-mono"
          >
            {copied ? <Check className="w-3.5 h-3.5 mr-1 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 mr-1 text-slate-500" />}
            MapCode: {event.mapCode}
          </button>
        )}

        <button
          onClick={handleOpenGoogleMap}
          className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition flex items-center ml-auto font-medium shadow-sm"
        >
          <Navigation className="w-3.5 h-3.5 mr-1" /> 開啟導航
        </button>
      </div>
    </div>
  );
}