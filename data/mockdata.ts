export const COVERS = {
  tokyo: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=300&q=80",
  dune: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=300&q=80",
  martian: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=300&q=80",
  klara: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&q=80",
  babel: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=300&q=80",
  tomorrow: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=300&q=80",
  sea: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&q=80",
  project: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&q=80",
  piranesi: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=300&q=80",
  strikethrough: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&q=80",
  neuromancer: "https://images.unsplash.com/photo-1515260268569-9271009adfdb?w=300&q=80",
};

export const POPULAR_BOOKS = [
  { id: 1, title: "Tomorrow, and Tomorrow...", author: "Gabrielle Zevin", rating: 4.8, count: "124k", cover: COVERS.tomorrow, tags: ["Fiction", "Gaming"], desc: "A dazzling novel about two friends who collaborate on video games." },
  { id: 2, title: "Babel", author: "R.F. Kuang", rating: 4.7, count: "98k", cover: COVERS.babel, tags: ["Fantasy", "History"], desc: "A thematic response to Victorian imperialism with magic." },
  { id: 3, title: "Project Hail Mary", author: "Andy Weir", rating: 4.9, count: "210k", cover: COVERS.project, tags: ["Sci-Fi", "Space"], desc: "A lone astronaut must save Earth from catastrophe." },
  { id: 4, title: "Piranesi", author: "Susanna Clarke", rating: 4.6, count: "85k", cover: COVERS.piranesi, tags: ["Fantasy", "Mystery"], desc: "Piranesi lives in the House. Infinite rooms, endless ocean tide." },
];

export const RECOMMENDED_BOOKS = [
  { id: 5, title: "Sea of Tranquility", author: "Emily St. John Mandel", rating: 4.5, count: "64k", cover: COVERS.sea, tags: ["Sci-Fi", "Time Travel"] },
  { id: 6, title: "Klara and the Sun", author: "Kazuo Ishiguro", rating: 4.4, count: "112k", cover: COVERS.klara, tags: ["Dystopian", "AI"] },
  { id: 7, title: "Neuromancer", author: "William Gibson", rating: 4.3, count: "180k", cover: COVERS.neuromancer, tags: ["Cyberpunk", "Classic"] },
];

