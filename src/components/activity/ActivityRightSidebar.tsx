"use client";

import React from "react";
import PeopleToFollowCard from "../home/PeopleToFollowCard";
import YourWeekCard from "./YourWeekCard";

export default function ActivityRightSidebar() {
  return (
    <aside className="w-80 shrink-0 p-4 space-y-5 hidden xl:block bg-[#F2EDE5]/30 border-l border-[#EFE8DF]">

      <PeopleToFollowCard />

      <YourWeekCard booksFinished={3} pagesRead={842} reviewsWritten={1} />
    </aside>
  );
}