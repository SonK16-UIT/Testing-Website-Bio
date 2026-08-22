'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, ExternalLink, MessageSquare } from 'lucide-react';

interface DiscordWidgetProps {
  userId: string;
  username: string;
  delay?: number;
}

export default function DiscordWidget({
  userId = '374148534531915777',
  username = 'shallred',
  delay = 0.4,
}: DiscordWidgetProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyId = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    navigator.clipboard.writeText(userId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="glass-card glass-card-hover w-full p-4 rounded-2xl flex items-center justify-between group border border-white/5 relative"
    >
      <div className="flex items-center gap-3.5 min-w-0 flex-1">
        {/* Discord Icon Avatar */}
        <div className="p-3 rounded-xl bg-[#5865F2]/20 text-[#5865F2] border border-[#5865F2]/30 group-hover:bg-[#5865F2] group-hover:text-white transition-colors duration-300 shrink-0">
          <MessageSquare className="w-5 h-5" />
        </div>

        <div className="text-left truncate flex-1">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-white text-base">Discord Profile</span>
            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[#5865F2]/20 text-[#7983F5] border border-[#5865F2]/30">
              @{username}
            </span>
          </div>
          <p className="text-xs text-brand-muted truncate font-medium">
            User ID: <span className="font-mono text-slate-300">{userId}</span>
          </p>
        </div>
      </div>

      {/* Action Buttons: Direct Profile Open & Copy ID */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={handleCopyId}
          title="Copy Discord User ID"
          className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all duration-300 ${
            copied
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
              : 'bg-brand-surfaceHover text-brand-muted hover:text-white hover:bg-brand-red/20'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">ID</span>
            </>
          )}
        </button>

        <a
          href={`https://discord.com/users/${userId}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Open Discord Profile"
          className="p-2 rounded-xl bg-[#5865F2]/20 text-[#7983F5] hover:bg-[#5865F2] hover:text-white transition-colors duration-300"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  );
}
