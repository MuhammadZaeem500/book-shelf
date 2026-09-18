"use client";

import { useState } from "react";
import { AddBookModalProps } from "@/src/types";

export default function AddBookModal({
  isOpen,
  onClose,
  onBookAdded,
}: AddBookModalProps) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("Self-Help");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !author) {
      setError("Title and author are required.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/books/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          author,
          genre,
          status: "WANT_TO_READ",
        }),
      });

      if (res.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
      }

      if (!res.ok) {
        throw new Error("Failed to add book to reading list.");
      }

      // Reset form state & notify parent
      setTitle("");
      setAuthor("");
      onBookAdded();
      onClose();
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-[#FAF7F2] border border-[#E8E0D5] rounded-3xl p-6 w-full max-w-md space-y-5 shadow-xl">
        <div className="flex items-center justify-between border-b border-[#E8E0D5] pb-3">
          <h2 className="font-serif font-bold text-xl text-[#1A1817]">
            Add Book to Want to Read
          </h2>
          <button
            onClick={onClose}
            className="text-[#736B63] hover:text-[#1A1817] font-semibold text-sm"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="p-3 text-xs bg-red-50 text-red-600 rounded-xl border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#736B63] mb-1">
              Book Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Clear Thinking"
              className="w-full bg-white border border-[#E8E0D5] rounded-xl px-3 py-2 text-sm text-[#1A1817] focus:outline-hidden focus:border-[#C85A2B]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#736B63] mb-1">
              Author *
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="e.g. Shane Parrish"
              className="w-full bg-white border border-[#E8E0D5] rounded-xl px-3 py-2 text-sm text-[#1A1817] focus:outline-hidden focus:border-[#C85A2B]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#736B63] mb-1">
              Genre
            </label>
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full bg-white border border-[#E8E0D5] rounded-xl px-3 py-2 text-sm text-[#1A1817] focus:outline-hidden focus:border-[#C85A2B]"
            >
              <option value="Self-Help">Self-Help</option>
              <option value="Fiction">Fiction</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Biography">Biography</option>
              <option value="Technology">Technology</option>
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-[#E8E0D5] text-[#736B63] rounded-xl text-xs font-semibold hover:bg-[#F2ECE4] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-[#C85A2B] text-white rounded-xl text-xs font-semibold hover:bg-[#b04d23] disabled:opacity-50 transition-colors"
            >
              {isSubmitting ? "Adding..." : "Add Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}