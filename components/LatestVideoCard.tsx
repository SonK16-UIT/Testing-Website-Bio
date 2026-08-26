'use client';

import { motion } from 'framer-motion';
import { Play, Sparkles, ExternalLink } from 'lucide-react';
import { FaYoutube } from 'react-icons/fa';
import { Language, translations } from '@/lib/translations';

interface LatestVideoCardProps {
  channelUrl?: string;
  lang?: Language;
}

export default function LatestVideoCard({
  channelUrl = 'https://www.youtube.com/@conny_ny',
  lang = 'en'
}: LatestVideoCardProps) {
  const t = translations[lang] || translations.en;

  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative w-full rounded-2xl overflow-hidden glass-card border border-[var(--primary-accent)]/50 group shadow-xl shadow-[var(--secondary-accent)]/20"
    >
      {/* Top Banner Tag */}
      <div className="bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)] text-white text-[11px] font-extrabold uppercase px-3 py-1 flex items-center justify-between tracking-wider">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t.showcaseTitle}</span>
        </div>
        <span className="flex items-center gap-1 text-[10px] bg-black/30 px-2 py-0.5 rounded-full font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary-accent)] animate-ping" />
          {t.latestVideoBadge}
        </span>
      </div>

      {/* Video Preview Container */}
      <div className="p-4 space-y-3">
        <a
          href={channelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block relative aspect-video w-full rounded-xl bg-slate-950 group/thumb cursor-pointer overflow-hidden border border-white/10"
        >
          {/* Featured Thumbnail Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center filter brightness-95 group-hover/thumb:scale-105 transition-transform duration-700"
            style={{ backgroundImage: `url('/youtube_featured.jpg')` }}
          />

          {/* Dark Vignette Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-main)] via-black/30 to-black/10 group-hover/thumb:bg-black/20 transition-colors duration-300 z-10" />

          {/* Play Button Icon Center Glow */}
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[var(--primary-accent)] to-[var(--secondary-accent)] text-white flex items-center justify-center shadow-2xl group-hover/thumb:scale-110 transition-all duration-300 border-2 border-white/50">
              <Play className="w-6 h-6 fill-white translate-x-0.5" />
            </div>
          </div>
        </a>

        {/* Action-Oriented Bottom CTA Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
          <div className="text-left space-y-0.5">
            <div className="flex items-center gap-1.5 text-[var(--primary-accent)] text-xs font-extrabold uppercase tracking-wide">
              <FaYoutube className="w-4 h-4 text-[#FF0000]" />
              <span>@conny_ny &bull; YouTube Showcase</span>
            </div>
            <h3 className="font-display font-bold text-white text-sm md:text-base leading-tight">
              {t.showcaseHeadline}
            </h3>
          </div>

          {/* Action-Oriented Direct CTA Button */}
          <a
            href={channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)] hover:opacity-95 text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md shrink-0"
          >
            <span>{t.watchLatestBtn}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
