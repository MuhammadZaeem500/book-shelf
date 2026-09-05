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
        user: { id: string; email: string; name?: string };
      }>("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name: formData.displayName || formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      // Redirect directly to Sign In page upon success
      router.push("/auth/sign-in");
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
            className="w-full py-3.5 px-4 bg-[#B85024] hover:bg-[#A3431D] active:bg-[#8F3918] text-white font-semibold text-sm rounded-xl transition-colors shadow-xs disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* <div className="relative flex items-center justify-center my-6">
          <div className="w-full border-t border-[#E8E0D5]" />
          <span className="absolute bg-[#F5F0EB] px-3 text-[11px] font-bold text-[#8C837A] tracking-wider uppercase">
            OR
          </span>
        </div> */}

        {/* <button
          type="button"
          className="w-full py-3 px-4 bg-[#FAF7F2] hover:bg-[#EFE8DF] border border-[#E8E0D5] rounded-xl font-semibold text-xs sm:text-sm text-[#1A1817] flex items-center justify-center gap-3 transition-colors shadow-2xs"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          Sign up with Google
        </button> */}

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
