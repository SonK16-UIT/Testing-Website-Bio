'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Landmark, X, Copy, Check, QrCode } from 'lucide-react';
import { Language, translations } from '@/lib/translations';

interface BankQrModalProps {
  lang?: Language;
}

export default function BankQrModal({ lang = 'en' }: BankQrModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const t = translations[lang] || translations.en;

  const accountNumber = 'VQRQAATWR2866';
  const bankName = 'MB Bank';
  const accountName = 'CONNY';

  // Prevent background scrolling & listen for ESC key press to close modal
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsOpen(false);
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy account number:', err);
    }
  };

  return (
    <>
      {/* Trigger Link Button */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.985 }}
        onClick={() => setIsOpen(true)}
        className="w-full glass-card p-3.5 sm:p-4 rounded-xl border border-white/5 hover:border-[var(--primary-accent)]/50 transition-all flex items-center justify-between group cursor-pointer text-left"
      >
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 rounded-xl bg-purple-500/15 text-purple-400 border border-purple-500/30 group-hover:bg-purple-500 group-hover:text-white transition-all shrink-0">
            <Landmark className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-bold text-white text-sm sm:text-base group-hover:text-[var(--primary-accent)] transition-colors">
                {t.directBankTitle}
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
                BANK QR
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-0.5 font-medium line-clamp-1">
              {t.directBankSubtitle}
            </p>
          </div>
        </div>
        <div className="p-2 rounded-lg bg-white/5 text-[var(--text-muted)] group-hover:text-white group-hover:bg-[var(--primary-accent)] transition-all shrink-0">
          <QrCode className="w-4 h-4" />
        </div>
      </motion.button>

      {/* Sleek Dark Mode Modal Popup with Click-Outside Auto-Collapse & Escape Key Close */}
      <AnimatePresence>
        {isOpen && (
          <div 
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 cursor-pointer"
          >
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Card Content (e.stopPropagation prevents clicks inside the card from closing the modal) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm max-h-[90vh] glass-card border border-[var(--primary-accent)]/40 rounded-2xl shadow-2xl bg-[var(--surface-main)] z-10 flex flex-col overflow-hidden cursor-default"
            >
              {/* Fixed Header */}
              <div className="flex items-center justify-between border-b border-white/10 p-4 shrink-0 bg-black/30">
                <div className="flex items-center gap-2 text-left">
                  <Landmark className="w-5 h-5 text-[var(--primary-accent)]" />
                  <h3 className="font-display font-bold text-white text-sm sm:text-base">
                    {t.bankModalHeader}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Modal Body */}
              <div className="p-4 sm:p-5 space-y-3.5 overflow-y-auto scrollbar-none flex-1 text-center">
                {/* Chibi Custom QR Code Artwork Display */}
                <div className="relative rounded-xl overflow-hidden bg-white p-2 shadow-lg border border-pink-200/50 max-w-[260px] mx-auto">
                  <img
                    src="/qr_code.png"
                    alt="MB Bank Chibi QR Code"
                    className="w-full h-auto object-contain max-h-[200px] sm:max-h-[250px] rounded-lg mx-auto"
                  />
                </div>

                {/* Instruction Subtext */}
                <p className="text-[11px] text-slate-300 font-medium leading-relaxed px-1">
                  {t.scanQrInstruction}
                </p>

                {/* Direct Copyable Account Details */}
                <div className="bg-black/50 border border-white/10 rounded-xl p-3 space-y-2 text-left text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">{t.bankNameLabel}:</span>
                    <span className="text-white font-bold">{bankName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">{t.accNameLabel}:</span>
                    <span className="text-white font-bold">{accountName}</span>
                  </div>
                  <div className="flex items-center justify-between pt-1.5 border-t border-white/10">
                    <span className="text-slate-400 font-medium">{t.accNoLabel}:</span>
                    <span className="text-[var(--primary-accent)] font-mono font-bold text-sm tracking-wider">
                      {accountNumber}
                    </span>
                  </div>
                </div>

                {/* 1-Click Copy STK Button */}
                <button
                  type="button"
                  onClick={handleCopy}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)] hover:opacity-90 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md min-h-[44px] cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>{t.accCopiedToast}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>{t.copyAccNoBtn}</span>
                    </>
                  )}
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
