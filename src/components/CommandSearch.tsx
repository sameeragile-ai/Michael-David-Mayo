import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ArrowRight, CornerDownLeft, MapPin, Sparkles, Clock, Paintbrush } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { artworksData, Artwork } from '../data/artworks';

interface CommandSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchItem {
  id: string;
  type: 'artwork' | 'city' | 'experience';
  title: string;
  subtitle: string;
  path: string;
}

const mockCities = [
  { id: 'c1', name: 'Miami', detail: 'Art Miami 2026 · Booth P-214 · 10 Exhibited Works', path: '/#exhibition' },
  { id: 'c2', name: 'New York', detail: 'Hudson Valley Studio & Dia Beacon Archive', path: '/#artist' },
  { id: 'c3', name: 'Zurich', detail: 'Galerie Von Berg & Associates Permanent Collection', path: '/#artist' },
  { id: 'c4', name: 'Venice', detail: 'Biennale Collateral Presentation · Palazzo Contarini', path: '/#artist' },
  { id: 'c5', name: 'London', detail: 'White Cube Project Space Retrospective', path: '/#artist' },
];

const mockExperiences = [
  { id: 'e1', title: "Chef's Table & Private Salon", detail: "Culinary pairing with Michael David Mayo (from £140)", path: '/#process' },
  { id: 'e2', title: "VIP Booth Viewing & Provenance", detail: "Private after-hours walkthrough at Art Miami", path: '/#exhibition' },
  { id: 'e3', title: "Studio Alchemy Masterclass", detail: "Mineral grinding & glaze chemistry in Hudson Valley", path: '/#process' },
  { id: 'e4', title: "Wine Pairing & Sensory Reception", detail: "Tasting menu alongside Quantum Realism canvases (from £75)", path: '/#philosophy' },
];

export const CommandSearch: React.FC<CommandSearchProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Entanglement in Gold',
    'Miami Booth P-214',
    'Quantum Realism',
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Global ⌘K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Filter items based on query
  const searchResults = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      // Default suggested items
      const suggestedArtworks = artworksData.slice(0, 3).map(a => ({
        id: a.id,
        type: 'artwork' as const,
        title: a.title,
        subtitle: `${a.year} · ${a.medium}`,
        path: `/work/${a.slug}`,
      }));
      const suggestedCities = mockCities.slice(0, 2).map(c => ({
        id: c.id,
        type: 'city' as const,
        title: c.name,
        subtitle: c.detail,
        path: c.path,
      }));
      return [...suggestedArtworks, ...suggestedCities];
    }

    const matchedArtworks: SearchItem[] = artworksData
      .filter(a => a.title.toLowerCase().includes(q) || a.medium.toLowerCase().includes(q) || a.number.includes(q))
      .map(a => ({
        id: a.id,
        type: 'artwork',
        title: a.title,
        subtitle: `Catalogue No. ${a.number} · ${a.dimensions.inches} · ${a.price}`,
        path: `/work/${a.slug}`,
      }));

    const matchedCities: SearchItem[] = mockCities
      .filter(c => c.name.toLowerCase().includes(q) || c.detail.toLowerCase().includes(q))
      .map(c => ({
        id: c.id,
        type: 'city',
        title: c.name,
        subtitle: c.detail,
        path: c.path,
      }));

    const matchedExperiences: SearchItem[] = mockExperiences
      .filter(e => e.title.toLowerCase().includes(q) || e.detail.toLowerCase().includes(q))
      .map(e => ({
        id: e.id,
        type: 'experience',
        title: e.title,
        subtitle: e.detail,
        path: e.path,
      }));

    return [...matchedArtworks, ...matchedCities, ...matchedExperiences];
  }, [query]);

  // Arrow key navigation and Enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % Math.max(1, searchResults.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + searchResults.length) % Math.max(1, searchResults.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const current = searchResults[selectedIndex];
      if (current) {
        selectItem(current);
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const selectItem = (item: SearchItem) => {
    if (!recentSearches.includes(item.title)) {
      setRecentSearches(prev => [item.title, ...prev.slice(0, 3)]);
    }
    onClose();
    if (item.path.startsWith('/#')) {
      const id = item.path.replace('/#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/');
      }
    } else {
      navigate(item.path);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-start justify-center pt-16 sm:pt-24 px-4 overflow-y-auto">
          {/* Glass Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-[#141417]/95 border border-white/15 rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-hidden z-10 text-[#F6F1E7]"
          >
            {/* Search Input Bar */}
            <div className="relative flex items-center px-5 py-4 border-b border-white/10">
              <Search className="w-5 h-5 text-[#FF5A36] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Search artworks, cities, experiences, or pigments..."
                className="w-full bg-transparent border-none pl-4 pr-10 text-sm sm:text-base text-white placeholder-white/40 focus:outline-none"
              />
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                aria-label="Close search"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-[60vh] overflow-y-auto p-3 space-y-1">
              {/* Recent searches strip if query is empty */}
              {!query && recentSearches.length > 0 && (
                <div className="px-3 py-2 flex items-center gap-2 text-xs text-white/40">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="uppercase tracking-widest text-[10px]">Recent Searches:</span>
                  <div className="flex flex-wrap gap-1.5 ml-1">
                    {recentSearches.map(term => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-2 py-0.5 rounded-md bg-white/5 hover:bg-white/10 text-white/70 text-xs transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {searchResults.length === 0 ? (
                <div className="py-12 text-center text-white/40 text-sm">
                  No matching entries found for "{query}".
                </div>
              ) : (
                searchResults.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={() => selectItem(item)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-gradient-to-r from-[#E5173F]/20 via-[#FF5A36]/20 to-transparent border border-[#FF5A36]/40 text-white shadow-sm'
                          : 'hover:bg-white/5 text-white/80 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            item.type === 'artwork'
                              ? 'bg-[#E5173F]/20 text-[#E5173F]'
                              : item.type === 'city'
                              ? 'bg-[#FF5A36]/20 text-[#FF5A36]'
                              : 'bg-[#F7B733]/20 text-[#F7B733]'
                          }`}
                        >
                          {item.type === 'artwork' && <Paintbrush className="w-4 h-4" />}
                          {item.type === 'city' && <MapPin className="w-4 h-4" />}
                          {item.type === 'experience' && <Sparkles className="w-4 h-4" />}
                        </div>

                        <div className="truncate">
                          <div className="text-sm font-medium truncate flex items-center gap-2">
                            <span>{item.title}</span>
                            <span className="text-[10px] uppercase font-mono tracking-widest px-1.5 py-0.5 rounded bg-white/10 text-white/60">
                              {item.type}
                            </span>
                          </div>
                          <div className="text-xs text-white/40 truncate">{item.subtitle}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-white/40 shrink-0">
                        {isSelected && (
                          <span className="flex items-center gap-1 text-[11px] text-[#FF5A36]">
                            <span>Select</span>
                            <CornerDownLeft className="w-3 h-3" />
                          </span>
                        )}
                        <ArrowRight className="w-4 h-4 opacity-40" />
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Bottom Keyboard Hint Bar */}
            <div className="px-5 py-3 bg-white/[0.03] border-t border-white/10 flex items-center justify-between text-[11px] text-white/40 font-mono">
              <div className="flex items-center gap-4">
                <span>↑↓ Navigate</span>
                <span>↵ Open</span>
                <span>ESC Close</span>
              </div>
              <div className="text-[#FF5A36]">⌘K Instant Search</div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
