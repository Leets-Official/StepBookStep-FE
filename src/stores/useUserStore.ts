import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  userId: number;
  nickname: string | null;
  email?: string | null;
  level: number;
  genreIds: number[];
  categoryIds: number[];

  setUserInfo: (payload: {
    userId?: number;
    nickname?: string | null;
    email?: string | null;
    level?: number;
    genreIds?: number[];
    categoryIds?: number[];
  }) => void;

  resetUserInfo: () => void;
}

export const useUserStore = create(
  persist<UserState>(
    (set) => ({
      userId: 0,
      nickname: null,
      email: null,
      level: 0,
      genreIds: [],
      categoryIds: [],

      setUserInfo: (payload) =>
        set((state) => ({
          userId: payload.userId ?? state.userId,
          nickname: payload.nickname ?? state.nickname,
          email: payload.email ?? state.email,
          level: payload.level ?? state.level,
          genreIds: payload.genreIds ?? state.genreIds,
          categoryIds: payload.categoryIds ?? state.categoryIds,
        })),

      resetUserInfo: () => ({
        userId: 0,
        nickname: null,
        email: null,
        level: 0,
        genreIds: [],
        categoryIds: [],
      }),
    }),
    {
      name: "user-store",
    },
  ),
);
