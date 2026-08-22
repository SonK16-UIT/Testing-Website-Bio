'use client';

import { motion } from 'framer-motion';
import { Play, Sparkles } from 'lucide-react';
import { FaYoutube } from 'react-icons/fa';

interface LatestVideoCardProps {
  channelUrl?: string;
}

export default function LatestVideoCard({
  channelUrl = 'https://www.youtube.com/@conny_ny',
}: LatestVideoCardProps) {
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
          <span>FEATURED YOUTUBE CONTENT</span>
        </div>
        <span className="flex items-center gap-1 text-[10px] bg-black/30 px-2 py-0.5 rounded-full font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary-accent)] animate-ping" />
          LATEST VIDEO
        </span>
      </div>

      {/* Video Preview Container */}
      <a
        href={channelUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative aspect-video w-full bg-slate-950 group cursor-pointer overflow-hidden"
      >
        {/* Featured Thumbnail Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center filter brightness-95 group-hover:scale-105 transition-transform duration-700"
          style={{ backgroundImage: `url('/youtube_featured.jpg')` }}
        />

        {/* Dark Vignette Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-main)] via-black/40 to-black/20 group-hover:bg-black/20 transition-colors duration-300 z-10" />

        {/* Play Button Icon Center Glow */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[var(--primary-accent)] to-[var(--secondary-accent)] text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-300 border-2 border-white/50">
            <Play className="w-7 h-7 fill-white translate-x-0.5" />
          </div>
        </div>

        {/* Video Title Overlay Bottom */}
        <div className="absolute bottom-3 left-4 right-4 z-20 text-left">
          <div className="flex items-center gap-1.5 text-[var(--primary-accent)] text-xs font-extrabold uppercase tracking-wide mb-1">
            <FaYoutube className="w-4 h-4 text-[#FF0000]" />
            <span>@conny_ny &bull; YouTube</span>
          </div>
          <h3 className="font-display font-bold text-white text-base md:text-lg leading-tight group-hover:text-[var(--glow-accent)] transition-colors line-clamp-1">
            Watch Conny's Latest Videos & Cozy Streams
          </h3>
          <p className="text-xs text-slate-300 font-medium mt-0.5">
            Click to open YouTube Channel (@conny_ny)
          </p>
        </div>
      </a>
    </motion.div>
  );
}
