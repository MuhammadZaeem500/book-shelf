"use client";

import React, { useState, useEffect } from "react";
import CurrentlyReadingCard from "@/src/components/library/CurrentlyReadingCard";
import WantToReadCard from "@/src/components/library/WantToReadCard";
import ReadingGoalCard from "@/src/components/library/ReadingGoalCard";
import { fetchApi } from "@/src/app/lib/api";
import { CurrentlyReading } from "@/src/types";

type WantToReadItem = {
  id: string;
  title: string;
  author: string;
  coverGradient: string;
};

const wantToReadBooks: WantToReadItem[] = [
  {
    id: "1",
    title: "Intermezzo",
    author: "Sally Rooney",
    coverGradient: "from-[#2C4A6F] to-[#1D324B]",
  },
  {
    id: "2",
    title: "James",
    author: "Percival Everett",
    coverGradient: "from-[#1F5B83] to-[#123A54]",
  },
  {
    id: "3",
    title: "Dune Messiah",
    author: "Frank Herbert",
    coverGradient: "from-[#9E5114] to-[#60300A]",
  },
];

export default function LibraryRightSidebar() {
  const [currentlyReading, setCurrentlyReading] =
    useState<CurrentlyReading | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentlyReading = async () => {
      try {
        setLoading(true);
        const data = await fetchApi<any>("/reviews/currently-reading");
        
        // Handle array or object response structure
        const activeBook = Array.isArray(data) ? data[0] : data;
        setCurrentlyReading(activeBook || null);
      } catch (err) {
        console.error("Failed to fetch currently reading data:", err);
        setCurrentlyReading(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentlyReading();
  }, []);

  return (
    <aside className="w-80 shrink-0 p-4 space-y-5 hidden xl:block bg-[#F2EDE5]/30 border-l border-[#EFE8DF]">
      {/* 1. Currently Reading Section */}
      {loading ? (
        <div className="bg-[#FAF7F2] border border-[#E8E0D5] rounded-3xl p-5 space-y-4 animate-pulse">
          <div className="h-5 bg-[#EFE8DF] rounded w-1/2" />
          <div className="flex gap-4 items-center">
            <div className="w-14 h-20 bg-[#EFE8DF] rounded-lg shrink-0" />
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-[#EFE8DF] rounded w-3/4" />
              <div className="h-3 bg-[#EFE8DF] rounded w-1/2" />
              <div className="h-2 bg-[#EFE8DF] rounded-full w-full" />
            </div>
          </div>
        </div>
      ) : currentlyReading ? (
        <CurrentlyReadingCard
          title={currentlyReading.book?.title || "Untitled"}
          author={currentlyReading.book?.author || "Unknown Author"}
          currentPage={currentlyReading.currentPage ?? 0}
          totalPages={currentlyReading.totalPages ?? 100}
          coverGradient="from-[#C85A2B] to-[#8C4611]"
        />
      ) : (
        <div className="bg-[#FAF7F2] border border-[#E8E0D5] rounded-3xl p-5 text-center space-y-1">
          <h4 className="font-serif font-bold text-sm text-[#1A1817]">
            No active reading
          </h4>
          <p className="text-xs text-[#736B63]">
            Start logging a book to track page progress here.
          </p>
        </div>
      )}

      {/* 2. Want to Read Card */}
      <WantToReadCard
        totalCount={23}
        books={wantToReadBooks}
        onSeeAll={() => console.log("Navigate to Want to Read list")}
      />

      {/* 3. Reading Goal Progress */}
      <ReadingGoalCard year={2026} booksRead={47} targetBooks={60} />
    </aside>
  );
}