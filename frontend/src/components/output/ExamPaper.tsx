"use client";

import { useState } from "react";
import { RefreshCw, Download } from "lucide-react";
import type { QuestionPaper, Assignment } from "../../types";
import { PaperSection } from "./PaperSection";
import { regenerateAssignment, downloadPDFUrl } from "../../lib/api";

interface ExamPaperProps {
  paper: QuestionPaper;
  assignment: Assignment;
  onRegenerate?: () => void; // parent switches view back to GeneratingLoader
}

export function ExamPaper({ paper, assignment, onRegenerate }: ExamPaperProps) {
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const allQuestions = paper.sections.flatMap((s) => s.questions);

  const assignmentId = assignment.id || (assignment as Assignment & { _id: string })._id;

  async function handleRegenerate() {
    try {
      setIsRegenerating(true);
      setError(null);
      await regenerateAssignment(assignmentId);
      // Let the parent swap to the loading view; the WebSocket will
      // drive the rest of the status updates from here.
      onRegenerate?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Regeneration failed");
      setIsRegenerating(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-4">

      {/* ── Action bar ── */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <p className="text-sm text-[var(--text-muted)]">
          {paper.sections.length} section{paper.sections.length !== 1 ? "s" : ""} ·{" "}
          {allQuestions.length} question{allQuestions.length !== 1 ? "s" : ""} ·{" "}
          {paper.totalMarks} marks
        </p>

        <div className="flex items-center gap-2">
          {error && (
            <span className="text-xs text-red-500">{error}</span>
          )}

          <button
            onClick={handleRegenerate}
            disabled={isRegenerating}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border)] bg-white text-sm font-medium text-[var(--text-primary)] hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw
              size={15}
              className={isRegenerating ? "animate-spin" : ""}
            />
            {isRegenerating ? "Regenerating…" : "Regenerate"}
          </button>

          
            href={downloadPDFUrl(assignmentId)}
            download
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--primary)] text-white text-sm font-medium hover:bg-[var(--primary-dark)] transition-colors"
          >
            <Download size={15} />
            Download PDF
          </a>
        </div>
      </div>

      {/* ── Paper ── */}
      <div className="bg-white shadow-lg rounded-2xl p-10 text-black font-serif">
        <div className="text-center border-b-2 border-gray-900 pb-5 mb-6">
          <h1 className="text-2xl font-bold tracking-wide">{paper.schoolName}</h1>
          <p className="text-base mt-1">Subject: {paper.subject}</p>
          <p className="text-sm mt-0.5">Class: {paper.grade}</p>
          <div className="flex justify-between items-center mt-4 text-sm">
            <span>Time Allowed: {paper.timeAllowed}</span>
            <span>Maximum Marks: {paper.totalMarks}</span>
          </div>
        </div>

        <p className="text-sm italic text-gray-700 mb-5">{paper.generalInstruction}</p>

        <div className="grid grid-cols-3 gap-6 mb-8 pb-4 border-b border-gray-300">
          {["Name", "Roll Number", "Section"].map((label) => (
            <div key={label}>
              <p className="text-xs text-gray-500 mb-1">{label}</p>
              <div className="border-b border-gray-400 h-6" />
            </div>
          ))}
        </div>

        {paper.sections.map((section, i) => (
          <PaperSection key={i} section={section} />
        ))}

        <p className="text-center text-sm italic text-gray-500 mt-8 mb-6">
          — End of Question Paper —
        </p>

        {paper.hasAnswerKey && allQuestions.length > 0 && (
          <div className="border-t-2 border-gray-900 pt-6 mt-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Answer Key</h3>
            <ol className="list-decimal pl-6 space-y-2">
              {allQuestions.map((q) => (
                <li key={q.id} className="text-sm text-gray-800 leading-relaxed">
                  {q.answer || "—"}
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}