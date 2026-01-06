import { useState } from "react";
import {
  container,
  content,
  collapsed,
  gradient,
  toggleArea,
  toggleButton,
  icon,
} from "./FullView.styles";
import { ChevronDownIcon, ChevronUpIcon } from "@/assets/icons";

interface FullViewProps {
  children: React.ReactNode;
}

export function FullView({ children }: FullViewProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={container}>
      <div className={[content, expanded ? "" : collapsed].join(" ")}>{children}</div>

      {!expanded && <div className={gradient} />}

      <div className={toggleArea}>
        <button type="button" className={toggleButton} onClick={() => setExpanded((v) => !v)}>
          {expanded ? "접기" : "전체 보기"}
          {expanded ? <ChevronUpIcon className={icon} /> : <ChevronDownIcon className={icon} />}
        </button>
      </div>
    </div>
  );
}
