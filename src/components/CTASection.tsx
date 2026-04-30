"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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

      {/* Ambient glows */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "900px", height: "500px", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(200,168,75,0.06) 0%, transparent 65%)", filter: "blur(40px)" }} />
        <div style={{ position: "absolute", top: "50%", left: "15%", transform: "translateY(-50%)", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)", filter: "blur(50px)" }} />
        <div style={{ position: "absolute", top: "50%", right: "15%", transform: "translateY(-50%)", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%)", filter: "blur(50px)" }} />
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
          <a
            href="mailto:hello@karthen.com"
            className="font-sans font-semibold text-xs uppercase"
            style={{
              display: "inline-block",
              padding: "1.1rem 3rem",
              background: "#c8a84b",
              color: "#0c1219",
              letterSpacing: "0.15em",
              transition: "all 0.3s ease",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#d4b76a";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 30px rgba(200,168,75,0.35)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#c8a84b";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            Contact KARTHEN
          </a>
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
