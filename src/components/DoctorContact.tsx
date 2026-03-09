import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Calendar, Pill, Info, Send, Phone, Video, User, CheckCircle2 } from 'lucide-react';
import { DoctorMessage } from '../types';
import { cn } from '../utils';

export const DoctorContact = () => {
  const [activeSubTab, setActiveSubTab] = useState<'chat' | 'appointments' | 'meds' | 'info'>('chat');
  const [messages, setMessages] = useState<DoctorMessage[]>([
    { id: '1', sender: 'doctor', text: 'Merhaba Can, son tahlil sonuçların gayet iyi görünüyor. Lantus dozunu 2 ünite artırabiliriz.', timestamp: '10:30' },
    { id: '2', sender: 'patient', text: 'Tamamdır hocam, teşekkürler. Akşam dozundan itibaren başlıyorum.', timestamp: '11:15' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (!newMessage.trim()) return;
    const msg: DoctorMessage = {
      id: Date.now().toString(),
      sender: 'patient',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, msg]);
    setNewMessage('');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Doktorumla İletişim</h2>
        <div className="flex gap-2">
          <button className="p-2 bg-sky-50 text-sky-600 rounded-xl hover:bg-sky-100 transition-colors">
            <Phone className="w-5 h-5" />
          </button>
          <button className="p-2 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-100 transition-colors">
            <Video className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Sub Navigation */}
      <div className="flex gap-1 p-1 bg-white rounded-2xl border border-sky-100 shadow-sm">
        {[
          { id: 'chat', icon: MessageSquare, label: 'Mesajlar' },
          { id: 'appointments', icon: Calendar, label: 'Randevular' },
          { id: 'meds', icon: Pill, label: 'İlaçlar' },
          { id: 'info', icon: Info, label: 'Bilgi' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)}
            className={cn(
              "flex-1 py-3 flex flex-col items-center gap-1 rounded-xl transition-all",
              activeSubTab === tab.id ? "bg-sky-600 text-white shadow-lg" : "text-slate-400 hover:bg-slate-50"
            )}
          >
            <tab.icon className="w-4 h-4" />
            <span className="text-[8px] font-black uppercase tracking-widest">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          {activeSubTab === 'chat' && (
            <motion.div 
              key="chat"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-4 flex flex-col h-[450px]"
            >
              <div className="flex-1 overflow-y-auto space-y-4 p-2">
                {messages.map((msg) => (
                  <div 
                    key={msg.id}
                    className={cn(
                      "flex flex-col max-w-[80%] gap-1",
                      msg.sender === 'patient' ? "ml-auto items-end" : "items-start"
                    )}
                  >
                    <div className={cn(
                      "p-4 rounded-3xl text-sm shadow-sm",
                      msg.sender === 'patient' 
                        ? "bg-sky-600 text-white rounded-tr-none" 
                        : "bg-white border border-sky-100 text-slate-700 rounded-tl-none"
                    )}>
                      {msg.text}
                    </div>
                    <span className="text-[8px] text-slate-400 font-bold uppercase">{msg.timestamp}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 pt-4 border-t border-slate-100">
                <input 
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Hocama mesaj yaz..."
                  className="flex-1 bg-white border border-sky-100 rounded-2xl px-4 py-3 text-sm outline-none focus:border-sky-500 shadow-sm"
                />
                <button 
                  onClick={handleSend}
                  className="bg-sky-600 text-white p-4 rounded-2xl shadow-lg shadow-sky-100"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {activeSubTab === 'appointments' && (
            <motion.div 
              key="apps"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="bg-white border border-sky-100 rounded-3xl p-6 space-y-4 shadow-sm">
                <h3 className="text-sm font-black text-sky-900 uppercase tracking-tight">Gelecek Randevular</h3>
                <div className="p-4 bg-sky-50 rounded-2xl border border-sky-100 flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-sky-600 shadow-sm">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Genel Kontrol</p>
                    <p className="text-xs text-slate-500">15 Nisan 2026, 14:30</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeSubTab === 'meds' && (
            <motion.div 
              key="meds"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="bg-white border border-sky-100 rounded-3xl p-6 space-y-4 shadow-sm">
                <h3 className="text-sm font-black text-sky-900 uppercase tracking-tight">Yazılan İlaçlar</h3>
                {[
                  { name: 'Lantus SoloStar', dose: '1x20 Ünite', status: 'Devam Ediyor' },
                  { name: 'Humalog KwikPen', dose: 'Yemek Öncesi', status: 'Devam Ediyor' }
                ].map((med, i) => (
                  <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-slate-900">{med.name}</p>
                      <p className="text-xs text-slate-500">{med.dose}</p>
                    </div>
                    <span className="text-[8px] font-black text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full uppercase tracking-widest">
                      {med.status}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeSubTab === 'info' && (
            <motion.div 
              key="info"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="bg-white border border-sky-100 rounded-3xl p-6 space-y-4 shadow-sm">
                <h3 className="text-sm font-black text-sky-900 uppercase tracking-tight">Doktor Bilgilendirmeleri</h3>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-600 leading-relaxed">Günde en az 2 litre su içmeyi ihmal etmeyin.</p>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-600 leading-relaxed">Haftada en az 3 gün 30 dakika yürüyüş yapın.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
