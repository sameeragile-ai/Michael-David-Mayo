import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, Mail, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useCollection } from '../context/CollectionContext';

export const SignInModal: React.FC = () => {
  const { isSignInOpen, setIsSignInOpen } = useCollection();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsSignInOpen(false);
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail('');
    }, 300);
  };

  return (
    <AnimatePresence>
      {isSignInOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-full max-w-md bg-[#141417] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-[0_30px_90px_rgba(0,0,0,0.9)] text-[#F6F1E7] z-10"
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#E5173F] to-[#FF5A36] flex items-center justify-center text-white">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#FF5A36] block">
                    Collector & Patron Portal
                  </span>
                  <h3 className="font-serif italic text-xl text-white">
                    Sign in to Your Account
                  </h3>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="py-6 space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/60 mb-1.5 font-sans">
                    Email or VIP Membership ID
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-3 pointer-events-none" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="collector@domain.com"
                      className="w-full bg-white/5 border border-white/15 rounded-xl pl-10 pr-3 py-2 text-sm text-white focus:outline-none focus:border-[#FF5A36]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-3 py-3 rounded-full bg-gradient-to-r from-[#E5173F] via-[#FF5A36] to-[#F7B733] hover:opacity-95 text-white font-sans text-xs uppercase tracking-widest font-semibold transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <span>Send Magic Sign-in Link</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-2 pt-2 text-[10px] text-white/40 uppercase tracking-wider font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FF5A36]" />
                  <span>Encrypted Patron Verification · Art Miami 2026</span>
                </div>
              </form>
            ) : (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#FF5A36] mx-auto" />
                <h4 className="font-serif italic text-2xl text-white">Magic Link Dispatched</h4>
                <p className="text-xs text-white/70 max-w-xs mx-auto leading-relaxed">
                  We sent a secure one-touch login link to <strong className="text-white">{email}</strong>. Check your inbox to view acquisitions and VIP fair credentials.
                </p>
                <button
                  onClick={handleClose}
                  className="mt-4 px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-sans uppercase tracking-wider font-semibold transition-colors"
                >
                  Done
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
