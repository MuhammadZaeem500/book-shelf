"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";

interface MyActivityItem {
  id: string;
  action: string;
  title: string;
  author: string;
  rating?: number;
  review?: string;
  timeAgo: string;
  coverGradient: string;
}

interface FriendActivityItem {
  id: string;
  user: {
    name: string;
    initials: string;
    avatarBg: string;
  };
  actionText: string;
  title: string;
  author: string;
  rating?: number;
  review?: string;
  timeAgo: string;
  coverGradient: string;
}

const myActivityList: MyActivityItem[] = [
  {
    id: "m1",
    action: "YOU FINISHED READING",
    title: "Middlemarch",
    author: "George Eliot",
    rating: 5,
    timeAgo: "2 days ago",
    coverGradient: "from-[#8B4513] to-[#5C2E0B]",
  },
  {
    id: "m2",
    action: "YOU REVIEWED",
    title: "Piranesi",
    author: "Susanna Clarke",
    rating: 4,
    review:
      "“A mesmerizing and utterly original novel. Clarke builds a world unlike anything I have read before — eerie, intimate, and strangely beautiful.”",
    timeAgo: "5 days ago",
    coverGradient: "from-[#A53860] to-[#670B2F]",
  },
  {
    id: "m3",
    action: "YOU STARTED READING",
    title: "Dune",
    author: "Frank Herbert",
    timeAgo: "1 week ago",
    coverGradient: "from-[#A65B17] to-[#66350B]",
  },
  {
    id: "m4",
    action: "YOU ADDED TO WANT TO READ",
    title: "Intermezzo",
    author: "Sally Rooney",
    timeAgo: "2 weeks ago",
    coverGradient: "from-[#2C4A6F] to-[#1D324B]",
  },
  {
    id: "m5",
    action: "YOU FINISHED READING",
    title: "The Night Circus",
    author: "Erin Morgenstern",
    rating: 5,
    timeAgo: "2 weeks ago",
    coverGradient: "from-[#1D2A44] to-[#0F172A]",
  },
  {
    id: "m6",
    action: "YOU ADDED TO YOUR LIBRARY",
    title: "Atlas Shrugged",
    author: "Ayn Rand",
    rating: 3,
    timeAgo: "1 month ago",
    coverGradient: "from-[#4A4E57] to-[#2B2D33]",
  },
  {
    id: "m7",
    action: "YOU FINISHED READING",
    title: "Pachinko",
    author: "Min Jin Lee",
    rating: 5,
    timeAgo: "1 month ago",
    coverGradient: "from-[#3B7A32] to-[#1C4217]",
  },
];

const friendsActivityList: FriendActivityItem[] = [
  {
    id: "f1",
    user: { name: "Mia K.", initials: "MK", avatarBg: "#8B4513" },
    actionText: "is reading",
    title: "Dune",
    author: "Frank Herbert",
    timeAgo: "2h ago",
    coverGradient: "from-[#A65B17] to-[#66350B]",
  },
  {
    id: "f2",
    user: { name: "Oliver T.", initials: "OT", avatarBg: "#1D2A44" },
    actionText: "finished reading",
    title: "The Night Circus",
    author: "Erin Morgenstern",
    rating: 5,
    review: "“Absolutely magical. Read it twice in a row.”",
    timeAgo: "Yesterday",
    coverGradient: "from-[#1D2A44] to-[#0F172A]",
  },
  {
    id: "f3",
    user: { name: "Priya S.", initials: "PS", avatarBg: "#2A4B17" },
    actionText: "added to Want to Read",
    title: "James",
    author: "Percival Everett",
    timeAgo: "3h ago",
    coverGradient: "from-[#1F5B83] to-[#123A54]",
  },
  {
    id: "f4",
    user: { name: "James W.", initials: "JW", avatarBg: "#6B2D39" },
    actionText: "reviewed",
    title: "Piranesi",
    author: "Susanna Clarke",
    rating: 5,
    review:
      "“One of the strangest and most captivating books I have ever read.”",
    timeAgo: "2d ago",
    coverGradient: "from-[#A53860] to-[#670B2F]",
  },
  {
    id: "f5",
    user: { name: "Sophie L.", initials: "SL", avatarBg: "#3B1F4A" },
    actionText: "started reading",
    title: "Intermezzo",
    author: "Sally Rooney",
    timeAgo: "5h ago",
    coverGradient: "from-[#2C4A6F] to-[#1D324B]",
  },
  {
    id: "f6",
    user: { name: "Ravi M.", initials: "RM", avatarBg: "#0B253A" },
    actionText: "finished reading",
    title: "The Way of Kings",
    author: "Brandon Sanderson",
    rating: 5,
    timeAgo: "3d ago",
    coverGradient: "from-[#1F5B83] to-[#123A54]",
  },
  {
    id: "f7",
    user: { name: "Oliver T.", initials: "OT", avatarBg: "#1D2A44" },
    actionText: "added to Want to Read",
    title: "Middlemarch",
    author: "George Eliot",
    timeAgo: "4d ago",
    coverGradient: "from-[#8B4513] to-[#5C2E0B]",
  },
];

