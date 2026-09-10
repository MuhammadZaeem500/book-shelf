"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, BookOpen } from "lucide-react";
import { fetchApi } from "@/src/app/lib/api";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    displayName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
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

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await fetchApi<{
        access_token: string;
        user: { id: string; email: string; name?: string; username?: string };
      }>("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name: formData.displayName,
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      router.push("/auth/verify-email");
    } catch (err: any) {
      setError(err.message || "Failed to create account. Please try again.");
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
            Create your account
          </h1>
          <p className="text-sm text-[#736B63]">
            Join thousands of readers on Bookshelf.
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
              htmlFor="displayName"
              className="block text-xs font-bold text-[#1A1817]"
            >
              Display name
            </label>
            <input
              type="text"
              id="displayName"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              placeholder="Alex Johnson"
              required
              className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#E8E0D5] text-sm text-[#1A1817] placeholder-[#A09589] focus:outline-none focus:border-[#C85A2B] focus:ring-1 focus:ring-[#C85A2B] transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="username"
              className="block text-xs font-bold text-[#1A1817]"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="alexj"
              required
              className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#E8E0D5] text-sm text-[#1A1817] placeholder-[#A09589] focus:outline-none focus:border-[#C85A2B] focus:ring-1 focus:ring-[#C85A2B] transition-all"
            />
          </div>

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
              placeholder="you@example.com"
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

          <div className="space-y-1.5">
            <label
              htmlFor="confirmPassword"
              className="block text-xs font-bold text-[#1A1817]"
            >
              Confirm password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#E8E0D5] text-sm text-[#1A1817] placeholder-[#A09589] focus:outline-none focus:border-[#C85A2B] focus:ring-1 focus:ring-[#C85A2B] transition-all pr-11"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#736B63] hover:text-[#1A1817] transition-colors"
                aria-label="Toggle confirm password visibility"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2.5 pt-1">
            <input
              type="checkbox"
              id="agreeToTerms"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              required
              className="w-4 h-4 rounded border-[#E8E0D5] text-[#C85A2B] focus:ring-[#C85A2B] accent-[#C85A2B] cursor-pointer"
            />
            <label
              htmlFor="agreeToTerms"
              className="text-xs text-[#524B45] cursor-pointer leading-tight"
            >
              I agree to the{" "}
              <Link
                href="/terms"
                className="text-[#C85A2B] font-semibold hover:underline"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-[#C85A2B] font-semibold hover:underline"
              >
                Privacy Policy
              </Link>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-[#B85024] hover:bg-[#A3431D] active:bg-[#8F3918] text-white font-semibold text-sm rounded-xl transition-colors shadow-xs disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-xs text-[#736B63] pt-2">
          Already have an account?{" "}
          <Link
            href="/auth/sign-in"
            className="text-[#C85A2B] font-semibold hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}