"use client";

import Image from "next/image";
import { useState } from "react";
import { Trash2, Plus, Bookmark } from "lucide-react";
import { WantToReadProps, WantToReadBook } from "@/src/types";

interface EnhancedWantToReadProps extends WantToReadProps {
  isLoading?: boolean;
  onBookClick?: (id: string) => void;
  onRemoveBook?: (id: string) => Promise<void> | void;
  onAddClick?: () => void;
}

export default function WantToReadCard({
  totalCount,
  books,
  isLoading = false,
  onSeeAll,
  onBookClick,
  onRemoveBook,
  onAddClick,
}: EnhancedWantToReadProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleRemove = async (e: React.MouseEvent, bookId: string) => {
    e.stopPropagation();
    if (deletingId || !onRemoveBook) return;

    setDeletingId(bookId);
    try {
      await onRemoveBook(bookId);
    } finally {
      setDeletingId(null);
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
      {books.length === 0 ? (
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
        <div className="space-y-3">
          {books.map((book) => (
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

              {/* Quick Delete Option */}
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
      {totalCount > 0 && (
        <div className="pt-1 text-center border-t border-[#E8E0D5]">
          <button
            type="button"
            onClick={onSeeAll}
            className="text-xs font-semibold text-[#C85A2B] hover:underline cursor-pointer"
          >
            See all {totalCount} books →
          </button>
        </div>
      )}
    </div>
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

  // Safe fallback gradient if none is passed in
  const safeGradient =
    fallbackGradient || "from-[#8B4513] to-[#5C2E0B]";

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