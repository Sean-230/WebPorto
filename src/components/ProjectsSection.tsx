"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const projects = [
  {
    title: "Leap Plan",
    logo: "/logos/leap_plan.png",
    description:
      "Engineered an automated multi-day itinerary generation engine. Plans routes intelligently using real-world venue data and presents them on an interactive map.",
    tech: ["SwiftUI", "Foursquare API", "MapKit", "MVVM", "Firestore"],
    type: "iOS App",
    color: "from-blue-700 to-blue-500",
    highlight: true,
    size: "lg",
    features: ["Multi-day route planning", "Real-time venue data", "Cloud sync"],
  },
  {
    title: "Recipe Vault",
    logo: "/logos/recipe_vault.png",
    description:
      "A comprehensive iOS recipe management app integrating external APIs with user-generated NoSQL data. Includes auth, personal cookbooks, and rich media.",
    tech: ["Swift", "Firebase Auth", "Firestore", "REST API"],
    type: "iOS App",
    color: "from-sky-600 to-blue-600",
    highlight: false,
    size: "sm",
    features: ["Personal cookbook", "Firebase Auth", "API integration"],
  },
  {
    title: "Sum-O",
    logo: "/logos/sum_o.png",
    description:
      "A POS and inventory management system built for local small businesses (UMKM), featuring logistics tracking, item catalog management, and sales reporting.",
    tech: ["Kotlin", "PostgreSQL", "REST API", "Android"],
    type: "Android App",
    color: "from-indigo-600 to-blue-600",
    highlight: false,
    size: "sm",
    features: ["POS system", "Inventory tracking", "Sales analytics"],
  },
  {
    title: "Festivo",
    logo: "/logos/festivo.png",
    description:
      "A comprehensive event management and ticketing website with dynamic pricing algorithms, seat selection, and user-friendly purchasing workflows for event organizers.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
    type: "Web App",
    color: "from-blue-600 to-cyan-600",
    highlight: true,
    size: "lg",
    features: ["Dynamic pricing", "Ticket management", "Event dashboard"],
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    cardRefs.current.forEach((ref) => { if (ref) observer.observe(ref); });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="section-pad relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(10,22,40,0.05), transparent)" }}
      />

      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Section Header */}
        <div ref={sectionRef} className="fade-in-up section-header">
          <span className="section-eyebrow">Portfolio</span>
          <h2 className="section-title">Projects</h2>
          <div className="section-divider" style={{ marginBottom: "1.5rem" }} />
          <p style={{ color: "#94a3b8", maxWidth: "36rem", margin: "0 auto", lineHeight: "1.7", fontSize: "0.9375rem" }}>
            A selection of apps and platforms I have built across iOS, Android, and the web.
          </p>
        </div>

        {/* Bento Grid */}
        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.75rem" }}
          className="projects-grid"
        >
          {projects.map((project, i) => (
            <div
              key={project.title}
              ref={(el) => { cardRefs.current[i] = el; }}
              className={`fade-in-up glass-card glass-card-hover group relative overflow-hidden ${project.size === "lg" ? "bento-lg" : ""}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              {/* Subtle glow */}
              <div
                className={`absolute rounded-full bg-gradient-to-br ${project.color} blur-2xl pointer-events-none`}
                style={{ top: "-2.5rem", right: "-2.5rem", width: "8rem", height: "8rem", opacity: 0.08 }}
              />

              <div className="card-pad-lg" style={{ position: "relative" }}>
                {/* Header */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    {/* Logo image */}
                    <div
                      style={{
                        width: "3.5rem",
                        height: "3.5rem",
                        borderRadius: "0.875rem",
                        overflow: "hidden",
                        background: "#fff",
                        flexShrink: 0,
                        boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
                        transition: "transform 0.25s ease",
                      }}
                      className="logo-wrap"
                    >
                      <Image
                        src={project.logo}
                        alt={`${project.title} logo`}
                        width={56}
                        height={56}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        unoptimized
                      />
                    </div>
                    <div>
                      <h3 style={{ color: "#e2e8f0", fontWeight: 700, fontSize: "1.2rem", lineHeight: 1.2 }}>
                        {project.title}
                      </h3>
                      <span style={{ color: "#60a5fa", fontSize: "0.85rem", fontWeight: 500, display: "block", marginTop: "0.3rem" }}>
                        {project.type}
                      </span>
                    </div>
                  </div>
                  {project.highlight && (
                    <span style={{ fontSize: "0.75rem", padding: "0.3rem 0.7rem", borderRadius: "9999px", background: "rgba(37,99,235,0.15)", border: "1px solid rgba(96,165,250,0.3)", color: "#93c5fd", flexShrink: 0 }}>
                      Featured
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="card-body-text" style={{ marginBottom: "1.25rem" }}>
                  {project.description}
                </p>

                {/* Features */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem 1.5rem", marginBottom: "1.5rem" }}>
                  {project.features.map((f) => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.8125rem", color: "#94a3b8" }}>
                      <span style={{ color: "#3b82f6", fontWeight: 700 }}>&#10003;</span>
                      {f}
                    </div>
                  ))}
                </div>

                {/* Tech Stack */}
                <div className="card-divider" style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {project.tech.map((t) => (
                    <span key={t} style={{ fontSize: "0.75rem", padding: "0.3rem 0.75rem", borderRadius: "9999px", background: "rgba(10,22,40,0.6)", color: "#93c5fd", border: "1px solid rgba(37,99,235,0.25)" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .projects-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .bento-lg { grid-column: span 2 !important; }
        }
        @media (max-width: 640px) {
          .projects-grid { grid-template-columns: 1fr !important; }
          .bento-lg { grid-column: span 1 !important; }
        }
        .logo-wrap:hover { transform: scale(1.08); }
      `}</style>
    </section>
  );
}
