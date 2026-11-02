import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  ZoomIn,
  Ruler,
  Play,
  Bookmark,
  Check,
  ChevronDown,
  ChevronUp,
  Calendar,
} from 'lucide-react';
import { artworksData, Artwork } from '../data/artworks';
import { GenerativePainting } from '../components/GenerativePainting';
import { ArtworkLightbox } from '../components/ArtworkLightbox';
import { RoomScaleModal } from '../components/RoomScaleModal';
import { MakingOfVideoModal } from '../components/MakingOfVideoModal';
import { useCollection } from '../context/CollectionContext';

export const ArtworkDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { isSaved, addArtwork, removeArtwork, pricesVisible, setIsDrawerOpen } = useCollection();

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [roomScaleOpen, setRoomScaleOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [perspectiveExpanded, setPerspectiveExpanded] = useState(true);

  const currentIndex = artworksData.findIndex(a => a.slug === slug);
  const artwork: Artwork = currentIndex !== -1 ? artworksData[currentIndex] : artworksData[0];

  const prevArtwork = artworksData[(currentIndex - 1 + artworksData.length) % artworksData.length];
  const nextArtwork = artworksData[(currentIndex + 1) % artworksData.length];

  const saved = isSaved(artwork.slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        navigate(`/work/${prevArtwork.slug}`);
      } else if (e.key === 'ArrowRight') {
        navigate(`/work/${nextArtwork.slug}`);
      } else if (e.key === 'Escape') {
        navigate('/#exhibition');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, prevArtwork.slug, nextArtwork.slug]);

  const handleSaveToggle = (e: React.MouseEvent) => {
    if (saved) {
      removeArtwork(artwork.slug);
    } else {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      addArtwork(artwork.slug, rect);
    }
  };

  return (
    <div
      data-nav-theme="light"
      className="min-h-screen bg-[#F6F1E7] text-[#1A1714] pt-20 sm:pt-24 lg:pt-28 pb-28 md:pb-20 px-5 sm:px-8 md:px-12 lg:px-16 paper-texture"
    >
      <div className="max-w-[1600px] mx-auto">
        
        {/* Navigation Breadcrumb Bar */}
        <div className="flex items-center justify-between py-3 mb-6 sm:mb-8 border-b border-[#1A1714]/12">
          <Link
            to="/#exhibition"
            className="inline-flex items-center gap-2 text-xs font-sans tracking-[0.2em] uppercase text-[#8A7F72] hover:text-[#1A1714] transition-colors min-h-[44px]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Exhibition Catalog</span>
          </Link>

          {/* Top Prev / Next Switcher (Hidden on small phones, shown on md+) */}
          <div className="hidden md:flex items-center gap-4 text-xs font-mono text-[#8A7F72]">
            <Link
              to={`/work/${prevArtwork.slug}`}
              className="flex items-center gap-1.5 hover:text-[#1A1714] transition-colors p-2 min-h-[44px]"
              title={`Previous: ${prevArtwork.title}`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>PREV</span>
            </Link>

            <span className="text-[#B08D57] font-semibold">
              {artwork.number} / {artworksData.length.toString().padStart(2, '0')}
            </span>

            <Link
              to={`/work/${nextArtwork.slug}`}
              className="flex items-center gap-1.5 hover:text-[#1A1714] transition-colors p-2 min-h-[44px]"
              title={`Next: ${nextArtwork.title}`}
            >
              <span>NEXT</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Responsive Split Layout:
            - Phones & Tablet Portrait (<1024px): Stacked
            - Tablet Landscape & Desktop (≥1024px): 55/45 split with sticky painting on left
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-start">
          
          {/* LEFT / TOP: Monumental Framed Canvas (Sticky on ≥1024px) */}
          <div className="w-full lg:col-span-7 lg:sticky lg:top-24 self-start flex flex-col items-center">
            
            {/* Framed Artwork Display */}
            <div className="relative w-full max-w-2xl mx-auto shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)]">
              <GenerativePainting
                seed={artwork.seed}
                palette={artwork.palette}
                stage={3}
                aspectRatio={artwork.aspectRatio}
                framed={true}
                frameStyle={artwork.featured ? 'antique-gilt' : 'dark-ash'}
              />
            </div>

            {/* Interactive Visual Tools Bar */}
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 w-full">
              <button
                onClick={() => setLightboxOpen(true)}
                className="flex-1 sm:flex-initial px-4 py-2.5 bg-white/70 hover:bg-white border border-[#1A1714]/15 rounded-[1px] text-xs font-sans uppercase tracking-[0.16em] flex items-center justify-center gap-2 transition-colors shadow-sm min-h-[48px]"
              >
                <ZoomIn className="w-4 h-4 text-[#B08D57]" />
                <span>Pinch-Zoom / Lightbox</span>
              </button>

              <button
                onClick={() => setRoomScaleOpen(true)}
                className="flex-1 sm:flex-initial px-4 py-2.5 bg-white/70 hover:bg-white border border-[#1A1714]/15 rounded-[1px] text-xs font-sans uppercase tracking-[0.16em] flex items-center justify-center gap-2 transition-colors shadow-sm min-h-[48px]"
              >
                <Ruler className="w-4 h-4 text-[#B08D57]" />
                <span>View in Room</span>
              </button>

              <button
                onClick={() => setVideoModalOpen(true)}
                className="w-full sm:w-auto px-4 py-2.5 bg-[#141210] hover:bg-[#B08D57] text-[#F6F1E7] hover:text-[#0E0D0C] border border-black rounded-[1px] text-xs font-sans uppercase tracking-[0.16em] flex items-center justify-center gap-2 transition-colors shadow-sm min-h-[48px]"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Making-of Documentary</span>
              </button>
            </div>

            <p className="mt-3 text-[11px] font-sans text-[#8A7F72] text-center tracking-wide">
              Installed at Art Miami Booth P-214 on custom French cleat system. Signed and dated verso.
            </p>
          </div>

          {/* RIGHT / BOTTOM: Curatorial Metadata Dossier */}
          <div className="w-full lg:col-span-5 space-y-6 sm:space-y-8">
            
            {/* Header Lockup */}
            <div className="space-y-2 sm:space-y-3 pb-5 sm:pb-6 border-b border-[#1A1714]/12">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#B08D57] tracking-widest uppercase">
                  CATALOGUE NO. {artwork.number}
                </span>

                <div className="flex items-center gap-2 text-xs">
                  {artwork.availability === 'Sold' ? (
                    <>
                      <span className="w-2 h-2 rounded-full bg-red-700" />
                      <span className="text-red-800 font-semibold uppercase tracking-wider">Sold</span>
                    </>
                  ) : artwork.availability === 'Reserved' ? (
                    <span className="text-[#8A7F72] italic uppercase tracking-wider">Reserved</span>
                  ) : (
                    <span className="text-[#1A1714] font-medium uppercase tracking-wider">Available</span>
                  )}
                </div>
              </div>

              <h1
                className="font-serif italic text-[#1A1714] tracking-tight leading-none"
                style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.75rem)' }}
              >
                {artwork.title}
              </h1>

              <div className="text-sm font-sans text-[#8A7F72]">
                {artwork.year} · Michael David Mayo
              </div>
            </div>

            {/* Structured Accession Metadata Grid */}
            <dl className="grid grid-cols-2 gap-y-4 gap-x-4 sm:gap-x-6 text-xs py-4 border-b border-[#1A1714]/12">
              <div>
                <dt className="text-[#8A7F72] uppercase tracking-wider text-[10px]">Medium</dt>
                <dd className="font-medium text-[#1A1714] mt-0.5">{artwork.medium}</dd>
              </div>

              <div>
                <dt className="text-[#8A7F72] uppercase tracking-wider text-[10px]">Dimensions</dt>
                <dd className="font-medium text-[#1A1714] mt-0.5">
                  {artwork.dimensions.inches} ({artwork.dimensions.cm})
                </dd>
              </div>

              <div>
                <dt className="text-[#8A7F72] uppercase tracking-wider text-[10px]">Valuation</dt>
                <dd className="mt-0.5 font-sans font-semibold text-base text-[#1A1714] tabular-nums">
                  {pricesVisible ? artwork.price : 'Price on Request'}
                </dd>
              </div>

              <div>
                <dt className="text-[#8A7F72] uppercase tracking-wider text-[10px]">Provenance</dt>
                <dd className="font-medium text-[#1A1714] mt-0.5">Direct from the Artist's Studio</dd>
              </div>
            </dl>

            {/* Short Curatorial Description */}
            <div className="text-xs sm:text-sm text-[#1A1714]/85 leading-relaxed font-sans">
              <p>{artwork.shortDescription}</p>
            </div>

            {/* Primary Action Button */}
            <div className="pt-2 space-y-2">
              <button
                onClick={handleSaveToggle}
                className={`w-full py-4 px-6 rounded-[1px] text-xs font-sans tracking-[0.2em] uppercase font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-md min-h-[48px] ${
                  saved
                    ? 'bg-[#B08D57] text-[#0E0D0C] hover:bg-[#9E7C47]'
                    : 'bg-[#1A1714] text-[#F6F1E7] hover:bg-[#B08D57] hover:text-[#0E0D0C]'
                }`}
              >
                {saved ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                <span>
                  {saved ? "Saved in Collector's Selection" : "Add to Collector's Selection"}
                </span>
              </button>

              <button
                onClick={() => setIsDrawerOpen(true)}
                className="w-full py-3 text-xs font-sans uppercase tracking-[0.16em] text-[#8A7F72] hover:text-[#1A1714] flex items-center justify-center gap-1.5 transition-colors min-h-[48px]"
              >
                <Calendar className="w-3.5 h-3.5 text-[#B08D57]" />
                <span>Request Private Viewing Appointment at Booth</span>
              </button>
            </div>

            {/* Expandable "Artist's Perspective" Section */}
            <div className="border border-[#1A1714]/12 rounded-[2px] overflow-hidden bg-white/40">
              <button
                onClick={() => setPerspectiveExpanded(!perspectiveExpanded)}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-white/60 transition-colors min-h-[48px]"
              >
                <span className="font-serif italic text-lg text-[#1A1714]">
                  Artist's Perspective & Materiality
                </span>
                {perspectiveExpanded ? (
                  <ChevronUp className="w-4 h-4 text-[#8A7F72]" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#8A7F72]" />
                )}
              </button>

              <AnimatePresence>
                {perspectiveExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="px-4 pb-4 pt-1 space-y-3 text-xs text-[#1A1714]/80 leading-relaxed font-sans border-t border-[#1A1714]/8"
                  >
                    {artwork.extendedPerspective.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Dark Cinematic "Making of" Video Teaser Panel */}
            <div
              onClick={() => setVideoModalOpen(true)}
              className="p-4 sm:p-5 bg-[#141210] border border-[#B08D57]/30 text-[#F6F1E7] rounded-[2px] shadow-lg cursor-pointer group film-grain hover:border-[#B08D57] transition-colors min-h-[48px]"
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-[#B08D57] mb-2 uppercase tracking-widest">
                <span>Documentary Record</span>
                <span>{artwork.makingOfVideo.duration} · 4K</span>
              </div>

              <div className="flex items-center gap-3.5 sm:gap-4">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#B08D57] text-[#0E0D0C] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform min-h-[44px] min-w-[44px]">
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5 fill-current" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-serif italic text-base sm:text-lg text-[#F6F1E7] truncate">
                    {artwork.makingOfVideo.chapter}
                  </h4>
                  <p className="text-xs text-[#8A7F72] mt-0.5 line-clamp-1">
                    {artwork.makingOfVideo.subtitle}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Mobile Bottom Bar for Prev/Next Arrows (<768px phones) */}
        <div className="md:hidden fixed bottom-0 inset-x-0 bg-[#F6F1E7]/95 backdrop-blur-xl border-t border-[#1A1714]/15 px-5 py-3 z-30 pb-safe-bottom flex items-center justify-between shadow-2xl">
          <Link
            to={`/work/${prevArtwork.slug}`}
            className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#1A1714] min-h-[48px] px-3 py-2 bg-white/70 border border-[#1A1714]/10 rounded-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Prev No. {prevArtwork.number}</span>
          </Link>

          <span className="font-mono text-xs text-[#B08D57] font-semibold">
            {artwork.number} / {artworksData.length.toString().padStart(2, '0')}
          </span>

          <Link
            to={`/work/${nextArtwork.slug}`}
            className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#1A1714] min-h-[48px] px-3 py-2 bg-white/70 border border-[#1A1714]/10 rounded-sm"
          >
            <span>Next No. {nextArtwork.number}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Modals */}
        <ArtworkLightbox
          artwork={artwork}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
        />

        <RoomScaleModal
          artwork={artwork}
          isOpen={roomScaleOpen}
          onClose={() => setRoomScaleOpen(false)}
        />

        <MakingOfVideoModal
          artwork={artwork}
          isOpen={videoModalOpen}
          onClose={() => setVideoModalOpen(false)}
        />
      </div>
    </div>
  );
};
