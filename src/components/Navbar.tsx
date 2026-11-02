import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Heart, Utensils, Calendar } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useScrollState } from '../hooks/useScrollState';
import { useCollection } from '../context/CollectionContext';
import { NavLinks } from './NavLinks';
import { CartButton } from './CartButton';
import { CommandSearch } from './CommandSearch';
import { MobileMenu } from './MobileMenu';
import { MobileBottomBar } from './MobileBottomBar';
import { SignInModal } from './SignInModal';
import { BookingWidgetModal } from './BookingWidgetModal';
import { MagneticButton } from './MagneticButton';

export const Navbar: React.FC = () => {
  const { isScrolled, progress, navTheme } = useScrollState();
  const {
    favorites,
    isCommandSearchOpen,
    setIsCommandSearchOpen,
    setIsSignInOpen,
    setIsBookingOpen,
  } = useCollection();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMac, setIsMac] = useState(true);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Detect OS for ⌘K vs Ctrl K
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMac(/(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent));
    }
  }, []);

  const isLight = isScrolled && navTheme === 'light';
  const isHome = location.pathname === '/';

  const handleLogoClick = () => {
    if (isHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  return (
    <>
      {/* 0. Accessible "Skip to content" link */}
      <a
        href="#exhibition"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[150] focus:px-4 focus:py-2 focus:bg-[#E5173F] focus:text-white focus:rounded-full focus:shadow-lg focus:outline-none text-xs font-sans uppercase tracking-wider"
      >
        Skip to content
      </a>

      {/* Top subtle dark gradient overlay for State 1 (scrollY < 24px) for legibility */}
      <div
        className={`fixed top-0 left-0 right-0 h-[140px] pointer-events-none z-40 transition-opacity duration-700 ${
          !isScrolled ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'linear-gradient(to bottom, rgba(11, 11, 13, 0.55) 0%, transparent 100%)',
        }}
      />

      {/* Master Navbar Container */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 pointer-events-none flex justify-center ${
          isScrolled ? 'pt-2 sm:pt-3 px-3 sm:px-6' : 'pt-0 px-0'
        }`}
      >
        {/* Floating Glass Pill Morph Container */}
        <motion.div
          layout
          initial={{ y: -24, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            width: isScrolled ? '100%' : '100%',
            maxWidth: isScrolled ? '1180px' : '100%',
            height: isScrolled ? (window.innerWidth < 640 ? 58 : 64) : (window.innerWidth < 640 ? 72 : 88),
            borderRadius: isScrolled ? (window.innerWidth < 640 ? '20px' : '9999px') : '0px',
          }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 30,
          }}
          className={`relative pointer-events-auto w-full transition-colors duration-500 overflow-hidden flex items-center justify-between px-4 sm:px-6 lg:px-8 ${
            !isScrolled
              ? 'bg-transparent shadow-none'
              : isLight
              ? 'bg-[#F6F1EA]/75 text-[#1A1714] shadow-[0_10px_35px_-10px_rgba(0,0,0,0.15),0_2px_10px_rgba(0,0,0,0.06)]'
              : 'bg-[#141417]/55 text-[#F6F1E7] shadow-[0_10px_40px_-10px_rgba(229,23,63,0.25),0_2px_10px_rgba(0,0,0,0.4)]'
          }`}
          style={{
            backdropFilter: isScrolled ? 'blur(18px) saturate(160%)' : 'none',
            WebkitBackdropFilter: isScrolled ? 'blur(18px) saturate(160%)' : 'none',
          }}
        >
          {/* Animated 1px Conic Gradient Border when Scrolled (8s loop) */}
          {isScrolled && (
            <div className="absolute inset-0 pointer-events-none p-[1px] rounded-[inherit] overflow-hidden">
              <div
                className="absolute inset-[-100%] animate-conic-spin opacity-40"
                style={{
                  background:
                    'conic-gradient(from 0deg at 50% 50%, #E5173F 0deg, #FF5A36 120deg, #F7B733 240deg, #E5173F 360deg)',
                }}
              />
              <div
                className={`absolute inset-[1px] rounded-[inherit] ${
                  isLight ? 'bg-[#F6F1EA]/80' : 'bg-[#141417]/80'
                }`}
              />
            </div>
          )}

          {/* 2px Scroll Progress Bar in Brand Gradient running along very bottom edge */}
          {isScrolled && (
            <div className="absolute bottom-0 inset-x-0 h-[2px] bg-white/10 z-30 overflow-hidden rounded-b-[inherit]">
              <div
                className="h-full bg-gradient-to-r from-[#E5173F] via-[#FF5A36] to-[#F7B733] transition-all duration-150 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          {/* INNER CONTENT: 3-Zone Architecture */}
          <div className="relative z-10 w-full flex items-center justify-between gap-4">
            
            {/* ZONE 1 (LEFT): Circular Dish Cult Logo Badge */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={handleLogoClick}
                aria-label="Dish Cult Home"
                className="group relative flex items-center gap-3 p-1 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A36] select-none"
              >
                {/* Outer pulsing glow ring */}
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#E5173F]/30 via-[#FF5A36]/30 to-[#F7B733]/30 blur-sm opacity-60 group-hover:opacity-100 transition-opacity animate-pulse pointer-events-none" />

                {/* Circular Logo Badge */}
                <motion.div
                  animate={{ scale: isScrolled ? 0.88 : 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-[#FF5A36]/50 bg-[#141417] shadow-md flex items-center justify-center group-hover:rotate-8 transition-transform duration-300"
                >
                  <img
                    src="/logo.svg"
                    alt="Dish Cult Logo"
                    className="w-full h-full object-contain p-1"
                  />
                </motion.div>

                {/* Brand Title (hidden on compact viewports) */}
                <div className="hidden sm:flex flex-col text-left">
                  <span
                    className={`font-serif italic text-base sm:text-lg font-semibold tracking-tight transition-colors ${
                      !isScrolled
                        ? 'text-[#F6F1E7] drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]'
                        : isLight
                        ? 'text-[#1A1714]'
                        : 'text-[#F6F1E7]'
                    }`}
                  >
                    Inside the Work
                  </span>
                  <span
                    className={`text-[10px] font-mono uppercase tracking-[0.2em] transition-colors ${
                      !isScrolled
                        ? 'text-white/70'
                        : isLight
                        ? 'text-[#8A7F72]'
                        : 'text-white/60'
                    }`}
                  >
                    Michael David Mayo
                  </span>
                </div>
              </button>
            </div>

            {/* ZONE 2 (CENTRE): Desktop & Tablet Links with sliding glass pill highlight */}
            <div className="hidden lg:flex items-center justify-center flex-1">
              <NavLinks isLight={isLight} condensed={false} />
            </div>

            {/* Tablet Condensed Links (768px-1023px) */}
            <div className="hidden md:flex lg:hidden items-center justify-center flex-1">
              <NavLinks isLight={isLight} condensed={true} />
            </div>

            {/* ZONE 3 (RIGHT): Controls Strip */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              
              {/* Command Search Button ("Search ⌘K" / Ctrl K) */}
              <button
                onClick={() => setIsCommandSearchOpen(true)}
                aria-label="Open Command Search"
                className={`flex items-center gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full border transition-all text-xs font-sans min-h-[44px] min-w-[44px] justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A36] ${
                  !isScrolled
                    ? 'border-white/20 bg-black/25 text-white/90 hover:border-white/40'
                    : isLight
                    ? 'border-black/15 bg-black/5 text-[#1A1714] hover:border-black/30'
                    : 'border-white/15 bg-white/5 text-white/90 hover:border-white/30'
                }`}
              >
                <Search className="w-3.5 h-3.5 opacity-80" />
                <span className="hidden xl:inline text-[11px] font-medium tracking-wide">Search</span>
                <kbd
                  className={`hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono tracking-wider border ${
                    !isScrolled
                      ? 'bg-white/10 border-white/20 text-white/80'
                      : isLight
                      ? 'bg-black/8 border-black/15 text-[#1A1714]/80'
                      : 'bg-white/10 border-white/20 text-white/80'
                  }`}
                >
                  {isMac ? '⌘K' : 'Ctrl K'}
                </kbd>
              </button>

              {/* Favourites Heart Icon with Count */}
              <button
                onClick={() => {
                  const el = document.getElementById('exhibition');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                aria-label={`Favorites (${favorites.length})`}
                className={`relative hidden sm:flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A36] ${
                  !isScrolled
                    ? 'text-white/85 hover:bg-black/25'
                    : isLight
                    ? 'text-[#1A1714] hover:bg-black/8'
                    : 'text-white/85 hover:bg-white/10'
                }`}
              >
                <Heart
                  className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110 ${
                    favorites.length > 0 ? 'text-[#E5173F] fill-[#E5173F]/40' : ''
                  }`}
                />
                {favorites.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#E5173F] text-white text-[9px] font-mono font-bold flex items-center justify-center shadow-sm">
                    {favorites.length}
                  </span>
                )}
              </button>

              {/* Cart Button with animated badge, shake & mini preview */}
              <CartButton isLight={isLight} />

              {/* "Sign in" Text Link with Draw-In Underline */}
              <button
                onClick={() => setIsSignInOpen(true)}
                className={`relative hidden lg:inline-block py-1 text-xs sm:text-sm font-medium tracking-wide group transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A36] ${
                  !isScrolled
                    ? 'text-white/90 hover:text-white'
                    : isLight
                    ? 'text-[#1A1714]/80 hover:text-[#1A1714]'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <span>Sign in</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gradient-to-r from-[#E5173F] to-[#FF5A36] transition-all duration-300 ease-out group-hover:w-full" />
              </button>

              {/* "Book a table" Pill Button with 6s Shine Sweep & Magnetic Cursor Hover */}
              <MagneticButton
                onClick={() => setIsBookingOpen(true)}
                className="hidden sm:flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-full bg-gradient-to-r from-[#E5173F] via-[#FF5A36] to-[#F7B733] text-white text-xs font-sans uppercase tracking-widest font-semibold shadow-[0_4px_16px_rgba(229,23,63,0.35)] hover:shadow-[0_8px_24px_rgba(229,23,63,0.5)] transition-all shrink-0"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Book a table</span>
                <span className="md:hidden">Book</span>

                {/* 6-second light shine sweep */}
                <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none animate-shine-sweep" />
              </MagneticButton>

              {/* Mobile Hamburger: 2 lines that morph smoothly into an X */}
              <button
                ref={hamburgerRef}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Navigation Menu"
                aria-expanded={mobileMenuOpen}
                className={`md:hidden relative w-11 h-11 min-h-[44px] min-w-[44px] rounded-full flex flex-col items-center justify-center gap-1.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A36] ${
                  !isScrolled
                    ? 'bg-black/25 text-white'
                    : isLight
                    ? 'bg-black/8 text-[#1A1714]'
                    : 'bg-white/10 text-white'
                }`}
              >
                <motion.span
                  animate={
                    mobileMenuOpen
                      ? { rotate: 45, y: 5 }
                      : { rotate: 0, y: 0 }
                  }
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="w-5 h-[2px] bg-current rounded-full origin-center"
                />
                <motion.span
                  animate={
                    mobileMenuOpen
                      ? { rotate: -45, y: -3 }
                      : { rotate: 0, y: 0 }
                  }
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="w-5 h-[2px] bg-current rounded-full origin-center"
                />
              </button>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Command Search Overlay (⌘K / Ctrl K) */}
      <CommandSearch
        isOpen={isCommandSearchOpen}
        onClose={() => setIsCommandSearchOpen(false)}
      />

      {/* Mobile Fullscreen Menu with circular clip-path reveal */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        hamburgerRef={hamburgerRef}
      />

      {/* Mobile Bottom Action Bar (past hero) */}
      <MobileBottomBar
        isScrolled={isScrolled}
        isMobileMenuOpen={mobileMenuOpen}
      />

      {/* Sign-in Modal */}
      <SignInModal />

      {/* Booking Widget Modal */}
      <BookingWidgetModal />
    </>
  );
};
