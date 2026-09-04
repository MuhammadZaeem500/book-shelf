"use client";

import { useAuth } from "@/src/app/context/AuthContext";
import { ProfileAvatarModalProps } from "@/src/types";

export default function ProfileAvatarModal({
  isOpen,
  onClose,
  onSignOut,
  onAddAccount,
  userName: propName,
  userEmail: propEmail,
}: ProfileAvatarModalProps) {
  const { user } = useAuth();

  const name =
    propName || user?.name || user?.email?.split("@")[0] || "Book Reader";
  const email = propEmail || user?.email || "";

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
      <div className="w-full max-w-sm rounded-2xl bg-[#FAF7F2] p-6 shadow-xl border border-[#E8DFC8]">

        <div className="flex items-center gap-3 pb-4 border-b border-[#EFE8DF]">
          <div className="w-12 h-12 rounded-full bg-[#C85A2B] text-white font-bold flex items-center justify-center text-base">
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2)}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-sm text-[#1A1817] truncate">
              {name}
            </h3>
            <p className="text-xs text-[#8C837A] truncate">{email}</p>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="pt-4 space-y-2">
          <button
            type="button"
            onClick={onAddAccount}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-[#1A1817] bg-[#F2EAE0] hover:bg-[#EFE3D8] transition-colors"
          >
            Add another account
          </button>
          <button
            type="button"
            onClick={onSignOut}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
          >
            Sign Out
          </button>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full text-center text-xs font-medium text-[#8C837A] hover:text-[#1A1817]"
        >
          Close
        </button>
      </div>
    </div>
  );
}
