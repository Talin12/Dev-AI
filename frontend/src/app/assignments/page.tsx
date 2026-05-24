"use client";

import { useEffect } from "react";
import { useAssignmentStore } from "../../store/assignmentStore";
import { AssignmentGrid } from "../../components/assignments/AssignmentGrid";

export default function AssignmentsPage() {
  const { assignments, isLoading, fetchAssignments } = useAssignmentStore();

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  return (
    <div className="h-full">
      <AssignmentGrid assignments={assignments} isLoading={isLoading} />
    </div>
  );
}
