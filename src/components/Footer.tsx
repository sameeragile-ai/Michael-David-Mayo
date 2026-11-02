import React from 'react';
import { exhibitionConfig } from '../data/config';
import { useCollection } from '../context/CollectionContext';
import { Sliders, Wifi } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setIsStaffOpen } = useCollection();

  return (
    <footer className="w-full bg-[#F6F1E7] text-[#1A1714] py-16 px-6 sm:px-12 paper-texture border-t border-[#1A1714]/12">
      <div className="max-w-[1600px] mx-auto flex flex-col items-center text-center">
        
        {/* Monogram / Fair Lockup */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 border border-[#1A1714]/30 flex items-center justify-center font-serif text-xs font-semibold text-[#1A1714]">
            MDM
          </div>
          <span className="font-serif italic text-lg sm:text-xl text-[#1A1714]">
            Michael David Mayo
          </span>
        </div>

        {/* Small Gold Rule */}
        <div className="w-20 h-[1.5px] bg-[#B08D57] my-4 opacity-80" />

        {/* Booth location and fair credits */}
        <p className="font-sans text-xs tracking-[0.2em] uppercase text-[#8A7F72] max-w-md">
          {exhibitionConfig.fairName} · {exhibitionConfig.boothLocation}
        </p>
        <p className="font-sans text-[11px] text-[#8A7F72] mt-1">
          {exhibitionConfig.venue} · {exhibitionConfig.dates}
        </p>

        {/* Operational & Curatorial Links */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-[#8A7F72]">
          <span>Director: {exhibitionConfig.galleryDirector}</span>
          <span aria-hidden="true">·</span>
          <a
            href={`mailto:${exhibitionConfig.contactEmail}`}
            className="hover:text-[#1A1714] transition-colors underline underline-offset-4 decoration-[#B08D57]/40"
          >
            {exhibitionConfig.contactEmail}
          </a>
          <span aria-hidden="true">·</span>
          <button
            onClick={() => setIsStaffOpen(true)}
            className="inline-flex items-center gap-1.5 hover:text-[#B08D57] transition-colors"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Kiosk Console</span>
          </button>
        </div>

        {/* Offline & System Notice */}
        <div className="mt-8 pt-6 border-t border-[#1A1714]/8 flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-[#8A7F72]">
          <Wifi className="w-3 h-3 text-emerald-600" />
          <span>Standalone PWA Active · Hardware Pedestal Installation</span>
        </div>
      </div>
    </footer>
  );
};
