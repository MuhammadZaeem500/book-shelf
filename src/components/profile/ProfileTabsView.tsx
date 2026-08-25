"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";

interface BookGridItem {
  id: string;
  title: string;
  author: string;
  coverGradient: string;
}

interface DiaryGroupItem {
  dateLabel: string;
  books: Array<{
    id: string;
    title: string;
    author: string;
    rating: number;
    pages: number;
    hasReview: boolean;
    coverGradient: string;
  }>;
}

interface ReviewItem {
  id: string;
  title: string;
  author: string;
  rating: number;
  dateLabel: string;
  reviewText: string;
  coverGradient: string;
}

const libraryGridBooks: BookGridItem[] = [
  { id: "1", title: "Middlemarch", author: "George Eliot", coverGradient: "from-[#8B4513] to-[#5C2E0B]" },
  { id: "2", title: "Piranesi", author: "Susanna Clarke", coverGradient: "from-[#A53860] to-[#670B2F]" },
  { id: "3", title: "The Night Circus", author: "Erin Morgenstern", coverGradient: "from-[#1D2A44] to-[#0F172A]" },
  { id: "4", title: "Annihilation", author: "Jeff VanderMeer", coverGradient: "from-[#1E4620] to-[#0D280E]" },
  { id: "5", title: "Pachinko", author: "Min Jin Lee", coverGradient: "from-[#3B7A32] to-[#1C4217]" },
  { id: "6", title: "Lessons in Chemistry", author: "Bonnie Garmus", coverGradient: "from-[#1F5B83] to-[#123A54]" },
  { id: "7", title: "Middlemarch", author: "George Eliot", coverGradient: "from-[#8B4513] to-[#5C2E0B]" },
  { id: "8", title: "Dune", author: "Frank Herbert", coverGradient: "from-[#A65B17] to-[#66350B]" },
];

const diaryData: DiaryGroupItem[] = [
  {
    dateLabel: "AUGUST 17",
    books: [
      { id: "d1", title: "Middlemarch", author: "George Eliot", rating: 5, pages: 904, hasReview: true, coverGradient: "from-[#8B4513] to-[#5C2E0B]" },
    ],
  },
  {
    dateLabel: "AUGUST 12",
    books: [
      { id: "d2", title: "Piranesi", author: "Susanna Clarke", rating: 4, pages: 272, hasReview: true, coverGradient: "from-[#A53860] to-[#670B2F]" },
      { id: "d3", title: "The Night Circus", author: "Erin Morgenstern", rating: 5, pages: 387, hasReview: false, coverGradient: "from-[#1D2A44] to-[#0F172A]" },
    ],
  },
];

const reviewsData: ReviewItem[] = [
  {
    id: "r1",
    title: "Middlemarch",
    author: "George Eliot",
    rating: 5,
    dateLabel: "Aug 17",
    reviewText: "“A remarkable and deeply moving work that lingers long after the final page. The writing is precise, the characters unforgettable.”",
    coverGradient: "from-[#8B4513] to-[#5C2E0B]",
  },
  {
    id: "r2",
    title: "The Night Circus",
    author: "Erin Morgenstern",
    rating: 5,
    dateLabel: "Aug 12",
    reviewText: "“A remarkable and deeply moving work that lingers long after the final page. The writing is precise, the characters unforgettable.”",
    coverGradient: "from-[#1D2A44] to-[#0F172A]",
  },
  {
    id: "r3",
    title: "Pachinko",
    author: "Min Jin Lee",
    rating: 5,
    dateLabel: "Jul 28",
    reviewText: "“A remarkable and deeply moving work that lingers long after the final page. The writing is precise, the characters unforgettable.”",
    coverGradient: "from-[#3B7A32] to-[#1C4217]",
  },
];

