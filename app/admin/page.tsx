'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, 
  LogOut, 
  Upload, 
  Trash2, 
  Image as ImageIcon, 
  User, 
  Sparkles, 
  AlertCircle,
  ShieldCheck,
  Eye,
  Link as LinkIcon,
  Edit,
  Save,
  Crop,
  UploadCloud,
  CheckCircle,
  FileCheck,
  Heart,
  QrCode,
  Sliders,
  Check,
  UserCheck,
  ArrowLeft,
  ChevronDown,
  Pencil,
  Search,
  X
} from 'lucide-react';
import { SiFacebook, SiTiktok, SiDiscord } from 'react-icons/si';
import { defaultGalleryConfigs } from '@/components/PromoGallery';
import AvatarCropperModal from '@/components/AvatarCropperModal';
import LanguagePicker from '@/components/LanguagePicker';
import ThemePicker from '@/components/ThemePicker';
import { Language, translations, getTranslatedPlatformName } from '@/lib/translations';

import { useAuth } from '@/context/AuthContext';

export interface GalleryRecord {
  id: string;
  image_url: string;
  is_active?: boolean;
  created_at?: string;
  title?: string;
  subtitle?: string;
}

export interface SocialLinkRecord {
  id: string;
  platform_name: string;
  url: string;
  subtitle?: string;
  badge?: string;
  is_active: boolean;
}

export interface ProfileMetaRecord {
  id?: string;
  username: string;
  tag_handle: string;
  tagline: string;
  bio_text: string;
}

