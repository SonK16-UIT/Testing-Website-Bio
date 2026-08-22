'use client';

import AvatarHeader from '@/components/AvatarHeader';
import LatestVideoCard from '@/components/LatestVideoCard';
import LinkCard from '@/components/LinkCard';
import DiscordWidget from '@/components/DiscordWidget';
import CopyWidget from '@/components/CopyWidget';
import SocialFooter from '@/components/SocialFooter';
import { motion } from 'framer-motion';
import { 
  Youtube, 
  Video, 
  ShoppingBag, 
  Sparkles,
  Trophy,
  Flame,
  Clapperboard
} from 'lucide-react';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-brand-bg bg-grid-pattern text-white flex flex-col items-center justify-between px-4 sm:px-6 lg:px-12 overflow-hidden">
      
      {/* Top Ambient Red Glow Spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-brand-red/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Decorative Red & White Scarf Sawtooth Accent Header Strip */}
      <div className="w-full h-1.5 bg-gradient-to-r from-brand-red via-white to-brand-red shadow-sm" />

      {/* Main Responsive Grid Container */}
      <div className="w-full max-w-md lg:max-w-6xl pt-6 pb-12 z-10 flex-1 flex flex-col justify-center">
        
        {/* Grid: 1 column on mobile/tablet, 12 columns on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ==================== LEFT COLUMN: Profile & Links ==================== */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
            
            {/* Profile Avatar & Bio Header */}
            <AvatarHeader />

            {/* Section Divider */}
            <div className="flex items-center gap-3 my-2">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-brand-border to-brand-border" />
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-brand-red flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> OFFICIAL LINKS
              </span>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-brand-border via-brand-border to-transparent" />
            </div>

            {/* Core Link Stack */}
            <div className="space-y-3.5">
              
              {/* Baseline Link 1: YouTube Channel */}
              <LinkCard
                title="YouTube Channel"
                subtitle="Subscribe for gameplay videos & highlights"
                url="https://www.youtube.com/@ill_be_red"
                icon={<Youtube className="w-6 h-6" />}
                badge="MAIN CHANNEL"
                featured={true}
                delay={0.1}
              />

              {/* Baseline Link 2: TikTok Profile */}
              <LinkCard
                title="TikTok Profile"
                subtitle="Daily short gaming clips, memes & stream moments"
                url="https://www.tiktok.com/@shallred"
                icon={<Video className="w-6 h-6" />}
                badge="VIRAL CLIPS"
                delay={0.2}
              />

              {/* Discord Profile Widget */}
              <DiscordWidget 
                username="shallred"
                userId="374148534531915777"
                delay={0.3}
              />

              {/* Creator Support Code Copy Widget */}
              <CopyWidget
                label="Creator Code"
                value="SHALLRED"
                subtext="Click to copy support code for game stores"
                delay={0.4}
              />

              {/* Setup / Gear List */}
              <LinkCard
                title="Gaming Gear & Setup"
                subtitle="Check out my PC specs & gear list"
                url="https://amazon.com"
                icon={<ShoppingBag className="w-6 h-6" />}
                delay={0.5}
              />

            </div>

          </div>


          {/* ==================== RIGHT COLUMN: Featured Media & Video Showcase ==================== */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Desktop Section Tag */}
            <div className="hidden lg:flex items-center gap-2 text-brand-red font-display font-extrabold text-sm tracking-wider uppercase">
              <Clapperboard className="w-4 h-4" />
              <span>Featured Media & Content Showcase</span>
            </div>

            {/* Featured Video Showcase Widget */}
            <LatestVideoCard channelUrl="https://www.youtube.com/@ill_be_red" delay={0.2} />

            {/* Interactive Content Cards Grid for Desktop/Tablet */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Highlight Card 1: Channel Tag */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card p-4 rounded-2xl border border-white/5 space-y-2 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-brand-red/20 text-brand-red border border-brand-red/30">
                    <Flame className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-brand-red/20 text-brand-red">
                    CONTENT DROP
                  </span>
                </div>
                <div>
                  <h4 className="font-display font-bold text-white text-base">New Videos Weekly</h4>
                  <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                    Watch high-skill gameplay, funny stream edits & challenge runs on YouTube.
                  </p>
                </div>
                <a
                  href="https://www.youtube.com/@ill_be_red"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-brand-red hover:text-brand-redGlow flex items-center gap-1 pt-2 transition-colors"
                >
                  <span>Explore Channel</span> &rarr;
                </a>
              </motion.div>

              {/* Highlight Card 2: Schedule & Announcements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-card p-4 rounded-2xl border border-white/5 space-y-2 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-brand-surfaceHover text-brand-white border border-white/10">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    COMMUNITY
                  </span>
                </div>
                <div>
                  <h4 className="font-display font-bold text-white text-base">Creator Code: SHALLRED</h4>
                  <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                    Use code <span className="text-brand-red font-mono font-bold">SHALLRED</span> at checkout to support future content!
                  </p>
                </div>
                <div className="text-xs font-bold text-slate-300 flex items-center gap-1 pt-2">
                  <span>Support Channel</span>
                </div>
              </motion.div>

            </div>

            {/* Embedded YouTube Channel Trailer Player Frame */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-card p-4 rounded-2xl border border-brand-red/30 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <Youtube className="w-4 h-4 text-brand-red" />
                  <span>Channel Highlights & Shorts</span>
                </span>
                <span className="text-[10px] font-mono text-brand-muted">@ill_be_red</span>
              </div>
              <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-white/10 bg-black">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed?listType=user_uploads&list=ill_be_red"
                  title="ShallRed YouTube Latest Videos"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>

          </div>

        </div>

      </div>

      {/* Footer */}
      <SocialFooter />

    </main>
  );
}
