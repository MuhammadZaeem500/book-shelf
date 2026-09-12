"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, BookOpen, Activity, User, Settings } from "lucide-react";
import { useAuth } from "@/src/app/context/AuthContext";

const mobileNavItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Search", href: "/search", icon: Search },
  { label: "Library", href: "/library", icon: BookOpen },
  { label: "Activity", href: "/activity", icon: Activity },
  { label: "Profile", href: "/profile", icon: User },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  
  console.log(user?.username)
  console.log(user?.name)
// Dynamic user data processing
  const displayName = user?.name || user?.email?.split("@")[0] || "User";
  
  const rawUsername = user?.username || displayName.toLowerCase().replace(/\s+/g, "");
  const username = rawUsername.startsWith("@") ? rawUsername : `@${rawUsername}`;
  
  const bookCount = user?.bookCount ?? user?._count?.books ?? 0;

  // Extract initials (e.g., "Muhammad Zaeem" -> "MZ")
  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "U";

  return (
    <>
      <div className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#FFFFFF] border-t border-[#EFE8DF] flex items-center justify-around px-2 z-50 shadow-lg">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
                isActive
                  ? "text-[#C85A2B]"
                  : "text-[#8C837A] hover:text-[#1A1817]"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium mt-0.5">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>

      <aside className="hidden lg:flex sticky top-16.25 left-0 bottom-0 h-[calc(100vh-65px)] w-64 bg-[#FFFFFF] border-r border-[#EFE8DF] flex-col justify-between z-40">
        <div className="p-4 space-y-4">
          <nav className="flex flex-col gap-1.5 pt-2">
            {mobileNavItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-[#EFE3D8] text-[#C85A2B]"
                      : "text-[#6B5D4F] hover:bg-[#F2EAE0] hover:text-[#1A1817]"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <Icon
                      className={`w-5 h-5 ${
                        isActive ? "text-[#C85A2B]" : "text-[#8C837A]"
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>

                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-[#C85A2B]" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-[#EFE8DF] space-y-3">
          {/* <Link
            href="/settings"
            className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
              pathname === "/settings"
                ? "bg-[#EFE3D8] text-[#C85A2B]"
                : "text-[#635B54] hover:bg-[#F2EAE0] hover:text-[#1A1817]"
            }`}
          >
            <Settings className="w-5 h-5 text-[#8C837A]" />
            <span>Settings</span>
          </Link> */}

          <div className="flex items-center gap-3 px-2 pt-2">
            <div className="w-10 h-10 rounded-full bg-[#C85A2B] text-white font-bold flex items-center justify-center text-sm shadow-sm shrink-0">
              {initials}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-[#1A1817] truncate">
{displayName}
              </span>
              <span className="text-xs text-[#8C837A] truncate">
{username} · {bookCount} {bookCount === 1 ? "book" : "books"}
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