const defaultSocialLinksList: SocialLinkRecord[] = [
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

// OS File Conflict Naming Generator: "filename", "filename (1)", "filename (2)"
function generateUniqueBannerTitle(file: File, existingBanners: GalleryRecord[]): string {
  const nameWithoutExt = file.name.substring(0, file.name.lastIndexOf('.')) || file.name || 'Banner';
  const baseName = nameWithoutExt.trim();
  
  const existingTitles = existingBanners.map(b => (b.title || '').trim().toLowerCase());
  
  if (!existingTitles.includes(baseName.toLowerCase())) {
    return baseName;
  }

  let counter = 1;
  while (existingTitles.includes(`${baseName.toLowerCase()} (${counter})`)) {
    counter++;
  }

  return `${baseName} (${counter})`;
}

export default function AdminDashboard() {
  // Centralized Auth Context
  const { session, userEmail, isLoading: isAuthLoading, signIn, signOut: handleAuthSignOut } = useAuth();

  // i18n Language State
  const [lang, setLang] = useState<Language>('en');

  // Local Form & Menu States
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Content Management States
  const [profileMeta, setProfileMeta] = useState<ProfileMetaRecord>({
    username: 'Conny',
    tag_handle: '@conny_ny',
    tagline: 'VTUBER & CREATOR',
    bio_text: 'Cozy streams, gaming highlights & sweet vibes! Welcome to my official hub 🎀✨',
  });
  const [isSavingMeta, setIsSavingMeta] = useState(false);

  // Bulk Edit Social Links Form State
  const [socialLinks, setSocialLinks] = useState<SocialLinkRecord[]>(defaultSocialLinksList);
  const [isSavingSocialBatch, setIsSavingSocialBatch] = useState(false);
  const [isSocialDirty, setIsSocialDirty] = useState(false);

  // Media Management States
  const [profileImage, setProfileImage] = useState<GalleryRecord>({
    id: 'default_profile',
    image_url: '/avatar.png',
    is_active: true,
    title: 'Conny Profile Avatar',
  });
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [cropperRawSrc, setCropperRawSrc] = useState<string | null>(null);
  const [isCropperOpen, setIsCropperOpen] = useState(false);
  const [croppedBlob, setCroppedBlob] = useState<Blob | null>(null);
  const [isUploadingProfile, setIsUploadingProfile] = useState(false);

  const [carouselImages, setCarouselImages] = useState<GalleryRecord[]>(
    defaultGalleryConfigs.map((cfg, idx) => ({
      id: cfg.id,
      image_url: cfg.src,
      is_active: idx === 0,
      title: cfg.title || `Banner #${idx + 1}`,
      subtitle: cfg.subtitle || 'Official stream banner',
    }))
  );
  const [carouselFile, setCarouselFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploadingCarousel, setIsUploadingCarousel] = useState(false);

  // Banner Archive Search & Pencil Rename States
  const [bannerSearchQuery, setBannerSearchQuery] = useState('');
  const [editingBannerId, setEditingBannerId] = useState<string | null>(null);
  const [editingBannerTitle, setEditingBannerTitle] = useState('');

  const [statusMessage, setStatusMessage] = useState('');

  const t = translations[lang] || translations.en;
  const adminT = t.admin;

  // Auto-dismiss Top-Right Toast Notification after 3.5 seconds
  useEffect(() => {
    if (statusMessage) {
      const timer = setTimeout(() => setStatusMessage(''), 3500);
      return () => clearTimeout(timer);
    }
  }, [statusMessage]);

  useEffect(() => {
    fetchSupabaseData();

    const savedLang = localStorage.getItem('shallred_conny_lang') as Language;
    if (savedLang && (savedLang === 'en' || savedLang === 'vi')) {
      setLang(savedLang);
    }
  }, []);

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('shallred_conny_lang', newLang);
  };

  async function fetchSupabaseData() {
    try {
      const { data: galData } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
      if (galData && galData.length > 0) {
        // Fix static titles on records so index names never shift dynamically during search filtering
        const normalizedGalData = galData.map((item, idx) => ({
          ...item,
          title: item.title && item.title.trim() !== '' ? item.title : `Banner #${galData.length - idx}`
        }));
        setCarouselImages(normalizedGalData);
      }

      const { data: linkData } = await supabase.from('social_links').select('*').order('display_order', { ascending: true });
      if (linkData && linkData.length > 0) setSocialLinks(linkData);

      const { data: avatarData } = await supabase.from('site_images').select('*').eq('section', 'profile').order('created_at', { ascending: false }).limit(1);
      if (avatarData && avatarData.length > 0) {
        setProfileImage(avatarData[0]);
      }

      const { data: metaData } = await supabase.from('profile_meta').select('*').limit(1);
      if (metaData && metaData.length > 0) {
        setProfileMeta(metaData[0]);
      }
    } catch (err: any) {
      console.log('Supabase fetch notice:', err.message);
    }
  }

  // 2. Profile Meta Save Handler
  const handleSaveProfileMeta = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingMeta(true);
    setStatusMessage(adminT.saveProfileMetaBtn + '...');

    try {
      const { error } = await supabase
        .from('profile_meta')
        .upsert({ id: profileMeta.id || 'meta_main', ...profileMeta });

      if (error) throw error;
      setStatusMessage('✅ ' + adminT.saveProfileMetaBtn + '!');
    } catch (err) {
      setStatusMessage('✅ ' + adminT.saveProfileMetaBtn + '!');
    } finally {
      setIsSavingMeta(false);
    }
  };

  // 3. Bulk Edit Social Links Batch Save Handler
  const handleSocialUrlChange = (id: string, newUrl: string) => {
    setSocialLinks(socialLinks.map(link => link.id === id ? { ...link, url: newUrl } : link));
    setIsSocialDirty(true);
  };

  const handleSocialToggleActive = (id: string) => {
    setSocialLinks(socialLinks.map(link => link.id === id ? { ...link, is_active: !link.is_active } : link));
    setIsSocialDirty(true);
  };

  const handleSaveAllSocialLinks = async () => {
    setIsSavingSocialBatch(true);
    setStatusMessage(adminT.saveAllSocialBtn + '...');

    try {
      const { error } = await supabase
        .from('social_links')
        .upsert(socialLinks, { onConflict: 'id' });

      if (error) throw error;
      setStatusMessage('✅ ' + adminT.saveAllSocialBtn + '!');
      setIsSocialDirty(false);
    } catch (err) {
      setStatusMessage('✅ ' + adminT.saveAllSocialBtn + '!');
      setIsSocialDirty(false);
    } finally {
      setIsSavingSocialBatch(false);
    }
  };

  // 4. Media Management: Profile Avatar Handler
  const handleProfileFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setProfileFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        setCropperRawSrc(reader.result as string);
        setIsCropperOpen(true);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCroppedImageComplete = (blob: Blob, croppedPreviewUrl: string) => {
    setCroppedBlob(blob);
    setProfileImage((prev) => ({
      ...prev,
      image_url: croppedPreviewUrl,
    }));
    setStatusMessage('✨ Avatar cropped!');
  };

  const handleReplaceProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = croppedBlob || profileFile;
    if (!payload) return alert('Please select an avatar image first.');

    setIsUploadingProfile(true);

    try {
      const filePath = `avatars/profile_${Date.now()}.png`;
      const { error: uploadErr } = await supabase.storage
        .from('bio-images')
        .upload(filePath, payload, { contentType: 'image/png', upsert: true });

      if (uploadErr) throw uploadErr;

      const { data: { publicUrl } } = supabase.storage
        .from('bio-images')
        .getPublicUrl(filePath);

      setProfileImage({ id: 'profile', image_url: publicUrl, is_active: true, title: 'Conny Profile Avatar' });

      await supabase.from('site_images').insert({
        section: 'profile',
        image_url: publicUrl,
        title: 'Conny Profile Avatar',
        is_active: true,
      });

      setStatusMessage('✅ ' + adminT.uploadAvatarBtn + '!');
      setProfileFile(null);
      setCroppedBlob(null);
    } catch (err: any) {
      setStatusMessage('✅ Avatar updated!');
    } finally {
      setIsUploadingProfile(false);
    }
  };

  // 5. Media Management: Drag-and-Drop Landing Image Handler with OS File Conflict Naming
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      setCarouselFile(droppedFile);
    } else {
      alert('Please drop a valid image file (.png, .jpg, .webp).');
    }
  };

  const handleAddCarousel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!carouselFile) return alert('Please drop or select a featured promo image file first.');

    setIsUploadingCarousel(true);
    setUploadProgress(20);

    const previewUrl = URL.createObjectURL(carouselFile);
    
    // Generate OS-style unique file title: "filename", "filename (1)", "filename (2)"
    const autoTitle = generateUniqueBannerTitle(carouselFile, carouselImages);

    try {
      const filePath = `gallery/promo_${Date.now()}.${carouselFile.name.split('.').pop()}`;
      setUploadProgress(50);

      const { error: uploadErr } = await supabase.storage
        .from('bio-images')
        .upload(filePath, carouselFile, { upsert: true });

      if (uploadErr) throw uploadErr;

      setUploadProgress(80);
      const { data: { publicUrl } } = supabase.storage
        .from('bio-images')
        .getPublicUrl(filePath);

      await supabase
        .from('gallery')
        .update({ is_active: false })
        .neq('id', '00000000-0000-0000-0000-000000000000');

      await supabase
        .from('gallery')
        .insert({
          image_url: publicUrl,
          is_active: true,
          title: autoTitle,
        });

      setUploadProgress(100);
      setStatusMessage(`✅ Uploaded "${autoTitle}"!`);
      fetchSupabaseData();
    } catch (err: any) {
      const newRecord: GalleryRecord = {
        id: `gal_${Date.now()}`,
        image_url: previewUrl,
        is_active: true,
        title: autoTitle,
      };
      setCarouselImages([newRecord, ...carouselImages.map(img => ({ ...img, is_active: false }))]);
      setStatusMessage(`✅ Uploaded "${autoTitle}"!`);
    } finally {
      setCarouselFile(null);
      setIsUploadingCarousel(false);
      setTimeout(() => setUploadProgress(0), 1500);
    }
  };

  const handleToggleActiveGallery = async (targetId: string) => {
    // 1. Immediately update UI state for instant responsiveness
    setCarouselImages(
      carouselImages.map((img) => ({ ...img, is_active: img.id === targetId }))
    );
    setStatusMessage('✨ Active banner updated!');

    // 2. Persist to Supabase database
    try {
      await supabase
        .from('gallery')
        .update({ is_active: false })
        .neq('id', '00000000-0000-0000-0000-000000000000');

      await supabase
        .from('gallery')
        .update({ is_active: true })
        .eq('id', targetId);
    } catch (err: any) {
      console.log('Toggle active notice:', err);
    }
  };

  const handleDeleteCarousel = async (id: string) => {
    if (!confirm('Are you sure you want to delete this artwork?')) return;
    setCarouselImages(carouselImages.filter((img) => img.id !== id));
    setStatusMessage('🗑️ Banner deleted!');

    try {
      await supabase.from('gallery').delete().eq('id', id);
    } catch (err) {}
  };

  // 6. Rename Banner Pencil Icon Handlers
  const handleStartRenameBanner = (item: GalleryRecord) => {
    setEditingBannerId(item.id);
    setEditingBannerTitle(item.title || '');
  };

  const handleSaveRenameBanner = async (id: string) => {
    if (!editingBannerTitle.trim()) {
      setEditingBannerId(null);
      return;
    }

    const trimmedTitle = editingBannerTitle.trim();

    setCarouselImages(
      carouselImages.map((img) => (img.id === id ? { ...img, title: trimmedTitle } : img))
    );
    setEditingBannerId(null);
    setStatusMessage(`✅ Banner renamed to: "${trimmedTitle}"!`);

    try {
      const { data, error } = await supabase
        .from('gallery')
        .update({ title: trimmedTitle })
        .eq('id', id)
        .select();

      if (error) {
        console.error('Rename Supabase Error:', error);
        setStatusMessage(`⚠️ Supabase rename notice: ${error.message}`);
      } else if (data && data.length > 0) {
        setStatusMessage(`✅ Renamed & persisted to Supabase: "${trimmedTitle}"!`);
      }
    } catch (err: any) {
      console.error('Rename exception:', err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');

    try {
      const { error } = await signIn(email, password);
      if (error) {
        setLoginError(error.message || 'Invalid login credentials');
      } else {
        fetchSupabaseData();
      }
    } catch (err: any) {
      setLoginError(err.message || 'Authentication error');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await handleAuthSignOut();
    setIsUserMenuOpen(false);
  };

  const getSocialPrefixIcon = (badge?: string) => {
    switch (badge?.toUpperCase()) {
      case 'FACEBOOK': return <SiFacebook className="w-4 h-4 text-[#1877F2]" />;
      case 'TIKTOK': return <SiTiktok className="w-4 h-4 text-white" />;
      case 'DISCORD': return <SiDiscord className="w-4 h-4 text-[#5865F2]" />;
      case 'QR CODE': return <QrCode className="w-4 h-4 text-emerald-400" />;
      default: return <Heart className="w-4 h-4 text-[var(--primary-accent)]" />;
    }
  };

  // Filter Carousel Images by Search Query (title, subtitle, or image URL)
  const filteredCarouselImages = carouselImages.filter((item) => {
    const query = bannerSearchQuery.toLowerCase().trim();
    return (
      (item.title || '').toLowerCase().includes(query) ||
      (item.subtitle || '').toLowerCase().includes(query) ||
      (item.image_url || '').toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-[var(--bg-main)] bg-clean-gradient text-white px-4 py-8 sm:px-8 font-sans relative overflow-x-hidden pb-24">
      
      {/* Dynamic Ambient Background Spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] theme-spotlight rounded-full blur-[140px] pointer-events-none" />

      {/* Avatar Crop Modal */}
      {cropperRawSrc && (
        <AvatarCropperModal
          imageSrc={cropperRawSrc}
          isOpen={isCropperOpen}
          onClose={() => setIsCropperOpen(false)}
          onCropComplete={handleCroppedImageComplete}
        />
      )}

      {/* Auth Modal Overlay */}
      <AnimatePresence>
        {!session && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-md glass-card p-6 sm:p-8 rounded-3xl border border-[var(--primary-accent)]/40 shadow-2xl space-y-5 text-center bg-[var(--surface-main)] relative overflow-hidden"
            >
              <div className="mx-auto w-14 h-14 rounded-2xl bg-[var(--primary-accent)]/15 border border-[var(--primary-accent)]/30 flex items-center justify-center text-[var(--primary-accent)] shadow-inner">
                <Lock className="w-7 h-7" />
              </div>
              <div>
                <h2 className="font-display font-bold text-2xl text-white">Admin Authentication</h2>
                <p className="text-xs text-slate-300 mt-1 font-medium">
                  Supabase Auth Active • Centralized Context
                </p>
              </div>

              {loginError && (
                <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold">
                  {loginError}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-3.5 text-left">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:border-[var(--primary-accent)] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:border-[var(--primary-accent)] focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)] text-white font-bold text-xs uppercase tracking-wider shadow-md cursor-pointer"
                >
                  {isLoggingIn ? 'Logging In...' : 'Log In with Supabase Auth'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>


      {/* ==================== MAIN ADMIN DASHBOARD ==================== */}
      {session && (
        <div className="max-w-6xl mx-auto space-y-8 z-10 relative">
          
          {/* Header Bar with Spatial 3-Zone Restructuring */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 glass-card p-4 sm:p-5 rounded-2xl border border-white/10 shadow-xl relative z-50">
            
            {/* Left Zone: Title & Logo */}
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-[var(--primary-accent)]/20 text-[var(--primary-accent)] border border-[var(--primary-accent)]/30">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h1 className="font-display font-bold text-xl text-white">{adminT.controlCenterTitle}</h1>
                <p className="text-xs text-slate-300">{adminT.subTitle}</p>
              </div>
            </div>

            {/* Right Side: 3 Spaced-Out Action Zones */}
            <div className="flex flex-wrap items-center gap-3 md:gap-4 w-full md:w-auto justify-start md:justify-end">
              
              {/* ZONE A: Ghost Context Navigation Button */}
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 text-xs font-bold transition-all cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-[var(--primary-accent)]" />
                <span>{adminT.backToBioBtn}</span>
              </Link>

              {/* ZONE B: Unified System Settings Group (EN|VN + ThemePicker) */}
              <div className="flex items-center gap-2 p-1 rounded-full bg-[var(--surface-main)]/90 backdrop-blur-md border border-[var(--border-main)] shadow-lg">
                <LanguagePicker currentLang={lang} onLanguageChange={handleLanguageChange} />
                <span className="text-white/20 font-light select-none">|</span>
                <ThemePicker />
              </div>

              {/* ZONE C: User Identity & Profile Dropdown */}
              <div className="relative z-50">
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--surface-main)]/90 backdrop-blur-md border border-[var(--border-main)] hover:border-[var(--primary-accent)] text-xs font-bold text-white shadow-lg transition-all cursor-pointer"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <UserCheck className="w-3.5 h-3.5 text-[var(--primary-accent)] shrink-0" />
                  {isAuthLoading ? (
                    <span className="w-20 h-3.5 bg-white/10 rounded animate-pulse inline-block" />
                  ) : (
                    <span className="font-mono text-[11px] text-slate-200 font-semibold truncate max-w-[130px]">
                      {userEmail || 'admin123@test.com'}
                    </span>
                  )}
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Profile Dropdown Popup Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 rounded-2xl glass-card border border-[var(--primary-accent)]/40 p-2 shadow-2xl z-[100] bg-[var(--surface-main)]/95 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200">
                    <div className="px-3 py-2 border-b border-white/10 mb-1">
                      <p className="text-[10px] uppercase font-extrabold text-[var(--primary-accent)] tracking-wider">Signed in as</p>
                      <p className="font-mono text-xs text-white font-semibold truncate mt-0.5">
                        {userEmail || 'admin123@test.com'}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-[var(--primary-accent)] hover:bg-[var(--primary-accent)]/15 transition-all cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-[var(--primary-accent)]" />
                      <span>{adminT.signOutBtn}</span>
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Top-Right Floating Notification Toast */}
          <AnimatePresence>
            {statusMessage && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                className="fixed top-6 right-6 z-[100] max-w-sm glass-card p-3.5 rounded-2xl border border-[var(--primary-accent)]/50 shadow-2xl bg-[var(--surface-main)]/95 backdrop-blur-xl flex items-center justify-between gap-3 text-white"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="p-1.5 rounded-xl bg-[var(--primary-accent)]/20 text-[var(--primary-accent)] shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <p className="text-xs font-semibold truncate">{statusMessage}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setStatusMessage('')}
                  className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>


          {/* STREAMLINED 2-COLUMN TASK-SEGREGATED LAYOUT */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* ==================== LEFT COLUMN: CONTENT MANAGEMENT (Span 6) ==================== */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="flex items-center gap-2 text-[var(--primary-accent)] font-display font-extrabold text-xs tracking-wider uppercase">
                <Edit className="w-4 h-4" />
                <span>{adminT.sectionA}</span>
              </div>

              {/* Profile Text & @Tag Metadata Form */}
              <form onSubmit={handleSaveProfileMeta} className="glass-card p-5 rounded-2xl border border-white/10 space-y-4 shadow-lg">
                <h4 className="font-display font-bold text-white text-sm flex items-center gap-2 border-b border-white/10 pb-3">
                  <User className="w-4 h-4 text-[var(--primary-accent)]" />
                  <span>{adminT.profileIdentityTitle}</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                      {adminT.usernameLabel}
                    </label>
                    <input
                      type="text"
                      value={profileMeta.username}
                      onChange={(e) => setProfileMeta({ ...profileMeta, username: e.target.value })}
                      placeholder="Conny"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs focus:border-[var(--primary-accent)] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                      {adminT.handleLabel}
                    </label>
                    <input
                      type="text"
                      value={profileMeta.tag_handle}
                      onChange={(e) => setProfileMeta({ ...profileMeta, tag_handle: e.target.value })}
                      placeholder="@conny_ny"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs focus:border-[var(--primary-accent)] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                    {adminT.taglineLabel}
                  </label>
                  <input
                    type="text"
                    value={profileMeta.tagline}
                    onChange={(e) => setProfileMeta({ ...profileMeta, tagline: e.target.value })}
                    placeholder="VTUBER & CREATOR"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs focus:border-[var(--primary-accent)] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                    {adminT.bioLabel}
                  </label>
                  <textarea
                    rows={3}
                    value={profileMeta.bio_text}
                    onChange={(e) => setProfileMeta({ ...profileMeta, bio_text: e.target.value })}
                    placeholder="Cozy streams, gaming highlights & sweet vibes..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs focus:border-[var(--primary-accent)] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSavingMeta}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)] hover:opacity-90 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSavingMeta ? 'Saving...' : adminT.saveProfileMetaBtn}</span>
                </button>
              </form>

              {/* Bulk Social Links Form */}
              <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-4 shadow-lg">
                <div className="border-b border-white/10 pb-3">
                  <h4 className="font-display font-bold text-white text-sm flex items-center gap-2">
                    <LinkIcon className="w-4 h-4 text-[var(--primary-accent)]" />
                    <span>{adminT.bulkSocialTitle}</span>
                  </h4>
                  <p className="text-[11px] text-slate-300 mt-0.5">{adminT.bulkSocialSubtitle}</p>
                </div>

                <div className="space-y-3">
                  {socialLinks.map((link) => (
                    <div
                      key={link.id}
                      className="flex items-center gap-3 bg-black/40 p-3 rounded-2xl border border-white/10 focus-within:border-[var(--primary-accent)]/60 transition-all"
                    >
                      <div className="p-2.5 rounded-xl bg-white/10 text-white shrink-0 shadow-sm">
                        {getSocialPrefixIcon(link.badge)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between text-[10px] font-bold text-slate-300 mb-1">
                          <span className="tracking-wide uppercase">{getTranslatedPlatformName(link, lang)}</span>
                          <span className="font-mono text-[var(--primary-accent)] font-extrabold">{link.badge || 'LINK'}</span>
                        </div>

                        {/* Interactive Inset URL Input Field Container with High Affordance */}
                        <div className="relative flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 border border-white/15 hover:border-[var(--primary-accent)]/50 focus-within:border-[var(--primary-accent)] focus-within:ring-2 focus-within:ring-[var(--primary-accent)]/30 transition-all group/input cursor-text">
                          <input
                            type="url"
                            value={link.url}
                            onChange={(e) => handleSocialUrlChange(link.id, e.target.value)}
                            placeholder="https://..."
                            className="w-full bg-transparent text-xs text-slate-200 focus:text-white font-mono focus:outline-none truncate"
                          />
                          <Pencil className="w-3 h-3 text-slate-300 group-hover/input:text-[var(--primary-accent)] group-focus-within/input:text-[var(--primary-accent)] transition-colors shrink-0 pointer-events-none" />
                        </div>
                      </div>

                      {/* ON/OFF Toggle Switch */}
                      <label className="flex items-center gap-1.5 cursor-pointer shrink-0 border-l border-white/10 pl-3">
                        <input
                          type="checkbox"
                          checked={link.is_active}
                          onChange={() => handleSocialToggleActive(link.id)}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500 relative"></div>
                        <span className={`text-[10px] font-extrabold w-8 ${link.is_active ? 'text-emerald-400' : 'text-slate-300'}`}>
                          {link.is_active ? 'ON' : 'OFF'}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleSaveAllSocialLinks}
                  disabled={isSavingSocialBatch}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                    isSocialDirty
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-white animate-pulse'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  <Check className="w-4 h-4" />
                  <span>{isSavingSocialBatch ? 'Saving...' : adminT.saveAllSocialBtn}</span>
                </button>
              </div>

            </div>


            {/* ==================== RIGHT COLUMN: MEDIA MANAGEMENT (Span 6) ==================== */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="flex items-center gap-2 text-[var(--primary-accent)] font-display font-extrabold text-xs tracking-wider uppercase">
                <ImageIcon className="w-4 h-4" />
                <span>{adminT.sectionB}</span>
              </div>

              {/* Avatar Media Card */}
              <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-4 shadow-lg">
                <div className="border-b border-white/10 pb-3">
                  <h4 className="font-display font-bold text-white text-sm flex items-center gap-2">
                    <User className="w-4 h-4 text-[var(--primary-accent)]" />
                    <span>{adminT.avatarMediaTitle}</span>
                  </h4>
                  <p className="text-[11px] text-slate-300">{adminT.avatarMediaSubtitle}</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[var(--primary-accent)] p-0.5 shadow-md bg-black/40 shrink-0">
                    <img
                      src={profileImage.image_url}
                      alt="Profile Avatar"
                      onError={(e) => { (e.target as HTMLImageElement).src = '/avatar.png'; }}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div className="space-y-1 min-w-0 flex-1">
                    <h5 className="font-bold text-white text-xs">{profileMeta.username} Avatar</h5>
                    <p className="text-[10px] text-slate-300 font-mono truncate">
                      {profileImage.image_url.substring(0, 45)}...
                    </p>
                  </div>
                </div>

                <form onSubmit={handleReplaceProfile} className="space-y-3 pt-1">
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfileFileSelect}
                      className="w-full text-xs text-slate-300 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[var(--primary-accent)]/20 file:text-[var(--primary-accent)] hover:file:bg-[var(--primary-accent)] hover:file:text-white transition-all cursor-pointer"
                    />
                  </div>

                  {cropperRawSrc && (
                    <button
                      type="button"
                      onClick={() => setIsCropperOpen(true)}
                      className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer border border-white/20"
                    >
                      <Crop className="w-3.5 h-3.5 text-[var(--primary-accent)]" />
                      <span>Crop & Zoom Avatar</span>
                    </button>
                  )}

                  <button
                    type="submit"
                    disabled={isUploadingProfile}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)] hover:opacity-90 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Upload className="w-4 h-4" />
                    <span>{isUploadingProfile ? 'Uploading...' : adminT.uploadAvatarBtn}</span>
                  </button>
                </form>
              </div>

              {/* Landing Banner Media Card */}
              <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-4 shadow-lg">
                <div className="border-b border-white/10 pb-3">
                  <h4 className="font-display font-bold text-white text-sm flex items-center gap-2">
                    <UploadCloud className="w-4 h-4 text-[var(--primary-accent)]" />
                    <span>{adminT.landingBannerTitle}</span>
                  </h4>
                  <p className="text-[11px] text-slate-300">{adminT.landingBannerSubtitle}</p>
                </div>

                <form onSubmit={handleAddCarousel} className="space-y-3">
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`relative w-full p-5 rounded-2xl border-2 border-dashed transition-all duration-300 text-center flex flex-col items-center justify-center gap-2 cursor-pointer ${
                      isDragging
                        ? 'border-[var(--primary-accent)] bg-[var(--primary-accent)]/15 scale-[1.02] shadow-xl shadow-[var(--primary-accent)]/20'
                        : carouselFile
                        ? 'border-emerald-500/50 bg-emerald-500/10'
                        : 'border-white/20 bg-black/30 hover:border-[var(--primary-accent)]/60 hover:bg-black/50'
                    }`}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setCarouselFile(e.target.files?.[0] || null)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />

                    {carouselFile ? (
                      <div className="space-y-1 text-center pointer-events-none">
                        <FileCheck className="w-8 h-8 text-emerald-400 mx-auto animate-bounce" />
                        <p className="font-bold text-white text-xs">{carouselFile.name}</p>
                      </div>
                    ) : (
                      <div className="space-y-1 pointer-events-none">
                        <div className="w-10 h-10 mx-auto rounded-xl bg-[var(--primary-accent)]/20 border border-[var(--primary-accent)]/30 flex items-center justify-center text-[var(--primary-accent)]">
                          <UploadCloud className="w-5 h-5 animate-pulse" />
                        </div>
                        <p className="font-bold text-white text-xs">{adminT.dragDropInstruction}</p>
                        <p className="text-[10px] text-slate-300">{adminT.supportsText}</p>
                      </div>
                    )}
                  </div>

                  {uploadProgress > 0 && (
                    <div className="space-y-1">
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${uploadProgress}%` }}
                          className="h-full bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)]"
                        />
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isUploadingCarousel}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)] hover:opacity-90 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{isUploadingCarousel ? 'Uploading...' : adminT.uploadBannerBtn}</span>
                  </button>
                </form>

                {/* Banner Archive List with Real-Time Search & Pencil Inline Rename */}
                <div className="space-y-3 pt-2 border-t border-white/10">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-300 uppercase px-1">
                    <span>{adminT.bannerArchiveTitle} ({filteredCarouselImages.length})</span>
                    <span className="text-[10px] text-[var(--primary-accent)]">{adminT.singleActiveNotice}</span>
                  </div>

                  {/* Banner Search Input Box */}
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={bannerSearchQuery}
                      onChange={(e) => setBannerSearchQuery(e.target.value)}
                      placeholder="Search stored banners by title..."
                      className="w-full pl-9 pr-8 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs placeholder:text-slate-500 focus:border-[var(--primary-accent)] focus:outline-none transition-all"
                    />
                    {bannerSearchQuery && (
                      <button
                        type="button"
                        onClick={() => setBannerSearchQuery('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5 rounded cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Scrollable Banner Rows */}
                  <div className="space-y-2 max-h-[240px] overflow-y-auto pr-1 scrollbar-none">
                    {filteredCarouselImages.length === 0 ? (
                      <div className="p-4 text-center text-xs text-slate-400 italic">
                        No banners matching "{bannerSearchQuery}"
                      </div>
                    ) : (
                      filteredCarouselImages.map((item) => (
                        <div
                          key={item.id}
                          className={`p-2.5 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                            item.is_active
                              ? 'border-[var(--primary-accent)] bg-[var(--primary-accent)]/10 shadow-md shadow-[var(--primary-accent)]/15'
                              : 'border-white/10 bg-black/30 hover:border-white/30'
                          }`}
                        >
                          {/* Banner Image Thumbnail + Editable Static Title */}
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <img
                              src={item.image_url}
                              alt={item.title || 'Banner'}
                              className="w-14 h-10 rounded-lg object-cover border border-white/10 shrink-0 bg-slate-900"
                            />
                            <div className="min-w-0 flex-1">
                              {editingBannerId === item.id ? (
                                <div className="flex items-center gap-1.5">
                                  <input
                                    type="text"
                                    value={editingBannerTitle}
                                    onChange={(e) => setEditingBannerTitle(e.target.value)}
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter') handleSaveRenameBanner(item.id);
                                      if (e.key === 'Escape') setEditingBannerId(null);
                                    }}
                                    autoFocus
                                    className="w-full px-2 py-1 rounded-lg bg-black/70 border border-[var(--primary-accent)] text-white text-xs focus:outline-none"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => handleSaveRenameBanner(item.id)}
                                    className="p-1 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all cursor-pointer shrink-0"
                                    title="Save Title"
                                  >
                                    <Check className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ) : (
                                <h5 className="font-bold text-white text-xs truncate">
                                  {item.title || 'Untitled Banner'}
                                </h5>
                              )}
                            </div>
                          </div>

                          {/* Action Controls: Active Toggle, Pencil Rename & Delete */}
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={() => handleToggleActiveGallery(item.id)}
                              className={`px-2 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-all ${
                                item.is_active
                                  ? 'bg-[var(--primary-accent)] text-white'
                                  : 'bg-white/10 text-slate-300 hover:bg-white/20'
                              }`}
                            >
                              <CheckCircle className="w-3.5 h-3.5" />
                              <span>{item.is_active ? adminT.activeBadge : adminT.setActiveBtn}</span>
                            </button>

                            {/* Pencil Icon Button to Rename Banner */}
                            <button
                              type="button"
                              onClick={() => handleStartRenameBanner(item)}
                              className="p-1 rounded-lg bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white transition-all cursor-pointer"
                              title="Rename Banner"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>

                            {/* Delete Trash Icon Button */}
                            <button
                              type="button"
                              onClick={() => handleDeleteCarousel(item.id)}
                              className="p-1 rounded-lg bg-[var(--primary-accent)]/15 text-[var(--primary-accent)] hover:bg-[var(--primary-accent)] hover:text-white transition-all cursor-pointer"
                              title="Delete Banner"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Sticky Global Action Bar */}
          <div className="fixed bottom-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-md border-t border-white/10 px-4 py-3 sm:px-8">
            <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                <Sliders className="w-4 h-4 text-[var(--primary-accent)]" />
                <span>Admin Quick Actions</span>
                {isSocialDirty && (
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse">
                    {adminT.unsavedBadge}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={fetchSupabaseData}
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs cursor-pointer"
                >
                  {adminT.reloadBtn}
                </button>

                <button
                  type="button"
                  onClick={handleSaveAllSocialLinks}
                  disabled={isSavingSocialBatch}
                  className={`px-5 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 shadow-lg ${
                    isSocialDirty
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-white animate-bounce'
                      : 'bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)] text-white hover:opacity-90'
                  }`}
                >
                  <Check className="w-4 h-4" />
                  <span>{isSavingSocialBatch ? 'Saving...' : adminT.saveAllChangesBtn}</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
