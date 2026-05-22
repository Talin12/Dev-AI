"use client";

import { useRef } from "react";
import { Upload, X, FileText } from "lucide-react";
import { useGenerationStore } from "../../store/generationStore";

export function FileUploadZone() {
  const { file, setField } = useGenerationStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) setField("file", selected);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) setField("file", dropped);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const clearFile = () => {
    setField("file", null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      {file ? (
        <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border border-[var(--border)] rounded-xl">
          <FileText size={18} className="text-[var(--primary)] shrink-0" />
          <span className="text-sm text-[var(--text-primary)] flex-1 truncate">
            {file.name}
          </span>
          <button
            onClick={clearFile}
            className="text-[var(--text-muted)] hover:text-red-500 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-colors"
        >
          <Upload size={28} className="mx-auto text-gray-400 mb-3" />
          <p className="text-sm font-medium text-[var(--text-primary)] mb-1">
            Choose a file or drag &amp; drop it here
          </p>
          <p className="text-xs text-[var(--text-muted)] mb-4">PDF, TXT, DOCX · up to 10MB</p>
          <button
            type="button"
            className="px-4 py-2 text-sm border border-gray-300 rounded-lg text-[var(--text-primary)] hover:bg-white transition-colors"
          >
            Browse Files
          </button>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.txt,.docx"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}