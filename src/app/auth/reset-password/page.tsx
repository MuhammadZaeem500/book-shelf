"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<{
    type: "idle" | "loading" | "success" | "error";
    message: string;
  }>({ type: "idle", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      setStatus({
        type: "error",
        message: "Invalid or missing password reset token.",
      });
      return;
    }

    if (password !== confirmPassword) {
      setStatus({ type: "error", message: "Passwords do not match." });
      return;
    }

    if (password.length < 6) {
      setStatus({
        type: "error",
        message: "Password must be at least 6 characters long.",
      });
      return;
    }

    setStatus({ type: "loading", message: "Resetting password..." });

    try {
      // Points to NestJS backend port (3000) as fallback
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      
      const response = await fetch(`${apiUrl}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Fixed: matches dto.newPassword in NestJS AuthService
        body: JSON.stringify({ token, newPassword: password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to reset password.");
      }

      setStatus({
        type: "success",
        message: "Password reset successfully! Redirecting to login...",
      });

      setTimeout(() => {
        router.push("/auth/sign-in");
      }, 2000);
    } catch (err: any) {
      setStatus({
        type: "error",
        message: err.message || "An unexpected error occurred.",
      });
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#FAF7F2] p-8 rounded-2xl border border-[#E8DFC8] shadow-sm text-center">
          <h2 className="text-xl font-bold text-[#1A1817]">Invalid Link</h2>
          <p className="text-xs text-[#8C837A] mt-2">
            This password reset link is missing or invalid.
          </p>
          <Link
            href="/auth/forgot-password"
            className="inline-block mt-6 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#C85A2B] hover:bg-[#B85024] transition-colors"
          >
            Request New Link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#FAF7F2] p-8 rounded-2xl border border-[#E8DFC8] shadow-sm">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-[#1A1817]">Reset Password</h1>
          <p className="text-xs text-[#8C837A] mt-1">
            Enter your new password below.
          </p>
        </div>

        {status.message && (
          <div
            className={`p-3 rounded-xl text-xs font-medium mb-4 ${
              status.type === "error"
                ? "bg-red-50 text-red-600 border border-red-200"
                : status.type === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-amber-50 text-amber-700 border border-amber-200"
            }`}
          >
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#1A1817] mb-1">
              New Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DFC8] bg-white text-xs text-[#1A1817] focus:outline-none focus:ring-2 focus:ring-[#C85A2B]/20 focus:border-[#C85A2B] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1A1817] mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DFC8] bg-white text-xs text-[#1A1817] focus:outline-none focus:ring-2 focus:ring-[#C85A2B]/20 focus:border-[#C85A2B] transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={status.type === "loading"}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-[#C85A2B] hover:bg-[#B85024] disabled:opacity-50 transition-colors mt-2"
          >
            {status.type === "loading" ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <div className="text-center mt-6">
          <Link
            href="/auth/sign-in"
            className="text-xs font-medium text-[#8C837A] hover:text-[#1A1817] transition-colors"
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-xs text-[#8C837A]">
          Loading...
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}