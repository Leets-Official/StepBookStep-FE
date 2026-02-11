const GENRE_COLORS: Record<string, string> = {
  "중국소설": "#D2D5FE",
  "일본소설": "#A9AAFB",
  "영미소설": "#787AEE",
  "한국소설": "#4931D4",
  
  "프랑스소설": "#E6C2FF",
  "역사소설": "#E8A4FF",
  "희곡": "#E66EE4",
  "로맨스": "#D300AC",
  
  "과학소설(SF)": "#FFD8FF",
  "판타지/환상문학": "#FFAECE",
  "추리/미스터리": "#FF84B4",
  "독일소설": "#FF277B",
  
  "라이트노벨": "#DFFBBE",
  "액션/스릴러": "#BBEF80",
  "무협소설": "#91D654",
  "호러/공포소설": "#67B22A",
};

// 색상 조회 헬퍼 함수
export const getGenreColor = (genreName: string) => {
  return GENRE_COLORS[genreName] || "#E8E9ED";
};

// 무게 이미지 조회 헬퍼 함수
export const getWeightImage = (kg: number) => {
  if (kg < 0.4) return { name: "컵라면", src: "/images/300g.png" };
  if (0.4 <= kg && kg < 0.7) return { name: "햄버거", src: "/images/400g.png" };
  if (0.7 <= kg && kg < 1.3) return { name: "소형 노트북", src: "/images/700g.png" };
  if (1.3 <= kg && kg < 1.5) return { name: "전공책", src: "/images/1.3kg.png" };
  return { name: "아령", src: "/images/1.5kg.png" };
};

// 시간 포맷 헬퍼 함수
export const formatReadingTime = (hours: number, minutes: number) => {
  return `${hours}시간 ${minutes}분`;
};
