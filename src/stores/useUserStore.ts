import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  nickname: string | null;
  level: number;
  genres: string[]; // ⭐ 추가

  setUserInfo: (payload: { nickname?: string | null; level?: number; genres?: string[] }) => void;

  resetUserInfo: () => void;
}

export const useUserStore = create(
  persist<UserState>(
    (set) => ({
      nickname: null,
      level: 0,
      genres: [],

      setUserInfo: (payload) =>
        set((state) => ({
          nickname: payload.nickname ?? state.nickname,
          level: payload.level ?? state.level,
          genres: payload.genres ?? state.genres,
        })),

      resetUserInfo: () => ({
        nickname: null,
        level: 0,
        genres: [],
      }),
    }),
    {
      name: "user-store",
    },
  ),
);
