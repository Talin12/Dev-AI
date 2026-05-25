import Link from "next/link";
import Image from "next/image";

// Removed the 'default' keyword here to fix the import error!
export function EmptyState() {
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center px-4">
      
      <div className="w-full max-w-[486px] flex flex-col items-center text-center gap-8">
        
        {/* Graphic Placeholder */}
        <div className="w-[300px] h-[300px] relative flex items-center justify-center mb-[-16px]">
          <Image 
            src="/file.svg" 
            alt="No assignments" 
            width={120} 
            height={120} 
            className="opacity-50"
          />
        </div>

        {/* Text Block */}
        <div className="flex flex-col items-center gap-3">
          <h2 className="font-['Bricolage_Grotesque'] text-[20px] font-[700] leading-[1.4] tracking-[-0.04em] text-[var(--text-primary)]">
            No assignments yet
          </h2>
          <p className="font-['Bricolage_Grotesque'] text-[16px] font-[400] leading-[1.4] tracking-[-0.04em] text-[#666666] max-w-[486px]">
            Create your first assignment to start collecting and grading student submissions. You can set up rubrics, define marking criteria, and let AI assist with grading.
          </p>
        </div>

        <Link
          href="/assignments/create"
          className="w-[277px] h-[46px] py-[12px] px-[24px] gap-[4px] bg-[#181818] rounded-full text-[#FFFFFF] font-['Bricolage_Grotesque'] text-[16px] font-[500] tracking-[-0.04em] flex items-center justify-center border-[1.5px] border-white/20 hover:bg-black transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Create Your First Assignment
        </Link>
      </div>
    </div>
  );
}