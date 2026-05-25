"use client";

import { useRef, useState } from "react";
import { X, FileText } from "lucide-react";
import { useGenerationStore } from "../../store/generationStore";

export function FileUploadZone() {
  const { file, setField } = useGenerationStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) setField("file", selected);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) setField("file", dropped);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const clearFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setField("file", null);
    if (inputRef.current) inputRef.current.value = "";
  };

  if (file) {
    return (
      <div className="flex items-center gap-3 px-5 py-4 bg-[#FAFAFA] border border-[#E5E5E5] rounded-[16px]">
        <FileText size={20} className="text-[#303030] shrink-0" />
        <span className="font-['Bricolage_Grotesque'] font-[500] text-[15px] text-[#303030] flex-1 truncate">
          {file.name}
        </span>
        <button
          onClick={clearFile}
          className="text-[#808080] hover:text-red-500 transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    );
  }

  return (
    <>
      <div
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`w-full h-[220px] border-[2px] border-dashed rounded-[16px] bg-[#FAFAFA] flex flex-col items-center justify-center gap-[12px] cursor-pointer transition-colors ${
          isDragging
            ? "border-[#181818] bg-[#F0F0F0]"
            : "border-[#CCCCCC] hover:bg-[#F0F0F0]"
        }`}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#808080"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="16 16 12 12 8 16" />
          <line x1="12" y1="12" x2="12" y2="21" />
          <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
        </svg>

        <p className="font-['Bricolage_Grotesque'] font-[600] text-[16px] text-[#303030] tracking-[-0.04em]">
          Drag and drop or choose file to upload
        </p>

        <div className="flex flex-col items-center gap-[4px]">
          <p className="font-['Bricolage_Grotesque'] font-[500] text-[13px] text-[#808080] tracking-[-0.04em]">
            Max file size: 5MB
          </p>
          <p className="font-['Bricolage_Grotesque'] font-[500] text-[13px] text-[#808080] tracking-[-0.04em]">
            Supported formats: PDF
          </p>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.txt,.docx"
        onChange={handleFileChange}
        className="hidden"
      />
    </>
  );
}
