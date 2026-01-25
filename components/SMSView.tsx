
import React, { useState, useEffect, useRef } from 'react';
import { SMSMessage, FoodDrop } from '../types';

interface SMSViewProps {
  drops: FoodDrop[];
}

export const SMSView: React.FC<SMSViewProps> = ({ drops }) => {
  const [messages, setMessages] = useState<SMSMessage[]>([
    {
      id: '1',
      from: 'System',
      content: 'Welcome to BarakahLink. Providing community food support in Kitchener-Waterloo.\n\nText "FOOD" or your postal code to see what is available nearby.',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: SMSMessage = {
      id: Date.now().toString(),
      from: 'You',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    
    // Simulate network delay for the SMS Gateway
    setTimeout(() => {
      setIsTyping(false);
      let reply = '';
      const cmd = input.toUpperCase().trim();
      const availableDrops = drops.filter(d => d.status === 'available');

      if (cmd.includes('FOOD') || cmd.length >= 3) {
        if (availableDrops.length > 0) {
          reply = `Found it! We have ${availableDrops.length} food listings near you right now.\n\nTo view exact addresses and get your pickup code, visit this link:\n\nhttps://barakahlink.app/map?ref=sms`;
        } else {
          reply = `No active food listings were found in your area right now. \n\nWe will notify you if a new donation becomes available nearby.`;
        }
      } else {
        reply = 'Unknown command. Text "FOOD" to see what is available.';
      }

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        from: 'System',
        content: reply,
        timestamp: new Date()
      }]);
    }, 1500);
  };

  return (
    <div className="max-w-[360px] mx-auto bg-slate-950 rounded-[3.5rem] p-4 shadow-[0_50px_100px_-20px_rgba(6,78,59,0.5)] border-[10px] border-slate-900 overflow-hidden h-[720px] flex flex-col relative group transition-transform hover:scale-[1.01] duration-700">
      {/* Phone Hardware Details */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-7 bg-slate-900 rounded-b-3xl z-20 flex justify-center items-start pt-1">
        <div className="w-12 h-1 bg-slate-800 rounded-full"></div>
      </div>
      
      {/* Screen Container */}
      <div className="flex-1 overflow-hidden pt-10 pb-4 bg-[#f4f7f5] rounded-[2.5rem] flex flex-col relative">
        {/* Chat Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-white/80 backdrop-blur-md flex items-center space-x-4">
          <div className="w-10 h-10 bg-emerald-900 rounded-full flex items-center justify-center text-amber-400 font-black shadow-lg">
            <span className="serif text-xl">B</span>
          </div>
          <div>
            <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-widest">BarakahLink Support</h4>
            <div className="flex items-center">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Official Gateway</span>
            </div>
          </div>
        </div>

        {/* Messages List */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6 space-y-6 no-scrollbar">
          <div className="text-center mb-8">
            <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em] bg-white px-4 py-1 rounded-full border border-slate-100">Today</span>
          </div>
          
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.from === 'You' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
              <div className={`max-w-[85%] px-5 py-4 rounded-3xl text-[14px] leading-relaxed shadow-sm transition-all ${
                msg.from === 'You' 
                  ? 'bg-emerald-700 text-white rounded-br-none font-medium' 
                  : 'bg-white text-slate-800 rounded-bl-none border border-slate-200/50 font-medium'
              }`}>
                <p className="whitespace-pre-wrap">{msg.content}</p>
                <p className={`text-[10px] mt-2 font-bold uppercase tracking-wider ${msg.from === 'You' ? 'text-emerald-200/60' : 'text-slate-300'}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start animate-in fade-in duration-300">
              <div className="bg-white px-5 py-4 rounded-3xl rounded-bl-none border border-slate-200/50 flex space-x-1.5 items-center h-10">
                <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="px-4 pb-4 pt-2 bg-white/50 backdrop-blur-sm">
          <div className="bg-white p-2 rounded-full border border-slate-200 shadow-xl flex items-center ring-4 ring-emerald-900/5">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message"
              className="flex-1 bg-transparent px-5 py-3 text-[14px] focus:outline-none placeholder:text-slate-300 font-semibold text-slate-900"
            />
            <button 
              onClick={handleSend}
              className="bg-emerald-800 text-amber-400 p-3.5 rounded-full hover:bg-emerald-900 transition-all shadow-lg active:scale-90"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Home Indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-28 h-1.5 bg-slate-800 rounded-full opacity-40"></div>
    </div>
  );
};