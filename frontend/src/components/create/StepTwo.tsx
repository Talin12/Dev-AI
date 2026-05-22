"use client";

import { Plus } from "lucide-react";
import { useGenerationStore } from "../../store/generationStore";
import { FileUploadZone } from "./FileUploadZone";
import { QuestionTypeRow } from "./QuestionTypeRow";

export function StepTwo() {
  const {
    dueDate,
    additionalInstructions,
    questionTypes,
    setField,
    addQuestionType,
    removeQuestionType,
    updateQuestionType,
  } = useGenerationStore();

  const totalQuestions = questionTypes.reduce((sum, qt) => sum + qt.count, 0);
  const totalMarks = questionTypes.reduce(
    (sum, qt) => sum + qt.count * qt.marksPerQuestion,
    0
  );

  const labelClass = "block text-sm font-medium text-[var(--text-primary)] mb-1.5";

  return (
    <div className="space-y-6">
      <div>
        <label className={labelClass}>Upload Reference Material (Optional)</label>
        <FileUploadZone />
        <p className="text-xs text-[var(--text-muted)] mt-2">
          Upload images of your preferred document or notes
        </p>
      </div>

      <div>
        <label className={labelClass}>Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setField("dueDate", e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg border border-[var(--border)] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <label className={labelClass + " mb-0"}>Question Type</label>
          </div>
          <div className="flex items-center gap-6 text-xs text-[var(--text-muted)] font-medium">
            <span>No. of Questions</span>
            <span>Marks each</span>
            <span className="w-7" />
          </div>
        </div>

        <div className="space-y-3">
          {questionTypes.map((qt, index) => (
            <QuestionTypeRow
              key={index}
              index={index}
              typeData={qt}
              updateType={updateQuestionType}
              removeType={removeQuestionType}
              canRemove={questionTypes.length > 1}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={addQuestionType}
          className="flex items-center gap-2 mt-4 text-sm font-medium text-[var(--text-primary)] hover:text-gray-600 transition-colors"
        >
          <div className="w-6 h-6 rounded-full bg-[var(--text-primary)] flex items-center justify-center">
            <Plus size={14} className="text-white" />
          </div>
          Add Question Type
        </button>

        <div className="mt-4 text-right text-sm text-[var(--text-muted)] space-y-0.5">
          <p>
            Total Questions:{" "}
            <span className="font-semibold text-[var(--text-primary)]">{totalQuestions}</span>
          </p>
          <p>
            Total Marks:{" "}
            <span className="font-semibold text-[var(--text-primary)]">{totalMarks}</span>
          </p>
        </div>
      </div>

      <div>
        <label className={labelClass}>Additional Information (For better output)</label>
        <textarea
          value={additionalInstructions}
          onChange={(e) => setField("additionalInstructions", e.target.value)}
          placeholder="e.g. Generate a question paper for a 3 hour exam duration..."
          rows={4}
          className="w-full px-4 py-3 rounded-lg border border-[var(--border)] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-300 resize-none"
        />
      </div>
    </div>
  );
}