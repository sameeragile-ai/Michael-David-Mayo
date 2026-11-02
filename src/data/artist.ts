export interface ExhibitionRecord {
  year: number;
  title: string;
  venue: string;
  location: string;
  type: 'Solo' | 'Institutional' | 'Art Fair' | 'Biennale';
}

export interface PhilosophyCard {
  id: string;
  chapterNumber: string;
  title: string;
  subtitle: string;
  quote: string;
  duration: string;
  summary: string;
  posterBg: string;
}

export interface ArtistProfile {
  name: string;
  born: string;
  studios: string[];
  education: string;
  pullQuote: string;
  biography: string[];
  quantumRealismThesis: {
    lead: string;
    col1: string;
    col2: string;
  };
  timeline: ExhibitionRecord[];
  philosophyCards: PhilosophyCard[];
}

export const artistData: ArtistProfile = {
  name: "Michael David Mayo",
  born: "b. 1978, New York",
  studios: ["Hudson Valley, New York", "Zurich, Switzerland"],
  education: "MFA, Yale School of Art · BA, Philosophy & Physics, Columbia University",
  pullQuote: "Light is not merely that which makes the world visible; it is the fundamental medium through which matter participates in its own unfolding.",
  biography: [
    "Michael David Mayo is an American contemporary painter whose practice investigates the perceptual boundaries between theoretical physics, classical pigment alchemy, and the phenomenological act of viewing. Spanning over two decades of studio research, his work synthesizes Dutch Golden Age glazing chemistry with contemporary inquiries into non-locality, wave-particle duality, and observer entanglement.",
    "Mayo prepares his own paint bodies from dry mineral crystals, natural resins, and cold-pressed organic oils in his Hudson Valley barn studio. Rather than depicting scientific phenomena illustratively, his canvases act as physical laboratories where light, gravity, viscosity, and surface tension operate as co-authors.",
    "His works have been presented in solo exhibitions across New York, Zurich, London, and Berlin, and are housed in distinguished private and museum collections internationally. The present Art Miami 2026 presentation marks the debut of his comprehensive cycle, Inside the Work."
  ],
  quantumRealismThesis: {
    lead: "Quantum Realism does not seek to paint the quantum world; it seeks to construct paintings that behave according to its principles.",
    col1: "In classical representation, the canvas is treated as a static window looking out upon an immutable external reality. Quantum Realism departs from this Newtonian premise by recognizing that the viewing subject and the viewed object form an indivisible, entangled system. Mayo's multi-layered glaze structures refuse a single stable reading—translucent veils of smalt, lapis, and carbon react dynamically to incident illumination, viewer distance, and ambient movement.",
    col2: "By incorporating hand-beaten gold grounds, powdered marble, and polarized metallic dispersions, each canvas functions as an optical instrument. As the collector moves across the booth space, interference waveforms activate and subside. The painting is never in a fixed state; like Schrödinger's wave function, its chromatic reality collapses into specific focus only at the exact moment and coordinate of human observation."
  },
  timeline: [
    {
      year: 2026,
      title: "Inside the Work (Solo Fair Presentation)",
      venue: "Art Miami · Booth P-214",
      location: "Miami, FL",
      type: "Art Fair"
    },
    {
      year: 2025,
      title: "The Non-Local Field: Recent Paintings",
      venue: "Galerie Von Berg & Associates",
      location: "Zurich, Switzerland",
      type: "Solo"
    },
    {
      year: 2024,
      title: "Collateral Event: Foreign Bodies / Entangled Space",
      venue: "60th Venice Biennale (Palazzo Contarini)",
      location: "Venice, Italy",
      type: "Biennale"
    },
    {
      year: 2023,
      title: "Monochrome & Irradiance: Survey 2015–2023",
      venue: "Dia Art Foundation Project Space",
      location: "Beacon, NY",
      type: "Institutional"
    },
    {
      year: 2022,
      title: "Art Basel Unlimited: Monumental Works",
      venue: "Messe Basel",
      location: "Basel, Switzerland",
      type: "Art Fair"
    },
    {
      year: 2020,
      title: "The Observer Condition",
      venue: "White Cube Gallery",
      location: "London, UK",
      type: "Solo"
    }
  ],
  philosophyCards: [
    {
      id: "phil-1",
      chapterNumber: "01",
      title: "The Observer Condition",
      subtitle: "Perception as Active Creation",
      quote: "When a human gaze enters the field of a painting, the work completes its circuit. The canvas is not a monument to past action; it is a live instrument waiting to be measured.",
      duration: "04:12",
      summary: "Mayo discusses the Heisenberg principle applied to visual art, examining how the physical presence of a collector shifts the chromatic resonance of the linen ground.",
      posterBg: "linear-gradient(135deg, #0E0D0C 0%, #1D2A44 100%)"
    },
    {
      id: "phil-2",
      chapterNumber: "02",
      title: "The Alchemy of Pigment",
      subtitle: "Material History & Optical Memory",
      quote: "Lapis lazuli, smalt, and cinnabar contain geological time. When we grind raw minerals on porphyry stone, we are liberating photons trapped hundreds of millions of years ago.",
      duration: "05:48",
      summary: "An inside look into Mayo's studio ritual: pestling semi-precious Afghan lapis, refining cold-pressed walnut oil, and layering Venetian damar varnishes.",
      posterBg: "linear-gradient(135deg, #180F12 0%, #421820 100%)"
    },
    {
      id: "phil-3",
      chapterNumber: "03",
      title: "The Architecture of Silence",
      subtitle: "Negative Space & White Fields",
      quote: "Silence in a painting is never empty. It is a charged vacuum state—infinite potential awaiting a perturbation.",
      duration: "03:35",
      summary: "Exploring the thirty-pass white paintings, investigating how zinc oxide and Venetian chalk create luminous surfaces that activate peripheral human vision.",
      posterBg: "linear-gradient(135deg, #1B1713 0%, #382F27 100%)"
    },
    {
      id: "phil-4",
      chapterNumber: "04",
      title: "Scale, Body & Architecture",
      subtitle: "The 13-Inch Frame to the 8-Foot Wall",
      quote: "Whether viewed through an intimate digital window or standing before an eight-foot linen wall, the encounter must demand full somatic attention.",
      duration: "04:20",
      summary: "Thoughts on spatial immersion, architectural scale, and the design of the Art Miami 2026 pedestal kiosk experience.",
      posterBg: "linear-gradient(135deg, #0A1128 0%, #1C2D5A 100%)"
    }
  ]
};
