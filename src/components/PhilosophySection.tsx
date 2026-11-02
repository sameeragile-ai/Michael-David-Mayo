import React, { useState } from 'react';
import { Play, Sparkles } from 'lucide-react';
import { artistData, PhilosophyCard } from '../data/artist';
import { MakingOfVideoModal } from './MakingOfVideoModal';
import { artworksData, Artwork } from '../data/artworks';

export const PhilosophySection: React.FC = () => {
  const [activeVideoModal, setActiveVideoModal] = useState<Artwork | null>(null);

  const handleCardClick = (card: PhilosophyCard) => {
    // Pair each card with a corresponding artwork for the video modal simulation
    const matchedArtwork = artworksData.find(a => a.id === `work-${card.chapterNumber.padStart(2, '0')}`) || artworksData[0];
    setActiveVideoModal(matchedArtwork);
  };

  return (
    <section
      id="philosophy"
      data-nav-theme="dark"
      className="relative w-full bg-[#0E0D0C] text-[#F6F1E7] py-24 sm:py-32 px-4 sm:px-8 lg:px-12 film-grain border-t border-[#F6F1E7]/10"
    >
      <div className="max-w-[1600px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#F6F1E7]/12">
          <div>
            <div className="flex items-center gap-3 text-xs font-sans uppercase tracking-[0.25em] text-[#B08D57] mb-3">
              <span className="font-serif italic text-base">04</span>
              <span>·</span>
              <span>The Philosophy of Perception</span>
              <span>·</span>
              <span>Video Essays</span>
            </div>

            <h2 className="font-serif italic text-4xl sm:text-6xl text-[#F6F1E7] tracking-tight">
              Aesthetics of the Non-Local
            </h2>
          </div>

          <p className="font-sans text-xs sm:text-sm text-[#8A7F72] max-w-md leading-relaxed">
            Four documentary short films exploring wave mechanics, somatic viewing, and the metaphysics of mineral pigment. Tap any card to screen in 4K letterbox.
          </p>
        </div>

        {/* Cinematic Horizontal Video Cards Carousel */}
        <div className="mt-12 overflow-x-auto pb-8 flex gap-6 sm:gap-8 snap-x snap-mandatory scroll-smooth">
          {artistData.philosophyCards.map(card => (
            <article
              key={card.id}
              onClick={() => handleCardClick(card)}
              className="shrink-0 w-[300px] sm:w-[380px] snap-center bg-[#151311] border border-[#F6F1E7]/12 rounded-[2px] p-6 flex flex-col justify-between shadow-2xl cursor-pointer group hover:border-[#B08D57] transition-all duration-500 hover:-translate-y-1.5"
            >
              <div>
                {/* Poster Artwork Header with Play overlay */}
                <div
                  className="w-full aspect-[16/10] rounded-[1px] relative overflow-hidden border border-white/10 mb-5 flex items-center justify-center p-4 text-center"
                  style={{ background: card.posterBg }}
                >
                  {/* Slow rotating geometric overlay */}
                  <div className="absolute inset-0 radial-gold-glow opacity-50" />
                  
                  {/* Play Button Badge */}
                  <div className="relative z-10 w-12 h-12 rounded-full bg-[#B08D57] text-[#0E0D0C] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-5 h-5 ml-0.5 fill-current" />
                  </div>

                  {/* Corner Duration */}
                  <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 bg-black/80 rounded-[1px] font-mono text-[10px] text-white/90">
                    {card.duration}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-[#8A7F72] mb-1">
                  <span className="font-mono text-[#B08D57]">ESSAY {card.chapterNumber}</span>
                  <span className="uppercase tracking-widest text-[10px]">4K Letterbox</span>
                </div>

                <h3 className="font-serif italic text-2xl text-[#F6F1E7] group-hover:text-[#B08D57] transition-colors">
                  {card.title}
                </h3>
                <h4 className="text-xs uppercase tracking-wider text-[#8A7F72] mt-0.5 mb-4">
                  {card.subtitle}
                </h4>

                <blockquote className="font-serif italic text-xs text-[#E8E2D5]/80 leading-relaxed border-l border-[#B08D57]/40 pl-3 my-3">
                  "{card.quote}"
                </blockquote>
              </div>

              <div className="mt-4 pt-3 border-t border-[#F6F1E7]/10 flex items-center justify-between text-xs text-[#8A7F72]">
                <span className="truncate max-w-[200px]">{card.summary}</span>
                <span className="text-[#B08D57] uppercase tracking-wider text-[10px] font-semibold flex items-center gap-1">
                  Screen Film →
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center text-xs text-[#8A7F72] tracking-widest uppercase mt-4">
          ← Swipe to explore all documentary film chapters →
        </div>
      </div>

      {/* Video Modal Player */}
      <MakingOfVideoModal
        artwork={activeVideoModal}
        isOpen={!!activeVideoModal}
        onClose={() => setActiveVideoModal(null)}
      />
    </section>
  );
};
