"use client";

import React, { useState } from "react";
import Image from "next/image";
import { fetchApi } from "@/src/app/lib/api";
import { DynamicContinueReadingProps } from "@/src/types";

export default function ContinueReadingCard({
  bookId,
  title,
  author,
  description,
  currentPage = 0,
  totalPages = 100,
  coverImage,
  onProgressUpdated,
}: DynamicContinueReadingProps) {
  const [pages, setPages] = useState(currentPage);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [inputVal, setInputVal] = useState(String(currentPage));
  const [isDetailsOpen, setIsDetailsOpen] = useState(false); // 👈 Local modal state

  const safeCurrent = Math.max(0, pages ?? 0);
  const safeTotal = Math.max(1, totalPages ?? 100);
  const percentage = Math.min(100, Math.round((safeCurrent / safeTotal) * 100));

  const handleUpdatePages = async (newPages: number) => {
    if (!bookId) return;
    const clampedPages = Math.min(safeTotal, Math.max(0, newPages));

    try {
      setIsUpdating(true);
      await fetchApi(`/users/me/books/${bookId}/status`, {
        method: "PATCH",
        body: JSON.stringify({
          status: clampedPages >= safeTotal ? "READ" : "READING",
          pagesRead: clampedPages,
        }),
      });
      setPages(clampedPages);
      setShowInput(false);
      if (onProgressUpdated) onProgressUpdated();
    } catch (err) {
      console.error("Failed to update progress:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      <div className="w-full max-w-4xl font-sans">
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-[#2A160A] via-[#3B1F0E] to-[#4D2710] p-6 text-[#E6D7CB] shadow-xl">
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            {/* Cover Image / Placeholder Box */}
            <div className="relative shrink-0 w-36 h-52 rounded-xl overflow-hidden shadow-2xl bg-linear-to-b from-[#D4823A] to-[#6E3C14] border border-white/10 p-3 flex flex-col justify-between">
              {coverImage ? (
                <Image
                  src={coverImage}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 150px"
                />
              ) : (
                <>
                  <span className="text-[10px] tracking-widest uppercase font-semibold text-white/60">
                    BOOKSHELF
                  </span>
                  <div>
                    <h4 className="text-sm font-serif font-bold text-white leading-tight">
                      {title}
                    </h4>
                    <p className="text-[10px] text-white/70 mt-0.5">{author}</p>
                  </div>
                </>
              )}
            </div>

            {/* Book Info & Dynamic Controls */}
            <div className="flex-1 flex flex-col justify-between w-full space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold tracking-widest uppercase text-[#C86D31]">
                    CURRENTLY READING
                  </span>
                  {bookId && (
                    <button
                      onClick={() => setShowInput(!showInput)}
                      className="text-xs font-medium text-[#E0A86A] hover:underline cursor-pointer"
                    >
                      {showInput ? "Cancel" : "Update Page"}
                    </button>
                  )}
                </div>

                <h1 className="text-3xl font-serif font-bold text-white mt-1">
                  {title || "Untitled Book"}
                </h1>
                <p className="text-sm text-[#B89F8D] font-medium mt-1">
                  {author || "Unknown Author"}
                </p>
                <p className="text-sm text-[#8C7463] mt-2 line-clamp-2">
                  {description || "Keep up your reading momentum!"}
                </p>
              </div>

              {/* Progress Section */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-[#8C7463]">
                    Page {safeCurrent.toLocaleString()} of{" "}
                    {safeTotal.toLocaleString()}
                  </span>
                  <span className="text-sm font-bold text-[#E0A86A]">
                    {percentage}%
                  </span>
                </div>

                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-[#D4823A] to-[#E0A86A] transition-all duration-300 rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                {showInput ? (
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="number"
                      value={inputVal}
                      onChange={(e) => setInputVal(e.target.value)}
                      className="w-24 px-3 py-1.5 bg-black/30 border border-white/20 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#E0A86A]"
                      placeholder="Page #"
                    />
                    <button
                      disabled={isUpdating}
                      onClick={() => handleUpdatePages(parseInt(inputVal) || 0)}
                      className="px-4 py-1.5 bg-[#C86D31] text-white text-xs font-semibold rounded-xl hover:opacity-90 disabled:opacity-50 cursor-pointer"
                    >
                      {isUpdating ? "Saving..." : "Save Page"}
                    </button>
                  </div>
                ) : null}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                {bookId && !showInput && (
                  <button
                    onClick={() => handleUpdatePages(safeCurrent + 10)}
                    disabled={isUpdating}
                    className="flex-1 py-2.5 px-5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    Read +10 Pages &rarr;
                  </button>
                )}
                {/* 🔍 Details Button opens modal locally */}
                <button
                  onClick={() => setIsDetailsOpen(true)}
                  className="py-2.5 px-6 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors cursor-pointer"
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 📖 Book Details Modal */}
      {isDetailsOpen && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-6 text-gray-900 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h3 className="font-serif font-bold text-2xl text-[#1A1817]">
                Book Details
              </h3>
              <button
                onClick={() => setIsDetailsOpen(false)}
                className="text-gray-400 hover:text-gray-600 font-bold text-lg cursor-pointer p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <h4 className="font-serif font-bold text-lg text-[#1A1817]">
                {title || "Untitled Book"}
              </h4>
              <p className="text-xs text-gray-500 font-medium">By {author || "Unknown Author"}</p>
              <p className="text-xs text-[#C86D31] font-semibold">
                Current Progress: Page {safeCurrent} of {safeTotal} ({percentage}%)
              </p>
            </div>

            <div className="space-y-1">
              <h5 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Description
              </h5>
              <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-2xl max-h-48 overflow-y-auto">
                {description || "No description provided for this book."}
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setIsDetailsOpen(false)}
                className="px-5 py-2.5 bg-[#C86D31] text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}