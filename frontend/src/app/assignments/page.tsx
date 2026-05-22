"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useAssignmentStore } from "../../store/assignmentStore";
import { AssignmentGrid } from "../../components/assignments/AssignmentGrid";

export default function AssignmentsPage() {
  const { assignments, isLoading, fetchAssignments } = useAssignmentStore();

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-[var(--text-primary)]">Assignments</h1>
          <p className="text-sm text-[var(--text-muted)] mt-0.5">
            Manage and create assignments for your classes.
          </p>
        </div>
        <Link
          href="/assignments/create"
          className="flex items-center gap-2 px-5 py-2.5 bg-[var(--text-primary)] text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          <Plus size={16} />
          Create Assignment
        </Link>
      </div>

      <AssignmentGrid assignments={assignments} isLoading={isLoading} />
    </div>
  );
}