'use client';

import { Heart } from 'lucide-react';

export default function SocialFooter() {
  return (
    <footer className="w-full text-center py-8 text-xs text-brand-muted space-y-2 border-t border-white/5 mt-8">
      <div className="flex items-center justify-center gap-1.5 font-medium">
        <span>Crafted with</span>
        <Heart className="w-3.5 h-3.5 text-brand-pink fill-brand-pink inline-block" />
        <span>for</span>
        <span className="text-white font-bold">Conny</span>
        <span>(@conny_ny)</span>
      </div>
      <p className="text-[11px] text-slate-400">
        &copy; {new Date().getFullYear()} @conny_ny. All rights reserved.
      </p>
    </footer>
  );
}
