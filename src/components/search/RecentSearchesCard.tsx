"use client";

import { RotateCcw } from "lucide-react";
import { RecentSearchesCardProps } from "@/src/types";

export default function RecentSearchesCard({
  searches,
  onSelectSearch,
  onClearAll,
}: RecentSearchesCardProps) {
  return (
    <div className="bg-[#FAF7F2] border border-[#E8E0D5] rounded-3xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-serif font-bold text-xl text-[#1A1817]">
          Recent Searches
        </h3>
        {onClearAll && (
          <button
            onClick={onClearAll}
            className="text-xs text-[#8C837A] hover:text-[#C85A2B] transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="space-y-3">
        {searches.map((term, index) => (
          <button
            key={index}
            onClick={() => onSelectSearch?.(term)}
            className="w-full flex items-center gap-3 text-left text-sm text-[#524B45] hover:text-[#C85A2B] transition-colors group"
          >
            <RotateCcw className="w-4 h-4 text-[#8C837A] group-hover:text-[#C85A2B] shrink-0" />
            <span className="truncate">{term}</span>
          </button>
        ))}
      </div>
    </div>
  );
}