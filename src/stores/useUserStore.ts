import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  nickname: string | null;
  email?: string | null;
  level: number;
  genreIds: number[];
  categoryIds: number[];

  setUserInfo: (payload: {
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
      nickname: null,
      email: null,
      level: 0,
      genreIds: [],
      categoryIds: [],

      setUserInfo: (payload) =>
        set((state) => ({
          nickname: payload.nickname ?? state.nickname,
          email: payload.email ?? state.email,
          level: payload.level ?? state.level,
          genreIds: payload.genreIds ?? state.genreIds,
          categoryIds: payload.categoryIds ?? state.categoryIds,
        })),

      resetUserInfo: () => ({
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
