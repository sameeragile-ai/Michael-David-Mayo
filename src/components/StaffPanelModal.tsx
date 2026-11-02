import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sliders, Eye, EyeOff, Clock, Wifi, RotateCcw, Check, Sparkles, Smartphone } from 'lucide-react';
import { useCollection } from '../context/CollectionContext';
import { artworksData } from '../data/artworks';

export const StaffPanelModal: React.FC = () => {
  const {
    isStaffOpen,
    setIsStaffOpen,
    pricesVisible,
    togglePricesVisible,
    idleTimeoutSeconds,
    setIdleTimeoutSeconds,
    featuredSlug,
    setFeaturedSlug,
    clearCollection,
  } = useCollection();

  const timeoutOptions = [
    { label: '30s', value: 30 },
    { label: '60s', value: 60 },
    { label: '90s (Default)', value: 90 },
    { label: '180s', value: 180 },
    { label: 'Disabled (Never Reset)', value: 0 },
  ];

  const handleResetKiosk = () => {
    if (confirm("Reset kiosk to factory exhibition state? This will clear saved selections and reload.")) {
      clearCollection();
      window.location.href = '/';
    }
  };

  return (
    <AnimatePresence>
      {isStaffOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsStaffOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            className="relative w-full max-w-lg bg-[#141210] border border-[#B08D57]/30 text-[#F6F1E7] p-6 sm:p-8 shadow-2xl rounded-[2px] z-10 select-none film-grain"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-5 border-b border-[#F6F1E7]/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-sm bg-[#B08D57]/20 border border-[#B08D57]/50 flex items-center justify-center text-[#B08D57]">
                  <Sliders className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] block">
                    Curatorial Operations
                  </span>
                  <h3 className="font-serif italic text-xl text-[#F6F1E7]">
                    Booth Kiosk & Fair Settings
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setIsStaffOpen(false)}
                className="w-9 h-9 rounded-sm border border-[#F6F1E7]/20 flex items-center justify-center hover:bg-white/10 transition-colors"
                aria-label="Close Staff Panel"
              >
                <X className="w-4 h-4 text-[#F6F1E7]" />
              </button>
            </div>

            {/* Settings Body */}
            <div className="py-6 space-y-6">
              {/* Setting 1: Price Visibility */}
              <div className="p-4 bg-white/[0.03] border border-[#F6F1E7]/10 rounded-[2px] flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    {pricesVisible ? (
                      <Eye className="w-4 h-4 text-[#B08D57]" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-[#8A7F72]" />
                    )}
                    <span className="text-sm font-sans font-medium">Artwork Valuations</span>
                  </div>
                  <p className="text-xs text-[#8A7F72] mt-1">
                    {pricesVisible
                      ? 'Prices visible on cards, details, and dossiers.'
                      : 'Prices hidden (displayed as "Price on Request").'}
                  </p>
                </div>

                <button
                  onClick={togglePricesVisible}
                  className={`px-3 py-1.5 rounded-sm text-xs font-sans tracking-wider uppercase border transition-colors ${
                    pricesVisible
                      ? 'bg-[#B08D57]/20 border-[#B08D57] text-[#B08D57]'
                      : 'bg-white/5 border-white/20 text-[#8A7F72]'
                  }`}
                >
                  {pricesVisible ? 'Visible' : 'Hidden'}
                </button>
              </div>

              {/* Setting 2: Idle Timeout */}
              <div className="p-4 bg-white/[0.03] border border-[#F6F1E7]/10 rounded-[2px]">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#B08D57]" />
                    <span className="text-sm font-sans font-medium">Pedestal Idle Auto-Reset</span>
                  </div>
                  <span className="text-xs text-[#B08D57] font-mono">
                    {idleTimeoutSeconds === 0 ? 'Disabled' : `${idleTimeoutSeconds}s`}
                  </span>
                </div>

                <p className="text-xs text-[#8A7F72] mb-3">
                  Duration before kiosk prompts a 10s countdown and returns to the Welcome screen.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {timeoutOptions.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => setIdleTimeoutSeconds(opt.value)}
                      className={`px-2.5 py-1.5 text-xs rounded-sm border transition-all text-left ${
                        idleTimeoutSeconds === opt.value
                          ? 'bg-[#B08D57] border-[#B08D57] text-[#0E0D0C] font-semibold'
                          : 'bg-white/5 border-white/10 text-[#F6F1E7]/70 hover:border-white/30'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Setting 3: Featured Artwork for Montage */}
              <div className="p-4 bg-white/[0.03] border border-[#F6F1E7]/10 rounded-[2px]">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-[#B08D57]" />
                  <span className="text-sm font-sans font-medium">Featured Exhibition Centerpiece</span>
                </div>
                <p className="text-xs text-[#8A7F72] mb-3">
                  Anchors the welcome screen montage and primary gallery wall lead.
                </p>

                <select
                  value={featuredSlug}
                  onChange={e => setFeaturedSlug(e.target.value)}
                  className="w-full bg-[#1C1A17] border border-[#F6F1E7]/20 rounded-sm px-3 py-2 text-xs text-[#F6F1E7] focus:outline-none focus:border-[#B08D57]"
                >
                  {artworksData.map(art => (
                    <option key={art.slug} value={art.slug}>
                      {art.number}. {art.title} ({art.year}) — {art.availability}
                    </option>
                  ))}
                </select>
              </div>

              {/* Setting 4: PWA Offline & Hardware Status */}
              <div className="p-4 bg-white/[0.03] border border-[#F6F1E7]/10 rounded-[2px] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
                    <Wifi className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-sans font-semibold text-[#F6F1E7] block">
                      Offline Mode Available
                    </span>
                    <span className="text-[11px] text-[#8A7F72]">
                      Full procedural artworks & CMS cached via Service Worker
                    </span>
                  </div>
                </div>

                <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800">
                  Ready
                </span>
              </div>
            </div>

            {/* Footer with Reset and Close */}
            <div className="pt-4 border-t border-[#F6F1E7]/10 flex items-center justify-between">
              <button
                onClick={handleResetKiosk}
                className="flex items-center gap-1.5 text-xs text-red-400/80 hover:text-red-300 transition-colors uppercase tracking-wider"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Kiosk</span>
              </button>

              <button
                onClick={() => setIsStaffOpen(false)}
                className="bg-[#B08D57] hover:bg-[#C49E65] text-[#0E0D0C] px-5 py-2 rounded-sm text-xs font-sans tracking-[0.16em] uppercase font-semibold transition-colors flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save & Return</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
