"use client";

import { useState, useEffect } from "react";
import ProfileHeader from "@/src/components/profile/ProfileHeader";
import ProfileTabsView from "@/src/components/profile/ProfileTabsView";
import { useAuth } from "@/src/app/context/AuthContext";
import { fetchApi } from "@/src/app/lib/api";
import { ProfileHeaderProps, ProfileStats, UserProfile } from "@/src/types";

interface ConnectionUser {
  id: string;
  name?: string;
  username?: string;
  email: string;
  bio?: string;
}

export default function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<ProfileStats>({
    booksRead: 0,
    reading: 0,
    wantToRead: 0,
    reviews: 0,
    friends: 0,
    followers: 0,
    following: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);

  // Connection Modal State
  const [activeModal, setActiveModal] = useState<"followers" | "following" | null>(null);
  const [modalUsers, setModalUsers] = useState<ConnectionUser[]>([]);
  const [modalLoading, setModalLoading] = useState<boolean>(false);

  useEffect(() => {
    async function loadProfileAndStats() {
      try {
        setLoading(true);
        const [userData, statsData] = await Promise.all([
          fetchApi<UserProfile>("/users/me"),
          fetchApi<ProfileStats>("/users/me/stats"),
        ]);
        setProfile(userData);
        if (statsData) setStats(statsData);
      } catch (err) {
        console.error("Failed to load profile data:", err);
      } finally {
        setLoading(false);
      }
    }

    loadProfileAndStats();
  }, []);

  const openModal = async (type: "followers" | "following") => {
    setActiveModal(type);
    setModalLoading(true);
    try {
      const data = await fetchApi<ConnectionUser[]>(`/users/me/${type}`);
      setModalUsers(data || []);
    } catch (err) {
      console.error(`Failed to fetch ${type}:`, err);
      setModalUsers([]);
    } finally {
      setModalLoading(false);
    }
  };

  const handleUnfollow = async (targetId: string) => {
    try {
      await fetchApi(`/users/${targetId}/unfollow`, { method: "POST" });
      setModalUsers((prev) => prev.filter((u) => u.id !== targetId));
      setStats((prev) => ({
        ...prev,
        following: Math.max(0, prev.following - 1),
      }));
    } catch (err) {
      console.error("Failed to unfollow user:", err);
    }
  };

  const displayName = profile?.name || user?.name || "Book Reader";
  const userEmail = profile?.email || user?.email || "";
  const handle = profile?.username
    ? `@${profile.username}`
    : userEmail
    ? `@${userEmail.split("@")[0]}`
    : "@reader font-serif";

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
    stats,
  };

  if (loading) {
    return (
      <div className="flex w-full min-h-full items-center justify-center p-12 text-sm text-[#8C837A]">
        Loading profile data...
      </div>
    );
  }

  return (
    <div className="flex w-full min-h-full">
      <div className="flex-1 p-4 sm:p-6 space-y-8 min-w-0">
        <ProfileHeader {...profileData} onStatClick={openModal} />
        <ProfileTabsView />
      </div>

      {/* Followers / Following List Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-[#FAF7F2] border border-[#E8E0D5] rounded-3xl max-w-md w-full max-h-[75vh] flex flex-col shadow-xl overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-[#EFE8DF]">
              <h2 className="font-serif font-bold text-xl text-[#1A1817] capitalize">
                {activeModal}
              </h2>
              <button
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-[#EFE8DF] text-[#524B45] hover:bg-[#E0D8CE] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-3 flex-1">
              {modalLoading ? (
                <div className="space-y-3 animate-pulse">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-14 bg-[#EFE8DF] rounded-2xl w-full" />
                  ))}
                </div>
              ) : modalUsers.length > 0 ? (
                modalUsers.map((u) => (
                  <div
                    key={u.id}
                    className="flex items-center justify-between p-3 bg-white/80 border border-[#E0D8CE] rounded-2xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#A65B17] text-white flex items-center justify-center font-bold text-sm">
                        {(u.name || u.email)[0].toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-bold text-[#1A1817] text-sm">
                          {u.name || "Book Reader"}
                        </h4>
                        <p className="text-xs text-[#8C837A]">
                          @{u.username || u.email.split("@")[0]}
                        </p>
                      </div>
                    </div>

                    {activeModal === "following" && (
                      <button
                        onClick={() => handleUnfollow(u.id)}
                        className="px-3 py-1 rounded-full border border-[#E0D8CE] text-xs font-semibold text-[#524B45] hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors cursor-pointer"
                      >
                        Unfollow
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-[#8C837A] text-sm">
                  No {activeModal} found.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}