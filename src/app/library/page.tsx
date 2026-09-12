"use client";

import React, { useState, useEffect } from "react";
import { SlidersHorizontal, ArrowRight, Star, Loader2 } from "lucide-react";
import { fetchApi } from "@/src/app/lib/api";

interface LoggedBook {
  id: string;
  status: string;
  rating?: number;
  updatedAt: string;
  createdAt: string;
  book: {
    id: string;
    title: string;
    author: string;
    pages?: number;
    coverUrl?: string;
  };
}

interface DateGroup {
  dateLabel: string;
  books: {
    id: string;
    title: string;
    author: string;
    rating: number;
    pages: number;
    coverUrl?: string;
    coverBg: string;
  }[];
}

const coverGradients = [
  "from-[#8B4513] to-[#5C2E0B]",
  "from-[#A53860] to-[#670B2F]",
  "from-[#1D2A44] to-[#0F172A]",
  "from-[#1E4620] to-[#0D280E]",
  "from-[#4B2E83] to-[#1D0C40]",
];

export default function MyLibrary() {
  const [selectedMonth, setSelectedMonth] = useState<string>("All");
  const [libraryGroups, setLibraryGroups] = useState<DateGroup[]>([]);
  const [availableMonths, setAvailableMonths] = useState<string[]>([]);
  const [totalBooksRead, setTotalBooksRead] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch logged books from NestJS backend
  const loadLibraryData = async () => {
    try {
      setLoading(true);
      const response = await fetchApi<LoggedBook[]>("/reviews/library");
      const loggedBooks = Array.isArray(response) ? response : [];

      setTotalBooksRead(loggedBooks.length);

      // Extract unique "Month Year" strings dynamically
      const monthsSet = new Set<string>();
      loggedBooks.forEach((item) => {
        const date = new Date(item.updatedAt || item.createdAt);
        const monthYear = date.toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        });
        monthsSet.add(monthYear);
      });

      const sortedMonths = Array.from(monthsSet);
      setAvailableMonths(["All", ...sortedMonths]);

      // Filter and group books by date
      const filteredBooks =
        selectedMonth === "All"
          ? loggedBooks
          : loggedBooks.filter((item) => {
              const monthYear = new Date(
                item.updatedAt || item.createdAt,
              ).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              });
              return monthYear === selectedMonth;
            });

      // Group books by DAY label (e.g., "AUGUST 17")
      const groupedMap = new Map<string, DateGroup["books"]>();

      filteredBooks.forEach((item, index) => {
        const date = new Date(item.updatedAt || item.createdAt);
        const dayLabel = date
          .toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })
          .toUpperCase();

        const formattedBook = {
          id: item.id,
          title: item.book?.title || "Untitled Book",
          author: item.book?.author || "Unknown Author",
          rating: item.rating || 0,
          pages: item.book?.pages || 250,
          coverUrl: item.book?.coverUrl,
          coverBg: coverGradients[index % coverGradients.length],
        };

        if (!groupedMap.has(dayLabel)) {
          groupedMap.set(dayLabel, []);
        }
        groupedMap.get(dayLabel)!.push(formattedBook);
      });

      const groupsArray: DateGroup[] = Array.from(
        groupedMap.entries(),
      ).map(([dateLabel, books]) => ({
        dateLabel,
        books,
      }));

      setLibraryGroups(groupsArray);
    } catch (err) {
      console.error("Failed to fetch library data:", err);
      setLibraryGroups([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLibraryData();
  }, [selectedMonth]);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-8 space-y-8 text-[#1A1817]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1817]">
            My Library
          </h1>
          <p className="text-sm text-[#736B63]">
            {totalBooksRead} books logged · reading diary
          </p>
        </div>

        <button
          type="button"
          onClick={loadLibraryData}
          className="self-start sm:self-auto flex items-center gap-2 px-4 py-2.5 bg-[#FAF7F2] border border-[#E0D8CE] rounded-full text-xs font-semibold text-[#524B45] hover:bg-[#EFE3D8] transition-colors cursor-pointer"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#524B45]" />
          Refresh library
        </button>
      </div>

      {/* Month Filters */}
      {availableMonths.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {availableMonths.map((month) => (
            <button
              key={month}
              onClick={() => setSelectedMonth(month)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all shrink-0 cursor-pointer ${
                selectedMonth === month
                  ? "bg-[#C85A2B] text-white shadow-xs"
                  : "bg-[#FAF7F2] text-[#524B45] border border-[#E0D8CE] hover:bg-[#EFE3D8]"
              }`}
            >
              {month}
            </button>
          ))}
        </div>
      )}

      {/* Main Content Area */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#C85A2B]" />
          <p className="text-xs text-[#8C837A]">Loading your reading history...</p>
        </div>
      ) : libraryGroups.length === 0 ? (
        <div className="p-12 text-center bg-[#FAF7F2] border border-[#EFE8DF] rounded-3xl space-y-2">
          <h3 className="font-serif font-bold text-lg text-[#1A1817]">
            No books found
          </h3>
          <p className="text-xs text-[#736B63]">
            You haven&apos;t logged any books for this selection yet.
          </p>
        </div>
      ) : (
        <div className="space-y-8 pt-2">
          {libraryGroups.map((group) => (
            <div key={group.dateLabel} className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold tracking-wider text-[#C85A2B] uppercase shrink-0">
                  {group.dateLabel}
                </span>
                <div className="h-px w-full bg-[#EFE8DF]" />
              </div>

              <div className="space-y-6">
                {group.books.map((book) => (
                  <div
                    key={book.id}
                    className="flex items-start gap-4 sm:gap-6 group"
                  >
                    {/* Cover Image or Gradient Placeholder */}
                    {book.coverUrl ? (
                      <img
                        src={book.coverUrl}
                        alt={book.title}
                        className="w-16 sm:w-20 h-24 sm:h-28 object-cover rounded-md shadow-sm border border-black/10 shrink-0"
                      />
                    ) : (
                      <div
                        className={`relative w-16 sm:w-20 h-24 sm:h-28 rounded-md bg-linear-to-b ${book.coverBg} p-2 flex flex-col justify-between shrink-0 shadow-sm border border-black/10`}
                      >
                        <span className="text-[7px] sm:text-[8px] font-bold tracking-widest text-white/70 uppercase">
                          BOOKSHELF
                        </span>
                        <div>
                          <p className="text-[9px] sm:text-[10px] font-bold text-white leading-tight line-clamp-2">
                            {book.title}
                          </p>
                          <p className="text-[7px] text-white/80 line-clamp-1 mt-0.5">
                            {book.author}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Book Metadata */}
                    <div className="flex-1 min-w-0 space-y-1.5 pt-1">
                      <h3 className="font-serif font-bold text-lg sm:text-xl text-[#1A1817] group-hover:text-[#C85A2B] transition-colors leading-tight">
                        {book.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#736B63]">
                        {book.author}
                      </p>

                      <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-[#8C837A]">
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < book.rating
                                  ? "text-[#C85A2B] fill-[#C85A2B]"
                                  : "text-[#E0D8CE] fill-[#E0D8CE]"
                              }`}
                            />
                          ))}
                        </div>

                        <span>·</span>
                        <span>{book.pages} pages</span>
                      </div>

                      <div className="pt-2">
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#1A1817] hover:text-[#C85A2B] transition-colors cursor-pointer"
                        >
                          View entry
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}