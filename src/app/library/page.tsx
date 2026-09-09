"use client";

import React, { useState } from "react";
import { SlidersHorizontal, Edit3, ArrowRight, Star } from "lucide-react";

interface BookEntry {
  id: string;
  title: string;
  author: string;
  rating: number;
  pages: number;
  hasReview?: boolean;
  coverBg: string;
}

interface DateGroup {
  dateLabel: string;
  books: BookEntry[];
}

const months = ["August 2026", "July 2026", "June 2026"];

const libraryData: DateGroup[] = [
  {
    dateLabel: "AUGUST 17",
    books: [
      {
        id: "1",
        title: "Middlemarch",
        author: "George Eliot",
        rating: 5,
        pages: 904,
        hasReview: true,
        coverBg: "from-[#8B4513] to-[#5C2E0B]",
      },
    ],
  },
  {
    dateLabel: "AUGUST 12",
    books: [
      {
        id: "2",
        title: "Piranesi",
        author: "Susanna Clarke",
        rating: 4,
        pages: 272,
        hasReview: true,
        coverBg: "from-[#A53860] to-[#670B2F]",
      },
      {
        id: "3",
        title: "The Night Circus",
        author: "Erin Morgenstern",
        rating: 5,
        pages: 387,
        hasReview: false,
        coverBg: "from-[#1D2A44] to-[#0F172A]",
      },
    ],
  },
  {
    dateLabel: "AUGUST 3",
    books: [
      {
        id: "4",
        title: "Annihilation",
        author: "Jeff VanderMeer",
        rating: 4,
        pages: 195,
        hasReview: false,
        coverBg: "from-[#1E4620] to-[#0D280E]",
      },
    ],
  },
];

export default function MyLibrary() {
  const [selectedMonth, setSelectedMonth] = useState("August 2026");

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-8 space-y-8 text-[#1A1817] max-h-[85vh] overflow-y-auto [scrollbar-color:#C85A2B_#FAF7F2] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#FAF7F2] [&::-webkit-scrollbar-thumb]:bg-[#C85A2B] [&::-webkit-scrollbar-thumb]:rounded-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1817]">
            My Library
          </h1>
          <p className="text-sm text-[#736B63]">
            47 books read · reading diary
          </p>
        </div>

        <button
          type="button"
          className="self-start sm:self-auto flex items-center gap-2 px-4 py-2.5 bg-[#FAF7F2] border border-[#E0D8CE] rounded-full text-xs font-semibold text-[#524B45] hover:bg-[#EFE3D8] transition-colors"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#524B45]" />
          Sort by date
        </button>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {months.map((month) => (
          <button
            key={month}
            onClick={() => setSelectedMonth(month)}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all shrink-0 ${
              selectedMonth === month
                ? "bg-[#C85A2B] text-white shadow-xs"
                : "bg-[#FAF7F2] text-[#524B45] border border-[#E0D8CE] hover:bg-[#EFE3D8]"
            }`}
          >
            {month}
          </button>
        ))}
      </div>

      <div className="space-y-8 pt-2">
        {libraryData.map((group) => (
          <div key={group.dateLabel} className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold tracking-wider text-[#C85A2B] uppercase shrink-0">
                {group.dateLabel}
              </span>
              <div className="h-[1px] w-full bg-[#EFE8DF]" />
            </div>

            <div className="space-y-6">
              {group.books.map((book) => (
                <div
                  key={book.id}
                  className="flex items-start gap-4 sm:gap-6 group"
                >
                  <div
                    className={`relative w-16 sm:w-20 h-24 sm:h-28 rounded-md bg-gradient-to-b ${book.coverBg} p-2 flex flex-col justify-between shrink-0 shadow-sm border border-black/10`}
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
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#1A1817] hover:text-[#C85A2B] transition-colors"
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
    </div>
  );
}
