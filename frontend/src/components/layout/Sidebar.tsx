"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Clock3,
  FileText,
  FolderKanban,
  Grid2X2,
  Settings,
  Sparkles,
} from "lucide-react";
import { useAssignmentStore } from "../../store/assignmentStore";

const navItems = [
  { label: "Home", href: "/assignments", icon: Grid2X2 },
  { label: "My Groups", href: "/groups", icon: FolderKanban },
  { label: "Assignments", href: "/assignments", icon: FileText },
  { label: "AI Teacher's Toolkit", href: "/library", icon: BookOpen },
  { label: "My Library", href: "/library", icon: Clock3 },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { assignments } = useAssignmentStore();
  const assignmentCount = assignments.length;

  return (
    <aside className="w-[304px] h-[calc(100vh-24px)] sticky top-[12px] shrink-0 bg-[#FFFFFF] rounded-[16px] p-[24px] flex flex-col justify-between shadow-[0px_32px_48px_0px_#00000033,0px_16px_48px_0px_#0000001F]">
        <Link href="/assignments" onClick={onClose} className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-[9px] bg-[linear-gradient(180deg,#e56820_0%,#d45e3e_100%)] shadow-[0_12px_20px_rgba(197,53,10,0.25)]">
            <span className="text-[28px] font-black leading-none text-white">V</span>
          </div>
          <span className="text-[26px] font-extrabold leading-none tracking-[-0.04em] text-[#303030]">
            VedaAI
          </span>
        </Link>

        <Link
          href="/assignments/create"
          onClick={onClose}
          className="mt-[58px] flex h-[48px] w-full items-center justify-center gap-2 rounded-[24px] border-[3px] border-[#e56845] bg-[#303030] px-5 text-[16px] font-medium leading-none text-white shadow-[0_24px_36px_rgba(255,255,255,0.16),inset_0_0_18px_rgba(255,255,255,0.20)] transition-colors hover:bg-[#242424]"
        >
          <Sparkles size={17} fill="currentColor" strokeWidth={1.8} />
          Create Assignment
        </Link>

        <nav className="mt-[58px] flex flex-col gap-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.label === "Assignments"
                ? pathname === "/assignments" || pathname.startsWith("/assignments/")
                : pathname === item.href && item.label !== "Home";

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                className={`flex h-[38px] items-center gap-3 rounded-[7px] px-3 text-[16px] font-medium tracking-[-0.04em] transition-colors ${
                  isActive
                    ? "bg-[#f0f0f0] text-[#303030]"
                    : "text-[#7e7e7e] hover:bg-[#f6f6f6] hover:text-[#303030]"
                }`}
              >
                <Icon size={20} strokeWidth={2} />
                <span className="flex-1">{item.label}</span>
                {item.label === "Assignments" && assignmentCount > 0 && (
                  <span className="ml-auto h-[20px] min-w-[28px] px-[6px] rounded-full bg-[#E56845] text-white font-['Bricolage_Grotesque'] font-[700] text-[12px] flex items-center justify-center leading-none">
                    {assignmentCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto">
          <Link
            href="/settings"
            onClick={onClose}
            className="flex h-[38px] items-center gap-3 rounded-[7px] px-3 text-[16px] font-medium tracking-[-0.04em] text-[#7e7e7e] transition-colors hover:bg-[#f6f6f6] hover:text-[#303030]"
          >
            <Settings size={18} />
            Settings
          </Link>

          <div className="mt-[22px] flex h-20 items-center gap-3 rounded-[14px] bg-[#f0f0f0] px-3">
            <div className="relative h-14 w-14 overflow-hidden rounded-full bg-[#ffdcd2]">
              <Image src="/veda-avatar.jpg" alt="" fill className="object-cover" sizes="56px" />
            </div>
            <div className="min-w-0">
              <div className="truncate text-[16px] font-bold leading-[1.4] tracking-[-0.04em] text-[#303030]">
                Delhi Public School
              </div>
              <div className="text-[14px] font-medium leading-[1.4] tracking-[-0.04em] text-[#595959]">
                Bokaro Steel City
              </div>
            </div>
          </div>
        </div>
    </aside>
  );
}
