"use client";

import { SettingsSectionProps } from "@/src/types";

export default function SettingsSection({
  title,
  children,
  isDanger = false,
}: SettingsSectionProps) {
  return (
    <div className="space-y-2.5">
      <h2
        className={`text-[11px]   tracking-wider uppercase px-0.5 ${
          isDanger ? "text-[#9E3A34]" : "text-[#B85024]"
        }`}
      >
        {title}
      </h2>
      <div
        className={`border rounded-2xl p-4 sm:p-5 shadow-2xs space-y-4 ${
          isDanger
            ? "bg-[#FFF8F7] border-[#FCD8D4]"
            : "bg-[#F5F0EB] border-[#E8E0D5]"
        }`}
      >
        {children}
      </div>
    </div>
  );
}