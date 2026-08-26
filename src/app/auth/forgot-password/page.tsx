"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BookText } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reset link requested for:", email);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen w-full bg-[#FAF7F2] flex items-center justify-center p-4 text-[#1A1817]">
      <div className="w-full max-w-md space-y-6">

        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#B85024] flex items-center justify-center text-white shadow-2xs">
            <BookText className="w-6 h-6 stroke-[2]" />
          </div>
          <span className="font-serif text-2xl font-bold text-[#1A1817]">
            Bookshelf
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1817] tracking-tight">
            Forgot your password?
          </h1>
          <p className="text-sm text-[#736B63] leading-relaxed">
            No worries. Enter your email and we will send you a link to reset it.
          </p>
        </div>

        {isSubmitted ? (
          <div className="bg-[#F5F0EB] border border-[#E8E0D5] rounded-2xl p-6 text-center space-y-4 shadow-2xs">
            <p className="text-sm font-semibold text-[#1A1817]">
              Check your inbox!
            </p>
            <p className="text-xs text-[#736B63]">
              We sent a password reset link to <span className="font-semibold text-[#1A1817]">{email}</span>.
            </p>
            <button
              type="button"
              onClick={() => setIsSubmitted(false)}
              className="text-xs font-bold text-[#B85024] hover:underline"
            >
              Try another email
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-xs font-bold text-[#1A1817]"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-2xl bg-[#F5F0EB] border border-[#E8E0D5] text-sm text-[#1A1817] placeholder-[#A0958B] focus:outline-none focus:border-[#B85024] focus:ring-1 focus:ring-[#B85024] transition-all"
              />
            </div>

            <div className="space-y-3 pt-2">
              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-[#B85024] hover:bg-[#A3431D] active:bg-[#8F3918] text-white font-semibold text-sm rounded-2xl transition-colors shadow-2xs cursor-pointer"
              >
                Send Reset Link
              </button>

              <Link
                href="auth/sign-in"
                className="w-full flex items-center justify-center gap-1 py-3.5 px-4 bg-[#F5F0EB] hover:bg-[#EFE8DF] border border-[#E8E0D5] text-[#1A1817] font-semibold text-sm rounded-2xl transition-colors cursor-pointer"
              >
                &larr; Back to Sign In
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}