'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Check, Sparkles } from 'lucide-react';

export interface ThemeOption {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  description: string;
}

export const THEMES: ThemeOption[] = [
  {
    id: 'pink',
    name: 'Conny Pastel Pink',
    primaryColor: '#F4719C',
    secondaryColor: '#A855F7',
    description: 'Soft Pink, Anime Purple & Cozy Mocha',
  },
  {
    id: 'red',
    name: 'ShallRed Crimson',
    primaryColor: '#E51937',
    secondaryColor: '#FF3B5C',
    description: 'Crimson Red, Midnight Charcoal & Scarf White',
  },
  {
    id: 'cyan',
    name: 'Cyberpunk Cyan',
    primaryColor: '#00F0FF',
    secondaryColor: '#7000FF',
    description: 'Neon Cyan & Deep Cyber Blue',
  },
  {
    id: 'emerald',
    name: 'Emerald Forest',
    primaryColor: '#10B981',
    secondaryColor: '#34D399',
    description: 'Cozy Gamer Mint & Forest Emerald',
  },
  {
    id: 'gold',
    name: 'Gold Legend',
    primaryColor: '#F59E0B',
    secondaryColor: '#FBBF24',
    description: 'Amber Gold & Dark Honey Accent',
  },
];

export default function ThemePicker() {
  const [activeTheme, setActiveTheme] = useState<string>('pink');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    // Load saved theme from localStorage if available
    const savedTheme = localStorage.getItem('shallred_conny_theme');
    if (savedTheme && THEMES.some((t) => t.id === savedTheme)) {
      setActiveTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      document.documentElement.setAttribute('data-theme', 'pink');
    }
  }, []);

  const changeTheme = (themeId: string) => {
    setActiveTheme(themeId);
    document.documentElement.setAttribute('data-theme', themeId);
    localStorage.setItem('shallred_conny_theme', themeId);
    setIsOpen(false);
  };

  const currentThemeObj = THEMES.find((t) => t.id === activeTheme) || THEMES[0];

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Floating Theme Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="glass-card hover:border-[var(--primary-accent)] px-3.5 py-2 rounded-full flex items-center gap-2 shadow-xl backdrop-blur-md transition-all duration-300 group cursor-pointer"
        aria-label="Select Color Theme"
      >
        <div
          className="w-4 h-4 rounded-full border border-white/40 shadow-inner group-hover:scale-110 transition-transform"
          style={{ background: currentThemeObj.primaryColor }}
        />
        <span className="text-xs font-bold text-white tracking-wide flex items-center gap-1">
          <Palette className="w-3.5 h-3.5 text-[var(--primary-accent)]" />
          <span className="hidden sm:inline">{currentThemeObj.name}</span>
        </span>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-72 glass-card rounded-2xl p-3 shadow-2xl border border-[var(--border-main)] backdrop-blur-xl z-50 space-y-1.5"
          >
            <div className="flex items-center justify-between px-2 py-1 border-b border-white/10 mb-1">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[var(--primary-accent)] flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> SELECT COLOR THEME
              </span>
              <span className="text-[10px] text-slate-400 font-mono">5 PRESETS</span>
            </div>

            {THEMES.map((theme) => {
              const isSelected = activeTheme === theme.id;
              return (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => changeTheme(theme.id)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all duration-200 ${
                    isSelected
                      ? 'bg-white/15 border border-[var(--primary-accent)] shadow-md'
                      : 'hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex items-center -space-x-1">
                      <div
                        className="w-4 h-4 rounded-full border border-white/30"
                        style={{ backgroundColor: theme.primaryColor }}
                      />
                      <div
                        className="w-4 h-4 rounded-full border border-white/30"
                        style={{ backgroundColor: theme.secondaryColor }}
                      />
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-bold text-white leading-snug">{theme.name}</p>
                      <p className="text-[10px] text-slate-400 truncate">{theme.description}</p>
                    </div>
                  </div>

                  {isSelected && (
                    <Check className="w-4 h-4 text-[var(--primary-accent)] shrink-0 ml-1" />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
