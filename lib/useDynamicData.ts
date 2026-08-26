'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface DynamicProfileMeta {
  username: string;
  tag_handle: string;
  bio_text?: string;
  tagline?: string;
}

export interface DynamicGalleryItem {
  id: string;
  image_url: string;
  title?: string;
  subtitle?: string;
  is_active?: boolean;
}

export interface DynamicSocialLink {
  id: string;
  platform_name: string;
  url: string;
  subtitle?: string;
  badge?: string;
  is_active: boolean;
}

export const defaultProfileMeta: DynamicProfileMeta = {
  username: 'Conny',
  tag_handle: '@conny_ny',
  bio_text: 'Cozy streams, gaming highlights & sweet vibes! Welcome to my official hub 🎀✨',
  tagline: 'VTUBER & CREATOR',
};

export const defaultSocialLinksList: DynamicSocialLink[] = [
  {
    id: 'link_fanpage',
    platform_name: 'Ghế Thăm Fanpage',
    url: 'https://www.facebook.com/profile.php?id=61580960862074',
    subtitle: 'Theo dõi thông báo mới & bài viết cộng đồng',
    badge: 'FACEBOOK',
    is_active: true,
  },
  {
    id: 'link_tiktok',
    platform_name: 'Theo Dõi Trên TikTok',
    url: 'https://www.tiktok.com/@vtuber_conny',
    subtitle: 'Xem clip ngắn game & highlight VTuber',
    badge: 'TIKTOK',
    is_active: true,
  },
  {
    id: 'link_discord',
    platform_name: 'Máy Chủ Discord',
    url: 'https://discord.com/invite/EYNdxyp7BE',
    subtitle: 'Tham gia server Discord ấm cúng của Conny',
    badge: 'DISCORD',
    is_active: true,
  },
  {
    id: 'link_zypage',
    platform_name: 'Zypage',
    url: 'https://zypage.com/conny',
    subtitle: 'Donate qua Zypage',
    badge: 'DONATE',
    is_active: true,
  },
  {
    id: 'link_wescan',
    platform_name: 'Wescan',
    url: 'https://wescan.vn/conny/home',
    subtitle: 'Donate qua Wescan',
    badge: 'QR CODE',
    is_active: true,
  },
];

export function useDynamicData() {
  const [avatarUrl, setAvatarUrl] = useState<string>('/avatar.png');
  const [profileMeta, setProfileMeta] = useState<DynamicProfileMeta>(defaultProfileMeta);
  const [featuredGallery, setFeaturedGallery] = useState<DynamicGalleryItem | null>(null);
  const [socialLinks, setSocialLinks] = useState<DynamicSocialLink[]>(defaultSocialLinksList);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [toastError, setToastError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchAllDynamicData() {
      try {
        // 1. Fetch Profile Picture from table `site_images` (section = 'profile')
        const { data: avatarData, error: avatarErr } = await supabase
          .from('site_images')
          .select('image_url')
          .eq('section', 'profile')
          .order('created_at', { ascending: false })
          .limit(1);

        if (!avatarErr && avatarData && avatarData.length > 0 && avatarData[0].image_url) {
          if (mounted) setAvatarUrl(avatarData[0].image_url);
        }

        // 2. Fetch Profile Metadata from table `profile_meta`
        const { data: metaData, error: metaErr } = await supabase
          .from('profile_meta')
          .select('*')
          .limit(1);

        if (!metaErr && metaData && metaData.length > 0) {
          if (mounted) setProfileMeta(metaData[0]);
        }

        // 3. Fetch Single Active Featured Landing Image from table `gallery` (is_active = true)
        const { data: galleryData, error: galErr } = await supabase
          .from('gallery')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false })
          .limit(1);

        if (!galErr && galleryData && galleryData.length > 0) {
          if (mounted) setFeaturedGallery(galleryData[0]);
        }

        // 4. Fetch Social Hyperlinks from table `social_links` (is_active = true)
        const { data: linkData, error: linkErr } = await supabase
          .from('social_links')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (!linkErr && linkData && linkData.length > 0) {
          if (mounted) setSocialLinks(linkData);
        }

      } catch (err: any) {
        console.warn('Supabase dynamic sync notice:', err);
        if (mounted) setToastError('Network notice: Syncing with static local fallbacks.');
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    fetchAllDynamicData();

    return () => {
      mounted = false;
    };
  }, []);

  return {
    avatarUrl,
    profileMeta,
    featuredGallery,
    socialLinks,
    isLoading,
    toastError,
    dismissToast: () => setToastError(null),
  };
}
