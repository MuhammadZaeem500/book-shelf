"use client";

import { useState } from "react";
import { Book } from "lucide-react";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FAF7F2] border-b border-[#EFE8DF] px-4 py-3 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div className="flex items-center justify-between w-full sm:w-auto gap-4">
          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-[#C85A2B] text-white p-2 rounded-xl">
              <Book className="w-5 h-5" />
            </div>
            <span className="font-serif font-bold text-xl text-[#1A1817]">
              Bookshelf
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0 sm:hidden">
            <button
              type="button"
              className="relative p-2.5 rounded-full bg-[#F2EAE0]/80 hover:bg-[#EFE3D8] text-[#524B45] transition-colors focus:outline-none"
              aria-label="Notifications"
            >
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#C85A2B] rounded-full ring-2 ring-[#FBF8F3]" />
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>

            <button
              type="button"
              className="w-10 h-10 rounded-full bg-[#C85A2B] text-white font-bold flex items-center justify-center text-sm shadow-sm hover:opacity-90 transition-opacity focus:outline-none ring-2 ring-[#F2EAE0]"
            >
              AJ
            </button>
          </div>
        </div>

        <div className="relative w-full sm:flex-1 sm:max-w-md sm:mx-2">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#8C837A]">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search books, authors, or ISBN..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#F2EAE0]/70 border border-[#E8DFC8]/60 rounded-2xl text-sm text-[#1A1817] placeholder-[#A0958B] focus:outline-none focus:ring-2 focus:ring-[#C85A2B]/40 focus:border-[#C85A2B] transition-all"
          />
        </div>

        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <button
            type="button"
            className="relative p-2.5 rounded-full bg-[#F2EAE0]/80 hover:bg-[#EFE3D8] text-[#524B45] transition-colors focus:outline-none"
            aria-label="Notifications"
          >
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#C85A2B] rounded-full ring-2 ring-[#FBF8F3]" />
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>

          <button
            type="button"
            className="w-10 h-10 rounded-full bg-[#C85A2B] text-white font-bold flex items-center justify-center text-sm shadow-sm hover:opacity-90 transition-opacity focus:outline-none ring-2 ring-[#F2EAE0]"
          >
            AJ
          </button>
        </div>
      </div>
    </header>
  );
}
