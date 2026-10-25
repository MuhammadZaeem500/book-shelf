"use client";

import React, { useState, useEffect } from "react";
import { fetchApi } from "@/src/app/lib/api";

interface CurrentlyReadingCardProps {
  bookId: string;
  title: string;
  author: string;
  currentPage: number;
  totalPages: number;
  coverGradient?: string;
  onProgressUpdated?: () => void;
}

export default function CurrentlyReadingCard({
  bookId,
  title,
  author,
  currentPage = 0,
  totalPages = 100,
  coverGradient = "from-[#C85A2B] to-[#8C4611]",
  onProgressUpdated,
}: CurrentlyReadingCardProps) {
  const [loading, setLoading] = useState(false);
  const [displayPages, setDisplayPages] = useState(currentPage);

  useEffect(() => {
    setDisplayPages(currentPage);
  }, [currentPage]);

  const safeTotal = Math.max(1, totalPages ?? 100);
  const percentage = Math.min(
    100,
    Math.round((displayPages / safeTotal) * 100),
  );

  const handleAddPages = async (amount: number) => {
    const newPages = Math.min(safeTotal, displayPages + amount);
    setDisplayPages(newPages); // ⚡ Instant local UI update

    try {
      setLoading(true);
      await fetchApi(`/users/me/books/${bookId}/progress`, {
        method: "PATCH",
        body: JSON.stringify({ pagesRead: newPages }),
      });
      if (onProgressUpdated) {
        onProgressUpdated();
      }
    } catch (err) {
      console.error("Failed to update progress:", err);
      setDisplayPages(currentPage); // Revert if network fails
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FAF7F2] border border-[#E8E0D5] rounded-3xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-serif font-bold text-xl text-[#1A1817]">
          Currently Reading
        </h3>
        <div className="flex gap-2">
          <button
            disabled={loading}
            onClick={() => handleAddPages(10)}
            className="px-2.5 py-1 bg-white border border-[#E0D8CE] text-xs font-semibold text-[#C85A2B] rounded-lg hover:bg-[#C85A2B] hover:text-white transition-colors cursor-pointer disabled:opacity-50"
          >
            +10 Pages
          </button>
        </div>
      </div>

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
              Page {displayPages.toLocaleString()} of{" "}
              {safeTotal.toLocaleString()} · {percentage}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
