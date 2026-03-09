import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, MessageCircle, Share2, Send, User } from 'lucide-react';
import { Tweet } from '../types';
import { cn } from '../utils';

const initialTweets: Tweet[] = [
  {
    id: '1',
    user: 'Can Bedük',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Can',
    content: 'Bugün sensör değerlerim mükemmel gidiyor! 🎯 #diyabet #gmax',
    timestamp: '2s önce',
    likes: 12,
    comments: 3
  },
  {
    id: '2',
    user: 'Elif S.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elif',
    content: 'Yeni Gmax güncellemesi harika olmuş, özellikle ilaç takibi çok işime yaradı.',
    timestamp: '5s önce',
    likes: 24,
    comments: 8
  }
];

export const TwitterFeed = () => {
  const [tweets, setTweets] = useState<Tweet[]>(initialTweets);
  const [newTweet, setNewTweet] = useState('');

  const handlePost = () => {
    if (!newTweet.trim()) return;
    const tweet: Tweet = {
      id: Date.now().toString(),
      user: 'Sen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=User',
      content: newTweet,
      timestamp: 'Şimdi',
      likes: 0,
      comments: 0
    };
    setTweets([tweet, ...tweets]);
    setNewTweet('');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Topluluk</h2>
      </div>

      {/* Post Box */}
      <div className="bg-white border border-sky-100 rounded-3xl p-4 shadow-sm space-y-3">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-sky-100 overflow-hidden shrink-0">
            <User className="w-full h-full p-2 text-sky-600" />
          </div>
          <textarea 
            value={newTweet}
            onChange={(e) => setNewTweet(e.target.value)}
            placeholder="Neler oluyor?"
            className="flex-1 bg-transparent border-none outline-none text-sm text-slate-700 resize-none h-20 pt-2"
          />
        </div>
        <div className="flex justify-end pt-2 border-t border-slate-50">
          <button 
            onClick={handlePost}
            disabled={!newTweet.trim()}
            className="bg-sky-600 disabled:opacity-50 text-white px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-sky-100 flex items-center gap-2"
          >
            <Send className="w-3 h-3" />
            Paylaş
          </button>
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-4">
        {tweets.map((tweet) => (
          <motion.div 
            key={tweet.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-sky-100 rounded-3xl p-4 shadow-sm space-y-3"
          >
            <div className="flex gap-3">
              <img src={tweet.avatar} alt={tweet.user} className="w-10 h-10 rounded-full bg-slate-100" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-900">{tweet.user}</span>
                  <span className="text-[10px] text-slate-400 font-medium">{tweet.timestamp}</span>
                </div>
                <p className="text-sm text-slate-700 mt-1 leading-relaxed">{tweet.content}</p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-slate-50 px-2">
              <button className="flex items-center gap-2 text-slate-400 hover:text-sky-600 transition-colors">
                <MessageCircle className="w-4 h-4" />
                <span className="text-[10px] font-bold">{tweet.comments}</span>
              </button>
              <button className="flex items-center gap-2 text-slate-400 hover:text-pink-600 transition-colors">
                <Heart className="w-4 h-4" />
                <span className="text-[10px] font-bold">{tweet.likes}</span>
              </button>
              <button className="flex items-center gap-2 text-slate-400 hover:text-sky-600 transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
