"use client";

import { useState } from "react";
import { AssignmentCard } from "./AssignmentCard";
import { EmptyState } from "./EmptyState";
import { deleteAssignment } from "../../lib/api";
import type { Assignment } from "../../types";

interface AssignmentGridProps {
  assignments: Assignment[];
  isLoading: boolean;
}

function SkeletonCard() {
  return (
    <div className="w-full max-w-[542px] min-h-[162px] bg-white rounded-2xl border border-[var(--border)] p-5 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-3 bg-gray-100 rounded w-1/2 mb-4" />
      <div className="h-5 bg-gray-100 rounded-full w-20 mb-4" />
      <div className="border-t border-[var(--border)] pt-4 flex justify-between">
        <div className="h-3 bg-gray-100 rounded w-28" />
        <div className="h-3 bg-gray-100 rounded w-20" />
      </div>
    </div>
  );
}

export function AssignmentGrid({ assignments: initialAssignments, isLoading }: AssignmentGridProps) {
  const [assignments, setAssignments] = useState<Assignment[]>(initialAssignments);

  const handleDelete = async (id: string) => {
    try {
      await deleteAssignment(id);
      setAssignments((prev) =>
        prev.filter((a) => {
          const aId = a.id || (a as Assignment & { _id: string })._id;
          return aId !== id;
        })
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete assignment");
    }
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[12px]">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (assignments.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="w-full max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[12px]">
      {assignments.map((assignment) => (
        <AssignmentCard
          key={assignment.id || (assignment as Assignment & { _id: string })._id}
          assignment={assignment}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}