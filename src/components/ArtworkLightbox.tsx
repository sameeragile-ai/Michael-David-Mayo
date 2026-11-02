import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ZoomIn, ZoomOut, RotateCcw, Info } from 'lucide-react';
import { Artwork } from '../data/artworks';
import { GenerativePainting } from './GenerativePainting';

interface ArtworkLightboxProps {
  artwork: Artwork | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ArtworkLightbox: React.FC<ArtworkLightboxProps> = ({
  artwork,
  isOpen,
  onClose,
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showMetadata, setShowMetadata] = useState(true);

  if (!artwork) return null;

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel(prev => Math.min(3.5, prev + 0.5));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel(prev => Math.max(1, prev - 0.5));
  };

  const handleResetZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel(1);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[85] bg-[#0A0908] text-[#F6F1E7] flex flex-col justify-between overflow-hidden select-none film-grain"
        >
          {/* Top Bar */}
          <div className="p-4 sm:p-6 flex items-center justify-between border-b border-white/10 z-20 bg-black/40 backdrop-blur-md">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] block">
                Surface Micro-Inspection · {artwork.number}
              </span>
              <h3 className="font-serif italic text-xl sm:text-2xl text-[#F6F1E7]">
                {artwork.title}
              </h3>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              {/* Zoom Controls */}
              <div className="flex items-center bg-white/10 border border-white/15 rounded-sm p-0.5">
                <button
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 1}
                  aria-label="Zoom out"
                  className="w-9 h-9 flex items-center justify-center hover:bg-white/10 rounded-sm disabled:opacity-30 transition-colors"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="px-2 text-xs font-mono tabular-nums text-[#B08D57]">
                  {zoomLevel.toFixed(1)}×
                </span>
                <button
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 3.5}
                  aria-label="Zoom in"
                  className="w-9 h-9 flex items-center justify-center hover:bg-white/10 rounded-sm disabled:opacity-30 transition-colors"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>

              {zoomLevel > 1 && (
                <button
                  onClick={handleResetZoom}
                  aria-label="Reset zoom"
                  className="w-9 h-9 border border-white/15 rounded-sm flex items-center justify-center hover:bg-white/10"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={() => setShowMetadata(!showMetadata)}
                aria-label="Toggle details"
                className={`w-9 h-9 border rounded-sm flex items-center justify-center transition-colors ${
                  showMetadata ? 'border-[#B08D57] text-[#B08D57]' : 'border-white/15 text-white/70'
                }`}
              >
                <Info className="w-4 h-4" />
              </button>

              <button
                onClick={onClose}
                aria-label="Close Lightbox"
                className="w-9 h-9 border border-white/20 rounded-sm flex items-center justify-center hover:bg-white/10 text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Inspection Canvas */}
          <div
            className="flex-1 overflow-auto flex items-center justify-center p-4 sm:p-10 cursor-grab active:cursor-grabbing"
            onClick={() => setZoomLevel(prev => (prev === 1 ? 2 : 1))}
          >
            <motion.div
              animate={{ scale: zoomLevel }}
              transition={{ type: 'spring', stiffness: 260, damping: 25 }}
              className="max-w-4xl max-h-[80vh] aspect-auto shadow-[0_30px_90px_rgba(0,0,0,0.9)]"
            >
              <GenerativePainting
                seed={artwork.seed}
                palette={artwork.palette}
                stage={3}
                aspectRatio={artwork.aspectRatio}
                framed={true}
                frameStyle="dark-ash"
              />
            </motion.div>
          </div>

          {/* Bottom Info HUD */}
          <AnimatePresence>
            {showMetadata && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="p-4 sm:p-6 bg-black/60 backdrop-blur-md border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs z-20"
              >
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[#8A7F72]">
                  <span><strong className="text-[#F6F1E7]">Medium:</strong> {artwork.medium}</span>
                  <span><strong className="text-[#F6F1E7]">Dimensions:</strong> {artwork.dimensions.inches} ({artwork.dimensions.cm})</span>
                  <span><strong className="text-[#F6F1E7]">Year:</strong> {artwork.year}</span>
                </div>

                <div className="text-[11px] uppercase tracking-widest text-[#B08D57]">
                  Pinch or double tap to magnify mineral glaze texture
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
