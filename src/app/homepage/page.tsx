"use client";

import { useState, useEffect } from "react";
import BooksCard from "@/src/components/home/BooksCard";
import ContinueReadingCard from "@/src/components/home/ContinueReadingCard";
import FriendActivityCard from "@/src/components/home/FriendActivityCard";
import RecommendedBookCard from "@/src/components/home/RecommendedBookCard";
import { fetchApi } from "@/src/app/lib/api";
import {
  CurrentlyReading,
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

const defaultPopularBooks = [
  { id: "1", title: "Middlemarch", author: "George Eliot" },
  { id: "2", title: "Piranesi", author: "Susanna Clarke" },
  { id: "3", title: "Dune", author: "Frank Herbert" },
  { id: "4", title: "Pachinko", author: "Min Jin Lee" },
];

const defaultRecommended = [
  {
    id: "1",
    title: "The Night Circus",
    author: "Erin Morgenstern",
    rating: 4,
    coverBg: "linear-gradient(135deg, #0F2027, #203A43, #2C5364)",
  },
  {
    id: "2",
    title: "Pachinko",
    author: "Min Jin Lee",
    rating: 4,
    coverBg: "linear-gradient(135deg, #11998E, #38EF7D)",
  },
  {
    id: "3",
    title: "Piranesi",
    author: "Susanna Clarke",
    rating: 4,
    coverBg: "linear-gradient(135deg, #8A2387, #E94057, #F27121)",
  },
];

export default function Home() {
  const [currentlyReading, setCurrentlyReading] =
    useState<CurrentlyReading | null>(null);
  const [popularBooks, setPopularBooks] = useState<PopularBook[]>([]);
  const [friendsActivity, setFriendsActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      const [readingRes, popularRes, activityRes] = await Promise.allSettled([
        fetchApi<CurrentlyReading>("/reviews/currently-reading"),
        fetchApi<PopularBook[]>("/reviews/popular?limit=8"),
        fetchApi<ActivityApiResponse>("/activity-feed?limit=10&page=1"),
      ]);

      if (readingRes.status === "fulfilled" && readingRes.value) {
        setCurrentlyReading(readingRes.value);
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
          const initials = act.user.name
            ? act.user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)
            : act.user.email
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
            name: act.user.name || act.user.email,
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
      return `${Math.max(1, Math.floor(diffInSeconds / 60))}h ago`;
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
    } catch (err) {
      console.error("Failed to add book:", err);
    }
  };

  return (
    <div className="h-screen overflow-y-auto p-6 space-y-8 max-w-auto mx-auto bg-[#FFFFFF] pb-24 lg:pb-8 relative [scrollbar-color:#C85A2B_#FAF7F2] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#FAF7F2] [&::-webkit-scrollbar-thumb]:bg-[#C85A2B] [&::-webkit-scrollbar-thumb]:rounded-full">
      <ContinueReadingCard
        title={currentlyReading?.book?.title || "Atomic Habits"}
        author={currentlyReading?.book?.author || "James Clear"}
        description="Build better habits and routines that stick with small, consistent changes."
        currentPage={currentlyReading?.currentPage || 32}
        totalPages={currentlyReading?.totalPages || 320}
      />

      {/* 2. Popular This Week Section */}
      <section>
        <h2 className="text-2xl font-bold text-[#1C1510]">Popular This Week</h2>
        <p className="text-sm text-[#6B5D4F] mb-6">
          Trending across your network
        </p>

        <div className="flex md:grid md:grid-cols-4 gap-5 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-thin">
          {(popularBooks.length > 0 ? popularBooks : defaultPopularBooks).map(
            (card, index) => (
              <div
                key={card.id || index}
                className="shrink-0 w-50 sm:w-62.5 md:w-auto snap-center flex flex-col gap-2"
              >
                <BooksCard
                  imageSrc="/next.svg"
                  imageAlt={card.title}
                  title={card.title}
                  author={card.author}
                />

                <div className="text-sm">
                  <p className="font-semibold text-[#1C1510]">{card.title}</p>
                  <p className="text-[#6B5D4F] text-xs">By {card.author}</p>
                </div>
              </div>
            ),
          )}
        </div>
      </section>

      {/* 3. Main Grid: Friends Reading & Recommended */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Friends Activity */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-2xl text-[#1A1817]">
              Friends Reading
            </h3>
            <button className="text-sm font-medium text-[#C85A2B] hover:underline flex items-center gap-1">
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
              <button className="text-sm font-medium text-[#C85A2B] hover:underline">
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
            <button className="text-sm font-medium text-[#C85A2B] hover:underline flex items-center gap-1">
              See all →
            </button>
          </div>

          <div className="space-y-3">
            {(popularBooks.length > 0
              ? popularBooks.slice(0, 5)
              : defaultRecommended
            ).map((book, index) => (
              <RecommendedBookCard
                key={book.id || index}
                title={book.title}
                author={book.author}
                rating={book.rating || 4}
                coverBg={coverGradients[index % coverGradients.length]}
                onAdd={() => handleAddRecommended(book.title)}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
