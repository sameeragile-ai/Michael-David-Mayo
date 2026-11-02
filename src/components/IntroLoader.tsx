import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface IntroLoaderProps {
  onComplete: () => void;
}

export const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<'line' | 'name' | 'subtitle' | 'wipe'>('line');
  const artistName = "Michael David Mayo";

  useEffect(() => {
    // 0.2s: line draws across
    // 0.6s: name reveals
    // 1.3s: subtitle fades in
    // 2.2s: curtain wipe
    // 2.8s: loader unmounts
    const timer1 = setTimeout(() => setStage('name'), 400);
    const timer2 = setTimeout(() => setStage('subtitle'), 1100);
    const timer3 = setTimeout(() => setStage('wipe'), 2100);
    const timer4 = setTimeout(() => onComplete(), 2800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {stage !== 'wipe' ? (
        <motion.div
          key="intro-loader"
          initial={{ opacity: 1 }}
          exit={{
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#F6F1E7] text-[#1A1714] select-none paper-texture"
        >
          {/* Subtle architectural frame */}
          <div className="absolute inset-8 sm:inset-12 border border-[#1A1714]/10 pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center max-w-xl px-6 text-center">
            {/* Monogram / Top mark */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-xs uppercase tracking-[0.3em] font-sans text-[#8A7F72] mb-6"
            >
              Exhibition Preview
            </motion.div>

            {/* Thin gold line drawing across */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="w-48 sm:w-64 h-[1px] bg-[#B08D57] origin-center mb-8 opacity-80"
            />

            {/* Artist name revealing letter by letter in Cormorant italic */}
            <h1 className="font-serif italic text-3xl sm:text-5xl md:text-6xl text-[#1A1714] tracking-tight flex flex-wrap justify-center overflow-hidden py-1">
              {artistName.split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ y: 40, opacity: 0 }}
                  animate={stage !== 'line' ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.03 * index,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </h1>

            {/* Art Miami · 2026 subline */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={stage === 'subtitle' ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 flex items-center gap-3 text-xs sm:text-sm font-sans uppercase tracking-[0.25em] text-[#8A7F72]"
            >
              <span>Art Miami</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#B08D57]/60" />
              <span>December 2026</span>
            </motion.div>

            {/* Curatorial venue info */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={stage === 'subtitle' ? { opacity: 0.6 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-4 text-[11px] font-sans tracking-widest uppercase text-[#1A1714]/60"
            >
              Pedestal Kiosk Installation · Inside the Work
            </motion.p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
