"use client";

import { useGenerationStore } from "../../store/generationStore";

const labelClass =
  "block font-['Bricolage_Grotesque'] font-[600] text-[14px] text-[#303030] tracking-[-0.04em] mb-[8px]";
const inputClass =
  "w-full h-[48px] rounded-[12px] bg-[#FAFAFA] border border-[#E5E5E5] pl-[16px] pr-[44px] outline-none focus:border-[#181818] transition-colors font-['Bricolage_Grotesque'] font-[500] text-[15px] placeholder-[#A9A9A9]";

export function StepOne() {
  const {
    title,
    subject,
    grade,
    topic,
    difficultyDistribution,
    setField,
    updateDifficulty,
  } = useGenerationStore();

  const diffTotal =
    difficultyDistribution.easy +
    difficultyDistribution.medium +
    difficultyDistribution.hard;

  return (
    <div className="w-full bg-[#FFFFFF] rounded-[24px] p-[40px] flex flex-col gap-[32px] shadow-[0px_16px_48px_0px_#0000000D]">
      <div>
        <h1 className="font-['Bricolage_Grotesque'] font-[800] text-[32px] tracking-[-0.04em] text-[#303030] leading-tight">
          Create New Assignment
        </h1>
        <p className="font-['Bricolage_Grotesque'] text-[16px] text-[#5E5E5E8C] tracking-[-0.04em] mt-2">
          Let's create something new.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
        <div>
          <label className={labelClass}>Assignment Title</label>
          <div className="relative w-full">
            <input
              type="text"
              value={title}
              onChange={(e) => setField("title", e.target.value)}
              placeholder="e.g. Mid-term Science Quiz"
              className={inputClass}
            />
            <button type="button" className="absolute right-[12px] top-1/2 -translate-y-1/2 text-[#A9A9A9] hover:text-[#303030] transition-colors p-[4px] flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" x2="12" y1="19" y2="22"></line>
              </svg>
            </button>
          </div>
        </div>
        <div>
          <label className={labelClass}>Subject</label>
          <div className="relative w-full">
            <input
              type="text"
              value={subject}
              onChange={(e) => setField("subject", e.target.value)}
              placeholder="e.g. Science"
              className={inputClass}
            />
            <button type="button" className="absolute right-[12px] top-1/2 -translate-y-1/2 text-[#A9A9A9] hover:text-[#303030] transition-colors p-[4px] flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" x2="12" y1="19" y2="22"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
        <div>
          <label className={labelClass}>Grade / Class</label>
          <input
            type="text"
            value={grade}
            onChange={(e) => setField("grade", e.target.value)}
            placeholder="e.g. Grade 8"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Topic</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setField("topic", e.target.value)}
            placeholder="e.g. Electromagnetism"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-[8px]">
          <label className={labelClass + " mb-0"}>Difficulty Distribution</label>
          <span
            className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
              diffTotal === 100
                ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                : "bg-red-50 text-red-500 border border-red-100"
            }`}
          >
            {diffTotal}/100
          </span>
        </div>
        {diffTotal !== 100 && (
          <p className="text-xs text-red-500 mb-3">
            Percentages must add up to exactly 100.
          </p>
        )}
        <div className="grid grid-cols-3 gap-[24px]">
          {(["easy", "medium", "hard"] as const).map((level) => (
            <div key={level}>
              <label className="block font-['Bricolage_Grotesque'] font-[600] text-[14px] text-[#5E5E5E8C] mb-[8px] capitalize">
                {level} (%)
              </label>
              <input
                type="number"
                min={0}
                max={100}
                value={difficultyDistribution[level]}
                onChange={(e) =>
                  updateDifficulty(level, parseInt(e.target.value) || 0)
                }
                className={inputClass}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
