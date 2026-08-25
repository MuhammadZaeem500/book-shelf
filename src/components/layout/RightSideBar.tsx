"use client";

import { usePathname } from "next/navigation";
import HomePageRightSidebar from "../home/HomePageSideBar";
import SearchRightSidebar from "../search/SearchRightSidebar";
import LibraryRightSidebar from "../library/LibraryRightSidebar";
import ActivityRightSidebar from "../activity/ActivityRightSidebar";
import ProfileRightSidebar from "../profile/ProfileRightSidebar";

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