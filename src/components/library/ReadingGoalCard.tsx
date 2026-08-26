"use client";

import {ReadingGoalProps} from "@/src/types";

export default function ReadingGoalCard({
  year,
  booksRead,
  targetBooks,
}: ReadingGoalProps) {
  const percentage = Math.round((booksRead / targetBooks) * 100);
  const remaining = targetBooks - booksRead;

  return (
    <div className="bg-[#FAF7F2] border border-[#E8E0D5] rounded-3xl p-5 space-y-3">
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
          className="h-full bg-gradient-to-r from-[#C85A2B] to-[#E07A49] rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="text-xs text-[#8C837A]">
        {percentage}% there — {remaining} books remaining
      </p>
    </div>
  );
}