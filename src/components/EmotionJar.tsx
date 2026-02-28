import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Send, Sparkles, History } from 'lucide-react';
import { GubiCharacter } from './GubiCharacter';
import { cn } from '../utils';

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
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('gmax_emotions');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const handleSubmit = () => {
    if (selectedEmotion && note) {
      const newEntry = {
        id: Date.now(),
        emotion: selectedEmotion,
        note,
        date: new Date().toISOString(),
        color: emotions.find(e => e.name === selectedEmotion)?.color
      };
      const newHistory = [newEntry, ...history];
      setHistory(newHistory);
      localStorage.setItem('gmax_emotions', JSON.stringify(newHistory));
      setIsSubmitted(true);
    }
  };

  const getGubiFeedback = () => {
    switch (selectedEmotion) {
      case 'Mutlu': return "Harika! Bu pozitif enerjini korumak için bugün kendine küçük bir ödül ver.";
      case 'Üzgün': return "Üzgün hissetmen çok normal. Unutma, her bulutun ardında bir güneş vardır. Ben buradayım.";
      case 'Öfkeli': return "Öfkeni kağıda dökmek iyi bir fikir. Derin bir nefes al, her şey geçecek.";
      case 'Korkmuş': return "Korkuların seni durdurmasın. Onlarla yüzleşecek kadar güçlüsün.";
      case 'Tiksinti': return "Bazen her şey üst üste gelir. Biraz ara verip sevdiğin bir şeyi yapmaya ne dersin?";
      default: return "Duygularını paylaştığın için teşekkürler.";
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-black text-sky-900 tracking-tight">Duygu Kavanozu</h2>
        <p className="text-sky-700/60 text-sm">Bugün nasıl hissediyorsun? Duygunu bir küreye dönüştür.</p>
      </div>

      {!isSubmitted ? (
        <div className="bg-white border border-sky-100 rounded-3xl p-6 space-y-6 shadow-xl shadow-sky-200/50 backdrop-blur-sm">
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
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm text-slate-900 focus:border-sky-500 outline-none h-32 resize-none transition-all"
          />

          <button
            onClick={handleSubmit}
            disabled={!selectedEmotion || !note}
            className="w-full bg-sky-600 hover:bg-sky-700 disabled:bg-slate-200 disabled:text-slate-400 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-sky-200"
          >
            <Send className="w-4 h-4" />
            Kavanoza Ekle
          </button>

          {history.length > 0 && (
            <div className="pt-4 border-t border-sky-50">
              <div className="flex items-center gap-2 text-slate-400 mb-4">
                <History className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Geçmiş Duygular</span>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {history.slice(0, 10).map((entry) => (
                  <div 
                    key={entry.id}
                    className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-inner"
                    style={{ backgroundColor: entry.color }}
                  >
                    {emotions.find(e => e.name === entry.emotion)?.icon || '✨'}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center space-y-8"
        >
          <div className="relative w-64 h-80 bg-white rounded-[40%] border-4 border-sky-100 flex items-end justify-center p-4 overflow-hidden shadow-2xl shadow-sky-200">
            <div className="absolute inset-0 bg-gradient-to-t from-sky-500/10 to-transparent" />
            <motion.div 
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              className="w-24 h-24 rounded-full shadow-[0_0_30px_rgba(251,191,36,0.5)] flex items-center justify-center text-4xl"
              style={{ backgroundColor: emotions.find(e => e.name === selectedEmotion)?.color }}
            >
              ✨
            </motion.div>
          </div>

          <div className="bg-sky-50 border border-sky-100 rounded-2xl p-6 flex gap-4 max-w-sm shadow-sm">
            <div className="shrink-0">
              <GubiCharacter size="sm" />
            </div>
            <div className="space-y-2">
              <h4 className="text-sky-600 font-bold text-sm">Gubi'nin Notu</h4>
              <p className="text-slate-600 text-xs italic leading-relaxed">
                "{getGubiFeedback()}"
              </p>
            </div>
          </div>

          <button 
            onClick={() => {
              setIsSubmitted(false);
              setSelectedEmotion(null);
              setNote('');
            }}
            className="text-sky-600 text-sm font-bold hover:text-sky-700 transition-colors"
          >
            Yeni bir kayıt ekle
          </button>
        </motion.div>
      )}
    </div>
  );
};
