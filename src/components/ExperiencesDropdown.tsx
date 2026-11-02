import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Utensils, Coffee, Wine, Sparkles, ArrowRight } from 'lucide-react';
import { useCollection } from '../context/CollectionContext';

interface ExperiencesDropdownProps {
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const experiences = [
  {
    id: 'exp-1',
    title: "Chef's Table",
    subtitle: '6-Course sensory pairing with studio artists',
    price: 'from £110',
    icon: Utensils,
    tag: 'Exclusive',
  },
  {
    id: 'exp-2',
    title: 'Afternoon Tea',
    subtitle: 'Curatorial salon overlooking the bay',
    price: 'from £35',
    icon: Coffee,
    tag: 'Daily',
  },
  {
    id: 'exp-3',
    title: 'Wine Pairing',
    subtitle: 'Rare biodynamic vintages & private tour',
    price: 'from £75',
    icon: Wine,
    tag: 'Sommelier Choice',
  },
  {
    id: 'exp-4',
    title: 'Bottomless Brunch',
    subtitle: 'Weekend collectors gathering & champagne',
    price: 'from £55',
    icon: Sparkles,
    tag: 'Weekends',
  },
];

export const ExperiencesDropdown: React.FC<ExperiencesDropdownProps> = ({
  isOpen,
  onMouseEnter,
  onMouseLeave,
}) => {
  const { setIsBookingOpen } = useCollection();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-84 bg-[#141417]/95 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-[0_30px_70px_rgba(0,0,0,0.85)] p-3 z-50 text-[#F6F1E7]"
          style={{ WebkitBackdropFilter: 'blur(20px) saturate(160%)' }}
        >
          <div className="space-y-1">
            {experiences.map(exp => {
              const Icon = exp.icon;
              return (
                <div
                  key={exp.id}
                  onClick={() => setIsBookingOpen(true)}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-white/10 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#E5173F]/20 via-[#FF5A36]/20 to-[#F7B733]/20 text-[#FF5A36] border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-white group-hover:text-[#FF5A36] transition-colors truncate">
                        {exp.title}
                      </div>
                      <div className="text-[11px] text-white/50 truncate">{exp.subtitle}</div>
                    </div>
                  </div>

                  <div className="text-right shrink-0 ml-2">
                    <span className="font-mono text-xs text-[#F7B733] font-semibold block">
                      {exp.price}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-white/40 block">
                      {exp.tag}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-2 pt-2 border-t border-white/10 text-center">
            <button
              onClick={() => setIsBookingOpen(true)}
              className="text-xs text-[#FF5A36] hover:text-[#F7B733] font-sans uppercase tracking-wider transition-colors inline-flex items-center gap-1"
            >
              <span>Explore all curated experiences</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
