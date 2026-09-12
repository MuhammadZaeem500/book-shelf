"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import { useTheme } from "next-themes";

import SettingsSection from "@/src/components/settings/SettingsSection";
import SettingsRow from "@/src/components/settings/SettingsRow";
import ToggleSwitch from "@/src/components/settings/ToggleSwitch";
import SelectDropdown from "@/src/components/settings/SelectDropdown";
import EditGenresModal from "@/src/components/settings/EditGenresModal";
import ChangeEmailModal from "@/src/components/settings/ChangeEmailModal";
import UpdatePasswordModal from "@/src/components/settings/UpdatePasswordModal";
import { fetchApi } from "@/src/app/lib/api";

const ALL_GENRES = [
  "Literary Fiction",
  "Sci-Fi",
  "Historical",
  "Fantasy",
  "Mystery & Thriller",
  "Romance",
  "Non-Fiction",
  "Biography",
  "Philosophy",
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account");
  const [email, setEmail] = useState("alex@example.com");

  // Theme support
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [privacy, setPrivacy] = useState({
    publicProfile: true,
    whoCanFollow: "Anyone",
    readingActivity: false,
    reviewsVisible: true,
  });

  const [notifications, setNotifications] = useState({
    newFollowers: true,
    friendActivity: true,
    bookRecommendations: false,
    reviewLikesComments: true,
    emailNotifications: false,
  });

  const [defaultStatus, setDefaultStatus] = useState("Currently Reading");
  const [selectedGenres, setSelectedGenres] = useState([
    "Literary Fiction",
    "Sci-Fi",
    "Historical",
  ]);
  const [annualGoal, setAnnualGoal] = useState("60");

  const [isGenreModalOpen, setIsGenreModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [tempGenres, setTempGenres] = useState<string[]>([]);

  // Delete Account Modal & Loading States
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeletedSuccess, setIsDeletedSuccess] = useState(false);

  const handleOpenGenreModal = () => {
    setTempGenres([...selectedGenres]);
    setIsGenreModalOpen(true);
  };

  const handleToggleGenre = (genre: string) => {
    setTempGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const handleSaveGenres = () => {
    setSelectedGenres(tempGenres);
    setIsGenreModalOpen(false);
  };

  // Execute DELETE /auth/account Request
  const handleDeleteAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setDeleteError("");
    setIsDeleting(true);

    try {
      await fetchApi("/auth/account", {
        method: "DELETE",
        body: JSON.stringify({ password: deletePassword }),
      });

      localStorage.removeItem("access_token");
      localStorage.removeItem("token");
      setIsDeletedSuccess(true);

      setTimeout(() => {
        window.location.href = "/auth/sign-in?deleted=true";
      }, 2000);
    } catch (err: any) {
      setDeleteError(
        err.message || "Failed to delete account. Please try again."
      );
      setIsDeleting(false);
    }
  };

  const navItems = [
    { id: "account", label: "Account" },
    { id: "privacy", label: "Privacy" },
    { id: "notifications", label: "Notifications" },
    { id: "appearance", label: "Appearance" },
    { id: "reading", label: "Reading Preferences" },
    { id: "danger", label: "Danger Zone" },
  ];

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#141211] p-4 sm:p-6 lg:p-8 text-[#1A1817] dark:text-[#F5F2EB] transition-colors">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link
            href="/profile"
            className="w-10 h-10 rounded-xl bg-[#EFE8DF] dark:bg-[#2E2926] flex items-center justify-center text-[#524B45] dark:text-[#A0958B] hover:bg-[#E4DBCF] dark:hover:bg-[#3D3733] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-serif text-3xl">Settings</h1>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Mobile Horizontal Scroll / Desktop Vertical Sidebar */}
          <nav className="md:col-span-4 flex md:flex-col overflow-x-auto md:overflow-visible gap-1.5 pb-2 md:pb-0 scrollbar-none w-full">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`shrink-0 text-left px-3 py-1.5 md:px-4 md:py-3 rounded-xl md:rounded-2xl text-xs md:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === item.id
                    ? "bg-[#EFE8DF] dark:bg-[#2E2926] text-[#C85A2B] border border-[#C85A2B]/20"
                    : "text-[#524B45] dark:text-[#A0958B] hover:bg-[#EFE8DF]/50 dark:hover:bg-[#2E2926]/50"
                }`}
              >
                {activeTab === item.id && (
                  <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#C85A2B] shrink-0" />
                )}
                <span className="whitespace-nowrap">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Main Content Pane */}
          <div className="md:col-span-8">
            {/* Account Tab */}
            {activeTab === "account" && (
              <SettingsSection title="ACCOUNT">
                <SettingsRow title="Password" isLast>
                  <button
                    onClick={() => setIsPasswordModalOpen(true)}
                    className="text-xs font-semibold text-[#C85A2B] hover:underline cursor-pointer"
                  >
                    Update
                  </button>
                </SettingsRow>
              </SettingsSection>
            )}

            {/* Privacy Tab */}
            {activeTab === "privacy" && (
              <SettingsSection title="PRIVACY">
                <SettingsRow
                  title="Public profile"
                  subtitle="Anyone can view your profile"
                >
                  <ToggleSwitch
                    checked={privacy.publicProfile}
                    onChange={(v) =>
                      setPrivacy({ ...privacy, publicProfile: v })
                    }
                  />
                </SettingsRow>
                <SettingsRow
                  title="Who can follow me"
                  subtitle="Control who can follow your account"
                >
                  <SelectDropdown
                    value={privacy.whoCanFollow}
                    options={["Anyone", "Only Friends", "No One"]}
                    onChange={(v) =>
                      setPrivacy({ ...privacy, whoCanFollow: v })
                    }
                  />
                </SettingsRow>
                <SettingsRow
                  title="Reading activity"
                  subtitle="Show what you're currently reading"
                >
                  <ToggleSwitch
                    checked={privacy.readingActivity}
                    onChange={(v) =>
                      setPrivacy({ ...privacy, readingActivity: v })
                    }
                  />
                </SettingsRow>
                <SettingsRow
                  title="Reviews visible"
                  subtitle="Let others see your book reviews"
                  isLast
                >
                  <ToggleSwitch
                    checked={privacy.reviewsVisible}
                    onChange={(v) =>
                      setPrivacy({ ...privacy, reviewsVisible: v })
                    }
                  />
                </SettingsRow>
              </SettingsSection>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <SettingsSection title="NOTIFICATIONS">
                <SettingsRow
                  title="New followers"
                  subtitle="When someone follows you"
                >
                  <ToggleSwitch
                    checked={notifications.newFollowers}
                    onChange={(v) =>
                      setNotifications({ ...notifications, newFollowers: v })
                    }
                  />
                </SettingsRow>
                <SettingsRow
                  title="Friend activity"
                  subtitle="When friends finish or review books"
                >
                  <ToggleSwitch
                    checked={notifications.friendActivity}
                    onChange={(v) =>
                      setNotifications({ ...notifications, friendActivity: v })
                    }
                  />
                </SettingsRow>
                <SettingsRow
                  title="Book recommendations"
                  subtitle="Personalized picks from Bookshelf"
                >
                  <ToggleSwitch
                    checked={notifications.bookRecommendations}
                    onChange={(v) =>
                      setNotifications({
                        ...notifications,
                        bookRecommendations: v,
                      })
                    }
                  />
                </SettingsRow>
                <SettingsRow
                  title="Review likes & comments"
                  subtitle="Engagement on your reviews"
                >
                  <ToggleSwitch
                    checked={notifications.reviewLikesComments}
                    onChange={(v) =>
                      setNotifications({
                        ...notifications,
                        reviewLikesComments: v,
                      })
                    }
                  />
                </SettingsRow>
                <SettingsRow
                  title="Email notifications"
                  subtitle="Receive a weekly reading digest"
                  isLast
                >
                  <ToggleSwitch
                    checked={notifications.emailNotifications}
                    onChange={(v) =>
                      setNotifications({
                        ...notifications,
                        emailNotifications: v,
                      })
                    }
                  />
                </SettingsRow>
              </SettingsSection>
            )}

            {/* Appearance Tab */}
            {activeTab === "appearance" && (
              <SettingsSection title="APPEARANCE">
                <SettingsRow title="Theme" isLast>
                  {!mounted ? (
                    <div className="bg-[#EFE8DF] dark:bg-[#2E2926] p-1 rounded-xl flex gap-1 h-8 w-44 animate-pulse" />
                  ) : (
                    <div className="bg-[#EFE8DF] dark:bg-[#2E2926] p-1 rounded-xl flex gap-1 border border-[#E4DBCF] dark:border-[#3D3733]">
                      {(["light", "dark", "system"] as const).map((t) => (
                        <button
                          key={t}
                          onClick={() => setTheme(t)}
                          className={`px-3 py-1.5 rounded-lg text-xs capitalize transition-all cursor-pointer font-medium ${
                            theme === t
                              ? "bg-white dark:bg-[#1D1A18] text-[#1A1817] dark:text-[#F5F2EB] shadow-xs"
                              : "text-[#736B63] dark:text-[#A0958B] hover:text-[#1A1817] dark:hover:text-[#F5F2EB]"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  )}
                </SettingsRow>
              </SettingsSection>
            )}

            {/* Reading Preferences Tab */}
            {activeTab === "reading" && (
              <SettingsSection title="READING PREFERENCES">
                <SettingsRow title="Default reading status">
                  <SelectDropdown
                    value={defaultStatus}
                    options={["Currently Reading", "Want to Read", "Finished"]}
                    onChange={setDefaultStatus}
                  />
                </SettingsRow>
                <SettingsRow
                  title="Preferred genres"
                  subtitle={selectedGenres.join(", ")}
                >
                  <button
                    onClick={handleOpenGenreModal}
                    className="text-xs text-[#C85A2B] hover:underline cursor-pointer"
                  >
                    Edit &rarr;
                  </button>
                </SettingsRow>
                <SettingsRow title="Annual reading goal" isLast>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={annualGoal}
                      onChange={(e) => setAnnualGoal(e.target.value)}
                      className="w-16 px-3 py-1.5 text-center bg-[#EFE8DF] dark:bg-[#2E2926] border border-[#E4DBCF] dark:border-[#3D3733] rounded-xl text-xs focus:outline-none"
                    />
                    <span className="text-xs text-[#736B63] dark:text-[#A0958B]">books</span>
                  </div>
                </SettingsRow>
              </SettingsSection>
            )}

            {/* Danger Zone Tab */}
            {activeTab === "danger" && (
              <div className="space-y-6">
                <SettingsSection title="SESSION">
                  <SettingsRow
                    title="Sign out"
                    subtitle="Sign out from all devices"
                    isLast
                  >
                    <button
                      onClick={() => {
                        localStorage.removeItem("access_token");
                        localStorage.removeItem("token");
                        window.location.href = "/auth/sign-in";
                      }}
                      className="px-4 py-2 border border-[#E8E0D5] dark:border-[#2E2926] bg-white dark:bg-[#1D1A18] text-xs font-semibold rounded-xl hover:bg-[#FAF7F2] dark:hover:bg-[#2E2926] transition-colors cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </SettingsRow>
                </SettingsSection>
                <SettingsSection title="DANGER ZONE" isDanger>
                  <SettingsRow
                    title="Delete account"
                    subtitle="Permanently remove all your data"
                    isLast
                  >
                    <button
                      onClick={() => setIsDeleteModalOpen(true)}
                      className="px-4 py-2 border border-[#FCA5A5] bg-white dark:bg-[#1D1A18] text-[#DC2626] text-xs font-semibold rounded-xl hover:bg-[#FEF2F2] dark:hover:bg-[#381616] transition-colors cursor-pointer"
                    >
                      Delete
                    </button>
                  </SettingsRow>
                </SettingsSection>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- MODAL DIALOGS --- */}
      <EditGenresModal
        isOpen={isGenreModalOpen}
        allGenres={ALL_GENRES}
        tempGenres={tempGenres}
        onToggleGenre={handleToggleGenre}
        onClose={() => setIsGenreModalOpen(false)}
        onSave={handleSaveGenres}
      />

      <ChangeEmailModal
        isOpen={isEmailModalOpen}
        currentEmail={email}
        onClose={() => setIsEmailModalOpen(false)}
        onSave={(newEmail) => {
          setEmail(newEmail);
          setIsEmailModalOpen(false);
        }}
      />

      <UpdatePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSave={() => setIsPasswordModalOpen(false)}
      />

      {/* --- DELETE ACCOUNT CONFIRMATION MODAL --- */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-[#1D1A18] rounded-2xl max-w-md w-full p-6 space-y-4 border border-[#E8E0D5] dark:border-[#2E2926] shadow-xl">
            {isDeletedSuccess ? (
              <div className="py-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#10B981] mx-auto" />
                <h3 className="text-lg font-bold text-[#1A1817] dark:text-[#F5F2EB]">
                  Account Deleted
                </h3>
                <p className="text-xs text-[#736B63] dark:text-[#A0958B]">
                  Your account and all associated data have been permanently
                  removed. Redirecting to sign in...
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-[#DC2626]">
                    Delete Account
                  </h3>
                  <p className="text-xs text-[#736B63] dark:text-[#A0958B]">
                    This action is permanent and cannot be undone. All your
                    books, reviews, and activities will be permanently deleted.
                  </p>
                </div>

                <form onSubmit={handleDeleteAccount} className="space-y-4">
                  {deleteError && (
                    <div className="p-3 bg-[#FEF2F2] dark:bg-[#381616] border border-[#FCA5A5] text-[#DC2626] rounded-xl text-xs font-medium">
                      {deleteError}
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#524B45] dark:text-[#A0958B]">
                      Enter your password to confirm:
                    </label>
                    <input
                      type="password"
                      required
                      value={deletePassword}
                      onChange={(e) => setDeletePassword(e.target.value)}
                      placeholder="Your current password"
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F2] dark:bg-[#2E2926] border border-[#E8E0D5] dark:border-[#3D3733] rounded-xl text-sm focus:outline-none focus:border-[#DC2626]"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      disabled={isDeleting}
                      onClick={() => {
                        setIsDeleteModalOpen(false);
                        setDeletePassword("");
                        setDeleteError("");
                      }}
                      className="px-4 py-2 text-xs font-semibold text-[#524B45] dark:text-[#A0958B] hover:bg-[#FAF7F2] dark:hover:bg-[#2E2926] rounded-xl transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isDeleting}
                      className="px-4 py-2 bg-[#DC2626] text-white text-xs font-semibold rounded-xl hover:bg-[#B91C1C] disabled:opacity-50 transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      {isDeleting && (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      )}
                      {isDeleting ? "Deleting..." : "Confirm Delete"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}