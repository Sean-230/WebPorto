"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
    };

    const animateRing = () => {
      const ease = 0.12;
      ringPosRef.current.x +=
        (posRef.current.x - ringPosRef.current.x) * ease;
      ringPosRef.current.y +=
        (posRef.current.y - ringPosRef.current.y) * ease;
      if (ring) {
        ring.style.left = `${ringPosRef.current.x}px`;
        ring.style.top = `${ringPosRef.current.y}px`;
      }
      rafRef.current = requestAnimationFrame(animateRing);
    };

    const onMouseEnterLink = () => {
      dot.style.width = "24px";
      dot.style.height = "24px";
      ring.style.width = "52px";
      ring.style.height = "52px";
    };

    const onMouseLeaveLink = () => {
      dot.style.width = "16px";
      dot.style.height = "16px";
      ring.style.width = "36px";
      ring.style.height = "36px";
    };

    document.addEventListener("mousemove", onMouseMove);
    rafRef.current = requestAnimationFrame(animateRing);

    const interactables = document.querySelectorAll(
      "a, button, [role='button'], input, textarea, select"
    );
    interactables.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterLink);
      el.addEventListener("mouseleave", onMouseLeaveLink);
    });

    // Observer for dynamically added elements
    const observer = new MutationObserver(() => {
      document
        .querySelectorAll("a, button, [role='button'], input, textarea, select")
        .forEach((el) => {
          el.removeEventListener("mouseenter", onMouseEnterLink);
          el.removeEventListener("mouseleave", onMouseLeaveLink);
          el.addEventListener("mouseenter", onMouseEnterLink);
          el.addEventListener("mouseleave", onMouseLeaveLink);
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div id="cursor-dot" ref={dotRef} />
      <div id="cursor-ring" ref={ringRef} />
    </>
  );
}
