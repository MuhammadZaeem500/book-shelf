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