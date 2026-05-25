"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Clock3, FileText, Grid2X2, Plus } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

const mobileNavItems = [
  { href: "/home",        icon: Grid2X2,  label: "Home" },
  { href: "/assignments", icon: FileText,  label: "Assignments" },
  { href: "/library",     icon: Clock3,    label: "Library" },
  { href: "/toolkit",     icon: BookOpen,  label: "AI Toolkit" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="w-full max-w-[1440px] mx-auto min-h-screen p-[12px] flex gap-[11px] bg-[var(--background)]">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 min-w-0 flex flex-col gap-[22px]">
        <Topbar onMenuToggle={() => setSidebarOpen((p) => !p)} />
        <main className="flex flex-col gap-[12px] pb-[157px] md:pb-0">
          {children}
        </main>
      </div>

      {/* Mobile bottom navigation — hidden on md+ */}
      <div className="fixed bottom-0 left-0 w-full h-[157px] bg-[#F0F0F00D] backdrop-blur-[4px] z-50 flex flex-col justify-end pb-[20px] px-[10px] md:hidden">

        {/* FAB — right-aligned above the dark bar */}
        <div className="w-full max-w-[373px] mx-auto flex justify-end mb-[13px] pr-[12px]">
          <Link
            href="/assignments/create"
            className="w-[48px] h-[48px] rounded-full bg-[#FFFFFF] shadow-[0px_32px_48px_0px_#00000033,0px_16px_48px_0px_#0000001F] flex items-center justify-center hover:bg-gray-50 transition-colors"
            aria-label="Create assignment"
          >
            <Plus size={22} className="text-[#303030]" strokeWidth={2.5} />
          </Link>
        </div>

        {/* Dark bar */}
        <div className="w-full max-w-[373px] h-[72px] mx-auto bg-[#181818] rounded-[24px] px-[24px] py-[8px] flex justify-between items-center shadow-[0px_32px_48px_0px_#00000033,0px_16px_48px_0px_#0000001F]">
          {mobileNavItems.map(({ href, icon: Icon, label }) => (
            <Link
              key={label}
              href={href}
              className="flex flex-col items-center justify-center gap-[4px] min-w-[52px] h-[52px] text-white/50 hover:text-white transition-colors"
            >
              <Icon size={20} strokeWidth={2} />
              <span className="font-['Bricolage_Grotesque'] text-[10px] font-[500] tracking-tight leading-none">
                {label}
              </span>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
