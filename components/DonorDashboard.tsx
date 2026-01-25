
import React, { useState } from 'react';
import { Button } from './Button';
import { analyzeFoodDescription } from '../services/geminiService';
import { FoodDrop } from '../backend/types';
import { DIETARY_TAGS, CANADIAN_CITIES } from '../constant';

interface DonorDashboardProps {
  onAddDrop: (drop: Partial<FoodDrop>) => void;
  myDrops: FoodDrop[];
}

export const DonorDashboard: React.FC<DonorDashboardProps> = ({ onAddDrop, myDrops }) => {
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState(CANADIAN_CITIES[0]);
  const [title, setTitle] = useState('');
  const [phone, setPhone] = useState('');
  const [quantity, setQuantity] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    const analysis = await analyzeFoodDescription(description);
    if (!analysis.isAppropriate) {
      alert("Please review your description for safety.");
      setIsAnalyzing(false);
      return;
    }

    const now = new Date();
    const start = startTime ? new Date(`${now.toDateString()} ${startTime}`) : now;
    const end = endTime ? new Date(`${now.toDateString()} ${endTime}`) : new Date(now.getTime() + 4 * 60 * 60 * 1000);

    onAddDrop({
      title,
      description,
      donorPhone: phone,
      pickupAddress: address,
      city,
      quantity,
      tags: analysis.tags,
      aiSummary: analysis.summary,
      pickupStartTime: start.toISOString(),
      availableUntil: end.toISOString(),
      lat: 43.45 + (Math.random() * 0.05 - 0.025),
      lng: -80.49 + (Math.random() * 0.05 - 0.025),
    });

    setTitle(''); setDescription(''); setAddress(''); setPhone(''); setQuantity('');
    setStartTime(''); setEndTime(''); setShowForm(false); setIsAnalyzing(false);
  };

  return (
    <div className="space-y-16">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="serif text-7xl text-white mb-2 tracking-tight">My Listings</h2>
          <p className="text-slate-500 font-medium">Manage your active donations and community impact.</p>
        </div>
        <Button size="lg" className="rounded-2xl" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Post New Donation'}
        </Button>
      </header>

      {showForm && (
        <div className="celestial-glass p-12 rounded-[3rem] border border-white/5 animate-in fade-in slide-in-from-top-4 duration-500">
           <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Food Title</label>
                <input 
                  type="text" required value={title} onChange={e => setTitle(e.target.value)}
                  className="w-full px-6 py-4 bg-white/5 border border-white/5 rounded-2xl focus:ring-2 focus:ring-amber-500 font-medium text-white outline-none"
                  placeholder="e.g. Fresh Bread Basket"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Contact Phone</label>
                <input 
                  type="tel" required value={phone} onChange={e => setPhone(e.target.value)}
                  className="w-full px-6 py-4 bg-white/5 border border-white/5 rounded-2xl focus:ring-2 focus:ring-amber-500 font-medium text-white outline-none"
                  placeholder="519-XXX-XXXX"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">City</label>
                <select 
                  value={city} onChange={e => setCity(e.target.value)}
                  className="w-full px-6 py-4 bg-white/5 border border-white/5 rounded-2xl focus:ring-2 focus:ring-amber-500 font-medium appearance-none text-white outline-none"
                >
                  {CANADIAN_CITIES.map(c => <option key={c} value={c} className="bg-emerald-950">{c}</option>)}
                </select>
              </div>
              <div className="md:col-span-2 space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Pickup Address</label>
                <input 
                  type="text" required value={address} onChange={e => setAddress(e.target.value)}
                  className="w-full px-6 py-4 bg-white/5 border border-white/5 rounded-2xl focus:ring-2 focus:ring-amber-500 font-medium text-white outline-none"
                  placeholder="Street address for pickup"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Pickup Start</label>
                <input type="time" required value={startTime} onChange={e => setStartTime(e.target.value)} className="w-full px-6 py-4 bg-white/5 border border-white/5 rounded-2xl focus:ring-2 focus:ring-amber-500 font-medium text-white outline-none" />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Pickup End</label>
                <input type="time" required value={endTime} onChange={e => setEndTime(e.target.value)} className="w-full px-6 py-4 bg-white/5 border border-white/5 rounded-2xl focus:ring-2 focus:ring-amber-500 font-medium text-white outline-none" />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Description</label>
              <textarea 
                required value={description} onChange={e => setDescription(e.target.value)}
                className="w-full px-6 py-4 bg-white/5 border border-white/5 rounded-2xl h-32 focus:ring-2 focus:ring-amber-500 font-medium resize-none text-white outline-none"
                placeholder="List ingredients, dietary info, or quantity details..."
              ></textarea>
            </div>

            <Button type="submit" fullWidth size="lg" className="h-20 text-lg rounded-[2rem]" disabled={isAnalyzing}>
              {isAnalyzing ? "Processing..." : 'Post Donation'}
            </Button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {myDrops.map(drop => (
          <div key={drop.id} className="celestial-glass p-8 rounded-[2.5rem] border border-white/5 group hover:border-amber-400/30 transition-all">
            <div className="flex justify-between items-start mb-6">
              <h4 className="serif text-3xl text-white group-hover:text-amber-400 transition-colors">{drop.title}</h4>
              <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${drop.status === 'claimed' ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                {drop.status}
              </span>
            </div>
            {drop.reservedBy ? (
              <div className="mt-4 p-5 bg-white/5 rounded-2xl border border-white/5">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Claimed By</p>
                <p className="text-sm font-bold text-white">{drop.reservedBy.name}</p>
                <p className="text-sm text-amber-500 font-black mt-1">{drop.reservedBy.phone}</p>
              </div>
            ) : (
              <p className="text-xs text-slate-500 font-medium italic">Waiting for someone to claim.</p>
            )}
          </div>
        ))}
        {myDrops.length === 0 && !showForm && (
          <div className="col-span-full py-24 text-center border-2 border-dashed border-white/10 rounded-[3rem]">
            <p className="serif text-4xl text-slate-700">No active listings</p>
            <p className="text-slate-600 font-medium">Create your first donation above.</p>
          </div>
        )}
      </div>
    </div>
  );
};
