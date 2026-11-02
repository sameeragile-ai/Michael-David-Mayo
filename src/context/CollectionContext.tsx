import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { artworksData, Artwork } from '../data/artworks';
import { exhibitionConfig } from '../data/config';

interface FlyingCoord {
  startX: number;
  startY: number;
}

interface CollectionContextType {
  savedArtworks: Artwork[];
  savedSlugs: string[];
  addArtwork: (slug: string, rect?: DOMRect) => void;
  removeArtwork: (slug: string) => void;
  isSaved: (slug: string) => boolean;
  clearCollection: () => void;
  favorites: string[];
  toggleFavorite: (slug: string) => void;
  isFavorite: (slug: string) => boolean;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  isStaffOpen: boolean;
  setIsStaffOpen: (open: boolean) => void;
  isCommandSearchOpen: boolean;
  setIsCommandSearchOpen: (open: boolean) => void;
  isSignInOpen: boolean;
  setIsSignInOpen: (open: boolean) => void;
  isBookingOpen: boolean;
  setIsBookingOpen: (open: boolean) => void;
  toast: string | null;
  clearToast: () => void;
  flyingThumb: FlyingCoord | null;
  cartAnimationKey: number;
  // Staff Settings
  pricesVisible: boolean;
  togglePricesVisible: () => void;
  idleTimeoutSeconds: number;
  setIdleTimeoutSeconds: (sec: number) => void;
  featuredSlug: string;
  setFeaturedSlug: (slug: string) => void;
  subtotal: number;
}

const CollectionContext = createContext<CollectionContextType | undefined>(undefined);

const STORAGE_KEY_SELECTION = 'mdm_art_miami_collector_selection';
const STORAGE_KEY_FAVORITES = 'mdm_art_miami_favorites';
const STORAGE_KEY_PRICES = 'mdm_kiosk_prices_visible';
const STORAGE_KEY_IDLE = 'mdm_kiosk_idle_timeout';
const STORAGE_KEY_FEATURED = 'mdm_kiosk_featured_slug';

export const CollectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedSlugs, setSavedSlugs] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_SELECTION);
      return stored ? JSON.parse(stored) : ['entanglement-in-gold'];
    } catch {
      return ['entanglement-in-gold'];
    }
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_FAVORITES);
      return stored ? JSON.parse(stored) : ['entanglement-in-gold', 'the-observer-effect', 'wave-function-collapse'];
    } catch {
      return ['entanglement-in-gold', 'the-observer-effect', 'wave-function-collapse'];
    }
  });

  const [pricesVisible, setPricesVisible] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_PRICES);
      return stored !== null ? JSON.parse(stored) : true;
    } catch {
      return true;
    }
  });

  const [idleTimeoutSeconds, setIdleTimeoutSecondsState] = useState<number>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_IDLE);
      return stored !== null ? JSON.parse(stored) : exhibitionConfig.idleTimeoutSeconds;
    } catch {
      return exhibitionConfig.idleTimeoutSeconds;
    }
  });

  const [featuredSlug, setFeaturedSlugState] = useState<string>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_FEATURED);
      return stored || exhibitionConfig.featuredWorkSlug;
    } catch {
      return exhibitionConfig.featuredWorkSlug;
    }
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isStaffOpen, setIsStaffOpen] = useState(false);
  const [isCommandSearchOpen, setIsCommandSearchOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [flyingThumb, setFlyingThumb] = useState<FlyingCoord | null>(null);
  const [cartAnimationKey, setCartAnimationKey] = useState(0);

  // Sync selection to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SELECTION, JSON.stringify(savedSlugs));
    } catch {}
  }, [savedSlugs]);

  // Sync favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_FAVORITES, JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  const toggleFavorite = useCallback((slug: string) => {
    setFavorites(prev => {
      const exists = prev.includes(slug);
      const artwork = artworksData.find(a => a.slug === slug);
      if (exists) {
        setToast(artwork ? `Removed "${artwork.title}" from favorites` : "Removed from favorites");
        return prev.filter(s => s !== slug);
      } else {
        setToast(artwork ? `Favorited "${artwork.title}"` : "Added to favorites");
        return [...prev, slug];
      }
    });
  }, []);

  const isFavorite = useCallback((slug: string) => {
    return favorites.includes(slug);
  }, [favorites]);

  const togglePricesVisible = useCallback(() => {
    setPricesVisible(prev => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY_PRICES, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const setIdleTimeoutSeconds = useCallback((sec: number) => {
    setIdleTimeoutSecondsState(sec);
    try {
      localStorage.setItem(STORAGE_KEY_IDLE, JSON.stringify(sec));
    } catch {}
  }, []);

  const setFeaturedSlug = useCallback((slug: string) => {
    setFeaturedSlugState(slug);
    try {
      localStorage.setItem(STORAGE_KEY_FEATURED, slug);
    } catch {}
  }, []);

  const addArtwork = useCallback((slug: string, rect?: DOMRect) => {
    setSavedSlugs(prev => {
      if (prev.includes(slug)) {
        setToast("Artwork is already in your selection");
        return prev;
      }
      const artwork = artworksData.find(a => a.slug === slug);
      setToast(artwork ? `Added "${artwork.title}" to selection` : "Added to selection");
      return [...prev, slug];
    });

    setCartAnimationKey(k => k + 1);

    if (rect) {
      setFlyingThumb({
        startX: rect.left + rect.width / 2,
        startY: rect.top + rect.height / 2,
      });
      setTimeout(() => {
        setFlyingThumb(null);
      }, 750);
    }
  }, []);

  const removeArtwork = useCallback((slug: string) => {
    setSavedSlugs(prev => prev.filter(s => s !== slug));
  }, []);

  const isSaved = useCallback((slug: string) => {
    return savedSlugs.includes(slug);
  }, [savedSlugs]);

  const clearCollection = useCallback(() => {
    setSavedSlugs([]);
    try {
      localStorage.removeItem(STORAGE_KEY_SELECTION);
    } catch {}
  }, []);

  const clearToast = useCallback(() => {
    setToast(null);
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const savedArtworks = artworksData.filter(a => savedSlugs.includes(a.slug));
  const subtotal = savedArtworks.reduce((acc, curr) => acc + curr.priceRaw, 0);

  return (
    <CollectionContext.Provider
      value={{
        savedArtworks,
        savedSlugs,
        addArtwork,
        removeArtwork,
        isSaved,
        clearCollection,
        favorites,
        toggleFavorite,
        isFavorite,
        isDrawerOpen,
        setIsDrawerOpen,
        isStaffOpen,
        setIsStaffOpen,
        isCommandSearchOpen,
        setIsCommandSearchOpen,
        isSignInOpen,
        setIsSignInOpen,
        isBookingOpen,
        setIsBookingOpen,
        toast,
        clearToast,
        flyingThumb,
        cartAnimationKey,
        pricesVisible,
        togglePricesVisible,
        idleTimeoutSeconds,
        setIdleTimeoutSeconds,
        featuredSlug,
        setFeaturedSlug,
        subtotal,
      }}
    >
      {children}
    </CollectionContext.Provider>
  );
};

export const useCollection = () => {
  const context = useContext(CollectionContext);
  if (!context) {
    throw new Error('useCollection must be used within a CollectionProvider');
  }
  return context;
};
