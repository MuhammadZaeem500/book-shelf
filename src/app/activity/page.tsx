"use client";

import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { fetchApi } from "@/src/app/lib/api";
import { ActivityItem, ActivityApiResponse } from "@/src/types";

const coverGradients = [
  "from-[#8B4513] to-[#5C2E0B]",
  "from-[#A53860] to-[#670B2F]",
  "from-[#A65B17] to-[#66350B]",
  "from-[#2C4A6F] to-[#1D324B]",
  "from-[#1D2A44] to-[#0F172A]",
  "from-[#3B7A32] to-[#1C4217]",
];

export default function ActivityPage() {
  const [activeTab, setActiveTab] = useState<"my" | "friends">("my");
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    async function loadFeed() {
      try {
        setLoading(true);
        const token = localStorage.getItem("access_token");

        if (token) {
          try {
            const payloadBase64 = token.split(".")[1];
            const decoded = JSON.parse(atob(payloadBase64));
            setCurrentUserId(decoded.sub || decoded.userId || decoded.id);
          } catch (e) {
            console.error("Error decoding token:", e);
          }
        }

       const res = await fetchApi<ActivityApiResponse>("/activity-feed?limit=20&page=1");
        setActivities(res?.data || []);
      } catch (err) {
        console.error("Failed to fetch activity feed:", err);
      } finally {
        setLoading(false);
      }
    }

    loadFeed();
  }, []);

  const filteredActivities = activities.filter((item) => {
    if (activeTab === "my") {
      return item.userId === currentUserId;
    }
    return item.userId !== currentUserId;
  });

  const formatActionText = (type: string, isMy: boolean) => {
    switch (type) {
      case "BECAME_FRIENDS":
        return isMy
          ? "YOU CONNECTED WITH A NEW FRIEND"
          : "connected with a new friend";
      case "REVIEW_ADDED":
        return isMy ? "YOU REVIEWED" : "reviewed";
      case "LOGGED_BOOK":
        return isMy ? "YOU FINISHED READING" : "finished reading";
      default:
        return isMy ? "UPDATED ACTIVITY" : "updated activity";
    }
  };

  const getGradient = (index: number) => {
    return coverGradients[index % coverGradients.length];
  };

  const getInitials = (name?: string, email?: string) => {
    if (name) {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    return email ? email[0].toUpperCase() : "U";
  };

  const formatTimeAgo = (dateString: string) => {
    const diffInSeconds = Math.floor(
      (new Date().getTime() - new Date(dateString).getTime()) / 1000,
    );
    if (diffInSeconds < 3600)
      return `${Math.max(1, Math.floor(diffInSeconds / 60))}m ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 space-y-6 text-[#1A1817]">
      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1817]">
        Activity
      </h1>

      {/* Tab Controls */}
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
              ? "bg-white text-[#1A1817] shadow-xs"
              : "text-[#736B63] hover:text-[#1A1817]"
          }`}
        >
          Friends&apos; Activity
        </button>
      </div>

      {/* Activity List Container */}
      <div className="bg-[#FAF7F2] border border-[#E8E0D5] rounded-3xl overflow-hidden divide-y divide-[#EFE8DF] shadow-sm min-h-50">
        {loading ? (
          <div className="p-12 text-center text-sm text-[#8C837A]">
            Loading activities...
          </div>
        ) : filteredActivities.length === 0 ? (
          <div className="p-12 text-center text-sm text-[#8C837A]">
            {activeTab === "my"
              ? "You haven't posted any activity yet."
              : "No recent activity from your friends."}
          </div>
        ) : (
          filteredActivities.map((item, index) => {
            const title = item.metadata?.title || "Untitled Book";
            const author = item.metadata?.author || "Unknown Author";
            const rating = item.metadata?.rating;
            const review = item.metadata?.review;
            const gradient = getGradient(index);

            return activeTab === "my" ? (
              /* MY ACTIVITY ITEM */
              <div
                key={item.id}
                className="p-4 sm:p-5 flex items-start justify-between gap-4 hover:bg-[#F2EDE5]/40 transition-colors"
              >
                <div className="flex items-start gap-4 min-w-0">
                  <div
                    className={`relative w-12 sm:w-14 h-16 sm:h-20 rounded-md bg-linear-to-b ${gradient} p-1.5 flex flex-col justify-between shrink-0 shadow-xs border border-black/10`}
                  >
                    <span className="text-[6px] font-bold tracking-widest text-white/70 uppercase">
                      BS
                    </span>
                    <p className="text-[8px] font-bold text-white leading-tight line-clamp-2">
                      {title}
                    </p>
                  </div>

                  <div className="space-y-1 min-w-0 pt-0.5">
                    <span className="text-[10px] font-bold tracking-widest text-[#8C837A] uppercase">
                      {formatActionText(item.type, true)}
                    </span>
                    <h3 className="font-serif font-bold text-base sm:text-lg text-[#1A1817] leading-tight truncate">
                      {title}
                    </h3>
                    {author && (
                      <p className="text-xs text-[#736B63]">{author}</p>
                    )}

                    {rating && (
                      <div className="flex items-center gap-0.5 pt-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < rating
                                ? "text-[#C85A2B] fill-[#C85A2B]"
                                : "text-[#E0D8CE] fill-[#E0D8CE]"
                            }`}
                          />
                        ))}
                      </div>
                    )}

                    {review && (
                      <p className="text-xs italic text-[#524B45] pt-1 max-w-xl leading-relaxed">
                        &ldquo;{review}&rdquo;
                      </p>
                    )}

                    <p className="text-[11px] text-[#8C837A] pt-1">
                      {formatTimeAgo(item.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              /* FRIENDS' ACTIVITY ITEM */
              <div
                key={item.id}
                className="p-4 sm:p-5 flex items-start justify-between gap-4 hover:bg-[#F2EDE5]/40 transition-colors"
              >
                <div className="flex items-start gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-[#8B4513] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    {getInitials(item.user.name, item.user.email)}
                  </div>

                  <div className="space-y-1 min-w-0">
                    <p className="text-sm text-[#1A1817]">
                      <span className="font-bold">
                        {item.user.name || item.user.email}
                      </span>{" "}
                      <span className="text-[#524B45]">
                        {formatActionText(item.type, false)}
                      </span>{" "}
                      {item.type !== "BECAME_FRIENDS" && (
                        <span className="font-serif italic font-semibold text-[#1A1817]">
                          {title}
                        </span>
                      )}
                    </p>
                    {item.type !== "BECAME_FRIENDS" && author && (
                      <p className="text-xs text-[#736B63]">{author}</p>
                    )}

                    {rating && (
                      <div className="flex items-center gap-0.5 pt-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < rating
                                ? "text-[#C85A2B] fill-[#C85A2B]"
                                : "text-[#E0D8CE] fill-[#E0D8CE]"
                            }`}
                          />
                        ))}
                      </div>
                    )}

                    {review && (
                      <p className="text-xs italic text-[#524B45] pt-1 max-w-xl leading-relaxed">
                        &ldquo;{review}&rdquo;
                      </p>
                    )}

                    <p className="text-[11px] text-[#8C837A] pt-1">
                      {formatTimeAgo(item.createdAt)}
                    </p>
                  </div>
                </div>

                {item.type !== "BECAME_FRIENDS" && (
                  <div
                    className={`w-10 sm:w-12 h-14 sm:h-16 rounded-md bg-linear-to-b ${gradient} shrink-0 shadow-xs border border-black/10`}
                  />
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
