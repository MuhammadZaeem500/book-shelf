"use client";

import { usePathname } from "next/navigation";
import HomPageRightSidebar from "./components/home/HomePageSideBar";
export default function RightSidebar() {
  const pathname = usePathname();

  return (
    <aside className="">
      {pathname === "/" && <HomPageRightSidebar />}
      {/* {pathname.startsWith("/search") && <SearchFiltersWidget />} */}
      {/* {pathname.startsWith("/profile") && <ProfileActivityWidget />} */}
    </aside>
  );
}