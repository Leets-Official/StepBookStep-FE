export interface SearchFilterState {
  keyword: string;
  level: number | null;
  volume: string | null;
  // 변경: 단일 string -> 문자열 배열 string[]
  country: string[];
  genre: string[];
}
