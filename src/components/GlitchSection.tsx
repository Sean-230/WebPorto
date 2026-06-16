"use client";

import { useEffect, useRef, useState, useCallback } from "react";

type Phase = "hidden" | "entering" | "visible" | "exiting";

interface Props {
  children: React.ReactNode;
  className?: string;
  /** Delay before the glitch-in starts (ms) */
  delay?: number;
  /** The section starts visible (hero only) */
  initialVisible?: boolean;
}

export default function GlitchSection({
  children,
  className = "",
  delay = 0,
  initialVisible = false,
}: Props) {
  const [phase, setPhase] = useState<Phase>(initialVisible ? "visible" : "hidden");
  const wrapRef = useRef<HTMLDivElement>(null);
  const hasEnteredOnce = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startEnter = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setPhase("entering");
    }, delay);
  }, [delay]);

  const startExit = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setPhase("exiting");
  }, []);

  useEffect(() => {
    if (initialVisible) return;
    const el = wrapRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          hasEnteredOnce.current = true;
          startEnter();
        } else if (hasEnteredOnce.current) {
          startExit();
        }
      },
      // Use threshold 0 so even very tall sections trigger immediately
      // when they enter the viewport minus 10% margin on top and bottom.
      { threshold: 0, rootMargin: "-10% 0px -10% 0px" }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [initialVisible, startEnter, startExit]);

  const handleAnimationEnd = (e: React.AnimationEvent<HTMLDivElement>) => {
    // Only react to our own animations (not children)
    if (e.target !== wrapRef.current) return;
    if (phase === "entering") setPhase("visible");
    if (phase === "exiting") setPhase("hidden");
  };

  return (
    <div
      ref={wrapRef}
      onAnimationEnd={handleAnimationEnd}
      className={`glitch-section glitch-section--${phase} ${className}`}
    >
      {children}
    </div>
  );
}
