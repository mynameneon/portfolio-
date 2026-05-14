"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return undefined;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return undefined;
    }

    let width = 0;
    let height = 0;
    let frame = 0;
    let lastFrame = 0;
    let isVisible = true;
    let particles: Particle[] = [];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const getParticleCount = () => {
      if (reducedMotion) {
        return 22;
      }

      const isTouch = window.matchMedia("(pointer: coarse)").matches;
      if (isTouch || width < 760) {
        return 34;
      }

      return Math.min(78, Math.max(44, Math.round((width * height) / 18500)));
    };

    const getLinkDistance = () => (width < 760 ? 82 : 112);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      particles = Array.from({ length: getParticleCount() }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28
      }));
    };

    const draw = (time = 0) => {
      frame = window.requestAnimationFrame(draw);

      if (!isVisible || document.hidden) {
        return;
      }

      if (time - lastFrame < 33) {
        return;
      }

      lastFrame = time;
      context.clearRect(0, 0, width, height);
      const linkDistance = getLinkDistance();

      particles.forEach((particle) => {
        if (!reducedMotion) {
          particle.x += particle.vx;
          particle.y += particle.vy;
        }

        if (particle.x < 0 || particle.x > width) {
          particle.vx *= -1;
        }
        if (particle.y < 0 || particle.y > height) {
          particle.vy *= -1;
        }

        context.beginPath();
        context.arc(particle.x, particle.y, 1.15, 0, Math.PI * 2);
        context.fillStyle = "rgba(255, 255, 255, 0.2)";
        context.fill();
      });

      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const first = particles[i];
          const second = particles[j];
          const dx = first.x - second.x;
          const dy = first.y - second.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < linkDistance) {
            context.beginPath();
            context.moveTo(first.x, first.y);
            context.lineTo(second.x, second.y);
            context.strokeStyle = `rgba(41, 151, 255, ${0.1 * (1 - distance / linkDistance)})`;
            context.lineWidth = 1;
            context.stroke();
          }
        }
      }
    };

    resize();
    draw();

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { rootMargin: "160px" }
    );
    observer.observe(canvas);

    window.addEventListener("resize", resize);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 h-full w-full opacity-70" aria-hidden="true" />;
}
