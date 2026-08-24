"use client";

import React from "react";
import { Star } from "lucide-react";

export interface RecentReadingItem {
  id: string;
  title: string;
  author: string;
  rating: number;
  dateLabel: string;
  coverGradient: string;
}

const recentReadingItems: RecentReadingItem[] = [
  { id: "1", title: "Middlemarch", author: "George Eliot", rating: 5, dateLabel: "Aug 17", coverGradient: "from-[#8B4513] to-[#5C2E0B]" },
  { id: "2", title: "Piranesi", author: "Susanna Clarke", rating: 4, dateLabel: "Aug 12", coverGradient: "from-[#A53860] to-[#670B2F]" },
  { id: "3", title: "The Night Circus", author: "Erin Morgenstern", rating: 5, dateLabel: "Aug 12", coverGradient: "from-[#1D2A44] to-[#0F172A]" },
  { id: "4", title: "Annihilation", author: "Jeff VanderMeer", rating: 4, dateLabel: "Aug 3", coverGradient: "from-[#1E4620] to-[#0D280E]" },
  { id: "5", title: "Pachinko", author: "Min Jin Lee", rating: 5, dateLabel: "Jul 28", coverGradient: "from-[#3B7A32] to-[#1C4217]" },
  { id: "6", title: "Lessons in Chemistry", author: "Bonnie Garmus", rating: 4, dateLabel: "Jul 14", coverGradient: "from-[#1F5B83] to-[#123A54]" },
];

export default function RecentReadingSidebarCard() {
  return (
    <div className="bg-[#FAF7F2] border border-[#E8E0D5] rounded-3xl p-5 space-y-4">
      <h3 className="font-serif font-bold text-xl text-[#1A1817]">Recent Reading</h3>

      <div className="space-y-4">
        {recentReadingItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className={`w-10 h-14 rounded-md bg-gradient-to-b ${item.coverGradient} shrink-0 border border-black/10`} />
              <div className="min-w-0">
                <p className="font-serif font-bold text-sm text-[#1A1817] truncate">{item.title}</p>
                <p className="text-xs text-[#736B63] truncate">{item.author}</p>
                <div className="flex text-[#C85A2B] pt-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < item.rating ? "fill-[#C85A2B]" : "text-[#E0D8CE]"}`} />
                  ))}
                </div>
              </div>
            </div>
            <span className="text-[11px] text-[#8C837A] shrink-0">{item.dateLabel}</span>
          </div>
        ))}
      </div>
    </div>
  );
}   