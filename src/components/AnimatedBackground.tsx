"use client";

import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: { x: number; y: number; vx: number; vy: number; r: number; o: number }[] = [];

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    // Create particles
    const count = Math.min(60, Math.floor((canvas.width * canvas.height) / 20000));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
        o: Math.random() * 0.15 + 0.05,
      });
    }

    // Ambient orbs
    const orbs = [
      { x: 0.2, y: 0.3, r: 0.25, color: "51, 65, 85" },
      { x: 0.8, y: 0.6, r: 0.3, color: "220, 80, 0" },
      { x: 0.5, y: 0.8, r: 0.2, color: "255, 237, 215" },
    ];

    let time = 0;

    function animate() {
      time += 0.002;
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      // Draw orbs
      for (const orb of orbs) {
        const ox = canvas!.width * orb.x + Math.sin(time + orb.x * 10) * 40;
        const oy = canvas!.height * orb.y + Math.cos(time + orb.y * 10) * 40;
        const gradient = ctx!.createRadialGradient(ox, oy, 0, ox, oy, orb.r * canvas!.width);
        gradient.addColorStop(0, `rgba(${orb.color}, 0.04)`);
        gradient.addColorStop(1, `rgba(${orb.color}, 0)`);
        ctx!.fillStyle = gradient;
        ctx!.fillRect(0, 0, canvas!.width, canvas!.height);
      }

      // Draw particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas!.width;
        if (p.x > canvas!.width) p.x = 0;
        if (p.y < 0) p.y = canvas!.height;
        if (p.y > canvas!.height) p.y = 0;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255, 237, 215, ${p.o})`;
        ctx!.fill();
      }

      animationId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
