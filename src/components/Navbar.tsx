"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const links = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={
        scrolled
          ? {
              background: "rgba(12,18,25,0.85)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(200,168,75,0.2)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            }
          : { background: "transparent" }
      }
    >
      <nav className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div
            className="w-9 h-9 flex items-center justify-center flex-shrink-0"
            style={{ background: "#f2ead8" }}
          >
            <span
              className="font-serif font-bold text-xl leading-none"
              style={{ color: "#0c1219" }}
            >
              K
            </span>
          </div>
          <span
            className="font-serif font-semibold text-sm uppercase"
            style={{ color: "#f2ead8", letterSpacing: "0.25em" }}
          >
            KARTHEN
          </span>
        </Link>

        {/* Center links */}
        <ul className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="relative text-xs tracking-widest uppercase font-sans transition-colors duration-200 group"
                style={{ color: "#a89f8c" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#f2ead8")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#a89f8c")}
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                  style={{ background: "#c8a84b" }}
                />
              </a>
            </li>
          ))}
        </ul>

        {/* Admin CTA */}
        <Link
          href="/admin/kanban"
          className="text-xs tracking-widest uppercase font-sans px-5 py-2.5 transition-all duration-300"
          style={{
            border: "1px solid rgba(200,168,75,0.5)",
            color: "#c8a84b",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "#c8a84b";
            (e.currentTarget as HTMLElement).style.color = "#0c1219";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "transparent";
            (e.currentTarget as HTMLElement).style.color = "#c8a84b";
          }}
        >
          Admin →
        </Link>
      </nav>
    </motion.header>
  );
}
