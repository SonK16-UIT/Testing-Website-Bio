export type Language = 'en' | 'vi';

export interface GalleryItemTranslation {
  title: string;
  subtitle: string;
}

export const translations = {
  en: {
    tagline: 'VTUBER & CREATOR',
    bio: 'Cozy streams, gaming highlights & sweet vibes! Welcome to my official hub 🎀✨',
    officialChannels: 'OFFICIAL CHANNELS',
    visitFanpageTitle: 'Visit Fanpage',
    visitFanpageSubtitle: 'Follow official updates, photos & community posts',
    supportWishlist: 'DONATE & SUPPORT',
    creatorCodeLabel: 'Creator Support Code',
    creatorCodeSubtext: 'Click to copy support code for store checkout',
    zypageTitle: 'Donate via Zypage',
    zypageSubtitle: 'Send tips & custom stream alerts',
    wescanTitle: 'Donate via Wescan',
    wescanSubtitle: 'Instant QR code & banking transfer',
    directBankTitle: 'Direct Bank Transfer',
    directBankSubtitle: 'Scan MB Bank QR code or copy account number',
    bankModalHeader: 'Direct Bank Transfer (MB Bank)',
    scanQrInstruction: 'Scan with any banking app (MB, Vietcombank, Techcombank...)',
    bankNameLabel: 'Bank',
    accNoLabel: 'Account No.',
    accNameLabel: 'Account Name',
    copyAccNoBtn: 'Copy Account Number',
    accCopiedToast: 'Account number copied!',
    closeBtn: 'Close',
    giftBadge: 'DONATE',
    showcaseTitle: 'Featured Content & Community Showcase',
    latestVideoBadge: 'LATEST VIDEO',
    showcaseHeadline: "Watch Conny's Latest Videos & Cozy Streams",
    watchLatestBtn: 'Watch Latest Video Now',
    tiktokTitle: 'Follow on TikTok',
    tiktokSubtitle: 'Watch daily short gaming clips, VTuber highlights & memes (@vtuber_conny)',
    openTiktokBtn: 'Open TikTok Profile',
    discordTitle: 'Discord Server',
    discordSubtitle: "Join Conny's official cozy community server to chat, share memes & game together!",
    joinCozyServerBtn: 'Join the Cozy Server',
    ytChannelTitle: 'Official YouTube Channel',
    ytChannelSubtitle: 'Subscribe for all full-length gaming videos & shorts (@conny_ny)',
    visitChannelBtn: 'Visit Channel',
    copiedMsg: 'Copied to clipboard!',
    clickToCopy: 'Click to copy',
    craftedWith: 'Crafted with',
    for: 'for',
    allRightsReserved: 'All rights reserved.',

    /* Interactive Promo Gallery Translations */
    promoGalleryTitle: 'FEATURED PROMO GALLERY',
    interactiveBadge: 'INTERACTIVE',
    connyPromoArt: 'Conny Promo Art',
    promoCarouselTitle: 'PROMO CAROUSEL (CLICK THUMBNAIL TO SWAP)',
    swipeLabel: 'SWIPE →',

    /* Admin Panel i18n Dictionary */
    admin: {
      controlCenterTitle: 'Conny Creator Control Center',
      subTitle: 'Manage your bio page text, social links & featured media',
      sectionA: 'Section A: Content & Profile Info',
      sectionB: 'Section B: Media & Images',
      profileIdentityTitle: 'Profile Identity & Bio Text',
      usernameLabel: 'Display Username',
      handleLabel: 'Handle (@tag)',
      taglineLabel: 'Status Tagline Badge',
      bioLabel: 'Bio Description',
      saveProfileMetaBtn: 'Save Profile Identity',
      bulkSocialTitle: 'Social & Community Links',
      bulkSocialSubtitle: 'Edit URLs and toggle visibility below',
      saveAllSocialBtn: 'Save All Social Links',
      saveAllChangesBtn: 'Save All Changes',
      avatarMediaTitle: 'Profile Picture',
      avatarMediaSubtitle: 'Upload & crop your profile picture',
      uploadAvatarBtn: 'Upload Cropped Avatar',
      landingBannerTitle: 'Featured Landing Banner',
      landingBannerSubtitle: 'Drag & drop your 16:9 featured banner artwork',
      dragDropInstruction: 'Drag & Drop featured banner here, or click to browse',
      supportsText: 'Supports PNG, JPG, WEBP up to 50MB',
      uploadBannerBtn: 'Upload & Set Active Featured Banner',
      bannerArchiveTitle: 'Banner Archive',
      singleActiveNotice: 'Only one active banner allowed',
      setActiveBtn: 'Set Active',
      activeBadge: 'ACTIVE',
      signOutBtn: 'Sign Out',
      reloadBtn: 'Reload Live Data',
      unsavedBadge: 'UNSAVED SOCIAL LINKS',
      switchLangBtn: 'Chuyển sang Tiếng Việt 🇻🇳',
      backToBioBtn: 'Back to Bio Page',
    },

    /* Gallery Item Specific Translations */
    galleryItems: {
      valorant: {
        title: 'Game hok? VALORANT Stream Event',
        subtitle: 'Join Conny for special Valorant custom games & streams!',
      },
      pink: {
        title: 'Pink Pastel Chibi Special',
        subtitle: 'Official Conny artwork collection & emotes showcase',
      },
      bab: {
        title: 'Cozy Chibi Moments',
        subtitle: 'Stream highlights & adorable community fanart',
      },
      p2: {
        title: 'VTuber Outfit & Lore',
        subtitle: 'Check out new model design updates & streaming assets',
      },
      p1: {
        title: 'Community Fanart Spotlight',
        subtitle: 'Featured artwork submitted on the official Discord',
      },
      hi: {
        title: 'Stream Schedule & Updates',
        subtitle: 'Weekly stream announcements & upcoming events',
      },
      hok: {
        title: 'Gaming Highlights',
        subtitle: 'Funny stream clips & viral VTuber gaming moments',
      },
      hm: {
        title: 'Cozy Chibi Vibes',
        subtitle: 'Cozy streaming vibes & sweet moments with chat',
      },
      wo: {
        title: 'Special Event Banner',
        subtitle: 'Upcoming community tournament & collab announcements',
      },
      thanbai: {
        title: 'Gamer Master Highlights',
        subtitle: 'Epic wins, clutch plays & hilarious fails',
      },
      chiu: {
        title: 'Relaxing Vibes & Chat',
        subtitle: 'Just Chatting, music & relaxing cozy stream sessions',
      },
    }
  },
  vi: {
    tagline: 'VTUBER & SÁNG TẠO NỘI DUNG',
    bio: 'Stream thư giãn, highlight game cực cuốn & không khí siêu ngọt ngào! Chào mừng đến trang chính thức của Conny 🎀✨',
    officialChannels: 'KÊNH CHÍNH THỨC',
    visitFanpageTitle: 'Ghé Thăm Fanpage',
    visitFanpageSubtitle: 'Theo dõi thông báo mới, hình ảnh & bài viết cộng đồng',
    supportWishlist: 'ỦNG HỘ CREATOR',
    creatorCodeLabel: 'Mã Hỗ Trợ Creator',
    creatorCodeSubtext: 'Nhấn để sao chép mã hỗ trợ khi thanh toán',
    zypageTitle: 'Ủng hộ qua Zypage',
    zypageSubtitle: 'Gửi donate & hiện thông báo stream',
    wescanTitle: 'Ủng hộ qua Wescan',
    wescanSubtitle: 'Quét mã QR & chuyển khoản ngân hàng nhanh',
    directBankTitle: 'Chuyển Khoản Trực Tiếp',
    directBankSubtitle: 'Quét mã QR MB Bank hoặc sao chép STK',
    bankModalHeader: 'Chuyển Khoản Trực Tiếp (MB Bank)',
    scanQrInstruction: 'Quét mã bằng app ngân hàng bất kỳ (MB, Vietcombank, Techcombank...)',
    bankNameLabel: 'Ngân hàng',
    accNoLabel: 'Số tài khoản',
    accNameLabel: 'Chủ tài khoản',
    copyAccNoBtn: 'Sao Chép Số Tài Khoản',
    accCopiedToast: 'Đã sao chép STK MB Bank!',
    closeBtn: 'Đóng',
    giftBadge: 'DONATE',
    showcaseTitle: 'Nội Dung Nổi Bật & Cộng Đồng Showcase',
    latestVideoBadge: 'VIDEO MỚI NHẤT',
    showcaseHeadline: 'Xem Video Mới Nhất & Stream Thư Giãn Của Conny',
    watchLatestBtn: 'Xem Video Mới Nhất Ngay',
    tiktokTitle: 'Theo Dõi Trên TikTok',
    tiktokSubtitle: 'Xem clip ngắn game, highlight VTuber & meme mỗi ngày (@vtuber_conny)',
    openTiktokBtn: 'Mở Trang TikTok',
    discordTitle: 'Máy Chủ Discord',
    discordSubtitle: 'Tham gia server Discord ấm cúng chính thức của Conny để trò chuyện & chơi game cùng nhau!',
    joinCozyServerBtn: 'Tham Gia Server Ấm Cúng',
    ytChannelTitle: 'Kênh YouTube Chính Thức',
    ytChannelSubtitle: 'Đăng ký xem toàn bộ video game dài & shorts (@conny_ny)',
    visitChannelBtn: 'Ghé Thăm Kênh',
    copiedMsg: 'Đã sao chép vào bộ nhớ tạm!',
    clickToCopy: 'Nhấn để sao chép',
    craftedWith: 'Được làm với',
    for: 'dành cho',
    allRightsReserved: 'Đã đăng ký bản quyền.',

    /* Interactive Promo Gallery Translations */
    promoGalleryTitle: 'ALBUM PROMO & TRANH NỔI BẬT',
    interactiveBadge: 'TƯƠNG TÁC',
    connyPromoArt: 'Tranh Promo Conny',
    promoCarouselTitle: 'ALBUM PROMO (NHẤN ẢNH ĐỂ THAY ĐỔI)',
    swipeLabel: 'VUỐT →',

    /* Admin Panel i18n Dictionary */
    admin: {
      controlCenterTitle: 'Trung Tâm Quản Lý Creator Conny',
      subTitle: 'Quản lý thông tin profile, liên kết mạng xã hội & hình ảnh nổi bật',
      sectionA: 'Phần A: Thông Tin Profile & Nội Dung',
      sectionB: 'Phần B: Quản Lý Hình Ảnh & Media',
      profileIdentityTitle: 'Thông Tin Profile & Tiểu Sử',
      usernameLabel: 'Tên Hiển Thị',
      handleLabel: 'Tên Tài Khoản (@tag)',
      taglineLabel: 'Huy Hiệu Trạng Thái',
      bioLabel: 'Mô Tả Tiểu Sử (Bio)',
      saveProfileMetaBtn: 'Lưu Thông Tin Profile',
      bulkSocialTitle: 'Liên Kết Mạng Xã Hội & Cộng Đồng',
      bulkSocialSubtitle: 'Chỉnh sửa đường dẫn & bật/tắt hiển thị bên dưới',
      saveAllSocialBtn: 'Lưu Tất Cả Liên Kết',
      saveAllChangesBtn: 'Lưu Tất Cả Thay Đổi',
      avatarMediaTitle: 'Ảnh Đại Diện',
      avatarMediaSubtitle: 'Tải lên & cắt ảnh đại diện của bạn',
      uploadAvatarBtn: 'Tải Ảnh Đại Diện Đã Cắt',
      landingBannerTitle: 'Banner Nổi Bật Trang Chủ',
      landingBannerSubtitle: 'Kéo & thả ảnh banner 16:9 nổi bật của bạn',
      dragDropInstruction: 'Kéo & Thả ảnh banner 16:9 vào đây, hoặc nhấn để chọn file',
      supportsText: 'Hỗ trợ PNG, JPG, WEBP tối đa 50MB',
      uploadBannerBtn: 'Tải Lên & Đặt Làm Banner Nổi Bật',
      bannerArchiveTitle: 'Kho Lưu Trữ Banner',
      singleActiveNotice: 'Chỉ cho phép 1 banner hoạt động cùng lúc',
      setActiveBtn: 'Đặt Kích Hoạt',
      activeBadge: 'ĐANG HOẠT ĐỘNG',
      signOutBtn: 'Đăng Xuất',
      reloadBtn: 'Tải Lại Dữ Liệu',
      unsavedBadge: 'LIÊN KẾT CHƯA LƯU',
      switchLangBtn: 'Switch to English 🇬🇧',
      backToBioBtn: 'Quay Lại Trang Bio',
    },

    /* Gallery Item Specific Translations */
    galleryItems: {
      valorant: {
        title: 'Game hok? Sự Kiện Stream VALORANT',
        subtitle: 'Cùng tham gia custom Valorant & stream vui vẻ với Conny!',
      },
      pink: {
        title: 'Bộ Tranh Chibi Hồng Ngọt Ngào',
        subtitle: 'Bộ sưu tập tranh chính thức & emote đáng yêu của Conny',
      },
      bab: {
        title: 'Khoảnh Khắc Chibi Ấm Cúng',
        subtitle: 'Highlight stream & fanart siêu dễ thương từ cộng đồng',
      },
      p2: {
        title: 'Trang Phục & Lore VTuber',
        subtitle: 'Xem cập nhật thiết kế model mới & tài nguyên livestream',
      },
      p1: {
        title: 'Góc Fanart Cộng Đồng',
        subtitle: 'Tranh fanart nổi bật gửi từ máy chủ Discord chính thức',
      },
      hi: {
        title: 'Lịch Stream & Thông Báo',
        subtitle: 'Lịch livestream hàng tuần & các sự kiện sắp tới',
      },
      hok: {
        title: 'Highlight Game Ấn Tượng',
        subtitle: 'Clip ngắn hài hước & khoảnh khắc chơi game cực cuốn',
      },
      hm: {
        title: 'Không Khí Stream Ấm Cúng',
        subtitle: 'Góc stream thư giãn & những phút giây ngọt ngào với chat',
      },
      wo: {
        title: 'Banner Sự Kiện Đặc Biệt',
        subtitle: 'Giải đấu cộng đồng sắp tới & các dự án hợp tác mới',
      },
      thanbai: {
        title: 'Highlight Thần Bài Gaming',
        subtitle: 'Những pha xử lý đỉnh cao, gánh team & pha thót tim',
      },
      chiu: {
        title: 'Góc Tám Chill & Thư Giãn',
        subtitle: 'Tâm sự, nghe nhạc & buổi stream trò chuyện ấm áp',
      },
    }
  }
};

