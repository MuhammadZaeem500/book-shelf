"use client";

import React, { useState, useEffect } from "react";
import { fetchApi } from "@/src/app/lib/api";

type FollowUser = {
  id: string;
  name: string;
  username?: string;
  mutualCount?: number;
  booksCount?: number;
  isFollowing?: boolean;
};

const AVATAR_COLORS = ["#5C2333", "#0B253A", "#2A4B17", "#6A4C10", "#4B2C5E"];
const STORAGE_KEY = "bookshelf_following_map";

export default function PeopleToFollowCard() {
  const [people, setPeople] = useState<FollowUser[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Initialize state directly from localStorage so reloads don't clear it
  const [followingMap, setFollowingMap] = useState<Record<string, boolean>>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : {};
      } catch {
        return {};
      }
    }
    return {};
  });

  useEffect(() => {
    async function loadSuggestions() {
      try {
        setLoading(true);
        const data = await fetchApi<FollowUser[]>("/users/suggestions");
        setPeople(data || []);
      } catch (err) {
        console.error("Failed to load suggested users:", err);
        setPeople([]);
      } finally {
        setLoading(false);
      }
    }

    loadSuggestions();
  }, []);

  const handleFollowToggle = async (userId: string) => {
    const isCurrentlyFollowing = !!followingMap[userId];
    const newStatus = !isCurrentlyFollowing;

    // 1. Update React state & save to localStorage immediately
    const updatedMap = { ...followingMap, [userId]: newStatus };
    setFollowingMap(updatedMap);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMap));

    // 2. Sync with backend API
    try {
      await fetchApi(
        `/users/${userId}/${isCurrentlyFollowing ? "unfollow" : "follow"}`,
        { method: "POST" }
      );
    } catch (err) {
      console.error("Failed to update follow state on server:", err);
      // Revert on API failure
      const revertedMap = { ...followingMap, [userId]: isCurrentlyFollowing };
      setFollowingMap(revertedMap);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(revertedMap));
    }
  };

  const getInitials = (name: string) =>
    (name || "U")
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  if (loading) {
    return (
      <div className="bg-[#FAF7F2] border border-[#E8E0D5] rounded-3xl p-5 space-y-4 animate-pulse">
        <div className="h-6 bg-[#EFE8DF] rounded w-1/2" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 rounded-full bg-[#EFE8DF] shrink-0" />
                <div className="space-y-1.5 flex-1">
                  <div className="h-3.5 bg-[#EFE8DF] rounded w-3/4" />
                  <div className="h-2.5 bg-[#EFE8DF] rounded w-1/2" />
                </div>
              </div>
              <div className="w-16 h-7 bg-[#EFE8DF] rounded-full shrink-0" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!people.length) {
    return (
      <div className="bg-[#FAF7F2] border border-[#E8E0D5] rounded-3xl p-5 text-center space-y-1">
        <h3 className="font-serif font-bold text-lg text-[#1A1817]">
          People to Follow
        </h3>
        <p className="text-xs text-[#8C837A]">No new user suggestions right now.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF7F2] border border-[#E8E0D5] rounded-3xl p-5 space-y-4">
      <h3 className="font-serif font-bold text-xl text-[#1A1817]">
        People to Follow
      </h3>

      <div className="space-y-4">
        {people.map((person, idx) => {
          const isFollowing = !!followingMap[person.id];
          const bgColor = AVATAR_COLORS[idx % AVATAR_COLORS.length];

          return (
            <div
              key={person.id}
              className="flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="w-10 h-10 rounded-full text-white font-bold text-xs flex items-center justify-center shrink-0"
                  style={{ backgroundColor: bgColor }}
                >
                  {getInitials(person.name)}
                </div>

                <div className="min-w-0">
                  <p className="font-bold text-sm text-[#1A1817] truncate">
                    {person.name}
                  </p>
                  <p className="text-xs text-[#8C837A] truncate">
                    {person.mutualCount ?? 0} mutual · {person.booksCount ?? 0} books
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleFollowToggle(person.id)}
                className={`px-3 py-1 rounded-full border text-xs font-semibold transition-colors shrink-0 cursor-pointer ${
                  isFollowing
                    ? "bg-[#EFE8DF] border-[#E8E0D5] text-[#524B45] hover:bg-[#E3DACD]"
                    : "border-[#C85A2B] text-[#C85A2B] hover:bg-[#C85A2B] hover:text-white"
                }`}
              >
                {isFollowing ? "Following" : "Follow"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}