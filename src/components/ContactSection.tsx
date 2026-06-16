"use client";

import { useEffect, useRef, useState } from "react";

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState<string | null>(null);

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
    return () => observer.disconnect();
  }, []);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const contactItems = [
    {
      label: "Email",
      abbr: "@",
      value: "Slawton01@student.ac.id",
      action: () => copyToClipboard("Slawton01@student.ac.id", "Email"),
      href: "mailto:Slawton01@student.ac.id",
      color: "from-blue-700 to-blue-500",
      copyable: true,
    },
    {
      label: "Phone",
      abbr: "tel",
      value: "081330330450",
      action: () => copyToClipboard("081330330450", "Phone"),
      href: "tel:081330330450",
      color: "from-sky-600 to-blue-600",
      copyable: true,
    },
    {
      label: "LinkedIn",
      abbr: "in",
      value: "sean-tandjaja",
      action: () => {},
      href: "https://www.linkedin.com/in/sean-tandjaja-b13272299/",
      color: "from-indigo-600 to-blue-600",
      copyable: false,
    },
  ];

  return (
    <section id="contact" className="section-pad relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(10,22,40,0.1), transparent)" }}
      />
      <div className="absolute bottom-0 left-0 right-0"
        style={{ height: "1px", background: "linear-gradient(to right, transparent, rgba(37,99,235,0.3), transparent)" }}
      />

      <div style={{ maxWidth: "56rem", margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Section Header */}
        <div ref={sectionRef} className="fade-in-up section-header">
          <span className="section-eyebrow">Let&apos;s Connect</span>
          <h2 className="section-title">Get In Touch</h2>
          <div className="section-divider" style={{ marginBottom: "1.5rem" }} />
          <p style={{ color: "#94a3b8", maxWidth: "32rem", margin: "0 auto", lineHeight: "1.75", fontSize: "0.9375rem" }}>
            Whether you have a project in mind, a creative collaboration, or just want to
            say hi — my inbox is always open.
          </p>
        </div>

        {/* Contact cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem", marginBottom: "2rem" }} className="contact-grid">
          {contactItems.map((item) => (
            <div key={item.label} className="glass-card glass-card-hover">
              <div className="card-pad-lg" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "1.25rem" }}>
                <div
                  className={`bg-gradient-to-br ${item.color}`}
                  style={{ width: "4rem", height: "4rem", borderRadius: "1rem", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(37,99,235,0.25)" }}
                >
                  <span style={{ color: "#fff", fontWeight: 700, fontSize: "0.875rem", fontStyle: item.abbr === "in" ? "italic" : "normal" }}>
                    {item.abbr}
                  </span>
                </div>
                <div>
                  <p style={{ color: "#475569", fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>
                    {item.label}
                  </p>
                  <p style={{ color: "#cbd5e1", fontSize: "0.875rem", fontWeight: 500, wordBreak: "break-all" }}>
                    {item.value}
                  </p>
                </div>
                {item.copyable ? (
                  <button
                    onClick={item.action}
                    style={{ fontSize: "0.75rem", color: "#60a5fa", display: "flex", alignItems: "center", gap: "0.375rem", padding: "0.375rem 0.875rem", borderRadius: "0.5rem", border: "1px solid rgba(37,99,235,0.25)", background: "transparent", cursor: "pointer", transition: "all 0.2s" }}
                    className="copy-btn"
                  >
                    {copied === item.label ? "Copied!" : "Copy"}
                  </button>
                ) : (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: "0.75rem", color: "#60a5fa", display: "flex", alignItems: "center", gap: "0.375rem", padding: "0.375rem 0.875rem", borderRadius: "0.5rem", border: "1px solid rgba(37,99,235,0.25)", background: "transparent", textDecoration: "none", transition: "all 0.2s" }}
                    className="copy-btn"
                  >
                    View Profile
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Main CTA */}
        <div className="glass-card" style={{ position: "relative", overflow: "hidden", marginBottom: "4rem" }}>
          <div style={{ position: "absolute", top: "-4rem", right: "-4rem", width: "12rem", height: "12rem", borderRadius: "50%", background: "rgba(37,99,235,0.06)", filter: "blur(3rem)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "-4rem", left: "-4rem", width: "12rem", height: "12rem", borderRadius: "50%", background: "rgba(96,165,250,0.05)", filter: "blur(3rem)", pointerEvents: "none" }} />

          <div style={{ padding: "4rem 3rem", textAlign: "center", position: "relative" }}>
            <h3 style={{ color: "#e2e8f0", fontWeight: 700, fontSize: "clamp(1.5rem, 4vw, 2.25rem)", marginBottom: "1rem", lineHeight: 1.2 }}>
              Ready to build something great?
            </h3>
            <p style={{ color: "#94a3b8", maxWidth: "30rem", margin: "0 auto 2.5rem", lineHeight: "1.75", fontSize: "0.9375rem" }}>
              I&apos;m currently open to freelance projects, internship opportunities, and creative collaborations.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem" }}>
              <a
                href="mailto:Slawton01@student.ac.id"
                style={{ padding: "1rem 2.5rem", borderRadius: "0.75rem", background: "linear-gradient(135deg, #2563eb, #3b82f6)", color: "#fff", fontWeight: 600, fontSize: "1rem", textDecoration: "none", boxShadow: "0 4px 20px rgba(37,99,235,0.35)", transition: "all 0.25s", display: "inline-block" }}
                className="cta-primary"
              >
                Send Email
              </a>
              <a
                href="https://www.linkedin.com/in/sean-tandjaja-b13272299/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ padding: "1rem 2.5rem", borderRadius: "0.75rem", border: "1px solid rgba(37,99,235,0.35)", color: "#60a5fa", fontWeight: 600, fontSize: "1rem", textDecoration: "none", transition: "all 0.25s", display: "inline-block" }}
                className="cta-secondary"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ paddingTop: "2rem", borderTop: "1px solid rgba(37,99,235,0.15)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
          <p style={{ color: "#334155", fontSize: "0.8125rem" }}>© 2025 Sean Lawton Tandjaja. All rights reserved.</p>
          <p className="gradient-text" style={{ fontWeight: 500, fontSize: "0.875rem" }}>
            Full-Stack Developer & Visual Creator
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
        .copy-btn:hover { background: rgba(37,99,235,0.15) !important; border-color: rgba(96,165,250,0.4) !important; color: #93c5fd !important; }
        .cta-primary:hover { background: linear-gradient(135deg, #1d4ed8, #2563eb) !important; transform: translateY(-2px); box-shadow: 0 8px 25px rgba(37,99,235,0.45) !important; }
        .cta-secondary:hover { background: rgba(10,22,40,0.4) !important; border-color: rgba(96,165,250,0.5) !important; }
      `}</style>
    </section>
  );
}
