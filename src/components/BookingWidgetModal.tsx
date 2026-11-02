import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, Users, CheckCircle2, UtensilsCrossed, ArrowRight } from 'lucide-react';
import { useCollection } from '../context/CollectionContext';

export const BookingWidgetModal: React.FC = () => {
  const { isBookingOpen, setIsBookingOpen } = useCollection();
  const [step, setStep] = useState<'form' | 'confirmed'>('form');
  const [guests, setGuests] = useState('2 guests');
  const [time, setTime] = useState('19:30');
  const [date, setDate] = useState('2026-12-02');
  const [experience, setExperience] = useState("Chef's Table & Art Salon");

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('confirmed');
  };

  const handleClose = () => {
    setIsBookingOpen(false);
    setTimeout(() => setStep('form'), 300);
  };

  return (
    <AnimatePresence>
      {isBookingOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-full max-w-lg bg-[#141417] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-[0_30px_90px_rgba(0,0,0,0.9)] text-[#F6F1E7] z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E5173F] to-[#FF5A36] flex items-center justify-center text-white shadow-md">
                  <UtensilsCrossed className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#FF5A36] block">
                    Curatorial Hospitality
                  </span>
                  <h3 className="font-serif italic text-2xl text-white">
                    Book a Table & Viewing
                  </h3>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {step === 'form' ? (
              <form onSubmit={handleBook} className="py-6 space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/60 mb-1.5 font-sans">
                    Experience / Salon
                  </label>
                  <select
                    value={experience}
                    onChange={e => setExperience(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF5A36]"
                  >
                    <option className="bg-[#141417]">Chef's Table & Art Salon (vin18)</option>
                    <option className="bg-[#141417]">Private Booth Walkthrough (Art Miami)</option>
                    <option className="bg-[#141417]">Wine Pairing & Sommelier Tasting</option>
                    <option className="bg-[#141417]">Collectors Afternoon Tea & Salon</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/60 mb-1.5 font-sans">
                      Date
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-white/40 absolute left-3.5 top-3 pointer-events-none" />
                      <input
                        type="date"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        className="w-full bg-white/5 border border-white/15 rounded-xl pl-10 pr-3 py-2 text-sm text-white focus:outline-none focus:border-[#FF5A36]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/60 mb-1.5 font-sans">
                      Time Slot
                    </label>
                    <div className="relative">
                      <Clock className="w-4 h-4 text-white/40 absolute left-3.5 top-3 pointer-events-none" />
                      <select
                        value={time}
                        onChange={e => setTime(e.target.value)}
                        className="w-full bg-white/5 border border-white/15 rounded-xl pl-10 pr-3 py-2 text-sm text-white focus:outline-none focus:border-[#FF5A36]"
                      >
                        <option className="bg-[#141417]">18:00 (Early Seating)</option>
                        <option className="bg-[#141417]">19:30 (Prime Seating)</option>
                        <option className="bg-[#141417]">21:00 (Late Night Salon)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/60 mb-1.5 font-sans">
                    Party Size
                  </label>
                  <div className="relative">
                    <Users className="w-4 h-4 text-white/40 absolute left-3.5 top-3 pointer-events-none" />
                    <select
                      value={guests}
                      onChange={e => setGuests(e.target.value)}
                      className="w-full bg-white/5 border border-white/15 rounded-xl pl-10 pr-3 py-2 text-sm text-white focus:outline-none focus:border-[#FF5A36]"
                    >
                      <option className="bg-[#141417]">1 guest</option>
                      <option className="bg-[#141417]">2 guests</option>
                      <option className="bg-[#141417]">4 guests</option>
                      <option className="bg-[#141417]">6+ VIP Salon Delegation</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 py-3.5 rounded-full bg-gradient-to-r from-[#E5173F] via-[#FF5A36] to-[#F7B733] hover:opacity-95 text-white font-sans text-xs uppercase tracking-widest font-semibold transition-all shadow-[0_10px_30px_rgba(229,23,63,0.35)] flex items-center justify-center gap-2"
                >
                  <span>Confirm Reservation Request</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <div className="py-8 text-center space-y-4">
                <CheckCircle2 className="w-14 h-14 text-[#FF5A36] mx-auto" />
                <h4 className="font-serif italic text-2xl text-white">Reservation Confirmed</h4>
                <p className="text-xs text-white/70 max-w-sm mx-auto leading-relaxed">
                  Your table reservation for <strong className="text-white">{guests}</strong> at <strong className="text-white">{experience}</strong> on <strong className="text-white">{date} at {time}</strong> is saved. Concierge confirmation sent to your profile.
                </p>
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-sans uppercase tracking-wider font-semibold transition-colors"
                >
                  Close Window
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
