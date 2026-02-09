export interface HomeResponse {
  readingStatistics: {
    finishedBookCount: number;
    cumulativeHours: number;
    achievementRate: number;
    favoriteCategory: string;
  };
  genreBooks: {
    type: "category" | "genre";
    id: number;
    name: string;
    books: HomeBook[];
  };
  recommendations: {
    lightReads: HomeBook[];
    levelUp: HomeBook[];
    bestseller: HomeBook[];
  };
}

export interface HomeBook {
  bookId: number;
  title: string;
  coverImage: string;
}
