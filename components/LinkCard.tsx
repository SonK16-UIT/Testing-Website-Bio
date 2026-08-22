'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Sparkles } from 'lucide-react';
import React from 'react';

interface LinkCardProps {
  title: string;
  url: string;
  subtitle?: string;
  icon: React.ReactNode;
  badge?: string;
  featured?: boolean;
  delay?: number;
  iconBg?: string;
}

export default function LinkCard({
  title,
  url,
  subtitle,
  icon,
  badge,
  featured = false,
  delay = 0,
  iconBg,
}: LinkCardProps) {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={`group relative w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 ${
        featured
          ? 'bg-gradient-to-r from-brand-red/10 via-brand-surface to-brand-surface border border-brand-red/40 hover:border-brand-red hover:shadow-md hover:shadow-brand-red/20'
          : 'glass-card glass-card-hover'
      }`}
    >
      {/* Featured Pulsing Corner Glow */}
      {featured && (
        <div className="absolute -top-2.5 -right-2 bg-gradient-to-r from-brand-red to-brand-redGlow text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-md">
          <Sparkles className="w-3 h-3" />
          <span>{badge || 'POPULAR'}</span>
        </div>
      )}

      {!featured && badge && (
        <div className="absolute -top-2.5 right-4 bg-brand-surface border border-brand-border text-brand-muted text-[10px] font-bold uppercase px-2 py-0.5 rounded-full">
          {badge}
        </div>
      )}

      {/* Left Content (Icon + Labels) */}
      <div className="flex items-center gap-3.5 min-w-0">
        <div className={`p-3 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${
          iconBg || (featured ? 'bg-brand-red/20 text-brand-red border border-brand-red/40 group-hover:bg-brand-red group-hover:text-white' : 'bg-brand-surfaceHover text-brand-red border border-white/10 group-hover:bg-brand-red group-hover:text-white')
        }`}>
          {icon}
        </div>

        <div className="text-left truncate">
          <h3 className="font-display font-bold text-white text-base md:text-lg tracking-wide group-hover:text-brand-white transition-colors">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-brand-muted truncate font-medium group-hover:text-slate-200 transition-colors">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Right Arrow / External Link Icon */}
      <div className="shrink-0 pl-2 text-brand-muted group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
        <ExternalLink className="w-5 h-5" />
      </div>
    </motion.a>
  );
}
