"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

function VerifyForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const rawEmail = searchParams.get("email") || "";
  const [email, setEmail] = useState(
    rawEmail ? decodeURIComponent(rawEmail).trim().toLowerCase() : "",
  );
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<{
    type: "idle" | "loading" | "success" | "error";
    message: string;
  }>({ type: "idle", message: "" });

  const [cooldown, setCooldown] = useState(0);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "" });

    const cleanEmail = email.trim().toLowerCase();
    const cleanCode = code.trim();

    if (!cleanEmail) {
      setStatus({ type: "error", message: "Please enter your email address." });
      return;
    }

    if (cleanCode.length !== 6) {
      setStatus({
        type: "error",
        message: "Please enter a valid 6-digit verification code.",
      });
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const res = await fetch(`${apiUrl}/auth/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail, code: cleanCode }),
      });

      const data = await res.json();

      if (!res.ok) {
        const message = Array.isArray(data.message)
          ? data.message[0]
          : data.message;
        throw new Error(message || "Verification failed");
      }

      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
      }

      setStatus({
        type: "success",
        message: "Email verified successfully! Redirecting...",
      });
      setTimeout(() => {
        router.push(
          `/auth/sign-in?email=${encodeURIComponent(cleanEmail)}&verified=true`,
        );
      }, 1500);
    } catch (err: any) {
      setStatus({
        type: "error",
        message: err.message || "Something went wrong. Please try again.",
      });
    }
  };

  const handleResendOtp = async () => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      setStatus({
        type: "error",
        message: "Please enter your email to resend the code.",
      });
      return;
    }

    setResending(true);
    setStatus({ type: "idle", message: "" });

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const res = await fetch(`${apiUrl}/auth/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail }),
      });

      const data = await res.json();

      if (!res.ok) {
        const message = Array.isArray(data.message)
          ? data.message[0]
          : data.message;
        throw new Error(message || "Failed to resend code.");
      }

      setStatus({
        type: "success",
        message: "A new verification code has been sent to your email.",
      });
      setCooldown(60); // 60s cooldown timer
    } catch (err: any) {
      setStatus({
        type: "error",
        message: err.message || "Failed to resend code.",
      });
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#FAF7F2] p-8 rounded-2xl border border-[#E8DFC8] shadow-sm">
        <h1 className="text-xl font-bold text-[#1A1817] text-center">
          Verify Email
        </h1>
        <p className="text-xs text-[#8C837A] text-center mt-1">
          Enter the 6-digit code sent to your email
        </p>

        {status.message && (
          <div
            className={`p-3 border text-xs rounded-xl mt-4 text-center font-medium ${
              status.type === "error"
                ? "bg-red-50 text-red-600 border-red-200"
                : "bg-green-50 text-green-700 border-green-200"
            }`}
          >
            {status.message}
          </div>
        )}

        <form onSubmit={handleVerify} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#1A1817] mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DFC8] bg-white text-xs text-[#1A1817] focus:outline-none focus:ring-2 focus:ring-[#C85A2B]/20 focus:border-[#C85A2B]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1A1817] mb-1">
              Verification Code
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              placeholder="123456"
              maxLength={6}
              required
              className="w-full text-center tracking-[0.5em] text-xl font-bold px-3.5 py-2.5 rounded-xl border border-[#E8DFC8] bg-white text-[#1A1817] focus:outline-none focus:ring-2 focus:ring-[#C85A2B]/20 focus:border-[#C85A2B]"
            />
          </div>

          <button
            type="submit"
            disabled={status.type === "loading" || code.length !== 6 || !email}
            className="w-full py-2.5 rounded-xl text-xs font-semibold text-white bg-[#C85A2B] hover:bg-[#B85024] disabled:opacity-50 transition-colors"
          >
            {status.type === "loading" ? "Verifying..." : "Verify Account"}
          </button>
        </form>

        <div className="text-center mt-6 space-y-2">
          <div>
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={cooldown > 0 || resending || !email}
              className="text-xs font-semibold text-[#C85A2B] hover:underline disabled:opacity-50 disabled:no-underline"
            >
              {resending
                ? "Resending..."
                : cooldown > 0
                  ? `Resend code in ${cooldown}s`
                  : "Didn't receive a code? Resend Code"}
            </button>
          </div>

          <div>
            <Link
              href="/auth/sign-up"
              className="text-xs text-[#8C837A] hover:text-[#1A1817] transition-colors"
            >
              Back to Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-xs text-[#8C837A]">
          Loading...
        </div>
      }
    >
      <VerifyForm />
    </Suspense>
  );
}
