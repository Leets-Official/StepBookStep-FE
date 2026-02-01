export interface EmptyViewProps {
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: React.ReactNode; // 줄바꿈 처리를 위해 ReactNode 사용
  actionButton?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}
