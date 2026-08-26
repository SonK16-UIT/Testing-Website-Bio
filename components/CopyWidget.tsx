'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Gamepad2 } from 'lucide-react';
import { Language, translations } from '@/lib/translations';

interface CopyWidgetProps {
  label: string;
  value: string;
  subtext?: string;
  lang?: Language;
}

export default function CopyWidget({ label, value, subtext, lang = 'en' }: CopyWidgetProps) {
  const [copied, setCopied] = useState(false);
  const t = translations[lang] || translations.en;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={handleCopy}
      className="glass-card glass-card-hover cursor-pointer w-full p-3.5 rounded-2xl flex items-center justify-between group border border-white/5"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="p-2.5 rounded-xl bg-[var(--surface-hover)] text-[var(--primary-accent)] border border-white/10 group-hover:bg-[var(--primary-accent)] group-hover:text-white transition-colors duration-300">
          <Gamepad2 className="w-5 h-5" />
        </div>
        <div className="text-left truncate">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-white text-sm md:text-base">{label}</span>
            <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-[var(--primary-accent)]/20 text-[var(--primary-accent)] border border-[var(--primary-accent)]/30">
              {value}
            </span>
          </div>
          <p className="text-[11px] text-[var(--text-muted)] font-medium">
            {copied ? t.copiedMsg : (subtext || t.clickToCopy)}
          </p>
        </div>
      </div>

      <button
        type="button"
        aria-label={`Copy ${label}`}
        className={`p-2.5 rounded-xl transition-all duration-300 ${
          copied
            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 scale-110'
            : 'bg-[var(--surface-hover)] text-[var(--text-muted)] group-hover:text-white group-hover:bg-[var(--primary-accent)]/20'
        }`}
      >
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      </button>
    </motion.div>
  );
}
