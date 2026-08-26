"use client";

import { CurrentlyReadingProps } from "@/src/types";

export default function CurrentlyReadingCard({
  title,
  author,
  currentPage,
  totalPages,
  coverGradient,
}: CurrentlyReadingProps) {
  const percentage = Math.round((currentPage / totalPages) * 100);

  return (
    <div className="bg-[#FAF7F2] border border-[#E8E0D5] rounded-3xl p-5 space-y-4">
      <h3 className="font-serif font-bold text-xl text-[#1A1817]">
        Currently Reading
      </h3>

      <div className="flex items-center gap-4">
        <div
          className={`w-14 h-20 rounded-lg bg-gradient-to-b ${coverGradient} shrink-0 shadow-xs border border-black/10`}
        />

        <div className="flex-1 min-w-0 space-y-2">
          <div>
            <h4 className="font-serif font-bold text-base text-[#1A1817] truncate">
              {title}
            </h4>
            <p className="text-xs text-[#736B63] truncate">{author}</p>
          </div>

          <div className="space-y-1">
            <div className="w-full h-2 bg-[#EFE8DF] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#C85A2B] to-[#E07A49] rounded-full transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <p className="text-[11px] text-[#8C837A]">
              Page {currentPage} of {totalPages} · {percentage}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
