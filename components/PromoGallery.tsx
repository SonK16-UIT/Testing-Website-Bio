'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Eye } from 'lucide-react';
import { Language, translations } from '@/lib/translations';
import TimeoutImage from '@/components/TimeoutImage';
import { supabase } from '@/lib/supabase';

export interface FeaturedGalleryItem {
  id: string;
  src: string;
  ctaUrl: string;
  title?: string;
  subtitle?: string;
}

export const defaultGalleryConfigs: FeaturedGalleryItem[] = [
  {
    id: 'connys_room',
    src: '/gallery/connys_room.jpg',
    ctaUrl: 'https://www.youtube.com/@conny_ny',
    title: "Conny's Room & About Me",
    subtitle: 'A rabbit VTuber giggles, and fun gameplay 🎀✨',
  },
  {
    id: 'valorant',
    src: '/gallery/huhuket.jpg',
    ctaUrl: 'https://www.youtube.com/@conny_ny',
    title: 'Conny Featured Stream Artwork',
    subtitle: 'Official stream banner & highlights',
  },
];

export const defaultFeaturedConfig: FeaturedGalleryItem = defaultGalleryConfigs[0];

interface PromoGalleryProps {
  lang?: Language;
}

export default function PromoGallery({ lang = 'en' }: PromoGalleryProps) {
  const [featuredItem, setFeaturedItem] = useState<FeaturedGalleryItem>(defaultFeaturedConfig);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const t = translations[lang] || translations.en;

  useEffect(() => {
    async function loadFeaturedImage() {
      try {
        const { data, error } = await supabase
          .from('gallery')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false })
          .limit(1);

        if (!error && data && data.length > 0 && data[0].image_url) {
          setFeaturedItem({
            id: data[0].id || 'supa_featured',
            src: data[0].image_url,
            ctaUrl: data[0].cta_url || 'https://www.youtube.com/@conny_ny',
            title: data[0].title || "Conny's Room & About Me",
            subtitle: data[0].subtitle || 'A rabbit VTuber giggles, and fun gameplay 🎀✨',
          });
        }
      } catch (err) {
        console.log('Using default featured image fallback:', err);
      }
    }

    loadFeaturedImage();
  }, []);

  return (
    <>
      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        // Outer Elevated Container with Warm Dark Purple Gradient Surface & Soft Pink Neon Glow Aura
        className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#231b2e]/95 via-[var(--surface-main)] to-[#150f20]/95 backdrop-blur-xl border border-[var(--primary-accent)]/60 shadow-[0_4px_30px_rgba(255,105,180,0.22),inset_0_0_20px_rgba(255,180,220,0.06)] p-3.5 sm:p-5 space-y-3.5 transition-all duration-500 hover:border-[var(--primary-accent)]/80 hover:shadow-[0_6px_36px_rgba(255,105,180,0.30)]"
      >
        {/* Top Banner Header Tag */}
        <div className="bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)] text-white text-[11px] font-extrabold uppercase px-3.5 py-1.5 rounded-xl flex items-center justify-between tracking-wider shadow-md border border-white/20">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>{t.promoGalleryTitle}</span>
          </div>
          <span className="flex items-center gap-1.5 text-[10px] bg-black/40 backdrop-blur-md px-2.5 py-0.5 rounded-full font-mono border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary-accent)] animate-ping" />
            <span>{t.featuredLandingTag || 'FEATURED LANDING ARTWORK'} 🐰</span>
          </span>
        </div>

        {/* 
          Clean, Mobile-and-PC Responsive Trigger Stage:
          Dynamic EN/VN translations for button and helper text
        */}
        <div className="relative w-full rounded-2xl overflow-hidden flex flex-col items-center justify-center p-5 sm:p-8 bg-gradient-to-br from-[#2a1b38]/90 via-[#1f152b] to-[#150d1e] border border-[var(--primary-accent)]/30 shadow-[0_10px_30px_rgba(10,5,20,0.65),0_0_20px_rgba(255,105,180,0.12)] group">
          {/* Ambient Background Glowing Aura */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[var(--primary-accent)]/15 via-transparent to-[var(--secondary-accent)]/15 opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {/* Clean, Mobile & PC Responsive VTuber Trigger Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsModalOpen(true)}
            type="button"
            className="relative z-10 w-full sm:w-auto max-w-full px-4 sm:px-7 py-3 sm:py-3.5 rounded-xl sm:rounded-full bg-gradient-to-r from-[var(--primary-accent)] via-purple-600 to-[var(--secondary-accent)] text-white font-extrabold text-xs sm:text-base tracking-wide shadow-[0_0_25px_rgba(255,105,180,0.50),0_4px_15px_rgba(0,0,0,0.3)] border border-white/30 cursor-pointer flex items-center justify-center gap-2 sm:gap-2.5 touch-manipulation overflow-hidden transition-all duration-300 group/btn"
          >
            {/* Shimmer Light Reflection Sweep */}
            <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/35 to-transparent -skew-x-12 -translate-x-full group-hover/btn:translate-x-[300%] transition-transform duration-1000 ease-in-out pointer-events-none" />

            <span className="text-base sm:text-lg shrink-0">🐰</span>
            <span className="drop-shadow-md font-display uppercase tracking-wider text-center line-clamp-1">
              {t.promoBtnText || 'Khong xem lam Tho'}
            </span>
            <span className="text-base sm:text-lg shrink-0">🐰</span>
          </motion.button>

          {/* Helper Caption */}
          <p className="relative z-10 text-[11px] sm:text-xs text-slate-300/90 font-medium mt-3 flex items-center gap-1.5 opacity-90 group-hover:text-white transition-colors">
            <Eye className="w-3.5 h-3.5 text-[var(--primary-accent)] shrink-0" />
            <span>{t.clickToViewArtwork || 'Click to view landing artwork'} 🐰✨</span>
          </p>
        </div>
      </motion.div>

      {/* 
        Modal / Pop-Up Entrance Animation:
        Displays the original artwork when triggered
      */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 z-[110] bg-black/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.90, opacity: 0, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full max-h-[90vh] rounded-2xl bg-[#2a1b38]/95 border border-[var(--primary-accent)]/60 shadow-[0_0_50px_rgba(255,105,180,0.40)] p-3 sm:p-5 overflow-y-auto flex flex-col items-center justify-center cursor-default"
            >
              {/* Modal Top Header with Close Button */}
              <div className="w-full flex items-center justify-between pb-2.5 mb-2 border-b border-white/10">
                <div className="flex items-center gap-2 text-white font-bold text-xs sm:text-base">
                  <Sparkles className="w-4 h-4 text-[var(--primary-accent)]" />
                  <span className="line-clamp-1">{featuredItem.title || "Conny's Official Artwork 🐰"}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  aria-label="Close modal"
                  className="p-1.5 rounded-full bg-white/10 text-slate-300 hover:text-white hover:bg-[var(--primary-accent)] transition-all duration-200"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* Modal Artwork Stage (White with Slight Purple Tint Backdrop #FAF5FF) */}
              <div className="relative w-full rounded-xl overflow-hidden flex items-center justify-center p-2 sm:p-3 bg-[#faf5ff] border border-purple-200/60 shadow-xl">
                <TimeoutImage
                  src={featuredItem.src}
                  fallbackSrc="/gallery/connys_room.jpg"
                  timeoutMs={2500}
                  alt={featuredItem.title || 'Featured Artwork'}
                  className="w-full flex items-center justify-center"
                  imgClassName="w-full h-auto object-contain rounded-lg max-h-[75vh]"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
