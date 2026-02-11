export type RoutineTab = "routine" | "statistics";
export type NavTab = "home" | "search" | "routine" | "mypage";

export interface BookListState {
  targetTab?: RoutineTab;
}
