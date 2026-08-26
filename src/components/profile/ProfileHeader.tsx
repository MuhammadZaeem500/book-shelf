"use client";

import { Edit3, MoreHorizontal } from "lucide-react";
import { ProfileHeaderProps } from "@/src/types";
import { useRouter } from "next/dist/client/components/navigation";

export default function ProfileHeader({
  name = "Alex Johnson",
  handle = "@alexj",
  avatarInitials = "AJ",
  avatarBg = "#A65B17",
  bio = "Avid reader, slow finisher. Literary fiction addict. Always carrying a book I probably won't finish on time.",
  stats = {
    booksRead: 47,
    reading: 1,
    wantToRead: 23,
    reviews: 12,
    friends: 142,
    followers: 89,
    following: 34,
  },
}: ProfileHeaderProps) {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div
          className="w-20 h-20 rounded-2xl text-white font-bold text-2xl flex items-center justify-center shadow-md border border-black/10"
          style={{ backgroundColor: avatarBg }}
        >
          {avatarInitials}
        </div>

        <div className="flex items-center gap-2">
          <button
      type="button"
      onClick={() => router.push("/profile/edit")}
      className="flex items-center gap-1.5 px-4 py-2 bg-[#FAF7F2] border border-[#E0D8CE] rounded-full text-xs font-semibold text-[#1A1817] hover:bg-[#EFE3D8] transition-colors"
    >
      <Edit3 className="w-3.5 h-3.5 text-[#524B45]" />
      Edit Profile
    </button>
          <button
            type="button"
            className="p-2 bg-[#FAF7F2] border border-[#E0D8CE] rounded-full text-[#524B45] hover:bg-[#EFE3D8] transition-colors"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-1.5">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1817]">
          {name}
        </h1>
        <p className="text-xs text-[#8C837A] font-medium">{handle}</p>
        <p className="text-xs sm:text-sm text-[#524B45] max-w-2xl leading-relaxed">
          {bio}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Books Read", value: stats.booksRead },
          { label: "Reading", value: stats.reading },
          { label: "Want to Read", value: stats.wantToRead },
          { label: "Reviews", value: stats.reviews },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-[#FAF7F2] border border-[#E8E0D5] rounded-2xl p-4 text-center space-y-0.5"
          >
            <span className="block font-serif font-bold text-xl sm:text-2xl text-[#1A1817]">
              {stat.value}
            </span>
            <span className="text-[11px] text-[#736B63]">{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 text-xs text-[#736B63]">
        <p>
          <strong className="text-[#1A1817] font-bold">{stats.friends}</strong>{" "}
          Friends
        </p>
        <p>
          <strong className="text-[#1A1817] font-bold">
            {stats.followers}
          </strong>{" "}
          Followers
        </p>
        <p>
          <strong className="text-[#1A1817] font-bold">
            {stats.following}
          </strong>{" "}
          Following
        </p>
      </div>
    </div>
  );
}