"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";

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

  const [theme, setTheme] = useState<"light" | "dark" | "system">("light");
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

  const handleOpenGenreModal = () => {
    setTempGenres([...selectedGenres]);
    setIsGenreModalOpen(true);
  };

  const handleToggleGenre = (genre: string) => {
    setTempGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre],
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

      // Clear authentication state and tokens
      localStorage.removeItem("access_token");

      // Redirect to sign-in page
      window.location.href = "/auth/sign-in";
    } catch (err: any) {
      setDeleteError(err.message || "Failed to delete account. Please try again.");
    } finally {
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
    <div className="w-full bg-[#FAF7F2] p-4 sm:p-6 lg:p-8 text-[#1A1817]">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link
            href="/profile"
            className="w-10 h-10 rounded-xl bg-[#EFE8DF] flex items-center justify-center text-[#524B45]"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-serif text-3xl">Settings</h1>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Navigation Sidebar */}
          <nav className="md:col-span-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-semibold flex items-center gap-2.5 transition-all ${
                  activeTab === item.id
                    ? "bg-[#EFE8DF] text-[#C85A2B] ring-2 ring-[#3B82F6] ring-offset-1"
                    : "text-[#524B45] hover:bg-[#EFE8DF]/50"
                }`}
              >
                {activeTab === item.id && (
                  <span className="w-2 h-2 rounded-full bg-[#C85A2B] shrink-0" />
                )}
                <span className={activeTab === item.id ? "" : "ml-4.5"}>
                  {item.label}
                </span>
              </button>
            ))}
          </nav>

          {/* Main Content Pane */}
          <div className="md:col-span-8">
            {/* Account Tab */}
            {activeTab === "account" && (
              <SettingsSection title="ACCOUNT">
                <SettingsRow title="Password">
                  <button
                    onClick={() => setIsPasswordModalOpen(true)}
                    className="text-xs font-semibold text-[#C85A2B] hover:underline"
                  >
                    Update
                  </button>
                </SettingsRow>
                <SettingsRow title="Connected accounts" isLast>
                  <span className="text-xs text-[#524B45] flex items-center gap-1.5">
                    Google{" "}
                    <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                  </span>
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
                  <div className="bg-[#EFE8DF] p-1 rounded-xl flex gap-1">
                    {(["light", "dark", "system"] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setTheme(t)}
                        className={`px-3 py-1.5 rounded-lg text-xs capitalize transition-all ${
                          theme === t
                            ? "bg-white text-[#1A1817] shadow-2xs"
                            : "text-[#736B63]"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
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
                    className="text-xs text-[#C85A2B] hover:underline"
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
                      className="w-16 px-3 py-1.5 text-center bg-[#EFE8DF] border border-[#E4DBCF] rounded-xl text-xs focus:outline-none"
                    />
                    <span className="text-xs text-[#736B63]">books</span>
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
                        window.location.href = "/auth/sign-in";
                      }}
                      className="px-4 py-2 border border-[#E8E0D5] bg-white text-xs font-semibold rounded-xl hover:bg-[#FAF7F2] transition-colors cursor-pointer"
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
                      className="px-4 py-2 border border-[#FCA5A5] bg-white text-[#DC2626] text-xs font-semibold rounded-xl hover:bg-[#FEF2F2] transition-colors cursor-pointer"
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
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 border border-[#E8E0D5] shadow-xl">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-[#DC2626]">
                Delete Account
              </h3>
              <p className="text-xs text-[#736B63]">
                This action is permanent and cannot be undone. All your books,
                reviews, and activities will be permanently deleted.
              </p>
            </div>

            <form onSubmit={handleDeleteAccount} className="space-y-4">
              {deleteError && (
                <div className="p-3 bg-[#FEF2F2] border border-[#FCA5A5] text-[#DC2626] rounded-xl text-xs font-medium">
                  {deleteError}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#524B45]">
                  Enter your password to confirm:
                </label>
                <input
                  type="password"
                  required
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  placeholder="Your current password"
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E8E0D5] rounded-xl text-sm focus:outline-none focus:border-[#DC2626]"
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
                  className="px-4 py-2 text-xs font-semibold text-[#524B45] hover:bg-[#FAF7F2] rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isDeleting}
                  className="px-4 py-2 bg-[#DC2626] text-white text-xs font-semibold rounded-xl hover:bg-[#B91C1C] disabled:opacity-50 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  {isDeleting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  {isDeleting ? "Deleting..." : "Confirm Delete"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}