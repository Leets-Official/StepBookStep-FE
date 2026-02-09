import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  nickname: string | null;
  email?: string | null;
  level: number;
  genres: string[];

  setUserInfo: (payload: {
    nickname?: string | null;
    email?: string | null;
    level?: number;
    genres?: string[];
  }) => void;

  resetUserInfo: () => void;
}

export const useUserStore = create(
  persist<UserState>(
    (set) => ({
      nickname: null,
      email: null,
      level: 0,
      genres: [],

      setUserInfo: (payload) =>
        set((state) => ({
          nickname: payload.nickname ?? state.nickname,
          email: payload.email ?? state.email,
          level: payload.level ?? state.level,
          genres: payload.genres ?? state.genres,
        })),

      resetUserInfo: () => ({
        nickname: null,
        email: null,
        level: 0,
        genres: [],
      }),
    }),
    {
      name: "user-store",
    },
  ),
);
