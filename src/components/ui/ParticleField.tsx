"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number; alpha: number;
  life: number; maxLife: number;
}

export default function ParticleField({ count = 60 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    const particles: Particle[] = [];

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const spawn = (): Particle => ({
      x:       Math.random() * canvas.width,
      y:       canvas.height + 10,
      vx:      (Math.random() - 0.5) * 0.4,
      vy:      -(Math.random() * 0.6 + 0.2),
      size:    Math.random() * 1.8 + 0.4,
      alpha:   0,
      life:    0,
      maxLife: Math.random() * 300 + 200,
    });

    for (let i = 0; i < count; i++) {
      const p = spawn();
      p.y      = Math.random() * canvas.height;
      p.life   = Math.random() * p.maxLife;
      particles.push(p);
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.life += 1;
        p.x    += p.vx;
        p.y    += p.vy;

        const progress = p.life / p.maxLife;
        p.alpha = progress < 0.15
          ? progress / 0.15
          : progress > 0.8
          ? (1 - progress) / 0.2
          : 1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 168, 75, ${p.alpha * 0.55})`;
        ctx.fill();

        if (p.life >= p.maxLife) Object.assign(p, spawn());
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    />
  );
}
