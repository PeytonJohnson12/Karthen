"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import ParticleField from "@/components/ui/ParticleField";

const letters = "KARTHEN".split("");

const orbs = [
  { color: "#c8a84b", size: 700, top: "15%", left: "5%",  delay: 0 },
  { color: "#6366f1", size: 550, top: "55%", left: "65%", delay: 1 },
  { color: "#a855f7", size: 450, top: "25%", left: "75%", delay: 2 },
];

const CYCLING_WORDS = ["Enterprise Software", "Creative Studio", "Venture Capital", "Influencer Platform"];

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });

  // Parallax transforms for each orb
  const orb0y = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);
  const orb1y = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const orb2y = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const orbTransforms = [orb0y, orb1y, orb2y];

  // Content parallax
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Cycling word rotator
  const [wordIndex, setWordIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setWordIndex((i) => (i + 1) % CYCLING_WORDS.length), 2800);
    return () => clearInterval(id);
  }, []);

  // Shimmer sweep after letters reveal (~1.4s)
  const [showShimmer, setShowShimmer] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setShowShimmer(true), 1400);
    return () => clearTimeout(id);
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-k-dark"
    >
      {/* Gold particle field */}
      <ParticleField count={70} />

      {/* Parallax ambient orbs */}
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: orb.size, height: orb.size,
            top: orb.top, left: orb.left,
            y: orbTransforms[i],
            background: `radial-gradient(circle, ${orb.color}1a 0%, transparent 70%)`,
            filter: "blur(70px)",
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5], x: [0, 40, 0] }}
          transition={{ duration: 9 + i * 2, repeat: Infinity, delay: orb.delay, ease: "easeInOut" }}
        />
      ))}

      {/* Rotating border ring — decorative */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 600, height: 600,
          top: "50%", left: "50%",
          marginTop: -300, marginLeft: -300,
          border: "1px solid rgba(200,168,75,0.06)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 900, height: 900,
          top: "50%", left: "50%",
          marginTop: -450, marginLeft: -450,
          border: "1px solid rgba(200,168,75,0.04)",
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(200,168,75,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(200,168,75,0.04) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          zIndex: 1,
        }}
      />

      {/* Main content */}
      <motion.div
        style={{ zIndex: 2, y: contentY, opacity: contentOpacity }}
        className="relative flex flex-col items-center text-center px-6"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-4 mb-12"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 32 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-px bg-k-gold"
          />
          <span className="text-k-gold tracking-[0.5em] text-xs uppercase font-sans font-medium">
            Master Business
          </span>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 32 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-px bg-k-gold"
          />
        </motion.div>

        {/* Wordmark with staggered letters + shimmer sweep */}
        <div className="relative flex items-end gap-1 md:gap-3 mb-6" aria-label="KARTHEN">
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 70, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.06, ease: "easeOut" }}
              className="font-serif text-[clamp(4.5rem,13vw,10rem)] font-light text-k-cream leading-none tracking-[0.1em]"
            >
              {letter}
            </motion.span>
          ))}

          {/* Shimmer sweep overlay */}
          {showShimmer && (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ delay: 0.9, duration: 0.3 }}
              className="absolute inset-0 pointer-events-none overflow-hidden"
            >
              <div
                className="absolute inset-y-0 w-[60%]"
                style={{
                  background: "linear-gradient(90deg, transparent 0%, rgba(200,168,75,0.25) 50%, transparent 100%)",
                  animation: "shimmer-sweep 0.9s ease forwards",
                }}
              />
            </motion.div>
          )}
        </div>

        {/* Animated gold accent line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.65, ease: "easeInOut" }}
          className="h-px mx-auto mb-8 origin-center"
          style={{
            maxWidth: "520px",
            width: "100%",
            background: "linear-gradient(90deg, transparent, #c8a84b, transparent)",
            boxShadow: "0 0 12px rgba(200,168,75,0.4)",
          }}
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75 }}
          className="font-serif italic text-k-cream-muted text-2xl md:text-3xl mb-6 max-w-xl leading-relaxed"
        >
          Premium solutions, masterfully crafted.
        </motion.p>

        {/* Cycling word rotator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="flex items-center gap-3 mb-14 h-5"
        >
          <div className="w-4 h-px" style={{ background: "rgba(200,168,75,0.4)" }} />
          <div className="relative overflow-hidden h-4" style={{ minWidth: 220 }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 font-sans text-xs uppercase text-center"
                style={{ color: "rgba(200,168,75,0.55)", letterSpacing: "0.35em" }}
              >
                {CYCLING_WORDS[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
          <div className="w-4 h-px" style={{ background: "rgba(200,168,75,0.4)" }} />
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-5"
        >
          <motion.a
            href="#products"
            whileHover={{ scale: 1.04, boxShadow: "0 8px 40px rgba(200,168,75,0.35)" }}
            whileTap={{ scale: 0.97 }}
            className="relative px-10 py-4 bg-k-gold text-k-dark font-sans font-semibold text-sm tracking-widest uppercase overflow-hidden"
            style={{ transition: "background 0.3s" }}
          >
            {/* Shimmer on button */}
            <span
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
                backgroundSize: "200% auto",
                animation: "gold-shimmer 3s linear infinite",
              }}
            />
            <span className="relative">Our Brands</span>
          </motion.a>
          <motion.a
            href="#about"
            whileHover={{ scale: 1.04, borderColor: "rgba(242,234,216,0.7)", background: "rgba(255,255,255,0.05)" }}
            whileTap={{ scale: 0.97 }}
            className="px-10 py-4 border border-k-cream/30 text-k-cream font-sans font-medium text-sm tracking-widest uppercase transition-all duration-300"
          >
            Learn More
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator with pulse ring */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 2 }}
      >
        <span className="font-sans text-[9px] tracking-[0.4em] uppercase" style={{ color: "rgba(200,168,75,0.4)" }}>
          Scroll
        </span>
        <div className="relative flex items-center justify-center">
          <div
            className="absolute rounded-full"
            style={{
              width: 24, height: 24,
              border: "1px solid rgba(200,168,75,0.3)",
              animation: "pulse-ring 2s ease-out infinite",
            }}
          />
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="w-px h-10 bg-gradient-to-b from-k-gold to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
}
