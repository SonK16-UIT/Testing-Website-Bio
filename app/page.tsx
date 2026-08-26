'use client';

import { useState, useEffect } from 'react';
import AvatarHeader from '@/components/AvatarHeader';
import PromoGallery from '@/components/PromoGallery';
import LinkCard from '@/components/LinkCard';
import CopyWidget from '@/components/CopyWidget';
import BankQrModal from '@/components/BankQrModal';
import SocialFooter from '@/components/SocialFooter';
import ThemePicker from '@/components/ThemePicker';
import LanguagePicker from '@/components/LanguagePicker';
import { useDynamicData } from '@/lib/useDynamicData';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles,
  Clapperboard,
  Heart,
  QrCode,
  AlertCircle,
  X
} from 'lucide-react';
import { FaYoutube } from 'react-icons/fa';
import { SiFacebook, SiTiktok, SiDiscord } from 'react-icons/si';
import { Language, translations } from '@/lib/translations';

export default function Home() {
  const [lang, setLang] = useState<Language>('en');
  const { avatarUrl, profileMeta, socialLinks, toastError, dismissToast } = useDynamicData();

  useEffect(() => {
    const savedLang = localStorage.getItem('shallred_conny_lang') as Language;
    if (savedLang && (savedLang === 'en' || savedLang === 'vi')) {
      setLang(savedLang);
    }
  }, []);

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('shallred_conny_lang', newLang);
  };

  const t = translations[lang] || translations.en;

  const facebookLink = socialLinks.find(l => l.badge === 'FACEBOOK');
  const tiktokLink = socialLinks.find(l => l.badge === 'TIKTOK');
  const discordLink = socialLinks.find(l => l.badge === 'DISCORD');
  const zypageLink = socialLinks.find(l => l.badge === 'DONATE');
  const wescanLink = socialLinks.find(l => l.badge === 'QR CODE');

  return (
    <main className="relative min-h-screen bg-brand-bg bg-clean-gradient text-white flex flex-col items-center justify-between px-4 sm:px-6 lg:px-12 pb-16 overflow-x-hidden">
      
      {/* UI Toast Notification for Network Notice */}
      <AnimatePresence>
        {toastError && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-4 z-50 p-3.5 rounded-2xl bg-amber-500/20 border border-amber-500/40 backdrop-blur-md text-amber-200 text-xs flex items-center gap-2.5 shadow-xl max-w-sm"
          >
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="flex-1 font-medium">{toastError}</span>
            <button onClick={dismissToast} className="p-1 hover:bg-white/10 rounded-lg">
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Floating Global Controls Bar */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <LanguagePicker currentLang={lang} onLanguageChange={handleLanguageChange} />
        <ThemePicker />
      </div>

      {/* Top Ambient Dynamic Spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] theme-spotlight rounded-full blur-[140px] pointer-events-none" />

      {/* Decorative Accent Header Strip */}
      <div className="w-full h-1.5 bg-gradient-to-r from-[var(--primary-accent)] via-white to-[var(--secondary-accent)] shadow-sm" />

      {/* Main Responsive Grid Container */}
      <div className="w-full max-w-md lg:max-w-6xl pt-6 pb-12 z-10 flex-1 flex flex-col justify-center">
        
        {/* Grid: 1 column on mobile/tablet, 12 columns on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* ==================== LEFT COLUMN: Identity, Fanpage & Support Links (Span 5) ==================== */}
          <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-8">
            
            {/* Profile Avatar & Bio Header (Dynamic avatarUrl & profileMeta from Supabase) */}
            <AvatarHeader
              lang={lang}
              avatarUrl={avatarUrl}
              username={profileMeta?.username}
              tagHandle={profileMeta?.tag_handle}
              bioText={profileMeta?.bio_text}
              tagline={profileMeta?.tagline}
            />

            {/* Section Divider 1: Social Channels */}
            {facebookLink && (
              <>
                <div className="flex items-center gap-3 my-1">
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[var(--border-main)] to-[var(--border-main)]" />
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[var(--primary-accent)] flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[var(--primary-accent)]" /> {t.officialChannels}
                  </span>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-[var(--border-main)] via-[var(--border-main)] to-transparent" />
                </div>

                {/* Left Stack: Facebook Fanpage Link */}
                <div className="space-y-3">
                  <LinkCard
                    title={t.visitFanpageTitle}
                    subtitle={t.visitFanpageSubtitle}
                    url={facebookLink.url}
                    icon={<SiFacebook className="w-5 h-5 text-[#1877F2]" />}
                    iconBg="bg-[#1877F2]/15 text-[#1877F2] border border-[#1877F2]/30 group-hover:bg-[#1877F2] group-hover:text-white"
                    badge="FACEBOOK"
                  />
                </div>
              </>
            )}

            {/* Section Divider 2: Dedicated Donation & Support Section */}
            <div className="flex items-center gap-3 pt-1">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[var(--border-main)] to-[var(--border-main)]" />
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[var(--primary-accent)] flex items-center gap-1">
                <Heart className="w-3 h-3 text-[var(--primary-accent)] fill-[var(--primary-accent)]" /> {t.supportWishlist}
              </span>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-[var(--border-main)] via-[var(--border-main)] to-transparent" />
            </div>

            {/* Grouped Donation & Monetization Block */}
            <div className="space-y-3 p-4 rounded-2xl glass-card border border-[var(--primary-accent)]/30 bg-gradient-to-b from-[var(--surface-main)] to-black/30">
              
              {/* Creator Support Code Copy Widget */}
              <CopyWidget
                label={t.creatorCodeLabel}
                value="CONNY"
                subtext={t.creatorCodeSubtext}
                lang={lang}
              />

              {/* Side-by-Side 2-Column Donation Links Grid */}
              {(zypageLink || wescanLink) && (
                <div className="grid grid-cols-2 gap-3">
                  
                  {zypageLink && (
                    <LinkCard
                      title="Zypage"
                      subtitle={t.zypageTitle}
                      url={zypageLink.url}
                      icon={<Heart className="w-4 h-4 text-[var(--primary-accent)] fill-[var(--primary-accent)]/30" />}
                      iconBg="bg-[var(--primary-accent)]/15 text-[var(--primary-accent)] border border-[var(--primary-accent)]/30 group-hover:bg-[var(--primary-accent)] group-hover:text-white"
                      badge="DONATE"
                      compact={true}
                    />
                  )}

                  {wescanLink && (
                    <LinkCard
                      title="Wescan"
                      subtitle={t.wescanTitle}
                      url={wescanLink.url}
                      icon={<QrCode className="w-4 h-4 text-emerald-400" />}
                      iconBg="bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 group-hover:bg-emerald-500 group-hover:text-white"
                      badge="QR CODE"
                      compact={true}
                    />
                  )}

                </div>
              )}

              {/* Direct Bank Transfer Modal Trigger */}
              <BankQrModal lang={lang} />

            </div>

          </div>


          {/* ==================== RIGHT COLUMN: Single Featured Promo Showcase & Community Showcase (Span 7) ==================== */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Desktop Section Header */}
            <div className="hidden lg:flex items-center gap-2 text-[var(--primary-accent)] font-display font-extrabold text-sm tracking-wider uppercase pb-0.5">
              <Clapperboard className="w-4 h-4" />
              <span>{t.showcaseTitle}</span>
            </div>

            {/* Single Featured Landing Image Showcase (Zone 2) */}
            <PromoGallery lang={lang} />

            {/* Block 2: Platform Showcase Grid (TikTok & Discord - Dynamic ON/OFF Visibility) */}
            {(tiktokLink || discordLink) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Showcase Card 1: TikTok Viral Clips */}
                {tiktokLink && (
                  <motion.div
                    initial={false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="glass-card p-4 rounded-2xl border border-white/5 space-y-3 flex flex-col justify-between"
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
                      <h4 className="font-display font-bold text-white text-base">{t.tiktokTitle}</h4>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        {t.tiktokSubtitle}
                      </p>
                    </div>
                    <a
                      href={tiktokLink.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-white hover:text-slate-200 px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all w-full mt-1 min-h-[44px] touch-manipulation"
                    >
                      <span>{t.openTiktokBtn}</span> &rarr;
                    </a>
                  </motion.div>
                )}

                {/* Showcase Card 2: Discord Community */}
                {discordLink && (
                  <motion.div
                    initial={false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="glass-card p-4 rounded-2xl border border-white/5 space-y-3 flex flex-col justify-between"
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
                      <h4 className="font-display font-bold text-white text-base">{t.discordTitle}</h4>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        {t.discordSubtitle}
                      </p>
                    </div>
                    <a
                      href={discordLink.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-white hover:text-white px-3.5 py-2.5 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] transition-all w-full mt-1 shadow-md shadow-[#5865F2]/20 min-h-[44px] touch-manipulation"
                    >
                      <span>{t.joinCozyServerBtn}</span> &rarr;
                    </a>
                  </motion.div>
                )}

              </div>
            )}

            {/* Block 3: Direct Channel Redirect Banner */}
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="glass-card p-4 sm:p-5 rounded-2xl border border-[var(--primary-accent)]/30 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-[var(--surface-main)] via-[var(--surface-hover)] to-[var(--surface-main)] shadow-lg"
            >
              <div className="flex items-center gap-3.5 text-left">
                <div className="p-3 rounded-xl bg-[#FF0000]/20 text-[#FF0000] border border-[#FF0000]/40 shrink-0">
                  <FaYoutube className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-white text-base">{t.ytChannelTitle}</h4>
                  <p className="text-xs text-slate-400 font-medium">{t.ytChannelSubtitle}</p>
                </div>
              </div>
              <a
                href="https://www.youtube.com/@conny_ny"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)] hover:opacity-90 text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md shrink-0 text-center min-h-[44px] flex items-center justify-center touch-manipulation"
              >
                {t.visitChannelBtn}
              </a>
            </motion.div>

          </div>

        </div>

      </div>

      {/* Footer */}
      <SocialFooter lang={lang} />

    </main>
  );
}
