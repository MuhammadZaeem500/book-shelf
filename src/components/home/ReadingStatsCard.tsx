"use client";

import { useEffect, useState } from "react";
import { fetchApi } from "@/src/app/lib/api";

interface UserStats {
  booksRead: number;
  reading: number;
  wantToRead: number;
}

export default function ReadingStatsCard() {
  const [stats, setStats] = useState<UserStats>({
    booksRead: 0,
    reading: 0,
    wantToRead: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchApi<UserStats>("/users/me/stats");
        if (data) {
          setStats(data);
        }
      } catch (err) {
        console.error("Failed to load reading stats:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadStats();
  }, []);

  return (
    <div className="bg-[#FAF7F2] dark:bg-[#1D1A18] border border-[#E8E0D5] dark:border-[#2E2926] rounded-3xl p-5 space-y-4 transition-colors">
      <h3 className="font-serif font-bold text-xl text-[#1A1817] dark:text-[#F5F2EB]">
        Your Reading Stats
      </h3>

      {isLoading ? (
        <div className="space-y-3 py-2 animate-pulse">
          <div className="h-4 bg-[#EFE8DF] dark:bg-[#2E2926] rounded w-3/4"></div>
          <div className="h-4 bg-[#EFE8DF] dark:bg-[#2E2926] rounded w-1/2"></div>
          <div className="h-4 bg-[#EFE8DF] dark:bg-[#2E2926] rounded w-2/3"></div>
        </div>
      ) : (
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-[#6B5D4F] dark:text-[#A0958B]">Books Finished</span>
            <span className="font-bold text-[#1A1817] dark:text-[#F5F2EB] text-base">
              {stats.booksRead ?? 0}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#6B5D4F] dark:text-[#A0958B]">Currently Reading</span>
            <span className="font-bold text-[#1A1817] dark:text-[#F5F2EB] text-base">
              {stats.reading ?? 0}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#6B5D4F] dark:text-[#A0958B]">Want to Read</span>
            <span className="font-bold text-[#1A1817] dark:text-[#F5F2EB] text-base">
              {stats.wantToRead ?? 0}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}