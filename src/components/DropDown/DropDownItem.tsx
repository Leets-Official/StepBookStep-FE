import { item, itemActive } from "./DropDown.styles";

interface DropDownItemProps {
  label: string;
  active?: boolean;
  onClick: () => void;
}

export function DropDownItem({ label, active, onClick }: DropDownItemProps) {
  return (
    <li className={`${item} ${active ? itemActive : ""}`} onClick={onClick}>
      {label}
    </li>
  );
}
