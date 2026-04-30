"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "10+", label: "Years of Excellence", color: "#c8a84b" },
  { value: "3",   label: "Active Brands",       color: "#6366f1" },
  { value: "50+", label: "Projects Delivered",   color: "#a855f7" },
];

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      ref={ref}
      style={{
        background: "linear-gradient(180deg, #0c1219 0%, #0f1825 50%, #0c1219 100%)",
        padding: "9rem 1.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "20%",
          transform: "translateY(-50%)",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: "6rem" }}
        >
          <p
            className="text-xs tracking-[0.5em] uppercase font-sans font-medium"
            style={{ color: "#c8a84b", marginBottom: "1.25rem" }}
          >
            About KARTHEN
          </p>
          <h2
            className="font-serif font-light leading-tight"
            style={{ color: "#f2ead8", fontSize: "clamp(3rem,6vw,5rem)", marginBottom: "1.25rem" }}
          >
            Built to Last.{" "}
            <span style={{ color: "#c8a84b" }}>Designed</span> to Lead.
          </h2>
          <div style={{ width: "4rem", height: "1px", background: "#c8a84b" }} />
        </motion.div>

        {/* Two-column content */}
        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ gap: "6rem", marginBottom: "7rem", alignItems: "start" }}
        >
          {/* Left: blockquote */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{ position: "relative" }}
          >
            <span
              className="font-serif select-none pointer-events-none"
              style={{
                fontSize: "10rem",
                lineHeight: 1,
                color: "rgba(200,168,75,0.12)",
                position: "absolute",
                top: "-3rem",
                left: "-1.5rem",
              }}
            >
              "
            </span>
            <blockquote
              className="font-serif italic font-light"
              style={{
                color: "#f2ead8",
                fontSize: "clamp(1.4rem,2.5vw,2rem)",
                lineHeight: 1.7,
                paddingLeft: "1.5rem",
                paddingTop: "1rem",
                position: "relative",
                zIndex: 1,
              }}
            >
              Every great business begins with a master idea, and endures through
              masterful execution.
            </blockquote>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginTop: "2.5rem",
                paddingLeft: "1.5rem",
              }}
            >
              <div style={{ width: "2.5rem", height: "1px", background: "#c8a84b" }} />
              <span
                className="font-sans text-xs font-medium uppercase"
                style={{ color: "#c8a84b", letterSpacing: "0.3em" }}
              >
                KARTHEN Founding Philosophy
              </span>
            </div>
          </motion.div>

          {/* Right: body copy */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25 }}
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
          >
            {[
              "KARTHEN is more than a business — it is a platform for excellence. We operate as a master entity from which carefully considered product brands are born, each with its own identity, vision, and purpose.",
              "Each venture under the KARTHEN umbrella is built with the same commitment to craft, quality, and intentional design that defines our parent philosophy. We do not follow trends. We set the standard.",
              "From concept to execution, every decision is deliberate. Every product earns its place beneath the KARTHEN name.",
            ].map((para, i) => (
              <p
                key={i}
                className="font-sans"
                style={{ color: "#a89f8c", fontSize: "1.1rem", lineHeight: 1.9 }}
              >
                {para}
              </p>
            ))}
          </motion.div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: "1px", background: "rgba(255,255,255,0.06)" }}>
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.12 }}
              style={{
                background: "#0c1219",
                padding: "3rem 3.5rem",
              }}
            >
              <p
                className="font-serif font-light"
                style={{ color: stat.color, fontSize: "4.5rem", lineHeight: 1, marginBottom: "1rem" }}
              >
                {stat.value}
              </p>
              <p
                className="font-sans text-xs uppercase"
                style={{ color: "#a89f8c", letterSpacing: "0.2em" }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
