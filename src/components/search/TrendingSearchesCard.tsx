"use client";

import React from "react";

export interface TrendingSearchesCardProps {
  trendingItems: string[];
  onSelectTrending?: (term: string) => void;
}

export default function TrendingSearchesCard({
  trendingItems,
  onSelectTrending,
}: TrendingSearchesCardProps) {
  return (
    <div className="bg-[#FAF7F2] border border-[#E8E0D5] rounded-3xl p-5 space-y-4">
      <h3 className="font-serif font-bold text-xl text-[#1A1817]">
        Trending Searches
      </h3>

      <div className="space-y-3">
        {trendingItems.map((item, index) => {
          const rank = index + 1;
          const isTopThree = rank <= 3;

          return (
            <button
              key={index}
              onClick={() => onSelectTrending?.(item)}
              className="w-full flex items-center gap-4 text-left group"
            >
              <span
                className={`font-bold text-base w-4 text-center shrink-0 ${
                  isTopThree ? "text-[#C85A2B]" : "text-[#D6CEC4]"
                }`}
              >
                {rank}
              </span>
              <span className="text-sm text-[#524B45] group-hover:text-[#C85A2B] transition-colors truncate">
                {item}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}