import { useState, useEffect } from 'react';

export type SectionTheme = 'dark' | 'light';

export function useScrollDirection() {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('welcome');
  const [currentTheme, setCurrentTheme] = useState<SectionTheme>('dark');

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(scrollY > 60);

          // Fast scroll down hides nav; scroll up reveals nav
          if (scrollY > lastScrollY + 20 && scrollY > 200) {
            setIsVisible(false);
          } else if (scrollY < lastScrollY - 8 || scrollY <= 150) {
            setIsVisible(true);
          }

          lastScrollY = Math.max(0, scrollY);

          // Detect active section based on vertical offsets
          const sections = ['welcome', 'exhibition', 'process', 'artist', 'philosophy'];
          for (let i = sections.length - 1; i >= 0; i--) {
            const el = document.getElementById(sections[i]);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= 200) {
                setActiveSection(sections[i]);
                // Sections with dark environment vs light environment
                if (sections[i] === 'exhibition' || sections[i] === 'artist') {
                  setCurrentTheme('light');
                } else {
                  setCurrentTheme('dark');
                }
                break;
              }
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // run once on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return {
    isVisible,
    isScrolled,
    activeSection,
    currentTheme,
    setActiveSection,
  };
}
