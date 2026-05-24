"use client";

import Link from "next/link";
import { MoreVertical } from "lucide-react";
import { useState } from "react";
import type { Assignment } from "../../types";

interface AssignmentCardProps {
  assignment: Assignment;
  onDelete: (id: string) => void;
}

export function AssignmentCard({ assignment, onDelete }: AssignmentCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
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
    <div className="relative w-full max-w-[542px] h-[162px] p-[24px] bg-white border border-[var(--border)] rounded-2xl flex flex-col justify-between transition-all hover:shadow-md">
      <div className="w-full flex justify-between items-start">
        <h3 className="font-['Bricolage_Grotesque'] text-[24px] font-[800] leading-[1.2] tracking-[-0.04em] text-[#303030] line-clamp-1 flex-1 pr-3">
          {assignment.title}
        </h3>

        <div className="relative shrink-0">
          <button
            onClick={() => setMenuOpen((p) => !p)}
            className="w-[24px] h-[24px] flex items-center justify-center text-gray-400 hover:text-[#303030] transition-colors"
          >
            <MoreVertical size={17} />
          </button>

          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setMenuOpen(false)}
              />
              <div className="absolute right-0 top-7 z-20 w-[140px] h-[84px] p-[8px] gap-[4px] bg-[#FFFFFF] rounded-[12px] flex flex-col shadow-[0px_32px_48px_0px_#0000000D,0px_16px_48px_0px_#00000033]">
                <Link
                  href={`/assignments/${assignmentId}`}
                  onClick={() => setMenuOpen(false)}
                  className="w-[124px] h-[32px] px-[8px] flex items-center bg-transparent rounded-[8px] font-['Bricolage_Grotesque'] text-[14px] font-[500] leading-[1.4] tracking-[-0.04em] text-[#303030] hover:bg-gray-50 transition-colors"
                >
                  View Assignment
                </Link>
                <button
                  onClick={handleDelete}
                  className="w-[124px] h-[32px] px-[8px] flex items-center bg-[#F6F6F6] rounded-[8px] font-['Bricolage_Grotesque'] text-[14px] font-[500] leading-[1.4] tracking-[-0.04em] text-[#C53535] hover:bg-red-50 transition-colors"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="w-full flex justify-between items-center">
        <div className="text-[16px] leading-[1.2] tracking-[-0.04em] text-[#00000080]">
          <span className="font-['Bricolage_Grotesque'] font-[800]">Assigned on : </span>
          <span className="font-['Bricolage_Grotesque'] font-[400]">{formattedDate}</span>
        </div>
        <div className="text-[16px] leading-[1.2] tracking-[-0.04em] text-[#00000080]">
          <span className="font-['Bricolage_Grotesque'] font-[800]">Due : </span>
          <span className="font-['Bricolage_Grotesque'] font-[400]">{dueDateFormatted}</span>
        </div>
      </div>
    </div>
  );
}