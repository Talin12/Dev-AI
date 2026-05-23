"use client";

import { useGenerationStore } from "../../store/generationStore";

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

  const inputClass =
    "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition-all";

  const labelClass = "text-sm font-medium text-[var(--text-primary)] mb-1.5 block";

  return (
    <div className="space-y-6">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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

      <div>
        <div className="flex items-center justify-between mb-2">
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

        <div className="grid grid-cols-3 gap-4">
          {(["easy", "medium", "hard"] as const).map((level) => (
            <div key={level}>
              <label className="text-xs font-medium text-[var(--text-muted)] mb-1.5 block capitalize">
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