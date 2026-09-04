"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/app/context/AuthContext";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, token, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Once AuthContext finishes reading storage, redirect if token/user is missing
    if (!loading && (!token || !user)) {
      router.replace("/auth/sign-in");
    }
  }, [loading, token, user, router]);

  // Show a neutral loading screen while checking local storage state
  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#FAF7F2] flex items-center justify-center text-sm font-semibold text-[#8C837A]">
        Verifying session...
      </div>
    );
  }

  // Prevent flash of protected UI content if user is logged out
  if (!token || !user) {
    return null;
  }

  return <>{children}</>;
}