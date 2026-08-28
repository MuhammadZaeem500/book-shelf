"use client";

import { useState } from "react";
import { Book } from "lucide-react";
import { useRouter } from "next/navigation";
import ProfileAvatarModal from "@/src/components/profile/ProfileAvatarModal";
import NotificationDropdown from "@/src/components/layout/NotificationDropdown";

export default function Navbar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FAF7F2] border-b border-[#EFE8DF] px-4 py-3 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        {/* Brand Header */}
        <div className="flex items-center justify-between w-full sm:w-auto gap-4">
          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-[#C85A2B] text-white p-2 rounded-xl">
              <Book className="w-5 h-5" />
            </div>
            <span className="font-serif font-bold text-xl text-[#1A1817]">
              Bookshelf
            </span>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-3 shrink-0 sm:hidden">
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsNotificationOpen((prev) => !prev)}
                className="relative p-2.5 rounded-full bg-[#F2EAE0]/80 hover:bg-[#EFE3D8] text-[#524B45] transition-colors focus:outline-none cursor-pointer"
                aria-label="Notifications"
              >
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#C85A2B] rounded-full ring-2 ring-[#FBF8F3]" />
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <NotificationDropdown
                isOpen={isNotificationOpen}
                onClose={() => setIsNotificationOpen(false)}
              />
            </div>

            <button
              type="button"
              onClick={() => setIsAvatarModalOpen(true)}
              className="w-10 h-10 rounded-full bg-[#C85A2B] text-white font-bold flex items-center justify-center text-sm shadow-sm hover:opacity-90 transition-opacity focus:outline-none ring-2 ring-[#F2EAE0] cursor-pointer"
            >
              AJ
            </button>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:flex-1 sm:max-w-md sm:mx-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search books, authors, or ISBN..."
            className="w-full pl-4 pr-4 py-2.5 bg-[#F2EAE0]/70 border border-[#E8DFC8]/60 rounded-2xl text-sm text-[#1A1817] placeholder-[#A0958B] focus:outline-none focus:ring-2 focus:ring-[#C85A2B]/40 focus:border-[#C85A2B] transition-all"
          />
        </div>

        {/* Desktop Actions */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsNotificationOpen((prev) => !prev)}
              className="relative p-2.5 rounded-full bg-[#F2EAE0]/80 hover:bg-[#EFE3D8] text-[#524B45] transition-colors focus:outline-none cursor-pointer"
              aria-label="Notifications"
            >
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#C85A2B] rounded-full ring-2 ring-[#FBF8F3]" />
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>

            <NotificationDropdown
              isOpen={isNotificationOpen}
              onClose={() => setIsNotificationOpen(false)}
            />
          </div>

          <button
            type="button"
            onClick={() => setIsAvatarModalOpen(true)}
            className="w-10 h-10 rounded-full bg-[#C85A2B] text-white font-bold flex items-center justify-center text-sm shadow-sm hover:opacity-90 transition-opacity focus:outline-none ring-2 ring-[#F2EAE0] cursor-pointer"
          >
            AJ
          </button>
        </div>
      </div>

      <ProfileAvatarModal
        isOpen={isAvatarModalOpen}
        onClose={() => setIsAvatarModalOpen(false)}
        onSignOut={() => router.push("/auth/sign-in")}
        onAddAccount={() => router.push("/auth/sign-up")}
        userName="Alex Johnson"
      />
    </header>
  );
}