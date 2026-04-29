"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const products = [
  {
    name: "KARTHEN Prime",
    category: "Enterprise Solutions",
    description:
      "Flagship enterprise-grade platform built for organizations that demand performance, reliability, and elegance at every touchpoint.",
    tag: "Flagship",
    accent: "#c8a84b",
    glow: "rgba(200,168,75,0.10)",
    border: "rgba(200,168,75,0.22)",
    number: "01",
  },
  {
    name: "KARTHEN Studio",
    category: "Creative Services",
    description:
      "A dedicated creative studio offering bespoke brand identity, design systems, and visual strategy for discerning clients.",
    tag: "Creative",
    accent: "#6366f1",
    glow: "rgba(99,102,241,0.10)",
    border: "rgba(99,102,241,0.22)",
    number: "02",
  },
  {
    name: "KARTHEN Ventures",
    category: "Investment & Growth",
    description:
      "Strategic investment and growth consulting for emerging businesses ready to scale with purpose, precision, and confidence.",
    tag: "Investment",
    accent: "#a855f7",
    glow: "rgba(168,85,247,0.10)",
    border: "rgba(168,85,247,0.22)",
    number: "03",
  },
];

function ProductCard({
  product,
  index,
}: {
  product: (typeof products)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.18, ease: "easeOut" }}
      whileHover={{ y: -8 }}
      className="group relative flex flex-col cursor-pointer overflow-hidden"
      style={{
        background: "linear-gradient(145deg, #111827 0%, #0c1219 100%)",
        border: `1px solid ${product.border}`,
        padding: "3rem",
        transition: "box-shadow 0.4s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px ${product.glow}`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* Hover color wash */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at top left, ${product.glow} 0%, transparent 65%)`,
        }}
      />

      {/* Large background number */}
      <span
        className="font-serif text-8xl font-light leading-none mb-8 select-none block"
        style={{ color: product.accent + "18" }}
      >
        {product.number}
      </span>

      {/* Category label */}
      <span
        className="text-xs tracking-[0.45em] uppercase font-sans font-medium block mb-4"
        style={{ color: product.accent }}
      >
        {product.category}
      </span>

      {/* Name */}
      <h3
        className="font-serif text-3xl font-light tracking-wide leading-snug mb-6"
        style={{ color: "#f2ead8" }}
      >
        {product.name}
      </h3>

      {/* Accent divider */}
      <div
        className="mb-7 h-px w-10 group-hover:w-16 transition-all duration-500"
        style={{ background: product.accent }}
      />

      {/* Description */}
      <p
        className="text-base leading-loose font-sans mb-10 flex-1"
        style={{ color: "#a89f8c", lineHeight: "1.85" }}
      >
        {product.description}
      </p>

      {/* CTA */}
      <div
        className="flex items-center gap-2 text-sm tracking-wider font-sans font-medium group-hover:gap-3 transition-all duration-300"
        style={{ color: product.accent }}
      >
        Explore
        <ArrowUpRight
          size={16}
          className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
        />
      </div>

      {/* Tag badge */}
      <span
        className="absolute top-6 right-6 text-xs tracking-wider border px-2.5 py-1 font-sans"
        style={{ color: product.accent + "99", borderColor: product.accent + "33" }}
      >
        {product.tag}
      </span>
    </motion.div>
  );
}

export default function ProductsSection() {
  const headingRef = useRef(null);
  const inView = useInView(headingRef, { once: true, margin: "-60px" });

  return (
    <section
      id="products"
      style={{ background: "#0c1219", padding: "8rem 1.5rem" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: "5rem" }}
        >
          <p
            className="text-xs tracking-[0.5em] uppercase font-sans font-medium"
            style={{ color: "#c8a84b", marginBottom: "1.25rem" }}
          >
            Our Portfolio
          </p>
          <h2
            className="font-serif font-light leading-none"
            style={{ color: "#f2ead8", fontSize: "clamp(3rem,6vw,5rem)", marginBottom: "1.25rem" }}
          >
            Our Brands
          </h2>
          <div style={{ width: "4rem", height: "1px", background: "#c8a84b" }} />
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((p, i) => (
            <ProductCard key={p.name} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
