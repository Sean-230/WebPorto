"use client";

import { useEffect, useRef } from "react";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.style.opacity = "1";
    container.style.transform = "translateY(0)";
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-animated grid-pattern"
    >
      {/* Techy Cyberpunk Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Core deep blue base glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/20 rounded-full blur-[100px]" />
        
        {/* Neon Cyan top right accent */}
        <div 
          className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[80px] animate-pulse" 
          style={{ animationDuration: '4s' }}
        />
        
        {/* Electric Blue bottom left accent */}
        <div 
          className="absolute -bottom-32 -left-32 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[100px] animate-pulse"
          style={{ animationDuration: '5s', animationDelay: '1s' }}
        />

        {/* Tech Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)]" />

        {/* Scanlines Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] pointer-events-none opacity-50 mix-blend-overlay" />
      </div>

      <div
        ref={containerRef}
        className="relative z-10 max-w-5xl mx-auto px-6 pt-28 pb-20"
        style={{
          opacity: 0,
          transform: "translateY(20px)",
          transition: "all 0.8s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {/* Status Badge */}
        <div className="flex justify-center mb-10">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-950/60 border border-blue-800/40 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-blue-300 font-medium tracking-wider uppercase">
              Available for opportunities
            </span>
          </div>
        </div>

        {/* Main heading */}
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-8xl font-bold leading-tight">
            <span className="text-slate-100">Sean Lawton</span>
            <br />
            <span className="shimmer-text">Tandjaja</span>
          </h1>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => scrollToSection("experience")}
            className="flex flex-col items-center gap-2 text-slate-500 hover:text-blue-400 transition-colors"
          >
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-blue-500 to-transparent animate-bounce" />
          </button>
        </div>
      </div>

      {/* Education card — floating bottom right */}
      <div className="absolute bottom-10 right-8 hidden xl:block">
        <div className="glass-card p-4 max-w-xs float-anim">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-700/30 flex items-center justify-center flex-shrink-0">
              <span style={{ color: "#60a5fa", fontWeight: 700, fontSize: "0.75rem" }}>UC</span>
            </div>
            <div>
              <p className="text-slate-200 font-semibold text-sm">Universitas Ciputra</p>
              <p className="text-blue-400 text-xs mt-0.5">Informatics · Full Stack Dev</p>
              <p className="text-slate-500 text-xs mt-1">GPA: 3.41 / 4.00 · 2024–2028</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
