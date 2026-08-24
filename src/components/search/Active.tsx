"use client";

import React from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

interface AccordionItemProps {
  id: string;
  label: string;
  icon: React.ElementType;
  isActive: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export default function AccordionItem({
  label,
  icon: Icon,
  isActive,
  onToggle,
  children,
}: AccordionItemProps) {
  return (
    <div className="transition-all duration-200">
      <button
        type="button"
        onClick={onToggle}
        className={`w-full flex items-center justify-between p-4 text-left transition-all ${
          isActive
            ? "border-2 border-[#2B7FFF] bg-[#FAF7F2] rounded-xl shadow-xs"
            : "hover:bg-[#F2EAE0]/50"
        }`}
      >
        <div className="flex items-center gap-3">
          <Icon
            className={`w-5 h-5 ${
              isActive ? "text-[#C85A2B]" : "text-[#524B45]"
            }`}
          />
          <span className="font-semibold text-sm sm:text-base text-[#1A1817]">
            {label}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {isActive && (
            <span className="text-[10px] font-extrabold tracking-wider text-[#C85A2B] uppercase">
              ACTIVE
            </span>
          )}
          {isActive ? (
            <ChevronUp className="w-4 h-4 text-[#C85A2B]" />
          ) : (
            <ChevronDown className="w-4 h-4 text-[#8C837A]" />
          )}
        </div>
      </button>

      {isActive && children}
    </div>
  );
}