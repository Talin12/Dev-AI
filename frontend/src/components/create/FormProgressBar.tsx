interface FormProgressBarProps {
  currentStep: 1 | 2;
}

export function FormProgressBar({ currentStep }: FormProgressBarProps) {
  const steps = [
    { number: 1, label: "Basic Details" },
    { number: 2, label: "Structure & Upload" },
  ];

  return (
    <div className="flex items-center gap-0 mb-8">
      {steps.map((step, idx) => {
        const isActive = currentStep === step.number;
        const isDone = currentStep > step.number;

        return (
          <div key={step.number} className="flex items-center flex-1">
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 transition-colors ${
                  isActive
                    ? "bg-[var(--text-primary)] text-white"
                    : isDone
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-[var(--text-muted)]"
                }`}
              >
                {isDone ? "✓" : step.number}
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-[var(--text-muted)]">Step {step.number}</span>
                <span
                  className={`text-sm font-medium ${
                    isActive ? "text-[var(--text-primary)]" : "text-[var(--text-muted)]"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-4 transition-colors ${
                  isDone ? "bg-green-400" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}