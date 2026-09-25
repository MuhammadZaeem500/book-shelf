"use client";

import Image from "next/image";
import { useState } from "react";
import { Trash2, Plus, Bookmark, X, Loader2 } from "lucide-react";
import { EnhancedWantToReadProps } from "@/src/types";
import { fetchApi } from "@/src/app/lib/api";

export default function WantToReadCard({
  totalCount,
  books: initialBooks,
  isLoading = false,
  onBookClick,
  onRemoveBook,
  onAddClick,
}: EnhancedWantToReadProps) {
  const [books, setBooks] = useState<any[]>(initialBooks);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loadingAll, setLoadingAll] = useState<boolean>(false);

  const handleRemove = async (e: React.MouseEvent, bookId: string) => {
    e.stopPropagation();
    if (deletingId || !onRemoveBook) return;

    setDeletingId(bookId);
    try {
      await onRemoveBook(bookId);
      setBooks((prev) => prev.filter((b) => b.id !== bookId));
    } finally {
      setDeletingId(null);
    }
  };

  const handleSeeAllClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalOpen(true);

    try {
      setLoadingAll(true);
      const res = await fetchApi<any>("/books/want-to-read?limit=100");
      if (res && Array.isArray(res.books)) {
        setBooks(res.books);
      }
    } catch (err) {
      console.error("Failed to fetch full wishlist:", err);
    } finally {
      setLoadingAll(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-[#FAF7F2] border border-[#E8E0D5] rounded-3xl p-5 space-y-4 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="h-6 w-28 bg-[#E8E0D5] rounded-md" />
          <div className="h-4 w-12 bg-[#E8E0D5] rounded-md" />
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-10 h-14 bg-[#E8E0D5] rounded-md shrink-0" />
              <div className="space-y-2 flex-1">
                <div className="h-4 w-3/4 bg-[#E8E0D5] rounded-md" />
                <div className="h-3 w-1/2 bg-[#E8E0D5] rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-[#FAF7F2] border border-[#E8E0D5] rounded-3xl p-5 space-y-4 shadow-xs">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-[#C85A2B]" />
            <h3 className="font-serif font-bold text-xl text-[#1A1817]">
              Want to Read
            </h3>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-[#EFE8DF] text-[#C85A2B] rounded-full">
            {totalCount} {totalCount === 1 ? "book" : "books"}
          </span>
        </div>

        {/* Book List / Empty State */}
        {initialBooks.length === 0 ? (
          <div className="py-8 px-4 text-center space-y-3 bg-[#F5F0EB] rounded-2xl border border-dashed border-[#E0D8CE]">
            <p className="text-sm font-medium text-[#736B63]">
              Your reading list is empty.
            </p>
            <p className="text-xs text-[#A1988E]">
              Save books you want to read next!
            </p>
            {onAddClick && (
              <button
                type="button"
                onClick={onAddClick}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#C85A2B] hover:bg-[#b04d23] text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Add First Book
              </button>
            )}
          </div>
        ) : (
          <div className="max-h-64 overflow-y-auto space-y-3 pr-1 scrollbar-thin scrollbar-thumb-[#E0D8CE] scrollbar-track-transparent">
            {initialBooks.slice(0, 3).map((book) => (
              <div
                key={book.id}
                onClick={() => onBookClick?.(book.id)}
                className={`flex items-center justify-between gap-3 p-2 rounded-xl transition-all group cursor-pointer hover:bg-[#F2ECE4] ${
                  deletingId === book.id ? "opacity-40 pointer-events-none" : ""
                }`}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <BookCover
                    coverUrl={book.coverUrl}
                    fallbackGradient={book.coverGradient}
                    title={book.title}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-serif font-bold text-sm text-[#1A1817] truncate group-hover:text-[#C85A2B] transition-colors">
                      {book.title}
                    </p>
                    <p className="text-xs text-[#736B63] truncate">{book.author}</p>
                  </div>
                </div>

                {onRemoveBook && (
                  <button
                    type="button"
                    onClick={(e) => handleRemove(e, book.id)}
                    title="Remove from Want to Read"
                    className="p-1.5 text-[#A1988E] hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100 shrink-0 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Footer link */}
        {totalCount > 3 && (
          <div className="pt-1 text-center border-t border-[#E8E0D5]">
            <button
              type="button"
              onClick={handleSeeAllClick}
              className="text-xs font-semibold text-[#C85A2B] hover:underline cursor-pointer"
            >
              See all {totalCount} books →
            </button>
          </div>
        )}
      </div>

      {/* Complete List Modal / Drawer with Scrollbar */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-xl flex flex-col max-h-[75vh] min-h-[350px]">
            <div className="flex items-center justify-between border-b pb-3 border-gray-100 shrink-0">
              <div className="flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-[#C85A2B]" />
                <h3 className="font-serif font-bold text-xl text-[#1A1817]">
                  Want to Read Wishlist ({totalCount})
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Book List Container */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 divide-y divide-gray-100 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
              {loadingAll ? (
                <div className="flex flex-col items-center justify-center py-24 space-y-2">
                  <Loader2 className="w-6 h-6 animate-spin text-[#C85A2B]" />
                  <p className="text-xs text-gray-400">Loading all books...</p>
                </div>
              ) : books.length === 0 ? (
                <p className="text-center text-xs text-gray-400 py-12">
                  No books found in your wishlist.
                </p>
              ) : (
                books.map((book) => (
                  <div
                    key={`modal-${book.id}`}
                    className="pt-3 flex items-center justify-between gap-4 first:pt-0"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <BookCover
                        coverUrl={book.coverUrl}
                        fallbackGradient={book.coverGradient}
                        title={book.title}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="font-serif font-bold text-sm text-[#1A1817] truncate">
                          {book.title}
                        </p>
                        <p className="text-xs text-gray-500 truncate">{book.author}</p>
                      </div>
                    </div>

                    {onRemoveBook && (
                      <button
                        type="button"
                        onClick={(e) => handleRemove(e, book.id)}
                        title="Remove from Want to Read"
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors shrink-0 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function BookCover({
  coverUrl,
  fallbackGradient,
  title,
}: {
  coverUrl?: string | null;
  fallbackGradient?: string;
  title: string;
}) {
  const [imageError, setImageError] = useState(false);
  const safeGradient = fallbackGradient || "from-[#8B4513] to-[#5C2E0B]";

  if (coverUrl && !imageError) {
    return (
      <div className="w-10 h-14 relative rounded-md overflow-hidden shrink-0 shadow-2xs border border-black/10">
        <Image
          src={coverUrl}
          alt={title}
          fill
          className="object-cover"
          onError={() => setImageError(true)}
        />
      </div>
    );
  }

  return (
    <div
      className={`w-10 h-14 rounded-md bg-linear-to-b ${safeGradient} shrink-0 shadow-2xs border border-black/10`}
    />
  );
}