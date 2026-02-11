import { create } from "zustand";

export interface OnboardingPayload {
  nickname: string;

  level: {
    readingFrequency: number | null;
    readingDuration: number | null;
    readingBurden: number | null;
  };

  categories: number[];
  genres: number[];
}

interface OnboardingStore {
  payload: OnboardingPayload;

  setNickname: (nickname: string) => void;

  setReadingFrequency: (index: number) => void;
  setReadingDuration: (index: number) => void;
  setReadingBurden: (index: number) => void;

  setGenres: (genres: number[]) => void;
  setCategories: (categories: number[]) => void;
}

const initialState: OnboardingPayload = {
  nickname: "",
  level: {
    readingFrequency: null,
    readingDuration: null,
    readingBurden: null,
  },
  categories: [],
  genres: [],
};

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  payload: initialState,

  setNickname: (nickname) =>
    set((state) => ({
      payload: { ...state.payload, nickname },
    })),

  setReadingFrequency: (index) =>
    set((state) => ({
      payload: {
        ...state.payload,
        level: { ...state.payload.level, readingFrequency: index },
      },
    })),

  setReadingDuration: (index) =>
    set((state) => ({
      payload: {
        ...state.payload,
        level: { ...state.payload.level, readingDuration: index },
      },
    })),

  setReadingBurden: (index) =>
    set((state) => ({
      payload: {
        ...state.payload,
        level: { ...state.payload.level, readingBurden: index },
      },
    })),

  setGenres: (genres) =>
    set((state) => ({
      payload: { ...state.payload, genres },
    })),

  setCategories: (categories) =>
    set((state) => ({
      payload: { ...state.payload, categories },
    })),
}));
