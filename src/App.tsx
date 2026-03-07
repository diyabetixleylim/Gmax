import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Utensils, 
  MessageSquare, 
  Users, 
  Heart, 
  User, 
  Plus, 
  Bell, 
  X, 
  Activity, 
  Menu,
  AlertCircle,
  ChevronRight
} from 'lucide-react';
import { GmaxDashboard } from './components/GmaxDashboard';
import { NutritionTracker } from './components/NutritionTracker';
import { GubiChat } from './components/GubiChat';
import { TwinView } from './components/TwinView';
import { Community } from './components/Community';
import { EmotionJar } from './components/EmotionJar';
import { Profile } from './components/Profile';
import { Reminders } from './components/Reminders';
import { AppTab, UserProfile } from './types';
import { cn } from './utils';

const App = () => {
  const [activeTab, setActiveTab] = useState<AppTab>('dashboard');
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isFabOpen, setIsFabOpen] = useState(false);
  const [panelContent, setPanelContent] = useState<AppTab | null>(null);
  const [user, setUser] = useState<UserProfile>({
    fullName: 'Can Bedük',
    diabetesType: 'Tip 1',
    diagnosisDate: '2015-06-12'
  });

  const openPanel = (tab: AppTab) => {
    setPanelContent(tab);
    setIsPanelOpen(true);
    setIsFabOpen(false);
  };

  const closePanel = () => {
    setIsPanelOpen(false);
    setTimeout(() => setPanelContent(null), 300);
  };

  const renderContent = (tab: AppTab) => {
    switch (tab) {
      case 'dashboard': return <GmaxDashboard />;
      case 'nutrition': return <NutritionTracker />;
      case 'chat': return <GubiChat />;
      case 'twin': return <TwinView />;
      case 'community': return <Community />;
      case 'emotions': return <EmotionJar />;
      case 'emergency': return <Community initialView="emergency" />;
      case 'notifications': return <div className="space-y-4">
        <h3 className="text-lg font-black text-sky-900 uppercase tracking-tight mb-4">Bildirimler</h3>
        <div className="bg-white p-4 rounded-2xl border border-sky-100 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center text-sky-600">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">Şekerin Yükseliyor!</p>
            <p className="text-xs text-slate-500">Gubi biraz yürüyüş öneriyor.</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-sky-100 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
            <Heart className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">Harika Gidiyorsun!</p>
            <p className="text-xs text-slate-500">Bugün duygu kavanozun çok renkli.</p>
          </div>
        </div>
      </div>;
      case 'profile': return <Profile />;
      default: return <GmaxDashboard />;
    }
  };

  const tabs = [
    { id: 'dashboard', label: 'Ana Sayfa', icon: LayoutDashboard },
    { id: 'nutrition', label: 'Beslenme', icon: Utensils },
    { id: 'chat', label: 'Gubi', icon: MessageSquare },
  ];

  const sideTabs = [
    { id: 'twin', label: 'İkizim', icon: Activity, desc: 'Metabolik dijital ikizini görüntüle' },
    { id: 'community', label: 'Askıda Malzeme', icon: Users, desc: 'Yardımlaşma ve malzeme paylaşımı' },
    { id: 'emotions', label: 'Duygu Kavanozu', icon: Heart, desc: 'Duygu durumunu takip et' },
    { id: 'emergency', label: 'Acil İnsülin', icon: AlertCircle, desc: 'Acil durum yardımı talep et' },
    { id: 'notifications', label: 'Bildirimler', icon: Bell, desc: 'Önemli güncellemeler ve uyarılar' },
    { id: 'profile', label: 'Profil', icon: User, desc: 'Kişisel bilgilerini yönet' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-sky-100 selection:text-sky-900 overflow-x-hidden">
      {/* Mobile-First Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-xl border-b border-sky-100/50 z-40 flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-sky-600 rounded-2xl flex items-center justify-center shadow-lg shadow-sky-200 rotate-3">
            <span className="text-white font-black text-xl italic">G</span>
          </div>
          <h1 className="text-xl font-black text-sky-900 tracking-tight italic">GMAX</h1>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => {
              setPanelContent(null);
              setIsPanelOpen(true);
            }}
            className="p-2 text-slate-400 hover:text-sky-600 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          <button 
            onClick={() => openPanel('notifications')}
            className="relative p-2 text-slate-400 hover:text-sky-600 transition-colors"
          >
            <Bell className="w-6 h-6" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
          </button>
          <button 
            onClick={() => openPanel('profile')}
            className="w-10 h-10 rounded-2xl bg-sky-100 border-2 border-white shadow-sm overflow-hidden"
          >
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.fullName}`} 
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="pt-20 pb-32 px-6 max-w-md mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {activeTab === 'dashboard' ? (
              <div className="space-y-8">
                {renderContent('dashboard')}
                <Reminders />
              </div>
            ) : renderContent(activeTab)}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Side Panel (Drawer) */}
      <AnimatePresence>
        {isPanelOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closePanel}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[90%] max-w-sm bg-slate-50 z-[60] shadow-2xl flex flex-col"
            >
              <div className="p-6 flex justify-between items-center border-b border-sky-100/50 bg-white">
                <h3 className="text-xl font-black text-sky-900 uppercase tracking-tight">Detaylar</h3>
                <button onClick={closePanel} className="p-2 bg-slate-50 rounded-xl shadow-sm text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Side Panel Content */}
              <div className="flex-1 overflow-y-auto">
                {!panelContent ? (
                  <div className="p-4 space-y-2">
                    {sideTabs.map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setPanelContent(tab.id as AppTab)}
                          className="w-full flex items-center gap-4 p-4 bg-white hover:bg-sky-50 rounded-2xl border border-sky-100/50 transition-all group"
                        >
                          <div className="p-3 bg-sky-50 group-hover:bg-white rounded-xl text-sky-600 transition-colors">
                            <Icon className="w-6 h-6" />
                          </div>
                          <div className="flex-1 text-left">
                            <span className="text-sm font-black text-sky-900 uppercase tracking-tight block">{tab.label}</span>
                            <span className="text-[10px] text-slate-400 font-medium">{tab.desc}</span>
                          </div>
                          <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-sky-400 transition-colors" />
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col h-full">
                    <div className="p-4 border-b border-sky-100/50 bg-white flex items-center gap-2">
                      <button 
                        onClick={() => setPanelContent(null)}
                        className="p-2 hover:bg-slate-50 rounded-xl text-sky-600 transition-colors"
                      >
                        <ChevronRight className="w-5 h-5 rotate-180" />
                      </button>
                      <span className="text-xs font-black text-sky-900 uppercase tracking-widest">
                        {sideTabs.find(t => t.id === panelContent)?.label}
                      </span>
                    </div>
                    <div className="flex-1 p-6">
                      {renderContent(panelContent)}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-2xl border-t border-sky-100/50 px-6 py-4 z-40">
        <div className="max-w-md mx-auto flex items-center justify-between relative">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as AppTab);
                  setIsPanelOpen(false);
                }}
                className={cn(
                  "flex flex-col items-center gap-1 transition-all duration-300",
                  isActive ? "text-sky-600 scale-110" : "text-slate-400 hover:text-sky-400"
                )}
              >
                <div className={cn(
                  "p-2 rounded-2xl transition-all",
                  isActive ? "bg-sky-50 shadow-inner" : ""
                )}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest">{tab.label}</span>
              </button>
            );
          })}
          
          {/* More Button to open Side Tabs */}
          <button
            onClick={() => {
              setPanelContent(null);
              setIsPanelOpen(true);
            }}
            className={cn(
              "flex flex-col items-center gap-1 transition-all duration-300",
              isPanelOpen && !panelContent ? "text-sky-600 scale-110" : "text-slate-400"
            )}
          >
            <div className={cn(
              "p-2 rounded-2xl transition-all",
              isPanelOpen ? "bg-sky-50 shadow-inner" : ""
            )}>
              <Menu className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest">Daha Fazla</span>
          </button>
        </div>

        {/* Floating Action Button for quick entry */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-50">
          <AnimatePresence>
            {isFabOpen && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {[
                  { id: 'emotions', icon: Heart, label: 'Duygu', color: 'bg-pink-500', x: -95, y: -30 },
                  { id: 'emergency', icon: AlertCircle, label: 'Acil', color: 'bg-red-500', x: -45, y: -95 },
                  { id: 'community', icon: Users, label: 'Askıda', color: 'bg-emerald-500', x: 45, y: -95 },
                  { id: 'twin', icon: Activity, label: 'İkizim', color: 'bg-sky-500', x: 95, y: -30 },
                ].map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                    animate={{ opacity: 1, scale: 1, x: item.x, y: item.y }}
                    exit={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                    transition={{ 
                      type: 'spring', 
                      damping: 12, 
                      stiffness: 200,
                      delay: index * 0.03 
                    }}
                    onClick={() => openPanel(item.id as AppTab)}
                    className="absolute pointer-events-auto flex flex-col items-center gap-1 group"
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110",
                      item.color
                    )}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest bg-white px-2 py-0.5 rounded-full shadow-sm border border-slate-100 whitespace-nowrap">
                      {item.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            )}
          </AnimatePresence>

          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsFabOpen(!isFabOpen)}
            className={cn(
              "w-16 h-16 rounded-[24px] flex items-center justify-center text-white shadow-xl border-4 border-white transition-all duration-300",
              isFabOpen ? "bg-slate-800 rotate-45 shadow-slate-200" : "bg-sky-600 shadow-sky-200"
            )}
          >
            <Plus className="w-8 h-8" />
          </motion.button>
        </div>
      </nav>
    </div>
  );
};

export default App;
