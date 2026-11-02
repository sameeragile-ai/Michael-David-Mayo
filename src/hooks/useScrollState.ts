import { useState, useEffect } from 'react';

export type NavTheme = 'light' | 'dark';

export interface ScrollState {
  scrollY: number;
  isScrolled: boolean;
  progress: number;
  navTheme: NavTheme;
}

export function useScrollState(): ScrollState {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [navTheme, setNavTheme] = useState<NavTheme>('dark');

  // Throttled scroll listener using requestAnimationFrame
  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      const currentScrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = docHeight > 0 ? Math.min(100, Math.max(0, (currentScrollY / docHeight) * 100)) : 0;

      setScrollY(currentScrollY);
      setIsScrolled(currentScrollY >= 24);
      setProgress(currentProgress);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver to detect sections marked data-nav-theme="light" or "dark"
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const theme = entry.target.getAttribute('data-nav-theme') as NavTheme;
            if (theme) {
              setNavTheme(theme);
            }
          }
        });
      },
      {
        rootMargin: '-80px 0px -75% 0px', // detects when section hits the top navbar region
        threshold: [0, 0.1, 0.5],
      }
    );

    const sections = document.querySelectorAll('[data-nav-theme]');
    sections.forEach(s => observer.observe(s));

    return () => observer.disconnect();
  }, []);

  return { scrollY, isScrolled, progress, navTheme };
}
