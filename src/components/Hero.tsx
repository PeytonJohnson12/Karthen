"use client";

import { motion } from "framer-motion";

const letters = "KARTHEN".split("");

const orbs = [
  { color: "#c8a84b", size: 600, top: "20%", left: "10%", delay: 0 },
  { color: "#6366f1", size: 500, top: "60%", left: "70%", delay: 1 },
  { color: "#a855f7", size: 400, top: "30%", left: "80%", delay: 2 },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-k-dark"
    >
      {/* Animated ambient orbs */}
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: orb.size,
            height: orb.size,
            top: orb.top,
            left: orb.left,
            background: `radial-gradient(circle, ${orb.color}18 0%, transparent 70%)`,
            filter: "blur(60px)",
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.6, 1, 0.6],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            delay: orb.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(200,168,75,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(200,168,75,0.3) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-k-gold tracking-[0.5em] text-xs uppercase mb-12 font-sans font-medium"
        >
          Master Business
        </motion.p>

        {/* Wordmark with staggered letters */}
        <div className="flex items-end gap-1 md:gap-3 mb-6" aria-label="KARTHEN">
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 60, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.08, ease: "easeOut" }}
              className="font-serif text-[clamp(4.5rem,13vw,10rem)] font-light text-k-cream leading-none tracking-[0.1em]"
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Gold accent line */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "100%", opacity: 1 }}
          transition={{ duration: 1.0, delay: 1.2, ease: "easeInOut" }}
          className="h-px bg-gradient-to-r from-transparent via-k-gold to-transparent mx-auto mb-10"
          style={{ maxWidth: "520px" }}
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.4 }}
          className="font-serif italic text-k-cream-muted text-2xl md:text-3xl mb-14 max-w-xl leading-relaxed"
        >
          Premium solutions, masterfully crafted.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="flex flex-col sm:flex-row gap-5"
        >
          <a
            href="#products"
            className="px-10 py-4 bg-k-gold text-k-dark font-sans font-semibold text-sm tracking-widest uppercase hover:bg-k-gold-light transition-all duration-300 hover:shadow-lg hover:shadow-k-gold/30"
          >
            Our Brands
          </a>
          <a
            href="#about"
            className="px-10 py-4 border border-k-cream/30 text-k-cream font-sans font-medium text-sm tracking-widest uppercase hover:border-k-cream/70 hover:bg-white/5 transition-all duration-300"
          >
            Learn More
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
<motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-k-gold to-transparent"
        />
      </motion.div>
    </section>
  );
}
