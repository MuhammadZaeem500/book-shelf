"use client";

import React from "react";

interface SettingsRowProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  isLast?: boolean;
}

export default function SettingsRow({
  title,
  subtitle,
  children,
  isLast = false,
}: SettingsRowProps) {
  return (
    <div
      className={`flex items-center justify-between gap-4 py-1.5 ${
        !isLast ? "pb-4 border-b border-[#E8E0D5]" : ""
      }`}
    >
      <div className="space-y-0.5 min-w-0 flex-1">
        <h3 className="text-sm font-semibold text-[#1A1817] leading-snug tracking-tight">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs font-normal text-[#736B63] leading-relaxed truncate">
            {subtitle}
          </p>
        )}
      </div>
      <div className="shrink-0 flex items-center justify-end">{children}</div>
    </div>
  );
}