"use client";

import { X } from "lucide-react";
import type { QuestionTypeConfig, QuestionType } from "../../types";

const TYPE_OPTIONS: { value: QuestionType; label: string }[] = [
  { value: "mcq", label: "Multiple Choice Questions" },
  { value: "short_answer", label: "Short Questions" },
  { value: "long_answer", label: "Diagram/Graph-Based Questions" },
  { value: "true_false", label: "Numerical Problems" },
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
  return (
    <div className="flex items-center w-full">
      {/* Question type select — 443px */}
      <div className="relative shrink-0" style={{ width: 443 }}>
        <select
          value={typeData.type}
          onChange={(e) => updateType(index, "type", e.target.value)}
          className="w-full h-[44px] rounded-[22px] border border-[#E5E5E5] bg-white px-[20px] pr-[40px] font-['Bricolage_Grotesque'] font-[500] text-[15px] text-[#303030] focus:outline-none focus:border-[#181818] appearance-none cursor-pointer transition-colors"
        >
          {TYPE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute right-[16px] top-1/2 -translate-y-1/2"
          width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="#A9A9A9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>

      {/* Delete button — fills 79px gap */}
      <div className="flex items-center justify-center shrink-0" style={{ width: 79 }}>
        <button
          type="button"
          onClick={() => removeType(index)}
          disabled={!canRemove}
          className="w-[36px] h-[36px] rounded-full bg-[#F6F6F6] hover:bg-red-50 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
        >
          <X size={14} className="text-[#5E5E5E]" />
        </button>
      </div>

      {/* Count stepper pill — 100px */}
      <div className="w-[100px] h-[44px] rounded-[22px] border border-[#E5E5E5] bg-white flex items-center justify-between px-[10px] shrink-0">
        <button
          type="button"
          onClick={() => updateType(index, "count", Math.max(1, typeData.count - 1))}
          className="w-[24px] h-[24px] flex items-center justify-center text-[#A9A9A9] hover:text-[#181818] text-[18px] leading-none transition-colors"
        >
          −
        </button>
        <span className="font-['Bricolage_Grotesque'] font-[600] text-[15px] text-[#303030]">
          {typeData.count}
        </span>
        <button
          type="button"
          onClick={() => updateType(index, "count", typeData.count + 1)}
          className="w-[24px] h-[24px] flex items-center justify-center text-[#A9A9A9] hover:text-[#181818] text-[18px] leading-none transition-colors"
        >
          +
        </button>
      </div>

      {/* 24px spacer */}
      <div className="shrink-0" style={{ width: 24 }} />

      {/* Marks stepper pill — 100px */}
      <div className="w-[100px] h-[44px] rounded-[22px] border border-[#E5E5E5] bg-white flex items-center justify-between px-[10px] shrink-0">
        <button
          type="button"
          onClick={() => updateType(index, "marksPerQuestion", Math.max(1, typeData.marksPerQuestion - 1))}
          className="w-[24px] h-[24px] flex items-center justify-center text-[#A9A9A9] hover:text-[#181818] text-[18px] leading-none transition-colors"
        >
          −
        </button>
        <span className="font-['Bricolage_Grotesque'] font-[600] text-[15px] text-[#303030]">
          {typeData.marksPerQuestion}
        </span>
        <button
          type="button"
          onClick={() => updateType(index, "marksPerQuestion", typeData.marksPerQuestion + 1)}
          className="w-[24px] h-[24px] flex items-center justify-center text-[#A9A9A9] hover:text-[#181818] text-[18px] leading-none transition-colors"
        >
          +
        </button>
      </div>
    </div>
  );
}
