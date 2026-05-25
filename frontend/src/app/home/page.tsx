"use client";

import Link from "next/link";
import { Sparkles, FileText, CheckCircle2, Clock } from "lucide-react";
import { useEffect } from "react";
import { useAssignmentStore } from "../../store/assignmentStore";

const placeholderAssignment = {
  title: "NCERT Science — Chapter 11",
  subject: "Science",
  grade: "Grade 8",
  topic: "Force and Pressure",
  assignedOn: "01/05/2026",
  dueDate: "15/05/2026",
  totalQuestions: 25,
  totalMarks: 50,
};

export default function HomePage() {
  const { assignments, fetchAssignments } = useAssignmentStore();

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  const completed = assignments.filter((a) => a.status === "completed").length;
  const pending = assignments.filter(
    (a) => a.status === "pending" || a.status === "processing"
  ).length;

  return (
    <div className="w-full max-w-[1100px] mx-auto flex flex-col gap-[12px]">
      {/* Page header */}
      <div className="w-full h-[50px] px-[8px] flex items-center gap-[16px]">
        <div className="w-[12px] h-[12px] shrink-0 rounded-full bg-[#E56845] border-[4px] border-[#E5684566]" />
        <div className="flex flex-col justify-center">
          <h1 className="font-['Bricolage_Grotesque'] font-[700] text-[20px] leading-[1.4] tracking-[-0.04em] text-[#303030]">
            Home
          </h1>
          <p className="font-['Bricolage_Grotesque'] font-[400] text-[14px] leading-[1.4] tracking-[-0.04em] text-[#5E5E5E8C]">
            Welcome back to VedaAI.
          </p>
        </div>
      </div>

      {/* Welcome banner */}
      <div className="w-full bg-[#181818] rounded-[24px] px-[24px] md:px-[32px] py-[28px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[16px]">
        <div className="flex items-start gap-[14px]">
          <div className="flex gap-[4px] mt-1 shrink-0">
            <Sparkles size={18} className="text-white" fill="white" />
            <Sparkles size={11} className="text-white/50 mt-1" fill="currentColor" />
          </div>
          <div>
            <p className="font-['Bricolage_Grotesque'] font-[700] text-[22px] text-white leading-tight tracking-[-0.04em]">
              Delhi Public School
            </p>
            <p className="font-['Bricolage_Grotesque'] font-[400] text-[14px] text-white/60 mt-[4px]">
              Generate, manage and distribute AI-powered question papers — all in one place.
            </p>
          </div>
        </div>
        <Link
          href="/assignments/create"
          className="shrink-0 flex items-center gap-[8px] h-[44px] px-[24px] rounded-[22px] bg-[#E56845] text-white font-['Bricolage_Grotesque'] font-[600] text-[14px] hover:bg-[#d45e3e] transition-colors"
        >
          <Sparkles size={14} fill="currentColor" strokeWidth={1.5} />
          Create Assignment
        </Link>
      </div>

      {/* Stats row */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-[12px]">
        {[
          {
            label: "Total Assignments",
            value: assignments.length,
            icon: FileText,
            color: "text-[#303030]",
            bg: "bg-white",
          },
          {
            label: "Completed",
            value: completed,
            icon: CheckCircle2,
            color: "text-[#4BC26D]",
            bg: "bg-white",
          },
          {
            label: "In Progress",
            value: pending,
            icon: Clock,
            color: "text-[#E56845]",
            bg: "bg-white",
          },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div
            key={label}
            className={`${bg} rounded-[20px] px-[24px] py-[20px] flex items-center gap-[16px] border border-[#F0F0F0] shadow-sm`}
          >
            <div className={`${color} shrink-0`}>
              <Icon size={22} strokeWidth={2} />
            </div>
            <div>
              <p className="font-['Bricolage_Grotesque'] font-[800] text-[28px] leading-none tracking-[-0.04em] text-[#303030]">
                {value}
              </p>
              <p className="font-['Bricolage_Grotesque'] font-[400] text-[13px] text-[#5E5E5E8C] mt-[4px]">
                {label}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Sample assignment section */}
      <div className="w-full flex flex-col gap-[8px]">
        <p className="font-['Bricolage_Grotesque'] font-[600] text-[13px] text-[#A9A9A9] tracking-[-0.02em] px-[4px] uppercase">
          Sample Assignment
        </p>

        <div className="relative w-full bg-white border border-[#F0F0F0] rounded-[24px] p-[24px] flex flex-col justify-between gap-[16px] shadow-sm">
          {/* VedaAI badge */}
          <div className="absolute top-[20px] right-[20px] flex items-center gap-[6px] px-[10px] py-[4px] rounded-full bg-[#E56845]/10 border border-[#E56845]/20">
            <Sparkles size={11} className="text-[#E56845]" fill="currentColor" />
            <span className="font-['Bricolage_Grotesque'] font-[600] text-[11px] text-[#E56845]">
              VedaAI
            </span>
          </div>

          <div>
            <h3 className="font-['Bricolage_Grotesque'] text-[24px] font-[800] leading-[1.2] tracking-[-0.04em] text-[#303030] pr-[80px]">
              {placeholderAssignment.title}
            </h3>
            <div className="flex items-center gap-[12px] mt-[8px]">
              <span className="font-['Bricolage_Grotesque'] font-[500] text-[13px] text-[#5E5E5E8C]">
                {placeholderAssignment.subject}
              </span>
              <span className="w-[3px] h-[3px] rounded-full bg-[#D0D0D0]" />
              <span className="font-['Bricolage_Grotesque'] font-[500] text-[13px] text-[#5E5E5E8C]">
                {placeholderAssignment.grade}
              </span>
              <span className="w-[3px] h-[3px] rounded-full bg-[#D0D0D0]" />
              <span className="font-['Bricolage_Grotesque'] font-[500] text-[13px] text-[#5E5E5E8C]">
                {placeholderAssignment.topic}
              </span>
            </div>
          </div>

          <div className="w-full flex justify-between items-center">
            <div className="flex items-center gap-[20px] text-[14px] leading-[1.2] tracking-[-0.04em]">
              <div>
                <span className="font-['Bricolage_Grotesque'] font-[700] text-[#000000]">
                  Assigned on:{" "}
                </span>
                <span className="font-['Bricolage_Grotesque'] font-[400] text-[#00000080]">
                  {placeholderAssignment.assignedOn}
                </span>
              </div>
              <div>
                <span className="font-['Bricolage_Grotesque'] font-[700] text-[#000000]">
                  Due:{" "}
                </span>
                <span className="font-['Bricolage_Grotesque'] font-[400] text-[#00000080]">
                  {placeholderAssignment.dueDate}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-[8px]">
              <span className="font-['Bricolage_Grotesque'] font-[500] text-[13px] text-[#5E5E5E8C]">
                {placeholderAssignment.totalQuestions} questions · {placeholderAssignment.totalMarks} marks
              </span>
              <span className="flex items-center gap-[4px] px-[10px] py-[4px] rounded-full bg-[#4BC26D]/10 border border-[#4BC26D]/20 font-['Bricolage_Grotesque'] font-[600] text-[11px] text-[#4BC26D]">
                <CheckCircle2 size={11} strokeWidth={2.5} />
                Completed
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-[12px]">
        <Link
          href="/assignments"
          className="w-full bg-white rounded-[20px] px-[24px] py-[20px] flex items-center gap-[14px] border border-[#F0F0F0] shadow-sm hover:shadow-md transition-shadow group"
        >
          <FileText size={20} className="text-[#A9A9A9] group-hover:text-[#303030] transition-colors" strokeWidth={2} />
          <div>
            <p className="font-['Bricolage_Grotesque'] font-[700] text-[15px] text-[#303030] tracking-[-0.04em]">
              View All Assignments
            </p>
            <p className="font-['Bricolage_Grotesque'] font-[400] text-[12px] text-[#5E5E5E8C] mt-[2px]">
              Browse and manage your question papers
            </p>
          </div>
        </Link>
        <Link
          href="/assignments/create"
          className="w-full bg-white rounded-[20px] px-[24px] py-[20px] flex items-center gap-[14px] border border-[#F0F0F0] shadow-sm hover:shadow-md transition-shadow group"
        >
          <Sparkles size={20} className="text-[#A9A9A9] group-hover:text-[#E56845] transition-colors" strokeWidth={2} />
          <div>
            <p className="font-['Bricolage_Grotesque'] font-[700] text-[15px] text-[#303030] tracking-[-0.04em]">
              Create New Assignment
            </p>
            <p className="font-['Bricolage_Grotesque'] font-[400] text-[12px] text-[#5E5E5E8C] mt-[2px]">
              Generate an AI-powered question paper
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
