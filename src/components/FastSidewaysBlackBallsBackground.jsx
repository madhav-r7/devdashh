import React, { useEffect, useRef } from 'react';

export default function FastSidewaysBlackBallsBackground() {
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
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Generate fast sideways moving white balls with 10px radius
    const count = Math.min(36, Math.max(18, Math.floor(width / 50)));

    const balls = Array.from({ length: count }, () => {
      const radius = 10; // Exactly 10px radius
      const direction = Math.random() > 0.5 ? 1 : -1; // Moving left-to-right or right-to-left
      const speed = 4.5 + Math.random() * 5.5; // Fast moving speed (4.5px - 10px per frame)
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius,
        vx: direction * speed,
        vy: (Math.random() - 0.5) * 0.35, // subtle vertical drift
        alpha: 0.65 + Math.random() * 0.35,
        trailHistory: [],
        sineFreq: 0.02 + Math.random() * 0.02,
        sineAmp: 0.8 + Math.random() * 1.2,
      };
    });

    let tick = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      tick++;

      balls.forEach((b) => {
        // 1. Draw horizontal motion streak / speed tail behind the fast-moving white ball
        if (b.trailHistory.length > 1) {
          for (let i = 0; i < b.trailHistory.length; i++) {
            const pos = b.trailHistory[i];
            const ratio = (i + 1) / b.trailHistory.length;
            const trailAlpha = b.alpha * ratio * 0.3;
            const trailRadius = b.radius * (0.35 + 0.65 * ratio);

            ctx.beginPath();
            ctx.arc(pos.x, pos.y, trailRadius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${trailAlpha})`;
            ctx.fill();

            // Luminous streak core line
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, trailRadius * 0.4, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${trailAlpha * 1.5})`;
            ctx.fill();
          }
        }

        // 2. Draw the 10px radius White Sphere with radiant 3D depth & specular highlight
        const gradient = ctx.createRadialGradient(
          b.x - b.radius * 0.3,
          b.y - b.radius * 0.3,
          b.radius * 0.05,
          b.x,
          b.y,
          b.radius
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${b.alpha})`);
        gradient.addColorStop(0.4, `rgba(240, 240, 250, ${b.alpha * 0.95})`);
        gradient.addColorStop(0.85, `rgba(200, 200, 215, ${b.alpha * 0.85})`);
        gradient.addColorStop(1, `rgba(160, 160, 180, ${b.alpha * 0.7})`);

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // 3. Crisp glowing white outer rim ring
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${b.alpha * 0.85})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // 4. Soft outer luminous white ambient halo / glow
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius * 1.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${b.alpha * 0.12})`;
        ctx.fill();

        // 5. Update position if reduced motion is disabled
        if (!prefersReducedMotion) {
          // Record speed trail
          b.trailHistory.push({ x: b.x, y: b.y });
          if (b.trailHistory.length > 8) {
            b.trailHistory.shift();
          }

          // Fast sideways movement + subtle sine wave oscillation
          b.x += b.vx;
          b.y += Math.sin(tick * b.sineFreq) * b.sineAmp + b.vy;

          // Wraparound horizontally
          if (b.vx > 0 && b.x - b.radius > width + 40) {
            b.x = -b.radius - 20;
            b.y = Math.random() * height;
            b.trailHistory = [];
          } else if (b.vx < 0 && b.x + b.radius < -40) {
            b.x = width + b.radius + 20;
            b.y = Math.random() * height;
            b.trailHistory = [];
          }

          // Keep in vertical bounds
          if (b.y < 0) b.y = height;
          if (b.y > height) b.y = 0;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none -z-0 opacity-80"
      style={{ display: 'block' }}
    />
  );
}
