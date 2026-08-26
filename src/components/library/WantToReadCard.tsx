"use client";

import {WantToReadProps} from "@/src/types";

export default function WantToReadCard({
  totalCount,
  books,
  onSeeAll,
}: WantToReadProps) {
  return (
    <div className="bg-[#FAF7F2] border border-[#E8E0D5] rounded-3xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-serif font-bold text-xl text-[#1A1817]">
          Want to Read
        </h3>
        <span className="text-xs font-semibold text-[#C85A2B]">
          {totalCount} books
        </span>
      </div>

      <div className="space-y-3">
        {books.map((book) => (
          <div key={book.id} className="flex items-center gap-3">
            <div
              className={`w-10 h-14 rounded-md bg-gradient-to-b ${book.coverGradient} shrink-0 shadow-2xs border border-black/10`}
            />
            <div className="min-w-0">
              <p className="font-serif font-bold text-sm text-[#1A1817] truncate">
                {book.title}
              </p>
              <p className="text-xs text-[#736B63] truncate">{book.author}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-1 text-center">
        <button
          type="button"
          onClick={onSeeAll}
          className="text-xs font-semibold text-[#C85A2B] hover:underline"
        >
          See all {totalCount} books →
        </button>
      </div>
    </div>
  );
}