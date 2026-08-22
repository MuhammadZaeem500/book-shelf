"use client";

import React from "react";

const peopleToFollow = [
  {
    initials: "ER",
    bg: "#5C2333",
    name: "Elena R.",
    mutual: 4,
    books: 23,
  },
  {
    initials: "KM",
    bg: "#0B253A",
    name: "Kai M.",
    mutual: 2,
    books: 38,
  },
  {
    initials: "LJ",
    bg: "#2A4B17",
    name: "Layla J.",
    mutual: 6,
    books: 15,
  },
];

const genres = [
  "Literary Fiction",
  "Sci-Fi",
  "Historical",
  "Fantasy",
  "Mystery",
  "Biography",
  "Romance",
];

export default function RightSidebar() {
  return (
    <aside className="w-80 shrink-0 p-4 space-y-5 hidden xl:block bg-[#F2EDE5]">
      <div className="bg-[#FAF7F2] border border-[#E8E0D5] rounded-3xl p-5 space-y-4 ">
        <h3 className="font-serif font-bold text-xl text-[#1A1817]">
          Your Reading Stats
        </h3>

        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-[#6B5D4F]">Books read</span>
            <div>
              <span className="font-bold text-[#1A1817] text-base mr-1">
                47
              </span>
              <span className="text-xs text-[#8C837A]">this year</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#6B5D4F]">Pages read</span>
            <div>
              <span className="font-bold text-[#1A1817] text-base mr-1">
                14,832
              </span>
              <span className="text-xs text-[#8C837A]">lifetime</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#6B5D4F]">Reading streak</span>
            <div>
              <span className="font-bold text-[#1A1817] text-base mr-1">
                12 days
              </span>
              <span className="text-xs text-[#8C837A]">current</span>
            </div>
          </div>
        </div>

        <hr className="border-[#EFE8DF]" />

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#6B5D4F] font-medium">Reading goal</span>
            <span className="font-bold text-[#C85A2B]">47 / 60</span>
          </div>

          <div className="w-full h-2.5 bg-[#EFE8DF] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#C85A2B] rounded-full transition-all duration-300"
              style={{ width: `${(47 / 60) * 100}%` }}
            />
          </div>

          <p className="text-xs text-[#8C837A]">
            13 more books to hit your 2026 goal
          </p>
        </div>
      </div>

      <div className="bg-[#FAF7F2] border border-[#E8E0D5] rounded-3xl p-5 space-y-4">
        <h3 className="font-serif font-bold text-xl text-[#1A1817]">
          People to Follow
        </h3>

        <div className="space-y-4">
          {peopleToFollow.map((person) => (
            <div
              key={person.name}
              className="flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full text-white font-bold text-xs flex items-center justify-center shrink-0"
                  style={{ backgroundColor: person.bg }}
                >
                  {person.initials}
                </div>

                <div className="min-w-0">
                  <p className="font-bold text-sm text-[#1A1817] truncate">
                    {person.name}
                  </p>
                  <p className="text-xs text-[#8C837A] truncate">
                    {person.mutual} mutual · {person.books} books
                  </p>
                </div>
              </div>

              <button className="px-3 py-1 rounded-full border border-[#C85A2B] text-[#C85A2B] text-xs font-semibold hover:bg-[#C85A2B] hover:text-white transition-colors shrink-0">
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#FAF7F2] border border-[#EFE8DF] rounded-3xl p-5 space-y-4">
        <h3 className="font-serif font-bold text-xl text-[#1A1817]">
          Browse by Genre
        </h3>

        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <button
              key={genre}
              className="px-3.5 py-1.5 rounded-full border border-[#E0D8CE] bg-white/60 text-[#524B45] text-xs font-medium hover:bg-[#EFE3D8] hover:text-[#C85A2B] hover:border-[#C85A2B] transition-colors"
            >
              {genre}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
