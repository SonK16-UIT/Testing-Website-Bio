'use client';

import AvatarHeader from '@/components/AvatarHeader';
import LinkCard from '@/components/LinkCard';
import CopyWidget from '@/components/CopyWidget';
import SocialFooter from '@/components/SocialFooter';
import { motion } from 'framer-motion';
import { 
  Youtube, 
  Video, 
  Tv, 
  MessageSquare, 
  ShoppingBag, 
  Trophy, 
  Sparkles,
  Gamepad2
} from 'lucide-react';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-brand-bg bg-grid-pattern text-white flex flex-col items-center justify-between px-4 sm:px-6 overflow-hidden">
      
      {/* Top Ambient Red Glow Spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-brand-red/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Decorative Red & White Scarf Sawtooth Accent Header Strip */}
      <div className="w-full h-1.5 bg-gradient-to-r from-brand-red via-white to-brand-red shadow-sm" />

      {/* Main Content Container */}
      <div className="w-full max-w-md md:max-w-lg space-y-6 pt-6 pb-12 z-10">
        
        {/* Profile Avatar & Header */}
        <AvatarHeader />

        {/* Section Divider with Sawtooth Vibe */}
        <div className="flex items-center gap-3 my-4">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-brand-border to-brand-border" />
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-brand-red flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> OFFICIAL LINKS
          </span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-brand-border via-brand-border to-transparent" />
        </div>

        {/* Core Link Stack */}
        <div className="space-y-3.5">
          
          {/* Baseline Link 1: YouTube (Featured Main Channel) */}
          <LinkCard
            title="YouTube Channel"
            subtitle="Subscribe for full gameplay videos & stream highlights"
            url="https://www.youtube.com/@ill_be_red"
            icon={<Youtube className="w-6 h-6" />}
            badge="MAIN CHANNEL"
            featured={true}
            delay={0.1}
          />

          {/* Baseline Link 2: TikTok (Short Form Highlights) */}
          <LinkCard
            title="TikTok Profile"
            subtitle="Daily short gaming clips, memes & stream moments"
            url="https://www.tiktok.com/@shallred"
            icon={<Video className="w-6 h-6" />}
            badge="VIRAL CLIPS"
            delay={0.2}
          />

          {/* Secondary Link: Twitch / Live Stream */}
          <LinkCard
            title="Twitch Livestreams"
            subtitle="Catch me live playing games with chat!"
            url="https://twitch.tv"
            icon={<Tv className="w-6 h-6" />}
            badge="LIVE STREAM"
            delay={0.3}
          />

          {/* Secondary Link: Discord Community */}
          <LinkCard
            title="Join Discord Server"
            subtitle="Hang out, game together & join stream announcements"
            url="https://discord.gg"
            icon={<MessageSquare className="w-6 h-6" />}
            badge="COMMUNITY"
            delay={0.4}
          />

          {/* Copy Widget: Support Creator Code */}
          <CopyWidget
            label="Creator Code"
            value="SHALLRED"
            subtext="Click to copy support code for game stores"
            delay={0.5}
          />

          {/* Secondary Link: Setup & Wishlist */}
          <LinkCard
            title="Gaming Gear & Setup"
            subtitle="Check out my stream setup, PC specs & gear list"
            url="https://amazon.com"
            icon={<ShoppingBag className="w-6 h-6" />}
            delay={0.6}
          />

        </div>

        {/* Gaming Banner Widget */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          className="p-4 rounded-2xl bg-gradient-to-r from-brand-surface via-brand-surfaceHover to-brand-surface border border-brand-red/30 flex items-center justify-between shadow-inner"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-brand-red/20 text-brand-red border border-brand-red/40">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">Next Live Stream</p>
              <p className="text-xs text-brand-muted font-medium">Schedule announced weekly on Discord & TikTok!</p>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Footer */}
      <SocialFooter />

    </main>
  );
}
