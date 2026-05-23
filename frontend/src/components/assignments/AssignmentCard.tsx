"use client";

import Link from "next/link";
import { MoreVertical, Eye, Trash2, Calendar } from "lucide-react";
import { useState } from "react";
import { downloadPDFUrl } from "../../lib/api";
import type { Assignment } from "../../types";

const statusConfig = {
  pending: {
    label: "Pending",
    className: "bg-orange-50 text-orange-600 border border-orange-100 px-3 py-1 rounded-full text-xs font-medium tracking-wide",
  },
  processing: {
    label: "Generating...",
    className: "bg-blue-50 text-blue-600 border border-blue-100 px-3 py-1 rounded-full text-xs font-medium tracking-wide",
  },
  completed: {
    label: "Completed",
    className: "bg-emerald-50 text-emerald-600 border border-emerald-100 px-3 py-1 rounded-full text-xs font-medium tracking-wide",
  },
  failed: {
    label: "Failed",
    className: "bg-red-50 text-red-600 border border-red-100 px-3 py-1 rounded-full text-xs font-medium tracking-wide",
  },
};

interface AssignmentCardProps {
  assignment: Assignment;
  onDelete: (id: string) => void;
}

export function AssignmentCard({ assignment, onDelete }: AssignmentCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const status = statusConfig[assignment.status];
  const assignmentId = assignment.id || (assignment as Assignment & { _id: string })._id;

  const formattedDate = new Date(assignment.createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const dueDate = new Date(assignment.dueDate).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const handleDelete = () => {
    setMenuOpen(false);
    const confirmed = window.confirm(
      `Are you sure you want to delete "${assignment.title}"? This cannot be undone.`
    );
    if (confirmed) onDelete(assignmentId);
  };

  return (
    <div className="bg-white border border-[var(--border)] rounded-2xl shadow-sm hover:shadow-md transition-all p-5 relative">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 pr-2">
          <h3 className="text-lg font-semibold text-[var(--text-primary)] leading-tight">
            {assignment.title}
          </h3>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            {assignment.subject} · Grade {assignment.grade}
          </p>
        </div>
        <div className="relative">
          <button
            onClick={() => setMenuOpen((p) => !p)}
            className="p-1 rounded-md text-gray-300 hover:text-[var(--text-primary)] hover:bg-gray-100 transition-colors"
          >
            <MoreVertical size={17} />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-7 bg-white border border-[var(--border)] rounded-xl shadow-lg z-10 py-1 min-w-[150px]">
              <Link
                href={`/assignments/${assignmentId}`}
                className="flex items-center gap-2 px-4 py-2 text-sm text-[var(--text-primary)] hover:bg-gray-50"
                onClick={() => setMenuOpen(false)}
              >
                <Eye size={14} className="text-gray-400" />
                View Assignment
              </Link>
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-gray-50 w-full"
              >
                <Trash2 size={14} className="text-gray-300 hover:text-red-500 transition-colors" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <span className={`inline-flex items-center ${status.className}`}>
        {status.label}
      </span>

      <div className="mt-4 pt-4 border-t border-[var(--border)] flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
          <Calendar size={12} />
          <span>Assigned on : {formattedDate}</span>
        </div>
        <span className="text-xs text-[var(--text-muted)]">Due : {dueDate}</span>
      </div>

      {assignment.status === "completed" && (
        
          href={downloadPDFUrl(assignmentId)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 block w-full text-center text-xs text-[var(--primary)] font-medium hover:underline"
        >
          Download PDF
        </a>
      )}
    </div>
  );
}