"use client";

import { useEffect } from "react";
import { Search, Sparkles } from "lucide-react";
import Link from "next/link";
import { useAssignmentStore } from "../../store/assignmentStore";
import { AssignmentGrid } from "../../components/assignments/AssignmentGrid";

export default function AssignmentsPage() {
  const { assignments, isLoading, fetchAssignments } = useAssignmentStore();

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  return (
    <div className="w-full max-w-[1100px] mx-auto flex flex-col gap-[12px]">
      <div className="w-full h-[50px] px-[8px] flex items-center gap-[16px]">
        <div className="w-[12px] h-[12px] shrink-0 rounded-full bg-[#4BC26D] border-[4px] border-[#4BC26D66] shadow-[0px_32px_48px_0px_#00000033,0px_16px_48px_0px_#0000001F]" />

        <div className="flex flex-col justify-center">
          <h1 className="font-['Bricolage_Grotesque'] font-[700] text-[20px] leading-[1.4] tracking-[-0.04em] text-[#303030]">
            Assignments
          </h1>
          <p className="font-['Bricolage_Grotesque'] font-[400] text-[14px] leading-[1.4] tracking-[-0.04em] text-[#5E5E5E8C]">
            Manage and create assignments for your classes.
          </p>
        </div>
      </div>

      <div className="w-full h-[64px] bg-[#FFFFFF] px-[16px] rounded-2xl flex items-center justify-between shadow-sm">
        <button className="flex items-center gap-[8px]">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path d="M2 3.5h12M4 8h8M6.5 12.5h3" stroke="#A9A9A9" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="font-['Bricolage_Grotesque'] font-[700] text-[14px] leading-[1.4] tracking-[-0.04em] text-[#A9A9A9]">
            Filter By
          </span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#A9A9A9"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        <div className="w-[380px] h-[44px] flex items-center gap-[12px] px-[16px] border border-gray-200 rounded-full">
          <Search className="w-[20px] h-[20px] text-[#A9A9A9] shrink-0" />
          <input
            type="text"
            placeholder="Search Assignment"
            className="bg-transparent outline-none w-full font-['Bricolage_Grotesque'] font-[700] text-[14px] leading-[1.4] tracking-[-0.04em] text-[#A9A9A9] placeholder-[#A9A9A9]"
          />
        </div>
      </div>

      <AssignmentGrid assignments={assignments} isLoading={isLoading} />

      <Link
        href="/assignments/create"
        className="fixed bottom-[24px] z-50 flex items-center gap-[8px] h-[48px] px-[24px] bg-[#181818] text-white rounded-full font-['Bricolage_Grotesque'] font-[600] text-[15px] shadow-[0_8px_32px_rgba(0,0,0,0.24)] hover:bg-[#2a2a2a] transition-colors"
        style={{ left: "calc(50% + 157px)", transform: "translateX(-50%)" }}
      >
        <Sparkles size={15} fill="currentColor" strokeWidth={1.5} />
        Create Assignment
      </Link>
    </div>
  );
}