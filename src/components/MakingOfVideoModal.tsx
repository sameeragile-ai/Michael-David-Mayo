import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, RotateCcw, Clapperboard } from 'lucide-react';
import { Artwork } from '../data/artworks';

interface MakingOfVideoModalProps {
  artwork: Artwork | null;
  isOpen: boolean;
  onClose: () => void;
}

export const MakingOfVideoModal: React.FC<MakingOfVideoModalProps> = ({
  artwork,
  isOpen,
  onClose,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTimeSec, setCurrentTimeSec] = useState(14);
  const [isMuted, setIsMuted] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);

  const durationSec = 258; // 04:18

  // Synthetic subtle studio tone generator (ambient 432Hz hum) when unmuted & playing
  useEffect(() => {
    if (isOpen && isPlaying && !isMuted) {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          const ctx = new AudioCtx();
          audioContextRef.current = ctx;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(108, ctx.currentTime); // gentle warm low drone
          gain.gain.setValueAtTime(0.02, ctx.currentTime); // barely audible warm hum
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          oscillatorRef.current = osc;
        }
      } catch {
        // audio context blocked or unavailable
      }
    } else {
      if (oscillatorRef.current) {
        try {
          oscillatorRef.current.stop();
        } catch {}
        oscillatorRef.current = null;
      }
      if (audioContextRef.current) {
        try {
          audioContextRef.current.close();
        } catch {}
        audioContextRef.current = null;
      }
    }

    return () => {
      if (oscillatorRef.current) {
        try { oscillatorRef.current.stop(); } catch {}
      }
      if (audioContextRef.current) {
        try { audioContextRef.current.close(); } catch {}
      }
    };
  }, [isOpen, isPlaying, isMuted]);

  // Playhead timer simulation
  useEffect(() => {
    if (!isOpen || !isPlaying) return;
    const timer = setInterval(() => {
      setCurrentTimeSec(prev => (prev >= durationSec ? 0 : prev + 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen, isPlaying, durationSec]);

  if (!artwork) return null;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progressPct = (currentTimeSec / durationSec) * 100;

  // Curatorial subtitles based on playhead position
  const getSubtitles = () => {
    if (currentTimeSec < 60) {
      return `Mayo: "We begin with raw unprimed linen loomed in Normandy. The initial sizing acts like skin—it must breathe while resisting tension."`;
    }
    if (currentTimeSec < 140) {
      return `Director Notes: "Fourteen translucent glaze passes suspended in cold-pressed walnut oil create the optical illusion of internal backlighting."`;
    }
    if (currentTimeSec < 210) {
      return `Mayo: "Notice how the 23-karat gold leaf behaves not as decor, but as a mirror reflecting the observer's kinetic position."`;
    }
    return `Mayo: "The painting is never finished by the hand; it is concluded each time an eye rests upon the perimeter."`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] bg-[#0A0908] text-[#F6F1E7] flex flex-col justify-between overflow-hidden select-none film-grain"
        >
          {/* Top Bar */}
          <div className="p-4 sm:p-6 flex items-center justify-between border-b border-white/10 z-20 bg-black/50 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-sm bg-[#B08D57]/20 border border-[#B08D57]/50 flex items-center justify-center text-[#B08D57]">
                <Clapperboard className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] block">
                  Studio Documentary Archive · 4K UHD
                </span>
                <h3 className="font-serif italic text-lg sm:text-xl text-[#F6F1E7]">
                  {artwork.makingOfVideo.chapter}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-xs font-mono text-[#8A7F72]">
                {artwork.makingOfVideo.cameraAngle}
              </span>

              <button
                onClick={onClose}
                aria-label="Close Documentary Player"
                className="w-10 h-10 border border-white/20 rounded-sm flex items-center justify-center hover:bg-white/10 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Cinematic Letterbox Screen */}
          <div className="relative flex-1 flex items-center justify-center bg-black overflow-hidden px-4">
            {/* Ambient animated visualizer / Studio film scene */}
            <div className="relative w-full max-w-5xl aspect-video bg-[#12100E] border border-white/10 shadow-2xl overflow-hidden flex items-center justify-center">
              {/* Studio atmosphere backdrop simulating high-definition documentary */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-40 transition-transform duration-[8000ms] ease-out"
                style={{
                  backgroundImage: `radial-gradient(circle at 60% 40%, rgba(176,141,87,0.3) 0%, rgba(14,13,12,0.95) 70%)`,
                  transform: isPlaying ? 'scale(1.05)' : 'scale(1)',
                }}
              />

              {/* Cinematic frame simulation with golden ratio focal point */}
              <div className="relative z-10 flex flex-col items-center text-center p-6 max-w-2xl">
                {/* Slow pulse ring */}
                <div className="w-20 h-20 rounded-full border border-[#B08D57]/40 flex items-center justify-center mb-6 relative">
                  <div
                    className={`absolute inset-0 rounded-full border border-[#B08D57] ${
                      isPlaying ? 'animate-ping opacity-25' : 'opacity-0'
                    }`}
                  />
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-16 h-16 rounded-full bg-[#B08D57] text-[#0E0D0C] flex items-center justify-center hover:scale-105 transition-transform"
                    aria-label={isPlaying ? 'Pause film' : 'Play film'}
                  >
                    {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 ml-0.5 fill-current" />}
                  </button>
                </div>

                <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#B08D57] mb-2">
                  Michael David Mayo Studio · Hudson Valley
                </span>
                <h4 className="font-serif italic text-2xl sm:text-3xl text-[#F6F1E7] mb-3">
                  {artwork.title} — Creation Sequence
                </h4>
                <p className="text-xs text-[#8A7F72] leading-relaxed max-w-md">
                  {artwork.makingOfVideo.subtitle}
                </p>
              </div>

              {/* Subtitles Overlay */}
              <div className="absolute bottom-6 inset-x-8 text-center pointer-events-none">
                <p className="inline-block px-4 py-2 bg-black/80 backdrop-blur-md rounded-[1px] text-xs sm:text-sm font-serif italic text-[#F6F1E7] border border-white/10 shadow-lg max-w-2xl">
                  {getSubtitles()}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Player HUD */}
          <div className="p-4 sm:p-6 bg-black/70 backdrop-blur-md border-t border-white/10 z-20 flex flex-col gap-3">
            {/* Scrubber Bar */}
            <div
              className="relative w-full h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer"
              onClick={e => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const newPct = clickX / rect.width;
                setCurrentTimeSec(Math.floor(newPct * durationSec));
              }}
            >
              <div
                className="h-full bg-[#B08D57] transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>

            {/* Controls Strip */}
            <div className="flex items-center justify-between text-xs text-[#8A7F72]">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="text-white hover:text-[#B08D57] transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>

                <div className="font-mono text-xs tabular-nums text-[#F6F1E7]">
                  <span>{formatTime(currentTimeSec)}</span>
                  <span className="opacity-40 mx-1.5">/</span>
                  <span className="opacity-60">{formatTime(durationSec)}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-[#B08D57]" />}
                  <span className="text-[10px] uppercase tracking-wider hidden sm:inline">
                    {isMuted ? 'Muted' : 'Studio Tone Active (432Hz)'}
                  </span>
                </button>

                <button
                  onClick={() => setCurrentTimeSec(0)}
                  className="hover:text-white transition-colors"
                  title="Restart Documentary"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
