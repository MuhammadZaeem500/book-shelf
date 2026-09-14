"use client";

import "@/src/app/globals.css";
import { usePathname } from "next/navigation";
import Sidebar from "@/src/components/layout/SideBar";
import Navbar from "@/src/components/layout/Navbar";
import RightSidebar from "@/src/components/layout/RightSideBar";
import { DM_Sans } from "next/font/google";
import { AuthProvider } from "@/src/app/context/AuthContext";
import ProtectedRoute from "@/src/components/auth/ProtectedRoute";
import { ThemeProvider } from "@/src/app/providers/ThemeProvider";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
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
    pathname?.includes("/forgot-password") ||
    pathname?.includes("/reset-password") ||
    pathname?.includes("/verify-email") ||
    pathname?.includes("/change-password");

  return (
    // <ThemeProvider>
      <AuthProvider>
        <div
          className={`${dmSans.variable} bg-[#FFFFFF] dark:bg-[#141211] min-h-dvh text-[#1A1817] dark:text-[#F5F2EB] flex flex-col font-sans antialiased overflow-x-hidden transition-colors duration-200`}
        >
          {!isAuthPage && <Navbar />}

          <div className="flex flex-1 relative max-w-8xl mx-auto w-full">
            {!isAuthPage && <Sidebar />}

            <main className="flex-1 min-w-0 border-l border-[#EFE8DF] dark:border-[#2E2926] pb-32 lg:pb-0">
              {isAuthPage ? children : <ProtectedRoute>{children}</ProtectedRoute>}
            </main>

            {!isAuthPage && (
              <div className="bg-[#F2EDE5] dark:bg-[#1D1A18] transition-colors">
                <RightSidebar />
              </div>
            )}
          </div>
        </div>
      </AuthProvider>
    // </ThemeProvider>
  );
}