import React, { useEffect, useRef } from 'react';

export default function BackgroundSystem() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle System (Sections 2, 3, 4, 5 of Prompt)
    // Hundreds of subtle particles with varying sizes, opacities, flow velocities, and soft trails
    const numParticles = Math.min(220, Math.max(90, Math.floor((width * height) / 8500)));
    
    // Create particles with natural clustering / uneven density
    const particles = Array.from({ length: numParticles }, (_, i) => {
      // 1px, 2px, 3px size distribution
      const sizeRoll = Math.random();
      const radius = sizeRoll < 0.65 ? 0.8 : sizeRoll < 0.9 ? 1.4 : 2.2;
      
      // Opacity tiers: 10%, 20%, 35%, with occasional brighter (60%-80%)
      const alphaRoll = Math.random();
      const baseAlpha = alphaRoll < 0.45 ? 0.10 : alphaRoll < 0.75 ? 0.20 : alphaRoll < 0.92 ? 0.35 : 0.70;
      
      // Has subtle trail (only for some brighter/medium particles)
      const hasTrail = baseAlpha >= 0.35 && Math.random() < 0.4;

      // Directional flow: mostly drifting left-to-right or slight diagonal
      const vx = Math.random() * 0.22 + 0.06;
      const vy = (Math.random() - 0.5) * 0.12;

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx,
        vy,
        radius,
        baseAlpha,
        currentAlpha: baseAlpha,
        fadeSpeed: (Math.random() * 0.005 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
        hasTrail,
        orbitOffset: Math.random() * Math.PI * 2,
        orbitSpeed: (Math.random() * 0.008 + 0.002),
        trailHistory: []
      };
    });

    let tick = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      tick += 1;

      particles.forEach((p) => {
        // Subtle opacity pulsation / fade in & out
        p.currentAlpha += p.fadeSpeed;
        if (p.currentAlpha > p.baseAlpha * 1.35 || p.currentAlpha > 0.85) {
          p.currentAlpha = p.baseAlpha * 1.35;
          p.fadeSpeed = -Math.abs(p.fadeSpeed);
        } else if (p.currentAlpha < p.baseAlpha * 0.45 || p.currentAlpha < 0.04) {
          p.currentAlpha = p.baseAlpha * 0.45;
          p.fadeSpeed = Math.abs(p.fadeSpeed);
        }

        // Draw soft particle trails for select particles (Section 5)
        if (p.hasTrail && p.trailHistory.length > 1) {
          for (let t = 0; t < p.trailHistory.length; t++) {
            const hist = p.trailHistory[t];
            const trailRatio = (t + 1) / p.trailHistory.length;
            const trailAlpha = p.currentAlpha * trailRatio * 0.25;
            const trailRadius = p.radius * (0.4 + 0.6 * trailRatio);

            ctx.fillStyle = `rgba(255, 255, 255, ${trailAlpha})`;
            ctx.beginPath();
            ctx.arc(hist.x, hist.y, trailRadius, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // Draw main particle
        ctx.fillStyle = `rgba(255, 255, 255, ${p.currentAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Occasional soft glow ring for brighter particles
        if (p.baseAlpha >= 0.65) {
          ctx.fillStyle = `rgba(255, 255, 255, ${p.currentAlpha * 0.12})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 3.5, 0, Math.PI * 2);
          ctx.fill();
        }

        if (!prefersReducedMotion) {
          // Record history for trails
          if (p.hasTrail && tick % 3 === 0) {
            p.trailHistory.push({ x: p.x, y: p.y });
            if (p.trailHistory.length > 5) {
              p.trailHistory.shift();
            }
          }

          // Gentle directional flow with slight organic orbit/drift
          const orbitDrift = Math.sin(tick * p.orbitSpeed + p.orbitOffset) * 0.08;
          p.x += p.vx;
          p.y += p.vy + orbitDrift;

          // Wrap edges smoothly
          if (p.x > width + 10) {
            p.x = -10;
            p.y = Math.random() * height;
            p.trailHistory = [];
          }
          if (p.y > height + 10) {
            p.y = -10;
            p.trailHistory = [];
          }
          if (p.y < -10) {
            p.y = height + 10;
            p.trailHistory = [];
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
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#050505]">
      
      {/* LAYER 5: Ultra-Faint Technical Moving Grid (Section 6) */}
      <div className="absolute inset-0 bg-technical-grid opacity-[0.03] animate-grid-drift" />

      {/* LAYER 2: Large Soft Blurred Atmospheric White/Grey Gradients (Section 6) */}
      <div className="absolute -top-[25%] -left-[10%] w-[65vw] h-[65vw] max-w-[850px] max-h-[850px] rounded-full bg-gradient-to-br from-white/[0.045] via-white/[0.015] to-transparent blur-[150px] animate-ambient-drift-1" />
      <div className="absolute top-[30%] -right-[15%] w-[60vw] h-[60vw] max-w-[750px] max-h-[750px] rounded-full bg-gradient-to-bl from-white/[0.035] via-white/[0.012] to-transparent blur-[160px] animate-ambient-drift-2" />
      <div className="absolute -bottom-[25%] left-[25%] w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full bg-gradient-to-tr from-white/[0.04] via-white/[0.012] to-transparent blur-[170px] animate-ambient-drift-3" />

      {/* LAYER 3: Moving Particle Field with Directional Flow & Trails (Sections 2, 3, 4, 5) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-80"
      />

      {/* LAYER 4: Very Subtle Grain Texture (Section 6) */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-screen" />

      {/* Subtle Radial Edge Vignette to keep focus centered and deep black */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,#050505_90%)] opacity-85" />
    </div>
  );
}
