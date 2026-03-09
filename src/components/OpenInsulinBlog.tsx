import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, User, Calendar, ChevronRight } from 'lucide-react';
import { BlogPost } from '../types';
import { cn } from '../utils';

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Gmax 2.0 Yayında: Yeni Özellikler Neler?',
    author: 'Gmax Ekibi',
    role: 'admin',
    content: 'Uygulamamızın yeni versiyonunda ilaç takibi, doktor iletişimi ve gelişmiş topluluk özelliklerini sizler için hazırladık...',
    date: '09 Mart 2026',
    image: 'https://picsum.photos/seed/gmax/800/400'
  },
  {
    id: '2',
    title: 'Tip 1 Diyabette Egzersizin Önemi',
    author: 'Dr. Ahmet Yılmaz',
    role: 'doctor',
    content: 'Egzersiz sırasında glikoz seviyelerini nasıl yönetmeliyiz? Uzman görüşleri ve pratik tavsiyeler bu yazımızda...',
    date: '07 Mart 2026',
    image: 'https://picsum.photos/seed/doctor/800/400'
  }
];

export const OpenInsulinBlog = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight italic">Açık İnsülin</h2>
        <div className="bg-sky-100 px-3 py-1 rounded-full">
          <span className="text-[10px] font-black text-sky-600 uppercase tracking-widest">Blog</span>
        </div>
      </div>

      <div className="space-y-6">
        {blogPosts.map((post) => (
          <motion.div 
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-sky-100 rounded-[32px] overflow-hidden shadow-xl shadow-sky-200/20 group"
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4">
                <span className={cn(
                  "px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest text-white shadow-lg",
                  post.role === 'admin' ? "bg-sky-600" : "bg-emerald-600"
                )}>
                  {post.role === 'admin' ? 'Gmax Duyuru' : 'Doktor Yazısı'}
                </span>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {post.author}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {post.date}
                </div>
              </div>
              
              <h3 className="text-xl font-black text-slate-900 leading-tight group-hover:text-sky-600 transition-colors">
                {post.title}
              </h3>
              
              <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed">
                {post.content}
              </p>
              
              <button className="flex items-center gap-2 text-sky-600 font-black text-xs uppercase tracking-widest group/btn">
                Devamını Oku
                <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
