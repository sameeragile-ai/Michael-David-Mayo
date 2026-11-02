import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, CheckCircle2, ArrowRight, ShieldCheck, Calendar, Phone, Mail, User } from 'lucide-react';
import { useCollection } from '../context/CollectionContext';
import { GenerativePainting } from './GenerativePainting';
import { exhibitionConfig } from '../data/config';
import { Link } from 'react-router-dom';

export const CollectorDrawer: React.FC = () => {
  const {
    savedArtworks,
    removeArtwork,
    isDrawerOpen,
    setIsDrawerOpen,
    pricesVisible,
    subtotal,
  } = useCollection();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredSlot: 'VIP Preview (Dec 1)',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const resetForm = () => {
    setFormSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      preferredSlot: 'VIP Preview (Dec 1)',
      message: '',
    });
  };

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsDrawerOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-screen max-w-md sm:max-w-lg bg-[#F6F1E7] text-[#1A1714] shadow-2xl flex flex-col paper-texture border-l border-[#1A1714]/15"
            >
              {/* Header */}
              <div className="p-6 border-b border-[#1A1714]/12 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#8A7F72] block">
                    Curatorial Dossier
                  </span>
                  <h2 className="font-serif italic text-2xl text-[#1A1714] mt-0.5">
                    Collector's Selection
                  </h2>
                </div>

                <button
                  onClick={() => setIsDrawerOpen(false)}
                  aria-label="Close Collector Drawer"
                  className="w-10 h-10 rounded-sm border border-[#1A1714]/15 flex items-center justify-center hover:bg-[#1A1714]/5 transition-colors"
                >
                  <X className="w-5 h-5 text-[#1A1714]" />
                </button>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {savedArtworks.length === 0 ? (
                  <div className="py-16 text-center">
                    <p className="font-serif italic text-xl text-[#8A7F72] mb-3">
                      Your selection is currently empty
                    </p>
                    <p className="text-xs text-[#8A7F72] max-w-xs mx-auto mb-6">
                      Browse the exhibition gallery and tap "Add to Collector's Selection" to save works for private viewing or acquisition inquiry.
                    </p>
                    <button
                      onClick={() => setIsDrawerOpen(false)}
                      className="px-6 py-2.5 border border-[#B08D57] text-[#1A1714] text-xs font-sans tracking-[0.16em] uppercase hover:bg-[#B08D57]/10 transition-colors"
                    >
                      Explore Exhibition
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Selected Artworks List */}
                    <div className="space-y-4">
                      {savedArtworks.map(work => (
                        <div
                          key={work.id}
                          className="p-3.5 bg-white/60 border border-[#1A1714]/10 rounded-[2px] flex items-center gap-4 transition-all hover:bg-white/90"
                        >
                          {/* Framed Miniature Thumbnail */}
                          <div className="w-16 h-20 shrink-0 shadow-md">
                            <GenerativePainting
                              seed={work.seed}
                              palette={work.palette}
                              stage={3}
                              aspectRatio={work.aspectRatio}
                              framed={true}
                              frameStyle="dark-ash"
                            />
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline justify-between gap-2">
                              <Link
                                to={`/work/${work.slug}`}
                                onClick={() => setIsDrawerOpen(false)}
                                className="font-serif italic text-base sm:text-lg text-[#1A1714] truncate hover:text-[#B08D57] transition-colors"
                              >
                                {work.title}
                              </Link>
                              <span className="text-[11px] text-[#8A7F72] shrink-0 font-sans">{work.year}</span>
                            </div>

                            <p className="text-xs text-[#8A7F72] truncate mt-0.5">
                              {work.dimensions.inches} · {work.dimensions.cm}
                            </p>

                            <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#1A1714]/8">
                              {pricesVisible ? (
                                <span className="font-sans font-semibold text-xs tracking-wider text-[#1A1714]">
                                  {work.price}
                                </span>
                              ) : (
                                <span className="text-[11px] uppercase tracking-wider text-[#B08D57]">
                                  Price on Request
                                </span>
                              )}

                              <button
                                onClick={() => removeArtwork(work.slug)}
                                aria-label={`Remove ${work.title}`}
                                className="text-xs text-[#8A7F72] hover:text-red-700 flex items-center gap-1 transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span className="text-[10px] uppercase tracking-wider">Remove</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Subtotal Strip */}
                    <div className="p-4 bg-[#EAE2D3] border border-[#1A1714]/12 rounded-[2px] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#8A7F72] block">
                          Total Works Selected
                        </span>
                        <span className="font-serif italic text-lg text-[#1A1714]">
                          {savedArtworks.length} {savedArtworks.length === 1 ? 'Painting' : 'Paintings'}
                        </span>
                      </div>

                      {pricesVisible && (
                        <div className="text-right">
                          <span className="text-[10px] uppercase tracking-widest text-[#8A7F72] block">
                            Combined Valuation
                          </span>
                          <span className="font-sans font-semibold text-base sm:text-lg text-[#1A1714] tabular-nums">
                            ${subtotal.toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Inquiry Form or Success State */}
                    <div className="border-t border-[#1A1714]/15 pt-6">
                      {!formSubmitted ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Calendar className="w-4 h-4 text-[#B08D57]" />
                            <h3 className="font-serif italic text-lg text-[#1A1714]">
                              Request Private Viewing & Provenance
                            </h3>
                          </div>
                          <p className="text-xs text-[#8A7F72] leading-relaxed">
                            Appointments hosted by Gallery Director {exhibitionConfig.galleryDirector} at Art Miami Booth P-214 or private salon viewing in Miami Beach.
                          </p>

                          <div>
                            <label className="block text-[11px] uppercase tracking-[0.16em] text-[#8A7F72] mb-1">
                              Collector Name
                            </label>
                            <div className="relative">
                              <User className="w-4 h-4 text-[#8A7F72] absolute left-3 top-3 pointer-events-none" />
                              <input
                                type="text"
                                required
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="e.g. Eleanor Vance"
                                className="w-full bg-white/70 border border-[#1A1714]/15 rounded-[1px] pl-9 pr-3 py-2 text-xs text-[#1A1714] focus:outline-none focus:border-[#B08D57] transition-colors"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] uppercase tracking-[0.16em] text-[#8A7F72] mb-1">
                                Email Address
                              </label>
                              <div className="relative">
                                <Mail className="w-4 h-4 text-[#8A7F72] absolute left-3 top-3 pointer-events-none" />
                                <input
                                  type="email"
                                  required
                                  name="email"
                                  value={formData.email}
                                  onChange={handleInputChange}
                                  placeholder="collector@domain.com"
                                  className="w-full bg-white/70 border border-[#1A1714]/15 rounded-[1px] pl-9 pr-3 py-2 text-xs text-[#1A1714] focus:outline-none focus:border-[#B08D57] transition-colors"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-[11px] uppercase tracking-[0.16em] text-[#8A7F72] mb-1">
                                Phone Number
                              </label>
                              <div className="relative">
                                <Phone className="w-4 h-4 text-[#8A7F72] absolute left-3 top-3 pointer-events-none" />
                                <input
                                  type="tel"
                                  name="phone"
                                  value={formData.phone}
                                  onChange={handleInputChange}
                                  placeholder="+1 (555) 000-0000"
                                  className="w-full bg-white/70 border border-[#1A1714]/15 rounded-[1px] pl-9 pr-3 py-2 text-xs text-[#1A1714] focus:outline-none focus:border-[#B08D57] transition-colors"
                                />
                              </div>
                            </div>
                          </div>

                          <div>
                            <label className="block text-[11px] uppercase tracking-[0.16em] text-[#8A7F72] mb-1">
                              Preferred Viewing Window
                            </label>
                            <select
                              name="preferredSlot"
                              value={formData.preferredSlot}
                              onChange={handleInputChange}
                              className="w-full bg-white/70 border border-[#1A1714]/15 rounded-[1px] px-3 py-2 text-xs text-[#1A1714] focus:outline-none focus:border-[#B08D57] transition-colors"
                            >
                              <option>VIP Preview (Tuesday, Dec 1 · 4:00 PM – 8:00 PM)</option>
                              <option>Fair Hours (Dec 2–6 · 11:00 AM – 7:00 PM)</option>
                              <option>Private After-Hours Booth Walkthrough</option>
                              <option>Digital Video Consultation with Michael David Mayo</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-[11px] uppercase tracking-[0.16em] text-[#8A7F72] mb-1">
                              Acquisition Inquiry or Notes
                            </label>
                            <textarea
                              rows={2}
                              name="message"
                              value={formData.message}
                              onChange={handleInputChange}
                              placeholder="Specify architectural placement, shipping destination, or custom curatorial questions..."
                              className="w-full bg-white/70 border border-[#1A1714]/15 rounded-[1px] px-3 py-2 text-xs text-[#1A1714] focus:outline-none focus:border-[#B08D57] transition-colors resize-none"
                            />
                          </div>

                          <button
                            type="submit"
                            className="w-full bg-[#1A1714] text-[#F6F1E7] hover:bg-[#B08D57] hover:text-[#0E0D0C] py-3 px-4 rounded-[1px] text-xs font-sans tracking-[0.2em] uppercase font-semibold transition-colors duration-300 flex items-center justify-center gap-2"
                          >
                            <span>Transmit Request to Curatorial Desk</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>

                          <div className="flex items-center justify-center gap-2 pt-2 text-[10px] text-[#8A7F72] uppercase tracking-wider">
                            <ShieldCheck className="w-3.5 h-3.5 text-[#B08D57]" />
                            <span>Confidential Collector Registry · Art Miami 2026</span>
                          </div>
                        </form>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="p-6 bg-white border border-[#B08D57]/40 rounded-[2px] text-center"
                        >
                          <CheckCircle2 className="w-10 h-10 text-[#B08D57] mx-auto mb-3" />
                          <span className="text-[10px] uppercase tracking-[0.25em] text-[#8A7F72] block">
                            Dossier Transmitted
                          </span>
                          <h4 className="font-serif italic text-2xl text-[#1A1714] mt-1 mb-2">
                            Viewing Reserved
                          </h4>
                          <p className="text-xs text-[#8A7F72] leading-relaxed mb-4">
                            Thank you, {formData.name}. Your curatorial dossier has been received by Director {exhibitionConfig.galleryDirector}. A personal confirmation and booth access credentials will be delivered to <span className="text-[#1A1714] font-medium">{formData.email}</span> within the hour.
                          </p>

                          <div className="p-3 bg-[#F6F1E7] border border-[#1A1714]/10 rounded-[1px] text-[11px] text-[#1A1714] font-mono mb-4 text-left">
                            <div className="flex justify-between">
                              <span className="text-[#8A7F72]">VIP Dossier Ref:</span>
                              <span>MDM-AM26-{(Math.random() * 8999 + 1000).toFixed(0)}</span>
                            </div>
                            <div className="flex justify-between mt-1">
                              <span className="text-[#8A7F72]">Booth:</span>
                              <span>P-214 (Contemporary Sector)</span>
                            </div>
                            <div className="flex justify-between mt-1">
                              <span className="text-[#8A7F72]">Window:</span>
                              <span className="truncate max-w-[200px]">{formData.preferredSlot}</span>
                            </div>
                          </div>

                          <button
                            onClick={resetForm}
                            className="text-xs text-[#B08D57] hover:underline uppercase tracking-widest"
                          >
                            Submit Another Inquiry
                          </button>
                        </motion.div>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 bg-[#EAE4D7] border-t border-[#1A1714]/12 text-center text-[10px] uppercase tracking-widest text-[#8A7F72]">
                Mayo Contemporary · Art Miami 2026 Booth P-214
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
