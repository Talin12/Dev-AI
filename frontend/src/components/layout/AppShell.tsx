"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="w-full max-w-[1440px] mx-auto min-h-screen p-[12px] flex gap-[11px] bg-[var(--background)]">
      <Sidebar onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col max-w-[1100px] gap-[22px]">
        <Topbar onMenuToggle={() => setSidebarOpen((p) => !p)} />
        <main className="flex flex-col gap-[12px]">
          {children}
        </main>
      </div>
    </div>
  );
}
