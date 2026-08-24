"use client";

import React from "react";

export interface YourWeekProps {
  booksFinished?: number;
  pagesRead?: number;
  reviewsWritten?: number;
}

export default function YourWeekCard({
  booksFinished = 3,
  pagesRead = 842,
  reviewsWritten = 1,
}: YourWeekProps) {
  return (
    <div className="bg-[#FAF7F2] border border-[#E8E0D5] rounded-3xl p-5 space-y-4">
      <h3 className="font-serif font-bold text-xl text-[#1A1817]">
        Your Week
      </h3>

      <div className="space-y-3 text-sm">
        <div className="flex items-center justify-between pb-2 border-b border-[#EFE8DF]">
          <span className="text-[#6B5D4F]">Books finished</span>
          <span className="font-bold text-[#1A1817] text-base">
            {booksFinished}
          </span>
        </div>

        <div className="flex items-center justify-between pb-2 border-b border-[#EFE8DF]">
          <span className="text-[#6B5D4F]">Pages read</span>
          <span className="font-bold text-[#1A1817] text-base">
            {pagesRead}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[#6B5D4F]">Reviews written</span>
          <span className="font-bold text-[#1A1817] text-base">
            {reviewsWritten}
          </span>
        </div>
      </div>
    </div>
  );
}