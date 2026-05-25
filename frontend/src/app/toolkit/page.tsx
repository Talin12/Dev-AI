import { BookOpen } from "lucide-react";

export default function ToolkitPage() {
  return (
    <div className="w-full max-w-[1100px] mx-auto flex flex-col gap-[12px]">
      <div className="w-full h-[50px] px-[8px] flex items-center gap-[16px]">
        <div className="w-[12px] h-[12px] shrink-0 rounded-full bg-[#4BC26D] border-[4px] border-[#4BC26D66]" />
        <div className="flex flex-col justify-center">
          <h1 className="font-['Bricolage_Grotesque'] font-[700] text-[20px] leading-[1.4] tracking-[-0.04em] text-[#303030]">
            AI Teacher&apos;s Toolkit
          </h1>
          <p className="font-['Bricolage_Grotesque'] font-[400] text-[14px] leading-[1.4] tracking-[-0.04em] text-[#5E5E5E8C]">
            AI-powered tools to help you teach better.
          </p>
        </div>
      </div>

      <div className="w-full bg-white rounded-[24px] border border-[#F0F0F0] p-[48px] flex flex-col items-center justify-center gap-[12px] shadow-sm min-h-[300px]">
        <BookOpen size={36} className="text-[#D0D0D0]" strokeWidth={1.5} />
        <p className="font-['Bricolage_Grotesque'] font-[600] text-[16px] text-[#303030] tracking-[-0.04em]">
          Coming Soon
        </p>
        <p className="font-['Bricolage_Grotesque'] font-[400] text-[14px] text-[#5E5E5E8C] text-center max-w-[320px]">
          AI-powered lesson plans, rubric generators, and more tools for teachers will appear here.
        </p>
      </div>
    </div>
  );
}
