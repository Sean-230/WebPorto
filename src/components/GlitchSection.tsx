"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number; // Not heavily used in this rewrite, but kept for signature
  initialVisible?: boolean;
}

export default function GlitchSection({
  children,
  className = "",
  initialVisible = false,
}: Props) {
  const [isVisible, setIsVisible] = useState(initialVisible);
  const [hasRendered, setHasRendered] = useState(initialVisible);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialVisible) return;
    const el = wrapRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setHasRendered(true);
        } else {
          // If it has already rendered once, we can hide it when it scrolls out
          if (wrapRef.current && hasRendered) {
             setIsVisible(false);
          }
        }
      },
      // Trigger when any part of it is within the 10% bounds of the screen
      { threshold: 0, rootMargin: "-10% 0px -10% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [initialVisible, hasRendered]);

  let phaseClass = "";
  if (initialVisible) {
    phaseClass = "glitch-wrap--initial";
  } else if (!hasRendered) {
    phaseClass = "glitch-wrap--hidden";
  } else if (isVisible) {
    phaseClass = "glitch-wrap--visible";
  } else {
    phaseClass = "glitch-wrap--exited";
  }

  return (
    <div ref={wrapRef} className={`glitch-wrap ${phaseClass} ${className}`}>
      {children}
    </div>
  );
}
