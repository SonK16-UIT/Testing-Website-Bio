'use client';

import { Heart } from 'lucide-react';

export default function SocialFooter() {
  return (
    <footer className="w-full text-center py-8 text-xs text-brand-muted space-y-2 border-t border-white/5 mt-8">
      <div className="flex items-center justify-center gap-1.5 font-medium">
        <span>Crafted for</span>
        <span className="text-white font-bold">ShallRed</span>
        <Heart className="w-3.5 h-3.5 text-brand-red fill-brand-red inline-block" />
        <span>Gaming Hub</span>
      </div>
      <p className="text-[11px] text-slate-500">
        &copy; {new Date().getFullYear()} @shallred / @ill_be_red. All rights reserved.
      </p>
    </footer>
  );
}
