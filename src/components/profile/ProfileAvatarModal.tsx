"use client";

import React from "react";
import { LogOut, UserPlus, X } from "lucide-react";

interface ProfileAvatarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignOut: () => void;
  onAddAccount: () => void;
  userName?: string;
  userEmail?: string;
}

export default function ProfileAvatarModal({
  isOpen,
  onClose,
  onSignOut,
  onAddAccount,
  userName = "Alex Johnson",
  userEmail = "alex@example.com",
}: ProfileAvatarModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-[#FAF7F2] border border-[#E8E0D5] rounded-2xl p-5 space-y-4 shadow-xl animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E8E0D5]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#A65B17] flex items-center justify-center text-white font-bold text-sm shadow-2xs">
              AJ
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-[#1A1817] truncate">
                {userName}
              </h3>
              <p className="text-xs text-[#736B63] truncate">{userEmail}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#736B63] hover:text-[#1A1817] transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Options */}
        <div className="space-y-2 pt-1">
          <button
            type="button"
            onClick={onAddAccount}
            className="w-full flex items-center gap-3 px-4 py-3 bg-[#F5F0EB] hover:bg-[#EFE8DF] border border-[#E8E0D5] rounded-xl text-xs font-semibold text-[#1A1817] transition-colors cursor-pointer"
          >
            <UserPlus className="w-4 h-4 text-[#C85A2B]" />
            Add another account
          </button>

          <button
            type="button"
            onClick={onSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 bg-[#FFF8F7] hover:bg-[#FEF2F2] border border-[#FCD8D4] rounded-xl text-xs font-semibold text-[#DC2626] transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-[#DC2626]" />
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}