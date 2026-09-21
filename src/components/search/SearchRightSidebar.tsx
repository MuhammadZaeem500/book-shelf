"use client";

import React, { useState } from "react";
// import RecentSearchesCard from "@/src/components/search/RecentSearchesCard";
import TrendingSearchesCard from "@/src/components/search/TrendingSearchesCard";
import PopularAuthorsCard from "@/src/components/search/PopularAuthorsCard";

type AuthorItem = React.ComponentProps<typeof PopularAuthorsCard>["authors"][number];

const initialRecent = [
  "Cormac McCarthy",
  "magical realism",
  "1984 George Orwell",
  "best fantasy 2025",
  "Min Jin Lee",
];

const trendingData = [
  "Sally Rooney",
  "Booker Prize 2026",
  "dark academia",
  "literary fiction",
  "translated novels",
];

const authorsData: AuthorItem[] = [
  { name: "Colson Whitehead", initials: "CW", bg: "#2D3748", booksCount: 9 },
  { name: "Zadie Smith", initials: "ZS", bg: "#6B2D39", booksCount: 7 },
  { name: "Kazuo Ishiguro", initials: "KI", bg: "#1E4D6B", booksCount: 12 },
  { name: "Chimamanda Adichie", initials: "CA", bg: "#365E27", booksCount: 6 },
  { name: "Ocean Vuong", initials: "OV", bg: "#3B1F4A", booksCount: 4 },
];

export default function SearchRightSidebar() {
  const [recentSearches, setRecentSearches] = useState(initialRecent);

  const handleClearAll = () => {
    setRecentSearches([]);
  };

  const handleSearchSelect = (term: string) => {
    console.log("Search selected:", term);
  };

  const handleAuthorSelect = (author: AuthorItem) => {
    console.log("Author selected:", author.name);
  };

  return (
    <aside className="w-80 shrink-0 p-4 space-y-5 hidden xl:block bg-[#F2EDE5]/30 border-l border-[#EFE8DF]">
      {/* {recentSearches.length > 0 && (
        <RecentSearchesCard
          searches={recentSearches}
          onClearAll={handleClearAll}
          onSelectSearch={handleSearchSelect}
        />
      )} */}

      <TrendingSearchesCard
        trendingItems={trendingData}
        onSelectTrending={handleSearchSelect}
      />

      <PopularAuthorsCard
        authors={authorsData}
        onSelectAuthor={handleAuthorSelect}
      />
    </aside>
  );
}