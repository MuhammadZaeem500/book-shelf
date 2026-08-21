import React from "react";
import Image from "next/image";

export interface FriendActivityProps {
  initials: string;
  avatarBg: string;
  name: string;
  action: "is reading" | "finished" | "added to library";
  bookTitle: string;
  rating?: number;
  timeAgo: string;
  coverBg: string;
}

export default function FriendActivityCard({
  initials,
  avatarBg,
  name,
  action,
  bookTitle,
  rating,
  timeAgo,
  coverBg,
}: FriendActivityProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-[#EFE8DF] last:border-b-0 hover:bg-[#F9F5F0]/50 transition-colors">
      <div className="flex items-center gap-3">
        {/* User Initials Avatar */}
        <div
          className="w-10 h-10 rounded-full text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-sm"
          style={{ backgroundColor: avatarBg }}
        >
          {initials}
        </div>

        {/* Text Details */}
        <div className="space-y-0.5">
          <p className="text-sm text-[#1A1817]">
            <span className="font-bold">{name}</span>{" "}
            <span className="text-[#6B5D4F] font-normal">{action}</span>
          </p>
          <p className="font-serif italic text-sm text-[#1A1817]">{bookTitle}</p>

          <div className="flex items-center gap-2 pt-0.5">
            {rating && (
              <div className="flex items-center text-[#C85A2B] text-xs">
                {"★".repeat(rating)}
                {"☆".repeat(5 - rating)}
              </div>
            )}
            <span className="text-xs text-[#8C837A]">{timeAgo}</span>
          </div>
        </div>
      </div>

      <div
        className="w-10 h-14 rounded-lg shrink-0 flex items-end p-1 shadow-sm overflow-hidden"
        style={{ background: coverBg }}
      >
        <span className="text-[8px] font-serif text-white/90 font-bold truncate leading-none">
          {bookTitle}
        </span>
      </div>
    </div>
  );
}