"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Mail } from "lucide-react";
import { fetchApi } from "@/src/app/lib/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      await fetchApi<{ message: string }>("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      });

      setSuccess(
        "If an account exists with that email, a password reset link has been sent."
      );
      setEmail("");
    } catch (err: any) {
      setError(
        err.message || "Failed to send reset request. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F5F0EB] flex items-center justify-center p-4 sm:p-6 lg:p-8 text-[#1A1817]">
      <div className="w-full max-w-md space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#C85A2B] flex items-center justify-center text-white shadow-xs">
            <BookOpen className="w-5 h-5 stroke-[2.5]" />
          </div>
          <span className="font-serif font-bold text-2xl text-[#1A1817]">
            Bookshelf
          </span>
        </div>

        <div className="space-y-1">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1817] tracking-tight">
            Reset Password
          </h1>
          <p className="text-sm text-[#736B63]">
            Enter your email address and we&apos;ll send you instructions to reset your password.
          </p>
        </div>

        {error && (
          <div className="p-3 text-xs bg-red-50 text-red-600 border border-red-200 rounded-xl">
            {error}
          </div>
        )}

        {success && (
          <div className="p-3.5 text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl leading-relaxed">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="block text-xs font-bold text-[#1A1817]"
            >
              Email address
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#E8E0D5] text-sm text-[#1A1817] placeholder-[#A09589] focus:outline-none focus:border-[#C85A2B] focus:ring-1 focus:ring-[#C85A2B] transition-all pr-10"
              />
              <Mail className="w-4 h-4 text-[#8C837A] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-[#B85024] hover:bg-[#A3431D] text-white font-semibold text-sm rounded-xl transition-colors shadow-xs mt-2 disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Sending link..." : "Send Reset Link"}
          </button>
        </form>

        <div className="pt-2 text-center">
          <Link
            href="/auth/sign-in"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#524B45] hover:text-[#1A1817] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}