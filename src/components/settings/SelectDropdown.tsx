"use client";

import React from "react";
import { ChevronDown } from "lucide-react";

interface SelectDropdownProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

export default function SelectDropdown({
  value,
  options,
  onChange,
}: SelectDropdownProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-[#EFE8DF] border border-[#E4DBCF] rounded-xl px-4 py-2 pr-9 text-xs font-semibold text-[#1A1817] focus:outline-none cursor-pointer"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown className="w-4 h-4 text-[#736B63] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
    </div>
  );
}   