import Link from "next/link";
import { FileX } from "lucide-react";

export function EmptyState() {
  return (
    <div className="bg-white rounded-2xl border border-[var(--border)] flex flex-col items-center justify-center p-12 text-center min-h-[500px]">
      <FileX className="w-16 h-16 text-gray-300 mb-4" />

      <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
        No assignments yet
      </h2>

      <p className="text-sm text-[var(--text-muted)] max-w-md leading-relaxed mb-8">
        Create your first assignment to start collecting and grading student
        submissions. You can set up rubrics, define marking criteria, and let AI
        assist with grading.
      </p>

      <Link
        href="/assignments/create"
        className="bg-[var(--text-primary)] text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors inline-flex items-center gap-2 text-sm"
      >
        + Create Your First Assignment
      </Link>
    </div>
  );
}