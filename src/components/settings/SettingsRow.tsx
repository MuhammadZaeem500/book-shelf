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
      className={`flex items-center justify-between ${
        !isLast ? "pb-4 border-b border-[#E8E0D5]" : ""
      }`}
    >
      <div className="space-y-0.5">
        <h3 className="text-sm font-bold text-[#1A1817]">{title}</h3>
        {subtitle && <p className="text-xs text-[#736B63]">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}