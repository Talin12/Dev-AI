"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  FileText,
  FolderKanban,
  Grid2X2,
  PieChart,
  Settings,
  Sparkles,
} from "lucide-react";
import { useAssignmentStore } from "../../store/assignmentStore";

const navItems = [
  { label: "Home",               href: "/home",        icon: Grid2X2    },
  { label: "My Groups",          href: "/groups",      icon: FolderKanban },
  { label: "Assignments",        href: "/assignments", icon: FileText   },
  { label: "AI Teacher's Toolkit", href: "/toolkit",  icon: BookOpen   },
  { label: "My Library",         href: "/library",     icon: PieChart   },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();
  const { assignments } = useAssignmentStore();
  const assignmentCount = assignments.length;

  return (
    <aside className="hidden md:flex w-[304px] shrink-0 h-[calc(100vh-24px)] sticky top-[12px] flex-col justify-between bg-[#FFFFFF] rounded-[16px] p-[24px] shadow-[0px_32px_48px_0px_#00000033,0px_16px_48px_0px_#0000001F]">

      {/* ── Upper section ── */}
      <div className="flex flex-col gap-[56px]">

        {/* Logo */}
        <Link href="/home" onClick={onClose} className="flex items-center gap-[8px]">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[9px] bg-[linear-gradient(180deg,#e56820_0%,#d45e3e_100%)] shadow-[0_12px_20px_rgba(197,53,10,0.25)]">
            <span className="text-[28px] font-black leading-none text-white">V</span>
          </div>
          <span className="text-[26px] font-extrabold leading-none tracking-[-0.04em] text-[#303030]">
            VedaAI
          </span>
        </Link>

        {/* Create Assignment — gradient border via wrapper */}
        <div
          className="h-[42px] w-full rounded-[100px] p-[4px]"
          style={{
            background: "linear-gradient(180deg, #FF7950 0%, #C0350A 100%)",
            boxShadow:
              "0px 32px 48px 0px #FFFFFF33, 0px 16px 48px 0px #FFFFFF1F",
          }}
        >
          <Link
            href="/assignments/create"
            onClick={onClose}
            className="flex h-full w-full items-center justify-center gap-[10px] rounded-[100px] bg-[#272727] transition-colors hover:bg-[#1e1e1e]"
            style={{
              boxShadow:
                "0px 0px 34.5px 0px #FFFFFF40 inset, 0px -1px 3.5px 0px #B1B1B199 inset",
            }}
          >
            <Sparkles size={18} fill="currentColor" strokeWidth={1.5} className="shrink-0" />
            <span
              className="text-[16px] font-[500] leading-[28px] tracking-[-0.04em] text-white"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Create Assignment
            </span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-[8px]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.label === "Assignments"
                ? pathname === "/assignments" || pathname.startsWith("/assignments/")
                : item.label === "Home"
                ? pathname === "/home"
                : pathname === item.href;

            const isHome    = item.label === "Home";
            const isLibrary = item.label === "My Library";

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-[8px] rounded-[8px] px-[12px] font-['Bricolage_Grotesque'] text-[16px] leading-[140%] tracking-[-0.04em] transition-colors ${
                  isHome ? "h-[40px] py-[9px]" : "h-[38px] py-[8px]"
                } ${
                  isActive
                    ? "bg-[#f0f0f0] font-[500] text-[#303030]"
                    : "font-[400] text-[#5E5E5ECC] hover:bg-[#f6f6f6] hover:text-[#303030]"
                }`}
                style={
                  isLibrary
                    ? { boxShadow: "0px 0px 12.6px 0px #FFFFFF1A inset" }
                    : undefined
                }
              >
                <Icon size={20} strokeWidth={2} className="shrink-0" />
                <span className="flex-1">{item.label}</span>
                {item.label === "Assignments" && assignmentCount > 0 && (
                  <span className="ml-auto flex h-[20px] min-w-[28px] items-center justify-center rounded-full bg-[#E56845] px-[6px] font-['Bricolage_Grotesque'] text-[12px] font-[700] leading-none text-white">
                    {assignmentCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* ── Lower section ── */}
      <div className="flex flex-col gap-[8px]">

        {/* Settings */}
        <Link
          href="/settings"
          onClick={onClose}
          className="flex h-[38px] items-center gap-[8px] rounded-[8px] px-[12px] py-[8px] font-['Bricolage_Grotesque'] text-[16px] font-[400] leading-[140%] tracking-[-0.04em] text-[#5E5E5ECC] transition-colors hover:bg-[#f6f6f6] hover:text-[#303030]"
        >
          <Settings size={20} strokeWidth={2} className="shrink-0" />
          Settings
        </Link>

        {/* Profile card */}
        <div className="flex h-[80px] items-center gap-[16px] rounded-[16px] bg-[#f0f0f0] p-[12px]">
          <div className="relative h-[56px] w-[56px] shrink-0 overflow-hidden rounded-full bg-[#ffdcd2]">
            <Image
              src="/veda-avatar.jpg"
              alt="Delhi Public School"
              fill
              className="object-cover"
              sizes="56px"
            />
          </div>
          <div className="flex min-w-0 flex-col">
            <span className="truncate font-['Bricolage_Grotesque'] text-[16px] font-[700] leading-[140%] tracking-[-0.04em] text-[#303030]">
              Delhi Public School
            </span>
            <span className="font-['Bricolage_Grotesque'] text-[14px] font-[400] leading-[140%] tracking-[-0.04em] text-[#5E5E5E]">
              Bokaro Steel City
            </span>
          </div>
        </div>
      </div>

    </aside>
  );
}
