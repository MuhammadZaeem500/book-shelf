"use client";

const peopleToFollow = [
  {
    initials: "ER",
    bg: "#5C2333",
    name: "Elena R.",
    mutual: 4,
    books: 23,
  },
  {
    initials: "KM",
    bg: "#0B253A",
    name: "Kai M.",
    mutual: 2,
    books: 38,
  },
  {
    initials: "LJ",
    bg: "#2A4B17",
    name: "Layla J.",
    mutual: 6,
    books: 15,
  },
];
export default function PeopleToFollowCard() {
  return (
    <div className="bg-[#FAF7F2] border border-[#E8E0D5] rounded-3xl p-5 space-y-4">
      <h3 className="font-serif font-bold text-xl text-[#1A1817]">
        People to Follow
      </h3>

      <div className="space-y-4">
        {peopleToFollow.map((person) => (
          <div
            key={person.name}
            className="flex items-center justify-between gap-2"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full text-white font-bold text-xs flex items-center justify-center shrink-0"
                style={{ backgroundColor: person.bg }}
              >
                {person.initials}
              </div>

              <div className="min-w-0">
                <p className="font-bold text-sm text-[#1A1817] truncate">
                  {person.name}
                </p>
                <p className="text-xs text-[#8C837A] truncate">
                  {person.mutual} mutual · {person.books} books
                </p>
              </div>
            </div>

            <button className="px-3 py-1 rounded-full border border-[#C85A2B] text-[#C85A2B] text-xs font-semibold hover:bg-[#C85A2B] hover:text-white transition-colors shrink-0">
              Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
