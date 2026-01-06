import { cn } from "@/utils/cn";
import { chipBase, chipVariants, chipSizes } from "./Chip.styles";
import { XIcon } from '@/assets/icons';

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
        <XIcon className="w-4 h-4 text-inherit" />
    </button>
  );
};