"use client";

import React, { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { UpdatePasswordModalProps } from "@/src/types";

export default function UpdatePasswordModal({
  isOpen,
  onClose,
  onSave,
}: UpdatePasswordModalProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    setError("");
    setSuccess("");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const token =
        localStorage.getItem("token") || localStorage.getItem("access_token");

      if (!token) {
        setError("Authentication session missing. Please sign in again.");
        setLoading(false);
        return;
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

      const res = await fetch(`${apiUrl}/auth/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        const message = Array.isArray(data.message)
          ? data.message[0]
          : data.message;
        throw new Error(message || `Server error (${res.status})`);
      }

      setSuccess("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        onSave();
        handleClose();
      }, 1200);
    } catch (err: any) {
      setError(err.message || "An error occurred while updating password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md bg-[#FAF7F2] rounded-2xl border border-[#E8DFC8] p-6 shadow-xl relative">
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 text-[#8C837A] hover:text-[#1A1817] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-lg font-bold text-[#1A1817] mb-1">
          Update Password
        </h2>
        <p className="text-xs text-[#8C837A] mb-4">
          Enter your current password and choose a new one.
        </p>

        {error && (
          <div className="p-3 bg-red-50 text-red-600 border border-red-200 text-xs rounded-xl mb-4 font-medium">
            {error}
          </div>
        )}

        {success && (
          <div className="p-3 bg-green-50 text-green-700 border border-green-200 text-xs rounded-xl mb-4 font-medium">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Current Password */}
          <div>
            <label className="block text-xs font-semibold text-[#1A1817] mb-1">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-[#E8DFC8] bg-white text-xs text-[#1A1817] focus:outline-none focus:ring-2 focus:ring-[#C85A2B]/20 focus:border-[#C85A2B] transition-all"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C837A] hover:text-[#1A1817] transition-colors"
                tabIndex={-1}
              >
                {showCurrentPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-xs font-semibold text-[#1A1817] mb-1">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-[#E8DFC8] bg-white text-xs text-[#1A1817] focus:outline-none focus:ring-2 focus:ring-[#C85A2B]/20 focus:border-[#C85A2B] transition-all"
                placeholder="At least 6 characters"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C837A] hover:text-[#1A1817] transition-colors"
                tabIndex={-1}
              >
                {showNewPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-xs font-semibold text-[#1A1817] mb-1">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-[#E8DFC8] bg-white text-xs text-[#1A1817] focus:outline-none focus:ring-2 focus:ring-[#C85A2B]/20 focus:border-[#C85A2B] transition-all"
                placeholder="Repeat new password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C837A] hover:text-[#1A1817] transition-colors"
                tabIndex={-1}
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="w-1/2 py-2.5 rounded-xl text-xs font-semibold text-[#524B45] bg-[#EFE8DF] hover:bg-[#E4DBCF] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-1/2 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#C85A2B] hover:bg-[#B85024] disabled:opacity-50 transition-colors"
            >
              {loading ? "Updating..." : "Save Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
