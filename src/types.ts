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