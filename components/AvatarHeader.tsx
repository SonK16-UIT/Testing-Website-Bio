'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle2, Sparkles, Heart } from 'lucide-react';
import { Language, translations } from '@/lib/translations';

interface AvatarHeaderProps {
  lang?: Language;
  avatarUrl?: string;
  username?: string;
  tagHandle?: string;
  bioText?: string;
  tagline?: string;
}

export default function AvatarHeader({
  lang = 'en',
  avatarUrl = '/avatar.png',
  username,
  tagHandle,
  bioText,
  tagline,
}: AvatarHeaderProps) {
  const t = translations[lang] || translations.en;

  const displayUsername = username || 'Conny';
  const displayTagHandle = tagHandle || '@conny_ny';
  const displayBio = bioText || t.bio;
  const displayTagline = tagline || t.tagline;

  return (
    <motion.div 
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center text-center space-y-3.5 pt-4 pb-2 w-full"
    >
      {/* Avatar Container with Glowing Soft Aura Ring */}
      <div className="relative group">
        {/* Animated Glow Backdrop */}
        <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-[var(--primary-accent)] via-[var(--secondary-accent)] to-purple-500 opacity-75 blur-md group-hover:opacity-100 transition duration-500 animate-pulse-slow" />
        
        {/* Avatar Ring */}
        <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full p-1 bg-gradient-to-tr from-[var(--primary-accent)] via-white to-[var(--secondary-accent)] border-2 border-[var(--primary-accent)] shadow-2xl overflow-hidden bg-black/40">
          <img
            key={avatarUrl}
            src={avatarUrl}
            alt={`${displayUsername} Avatar`}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/avatar.png';
            }}
            className="w-full h-full object-cover rounded-full transform group-hover:scale-105 transition duration-300"
          />
        </div>

        {/* Floating Status Badge */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)] text-white text-[11px] font-extrabold px-3 py-0.5 rounded-full flex items-center gap-1.5 shadow-lg border border-white/20 whitespace-nowrap">
          <Sparkles className="w-3 h-3 animate-bounce" />
          <span>{displayTagline}</span>
        </div>
      </div>

      {/* Identity Header */}
      <div className="mt-2 space-y-0.5">
        <div className="flex items-center justify-center gap-1.5">
          <h1 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-white drop-shadow-sm">
            {displayUsername}
          </h1>
          <CheckCircle2 className="w-5 h-5 text-[var(--primary-accent)] fill-[var(--primary-accent)]/20 stroke-[2.5]" />
        </div>
        <p className="text-[var(--text-muted)] text-xs font-semibold tracking-wide">
          {displayTagHandle}
        </p>
      </div>

      {/* Bio Description */}
      <p className="max-w-xs md:max-w-md text-slate-200 text-xs leading-relaxed font-normal glass-card px-4 py-2 rounded-xl border border-white/10">
        <Heart className="w-3.5 h-3.5 text-[var(--primary-accent)] inline-block mr-1 -mt-0.5 fill-[var(--primary-accent)]" />
        {displayBio}
      </p>
    </motion.div>
  );
}
