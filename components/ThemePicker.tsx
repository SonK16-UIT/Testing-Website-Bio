'use client';

import { useState, useEffect } from 'react';
import { Palette, Check } from 'lucide-react';

export type ThemeId = 'pink' | 'red' | 'cyan' | 'emerald' | 'gold';

export interface ThemeOption {
  id: ThemeId;
  name: string;
  dotColor: string;
  bgGradient: string;
}

export const themes: ThemeOption[] = [
  { id: 'pink', name: 'Conny Pastel Pink', dotColor: '#F4719C', bgGradient: 'from-[#F4719C] to-[#A855F7]' },
  { id: 'red', name: 'ShallRed Crimson', dotColor: '#E51937', bgGradient: 'from-[#E51937] to-[#FF3B5C]' },
  { id: 'cyan', name: 'Cyberpunk Cyan', dotColor: '#00F0FF', bgGradient: 'from-[#00F0FF] to-[#7000FF]' },
  { id: 'emerald', name: 'Emerald Forest', dotColor: '#10B981', bgGradient: 'from-[#10B981] to-[#34D399]' },
  { id: 'gold', name: 'Gold Legend', dotColor: '#F59E0B', bgGradient: 'from-[#F59E0B] to-[#FBBF24]' },
];

export default function ThemePicker() {
  const [currentTheme, setCurrentTheme] = useState<ThemeId>('pink');
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('shallred_conny_theme') as ThemeId;
    if (savedTheme && themes.some(t => t.id === savedTheme)) {
      setCurrentTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      document.documentElement.setAttribute('data-theme', 'pink');
    }
  }, []);

  if (!mounted) return null;

  const selectTheme = (themeId: ThemeId) => {
    setCurrentTheme(themeId);
    document.documentElement.setAttribute('data-theme', themeId);
    localStorage.setItem('shallred_conny_theme', themeId);
    setIsOpen(false);
  };

  const activeThemeObj = themes.find(t => t.id === currentTheme) || themes[0];

  return (
    <div className="relative">
      {/* Floating Theme Button */}
      <button
        type="button"
        aria-label="Select Color Theme"
        onClick={() => setIsOpen(!isOpen)}
        className="glass-card flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border-main)] hover:border-[var(--primary-accent)] transition-all duration-300 text-xs font-bold text-white shadow-lg bg-[var(--surface-main)]/90 backdrop-blur-md"
      >
        <span
          className="w-3 h-3 rounded-full inline-block shadow-sm shrink-0"
          style={{ backgroundColor: activeThemeObj.dotColor }}
        />
        <span className="truncate max-w-[120px]">{activeThemeObj.name}</span>
        <Palette className="w-3.5 h-3.5 text-[var(--primary-accent)] shrink-0 ml-0.5" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 rounded-2xl glass-card border border-[var(--border-main)] p-2 shadow-2xl z-50 bg-[var(--surface-main)]/95 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200">
          <div className="px-2 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[var(--text-muted)] border-b border-white/5 mb-1">
            Choose Color Theme
          </div>

          <div className="space-y-1">
            {themes.map(t => {
              const isActive = t.id === currentTheme;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => selectTheme(t.id)}
                  className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                    isActive
                      ? 'bg-[var(--primary-accent)]/20 text-white border border-[var(--primary-accent)]/40'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-white/30 shrink-0"
                      style={{ backgroundColor: t.dotColor }}
                    />
                    <span>{t.name}</span>
                  </div>
                  {isActive && <Check className="w-4 h-4 text-[var(--primary-accent)]" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
