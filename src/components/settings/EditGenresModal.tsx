"use client";

import React from "react";
import { Check, X } from "lucide-react";

interface EditGenresModalProps {
  isOpen: boolean;
  allGenres: string[];
  tempGenres: string[];
  onToggleGenre: (genre: string) => void;
  onClose: () => void;
  onSave: () => void;
}

export default function EditGenresModal({
  isOpen,
  allGenres,
  tempGenres,
  onToggleGenre,
  onClose,
  onSave,
}: EditGenresModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#FAF7F2] border border-[#E8E0D5] rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-xl font-bold text-[#1A1817]">
            Edit Preferred Genres
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-[#736B63] hover:text-[#1A1817]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-[#736B63]">
          Select the genres you enjoy reading to personalize your homepage recommendations.
        </p>

        <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto py-2">
          {allGenres.map((genre) => {
            const isSelected = tempGenres.includes(genre);
            return (
              <button
                key={genre}
                type="button"
                onClick={() => onToggleGenre(genre)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isSelected
                    ? "bg-[#C85A2B] text-white shadow-xs"
                    : "bg-[#EFE8DF] text-[#524B45] hover:bg-[#E4DBCF]"
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                {genre}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#E8E0D5]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-[#736B63] hover:text-[#1A1817]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSave}
            className="px-4 py-2 bg-[#B85024] hover:bg-[#A3431D] text-white font-semibold text-xs rounded-xl transition-colors"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}