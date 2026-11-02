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
  { index: '01', label: 'Exhibition', href: '#exhibition' },
  { index: '02', label: 'Creative Process', href: '#process' },
  { index: '03', label: 'About The Artist', href: '#artist' },
  { index: '04', label: 'Philosophy & Films', href: '#philosophy' },
];

const cityChips = ['Miami (Booth P-214)', 'New York (Hudson Valley)', 'Zurich (Galerie Von Berg)', 'Venice Biennale', 'London (White Cube)'];

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
            clipPath: 'circle(0px at calc(100% - 40px) 40px)',
            opacity: 0,
          }}
          animate={{
            clipPath: 'circle(150% at calc(100% - 40px) 40px)',
            opacity: 1,
          }}
          exit={{
            clipPath: 'circle(0px at calc(100% - 40px) 40px)',
            opacity: 0,
          }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[105] h-[100dvh] max-h-[100dvh] bg-[#0E0D0C] text-[#F6F1E7] flex flex-col justify-between p-6 sm:p-10 pt-safe-top pb-safe-bottom overflow-y-auto film-grain select-none"
        >
          {/* Ambient ember glow */}
          <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-[#B08D57]/15 blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 left-1/4 w-72 h-72 rounded-full bg-[#E5173F]/12 blur-3xl pointer-events-none" />

          {/* Top Bar with Brand Badge & 48px Close Button */}
          <div className="relative z-10 flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[2px] border border-[#B08D57]/50 p-1 flex items-center justify-center bg-[#141417]">
                <span className="font-serif italic text-base text-[#B08D57]">MDM</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif italic text-base sm:text-lg text-white">Inside the Work</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#B08D57]">
                  Michael David Mayo · Art Miami
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Close menu"
              className="w-12 h-12 min-h-[48px] min-w-[48px] rounded-full bg-white/5 hover:bg-white/10 border border-white/15 flex items-center justify-center text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B08D57]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Large Staggered Editorial Serif Links:
              - In portrait: single column stack
              - In landscape phones: 2 columns so links never overflow vertically!
          */}
          <nav className="relative z-10 my-auto py-6 grid grid-cols-1 landscape:max-sm:grid-cols-2 gap-3 sm:gap-4">
            {mobileLinks.map((link, idx) => (
              <motion.div
                key={link.index}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 + idx * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <a
                  href={link.href}
                  onClick={e => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className="group flex items-baseline gap-4 py-2 border-b border-white/10 active:bg-[#B08D57]/15 transition-all rounded-lg px-2"
                >
                  <span className="font-mono text-xs text-[#B08D57] tracking-widest font-semibold shrink-0">
                    {link.index}
                  </span>
                  <span
                    className="font-serif italic text-white group-hover:text-[#B08D57] transition-colors leading-tight"
                    style={{ fontSize: 'clamp(1.75rem, 6vw, 3.75rem)' }}
                  >
                    {link.label}
                  </span>
                  <ArrowRight className="w-4 h-4 ml-auto text-white/30 group-hover:text-[#B08D57] group-hover:translate-x-1 transition-all shrink-0" />
                </a>
              </motion.div>
            ))}
          </nav>

          {/* Bottom Controls Area */}
          <div className="relative z-10 space-y-4 pt-4 border-t border-white/10 shrink-0">
            {/* Horizontal Swipeable Row of City Chips */}
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8A7F72] block mb-2">
                Exhibition Pavilions & Provenance
              </span>
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                {cityChips.map(c => (
                  <button
                    key={c}
                    onClick={() => handleLinkClick('#exhibition')}
                    className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-sans whitespace-nowrap text-white/80 hover:text-white hover:border-[#B08D57] transition-colors min-h-[44px]"
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Private Viewing & Sign in Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                onClick={() => {
                  onClose();
                  setIsBookingOpen(true);
                }}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#B08D57] to-[#C49E65] text-[#0E0D0C] text-xs font-sans uppercase tracking-widest font-semibold shadow-md flex items-center justify-center gap-2 min-h-[48px]"
              >
                <Calendar className="w-4 h-4" />
                <span>Request Private Viewing</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  setIsSignInOpen(true);
                }}
                className="w-full py-3.5 rounded-full bg-white/5 border border-white/15 text-white/85 text-xs font-sans uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center justify-center gap-2 min-h-[48px]"
              >
                <User className="w-4 h-4 text-[#B08D57]" />
                <span>Collector Portal Sign In</span>
              </button>
            </div>

            {/* Footer Notice */}
            <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs text-[#8A7F72]">
              <div className="flex items-center gap-2 text-[11px] font-mono">
                <Smartphone className="w-3.5 h-3.5 text-[#B08D57]" />
                <span>Pedestal Touchscreen Kiosk · Miami</span>
              </div>

              <div className="flex items-center gap-4 text-white/60">
                <a href="#welcome" aria-label="Instagram" className="hover:text-[#B08D57] transition-colors p-1">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#welcome" aria-label="Twitter" className="hover:text-[#B08D57] transition-colors p-1">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#welcome" aria-label="Website" className="hover:text-[#B08D57] transition-colors p-1">
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
