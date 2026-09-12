"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, BookOpen } from "lucide-react";
import { useAuth } from "@/src/app/context/AuthContext";
import { fetchApi } from "@/src/app/lib/api";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetchApi<{
        access_token: string;
        user?: { id: string; email: string; name?: string };
      }>("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!res?.access_token) {
        throw new Error("Invalid response from server. Missing token.");
      }

      const userPayload = res.user || {
        id: "user",
        email: formData.email,
        name: formData.email.split("@")[0],
      };

      login(res.access_token, userPayload);
    } catch (err: any) {
      const msg = err.message || "Invalid email or password. Please try again.";

      if (
        msg.toLowerCase().includes("verify") ||
        msg.toLowerCase().includes("not verified")
      ) {
        router.push(
          `/auth/verify-email?email=${encodeURIComponent(formData.email)}`,
        );
        return;
      }

      setError(msg);
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
            Welcome back
          </h1>
          <p className="text-sm text-[#736B63]">
            Sign in to continue your reading journey.
          </p>
        </div>

        {error && (
          <div className="p-3 text-xs bg-red-50 text-red-600 border border-red-200 rounded-xl">
            {error}
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
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#E8E0D5] text-sm text-[#1A1817] placeholder-[#A09589] focus:outline-none focus:border-[#C85A2B] focus:ring-1 focus:ring-[#C85A2B] transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="block text-xs font-bold text-[#1A1817]"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#E8E0D5] text-sm text-[#1A1817] placeholder-[#A09589] focus:outline-none focus:border-[#C85A2B] focus:ring-1 focus:ring-[#C85A2B] transition-all pr-11"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#736B63] hover:text-[#1A1817] transition-colors"
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <Link
              href="/auth/forgot-password"
              className="text-xs text-[#C85A2B] font-semibold hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-[#B85024] hover:bg-[#A3431D] active:bg-[#8F3918] text-white font-semibold text-sm rounded-xl transition-colors shadow-xs mt-2 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-xs text-[#736B63] pt-2">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/sign-up"
            className="text-[#C85A2B] font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}