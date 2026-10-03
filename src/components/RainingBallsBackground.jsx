import React, { useEffect, useRef } from 'react';

export default function RainingBallsBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Generate raining white balls of ~15px radius (13px - 17px)
    const count = Math.min(36, Math.max(18, Math.floor(width / 50)));

    const balls = Array.from({ length: count }, () => {
      const radius = 13 + Math.random() * 4; // ~15px radius
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius,
        vy: 1.2 + Math.random() * 1.8, // downward falling speed
        vx: (Math.random() - 0.5) * 0.35, // slight lateral drift
        alpha: 0.15 + Math.random() * 0.22, // subtle soft opacity
        trailHistory: [],
        swayOffset: Math.random() * Math.PI * 2,
        swaySpeed: 0.01 + Math.random() * 0.015,
      };
    });

    let tick = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      tick++;

      balls.forEach((b) => {
        // Draw soft vertical rain-trail behind each ball
        if (b.trailHistory.length > 1) {
          for (let i = 0; i < b.trailHistory.length; i++) {
            const pos = b.trailHistory[i];
            const ratio = (i + 1) / b.trailHistory.length;
            const trailAlpha = b.alpha * ratio * 0.35;
            const trailRadius = b.radius * (0.3 + 0.7 * ratio);

            ctx.beginPath();
            ctx.arc(pos.x, pos.y, trailRadius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${trailAlpha})`;
            ctx.fill();
          }
        }

        // Draw the 15px radius white sphere with futuristic radial depth
        const gradient = ctx.createRadialGradient(
          b.x - b.radius * 0.25,
          b.y - b.radius * 0.25,
          b.radius * 0.1,
          b.x,
          b.y,
          b.radius
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${b.alpha * 1.5})`);
        gradient.addColorStop(0.5, `rgba(255, 255, 255, ${b.alpha})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, ${b.alpha * 0.15})`);

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Subtle specular outline ring
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${b.alpha * 0.4})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Soft outer ambient halo
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius * 1.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${b.alpha * 0.05})`;
        ctx.fill();

        if (!prefersReducedMotion) {
          // Record trail positions
          if (tick % 2 === 0) {
            b.trailHistory.push({ x: b.x, y: b.y });
            if (b.trailHistory.length > 6) {
              b.trailHistory.shift();
            }
          }

          // Move ball downwards (raining effect) with subtle lateral organic drift
          const sway = Math.sin(tick * b.swaySpeed + b.swayOffset) * 0.25;
          b.y += b.vy;
          b.x += b.vx + sway;

          // When a ball falls off bottom, smoothly reset to top
          if (b.y > height + b.radius * 2) {
            b.y = -b.radius * 2;
            b.x = Math.random() * width;
            b.trailHistory = [];
          }

          if (b.x > width + b.radius) {
            b.x = -b.radius;
            b.trailHistory = [];
          } else if (b.x < -b.radius) {
            b.x = width + b.radius;
            b.trailHistory = [];
          }
        }
      });

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-90 block"
      />
    </div>
  );
}
