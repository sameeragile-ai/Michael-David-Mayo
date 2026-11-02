import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowDown, Sparkles } from 'lucide-react';
import { artworksData } from '../data/artworks';
import { GenerativePainting } from './GenerativePainting';
import { useCollection } from '../context/CollectionContext';
import { exhibitionConfig } from '../data/config';

interface WelcomeSectionProps {
  onEnter: () => void;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({ onEnter }) => {
  const { featuredSlug } = useCollection();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Montage artworks (curated selection of 4 works including featured)
  const montageArtworks = React.useMemo(() => {
    const featured = artworksData.find(a => a.slug === featuredSlug) || artworksData[0];
    const others = artworksData.filter(a => a.slug !== featured.slug).slice(0, 3);
    return [featured, ...others];
  }, [featuredSlug]);

  // Silent looping Ken Burns montage every 6.5s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex(prev => (prev + 1) % montageArtworks.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [montageArtworks.length]);

  const activeArtwork = montageArtworks[currentSlideIndex];

  return (
    <section
      id="welcome"
      data-nav-theme="dark"
      onClick={onEnter}
      className="relative w-full h-screen min-h-[700px] bg-[#0E0D0C] text-[#F6F1E7] overflow-hidden flex flex-col justify-between cursor-pointer select-none film-grain"
    >
      {/* Background Montage Crossfade with Ken Burns Scale Drift */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.div
            key={activeArtwork.id}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 0.38, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex items-center justify-center p-8 sm:p-20"
          >
            <div className="w-full max-w-4xl h-full flex items-center justify-center">
              <GenerativePainting
                seed={activeArtwork.seed}
                palette={activeArtwork.palette}
                stage={3}
                aspectRatio={activeArtwork.aspectRatio}
                framed={false}
                className="w-full h-full max-h-[85vh] filter brightness-90 contrast-110"
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Cinematic Vignette & Radial Gold Glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E0D0C] via-transparent to-[#0E0D0C]/80" />
        <div className="absolute inset-0 bg-radial-[circle_at_center_rgba(0,0,0,0)_0%,rgba(14,13,12,0.85)_80%]" />
        <div className="absolute inset-0 radial-gold-glow pointer-events-none opacity-60" />
      </div>

      {/* Top Header Placeholder spacing (under top nav) */}
      <div className="pt-24 sm:pt-28 px-6 sm:px-12 relative z-20 flex justify-between items-start">
        <div className="flex items-center gap-2.5 text-xs font-sans uppercase tracking-[0.25em] text-[#B08D57]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B08D57]" />
          <span>Art Miami · Pedestal Installation</span>
        </div>

        <div className="text-right text-[11px] font-sans tracking-widest uppercase text-[#8A7F72]">
          {exhibitionConfig.boothLocation}
        </div>
      </div>

      {/* Hero Title & Typography Anchor */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center my-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="inline-flex items-center gap-3 text-xs sm:text-sm font-sans uppercase tracking-[0.3em] text-[#B08D57] mb-6"
        >
          <span>Exhibition Monograph</span>
          <span className="w-1 h-1 rounded-full bg-[#B08D57]" />
          <span>December 2026</span>
        </motion.div>

        {/* Huge Italic Serif Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif italic text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#F6F1E7] tracking-tight leading-[0.95] drop-shadow-lg"
          style={{ textWrap: 'balance' }}
        >
          Inside the Work
        </motion.h1>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55 }}
          className="mt-6 sm:mt-8 font-sans text-sm sm:text-lg md:text-xl text-[#F6F1E7]/80 tracking-[0.15em] uppercase font-light"
        >
          Michael David Mayo — New Paintings
        </motion.p>

        {/* Curatorial preview kicker */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.65 }}
          transition={{ duration: 1, delay: 0.75 }}
          className="mt-4 font-serif italic text-xs sm:text-base text-[#8A7F72] max-w-xl mx-auto"
        >
          Ten monumental canvases exploring quantum wave collapse, mineral alchemy, and the observer condition.
        </motion.p>
      </div>

      {/* Bottom Bar: Touch to Explore Prompt & Active Slide Indicators */}
      <div className="relative z-20 pb-8 sm:pb-12 px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Active Montage Indicator */}
        <div className="flex items-center gap-3 text-[11px] font-mono text-[#8A7F72]">
          <span>MONTAGE</span>
          <div className="flex items-center gap-1.5">
            {montageArtworks.map((_, i) => (
              <span
                key={i}
                className={`h-[1.5px] transition-all duration-700 ${
                  i === currentSlideIndex ? 'w-6 bg-[#B08D57]' : 'w-2 bg-white/20'
                }`}
              />
            ))}
          </div>
          <span className="text-[#F6F1E7]/70 truncate max-w-[140px] sm:max-w-[200px]">
            {activeArtwork.title}
          </span>
        </div>

        {/* Pulsing Touch to Explore Prompt */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/15 backdrop-blur-md hover:border-[#B08D57] transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-[#B08D57] animate-pulse" />
          <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#F6F1E7] font-medium">
            Touch to Explore Exhibition
          </span>
          <ArrowDown className="w-3.5 h-3.5 text-[#B08D57]" />
        </motion.div>

        {/* Pedestal Device spec */}
        <div className="hidden sm:block text-right text-[11px] font-mono text-[#8A7F72]">
          <span>PEDESTAL 01 · 13" LANDSCAPE</span>
        </div>
      </div>
    </section>
  );
};
