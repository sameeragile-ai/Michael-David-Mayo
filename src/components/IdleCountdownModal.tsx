import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCcw } from 'lucide-react';

interface IdleCountdownModalProps {
  isCountingDown: boolean;
  remainingSeconds: number;
  onCancel: () => void;
}

export const IdleCountdownModal: React.FC<IdleCountdownModalProps> = ({
  isCountingDown,
  remainingSeconds,
  onCancel,
}) => {
  return (
    <AnimatePresence>
      {isCountingDown && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCancel}
          className="fixed inset-0 z-[95] flex items-center justify-center p-6 bg-black/75 backdrop-blur-md cursor-pointer select-none"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="w-full max-w-sm bg-[#161412] border border-[#B08D57]/50 rounded-[2px] p-8 text-center text-[#F6F1E7] shadow-2xl relative film-grain"
          >
            {/* Circular Countdown Progress */}
            <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="42"
                  fill="none"
                  stroke="rgba(246, 241, 231, 0.15)"
                  strokeWidth="3"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="42"
                  fill="none"
                  stroke="#B08D57"
                  strokeWidth="3"
                  strokeDasharray={264}
                  strokeDashoffset={264 - (264 * remainingSeconds) / 10}
                  className="transition-all duration-1000 ease-linear"
                />
              </svg>
              <span className="absolute font-serif text-3xl italic text-[#B08D57]">
                {remainingSeconds}
              </span>
            </div>

            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8A7F72] block mb-2">
              Kiosk Inactivity Detected
            </span>
            <h3 className="font-serif italic text-2xl text-[#F6F1E7] mb-3">
              Returning to the beginning…
            </h3>
            <p className="text-xs text-[#8A7F72] leading-relaxed mb-6">
              The Art Miami pedestal session will reset for the next collector in {remainingSeconds} seconds.
            </p>

            <button
              onClick={onCancel}
              className="w-full py-3 px-4 bg-[#B08D57] hover:bg-[#C49E65] text-[#0E0D0C] text-xs font-sans tracking-[0.2em] uppercase font-semibold rounded-[1px] transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Tap Anywhere to Stay</span>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
