"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Bell, ChevronDown, ArrowLeft, User, LogOut, Menu } from "lucide-react";
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

interface TopbarProps {
  onMenuToggle: () => void;
}

export function Topbar({ onMenuToggle }: TopbarProps) {
  const pathname = usePathname();
  const label = getLabel(pathname);
  const showBack = pathname !== "/assignments";

  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-[60px] bg-white border-b border-[var(--border)] flex items-center justify-between px-4 md:px-6 shrink-0">
      {/* Left: hamburger (mobile only) + back arrow + route label */}
      <div className="flex items-center gap-3">
        {/* Hamburger — mobile only */}
        <button
          onClick={onMenuToggle}
          className="md:hidden text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>

        {showBack && (
          <Link
            href="/assignments"
            className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            <ArrowLeft size={18} />
          </Link>
        )}
        <Link
          href="/"
          className="text-sm font-medium text-[var(--text-primary)] hover:opacity-80 transition-opacity"
        >
          {label}
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {/* Notification bell */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => {
              setNotifOpen((prev) => !prev);
              setProfileOpen(false);
            }}
            className="relative text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            aria-label="Notifications"
          >
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-[var(--border)] rounded-xl shadow-md py-3 px-4 z-50">
              <p className="text-xs text-[var(--text-muted)] text-center">No notifications</p>
            </div>
          )}
        </div>

        {/* Profile dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => {
              setProfileOpen((prev) => !prev);
              setNotifOpen(false);
            }}
            className="flex items-center gap-2 text-sm font-medium text-[var(--text-primary)]"
          >
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold">
              J
            </div>
            <span className="hidden sm:inline">John Doe</span>
            <ChevronDown
              size={15}
              className={`text-[var(--text-muted)] transition-transform duration-200 ${profileOpen ? "rotate-180" : ""}`}
            />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white border border-[var(--border)] rounded-xl shadow-md overflow-hidden z-50">
              <button className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-[var(--text-primary)] hover:bg-gray-50 transition-colors">
                <User size={15} className="text-[var(--text-muted)]" />
                Profile
              </button>
              <div className="border-t border-[var(--border)]" />
              <button className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors">
                <LogOut size={15} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}