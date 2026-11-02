import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bookmark, Home, Search, Heart, Calendar } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useScrollState } from '../hooks/useScrollState';
import { useCollection } from '../context/CollectionContext';
import { NavLinks } from './NavLinks';
import { CommandSearch } from './CommandSearch';
import { MobileMenu } from './MobileMenu';
import { MobileBottomBar } from './MobileBottomBar';
import { SignInModal } from './SignInModal';
import { BookingWidgetModal } from './BookingWidgetModal';

export const Navbar: React.FC = () => {
  const { isScrolled, isVisible, progress, navTheme } = useScrollState();
  const {
    savedSlugs,
    favorites,
    isDrawerOpen,
    setIsDrawerOpen,
    isCommandSearchOpen,
    setIsCommandSearchOpen,
  } = useCollection();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMac, setIsMac] = useState(true);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

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
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[150] focus:px-4 focus:py-2.5 focus:bg-[#B08D57] focus:text-[#0E0D0C] focus:rounded-[2px] focus:shadow-xl focus:outline-none text-xs font-sans uppercase tracking-widest font-semibold"
      >
        Skip to content
      </a>

      {/* Top subtle dark gradient overlay for State 1 (scrollY < 24px) for legibility */}
      <div
        className={`fixed top-0 left-0 right-0 h-[140px] pointer-events-none z-40 transition-opacity duration-700 ${
          !isScrolled ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'linear-gradient(to bottom, rgba(14, 13, 12, 0.6) 0%, transparent 100%)',
        }}
      />

      {/* Master Navbar Container — Hides on fast scroll-down, reappears on scroll-up */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-out pointer-events-none flex justify-center ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isScrolled ? 'pt-2 sm:pt-3 px-3 sm:px-6' : 'pt-0 px-0'
        }`}
        style={{
          paddingTop: isScrolled
            ? 'max(10px, env(safe-area-inset-top))'
            : 'env(safe-area-inset-top)',
        }}
      >
        {/* Floating Glass Pill Morph Container */}
        <motion.div
          layout
          initial={{ y: -24, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            maxWidth: isScrolled ? '1280px' : '100%',
            borderRadius: isScrolled ? '9999px' : '0px',
          }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 30,
          }}
          className={`relative pointer-events-auto w-full transition-all duration-500 overflow-hidden flex items-center justify-between px-4 sm:px-6 lg:px-10 ${
            /* Height scaling:
               - Phones (<768px): 64px (56px scrolled)
               - Tablet portrait (768–1023px): 72px (64px scrolled)
               - Tablet landscape & up (≥1024px): 88px (68px scrolled)
            */
            isScrolled
              ? 'h-[56px] md:h-[64px] lg:h-[68px]'
              : 'h-[64px] md:h-[72px] lg:h-[88px]'
          } ${
            !isScrolled
              ? 'bg-transparent shadow-none'
              : isLight
              ? 'bg-[#F6F1EA]/80 text-[#1A1714] shadow-[0_12px_35px_-10px_rgba(26,23,20,0.18),0_2px_10px_rgba(26,23,20,0.08)]'
              : 'bg-[#141417]/65 text-[#F6F1E7] shadow-[0_12px_40px_-10px_rgba(0,0,0,0.65),0_2px_10px_rgba(176,141,87,0.15)]'
          }`}
          style={{
            backdropFilter: isScrolled ? 'blur(20px) saturate(160%)' : 'none',
            WebkitBackdropFilter: isScrolled ? 'blur(20px) saturate(160%)' : 'none',
          }}
        >
          {/* Animated 1px Conic Gradient Border when Scrolled */}
          {isScrolled && (
            <div className="absolute inset-0 pointer-events-none p-[1px] rounded-[inherit] overflow-hidden">
              <div
                className="absolute inset-[-100%] animate-conic-spin opacity-40"
                style={{
                  background:
                    'conic-gradient(from 0deg at 50% 50%, #B08D57 0deg, #E5173F 90deg, #FF5A36 180deg, #F7B733 270deg, #B08D57 360deg)',
                }}
              />
              <div
                className={`absolute inset-[1px] rounded-[inherit] ${
                  isLight ? 'bg-[#F6F1EA]/85' : 'bg-[#141417]/85'
                }`}
              />
            </div>
          )}

          {/* 2px Scroll Progress Bar running along very bottom edge */}
          {isScrolled && (
            <div className="absolute bottom-0 inset-x-0 h-[2px] bg-white/10 z-30 overflow-hidden rounded-b-[inherit]">
              <div
                className="h-full bg-gradient-to-r from-[#B08D57] via-[#FF5A36] to-[#F7B733] transition-all duration-150 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          {/* INNER CONTENT: 3-Zone Architecture */}
          <div className="relative z-10 w-full flex items-center justify-between gap-4">
            
            {/* ZONE 1 (LEFT):
                - Phones: Monogram "MDM"
                - Tablet portrait & up: Monogram + artist name
            */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={handleLogoClick}
                aria-label="Michael David Mayo Home"
                className="group relative flex items-center gap-3 p-1 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B08D57] select-none min-h-[48px] min-w-[48px]"
              >
                {/* Monogram Box Badge */}
                <motion.div
                  animate={{ scale: isScrolled ? 0.9 : 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-[2px] border flex items-center justify-center font-serif text-sm sm:text-base font-semibold tracking-wider transition-all duration-300 ${
                    !isScrolled
                      ? 'border-[#B08D57]/60 text-[#F6F1E7] bg-black/30 group-hover:border-[#B08D57]'
                      : isLight
                      ? 'border-[#1A1714]/30 text-[#1A1714] bg-black/5 group-hover:border-[#B08D57]'
                      : 'border-[#B08D57]/50 text-[#F6F1E7] bg-white/5 group-hover:border-[#B08D57]'
                  }`}
                >
                  <span className="font-serif italic text-[#B08D57]">MDM</span>
                </motion.div>

                {/* Artist Name: Visible on Tablet Portrait and up (>=768px), hidden on phones */}
                <div className="hidden md:flex flex-col text-left">
                  <span
                    className={`font-serif italic text-base sm:text-lg font-semibold tracking-tight transition-colors ${
                      !isScrolled
                        ? 'text-[#F6F1E7] drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]'
                        : isLight
                        ? 'text-[#1A1714]'
                        : 'text-[#F6F1E7]'
                    }`}
                  >
                    Michael David Mayo
                  </span>
                  <span
                    className={`text-[10px] font-mono uppercase tracking-[0.2em] transition-colors ${
                      !isScrolled
                        ? 'text-[#B08D57]'
                        : isLight
                        ? 'text-[#8A7F72]'
                        : 'text-[#B08D57]'
                    }`}
                  >
                    Art Miami 2026 · Booth P-214
                  </span>
                </div>
              </button>
            </div>

            {/* ZONE 2 (CENTRE):
                - Phones & Tablet Portrait (<1024px): Hidden
                - Tablet Landscape & Desktop (≥1024px): Full layout with 4 centered links & sliding gold underline
            */}
            <div className="hidden lg:flex items-center justify-center flex-1">
              <NavLinks isLight={isLight} condensed={false} />
            </div>

            {/* ZONE 3 (RIGHT): Controls Strip */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              
              {/* Command Search button (Desktop & Laptop) */}
              <button
                onClick={() => setIsCommandSearchOpen(true)}
                aria-label="Open Command Search"
                className={`hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all text-xs font-sans min-h-[44px] justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B08D57] ${
                  !isScrolled
                    ? 'border-white/20 bg-black/30 text-white/90 hover:border-[#B08D57]'
                    : isLight
                    ? 'border-black/15 bg-black/5 text-[#1A1714] hover:border-[#B08D57]'
                    : 'border-white/15 bg-white/5 text-white/90 hover:border-[#B08D57]'
                }`}
              >
                <Search className="w-3.5 h-3.5 text-[#B08D57]" />
                <span className="text-[11px] font-medium tracking-wider uppercase">Search</span>
                <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono tracking-wider border border-white/20 bg-white/10">
                  {isMac ? '⌘K' : 'Ctrl K'}
                </kbd>
              </button>

              {/* Home Icon button (Desktop only >=1024px) */}
              <button
                onClick={handleLogoClick}
                aria-label="Return to Welcome Screen"
                title="Return to Welcome"
                className={`hidden lg:flex items-center justify-center w-10 h-10 rounded-full border transition-colors min-h-[48px] min-w-[48px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B08D57] ${
                  !isScrolled
                    ? 'border-white/20 text-[#F6F1E7] hover:border-[#B08D57]'
                    : isLight
                    ? 'border-[#1A1714]/20 text-[#1A1714] hover:border-[#B08D57]'
                    : 'border-white/20 text-[#F6F1E7] hover:border-[#B08D57]'
                }`}
              >
                <Home className="w-4 h-4" />
              </button>

              {/* Collector's Selection Button with animated count badge:
                  - Phones: Icon only with badge (min 48×48px)
                  - Tablets & Desktop: Label + count badge (min 48×48px)
              */}
              <button
                onClick={() => setIsDrawerOpen(true)}
                aria-label={`Open Collector's Selection (${savedSlugs.length} works)`}
                className={`relative flex items-center gap-2.5 px-3 sm:px-4 py-2 rounded-full border transition-all duration-300 min-h-[48px] min-w-[48px] justify-center text-xs font-sans tracking-widest uppercase focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B08D57] ${
                  savedSlugs.length > 0
                    ? 'border-[#B08D57] bg-[#B08D57]/20 text-[#B08D57] font-semibold'
                    : !isScrolled
                    ? 'border-white/25 text-[#F6F1E7] hover:border-[#B08D57]'
                    : isLight
                    ? 'border-[#1A1714]/20 text-[#1A1714] hover:border-[#B08D57]'
                    : 'border-white/25 text-[#F6F1E7] hover:border-[#B08D57]'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${savedSlugs.length > 0 ? 'text-[#B08D57] fill-[#B08D57]/30' : ''}`} />
                <span className="hidden md:inline">Selection</span>
                
                {/* Count Badge */}
                <span className="min-w-[20px] h-[20px] px-1 rounded-full bg-[#B08D57] text-[#0E0D0C] font-mono text-[10px] font-bold flex items-center justify-center tabular-nums">
                  {savedSlugs.length}
                </span>
              </button>

              {/* Hamburger Button (Phones & Tablet Portrait < 1024px) */}
              <button
                ref={hamburgerRef}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Exhibition Menu"
                aria-expanded={mobileMenuOpen}
                className={`lg:hidden relative w-11 h-11 min-h-[48px] min-w-[48px] rounded-full flex flex-col items-center justify-center gap-1.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B08D57] ${
                  !isScrolled
                    ? 'bg-black/35 text-[#F6F1E7] border border-white/20'
                    : isLight
                    ? 'bg-black/8 text-[#1A1714] border border-[#1A1714]/15'
                    : 'bg-white/10 text-[#F6F1E7] border border-white/20'
                }`}
              >
                <motion.span
                  animate={mobileMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-5 h-[2px] bg-current rounded-full origin-center"
                />
                <motion.span
                  animate={mobileMenuOpen ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-5 h-[2px] bg-current rounded-full origin-center"
                />
              </button>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Command Search Overlay */}
      <CommandSearch
        isOpen={isCommandSearchOpen}
        onClose={() => setIsCommandSearchOpen(false)}
      />

      {/* Mobile & Tablet Fullscreen Menu Overlay */}
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
