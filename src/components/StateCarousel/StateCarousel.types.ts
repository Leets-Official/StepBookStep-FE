export type ReadingStatus = "BEFORE" | "READING" | "AFTER" | "STOP";

export interface StateCarouselProps {
  initialStatus?: ReadingStatus;
  onChange?: (status: ReadingStatus) => void;
}

export interface StateConfig {
  label: string;
  value: ReadingStatus;
  textColor: string;
}
