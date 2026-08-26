'use client';

import { Globe } from 'lucide-react';
import { Language } from '@/lib/translations';

interface LanguagePickerProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function LanguagePicker({ currentLang, onLanguageChange }: LanguagePickerProps) {
  const toggleLanguage = (lang: Language) => {
    if (lang === currentLang) return;
    onLanguageChange(lang);
  };

  return (
    <div className="flex items-center gap-1 bg-[var(--surface-main)]/90 backdrop-blur-md p-1 rounded-full border border-[var(--border-main)] shadow-lg hover:border-[var(--primary-accent)] transition-all duration-300">
      <div className="pl-2 pr-1 text-[var(--text-muted)] flex items-center justify-center">
        <Globe className="w-3.5 h-3.5 text-[var(--primary-accent)]" />
      </div>

      <div className="flex items-center gap-0.5 text-[11px] font-bold tracking-wider px-1">
        <button
          type="button"
          aria-label="Switch to English"
          onClick={() => toggleLanguage('en')}
          className={`px-2 py-0.5 rounded-full transition-all duration-200 ${
            currentLang === 'en'
              ? 'bg-[var(--primary-accent)] text-white shadow-sm font-extrabold'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          EN
        </button>

        <span className="text-white/20 font-light select-none">|</span>

        <button
          type="button"
          aria-label="Chuyển sang Tiếng Việt"
          onClick={() => toggleLanguage('vi')}
          className={`px-2 py-0.5 rounded-full transition-all duration-200 ${
            currentLang === 'vi'
              ? 'bg-[var(--primary-accent)] text-white shadow-sm font-extrabold'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          VN
        </button>
      </div>
    </div>
  );
}
