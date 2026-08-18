"use client"

import { useState } from 'react'

// ─── Data ────────────────────────────────────────────────────────────────────

const COVERS: Record<string, { bg: string; accent: string; text: string }> = {
  dune:         { bg: 'linear-gradient(145deg,#C9821A,#8B4513,#3D1C02)', accent: '#F4A522', text: '#FFF8E7' },
  nightcircus:  { bg: 'linear-gradient(145deg,#1A1A2E,#16213E,#0F3460)', accent: '#E94560', text: '#F5F5F5'  },
  pachinko:     { bg: 'linear-gradient(145deg,#2D5016,#4A7C2F,#8FBC45)', accent: '#D4E96B', text: '#F0F7E0' },
  lessons:      { bg: 'linear-gradient(145deg,#1B4F72,#2980B9,#85C1E9)', accent: '#AED6F1', text: '#F0F8FF' },
  piranesi:     { bg: 'linear-gradient(145deg,#6B2737,#A8324A,#D4596B)', accent: '#F5A7B5', text: '#FFF0F2' },
  atlas:        { bg: 'linear-gradient(145deg,#1A1A1A,#3D3D3D,#6B6B6B)', accent: '#C9A96E', text: '#FAF0DC' },
  stormlight:   { bg: 'linear-gradient(145deg,#0D2137,#1B4F72,#2E86AB)', accent: '#56C8D8', text: '#E8F8FA' },
  belladonna:   { bg: 'linear-gradient(145deg,#3D1054,#6B2F8A,#9B5BC4)', accent: '#D4A8F0', text: '#F8F0FF' },
  intermezzo:   { bg: 'linear-gradient(145deg,#2C3E50,#34495E,#4A6278)', accent: '#BDC3C7', text: '#ECF0F1' },
  james:        { bg: 'linear-gradient(145deg,#0C2233,#1A4A6B,#2E7BAA)', accent: '#7EC8E3', text: '#E8F4FA' },
  middlemarch:  { bg: 'linear-gradient(145deg,#3B1F00,#7A4210,#C87941)', accent: '#EDB87A', text: '#FFF5E6' },
  annihilation: { bg: 'linear-gradient(145deg,#0A1F0A,#1A401A,#2E6B2E)', accent: '#7FDB7F', text: '#E8FFE8' },
}
type CoverKey = keyof typeof COVERS

const POPULAR_BOOKS = [
  { id: 'intermezzo'   as CoverKey, title: 'Intermezzo',           author: 'Sally Rooney'       },
  { id: 'atlas'        as CoverKey, title: 'Atlas Shrugged',       author: 'Ayn Rand'           },
  { id: 'james'        as CoverKey, title: 'James',                author: 'Percival Everett'   },
  { id: 'belladonna'   as CoverKey, title: 'Belladonna',           author: 'Adalyn Grace'       },
  { id: 'stormlight'   as CoverKey, title: 'The Way of Kings',     author: 'Brandon Sanderson'  },
  { id: 'lessons'      as CoverKey, title: 'Lessons in Chemistry', author: 'Bonnie Garmus'      },
  { id: 'middlemarch'  as CoverKey, title: 'Middlemarch',          author: 'George Eliot'       },
  { id: 'annihilation' as CoverKey, title: 'Annihilation',         author: 'Jeff VanderMeer'    },
]
const RECOMMENDED_BOOKS = [
  { id: 'nightcircus' as CoverKey, title: 'The Night Circus',  author: 'Erin Morgenstern' },
  { id: 'pachinko'    as CoverKey, title: 'Pachinko',          author: 'Min Jin Lee'       },
  { id: 'piranesi'    as CoverKey, title: 'Piranesi',          author: 'Susanna Clarke'    },
  { id: 'dune'        as CoverKey, title: 'Dune',              author: 'Frank Herbert'     },
  { id: 'atlas'       as CoverKey, title: 'Atlas Shrugged',    author: 'Ayn Rand'         },
  { id: 'middlemarch' as CoverKey, title: 'Middlemarch',       author: 'George Eliot'     },
]
const HOME_FRIENDS = [
  { name: 'Mia K.',    initials: 'MK', bg: '#8B4513', action: 'is reading',      book: 'Dune',             author: 'Frank Herbert',    id: 'dune'        as CoverKey, time: '2h ago',    rating: null as number | null },
  { name: 'Oliver T.', initials: 'OT', bg: '#1B4F72', action: 'finished',        book: 'The Night Circus', author: 'Erin Morgenstern', id: 'nightcircus' as CoverKey, time: 'Yesterday', rating: 5    as number | null },
  { name: 'Priya S.',  initials: 'PS', bg: '#2D5016', action: 'added to library', book: 'Pachinko',        author: 'Min Jin Lee',      id: 'pachinko'    as CoverKey, time: '3h ago',    rating: null as number | null },
  { name: 'James W.',  initials: 'JW', bg: '#6B2737', action: 'finished',        book: 'Piranesi',         author: 'Susanna Clarke',   id: 'piranesi'    as CoverKey, time: '2d ago',    rating: 4    as number | null },
  { name: 'Sophie L.', initials: 'SL', bg: '#3D1054', action: 'is reading',      book: 'Intermezzo',       author: 'Sally Rooney',     id: 'intermezzo'  as CoverKey, time: '5h ago',    rating: null as number | null },
  { name: 'Ravi M.',   initials: 'RM', bg: '#0D2137', action: 'finished',        book: 'The Way of Kings', author: 'Brandon Sanderson',id: 'stormlight'  as CoverKey, time: '3d ago',    rating: 5    as number | null },
]
const HOME_GENRES = ['Literary Fiction', 'Sci-Fi', 'Historical', 'Fantasy', 'Mystery', 'Biography', 'Romance']

// ── Library data ──
const DIARY = [
  {
    month: 'August 2026',
    days: [
      { day: 'August 17', books: [
        { id: 'middlemarch' as CoverKey, title: 'Middlemarch', author: 'George Eliot', pages: 904, rating: 5, hasReview: true },
      ]},
      { day: 'August 12', books: [
        { id: 'piranesi' as CoverKey, title: 'Piranesi', author: 'Susanna Clarke', pages: 272, rating: 4, hasReview: true },
        { id: 'nightcircus' as CoverKey, title: 'The Night Circus', author: 'Erin Morgenstern', pages: 387, rating: 5, hasReview: false },
      ]},
      { day: 'August 3', books: [
        { id: 'annihilation' as CoverKey, title: 'Annihilation', author: 'Jeff VanderMeer', pages: 195, rating: 4, hasReview: false },
      ]},
    ],
  },
  {
    month: 'July 2026',
    days: [
      { day: 'July 28', books: [
        { id: 'pachinko' as CoverKey, title: 'Pachinko', author: 'Min Jin Lee', pages: 496, rating: 5, hasReview: true },
      ]},
      { day: 'July 14', books: [
        { id: 'lessons' as CoverKey, title: 'Lessons in Chemistry', author: 'Bonnie Garmus', pages: 390, rating: 4, hasReview: false },
      ]},
      { day: 'July 1', books: [
        { id: 'stormlight' as CoverKey, title: 'The Way of Kings', author: 'Brandon Sanderson', pages: 1007, rating: 4, hasReview: false },
      ]},
    ],
  },
  {
    month: 'June 2026',
    days: [
      { day: 'June 22', books: [
        { id: 'atlas' as CoverKey, title: 'Atlas Shrugged', author: 'Ayn Rand', pages: 1168, rating: 3, hasReview: true },
      ]},
      { day: 'June 9', books: [
        { id: 'belladonna' as CoverKey, title: 'Belladonna', author: 'Adalyn Grace', pages: 388, rating: 3, hasReview: false },
      ]},
    ],
  },
]
const WANT_TO_READ = [
  { id: 'intermezzo' as CoverKey, title: 'Intermezzo', author: 'Sally Rooney' },
  { id: 'james'      as CoverKey, title: 'James',      author: 'Percival Everett' },
  { id: 'dune'       as CoverKey, title: 'Dune Messiah', author: 'Frank Herbert' },
]

