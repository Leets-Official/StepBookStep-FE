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
            className="rounded-full border border-lime-600/25 text-gray-700 px-6 py-2.5 bg-white font-medium"
          />
        </div>
      )}
    </div>
  );
};

export default EmptyView;
