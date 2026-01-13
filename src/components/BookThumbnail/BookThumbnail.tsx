import { wrapper, cover, title as titleStyle } from "./BookThumbnail.styles";

interface BookThumbnailProps {
  title?: string;
  coverUrl?: string;
  isLoading?: boolean;
}

export function BookThumbnail({ title, coverUrl, isLoading = false }: BookThumbnailProps) {
  return (
    <div className={wrapper}>
      <div
        className={cover}
        style={!isLoading ? { backgroundImage: `url(${coverUrl})` } : undefined}
      />
      <div className={titleStyle}>{!isLoading && title}</div>
    </div>
  );
}
