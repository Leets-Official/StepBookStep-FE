// EmptyView.tsx
import { styles } from "./EmptyView.styles";
import type { EmptyViewProps } from "./EmptyView.types";
import Button from "@/components/Button/Button";

const EmptyView = ({
  icon: Icon,
  title,
  description,
  actionButton,
  className = "",
}: EmptyViewProps) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.iconWrapper}>
        <Icon className="w-full h-full" />
      </div>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>

      {actionButton && (
        <div className="flex justify-center">
          <Button
            label={actionButton.label}
            onClick={actionButton.onClick}
            variant="ghost"
            size="small"
            // styles.button을 사용하여 통일감을 주고,
            // 배경 투명화 및 패딩(상하 6px, 좌우 12px)을 적용했습니다.
            className={styles.button}
          />
        </div>
      )}
    </div>
  );
};

export default EmptyView;
