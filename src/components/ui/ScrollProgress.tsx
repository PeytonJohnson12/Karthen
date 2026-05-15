"use client";

import { useScroll, useSpring, motion } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: "left" }}
      className="fixed top-0 left-0 right-0 z-[9997] h-[2px] pointer-events-none"
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      <div
        className="w-full h-full"
        style={{
          background: "linear-gradient(90deg, #c8a84b, #d4b76a, #c8a84b)",
          boxShadow: "0 0 8px rgba(200,168,75,0.8)",
        }}
      />
    </motion.div>
  );
}
