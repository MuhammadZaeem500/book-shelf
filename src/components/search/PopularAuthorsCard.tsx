"use client";

import React, { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { PopularAuthorsCardProps, Book } from "@/src/types";
import { fetchApi } from "@/src/app/lib/api";

interface AuthorItem {
  name: string;
  booksCount: number;
  initials: string;
  bg: string;
}

const AVATAR_COLORS = [
  "#2C3E50",
  "#7B3F00",
  "#1B4F72",
  "#4A235A",
  "#145A32",
  "#78281F",
];

export default function PopularAuthorsCard({
  authors: initialAuthors,
  onSelectAuthor,
}: PopularAuthorsCardProps) {
  const [authors, setAuthors] = useState<AuthorItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal & Action State
  const [selectedAuthor, setSelectedAuthor] = useState<AuthorItem | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [addingBookId, setAddingBookId] = useState<string | null>(null);
  const [addedBookIds, setAddedBookIds] = useState<Set<string>>(new Set());

  // Fetch all books dynamically to compute exact author book counts
  useEffect(() => {
    const loadDynamicAuthors = async () => {
      try {
        const response = await fetchApi<any>("/books/search");
        const allBooks = Array.isArray(response) ? response : response?.data || [];

        // Count books per author dynamically
        const authorMap: Record<string, number> = {};
        allBooks.forEach((book: Book) => {
          if (book.author) {
            const authorName = book.author.trim();
            authorMap[authorName] = (authorMap[authorName] || 0) + 1;
          }
        });

        // Map counted authors into the component card structure
        const dynamicAuthors: AuthorItem[] = Object.keys(authorMap).map((name, index) => {
          const nameParts = name.split(" ");
          const initials =
            nameParts.length > 1
              ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase()
              : name.substring(0, 2).toUpperCase();

          return {
            name,
            booksCount: authorMap[name],
            initials,
            bg: AVATAR_COLORS[index % AVATAR_COLORS.length],
          };
        });

        setAuthors(dynamicAuthors);
      } catch (err) {
        console.error("Failed to load dynamic authors:", err);
        setAuthors([]);
      } finally {
        setLoading(false);
      }
    };

    loadDynamicAuthors();
  }, []);

  const handleAuthorClick = async (author: AuthorItem) => {
    setSelectedAuthor(author);
    setIsModalLoading(true);

    if (onSelectAuthor) {
      onSelectAuthor(author);
    }

    try {
      const response = await fetchApi<any>(
        `/books/search?author=${encodeURIComponent(author.name)}`
      );
      const bookList = Array.isArray(response) ? response : response?.data || [];
      setBooks(bookList);
    } catch (err) {
      console.error("Failed to fetch books for author:", err);
      setBooks([]);
    } finally {
      setIsModalLoading(false);
    }
  };

  const handleAddToBookshelf = async (book: Book) => {
    setAddingBookId(book.id);
    try {
      await fetchApi("/books/add", {
        method: "POST",
        body: JSON.stringify({
          title: book.title,
          author: book.author,
          isbn: book.isbn,
          coverImage: book.coverImage,
          genre: book.genre,
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
    setSelectedAuthor(null);
    setBooks([]);
  };

  if (loading) {
    return (
      <div className="bg-[#FAF7F2] border border-[#E8E0D5] rounded-3xl p-5 space-y-4 animate-pulse shadow-2xs">
        <div className="h-6 bg-[#EFE8DF] rounded-md w-1/3" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 bg-[#EFE8DF] rounded-2xl w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (authors.length === 0) {
    return null;
  }

  return (
    <>
      <div className="bg-[#FAF7F2] border border-[#E8E0D5] rounded-3xl p-5 space-y-4 shadow-2xs">
        <h3 className="font-serif font-bold text-xl text-[#1A1817]">
          Popular Authors
        </h3>

        <div className="space-y-3">
          {authors.map((author, index) => (
            <button
              key={index}
              onClick={() => handleAuthorClick(author)}
              className="w-full flex items-center justify-between p-1 text-left rounded-2xl hover:bg-[#EFE8DF]/50 transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="w-10 h-10 rounded-full text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs"
                  style={{ backgroundColor: author.bg }}
                >
                  {author.initials}
                </div>

                <div className="min-w-0">
                  <p className="font-bold text-sm text-[#1A1817] truncate group-hover:text-[#C85A2B] transition-colors">
                    {author.name}
                  </p>
                  <p className="text-xs text-[#8C837A] truncate">
                    {author.booksCount} {author.booksCount === 1 ? "book" : "books"}
                  </p>
                </div>
              </div>

              <ChevronRight className="w-4 h-4 text-[#8C837A] group-hover:text-[#C85A2B] shrink-0 transition-colors" />
            </button>
          ))}
        </div>
      </div>

      {/* Author Books Modal */}
      {selectedAuthor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-[#FAF7F2] border border-[#E8E0D5] rounded-3xl max-w-lg w-full max-h-[80vh] flex flex-col shadow-xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-[#EFE8DF]">
              <div>
                <h2 className="font-serif font-bold text-2xl text-[#1A1817]">
                  {selectedAuthor.name}
                </h2>
                <p className="text-xs text-[#8C837A]">
                  Books written by {selectedAuthor.name}
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
                              {book.genre || "General"}
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
                  No books found for <strong>{selectedAuthor.name}</strong>.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}