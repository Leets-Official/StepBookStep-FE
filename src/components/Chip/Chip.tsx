import { cn } from "@/utils/cn";
import { chipBase, chipVariants, chipSizes } from "./Chip.styles";

interface ChipProps {
  label: string;
  onDelete?: () => void;
}

export const Chip = ({ label, onDelete }: ChipProps) => {
  return (
    <button
      onClick={onDelete}
      className={cn(chipBase, chipSizes.md, chipVariants.primary)}
    >
      <span className="leading-none">{label}</span>
        <svg 
        width="14" 
        height="14" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="text-inherit" 
      >
        <path 
          d="M18 6L6 18M6 6L18 18" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};