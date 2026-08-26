"use client";

import React from "react";
import CurrentlyReadingCard from "./CurrentlyReadingCard";
import WantToReadCard, { WantToReadItem } from "@/src/components/library/WantToReadCard";
import ReadingGoalCard from "@/src/components/library/ReadingGoalCard";

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
  return (
    <aside className="w-80 shrink-0 p-4 space-y-5 hidden xl:block bg-[#F2EDE5]/30 border-l border-[#EFE8DF]">
      <CurrentlyReadingCard
        title="Dune"
        author="Frank Herbert"
        currentPage={432}
        totalPages={604}
        coverGradient="from-[#A65B17] to-[#66350B]"
      />

      <WantToReadCard
        totalCount={23}
        books={wantToReadBooks}
        onSeeAll={() => console.log("Navigate to Want to Read list")}
      />

      <ReadingGoalCard year={2026} booksRead={47} targetBooks={60} />
    </aside>
  );
}
