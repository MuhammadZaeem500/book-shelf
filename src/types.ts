import React from "react";

export interface Book {
  id: string;
  title: string;
  description: string;
  coverImage?: string;
}

export interface BookItem {
  id: number;
  title: string;
  author: string;
  description: string;
  currentPage: number;
  totalPages: number;
  coverImage?: string;
}

export interface AccordionItemProps {
  id: string;
  label: string;
  icon: React.ElementType;
  isActive: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export interface ProfileStats {
  booksRead: number;
  reading: number;
  wantToRead: number;
  reviews: number;
  friends: number;
  followers: number;
  following: number;
}

export interface ProfileHeaderProps {
  name?: string;
  handle?: string;
  avatarInitials?: string;
  avatarBg?: string;
  bio?: string;
  stats?: ProfileStats;
}

export interface YourWeekProps {
  booksFinished?: number;
  pagesRead?: number;
  reviewsWritten?: number;
}

export interface BooksCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  author: string;
}

export interface FriendActivityProps {
  initials: string;
  avatarBg: string;
  name: string;
  action: "is reading" | "finished" | "added to library";
  bookTitle: string;
  rating?: number;
  timeAgo: string;
  coverBg: string;
}

export interface RecommendedBookProps {
  id?: string;
  title: string;
  author: string;
  rating: number;
  coverBg: string;
  onAdd?: () => void;
}

export interface CurrentlyReadingProps {
  title: string;
  author: string;
  currentPage: number;
  totalPages: number;
  coverGradient: string;
}

export interface ReadingGoalProps {
  year: number;
  booksRead: number;
  targetBooks: number;
}

export interface WantToReadItem {
  id: string;
  title: string;
  author: string;
  coverGradient: string;
}

export interface WantToReadProps {
  totalCount: number;
  books: WantToReadItem[];
  onSeeAll?: () => void;
}

export interface WantToReadItem {
  id: string;
  title: string;
  author: string;
  coverGradient: string;
}

export interface ProfileAvatarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignOut: () => void;
  onAddAccount: () => void;
  userName?: string;
  userEmail?: string;
}

export interface AuthorItem {
  name: string;
  initials: string;
  bg: string;
  booksCount: number;
}

export interface PopularAuthorsCardProps {
  authors: AuthorItem[];
  onSelectAuthor?: (author: AuthorItem) => void;
}

export interface RecentSearchesCardProps {
  searches: string[];
  onSelectSearch?: (term: string) => void;
  onClearAll?: () => void;
}

export interface TrendingSearchesCardProps {
  trendingItems: string[];
  onSelectTrending?: (term: string) => void;
}

export interface ChangeEmailModalProps {
  isOpen: boolean;
  currentEmail: string;
  onClose: () => void;
  onSave: (newEmail: string) => void;
}

export interface EditGenresModalProps {
  isOpen: boolean;
  allGenres: string[];
  tempGenres: string[];
  onToggleGenre: (genre: string) => void;
  onClose: () => void;
  onSave: () => void;
}

export interface SelectDropdownProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

export interface SettingsRowProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  isLast?: boolean;
}

export interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
  isDanger?: boolean;
}

export interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export interface UpdatePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

export interface ActivityUser {
  id: string;
  name: string;
  email: string;
}

export interface ActivityItem {
  id: string;
  userId: string;
  type: string; // 'BECAME_FRIENDS' | 'LOGGED_BOOK' | 'REVIEW_ADDED'
  metadata?: {
    title?: string;
    author?: string;
    rating?: number;
    review?: string;
    friendId?: string;
  };
  createdAt: string;
  user: ActivityUser;
}

export interface FriendActivityItem {
  id: string;
  user: {
    name: string;
    initials: string;
    avatarBg: string;
  };
  actionText: string;
  title: string;
  author: string;
  rating?: number;
  review?: string;
  timeAgo: string;
  coverGradient: string;
}

export interface ActivityApiResponse {
  data: ActivityItem[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  bio?: string;
  stats?: ProfileStats;
}

export interface User {
  id: string;
  email: string;
  name?: string;    
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  loading: boolean;
}

export interface CurrentlyReading {
  id: string;
  status: string;
  currentPage?: number;
  totalPages?: number;
  book: {
    id: string;
    title: string;
    author: string;
    coverUrl?: string;
  };
}

export interface PopularBook {
  id: string;
  title: string;
  author: string;
  rating?: number;
  logCount?: number;
}

export interface ActivityItem {
  id: string;
  userId: string;
  type: string;
  metadata?: {
    title?: string;
    author?: string;
    rating?: number;
    review?: string;
    friendId?: string;
  };
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface ActivityApiResponse {
  data: ActivityItem[];
}
