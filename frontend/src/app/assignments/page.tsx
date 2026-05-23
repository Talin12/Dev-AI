"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { useAssignmentStore } from "../../store/assignmentStore";
import { AssignmentGrid } from "../../components/assignments/AssignmentGrid";

export default function AssignmentsPage() {
  const { assignments, isLoading, fetchAssignments } = useAssignmentStore();

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-[20px] font-bold leading-[1.4] tracking-[-0.04em] text-[var(--text-primary)]">
              Assignments
            </h1>
            {assignments.length > 0 && (
              <span className="bg-[var(--primary)] text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                {assignments.length}
              </span>
            )}
          </div>
          <p className="text-sm text-[var(--text-muted)] mt-0.5">
            Manage and create assignments for your classes.
          </p>
        </div>

        <Link
          href="/assignments/create"
          className="flex items-center gap-2 px-5 py-2.5 bg-[var(--text-primary)] text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors shrink-0"
        >
          <Plus size={16} />
          Create Assignment
        </Link>
      </div>

      <div className="flex items-center justify-between mb-5 gap-4">
        <button className="flex items-center gap-2 px-4 py-2 text-sm text-[var(--text-muted)] border border-[var(--border)] rounded-full bg-white hover:bg-gray-50 transition-colors">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 3h12M3 7h8M5 11h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Filter By
        </button>

        <div className="w-full max-w-[380px] h-[44px] flex items-center gap-[10px] px-4 py-[11px] border border-[var(--border)] rounded-full bg-white">
          <Search size={15} className="text-[var(--text-muted)] shrink-0" />
          <input
            type="text"
            placeholder="Search Assignment"
            className="flex-1 text-sm bg-transparent outline-none text-[var(--text-primary)] placeholder-gray-400"
          />
        </div>
      </div>

      <AssignmentGrid assignments={assignments} isLoading={isLoading} />
    </div>
  );
}