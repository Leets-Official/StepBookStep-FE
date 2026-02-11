import { useRef, useState } from "react";

export function useHorizontalDragScroll() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);

  const [dragged, setDragged] = useState(false);

  const onPointerDown = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    if (e.pointerType === "mouse") return;

    isDragging.current = true;
    setDragged(false);

    startX.current = e.clientX;
    startScrollLeft.current = containerRef.current.scrollLeft;

    containerRef.current.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !containerRef.current) return;

    const walk = e.clientX - startX.current;

    if (Math.abs(walk) > 6) {
      setDragged(true);
    }

    containerRef.current.scrollLeft = startScrollLeft.current - walk;
  };

  const endDrag = (e: React.PointerEvent) => {
    if (!isDragging.current) return;

    isDragging.current = false;
    containerRef.current?.releasePointerCapture(e.pointerId);

    requestAnimationFrame(() => setDragged(false));
  };

  return {
    containerRef,
    dragged,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: endDrag,
      onPointerCancel: endDrag,
    },
  };
}
