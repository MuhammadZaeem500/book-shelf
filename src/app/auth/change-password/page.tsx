"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Eye, EyeOff, Lock } from "lucide-react";
import { fetchApi } from "@/src/app/lib/api";

export default function ChangePasswordPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (formData.newPassword !== formData.confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    if (formData.newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      await fetchApi("/users/change-password", {
        method: "POST",
        body: JSON.stringify({
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        }),
      });

      setSuccess("Password changed successfully!");
      setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
      setTimeout(() => router.push("/profile"), 1500);
    } catch (err: any) {
      setError(err.message || "Failed to change password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 text-[#1A1817]">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="w-10 h-10 rounded-xl bg-[#EFE8DF] hover:bg-[#E3DACD] flex items-center justify-center transition-colors text-[#524B45] cursor-pointer"
          aria-label="Go back"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
        </button>
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1817]">
            Change Password
          </h1>
          <p className="text-xs text-[#736B63]">
            Update your password to keep your account secure.
          </p>
        </div>
      </div>

      {error && (
        <div className="p-3 text-xs bg-red-50 text-red-600 border border-red-200 rounded-xl">
          {error}
        </div>
      )}

      {success && (
        <div className="p-3 text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl font-medium">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-[#FAF7F2] border border-[#E8E0D5] rounded-2xl p-4 sm:p-6 space-y-5 shadow-2xs">
          {/* Div 1: Old Password */}
          <div className="space-y-1.5">
            <label
              htmlFor="oldPassword"
              className="block text-xs font-bold text-[#1A1817]"
            >
              Old Password
            </label>
            <div className="relative">
              <input
                type={showOldPassword ? "text" : "password"}
                id="oldPassword"
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                placeholder="Enter current password"
                required
                className="w-full px-4 py-3 rounded-xl bg-[#EFE8DF]/60 border border-transparent focus:border-[#C85A2B] focus:bg-[#FAF7F2] text-sm text-[#1A1817] focus:outline-none transition-all pr-11"
              />
              <button
                type="button"
                onClick={() => setShowOldPassword(!showOldPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#736B63] hover:text-[#1A1817] transition-colors cursor-pointer"
              >
                {showOldPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Div 2: New Password */}
          <div className="space-y-1.5">
            <label
              htmlFor="newPassword"
              className="block text-xs font-bold text-[#1A1817]"
            >
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
                required
                className="w-full px-4 py-3 rounded-xl bg-[#EFE8DF]/60 border border-transparent focus:border-[#C85A2B] focus:bg-[#FAF7F2] text-sm text-[#1A1817] focus:outline-none transition-all pr-11"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#736B63] hover:text-[#1A1817] transition-colors cursor-pointer"
              >
                {showNewPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Div 3: Confirm New Password */}
          <div className="space-y-1.5">
            <label
              htmlFor="confirmPassword"
              className="block text-xs font-bold text-[#1A1817]"
            >
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                required
                className="w-full px-4 py-3 rounded-xl bg-[#EFE8DF]/60 border border-transparent focus:border-[#C85A2B] focus:bg-[#FAF7F2] text-sm text-[#1A1817] focus:outline-none transition-all pr-11"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#736B63] hover:text-[#1A1817] transition-colors cursor-pointer"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-3 px-6 bg-[#B85024] hover:bg-[#A3431D] text-white font-semibold text-sm rounded-xl transition-colors shadow-xs text-center disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 bg-[#EFE8DF] hover:bg-[#E3DACD] text-[#1A1817] font-semibold text-sm rounded-xl transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}