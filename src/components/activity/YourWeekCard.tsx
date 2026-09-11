"use client";

import { useState, useEffect } from "react";
import { fetchApi } from "@/src/app/lib/api";
import { YourWeekProps } from "@/src/types";

export default function YourWeekCard() {
  const [weeklyData, setWeeklyData] = useState<YourWeekProps>({
    booksFinished: 0,
    pagesRead: 0,
    reviewsWritten: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadWeeklyStats() {
      try {
        setLoading(true);
        const data = await fetchApi<YourWeekProps>("/users/me/stats/weekly");
        setWeeklyData(data);
      } catch (err) {
        console.error("Failed to load weekly stats:", err);
      } finally {
        setLoading(false);
      }
    }

    loadWeeklyStats();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#FAF7F2] border border-[#E8E0D5] rounded-3xl p-5 space-y-4">
        <h3 className="font-serif font-bold text-xl text-[#1A1817]">Your Week</h3>
        <div className="text-xs text-[#8C837A] animate-pulse">Loading stats...</div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF7F2] border border-[#E8E0D5] rounded-3xl p-5 space-y-4">
      <h3 className="font-serif font-bold text-xl text-[#1A1817]">Your Week</h3>

      <div className="space-y-3 text-sm">
        <div className="flex items-center justify-between pb-2 border-b border-[#EFE8DF]">
          <span className="text-[#6B5D4F]">Books finished</span>
          <span className="font-bold text-[#1A1817] text-base">
            {weeklyData?.booksFinished ?? 0}
          </span>
        </div>

        <div className="flex items-center justify-between pb-2 border-b border-[#EFE8DF]">
          <span className="text-[#6B5D4F]">Pages read</span>
          <span className="font-bold text-[#1A1817] text-base">
            {weeklyData?.pagesRead ?? 0}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[#6B5D4F]">Reviews written</span>
          <span className="font-bold text-[#1A1817] text-base">
            {weeklyData?.reviewsWritten ?? 0}
          </span>
        </div>
      </div>
    </div>
  );
}