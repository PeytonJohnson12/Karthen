"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#0c1219",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "5rem 1.5rem",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Top row */}
        <div
          className="flex flex-col md:flex-row items-start md:items-center justify-between"
          style={{ gap: "3rem", marginBottom: "4rem" }}
        >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div
              style={{
                width: "2.75rem",
                height: "2.75rem",
                background: "#f2ead8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span
                className="font-serif font-bold text-xl leading-none"
                style={{ color: "#0c1219" }}
              >
                K
              </span>
            </div>
            <div>
              <span
                className="font-serif font-semibold text-sm uppercase block"
                style={{ color: "#f2ead8", letterSpacing: "0.25em" }}
              >
                KARTHEN
              </span>
              <span
                className="font-sans text-xs"
                style={{ color: "#4a5568", letterSpacing: "0.15em" }}
              >
                Master Business
              </span>
            </div>
          </div>

          {/* Nav links */}
          <nav style={{ display: "flex", flexWrap: "wrap", gap: "2.5rem" }}>
            {["Home", "Products", "About", "Contact"].map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                className="font-sans text-xs uppercase"
                style={{
                  color: "#a89f8c",
                  letterSpacing: "0.2em",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#c8a84b")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#a89f8c")}
              >
                {label}
              </a>
            ))}
            <Link
              href="/admin/kanban"
              className="font-sans text-xs uppercase"
              style={{
                color: "rgba(200,168,75,0.5)",
                letterSpacing: "0.2em",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "#c8a84b")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "rgba(200,168,75,0.5)")
              }
            >
              Admin
            </Link>
          </nav>
        </div>

        {/* Gold divider */}
        <div
          style={{
            width: "100%",
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(200,168,75,0.3), transparent)",
            marginBottom: "3rem",
          }}
        />

        {/* Bottom row */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between"
          style={{ gap: "1rem" }}
        >
          <p
            className="font-sans text-xs"
            style={{ color: "#4a5568", letterSpacing: "0.15em" }}
          >
            © {new Date().getFullYear()} KARTHEN. All rights reserved.
          </p>
          <p
            className="font-sans text-xs italic"
            style={{ color: "rgba(74,85,104,0.6)", letterSpacing: "0.1em" }}
          >
            Premium solutions, masterfully crafted.
          </p>
        </div>
      </div>
    </footer>
  );
}
