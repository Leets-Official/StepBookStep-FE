import { CheckIcon } from '@/assets/icons'; 
import { cn } from "@/utils/cn";
import { checkboxBase, checkboxVariants } from "./Checkbox.styles";

interface CheckboxProps {
  checked: boolean;
  onToggle: () => void;
}

export const Checkbox = ({ checked, onToggle }: CheckboxProps) => {
  return (
    <div 
      onClick={onToggle}
      className={cn(
        checkboxBase,
        checked ? checkboxVariants.on : checkboxVariants.off
      )}
    >
      {checked && (
        <CheckIcon className="w-[18px] h-[18px] text-white" />
      )}
    </div>
  );
};