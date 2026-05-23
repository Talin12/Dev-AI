import Link from "next/link";
import Image from "next/image";

export default function EmptyState() {
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center px-4">
      
      // STRICT INNER CONTAINER: Matches Figma's max-width and gap structure.
      <div className="w-full max-w-[486px] flex flex-col items-center text-center gap-8">
        
        {/* Graphic Placeholder: Ensure you have an empty state graphic in your public folder */}
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

        {/* CTA Button with exact Figma styling and gradient border */}
        <Link 
          href="/assignments/create"
          className="flex items-center justify-center px-[24px] py-[12px] h-[46px] min-w-[277px] bg-[#181818] text-white rounded-lg hover:bg-black transition-all duration-300 ease-out font-medium text-sm"
          style={{
            border: "1.5px solid transparent",
            borderImage: "linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(102, 102, 102, 0) 100%) 1"
          }}
        >
          + Create Your First Assignment
        </Link>
      </div>
    </div>
  );
}