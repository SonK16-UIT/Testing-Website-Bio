'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Gamepad2, Shield } from 'lucide-react';

interface CopyWidgetProps {
  label: string;
  value: string;
  subtext?: string;
  delay?: number;
}

export default function CopyWidget({ label, value, subtext = 'Click to copy', delay = 0 }: CopyWidgetProps) {
  const [copied, setCopied] = useState(false);

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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      onClick={handleCopy}
      className="glass-card glass-card-hover cursor-pointer w-full p-4 rounded-2xl flex items-center justify-between group border border-white/5"
    >
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="p-3 rounded-xl bg-brand-surfaceHover text-brand-red border border-white/10 group-hover:bg-brand-red group-hover:text-white transition-colors duration-300">
          <Gamepad2 className="w-5 h-5" />
        </div>
        <div className="text-left truncate">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-white text-sm md:text-base">{label}</span>
            <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-brand-red/20 text-brand-red border border-brand-red/30">
              {value}
            </span>
          </div>
          <p className="text-xs text-brand-muted font-medium">{copied ? 'Copied to clipboard!' : subtext}</p>
        </div>
      </div>

      <button
        type="button"
        aria-label={`Copy ${label}`}
        className={`p-2.5 rounded-xl transition-all duration-300 ${
          copied
            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 scale-110'
            : 'bg-brand-surfaceHover text-brand-muted group-hover:text-white group-hover:bg-brand-red/20'
        }`}
      >
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      </button>
    </motion.div>
  );
}
