export const READING_FREQUENCY_MAP: Record<number, string> = {
  0: "FINISHED_RECENTLY",
  1: "STOP_MIDWAY",
  2: "LONG_TIME_NO_BOOK",
  3: "DONT_KNOW_START",
};

export const READING_DURATION_MAP: Record<number, string> = {
  0: "SHORT_CHUNKS",
  1: "ONE_CHAPTER",
  2: "READ_LONG_TIME",
  3: "IT_DEPENDS",
};

export const READING_BURDEN_MAP: Record<number, string> = {
  0: "THICK_OR_HARD_BOOK",
  1: "HARD_TO_UNDERSTAND",
  2: "PRESSURE_TO_FINISH",
  3: "NO_BURDEN",
};
