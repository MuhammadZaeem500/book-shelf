"use client";

import { useEffect, useState } from "react";
import PeopleToFollowCard from "@/src/components/home/PeopleToFollowCard";
import { fetchApi } from "@/src/app/lib/api";
import BrowseByGenreCard from "../library/BrowseByGenreCard";

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
  booksReadThisYear?: number;
  pagesReadLifetime?: number;
  readingStreakDays?: number;
  annualGoal?: number;
}

export default function HomePageRightSidebar() {
  const [stats, setStats] = useState<ReadingStats>({
    booksReadThisYear: 0,
    pagesReadLifetime: 0,
    readingStreakDays: 0,
    annualGoal: 60,
  });
  const [isLoading, setIsLoading] = useState(true);

  const handleGenreClick = (genre: string) => {
    console.log("Selected genre:", genre);
    // Add router navigation or filter logic here, e.g.:
    // router.push(`/library?genre=${encodeURIComponent(genre)}`);
  };

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchApi<ReadingStats>("/users/me/stats");
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

  // Safe evaluations using nullish coalescing
  const booksRead = stats?.booksReadThisYear ?? 0;
  const annualGoal = stats?.annualGoal ?? 60;
  const pagesRead = stats?.pagesReadLifetime ?? 0;
  const streakDays = stats?.readingStreakDays ?? 0;

  const progressPercentage = Math.min(
    100,
    Math.round((booksRead / (annualGoal || 1)) * 100)
  );
  const booksRemaining = Math.max(0, annualGoal - booksRead);

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
                  {booksRead.toLocaleString()}
                </span>
                <span className="text-xs text-[#8C837A]">this year</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#6B5D4F]">Pages read</span>
              <div>
                <span className="font-bold text-[#1A1817] text-base mr-1">
                  {pagesRead.toLocaleString()}
                </span>
                <span className="text-xs text-[#8C837A]">lifetime</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#6B5D4F]">Reading streak</span>
              <div>
                <span className="font-bold text-[#1A1817] text-base mr-1">
                  {streakDays} days
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
              {booksRead} / {annualGoal}
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

      <BrowseByGenreCard
        genres={genres}
        onSelectGenre={handleGenreClick}
      />
    </aside>
  );
}