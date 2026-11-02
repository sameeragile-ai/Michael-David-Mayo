import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { useCollection } from '../context/CollectionContext';

interface CartButtonProps {
  isLight: boolean;
}

export const CartButton: React.FC<CartButtonProps> = ({ isLight }) => {
  const {
    savedArtworks,
    savedSlugs,
    subtotal,
    pricesVisible,
    setIsDrawerOpen,
    removeArtwork,
    cartAnimationKey,
  } = useCollection();

  const [isHovered, setIsHovered] = useState(false);
  const [isPopping, setIsPopping] = useState(false);
  const [isRippling, setIsRippling] = useState(false);

  // Trigger pop, shake, and ember ripple when cartAnimationKey increments
  useEffect(() => {
    if (cartAnimationKey > 0) {
      setIsPopping(true);
      setIsRippling(true);
      const timer1 = setTimeout(() => setIsPopping(false), 500);
      const timer2 = setTimeout(() => setIsRippling(false), 900);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [cartAnimationKey]);

  const recentItems = savedArtworks.slice(-3).reverse();

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ripple ring animation on add */}
      <AnimatePresence>
        {isRippling && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0.9 }}
            animate={{ scale: 1.8, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute inset-0 rounded-full border-2 border-[#FF5A36] pointer-events-none"
          />
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsDrawerOpen(true)}
        aria-label={`Open Cart (${savedSlugs.length} items)`}
        className={`relative w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A36] ${
          isLight
            ? 'text-[#1A1714] hover:bg-black/8'
            : 'text-white hover:bg-white/10'
        }`}
      >
        {/* Animated Cart Icon with Shake on add */}
        <motion.div
          animate={
            isPopping
              ? { rotate: [0, -14, 14, -8, 8, 0], scale: [1, 1.15, 1] }
              : { rotate: 0, scale: 1 }
          }
          transition={{ duration: 0.45 }}
        >
          <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
        </motion.div>

        {/* Animated Count Badge in Brand Gradient */}
        <AnimatePresence mode="wait">
          <motion.span
            key={`${savedSlugs.length}-${cartAnimationKey}`}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={
              isPopping
                ? { scale: [1, 1.45, 1], opacity: 1 }
                : { scale: 1, opacity: 1 }
            }
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
            className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1 rounded-full bg-gradient-to-tr from-[#E5173F] via-[#FF5A36] to-[#F7B733] text-white font-mono text-[10px] font-bold flex items-center justify-center shadow-[0_2px_8px_rgba(229,23,63,0.5)] tabular-nums"
          >
            {savedSlugs.length}
          </motion.span>
        </AnimatePresence>
      </button>

      {/* Mini Preview Dropdown on Hover */}
      <AnimatePresence>
        {isHovered && savedArtworks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full right-0 mt-2 w-80 bg-[#141417]/95 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] p-4 z-50 text-[#F6F1E7]"
            style={{ WebkitBackdropFilter: 'blur(20px) saturate(160%)' }}
          >
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10 text-xs">
              <span className="font-mono text-[#FF5A36] uppercase tracking-wider text-[10px]">
                Cart Selection ({savedArtworks.length})
              </span>
              <span className="text-white/40">Recent items</span>
            </div>

            <div className="space-y-2 mb-4">
              {recentItems.map(item => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-3 p-2 rounded-xl bg-white/5 border border-white/5"
                >
                  <div className="min-w-0">
                    <h5 className="font-serif italic text-sm text-white truncate">
                      {item.title}
                    </h5>
                    <p className="text-[11px] text-white/50 truncate">
                      {item.dimensions.inches} · {item.year}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {pricesVisible && (
                      <span className="font-mono text-xs text-[#F7B733] font-semibold">
                        {item.price}
                      </span>
                    )}
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        removeArtwork(item.slug);
                      }}
                      className="text-white/40 hover:text-red-400 transition-colors p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Subtotal */}
            {pricesVisible && (
              <div className="flex items-center justify-between py-2 border-t border-white/10 text-xs mb-3">
                <span className="text-white/60">Estimated Subtotal</span>
                <span className="font-mono font-semibold text-sm text-white">
                  ${subtotal.toLocaleString()}
                </span>
              </div>
            )}

            <button
              onClick={() => {
                setIsHovered(false);
                setIsDrawerOpen(true);
              }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#E5173F] via-[#FF5A36] to-[#F7B733] hover:opacity-95 text-white font-sans text-xs uppercase tracking-wider font-semibold transition-all shadow-md flex items-center justify-center gap-1.5"
            >
              <span>View full cart</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
