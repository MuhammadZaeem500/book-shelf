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
    if (!loading && (!token || !user)) {
      router.replace("/auth/sign-in");
    }
  }, [loading, token, user, router]);

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#FAF7F2] flex items-center justify-center text-sm font-semibold text-[#8C837A]">
        Verifying session...
      </div>
    );
  }

  if (!token || !user) {
    return null;
  }

  return <>{children}</>;
}
