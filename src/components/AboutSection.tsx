"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { end: 10, suffix: "+", label: "Years of Excellence", color: "#c8a84b" },
  { end: 3,  suffix: "",  label: "Active Brands",       color: "#6366f1" },
  { end: 50, suffix: "+", label: "Projects Delivered",  color: "#a855f7" },
];

const QUOTE_WORDS = "Every great business begins with a master idea, and endures through masterful execution.".split(" ");

function AnimatedStat({ end, suffix, label, color, trigger }: { end: number; suffix: string; label: string; color: string; trigger: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const step = end / 60;
    const id = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(id); }
      else setCount(Math.floor(start));
    }, 18);
    return () => clearInterval(id);
  }, [trigger, end]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={trigger ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      style={{ background: "#0c1219", padding: "3rem 3.5rem", position: "relative", overflow: "hidden" }}
    >
      {/* Animated top border */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={trigger ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: color, transformOrigin: "left", opacity: 0.5 }}
      />
      <p className="font-serif font-light" style={{ color, fontSize: "4.5rem", lineHeight: 1, marginBottom: "1rem" }}>
        {count}{suffix}
      </p>
      <p className="font-sans text-xs uppercase" style={{ color: "#a89f8c", letterSpacing: "0.2em" }}>
        {label}
      </p>
    </motion.div>
  );
}

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
          {/* Left: blockquote with word-by-word reveal */}
          <div style={{ position: "relative" }}>
            <span
              className="font-serif select-none pointer-events-none"
              style={{
                fontSize: "10rem", lineHeight: 1,
                color: "rgba(200,168,75,0.12)",
                position: "absolute", top: "-3rem", left: "-1.5rem",
              }}
            >
              &ldquo;
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
              {QUOTE_WORDS.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                  animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.045 }}
                  style={{ display: "inline-block", marginRight: "0.3em" }}
                >
                  {word}
                </motion.span>
              ))}
            </blockquote>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.9 }}
              style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "2.5rem", paddingLeft: "1.5rem" }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={inView ? { width: "2.5rem" } : {}}
                transition={{ duration: 0.6, delay: 1.0 }}
                style={{ height: "1px", background: "#c8a84b" }}
              />
              <span className="font-sans text-xs font-medium uppercase" style={{ color: "#c8a84b", letterSpacing: "0.3em" }}>
                KARTHEN Founding Philosophy
              </span>
            </motion.div>
          </div>

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
            <AnimatedStat key={stat.label} {...stat} trigger={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
