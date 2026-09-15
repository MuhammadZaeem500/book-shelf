"use client";

import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { fetchApi } from "@/src/app/lib/api";

export interface RecentReadingItem {
  id: string;
  title: string;
  author: string;
  rating: number;
  dateLabel: string;
  coverGradient: string;
}

export default function RecentReadingSidebarCard() {
  const [items, setItems] = useState<RecentReadingItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecentReading() {
      try {
        setLoading(true);
        const data = await fetchApi<RecentReadingItem[]>("/books/recent?limit=5");
        setItems(data || []);
      } catch (err) {
        console.error("Failed to fetch recent reading books:", err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    }

    fetchRecentReading();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#FAF7F2] border border-[#E8E0D5] rounded-3xl p-5 space-y-4 animate-pulse">
        <div className="h-5 bg-[#EFE8DF] rounded w-1/2" />
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-10 h-14 bg-[#EFE8DF] rounded-md shrink-0" />
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-[#EFE8DF] rounded w-3/4" />
                <div className="h-3 bg-[#EFE8DF] rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-[#FAF7F2] border border-[#E8E0D5] rounded-3xl p-5 text-center space-y-2">
        <h3 className="font-serif font-bold text-xl text-[#1A1817]">Recent Reading</h3>
        <p className="text-xs text-[#736B63]">No finished books yet. Start reading to see history here!</p>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF7F2] border border-[#E8E0D5] rounded-3xl p-5 space-y-4">
      <h3 className="font-serif font-bold text-xl text-[#1A1817]">Recent Reading</h3>

      <div className="space-y-4">
        {items.map((item) => (
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