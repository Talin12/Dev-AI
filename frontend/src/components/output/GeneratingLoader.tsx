"use client";

import { useGenerationStore } from "../../store/generationStore";

export function GeneratingLoader() {
  const { progress, statusMessage } = useGenerationStore();

  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="relative w-36 h-36 mb-8">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="8"
          />
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="#111111"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-700 ease-in-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-[var(--text-primary)]">
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      <div className="text-center max-w-sm">
        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
          Generating your paper
        </h2>
        <p className="text-sm text-[var(--text-muted)] animate-pulse min-h-[20px]">
          {statusMessage || "Please wait..."}
        </p>
      </div>

      <div className="mt-8 flex items-center gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-gray-300 animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>

      <p className="mt-6 text-xs text-[var(--text-muted)] text-center max-w-xs">
        AI is analyzing your requirements and generating questions. This usually takes 15–30 seconds.
      </p>
    </div>
  );
}