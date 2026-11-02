import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, ArrowRight, UtensilsCrossed, Calendar } from 'lucide-react';
import { useCollection } from '../context/CollectionContext';

interface MegaMenuProps {
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const cityCards = [
  {
    name: 'Miami',
    count: '14 curated venues',
    photo: 'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=600&q=80',
    status: 'Art Miami 2026 Host',
    link: '#exhibition',
  },
  {
    name: 'New York',
    count: '38 curated venues',
    photo: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&q=80',
    status: 'Hudson Valley & Dia',
    link: '#artist',
  },
  {
    name: 'Zurich',
    count: '19 curated venues',
    photo: 'https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=600&q=80',
    status: 'Galerie Von Berg',
    link: '#artist',
  },
  {
    name: 'London',
    count: '42 curated venues',
    photo: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80',
    status: 'White Cube Salon',
    link: '#artist',
  },
  {
    name: 'Paris',
    count: '31 curated venues',
    photo: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80',
    status: 'Normandy Studio Flax',
    link: '#process',
  },
  {
    name: 'Venice',
    count: '16 curated venues',
    photo: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=600&q=80',
    status: 'Biennale Collateral',
    link: '#artist',
  },
];

export const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onMouseEnter, onMouseLeave }) => {
  const { setIsBookingOpen } = useCollection();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[920px] max-w-[94vw] bg-[#141417]/95 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.85)] p-6 z-50 text-[#F6F1E7]"
          style={{ WebkitBackdropFilter: 'blur(20px) saturate(160%)' }}
        >
          <div className="grid grid-cols-12 gap-6 items-stretch">
            
            {/* Left: 3-column Grid of City Cards (8 cols) */}
            <div className="col-span-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#FF5A36]">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Global Destinations & Art Fair Venues</span>
                  </div>
                  <a
                    href="#exhibition"
                    className="text-xs text-white/60 hover:text-white flex items-center gap-1 transition-colors group"
                  >
                    <span>View all cities</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {cityCards.map(city => (
                    <a
                      key={city.name}
                      href={city.link}
                      className="group relative rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-[#FF5A36]/60 transition-all duration-300 p-2.5 flex flex-col justify-between h-28"
                    >
                      {/* Thumbnail background with measured scrim */}
                      <div className="absolute inset-0 z-0">
                        <img
                          src={city.photo}
                          alt={city.name}
                          className="w-full h-full object-cover opacity-35 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#141417] via-[#141417]/60 to-transparent" />
                      </div>

                      <div className="relative z-10">
                        <span className="text-[10px] font-mono text-[#F7B733] uppercase tracking-wider block">
                          {city.status}
                        </span>
                        <h4 className="font-serif italic text-lg text-white group-hover:text-[#FF5A36] transition-colors leading-tight">
                          {city.name}
                        </h4>
                      </div>

                      <div className="relative z-10 flex items-center justify-between text-[11px] text-white/50 pt-1 border-t border-white/10">
                        <span>{city.count}</span>
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-[#FF5A36]" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Featured Hospitality & Curatorial Salon Card (vin18) (4 cols) */}
            <div className="col-span-4 rounded-xl overflow-hidden bg-gradient-to-b from-[#1C1819] to-[#121113] border border-[#FF5A36]/30 p-4 flex flex-col justify-between shadow-lg relative group">
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#E5173F]/20 rounded-full blur-2xl pointer-events-none" />

              <div>
                <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden mb-3 border border-white/10">
                  <img
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80"
                    alt="vin18 contemporary dining and private salon"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/75 backdrop-blur-sm text-[10px] font-mono uppercase tracking-widest text-[#F7B733]">
                    Featured Salon
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[#FF5A36] font-mono uppercase tracking-wider mb-1">
                  <UtensilsCrossed className="w-3 h-3" />
                  <span>vin18 · Miami Beach</span>
                </div>

                <h3 className="font-serif italic text-xl text-white leading-tight">
                  Contemporary Tasting & Art Salon
                </h3>
                <p className="text-xs text-white/60 mt-1 line-clamp-2">
                  Exclusive culinary residency alongside Michael David Mayo's monumental works during Art Miami week.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                <div className="text-xs">
                  <span className="text-white/40 block text-[10px] uppercase">Reserve</span>
                  <span className="font-mono text-[#F7B733]">From $120 / seat</span>
                </div>

                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#E5173F] to-[#FF5A36] hover:from-[#FF5A36] hover:to-[#F7B733] text-white text-xs font-sans uppercase tracking-wider font-semibold transition-all shadow-md flex items-center gap-1.5"
                >
                  <Calendar className="w-3 h-3" />
                  <span>Book now</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
