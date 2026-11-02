import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Compass, Heart, ShoppingBag } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCollection } from '../context/CollectionContext';

interface MobileBottomBarProps {
  isScrolled: boolean;
  isMobileMenuOpen: boolean;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  isScrolled,
  isMobileMenuOpen,
}) => {
  const { savedSlugs, favorites, isDrawerOpen, setIsDrawerOpen } = useCollection();
  const location = useLocation();
  const navigate = useNavigate();

  // Show when scrolled past hero (e.g. scrollY >= 350) and neither menu nor drawer is open
  const isVisible = isScrolled && !isMobileMenuOpen && !isDrawerOpen;

  const handleHomeClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleExploreClick = () => {
    if (location.pathname !== '/') {
      navigate('/#exhibition');
    } else {
      const el = document.getElementById('exhibition');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 280, damping: 28 }}
          className="md:hidden fixed bottom-4 inset-x-4 z-40 flex justify-center pb-safe-bottom pointer-events-none"
        >
          <div className="pointer-events-auto bg-[#141417]/85 backdrop-blur-2xl border border-white/15 shadow-[0_15px_40px_rgba(0,0,0,0.7)] rounded-full px-6 py-2.5 flex items-center justify-between gap-8 text-[#F6F1E7]">
            {/* 1. Home */}
            <button
              onClick={handleHomeClick}
              aria-label="Home"
              className="flex flex-col items-center gap-0.5 text-white/70 hover:text-white transition-colors"
            >
              <Home className="w-5 h-5" />
              <span className="text-[9px] uppercase tracking-wider font-mono">Home</span>
            </button>

            {/* 2. Explore */}
            <button
              onClick={handleExploreClick}
              aria-label="Explore Works"
              className="flex flex-col items-center gap-0.5 text-white/70 hover:text-white transition-colors"
            >
              <Compass className="w-5 h-5" />
              <span className="text-[9px] uppercase tracking-wider font-mono">Explore</span>
            </button>

            {/* 3. Favourites */}
            <button
              onClick={() => {
                const el = document.getElementById('exhibition');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              aria-label="Favorites"
              className="relative flex flex-col items-center gap-0.5 text-white/70 hover:text-[#E5173F] transition-colors"
            >
              <Heart className={`w-5 h-5 ${favorites.length > 0 ? 'text-[#E5173F] fill-[#E5173F]/40' : ''}`} />
              <span className="text-[9px] uppercase tracking-wider font-mono">Saved</span>
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#E5173F] text-white text-[8px] font-mono flex items-center justify-center font-bold">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* 4. Cart with animated badge */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Cart"
              className="relative flex flex-col items-center gap-0.5 text-white/70 hover:text-[#FF5A36] transition-colors"
            >
              <ShoppingBag className={`w-5 h-5 ${savedSlugs.length > 0 ? 'text-[#FF5A36]' : ''}`} />
              <span className="text-[9px] uppercase tracking-wider font-mono">Cart</span>
              {savedSlugs.length > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-1 rounded-full bg-gradient-to-r from-[#E5173F] to-[#FF5A36] text-white text-[8px] font-mono flex items-center justify-center font-bold shadow-sm">
                  {savedSlugs.length}
                </span>
              )}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
