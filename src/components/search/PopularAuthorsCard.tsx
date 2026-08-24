"use client";

import React from "react";
import { ChevronRight } from "lucide-react";

export interface AuthorItem {
  name: string;
  initials: string;
  bg: string;
  booksCount: number;
}

export interface PopularAuthorsCardProps {
  authors: AuthorItem[];
  onSelectAuthor?: (author: AuthorItem) => void;
}

export default function PopularAuthorsCard({
  authors,
  onSelectAuthor,
}: PopularAuthorsCardProps) {
  return (
    <div className="bg-[#FAF7F2] border border-[#E8E0D5] rounded-3xl p-5 space-y-4">
      <h3 className="font-serif font-bold text-xl text-[#1A1817]">
        Popular Authors
      </h3>

      <div className="space-y-3">
        {authors.map((author, index) => (
          <button
            key={index}
            onClick={() => onSelectAuthor?.(author)}
            className="w-full flex items-center justify-between p-1 text-left rounded-2xl hover:bg-[#EFE8DF]/50 transition-colors group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="w-10 h-10 rounded-full text-white font-bold text-xs flex items-center justify-center shrink-0"
                style={{ backgroundColor: author.bg }}
              >
                {author.initials}
              </div>

              <div className="min-w-0">
                <p className="font-bold text-sm text-[#1A1817] truncate group-hover:text-[#C85A2B] transition-colors">
                  {author.name}
                </p>
                <p className="text-xs text-[#8C837A] truncate">
                  {author.booksCount} books
                </p>
              </div>
            </div>

            <ChevronRight className="w-4 h-4 text-[#8C837A] group-hover:text-[#C85A2B] shrink-0 transition-colors" />
          </button>
        ))}
      </div>
    </div>
  );
}