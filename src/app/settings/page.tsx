"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import SettingsSection from "@/src/components/settings/SettingsSection";
import SettingsRow from "@/src/components/settings/SettingsRow";
import ToggleSwitch from "@/src/components/settings/ToggleSwitch";
import SelectDropdown from "@/src/components/settings/SelectDropdown";
import EditGenresModal from "@/src/components/settings/EditGenresModal";
import ChangeEmailModal from "@/src/components/settings/ChangeEmailModal";
import UpdatePasswordModal from "@/src/components/settings/UpdatePasswordModal";

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

  // User Account States
  const [email, setEmail] = useState("alex@example.com");

  // Settings States
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

  // Modal States
  const [isGenreModalOpen, setIsGenreModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [tempGenres, setTempGenres] = useState<string[]>([]);

  // Genre Modal Handlers
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

  const navItems = [
    { id: "account", label: "Account" },
    { id: "privacy", label: "Privacy" },
    { id: "notifications", label: "Notifications" },
    { id: "appearance", label: "Appearance" },
    { id: "reading", label: "Reading Preferences" },
    { id: "danger", label: "Danger Zone" },
  ];

  return (
    <div className="min-h-screen w-full bg-[#FAF7F2] p-4 sm:p-6 lg:p-8 text-[#1A1817]">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link
            href="/profile"
            className="w-10 h-10 rounded-xl bg-[#EFE8DF] flex items-center justify-center text-[#524B45]"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-serif text-3xl font-bold">Settings</h1>
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
                <SettingsRow title="Email address" subtitle={email}>
                  <button
                    onClick={() => setIsEmailModalOpen(true)}
                    className="text-xs font-semibold text-[#C85A2B] hover:underline"
                  >
                    Change
                  </button>
                </SettingsRow>
                <SettingsRow
                  title="Password"
                  subtitle="Last changed 3 months ago"
                >
                  <button
                    onClick={() => setIsPasswordModalOpen(true)}
                    className="text-xs font-semibold text-[#C85A2B] hover:underline"
                  >
                    Update
                  </button>
                </SettingsRow>
                <SettingsRow title="Connected accounts" isLast>
                  <span className="text-xs text-[#524B45] flex items-center gap-1.5">
                    Google <span className="w-2 h-2 rounded-full bg-[#10B981]" />
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
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
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
                    options={[
                      "Currently Reading",
                      "Want to Read",
                      "Finished",
                    ]}
                    onChange={setDefaultStatus}
                  />
                </SettingsRow>
                <SettingsRow
                  title="Preferred genres"
                  subtitle={selectedGenres.join(", ")}
                >
                  <button
                    onClick={handleOpenGenreModal}
                    className="text-xs font-bold text-[#C85A2B] hover:underline"
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
                      className="w-16 px-3 py-1.5 text-center bg-[#EFE8DF] border border-[#E4DBCF] rounded-xl text-xs font-bold focus:outline-none"
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
                    <button className="px-4 py-2 border border-[#E8E0D5] bg-white text-xs font-semibold rounded-xl hover:bg-[#FAF7F2]">
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
                    <button className="px-4 py-2 border border-[#FCA5A5] bg-white text-[#DC2626] text-xs font-semibold rounded-xl hover:bg-[#FEF2F2]">
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
    </div>
  );
}