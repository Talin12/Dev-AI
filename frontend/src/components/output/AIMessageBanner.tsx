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
    <div className="bg-[#111111] rounded-2xl px-6 py-4 mb-6 flex items-center justify-between gap-4">
      <div className="flex items-start gap-3">
        <Sparkles size={18} className="text-yellow-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-white text-sm font-medium">AI-Generated Question Paper</p>
          <p className="text-gray-400 text-xs mt-0.5">
            Here is your customized question paper for{" "}
            <span className="text-gray-200">{assignmentTitle}</span>
          </p>
        </div>
      </div>

      <button
        onClick={handleDownload}
        className="flex items-center gap-2 px-4 py-2 bg-white text-[#111111] rounded-xl text-sm font-medium hover:bg-gray-100 transition-colors shrink-0"
      >
        <Download size={15} />
        Download as PDF
      </button>
    </div>
  );
}