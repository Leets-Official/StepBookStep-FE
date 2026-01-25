import clsx from "clsx";

interface SkeletonBaseProps {
  className?: string;
  rounded?: string;
}

export default function SkeletonBase({ className, rounded = "rounded-md" }: SkeletonBaseProps) {
  return <div className={clsx("animate-pulse bg-gray-200", rounded, className)} />;
}
