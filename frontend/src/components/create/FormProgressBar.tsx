interface FormProgressBarProps {
  currentStep: 1 | 2;
}

export function FormProgressBar({ currentStep }: FormProgressBarProps) {
  return (
    <div className="flex flex-col gap-[8px]">
      <span className="font-['Bricolage_Grotesque'] text-[14px] font-[700] text-[#303030]">
        Step {currentStep} of 2
      </span>
      <div className="flex gap-[8px]">
        <div className={`h-[6px] rounded-full w-[120px] transition-colors ${currentStep >= 1 ? "bg-[#181818]" : "bg-[#E5E5E5]"}`} />
        <div className={`h-[6px] rounded-full w-[120px] transition-colors ${currentStep >= 2 ? "bg-[#181818]" : "bg-[#E5E5E5]"}`} />
      </div>
    </div>
  );
}
