"use client";

import { useState, useEffect } from "react";
import ProfileHeader from "@/src/components/profile/ProfileHeader";
import ProfileTabsView from "@/src/components/profile/ProfileTabsView";
import { useAuth } from "@/src/app/context/AuthContext";
import { fetchApi } from "@/src/app/lib/api";
import { ProfileHeaderProps, ProfileStats, UserProfile } from "@/src/types";

export default function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadUserProfile() {
      try {
        setLoading(true);
        const data = await fetchApi<UserProfile>("/users/me");
        setProfile(data);
      } catch (err) {
        console.error("Failed to load profile data:", err);
      } finally {
        setLoading(false);
      }
    }

    loadUserProfile();
  }, []);

  const displayName = profile?.name || user?.name || "Book Reader";
  const userEmail = profile?.email || user?.email || "";
  const handle = userEmail ? `@${userEmail.split("@")[0]}` : "@reader";

  const initials =
    displayName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";

  const profileData: ProfileHeaderProps = {
    name: displayName,
    handle,
    avatarInitials: initials,
    avatarBg: "#A65B17",
    bio: profile?.bio || "",
    stats: profile?.stats || {
      booksRead: 0,
      reading: 0,
      wantToRead: 0,
      reviews: 0,
      friends: 0,
      followers: 0,
      following: 0,
    },
  };

  if (loading) {
    return (
      <div className="flex w-full min-h-full items-center justify-center p-12 text-sm text-[#8C837A]">
        Loading profile data...
      </div>
    );
  }

  return (
    <div className="flex w-full h-screen overflow-y-auto [scrollbar-color:#C85A2B_#FAF7F2] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#FAF7F2] [&::-webkit-scrollbar-thumb]:bg-[#C85A2B] [&::-webkit-scrollbar-thumb]:rounded-full">
      <div className="flex-1 p-4 sm:p-6 space-y-8 min-w-0">
        <ProfileHeader {...profileData} />
        <ProfileTabsView />
      </div>
    </div>
  );
}
