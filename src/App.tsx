import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { CollectionProvider, useCollection } from './context/CollectionContext';
import { useScrollDirection } from './hooks/useScrollDirection';
import { useIdleTimer } from './hooks/useIdleTimer';
import { IntroLoader } from './components/IntroLoader';
import { Navbar } from './components/Navbar';
import { CollectorDrawer } from './components/CollectorDrawer';
import { StaffPanelModal } from './components/StaffPanelModal';
import { IdleCountdownModal } from './components/IdleCountdownModal';
import { HomePage } from './pages/HomePage';
import { ArtworkDetailPage } from './pages/ArtworkDetailPage';
import { Check } from 'lucide-react';

function AppContent() {
  const [introFinished, setIntroFinished] = useState(() => {
    // Avoid showing intro again in the same tab session if desired, or show on load
    return sessionStorage.getItem('mdm_intro_seen') === 'true';
  });

  const { isVisible, isScrolled, currentTheme, activeSection } = useScrollDirection();
  const { isCountingDown, countdownRemaining, cancelCountdown } = useIdleTimer();
  const { toast } = useCollection();
  const location = useLocation();

  const handleIntroComplete = () => {
    setIntroFinished(true);
    try {
      sessionStorage.setItem('mdm_intro_seen', 'true');
    } catch {}
  };

  const isWorkDetail = location.pathname.startsWith('/work/');

  return (
    <div className="relative min-h-screen bg-[#0E0D0C] selection:bg-[#B08D57]/30 selection:text-[#F6F1E7]">
      {/* Intro Loader (~2.2s on initial kiosk load) */}
      {!introFinished && <IntroLoader onComplete={handleIntroComplete} />}

      {/* Signature Floating Glass Navbar */}
      <Navbar />

      {/* Page Routing */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/work/:slug" element={<ArtworkDetailPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>

      {/* Collector's Selection Slide-in Drawer */}
      <CollectorDrawer />

      {/* Hidden Staff Kiosk Settings Modal */}
      <StaffPanelModal />

      {/* 10-Second Inactivity Countdown Modal */}
      <IdleCountdownModal
        isCountingDown={isCountingDown}
        remainingSeconds={countdownRemaining}
        onCancel={cancelCountdown}
      />

      {/* Refined Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-[100] bg-[#1B1916] border border-[#B08D57]/60 text-[#F6F1E7] px-4 py-3 rounded-[2px] shadow-2xl flex items-center gap-3 text-xs font-sans tracking-wide pb-safe-bottom"
          >
            <div className="w-5 h-5 rounded-full bg-[#B08D57] text-[#0E0D0C] flex items-center justify-center shrink-0">
              <Check className="w-3 h-3" />
            </div>
            <span className="truncate">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CollectionProvider>
        <AppContent />
      </CollectionProvider>
    </BrowserRouter>
  );
}
