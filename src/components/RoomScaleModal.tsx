import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Ruler } from 'lucide-react';
import { Artwork } from '../data/artworks';
import { GenerativePainting } from './GenerativePainting';

interface RoomScaleModalProps {
  artwork: Artwork | null;
  isOpen: boolean;
  onClose: () => void;
}

export const RoomScaleModal: React.FC<RoomScaleModalProps> = ({
  artwork,
  isOpen,
  onClose,
}) => {
  if (!artwork) return null;

  // Real world height comparison:
  // Ceiling height: ~360 cm (12 ft contemporary gallery)
  // Person height: 180 cm (approx 5'11" standing silhouette)
  // Painting height: artwork.scaleHeightCm (e.g. 198 cm for Entanglement in Gold)
  // Scale calculations relative to gallery wall height (360cm)
  const wallHeightCm = 360;
  const personHeightPct = (180 / wallHeightCm) * 100; // ~50% of wall height
  const paintingHeightPct = (artwork.scaleHeightCm / wallHeightCm) * 100;
  const paintingWidthPct = (artwork.scaleWidthCm / wallHeightCm) * 100;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[85] flex items-center justify-center p-4 sm:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-5xl bg-[#EBE5DB] text-[#1A1714] rounded-[2px] shadow-2xl overflow-hidden z-10 flex flex-col paper-texture"
          >
            {/* Header */}
            <div className="p-5 sm:p-6 bg-[#DFD7C9] border-b border-[#1A1714]/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-sm bg-[#B08D57]/20 border border-[#B08D57]/40 flex items-center justify-center text-[#B08D57]">
                  <Ruler className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#8A7F72] block">
                    Architectural Scale Simulation
                  </span>
                  <h3 className="font-serif italic text-xl text-[#1A1714]">
                    {artwork.title} in Contemporary Gallery Space
                  </h3>
                </div>
              </div>

              <button
                onClick={onClose}
                aria-label="Close Room Scale"
                className="w-9 h-9 rounded-sm border border-[#1A1714]/15 flex items-center justify-center hover:bg-[#1A1714]/5 text-[#1A1714]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Gallery Room Viewport */}
            <div className="relative h-[480px] sm:h-[540px] bg-[#F2EDE4] overflow-hidden flex flex-col justify-end">
              {/* Ceiling Downlight Beams */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-full pointer-events-none radial-spotlight opacity-70" />
              
              {/* Gallery Track Lighting Fixture */}
              <div className="absolute top-4 left-0 right-0 h-1 bg-[#1A1714]/20 flex justify-around px-20">
                <div className="w-3 h-2 bg-[#1A1714] rounded-b-sm" />
                <div className="w-3 h-2 bg-[#1A1714] rounded-b-sm" />
                <div className="w-3 h-2 bg-[#1A1714] rounded-b-sm" />
              </div>

              {/* Museum Baseboard / Floor Line */}
              <div className="relative w-full h-16 bg-[#DDD4C5] border-t-2 border-[#1A1714]/15 shadow-inner flex items-center justify-between px-8 text-[11px] text-[#8A7F72] font-mono">
                <span>Gallery Finished Floor Level (FFL ±0.00)</span>
                <span>Ceiling Clearance: 3.60 m (11.8 ft)</span>
              </div>

              {/* Architectural Scale Elements Container */}
              <div className="absolute inset-x-0 bottom-16 top-16 flex items-end justify-center gap-12 sm:gap-20 px-8">
                
                {/* 1. Collector Silhouette (6 ft / 180 cm tall) */}
                <div
                  className="relative flex flex-col items-center shrink-0"
                  style={{ height: `${personHeightPct}%` }}
                >
                  {/* Human Figure SVG Silhouette */}
                  <svg
                    viewBox="0 0 100 240"
                    className="h-full w-auto fill-[#2A2622] opacity-85 drop-shadow-md"
                  >
                    {/* Head */}
                    <circle cx="50" cy="22" r="16" />
                    {/* Neck */}
                    <rect x="46" y="38" width="8" height="8" />
                    {/* Torso & Coat */}
                    <path d="M 28 46 L 72 46 L 76 130 L 24 130 Z" />
                    {/* Legs */}
                    <rect x="34" y="130" width="12" height="100" rx="3" />
                    <rect x="54" y="130" width="12" height="100" rx="3" />
                  </svg>

                  {/* Height Callout */}
                  <div className="absolute -left-12 sm:-left-16 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[10px] text-[#8A7F72] font-mono whitespace-nowrap rotate-[-90deg]">
                    <span>180 cm / 5'11"</span>
                  </div>
                </div>

                {/* 2. Framed Artwork hung at standard museum eye-line (center ~155cm off floor) */}
                <div
                  className="relative flex flex-col items-center"
                  style={{
                    height: `${paintingHeightPct}%`,
                    width: `${paintingWidthPct}%`,
                    maxWidth: '420px',
                    marginBottom: '10%', // hung above floor
                  }}
                >
                  <div className="w-full h-full shadow-[0_20px_40px_rgba(0,0,0,0.35)]">
                    <GenerativePainting
                      seed={artwork.seed}
                      palette={artwork.palette}
                      stage={3}
                      aspectRatio={artwork.aspectRatio}
                      framed={true}
                      frameStyle="dark-ash"
                    />
                  </div>

                  {/* Dimension Annotations */}
                  <div className="absolute -bottom-7 inset-x-0 flex items-center justify-center text-[10px] text-[#B08D57] font-mono whitespace-nowrap">
                    <span>{artwork.dimensions.cm} ({artwork.dimensions.inches})</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar Info */}
            <div className="p-4 sm:p-5 bg-[#E2DBD0] border-t border-[#1A1714]/10 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-4 text-[#8A7F72]">
                <span>Art Miami 2026 Pedestal Viewer</span>
                <span>·</span>
                <span>Proportional Spatial Modeling</span>
              </div>
              <div className="text-[#1A1714] font-medium font-serif italic text-sm">
                Curatorial standard hanging elevation: 155 cm (61 in) to canvas centerline
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