export const socialPlatformNames: Record<Language, Record<string, string>> = {
  en: {
    'link_fanpage': 'Visit Fanpage',
    'link_tiktok': 'Follow On TikTok',
    'link_discord': 'Discord Server',
    'link_zypage': 'Donate Via Zypage',
    'link_wescan': 'Donate Via Wescan',
    'Ghế Thăm Fanpage': 'Visit Fanpage',
    'Theo Dõi Trên TikTok': 'Follow On TikTok',
    'Máy Chủ Discord': 'Discord Server',
    'Ủng Hộ Qua Zypage': 'Donate Via Zypage',
    'Ủng Hộ Qua Wescan': 'Donate Via Wescan',
  },
  vi: {
    'link_fanpage': 'Ghé Thăm Fanpage',
    'link_tiktok': 'Theo Dõi Trên TikTok',
    'link_discord': 'Máy Chủ Discord',
    'link_zypage': 'Ủng Hộ Qua Zypage',
    'link_wescan': 'Ủng Hộ Qua Wescan',
    'Ghế Thăm Fanpage': 'Ghé Thăm Fanpage',
    'Theo Dõi Trên TikTok': 'Theo Dõi Trên TikTok',
    'Máy Chủ Discord': 'Máy Chủ Discord',
    'Ủng Hộ Qua Zypage': 'Ủng Hộ Qua Zypage',
    'Ủng Hộ Qua Wescan': 'Ủng Hộ Qua Wescan',
  }
};

export function getTranslatedPlatformName(item: { id?: string; platform_name: string }, lang: Language): string {
  const dict = socialPlatformNames[lang] || socialPlatformNames.en;
  if (item.id && dict[item.id]) return dict[item.id];
  if (dict[item.platform_name]) return dict[item.platform_name];
  return item.platform_name;
}
