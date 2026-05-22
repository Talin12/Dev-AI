"use client";

import { Trash2 } from "lucide-react";
import type { QuestionTypeConfig, QuestionType } from "../../types";

const TYPE_OPTIONS: { value: QuestionType; label: string }[] = [
  { value: "mcq", label: "Multiple Choice Questions" },
  { value: "short_answer", label: "Short Questions" },
  { value: "long_answer", label: "Long Answer Questions" },
  { value: "true_false", label: "True / False" },
  { value: "fill_in_blank", label: "Fill in the Blank" },
];

interface QuestionTypeRowProps {
  index: number;
  typeData: QuestionTypeConfig;
  updateType: (index: number, field: keyof QuestionTypeConfig, value: string | number) => void;
  removeType: (index: number) => void;
  canRemove: boolean;
}

export function QuestionTypeRow({
  index,
  typeData,
  updateType,
  removeType,
  canRemove,
}: QuestionTypeRowProps) {
  const inputClass =
    "w-full px-3 py-2 rounded-lg border border-[var(--border)] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-300";

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1">
        <select
          value={typeData.type}
          onChange={(e) => updateType(index, "type", e.target.value)}
          className={inputClass}
        >
          {TYPE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={() =>
            updateType(index, "count", Math.max(1, typeData.count - 1))
          }
          className="w-7 h-7 rounded-full border border-[var(--border)] flex items-center justify-center text-sm hover:bg-gray-100"
        >
          −
        </button>
        <span className="w-8 text-center text-sm font-medium">{typeData.count}</span>
        <button
          type="button"
          onClick={() => updateType(index, "count", typeData.count + 1)}
          className="w-7 h-7 rounded-full border border-[var(--border)] flex items-center justify-center text-sm hover:bg-gray-100"
        >
          +
        </button>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={() =>
            updateType(index, "marksPerQuestion", Math.max(1, typeData.marksPerQuestion - 1))
          }
          className="w-7 h-7 rounded-full border border-[var(--border)] flex items-center justify-center text-sm hover:bg-gray-100"
        >
          −
        </button>
        <span className="w-8 text-center text-sm font-medium">{typeData.marksPerQuestion}</span>
        <button
          type="button"
          onClick={() =>
            updateType(index, "marksPerQuestion", typeData.marksPerQuestion + 1)
          }
          className="w-7 h-7 rounded-full border border-[var(--border)] flex items-center justify-center text-sm hover:bg-gray-100"
        >
          +
        </button>
      </div>

      <button
        type="button"
        onClick={() => removeType(index)}
        disabled={!canRemove}
        className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shrink-0"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}