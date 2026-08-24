"use client";

import React from "react";
import ReadingGoalCard from "@/src/components/library/ReadingGoalCard";
import RecentReadingSidebarCard from "./RecentReadingSidebarCard";

export default function ProfileRightSidebar() {
  return (
    <aside className="w-80 shrink-0 p-4 space-y-5 hidden xl:block bg-[#F2EDE5]/30 border-l border-[#EFE8DF]">
      <ReadingGoalCard year={2026} booksRead={47} targetBooks={60} />

      <RecentReadingSidebarCard />
    </aside>
  );
}