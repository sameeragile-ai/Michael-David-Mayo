import React, { useMemo } from 'react';

interface GenerativePaintingProps {
  seed: number;
  palette: string[];
  stage?: 1 | 2 | 3; // 1: Before (Imprimatura), 2: During (Glazes), 3: After (Final Gold/Varnish)
  aspectRatio?: 'portrait' | 'landscape' | 'square';
  framed?: boolean;
  frameStyle?: 'dark-ash' | 'antique-gilt' | 'minimal-ivory';
  className?: string;
  interactive?: boolean;
  onHoverParallax?: boolean;
}

// Deterministic pseudo-random number generator based on Lehmer algorithm
function createPRNG(seed: number) {
  let s = Math.abs(seed) % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export const GenerativePainting: React.FC<GenerativePaintingProps> = ({
  seed,
  palette,
  stage = 3,
  aspectRatio = 'portrait',
  framed = true,
  frameStyle = 'dark-ash',
  className = '',
}) => {
  // SVG canvas dimensions
  const { width, height } = useMemo(() => {
    switch (aspectRatio) {
      case 'landscape':
        return { width: 1000, height: 720 };
      case 'square':
        return { width: 850, height: 850 };
      case 'portrait':
      default:
        return { width: 750, height: 950 };
    }
  }, [aspectRatio]);

  // Generate deterministic artistic elements for this seed
  const elements = useMemo(() => {
    const rng = createPRNG(seed);
    const p = palette.length >= 4 ? palette : ['#0E0D0C', '#2B2824', '#B08D57', '#E8E2D5'];

    // Stage 1: Structural field lines & imprimatura
    const fieldLines = Array.from({ length: 9 }).map(() => {
      const x1 = rng() * width;
      const y1 = rng() * height;
      const x2 = rng() * width;
      const y2 = rng() * height;
      const cx1 = rng() * width;
      const cy1 = rng() * height;
      const cx2 = rng() * width;
      const cy2 = rng() * height;
      return {
        d: `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`,
        strokeWidth: 0.75 + rng() * 1.5,
        opacity: 0.15 + rng() * 0.35,
      };
    });

    const geometricPolygons = Array.from({ length: 4 }).map(() => {
      const cx = width * (0.2 + rng() * 0.6);
      const cy = height * (0.2 + rng() * 0.6);
      const r = width * (0.15 + rng() * 0.25);
      return { cx, cy, r };
    });

    // Stage 2: Chromatic masses & organic fluid waves
    const colorBlobs = Array.from({ length: 8 }).map((_, i) => {
      const cx = width * (0.15 + rng() * 0.7);
      const cy = height * (0.15 + rng() * 0.7);
      const rx = width * (0.25 + rng() * 0.45);
      const ry = height * (0.2 + rng() * 0.4);
      const rotate = rng() * 360;
      const color = p[i % p.length];
      const opacity = 0.35 + rng() * 0.55;
      return { cx, cy, rx, ry, rotate, color, opacity };
    });

    // Broad gestural sweep strokes
    const brushSweeps = Array.from({ length: 6 }).map((_, i) => {
      const startX = -100 + rng() * (width + 200);
      const startY = -50 + rng() * (height + 100);
      const endX = startX + (rng() - 0.5) * width * 1.2;
      const endY = startY + (rng() - 0.5) * height * 1.2;
      const c1X = (startX + endX) / 2 + (rng() - 0.5) * 300;
      const c1Y = (startY + endY) / 2 + (rng() - 0.5) * 300;
      const strokeWidth = 35 + rng() * 85;
      const color = p[(i + 2) % p.length];
      const opacity = 0.4 + rng() * 0.4;
      return {
        d: `M ${startX} ${startY} Q ${c1X} ${c1Y} ${endX} ${endY}`,
        strokeWidth,
        color,
        opacity,
      };
    });

    // Stage 3: Gold leaf particles, wave interference ripples, high-frequency scumble
    const goldLeafNodes = Array.from({ length: 22 }).map(() => {
      const cx = width * (0.15 + rng() * 0.7);
      const cy = height * (0.15 + rng() * 0.7);
      const r = 2 + rng() * 14;
      const opacity = 0.6 + rng() * 0.4;
      return { cx, cy, r, opacity };
    });

    const quantumWaves = Array.from({ length: 5 }).map(() => {
      const cx = width * (0.3 + rng() * 0.4);
      const cy = height * (0.3 + rng() * 0.4);
      const r = width * (0.15 + rng() * 0.45);
      return {
        cx,
        cy,
        r,
        opacity: 0.15 + rng() * 0.25,
      };
    });

    return {
      fieldLines,
      geometricPolygons,
      colorBlobs,
      brushSweeps,
      goldLeafNodes,
      quantumWaves,
      baseColor1: p[0],
      baseColor2: p[1] || p[0],
      midColor: p[2] || '#B08D57',
      highlightColor: p[p.length - 1] || '#F6F1E7',
    };
  }, [seed, palette, width, height]);

  const filterIdNoise = `noise-${seed}`;
  const filterIdDisplace = `displace-${seed}`;
  const filterIdBlur = `blur-${seed}`;
  const gradIdBase = `grad-base-${seed}`;
  const gradIdGold = `grad-gold-${seed}`;

  // SVG Artwork core
  const svgContent = (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-full block object-cover select-none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Generative contemporary oil painting by Michael David Mayo"
    >
      <defs>
        {/* Canvas fine grain */}
        <filter id={filterIdNoise} x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" result="canvasGrain" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.5  0 0 0 0 0.48  0 0 0 0 0.45  0 0 0 0.12 0" />
          <feComposite in2="SourceGraphic" in="glaze" operator="in" />
        </filter>

        {/* Organic brush edge displacement */}
        <filter id={filterIdDisplace} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="turbulence" baseFrequency="0.035 0.07" numOctaves="2" result="brushNoise" />
          <feDisplacementMap in="SourceGraphic" in2="brushNoise" scale="18" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        {/* Soft atmospheric glaze blur */}
        <filter id={filterIdBlur} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="38" />
        </filter>

        {/* Background gradient */}
        <linearGradient id={gradIdBase} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={elements.baseColor1} />
          <stop offset="60%" stopColor={elements.baseColor2} />
          <stop offset="100%" stopColor={elements.midColor} stopOpacity="0.8" />
        </linearGradient>

        {/* Gold leaf radiant gradient */}
        <radialGradient id={gradIdGold} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF2D6" />
          <stop offset="40%" stopColor="#D4AF37" />
          <stop offset="85%" stopColor="#99702E" />
          <stop offset="100%" stopColor="#5E4314" />
        </radialGradient>
      </defs>

      {/* Layer 0: Raw gessoed linen substrate */}
      <rect width={width} height={height} fill="#E8DEC9" />

      {/* STAGE 1: IMPRIMATURA & CHARCOAL FIELD (Always visible) */}
      <g id="stage-1-imprimatura">
        {/* Dilute ground wash */}
        <rect
          width={width}
          height={height}
          fill={stage === 1 ? '#D6C8AF' : `url(#${gradIdBase})`}
          opacity={stage === 1 ? 0.95 : 0.85}
        />

        {/* Geometric tension polygons */}
        {elements.geometricPolygons.map((poly, idx) => (
          <circle
            key={`poly-${idx}`}
            cx={poly.cx}
            cy={poly.cy}
            r={poly.r}
            fill="none"
            stroke={stage === 1 ? '#4A4036' : '#E9DCC4'}
            strokeWidth="0.8"
            strokeDasharray={idx % 2 === 0 ? '6 6' : '2 8'}
            opacity="0.3"
          />
        ))}

        {/* Scored field lines and charcoal vectors */}
        {elements.fieldLines.map((line, idx) => (
          <path
            key={`field-${idx}`}
            d={line.d}
            fill="none"
            stroke={stage === 1 ? '#2E2721' : elements.highlightColor}
            strokeWidth={line.strokeWidth}
            opacity={line.opacity}
            strokeLinecap="round"
          />
        ))}
      </g>

      {/* STAGE 2: VISCOUS CHROMATIC GLAZES & BROAD MASSES (Stage >= 2) */}
      {stage >= 2 && (
        <g id="stage-2-glazes">
          {/* Organic color atmosphere fields */}
          <g filter={`url(#${filterIdBlur})`}>
            {elements.colorBlobs.map((blob, idx) => (
              <ellipse
                key={`blob-${idx}`}
                cx={blob.cx}
                cy={blob.cy}
                rx={blob.rx}
                ry={blob.ry}
                transform={`rotate(${blob.rotate} ${blob.cx} ${blob.cy})`}
                fill={blob.color}
                opacity={blob.opacity}
              />
            ))}
          </g>

          {/* Broad gestural brush sweeps with displaced tactile edges */}
          <g filter={`url(#${filterIdDisplace})`}>
            {elements.brushSweeps.map((sweep, idx) => (
              <path
                key={`sweep-${idx}`}
                d={sweep.d}
                fill="none"
                stroke={sweep.color}
                strokeWidth={sweep.strokeWidth}
                strokeLinecap="round"
                opacity={sweep.opacity}
              />
            ))}
          </g>
        </g>
      )}

      {/* STAGE 3: INTERFERENCE, GOLD LEAF PARTICLES & FINAL LUMINOSITY (Stage === 3) */}
      {stage >= 3 && (
        <g id="stage-3-refinement">
          {/* Quantum wave interference rings */}
          {elements.quantumWaves.map((wave, idx) => (
            <circle
              key={`qwave-${idx}`}
              cx={wave.cx}
              cy={wave.cy}
              r={wave.r}
              fill="none"
              stroke="#D4AF37"
              strokeWidth="0.75"
              strokeDasharray="4 12"
              opacity={wave.opacity}
            />
          ))}

          {/* Gold leaf clusters and luminous pigment flecks */}
          {elements.goldLeafNodes.map((node, idx) => (
            <g key={`gold-${idx}`} transform={`translate(${node.cx}, ${node.cy})`}>
              <circle
                r={node.r * 1.5}
                fill="#B08D57"
                opacity={node.opacity * 0.3}
                filter={`url(#${filterIdBlur})`}
              />
              <polygon
                points={`0,-${node.r} ${node.r * 0.7},-${node.r * 0.3} ${node.r},0 ${node.r * 0.6},${node.r * 0.5} 0,${node.r} -${node.r * 0.5},${node.r * 0.6} -${node.r},0 -${node.r * 0.4},-${node.r * 0.7}`}
                fill={`url(#${gradIdGold})`}
                opacity={node.opacity}
              />
            </g>
          ))}

          {/* Glaze sheen & atmospheric veil */}
          <rect
            width={width}
            height={height}
            fill="none"
            stroke="rgba(246, 241, 231, 0.08)"
            strokeWidth="3"
          />
        </g>
      )}

      {/* Surface tactile linen grain overlay across all stages */}
      <rect
        width={width}
        height={height}
        fill="#FFFFFF"
        opacity="0.04"
        style={{ mixBlendMode: 'overlay' }}
      />
    </svg>
  );

  if (!framed) {
    return <div className={`overflow-hidden ${className}`}>{svgContent}</div>;
  }

  // Framed museum presentation:
  // - Archival bevel mat with hairline relief
  // - Fine dark ash or gilt moulding
  // - Gallery spotlight illumination shadow
  return (
    <div
      className={`relative group transition-transform duration-700 ease-out ${className}`}
      style={{
        perspective: '1200px',
      }}
    >
      {/* Outer moulding frame */}
      <div
        className={`relative p-2.5 sm:p-3 md:p-4 rounded-[2px] transition-all duration-500 ${
          frameStyle === 'antique-gilt'
            ? 'bg-gradient-to-tr from-[#634E2B] via-[#B08D57] to-[#7A5F35] shadow-[0_20px_45px_-10px_rgba(0,0,0,0.5),0_0_0_1px_rgba(176,141,87,0.3)]'
            : frameStyle === 'minimal-ivory'
            ? 'bg-[#EAE4D7] shadow-[0_20px_45px_-10px_rgba(0,0,0,0.2),0_0_0_1px_rgba(26,23,20,0.1)]'
            : 'bg-[#181614] shadow-[0_28px_60px_-15px_rgba(0,0,0,0.65),0_0_0_1px_rgba(255,255,255,0.06)]'
        }`}
      >
        {/* Archival Mat (Museum board border with subtle bevel) */}
        <div className="relative p-2.5 sm:p-3 md:p-4 bg-[#F5EFE6] border border-[#DDD5C5] shadow-[inset_0_2px_4px_rgba(0,0,0,0.15)] rounded-[1px]">
          {/* Inner bevel frame edge */}
          <div className="relative overflow-hidden shadow-[inset_0_0_12px_rgba(0,0,0,0.22)] bg-[#100F0E]">
            {svgContent}

            {/* Subtle top downlight glare simulation on glass */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/8 via-transparent to-black/10 opacity-60" />
          </div>
        </div>
      </div>
    </div>
  );
};
