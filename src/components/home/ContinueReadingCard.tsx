import Image from "next/image";
import { BookData } from "@/src/types";

export default function ContinueReadingCard({
  title,
  author,
  description,
  currentPage,
  totalPages,
  coverImage,
  onContinue,
  onDetails,
}: BookData) {
  const percentage = Math.round((currentPage / totalPages) * 100);

  return (
    <div className="w-full max-w-4xl font-sans">
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-[#2A160A] via-[#3B1F0E] to-[#4D2710] p-6 text-[#E6D7CB] shadow-xl">
        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
          <div className="relative shrink-0 w-36 h-52 rounded-xl overflow-hidden shadow-2xl bg-linear-to-b from-[#D4823A] to-[#6E3C14] border border-white/10 p-3 flex flex-col justify-between">
            {coverImage ? (
              <Image
                src={coverImage}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 150px"
              />
            ) : (
              <>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-white/60">
                  BOOKSHELF
                </span>
                <div>
                  <h4 className="text-sm font-serif font-bold text-white leading-tight">
                    {title}
                  </h4>
                  <p className="text-[10px] text-white/70 mt-0.5">{author}</p>
                </div>
              </>
            )}
          </div>

          <div className="flex-1 flex flex-col justify-between w-full space-y-4">
            <div>
              <span className="text-xs font-bold tracking-widest uppercase text-[#C86D31]">
                CURRENTLY READING
              </span>
              <h1 className="text-3xl font-serif font-bold text-white mt-1">
                {title}
              </h1>
              <p className="text-sm text-[#B89F8D] font-medium mt-1">
                {author}
              </p>
              <p className="text-sm text-[#8C7463] mt-2 line-clamp-2">
                {description}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="text-[#8C7463]">
                  Page {currentPage} of {totalPages}
                </span>
                <span className="text-sm font-bold text-[#E0A86A]">
                  {percentage}%
                </span>
              </div>

              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#D4823A] to-[#E0A86A] transition-all duration-300 rounded-full"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={onContinue}
                className="flex-1 py-2.5 px-5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                Continue Reading &rarr;
              </button>
              <button
                onClick={onDetails}
                className="py-2.5 px-6 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors"
              >
                Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
