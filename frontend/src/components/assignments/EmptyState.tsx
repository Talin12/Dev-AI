import Link from "next/link";
import { Plus } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[500px] text-center px-4">
      <div className="w-48 h-48 mb-8 relative">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <circle cx="100" cy="100" r="70" fill="#f3f4f6" />
          <rect x="70" y="55" width="70" height="90" rx="6" fill="white" stroke="#e5e7eb" strokeWidth="2" />
          <rect x="80" y="70" width="50" height="4" rx="2" fill="#d1d5db" />
          <rect x="80" y="82" width="40" height="4" rx="2" fill="#d1d5db" />
          <rect x="80" y="94" width="45" height="4" rx="2" fill="#d1d5db" />
          <circle cx="120" cy="130" r="22" fill="#f3f4f6" stroke="#e5e7eb" strokeWidth="2" />
          <path d="M112 130 L118 136 L128 124" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">No assignments yet</h2>
      <p className="text-[var(--text-muted)] text-sm max-w-sm mb-8">
        Create your first assignment to start collecting and grading student submissions. Let AI assist with question generation.
      </p>

      <Link
        href="/assignments/create"
        className="flex items-center gap-2 px-6 py-3 bg-[var(--text-primary)] text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
      >
        <Plus size={16} />
        Create Your First Assignment
      </Link>
    </div>
  );
}