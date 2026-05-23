import Link from "next/link";
import { FileX } from "lucide-react";

export function EmptyState() {
  return (
    <div className="max-w-[1100px] min-h-[678px] flex flex-col justify-center items-center mx-auto">
      <div className="w-full max-w-[486px] flex flex-col items-center gap-[32px]">
        <div className="w-[300px] h-[300px] flex items-center justify-center">
          <FileX className="w-full h-full text-gray-200" strokeWidth={0.8} />
        </div>

        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">
            No assignments yet
          </h2>
          <p className="text-sm text-[var(--text-muted)] max-w-md leading-relaxed">
            Create your first assignment to start collecting and grading student
            submissions. You can set up rubrics, define marking criteria, and let AI
            assist with grading.
          </p>
        </div>

        <Link
          href="/assignments/create"
          className="w-[277px] h-[46px] px-[24px] py-[12px] gap-[4px] bg-[#181818] text-white rounded-lg font-medium inline-flex items-center justify-center transition-all duration-300 ease-out hover:bg-[#2a2a2a]"
          style={{
            border: "1.5px solid transparent",
            borderImage:
              "linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(102,102,102,0) 100%) 1",
          }}
        >
          + Create Your First Assignment
        </Link>
      </div>
    </div>
  );
}