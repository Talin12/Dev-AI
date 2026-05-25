"use client";

import Image from "next/image";
import Link from "next/link";
import { Bell, ChevronDown, Grid2X2 } from "lucide-react";

interface TopbarProps {
  onMenuToggle: () => void;
}

export function Topbar({ onMenuToggle }: TopbarProps) {
  return (
    <header className="w-full h-[81px] pt-[18px] pb-[18px] px-[20px] md:h-[56px] md:pt-0 md:pb-0 md:px-0">
      <div className="w-full max-w-[373px] h-[56px] mx-auto flex justify-between items-center pl-[12px] pr-[16px] rounded-[16px] bg-[#FFFFFFBF] backdrop-blur-md md:max-w-none md:pl-[24px] md:pr-[12px] md:gap-[10px] md:justify-start">

        {/* Mobile: VedaAI wordmark */}
        <Link href="/home" className="flex items-center gap-[6px] md:hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded-[7px] bg-[linear-gradient(180deg,#e56820_0%,#d45e3e_100%)] shadow-[0_8px_16px_rgba(197,53,10,0.25)]">
            <span className="text-[20px] font-black leading-none text-white">V</span>
          </div>
          <span className="text-[18px] font-extrabold leading-none tracking-[-0.04em] text-[#303030]">
            VedaAI
          </span>
        </Link>

        {/* Desktop: Back arrow */}
        <Link
          href="/assignments"
          className="hidden md:flex w-[40px] h-[40px] shrink-0 items-center justify-center rounded-full bg-white hover:bg-gray-50 transition-colors"
          aria-label="Back"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#303030" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </Link>

        {/* Desktop: Breadcrumb */}
        <div className="hidden md:flex flex-1 min-w-0 h-[20px] items-center gap-[8px]">
          <Grid2X2 size={19} className="text-[#a9a9a9] shrink-0" />
          <span className="text-[16px] font-semibold tracking-[-0.04em] text-[#a9a9a9] truncate">
            Assignments
          </span>
        </div>

        {/* Right icons group */}
        <div className="flex items-center gap-[12px] w-[116px] h-[36px] md:w-auto justify-end shrink-0">

          {/* Bell */}
          <button
            className="w-[36px] h-[36px] shrink-0 rounded-[100px] flex items-center justify-center bg-[#F6F6F6] hover:bg-[#ECECEC] transition-colors relative"
            aria-label="Notifications"
          >
            <Bell size={20} strokeWidth={2} className="text-[#303030]" />
            <span className="absolute top-[4px] right-[4px] h-2 w-2 rounded-full bg-[#FF5623]" />
          </button>

          {/* Profile */}
          <button className="h-[36px] md:h-[44px] shrink-0 px-[4px] md:px-[12px] py-[6px] rounded-[12px] flex items-center gap-[8px] hover:bg-black/5 transition-colors">
            <div className="relative w-[32px] h-[32px] shrink-0 overflow-hidden rounded-full bg-[#ffdcd2]">
              <Image src="/veda-avatar.jpg" alt="" fill className="object-cover" sizes="32px" />
            </div>
            <span className="hidden md:block text-[14px] font-bold leading-none tracking-[-0.04em] text-[#303030] truncate max-w-[100px]">
              John Doe
            </span>
            <ChevronDown size={16} className="text-[#303030] shrink-0" />
          </button>

          {/* Hamburger — mobile only */}
          <button
            onClick={onMenuToggle}
            className="block md:hidden w-[24px] h-[24px] flex items-center justify-center shrink-0"
            aria-label="Open menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#303030" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

        </div>
      </div>
    </header>
  );
}