export default function ProfileTabsView() {
  const [activeTab, setActiveTab] = useState<"library" | "diary" | "reviews">("library");

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-serif font-bold text-xl text-[#1A1817]">Favorite Books</h3>
          <button className="text-xs font-semibold text-[#C85A2B] hover:underline">Edit →</button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {libraryGridBooks.slice(0, 4).map((book) => (
            <div
              key={`fav-${book.id}`}
              className={`relative h-44 rounded-2xl bg-gradient-to-b ${book.coverGradient} p-3 flex flex-col justify-between shadow-sm border border-black/10`}
            >
              <span className="text-[9px] font-bold tracking-widest text-white/70 uppercase">BOOKSHELF</span>
              <div>
                <p className="text-xs font-bold text-white leading-tight">{book.title}</p>
                <p className="text-[10px] text-white/80">{book.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center border-b border-[#EFE8DF] gap-8">
        {(["library", "diary", "reviews"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-semibold capitalize transition-all relative ${
              activeTab === tab ? "text-[#C85A2B]" : "text-[#736B63] hover:text-[#1A1817]"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#C85A2B] rounded-full" />
            )}
          </button>
        ))}
      </div>

      {activeTab === "library" && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {libraryGridBooks.map((book, idx) => (
            <div key={`${book.id}-${idx}`} className="space-y-2">
              <div
                className={`relative h-44 rounded-2xl bg-gradient-to-b ${book.coverGradient} p-3 flex flex-col justify-between shadow-xs border border-black/10`}
              >
                <span className="text-[8px] font-bold tracking-widest text-white/70 uppercase">BOOKSHELF</span>
                <div>
                  <p className="text-xs font-bold text-white leading-tight">{book.title}</p>
                  <p className="text-[10px] text-white/80">{book.author}</p>
                </div>
              </div>
              <div className="text-xs">
                <p className="font-bold text-[#1A1817] truncate">{book.title}</p>
                <p className="text-[#736B63] truncate">{book.author}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "diary" && (
        <div className="space-y-6">
          {diaryData.map((group) => (
            <div key={group.dateLabel} className="space-y-3">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold tracking-wider text-[#C85A2B] uppercase shrink-0">
                  {group.dateLabel}
                </span>
                <div className="h-[1px] w-full bg-[#EFE8DF]" />
              </div>

              {group.books.map((b) => (
                <div key={b.id} className="flex items-start gap-4 p-3 bg-[#FAF7F2] border border-[#E8E0D5] rounded-2xl">
                  <div className={`w-14 h-20 rounded-lg bg-gradient-to-b ${b.coverGradient} shrink-0 p-2 flex flex-col justify-between`}>
                    <span className="text-[6px] font-bold text-white/70">BOOKSHELF</span>
                    <p className="text-[8px] font-bold text-white leading-tight">{b.title}</p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif font-bold text-base text-[#1A1817]">{b.title}</h4>
                    <p className="text-xs text-[#736B63]">{b.author}</p>
                    <div className="flex items-center gap-1 text-xs text-[#8C837A] pt-1">
                      <div className="flex text-[#C85A2B]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < b.rating ? "fill-[#C85A2B]" : "text-[#E0D8CE]"}`} />
                        ))}
                      </div>
                      <span>· {b.pages} pages</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {activeTab === "reviews" && (
        <div className="space-y-4">
          {reviewsData.map((rev) => (
            <div key={rev.id} className="p-5 bg-[#FAF7F2] border border-[#E8E0D5] rounded-3xl space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-14 rounded-md bg-gradient-to-b ${rev.coverGradient} shrink-0`} />
                  <div>
                    <h4 className="font-serif font-bold text-base text-[#1A1817]">{rev.title}</h4>
                    <p className="text-xs text-[#736B63]">{rev.author}</p>
                    <div className="flex text-[#C85A2B] pt-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < rev.rating ? "fill-[#C85A2B]" : "text-[#E0D8CE]"}`} />
                      ))}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-[#8C837A]">{rev.dateLabel}</span>
              </div>
              <p className="text-xs italic text-[#524B45] leading-relaxed">{rev.reviewText}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}