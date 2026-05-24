"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Bell, ChevronDown, Grid2X2, Menu } from "lucide-react";

interface TopbarProps {
  onMenuToggle: () => void;
}

export function Topbar({ onMenuToggle }: TopbarProps) {
  return (
    <header className="mb-2 flex h-14 shrink-0 items-center justify-between rounded-[16px] bg-white/75 px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#303030] transition-colors hover:bg-[#f6f6f6] md:hidden"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>

        <Link
          href="/assignments"
          className="hidden h-10 w-10 items-center justify-center rounded-full bg-white text-[#303030] transition-colors hover:bg-[#f6f6f6] md:flex"
          aria-label="Back"
        >
          <ArrowLeft size={22} />
        </Link>

        <div className="flex items-center gap-2 text-[#a9a9a9]">
          <Grid2X2 size={19} />
          <span className="text-[16px] font-semibold tracking-[-0.04em]">Assignment</span>
        </div>
      </div>

      <div className="flex h-14 items-center gap-6 rounded-[14px] bg-white/45 px-3">
        <button className="relative text-[#303030]" aria-label="Notifications">
          <Bell size={22} strokeWidth={2} />
          <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-[#ff4b25]" />
        </button>

        <button className="flex items-center gap-3 text-[#303030]">
          <div className="relative h-10 w-10 overflow-hidden rounded-full bg-[#ffdcd2]">
            <Image src="/veda-avatar.jpg" alt="" fill className="object-cover" sizes="40px" />
          </div>
          <span className="hidden text-[16px] font-bold leading-none tracking-[-0.04em] sm:inline">
            John Doe
          </span>
          <ChevronDown size={18} />
        </button>
      </div>
    </header>
  );
}
