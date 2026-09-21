"use client";

import { useState, useEffect } from "react";
import AccordionItem from "@/src/components/search/AccordionItem";
import {
  Search,
  Type,
  PenTool,
  Tag,
  Calendar,
  Globe,
  Hash,
} from "lucide-react";

const popularAuthors = [
  "Colm Tóibín",
  "Sally Rooney",
  "Kazuo Ishiguro",
  "Zadie Smith",
  "Colson Whitehead",
  "James Clear",
  "Frank Herbert",
];

const genres = [
  "Fantasy",
  "Science Fiction",
  "Mystery",
  "Thriller",
  "Romance",
  "Horror",
  "Historical Fiction",
  "Biography",
  "Literary Fiction",
  "Adventure",
  "Self-Help",
  "Poetry",
  "Science",
  "Philosophy",
  "Graphic Novel",
  "Sci-Fi",
];

const quickSelectEras = [
  { label: "Classic", sub: "Before 1950" },
  { label: "Mid-Century", sub: "1950–1979" },
  { label: "Modern", sub: "1980–1999" },
  { label: "Contemporary", sub: "2000–2015" },
  { label: "Recent", sub: "2016 onwards" },
];

const languages = [
  "English",
  "Urdu",
  "Spanish",
  "French",
  "German",
  "Arabic",
  "Japanese",
  "Portuguese",
  "Italian",
  "Other",
];

