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
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <figure className={`relative overflow-hidden group ${className}`}>
      <div className={`w-full overflow-hidden relative bg-[#1B1916] ${aspectRatioClass}`}>
        {!hasError ? (
          <img
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={`w-full h-full object-cover transition-all duration-1000 ease-out ${
              isLoaded ? 'opacity-100 scale-100 filter-none' : 'opacity-0 scale-105 blur-sm'
            }`}
          />
        ) : null}

        {/* Fallback architectural gradient if image fails or is offline */}
        {hasError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#1C1A17] via-[#2A241F] to-[#121110] text-[#E8E2D5]">
            <div className="w-12 h-12 rounded-full border border-[#B08D57]/40 flex items-center justify-center mb-3">
              <span className="font-serif italic text-lg text-[#B08D57]">MDM</span>
            </div>
            <p className="font-serif italic text-sm tracking-wide opacity-80 text-center max-w-xs">{alt}</p>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#B08D57] mt-2 opacity-60">Studio Archives · Hudson Valley</span>
          </div>
        )}

        {/* Ambient vignette scrim */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-black/10" />
      </div>

      {caption && (
        <figcaption className="mt-2.5 text-xs font-serif italic text-[#8A7F72] dark:text-[#A89F93] tracking-wide">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};
