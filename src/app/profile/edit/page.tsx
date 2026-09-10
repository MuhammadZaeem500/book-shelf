"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAuth } from "@/src/app/context/AuthContext";
import { fetchApi } from "@/src/app/lib/api";
import { UserProfileData } from "@/src/types";

export default function EditProfilePage() {
  const router = useRouter();
  const { user, token, login } = useAuth();

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    displayName: "",
    username: "",
    bio: "",
    location: "",
    email: "",
  });

  const MAX_BIO_LENGTH = 200;

  useEffect(() => {
    async function loadCurrentProfile() {
      try {
        setFetching(true);

        if (user) {
          setFormData((prev) => ({
            ...prev,
            displayName: user.name || "",
            email: user.email || "",
          }));
        }

        const data = await fetchApi<UserProfileData>("/users/me");

        setFormData({
          displayName: data.name || user?.name || "",
          username:
            data.username || (data.email ? data.email.split("@")[0] : ""),
          bio: data.bio || "",
          location: data.location || "",
          email: data.email || user?.email || "",
        });
      } catch (err) {
        console.error("Failed to load backend profile data:", err);
      } finally {
        setFetching(false);
      }
    }

    loadCurrentProfile();
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    if (name === "bio" && value.length > MAX_BIO_LENGTH) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const updatedUser = await fetchApi<UserProfileData>("/users/me", {
        method: "PATCH",
        body: JSON.stringify({
          name: formData.displayName,
          username: formData.username,
          bio: formData.bio,
          location: formData.location,
          email: formData.email,
        }),
      });

      if (token && user) {
        login(token, {
          ...user,
          name: updatedUser.name || formData.displayName,
          email: updatedUser.email || formData.email,
        });
      }

      router.push("/profile");
    } catch (err: any) {
      setError(err.message || "Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const avatarInitials = (formData.displayName || user?.name || "U")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  if (fetching) {
    return (
      <div className="w-full max-w-3xl mx-auto p-12 text-center text-sm font-semibold text-[#8C837A]">
        Loading profile configuration...
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 text-[#1A1817]">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-xl bg-[#EFE8DF] hover:bg-[#E3DACD] flex items-center justify-center transition-colors text-[#524B45] cursor-pointer"
          aria-label="Go back"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
        </button>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1817]">
          Edit Profile
        </h1>
      </div>

      {error && (
        <div className="p-3 text-xs bg-red-50 text-red-600 border border-red-200 rounded-xl">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-[#FAF7F2] border border-[#E8E0D5] rounded-2xl p-4 sm:p-5 flex items-center gap-4 sm:gap-6 shadow-2xs">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#B85024] flex items-center justify-center text-white font-bold text-xl sm:text-2xl shrink-0">
            {avatarInitials}
          </div>
          <div className="space-y-1.5 flex-1 min-w-0">
            <h3 className="font-bold text-sm text-[#1A1817]">Profile photo</h3>
            <p className="text-xs text-[#8C837A]">
              PNG or JPG, at least 200×200 px
            </p>
            <button
              type="button"
              className="px-3.5 py-1.5 bg-[#EFE8DF] hover:bg-[#E3DACD] text-[#1A1817] text-xs font-semibold rounded-xl transition-colors mt-1 cursor-pointer"
            >
              Change Photo
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-xs font-bold tracking-wider uppercase text-[#B85024]">
            Profile Information
          </h2>
          <div className="bg-[#FAF7F2] border border-[#E8E0D5] rounded-2xl p-4 sm:p-6 space-y-4 shadow-2xs">
            <div className="space-y-1.5">
              <label
                htmlFor="displayName"
                className="block text-xs font-bold text-[#1A1817]"
              >
                Display name
              </label>
              <input
                type="text"
                id="displayName"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-[#EFE8DF]/60 border border-transparent focus:border-[#C85A2B] focus:bg-[#FAF7F2] text-sm text-[#1A1817] focus:outline-none transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="username"
                className="block text-xs font-bold text-[#1A1817]"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-[#EFE8DF]/60 border border-transparent focus:border-[#C85A2B] focus:bg-[#FAF7F2] text-sm text-[#1A1817] focus:outline-none transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="bio"
                className="block text-xs font-bold text-[#1A1817]"
              >
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                rows={3}
                value={formData.bio}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-[#EFE8DF]/60 border border-transparent focus:border-[#C85A2B] focus:bg-[#FAF7F2] text-sm text-[#1A1817] focus:outline-none transition-all resize-none"
              />
              <div className="text-right text-[11px] text-[#8C837A]">
                {formData.bio.length}/{MAX_BIO_LENGTH}
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="location"
                className="block text-xs font-bold text-[#1A1817]"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-[#EFE8DF]/60 border border-transparent focus:border-[#C85A2B] focus:bg-[#FAF7F2] text-sm text-[#1A1817] focus:outline-none transition-all"
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-xs font-bold tracking-wider uppercase text-[#B85024]">
            Account
          </h2>
          <div className="bg-[#FAF7F2] border border-[#E8E0D5] rounded-2xl p-4 sm:p-6 space-y-4 shadow-2xs">
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-xs font-bold text-[#1A1817]"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-[#EFE8DF]/60 border border-transparent focus:border-[#C85A2B] focus:bg-[#FAF7F2] text-sm text-[#1A1817] focus:outline-none transition-all"
              />
            </div>

            <hr className="border-[#E8E0D5] my-2" />
            <Link
              href="auth/change-password"
              className="flex items-center justify-between py-1 text-sm font-semibold text-[#1A1817] hover:text-[#C85A2B] transition-colors"
            >
              <span>Change Password</span>
              <ChevronRight className="w-4 h-4 text-[#8C837A]" />
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-3 px-6 bg-[#B85024] hover:bg-[#A3431D] text-white font-semibold text-sm rounded-xl transition-colors shadow-xs text-center disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Saving Changes..." : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 bg-[#EFE8DF] hover:bg-[#E3DACD] text-[#1A1817] font-semibold text-sm rounded-xl transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>

        <div className="space-y-3 pt-4">
          <h2 className="text-xs font-bold tracking-wider uppercase text-[#B85024]">
            Danger Zone
          </h2>
          <div className="bg-[#FFF5F5] border border-[#FCD3D3] rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <h3 className="font-bold text-sm text-[#1A1817]">
                Delete Account
              </h3>
              <p className="text-xs text-[#736B63]">
                Permanently remove your account and all data.
              </p>
            </div>
            <button
              type="button"
              className="px-4 py-2 border border-[#F87171] text-[#EF4444] hover:bg-[#FEE2E2] font-semibold text-xs rounded-xl transition-colors shrink-0 cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
