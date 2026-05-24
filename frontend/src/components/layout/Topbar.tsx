"use client";

import Image from "next/image";
import Link from "next/link";
import { Bell, ChevronDown, Grid2X2 } from "lucide-react";

interface TopbarProps {
  onMenuToggle: () => void;
}

export function Topbar({ onMenuToggle: _ }: TopbarProps) {
  return (
    <header className="w-full max-w-[1100px] h-[56px] pl-[24px] pr-[12px] flex items-center gap-[10px] bg-[#FFFFFFBF] backdrop-blur-md rounded-[16px]">

      {/* Back Arrow — w-[40px] */}
      <Link
        href="/assignments"
        className="w-[40px] h-[40px] shrink-0 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors"
        aria-label="Back"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#303030" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </Link>

      {/* Title / Breadcrumb — w-[801px] */}
      <div className="w-[801px] h-[20px] shrink-0 flex items-center gap-[8px]">
        <Grid2X2 size={19} className="text-[#a9a9a9]" />
        <span className="text-[16px] font-semibold tracking-[-0.04em] text-[#a9a9a9]">Assignments</span>
      </div>

      {/* Bell — w-[36px] */}
      <button
        className="w-[36px] h-[36px] shrink-0 rounded-[100px] flex items-center justify-center hover:bg-black/5 transition-colors relative"
        aria-label="Notifications"
      >
        <Bell size={20} strokeWidth={2} className="text-[#303030]" />
        <span className="absolute top-[4px] right-[4px] h-2 w-2 rounded-full bg-[#ff4b25]" />
      </button>

      {/* Profile Chip — w-[157px] */}
      <button className="w-[157px] h-[44px] shrink-0 px-[12px] py-[6px] rounded-[12px] flex items-center gap-[8px] hover:bg-black/5 transition-colors">
        <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-[#ffdcd2]">
          <Image src="/veda-avatar.jpg" alt="" fill className="object-cover" sizes="32px" />
        </div>
        <span className="text-[14px] font-bold leading-none tracking-[-0.04em] text-[#303030] truncate">
          John Doe
        </span>
        <ChevronDown size={16} className="text-[#303030] shrink-0" />
      </button>

    </header>
  );
}
