import { useEffect, useRef, useState } from "react";
import { container, content, gradient, toggleArea, toggleButton, icon } from "./FullView.styles";
import { ChevronDownIcon, ChevronUpIcon } from "@/assets/icons";

interface FullViewProps {
  children: React.ReactNode;
  collapsedHeight?: number;
}

export function FullView({ children, collapsedHeight = 100 }: FullViewProps) {
  const [expanded, setExpanded] = useState(false);
  const [isOverflow, setIsOverflow] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    setIsOverflow(el.scrollHeight > collapsedHeight);
  }, [children, collapsedHeight]);

  useEffect(() => {
    if (expanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [expanded]);

  return (
    <div className={container}>
      <div
        ref={contentRef}
        className={content}
        style={
          expanded ? { maxHeight: "none" } : { maxHeight: collapsedHeight, overflow: "hidden" }
        }
      >
        {children}
      </div>

      {!expanded && isOverflow && <div className={gradient} />}

      {isOverflow && (
        <div className={toggleArea}>
          <button type="button" className={toggleButton} onClick={() => setExpanded((v) => !v)}>
            {expanded ? "접기" : "전체 보기"}
            {expanded ? <ChevronUpIcon className={icon} /> : <ChevronDownIcon className={icon} />}
          </button>
        </div>
      )}
    </div>
  );
}
