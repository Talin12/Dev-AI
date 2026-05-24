"use client";

import { Download, Sparkles } from "lucide-react";
import { downloadPDFUrl } from "../../lib/api";

interface AIMessageBannerProps {
  assignmentId: string;
  assignmentTitle: string;
}

export function AIMessageBanner({ assignmentId, assignmentTitle }: AIMessageBannerProps) {
  const handleDownload = () => {
    window.open(downloadPDFUrl(assignmentId), "_blank");
  };

  return (
    <div className="bg-[#181818CC] px-[40px] py-[28px] flex items-center justify-between gap-4">
      <div className="flex items-start gap-[12px]">
        <div className="flex gap-[4px] mt-1 shrink-0">
          <Sparkles size={16} className="text-white" fill="white" />
          <Sparkles size={10} className="text-white/60 mt-1" fill="currentColor" />
        </div>
        <div>
          <p className="font-['Bricolage_Grotesque'] font-[700] text-[20px] text-white leading-tight">
            AI-Generated Question Paper
          </p>
          <p className="font-['Bricolage_Grotesque'] font-[400] text-[14px] text-white/60 mt-[4px]">
            Here is your customized question paper for{" "}
            <span className="text-white font-[500]">{assignmentTitle}</span>
          </p>
        </div>
      </div>

      <button
        onClick={handleDownload}
        className="h-[44px] px-[20px] rounded-[22px] bg-white text-[#181818] font-['Bricolage_Grotesque'] font-[600] text-[15px] flex items-center gap-[8px] hover:bg-gray-100 transition-colors shrink-0"
      >
        <Download size={15} />
        Download PDF
      </button>
    </div>
  );
}
