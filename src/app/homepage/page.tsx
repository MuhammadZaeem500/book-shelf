import React from "react";
import Image from "next/image";
import BooksCard from "./_components/booksCard";
import ContinueReadingCard from "./_components/continueReadingCard";
import vercel from "../../../public/vercel.svg";
import FriendActivityCard from "./_components/FriendActivityCard";
import RecommendedBookCard from "./_components/RecommendedBookCard";

const friendsList = [
  {
    initials: "MK",
    avatarBg: "#8C4611",
    name: "Mia K.",
    action: "is reading" as const,
    bookTitle: "Dune",
    timeAgo: "2h ago",
    coverBg: "linear-gradient(135deg, #B25A00, #4A2000)",
  },
  {
    initials: "OT",
    avatarBg: "#2B546A",
    name: "Oliver T.",
    action: "finished" as const,
    bookTitle: "The Night Circus",
    rating: 5,
    timeAgo: "Yesterday",
    coverBg: "linear-gradient(135deg, #182848, #4B6CB7)",
  },
  {
    initials: "PS",
    avatarBg: "#2A4B17",
    name: "Priya S.",
    action: "added to library" as const,
    bookTitle: "Pachinko",
    timeAgo: "3h ago",
    coverBg: "linear-gradient(135deg, #3A7BD5, #3A6073)",
  },
  {
    initials: "JW",
    avatarBg: "#5C1D2E",
    name: "James W.",
    action: "finished" as const,
    bookTitle: "Piranesi",
    rating: 4,
    timeAgo: "2d ago",
    coverBg: "linear-gradient(135deg, #8E2DE2, #4A00E0)",
  },
  {
    initials: "SL",
    avatarBg: "#341352",
    name: "Sophie L.",
    action: "is reading" as const,
    bookTitle: "Intermezzo",
    timeAgo: "5h ago",
    coverBg: "linear-gradient(135deg, #2C3E50, #000000)",
  },
  {
    initials: "AR",
    avatarBg: "#9E2A2B",
    name: "Alex R.",
    action: "finished" as const,
    bookTitle: "Tomorrow, and Tomorrow, and Tomorrow",
    rating: 5,
    timeAgo: "1d ago",
    coverBg: "linear-gradient(135deg, #D4145A, #FBB03B)",
  },
];

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
const recommendedList = [
  {
    id: 1,
    title: "The Night Circus",
    author: "Erin Morgenstern",
    rating: 4,
    coverBg: "linear-gradient(135deg, #0F2027, #203A43, #2C5364)",
  },
  {
    id: 2,
    title: "Pachinko",
    author: "Min Jin Lee",
    rating: 4,
    coverBg: "linear-gradient(135deg, #11998E, #38EF7D)",
  },
  {
    id: 3,
    title: "Piranesi",
    author: "Susanna Clarke",
    rating: 4,
    coverBg: "linear-gradient(135deg, #8A2387, #E94057, #F27121)",
  },
  {
    id: 4,
    title: "Dune",
    author: "Frank Herbert",
    rating: 4,
    coverBg: "linear-gradient(135deg, #B25A00, #4A2000)",
  },
  {
    id: 5,
    title: "Atlas Shrugged",
    author: "Ayn Rand",
    rating: 4,
    coverBg: "linear-gradient(135deg, #232526, #414345)",
  },
  {
    id: 6,
    title: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    rating: 5,
    coverBg: "linear-gradient(135deg, #FF512F, #DD2476)",
  },
];

export default function Home() {
  return (

<div className="p-6 lg:pl-50 space-y-8 max-w-8xl mx-auto bg-[#FFFFFF] pb-24 lg:pb-8">
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
        <p className="text-sm text-[#6B5D4F] mb-6">Popular This Week</p>

        <div className="flex md:grid md:grid-cols-4 gap-5 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-thin">
          {cardsData.map((card) => (
            <div
              key={card.id}
              className="shrink-0 w-[200px] sm:w-[250px] md:w-auto snap-center flex flex-col gap-2"
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto p-4">
      {/* 1. Friends Reading Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-serif font-bold text-2xl text-[#1A1817]">
            Friends Reading
          </h3>
          <button className="text-sm font-medium text-[#C85A2B] hover:underline flex items-center gap-1">
            See all →
          </button>
        </div>

        <div className="bg-[#FAF7F2] border border-[#EFE8DF] rounded-3xl overflow-hidden shadow-sm">
          {friendsList.map((friend, index) => (
            <FriendActivityCard key={index} {...friend} />
          ))}

          <div className="p-4 bg-[#FAF7F2] border-t border-[#EFE8DF] text-center">
            <button className="text-sm font-medium text-[#C85A2B] hover:underline">
              View all activity →
            </button>
          </div>
        </div>
      </section>

      {/* 2. Recommended for You Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif font-bold text-2xl text-[#1A1817]">
              Recommended for You
            </h3>
            <p className="text-xs text-[#8C837A]">Based on your library</p>
          </div>
          <button className="text-sm font-medium text-[#C85A2B] hover:underline flex items-center gap-1">
            See all →
          </button>
        </div>

        <div className="space-y-3">
          {recommendedList.map((book) => (
            <RecommendedBookCard
              key={book.id}
              {...book}
              onAdd={() => alert(`Added ${book.title}`)}
            />
          ))}
        </div>
      </section>
    </div>
    </div>
    
  );
}