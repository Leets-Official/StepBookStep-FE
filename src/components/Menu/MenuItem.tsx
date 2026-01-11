import { itemBase, itemActive, itemInactive, itemLabel, itemIcon } from "@/components/Menu/Menu.styles";
import { ChevronRightIcon } from "@/assets/icons";

interface MenuItemProps {
  label: string;
  interaction?: boolean;
  onClick?: () => void;
}

export function MenuItem({ label, interaction = false, onClick }: MenuItemProps) {
  return (
    <li 
      className={[
        itemBase,
        interaction ? itemActive : itemInactive
      ].join(" ")} 
      onClick={onClick}
    >
      <span className={itemLabel}>{label}</span>
      <ChevronRightIcon className={itemIcon} />
    </li>
  );
}
