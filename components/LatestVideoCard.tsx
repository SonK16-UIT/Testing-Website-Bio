'use client';

import { motion } from 'framer-motion';
import { Play, Youtube, Sparkles } from 'lucide-react';

interface LatestVideoCardProps {
  channelUrl?: string;
  delay?: number;
}

export default function LatestVideoCard({
  channelUrl = 'https://www.youtube.com/@ill_be_red',
  delay = 0.15,
}: LatestVideoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="relative w-full rounded-2xl overflow-hidden glass-card border border-brand-red/40 group shadow-xl shadow-brand-red/10"
    >
      {/* Top Banner Tag */}
      <div className="bg-gradient-to-r from-brand-red to-brand-redGlow text-white text-[11px] font-extrabold uppercase px-3 py-1 flex items-center justify-between tracking-wider">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>LATEST YOUTUBE CONTENT</span>
        </div>
        <span className="flex items-center gap-1 text-[10px] bg-black/30 px-2 py-0.5 rounded-full font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
          NEW UPLOAD
        </span>
      </div>

      {/* Video Preview Container */}
      <a
        href={channelUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative aspect-video w-full bg-slate-900 group cursor-pointer overflow-hidden"
      >
        {/* Stylized Animated Backdrop Grid & Thumbnail Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1117] via-slate-900/80 to-transparent z-10" />

        {/* Thumbnail Placeholder graphic with character vibe */}
        <div 
          className="absolute inset-0 bg-cover bg-center filter brightness-90 group-hover:scale-105 transition-transform duration-700"
          style={{ backgroundImage: `url('/avatar.png')` }}
        />

        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300 z-10" />

        {/* Play Button Icon Center Glow */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="w-14 h-14 rounded-full bg-brand-red/90 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-brand-red transition-all duration-300 border-2 border-white/40">
            <Play className="w-6 h-6 fill-white translate-x-0.5" />
          </div>
        </div>

        {/* Video Title Overlay Bottom */}
        <div className="absolute bottom-3 left-3 right-3 z-20 text-left">
          <div className="flex items-center gap-1.5 text-brand-red text-xs font-extrabold uppercase tracking-wide mb-0.5">
            <Youtube className="w-4 h-4" />
            <span>@ill_be_red</span>
          </div>
          <h3 className="font-display font-bold text-white text-base leading-tight group-hover:text-red-300 transition-colors line-clamp-1">
            Watch Latest Gaming Videos & Highlights
          </h3>
          <p className="text-[11px] text-slate-300 font-medium mt-0.5">
            Click to watch on YouTube Channel
          </p>
        </div>
      </a>
    </motion.div>
  );
}
