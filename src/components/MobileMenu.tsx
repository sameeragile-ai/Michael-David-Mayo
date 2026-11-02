import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, Instagram, Twitter, Globe, Smartphone, Calendar, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCollection } from '../context/CollectionContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  hamburgerRef: React.RefObject<HTMLButtonElement | null>;
}

const mobileLinks = [
  { index: '01', label: 'Explore', href: '#exhibition' },
  { index: '02', label: 'Cities & Fairs', href: '#exhibition' },
  { index: '03', label: 'Experiences', href: '#process' },
  { index: '04', label: 'The Artist', href: '#artist' },
  { index: '05', label: 'Philosophy', href: '#philosophy' },
];

const cityChips = ['Miami', 'New York', 'Zurich', 'London', 'Paris', 'Venice', 'Tokyo', 'Berlin'];

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, hamburgerRef }) => {
  const { setIsBookingOpen, setIsSignInOpen } = useCollection();
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
      hamburgerRef.current?.focus();
    }
  }, [isOpen, onClose, hamburgerRef]);

  const handleLinkClick = (href: string) => {
    onClose();
    if (location.pathname !== '/') {
      navigate('/' + href);
      return;
    }
    const targetId = href.replace('#', '');
    const el = document.getElementById(targetId);
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 300);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          initial={{
            clipPath: 'circle(0px at calc(100% - 38px) 38px)',
            opacity: 0,
          }}
          animate={{
            clipPath: 'circle(150% at calc(100% - 38px) 38px)',
            opacity: 1,
          }}
          exit={{
            clipPath: 'circle(0px at calc(100% - 38px) 38px)',
            opacity: 0,
          }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[105] bg-[#0E0D0C] text-[#F6F1E7] flex flex-col justify-between p-6 pt-safe-top pb-safe-bottom overflow-y-auto film-grain select-none"
        >
          {/* Slow-moving ember radial glow */}
          <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-[#E5173F]/15 blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 left-1/4 w-72 h-72 rounded-full bg-[#FF5A36]/15 blur-3xl pointer-events-none" />

          {/* Top Bar with Brand Badge & Close X */}
          <div className="relative z-10 flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-[#FF5A36]/40 p-0.5 bg-[#141417]">
                <img src="/logo.svg" alt="Dish Cult" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif italic text-base text-white">Inside the Work</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#FF5A36]">
                  Art Miami 2026
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Close menu"
              className="w-11 h-11 min-h-[44px] min-w-[44px] rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Large Staggered Editorial Serif Links (~40px) */}
          <nav className="relative z-10 my-auto py-6 space-y-4">
            {mobileLinks.map((link, idx) => (
              <motion.div
                key={link.index}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.12 + idx * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <a
                  href={link.href}
                  onClick={e => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className="group flex items-baseline gap-4 py-2 border-b border-white/5 active:bg-gradient-to-r active:from-[#E5173F]/20 active:to-transparent transition-all rounded-lg px-2"
                >
                  <span className="font-mono text-xs text-[#FF5A36] tracking-widest font-semibold">
                    {link.index}
                  </span>
                  <span className="font-serif italic text-3xl sm:text-4xl text-white group-hover:text-[#FF5A36] transition-colors">
                    {link.label}
                  </span>
                  <ArrowRight className="w-4 h-4 ml-auto text-white/30 group-hover:text-[#FF5A36] group-hover:translate-x-1 transition-all" />
                </a>
              </motion.div>
            ))}
          </nav>

          {/* Bottom Controls Area */}
          <div className="relative z-10 space-y-5 pt-4 border-t border-white/10">
            {/* Horizontal Swipeable Row of City Chips */}
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 block mb-2">
                Destinations & Pavilions
              </span>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                {cityChips.map(c => (
                  <button
                    key={c}
                    onClick={() => handleLinkClick('#exhibition')}
                    className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-sans whitespace-nowrap text-white/80 hover:text-white hover:border-[#FF5A36]/60 transition-colors"
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Sign in & Full-Width Book button */}
            <div className="space-y-2.5">
              <button
                onClick={() => {
                  onClose();
                  setIsBookingOpen(true);
                }}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#E5173F] via-[#FF5A36] to-[#F7B733] text-white text-xs font-sans uppercase tracking-widest font-semibold shadow-[0_10px_25px_rgba(229,23,63,0.4)] flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Table & Viewing</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  setIsSignInOpen(true);
                }}
                className="w-full py-3 rounded-full bg-white/5 border border-white/10 text-white/80 text-xs font-sans uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4 text-[#FF5A36]" />
                <span>Sign in to Patron Registry</span>
              </button>
            </div>

            {/* App Store / Google Play badges and Social Icons */}
            <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs text-white/40">
              <div className="flex items-center gap-2 text-[11px] font-mono">
                <Smartphone className="w-3.5 h-3.5 text-[#F7B733]" />
                <span>iOS App & PWA Active</span>
              </div>

              <div className="flex items-center gap-4 text-white/60">
                <a href="#welcome" aria-label="Instagram" className="hover:text-[#FF5A36] transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#welcome" aria-label="Twitter" className="hover:text-[#FF5A36] transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#welcome" aria-label="Website" className="hover:text-[#FF5A36] transition-colors">
                  <Globe className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
