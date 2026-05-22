"use client";

import { usePathname } from "next/navigation";
import { Bell, ChevronDown, ArrowLeft } from "lucide-react";
import Link from "next/link";

const routeLabels: Record<string, string> = {
  "/assignments": "Assignment",
  "/assignments/create": "Create Assignment",
};

function getLabel(pathname: string): string {
  if (routeLabels[pathname]) return routeLabels[pathname];
  if (pathname.includes("/assignments/") && pathname.includes("/")) return "Assignment";
  return "VedaAI";
}

export function Topbar() {
  const pathname = usePathname();
  const label = getLabel(pathname);
  const showBack = pathname !== "/assignments";

  return (
    <header className="h-[60px] bg-white border-b border-[var(--border)] flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-3">
        {showBack && (
          <Link href="/assignments" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
            <ArrowLeft size={18} />
          </Link>
        )}
        <span className="text-sm font-medium text-[var(--text-primary)]">{label}</span>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <button className="flex items-center gap-2 text-sm font-medium text-[var(--text-primary)]">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold">
            J
          </div>
          John Doe
          <ChevronDown size={15} className="text-[var(--text-muted)]" />
        </button>
      </div>
    </header>
  );
}