"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, PlusCircle, BookOpen, Users, Library, Settings, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "/", icon: LayoutDashboard, exact: true },
  { label: "My Groups", href: "/groups", icon: Users, exact: false },
  { label: "Assignments", href: "/assignments", icon: BookOpen, exact: false },
  { label: "My Library", href: "/library", icon: Library, exact: false },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  function isActive(href: string, exact: boolean): boolean {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-50 w-[260px] bg-white border-r border-[var(--border)]
        flex flex-col shrink-0 transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:relative md:translate-x-0 md:z-auto
      `}
    >
      <div className="px-5 py-5">
        {/* Logo row — X button visible on mobile only */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--primary)] flex items-center justify-center">
              <span className="text-white font-bold text-sm">V</span>
            </div>
            <span className="text-xl font-bold text-[var(--text-primary)]">VedaAI</span>
          </div>
          {/* Close button — mobile only */}
          <button
            onClick={onClose}
            className="md:hidden text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <Link
          href="/assignments/create"
          onClick={onClose}
          className="flex items-center gap-2 w-full px-4 py-2.5 rounded-full bg-[var(--text-primary)] text-white text-sm font-medium hover:bg-gray-800 transition-colors mb-6"
        >
          <PlusCircle size={16} />
          Create Assignment
        </Link>

        <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--text-muted)] px-3 mb-2">
          AI Teacher's Toolkit
        </p>

        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href, item.exact);
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  active
                    ? "bg-gray-100 text-[var(--text-primary)] font-medium"
                    : "text-[var(--text-muted)] hover:bg-gray-50 hover:text-[var(--text-primary)]"
                }`}
              >
                <Icon size={17} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto px-5 py-4 border-t border-[var(--border)]">
        <Link
          href="/settings"
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[var(--text-muted)] hover:bg-gray-50 hover:text-[var(--text-primary)] transition-colors"
        >
          <Settings size={17} />
          Settings
        </Link>
        <div className="flex items-center gap-3 mt-2 p-3 bg-gray-50 rounded-xl">
          <div className="w-9 h-9 rounded-full bg-orange-200 flex items-center justify-center text-sm font-semibold text-orange-700">
            D
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-[var(--text-primary)]">Delhi Public School</span>
            <span className="text-xs text-[var(--text-muted)]">Bokaro Steel City</span>
          </div>
        </div>
      </div>
    </aside>
  );
}