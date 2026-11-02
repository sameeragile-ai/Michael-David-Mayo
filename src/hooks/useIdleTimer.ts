import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCollection } from '../context/CollectionContext';

export function useIdleTimer() {
  const { idleTimeoutSeconds, setIsDrawerOpen, setIsStaffOpen } = useCollection();
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [countdownRemaining, setCountdownRemaining] = useState(10);
  const navigate = useNavigate();
  const location = useLocation();

  const lastActivityRef = useRef(Date.now());
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = useCallback(() => {
    lastActivityRef.current = Date.now();
    if (isCountingDown) {
      setIsCountingDown(false);
      setCountdownRemaining(10);
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
        countdownIntervalRef.current = null;
      }
    }
  }, [isCountingDown]);

  // Listen to user interaction
  useEffect(() => {
    if (idleTimeoutSeconds <= 0) return; // Disabled in staff panel

    const events = ['pointerdown', 'pointermove', 'keydown', 'wheel', 'touchstart', 'scroll'];
    const handleActivity = () => {
      // Throttle activity checks
      const now = Date.now();
      if (now - lastActivityRef.current > 500) {
        resetTimer();
      }
    };

    events.forEach(evt => window.addEventListener(evt, handleActivity, { passive: true }));

    // Check idle status every second
    const checkInterval = setInterval(() => {
      if (isCountingDown) return;
      const elapsedSeconds = (Date.now() - lastActivityRef.current) / 1000;
      const warningThreshold = Math.max(5, idleTimeoutSeconds - 10);

      if (elapsedSeconds >= warningThreshold) {
        // Start 10-second countdown
        setIsCountingDown(true);
        setCountdownRemaining(10);
      }
    }, 1000);

    return () => {
      events.forEach(evt => window.removeEventListener(evt, handleActivity));
      clearInterval(checkInterval);
    };
  }, [idleTimeoutSeconds, isCountingDown, resetTimer]);

  // Handle countdown ticking
  useEffect(() => {
    if (!isCountingDown) return;

    countdownIntervalRef.current = setInterval(() => {
      setCountdownRemaining(prev => {
        if (prev <= 1) {
          // Timeout reached: reset kiosk to welcome screen
          if (countdownIntervalRef.current) {
            clearInterval(countdownIntervalRef.current);
          }
          setIsCountingDown(false);
          setIsDrawerOpen(false);
          setIsStaffOpen(false);
          if (location.pathname !== '/') {
            navigate('/');
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
    };
  }, [isCountingDown, navigate, location.pathname, setIsDrawerOpen, setIsStaffOpen]);

  return {
    isCountingDown,
    countdownRemaining,
    cancelCountdown: resetTimer,
  };
}
