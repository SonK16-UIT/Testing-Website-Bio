'use client';

import AvatarHeader from '@/components/AvatarHeader';
import LatestVideoCard from '@/components/LatestVideoCard';
import LinkCard from '@/components/LinkCard';
import DiscordWidget from '@/components/DiscordWidget';
import CopyWidget from '@/components/CopyWidget';
import SocialFooter from '@/components/SocialFooter';
import { motion } from 'framer-motion';
import { 
  Sparkles,
  Flame,
  Clapperboard,
  Gamepad2,
  ShoppingBag
} from 'lucide-react';
import { FaYoutube } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';

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
          
          {/* ==================== LEFT COLUMN: Profile & Links (Span 5) ==================== */}
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
              
              {/* Baseline Link 1: YouTube Channel (Official Brand Logo) */}
              <LinkCard
                title="YouTube Channel"
                subtitle="Subscribe for gameplay videos & highlights"
                url="https://www.youtube.com/@ill_be_red"
                icon={<FaYoutube className="w-6 h-6 text-[#FF0000]" />}
                iconBg="bg-[#FF0000]/15 text-[#FF0000] border border-[#FF0000]/30 group-hover:bg-[#FF0000] group-hover:text-white"
                badge="MAIN CHANNEL"
                featured={true}
                delay={0.1}
              />

              {/* Baseline Link 2: TikTok Profile (Official Brand Logo) */}
              <LinkCard
                title="TikTok Profile"
                subtitle="Daily short gaming clips, memes & stream moments"
                url="https://www.tiktok.com/@shallred"
                icon={<SiTiktok className="w-5 h-5 text-white" />}
                iconBg="bg-black/60 text-white border border-white/20 group-hover:bg-white group-hover:text-black"
                badge="VIRAL CLIPS"
                delay={0.2}
              />

              {/* Discord Profile Widget (Official SiDiscord Logo & Blurple Color) */}
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
                icon={<ShoppingBag className="w-5 h-5 text-slate-200" />}
                delay={0.5}
              />

            </div>

          </div>


          {/* ==================== RIGHT COLUMN: Featured Media Showcase (Span 7) ==================== */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Desktop Section Header */}
            <div className="hidden lg:flex items-center gap-2 text-brand-red font-display font-extrabold text-sm tracking-wider uppercase">
              <Clapperboard className="w-4 h-4" />
              <span>Featured Media & Content Showcase</span>
            </div>

            {/* Featured YouTube Upload Preview Showcase */}
            <LatestVideoCard channelUrl="https://www.youtube.com/@ill_be_red" delay={0.2} />

            {/* Content Highlights Block (Clean & Uncluttered) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Highlight Card 1: Gameplay Highlights */}
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
                    NEW UPLOADS
                  </span>
                </div>
                <div>
                  <h4 className="font-display font-bold text-white text-base">Weekly Gameplay</h4>
                  <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                    High-skill plays, stream edits & gaming challenge runs released on YouTube & TikTok.
                  </p>
                </div>
                <a
                  href="https://www.youtube.com/@ill_be_red"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-brand-red hover:text-brand-redGlow flex items-center gap-1 pt-2 transition-colors"
                >
                  <span>Watch on YouTube</span> &rarr;
                </a>
              </motion.div>

              {/* Highlight Card 2: Community Hub */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-card p-4 rounded-2xl border border-white/5 space-y-2 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-[#5865F2]/20 text-[#7983F5] border border-[#5865F2]/30">
                    <Gamepad2 className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[#5865F2]/20 text-[#7983F5]">
                    CONNECT
                  </span>
                </div>
                <div>
                  <h4 className="font-display font-bold text-white text-base">Direct Discord</h4>
                  <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                    Add user <span className="text-white font-semibold">@shallred</span> on Discord or copy user ID to get in touch.
                  </p>
                </div>
                <a
                  href="https://discord.com/users/374148534531915777"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#7983F5] hover:text-white flex items-center gap-1 pt-2 transition-colors"
                >
                  <span>Discord Profile</span> &rarr;
                </a>
              </motion.div>

            </div>

            {/* Direct Channel Redirect Banner (Reliable & Clean - No Broken Iframe) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-card p-5 rounded-2xl border border-brand-red/30 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-brand-surface via-brand-surfaceHover to-brand-surface shadow-lg"
            >
              <div className="flex items-center gap-3.5 text-left">
                <div className="p-3 rounded-xl bg-[#FF0000]/20 text-[#FF0000] border border-[#FF0000]/40 shrink-0">
                  <FaYoutube className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-white text-base">ShallRed YouTube Channel</h4>
                  <p className="text-xs text-brand-muted font-medium">Subscribe for all full-length gaming videos & shorts (@ill_be_red)</p>
                </div>
              </div>
              <a
                href="https://www.youtube.com/@ill_be_red"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-brand-red hover:bg-red-600 text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md shadow-brand-red/30 shrink-0 text-center"
              >
                Visit Channel
              </a>
            </motion.div>

          </div>

        </div>

      </div>

      {/* Footer */}
      <SocialFooter />

    </main>
  );
}
