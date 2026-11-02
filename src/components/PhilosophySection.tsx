import React, { useState, useRef } from 'react';
import { Play, ArrowLeft, ArrowRight } from 'lucide-react';
import { artistData, PhilosophyCard } from '../data/artist';
import { MakingOfVideoModal } from './MakingOfVideoModal';
import { artworksData, Artwork } from '../data/artworks';

export const PhilosophySection: React.FC = () => {
  const [activeVideoModal, setActiveVideoModal] = useState<Artwork | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleCardClick = (card: PhilosophyCard) => {
    const matchedArtwork = artworksData.find(a => a.id === `work-${card.chapterNumber.padStart(2, '0')}`) || artworksData[0];
    setActiveVideoModal(matchedArtwork);
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -360, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 360, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="philosophy"
      data-nav-theme="dark"
      className="relative w-full bg-[#0E0D0C] text-[#F6F1E7] py-16 sm:py-24 lg:py-32 px-5 sm:px-8 md:px-12 lg:px-16 film-grain border-t border-[#F6F1E7]/10"
    >
      <div className="max-w-[1600px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 sm:pb-12 border-b border-[#F6F1E7]/12">
          <div>
            <div className="flex items-center gap-2.5 text-xs font-sans uppercase tracking-[0.22em] text-[#B08D57] mb-2 sm:mb-3">
              <span className="font-serif italic text-base">04</span>
              <span>·</span>
              <span>The Philosophy of Perception</span>
              <span>·</span>
              <span>Video Essays</span>
            </div>

            <h2
              className="font-serif italic text-[#F6F1E7] tracking-tight leading-tight"
              style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)', textWrap: 'balance' }}
            >
              Aesthetics of the Non-Local
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="font-sans text-xs sm:text-sm text-[#8A7F72] max-w-md leading-relaxed">
              Four documentary short films exploring wave mechanics, somatic viewing, and the metaphysics of mineral pigment. Tap any card to screen in 4K letterbox.
            </p>

            {/* Desktop Carousel Arrow Navigation Buttons */}
            <div className="hidden md:flex items-center gap-2 shrink-0 self-end">
              <button
                onClick={scrollLeft}
                aria-label="Previous film"
                className="w-11 h-11 min-h-[44px] min-w-[44px] rounded-full border border-white/20 hover:border-[#B08D57] hover:text-[#B08D57] flex items-center justify-center transition-colors text-white"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={scrollRight}
                aria-label="Next film"
                className="w-11 h-11 min-h-[44px] min-w-[44px] rounded-full border border-white/20 hover:border-[#B08D57] hover:text-[#B08D57] flex items-center justify-center transition-colors text-white"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Cinematic Horizontal Video Cards Carousel:
            - Phones: 1.15 cards visible (w-[82vw] sm:w-[75vw])
            - Tablets: 2.2 cards visible (w-[42vw])
            - Desktop: 3.2 cards visible (w-[30vw] max-w-[420px])
        */}
        <div
          ref={carouselRef}
          className="mt-8 sm:mt-12 overflow-x-auto pb-6 sm:pb-8 flex gap-5 sm:gap-6 lg:gap-8 snap-x snap-mandatory scroll-smooth scrollbar-none"
        >
          {artistData.philosophyCards.map(card => (
            <article
              key={card.id}
              onClick={() => handleCardClick(card)}
              className="shrink-0 w-[82vw] sm:w-[70vw] md:w-[42vw] lg:w-[30vw] lg:max-w-[420px] snap-center bg-[#151311] border border-[#F6F1E7]/12 rounded-[2px] p-5 sm:p-6 flex flex-col justify-between shadow-2xl cursor-pointer group hover:border-[#B08D57] transition-all duration-500 hover:-translate-y-1.5"
            >
              <div>
                {/* Poster Artwork Header with Play button */}
                <div
                  className="w-full aspect-[16/10] rounded-[1px] relative overflow-hidden border border-white/10 mb-4 sm:mb-5 flex items-center justify-center p-4 text-center"
                  style={{ background: card.posterBg }}
                >
                  <div className="absolute inset-0 radial-gold-glow opacity-50" />
                  
                  {/* Play Button Badge */}
                  <div className="relative z-10 w-12 h-12 rounded-full bg-[#B08D57] text-[#0E0D0C] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 min-h-[48px] min-w-[48px]">
                    <Play className="w-5 h-5 ml-0.5 fill-current" />
                  </div>

                  <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 bg-black/80 rounded-[1px] font-mono text-[10px] text-white/90">
                    {card.duration}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-[#8A7F72] mb-1">
                  <span className="font-mono text-[#B08D57]">ESSAY {card.chapterNumber}</span>
                  <span className="uppercase tracking-widest text-[10px]">4K Letterbox</span>
                </div>

                <h3 className="font-serif italic text-2xl sm:text-3xl text-[#F6F1E7] group-hover:text-[#B08D57] transition-colors leading-tight">
                  {card.title}
                </h3>
                <h4 className="text-xs uppercase tracking-wider text-[#8A7F72] mt-0.5 mb-3 sm:mb-4">
                  {card.subtitle}
                </h4>

                <blockquote className="font-serif italic text-xs sm:text-sm text-[#E8E2D5]/80 leading-relaxed border-l border-[#B08D57]/40 pl-3 my-2 sm:my-3">
                  "{card.quote}"
                </blockquote>
              </div>

              <div className="mt-4 pt-3 border-t border-[#F6F1E7]/10 flex items-center justify-between text-xs text-[#8A7F72]">
                <span className="truncate max-w-[180px] text-[11px]">{card.summary}</span>
                <span className="text-[#B08D57] uppercase tracking-wider text-[10px] font-semibold flex items-center gap-1 shrink-0">
                  Screen Film →
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center text-xs text-[#8A7F72] tracking-widest uppercase mt-3">
          ← Swipe to explore documentary film chapters →
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
