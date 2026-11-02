import React from 'react';
import { motion } from 'motion/react';
import { artistData } from '../data/artist';
import { AtmosphereImage } from './AtmosphereImage';

export const ArtistSection: React.FC = () => {
  return (
    <section
      id="artist"
      data-nav-theme="light"
      className="relative w-full bg-[#F6F1E7] text-[#1A1714] py-16 sm:py-24 lg:py-32 px-5 sm:px-8 md:px-12 lg:px-16 paper-texture border-t border-[#1A1714]/12"
    >
      <div className="max-w-[1600px] mx-auto">
        
        {/* Section Header */}
        <div className="flex items-center gap-2.5 text-xs font-sans uppercase tracking-[0.22em] text-[#8A7F72] mb-2 sm:mb-3">
          <span className="text-[#B08D57] font-serif italic text-base">03</span>
          <span>·</span>
          <span>Biography & Monograph</span>
          <span>·</span>
          <span>Curatorial Essay</span>
        </div>

        {/* Large Pull-Out Headline with clamp */}
        <div className="py-6 sm:py-8 my-4 sm:my-6 border-y border-[#1A1714]/15">
          <blockquote
            className="font-serif italic text-[#1A1714] leading-[1.1] tracking-tight max-w-5xl"
            style={{ fontSize: 'clamp(1.5rem, 3.8vw, 3.5rem)', textWrap: 'balance' }}
          >
            "{artistData.pullQuote}"
          </blockquote>
          <cite className="block mt-3 text-xs font-sans uppercase tracking-[0.2em] text-[#B08D57] not-italic">
            — Michael David Mayo · Studio Monograph, 2026
          </cite>
        </div>

        {/* Responsive Layout:
            - Phones & Tablet (<1024px): Stacked
            - Tablet Landscape & Desktop (≥1024px): 2 columns (5 cols portrait / 7 cols narrative)
        */}
        <div className="mt-10 sm:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Portrait & Studio Metadata (5 cols on lg+) */}
          <div className="w-full lg:col-span-5 space-y-6">
            <AtmosphereImage
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80"
              alt="Portrait of contemporary artist Michael David Mayo in Hudson Valley studio"
              caption="Michael David Mayo in his Hudson Valley studio, November 2026."
              aspectRatioClass="aspect-[4/5]"
            />

            {/* Curatorial Dossier List */}
            <div className="p-5 sm:p-6 bg-[#EBE4D6] border border-[#1A1714]/10 rounded-[2px] space-y-3 text-xs">
              <div className="flex justify-between border-b border-[#1A1714]/8 pb-2">
                <span className="text-[#8A7F72] uppercase tracking-wider">Origin</span>
                <span className="font-medium text-[#1A1714]">{artistData.born}</span>
              </div>
              <div className="flex justify-between border-b border-[#1A1714]/8 pb-2">
                <span className="text-[#8A7F72] uppercase tracking-wider">Education</span>
                <span className="font-medium text-[#1A1714] text-right truncate max-w-[200px]">
                  {artistData.education}
                </span>
              </div>
              <div className="flex justify-between border-b border-[#1A1714]/8 pb-2">
                <span className="text-[#8A7F72] uppercase tracking-wider">Studios</span>
                <span className="font-medium text-[#1A1714] text-right">
                  {artistData.studios.join(' & ')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8A7F72] uppercase tracking-wider">Representation</span>
                <span className="font-medium text-[#1A1714]">Mayo Contemporary & Associates</span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Biography & Quantum Realism Thesis (7 cols on lg+) */}
          <div className="w-full lg:col-span-7 space-y-8 sm:space-y-10">
            <div>
              <h3 className="font-serif italic text-3xl sm:text-4xl text-[#1A1714] mb-4 sm:mb-6">
                The Matter of Perception
              </h3>

              {/* Biography Prose with Drop Cap */}
              <div className="space-y-4 text-xs sm:text-sm text-[#1A1714]/85 leading-relaxed font-sans max-w-prose">
                <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[#B08D57]">
                  {artistData.biography[0]}
                </p>
                <p>{artistData.biography[1]}</p>
                <p>{artistData.biography[2]}</p>
              </div>
            </div>

            {/* "Quantum Realism" Thesis: 1 column on <768px, 2 columns on ≥768px */}
            <div className="p-6 sm:p-8 bg-[#EFE9DE] border border-[#1A1714]/12 rounded-[2px] space-y-5">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#B08D57] block mb-1.5">
                  Theoretical Paradigm
                </span>
                <h4 className="font-serif italic text-2xl sm:text-3xl text-[#1A1714]">
                  Quantum Realism
                </h4>
                <p className="font-serif italic text-xs sm:text-sm text-[#8A7F72] mt-2 border-l-2 border-[#B08D57] pl-3">
                  "{artistData.quantumRealismThesis.lead}"
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-xs text-[#1A1714]/80 leading-relaxed pt-3 border-t border-[#1A1714]/10">
                <p>{artistData.quantumRealismThesis.col1}</p>
                <p>{artistData.quantumRealismThesis.col2}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chronological Exhibition Timeline:
            - Vertical stack on phones (<768px)
            - Horizontal multi-column on desktop (md+)
        */}
        <div className="mt-16 sm:mt-24 pt-12 sm:pt-16 border-t border-[#1A1714]/15">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-8 gap-2">
            <div>
              <span className="text-xs font-sans uppercase tracking-[0.22em] text-[#8A7F72] block">
                Selected Provenance
              </span>
              <h3 className="font-serif italic text-2xl sm:text-3xl text-[#1A1714] mt-1">
                Exhibition History & Biennales
              </h3>
            </div>
            <span className="text-xs font-mono text-[#B08D57]">2020 — 2026</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {artistData.timeline.map((item, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 bg-white/50 border border-[#1A1714]/10 rounded-[2px] flex flex-col justify-between hover:bg-white/80 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-mono text-[#B08D57] font-semibold">{item.year}</span>
                    <span className="text-[10px] uppercase tracking-wider text-[#8A7F72] px-2 py-0.5 bg-[#1A1714]/5 rounded-[1px]">
                      {item.type}
                    </span>
                  </div>
                  <h4 className="font-serif italic text-lg text-[#1A1714] mt-1 leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#8A7F72] mt-1">{item.venue}</p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[#1A1714]/8 text-[11px] text-[#8A7F72] font-sans">
                  {item.location}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
