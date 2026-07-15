import React, { useEffect, useRef } from "react";

interface BinaryRainBackgroundProps {
  speedMultiplier?: number;
  particleDensity?: number;
}

export default function BinaryRainBackground({
  speedMultiplier = 1,
  particleDensity = 40,
}: BinaryRainBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Setup columns for binary rain
    const fontSize = 14;
    const columns = Math.floor(width / fontSize) + 1;
    const drops = Array(columns).fill(1);

    // Setup digital particles
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
      pulseSpeed: number;
    }

    const particles: Particle[] = [];
    for (let i = 0; i < particleDensity; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4 * speedMultiplier,
        vy: (Math.random() - 0.5) * 0.4 * speedMultiplier,
        size: Math.random() * 2 + 1,
        color: Math.random() > 0.5 ? "#00E5FF" : "#7C3AED",
        alpha: Math.random() * 0.5 + 0.1,
        pulseSpeed: Math.random() * 0.02 + 0.005,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const draw = () => {
      // Semi-transparent background for trails
      ctx.fillStyle = "rgba(11, 11, 11, 0.12)";
      ctx.fillRect(0, 0, width, height);

      // 1. Draw digital binary rain trails (faded to be subtle background)
      ctx.font = `${fontSize}px var(--font-mono)`;
      for (let i = 0; i < drops.length; i++) {
        // Cyan and purple alternate columns or random
        const char = Math.random() > 0.5 ? "1" : "0";
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Color based on height and random variation
        if (Math.random() > 0.98) {
          ctx.fillStyle = "rgba(255, 255, 255, 0.6)"; // glowing lead
        } else if (i % 3 === 0) {
          ctx.fillStyle = `rgba(0, 229, 255, ${Math.random() * 0.15 + 0.05})`; // Cyan
        } else if (i % 3 === 1) {
          ctx.fillStyle = `rgba(0, 191, 255, ${Math.random() * 0.15 + 0.05})`; // Blue
        } else {
          ctx.fillStyle = `rgba(124, 58, 237, ${Math.random() * 0.15 + 0.05})`; // Purple
        }

        ctx.fillText(char, x, y);

        // Reset drops when they reach the bottom or randomly
        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      // 2. Draw digital grid lines subtly
      ctx.strokeStyle = "rgba(0, 191, 255, 0.015)";
      ctx.lineWidth = 1;
      const gridSize = 80;
      
      ctx.beginPath();
      for (let x = 0; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // 3. Update and draw floating particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Pulse alpha
        p.alpha += p.pulseSpeed;
        if (p.alpha > 0.7 || p.alpha < 0.1) {
          p.pulseSpeed = -p.pulseSpeed;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0.01, Math.min(1, p.alpha));
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0; // reset shadow
        ctx.globalAlpha = 1.0; // reset alpha
      }

      // 4. Draw connecting lines for nearby particles
      ctx.strokeStyle = "rgba(0, 191, 255, 0.03)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [speedMultiplier, particleDensity]);

  return (
    <canvas
      ref={canvasRef}
      id="binary-rain-canvas"
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
    />
  );
}
