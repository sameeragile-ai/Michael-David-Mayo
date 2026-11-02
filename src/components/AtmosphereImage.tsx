import React, { useState } from 'react';

interface AtmosphereImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatioClass?: string;
  caption?: string;
  priority?: boolean;
}

export const AtmosphereImage: React.FC<AtmosphereImageProps> = ({
  src,
  alt,
  className = '',
  aspectRatioClass = 'aspect-[16/10]',
  caption,
  priority = false,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Construct responsive Unsplash srcSet if applicable
  const src640 = src.includes('images.unsplash.com') ? src.replace(/w=\d+/, 'w=640') : src;
  const src1200 = src.includes('images.unsplash.com') ? src.replace(/w=\d+/, 'w=1200') : src;
  const src1920 = src.includes('images.unsplash.com') ? src.replace(/w=\d+/, 'w=1920') : src;
  const srcSet = src.includes('images.unsplash.com')
    ? `${src640} 640w, ${src1200} 1200w, ${src1920} 1920w`
    : undefined;

  return (
    <figure className={`relative overflow-hidden group w-full ${className}`}>
      <div className={`w-full overflow-hidden relative bg-[#1B1916] ${aspectRatioClass}`}>
        {/* Subtle gradient shimmer placeholder while loading */}
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 bg-gradient-to-r from-[#1B1916] via-[#2A241F] to-[#1B1916] animate-pulse" />
        )}

        {!hasError ? (
          <img
            src={src1200}
            srcSet={srcSet}
            sizes="(max-width: 767px) 100vw, (max-width: 1280px) 50vw, 720px"
            alt={alt}
            referrerPolicy="no-referrer"
            loading={priority ? 'eager' : 'lazy'}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={`w-full h-full object-cover transition-all duration-1000 ease-out ${
              isLoaded ? 'opacity-100 scale-100 filter-none' : 'opacity-0 scale-105 blur-sm'
            }`}
          />
        ) : null}

        {/* Fallback architectural gradient if image fails or is offline */}
        {hasError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#1C1A17] via-[#2A241F] to-[#121110] text-[#E8E2D5]">
            <div className="w-11 h-11 rounded-full border border-[#B08D57]/40 flex items-center justify-center mb-2.5">
              <span className="font-serif italic text-base text-[#B08D57]">MDM</span>
            </div>
            <p className="font-serif italic text-xs tracking-wide opacity-80 max-w-xs">{alt}</p>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#B08D57] mt-1.5 opacity-60">Studio Archives · Hudson Valley</span>
          </div>
        )}

        {/* Ambient vignette scrim */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-black/10" />
      </div>

      {caption && (
        <figcaption className="mt-2 text-xs font-serif italic text-[#8A7F72] dark:text-[#A89F93] tracking-wide">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};
