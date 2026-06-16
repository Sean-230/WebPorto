"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  initialVisible?: boolean;
}

export default function FadeSection({
  children,
  className = "",
  initialVisible = false,
}: Props) {
  const [isVisible, setIsVisible] = useState(initialVisible);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialVisible) return;
    const el = wrapRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      // Trigger smoothly when entering/exiting the middle 80% of the viewport
      { threshold: 0, rootMargin: "-10% 0px -10% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [initialVisible]);

  const phaseClass = isVisible || initialVisible ? "fade-wrap--visible" : "fade-wrap--hidden";

  return (
    <div ref={wrapRef} className={`fade-wrap ${phaseClass} ${className}`}>
      {children}
    </div>
  );
}
