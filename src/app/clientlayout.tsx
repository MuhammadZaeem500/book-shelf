"use client";

import "@/src/app/globals.css";
import { usePathname } from "next/navigation";
import Sidebar from "@/src/components/layout/SideBar";
import Navbar from "@/src/components/layout/Navbar";
import RightSidebar from "@/src/components/layout/RightSideBar";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAuthPage =
    pathname?.includes("/signup") ||
    pathname?.includes("/sign-in") ||
    pathname?.includes("/sign-up") ||
    pathname?.includes("/forgot-password");

  return (
    <div
      className={`${dmSans.variable} bg-[#FFFFFF] min-h-screen text-[#1A1817] flex flex-col font-sans antialiased`}
    >
      {!isAuthPage && <Navbar />}

      <div className="flex flex-1 relative max-w-8xl mx-auto w-full">
        {!isAuthPage && <Sidebar />}

        <main className="bg-[#FAF7F2] flex-1 min-w-0 border-l border-[#EFE8DF]">
          {children}
        </main>

        {!isAuthPage && (
          <div className="bg-[#F2EDE5]">
            <RightSidebar />
          </div>
        )}
      </div>
    </div>
  );
}