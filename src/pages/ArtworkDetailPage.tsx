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
  Share2,
  Calendar,
} from 'lucide-react';
import { artworksData, Artwork } from '../data/artworks';
import { GenerativePainting } from '../components/GenerativePainting';
import { ArtworkLightbox } from '../components/ArtworkLightbox';
import { RoomScaleModal } from '../components/RoomScaleModal';
import { MakingOfVideoModal } from '../components/MakingOfVideoModal';
import { useCollection } from '../context/CollectionContext';
import { exhibitionConfig } from '../data/config';

export const ArtworkDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { isSaved, addArtwork, removeArtwork, pricesVisible, setIsDrawerOpen } = useCollection();

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [roomScaleOpen, setRoomScaleOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [perspectiveExpanded, setPerspectiveExpanded] = useState(true);

  // Find artwork by slug or default to first
  const currentIndex = artworksData.findIndex(a => a.slug === slug);
  const artwork: Artwork = currentIndex !== -1 ? artworksData[currentIndex] : artworksData[0];

  const prevArtwork = artworksData[(currentIndex - 1 + artworksData.length) % artworksData.length];
  const nextArtwork = artworksData[(currentIndex + 1) % artworksData.length];

  const saved = isSaved(artwork.slug);

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  // Keyboard navigation for kiosk (arrow keys)
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
    <div className="min-h-screen bg-[#F6F1E7] text-[#1A1714] pt-24 pb-20 px-4 sm:px-8 lg:px-12 paper-texture">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Navigation Breadcrumb & Prev/Next Bar */}
        <div className="flex items-center justify-between py-4 mb-8 border-b border-[#1A1714]/12">
          <Link
            to="/#exhibition"
            className="inline-flex items-center gap-2 text-xs font-sans tracking-[0.2em] uppercase text-[#8A7F72] hover:text-[#1A1714] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Exhibition Catalog</span>
          </Link>

          {/* Quick Prev / Next Switcher */}
          <div className="flex items-center gap-4 text-xs font-mono text-[#8A7F72]">
            <Link
              to={`/work/${prevArtwork.slug}`}
              className="flex items-center gap-1 hover:text-[#1A1714] transition-colors p-1"
              title={`Previous: ${prevArtwork.title}`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">PREV</span>
            </Link>

            <span className="text-[#B08D57]">
              {artwork.number} / {artworksData.length.toString().padStart(2, '0')}
            </span>

            <Link
              to={`/work/${nextArtwork.slug}`}
              className="flex items-center gap-1 hover:text-[#1A1714] transition-colors p-1"
              title={`Next: ${nextArtwork.title}`}
            >
              <span className="hidden sm:inline">NEXT</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Main Split Layout: 7 cols Canvas (Left) / 5 cols Dossier (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* LEFT: Monumental Framed Canvas & Visual Tools */}
          <div className="lg:col-span-7 flex flex-col items-center">
            
            {/* Framed Artwork Display */}
            <div className="relative w-full max-w-2xl shadow-[0_35px_70px_-15px_rgba(0,0,0,0.35)]">
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
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setLightboxOpen(true)}
                className="px-4 py-2.5 bg-white/70 hover:bg-white border border-[#1A1714]/15 rounded-[1px] text-xs font-sans uppercase tracking-[0.16em] flex items-center gap-2 transition-colors shadow-sm"
              >
                <ZoomIn className="w-4 h-4 text-[#B08D57]" />
                <span>Pinch-Zoom / Lightbox (4K)</span>
              </button>

              <button
                onClick={() => setRoomScaleOpen(true)}
                className="px-4 py-2.5 bg-white/70 hover:bg-white border border-[#1A1714]/15 rounded-[1px] text-xs font-sans uppercase tracking-[0.16em] flex items-center gap-2 transition-colors shadow-sm"
              >
                <Ruler className="w-4 h-4 text-[#B08D57]" />
                <span>View in Architectural Room</span>
              </button>

              <button
                onClick={() => setVideoModalOpen(true)}
                className="px-4 py-2.5 bg-[#141210] hover:bg-[#B08D57] text-[#F6F1E7] hover:text-[#0E0D0C] border border-black rounded-[1px] text-xs font-sans uppercase tracking-[0.16em] flex items-center gap-2 transition-colors shadow-sm"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Making-of Documentary</span>
              </button>
            </div>

            {/* Hanging instructions */}
            <p className="mt-4 text-[11px] font-sans text-[#8A7F72] text-center tracking-wide">
              Installed at Art Miami Booth P-214 on custom French cleat system. Signed and dated verso.
            </p>
          </div>

          {/* RIGHT: Curatorial Metadata Dossier */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Header Lockup */}
            <div className="space-y-3 pb-6 border-b border-[#1A1714]/12">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#B08D57] tracking-widest uppercase">
                  CATALOGUE NO. {artwork.number}
                </span>

                {/* Status indicator */}
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

              <h1 className="font-serif italic text-4xl sm:text-5xl text-[#1A1714] tracking-tight leading-none">
                {artwork.title}
              </h1>

              <div className="text-sm font-sans text-[#8A7F72]">
                {artwork.year} · Michael David Mayo
              </div>
            </div>

            {/* Structured Accession Metadata Grid */}
            <dl className="grid grid-cols-2 gap-y-4 gap-x-6 text-xs py-4 border-b border-[#1A1714]/12">
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

            {/* Primary Action Button: Add to Collector's Selection */}
            <div className="pt-2">
              <button
                onClick={handleSaveToggle}
                className={`w-full py-4 px-6 rounded-[1px] text-xs font-sans tracking-[0.2em] uppercase font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-md ${
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
                className="w-full mt-2 py-2.5 text-xs font-sans uppercase tracking-[0.16em] text-[#8A7F72] hover:text-[#1A1714] flex items-center justify-center gap-1.5 transition-colors"
              >
                <Calendar className="w-3.5 h-3.5 text-[#B08D57]" />
                <span>Request Private Viewing Appointment at Booth</span>
              </button>
            </div>

            {/* Expandable "Artist's Perspective" Section */}
            <div className="border border-[#1A1714]/12 rounded-[2px] overflow-hidden bg-white/40">
              <button
                onClick={() => setPerspectiveExpanded(!perspectiveExpanded)}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-white/60 transition-colors"
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
              className="p-5 bg-[#141210] border border-[#B08D57]/30 text-[#F6F1E7] rounded-[2px] shadow-lg cursor-pointer group film-grain hover:border-[#B08D57] transition-colors"
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-[#B08D57] mb-2 uppercase tracking-widest">
                <span>Documentary Record</span>
                <span>{artwork.makingOfVideo.duration} · 4K</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#B08D57] text-[#0E0D0C] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Play className="w-5 h-5 ml-0.5 fill-current" />
                </div>
                <div>
                  <h4 className="font-serif italic text-lg text-[#F6F1E7]">
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
