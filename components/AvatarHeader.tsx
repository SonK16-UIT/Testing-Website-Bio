'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle2, Flame, Sparkles } from 'lucide-react';

export default function AvatarHeader() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center text-center space-y-4 pt-6 pb-2"
    >
      {/* Avatar Container with Glowing Pulsing Scarf Ring */}
      <div className="relative group">
        {/* Animated Glow Backdrop */}
        <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-brand-red via-brand-redGlow to-red-600 opacity-75 blur-md group-hover:opacity-100 transition duration-500 animate-pulse-slow" />
        
        {/* Scarf Sawtooth Outer Ring */}
        <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-full p-1 bg-gradient-to-tr from-brand-red via-white to-brand-red border-2 border-brand-red shadow-2xl overflow-hidden">
          <Image
            src="/avatar.png"
            alt="ShallRed Character Avatar"
            width={160}
            height={160}
            className="w-full h-full object-cover rounded-full transform group-hover:scale-105 transition duration-300"
            priority
          />
        </div>

        {/* Live / Status Floating Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-brand-red text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg border border-white/20 whitespace-nowrap"
        >
          <Flame className="w-3.5 h-3.5 animate-bounce" />
          <span>GAMING CREATOR</span>
        </motion.div>
      </div>

      {/* Creator Name & Handle */}
      <div className="mt-3 space-y-1">
        <div className="flex items-center justify-center gap-2">
          <h1 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-white drop-shadow-sm">
            ShallRed
          </h1>
          <CheckCircle2 className="w-6 h-6 text-brand-red fill-brand-red/20 stroke-[2.5]" />
        </div>
        <p className="text-brand-muted text-sm font-medium tracking-wide">
          @shallred &bull; @ill_be_red
        </p>
      </div>

      {/* Bio Description */}
      <p className="max-w-xs md:max-w-md text-slate-300 text-sm leading-relaxed font-normal bg-brand-surface/40 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/5">
        <Sparkles className="w-4 h-4 text-brand-red inline-block mr-1.5 -mt-0.5" />
        High-octane gaming content, highlights & community streams. Wrapped in red & ready to win! 🎮🧣
      </p>
    </motion.div>
  );
}
