import { create } from "zustand";

interface UserState {
  nickname: string | null;
  level: number;
  setUserInfo: (nickname: string, level: number) => void;
  resetUserInfo: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  nickname: null,
  level: 0,

  setUserInfo: (nickname, level) => set({ nickname, level }),
  resetUserInfo: () => set({ nickname: null, level: 0 }),
}));
