import { Badge } from "@/components/Badge/Badge";
import { LinearProgress } from "@/components/Progress/LinearProgress";
import type { BookListProps } from "./BookList.types";
import * as S from "./BookList.styles";
import { StarFilledIcon } from "@/assets/icons";

export function BookList({
  readingState,
  title,
  author,
  publisher,
  publicYear,
  totalPages,
  tags = [],
  startDate,
  endDate,
  currentPage = 0,
  rating,
}: BookListProps) {
  const percent = readingState === "reading" ? Math.round((currentPage / totalPages) * 100) : 0;

  return (
    <div className={S.row}>
      <div className={S.cover} />

      <div className={S.content}>
        <div className={S.info}>
          <h3 className={S.title}>{title}</h3>
          <p className={S.author}>{author}</p>
          <p className={S.meta}>
            {publisher}/{publicYear}/{totalPages}쪽
          </p>
        </div>

        <div className={S.extra}>
          {readingState === "before" && tags.length > 0 && (
            <div className={S.tagWrap}>
              {tags.map((tag) => (
                <Badge key={tag} label={tag} />
              ))}
            </div>
          )}

          {readingState === "reading" && (
            <div className={S.progressWrap}>
              <div className={S.progressTop}>
                <span>
                  <span className={S.Label}>시작일 </span>
                  <span className={S.Value}>{startDate}</span>
                </span>

                <span className={S.Value}>
                  {currentPage}쪽 ({percent}%)
                </span>
              </div>
              <LinearProgress total={totalPages} current={currentPage} />
            </div>
          )}

          {readingState === "after" && (
            <>
              <div className={S.dateRow}>
                <span>
                  <span className={S.Label}>시작일 </span>
                  <span className={S.Value}>{startDate}</span>
                </span>

                <span>
                  <span className={S.Label}>종료일 </span>
                  <span className={S.Value}>{endDate}</span>
                </span>
              </div>

              {rating !== undefined && (
                <div className={`flex items-center gap-1`}>
                  <StarFilledIcon className="w-4 h-4 text-purple-500" />
                  <span className={S.Label}>{rating.toFixed(1)}</span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
