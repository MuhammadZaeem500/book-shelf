"use client";

import { useState, useEffect } from "react";
import BooksCard from "@/src/components/home/BooksCard";
import ContinueReadingCard from "@/src/components/home/ContinueReadingCard";
import FriendActivityCard from "@/src/components/home/FriendActivityCard";
import RecommendedBookCard from "@/src/components/home/RecommendedBookCard";
import { fetchApi } from "@/src/app/lib/api";
import { PopularBook, ActivityApiResponse } from "@/src/types";

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
  const [recommendedBooks, setRecommendedBooks] = useState<any[]>([]);
  const [friendsActivity, setFriendsActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Toggle state for See All recommendations
  const [showAllRecommended, setShowAllRecommended] = useState<boolean>(false);

  // States for database books modal
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [databaseBooks, setDatabaseBooks] = useState<any[]>([]);
  const [loadingBooks, setLoadingBooks] = useState<boolean>(false);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      const [readingRes, popularRes, activityRes, recommendedRes] =
        await Promise.allSettled([
          fetchApi<any>("/users/me/currently-reading"),
          fetchApi<PopularBook[]>("/reviews/popular?limit=8"),
          fetchApi<ActivityApiResponse>("/activities?limit=10&page=1"),
          fetchApi<any[]>("/books/recommended"),
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

      if (
        recommendedRes.status === "fulfilled" &&
        Array.isArray(recommendedRes.value)
      ) {
        setRecommendedBooks(recommendedRes.value);
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

  const handleOpenDatabaseBooks = async () => {
    setIsSearchOpen(true);
    try {
      setLoadingBooks(true);
      const response = await fetchApi<any>("/books/search?limit=50");
      const booksList = Array.isArray(response)
        ? response
        : response?.data || [];
      setDatabaseBooks(booksList);
    } catch (err) {
      console.error("Failed to fetch database books:", err);
    } finally {
      setLoadingBooks(false);
    }
  };

  const handleSelectBook = async (book: {
    id: string;
    title: string;
    author: string;
  }) => {
    try {
      await fetchApi(`/users/me/books/${book.id}/status`, {
        method: "PATCH",
        body: JSON.stringify({
          status: "READING",
        }),
      });
      alert(`Set "${book.title}" as your currently reading book!`);
      setIsSearchOpen(false);
      loadDashboardData();
    } catch (err: any) {
      console.error("Failed to set active book:", err);
      alert(err.message || "Failed to add active book.");
    }
  };

  const displayedRecommendations = showAllRecommended
    ? recommendedBooks
    : recommendedBooks.slice(0, 4);

  return (
    <div className="p-6 space-y-8 max-w-auto mx-auto bg-[#FFFFFF] relative">
      {/* 1. Continue Reading Section / Add Trigger */}
      {currentlyReading ? (
        <ContinueReadingCard
          bookId={currentlyReading.book?.id}
          title={currentlyReading.book?.title || "Currently Reading"}
          author={currentlyReading.book?.author || "Unknown Author"}
          description={
            currentlyReading.book?.description || currentlyReading.book?.genre
              ? `Genre: ${currentlyReading.book.genre}`
              : "Keep up your reading momentum!"
          }
          currentPage={currentlyReading.currentPage || 0}
          totalPages={currentlyReading.totalPages || 300}
          onProgressUpdated={loadDashboardData}
        />
      ) : (
        !loading && (
          <div className="bg-[#FAF7F2] border border-[#EFE8DF] p-8 rounded-3xl text-center space-y-4">
            <h3 className="font-serif font-bold text-xl text-[#1A1817]">
              No active book right now
            </h3>
            <p className="text-xs text-[#8C837A] max-w-sm mx-auto">
              Track your daily reading progress by picking a book from your
              database collection.
            </p>
            <button
              onClick={handleOpenDatabaseBooks}
              className="px-5 py-2.5 bg-[#C85A2B] text-white text-sm font-semibold rounded-2xl hover:bg-[#b04d22] transition-colors cursor-pointer"
            >
              + Add Active Book
            </button>
          </div>
        )
      )}

      {/* Database Books Selection Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 max-h-[85vh] flex flex-col shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-xl text-[#1A1817]">
                Select from Database Books
              </h3>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="text-gray-400 hover:text-gray-600 font-bold text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 divide-y divide-gray-100 pr-1">
              {loadingBooks ? (
                <p className="text-center text-xs text-gray-400 py-8">
                  Loading database books...
                </p>
              ) : databaseBooks.length === 0 ? (
                <p className="text-center text-xs text-gray-400 py-8">
                  No books found in the database.
                </p>
              ) : (
                databaseBooks.map((book) => (
                  <div
                    key={book.id}
                    className="pt-3 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      {book.coverImage ? (
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="w-10 h-14 object-cover rounded-md shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-14 bg-gray-200 rounded-md shrink-0 flex items-center justify-center text-[10px] text-gray-500">
                          No cover
                        </div>
                      )}
                      <div className="truncate">
                        <p className="text-sm font-semibold text-[#1A1817] truncate">
                          {book.title}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {book.author}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        handleSelectBook({
                          id: book.id,
                          title: book.title,
                          author: book.author,
                        })
                      }
                      className="px-3 py-1.5 bg-[#FAF7F2] border border-[#E8E0D5] text-xs font-semibold text-[#C85A2B] rounded-lg hover:bg-[#C85A2B] hover:text-white transition-colors shrink-0 cursor-pointer"
                    >
                      Start Reading
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
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
              <p className="text-xs text-[#8C837A]">From your database</p>
            </div>
            <button
              onClick={() => setShowAllRecommended(!showAllRecommended)}
              className="text-sm font-medium text-[#C85A2B] hover:underline flex items-center gap-1 cursor-pointer"
            >
              {showAllRecommended ? "Show less" : "See all"} →
            </button>
          </div>

          <div className="space-y-3">
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-20 bg-[#FAF7F2] animate-pulse rounded-2xl"
                  />
                ))}
              </div>
            ) : recommendedBooks.length === 0 ? (
              <p className="text-xs text-[#8C837A]">
                No new recommendations available from database.
              </p>
            ) : (
              displayedRecommendations.map((book, index) => (
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
