"use client";

import React, { useEffect, useState } from "react";
import ReadingGoalCard from "@/src/components/library/ReadingGoalCard";
import RecentReadingSidebarCard from "@/src/components/profile/RecentReadingSidebarCard";
import { fetchApi } from "@/src/app/lib/api";
import { UserProfileStats } from "@/src/types";

export default function ProfileRightSidebar() {
  const [stats, setStats] = useState<UserProfileStats>({
    annualGoal: 60,
    booksReadThisYear: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProfileStats = async () => {
      try {
        const data = await fetchApi<UserProfileStats>("/users/me/stats");
        if (data) {
          setStats(data);
        }
      } catch (err) {
        console.error("Failed to fetch profile right sidebar stats:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfileStats();
  }, []);

  const booksRead = stats?.booksReadThisYear ?? stats?.booksRead ?? 0;
  const targetBooks = stats?.annualGoal ?? 60;

  return (
    <aside className="w-80 shrink-0 p-4 space-y-5 hidden xl:block bg-[#F2EDE5]/30 dark:bg-[#1A1816]/30 border-l border-[#EFE8DF] dark:border-[#2E2926] transition-colors">
      {isLoading ? (
        <div className="bg-[#FAF7F2] dark:bg-[#1D1A18] border border-[#E8E0D5] dark:border-[#2E2926] rounded-3xl p-5 space-y-4 animate-pulse">
          <div className="h-5 bg-[#EFE8DF] dark:bg-[#2E2926] rounded w-1/2" />
          <div className="h-3 bg-[#EFE8DF] dark:bg-[#2E2926] rounded w-3/4" />
          <div className="h-2.5 bg-[#EFE8DF] dark:bg-[#2E2926] rounded-full w-full" />
        </div>
      ) : (
        <ReadingGoalCard
          year={2026}
          booksRead={booksRead}
          targetBooks={targetBooks}
        />
      )}

      <RecentReadingSidebarCard />
    </aside>
  );
}