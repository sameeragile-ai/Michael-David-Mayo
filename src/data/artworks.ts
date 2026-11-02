export interface ProcessStage {
  title: string;
  subtitle: string;
  description: string;
  layerCount: number;
}

export interface Artwork {
  id: string;
  number: string;
  slug: string;
  title: string;
  year: number;
  medium: string;
  dimensions: {
    inches: string;
    cm: string;
  };
  priceRaw: number;
  price: string;
  availability: 'Available' | 'Reserved' | 'Sold';
  shortDescription: string;
  extendedPerspective: string[];
  palette: string[];
  seed: number;
  aspectRatio: 'portrait' | 'landscape' | 'square';
  isLargeScale: boolean;
  featured?: boolean;
  scaleHeightCm: number;
  scaleWidthCm: number;
  processStages: {
    before: ProcessStage;
    during: ProcessStage;
    after: ProcessStage;
  };
  makingOfVideo: {
    duration: string;
    chapter: string;
    subtitle: string;
    cameraAngle: string;
  };
}

export const artworksData: Artwork[] = [
  {
    id: "work-01",
    number: "01",
    slug: "entanglement-in-gold",
    title: "Entanglement in Gold",
    year: 2026,
    medium: "Oil, cold wax, and 23-karat gold ground on French linen",
    dimensions: {
      inches: "78 × 64 in",
      cm: "198 × 163 cm"
    },
    priceRaw: 78000,
    price: "$78,000",
    availability: "Available",
    shortDescription: "A monumental suspended dialogue between raw lapis pigments and luminous hand-beaten gold strata, investigating how matter retains memory of contact.",
    extendedPerspective: [
      "In Entanglement in Gold, spatial boundaries dissolve into atmospheric sediment. Working on custom-loomed French linen with heavy tooth, the surface is primed through successive grounds of warm chalk and walnut oil before initial compositional vectors are scored with bone charcoal.",
      "The gold leaf is applied not as ornamentation, but as an active optical transducer—diffusing ambient room illumination while the underlying dark lapis and burnt umber fields register deep optical gravity. The piece shifts continuously as visitors move across the physical viewing field."
    ],
    palette: ["#0E0D0C", "#1D2A44", "#B08D57", "#D4AF37", "#E9DCC4", "#4A3B2C"],
    seed: 1042,
    aspectRatio: "portrait",
    isLargeScale: true,
    featured: true,
    scaleHeightCm: 198,
    scaleWidthCm: 163,
    processStages: {
      before: {
        title: "Stage I — Tension Scaffolding",
        subtitle: "Charcoal & Imprimatura",
        description: "Initial geometric field lines and volumetric boundary mapping rendered with vine charcoal on gessoed Belgian linen.",
        layerCount: 1
      },
      during: {
        title: "Stage II — Viscous Glaze Cycles",
        subtitle: "Lapis & Cold Wax Suspension",
        description: "Fourteen translucent glaze passes suspended in damar resin and walnut oil, scraped down with heavy steel spatulas.",
        layerCount: 2
      },
      after: {
        title: "Stage III — Gilt Transduction",
        subtitle: "Gold Leaf & Matte Micro-wax",
        description: "Targeted application of 23k gold ground with micro-crystalline wax seal, yielding anisotropic reflectance.",
        layerCount: 3
      }
    },
    makingOfVideo: {
      duration: "04:18",
      chapter: "Chapter 1: The Gilded Boundary",
      subtitle: "Studio documentary on the application of hand-beaten gold ground and lapis glazes.",
      cameraAngle: "Overhead 4K Macro · North Studio Skylight"
    }
  },
  {
    id: "work-02",
    number: "02",
    slug: "the-observer-effect",
    title: "The Observer Effect",
    year: 2025,
    medium: "Oil, graphite dispersion, and asphaltum on Belgian canvas",
    dimensions: {
      inches: "72 × 60 in",
      cm: "183 × 152 cm"
    },
    priceRaw: 64000,
    price: "$64,000",
    availability: "Available",
    shortDescription: "An exploration of quantum wave collapse through smoky graphite veils that oscillate between impenetrable darkness and sudden incandescent clarity.",
    extendedPerspective: [
      "The Observer Effect interrogates the ontological shift that occurs when an artwork is beheld. Using liquid graphite dispersion suspended in Venetian turpentine, Mayo deposits delicate particulate drifts that mimic wave interference patterns.",
      "Varying thickness creates moments where the eye searches for a definitive focal horizon, only to be redirected along soft radial gradients. The work refuses static resolution, demanding patience and physical proximity from the viewer."
    ],
    palette: ["#141312", "#2B2824", "#7C6F5E", "#B89B72", "#E8E2D5", "#C27D38"],
    seed: 2891,
    aspectRatio: "portrait",
    isLargeScale: true,
    scaleHeightCm: 183,
    scaleWidthCm: 152,
    processStages: {
      before: {
        title: "Stage I — Ground Demarcation",
        subtitle: "Graphite Grid & Washes",
        description: "Structural field plotting using pulverized dry graphite and cold-pressed linseed oil.",
        layerCount: 1
      },
      during: {
        title: "Stage II — Fluid Stratification",
        subtitle: "Asphaltum & Umber Mass",
        description: "Application of viscous bituminous layers swept across the horizontal axes with broad horsehair brushes.",
        layerCount: 2
      },
      after: {
        title: "Stage III — Surface Polishing",
        subtitle: "Selective Burnishing",
        description: "Selective hand-burnishing with agate stones to reveal metallic micro-crystallization in the dark fields.",
        layerCount: 3
      }
    },
    makingOfVideo: {
      duration: "03:45",
      chapter: "Chapter 2: Particulate Dispersion",
      subtitle: "Observing dry graphite dust react to natural solvent evaporation on horizontal canvas.",
      cameraAngle: "Tracking Gimbal · Low Incident Angle"
    }
  },
  {
    id: "work-03",
    number: "03",
    slug: "field-of-quiet-light",
    title: "Field of Quiet Light",
    year: 2026,
    medium: "Oil, zinc oxide, and Venetian chalk on washed canvas",
    dimensions: {
      inches: "60 × 60 in",
      cm: "152 × 152 cm"
    },
    priceRaw: 52000,
    price: "$52,000",
    availability: "Reserved",
    shortDescription: "An almost monochromatic meditation on morning irradiance, built through thirty translucent white and warm ivory glazes.",
    extendedPerspective: [
      "Field of Quiet Light represents Mayo's most restrained investigation of luminosity. By layering zinc oxide against chalk gesso, the canvas retains an inner luminescence that appears backlit even under modest gallery spotlighting.",
      "Subtle shifts of temperature—from pale titanium coolness to warm alabaster undertones—create a breathing surface that activates peripheral vision, evoking quiet morning light through frosted glass."
    ],
    palette: ["#F6F1E7", "#EBE2D3", "#D8CCB7", "#BFA785", "#8C7B65", "#A38655"],
    seed: 3341,
    aspectRatio: "square",
    isLargeScale: false,
    scaleHeightCm: 152,
    scaleWidthCm: 152,
    processStages: {
      before: {
        title: "Stage I — Chalk Imprimatura",
        subtitle: "Venetian Gesso Build",
        description: "Six coats of hand-slaked Bolognese chalk and rabbit skin glue, rubbed down with pumice stone.",
        layerCount: 1
      },
      during: {
        title: "Stage II — Thermal Shifting",
        subtitle: "Cool Zinc & Warm Lead Tin",
        description: "Micro-scumbled veil passes balancing warm undertones against cool crystalline top glazes.",
        layerCount: 2
      },
      after: {
        title: "Stage III — Atmospheric Harmonization",
        subtitle: "Carnauba Wax Seal",
        description: "Final matte wax consolidation eliminating surface specular sheen for uniform diffusion.",
        layerCount: 3
      }
    },
    makingOfVideo: {
      duration: "02:50",
      chapter: "Chapter 3: Monochromatic Depth",
      subtitle: "The tactile alchemy of layering thirty translucent whites onto raw textured linen.",
      cameraAngle: "Fixed Macro Focus · Raking Studio Light"
    }
  },
  {
    id: "work-04",
    number: "04",
    slug: "superposition-no-4",
    title: "Superposition No. 4",
    year: 2025,
    medium: "Oil, vermilion, and oxidized copper ground on linen",
    dimensions: {
      inches: "84 × 68 in",
      cm: "213 × 173 cm"
    },
    priceRaw: 88000,
    price: "$88,000",
    availability: "Available",
    shortDescription: "Intense embers of vermilion and smoldering mineral violet intersect in a dramatic vertical surge of kinetic tension.",
    extendedPerspective: [
      "In Superposition No. 4, thermodynamic energy meets spatial containment. Raw vermilion pigment is ground directly with stand oil on the studio glass slab before being deployed across sweeping gestural vectors.",
      "The contrast between oxidized copper patinas and blazing mineral reds creates an electrical vibration across the canvas plane, suggesting simultaneous physical states coexisting before measurement."
    ],
    palette: ["#180F12", "#421820", "#872B32", "#D34B36", "#E89B48", "#1E2B2A"],
    seed: 4920,
    aspectRatio: "portrait",
    isLargeScale: true,
    scaleHeightCm: 213,
    scaleWidthCm: 173,
    processStages: {
      before: {
        title: "Stage I — Kinetic Underdrawing",
        subtitle: "Mineral Charcoal & Sanguine",
        description: "Dynamic diagonal velocity vectors mapped in raw red chalk and vine charcoal.",
        layerCount: 1
      },
      during: {
        title: "Stage II — Vermilion Sensation",
        subtitle: "Stand Oil & Raw Pigment",
        description: "Wet-in-wet fusion of heavy-bodied vermilion and copper verdigris glazes.",
        layerCount: 2
      },
      after: {
        title: "Stage III — Edge Definition",
        subtitle: "Razor Scrape & Glaze",
        description: "Selective scraping back to previous strata to expose compressed chronological records of the gesture.",
        layerCount: 3
      }
    },
    makingOfVideo: {
      duration: "05:12",
      chapter: "Chapter 4: Thermal Friction",
      subtitle: "Documenting the physical force of dragging dry vermilion across wet copper underpaint.",
      cameraAngle: "Slow-Motion 120fps · Side Profile"
    }
  },
  {
    id: "work-05",
    number: "05",
    slug: "wave-function-collapse",
    title: "Wave Function Collapse",
    year: 2026,
    medium: "Oil, ultramarine ash, and raw umber on linen",
    dimensions: {
      inches: "80 × 96 in",
      cm: "203 × 244 cm"
    },
    priceRaw: 96000,
    price: "$96,000",
    availability: "Sold",
    shortDescription: "A monumental panoramic canvas capturing oceanic depths and celestial harmonics in a sweeping horizontal continuum.",
    extendedPerspective: [
      "Measuring eight feet in breadth, Wave Function Collapse is the largest work in the Art Miami presentation. The horizontal format envelops the collector's peripheral field, creating an immersion akin to looking out over an open nocturnal sea.",
      "Ultramarine ash provides an ethereal translucency beneath heavier passes of raw umber and manganese violet, embodying the physical manifestation of probability fields in paint."
    ],
    palette: ["#0A1128", "#1C2D5A", "#3F588F", "#829AB1", "#E2E8F0", "#8B6B38"],
    seed: 5104,
    aspectRatio: "landscape",
    isLargeScale: true,
    scaleHeightCm: 203,
    scaleWidthCm: 244,
    processStages: {
      before: {
        title: "Stage I — Horizon Plotting",
        subtitle: "Panoramic Imprimatura",
        description: "Horizontal tension bands laid across the eight-foot expanse using diluted bone black.",
        layerCount: 1
      },
      during: {
        title: "Stage II — Ultramarine Swell",
        subtitle: "Flooded Solvent Washes",
        description: "Vast pools of pure ultramarine pigment washed across the horizontal plane with natural sponge.",
        layerCount: 2
      },
      after: {
        title: "Stage III — Celestial Consolidation",
        subtitle: "Stippled Interference Glazes",
        description: "Microscopic gold dust and damar varnish applied along wave crests to catch side illumination.",
        layerCount: 3
      }
    },
    makingOfVideo: {
      duration: "04:30",
      chapter: "Chapter 5: The Wide Horizon",
      subtitle: "Working across an 8-foot stretched canvas mounted on the studio easel wall.",
      cameraAngle: "Wide Panoramic Rail · Time-lapse & Real-time"
    }
  },
  {
    id: "work-06",
    number: "06",
    slug: "non-locality-in-cobalt",
    title: "Non-Locality in Cobalt",
    year: 2025,
    medium: "Oil and smalt pigment on unprimed Belgian linen",
    dimensions: {
      inches: "56 × 44 in",
      cm: "142 × 112 cm"
    },
    priceRaw: 42000,
    price: "$42,000",
    availability: "Available",
    shortDescription: "Deep resonant blues punctuated by antique bronze flecks, examining how disparate physical events remain mysteriously synchronized.",
    extendedPerspective: [
      "Non-Locality in Cobalt references the historic use of smalt—ground cobalt glass favored by seventeenth-century masters. Its vitreous particles refract light from within rather than reflecting solely from the surface plane.",
      "Mayo pairs this deep glassy pigment with raw linen borders, allowing the textile's woven flax to enter the visual conversation as an equal participant with the painted void."
    ],
    palette: ["#0B1B3D", "#1E3A8A", "#3B82F6", "#93C5FD", "#B08D57", "#1E2229"],
    seed: 6712,
    aspectRatio: "portrait",
    isLargeScale: false,
    scaleHeightCm: 142,
    scaleWidthCm: 112,
    processStages: {
      before: {
        title: "Stage I — Linen Sizing",
        subtitle: "Clear Rabbit Skin Size",
        description: "Sizing the unprimed linen to preserve its raw amber hue and woven texture.",
        layerCount: 1
      },
      during: {
        title: "Stage II — Smalt Vitrification",
        subtitle: "Cobalt Glass Suspension",
        description: "Suspending coarse cobalt glass particles in cold-pressed walnut oil for internal prism refraction.",
        layerCount: 2
      },
      after: {
        title: "Stage III — Bronze Accents",
        subtitle: "Metallic Pointillism",
        description: "Precision dry-brush application of antique bronze along the edges of the color wells.",
        layerCount: 3
      }
    },
    makingOfVideo: {
      duration: "03:15",
      chapter: "Chapter 6: Glass & Pigment",
      subtitle: "Preparing historic smalt pigment by hand-pestling cobalt glass in the studio crucible.",
      cameraAngle: "Macro Tabletop · High Contrast"
    }
  },
  {
    id: "work-07",
    number: "07",
    slug: "quantum-foam-study-ix",
    title: "Quantum Foam (Study IX)",
    year: 2026,
    medium: "Oil, marble dust, and iron oxide on linen",
    dimensions: {
      inches: "48 × 48 in",
      cm: "122 × 122 cm"
    },
    priceRaw: 38500,
    price: "$38,500",
    availability: "Available",
    shortDescription: "A densely textured textural work evoking spacetime turbulence at the Planck scale through porous mineral topography.",
    extendedPerspective: [
      "In Quantum Foam (Study IX), the paint behaves as geologic sediment. Carrara marble dust is folded into the oil body to build tactile relief that casts real microscopic shadows under gallery lighting.",
      "The composition evokes microscopic subatomic fluctuations—where emptiness is revealed not as void, but as a turbulent frothing sea of virtual particle creation and annihilation."
    ],
    palette: ["#1B1713", "#382F27", "#645547", "#9E8974", "#D8CCB9", "#946B42"],
    seed: 7391,
    aspectRatio: "square",
    isLargeScale: false,
    scaleHeightCm: 122,
    scaleWidthCm: 122,
    processStages: {
      before: {
        title: "Stage I — Geologic Base",
        subtitle: "Marble Dust Paste",
        description: "Spreading heavy marble dust impasto with notched steel trowels across the square format.",
        layerCount: 1
      },
      during: {
        title: "Stage II — Iron Wash Permeation",
        subtitle: "Natural Oxide Infiltration",
        description: "Allowing liquefied natural iron oxides to pool in crevices and fissures of the drying paste.",
        layerCount: 2
      },
      after: {
        title: "Stage III — Crest Burnishing",
        subtitle: "Wax Buffing",
        description: "Hand-buffing the elevated marble ridges to a smooth ivory sheen against dark textured troughs.",
        layerCount: 3
      }
    },
    makingOfVideo: {
      duration: "02:40",
      chapter: "Chapter 7: Mineral Topography",
      subtitle: "Troweling Carrara marble paste to capture Planck-scale spacetime turbulence in oil.",
      cameraAngle: "Low Rake Shadow Camera · 4K"
    }
  },
  {
    id: "work-08",
    number: "08",
    slug: "chromatic-resonance",
    title: "Chromatic Resonance",
    year: 2025,
    medium: "Oil, cadmium yellow, and smoked pine soot on canvas",
    dimensions: {
      inches: "64 × 52 in",
      cm: "163 × 132 cm"
    },
    priceRaw: 48000,
    price: "$48,000",
    availability: "Sold",
    shortDescription: "A radiant core of cadmium yellow dissolving into velvety carbon darkness, meditating on light as an active spatial presence.",
    extendedPerspective: [
      "Chromatic Resonance balances absolute thermal extremes. Smoked pine soot—one of the oldest black pigments known to human history—absorbs almost 99% of incident photons, creating a bottomless spatial void.",
      "Emerging from this velvety perimeter is a radiant core of warm cadmium and Naples yellow, calibrated so precisely that the painting seems to emit warm thermal radiation into the surrounding gallery."
    ],
    palette: ["#0C0B0A", "#26221D", "#664E1C", "#C49629", "#F3D369", "#FAF3DE"],
    seed: 8140,
    aspectRatio: "portrait",
    isLargeScale: false,
    scaleHeightCm: 163,
    scaleWidthCm: 132,
    processStages: {
      before: {
        title: "Stage I — Carbon Field",
        subtitle: "Pine Soot Ground",
        description: "Multiple thin passes of lampblack and pine soot creating total photometric absorption.",
        layerCount: 1
      },
      during: {
        title: "Stage II — Incandescent Core",
        subtitle: "Cadmium Fusion",
        description: "Central circular application of pure cadmium yellow worked outward in delicate radial micro-glazes.",
        layerCount: 2
      },
      after: {
        title: "Stage III — Edge Diffusion",
        subtitle: "Feathered Transition",
        description: "Soft badger-hair blending along the perimeter where luminescence yields to void.",
        layerCount: 3
      }
    },
    makingOfVideo: {
      duration: "03:05",
      chapter: "Chapter 8: The Emitting Core",
      subtitle: "Balancing light-absorbing carbon against radiant cadmium on a unified surface.",
      cameraAngle: "Rotating Arm Focus · Natural Daylight"
    }
  },
  {
    id: "work-09",
    number: "09",
    slug: "boundary-of-the-unseen",
    title: "Boundary of the Unseen",
    year: 2024,
    medium: "Oil, cinnabar, and raw asphalt on heavy linen",
    dimensions: {
      inches: "70 × 54 in",
      cm: "178 × 137 cm"
    },
    priceRaw: 58000,
    price: "$58,000",
    availability: "Available",
    shortDescription: "Rich claret glazes and deep obsidian fields articulate the fragile threshold separating conscious observation from latent reality.",
    extendedPerspective: [
      "Boundary of the Unseen represents an essential bridge in Mayo's oeuvre, originating from his 2024 Rome residency. Inspired by Caravaggesque tenebrism, the composition uses intense directional shadow to carve out sacred pictorial space.",
      "The cinnabar glaze holds a secret vitality, appearing dark wine-red under low incandescent light and bursting into electric crimson when struck by natural sunbeams."
    ],
    palette: ["#140C0E", "#3A161E", "#72232F", "#A63847", "#C96D76", "#D9B89B"],
    seed: 9405,
    aspectRatio: "portrait",
    isLargeScale: true,
    scaleHeightCm: 178,
    scaleWidthCm: 137,
    processStages: {
      before: {
        title: "Stage I — Rome Imprimatura",
        subtitle: "Terra di Siena Wash",
        description: "A rich burnt sienna wash prepared according to seventeenth-century Italian workshop manuals.",
        layerCount: 1
      },
      during: {
        title: "Stage II — Tenebrist Darkness",
        subtitle: "Asphaltum & Bone Black",
        description: "Deep angular shadow blocks poured and dragged across the lower quadrant.",
        layerCount: 2
      },
      after: {
        title: "Stage III — Cinnabar Glazing",
        subtitle: "Claret Translucency",
        description: "Twelve coats of genuine cinnabar suspended in clarified stand oil, creating internal optical refraction.",
        layerCount: 3
      }
    },
    makingOfVideo: {
      duration: "03:55",
      chapter: "Chapter 9: Roman Tenebrism",
      subtitle: "Investigating Baroque shadow mechanics through contemporary subatomic paradigms.",
      cameraAngle: "Studio Tracking · 4K Drone Micro"
    }
  },
  {
    id: "work-10",
    number: "10",
    slug: "horizon-state-xi",
    title: "Horizon State (XI)",
    year: 2026,
    medium: "Oil, verdigris, and titanium white on French linen",
    dimensions: {
      inches: "50 × 74 in",
      cm: "127 × 188 cm"
    },
    priceRaw: 62000,
    price: "$62,000",
    availability: "Reserved",
    shortDescription: "Sea-glass emeralds and crystalline titanium fields investigate the point where atmosphere meets ocean along Biscayne Bay.",
    extendedPerspective: [
      "Created specifically in response to the light of South Florida for the Art Miami exhibition, Horizon State (XI) bridges Mayo's Northern European material discipline with tropical coastal irradiance.",
      "Verdigris and malachite green pigments interlock with bleached chalk fields, creating a tranquil horizontal continuum that evokes dawn over calm open water."
    ],
    palette: ["#0E1F1D", "#1D3B36", "#32625A", "#659A8F", "#B4D5CC", "#EAF2EE"],
    seed: 10592,
    aspectRatio: "landscape",
    isLargeScale: false,
    scaleHeightCm: 127,
    scaleWidthCm: 188,
    processStages: {
      before: {
        title: "Stage I — Coastal Grid",
        subtitle: "Verdigris Ground",
        description: "Horizontal registration lines laid down with copper verdigris wash.",
        layerCount: 1
      },
      during: {
        title: "Stage II — Malachite Flooding",
        subtitle: "Sea-Glass Pigments",
        description: "Broad continuous sweeps across the 74-inch span using wide Japanese hake brushes.",
        layerCount: 2
      },
      after: {
        title: "Stage III — Iridescent Mist",
        subtitle: "Titanium Chalk Scumble",
        description: "Fine dry-brush misting across the upper horizon, unifying sky and water into singular light.",
        layerCount: 3
      }
    },
    makingOfVideo: {
      duration: "03:30",
      chapter: "Chapter 10: Coastal Irradiance",
      subtitle: "Mixing natural verdigris and titanium chalk inspired by Biscayne morning reflections.",
      cameraAngle: "Wide Studio Window Track · 4K"
    }
  }
];
