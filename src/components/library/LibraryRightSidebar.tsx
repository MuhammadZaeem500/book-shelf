"use client";

import React, { useState, useEffect, useCallback } from "react";
import CurrentlyReadingCard from "@/src/components/library/CurrentlyReadingCard";
import WantToReadCard from "@/src/components/library/WantToReadCard";
import ReadingGoalCard from "@/src/components/library/ReadingGoalCard";
import { fetchApi } from "@/src/app/lib/api";
import { CurrentlyReading, WantToReadBook } from "@/src/types";

interface WantToReadResponse {
  totalCount: number;
  books: WantToReadBook[];
}

export default function LibraryRightSidebar() {
  const [currentlyReading, setCurrentlyReading] =
    useState<CurrentlyReading | null>(null);
  const [wantToReadData, setWantToReadData] = useState<WantToReadResponse>({
    totalCount: 0,
    books: [],
  });
  const [loadingCurrent, setLoadingCurrent] = useState(true);
  const [loadingWantToRead, setLoadingWantToRead] = useState(true);

  // 1. Fetch Currently Reading Book
  useEffect(() => {
    const fetchCurrentlyReading = async () => {
      try {
        setLoadingCurrent(true);
        const data = await fetchApi<any>("/reviews/currently-reading");
        const activeBook = Array.isArray(data) ? data[0] : data;
        setCurrentlyReading(activeBook || null);
      } catch (err) {
        console.error("Failed to fetch currently reading data:", err);
        setCurrentlyReading(null);
      } finally {
        setLoadingCurrent(false);
      }
    };

    fetchCurrentlyReading();
  }, []);

  // 2. Fetch Real-time Want to Read Books
  const fetchWantToRead = useCallback(async () => {
    try {
      setLoadingWantToRead(true);
      const data = await fetchApi<WantToReadResponse>(
        "/books/want-to-read?limit=3"
      );
      setWantToReadData(data || { totalCount: 0, books: [] });
    } catch (err) {
      console.error("Failed to fetch want to read books:", err);
      setWantToReadData({ totalCount: 0, books: [] });
    } finally {
      setLoadingWantToRead(false);
    }
  }, []);

  useEffect(() => {
    fetchWantToRead();
  }, [fetchWantToRead]);

  // 3. Handle Item Deletion
  const handleRemoveBook = async (bookId: string) => {
    try {
      await fetchApi(`/books/${bookId}`, { method: "DELETE" });
      // Re-fetch list to sync totalCount and items instantly
      await fetchWantToRead();
    } catch (err) {
      console.error("Failed to remove book:", err);
    }
  };

  return (
    <aside className="w-80 shrink-0 p-4 space-y-5 hidden xl:block bg-[#F2EDE5]/30 border-l border-[#EFE8DF]">
      {/* 1. Currently Reading Section */}
      {loadingCurrent ? (
        <div className="bg-[#FAF7F2] border border-[#E8E0D5] rounded-3xl p-5 space-y-4 animate-pulse">
          <div className="h-5 bg-[#EFE8DF] rounded-md w-1/2" />
          <div className="flex gap-4 items-center">
            <div className="w-14 h-20 bg-[#EFE8DF] rounded-lg shrink-0" />
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-[#EFE8DF] rounded-md w-3/4" />
              <div className="h-3 bg-[#EFE8DF] rounded-md w-1/2" />
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
        totalCount={wantToReadData.totalCount}
        books={wantToReadData.books}
        isLoading={loadingWantToRead}
        onSeeAll={() => (window.location.href = "/library?tab=wantToRead")}
        onBookClick={(id) => (window.location.href = `/books/${id}`)}
        onRemoveBook={handleRemoveBook}
      />

      {/* 3. Reading Goal Progress */}
      <ReadingGoalCard year={2026} booksRead={47} targetBooks={60} />
    </aside>
  );
}