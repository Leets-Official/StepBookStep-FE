import SkeletonBase from "./SkeletonBase";

type SkeletonBadgeProps = {
  type: "level" | "tag";
};

export default function SkeletonBadge({ type }: SkeletonBadgeProps) {
  const width = type === "level" ? "w-11" : "w-19";

  return <SkeletonBase className={`${width} h-6 rounded-xl`} />;
}
