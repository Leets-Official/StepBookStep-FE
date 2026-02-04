import { create } from "zustand";

interface UserState {
  nickname: string;
  level: number;
  setUserInfo: (nickname: string, level: number) => void;
}

export const useUserStore = create<UserState>((set) => ({
  // [임시] 초기값 설정 (추후 로그인 API 연동 시 실제 데이터로 교체 필요!!)
  nickname: "김철수",
  level: 1,

  setUserInfo: (nickname, level) => set({ nickname, level }),
}));
