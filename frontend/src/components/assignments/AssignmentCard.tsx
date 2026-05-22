"use client";

import Link from "next/link";
import { MoreVertical, Eye, Trash2, Calendar } from "lucide-react";
import { useState } from "react";
import { downloadPDFUrl } from "../../lib/api";
import type { Assignment } from "../../types";

const statusConfig = {
  pending: { label: "Pending", className: "bg-yellow-100 text-yellow-700" },
  processing: { label: "Generating...", className: "bg-blue-100 text-blue-700" },
  completed: { label: "Completed", className: "bg-green-100 text-green-700" },
  failed: { label: "Failed", className: "bg-red-100 text-red-700" },
};

interface AssignmentCardProps {
  assignment: Assignment;
}

export function AssignmentCard({ assignment }: AssignmentCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const status = statusConfig[assignment.status];

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

  return (
    <div className="bg-white rounded-xl border border-[var(--border)] p-5 hover:shadow-md transition-shadow relative">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 pr-2">
          <h3 className="font-semibold text-[var(--text-primary)] text-base leading-snug">
            {assignment.title}
          </h3>
          <p className="text-sm text-[var(--text-muted)] mt-0.5">
            {assignment.subject} · Grade {assignment.grade}
          </p>
        </div>
        <div className="relative">
          <button
            onClick={() => setMenuOpen((p) => !p)}
            className="p-1 rounded-md text-[var(--text-muted)] hover:bg-gray-100 transition-colors"
          >
            <MoreVertical size={17} />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-7 bg-white border border-[var(--border)] rounded-xl shadow-lg z-10 py-1 min-w-[150px]">
              <Link
                href={`/assignments/${assignment.id}`}
                className="flex items-center gap-2 px-4 py-2 text-sm text-[var(--text-primary)] hover:bg-gray-50"
                onClick={() => setMenuOpen(false)}
              >
                <Eye size={15} />
                View Assignment
              </Link>
              <button className="flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-gray-50 w-full">
                <Trash2 size={15} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.className}`}>
        {status.label}
      </span>

      <div className="mt-4 pt-4 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--text-muted)]">
        <div className="flex items-center gap-1">
          <Calendar size={12} />
          <span>Assigned: {formattedDate}</span>
        </div>
        <span>Due: {dueDate}</span>
      </div>

      {assignment.status === "completed" && (
        
          href={downloadPDFUrl(assignment.id)}
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