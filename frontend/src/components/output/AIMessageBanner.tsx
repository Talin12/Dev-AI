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
    <div className="w-full bg-[#181818CC] rounded-[32px] border-t-[4px] border-white/10 px-[32px] py-[24px] flex flex-col gap-[16px] backdrop-blur-md">
      <div className="w-full min-h-[56px] flex flex-col justify-center">
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
      </div>

      <div className="w-[200px] h-[44px] flex items-center gap-[16px]">
        <button
          onClick={handleDownload}
          className="w-[152px] h-[32px] flex items-center justify-center gap-[8px] bg-white text-black rounded-[8px] font-['Bricolage_Grotesque'] font-[600] text-[13px] hover:bg-gray-100 transition-colors"
        >
          <Download size={13} />
          Download PDF
        </button>
      </div>
    </div>
  );
}
