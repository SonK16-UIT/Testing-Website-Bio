'use client';

import AvatarHeader from '@/components/AvatarHeader';
import LatestVideoCard from '@/components/LatestVideoCard';
import LinkCard from '@/components/LinkCard';
import CopyWidget from '@/components/CopyWidget';
import SocialFooter from '@/components/SocialFooter';
import ThemePicker from '@/components/ThemePicker';
import { motion } from 'framer-motion';
import { 
  Sparkles,
  Heart,
  Clapperboard,
  Gamepad2,
  ShoppingBag
} from 'lucide-react';
import { FaYoutube } from 'react-icons/fa';
import { SiFacebook, SiTiktok, SiDiscord } from 'react-icons/si';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-brand-bg bg-clean-gradient text-white flex flex-col items-center justify-between px-4 sm:px-6 lg:px-12 overflow-hidden">
      
      {/* Top Floating Theme Picker Widget */}
      <ThemePicker />

      {/* Top Ambient Dynamic Spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] theme-spotlight rounded-full blur-[140px] pointer-events-none" />

      {/* Decorative Accent Header Strip */}
      <div className="w-full h-1.5 bg-gradient-to-r from-[var(--primary-accent)] via-white to-[var(--secondary-accent)] shadow-sm" />

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
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[var(--border-main)] to-[var(--border-main)]" />
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[var(--primary-accent)] flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[var(--primary-accent)]" /> OFFICIAL LINKS
              </span>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-[var(--border-main)] via-[var(--border-main)] to-transparent" />
            </div>

            {/* Core Link Stack */}
            <div className="space-y-3.5">
              
              {/* Baseline Link 1: YouTube Channel (@conny_ny) */}
              <LinkCard
                title="YouTube Channel"
                subtitle="Subscribe for streams, shorts & video highlights"
                url="https://www.youtube.com/@conny_ny"
                icon={<FaYoutube className="w-6 h-6 text-[#FF0000]" />}
                iconBg="bg-[#FF0000]/15 text-[#FF0000] border border-[#FF0000]/30 group-hover:bg-[#FF0000] group-hover:text-white"
                badge="MAIN CHANNEL"
                featured={true}
              />

              {/* TikTok Link: @vtuber_conny */}
              <LinkCard
                title="TikTok Profile"
                subtitle="Daily short gaming clips, VTuber moments & memes (@vtuber_conny)"
                url="https://www.tiktok.com/@vtuber_conny"
                icon={<SiTiktok className="w-5 h-5 text-white" />}
                iconBg="bg-black/60 text-white border border-white/20 group-hover:bg-white group-hover:text-black"
                badge="VIRAL CLIPS"
              />

              {/* Discord Server Group Invite */}
              <LinkCard
                title="Discord Community Server"
                subtitle="Join the official Conny Discord server!"
                url="https://discord.com/invite/EYNdxyp7BE"
                icon={<SiDiscord className="w-5 h-5 text-[#5865F2]" />}
                iconBg="bg-[#5865F2]/15 text-[#5865F2] border border-[#5865F2]/30 group-hover:bg-[#5865F2] group-hover:text-white"
                badge="COMMUNITY"
              />

              {/* Facebook Fanpage */}
              <LinkCard
                title="Facebook Fanpage"
                subtitle="Follow for official updates, photos & community posts"
                url="https://www.facebook.com/profile.php?id=61580960862074"
                icon={<SiFacebook className="w-5 h-5 text-[#1877F2]" />}
                iconBg="bg-[#1877F2]/15 text-[#1877F2] border border-[#1877F2]/30 group-hover:bg-[#1877F2] group-hover:text-white"
                badge="FANPAGE"
              />

              {/* Creator Support Code Copy Widget */}
              <CopyWidget
                label="Creator Code"
                value="CONNY"
                subtext="Click to copy support code for store checkout"
              />

              {/* Setup / Wishlist */}
              <LinkCard
                title="Setup & Wishlist"
                subtitle="Check out gear specs & streamer wishlist"
                url="https://amazon.com"
                icon={<ShoppingBag className="w-5 h-5 text-[var(--primary-accent)]" />}
              />

            </div>

          </div>


          {/* ==================== RIGHT COLUMN: Featured Media Showcase (Span 7) ==================== */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Desktop Section Header */}
            <div className="hidden lg:flex items-center gap-2 text-[var(--primary-accent)] font-display font-extrabold text-sm tracking-wider uppercase">
              <Clapperboard className="w-4 h-4" />
              <span>Featured Media & Content Showcase</span>
            </div>

            {/* Featured YouTube Upload Preview Showcase */}
            <LatestVideoCard channelUrl="https://www.youtube.com/@conny_ny" />

            {/* Content Highlights Block */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Highlight Card 1: TikTok Clips */}
              <motion.div
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="glass-card p-4 rounded-2xl border border-white/5 space-y-2 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-black/60 text-white border border-white/20">
                    <SiTiktok className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-black/60 text-white">
                    TIKTOK
                  </span>
                </div>
                <div>
                  <h4 className="font-display font-bold text-white text-base">Short Clips</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Follow <span className="text-white font-semibold">@vtuber_conny</span> on TikTok for daily memes and clips!
                  </p>
                </div>
                <a
                  href="https://www.tiktok.com/@vtuber_conny"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-slate-300 px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition-all w-fit mt-2"
                >
                  <span>Open TikTok</span> &rarr;
                </a>
              </motion.div>

              {/* Highlight Card 2: Discord Server */}
              <motion.div
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="glass-card p-4 rounded-2xl border border-white/5 space-y-2 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-[#5865F2]/20 text-[#5865F2] border border-[#5865F2]/30">
                    <SiDiscord className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[#5865F2]/20 text-[#7983F5]">
                    DISCORD
                  </span>
                </div>
                <div>
                  <h4 className="font-display font-bold text-white text-base">Discord Server</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Join the official Conny Discord community server to hang out & game together.
                  </p>
                </div>
                <a
                  href="https://discord.com/invite/EYNdxyp7BE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7983F5] hover:text-white px-3 py-1.5 rounded-lg bg-[#5865F2]/10 border border-[#5865F2]/20 hover:bg-[#5865F2]/20 transition-all w-fit mt-2"
                >
                  <span>Join Server</span> &rarr;
                </a>
              </motion.div>

            </div>

            {/* Direct Channel Redirect Banner */}
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="glass-card p-5 rounded-2xl border border-[var(--primary-accent)]/30 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-[var(--surface-main)] via-[var(--surface-hover)] to-[var(--surface-main)] shadow-lg"
            >
              <div className="flex items-center gap-3.5 text-left">
                <div className="p-3 rounded-xl bg-[#FF0000]/20 text-[#FF0000] border border-[#FF0000]/40 shrink-0">
                  <FaYoutube className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-white text-base">Official YouTube Channel</h4>
                  <p className="text-xs text-slate-400 font-medium">Subscribe for all full-length gaming videos & shorts (@conny_ny)</p>
                </div>
              </div>
              <a
                href="https://www.youtube.com/@conny_ny"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)] hover:opacity-90 text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md shrink-0 text-center"
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
