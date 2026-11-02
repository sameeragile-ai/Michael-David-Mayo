import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Layers, Sparkles, Compass } from 'lucide-react';
import { artworksData } from '../data/artworks';
import { ProcessComparisonSlider } from './ProcessComparisonSlider';
import { AtmosphereImage } from './AtmosphereImage';

export const ProcessSection: React.FC = () => {
  // Selected artwork for the interactive comparison slider
  const [selectedArtworkSlug, setSelectedArtworkSlug] = useState('entanglement-in-gold');

  const selectedArtwork =
    artworksData.find(a => a.slug === selectedArtworkSlug) || artworksData[0];

  const candidateWorks = artworksData.filter(a =>
    ['entanglement-in-gold', 'superposition-no-4', 'field-of-quiet-light', 'boundary-of-the-unseen'].includes(a.slug)
  );

  return (
    <section
      id="process"
      data-nav-theme="dark"
      className="relative w-full bg-[#0E0D0C] text-[#F6F1E7] py-24 sm:py-32 px-4 sm:px-8 lg:px-12 film-grain border-t border-[#F6F1E7]/10"
    >
      <div className="max-w-[1600px] mx-auto">
        
        {/* Section Header */}
        <div className="max-w-3xl pb-12 border-b border-[#F6F1E7]/12">
          <div className="flex items-center gap-3 text-xs font-sans uppercase tracking-[0.25em] text-[#B08D57] mb-3">
            <span className="font-serif italic text-base">02</span>
            <span>·</span>
            <span>The Creative Process</span>
            <span>·</span>
            <span>Studio Research</span>
          </div>

          <h2 className="font-serif italic text-4xl sm:text-6xl text-[#F6F1E7] tracking-tight">
            Stratigraphy & Pigment Physics
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#8A7F72] mt-4 leading-relaxed max-w-2xl">
            Each canvas requires between four and eight months of continuous studio labor. Layers cannot be accelerated: cold-pressed oils must polymerize through seasonal atmospheric humidity before successive glazes are introduced.
          </p>
        </div>

        {/* Interactive Comparison Tool Header & Selector */}
        <div className="mt-12 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#B08D57]" />
            <h3 className="font-serif italic text-2xl text-[#F6F1E7]">
              Interactive Stratum Peel: Before · During · After
            </h3>
          </div>

          {/* Switch target artwork */}
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-[#8A7F72]">Study Work:</span>
            <select
              value={selectedArtworkSlug}
              onChange={e => setSelectedArtworkSlug(e.target.value)}
              className="bg-[#1C1A17] border border-[#F6F1E7]/20 rounded-sm px-3 py-1.5 text-xs text-[#F6F1E7] focus:outline-none focus:border-[#B08D57]"
            >
              {candidateWorks.map(w => (
                <option key={w.slug} value={w.slug}>
                  {w.title} ({w.year})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* The Comparison Slider Component */}
        <ProcessComparisonSlider artwork={selectedArtwork} />

        {/* Documentary Chapters Grid */}
        <div className="mt-24 pt-16 border-t border-[#F6F1E7]/12">
          <div className="text-xs font-sans uppercase tracking-[0.25em] text-[#B08D57] mb-8">
            Curatorial Documentary Chapters
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            {/* Chapter 01 */}
            <article className="space-y-4">
              <div className="text-sm font-mono text-[#B08D57] tracking-widest">
                CHAPTER 01
              </div>
              <h4 className="font-serif italic text-2xl text-[#F6F1E7]">
                The Substrate & Imprimatura
              </h4>
              <p className="text-xs sm:text-sm text-[#8A7F72] leading-relaxed">
                Using heavy French flax linen woven on historical narrow looms, Mayo applies six thin grounds of hand-slaked Bolognese chalk and rabbit skin glue. Geometric tension vectors are plotted with vine charcoal to define the painting's structural skeleton.
              </p>
              <AtmosphereImage
                src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1600&q=80"
                alt="Artist studio with raw stretched linen canvases"
                caption="Fig. 1 — Stretched Normandy linen under raking natural light."
                aspectRatioClass="aspect-[16/10]"
              />
            </article>

            {/* Chapter 02 */}
            <article className="space-y-4">
              <div className="text-sm font-mono text-[#B08D57] tracking-widest">
                CHAPTER 02
              </div>
              <h4 className="font-serif italic text-2xl text-[#F6F1E7]">
                Viscous Glaze Cycles
              </h4>
              <p className="text-xs sm:text-sm text-[#8A7F72] leading-relaxed">
                Raw mineral crystals—lapis lazuli from Badakhshan, smalt glass, cinnabar—are hand-pestled in the studio crucible with cold-pressed walnut oil. Thin glaze veils are scraped across the surface with Japanese steel blades, creating optical depth.
              </p>
              <AtmosphereImage
                src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1600&q=80"
                alt="Mixing mineral pigments and oils in artist studio"
                caption="Fig. 2 — Hand-grinding dry mineral lapis on porphyry slab."
                aspectRatioClass="aspect-[16/10]"
              />
            </article>

            {/* Chapter 03 */}
            <article className="space-y-4">
              <div className="text-sm font-mono text-[#B08D57] tracking-widest">
                CHAPTER 03
              </div>
              <h4 className="font-serif italic text-2xl text-[#F6F1E7]">
                Gold Leaf Transduction
              </h4>
              <p className="text-xs sm:text-sm text-[#8A7F72] leading-relaxed">
                The final stage introduces 23-karat hand-beaten gold ground sealed under micro-crystalline wax. Rather than functioning as flat decorative gilding, the metallic particles act as optical transducers, refracting ambient room light into dynamic waves.
              </p>
              <AtmosphereImage
                src="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=1600&q=80"
                alt="Gold leaf application on contemporary artwork"
                caption="Fig. 3 — Applying 23k gold ground with ox-hair gilder's tip."
                aspectRatioClass="aspect-[16/10]"
              />
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};
