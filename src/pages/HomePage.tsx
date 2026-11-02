import React from 'react';
import { WelcomeSection } from '../components/WelcomeSection';
import { GallerySection } from '../components/GallerySection';
import { ProcessSection } from '../components/ProcessSection';
import { ArtistSection } from '../components/ArtistSection';
import { PhilosophySection } from '../components/PhilosophySection';
import { Footer } from '../components/Footer';

export const HomePage: React.FC = () => {
  const handleEnterExhibition = () => {
    const galleryElement = document.getElementById('exhibition');
    if (galleryElement) {
      galleryElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="w-full overflow-hidden">
      {/* 1. Welcome Screen (Dark/Cinematic) */}
      <WelcomeSection onEnter={handleEnterExhibition} />

      {/* 2. Exhibition Gallery (Light/Editorial) */}
      <GallerySection />

      {/* 3. Creative Process & Stratigraphy (Dark/Cinematic) */}
      <ProcessSection />

      {/* 4. About the Artist & Provenance (Light/Editorial) */}
      <ArtistSection />

      {/* 5. Philosophy & Video Essays (Dark/Cinematic) */}
      <PhilosophySection />

      {/* 6. Museum Footer (Light) */}
      <Footer />
    </main>
  );
};
