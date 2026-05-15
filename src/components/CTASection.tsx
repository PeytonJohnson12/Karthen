"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const FLOATING_WORDS = [
  "Masterful", "Precision", "Enterprise", "Crafted", "Premium",
  "Venture", "Creative", "Bespoke", "Excellence", "Enduring",
  "Studio", "Vision", "Legacy", "Refined", "Elevated",
];

function FloatingWord({ word, style }: { word: string; style: React.CSSProperties }) {
  return (
    <div
      className="absolute font-serif italic pointer-events-none select-none whitespace-nowrap"
      style={{
        color: "rgba(200,168,75,0.07)",
        fontSize: "clamp(0.9rem,1.5vw,1.4rem)",
        letterSpacing: "0.15em",
        animation: "float-up 8s ease-in-out infinite",
        ...style,
      }}
    >
      {word}
    </div>
  );
}

function MagneticButton({ children, href, style, onMouseEnter: extEnter, onMouseLeave: extLeave }: {
  children: React.ReactNode;
  href: string;
  style?: React.CSSProperties;
  onMouseEnter?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = btnRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top  + rect.height / 2;
    setOffset({ x: (e.clientX - cx) * 0.25, y: (e.clientY - cy) * 0.25 });
  };

  const onLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setOffset({ x: 0, y: 0 });
    extLeave?.(e);
  };

  return (
    <motion.a
      ref={btnRef}
      href={href}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onMouseEnter={extEnter}
      style={style}
    >
      {children}
    </motion.a>
  );
}

export default function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        background: "#0c1219",
        padding: "10rem 1.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated gold top line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent, #c8a84b, transparent)",
          transformOrigin: "left",
        }}
      />

      {/* Floating brand words */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        {FLOATING_WORDS.map((word, i) => (
          <FloatingWord
            key={word}
            word={word}
            style={{
              left: `${5 + ((i * 41) % 85)}%`,
              bottom: `${-5 + ((i * 29) % 30)}%`,
              animationDelay: `${i * 0.55}s`,
              animationDuration: `${7 + (i % 5)}s`,
            }}
          />
        ))}
      </div>

      {/* Ambient glows — pulsing */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "900px", height: "500px", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(200,168,75,0.07) 0%, transparent 65%)", filter: "blur(40px)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          style={{ position: "absolute", top: "50%", left: "15%", transform: "translateY(-50%)", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)", filter: "blur(50px)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{ position: "absolute", top: "50%", right: "15%", transform: "translateY(-50%)", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 70%)", filter: "blur(50px)" }}
        />
      </div>

      <div className="max-w-3xl mx-auto text-center" style={{ position: "relative", zIndex: 1 }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-sans text-xs font-medium uppercase"
          style={{ color: "#c8a84b", letterSpacing: "0.5em", marginBottom: "2rem" }}
        >
          Get in Touch
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif font-light leading-tight"
          style={{ color: "#f2ead8", fontSize: "clamp(3rem,6vw,5.5rem)", marginBottom: "2rem" }}
        >
          Begin your{" "}
          <em style={{ color: "#c8a84b", fontStyle: "italic" }}>project.</em>
        </motion.h2>

        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: "4rem" } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          style={{ height: "1px", background: "#c8a84b", margin: "0 auto 3rem" }}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-sans"
          style={{ color: "#a89f8c", fontSize: "1.15rem", lineHeight: 1.9, marginBottom: "4rem", maxWidth: "560px", margin: "0 auto 4rem" }}
        >
          Whether you are launching a new brand or scaling an existing one, KARTHEN
          provides the foundation, strategy, and execution to take you there.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{ display: "flex", gap: "1.25rem", justifyContent: "center", flexWrap: "wrap" }}
        >
          <MagneticButton
            href="mailto:hello@karthen.com"
            style={{
              display: "inline-block",
              padding: "1.1rem 3rem",
              background: "#c8a84b",
              color: "#0c1219",
              letterSpacing: "0.15em",
              textDecoration: "none",
              fontFamily: "var(--font-inter), sans-serif",
              fontWeight: 600,
              fontSize: "0.75rem",
              textTransform: "uppercase" as const,
              transition: "background 0.3s, box-shadow 0.3s",
              position: "relative" as const,
              overflow: "hidden" as const,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#d4b76a";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 40px rgba(200,168,75,0.45)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#c8a84b";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            <span
              style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                backgroundSize: "200% auto",
                animation: "gold-shimmer 3s linear infinite",
              }}
            />
            <span style={{ position: "relative" }}>Contact KARTHEN</span>
          </MagneticButton>
          <a
            href="#products"
            className="font-sans font-medium text-xs uppercase"
            style={{
              display: "inline-block",
              padding: "1.1rem 3rem",
              border: "1px solid rgba(255,255,255,0.18)",
              color: "#f2ead8",
              letterSpacing: "0.15em",
              transition: "all 0.3s ease",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.4)";
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.18)";
              (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
          >
            View Our Work
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="font-sans text-xs select-all"
          style={{ color: "rgba(168,159,140,0.45)", letterSpacing: "0.15em", marginTop: "2rem" }}
        >
          hello@karthen.com
        </motion.p>
      </div>
    </section>
  );
}
