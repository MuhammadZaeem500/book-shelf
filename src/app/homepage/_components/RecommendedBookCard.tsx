import React from "react";
import { Plus } from "lucide-react";

export interface RecommendedBookProps {
  title: string;
  author: string;
  rating: number;
  coverBg: string;
  onAdd?: () => void;
}

export default function RecommendedBookCard({
  title,
  author,
  rating,
  coverBg,
  onAdd,
}: RecommendedBookProps) {
  return (
    <div className="flex items-center justify-between p-3.5 bg-[#FAF7F2] border border-[#EFE8DF] rounded-2xl shadow-sm hover:border-[#E8DFC8] transition-all">
      <div className="flex items-center gap-3.5">
        {/* Book Cover */}
        <div
          className="w-11 h-16 rounded-xl shrink-0 shadow-sm"
          style={{ background: coverBg }}
        />

        {/* Details */}
        <div className="space-y-1">
          <h4 className="font-serif font-bold text-base text-[#1A1817] leading-snug">
            {title}
          </h4>
          <p className="text-xs text-[#6B5D4F]">{author}</p>
          
          {/* Star Rating */}
          <div className="flex items-center text-[#C85A2B] text-xs">
            {"★".repeat(rating)}
            <span className="text-[#D8CFCE]">{"★".repeat(5 - rating)}</span>
          </div>
        </div>
      </div>

      {/* Add Button */}
      <button
        onClick={onAdd}
        className="w-8 h-8 rounded-full border border-[#E0D8CE] flex items-center justify-center text-[#6B5D4F] hover:bg-[#C85A2B] hover:text-white hover:border-[#C85A2B] transition-all focus:outline-none shrink-0"
        aria-label={`Add ${title} to library`}
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}