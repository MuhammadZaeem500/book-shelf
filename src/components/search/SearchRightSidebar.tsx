"use client";

import React, { useEffect, useState } from "react";
// import RecentSearchesCard from "@/src/components/search/RecentSearchesCard";
import TrendingSearchesCard from "@/src/components/search/TrendingSearchesCard";
import PopularAuthorsCard from "@/src/components/search/PopularAuthorsCard";
import { fetchApi } from "@/src/app/lib/api";

type AuthorItem = React.ComponentProps<typeof PopularAuthorsCard>["authors"][number];

const initialRecent = [
  "Cormac McCarthy",
  "magical realism",
  "1984 George Orwell",
  "best fantasy 2025",
  "Min Jin Lee",
];

const DEFAULT_TRENDING = [
  "Sally Rooney",
  "Booker Prize 2026",
  "dark academia",
  "literary fiction",
  "translated novels",
];

const DEFAULT_AUTHORS: AuthorItem[] = [
  { name: "Colson Whitehead", initials: "CW", bg: "#2D3748", booksCount: 9 },
  { name: "Zadie Smith", initials: "ZS", bg: "#6B2D39", booksCount: 7 },
  { name: "Kazuo Ishiguro", initials: "KI", bg: "#1E4D6B", booksCount: 12 },
  { name: "Chimamanda Adichie", initials: "CA", bg: "#365E27", booksCount: 6 },
  { name: "Ocean Vuong", initials: "OV", bg: "#3B1F4A", booksCount: 4 },
];

export default function SearchRightSidebar() {
  const [recentSearches, setRecentSearches] = useState(initialRecent);
  const [trendingItems, setTrendingItems] = useState<string[]>([]);
  const [authors, setAuthors] = useState<AuthorItem[]>(DEFAULT_AUTHORS);
  const [loadingTrending, setLoadingTrending] = useState(true);

  useEffect(() => {
    const loadSidebarData = async () => {
      try {
        const trendingData = await fetchApi<string[]>("/books/trending");
        if (trendingData && trendingData.length > 0) {
          setTrendingItems(trendingData);
        } else {
          setTrendingItems(DEFAULT_TRENDING);
        }
      } catch (err) {
        console.error("Failed to fetch trending searches, using fallbacks:", err);
        setTrendingItems(DEFAULT_TRENDING);
      } finally {
        setLoadingTrending(false);
      }
    };

    loadSidebarData();
  }, []);

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

      {loadingTrending ? (
        <div className="bg-[#FAF7F2] border border-[#E8E0D5] rounded-3xl p-5 space-y-4 animate-pulse">
          <div className="h-6 bg-[#EFE8DF] rounded-md w-1/2" />
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-6 bg-[#EFE8DF] rounded-xl w-full" />
            ))}
          </div>
        </div>
      ) : (
        <TrendingSearchesCard
          trendingItems={trendingItems}
          onSelectTrending={handleSearchSelect}
        />
      )}

      <PopularAuthorsCard
        authors={authors}
        onSelectAuthor={handleAuthorSelect}
      />
    </aside>
  );
}