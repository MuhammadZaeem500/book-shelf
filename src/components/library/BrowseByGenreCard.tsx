"use client";

import React, { useEffect, useState } from "react";
import { fetchApi } from "@/src/app/lib/api";
import { BrowseByGenreCardProps, Book } from "@/src/types";


const DEFAULT_GENRES = [
  "Fiction",
  "Non-Fiction",
  "Sci-Fi",
  "Fantasy",
  "Mystery",
  "Thriller",
  "Romance",
  "History",
  "Biography",
  "Self-Help",
];

export default function BrowseByGenreCard({
  genres: initialGenres,
  onSelectGenre,
}: BrowseByGenreCardProps) {
  const [genres, setGenres] = useState<string[]>(initialGenres || []);
  const [loading, setLoading] = useState(!initialGenres);

  // Modal & Action State
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [addingBookId, setAddingBookId] = useState<string | null>(null);
  const [addedBookIds, setAddedBookIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (initialGenres) return;

    const loadGenres = async () => {
      try {
        const data = await fetchApi<string[]>("/books/genres");
        if (data && data.length > 0) {
          setGenres(data);
        } else {
          setGenres(DEFAULT_GENRES);
        }
      } catch (err) {
        console.error("Failed to load backend genres, using fallbacks:", err);
        setGenres(DEFAULT_GENRES);
      } finally {
        setLoading(false);
      }
    };

    loadGenres();
  }, [initialGenres]);

  const handleGenreClick = async (genre: string) => {
    setSelectedGenre(genre);
    setIsModalLoading(true);

    if (onSelectGenre) {
      onSelectGenre(genre);
    }

    try {
      const results = await fetchApi<Book[]>(
        `/books/search?genre=${encodeURIComponent(genre)}`
      );
      setBooks(results || []);
    } catch (err) {
      console.error("Failed to fetch books for genre:", err);
      setBooks([]);
    } finally {
      setIsModalLoading(false);
    }
  };

  const handleAddToBookshelf = async (book: Book) => {
    setAddingBookId(book.id);
    try {
      await fetchApi("/books", {
        method: "POST",
        body: JSON.stringify({
          title: book.title,
          author: book.author,
          isbn: book.isbn,
          coverImage: book.coverImage,
          genre: book.genre || selectedGenre,
          status: "WANT_TO_READ",
        }),
      });

      setAddedBookIds((prev) => new Set(prev).add(book.id));
    } catch (err) {
      console.error("Failed to add book to bookshelf:", err);
    } finally {
      setAddingBookId(null);
    }
  };

  const closeModal = () => {
    setSelectedGenre(null);
    setBooks([]);
  };

  return (
    <>
      <div className="bg-[#FAF7F2] border border-[#EFE8DF] rounded-3xl p-5 space-y-4 shadow-2xs">
        <h3 className="font-serif font-bold text-xl text-[#1A1817]">
          Browse by Genre
        </h3>

        {loading ? (
          <div className="flex flex-wrap gap-2 animate-pulse">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-7 w-16 bg-[#EFE8DF] rounded-full"
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => handleGenreClick(genre)}
                className="px-3.5 py-1.5 rounded-full border border-[#E0D8CE] bg-white/60 text-[#524B45] text-xs font-medium hover:bg-[#EFE3D8] hover:text-[#C85A2B] hover:border-[#C85A2B] transition-colors cursor-pointer"
              >
                {genre}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Genre Books Modal */}
      {selectedGenre && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-[#FAF7F2] border border-[#E8E0D5] rounded-3xl max-w-lg w-full max-h-[80vh] flex flex-col shadow-xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-[#EFE8DF]">
              <div>
                <h2 className="font-serif font-bold text-2xl text-[#1A1817]">
                  {selectedGenre}
                </h2>
                <p className="text-xs text-[#8C837A]">
                  Books categorized under {selectedGenre}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-[#EFE8DF] text-[#524B45] hover:bg-[#E0D8CE] transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 overflow-y-auto space-y-4 flex-1">
              {isModalLoading ? (
                <div className="space-y-3 animate-pulse">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-16 bg-[#EFE8DF] rounded-2xl w-full"
                    />
                  ))}
                </div>
              ) : books.length > 0 ? (
                <div className="space-y-3">
                  {books.map((book) => {
                    const isAdded = addedBookIds.has(book.id);
                    const isAdding = addingBookId === book.id;

                    return (
                      <div
                        key={book.id}
                        className="flex items-center justify-between gap-4 p-3 bg-white/80 border border-[#E0D8CE] rounded-2xl hover:border-[#C85A2B] transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {book.coverImage ? (
                            <img
                              src={book.coverImage}
                              alt={book.title}
                              className="w-12 h-16 object-cover rounded-md shrink-0"
                            />
                          ) : (
                            <div className="w-12 h-16 bg-[#EFE8DF] rounded-md flex items-center justify-center text-xs text-[#8C837A] font-serif font-bold shrink-0">
                              📖
                            </div>
                          )}
                          <div>
                            <h4 className="font-serif font-bold text-[#1A1817] text-base">
                              {book.title}
                            </h4>
                            <p className="text-xs text-[#6B5D4F]">
                              by {book.author}
                            </p>
                          </div>
                        </div>

                        {/* Action Button */}
                        <button
                          onClick={() => handleAddToBookshelf(book)}
                          disabled={isAdded || isAdding}
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-colors cursor-pointer ${
                            isAdded
                              ? "bg-green-100 text-green-700 border border-green-300"
                              : "bg-[#C85A2B] text-white hover:bg-[#A84820] disabled:opacity-50"
                          }`}
                        >
                          {isAdding
                            ? "Adding..."
                            : isAdded
                            ? "✓ Saved"
                            : "+ Add to Shelf"}
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-8 text-center text-[#8C837A] text-sm">
                  No books found under <strong>{selectedGenre}</strong>.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}