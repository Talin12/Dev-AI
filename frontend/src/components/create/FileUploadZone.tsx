"use client";

import { useRef, useState } from "react";
import { Upload, X, FileText } from "lucide-react";
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
      <div className="flex items-center gap-3 px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl">
        <FileText size={20} className="text-[var(--primary)] shrink-0" />
        <span className="text-sm text-[var(--text-primary)] flex-1 truncate font-medium">
          {file.name}
        </span>
        <button
          onClick={clearFile}
          className="text-gray-400 hover:text-red-500 transition-colors"
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
        className={`relative border-2 border-dashed rounded-2xl bg-gray-50 transition-colors p-10 text-center flex flex-col items-center justify-center cursor-pointer ${
          isDragging
            ? "border-[var(--primary)] bg-orange-50"
            : "border-gray-300 hover:bg-gray-100"
        }`}
      >
        <Upload
          className={`w-12 h-12 mb-4 ${
            isDragging ? "text-[var(--primary)]" : "text-gray-400"
          }`}
        />
        <p className="text-sm font-medium text-[var(--text-primary)]">
          Choose a file or drag &amp; drop it here
        </p>
        <p className="text-xs text-[var(--text-muted)] mt-2">
          JPEG, PNG, upto 10MB
        </p>
        <button
          type="button"
          className="mt-5 px-5 py-2 text-sm border border-gray-300 rounded-lg bg-white text-[var(--text-primary)] hover:bg-gray-50 transition-colors font-medium"
        >
          Browse Files
        </button>
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