// ── Activity data ──
const MY_ACTIVITY = [
  { type: 'finished',     id: 'middlemarch' as CoverKey, book: 'Middlemarch',        author: 'George Eliot',      rating: 5,    time: '2 days ago',  review: null as string | null },
  { type: 'reviewed',     id: 'piranesi'    as CoverKey, book: 'Piranesi',           author: 'Susanna Clarke',    rating: 4,    time: '5 days ago',  review: 'A mesmerizing and utterly original novel. Clarke builds a world unlike anything I have read before — eerie, intimate, and strangely beautiful.' },
  { type: 'started',      id: 'dune'        as CoverKey, book: 'Dune',               author: 'Frank Herbert',     rating: null, time: '1 week ago',  review: null },
  { type: 'want_to_read', id: 'intermezzo'  as CoverKey, book: 'Intermezzo',         author: 'Sally Rooney',      rating: null, time: '2 weeks ago', review: null },
  { type: 'finished',     id: 'nightcircus' as CoverKey, book: 'The Night Circus',   author: 'Erin Morgenstern',  rating: 5,    time: '2 weeks ago', review: null },
  { type: 'added',        id: 'atlas'       as CoverKey, book: 'Atlas Shrugged',     author: 'Ayn Rand',          rating: 3,    time: '1 month ago', review: null },
  { type: 'finished',     id: 'pachinko'    as CoverKey, book: 'Pachinko',           author: 'Min Jin Lee',       rating: 5,    time: '1 month ago', review: null },
]
const FRIENDS_FEED = [
  { name: 'Mia K.',    initials: 'MK', bg: '#8B4513', type: 'reading',     id: 'dune'        as CoverKey, book: 'Dune',             author: 'Frank Herbert',    rating: null as number | null, time: '2h ago',    review: null as string | null },
  { name: 'Oliver T.', initials: 'OT', bg: '#1B4F72', type: 'finished',   id: 'nightcircus' as CoverKey, book: 'The Night Circus', author: 'Erin Morgenstern', rating: 5    as number | null, time: 'Yesterday', review: 'Absolutely magical. Read it twice in a row.' as string | null },
  { name: 'Priya S.',  initials: 'PS', bg: '#2D5016', type: 'want_to_read',id: 'james'       as CoverKey, book: 'James',            author: 'Percival Everett', rating: null as number | null, time: '3h ago',    review: null as string | null },
  { name: 'James W.',  initials: 'JW', bg: '#6B2737', type: 'reviewed',    id: 'piranesi'    as CoverKey, book: 'Piranesi',         author: 'Susanna Clarke',   rating: 5    as number | null, time: '2d ago',    review: 'One of the strangest and most captivating books I have ever read.' as string | null },
  { name: 'Sophie L.', initials: 'SL', bg: '#3D1054', type: 'started',     id: 'intermezzo'  as CoverKey, book: 'Intermezzo',       author: 'Sally Rooney',     rating: null as number | null, time: '5h ago',    review: null as string | null },
  { name: 'Ravi M.',   initials: 'RM', bg: '#0D2137', type: 'finished',    id: 'stormlight'  as CoverKey, book: 'The Way of Kings', author: 'Brandon Sanderson',rating: 5    as number | null, time: '3d ago',    review: null as string | null },
  { name: 'Oliver T.', initials: 'OT', bg: '#1B4F72', type: 'want_to_read',id: 'middlemarch' as CoverKey, book: 'Middlemarch',     author: 'George Eliot',     rating: null as number | null, time: '4d ago',    review: null as string | null },
]

// ── Profile data ──
const PROFILE_STATS = [
  { label: 'Books Read',      value: '47'  },
  { label: 'Reading',         value: '1'   },
  { label: 'Want to Read',    value: '23'  },
  { label: 'Reviews',         value: '12'  },
]
const PROFILE_FAVORITES: { id: CoverKey; title: string; author: string }[] = [
  { id: 'middlemarch',  title: 'Middlemarch',       author: 'George Eliot'      },
  { id: 'dune',         title: 'Dune',              author: 'Frank Herbert'     },
  { id: 'nightcircus',  title: 'The Night Circus',  author: 'Erin Morgenstern'  },
  { id: 'piranesi',     title: 'Piranesi',          author: 'Susanna Clarke'    },
]
const PROFILE_RECENT = [
  { id: 'middlemarch'  as CoverKey, title: 'Middlemarch',       author: 'George Eliot',     rating: 5, date: 'Aug 17' },
  { id: 'piranesi'     as CoverKey, title: 'Piranesi',          author: 'Susanna Clarke',   rating: 4, date: 'Aug 12' },
  { id: 'nightcircus'  as CoverKey, title: 'The Night Circus',  author: 'Erin Morgenstern', rating: 5, date: 'Aug 12' },
  { id: 'annihilation' as CoverKey, title: 'Annihilation',      author: 'Jeff VanderMeer',  rating: 4, date: 'Aug 3'  },
  { id: 'pachinko'     as CoverKey, title: 'Pachinko',          author: 'Min Jin Lee',      rating: 5, date: 'Jul 28' },
  { id: 'lessons'      as CoverKey, title: 'Lessons in Chemistry',author: 'Bonnie Garmus',  rating: 4, date: 'Jul 14' },
]

// ─── Icons ───────────────────────────────────────────────────────────────────

const LOGO_ICON = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 2h8a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1z" fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="1"/>
    <path d="M3 2v12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M6 5h4M6 8h4M6 11h2" stroke="white" strokeWidth="1" strokeLinecap="round"/>
  </svg>
)

