"use client";

import { usePathname } from "next/navigation";
import HomePageRightSidebar from "@/src/components/home/HomePageSideBar";
import SearchRightSidebar from "@/src/components/search/SearchRightSidebar";
import LibraryRightSidebar from "@/src/components/library/LibraryRightSidebar";
import ActivityRightSidebar from "@/src/components/activity/ActivityRightSidebar";
import ProfileRightSidebar from "@/src/components/profile/ProfileRightSidebar";

export default function RightSidebar() {
  const pathname = usePathname();

  if (pathname === "/profile/edit") {
    return null;
  }

  return (
    <aside>
      {pathname === "/" && <HomePageRightSidebar />}
      {pathname.startsWith("/search") && <SearchRightSidebar />}
      {pathname.startsWith("/library") && <LibraryRightSidebar />}
      {pathname.startsWith("/activity") && <ActivityRightSidebar />}
      {pathname.startsWith("/profile") && <ProfileRightSidebar />}
    </aside>
  );
}