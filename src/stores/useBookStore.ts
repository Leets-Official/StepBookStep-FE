import { create } from "zustand";
import type { BookItem, ReadStatus } from "@/pages/MyPage/MyPage.types";

interface BookStore {
  books: BookItem[];
  updateBookStatus: (userBookId: number, status: ReadStatus, rating: number) => void;
}

export const useBookStore = create<BookStore>((set) => ({
  books: [],

  updateBookStatus: (userBookId, status, rating) =>
    set((state) => ({
      books: state.books.map((book) =>
        book.userBookId === userBookId
          ? { ...book, status, rating, updatedAt: new Date().toISOString() }
          : book,
      ),
    })),
}));
