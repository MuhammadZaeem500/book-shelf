"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { ChangeEmailModalProps } from "@/src/types";

export default function ChangeEmailModal({
  isOpen,
  currentEmail,
  onClose,
  onSave,
}: ChangeEmailModalProps) {
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEmail) {
      onSave(newEmail);
      setNewEmail("");
      setPassword("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#FAF7F2] border border-[#E8E0D5] rounded-2xl p-6 space-y-4 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-xl   text-[#1A1817]">
            Change Email Address
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-[#736B63] hover:text-[#1A1817] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-[#736B63]">
          Current email: <span className="font-semibold text-[#1A1817]">{currentEmail}</span>
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs   text-[#1A1817]">
              New Email Address
            </label>
            <input
              type="email"
              required
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="newemail@example.com"
              className="w-full px-4 py-2.5 rounded-xl bg-[#EFE8DF] border border-[#E4DBCF] text-xs text-[#1A1817] focus:outline-none focus:border-[#C85A2B]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs   text-[#1A1817]">
              Current Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-xl bg-[#EFE8DF] border border-[#E4DBCF] text-xs text-[#1A1817] focus:outline-none focus:border-[#C85A2B]"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#E8E0D5]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#736B63] hover:text-[#1A1817]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#B85024] hover:bg-[#A3431D] text-white font-semibold text-xs rounded-xl transition-colors"
            >
              Save Email
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}