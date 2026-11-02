import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutGrid, Columns, Bookmark, Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { artworksData, Artwork } from '../data/artworks';
import { GenerativePainting } from './GenerativePainting';
import { useCollection } from '../context/CollectionContext';

export const GallerySection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'available' | 'large' | '2026'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'wall'>('grid');
  const { isSaved, addArtwork, removeArtwork, pricesVisible } = useCollection();

  const filteredArtworks = React.useMemo(() => {
    return artworksData.filter(work => {
      if (filter === 'available') return work.availability === 'Available';
      if (filter === 'large') return work.isLargeScale;
      if (filter === '2026') return work.year === 2026;
      return true;
    });
  }, [filter]);

  return (
    <section
      id="exhibition"
      data-nav-theme="light"
      className="relative w-full bg-[#F6F1E7] text-[#1A1714] py-16 sm:py-24 lg:py-32 px-5 sm:px-8 md:px-12 lg:px-16 paper-texture"
    >
      <div className="max-w-[1600px] mx-auto">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 pb-8 sm:pb-12 border-b border-[#1A1714]/12">
          <div>
            <div className="flex items-center gap-2.5 text-xs font-sans uppercase tracking-[0.22em] text-[#8A7F72] mb-2 sm:mb-3">
              <span className="text-[#B08D57] font-serif italic text-base">01</span>
              <span>·</span>
              <span>The Exhibition Catalog</span>
              <span>·</span>
              <span>Art Miami 2026</span>
            </div>

            <h2
              className="font-serif italic text-[#1A1714] tracking-tight"
              style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)', textWrap: 'balance' }}
            >
              Curated Canvases
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#8A7F72] max-w-xl mt-2 sm:mt-3 leading-relaxed">
              Ten works completed between 2024 and 2026. Rendered in hand-ground mineral pigments, raw walnut oils, and 23k gold leaf on French linen.
            </p>
          </div>

          {/* Controls: Filter Buttons & Layout Toggle */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            
            {/* Filter Buttons (Horizontally scrollable on small screens with no scrollbar) */}
            <div className="flex items-center p-1 bg-[#EAE2D3] border border-[#1A1714]/10 rounded-[2px] overflow-x-auto scrollbar-none flex-nowrap shrink-0">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 text-xs font-sans tracking-wider uppercase transition-colors rounded-[1px] whitespace-nowrap min-h-[44px] ${
                  filter === 'all'
                    ? 'bg-[#1A1714] text-[#F6F1E7] font-medium shadow-sm'
                    : 'text-[#1A1714]/70 hover:text-[#1A1714]'
                }`}
              >
                All Works ({artworksData.length})
              </button>
              <button
                onClick={() => setFilter('available')}
                className={`px-3 py-1.5 text-xs font-sans tracking-wider uppercase transition-colors rounded-[1px] whitespace-nowrap min-h-[44px] ${
                  filter === 'available'
                    ? 'bg-[#1A1714] text-[#F6F1E7] font-medium shadow-sm'
                    : 'text-[#1A1714]/70 hover:text-[#1A1714]'
                }`}
              >
                Available
              </button>
              <button
                onClick={() => setFilter('large')}
                className={`px-3 py-1.5 text-xs font-sans tracking-wider uppercase transition-colors rounded-[1px] whitespace-nowrap min-h-[44px] ${
                  filter === 'large'
                    ? 'bg-[#1A1714] text-[#F6F1E7] font-medium shadow-sm'
                    : 'text-[#1A1714]/70 hover:text-[#1A1714]'
                }`}
              >
                Monumental
              </button>
              <button
                onClick={() => setFilter('2026')}
                className={`px-3 py-1.5 text-xs font-sans tracking-wider uppercase transition-colors rounded-[1px] whitespace-nowrap min-h-[44px] ${
                  filter === '2026'
                    ? 'bg-[#1A1714] text-[#F6F1E7] font-medium shadow-sm'
                    : 'text-[#1A1714]/70 hover:text-[#1A1714]'
                }`}
              >
                2026
              </button>
            </div>

            {/* Layout Toggle: Grid vs Wall */}
            <div className="flex items-center self-end sm:self-auto p-1 bg-[#EAE2D3] border border-[#1A1714]/10 rounded-[2px] shrink-0">
              <button
                onClick={() => setViewMode('grid')}
                title="Staggered Editorial Grid"
                aria-label="Grid Layout"
                className={`p-2 rounded-[1px] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${
                  viewMode === 'grid' ? 'bg-[#1A1714] text-[#F6F1E7]' : 'text-[#1A1714]/60 hover:text-[#1A1714]'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('wall')}
                title="Horizontal Gallery Wall Scroll"
                aria-label="Gallery Wall Layout"
                className={`p-2 rounded-[1px] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${
                  viewMode === 'wall' ? 'bg-[#1A1714] text-[#F6F1E7]' : 'text-[#1A1714]/60 hover:text-[#1A1714]'
                }`}
              >
                <Columns className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Gallery Content View */}
        {viewMode === 'grid' ? (
          /* MODE 1:
             1 column (<768px phones)
             → 2 columns (768–1023px tablet portrait)
             → 3 columns staggered masonry (1024–1919px tablet landscape/laptop)
             → 4 columns (≥1920px ultrawide)
          */
          <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 sm:gap-10 lg:gap-14">
            {filteredArtworks.map((work, index) => {
              const saved = isSaved(work.slug);
              // Staggered layout offsets for museum editorial rhythm on 3-col layouts
              const isOffset = index % 3 === 1;

              return (
                <article
                  key={work.id}
                  className={`group flex flex-col justify-between transition-transform duration-500 ${
                    isOffset ? 'lg:translate-y-8' : ''
                  }`}
                >
                  {/* Framed Painting */}
                  <Link
                    to={`/work/${work.slug}`}
                    className="block relative focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B08D57] rounded-sm"
                  >
                    <div className="transition-all duration-700 ease-out group-hover:-translate-y-2 group-hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]">
                      <GenerativePainting
                        seed={work.seed}
                        palette={work.palette}
                        stage={3}
                        aspectRatio={work.aspectRatio}
                        framed={true}
                        frameStyle={work.featured ? 'antique-gilt' : 'dark-ash'}
                      />
                    </div>
                  </Link>

                  {/* Artwork Metadata Block */}
                  <div className="mt-5 pt-3.5 border-t border-[#1A1714]/12 flex flex-col">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-mono text-xs text-[#B08D57] tracking-widest">
                        NO. {work.number}
                      </span>
                      
                      {/* Availability status */}
                      <div className="flex items-center gap-1.5 text-xs">
                        {work.availability === 'Sold' ? (
                          <>
                            <span className="w-2 h-2 rounded-full bg-red-700" />
                            <span className="text-red-800 font-medium tracking-wide">Sold</span>
                          </>
                        ) : work.availability === 'Reserved' ? (
                          <span className="text-[#8A7F72] italic">Reserved</span>
                        ) : (
                          <span className="text-[#1A1714]/80 tracking-wide">Available</span>
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="mt-1 font-serif italic text-2xl sm:text-3xl text-[#1A1714] group-hover:text-[#B08D57] transition-colors leading-tight">
                      <Link to={`/work/${work.slug}`}>
                        {work.title}
                      </Link>
                    </h3>

                    {/* Unboxed Metadata Line */}
                    <div className="mt-1 text-xs text-[#8A7F72] flex flex-wrap items-center gap-2">
                      <span>{work.year}</span>
                      <span aria-hidden="true">·</span>
                      <span>{work.dimensions.inches}</span>
                      <span aria-hidden="true">·</span>
                      <span className="truncate max-w-[180px]">{work.medium}</span>
                    </div>

                    {/* Price and Actions Bar */}
                    <div className="mt-4 pt-3 border-t border-[#1A1714]/8 flex items-center justify-between">
                      {pricesVisible ? (
                        <span className="font-sans font-semibold text-sm tracking-wider text-[#1A1714]">
                          {work.price}
                        </span>
                      ) : (
                        <span className="text-xs font-sans uppercase tracking-wider text-[#B08D57]">
                          Price on Request
                        </span>
                      )}

                      <div className="flex items-center gap-2">
                        {/* Add to collector's selection */}
                        <button
                          onClick={e => {
                            e.preventDefault();
                            if (saved) {
                              removeArtwork(work.slug);
                            } else {
                              const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                              addArtwork(work.slug, rect);
                            }
                          }}
                          aria-label={saved ? `Remove ${work.title}` : `Save ${work.title}`}
                          className={`p-2.5 rounded-sm border transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center ${
                            saved
                              ? 'bg-[#B08D57] border-[#B08D57] text-[#0E0D0C]'
                              : 'border-[#1A1714]/15 hover:border-[#B08D57] text-[#1A1714]'
                          }`}
                          title={saved ? "Saved in Collector's Selection" : "Save to Collector's Selection"}
                        >
                          {saved ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                        </button>

                        {/* View Details */}
                        <Link
                          to={`/work/${work.slug}`}
                          className="px-3.5 py-2.5 text-xs uppercase tracking-[0.16em] border border-[#1A1714]/20 hover:border-[#1A1714] rounded-sm flex items-center gap-1.5 transition-colors min-h-[48px]"
                        >
                          <span>Examine</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* MODE 2: Horizontal Gallery Wall Scroll with Snap Scrolling:
             - 85vw on phones (<768px)
             - 60vw on tablets (768–1023px)
             - 40vw on desktop (≥1024px)
          */
          <div className="mt-10 sm:mt-14 relative">
            <div className="overflow-x-auto pb-8 pt-2 flex gap-6 sm:gap-8 snap-x snap-mandatory scroll-smooth">
              {filteredArtworks.map(work => {
                const saved = isSaved(work.slug);
                return (
                  <article
                    key={work.id}
                    className="shrink-0 w-[85vw] sm:w-[60vw] lg:w-[40vw] lg:max-w-[540px] snap-center bg-white/40 p-4 sm:p-6 rounded-[2px] border border-[#1A1714]/10 flex flex-col justify-between shadow-lg"
                  >
                    <Link to={`/work/${work.slug}`} className="block">
                      <div className="h-[280px] sm:h-[360px] flex items-center justify-center">
                        <GenerativePainting
                          seed={work.seed}
                          palette={work.palette}
                          stage={3}
                          aspectRatio={work.aspectRatio}
                          framed={true}
                          frameStyle="dark-ash"
                          className="max-h-full"
                        />
                      </div>
                    </Link>

                    <div className="mt-5 pt-3.5 border-t border-[#1A1714]/10">
                      <div className="flex items-baseline justify-between">
                        <span className="font-mono text-xs text-[#B08D57]">NO. {work.number}</span>
                        <span className="text-xs text-[#8A7F72]">{work.dimensions.inches}</span>
                      </div>

                      <h3 className="font-serif italic text-2xl sm:text-3xl text-[#1A1714] mt-1">
                        <Link to={`/work/${work.slug}`}>{work.title}</Link>
                      </h3>

                      <div className="mt-4 flex items-center justify-between">
                        {pricesVisible ? (
                          <span className="font-sans font-semibold text-sm text-[#1A1714]">
                            {work.price}
                          </span>
                        ) : (
                          <span className="text-xs uppercase tracking-wider text-[#B08D57]">
                            Inquire
                          </span>
                        )}

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => (saved ? removeArtwork(work.slug) : addArtwork(work.slug))}
                            className={`p-2.5 rounded-sm border min-h-[48px] min-w-[48px] flex items-center justify-center ${
                              saved ? 'bg-[#B08D57] text-[#0E0D0C]' : 'border-[#1A1714]/20'
                            }`}
                          >
                            <Bookmark className="w-4 h-4" />
                          </button>
                          <Link
                            to={`/work/${work.slug}`}
                            className="px-4 py-2.5 text-xs uppercase tracking-wider bg-[#1A1714] text-[#F6F1E7] rounded-sm hover:bg-[#B08D57] hover:text-[#0E0D0C] transition-colors min-h-[48px] flex items-center"
                          >
                            View
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
            <div className="text-center text-xs text-[#8A7F72] tracking-widest uppercase mt-4">
              ← Swipe horizontally to browse gallery wall continuum →
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
