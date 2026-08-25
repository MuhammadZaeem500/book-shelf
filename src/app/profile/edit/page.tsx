"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function EditProfilePage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    displayName: "Alex Johnson",
    username: "alexj",
    bio: "Avid reader, slow finisher. Literary fiction addict. Always carrying a book I probably won't finish on time.",
    location: "New York, NY",
    email: "alex@example.com",
  });

  const MAX_BIO_LENGTH = 200;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "bio" && value.length > MAX_BIO_LENGTH) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profile updated:", formData);
    // Redirect back to profile after saving
    router.push("/profile");
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 text-[#1A1817]">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-xl bg-[#EFE8DF] hover:bg-[#E3DACD] flex items-center justify-center transition-colors text-[#524B45]"
          aria-label="Go back"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
        </button>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1817]">
          Edit Profile
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-[#FAF7F2] border border-[#E8E0D5] rounded-2xl p-4 sm:p-5 flex items-center gap-4 sm:gap-6 shadow-2xs">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#B85024] flex items-center justify-center text-white font-bold text-xl sm:text-2xl shrink-0">
            AJ
          </div>
          <div className="space-y-1.5 flex-1 min-w-0">
            <h3 className="font-bold text-sm text-[#1A1817]">Profile photo</h3>
            <p className="text-xs text-[#8C837A]">
              PNG or JPG, at least 200×200 px
            </p>
            <button
              type="button"
              className="px-3.5 py-1.5 bg-[#EFE8DF] hover:bg-[#E3DACD] text-[#1A1817] text-xs font-semibold rounded-xl transition-colors mt-1"
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
              href="/change-password"
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
            className="flex-1 py-3 px-6 bg-[#B85024] hover:bg-[#A3431D] text-white font-semibold text-sm rounded-xl transition-colors shadow-xs text-center"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 bg-[#EFE8DF] hover:bg-[#E3DACD] text-[#1A1817] font-semibold text-sm rounded-xl transition-colors"
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
              className="px-4 py-2 border border-[#F87171] text-[#EF4444] hover:bg-[#FEE2E2] font-semibold text-xs rounded-xl transition-colors shrink-0"
            >
              Delete
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}