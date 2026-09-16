"use client";

import { useState, useEffect } from "react";
import BooksCard from "@/src/components/home/BooksCard";
import ContinueReadingCard from "@/src/components/home/ContinueReadingCard";
import FriendActivityCard from "@/src/components/home/FriendActivityCard";
import RecommendedBookCard from "@/src/components/home/RecommendedBookCard";
import { fetchApi } from "@/src/app/lib/api";
import {
  PopularBook,
  ActivityApiResponse,
} from "@/src/types";

const coverGradients = [
  "linear-gradient(135deg, #B25A00, #4A2000)",
  "linear-gradient(135deg, #182848, #4B6CB7)",
  "linear-gradient(135deg, #3A7BD5, #3A6073)",
  "linear-gradient(135deg, #8E2DE2, #4A00E0)",
  "linear-gradient(135deg, #2C3E50, #000000)",
  "linear-gradient(135deg, #D4145A, #FBB03B)",
];

const avatarColors = [
  "#8C4611",
  "#2B546A",
  "#2A4B17",
  "#5C1D2E",
  "#341352",
  "#9E2A2B",
];

export default function Home() {
  const [currentlyReading, setCurrentlyReading] = useState<any>(null);
  const [popularBooks, setPopularBooks] = useState<PopularBook[]>([]);
  const [friendsActivity, setFriendsActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      const [readingRes, popularRes, activityRes] = await Promise.allSettled([
        fetchApi<any>("/users/me/currently-reading"), // Updated to user-specific active reading endpoint
        fetchApi<PopularBook[]>("/reviews/popular?limit=8"),
        fetchApi<ActivityApiResponse>("/activity-feed?limit=10&page=1"),
      ]);

      if (readingRes.status === "fulfilled" && readingRes.value) {
        setCurrentlyReading(readingRes.value);
      } else {
        setCurrentlyReading(null);
      }

      if (
        popularRes.status === "fulfilled" &&
        Array.isArray(popularRes.value)
      ) {
        setPopularBooks(popularRes.value);
      }

      if (activityRes.status === "fulfilled" && activityRes.value?.data) {
        const rawActivities = activityRes.value.data;

        const formattedFriends = rawActivities.map((act, index) => {
          const initials = act.user?.name
            ? act.user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)
            : act.user?.email
              ? act.user.email[0].toUpperCase()
              : "U";

          let actionText: "is reading" | "finished" | "added to library" =
            "is reading";
          if (act.type === "LOGGED_BOOK" || act.type === "REVIEW_ADDED")
            actionText = "finished";
          if (act.type === "BECAME_FRIENDS") actionText = "added to library";

          return {
            initials,
            avatarBg: avatarColors[index % avatarColors.length],
            name: act.user?.name || act.user?.email || "Anonymous",
            action: actionText,
            bookTitle: act.metadata?.title || "Untitled Book",
            rating: act.metadata?.rating,
            timeAgo: formatTimeAgo(act.createdAt),
            coverBg: coverGradients[index % coverGradients.length],
          };
        });

        setFriendsActivity(formattedFriends);
      }
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

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

  const handleAddRecommended = async (bookTitle: string) => {
    try {
      await fetchApi("/reviews/log", {
        method: "POST",
        body: JSON.stringify({
          title: bookTitle,
          status: "WANT_TO_READ",
        }),
      });
      alert(`Added "${bookTitle}" to your Want to Read shelf!`);
      loadDashboardData();
    } catch (err: any) {
      console.error("Failed to add book:", err);
      alert(err.message || "Failed to add book to library.");
    }
  };

  return (
    <div className="p-6 space-y-8 max-w-auto mx-auto bg-[#FFFFFF] relative">
      {/* 1. Continue Reading Section (Fully Dynamic) */}
      {currentlyReading ? (
        <ContinueReadingCard
          bookId={currentlyReading.book?.id}
          title={currentlyReading.book?.title || "Currently Reading"}
          author={currentlyReading.book?.author || "Unknown Author"}
          description={
            currentlyReading.book?.description ||
            "Keep up your reading momentum!"
          }
          currentPage={currentlyReading.currentPage || 0}
          totalPages={currentlyReading.totalPages || 300}
          onProgressUpdated={loadDashboardData}
        />
      ) : (
        !loading && (
          <div className="bg-[#FAF7F2] border border-[#EFE8DF] p-6 rounded-3xl text-center space-y-2">
            <h3 className="font-serif font-bold text-lg text-[#1A1817]">
              No active book right now
            </h3>
            <p className="text-xs text-[#8C837A]">
              Explore popular titles below or update a book's status to start tracking.
            </p>
          </div>
        )
      )}

      {/* 2. Popular This Week Section */}
      <section>
        <h2 className="text-2xl font-bold text-[#1C1510]">Popular This Week</h2>
        <p className="text-sm text-[#6B5D4F] mb-6">
          Trending across your network
        </p>

        {loading ? (
          <div className="flex gap-5 overflow-x-auto pb-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="shrink-0 w-48 h-64 bg-[#FAF7F2] animate-pulse rounded-2xl"
              />
            ))}
          </div>
        ) : popularBooks.length === 0 ? (
          <p className="text-xs text-[#8C837A]">No popular books found.</p>
        ) : (
          <div className="flex md:grid md:grid-cols-4 gap-5 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-thin">
            {popularBooks.map((card, index) => (
              <div
                key={card.id || index}
                className="shrink-0 w-50 sm:w-62.5 md:w-auto snap-center flex flex-col gap-2"
              >
                <BooksCard
                  imageSrc={card.coverUrl || "/next.svg"}
                  imageAlt={card.title}
                  title={card.title}
                  author={card.author}
                />

                <div className="text-sm">
                  <p className="font-semibold text-[#1C1510] truncate">
                    {card.title}
                  </p>
                  <p className="text-[#6B5D4F] text-xs truncate">
                    By {card.author}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 3. Main Grid: Friends Reading & Recommended */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Friends Activity */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-2xl text-[#1A1817]">
              Friends Reading
            </h3>
            <button className="text-sm font-medium text-[#C85A2B] hover:underline flex items-center gap-1 cursor-pointer">
              See all →
            </button>
          </div>

          <div className="bg-[#FAF7F2] border border-[#EFE8DF] rounded-3xl overflow-hidden shadow-sm">
            {loading ? (
              <div className="p-8 text-center text-sm text-[#8C837A]">
                Loading friend activities...
              </div>
            ) : friendsActivity.length === 0 ? (
              <div className="p-8 text-center text-sm text-[#8C837A]">
                No recent friend activity.
              </div>
            ) : (
              friendsActivity.map((friend, index) => (
                <FriendActivityCard key={index} {...friend} />
              ))
            )}

            <div className="p-4 bg-[#FAF7F2] border-t border-[#EFE8DF] text-center">
              <button className="text-sm font-medium text-[#C85A2B] hover:underline cursor-pointer">
                View all activity →
              </button>
            </div>
          </div>
        </section>

        {/* Recommended Books Section */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-2xl text-[#1A1817]">
                Recommended for You
              </h3>
              <p className="text-xs text-[#8C837A]">Based on popular reads</p>
            </div>
            <button className="text-sm font-medium text-[#C85A2B] hover:underline flex items-center gap-1 cursor-pointer">
              See all →
            </button>
          </div>

          <div className="space-y-3">
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-20 bg-[#FAF7F2] animate-pulse rounded-2xl"
                  />
                ))}
              </div>
            ) : popularBooks.length === 0 ? (
              <p className="text-xs text-[#8C837A]">
                No recommendations available right now.
              </p>
            ) : (
              popularBooks.slice(0, 5).map((book, index) => (
                <RecommendedBookCard
                  key={book.id || index}
                  title={book.title}
                  author={book.author}
                  rating={book.rating || 4}
                  coverBg={coverGradients[index % coverGradients.length]}
                  onAdd={() => handleAddRecommended(book.title)}
                />
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}