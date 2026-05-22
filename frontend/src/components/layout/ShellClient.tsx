"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function ShellClient({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden max-w-[100vw]">
      {/* Mobile overlay backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <Sidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar onMenuToggle={() => setIsMobileMenuOpen((prev) => !prev)} />
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-[var(--bg-main)] p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}