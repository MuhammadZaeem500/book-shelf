"use client";

import { ReadingGoalProps } from "@/src/types";

export default function ReadingGoalCard({
  year,
  booksRead,
  targetBooks,
}: ReadingGoalProps) {
  // Prevent division by zero if targetBooks is 0
  const safeTarget = targetBooks > 0 ? targetBooks : 1;
  const percentage = Math.min(Math.round((booksRead / safeTarget) * 100), 100);
  const remaining = Math.max(targetBooks - booksRead, 0);

  return (
    <div className="bg-[#FAF7F2] border border-[#E8E0D5] rounded-3xl p-5 space-y-3 shadow-xs">
      <h3 className="font-serif font-bold text-xl text-[#1A1817]">
        {year} Reading Goal
      </h3>

      <div className="flex items-center justify-between">
        <span className="text-xs text-[#736B63]">Books read</span>
        <span className="font-bold text-[#C85A2B] text-base">
          {booksRead} / {targetBooks}
        </span>
      </div>

      <div className="w-full h-2.5 bg-[#EFE8DF] rounded-full overflow-hidden">
        <div
          className="h-full bg-linear-to-r from-[#C85A2B] to-[#E07A49] rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="text-xs text-[#8C837A]">
        {percentage}% there — {remaining} {remaining === 1 ? "book" : "books"} remaining
      </p>
    </div>
  );
}