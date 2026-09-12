"use client";

import React from "react";
import { CurrentlyReadingProps } from "@/src/types";

export default function CurrentlyReadingCard({
  title,
  author,
  currentPage = 0,
  totalPages = 100,
  coverGradient = "from-[#C85A2B] to-[#8C4611]",
}: CurrentlyReadingProps) {
  // Safe math evaluation
  const safeCurrent = Math.max(0, currentPage ?? 0);
  const safeTotal = Math.max(1, totalPages ?? 100);
  const percentage = Math.min(
    100,
    Math.round((safeCurrent / safeTotal) * 100)
  );

  return (
    <div className="bg-[#FAF7F2] border border-[#E8E0D5] rounded-3xl p-5 space-y-4">
      <h3 className="font-serif font-bold text-xl text-[#1A1817]">
        Currently Reading
      </h3>

      <div className="flex items-center gap-4">
        <div
          className={`w-14 h-20 rounded-lg bg-linear-to-b ${coverGradient} shrink-0 shadow-xs border border-black/10`}
        />

        <div className="flex-1 min-w-0 space-y-2">
          <div>
            <h4 className="font-serif font-bold text-base text-[#1A1817] truncate">
              {title || "Untitled Book"}
            </h4>
            <p className="text-xs text-[#736B63] truncate">
              {author || "Unknown Author"}
            </p>
          </div>

          <div className="space-y-1">
            <div className="w-full h-2 bg-[#EFE8DF] rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-[#C85A2B] to-[#E07A49] rounded-full transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <p className="text-[11px] text-[#8C837A]">
              Page {safeCurrent.toLocaleString()} of {safeTotal.toLocaleString()} · {percentage}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}