export default function ActivityPage() {
  const [activeTab, setActiveTab] = useState<"my" | "friends">("my");

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 space-y-6 text-[#1A1817]">
      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1817]">
        Activity
      </h1>

      <div className="p-1 bg-[#EFE8DF]/60 border border-[#E0D8CE] rounded-2xl flex items-center">
        <button
          onClick={() => setActiveTab("my")}
          className={`flex-1 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
            activeTab === "my"
              ? "bg-white text-[#1A1817] shadow-xs"
              : "text-[#736B63] hover:text-[#1A1817]"
          }`}
        >
          My Activity
        </button>
        <button
          onClick={() => setActiveTab("friends")}
          className={`flex-1 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
            activeTab === "friends"
              ? "bg-white text-[#1A1817] shadow-xs border-2 border-[#2B7FFF]"
              : "text-[#736B63] hover:text-[#1A1817]"
          }`}
        >
          Friends&apos; Activity
        </button>
      </div>

      <div className="bg-[#FAF7F2] border border-[#E8E0D5] rounded-3xl overflow-hidden divide-y divide-[#EFE8DF] shadow-sm">
        {activeTab === "my"
          ? myActivityList.map((item) => (
              <div
                key={item.id}
                className="p-4 sm:p-5 flex items-start justify-between gap-4 hover:bg-[#F2EDE5]/40 transition-colors"
              >
                <div className="flex items-start gap-4 min-w-0">
                  <div
                    className={`relative w-12 sm:w-14 h-16 sm:h-20 rounded-md bg-gradient-to-b ${item.coverGradient} p-1.5 flex flex-col justify-between shrink-0 shadow-xs border border-black/10`}
                  >
                    <span className="text-[6px] font-bold tracking-widest text-white/70 uppercase">
                      BS
                    </span>
                    <p className="text-[8px] font-bold text-white leading-tight line-clamp-2">
                      {item.title}
                    </p>
                  </div>

                  <div className="space-y-1 min-w-0 pt-0.5">
                    <span className="text-[10px] font-bold tracking-widest text-[#8C837A] uppercase">
                      {item.action}
                    </span>
                    <h3 className="font-serif font-bold text-base sm:text-lg text-[#1A1817] leading-tight truncate">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#736B63]">{item.author}</p>

                    {item.rating && (
                      <div className="flex items-center gap-0.5 pt-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < item.rating!
                                ? "text-[#C85A2B] fill-[#C85A2B]"
                                : "text-[#E0D8CE] fill-[#E0D8CE]"
                            }`}
                          />
                        ))}
                      </div>
                    )}

                    {item.review && (
                      <p className="text-xs italic text-[#524B45] pt-1 max-w-xl leading-relaxed">
                        {item.review}
                      </p>
                    )}

                    <p className="text-[11px] text-[#8C837A] pt-1">
                      {item.timeAgo}
                    </p>
                  </div>
                </div>
              </div>
            ))
          : /* FRIENDS' ACTIVITY FEED */
            friendsActivityList.map((item) => (
              <div
                key={item.id}
                className="p-4 sm:p-5 flex items-start justify-between gap-4 hover:bg-[#F2EDE5]/40 transition-colors"
              >
                <div className="flex items-start gap-3.5 min-w-0">
                  <div
                    className="w-10 h-10 rounded-full text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-xs"
                    style={{ backgroundColor: item.user.avatarBg }}
                  >
                    {item.user.initials}
                  </div>

                  <div className="space-y-1 min-w-0">
                    <p className="text-sm text-[#1A1817]">
                      <span className="font-bold">{item.user.name}</span>{" "}
                      <span className="text-[#524B45]">{item.actionText}</span>{" "}
                      <span className="font-serif italic font-semibold text-[#1A1817]">
                        {item.title}
                      </span>
                    </p>
                    <p className="text-xs text-[#736B63]">{item.author}</p>

                    {item.rating && (
                      <div className="flex items-center gap-0.5 pt-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < item.rating!
                                ? "text-[#C85A2B] fill-[#C85A2B]"
                                : "text-[#E0D8CE] fill-[#E0D8CE]"
                            }`}
                          />
                        ))}
                      </div>
                    )}

                    {item.review && (
                      <p className="text-xs italic text-[#524B45] pt-1 max-w-xl leading-relaxed">
                        {item.review}
                      </p>
                    )}

                    <p className="text-[11px] text-[#8C837A] pt-1">
                      {item.timeAgo}
                    </p>
                  </div>
                </div>

                <div
                  className={`w-10 sm:w-12 h-14 sm:h-16 rounded-md bg-gradient-to-b ${item.coverGradient} shrink-0 shadow-xs border border-black/10`}
                />
              </div>
            ))}
      </div>
    </div>
  );
}
