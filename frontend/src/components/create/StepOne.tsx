"use client";

import { useGenerationStore } from "../../store/generationStore";

const labelClass =
  "block font-['Bricolage_Grotesque'] font-[600] text-[14px] text-[#303030] mb-[8px]";
const inputClass =
  "w-full h-[48px] px-[16px] rounded-[12px] border border-[#E5E5E5] bg-[#FAFAFA] focus:border-[#181818] outline-none font-['Bricolage_Grotesque'] font-[500] text-[15px] placeholder-[#A9A9A9] transition-colors";

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
        <h1 className="font-['Bricolage_Grotesque'] font-[800] text-[32px] text-[#303030] leading-tight">
          Create New Assignment
        </h1>
        <p className="font-['Bricolage_Grotesque'] text-[16px] text-[#5E5E5E8C] mt-1">
          Let's create something new.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
        <div>
          <label className={labelClass}>Assignment Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setField("title", e.target.value)}
            placeholder="e.g. Mid-term Science Quiz"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setField("subject", e.target.value)}
            placeholder="e.g. Science"
            className={inputClass}
          />
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
