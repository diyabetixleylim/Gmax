import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Send, Sparkles, History, Calendar, BarChart2 } from 'lucide-react';
import { GubiCharacter } from './GubiCharacter';
import { cn } from '../utils';
import { EmotionEntry } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const emotions = [
  { name: 'Mutlu', color: '#fbbf24', icon: '😊' },
  { name: 'Üzgün', color: '#3b82f6', icon: '😢' },
  { name: 'Öfkeli', color: '#ef4444', icon: '😡' },
  { name: 'Korkmuş', color: '#a855f7', icon: '😨' },
  { name: 'Tiksinti', color: '#22c55e', icon: '🤢' },
];

export const EmotionJar = () => {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [history, setHistory] = useState<EmotionEntry[]>([]);
  const [view, setView] = useState<'jar' | 'stats'>('jar');
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month' | 'year'>('day');

  useEffect(() => {
    const saved = localStorage.getItem('gmax_emotions');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const handleSubmit = () => {
    if (selectedEmotion && note) {
      const newEntry: EmotionEntry = {
        id: Math.random().toString(36).substr(2, 9),
        emotion: selectedEmotion,
        note,
        date: new Date().toISOString(),
        color: emotions.find(e => e.name === selectedEmotion)?.color || '#ccc'
      };
      const newHistory = [newEntry, ...history];
      setHistory(newHistory);
      localStorage.setItem('gmax_emotions', JSON.stringify(newHistory));
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setSelectedEmotion(null);
        setNote('');
      }, 3000);
    }
  };

  const getStatsData = () => {
    const counts: Record<string, number> = {};
    emotions.forEach(e => counts[e.name] = 0);
    
    history.forEach(entry => {
      if (counts[entry.emotion] !== undefined) {
        counts[entry.emotion]++;
      }
    });

    return emotions.map(e => ({
      name: e.name,
      count: counts[e.name],
      color: e.color
    }));
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black text-sky-900 tracking-tight">Duygu Kavanozu</h2>
        <div className="flex bg-white rounded-xl border border-sky-100 p-1 shadow-sm">
          <button 
            onClick={() => setView('jar')}
            className={cn("p-2 rounded-lg transition-all", view === 'jar' ? "bg-sky-50 text-sky-600" : "text-slate-400")}
          >
            <Sparkles className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setView('stats')}
            className={cn("p-2 rounded-lg transition-all", view === 'stats' ? "bg-sky-50 text-sky-600" : "text-slate-400")}
          >
            <BarChart2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {view === 'jar' ? (
        <div className="space-y-6">
          {/* The Jar Visual */}
          <div className="relative w-full aspect-[4/5] bg-white/30 backdrop-blur-md rounded-[60px] border-8 border-white shadow-2xl shadow-sky-200 overflow-hidden flex items-end p-8">
            <div className="absolute inset-0 bg-gradient-to-t from-sky-100/30 to-transparent opacity-50" />
            
            {/* Jar Lid */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-8 bg-sky-100 rounded-b-3xl border-x-4 border-b-4 border-white z-20" />

            {/* Falling Balls Container */}
            <div className="relative w-full h-full flex flex-wrap-reverse content-start gap-3 justify-center pb-4">
              <AnimatePresence>
                {history.slice(0, 20).reverse().map((entry, idx) => (
                  <motion.div
                    key={entry.id}
                    initial={{ y: -500, opacity: 0, rotate: Math.random() * 360 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    transition={{ 
                      type: 'spring', 
                      damping: 15, 
                      stiffness: 100,
                      delay: idx * 0.05 
                    }}
                    className="w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-lg border-2 border-white/20"
                    style={{ backgroundColor: entry.color }}
                  >
                    {emotions.find(e => e.name === entry.emotion)?.icon}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Glass Reflection */}
            <div className="absolute top-0 left-8 w-4 h-full bg-white/20 blur-sm rounded-full" />
          </div>

          {!isSubmitted ? (
            <div className="bg-white border border-sky-100 rounded-3xl p-6 space-y-6 shadow-xl shadow-sky-200/50">
              <div className="flex justify-around">
                {emotions.map((e) => (
                  <button
                    key={e.name}
                    onClick={() => setSelectedEmotion(e.name)}
                    className={cn("flex flex-col items-center gap-2 transition-all", selectedEmotion === e.name ? 'scale-125' : 'opacity-40')}
                  >
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-lg"
                      style={{ backgroundColor: e.color }}
                    >
                      {e.icon}
                    </div>
                    <span className="text-[10px] text-slate-900 font-bold uppercase tracking-tighter">{e.name}</span>
                  </button>
                ))}
              </div>

              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Neler hissediyorsun? Buraya yaz..."
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm text-slate-900 focus:border-sky-500 outline-none h-24 resize-none transition-all"
              />

              <button
                onClick={handleSubmit}
                disabled={!selectedEmotion || !note}
                className="w-full bg-sky-600 hover:bg-sky-700 disabled:bg-slate-200 disabled:text-slate-400 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-sky-200"
              >
                <Send className="w-4 h-4" />
                Kavanoza Fırlat
              </button>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 flex items-center gap-4 shadow-sm"
            >
              <GubiCharacter size="sm" mood="witty" />
              <div>
                <h4 className="text-emerald-700 font-bold text-sm">Gubi Diyor ki:</h4>
                <p className="text-emerald-600 text-xs italic">"Duygun kavanoza düştü! Şimdi biraz rahatla."</p>
              </div>
            </motion.div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white border border-sky-100 rounded-3xl p-6 shadow-xl shadow-sky-200/50 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-sky-900 uppercase tracking-widest">Duygu Analizi</h3>
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value as any)}
                className="bg-sky-50 border-none text-sky-600 text-[10px] font-bold uppercase rounded-lg px-2 py-1 outline-none"
              >
                <option value="day">Günlük</option>
                <option value="week">Haftalık</option>
                <option value="month">Aylık</option>
                <option value="year">Yıllık</option>
              </select>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={getStatsData()}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={10} stroke="#94a3b8" />
                  <YAxis axisLine={false} tickLine={false} fontSize={10} stroke="#94a3b8" />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Bar dataKey="count" radius={[10, 10, 0, 0]}>
                    {getStatsData().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Son Kayıtlar</h3>
            {history.slice(0, 5).map((entry) => (
              <div key={entry.id} className="bg-white border border-sky-100 rounded-2xl p-4 flex gap-4 shadow-sm">
                <div 
                  className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-xl shadow-inner"
                  style={{ backgroundColor: entry.color }}
                >
                  {emotions.find(e => e.name === entry.emotion)?.icon}
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-sm font-bold text-slate-900">{entry.emotion}</h4>
                    <span className="text-[10px] text-slate-400">{new Date(entry.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2">{entry.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
