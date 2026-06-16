"use client";

import { useEffect, useRef } from "react";

const TRAIL_LENGTH = 15;

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  
  // Must map to create independent object references for each trail dot
  const trailPos = useRef(
    Array.from({ length: TRAIL_LENGTH }).map(() => ({ x: 0, y: 0 }))
  );
  
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    
    if (!dot || !ring) return;

    const onMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
    };

    const animate = () => {
      // Animate Ring with lerp
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;
      ring.style.left = `${ringPos.current.x}px`;
      ring.style.top = `${ringPos.current.y}px`;

      // Animate Trail with spring/lerp cascade
      let targetX = pos.current.x;
      let targetY = pos.current.y;

      for (let i = 0; i < TRAIL_LENGTH; i++) {
        const tr = trailRefs.current[i];
        if (!tr) continue;

        const currentP = trailPos.current[i];
        
        // Each dot lerps towards the target (which is the dot ahead of it)
        currentP.x += (targetX - currentP.x) * 0.35;
        currentP.y += (targetY - currentP.y) * 0.35;
        
        tr.style.left = `${currentP.x}px`;
        tr.style.top = `${currentP.y}px`;

        // The next dot follows this current dot
        targetX = currentP.x;
        targetY = currentP.y;
      }

      rafRef.current = requestAnimationFrame(animate);
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
    rafRef.current = requestAnimationFrame(animate);

    const attachEvents = () => {
      document
        .querySelectorAll("a, button, [role='button'], input, textarea, select")
        .forEach((el) => {
          el.removeEventListener("mouseenter", onMouseEnterLink);
          el.removeEventListener("mouseleave", onMouseLeaveLink);
          el.addEventListener("mouseenter", onMouseEnterLink);
          el.addEventListener("mouseleave", onMouseLeaveLink);
        });
    };
    
    attachEvents();

    const observer = new MutationObserver(attachEvents);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {Array.from({ length: TRAIL_LENGTH }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { trailRefs.current[i] = el; }}
          className="cursor-trail-dot hidden md:block"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: `${12 - i * 0.6}px`,
            height: `${12 - i * 0.6}px`,
            borderRadius: "50%",
            backgroundColor: `rgba(56, 189, 248, ${1 - i * 0.06})`,
            pointerEvents: "none",
            zIndex: 99997 - i,
            transform: "translate(-50%, -50%)",
            boxShadow: `0 0 10px rgba(56, 189, 248, ${0.8 - i * 0.05})`,
            transition: "width 0.2s ease, height 0.2s ease",
          }}
        />
      ))}
      <div id="cursor-dot" ref={dotRef} className="hidden md:block" />
      <div id="cursor-ring" ref={ringRef} className="hidden md:block" />
    </>
  );
}
