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
    "w-full px-4 py-2.5 rounded-lg border border-[var(--border)] text-sm text-[var(--text-primary)] bg-white focus:outline-none focus:ring-2 focus:ring-gray-300 transition-shadow";

  const labelClass = "block text-sm font-medium text-[var(--text-primary)] mb-1.5";

  return (
    <div className="space-y-5">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        <div className="flex items-center justify-between mb-3">
          <label className={labelClass + " mb-0"}>Difficulty Distribution</label>
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full ${
              diffTotal === 100
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-600"
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
              <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5 capitalize">
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