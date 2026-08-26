'use client';

import { Heart } from 'lucide-react';
import { Language, translations } from '@/lib/translations';

interface SocialFooterProps {
  lang?: Language;
}

export default function SocialFooter({ lang = 'en' }: SocialFooterProps) {
  const currentYear = new Date().getFullYear();
  const t = translations[lang] || translations.en;

  return (
    <footer className="w-full py-8 text-center text-xs text-[var(--text-muted)] border-t border-white/5 bg-[var(--bg-main)]/60 backdrop-blur-md z-10 mt-12">
      <div className="max-w-md mx-auto flex flex-col items-center justify-center space-y-2 px-4">
        
        {/* Main Footer Tagline */}
        <p className="flex items-center gap-1.5 font-medium text-slate-300">
          <span>{t.craftedWith}</span>
          <Heart className="w-3.5 h-3.5 text-[var(--primary-accent)] fill-[var(--primary-accent)] inline" />
          <span>{t.for}</span>
          <span className="font-bold text-white font-display">Conny</span>
          <span className="text-[var(--primary-accent)] font-semibold">(@conny_ny)</span>
        </p>

        {/* Copyright notice */}
        <p className="text-[11px] text-[var(--text-muted)] font-mono">
          &copy; {currentYear} @conny_ny. {t.allRightsReserved}
        </p>

      </div>
    </footer>
  );
}
