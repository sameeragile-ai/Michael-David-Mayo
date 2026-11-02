import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { GenerativePainting } from './GenerativePainting';
import { Artwork } from '../data/artworks';

interface ProcessComparisonSliderProps {
  artwork: Artwork;
}

export const ProcessComparisonSlider: React.FC<ProcessComparisonSliderProps> = ({ artwork }) => {
  // Slider position from 0 to 100
  // 0-33%: Stage 1 (Before - Imprimatura)
  // 34-66%: Stage 2 (During - Glazes)
  // 67-100%: Stage 3 (After - Gold Ground / Final)
  const [sliderPos, setSliderPos] = useState(65);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  const updatePosition = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedPct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(clampedPct);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDraggingRef.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  // Determine current active stage info based on slider position
  const currentStageInfo =
    sliderPos < 33
      ? artwork.processStages.before
      : sliderPos < 67
      ? artwork.processStages.during
      : artwork.processStages.after;

  const currentStageNum = sliderPos < 33 ? 1 : sliderPos < 67 ? 2 : 3;

  return (
    <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-14 bg-[#141210] border border-[#F6F1E7]/10 p-6 sm:p-10 rounded-[2px] shadow-2xl film-grain">
      
      {/* Left/Top: Interactive Multi-Stage Layer Reveal Canvas */}
      <div className="w-full lg:w-1/2 flex flex-col items-center">
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="relative w-full max-w-md aspect-[3/4] overflow-hidden select-none cursor-ew-resize rounded-[2px] shadow-[0_25px_50px_rgba(0,0,0,0.8)] border border-white/10"
        >
          {/* Base Layer: Stage 3 (After - Completed work) */}
          <div className="absolute inset-0">
            <GenerativePainting
              seed={artwork.seed}
              palette={artwork.palette}
              stage={3}
              aspectRatio="portrait"
              framed={false}
              className="w-full h-full"
            />
          </div>

          {/* Middle Clip Layer: Stage 2 (During - Chromatic Glazes) */}
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{
              clipPath: `polygon(0% 0%, ${Math.min(100, sliderPos * 1.5)}% 0%, ${Math.min(100, sliderPos * 1.5)}% 100%, 0% 100%)`,
            }}
          >
            <GenerativePainting
              seed={artwork.seed}
              palette={artwork.palette}
              stage={2}
              aspectRatio="portrait"
              framed={false}
              className="w-full h-full"
            />
          </div>

          {/* Top Clip Layer: Stage 1 (Before - Vine Charcoal & Imprimatura) */}
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{
              clipPath: `polygon(0% 0%, ${Math.min(100, sliderPos * 0.8)}% 0%, ${Math.min(100, sliderPos * 0.8)}% 100%, 0% 100%)`,
            }}
          >
            <GenerativePainting
              seed={artwork.seed}
              palette={artwork.palette}
              stage={1}
              aspectRatio="portrait"
              framed={false}
              className="w-full h-full"
            />
          </div>

          {/* Interactive Vertical Drag Divider Handle (min 48px touch target) */}
          <div
            className="absolute top-0 bottom-0 w-[2px] bg-[#B08D57] pointer-events-none z-30 shadow-[0_0_12px_rgba(176,141,87,0.8)]"
            style={{ left: `${sliderPos}%` }}
          >
            {/* Center Handle Badge (Min 48×48px for comfortable touch dragging) */}
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#1B1916] border-2 border-[#B08D57] shadow-2xl flex items-center justify-center text-[#B08D57]">
              <span className="text-xs font-mono font-bold tracking-tighter">↔</span>
            </div>
          </div>

          {/* Corner Stage Badges */}
          <div className="absolute top-3 left-3 z-20 px-2 py-1 bg-black/75 backdrop-blur-sm rounded-[1px] border border-white/10 text-[9px] sm:text-[10px] font-mono text-[#F6F1E7]/80 uppercase tracking-widest">
            Stage {currentStageNum} of 3
          </div>

          <div className="absolute bottom-3 right-3 z-20 px-2 py-1 bg-black/75 backdrop-blur-sm rounded-[1px] border border-white/10 text-[9px] sm:text-[10px] font-mono text-[#B08D57] uppercase tracking-widest">
            Drag to Peel
          </div>
        </div>

        {/* Quick Stage Buttons (Accessible min 44px tap target) */}
        <div className="flex items-center gap-2 mt-4 sm:mt-5 w-full justify-center">
          <button
            onClick={() => setSliderPos(15)}
            className={`flex-1 sm:flex-initial px-3 py-2 text-xs font-sans tracking-wider uppercase rounded-sm border transition-colors min-h-[44px] flex items-center justify-center ${
              currentStageNum === 1
                ? 'bg-[#B08D57] border-[#B08D57] text-[#0E0D0C] font-semibold'
                : 'bg-white/5 border-white/15 text-[#8A7F72] hover:text-[#F6F1E7]'
            }`}
          >
            I. Before
          </button>
          <button
            onClick={() => setSliderPos(50)}
            className={`flex-1 sm:flex-initial px-3 py-2 text-xs font-sans tracking-wider uppercase rounded-sm border transition-colors min-h-[44px] flex items-center justify-center ${
              currentStageNum === 2
                ? 'bg-[#B08D57] border-[#B08D57] text-[#0E0D0C] font-semibold'
                : 'bg-white/5 border-white/15 text-[#8A7F72] hover:text-[#F6F1E7]'
            }`}
          >
            II. During
          </button>
          <button
            onClick={() => setSliderPos(85)}
            className={`flex-1 sm:flex-initial px-3 py-2 text-xs font-sans tracking-wider uppercase rounded-sm border transition-colors min-h-[44px] flex items-center justify-center ${
              currentStageNum === 3
                ? 'bg-[#B08D57] border-[#B08D57] text-[#0E0D0C] font-semibold'
                : 'bg-white/5 border-white/15 text-[#8A7F72] hover:text-[#F6F1E7]'
            }`}
          >
            III. After
          </button>
        </div>
      </div>

      {/* Right/Bottom: Curatorial Layer Narrative */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center text-[#F6F1E7]">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#B08D57] uppercase tracking-[0.25em]">
              Chronological Stratigraphy
            </span>
            <div className="h-[1px] flex-1 bg-[#F6F1E7]/10" />
          </div>

          <h3 className="font-serif italic text-2xl sm:text-3xl text-[#F6F1E7]">
            {currentStageInfo.title}
          </h3>

          <div className="text-sm font-sans tracking-wider uppercase text-[#B08D57]">
            {currentStageInfo.subtitle}
          </div>

          <p className="text-xs sm:text-sm text-[#8A7F72] leading-relaxed max-w-lg">
            {currentStageInfo.description}
          </p>

          <div className="pt-4 border-t border-[#F6F1E7]/10 grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#8A7F72] block">
                Substrate Ground
              </span>
              <span className="text-[#F6F1E7]">Normandy Gessoed Linen</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#8A7F72] block">
                Binder Vehicle
              </span>
              <span className="text-[#F6F1E7]">Cold-Pressed Walnut & Damar</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
