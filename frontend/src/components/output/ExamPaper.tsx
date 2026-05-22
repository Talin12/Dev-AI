import type { QuestionPaper, Assignment } from "../../types";
import { PaperSection } from "./PaperSection";

interface ExamPaperProps {
  paper: QuestionPaper;
  assignment: Assignment;
}

export function ExamPaper({ paper }: ExamPaperProps) {
  const allQuestions = paper.sections.flatMap((s) => s.questions);

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-10 text-black font-serif">
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
  );
}