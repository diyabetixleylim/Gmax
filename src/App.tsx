/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  ShieldCheck, 
  MessageSquare, 
  User, 
  AlertCircle, 
  ChevronRight, 
  Zap, 
  MapPin, 
  Scan,
  Settings,
  Bell,
  Heart,
  Users,
  Utensils,
  Send,
  Loader2
} from 'lucide-react';
import { GlucoseChart } from './components/GlucoseChart';
import { GubiCharacter } from './components/GubiCharacter';
import { EmotionJar } from './components/EmotionJar';
import { CommunitySection } from './components/CommunitySection';
import { ProfileSection } from './components/ProfileSection';
import { FoodEntry } from './components/FoodEntry';
import { AppTab, Message, UserProfile } from './types';
import { cn } from './utils';
import { gubiChat } from './services/geminiService';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('dashboard');
  const [glucose, setGlucose] = useState(103);
  const [isEmergency, setIsEmergency] = useState(false);
  
  // Chat State
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Merhaba! Ben Gubi. Bugün nasıl hissediyorsun? Verilerine göre her şey yolunda görünüyor.', sender: 'gubi', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Simulate glucose changes
  useEffect(() => {
    const interval = setInterval(() => {
      setGlucose(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const newVal = prev + change;
        return newVal > 40 && newVal < 250 ? newVal : prev;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Prepare history for Gemini
    const history = messages.map(m => ({
      role: (m.sender === 'user' ? 'user' : 'model') as 'user' | 'model',
      parts: [{ text: m.text }]
    }));

    const response = await gubiChat(input, history);

    const gubiMsg: Message = {
      id: (Date.now() + 1).toString(),
      text: response,
      sender: 'gubi',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, gubiMsg]);
    setIsLoading(false);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Main Status Card */}
            <div className="relative overflow-hidden bg-white rounded-3xl p-6 border border-sky-100 shadow-xl shadow-sky-200/50">
              <div className="absolute top-0 right-0 p-4">
                <div className="flex items-center gap-1 bg-sky-50 px-2 py-1 rounded-full border border-sky-100">
                  <Zap className="w-3 h-3 text-sky-500" />
                  <span className="text-[10px] text-sky-600 font-bold uppercase tracking-tighter">Canlı</span>
                </div>
              </div>
              
              <div className="flex items-end gap-2 mb-2">
                <span className="text-6xl font-light tracking-tighter text-sky-900">{glucose}</span>
                <span className="text-sky-700/50 mb-2 font-medium">mg/dL</span>
                <div className="mb-3 ml-2">
                  <motion.div 
                    animate={{ y: glucose < 70 ? [0, 4, 0] : [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <ChevronRight className={cn("w-6 h-6 -rotate-90", glucose < 70 ? "text-red-500 rotate-90" : "text-emerald-500")} />
                  </motion.div>
                </div>
              </div>
              
              <p className="text-slate-500 text-sm mb-6">
                {glucose < 70 ? 'Düşük şeker uyarısı! Karbonhidrat almalısın.' : 'Stabil aralık. Her şey yolunda.'}
              </p>
              
              <GlucoseChart />
            </div>

            {/* Gubi Prediction Alert */}
            <div className="bg-sky-50 border border-sky-100 rounded-2xl p-4 flex items-start gap-4 shadow-sm">
              <div className="bg-sky-500 p-2 rounded-xl shadow-lg shadow-sky-200">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-sky-900 font-bold text-sm">Gubi Tahmini</h4>
                <p className="text-sky-700/60 text-xs mt-1 leading-relaxed">
                  "Şekerin 45 dakika içinde 65 mg/dL seviyesine düşebilir. Şimdi 15g karbonhidrat almanı öneririm."
                </p>
              </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setActiveTab('emotions')}
                className="bg-white border border-sky-100 p-4 rounded-2xl flex flex-col items-center gap-2 hover:bg-sky-50 transition-colors shadow-sm"
              >
                <Heart className="w-6 h-6 text-pink-500" />
                <span className="text-xs text-slate-600 font-medium">Duygu Kavanozu</span>
              </button>
              <button 
                onClick={() => setActiveTab('community')}
                className="bg-white border border-sky-100 p-4 rounded-2xl flex flex-col items-center gap-2 hover:bg-sky-50 transition-colors shadow-sm"
              >
                <Users className="w-6 h-6 text-sky-500" />
                <span className="text-xs text-slate-600 font-medium">Toplum</span>
              </button>
            </div>
          </motion.div>
        );
      case 'twin':
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8 pb-12"
          >
            <div className="flex flex-col items-center justify-center py-6 space-y-6">
              <h2 className="text-2xl font-black text-sky-900 tracking-tight">Metabolik Dijital İkiz</h2>
              <div className="relative">
                <div className="absolute inset-0 bg-sky-100 rounded-full blur-3xl opacity-50" />
                <GubiCharacter size="lg" />
              </div>
              <div className="w-full grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-sky-100 shadow-sm">
                  <p className="text-[10px] text-sky-700/50 uppercase font-bold">Metabolik Hız</p>
                  <p className="text-xl text-sky-900 font-bold">%94 Optimal</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-sky-100 shadow-sm">
                  <p className="text-[10px] text-sky-700/50 uppercase font-bold">İnsülin Duyarlılığı</p>
                  <p className="text-xl text-sky-900 font-bold">Yüksek</p>
                </div>
              </div>
            </div>

            {/* New KH Tracking Section in Twin Tab */}
            <div className="bg-white border border-sky-100 rounded-3xl p-6 space-y-4 shadow-xl shadow-sky-200/50">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-sky-900 flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-sky-500" />
                  KH Dengesi
                </h3>
                <span className="text-[10px] text-sky-600 font-bold uppercase">Bugün: 145g</span>
              </div>
              <div className="h-32 w-full bg-slate-50 rounded-2xl p-2 border border-slate-100">
                <GlucoseChart /> {/* Reusing chart logic or similar visual */}
              </div>
              <button 
                onClick={() => setActiveTab('nutrition')}
                className="w-full py-3 bg-sky-600 text-white rounded-xl text-xs font-bold hover:bg-sky-700 transition-all shadow-lg shadow-sky-200"
              >
                KH Detaylarını Gör
              </button>
            </div>

            <div className="border-t border-sky-100 pt-8">
              <h3 className="text-lg font-bold text-sky-900 mb-4">P2P Yardımlaşma & Sohbet</h3>
              <p className="text-xs text-sky-700/60 mb-6">Malzeme paylaşımı için güvenli iletişim alanı.</p>
              <CommunitySection hideHeader />
            </div>
          </motion.div>
        );
      case 'nutrition':
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <FoodEntry />
          </motion.div>
        );
      case 'community':
        return (
          <div className="space-y-6">
            <div className="bg-white border border-sky-100 rounded-3xl p-6 shadow-xl shadow-sky-200/50">
              <h2 className="text-xl font-bold text-sky-900 mb-2">Toplum Panosu</h2>
              <p className="text-xs text-sky-700/60">Acil durumlar ve genel yardımlaşma ilanları burada listelenir.</p>
            </div>
            <CommunitySection hideChat />
          </div>
        );
      case 'chat':
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-[70vh] flex flex-col"
          >
            <div className="flex flex-col items-center mb-6">
              <GubiCharacter size="md" className="mb-2" />
              <h2 className="text-xl font-black text-sky-900 tracking-tight">Gubi ile Sohbet</h2>
              <p className="text-[10px] text-sky-600 font-bold uppercase tracking-widest">Her zaman yanındayım</p>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 p-2 mb-4 scroll-smooth">
              {messages.map((m) => (
                <div key={m.id} className={cn("flex gap-3", m.sender === 'user' && "justify-end")}>
                  {m.sender === 'gubi' && (
                    <div className="shrink-0">
                      <GubiCharacter size="sm" />
                    </div>
                  )}
                  <div className={cn(
                    "rounded-2xl p-4 max-w-[80%] shadow-lg",
                    m.sender === 'gubi' ? "bg-white rounded-tl-none border border-sky-100 text-slate-700" : "bg-sky-600 rounded-tr-none text-white shadow-sky-200"
                  )}>
                    <p className="text-sm leading-relaxed">{m.text}</p>
                    <span className={cn("text-[8px] mt-2 block text-right", m.sender === 'gubi' ? "text-slate-400" : "text-sky-100")}>
                      {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="shrink-0">
                    <GubiCharacter size="sm" />
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-none p-4 flex items-center gap-2 border border-sky-100 shadow-sm">
                    <Loader2 className="w-4 h-4 text-sky-500 animate-spin" />
                    <span className="text-xs text-slate-400">Gubi düşünüyor...</span>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-auto p-4 bg-white rounded-2xl border border-sky-100 flex items-center gap-3 shadow-xl shadow-sky-200/50">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Gubi'ye sor..." 
                className="flex-1 bg-transparent border-none outline-none text-slate-900 text-sm placeholder:text-slate-400"
              />
              <button 
                onClick={handleSendMessage}
                disabled={isLoading || !input.trim()}
                className="bg-sky-600 p-2 rounded-xl disabled:bg-slate-200 transition-all shadow-lg shadow-sky-100"
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </motion.div>
        );
      case 'emotions':
        return <EmotionJar />;
      case 'profile':
        return <ProfileSection />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F7FF] text-slate-700 font-sans selection:bg-sky-200">
      {/* Mobile Header */}
      <header className="px-6 py-8 flex justify-between items-center bg-white/50 backdrop-blur-sm border-b border-sky-100/50">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-sky-900">Gmax</h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-sky-600 font-bold">Ekosistem 2.0</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setActiveTab('profile')}
            className="p-2 bg-white rounded-full border border-sky-100 shadow-sm"
          >
            <User className="w-5 h-5 text-slate-400" />
          </button>
          <button className="p-2 bg-white rounded-full border border-sky-100 shadow-sm relative">
            <Bell className="w-5 h-5 text-slate-400" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-sky-500 rounded-full border-2 border-white" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="px-6 pb-32">
        {renderTabContent()}
      </main>

      {/* Emergency SOS Button (Floating) */}
      <AnimatePresence>
        {activeTab === 'dashboard' && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsEmergency(true)}
            className="fixed bottom-28 right-6 w-16 h-16 bg-red-500 rounded-full shadow-2xl shadow-red-500/40 flex items-center justify-center z-50 border-4 border-white"
          >
            <AlertCircle className="w-8 h-8 text-white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-sky-100 px-2 py-6 flex justify-around items-center z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        {[
          { id: 'dashboard', icon: Activity, label: 'Ana Sayfa' },
          { id: 'nutrition', icon: Utensils, label: 'Beslenme' },
          { id: 'twin', icon: Scan, label: 'İkizim' },
          { id: 'chat', icon: MessageSquare, label: 'Gubi' },
          { id: 'community', icon: Users, label: 'Toplum' },
          { id: 'profile', icon: User, label: 'Profil' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as AppTab)}
            className={cn(
              "flex flex-col items-center gap-1 transition-all duration-300",
              activeTab === tab.id ? "text-sky-600 scale-110" : "text-slate-400 hover:text-slate-600"
            )}
          >
            <tab.icon className={cn("w-5 h-5", activeTab === tab.id && "drop-shadow-[0_0_8px_rgba(56,189,248,0.2)]")} />
            <span className="text-[7px] font-bold uppercase tracking-tighter">{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* Emergency Modal */}
      <AnimatePresence>
        {isEmergency && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-red-950/90 backdrop-blur-md z-[100] flex flex-col items-center justify-center p-8 text-center"
          >
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center mb-8"
            >
              <AlertCircle className="w-12 h-12 text-white" />
            </motion.div>
            <h2 className="text-4xl font-black text-white mb-4">ACİL DURUM SOS</h2>
            <p className="text-red-200 mb-12">112 aranıyor ve acil durum kişilerine canlı konumun iletiliyor.</p>
            
            <div className="space-y-4 w-full">
              <button 
                onClick={() => setIsEmergency(false)}
                className="w-full py-4 bg-white text-red-600 rounded-2xl font-bold"
              >
                İPTAL ET (5s)
              </button>
              <div className="flex justify-center gap-4">
                <div className="w-12 h-12 bg-red-800 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="w-12 h-12 bg-red-800 rounded-full flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
