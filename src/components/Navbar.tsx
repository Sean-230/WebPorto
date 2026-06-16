"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("about");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navItems.map((item) => item.href.slice(1));
      let current = sections[0];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) current = id;
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: "all 0.3s ease",
          padding: scrolled ? "0" : "0",
        }}
      >
        {/* Main bar */}
        <div
          style={{
            margin: scrolled ? "0.75rem 1.5rem" : "1.25rem 2rem",
            borderRadius: "1rem",
            background: scrolled
              ? "rgba(5,11,24,0.92)"
              : "rgba(5,11,24,0.5)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: scrolled
              ? "1px solid rgba(37,99,235,0.25)"
              : "1px solid rgba(37,99,235,0.1)",
            boxShadow: scrolled
              ? "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(37,99,235,0.1)"
              : "none",
            transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0.75rem 1.5rem",
          }}
        >
          {/* Logo */}
          <button
            onClick={() => scrollTo("#about")}
            style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.625rem" }}
          >
            <div
              style={{
                width: "2.25rem",
                height: "2.25rem",
                borderRadius: "0.6rem",
                background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px rgba(37,99,235,0.4)",
              }}
            >
              <span style={{ color: "#fff", fontWeight: 800, fontSize: "0.8rem", letterSpacing: "-0.03em" }}>ST</span>
            </div>
            <span style={{ color: "#e2e8f0", fontWeight: 600, fontSize: "0.9375rem" }}>Sean Tandjaja</span>
          </button>

          {/* Desktop Nav */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }} className="desktop-nav">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <button
                  key={item.label}
                  onClick={() => scrollTo(item.href)}
                  style={{
                    background: isActive ? "rgba(37,99,235,0.15)" : "none",
                    border: isActive ? "1px solid rgba(37,99,235,0.3)" : "1px solid transparent",
                    borderRadius: "0.6rem",
                    color: isActive ? "#93c5fd" : "#94a3b8",
                    fontWeight: isActive ? 600 : 400,
                    fontSize: "0.875rem",
                    padding: "0.4rem 0.875rem",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    letterSpacing: "0.01em",
                  }}
                  className="nav-item-btn"
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* CTA + Mobile Toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <a
              href="mailto:Slawton01@student.ac.id"
              style={{
                padding: "0.5rem 1.25rem",
                borderRadius: "0.6rem",
                background: "linear-gradient(135deg, #2563eb, #3b82f6)",
                color: "#fff",
                fontWeight: 600,
                fontSize: "0.8125rem",
                textDecoration: "none",
                boxShadow: "0 2px 10px rgba(37,99,235,0.4)",
                transition: "all 0.2s ease",
                whiteSpace: "nowrap",
              }}
              className="hire-btn"
            >
              Hire Me
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: "0.375rem", display: "none" }}
              className="hamburger-btn"
              aria-label="Toggle menu"
            >
              <div style={{ width: "1.25rem", display: "flex", flexDirection: "column", gap: "4px" }}>
                <span style={{ display: "block", height: "2px", background: "#94a3b8", borderRadius: "2px", transition: "all 0.25s", transform: menuOpen ? "rotate(45deg) translate(4px,4px)" : "none" }} />
                <span style={{ display: "block", height: "2px", background: "#94a3b8", borderRadius: "2px", transition: "all 0.25s", opacity: menuOpen ? 0 : 1 }} />
                <span style={{ display: "block", height: "2px", background: "#94a3b8", borderRadius: "2px", transition: "all 0.25s", transform: menuOpen ? "rotate(-45deg) translate(4px,-4px)" : "none" }} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            style={{
              margin: "0 1.5rem 0.75rem",
              borderRadius: "1rem",
              background: "rgba(5,11,24,0.97)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(37,99,235,0.2)",
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.375rem",
            }}
            className="mobile-menu"
          >
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollTo(item.href)}
                style={{
                  background: activeSection === item.href.slice(1) ? "rgba(37,99,235,0.12)" : "none",
                  border: "none",
                  borderRadius: "0.5rem",
                  color: activeSection === item.href.slice(1) ? "#93c5fd" : "#94a3b8",
                  fontWeight: activeSection === item.href.slice(1) ? 600 : 400,
                  fontSize: "0.9375rem",
                  padding: "0.75rem 1rem",
                  cursor: "pointer",
                  textAlign: "left",
                  width: "100%",
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      <style>{`
        .nav-item-btn:hover {
          background: rgba(37,99,235,0.1) !important;
          border-color: rgba(37,99,235,0.2) !important;
          color: #cbd5e1 !important;
        }
        .hire-btn:hover {
          background: linear-gradient(135deg, #1d4ed8, #2563eb) !important;
          box-shadow: 0 4px 16px rgba(37,99,235,0.5) !important;
          transform: translateY(-1px);
        }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: block !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu { display: none !important; }
        }
      `}</style>
    </>
  );
}
