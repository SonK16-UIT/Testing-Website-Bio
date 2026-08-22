'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle2, Sparkles, Heart } from 'lucide-react';

export default function AvatarHeader() {
  return (
    <motion.div 
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center text-center space-y-4 pt-6 pb-2 w-full"
    >
      {/* Avatar Container with Glowing Soft Pink & Purple Aura Ring */}
      <div className="relative group">
        {/* Animated Glow Backdrop */}
        <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-[var(--primary-accent)] via-[var(--secondary-accent)] to-purple-500 opacity-75 blur-md group-hover:opacity-100 transition duration-500 animate-pulse-slow" />
        
        {/* Avatar Ring */}
        <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-full p-1 bg-gradient-to-tr from-[var(--primary-accent)] via-white to-[var(--secondary-accent)] border-2 border-[var(--primary-accent)] shadow-2xl overflow-hidden">
          <Image
            src="/avatar.png"
            alt="Conny Avatar"
            width={160}
            height={160}
            className="w-full h-full object-cover rounded-full transform group-hover:scale-105 transition duration-300"
            priority
          />
        </div>

        {/* Floating Status Badge */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)] text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg border border-white/20 whitespace-nowrap">
          <Sparkles className="w-3.5 h-3.5 animate-bounce" />
          <span>VTUBER & CREATOR</span>
        </div>
      </div>

      {/* Creator Name & Handle */}
      <div className="mt-3 space-y-1">
        <div className="flex items-center justify-center gap-2">
          <h1 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-white drop-shadow-sm">
            Conny
          </h1>
          <CheckCircle2 className="w-6 h-6 text-[var(--primary-accent)] fill-[var(--primary-accent)]/20 stroke-[2.5]" />
        </div>
        <p className="text-[var(--text-muted)] text-sm font-medium tracking-wide">
          @conny_ny
        </p>
      </div>

      {/* Bio Description */}
      <p className="max-w-xs md:max-w-md text-slate-200 text-sm leading-relaxed font-normal glass-card px-4 py-2.5 rounded-xl border border-white/10">
        <Heart className="w-4 h-4 text-[var(--primary-accent)] inline-block mr-1.5 -mt-0.5 fill-[var(--primary-accent)]" />
        Cozy streams, fun gaming highlights & sweet vibes! Welcome to my official home page 🎀✨
      </p>
    </motion.div>
  );
}
