"use client";

import React, { useState, useEffect } from "react";
import { fetchApi } from "@/src/app/lib/api";

export interface YourWeekProps {
  booksFinished?: number;
  pagesRead?: number;
  reviewsWritten?: number;
}

export default function YourWeekCard(props: YourWeekProps) {
  // Fix TS2345: Allow 'YourWeekProps | null' in state
  const [stats, setStats] = useState<YourWeekProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        setLoading(true);
        const data = await fetchApi<YourWeekProps>("/users/weekly-stats");
        setStats(data);
      } catch (err) {
        console.error("Failed to load weekly stats:", err);
        setStats(null);
      } finally {
        setLoading(false);
      }
    }

    // If props are explicitly passed, use them; otherwise fetch from backend
    if (props.booksFinished !== undefined || props.pagesRead !== undefined) {
      setStats(props);
      setLoading(false);
    } else {
      loadStats();
    }
  }, [props]);

  const booksFinished = stats?.booksFinished ?? props.booksFinished ?? 0;
  const pagesRead = stats?.pagesRead ?? props.pagesRead ?? 0;
  const reviewsWritten = stats?.reviewsWritten ?? props.reviewsWritten ?? 0;

  if (loading) {
    return (
      <div className="bg-[#FAF7F2] border border-[#E8E0D5] rounded-3xl p-5 space-y-4 animate-pulse">
        <div className="h-5 bg-[#EFE8DF] rounded w-1/3" />
        <div className="grid grid-cols-3 gap-2">
          <div className="h-12 bg-[#EFE8DF] rounded-xl" />
          <div className="h-12 bg-[#EFE8DF] rounded-xl" />
          <div className="h-12 bg-[#EFE8DF] rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF7F2] border border-[#E8E0D5] rounded-3xl p-5 space-y-4">
      <h3 className="font-serif font-bold text-xl text-[#1A1817]">Your Week</h3>
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-[#F5F0EB] p-3 rounded-2xl border border-[#E8E0D5]">
          <span className="block font-bold text-lg text-[#1A1817]">
            {booksFinished}
          </span>
          <span className="text-[10px] font-medium text-[#736B63]">Books</span>
        </div>
        <div className="bg-[#F5F0EB] p-3 rounded-2xl border border-[#E8E0D5]">
          <span className="block font-bold text-lg text-[#1A1817]">
            {pagesRead}
          </span>
          <span className="text-[10px] font-medium text-[#736B63]">Pages</span>
        </div>
        <div className="bg-[#F5F0EB] p-3 rounded-2xl border border-[#E8E0D5]">
          <span className="block font-bold text-lg text-[#1A1817]">
            {reviewsWritten}
          </span>
          <span className="text-[10px] font-medium text-[#736B63]">Reviews</span>
        </div>
      </div>
    </div>
  );
}