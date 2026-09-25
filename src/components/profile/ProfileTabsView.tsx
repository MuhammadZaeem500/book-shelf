"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { fetchApi } from "@/src/app/lib/api";
import { BookGridItem, DiaryGroupItem, ReviewItem } from "@/src/types";

export default function ProfileTabsView() {
  const [activeTab, setActiveTab] = useState<"library" | "diary" | "reviews">(
    "library",
  );

  const [favoriteBooks, setFavoriteBooks] = useState<BookGridItem[]>([]);
  const [diaryBooks, setDiaryBooks] = useState<DiaryGroupItem[]>([]);
  const [wantToReadBooks, setWantToReadBooks] = useState<BookGridItem[]>([]);
  const [diaryData, setDiaryData] = useState<DiaryGroupItem[]>([]);
  const [reviewsData, setReviewsData] = useState<ReviewItem[]>([]);

  const [isLoadingFavorites, setIsLoadingFavorites] = useState(true);
  const [isLoadingLibrary, setIsLoadingLibrary] = useState(true);
  const [isLoadingDiary, setIsLoadingDiary] = useState(true);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);

  // Fetch Favorite Books
  useEffect(() => {
    async function loadFavorites() {
      try {
        setIsLoadingFavorites(true);
        const data = await fetchApi<BookGridItem[]>("/users/me/favorites");
        setFavoriteBooks(data || []);
      } catch (err) {
        console.error("Failed to load favorites:", err);
      } finally {
        setIsLoadingFavorites(false);
      }
    }
    loadFavorites();
  }, []);

  // Fetch Library Data using existing endpoints safely
  useEffect(() => {
    async function loadLibraryData() {
      try {
        setIsLoadingLibrary(true);

        // Finished books from diary endpoint
        const diaryRes = await fetchApi<DiaryGroupItem[]>("/users/me/diary");
        setDiaryBooks(Array.isArray(diaryRes) ? diaryRes : []);

        // Want to read books with corrected leading slash and object structure handling
        const wantRes = await fetchApi<any>("/books/want-to-read");
        const booksArray =
          wantRes?.books || (Array.isArray(wantRes) ? wantRes : []);
        setWantToReadBooks(booksArray);
      } catch (err) {
        console.error("Failed to load library shelves:", err);
        setDiaryBooks([]);
        setWantToReadBooks([]);
      } finally {
        setIsLoadingLibrary(false);
      }
    }
    loadLibraryData();
  }, []);

  // Fetch Diary Data for the Diary Tab
  useEffect(() => {
    async function loadDiary() {
      try {
        setIsLoadingDiary(true);
        const data = await fetchApi<DiaryGroupItem[]>("/users/me/diary");
        setDiaryData(data || []);
      } catch (err) {
        console.error("Failed to load diary:", err);
      } finally {
        setIsLoadingDiary(false);
      }
    }
    loadDiary();
  }, []);

  // Fetch Reviews Data
  useEffect(() => {
    async function loadReviews() {
      try {
        setIsLoadingReviews(true);
        const data = await fetchApi<ReviewItem[]>("/users/me/reviews");
        setReviewsData(data || []);
      } catch (err) {
        console.error("Failed to load reviews:", err);
      } finally {
        setIsLoadingReviews(false);
      }
    }
    loadReviews();
  }, []);

  return (
    <div className="space-y-6">
      {/* Favorite Books */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-serif font-bold text-xl text-[#1A1817] dark:text-[#F5F2EB]">
            Favorite Books
          </h3>
          <button className="text-xs font-semibold text-[#C85A2B] hover:underline cursor-pointer">
            Edit →
          </button>
        </div>

        {isLoadingFavorites ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 animate-pulse">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-44 rounded-2xl bg-[#EFE8DF] dark:bg-[#2C2825]"
              />
            ))}
          </div>
        ) : favoriteBooks.length === 0 ? (
          <div className="p-6 bg-[#FAF7F2] dark:bg-[#1A1816] border border-[#E8E0D5] dark:border-[#2C2825] rounded-3xl text-center">
            <p className="text-xs text-[#736B63]">
              No favorite books pinned yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {favoriteBooks.slice(0, 4).map((book) => (
              <div
                key={`fav-${book.id}`}
                className={`relative h-44 rounded-2xl bg-gradient-to-b ${book.coverGradient || "from-[#8B4513] to-[#5C2E0B]"} p-3 flex flex-col justify-between shadow-sm border border-black/10`}
              >
                <span className="text-[9px] font-bold tracking-widest text-white/70 uppercase">
                  BOOKSHELF
                </span>
                <div>
                  <p className="text-xs font-bold text-white leading-tight truncate">
                    {book.title}
                  </p>
                  <p className="text-[10px] text-white/80 truncate">
                    {book.author}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center border-b border-[#EFE8DF] dark:border-[#2C2825] gap-8">
        {(["library", "diary", "reviews"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-semibold capitalize transition-all relative cursor-pointer ${
              activeTab === tab
                ? "text-[#C85A2B]"
                : "text-[#736B63] hover:text-[#1A1817] dark:hover:text-[#F5F2EB]"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#C85A2B] rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Tab 1: Library (Finished books via diary grouped format + Want to Read) */}
      {activeTab === "library" &&
        (isLoadingLibrary ? (
          <div className="space-y-6 animate-pulse">
            <div className="h-40 bg-[#EFE8DF] dark:bg-[#2C2825] rounded-3xl" />
            <div className="h-40 bg-[#EFE8DF] dark:bg-[#2C2825] rounded-3xl" />
          </div>
        ) : (
          <div className="space-y-8">
            {/* Finished Books Section */}
            <div className="space-y-3">
              <h4 className="font-serif font-bold text-lg text-[#1A1817] dark:text-[#F5F2EB]">
                Finished Books
              </h4>
              {diaryBooks.length === 0 ? (
                <p className="text-xs text-[#736B63]">
                  No finished books logged yet.
                </p>
              ) : (
                <div className="space-y-4">
                  {diaryBooks.map((group) => (
                    <div key={group.dateLabel} className="space-y-2">
                      <span className="text-[10px] font-bold tracking-wider text-[#C85A2B] uppercase">
                        {group.dateLabel}
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {group.books.map((book) => (
                          <div key={book.id} className="space-y-1">
                            <div
                              className={`relative h-44 rounded-2xl bg-gradient-to-b ${book.coverGradient || "from-[#1D2A44] to-[#0F172A]"} p-3 flex flex-col justify-between shadow-xs border border-black/10`}
                            >
                              <span className="text-[8px] font-bold tracking-widest text-white/70 uppercase">
                                BOOKSHELF
                              </span>
                              <div>
                                <p className="text-xs font-bold text-white leading-tight truncate">
                                  {book.title}
                                </p>
                                <p className="text-[10px] text-white/80 truncate">
                                  {book.author}
                                </p>
                              </div>
                            </div>
                            <div className="text-xs">
                              <p className="font-bold text-[#1A1817] dark:text-[#F5F2EB] truncate">
                                {book.title}
                              </p>
                              <p className="text-[#736B63] dark:text-[#A89F91] truncate">
                                {book.author}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Want to Read Section */}
            <div className="space-y-3 pt-4 border-t border-[#EFE8DF] dark:border-[#2C2825]">
              <h4 className="font-serif font-bold text-lg text-[#1A1817] dark:text-[#F5F2EB]">
                Want to Read ({wantToReadBooks.length})
              </h4>
              {wantToReadBooks.length === 0 ? (
                <p className="text-xs text-[#736B63]">
                  No wishlist books added yet.
                </p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {wantToReadBooks.map((book, idx) => (
                    <div key={`want-${book.id || idx}`} className="space-y-1">
                      <div
                        className={`relative h-44 rounded-2xl bg-gradient-to-b ${book.coverGradient || "from-[#8B4513] to-[#5C2E0B]"} p-3 flex flex-col justify-between shadow-xs border border-black/10`}
                      >
                        <span className="text-[8px] font-bold tracking-widest text-white/70 uppercase">
                          WISHLIST
                        </span>
                        <div>
                          <p className="text-xs font-bold text-white leading-tight truncate">
                            {book.title}
                          </p>
                          <p className="text-[10px] text-white/80 truncate">
                            {book.author}
                          </p>
                        </div>
                      </div>
                      <div className="text-xs">
                        <p className="font-bold text-[#1A1817] dark:text-[#F5F2EB] truncate">
                          {book.title}
                        </p>
                        <p className="text-[#736B63] dark:text-[#A89F91] truncate">
                          {book.author}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

      {/* Tab 2: Diary */}
      {activeTab === "diary" &&
        (isLoadingDiary ? (
          <div className="space-y-4 animate-pulse">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-24 bg-[#EFE8DF] dark:bg-[#2C2825] rounded-2xl"
              />
            ))}
          </div>
        ) : diaryData.length === 0 ? (
          <div className="p-8 text-center bg-[#FAF7F2] dark:bg-[#1A1816] border border-[#E8E0D5] dark:border-[#2C2825] rounded-3xl">
            <p className="text-xs text-[#736B63]">
              No reading diary entries found.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {diaryData.map((group) => (
              <div key={group.dateLabel} className="space-y-3">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold tracking-wider text-[#C85A2B] uppercase shrink-0">
                    {group.dateLabel}
                  </span>
                  <div className="h-[1px] w-full bg-[#EFE8DF] dark:bg-[#2C2825]" />
                </div>

                {group.books.map((b) => (
                  <div
                    key={b.id}
                    className="flex items-start gap-4 p-3 bg-[#FAF7F2] dark:bg-[#1A1816] border border-[#E8E0D5] dark:border-[#2C2825] rounded-2xl"
                  >
                    <div
                      className={`w-14 h-20 rounded-lg bg-gradient-to-b ${b.coverGradient} shrink-0 p-2 flex flex-col justify-between`}
                    >
                      <span className="text-[6px] font-bold text-white/70">
                        BOOKSHELF
                      </span>
                      <p className="text-[8px] font-bold text-white leading-tight truncate">
                        {b.title}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-serif font-bold text-base text-[#1A1817] dark:text-[#F5F2EB]">
                        {b.title}
                      </h4>
                      <p className="text-xs text-[#736B63] dark:text-[#A89F91]">
                        {b.author}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-[#8C837A] pt-1">
                        <div className="flex text-[#C85A2B]">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${i < b.rating ? "fill-[#C85A2B]" : "text-[#E0D8CE]"}`}
                            />
                          ))}
                        </div>
                        <span>· {b.pages} pages</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}

      {/* Tab 3: Reviews */}
      {activeTab === "reviews" &&
        (isLoadingReviews ? (
          <div className="space-y-4 animate-pulse">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-32 bg-[#EFE8DF] dark:bg-[#2C2825] rounded-3xl"
              />
            ))}
          </div>
        ) : reviewsData.length === 0 ? (
          <div className="p-8 text-center bg-[#FAF7F2] dark:bg-[#1A1816] border border-[#E8E0D5] dark:border-[#2C2825] rounded-3xl">
            <p className="text-xs text-[#736B63]">No reviews logged yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviewsData.map((rev) => (
              <div
                key={rev.id}
                className="p-5 bg-[#FAF7F2] dark:bg-[#1A1816] border border-[#E8E0D5] dark:border-[#2C2825] rounded-3xl space-y-3"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-14 rounded-md bg-gradient-to-b ${rev.coverGradient} shrink-0`}
                    />
                    <div>
                      <h4 className="font-serif font-bold text-base text-[#1A1817] dark:text-[#F5F2EB]">
                        {rev.title}
                      </h4>
                      <p className="text-xs text-[#736B63] dark:text-[#A89F91]">
                        {rev.author}
                      </p>
                      <div className="flex text-[#C85A2B] pt-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${i < rev.rating ? "fill-[#C85A2B]" : "text-[#E0D8CE]"}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-[#8C837A]">
                    {rev.dateLabel}
                  </span>
                </div>
                <p className="text-xs italic text-[#524B45] dark:text-[#C5BCB3] leading-relaxed">
                  {rev.reviewText}
                </p>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
}
