import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Loader2 } from 'lucide-react';
import { GubiCharacter } from './GubiCharacter';
import { cn } from '../utils';
import { gubiChat } from '../services/geminiService';
import { Message } from '../types';

export const GubiChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Merhaba! Ben Gubi. Bugün nasıl hissediyorsun? Verilerine göre her şey yolunda görünüyor.', sender: 'gubi', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

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

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-140px)]">
      <div className="flex flex-col items-center mb-2 shrink-0 pt-2">
        <div className="h-16 flex items-center justify-center">
          <GubiCharacter size="sm" mood={isLoading ? "thinking" : "happy"} />
        </div>
        <h2 className="text-sm font-black text-sky-900 tracking-tight mt-1">Gubi</h2>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          <p className="text-[8px] text-sky-600 font-bold uppercase tracking-widest opacity-60">Çevrimiçi</p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 p-2 mb-4 scroll-smooth scrollbar-hide">
        <AnimatePresence mode="popLayout">
          {messages.map((m) => (
            <motion.div 
              key={m.id} 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={cn("flex", m.sender === 'user' ? "justify-end" : "justify-start")}
            >
              <div className={cn(
                "rounded-[24px] p-4 max-w-[85%] shadow-lg",
                m.sender === 'gubi' 
                  ? "bg-sky-500 text-white rounded-tl-none shadow-sky-200/30" 
                  : "bg-sky-900 text-white rounded-tr-none shadow-sky-900/10"
              )}>
                <p className="text-sm leading-relaxed font-medium">{m.text}</p>
                <span className={cn("text-[8px] mt-2 block text-right font-bold uppercase tracking-tighter opacity-50")}>
                  {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-sky-500/10 rounded-[24px] rounded-tl-none p-4 flex items-center gap-3 border border-sky-100 shadow-sm">
              <Loader2 className="w-4 h-4 text-sky-500 animate-spin" />
              <span className="text-[10px] text-sky-600 font-bold uppercase tracking-widest">Gubi yazıyor...</span>
            </div>
          </div>
        )}
      </div>

      <div className="shrink-0 p-2 bg-white rounded-[24px] border border-sky-100 flex items-center gap-3 shadow-xl shadow-sky-200/20 mb-4">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Mesaj yaz..." 
          className="flex-1 bg-transparent border-none outline-none text-slate-900 text-sm placeholder:text-slate-400 font-medium px-2"
        />
        <button 
          onClick={handleSendMessage}
          disabled={isLoading || !input.trim()}
          className="bg-sky-600 p-2.5 rounded-xl disabled:bg-slate-200 transition-all shadow-lg shadow-sky-200"
        >
          <Send className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
};
