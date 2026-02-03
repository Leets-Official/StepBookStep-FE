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
  targetPeriod,
  targetAmount,
  remainingAmount,
  coverImage, // 책 커버 이미지 가져올라고 사용
  onClick,
}: BookListProps) {
  const percent = readingState === "reading" ? Math.round((currentPage / totalPages) * 100) : 0;

  return (
    <div className={S.row} onClick={onClick}>
      <div className={S.cover}>
        {coverImage && (
          <img src={coverImage} alt={title} className="w-full h-full object-cover rounded-sm" />
        )}
      </div>

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
                <Badge key={tag} label={tag} className={S.tagBadge} />
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
          {readingState === "readingdetail" && (
            <>
              <p className={S.detailMainText}>
                <span className={S.highlight}>{targetPeriod}</span>
                <span>에 </span>
                <span className={S.highlight}>{targetAmount}</span>
                <span>쪽</span>
                <span className="text-gray-500"> 독서해요!</span>
              </p>

              <p className={S.detailSubText}>
                <span>목표 달성까지 </span>
                <span className="text-purple-400">{remainingAmount}</span>
                <span>쪽 남았어요!</span>
              </p>
            </>
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
