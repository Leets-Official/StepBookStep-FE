import { create } from "zustand";
import type { OnboardingPayload } from "@/types/onboarding";

interface OnboardingStore {
  payload: OnboardingPayload;

  setNickname: (nickname: string) => void;
  setReadingFrequency: (value: number) => void;
  setReadingDuration: (value: number) => void;
  setReadingBurden: (value: number) => void;
  setGenres: (genres: string[]) => void;

  reset: () => void;
}

const initialState: OnboardingPayload = {
  nickname: "",
  level: {
    readingFrequency: null,
    readingDuration: null,
    readingBurden: null,
  },
  genres: [],
};

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  payload: initialState,

  setNickname: (nickname) =>
    set((state) => ({
      payload: { ...state.payload, nickname },
    })),

  setReadingFrequency: (value) =>
    set((state) => ({
      payload: {
        ...state.payload,
        level: { ...state.payload.level, readingFrequency: value },
      },
    })),

  setReadingDuration: (value) =>
    set((state) => ({
      payload: {
        ...state.payload,
        level: { ...state.payload.level, readingDuration: value },
      },
    })),

  setReadingBurden: (value) =>
    set((state) => ({
      payload: {
        ...state.payload,
        level: { ...state.payload.level, readingBurden: value },
      },
    })),

  setGenres: (genres) =>
    set((state) => ({
      payload: { ...state.payload, genres },
    })),

  reset: () => set({ payload: initialState }),
}));
