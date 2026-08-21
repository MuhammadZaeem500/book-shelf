import React from "react";
import Image from "next/image";
import BooksCard from "./_components/booksCard";
import ContinueReadingCard from "./_components/continueReadingCard";
import vercel from "../../../public/vercel.svg";

const cardsData = [
  {
    id: 1,
    imageSrc: "/hero-1.jpg",
    imageAlt: "Analytics Overview",
    title: "Analytics Overview",
    author: "John Doe",
  },
  {
    id: 2,
    imageSrc: "/hero-1.jpg",
    imageAlt: "Financial Reports",
    title: "Financial Reports",
    author: "Jane Smith",
  },
  {
    id: 3,
    imageSrc: "/hero-1.jpg",
    imageAlt: "User Management",
    title: "User Management",
    author: "Alex Johnson",
  },
  {
    id: 4,
    imageSrc: "/hero-1.jpg",
    imageAlt: "System Settings",
    title: "System Settings",
    author: "Emily Davis",
  },
  {
    id: 5,
    imageSrc: "/hero-1.jpg",
    imageAlt: "Sales Pipeline",
    title: "Sales Pipeline",
    author: "Michael Brown",
  },
  {
    id: 6,
    imageSrc: "/hero-1.jpg",
    imageAlt: "Security Dashboard",
    title: "Security Dashboard",
    author: "Sarah Wilson",
  },
  {
    id: 7,
    imageSrc: "/hero-1.jpg",
    imageAlt: "System Health",
    title: "System Health",
    author: "David Lee",
  },
  {
    id: 8,
    imageSrc: "/hero-1.jpg",
    imageAlt: "Alert Center",
    title: "Alert Center",
    author: "Chris Taylor",
  },
];

export default function Home() {
  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto bg-[#FFFFFF]">
      <div className="text-[#1C1510] text-xl font-bold"> Continue Reading </div>

      <ContinueReadingCard
        title="Atomic Habits"
        author="James Clear"
        description="Build better habits and routines that stick with small, consistent changes."
        currentPage={32}
        totalPages={320}
      />

      <section>
        <h2 className="text-2xl font-bold text-[#1C1510] ">
          Popular This Week
        </h2>
        <p className="text-sm  text-[#6B5D4F] mb-6">Popular This Week</p>

        <div className="flex md:grid md:grid-cols-4 gap-5 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-thin">
          {cardsData.map((card) => (
            <div
              key={card.id}
              className="shrink-0 w-50 sm:w-62.5 md:w-auto snap-center flex flex-col gap-2"
            >
              <BooksCard
                imageSrc={card.imageSrc}
                imageAlt={card.imageAlt}
                title={card.title}
                author={card.author}
              />

              <div className="text-sm">
                <p className="font-semibold text-[#1C1510]">{card.title}</p>
                <p className="text-[#6B5D4F] text-xs">By {card.author}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
