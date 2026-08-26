'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ExternalLink, Image as ImageIcon } from 'lucide-react';
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
  { id: 'valorant', src: '/gallery/huhuket.jpg', ctaUrl: 'https://www.youtube.com/@conny_ny', title: 'Conny Featured Stream Artwork', subtitle: 'Official stream banner & highlights' },
  { id: 'pink', src: '/gallery/pink.png', ctaUrl: 'https://discord.com/invite/EYNdxyp7BE', title: 'Pink Sweet Stream Theme', subtitle: 'Hơi thở ngọt ngào & không khí thư giãn' },
  { id: 'bab', src: '/gallery/bab.png', ctaUrl: 'https://www.facebook.com/profile.php?id=61580960862074', title: 'Fanpage Artwork', subtitle: 'Hình ảnh & bài viết mới nhất' },
];

export const defaultFeaturedConfig: FeaturedGalleryItem = defaultGalleryConfigs[0];

interface PromoGalleryProps {
  lang?: Language;
}

export default function PromoGallery({ lang = 'en' }: PromoGalleryProps) {
  const [featuredItem, setFeaturedItem] = useState<FeaturedGalleryItem>(defaultFeaturedConfig);
  const t = translations[lang] || translations.en;

  // Fetch the single active featured image from Supabase table `gallery` (where is_active = true)
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
            title: data[0].title || 'Conny Featured Stream Artwork',
            subtitle: data[0].subtitle || 'Official stream banner & highlights',
          });
        }
      } catch (err) {
        console.log('Using static single featured image fallback:', err);
      }
    }

    loadFeaturedImage();
  }, []);

  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative w-full rounded-2xl overflow-hidden glass-card border border-[var(--primary-accent)]/50 shadow-xl shadow-[var(--secondary-accent)]/20 p-4 space-y-3.5"
    >
      {/* Top Banner Header Tag */}
      <div className="bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)] text-white text-[11px] font-extrabold uppercase px-3 py-1.5 rounded-xl flex items-center justify-between tracking-wider shadow-sm">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t.promoGalleryTitle}</span>
        </div>
        <span className="flex items-center gap-1 text-[10px] bg-black/30 px-2.5 py-0.5 rounded-full font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary-accent)] animate-ping" />
          FEATURED LANDING ARTWORK
        </span>
      </div>

      {/* Main Single Featured Image Viewport */}
      <div className="relative aspect-video w-full rounded-xl bg-slate-950 overflow-hidden border border-white/10 group shadow-inner">
        <AnimatePresence mode="wait">
          <motion.div
            key={featuredItem.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <TimeoutImage
              src={featuredItem.src}
              fallbackSrc="/gallery/huhuket.jpg"
              timeoutMs={2500}
              alt={featuredItem.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Dark Vignette Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-main)] via-black/30 to-black/10 z-10 pointer-events-none" />

        {/* Title Overlay inside Featured Main Viewport */}
        <div className="absolute bottom-3 left-4 right-4 z-20 flex items-end justify-between gap-3 text-left">
          <div className="space-y-0.5 max-w-[70%]">
            <div className="flex items-center gap-1 text-[var(--primary-accent)] text-[10px] font-extrabold uppercase tracking-wide">
              <ImageIcon className="w-3.5 h-3.5" />
              <span>{t.connyPromoArt}</span>
            </div>
            <h3 className="font-display font-bold text-white text-sm md:text-base leading-tight drop-shadow-md line-clamp-1">
              {featuredItem.title}
            </h3>
            <p className="text-[11px] text-slate-300 font-medium line-clamp-1 hidden sm:block">
              {featuredItem.subtitle}
            </p>
          </div>

          <a
            href={featuredItem.ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)] text-white text-xs font-bold shadow-md hover:opacity-90 transition-all shrink-0"
          >
            <span>{t.watchLatestBtn}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
