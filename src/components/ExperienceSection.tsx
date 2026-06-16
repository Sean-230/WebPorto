"use client";

import { useEffect, useRef } from "react";

const experiences = [
  {
    company: "Henry Archive Division",
    period: "2025 – Present",
    roles: ["Editor", "Videographer", "Photographer"],
    description:
      "Documented live performance events for DJ Henry and produced engaging promotional materials to build the artist's digital brand presence across social media platforms.",
    tags: ["Video Editing", "Photography", "Brand Content"],
    initial: "H",
    color: "from-blue-600 to-indigo-600",
  },
  {
    company: "Hoptons Visual",
    period: "2025 – Present",
    roles: ["Videographer", "Photographer"],
    description:
      "Collaborated on-set to shoot high-quality corporate deliverables and targeted advertisement campaigns for diverse business clients, ensuring exceptional visual storytelling.",
    tags: ["Corporate Photography", "Ad Campaigns", "Videography"],
    initial: "HV",
    color: "from-sky-600 to-blue-600",
  },
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

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
    itemRefs.current.forEach((ref) => { if (ref) observer.observe(ref); });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" className="section-pad relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(10,22,40,0.05), transparent)" }}
      />

      <div style={{ maxWidth: "64rem", margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Section Header */}
        <div ref={sectionRef} className="fade-in-up section-header">
          <span className="section-eyebrow">Professional Journey</span>
          <h2 className="section-title">Experience</h2>
          <div className="section-divider" />
        </div>

        {/* Timeline */}
        <div style={{ position: "relative" }}>
          {/* Vertical line */}
          <div style={{
            position: "absolute",
            left: "1.5rem",
            top: 0,
            bottom: 0,
            width: "2px",
            background: "linear-gradient(to bottom, #2563eb, #38bdf8, transparent)",
          }}
            className="timeline-md-center"
          />

          <div style={{ display: "flex", flexDirection: "column", gap: "5rem" }}>
            {experiences.map((exp, i) => (
              <div
                key={exp.company}
                ref={(el) => { itemRefs.current[i] = el; }}
                className={`fade-in-up exp-row ${i % 2 === 0 ? "exp-row-normal" : "exp-row-reverse"}`}
                style={{ position: "relative", display: "flex", gap: "4rem", transitionDelay: `${i * 0.15}s` }}
              >
                {/* Timeline dot */}
                <div style={{
                  position: "absolute",
                  zIndex: 10,
                  width: "1.25rem",
                  height: "1.25rem",
                  borderRadius: "50%",
                  boxShadow: "0 0 12px rgba(37,99,235,0.4)",
                  outline: "4px solid #050b18",
                }}
                  className={`bg-gradient-to-br ${exp.color} timeline-dot`}
                />

                {/* Card */}
                <div
                  className="glass-card glass-card-hover exp-card"
                  style={{ flex: "0 0 calc(50% - 2rem)" }}
                >
                  <div className="card-pad-lg">
                    {/* Header */}
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "1.5rem" }}>
                      <div
                        className={`bg-gradient-to-br ${exp.color}`}
                        style={{ width: "3.5rem", height: "3.5rem", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 4px 14px rgba(37,99,235,0.25)" }}
                      >
                        <span style={{ color: "#fff", fontWeight: 700, fontSize: "0.875rem" }}>{exp.initial}</span>
                      </div>
                      <div>
                        <h3 style={{ color: "#e2e8f0", fontWeight: 700, fontSize: "1.2rem" }}>
                          {exp.company}
                        </h3>
                        <span style={{ color: "#60a5fa", fontSize: "0.875rem", fontWeight: 500, display: "block", marginTop: "0.25rem" }}>
                          {exp.period}
                        </span>
                      </div>
                    </div>

                    {/* Roles */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.25rem" }}>
                      {exp.roles.map((role) => (
                        <span key={role} style={{ fontSize: "0.75rem", padding: "0.35rem 0.85rem", borderRadius: "9999px", background: "rgba(37,99,235,0.15)", color: "#93c5fd", border: "1px solid rgba(37,99,235,0.25)" }}>
                          {role}
                        </span>
                      ))}
                    </div>

                    {/* Description */}
                    <p className="card-body-text" style={{ marginBottom: "1.5rem" }}>
                      {exp.description}
                    </p>

                    {/* Tags */}
                    <div className="card-divider" style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                      {exp.tags.map((tag) => (
                        <span key={tag} style={{ fontSize: "0.75rem", padding: "0.25rem 0.625rem", borderRadius: "0.375rem", background: "rgba(10,22,40,0.5)", color: "#94a3b8" }}>
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Date label (opposite side — desktop only) */}
                <div className="exp-date" style={{ flex: "0 0 calc(50% - 2rem)", display: "flex", alignItems: "center" }}>
                  <span style={{ color: "#475569", fontSize: "0.875rem", fontFamily: "monospace" }}>{exp.period}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .timeline-md-center { left: 50% !important; }
          .exp-row { flex-direction: row !important; }
          .exp-row-reverse { flex-direction: row-reverse !important; }
          .exp-card { margin-left: 0 !important; }
          .timeline-dot { left: 50%; top: 2rem; transform: translateX(-50%); }
          .exp-row-normal .exp-date { justify-content: flex-start; padding-left: 3rem; }
          .exp-row-reverse .exp-date { justify-content: flex-end; padding-right: 3rem; }
        }
        @media (max-width: 767px) {
          .timeline-md-center { left: 1.5rem !important; }
          .exp-row { flex-direction: column !important; gap: 1.5rem !important; }
          .exp-card { flex: 1 1 auto !important; margin-left: 3.5rem !important; }
          .exp-date { display: none !important; }
          .timeline-dot { left: 1.5rem; top: 1.5rem; transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
