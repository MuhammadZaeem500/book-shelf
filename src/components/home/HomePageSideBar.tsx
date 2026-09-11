"use client";

import React, { useEffect, useState } from "react";
import PeopleToFollowCard from "@/src/components/home/PeopleToFollowCard";
import { fetchApi } from "@/src/app/lib/api";

const genres = [
  "Literary Fiction",
  "Sci-Fi",
  "Historical",
  "Fantasy",
  "Mystery",
  "Biography",
  "Romance",
];

interface ReadingStats {
  booksReadThisYear: number;
  pagesReadLifetime: number;
  readingStreakDays: number;
  annualGoal: number;
}

export default function HomePageRightSidebar() {
  const [stats, setStats] = useState<ReadingStats>({
    booksReadThisYear: 0,
    pagesReadLifetime: 0,
    readingStreakDays: 0,
    annualGoal: 60,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchApi<ReadingStats>("/users/me/stats");
        setStats(data);
      } catch (err) {
        console.error("Failed to load reading stats:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadStats();
  }, []);

  const progressPercentage = Math.min(
    100,
    Math.round((stats.booksReadThisYear / (stats.annualGoal || 1)) * 100),
  );
  const booksRemaining = Math.max(0, stats.annualGoal - stats.booksReadThisYear);

  return (
    <aside className="w-80 shrink-0 p-4 space-y-5 hidden xl:block bg-[#F2EDE5]">
      <div className="bg-[#FAF7F2] border border-[#E8E0D5] rounded-3xl p-5 space-y-4">
        <h3 className="font-serif font-bold text-xl text-[#1A1817]">
          Your Reading Stats
        </h3>

        {isLoading ? (
          <div className="space-y-3 py-2 animate-pulse">
            <div className="h-4 bg-[#EFE8DF] rounded w-3/4"></div>
            <div className="h-4 bg-[#EFE8DF] rounded w-1/2"></div>
            <div className="h-4 bg-[#EFE8DF] rounded w-2/3"></div>
          </div>
        ) : (
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-[#6B5D4F]">Books read</span>
              <div>
                <span className="font-bold text-[#1A1817] text-base mr-1">
                  {stats.booksReadThisYear}
                </span>
                <span className="text-xs text-[#8C837A]">this year</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#6B5D4F]">Pages read</span>
              <div>
                <span className="font-bold text-[#1A1817] text-base mr-1">
                  {stats.pagesReadLifetime.toLocaleString()}
                </span>
                <span className="text-xs text-[#8C837A]">lifetime</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#6B5D4F]">Reading streak</span>
              <div>
                <span className="font-bold text-[#1A1817] text-base mr-1">
                  {stats.readingStreakDays} days
                </span>
                <span className="text-xs text-[#8C837A]">current</span>
              </div>
            </div>
          </div>
        )}

        <hr className="border-[#EFE8DF]" />

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#6B5D4F] font-medium">Reading goal</span>
            <span className="font-bold text-[#C85A2B]">
              {stats.booksReadThisYear} / {stats.annualGoal}
            </span>
          </div>

          <div className="w-full h-2.5 bg-[#EFE8DF] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#C85A2B] rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          <p className="text-xs text-[#8C837A]">
            {booksRemaining > 0
              ? `${booksRemaining} more books to hit your 2026 goal`
              : "🎉 Goal completed for 2026!"}
          </p>
        </div>
      </div>

      <PeopleToFollowCard />

      <div className="bg-[#FAF7F2] border border-[#EFE8DF] rounded-3xl p-5 space-y-4">
        <h3 className="font-serif font-bold text-xl text-[#1A1817]">
          Browse by Genre
        </h3>

        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <button
              key={genre}
              className="px-3.5 py-1.5 rounded-full border border-[#E0D8CE] bg-white/60 text-[#524B45] text-xs font-medium hover:bg-[#EFE3D8] hover:text-[#C85A2B] hover:border-[#C85A2B] transition-colors cursor-pointer"
            >
              {genre}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}