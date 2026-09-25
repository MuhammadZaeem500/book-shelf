"use client";

import PeopleToFollowCard from "@/src/components/home/PeopleToFollowCard";
import BrowseByGenreCard from "../library/BrowseByGenreCard";
import ReadingStatsCard from "@/src/components/home/ReadingStatsCard";

const genres = [
  "Literary Fiction",
  "Sci-Fi",
  "Historical",
  "Fantasy",
  "Mystery",
  "Biography",
  "Romance",
];

export default function HomePageRightSidebar() {
  const handleGenreClick = (genre: string) => {
    console.log("Selected genre:", genre);
    // router.push(`/library?genre=${encodeURIComponent(genre)}`);
  };

  return (
    <aside className="w-80 shrink-0 p-4 space-y-5 hidden xl:block bg-[#F2EDE5] dark:bg-[#1D1A18] transition-colors">
      <ReadingStatsCard />

      <PeopleToFollowCard />

      <BrowseByGenreCard
        genres={genres}
        onSelectGenre={handleGenreClick}
      />
    </aside>
  );
}