"use client";

import { useEffect, useRef } from "react";

const skillGroups = [
  {
    category: "Technical",
    color: "#2563eb",
    skills: ["SwiftUI", "Kotlin", "Python", "HTML", "CSS", "JavaScript", "Figma", "GitHub", "PostgreSQL", "MySQL"],
  },
  {
    category: "Creative Media",
    color: "#0ea5e9",
    skills: ["Photography", "Videography", "Video Editing", "Photo Editing", "Design", "Visual Storytelling"],
  },
  {
    category: "Soft Skills",
    color: "#6366f1",
    skills: ["Leadership", "Hard Working", "Creativity", "Attention to Detail", "Adaptability", "Problem Solving"],
  },
];

const activities = [
  {
    title: "Coordinator of Publication & Documentation",
    org: "Universitas Ciputra Fair 2026",
    period: "2026",
    description: "Led creative teams, managed end-to-end video production, and executed digital content strategies.",
  },
  {
    title: "Coordinator of Publication & Documentation",
    org: "Universitas Ciputra Debate Competition",
    period: "2025",
    description: "Led creative teams, managed end-to-end video production, and executed digital content strategies.",
  },
  {
    title: "Member",
    org: "TEDX Universitas Ciputra",
    period: "2024–2025",
    description: "Participated in the organization of TEDx events, supporting media and documentation efforts.",
  },
  {
    title: "Member",
    org: "Student Union IMT",
    period: "2024–2025",
    description: "Active member of the Informatics student union, supporting events and community initiatives.",
  },
  {
    title: "Member",
    org: "Narcobye & UCC",
    period: "2024",
    description: "Engaged in campus community organizations, contributing to collaborative and creative projects.",
  },
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const groupRefs = useRef<(HTMLDivElement | null)[]>([]);

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
    groupRefs.current.forEach((ref) => { if (ref) observer.observe(ref); });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="section-pad relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(10,22,40,0.05), transparent)" }}
      />

      <div style={{ maxWidth: "64rem", margin: "0 auto", padding: "0 1.5rem" }}>
        {/* ── Section Header ── */}
        <div ref={sectionRef} className="fade-in-up section-header">
          <span className="section-eyebrow">Capabilities</span>
          <h2 className="section-title">Skills & Expertise</h2>
          <div className="section-divider" />
        </div>

        {/* ── Skill Groups ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", marginBottom: "5rem" }} className="skills-grid">
          {skillGroups.map((group, i) => (
            <div
              key={group.category}
              ref={(el) => { groupRefs.current[i] = el; }}
              className="fade-in-up glass-card"
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              <div className="card-pad-lg">
                {/* Category label with color accent — no icon */}
                <div style={{ marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: `2px solid ${group.color}30` }}>
                  <h3 style={{ color: "#e2e8f0", fontWeight: 700, fontSize: "1rem", letterSpacing: "0.01em" }}>
                    <span style={{ display: "inline-block", width: "0.5rem", height: "0.5rem", borderRadius: "50%", background: group.color, marginRight: "0.625rem", verticalAlign: "middle" }} />
                    {group.category}
                  </h3>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.625rem" }}>
                  {group.skills.map((skill) => (
                    <span key={skill} className="skill-badge">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Leadership & Activities — Horizontal Timeline ── */}
        <div ref={(el) => { groupRefs.current[3] = el; }} className="fade-in-up" style={{ marginBottom: "5rem" }}>
          <h3 style={{ color: "#cbd5e1", fontWeight: 700, fontSize: "1.5rem", marginBottom: "3rem", textAlign: "center" }}>
            Leadership & Activities
          </h3>

          {/* Horizontal scroll wrapper */}
          <div style={{ position: "relative" }} className="h-timeline-container">
            {/* Horizontal line */}
            <div style={{
              position: "absolute",
              top: "1.375rem",
              left: 0,
              right: 0,
              height: "2px",
              background: "linear-gradient(to right, transparent, #2563eb 10%, #38bdf8 50%, #2563eb 90%, transparent)",
              zIndex: 0,
            }} />

            {/* Activity nodes */}
            <div style={{
              display: "flex",
              gap: "0",
              overflowX: "auto",
              paddingBottom: "1rem",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }} className="h-timeline-scroll">
              {activities.map((act, i) => (
                <div
                  key={`${act.org}-${i}`}
                  style={{
                    flex: `0 0 ${100 / activities.length}%`,
                    minWidth: "220px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    position: "relative",
                    paddingTop: "0",
                  }}
                >
                  {/* Dot on the line */}
                  <div style={{
                    width: "1.125rem",
                    height: "1.125rem",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #2563eb, #38bdf8)",
                    boxShadow: "0 0 0 4px #050b18, 0 0 12px rgba(37,99,235,0.5)",
                    zIndex: 2,
                    flexShrink: 0,
                    marginBottom: "1.5rem",
                  }} />

                  {/* Card below */}
                  <div
                    className="glass-card"
                    style={{
                      padding: "1.25rem",
                      width: "calc(100% - 2rem)",
                      margin: "0 1rem",
                      transition: "transform 0.25s, box-shadow 0.25s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(37,99,235,0.2)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "";
                    }}
                  >
                    <span style={{
                      display: "inline-block",
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      color: "#60a5fa",
                      background: "rgba(37,99,235,0.12)",
                      border: "1px solid rgba(37,99,235,0.25)",
                      borderRadius: "9999px",
                      padding: "0.2rem 0.625rem",
                      marginBottom: "0.75rem",
                    }}>
                      {act.period}
                    </span>
                    <p style={{ color: "#e2e8f0", fontWeight: 600, fontSize: "0.875rem", lineHeight: 1.4, marginBottom: "0.5rem" }}>
                      {act.title}
                    </p>
                    <p style={{ color: "#60a5fa", fontSize: "0.8rem", fontWeight: 500, marginBottom: "0.75rem" }}>
                      {act.org}
                    </p>
                    <p style={{ color: "#64748b", fontSize: "0.8rem", lineHeight: 1.6 }}>
                      {act.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .skills-grid { grid-template-columns: 1fr !important; }
        }
        .h-timeline-scroll::-webkit-scrollbar { display: none; }
        @media (max-width: 768px) {
          .h-timeline-scroll { gap: 0 !important; }
          .h-timeline-scroll > div { min-width: 200px !important; }
        }
      `}</style>
    </section>
  );
}