export const HOME_FRIENDS = [
  { id: 1, name: "Sarah M.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80", status: "Finished Babel", time: "2h ago", cover: COVERS.babel, rating: 5, comment: "An absolute masterpiece. Deeply emotional and sharp." },
  { id: 2, name: "David K.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80", status: "Reading Dune", time: "5h ago", cover: COVERS.dune, progress: "64%" },
  { id: 3, name: "Elena R.", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80", status: "Added Piranesi to Want to Read", time: "1d ago", cover: COVERS.piranesi },
];

export const HOME_GENRES = [
  { name: "Sci-Fi & Cyberpunk", count: "14.2k books", color: "from-cyan-900/60 to-purple-900/60", border: "border-cyan-500/30" },
  { name: "High Fantasy", count: "28.9k books", color: "from-amber-900/60 to-red-900/60", border: "border-amber-500/30" },
  { name: "Literary Fiction", count: "19.5k books", color: "from-emerald-900/60 to-teal-900/60", border: "border-emerald-500/30" },
  { name: "Non-Fiction & Tech", count: "8.7k books", color: "from-blue-900/60 to-indigo-900/60", border: "border-blue-500/30" },
];

export const DIARY = [
  { id: "d1", title: "Project Hail Mary", author: "Andy Weir", cover: COVERS.project, dateRead: "Aug 14, 2024", rating: 5, review: "Fascinating science, loved Rocky!", format: "Audiobook", pages: 496, tags: ["Sci-Fi", "Space", "Favorite"] },
  { id: "d2", title: "Babel", author: "R.F. Kuang", cover: COVERS.babel, dateRead: "Jul 28, 2024", rating: 5, review: "Crushing, brilliant, incredibly researched.", format: "Hardcover", pages: 544, tags: ["Fantasy", "Dark Academia"] },
  { id: "d3", title: "Klara and the Sun", author: "Kazuo Ishiguro", cover: COVERS.klara, dateRead: "Jun 12, 2024", rating: 4, review: "Quietly devastating look at humanity through AI.", format: "Kindle", pages: 303, tags: ["Sci-Fi", "Dystopian"] },
  { id: "d4", title: "The Martian", author: "Andy Weir", cover: COVERS.martian, dateRead: "May 02, 2024", rating: 5, review: "Re-read in audio. Still as punchy as ever.", format: "Audiobook", pages: 369, tags: ["Sci-Fi", "Survival"] },
];

export const WANT_TO_READ = [
  { id: "w1", title: "Tomorrow, and Tomorrow...", author: "Gabrielle Zevin", cover: COVERS.tomorrow, added: "2 weeks ago", rating: 4.8, tags: ["Fiction"] },
  { id: "w2", title: "Piranesi", author: "Susanna Clarke", cover: COVERS.piranesi, added: "1 month ago", rating: 4.6, tags: ["Fantasy"] },
  { id: "w3", title: "Neuromancer", author: "William Gibson", cover: COVERS.neuromancer, added: "3 months ago", rating: 4.3, tags: ["Cyberpunk"] },
];

export const MY_ACTIVITY = [
  { id: "a1", type: "read", book: "Project Hail Mary", cover: COVERS.project, date: "Aug 14, 2024", rating: 5, review: "Fascinating science, loved Rocky!" },
  { id: "a2", type: "want", book: "Tomorrow, and Tomorrow, and Tomorrow", cover: COVERS.tomorrow, date: "Aug 10, 2024" },
  { id: "a3", type: "progress", book: "Dune", cover: COVERS.dune, date: "Aug 05, 2024", progress: "Page 240 of 412 (58%)" },
];

export const FRIENDS_FEED = [
  { id: "f1", user: "Sarah M.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80", type: "read", book: "Babel", cover: COVERS.babel, date: "2h ago", rating: 5, comment: "An absolute masterpiece. Deeply emotional and sharp." },
  { id: "f2", user: "David K.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80", type: "progress", book: "Dune", cover: COVERS.dune, date: "5h ago", progress: "64%" },
  { id: "f3", user: "Elena R.", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80", type: "want", book: "Piranesi", cover: COVERS.piranesi, date: "1d ago" },
];

export const PROFILE_STATS = [
  { label: "Books Read", value: "48", sub: "This year" },
  { label: "Pages Logged", value: "18.4k", sub: "+2.1k vs 2023" },
  { label: "Avg Rating", value: "4.4", sub: "High standard" },
  { label: "Current Streak", value: "14 days", sub: "Personal best: 32" },
];

export const PROFILE_FAVORITES = [
  { title: "Project Hail Mary", cover: COVERS.project },
  { title: "Babel", cover: COVERS.babel },
  { title: "Piranesi", cover: COVERS.piranesi },
  { title: "The Martian", cover: COVERS.martian },
];

export const PROFILE_RECENT = [
  { title: "Project Hail Mary", rating: 5, cover: COVERS.project, date: "Aug 14" },
  { title: "Babel", rating: 5, cover: COVERS.babel, date: "Jul 28" },
  { title: "Klara and the Sun", rating: 4, cover: COVERS.klara, date: "Jun 12" },
  { title: "The Martian", rating: 5, cover: COVERS.martian, date: "May 02" },
];

export const BROWSE_GENRES = [
  "Science Fiction", "Cyberpunk", "Space Opera", "Epic Fantasy",
  "Dark Academia", "Literary Fiction", "Historical Fiction",
  "Dystopian", "Mystery / Thriller", "Non-Fiction", "Computer Science",
];

export const LANGUAGES = ["All Languages", "English", "Japanese", "French", "German", "Spanish"];

export const DATE_RANGES = ["Anytime", "2024 Release", "2023 Release", "Classics (pre-2000)"];

export const RECENT_SEARCHES = ["Andy Weir", "Cyberpunk novels", "Babel", "Hard Sci-Fi 2024", "Susanna Clarke"];

export const TRENDING_SEARCHES = ["Project Hail Mary", "Gabrielle Zevin", "Hugo Award Winners", "Dark Academia Top 10"];

export const POPULAR_AUTHORS = [
  { name: "Andy Weir", books: "3 books", genre: "Sci-Fi" },
  { name: "R.F. Kuang", books: "4 books", genre: "Fantasy / History" },
  { name: "Ted Chiang", books: "2 collections", genre: "Sci-Fi / Speculative" },
  { name: "Kazuo Ishiguro", books: "8 books", genre: "Literary / Sci-Fi" },
];