export default function BookFinder() {
  const [activeSection, setActiveSection] = useState<string | null>("title");
  const [mainSearch, setMainSearch] = useState("");
  const [titleQuery, setTitleQuery] = useState("");
  const [authorQuery, setAuthorQuery] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [fromYear, setFromYear] = useState("1900");
  const [toYear, setToYear] = useState("2026");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [isbnQuery, setIsbnQuery] = useState("");
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const hasActiveQuery = Boolean(
    mainSearch.trim() ||
    titleQuery.trim() ||
    authorQuery.trim() ||
    selectedAuthor ||
    selectedGenre ||
    selectedLanguage ||
    isbnQuery.trim() ||
    (fromYear && fromYear !== "1900")
  );

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  useEffect(() => {

    if (!hasActiveQuery) {
      setBooks([]);
      setLoading(false);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setLoading(true);
      try {
        const searchParams = new URLSearchParams();

        if (mainSearch.trim()) searchParams.append("q", mainSearch.trim());
        if (titleQuery.trim()) searchParams.append("title", titleQuery.trim());
        
        const activeAuthor = authorQuery.trim() || selectedAuthor;
        if (activeAuthor) searchParams.append("author", activeAuthor);

        if (selectedGenre) searchParams.append("genre", selectedGenre);
        if (selectedLanguage) searchParams.append("language", selectedLanguage);
        if (isbnQuery.trim()) searchParams.append("isbn", isbnQuery.trim());

        if (fromYear && fromYear !== "1900") {
          searchParams.append("releaseDate", `${fromYear}-01-01`);
        }

        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";
        const token = typeof window !== "undefined" ? localStorage.getItem("access_token") || "" : "";

        const res = await fetch(`${backendUrl}/books/search?${searchParams.toString()}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const result = await res.json();
          setBooks(Array.isArray(result) ? result : result.data || []);
        } else {
          console.error("Failed to fetch search results");
        }
      } catch (error) {
        console.error("Error connecting to backend search:", error);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [mainSearch, titleQuery, authorQuery, selectedAuthor, selectedGenre, fromYear, selectedLanguage, isbnQuery]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 space-y-6 text-[#1A1817] bg-[#FFFFFF]">
      <div className="space-y-1">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#1A1817]">
          Find your next book
        </h1>
        <p className="text-sm text-[#736B63]">
          Search by title, author, ISBN, or browse by category.
        </p>
      </div>

      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#8C837A]">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={mainSearch}
          onChange={(e) => setMainSearch(e.target.value)}
          placeholder="Search books, authors, or ISBN..."
          className="w-full pl-12 pr-14 py-3.5 bg-[#FAF7F2] border border-[#E8E0D5] rounded-2xl text-base text-[#1A1817] placeholder-[#A0958B] focus:outline-none focus:ring-2 focus:ring-[#C85A2B]/40 focus:border-[#C85A2B] transition-all"
        />
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
          <kbd className="hidden sm:inline-block px-2 py-1 text-xs font-semibold text-[#8C837A] bg-[#EFE8DF] rounded-md border border-[#E0D8CE]">
            ⌘K
          </kbd>
        </div>
      </div>

      <div className="space-y-4 pt-2">
        <h2 className="font-serif font-bold text-lg text-[#1A1817]">
          Browse by
        </h2>

        <div className="border border-[#EFE8DF] rounded-2xl bg-[#FAF7F2] overflow-hidden divide-y divide-[#EFE8DF] shadow-sm">
          <AccordionItem
            id="title"
            label="Title"
            icon={Type}
            isActive={activeSection === "title"}
            onToggle={() => toggleSection("title")}
          >
            <div className="p-4 sm:p-5 space-y-3 bg-[#FAF7F2]">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#8C837A]">
                  <Type className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={titleQuery}
                  onChange={(e) => setTitleQuery(e.target.value)}
                  placeholder="Search by book title..."
                  className="w-full pl-10 pr-4 py-3 bg-[#EFE8DF]/60 border border-[#E0D8CE] rounded-xl text-sm text-[#1A1817] placeholder-[#8C837A] focus:outline-none focus:border-[#C85A2B]"
                />
              </div>
            </div>
          </AccordionItem>

          <AccordionItem
            id="author"
            label="Author"
            icon={PenTool}
            isActive={activeSection === "author"}
            onToggle={() => toggleSection("author")}
          >
            <div className="p-4 sm:p-5 space-y-4 bg-[#FAF7F2]">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#8C837A]">
                  <PenTool className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={authorQuery}
                  onChange={(e) => {
                    setAuthorQuery(e.target.value);
                    setSelectedAuthor("");
                  }}
                  placeholder="Search by author name..."
                  className="w-full pl-10 pr-4 py-3 bg-[#EFE8DF]/60 border border-[#E0D8CE] rounded-xl text-sm text-[#1A1817] placeholder-[#8C837A] focus:outline-none focus:border-[#C85A2B]"
                />
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-bold tracking-wider text-[#8C837A] uppercase">
                  Popular Authors
                </span>
                <div className="flex flex-wrap gap-2">
                  {popularAuthors.map((author) => (
                    <button
                      key={author}
                      onClick={() => {
                        setSelectedAuthor(selectedAuthor === author ? "" : author);
                        setAuthorQuery("");
                      }}
                      className={`px-3.5 py-1.5 rounded-full border text-xs font-medium transition-all ${
                        selectedAuthor === author
                          ? "bg-[#C85A2B] text-white border-[#C85A2B]"
                          : "bg-[#EFE8DF]/70 text-[#524B45] border-[#E0D8CE] hover:bg-[#EFE3D8]"
                      }`}
                    >
                      {author}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </AccordionItem>

          <AccordionItem
            id="genre"
            label="Genre"
            icon={Tag}
            isActive={activeSection === "genre"}
            onToggle={() => toggleSection("genre")}
          >
            <div className="p-4 sm:p-5 bg-[#FAF7F2]">
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => setSelectedGenre(selectedGenre === genre ? "" : genre)}
                    className={`px-3.5 py-1.5 rounded-full border text-xs font-medium transition-all ${
                      selectedGenre === genre
                        ? "bg-[#C85A2B] text-white border-[#C85A2B]"
                        : "bg-white/80 text-[#524B45] border-[#E0D8CE] hover:bg-[#EFE3D8] hover:text-[#C85A2B]"
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>
          </AccordionItem>

          <AccordionItem
            id="release"
            label="Release Date"
            icon={Calendar}
            isActive={activeSection === "release"}
            onToggle={() => toggleSection("release")}
          >
            <div className="p-4 sm:p-5 space-y-4 bg-[#FAF7F2]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold tracking-wider text-[#8C837A] uppercase">
                    From
                  </label>
                  <input
                    type="number"
                    value={fromYear}
                    onChange={(e) => setFromYear(e.target.value)}
                    className="w-full px-4 py-3 bg-[#EFE8DF]/60 border border-[#E0D8CE] rounded-xl text-sm text-[#1A1817] focus:outline-none focus:border-[#C85A2B]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold tracking-wider text-[#8C837A] uppercase">
                    To
                  </label>
                  <input
                    type="number"
                    value={toYear}
                    onChange={(e) => setToYear(e.target.value)}
                    className="w-full px-4 py-3 bg-[#EFE8DF]/60 border border-[#E0D8CE] rounded-xl text-sm text-[#1A1817] focus:outline-none focus:border-[#C85A2B]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-bold tracking-wider text-[#8C837A] uppercase">
                  Quick Select
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {quickSelectEras.map((era) => (
                    <button
                      key={era.label}
                      onClick={() => {
                        if (era.label === "Classic") {
                          setFromYear("1800");
                          setToYear("1949");
                        } else if (era.label === "Recent") {
                          setFromYear("2016");
                          setToYear("2026");
                        }
                      }}
                      className="flex flex-col items-start p-3 bg-white/80 border border-[#E0D8CE] rounded-xl hover:bg-[#EFE3D8] hover:border-[#C85A2B] text-left transition-all"
                    >
                      <span className="font-bold text-xs text-[#1A1817]">
                        {era.label}
                      </span>
                      <span className="text-[10px] text-[#8C837A]">
                        {era.sub}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </AccordionItem>

          <AccordionItem
            id="language"
            label="Language"
            icon={Globe}
            isActive={activeSection === "language"}
            onToggle={() => toggleSection("language")}
          >
            <div className="p-4 sm:p-5 bg-[#FAF7F2]">
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLanguage(selectedLanguage === lang ? "" : lang)}
                    className={`px-3.5 py-1.5 rounded-full border text-xs font-medium transition-all ${
                      selectedLanguage === lang
                        ? "bg-[#C85A2B] text-white border-[#C85A2B]"
                        : "bg-white/80 text-[#524B45] border-[#E0D8CE] hover:bg-[#EFE3D8]"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </AccordionItem>

          <AccordionItem
            id="isbn"
            label="ISBN"
            icon={Hash}
            isActive={activeSection === "isbn"}
            onToggle={() => toggleSection("isbn")}
          >
            <div className="p-4 sm:p-5 space-y-3 bg-[#FAF7F2]">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#8C837A]">
                  <Hash className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={isbnQuery}
                  onChange={(e) => setIsbnQuery(e.target.value)}
                  placeholder="Enter ISBN-10 or ISBN-13..."
                  className="w-full pl-10 pr-4 py-3 bg-[#EFE8DF]/60 border border-[#E0D8CE] rounded-xl text-sm text-[#1A1817] placeholder-[#8C837A] focus:outline-none focus:border-[#C85A2B]"
                />
              </div>
            </div>
          </AccordionItem>
        </div>
      </div>

      {hasActiveQuery && (
        <div className="space-y-3 pt-4">
          <h3 className="font-serif font-bold text-lg text-[#1A1817]">
            Results ({books.length})
          </h3>
          {loading ? (
            <p className="text-sm text-[#8C837A]">Searching books...</p>
          ) : books.length === 0 ? (
            <p className="text-sm text-[#8C837A]">No books found matching your criteria.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {books.map((book) => (
                <div key={book.id} className="p-4 bg-[#FAF7F2] border border-[#EFE8DF] rounded-2xl shadow-sm space-y-2">
                  <h4 className="font-bold text-sm text-[#1A1817] line-klamp-1">{book.title}</h4>
                  <p className="text-xs text-[#736B63]">By {book.author}</p>
                  <div className="flex gap-2 pt-1">
                    {book.genre && (
                      <span className="px-2 py-0.5 bg-[#EFE8DF] text-[#524B45] text-[10px] font-semibold rounded-md">
                        {book.genre}
                      </span>
                    )}
                    {book.language && (
                      <span className="px-2 py-0.5 bg-[#EFE8DF] text-[#524B45] text-[10px] font-semibold rounded-md">
                        {book.language}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}