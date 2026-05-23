"use client";

import Link from "next/link";
import { MoreVertical, Eye, Trash2 } from "lucide-react";
import { useState } from "react";
import { downloadPDFUrl } from "../../lib/api";
import type { Assignment } from "../../types";

const statusConfig = {
  pending: {
    label: "Pending",
    className:
      "bg-orange-50 text-orange-600 border border-orange-100 px-3 py-1 rounded-full text-xs font-medium tracking-wide",
  },
  processing: {
    label: "Generating...",
    className:
      "bg-blue-50 text-blue-600 border border-blue-100 px-3 py-1 rounded-full text-xs font-medium tracking-wide",
  },
  completed: {
    label: "Completed",
    className:
      "bg-emerald-50 text-emerald-600 border border-emerald-100 px-3 py-1 rounded-full text-xs font-medium tracking-wide",
  },
  failed: {
    label: "Failed",
    className:
      "bg-red-50 text-red-600 border border-red-100 px-3 py-1 rounded-full text-xs font-medium tracking-wide",
  },
};

interface AssignmentCardProps {
  assignment: Assignment;
  onDelete: (id: string) => void;
}

export function AssignmentCard({ assignment, onDelete }: AssignmentCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const status = statusConfig[assignment.status];
  const assignmentId =
    assignment.id || (assignment as Assignment & { _id: string })._id;

  const formattedDate = new Date(assignment.createdAt).toLocaleDateString(
    "en-GB",
    { day: "2-digit", month: "2-digit", year: "numeric" }
  );

  const dueDateFormatted = new Date(assignment.dueDate).toLocaleDateString(
    "en-GB",
    { day: "2-digit", month: "2-digit", year: "numeric" }
  );

  const handleDelete = () => {
    setMenuOpen(false);
    const confirmed = window.confirm(
      `Are you sure you want to delete "${assignment.title}"? This cannot be undone.`
    );
    if (confirmed) onDelete(assignmentId);
  };

  return (
    <div className="w-full lg:w-[542px] min-h-[162px] flex flex-col justify-between bg-white border border-[var(--border)] rounded-2xl p-5 hover:shadow-md transition-all">
      <div className="flex items-start justify-between">
        <div className="flex-1 pr-3">
          <h3 className="text-[24px] font-[800] leading-[1.2] tracking-[-0.04em] text-[var(--text-primary)]">
            {assignment.title}
          </h3>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            {assignment.subject} · Grade {assignment.grade}
          </p>
        </div>

        <div className="relative shrink-0">
          <button
            onClick={() => setMenuOpen((p) => !p)}
            className="p-1 rounded-md text-gray-300 hover:text-[var(--text-primary)] hover:bg-gray-100 transition-colors"
          >
            <MoreVertical size={17} />
          </button>

          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setMenuOpen(false)}
              />
              <div
                className="absolute right-0 top-7 z-20 w-[140px] h-[84px] p-[8px] gap-[4px] rounded-xl flex flex-col items-center justify-center bg-white"
                style={{
                  boxShadow:
                    "0px 32px 48px 0px rgba(0,0,0,0.05), 0px 16px 48px 0px rgba(0,0,0,0.2)",
                }}
              >
                <Link
                  href={`/assignments/${assignmentId}`}
                  className="w-full flex items-center justify-center gap-2 text-sm text-[var(--text-primary)] hover:text-[var(--primary)] transition-colors py-1"
                  onClick={() => setMenuOpen(false)}
                >
                  <Eye size={14} className="text-gray-400" />
                  View Assignment
                </Link>

                <button
                  onClick={handleDelete}
                  className="w-[124px] h-[32px] bg-[#F6F6F6] rounded-[8px] px-[8px] flex items-center justify-center gap-[10px] text-sm text-red-500 hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-[var(--border)] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-[16px] leading-[1.2] tracking-[-0.04em] font-[Bricolage_Grotesque]">
            <span className="font-[800]">Assigned on : </span>
            <span className="font-[400]">{formattedDate}</span>
          </div>
          <div className="text-[16px] leading-[1.2] tracking-[-0.04em] font-[Bricolage_Grotesque]">
            <span className="font-[800]">Due : </span>
            <span className="font-[400]">{dueDateFormatted}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {assignment.status === "completed" && (
            <a
              href={downloadPDFUrl(assignmentId)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[var(--primary)] font-medium hover:underline"
            >
              Download PDF
            </a>
          )}
          <span className={`inline-flex items-center ${status.className}`}>
            {status.label}
          </span>
        </div>
      </div>
    </div>
  );
}