const Ic = {
  Home:     ({ s=22 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Search:   ({ s=22 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  Library:  ({ s=22 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>,
  Activity: ({ s=22 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  Profile:  ({ s=22 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Bell:     ({ s=20 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
  Settings: ({ s=20 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
  Chevron:  ({ s=16, open=false }: { s?: number; open?: boolean }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open?'rotate(180deg)':'rotate(0deg)', transition:'transform 0.25s ease' }}><polyline points="6 9 12 15 18 9"/></svg>,
  X:        ({ s=14 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Plus:     ({ s=14 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Edit:     ({ s=14 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  Text:     () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 7V4h16v3"/><line x1="12" y1="4" x2="12" y2="20"/><line x1="8" y1="20" x2="16" y2="20"/></svg>,
  Pen:      () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  Tag:      () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>,
  Cal:      () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  Globe:    () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
  Hash:     () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>,
  ArrowR:   ({ s=14 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>,
}

type NavTab = 'home' | 'search' | 'library' | 'activity' | 'profile'
const NAV_ITEMS: { id: NavTab; label: string; Icon: React.FC<{ s?: number }> }[] = [
  { id: 'home',     label: 'Home',     Icon: ({ s=22 }) => <Ic.Home s={s}     /> },
  { id: 'search',   label: 'Search',   Icon: ({ s=22 }) => <Ic.Search s={s}   /> },
  { id: 'library',  label: 'Library',  Icon: ({ s=22 }) => <Ic.Library s={s}  /> },
  { id: 'activity', label: 'Activity', Icon: ({ s=22 }) => <Ic.Activity s={s} /> },
  { id: 'profile',  label: 'Profile',  Icon: ({ s=22 }) => <Ic.Profile s={s}  /> },
]

const SERIF = { fontFamily: "'Playfair Display', serif" }
const SANS  = { fontFamily: "'DM Sans', sans-serif" }

// ─── Shared primitives ───────────────────────────────────────────────────────

function Avatar({ initials, bg, size=36 }: { initials: string; bg: string; size?: number }) {
  return (
    <div className="rounded-full flex-shrink-0 flex items-center justify-center font-semibold text-white"
      style={{ width:size, height:size, background:bg, fontSize:size*0.34 }}>
      {initials}
    </div>
  )
}

function Stars({ n, size=10 }: { n: number; size?: number }) {
  return (
    <span className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <svg key={i} width={size} height={size} viewBox="0 0 12 12" fill={i<=n ? '#C4622D' : '#DDD6CE'}>
          <path d="M6 1l1.27 2.57L10 4.1l-2 1.95.47 2.75L6 7.48l-2.47 1.32L4 6.05 2 4.1l2.73-.53z"/>
        </svg>
      ))}
    </span>
  )
}

function MiniCover({ id, w=40, h=56 }: { id: CoverKey; w?: number; h?: number }) {
  const c = COVERS[id]
  return (
    <div className="rounded-lg flex-shrink-0 relative overflow-hidden shadow-sm" style={{ width:w, height:h, background:c.bg }}>
      <div className="absolute inset-y-0 left-0 w-[2px] rounded-l-lg opacity-60" style={{ background:c.accent }} />
    </div>
  )
}

function BookCoverTile({ id, title, author, w=104, h=150, showLabel=true }:
  { id: CoverKey; title: string; author: string; w?: number; h?: number; showLabel?: boolean }) {
  const c = COVERS[id]
  return (
    <div className="flex flex-col gap-2 flex-shrink-0 cursor-pointer group" style={{ width:w }}>
      <div className="rounded-xl relative overflow-hidden shadow-md group-hover:shadow-xl group-hover:scale-[1.02] transition-all duration-200"
        style={{ width:w, height:h, background:c.bg }}>
        <div className="absolute inset-0 p-2.5 flex flex-col justify-between">
          <span className="text-[8px] font-bold uppercase tracking-widest opacity-60" style={{ color:c.accent }}>Bookshelf</span>
          <div>
            <p className="font-bold leading-tight text-[10px] mb-0.5" style={{ ...SERIF, color:c.text }}>{title}</p>
            <p className="text-[8px] opacity-55" style={{ color:c.text }}>{author}</p>
          </div>
        </div>
        <div className="absolute inset-y-0 left-0 w-[3px] rounded-l-xl opacity-60" style={{ background:c.accent }} />
      </div>
      {showLabel && (
        <div style={{ width:w }}>
          <p className="text-[11px] font-semibold text-ink leading-tight truncate">{title}</p>
          <p className="text-[10px] text-ink-muted truncate">{author}</p>
        </div>
      )}
    </div>
  )
}

function SectionHeader({ title, sub, link='See all' }: { title: string; sub?: string; link?: string }) {
  return (
    <div className="flex items-end justify-between mb-4">
      <div>
        <h2 className="text-lg font-bold text-ink leading-tight" style={SERIF}>{title}</h2>
        {sub && <p className="text-xs text-ink-muted mt-0.5">{sub}</p>}
      </div>
      <button className="text-xs font-semibold text-terracotta hover:opacity-70 transition-opacity flex-shrink-0">{link} →</button>
    </div>
  )
}

function GenrePills() {
  const [active, setActive] = useState('Literary Fiction')
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {HOME_GENRES.map(g => (
        <button key={g} onClick={() => setActive(g)}
          className="flex-shrink-0 px-3.5 py-1.5 rounded-full text-[11px] font-medium border transition-all duration-150"
          style={active===g ? { background:'#C4622D', borderColor:'#C4622D', color:'#fff' } : { background:'transparent', borderColor:'#E8E0D5', color:'#6B5D4F' }}>
          {g}
        </button>
      ))}
    </div>
  )
}

function SegmentedControl({ options, active, onChange }: { options: string[]; active: string; onChange: (v: string) => void }) {
  return (
    <div className="flex bg-parchment rounded-xl p-1 border border-border">
      {options.map(o => (
        <button key={o} onClick={() => onChange(o)}
          className="flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-150"
          style={active===o ? { background:'#fff', color:'#1C1510', boxShadow:'0 1px 3px rgba(0,0,0,0.08)', fontWeight:600 } : { color:'#6B5D4F' }}>
          {o}
        </button>
      ))}
    </div>
  )
}

// ─── Home components ──────────────────────────────────────────────────────────

function ContinueReadingCard({ compact=false }: { compact?: boolean }) {
  const c = COVERS['dune']
  return (
    <div className="rounded-2xl overflow-hidden relative" style={{ background:'linear-gradient(135deg,#1C0F05,#3D1F0A,#6B3A1A)' }}>
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage:'radial-gradient(circle at 80% 40%,#C4622D,transparent 55%)' }} />
      <div className={`relative flex gap-5 ${compact?'p-4':'p-5 md:p-6'}`}>
        <div className="flex-shrink-0 rounded-xl shadow-2xl relative overflow-hidden"
          style={{ width:compact?80:100, height:compact?116:144, background:c.bg }}>
          <div className="absolute inset-0 p-2 flex flex-col justify-between">
            <span className="text-[7px] font-bold uppercase tracking-widest opacity-60" style={{ color:c.accent }}>Bookshelf</span>
            <div>
              <p className="font-bold leading-tight text-[9px] mb-0.5" style={{ ...SERIF, color:c.text }}>Dune</p>
              <p className="text-[7px] opacity-55" style={{ color:c.text }}>Frank Herbert</p>
            </div>
          </div>
          <div className="absolute inset-y-0 left-0 w-[3px] rounded-l-xl opacity-60" style={{ background:c.accent }} />
        </div>
        <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest mb-1.5" style={{ color:'#C4622D' }}>Currently Reading</p>
            <h3 className="text-white font-bold leading-tight mb-1" style={{ ...SERIF, fontSize:compact?18:22 }}>Dune</h3>
            <p className="text-white/55 text-xs mb-0.5">Frank Herbert</p>
            {!compact && <p className="text-white/35 text-[10px] leading-relaxed mt-1 line-clamp-2">A mythic and stirring adventure set on a planet of sand, spice, and ambition.</p>}
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-white/45 text-[10px]">Page 432 of 604</span>
              <span className="font-bold text-sm" style={{ color:'#F4A522' }}>72%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full rounded-full" style={{ width:'72%', background:'linear-gradient(90deg,#C4622D,#F4A522)' }} />
            </div>
            <div className="mt-3 flex gap-2">
              <button className="flex-1 py-2 rounded-xl text-xs font-semibold text-white border border-white/20 hover:bg-white/10 transition-colors">Continue Reading →</button>
              {!compact && <button className="px-3 py-2 rounded-xl text-xs font-semibold border border-white/20 text-white/60 hover:bg-white/10 transition-colors">Details</button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FriendRow({ f, showCover=true }: { f: typeof HOME_FRIENDS[0]; showCover?: boolean }) {
  const c = COVERS[f.id]
  return (
    <div className="flex items-center gap-3.5 py-3.5 border-b border-border last:border-0">
      <Avatar initials={f.initials} bg={f.bg} size={40} />
      <div className="flex-1 min-w-0">
        <p className="text-sm text-ink leading-snug">
          <span className="font-semibold">{f.name}</span>
          <span className="text-ink-muted"> {f.action} </span>
          <span className="font-medium italic" style={SERIF}>{f.book}</span>
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          {f.rating && <Stars n={f.rating} />}
          <span className="text-[10px] text-ink-muted">{f.time}</span>
        </div>
      </div>
      {showCover && (
        <div className="w-10 h-[56px] rounded-lg flex-shrink-0 overflow-hidden shadow-sm relative" style={{ background:c.bg }}>
          <div className="absolute inset-0 p-1 flex flex-col justify-end">
            <p className="text-[6px] font-bold leading-tight" style={{ ...SERIF, color:c.text }}>{f.book}</p>
          </div>
        </div>
      )}
    </div>
  )
}

function ReadingStats() {
  return (
    <div className="rounded-2xl border border-border p-5 bg-cream">
      <h3 className="text-sm font-bold text-ink mb-4" style={SERIF}>Your Reading Stats</h3>
      <div className="flex flex-col gap-3">
        {[['Books read','47','this year'],['Pages read','14,832','lifetime'],['Reading streak','12 days','current']].map(([l,v,s]) => (
          <div key={l} className="flex items-center justify-between">
            <span className="text-xs text-ink-muted">{l}</span>
            <div><span className="text-sm font-bold text-ink">{v}</span><span className="text-[10px] text-ink-muted ml-1">{s}</span></div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex justify-between mb-1.5">
          <span className="text-xs text-ink-muted">Reading goal</span>
          <span className="text-xs font-semibold text-terracotta">47 / 60</span>
        </div>
        <div className="h-2 rounded-full bg-parchment overflow-hidden">
          <div className="h-full rounded-full" style={{ width:'78%', background:'linear-gradient(90deg,#C4622D,#F4A522)' }} />
        </div>
        <p className="text-[10px] text-ink-muted mt-1.5">13 more books to hit your 2026 goal</p>
      </div>
    </div>
  )
}

function SuggestedFriends() {
  return (
    <div className="rounded-2xl border border-border p-5 bg-cream">
      <h3 className="text-sm font-bold text-ink mb-4" style={SERIF}>People to Follow</h3>
      <div className="flex flex-col gap-3.5">
        {[{name:'Elena R.',initials:'ER',bg:'#6B2737',mutual:4,books:23},{name:'Kai M.',initials:'KM',bg:'#0D2137',mutual:2,books:38},{name:'Layla J.',initials:'LJ',bg:'#2D5016',mutual:6,books:15}].map(f => (
          <div key={f.name} className="flex items-center gap-3">
            <Avatar initials={f.initials} bg={f.bg} size={36} />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-ink">{f.name}</p>
              <p className="text-[10px] text-ink-muted">{f.mutual} mutual · {f.books} books</p>
            </div>
            <button className="text-[10px] font-semibold px-3 py-1.5 rounded-full border border-terracotta text-terracotta hover:bg-terracotta hover:text-white transition-all">Follow</button>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Search page ──────────────────────────────────────────────────────────────

type AccordionId = 'title' | 'author' | 'genre' | 'date' | 'language' | 'isbn'
const BROWSE_GENRES = ['Fantasy','Science Fiction','Mystery','Thriller','Romance','Horror','Historical Fiction','Biography','Literary Fiction','Adventure','Self-Help','Poetry','Science','Philosophy','Graphic Novel']
const LANGUAGES = ['English','Urdu','Spanish','French','German','Arabic','Japanese','Portuguese','Italian','Other']
const DATE_RANGES = [
  { label:'Classic',      sub:'Before 1950',  from:1800, to:1949 },
  { label:'Mid-Century',  sub:'1950–1979',    from:1950, to:1979 },
  { label:'Modern',       sub:'1980–1999',    from:1980, to:1999 },
  { label:'Contemporary', sub:'2000–2015',    from:2000, to:2015 },
  { label:'Recent',       sub:'2016 onwards', from:2016, to:2026 },
]
const RECENT_SEARCHES = ['Cormac McCarthy','magical realism','1984 George Orwell','best fantasy 2025','Min Jin Lee']
const TRENDING_SEARCHES = ['Sally Rooney','Booker Prize 2026','dark academia','literary fiction','translated novels']
const POPULAR_AUTHORS = [
  { name:'Colson Whitehead', initials:'CW', bg:'#2C3E50', books:9  },
  { name:'Zadie Smith',      initials:'ZS', bg:'#6B2737', books:7  },
  { name:'Kazuo Ishiguro',   initials:'KI', bg:'#1B4F72', books:12 },
  { name:'Chimamanda Adichie',initials:'CA',bg:'#2D5016', books:6  },
  { name:'Ocean Vuong',      initials:'OV', bg:'#3D1054', books:4  },
]

function PillSelect({ options, selected, onToggle }: { options: string[]; selected: Set<string>; onToggle: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(o => {
        const on = selected.has(o)
        return (
          <button key={o} onClick={() => onToggle(o)}
            className="px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all duration-150"
            style={on ? { background:'#C4622D', borderColor:'#C4622D', color:'#fff' } : { background:'#FAF7F2', borderColor:'#E8E0D5', color:'#6B5D4F' }}>
            {o}
          </button>
        )
      })}
    </div>
  )
}

function SearchInput({ placeholder, icon }: { placeholder: string; icon?: React.ReactNode }) {
  const [val, setVal] = useState('')
  return (
    <div className="relative">
      {icon && <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none">{icon}</div>}
      <input autoFocus value={val} onChange={e => setVal(e.target.value)} placeholder={placeholder}
        className="w-full pr-10 py-2.5 rounded-xl bg-parchment border border-border text-sm text-ink placeholder:text-ink-muted/60 focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta/40 transition-all"
        style={{ paddingLeft: icon ? '2.5rem' : '1rem' }} />
      {val && <button onClick={() => setVal('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink transition-colors"><Ic.X s={14} /></button>}
    </div>
  )
}

function AccordionItem({ id, label, Icon, open, onToggle, children }: { id: AccordionId; label: string; Icon: React.FC; open: boolean; onToggle: () => void; children: React.ReactNode }) {
  return (
    <div className="border-b border-border last:border-0">
      <button onClick={onToggle} className="w-full flex items-center gap-3 px-1 py-4 text-left">
        <span className={`transition-colors ${open?'text-terracotta':'text-ink-muted'}`}><Icon /></span>
        <span className="flex-1 text-sm text-ink" style={{ fontWeight:open?600:400 }}>{label}</span>
        {open && <span className="text-[10px] font-semibold text-terracotta mr-1 uppercase tracking-wide">Active</span>}
        <span className={open?'text-terracotta':'text-ink-muted'}><Ic.Chevron s={16} open={open} /></span>
      </button>
      <div style={{ maxHeight:open?'400px':'0px', overflow:'hidden', transition:'max-height 0.3s cubic-bezier(0.4,0,0.2,1)' }}>
        <div className="pb-5 px-1">{children}</div>
      </div>
    </div>
  )
}

function BrowseByAccordion() {
  const [open, setOpen] = useState<AccordionId | null>(null)
  const [genres, setGenres] = useState<Set<string>>(new Set())
  const [langs, setLangs] = useState<Set<string>>(new Set())
  const [yearFrom, setYearFrom] = useState('1900')
  const [yearTo, setYearTo]   = useState('2026')
  const [selRange, setSelRange] = useState<string | null>(null)
  const toggle = (id: AccordionId) => setOpen(p => p===id ? null : id)
  const toggleSet = (set: Set<string>, setFn: (s: Set<string>) => void, val: string) => {
    const next = new Set(set); next.has(val) ? next.delete(val) : next.add(val); setFn(next)
  }
  return (
    <div className="rounded-2xl border border-border bg-cream overflow-hidden">
      <AccordionItem id="title" label="Title" Icon={Ic.Text} open={open==='title'} onToggle={() => toggle('title')}>
        <SearchInput placeholder="Search by book title…" icon={<Ic.Text />} />
        <p className="text-[11px] text-ink-muted mt-2.5">Try: "The Midnight Library", "Klara and the Sun"</p>
      </AccordionItem>
      <AccordionItem id="author" label="Author" Icon={Ic.Pen} open={open==='author'} onToggle={() => toggle('author')}>
        <SearchInput placeholder="Search by author name…" icon={<Ic.Pen />} />
        <div className="mt-3">
          <p className="text-[10px] font-semibold text-ink-muted uppercase tracking-widest mb-2">Popular authors</p>
          <div className="flex flex-wrap gap-1.5">
            {['Colm Tóibín','Sally Rooney','Kazuo Ishiguro','Zadie Smith','Colson Whitehead'].map(a => (
              <button key={a} className="px-3 py-1 rounded-full text-[11px] border border-border text-ink-muted bg-parchment hover:border-terracotta hover:text-terracotta transition-colors">{a}</button>
            ))}
          </div>
        </div>
      </AccordionItem>
      <AccordionItem id="genre" label="Genre" Icon={Ic.Tag} open={open==='genre'} onToggle={() => toggle('genre')}>
        {genres.size > 0 && <div className="flex items-center gap-2 mb-3"><span className="text-[10px] font-semibold text-terracotta uppercase tracking-widest">{genres.size} selected</span><button onClick={() => setGenres(new Set())} className="text-[10px] text-ink-muted underline">Clear</button></div>}
        <PillSelect options={BROWSE_GENRES} selected={genres} onToggle={v => toggleSet(genres, setGenres, v)} />
      </AccordionItem>
      <AccordionItem id="date" label="Release Date" Icon={Ic.Cal} open={open==='date'} onToggle={() => toggle('date')}>
        <div className="flex gap-3 mb-4">
          {(['From','To'] as const).map((label, i) => (
            <div key={label} className="flex-1">
              <label className="text-[10px] font-semibold text-ink-muted uppercase tracking-widest block mb-1">{label}</label>
              <input type="number" min="1800" max="2026" value={i===0?yearFrom:yearTo}
                onChange={e => { setSelRange(null); i===0?setYearFrom(e.target.value):setYearTo(e.target.value) }}
                className="w-full px-3 py-2 rounded-xl bg-parchment border border-border text-sm text-ink focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta/40 transition-all" />
            </div>
          ))}
        </div>
        <p className="text-[10px] font-semibold text-ink-muted uppercase tracking-widest mb-2.5">Quick select</p>
        <div className="flex flex-wrap gap-2">
          {DATE_RANGES.map(r => (
            <button key={r.label} onClick={() => { setYearFrom(String(r.from)); setYearTo(String(r.to)); setSelRange(r.label) }}
              className="flex flex-col px-3.5 py-2 rounded-xl border text-left transition-all"
              style={selRange===r.label ? { background:'#C4622D', borderColor:'#C4622D' } : { background:'#FAF7F2', borderColor:'#E8E0D5' }}>
              <span className="text-xs font-semibold" style={selRange===r.label?{color:'#fff'}:{color:'#1C1510'}}>{r.label}</span>
              <span className="text-[10px]" style={{ color:selRange===r.label?'rgba(255,255,255,0.7)':'#6B5D4F' }}>{r.sub}</span>
            </button>
          ))}
        </div>
      </AccordionItem>
      <AccordionItem id="language" label="Language" Icon={Ic.Globe} open={open==='language'} onToggle={() => toggle('language')}>
        {langs.size > 0 && <div className="flex items-center gap-2 mb-3"><span className="text-[10px] font-semibold text-terracotta uppercase tracking-widest">{langs.size} selected</span><button onClick={() => setLangs(new Set())} className="text-[10px] text-ink-muted underline">Clear</button></div>}
        <PillSelect options={LANGUAGES} selected={langs} onToggle={v => toggleSet(langs, setLangs, v)} />
      </AccordionItem>
      <AccordionItem id="isbn" label="ISBN" Icon={Ic.Hash} open={open==='isbn'} onToggle={() => toggle('isbn')}>
        <SearchInput placeholder="Enter ISBN-10 or ISBN-13…" icon={<Ic.Hash />} />
        <p className="text-[11px] text-ink-muted mt-2.5">Example: 978-0-06-112008-4</p>
      </AccordionItem>
    </div>
  )
}

function SearchDiscoveryPanel({ onSearch }: { onSearch: (q: string) => void }) {
  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-border p-5 bg-cream">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-ink" style={SERIF}>Recent Searches</h3>
          <button className="text-[10px] font-semibold text-ink-muted hover:text-terracotta transition-colors">Clear all</button>
        </div>
        <div className="flex flex-col gap-0.5">
          {RECENT_SEARCHES.map(s => (
            <button key={s} onClick={() => onSearch(s)} className="flex items-center gap-3 px-2 py-2.5 rounded-xl hover:bg-parchment transition-colors text-left group w-full">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6B5D4F" strokeWidth="2" strokeLinecap="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>
              <span className="flex-1 text-xs text-ink truncate">{s}</span>
              <span className="text-ink-muted opacity-0 group-hover:opacity-100 transition-opacity"><Ic.X s={12} /></span>
            </button>
          ))}
        </div>
      </div>
      <div className="rounded-2xl border border-border p-5 bg-cream">
        <h3 className="text-sm font-bold text-ink mb-4" style={SERIF}>Trending Searches</h3>
        <div className="flex flex-col gap-3">
          {TRENDING_SEARCHES.map((s,i) => (
            <button key={s} onClick={() => onSearch(s)} className="flex items-center gap-3 text-left hover:opacity-70 transition-opacity w-full">
              <span className="text-sm font-bold w-5 flex-shrink-0" style={{ color:i<3?'#C4622D':'#DDD6CE' }}>{i+1}</span>
              <span className="text-xs text-ink">{s}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="rounded-2xl border border-border p-5 bg-cream">
        <h3 className="text-sm font-bold text-ink mb-4" style={SERIF}>Popular Authors</h3>
        <div className="flex flex-col gap-3">
          {POPULAR_AUTHORS.map(a => (
            <button key={a.name} className="flex items-center gap-3 hover:opacity-70 transition-opacity text-left w-full">
              <Avatar initials={a.initials} bg={a.bg} size={34} />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-ink truncate">{a.name}</p>
                <p className="text-[10px] text-ink-muted">{a.books} books</p>
              </div>
              <Ic.ArrowR s={14} />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Library page ─────────────────────────────────────────────────────────────

function DiaryBookEntry({ book }: { book: typeof DIARY[0]['days'][0]['books'][0] }) {
  const c = COVERS[book.id]
  return (
    <div className="flex gap-4 items-start">
      <div className="flex-shrink-0 rounded-xl overflow-hidden shadow-md group-hover:shadow-lg transition-shadow relative cursor-pointer"
        style={{ width:72, height:104, background:c.bg }}>
        <div className="absolute inset-0 p-2 flex flex-col justify-between">
          <span className="text-[7px] font-bold uppercase tracking-widest opacity-60" style={{ color:c.accent }}>Bookshelf</span>
          <div>
            <p className="font-bold leading-tight text-[8px] mb-0.5" style={{ ...SERIF, color:c.text }}>{book.title}</p>
            <p className="text-[7px] opacity-55" style={{ color:c.text }}>{book.author}</p>
          </div>
        </div>
        <div className="absolute inset-y-0 left-0 w-[3px] rounded-l-xl opacity-60" style={{ background:c.accent }} />
      </div>
      <div className="flex-1 min-w-0 pt-1">
        <h4 className="text-sm font-bold text-ink leading-tight" style={SERIF}>{book.title}</h4>
        <p className="text-xs text-ink-muted mb-2">{book.author}</p>
        <div className="flex items-center gap-2.5 flex-wrap">
          <Stars n={book.rating} />
          <span className="text-ink/20 text-xs">·</span>
          <span className="text-[10px] text-ink-muted">{book.pages.toLocaleString()} pages</span>
          {book.hasReview && (
            <>
              <span className="text-ink/20 text-xs">·</span>
              <span className="text-[10px] font-semibold text-terracotta flex items-center gap-1">
                <Ic.Pen />
                Review written
              </span>
            </>
          )}
        </div>
        <button className="mt-2.5 text-[10px] font-semibold text-ink-muted hover:text-terracotta transition-colors">
          View entry →
        </button>
      </div>
    </div>
  )
}

function LibraryRightPanel() {
  return (
    <div className="space-y-5">
      {/* Currently reading */}
      <div className="rounded-2xl border border-border p-5 bg-cream">
        <h3 className="text-sm font-bold text-ink mb-4" style={SERIF}>Currently Reading</h3>
        <div className="flex gap-3 items-center">
          <div className="flex-shrink-0 rounded-lg overflow-hidden shadow-sm relative" style={{ width:44, height:62, background:COVERS['dune'].bg }}>
            <div className="absolute inset-y-0 left-0 w-[2px] opacity-60 rounded-l-lg" style={{ background:COVERS['dune'].accent }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-ink truncate" style={SERIF}>Dune</p>
            <p className="text-xs text-ink-muted">Frank Herbert</p>
            <div className="mt-2 h-1.5 rounded-full bg-parchment overflow-hidden">
              <div className="h-full rounded-full" style={{ width:'72%', background:'linear-gradient(90deg,#C4622D,#F4A522)' }} />
            </div>
            <p className="text-[10px] text-ink-muted mt-1">Page 432 of 604 · 72%</p>
          </div>
        </div>
      </div>
      {/* Want to read */}
      <div className="rounded-2xl border border-border p-5 bg-cream">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-ink" style={SERIF}>Want to Read</h3>
          <span className="text-[10px] font-semibold text-terracotta">23 books</span>
        </div>
        <div className="flex flex-col gap-3">
          {WANT_TO_READ.map(b => (
            <div key={b.id} className="flex items-center gap-3">
              <MiniCover id={b.id} w={36} h={50} />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-ink truncate" style={SERIF}>{b.title}</p>
                <p className="text-[10px] text-ink-muted truncate">{b.author}</p>
              </div>
            </div>
          ))}
          <button className="text-[10px] font-semibold text-terracotta mt-1">See all 23 books →</button>
        </div>
      </div>
      {/* Year goal */}
      <div className="rounded-2xl border border-border p-5 bg-cream">
        <h3 className="text-sm font-bold text-ink mb-3" style={SERIF}>2026 Reading Goal</h3>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-ink-muted">Books read</span>
          <span className="text-sm font-bold text-terracotta">47 / 60</span>
        </div>
        <div className="h-2.5 rounded-full bg-parchment overflow-hidden">
          <div className="h-full rounded-full" style={{ width:'78%', background:'linear-gradient(90deg,#C4622D,#F4A522)' }} />
        </div>
        <p className="text-[10px] text-ink-muted mt-2">78% there — 13 books remaining</p>
      </div>
    </div>
  )
}

function LibraryContent() {
  const [activeMonth, setActiveMonth] = useState('August 2026')
  const months = DIARY.map(d => d.month)
  const data = DIARY.find(d => d.month === activeMonth) ?? DIARY[0]

  const inner = (
    <div className="space-y-8">
      {data.days.map(day => (
        <div key={day.day}>
          {/* Day header */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-terracotta">{day.day}</span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="space-y-5">
            {day.books.map((book, i) => <DiaryBookEntry key={i} book={book} />)}
          </div>
        </div>
      ))}
    </div>
  )

  return { months, activeMonth, setActiveMonth, data, inner }
}

function LibraryPage() {
  const { months, activeMonth, setActiveMonth, inner } = LibraryContent()

  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px] gap-0 min-h-screen">
        <div className="px-8 xl:px-10 py-8 border-r border-border">
          <div className="flex items-start justify-between mb-7">
            <div>
              <h1 className="text-3xl font-bold text-ink" style={SERIF}>My Library</h1>
              <p className="text-sm text-ink-muted mt-1">47 books read · reading diary</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-cream text-sm font-medium text-ink-muted hover:border-terracotta hover:text-terracotta transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
              Sort by date
            </button>
          </div>
          {/* Month tabs */}
          <div className="flex gap-2 mb-8 flex-wrap">
            {months.map(m => (
              <button key={m} onClick={() => setActiveMonth(m)}
                className="px-4 py-2 rounded-xl text-sm font-medium border transition-all"
                style={activeMonth===m ? { background:'#C4622D', borderColor:'#C4622D', color:'#fff' } : { borderColor:'#E8E0D5', color:'#6B5D4F', background:'transparent' }}>
                {m}
              </button>
            ))}
          </div>
          {inner}
        </div>
        <div className="px-6 py-8 space-y-5 bg-parchment/30">
          <LibraryRightPanel />
        </div>
      </div>

      {/* Tablet */}
      <div className="hidden md:block lg:hidden px-6 py-7 max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-ink" style={SERIF}>My Library</h1>
          <span className="text-xs text-ink-muted">47 books read</span>
        </div>
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {months.map(m => (
            <button key={m} onClick={() => setActiveMonth(m)}
              className="flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium border transition-all"
              style={activeMonth===m ? { background:'#C4622D', borderColor:'#C4622D', color:'#fff' } : { borderColor:'#E8E0D5', color:'#6B5D4F', background:'transparent' }}>
              {m}
            </button>
          ))}
        </div>
        {inner}
      </div>

      {/* Mobile */}
      <div className="md:hidden px-5 py-5">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-ink" style={SERIF}>My Library</h1>
          <span className="text-[10px] font-semibold text-ink-muted">47 books</span>
        </div>
        <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
          {months.map(m => (
            <button key={m} onClick={() => setActiveMonth(m)}
              className="flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all"
              style={activeMonth===m ? { background:'#C4622D', borderColor:'#C4622D', color:'#fff' } : { borderColor:'#E8E0D5', color:'#6B5D4F', background:'transparent' }}>
              {m}
            </button>
          ))}
        </div>
        {inner}
      </div>
    </>
  )
}

// ─── Activity page ────────────────────────────────────────────────────────────

function activityLabel(type: string): string {
  switch(type) {
    case 'finished':     return 'You finished reading'
    case 'reviewed':     return 'You reviewed'
    case 'started':      return 'You started reading'
    case 'want_to_read': return 'You added to Want to Read'
    case 'added':        return 'You added to your library'
    default:             return 'You interacted with'
  }
}
function friendActivityLabel(name: string, type: string): string {
  switch(type) {
    case 'finished':     return `${name} finished reading`
    case 'reviewed':     return `${name} reviewed`
    case 'started':      return `${name} started reading`
    case 'want_to_read': return `${name} added to Want to Read`
    case 'reading':      return `${name} is reading`
    default:             return `${name} interacted with`
  }
}

function MyActivityFeed() {
  return (
    <div className="space-y-0 divide-y divide-border rounded-2xl border border-border bg-cream overflow-hidden">
      {MY_ACTIVITY.map((item, i) => {
        const c = COVERS[item.id]
        return (
          <div key={i} className="flex gap-4 p-4 hover:bg-parchment/30 transition-colors">
            <div className="flex-shrink-0 rounded-xl overflow-hidden shadow-sm relative cursor-pointer" style={{ width:56, height:80, background:c.bg }}>
              <div className="absolute inset-0 p-1.5 flex flex-col justify-between">
                <span className="text-[6px] font-bold uppercase tracking-widest opacity-60" style={{ color:c.accent }}>BS</span>
                <p className="font-bold leading-tight text-[7px]" style={{ ...SERIF, color:c.text }}>{item.book}</p>
              </div>
              <div className="absolute inset-y-0 left-0 w-[2px] opacity-60" style={{ background:c.accent }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-semibold text-ink-muted uppercase tracking-widest mb-0.5">{activityLabel(item.type)}</p>
              <p className="text-sm font-bold text-ink leading-tight" style={SERIF}>{item.book}</p>
              <p className="text-xs text-ink-muted mb-1.5">{item.author}</p>
              {item.rating && <Stars n={item.rating} />}
              {item.review && (
                <p className="text-xs text-ink-muted mt-2 leading-relaxed line-clamp-2 italic">"{item.review}"</p>
              )}
              <p className="text-[10px] text-ink-muted mt-2">{item.time}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function FriendsActivityFeed() {
  return (
    <div className="space-y-0 divide-y divide-border rounded-2xl border border-border bg-cream overflow-hidden">
      {FRIENDS_FEED.map((item, i) => {
        const c = COVERS[item.id]
        return (
          <div key={i} className="flex gap-3.5 p-4 hover:bg-parchment/30 transition-colors">
            <Avatar initials={item.initials} bg={item.bg} size={38} />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-ink leading-snug mb-1">
                <span className="font-semibold">{friendActivityLabel(item.name, item.type)} </span>
                <span className="font-medium italic" style={SERIF}>{item.book}</span>
              </p>
              <p className="text-xs text-ink-muted mb-1.5">{item.author}</p>
              {item.rating && <Stars n={item.rating} />}
              {item.review && (
                <p className="text-xs text-ink-muted mt-1.5 leading-relaxed line-clamp-2 italic">"{item.review}"</p>
              )}
              <p className="text-[10px] text-ink-muted mt-1.5">{item.time}</p>
            </div>
            <div className="flex-shrink-0 rounded-lg overflow-hidden shadow-sm relative cursor-pointer" style={{ width:40, height:56, background:c.bg }}>
              <div className="absolute inset-y-0 left-0 w-[2px] opacity-60 rounded-l-lg" style={{ background:c.accent }} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

function ActivityPage() {
  const [feed, setFeed] = useState<'My Activity' | "Friends' Activity">('My Activity')
  const opts = ['My Activity', "Friends' Activity"] as const

  const mainContent = (
    <div>
      <SegmentedControl options={[...opts]} active={feed} onChange={v => setFeed(v as typeof feed)} />
      <div className="mt-6">
        {feed === 'My Activity' ? <MyActivityFeed /> : <FriendsActivityFeed />}
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px] gap-0 min-h-screen">
        <div className="px-8 xl:px-10 py-8 border-r border-border">
          <h1 className="text-3xl font-bold text-ink mb-7" style={SERIF}>Activity</h1>
          {mainContent}
        </div>
        <div className="px-6 py-8 space-y-5 bg-parchment/30">
          <SuggestedFriends />
          <div className="rounded-2xl border border-border p-5 bg-cream">
            <h3 className="text-sm font-bold text-ink mb-3" style={SERIF}>Your Week</h3>
            {[['Books finished','3'],['Pages read','842'],['Reviews written','1']].map(([l,v]) => (
              <div key={l} className="flex justify-between items-center py-2.5 border-b border-border last:border-0">
                <span className="text-xs text-ink-muted">{l}</span>
                <span className="text-sm font-bold text-ink">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tablet */}
      <div className="hidden md:block lg:hidden px-6 py-7 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-ink mb-6" style={SERIF}>Activity</h1>
        {mainContent}
      </div>

      {/* Mobile */}
      <div className="md:hidden px-5 py-5">
        <h1 className="text-2xl font-bold text-ink mb-5" style={SERIF}>Activity</h1>
        {mainContent}
      </div>
    </>
  )
}

// ─── Profile page ─────────────────────────────────────────────────────────────

function ProfileFavoriteCover({ id, title, author, large=false }: { id: CoverKey; title: string; author: string; large?: boolean }) {
  const c = COVERS[id]
  const w = large ? 130 : 104
  const h = large ? 188 : 150
  return (
    <div className="rounded-2xl overflow-hidden shadow-lg relative cursor-pointer group flex-shrink-0"
      style={{ width:w, height:h, background:c.bg }}>
      <div className="absolute inset-0 p-3 flex flex-col justify-between">
        <span className="text-[8px] font-bold uppercase tracking-widest opacity-60" style={{ color:c.accent }}>Bookshelf</span>
        <div>
          <p className="font-bold leading-tight text-[10px] mb-0.5" style={{ ...SERIF, color:c.text }}>{title}</p>
          <p className="text-[8px] opacity-55" style={{ color:c.text }}>{author}</p>
        </div>
      </div>
      <div className="absolute inset-y-0 left-0 w-[4px] rounded-l-2xl opacity-70" style={{ background:c.accent }} />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-2xl" />
    </div>
  )
}

function ProfilePage() {
  const [profileTab, setProfileTab] = useState<'Library' | 'Diary' | 'Reviews'>('Library')

  const profileHero = (
    <>
      {/* Banner */}
      {/* <div className="relative h-28 md:h-36 rounded-2xl overflow-hidden mb-4 md:mb-5"
        style={{ background:'linear-gradient(135deg,#3B1F00,#7A4210,#C4622D,#F4A522)' }}>
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage:'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.15), transparent 60%)' }} />
      </div> */}

      {/* Avatar + actions row */}
      <div className="flex items-end justify-between px-1  mb-4">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl border-4 border-cream overflow-hidden flex-shrink-0 shadow-lg"
          style={{ background:'linear-gradient(135deg,#C4622D,#8B3A1A)' }}>
          <div className="w-full h-full flex items-center justify-center text-white font-bold text-xl">AJ</div>
        </div>
        <div className="flex gap-2 mb-1">
          <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-border bg-cream text-xs font-semibold text-ink hover:border-terracotta hover:text-terracotta transition-colors">
            <Ic.Edit s={12} /> Edit Profile
          </button>
          <button className="w-8 h-8 rounded-xl border border-border bg-cream flex items-center justify-center text-ink-muted hover:border-terracotta hover:text-terracotta transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
          </button>
        </div>
      </div>

      {/* Name + bio */}
      <div className="px-1 mb-4">
        <h2 className="text-xl font-bold text-ink leading-tight" style={SERIF}>Alex Johnson</h2>
        <p className="text-sm text-ink-muted mb-1">@alexj</p>
        <p className="text-sm text-ink leading-relaxed">Avid reader, slow finisher. Literary fiction addict. Always carrying a book I probably won't finish on time.</p>
      </div>
    </>
  )

  const statsRow = (
    <div className="grid grid-cols-4 gap-2 mb-6">
      {PROFILE_STATS.map(s => (
        <div key={s.label} className="flex flex-col items-center justify-center py-3.5 rounded-2xl border border-border bg-cream">
          <span className="text-lg font-bold text-ink" style={SERIF}>{s.value}</span>
          <span className="text-[9px] font-medium text-ink-muted text-center leading-tight mt-0.5">{s.label}</span>
        </div>
      ))}
    </div>
  )

  const socialRow = (
    <div className="flex gap-4 px-1 mb-6">
      {[['142','Friends'],['89','Followers'],['34','Following']].map(([v,l]) => (
        <button key={l} className="flex items-baseline gap-1 hover:opacity-70 transition-opacity">
          <span className="text-sm font-bold text-ink">{v}</span>
          <span className="text-xs text-ink-muted">{l}</span>
        </button>
      ))}
    </div>
  )

  const favoritesSection = (
    <div className="mb-7">
      <div className="flex items-center justify-between mb-4 px-1">
        <h3 className="text-base font-bold text-ink" style={SERIF}>Favorite Books</h3>
        <button className="text-xs font-semibold text-terracotta hover:opacity-70">Edit →</button>
      </div>
      <div className="flex gap-3 overflow-x-auto">
        {PROFILE_FAVORITES.map(b => (
          <ProfileFavoriteCover key={b.id} id={b.id} title={b.title} author={b.author} />
        ))}
      </div>
    </div>
  )

  const recentSection = (
    <div className="mb-6">
      <h3 className="text-base font-bold text-ink mb-4 px-1" style={SERIF}>Recent Reading</h3>
      <div className="space-y-0 divide-y divide-border rounded-2xl border border-border bg-cream overflow-hidden">
        {PROFILE_RECENT.map((b, i) => {
          const c = COVERS[b.id]
          return (
            <div key={i} className="flex items-center gap-3.5 p-3.5 hover:bg-parchment/30 transition-colors cursor-pointer">
              <div className="flex-shrink-0 rounded-lg overflow-hidden shadow-sm relative" style={{ width:40, height:56, background:c.bg }}>
                <div className="absolute inset-y-0 left-0 w-[2px] opacity-60 rounded-l-lg" style={{ background:c.accent }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-ink truncate" style={SERIF}>{b.title}</p>
                <p className="text-xs text-ink-muted truncate">{b.author}</p>
                <Stars n={b.rating} />
              </div>
              <span className="text-[10px] text-ink-muted flex-shrink-0">{b.date}</span>
            </div>
          )
        })}
      </div>
    </div>
  )

  const profileTabs = (
    <div>
      <div className="flex border-b border-border mb-5">
        {(['Library','Diary','Reviews'] as const).map(t => (
          <button key={t} onClick={() => setProfileTab(t)}
            className="flex-1 py-2.5 text-sm font-medium text-center transition-colors relative"
            style={{ color:profileTab===t?'#C4622D':'#6B5D4F', fontWeight:profileTab===t?600:400 }}>
            {t}
            {profileTab===t && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-terracotta rounded-full" />}
          </button>
        ))}
      </div>
      {profileTab === 'Library' && (
        <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-4 gap-3">
          {[...PROFILE_RECENT, ...PROFILE_FAVORITES.slice(0,2)].slice(0,8).map((b, i) => (
            <BookCoverTile key={i} id={b.id} title={b.title} author={b.author} w={80} h={116} />
          ))}
        </div>
      )}
      {profileTab === 'Diary' && (
        <div className="space-y-6">
          {DIARY[0].days.slice(0,2).map(day => (
            <div key={day.day}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-terracotta">{day.day}</span>
                <div className="flex-1 h-px bg-border" />
              </div>
              {day.books.map((book, j) => <DiaryBookEntry key={j} book={book} />)}
            </div>
          ))}
        </div>
      )}
      {profileTab === 'Reviews' && (
        <div className="space-y-4">
          {PROFILE_RECENT.filter((_,i) => i%2===0).slice(0,3).map((b,i) => {
            const c = COVERS[b.id]
            return (
              <div key={i} className="p-4 rounded-2xl border border-border bg-cream">
                <div className="flex gap-3 mb-3">
                  <div className="flex-shrink-0 rounded-lg overflow-hidden shadow-sm relative" style={{ width:40, height:56, background:c.bg }}>
                    <div className="absolute inset-y-0 left-0 w-[2px] opacity-60 rounded-l-lg" style={{ background:c.accent }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-ink" style={SERIF}>{b.title}</p>
                    <p className="text-xs text-ink-muted">{b.author}</p>
                    <Stars n={b.rating} />
                  </div>
                  <span className="text-[10px] text-ink-muted">{b.date}</span>
                </div>
                <p className="text-sm text-ink leading-relaxed italic line-clamp-3">
                  "A remarkable and deeply moving work that lingers long after the final page. The writing is precise, the characters unforgettable."
                </p>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )

  const goalCard = (
    <div className="rounded-2xl border border-border p-5 bg-cream">
      <h3 className="text-sm font-bold text-ink mb-3" style={SERIF}>2026 Reading Goal</h3>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-ink-muted">Progress</span>
        <span className="text-sm font-bold text-terracotta">47 / 60</span>
      </div>
      <div className="h-2.5 rounded-full bg-parchment overflow-hidden mb-1.5">
        <div className="h-full rounded-full" style={{ width:'78%', background:'linear-gradient(90deg,#C4622D,#F4A522)' }} />
      </div>
      <p className="text-[10px] text-ink-muted">13 books to go · on pace to finish by October</p>
    </div>
  )

  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:block px-8 xl:px-10 py-8 max-w-5xl">
        {profileHero}
        {statsRow}
        {socialRow}
        <div className="grid grid-cols-[1fr_280px] xl:grid-cols-[1fr_300px] gap-8">
          <div>
            {favoritesSection}
            {profileTabs}
          </div>
          <div className="space-y-5">
            {goalCard}
            {recentSection}
          </div>
        </div>
      </div>

      {/* Tablet */}
      <div className="hidden md:block lg:hidden px-6 py-7 max-w-2xl mx-auto">
        {profileHero}
        {statsRow}
        {socialRow}
        {favoritesSection}
        {recentSection}
        {profileTabs}
      </div>

      {/* Mobile */}
      <div className="md:hidden px-5 py-5">
        {profileHero}
        {statsRow}
        {socialRow}
        {favoritesSection}
        {recentSection}
        {goalCard}
        <div className="mt-6">{profileTabs}</div>
      </div>
    </>
  )
}

// ─── Search page ──────────────────────────────────────────────────────────────

function SearchPage() {
  const [query, setQuery] = useState('')
  const searchBar = (big: boolean) => (
    <div className="relative">
      <svg className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" width={big?18:16} height={big?18:16}
        viewBox="0 0 24 24" fill="none" stroke="#6B5D4F" strokeWidth="2" strokeLinecap="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
      <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search books, authors, or ISBN..."
        className={`w-full ${big?'pl-12 pr-12 py-4':'pl-11 pr-10 py-3'} rounded-2xl bg-cream border-2 border-border text-ink
                   placeholder:text-ink-muted/50 focus:outline-none focus:ring-0 focus:border-terracotta/50 hover:border-terracotta/30 transition-all`}
        style={{ fontSize: big?16:14 }} />
      {query
        ? <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink"><Ic.X s={big?18:16} /></button>
        : big && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-semibold px-2 py-1 rounded-lg bg-parchment border border-border text-ink-muted">⌘K</span>
      }
    </div>
  )
  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:block px-8 xl:px-10 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-ink mb-1" style={SERIF}>Find your next book</h1>
          <p className="text-sm text-ink-muted">Search by title, author, ISBN, or browse by category.</p>
          <div className="mt-5 max-w-2xl">{searchBar(true)}</div>
        </div>
        <div className="grid grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px] gap-8">
          <div>
            <h2 className="text-base font-bold text-ink mb-4" style={SERIF}>Browse by</h2>
            <BrowseByAccordion />
          </div>
          <SearchDiscoveryPanel onSearch={q => setQuery(q)} />
        </div>
      </div>
      {/* Tablet */}
      <div className="hidden md:block lg:hidden px-6 py-7 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-ink mb-0.5" style={SERIF}>Find your next book</h1>
        <p className="text-xs text-ink-muted mb-4">Search by title, author, or browse by category.</p>
        <div className="mb-7">{searchBar(false)}</div>
        <div className="grid grid-cols-2 gap-4 mb-7">
          <div className="rounded-2xl border border-border p-4 bg-cream">
            <p className="text-xs font-bold text-ink mb-3" style={SERIF}>Recent</p>
            <div className="flex flex-col gap-1.5">
              {RECENT_SEARCHES.slice(0,4).map(s => (
                <button key={s} onClick={() => setQuery(s)} className="flex items-center gap-2 text-xs text-ink hover:text-terracotta transition-colors text-left truncate">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>
                  <span className="truncate">{s}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-border p-4 bg-cream">
            <p className="text-xs font-bold text-ink mb-3" style={SERIF}>Trending</p>
            <div className="flex flex-col gap-1.5">
              {TRENDING_SEARCHES.slice(0,4).map((s,i) => (
                <button key={s} onClick={() => setQuery(s)} className="flex items-center gap-2 text-xs text-ink hover:text-terracotta transition-colors text-left truncate">
                  <span className="font-bold w-3 flex-shrink-0" style={{ color:i<2?'#C4622D':'#DDD6CE' }}>{i+1}</span>
                  <span className="truncate">{s}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        <h2 className="text-base font-bold text-ink mb-4" style={SERIF}>Browse by</h2>
        <BrowseByAccordion />
      </div>
      {/* Mobile */}
      <div className="md:hidden">
        <div className="px-5 pb-2 pt-2">{searchBar(false)}</div>
        {!query && (
          <div className="mt-3 px-5">
            <p className="text-[10px] font-semibold text-ink-muted uppercase tracking-widest mb-2">Recent</p>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {RECENT_SEARCHES.map(s => (
                <button key={s} onClick={() => setQuery(s)}
                  className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-cream text-[11px] text-ink-muted hover:border-terracotta hover:text-terracotta transition-colors">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="px-5 mt-6 mb-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px flex-1 bg-border" />
            <h2 className="text-sm font-bold text-ink px-2" style={SERIF}>Browse by</h2>
            <div className="h-px flex-1 bg-border" />
          </div>
          <BrowseByAccordion />
        </div>
        <div className="px-5 mt-7 mb-2">
          <p className="text-xs font-bold text-ink mb-3" style={SERIF}>Trending This Week</p>
          {TRENDING_SEARCHES.map((s,i) => (
            <button key={s} onClick={() => setQuery(s)} className="flex items-center gap-3 py-3 border-b border-border last:border-0 text-left w-full">
              <span className="text-sm font-bold w-5 flex-shrink-0" style={{ color:i<3?'#C4622D':'#DDD6CE' }}>{i+1}</span>
              <span className="text-sm text-ink">{s}</span>
              <Ic.ArrowR s={14} />
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

// ─── Home page ────────────────────────────────────────────────────────────────

function HomePage() {
  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px] gap-0 min-h-screen">
        <div className="px-8 xl:px-10 py-8 border-r border-border space-y-10">
          <section><SectionHeader title="Continue Reading" /><ContinueReadingCard /></section>
          <section>
            <SectionHeader title="Popular This Week" sub="Trending among readers globally" />
            <div className="grid grid-cols-4 xl:grid-cols-5 gap-5">
              {POPULAR_BOOKS.slice(0,8).map(b => <BookCoverTile key={b.id} id={b.id} title={b.title} author={b.author} w={120} h={172} />)}
            </div>
          </section>
          <div className="grid grid-cols-2 gap-8">
            <section>
              <SectionHeader title="Friends Reading" />
              <div className="rounded-2xl border border-border overflow-hidden bg-cream">
                <div className="divide-y divide-border">
                  {HOME_FRIENDS.slice(0,5).map((f,i) => (
                    <div key={i} className="flex items-center gap-3.5 px-4 py-3.5">
                      <Avatar initials={f.initials} bg={f.bg} size={38} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-ink leading-snug">
                          <span className="font-semibold">{f.name}</span>
                          <span className="text-ink-muted text-xs"> {f.action} </span>
                        </p>
                        <p className="text-xs font-medium italic text-ink-muted truncate" style={SERIF}>{f.book}</p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          {f.rating && <Stars n={f.rating} />}
                          <span className="text-[10px] text-ink-muted">{f.time}</span>
                        </div>
                      </div>
                      <div className="w-9 h-12 rounded-lg flex-shrink-0 overflow-hidden shadow-sm relative" style={{ background:COVERS[f.id].bg }}>
                        <div className="absolute inset-0 p-1 flex flex-col justify-end">
                          <p className="text-[5px] font-bold leading-tight" style={{ ...SERIF, color:COVERS[f.id].text }}>{f.book}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-3 border-t border-border bg-parchment/40">
                  <button className="text-xs font-semibold text-terracotta">View all activity →</button>
                </div>
              </div>
            </section>
            <section>
              <SectionHeader title="Recommended for You" sub="Based on your library" />
              <div className="flex flex-col gap-3.5">
                {RECOMMENDED_BOOKS.slice(0,5).map(b => {
                  const c = COVERS[b.id]
                  return (
                    <div key={b.id} className="flex items-center gap-3.5 p-3 rounded-xl border border-border bg-cream hover:bg-parchment/50 transition-colors cursor-pointer">
                      <div className="w-10 h-14 rounded-lg flex-shrink-0 overflow-hidden shadow-sm relative" style={{ background:c.bg }}>
                        <div className="absolute inset-y-0 left-0 w-[2px] opacity-60 rounded-l-lg" style={{ background:c.accent }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-ink truncate" style={SERIF}>{b.title}</p>
                        <p className="text-xs text-ink-muted truncate">{b.author}</p>
                        <Stars n={4} />
                      </div>
                      <button className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center border border-border text-ink-muted hover:border-terracotta hover:text-terracotta transition-colors">
                        <Ic.Plus s={12} />
                      </button>
                    </div>
                  )
                })}
              </div>
            </section>
          </div>
        </div>
        <div className="px-6 py-8 space-y-5 bg-parchment/30">
          <ReadingStats />
          <SuggestedFriends />
          <div className="rounded-2xl border border-border p-5 bg-cream">
            <h3 className="text-sm font-bold text-ink mb-3" style={SERIF}>Browse by Genre</h3>
            <div className="flex flex-wrap gap-2">
              {HOME_GENRES.map(g => <button key={g} className="px-3 py-1.5 rounded-full text-[11px] font-medium border border-border text-ink-muted hover:border-terracotta hover:text-terracotta transition-colors">{g}</button>)}
            </div>
          </div>
        </div>
      </div>

      {/* Tablet */}
      <div className="hidden md:block lg:hidden px-6 py-7 space-y-9 max-w-2xl mx-auto">
        <section><SectionHeader title="Continue Reading" /><ContinueReadingCard /></section>
        <section>
          <SectionHeader title="Popular This Week" sub="Trending globally" />
          <div className="grid grid-cols-5 gap-4">
            {POPULAR_BOOKS.slice(0,5).map(b => <BookCoverTile key={b.id} id={b.id} title={b.title} author={b.author} w={104} h={150} />)}
          </div>
        </section>
        <section>
          <SectionHeader title="Friends Reading" />
          <div className="rounded-2xl border border-border overflow-hidden bg-cream">
            {HOME_FRIENDS.slice(0,4).map((f,i) => <FriendRow key={i} f={f} />)}
          </div>
        </section>
        <section>
          <SectionHeader title="Recommended for You" sub="Based on your reading history" />
          <div className="grid grid-cols-5 gap-4">
            {RECOMMENDED_BOOKS.slice(0,5).map(b => <BookCoverTile key={b.id} id={b.id} title={b.title} author={b.author} w={104} h={150} />)}
          </div>
          <div className="mt-4"><GenrePills /></div>
        </section>
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <section className="mb-7 px-5"><SectionHeader title="Continue Reading" /><ContinueReadingCard compact /></section>
        <section className="mb-7">
          <div className="flex items-end justify-between px-5 mb-4">
            <h2 className="text-lg font-bold text-ink" style={SERIF}>Popular This Week</h2>
            <button className="text-xs font-semibold text-terracotta">See all →</button>
          </div>
          <div className="flex gap-3.5 overflow-x-auto px-5">
            {POPULAR_BOOKS.map(b => <BookCoverTile key={b.id} id={b.id} title={b.title} author={b.author} w={100} h={144} />)}
          </div>
        </section>
        <section className="mb-7 px-5">
          <SectionHeader title="Friends Reading" />
          <div className="rounded-2xl border border-border overflow-hidden bg-cream">
            {HOME_FRIENDS.slice(0,4).map((f,i) => <div key={i} className="px-4"><FriendRow f={f} /></div>)}
          </div>
        </section>
        <section className="mb-7">
          <div className="flex items-end justify-between px-5 mb-4">
            <div>
              <h2 className="text-lg font-bold text-ink" style={SERIF}>Recommended for You</h2>
              <p className="text-[11px] text-ink-muted">Based on your reading history</p>
            </div>
            <button className="text-xs font-semibold text-terracotta flex-shrink-0">See all →</button>
          </div>
          <div className="flex gap-3.5 overflow-x-auto px-5">
            {RECOMMENDED_BOOKS.map(b => <BookCoverTile key={b.id} id={b.id} title={b.title} author={b.author} w={110} h={158} />)}
          </div>
          <div className="mt-4 px-5"><GenrePills /></div>
        </section>
      </div>
    </>
  )
}

// ─── App shell ────────────────────────────────────────────────────────────────

export default function App() {
  const [tab, setTab] = useState<NavTab>('home')

  return (
    <div className="min-h-screen bg-parchment" style={SANS}>

      {/* Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full flex-col bg-cream border-r border-border z-40 md:w-16 lg:w-56 xl:w-60 transition-all">
        <div className="flex items-center gap-3 px-4 py-5 border-b border-border md:justify-center lg:justify-start">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background:'#C4622D' }}>{LOGO_ICON}</div>
          <span className="text-lg font-bold text-ink tracking-tight hidden lg:block" style={SERIF}>Bookshelf</span>
        </div>
        <nav className="flex-1 flex flex-col gap-1 px-2 pt-4">
          {NAV_ITEMS.map(({ id, label, Icon }) => {
            const active = tab === id
            return (
              <button key={id} onClick={() => setTab(id)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all md:justify-center lg:justify-start"
                style={active ? { background:'#F0E0D5', color:'#C4622D' } : { color:'#6B5D4F' }}>
                <Icon s={20} />
                <span className="text-sm font-medium hidden lg:block" style={{ fontWeight:active?600:400 }}>{label}</span>
                {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-terracotta hidden lg:block" />}
              </button>
            )
          })}
        </nav>
        <div className="px-2 pb-5 border-t border-border pt-4">
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-ink-muted hover:bg-parchment transition-colors w-full md:justify-center lg:justify-start">
            <Ic.Settings s={20} /><span className="text-sm font-medium hidden lg:block">Settings</span>
          </button>
          <div className="flex items-center gap-3 px-3 py-2 mt-1 md:justify-center lg:justify-start">
            <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold"
              style={{ background:'linear-gradient(135deg,#C4622D,#8B3A1A)' }}>AJ</div>
            <div className="hidden lg:block min-w-0">
              <p className="text-xs font-semibold text-ink truncate">Alex Johnson</p>
              <p className="text-[10px] text-ink-muted truncate">@alexj · 47 books</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Content wrapper */}
      <div className="md:ml-16 lg:ml-56 xl:ml-60 transition-all">

        {/* Desktop/tablet top header */}
        <header className="hidden md:flex sticky top-0 z-30 bg-cream/90 border-b border-border items-center justify-between px-6 py-3.5"
          style={{ backdropFilter:'blur(12px)' }}>
          <div className="relative flex-1 max-w-md">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" width="15" height="15"
              viewBox="0 0 24 24" fill="none" stroke="#6B5D4F" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input placeholder="Search books, authors, or ISBN..." onFocus={() => setTab('search')} readOnly={tab!=='search'}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-parchment border border-border text-sm text-ink
                         placeholder:text-ink-muted/60 focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta/40 transition-all cursor-pointer" />
          </div>
          <div className="flex items-center gap-3 ml-4">
            <button className="relative w-9 h-9 rounded-full flex items-center justify-center bg-parchment hover:bg-terracotta-light transition-colors text-ink-muted">
              <Ic.Bell s={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-terracotta rounded-full border-2 border-cream" />
            </button>
            <button className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-terracotta/30 flex-shrink-0">
              <div className="w-full h-full flex items-center justify-center text-white text-xs font-bold" style={{ background:'linear-gradient(135deg,#C4622D,#8B3A1A)' }}>AJ</div>
            </button>
          </div>
        </header>

        {/* Mobile header */}
        <div className="md:hidden bg-cream">
          <div className="flex justify-between items-center px-6 pt-3 pb-1">
            <span className="text-[11px] font-semibold text-ink/40">9:41</span>
            <div className="flex gap-1.5 items-center opacity-40">
              <svg width="14" height="10" viewBox="0 0 15 11" fill="#1C1510">
                <rect x="0" y="4" width="3" height="7" rx="0.5"/><rect x="4" y="2.5" width="3" height="8.5" rx="0.5"/>
                <rect x="8" y="1" width="3" height="10" rx="0.5"/><rect x="12" y="0" width="3" height="11" rx="0.5"/>
              </svg>
              <div className="w-6 h-3 rounded-sm border border-ink/40 p-px"><div className="h-full w-4/5 bg-ink/60 rounded-sm" /></div>
            </div>
          </div>
          <div className="flex items-center justify-between px-5 pb-3 pt-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background:'#C4622D' }}>{LOGO_ICON}</div>
              <span className="text-xl font-bold text-ink tracking-tight" style={SERIF}>Bookshelf</span>
            </div>
            <div className="flex items-center gap-2.5">
              <button className="relative w-9 h-9 rounded-full flex items-center justify-center bg-parchment text-ink">
                <Ic.Bell s={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-terracotta rounded-full border-2 border-cream" />
              </button>
              <button className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-terracotta/30">
                <div className="w-full h-full flex items-center justify-center text-white text-xs font-bold" style={{ background:'linear-gradient(135deg,#C4622D,#8B3A1A)' }}>AJ</div>
              </button>
            </div>
          </div>
          {tab !== 'search' && (
            <div className="px-5 pb-4">
              <div className="relative">
                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" width="15" height="15"
                  viewBox="0 0 24 24" fill="none" stroke="#6B5D4F" strokeWidth="2" strokeLinecap="round">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input placeholder="Search books, authors, or ISBN..." onFocus={() => setTab('search')} readOnly
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-parchment border border-border text-sm text-ink placeholder:text-ink-muted/60 focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta/40 transition-all cursor-pointer" />
              </div>
            </div>
          )}
        </div>

        {/* Page content */}
        <main className="pb-28 md:pb-0">
          {tab === 'home'     && <HomePage />}
          {tab === 'search'   && <SearchPage />}
          {tab === 'library'  && <LibraryPage />}
          {tab === 'activity' && <ActivityPage />}
          {tab === 'profile'  && <ProfilePage />}
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-cream/95 border-t border-border z-40"
        style={{ backdropFilter:'blur(16px)', WebkitBackdropFilter:'blur(16px)' }}>
        <div className="flex items-center justify-around px-1 pt-2 pb-6">
          {NAV_ITEMS.map(({ id, label, Icon }) => {
            const active = tab === id
            return (
              <button key={id} onClick={() => setTab(id)}
                className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all"
                style={{ color:active?'#C4622D':'#6B5D4F' }}>
                <div className={`transition-transform ${active?'scale-110':''}`}><Icon s={22} /></div>
                <span className="text-[10px]" style={{ fontWeight:active?600:400 }}>{label}</span>
                {active && <div className="w-1 h-1 rounded-full bg-terracotta -mt-0.5" />}
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
