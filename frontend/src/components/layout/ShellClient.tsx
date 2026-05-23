"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, PlusCircle, BookOpen, Users, Library, Settings } from "lucide-react";

const navItems = [
  { label: "Home", href: "/assignments", icon: LayoutDashboard },
  { label: "My Groups", href: "/groups", icon: Users },
  { label: "Assignments", href: "/assignments", icon: BookOpen },
  { label: "My Library", href: "/library", icon: Library },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`
        fixed md:relative z-50 md:z-auto
        h-full w-[260px]
        bg-white border-r border-[var(--border)]
        flex flex-col shrink-0
        transition-transform duration-200 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
    >
      <div className="px-5 py-5">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-lg bg-[var(--primary)] flex items-center justify-center">
            <span className="text-white font-bold text-sm">V</span>
          </div>
          <span className="text-xl font-bold text-[var(--text-primary)]">VedaAI</span>
        </div>

        <Link
          href="/assignments/create"
          onClick={onClose}
          className="flex items-center gap-2 w-full px-4 py-2.5 rounded-full bg-[var(--text-primary)] text-white text-sm font-medium hover:bg-gray-800 transition-colors mb-6"
        >
          <PlusCircle size={16} />
          Create Assignment
        </Link>

        <nav className="flex flex-col gap-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                className={`relative flex items-center gap-3 px-6 py-3.5 text-sm transition-colors ${
                  isActive
                    ? "text-[var(--primary)] font-medium"
                    : "text-[var(--text-muted)] hover:bg-gray-50 hover:text-[var(--text-primary)]"
                }`}
              >
                <Icon size={17} className={isActive ? "text-[var(--primary)]" : ""} />
                {item.label}
                {isActive && (
                  <span className="absolute right-0 top-0 bottom-0 w-1 bg-[var(--primary)] rounded-l-full" />
                )}
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