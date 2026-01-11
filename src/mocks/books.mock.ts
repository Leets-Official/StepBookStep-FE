export interface BookMock {
  id: number;
  title: string;
  coverUrl: string;
}

export const BOOKS_MOCK = [
  {
    id: 1,
    title: "클린 코드",
    coverUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
  },
  {
    id: 2,
    title: "이펙티브 타입스크립트",
    coverUrl: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400",
  },
  {
    id: 3,
    title: "리팩터링",
    coverUrl: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400",
  },
  {
    id: 4,
    title: "프론트엔드 개발자를 위한 클린 아키텍처와 유지보수 가능한 코드 설계 방법",
    coverUrl: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400",
  },
  {
    id: 5,
    title: "실무에서 바로 적용하는 타입스크립트 패턴과 대규모 프론트엔드 애플리케이션 설계",
    coverUrl: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400",
  },
];
