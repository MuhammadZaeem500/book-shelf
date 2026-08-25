"use client";

import React from "react";
import ProfileHeader from "@/src/components/profile/ProfileHeader";
import ProfileTabsView from "@/src/components/profile/ProfileTabsView";
import ProfileRightSidebar from "@/src/components/profile/ProfileRightSidebar";

const profileData = {
  name: "Alex Johnson",
  handle: "@alexj",
  avatarInitials: "AJ",
  avatarBg: "#A65B17",
  bio: "Avid reader, slow finisher. Literary fiction addict. Always carrying a book I probably won't finish on time.",
  stats: {
    booksRead: 47,
    reading: 1,
    wantToRead: 23,
    reviews: 12,
    friends: 142,
    followers: 89,
    following: 34,
  },
};

export default function ProfilePage() {
  return (
    <div className="flex w-full min-h-full">
      <div className="flex-1 p-4 sm:p-6 space-y-8 min-w-0">
        <ProfileHeader {...profileData} />
        <ProfileTabsView />
      </div>
    </div>
  );
}