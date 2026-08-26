"use client";

import React from "react";

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
  isDanger?: boolean;
}

export default function SettingsSection({
  title,
  children,
  isDanger = false,
}: SettingsSectionProps) {
  return (
    <div className="space-y-3">
      <h2
        className={`text-xs font-bold tracking-wider uppercase ${
          isDanger ? "text-[#8C837A]" : "text-[#B85024]"
        }`}
      >
        {title}
      </h2>
      <div
        className={`border rounded-2xl p-5 shadow-2xs ${
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