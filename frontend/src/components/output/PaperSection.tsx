import type { Section, Question, DifficultyLevel } from "../../types";

const difficultyConfig: Record<DifficultyLevel, { label: string; className: string }> = {
  easy: { label: "Easy", className: "bg-green-100 text-green-700" },
  medium: { label: "Medium", className: "bg-amber-100 text-amber-700" },
  hard: { label: "Hard", className: "bg-red-100 text-red-700" },
};

function QuestionItem({ question, index }: { question: Question; index: number }) {
  const diff = difficultyConfig[question.difficulty];

  return (
    <li className="mb-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-start gap-2 flex-wrap">
            <span className="text-sm font-medium text-gray-900 leading-relaxed">
              {index + 1}. {question.text}
            </span>
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium shrink-0 ${diff.className}`}
            >
              {diff.label}
            </span>
          </div>

          {question.options && question.options.length > 0 && (
            <div className="grid grid-cols-2 gap-x-8 gap-y-1.5 mt-3 pl-4">
              {question.options.map((opt, i) => (
                <span key={i} className="text-sm text-gray-700">
                  {opt}
                </span>
              ))}
            </div>
          )}
        </div>

        <span className="text-xs font-medium text-gray-500 shrink-0 whitespace-nowrap pt-0.5">
          [{question.marks} mark{question.marks > 1 ? "s" : ""}]
        </span>
      </div>
    </li>
  );
}

interface PaperSectionProps {
  section: Section;
}

export function PaperSection({ section }: PaperSectionProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between border-b-2 border-gray-200 pb-2 mb-3">
        <div>
          <h3 className="text-base font-bold text-gray-900">
            {section.label}: {section.title}
          </h3>
          <p className="text-xs italic text-gray-500 mt-0.5">{section.instruction}</p>
        </div>
        <span className="text-sm font-medium text-gray-600 shrink-0">
          [{section.totalMarks} Marks]
        </span>
      </div>

      <ol className="list-none">
        {section.questions.map((question, i) => (
          <QuestionItem key={question.id} question={question} index={i} />
        ))}
      </ol>
    </div>
  );
}